import { useState } from "react";
import EmptyState from "../components/EmptyState.tsx";
import ErrorState from "../components/ErrorState.tsx";
import LoadingState from "../components/LoadingState.tsx";
import OfferTable from "../components/OfferTable.tsx";
import PeriodFilter from "../components/PeriodFilter.tsx";
import { useOffers } from "../hooks/useOffers.ts";
import { useApplications } from "../hooks/useApplications.ts";
import { createApplication } from "../services/applications.service.ts";
import type { PeriodCode } from "../models/offer.ts";
import type { User } from "../models/user.ts";

interface OffersPageProps {
  user: User;
  token: string;
  onUnauthorized: () => void;
}

const DESCRIPTIONS = {
  ADMIN: "Toutes les offres, tous statuts confondus.",
  STUDENT: "Les offres publiées.",
  CONTACT: "Les offres que vous avez déposées.",
} as const;

const OffersPage = ({ user, token, onUnauthorized }: OffersPageProps) => {
  const [period, setPeriod] = useState<PeriodCode | "">("");
  const { offers, isLoading, error } = useOffers(token, onUnauthorized, period || undefined);
  const [applicationRefresh, setApplicationRefresh] = useState(0);
  const applications = useApplications(
    token,
    onUnauthorized,
    undefined,
    user.kind === "STUDENT",
    applicationRefresh,
  );

  const apply = async (offerId: number, message: string) => {
    await createApplication(token, offerId, message);
    setApplicationRefresh((value) => value + 1);
  };

  const renderContent = () => {
    if (error) return <ErrorState message={error} />;
    if (isLoading) return <LoadingState />;
    if (offers.length === 0) return <EmptyState message="Aucune offre à afficher." />;
    return (
      <>
        <p className="result-count">
          {offers.length} offre{offers.length > 1 ? "s" : ""}
        </p>
        <OfferTable
          offers={offers}
          studentApplications={applications.applications}
          onApply={user.kind === "STUDENT" ? apply : undefined}
        />
      </>
    );
  };

  return (
    <section>
      <h1>Offres de stage</h1>
      <p>{DESCRIPTIONS[user.kind]}</p>
      <PeriodFilter value={period} onChange={setPeriod} />
      {renderContent()}
    </section>
  );
};

export default OffersPage;
