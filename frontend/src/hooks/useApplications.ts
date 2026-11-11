import { useEffect, useState } from "react";
import type { Application } from "../models/application.ts";
import type { PeriodCode } from "../models/offer.ts";
import { getApplications } from "../services/applications.service.ts";
import { isUnauthorized } from "../utils/api.ts";

export const useApplications = (
  token: string,
  onUnauthorized: () => void,
  period?: PeriodCode,
  enabled = true,
  reloadKey = 0,
) => {
  const [result, setResult] = useState<{
    key: string;
    applications: Application[];
    error: string | null;
  } | null>(null);
  const requestKey = `${token}|${period ?? ""}`;

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const controller = new AbortController();
    getApplications(token, controller.signal, period)
      .then((applications) => {
        if (!controller.signal.aborted) setResult({ key: requestKey, applications, error: null });
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return;
        if (isUnauthorized(reason)) onUnauthorized();
        else
          setResult({
            key: requestKey,
            applications: [],
            error: reason instanceof Error ? reason.message : "Erreur inconnue",
          });
      });
    return () => controller.abort();
  }, [token, onUnauthorized, period, requestKey, enabled, reloadKey]);

  const current = result?.key === requestKey ? result : null;
  return {
    applications: current?.applications ?? [],
    isLoading: current === null,
    error: current?.error ?? null,
  };
};
