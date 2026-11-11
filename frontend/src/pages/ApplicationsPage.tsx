import { useState } from "react";
import EmptyState from "../components/EmptyState.tsx";
import ErrorState from "../components/ErrorState.tsx";
import LoadingState from "../components/LoadingState.tsx";
import PeriodFilter from "../components/PeriodFilter.tsx";
import StatusBadge from "../components/StatusBadge.tsx";
import { useApplications } from "../hooks/useApplications.ts";
import { withdrawApplication } from "../services/applications.service.ts";
import type { PeriodCode } from "../models/offer.ts";
import { APPLICATION_STATUS_LABELS, APPLICATION_STATUS_TONES, PERIOD_LABELS } from "../utils/labels.ts";

interface ApplicationsPageProps {
  token: string;
  onUnauthorized: () => void;
}

const ApplicationsPage = ({ token, onUnauthorized }: ApplicationsPageProps) => {
  const [period, setPeriod] = useState<PeriodCode | "">("");
  const [reloadKey, setReloadKey] = useState(0);
  const [actionError, setActionError] = useState<string | null>(null);
  const { applications, isLoading, error } = useApplications(
    token,
    onUnauthorized,
    period || undefined,
    true,
    reloadKey,
  );

  const handleWithdraw = async (id: number) => {
    if (!window.confirm("Retirer cette candidature ?")) return;
    setActionError(null);
    try {
      await withdrawApplication(token, id);
      setReloadKey((value) => value + 1);
    } catch (reason: unknown) {
      setActionError(reason instanceof Error ? reason.message : "Retrait impossible");
    }
  };

  if (error) return <ErrorState message={error} />;
  if (isLoading) return <LoadingState />;

  return (
    <section>
      <h1>Mes candidatures</h1>
      {actionError && <ErrorState message={actionError} />}
      <PeriodFilter value={period} onChange={setPeriod} />
      {applications.length === 0 ? (
        <EmptyState message="Aucune candidature à afficher." />
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Offre</th>
                <th scope="col">Entreprise</th>
                <th scope="col">Période</th>
                <th scope="col">Message</th>
                <th scope="col">Statut</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>{application.offerTitle}</td>
                  <td>{application.companyShortName}</td>
                  <td>{PERIOD_LABELS[application.period]}</td>
                  <td>{application.message ?? "—"}</td>
                  <td>
                    <StatusBadge
                      label={APPLICATION_STATUS_LABELS[application.status]}
                      tone={APPLICATION_STATUS_TONES[application.status]}
                    />
                  </td>
                  <td>
                    {application.status === "IN_PROGRESS" && (
                      <button className="button button-danger" onClick={() => void handleWithdraw(application.id)}>
                        Retirer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ApplicationsPage;
