import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
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
  {
    id: 3,
    offerId: 4,
    offerTitle: "Migration cloud",
    companyShortName: "Lumen Cloud",
    academicYear: "2026-2027",
    period: "P1",
    message: null,
    status: "SELECTED",
    appliedAt: "2026-09-28 10:30:00",
  },
  {
    id: 4,
    offerId: 5,
    offerTitle: "Rapport PDF",
    companyShortName: "Orbis",
    academicYear: "2026-2027",
    period: "P1",
    message: null,
    status: "REJECTED",
    appliedAt: "2026-09-27 10:30:00",
  },
];

describe("ApplicationsPage", () => {
  it("affiche les candidatures et leurs libellés", async () => {
    stubFetch({ "/api/applications": () => Response.json(applications) });

    render(<ApplicationsPage token="jeton" onUnauthorized={vi.fn()} />);

    expect(await screen.findByText("Application React de gestion de flotte")).toBeInTheDocument();
    expect(screen.getByText("En cours")).toBeInTheDocument();
    expect(screen.getByText("Retenue")).toBeInTheDocument();
    expect(screen.getByText("Non retenue")).toBeInTheDocument();
    expect(screen.getByText("Retirée")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Retirer" })).toHaveLength(1);

    const inProgressRow = screen.getByText("Application React de gestion de flotte").closest("tr");
    const selectedRow = screen.getByText("Migration cloud").closest("tr");
    const rejectedRow = screen.getByText("Rapport PDF").closest("tr");
    const withdrawnRow = screen.getByText("API REST de facturation").closest("tr");

    expect(inProgressRow).not.toBeNull();
    expect(selectedRow).not.toBeNull();
    expect(rejectedRow).not.toBeNull();
    expect(withdrawnRow).not.toBeNull();
    expect(within(inProgressRow as HTMLTableRowElement).getByRole("button", { name: "Retirer" })).toBeInTheDocument();
    expect(within(selectedRow as HTMLTableRowElement).queryByRole("button", { name: "Retirer" })).not.toBeInTheDocument();
    expect(within(rejectedRow as HTMLTableRowElement).queryByRole("button", { name: "Retirer" })).not.toBeInTheDocument();
    expect(within(withdrawnRow as HTMLTableRowElement).queryByRole("button", { name: "Retirer" })).not.toBeInTheDocument();
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
