import { useState, type FormEvent } from "react";
import type { Application } from "../models/application.ts";
import type { Offer } from "../models/offer.ts";
import { OFFER_STATUS_LABELS, OFFER_STATUS_TONES, PERIOD_LABELS } from "../utils/labels.ts";
import StatusBadge from "./StatusBadge.tsx";

interface OfferTableProps {
  offers: Offer[];
  studentApplications?: Application[];
  onApply?: (offerId: number, message: string) => Promise<void>;
}

const ApplicationForm = ({
  offerId,
  onApply,
}: {
  offerId: number;
  onApply: (offerId: number, message: string) => Promise<void>;
}) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await onApply(offerId, message);
      setMessage("");
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : "Candidature impossible");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="application-form" onSubmit={submit}>
      <label>
        <span>Message (facultatif)</span>
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
      </label>
      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Envoi…" : "Candidater"}
      </button>
      {error && <p className="form-error" role="alert">{error}</p>}
    </form>
  );
};

const OfferTable = ({ offers, studentApplications = [], onApply }: OfferTableProps) => {
  const activeOfferIds = new Set(
    studentApplications
      .filter((application) => application.status === "IN_PROGRESS")
      .map((application) => application.offerId),
  );

  return (
  <div className="table-wrapper">
    <table className="data-table">
      <thead>
        <tr>
          <th scope="col">Titre</th>
          <th scope="col">Entreprise</th>
          <th scope="col">Année</th>
          <th scope="col">Période</th>
          <th scope="col">Statut</th>
          {onApply && <th scope="col">Candidature</th>}
        </tr>
      </thead>
      <tbody>
        {offers.map((offer) => (
          <tr key={offer.id}>
            <td>{offer.title}</td>
            <td>{offer.companyShortName}</td>
            <td>{offer.academicYear}</td>
            <td>{PERIOD_LABELS[offer.period]}</td>
            <td>
              <StatusBadge
                label={OFFER_STATUS_LABELS[offer.status]}
                tone={OFFER_STATUS_TONES[offer.status]}
              />
            </td>
            {onApply && (
              <td>
                {activeOfferIds.has(offer.id) ? (
                  <span>Candidature envoyée</span>
                ) : (
                  <ApplicationForm offerId={offer.id} onApply={onApply} />
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default OfferTable;
