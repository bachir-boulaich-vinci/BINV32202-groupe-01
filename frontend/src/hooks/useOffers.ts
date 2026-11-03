import { useEffect, useState } from "react";
import type { Offer, PeriodCode } from "../models/offer.ts";
import { getOffers } from "../services/offers.service.ts";
import { isUnauthorized } from "../utils/api.ts";

/**
 * Offres visibles par l'utilisateur, choisies par le backend selon son profil.
 * onUnauthorized doit être stable (useCallback) pour ne pas relancer le chargement.
 */
export const useOffers = (token: string, onUnauthorized: () => void, period?: PeriodCode) => {
  // Le résultat mémorise la requête (jeton + période) à laquelle il répond :
  // tant qu'il ne correspond pas à la requête courante, le chargement est en cours.
  const [result, setResult] = useState<{
    key: string;
    offers: Offer[];
    error: string | null;
  } | null>(null);
  const requestKey = `${token}|${period ?? ""}`;

  useEffect(() => {
    const controller = new AbortController();

    getOffers(token, controller.signal, period)
      .then((data) => {
        if (!controller.signal.aborted) setResult({ key: requestKey, offers: data, error: null });
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return;
        if (isUnauthorized(reason)) {
          onUnauthorized();
        } else {
          setResult({
            key: requestKey,
            offers: [],
            error: reason instanceof Error ? reason.message : "Erreur inconnue",
          });
        }
      });

    return () => controller.abort();
  }, [token, onUnauthorized, period, requestKey]);

  const current = result?.key === requestKey ? result : null;
  return {
    offers: current?.offers ?? [],
    isLoading: current === null,
    error: current?.error ?? null,
  };
};
