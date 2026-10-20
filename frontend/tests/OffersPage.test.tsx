import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import OffersPage from "../src/pages/OffersPage.tsx";
import { adminUser, contactUser, stubFetch, studentUser } from "./helpers/fetchMock.ts";

const offers = [
  {
    id: 2,
    title: "Refonte du portail client",
    companyShortName: "Lumen Digital",
    academicYear: "2026-2027",
    period: "P2",
    status: "SUBMITTED",
  },
  {
    id: 5,
    title: "Tableau de bord de qualité des données",
    companyShortName: "Lumen Data",
    academicYear: "2026-2027",
    period: "OTHER",
    status: "ASSIGNED",
  },
];

describe("OffersPage", () => {
  it("affiche les offres avec leurs libellés français", async () => {
    stubFetch({ "/api/offers": () => Response.json(offers) });

    render(<OffersPage user={contactUser} token="jeton" onUnauthorized={vi.fn()} />);

    expect(await screen.findByText("Refonte du portail client")).toBeInTheDocument();
    expect(screen.getByText("Soumise")).toBeInTheDocument();
    expect(screen.getByText("Attribuée")).toBeInTheDocument();
    expect(within(screen.getByRole("table")).getByText("Autre")).toBeInTheDocument();
    expect(screen.getByText("2 offres")).toBeInTheDocument();
    expect(screen.getByText("Les offres que vous avez déposées.")).toBeInTheDocument();
  });

  it("propose les périodes et charge sans filtre par défaut", async () => {
    const fetchMock = stubFetch({ "/api/offers": () => Response.json(offers) });

    render(<OffersPage user={adminUser} token="jeton" onUnauthorized={vi.fn()} />);
    await screen.findByText("2 offres");

    const select = screen.getByLabelText("Période");
    const labels = within(select).getAllByRole("option").map((option) => option.textContent);
    expect(labels).toEqual(["Toutes les périodes", "P1", "P2", "Autre"]);
    expect(fetchMock).toHaveBeenCalledWith("/api/offers", expect.anything());
  });

  it("transmet la période choisie à l'API puis retire le filtre", async () => {
    const fetchMock = stubFetch({
      "/api/offers?period=P2": () => Response.json([offers[0]]),
      "/api/offers?period=OTHER": () => Response.json([offers[1]]),
      "/api/offers": () => Response.json(offers),
    });

    render(<OffersPage user={adminUser} token="jeton" onUnauthorized={vi.fn()} />);
    await screen.findByText("2 offres");

    fireEvent.change(screen.getByLabelText("Période"), { target: { value: "P2" } });
    expect(await screen.findByText("1 offre")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenLastCalledWith("/api/offers?period=P2", expect.anything());

    fireEvent.change(screen.getByLabelText("Période"), { target: { value: "OTHER" } });
    await waitFor(() =>
      expect(fetchMock).toHaveBeenLastCalledWith("/api/offers?period=OTHER", expect.anything()),
    );

    fireEvent.change(screen.getByLabelText("Période"), { target: { value: "" } });
    expect(await screen.findByText("2 offres")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenLastCalledWith("/api/offers", expect.anything());
  });

  it("adapte la description au profil", async () => {
    stubFetch({ "/api/offers": () => Response.json([]) });

    const { unmount } = render(
      <OffersPage user={studentUser} token="jeton" onUnauthorized={vi.fn()} />,
    );
    expect(screen.getByText("Les offres publiées.")).toBeInTheDocument();
    expect(await screen.findByText("Aucune offre à afficher.")).toBeInTheDocument();
    unmount();

    render(<OffersPage user={adminUser} token="jeton" onUnauthorized={vi.fn()} />);
    expect(screen.getByText("Toutes les offres, tous statuts confondus.")).toBeInTheDocument();
  });

  it("affiche un refus d'accès renvoyé par le backend", async () => {
    stubFetch({ "/api/offers": () => new Response(null, { status: 403 }) });

    render(<OffersPage user={contactUser} token="jeton" onUnauthorized={vi.fn()} />);

    expect(await screen.findByRole("alert")).toHaveTextContent("statut 403");
  });

  it("signale une session expirée", async () => {
    stubFetch({ "/api/offers": () => new Response(null, { status: 401 }) });
    const onUnauthorized = vi.fn();

    render(<OffersPage user={contactUser} token="jeton" onUnauthorized={onUnauthorized} />);

    await waitFor(() => expect(onUnauthorized).toHaveBeenCalled());
  });
});
