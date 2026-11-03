import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { ADMINISTRATOR, APPLICATION, OFFER, STUDENT } from "../src/db/seed/seedIds.ts";
import { createTestApp, tokenFor } from "./helpers/testApp.ts";

let app: ReturnType<typeof createTestApp>;

beforeEach(() => {
  app = createTestApp();
});

const studentToken = (id: number) => tokenFor("STUDENT", id);

describe("GET /applications", () => {
  it("liste uniquement les candidatures de l'étudiant connecté", async () => {
    const response = await request(app)
      .get("/applications")
      .set("Authorization", studentToken(STUDENT.INES_HADDAD));

    expect(response.status).toBe(200);
    expect(response.body.map((application: { id: number }) => application.id)).toEqual([
      APPLICATION.INES_FLEET_APP,
      APPLICATION.INES_BILLING_API,
    ]);
    expect(response.body.map((application: { status: string }) => application.status)).toEqual([
      "IN_PROGRESS",
      "WITHDRAWN",
    ]);
  });

  it("filtre les candidatures par période", async () => {
    const response = await request(app)
      .get("/applications?period=P2")
      .set("Authorization", studentToken(STUDENT.INES_HADDAD));

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it("refuse l'accès aux non-étudiants", async () => {
    const response = await request(app)
      .get("/applications")
      .set("Authorization", tokenFor("ADMIN", ADMINISTRATOR.ANNE_LECLERCQ));

    expect(response.status).toBe(403);
  });
});

describe("POST /applications", () => {
  it("crée une candidature avec un message facultatif", async () => {
    const response = await request(app)
      .post("/applications")
      .set("Authorization", studentToken(STUDENT.DMYTRO_KOVALENKO))
      .send({ offerId: OFFER.INTERNAL_CHATBOT, message: "  Sujet intéressant.  " });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      offerId: OFFER.INTERNAL_CHATBOT,
      message: "Sujet intéressant.",
      status: "IN_PROGRESS",
    });
  });

  it("refuse une seconde candidature active pour la même offre", async () => {
    const response = await request(app)
      .post("/applications")
      .set("Authorization", studentToken(STUDENT.LUCAS_DUPONT))
      .send({ offerId: OFFER.FLEET_APP });

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe("APPLICATION_EXISTS");
  });

  it.each([OFFER.CLOUD_MIGRATION, OFFER.PDF_REPORTS])(
    "refuse une candidature pour une offre non publiée (%s)",
    async (offerId) => {
      const response = await request(app)
        .post("/applications")
        .set("Authorization", studentToken(STUDENT.DMYTRO_KOVALENKO))
        .send({ offerId });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe("OFFER_NOT_PUBLISHED");
    },
  );
});

describe("DELETE /applications/:id", () => {
  it("retire une candidature en cours", async () => {
    const response = await request(app)
      .delete(`/applications/${APPLICATION.LUCAS_FLEET_APP}`)
      .set("Authorization", studentToken(STUDENT.LUCAS_DUPONT));

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("WITHDRAWN");
  });

  it("refuse le retrait d'une candidature appartenant à un autre étudiant", async () => {
    const response = await request(app)
      .delete(`/applications/${APPLICATION.LUCAS_FLEET_APP}`)
      .set("Authorization", studentToken(STUDENT.INES_HADDAD));

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe("APPLICATION_NOT_FOUND");
  });

  it("refuse le retrait d'une candidature déjà traitée", async () => {
    const response = await request(app)
      .delete(`/applications/${APPLICATION.MATEUSZ_CLOUD_MIGRATION}`)
      .set("Authorization", studentToken(STUDENT.MATEUSZ_KOWALSKI));

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe("APPLICATION_PROCESSED");
  });
});
