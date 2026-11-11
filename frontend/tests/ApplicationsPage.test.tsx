import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ApplicationsPage from "../src/pages/ApplicationsPage.tsx";
import { stubFetch } from "./helpers/fetchMock.ts";

const applications = [
  {
    id: 1,
    offerId: 1,
    offerTitle: "Application React de gestion de flotte",
    companyShortName: "Lumen Digital",
    academicYear: "2026-2027",
    period: "P2",
    message: "Le développement React m'intéresse.",
    status: "IN_PROGRESS",
    appliedAt: "2026-10-02 18:10:00",
  },
  {
    id: 2,
    offerId: 3,
    offerTitle: "API REST de facturation",
    companyShortName: "Orbis",
    academicYear: "2026-2027",
    period: "P2",
    message: null,
    status: "WITHDRAWN",
    appliedAt: "2026-09-30 10:30:00",
  },
];

describe("ApplicationsPage", () => {
  it("affiche les candidatures et leurs libellés", async () => {
    stubFetch({ "/api/applications": () => Response.json(applications) });

    render(<ApplicationsPage token="jeton" onUnauthorized={vi.fn()} />);

    expect(await screen.findByText("Application React de gestion de flotte")).toBeInTheDocument();
    expect(screen.getByText("En cours")).toBeInTheDocument();
    expect(screen.getByText("Retirée")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Retirer" })).toBeInTheDocument();
  });

  it("filtre par période", async () => {
    const fetchMock = stubFetch({
      "/api/applications?period=P1": () => Response.json([]),
      "/api/applications": () => Response.json(applications),
    });

    render(<ApplicationsPage token="jeton" onUnauthorized={vi.fn()} />);
    await screen.findByText("En cours");
    fireEvent.change(screen.getByLabelText("Période"), { target: { value: "P1" } });

    await waitFor(() =>
      expect(fetchMock).toHaveBeenLastCalledWith("/api/applications?period=P1", expect.anything()),
    );
    expect(await screen.findByText("Aucune candidature à afficher.")).toBeInTheDocument();
  });

  it("retire une candidature après confirmation", async () => {
    const fetchMock = stubFetch({
      "/api/applications/1": () => Response.json({ ...applications[0], status: "WITHDRAWN" }),
      "/api/applications": () => Response.json(applications),
    });
    vi.stubGlobal("confirm", vi.fn(() => true));

    render(<ApplicationsPage token="jeton" onUnauthorized={vi.fn()} />);
    await screen.findByText("En cours");
    fireEvent.click(screen.getByRole("button", { name: "Retirer" }));

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/applications/1",
        expect.objectContaining({ method: "DELETE" }),
      ),
    );
    expect(window.confirm).toHaveBeenCalledWith("Retirer cette candidature ?");
  });
});
