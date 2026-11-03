import { Router } from "express";
import { toApplicationDto } from "../mappers/application.mapper.ts";
import { getCurrentUser } from "../middlewares/authenticate.ts";
import type { ApplicationsService } from "../services/applications.service.ts";
import { isStudent } from "../services/permissions.ts";
import type { PeriodCode } from "../models/offer.ts";
import { HttpError } from "../utils/httpError.ts";
import { authorize } from "../middlewares/authorize.ts";

const PERIOD_CODES = ["P1", "P2", "OTHER"] as const;

const parsePeriod = (value: unknown): PeriodCode | undefined => {
  if (value === undefined) return undefined;
  if (typeof value !== "string" || !PERIOD_CODES.includes(value as PeriodCode)) {
    throw new HttpError(400, "INVALID_QUERY", "Le paramètre period doit valoir P1, P2 ou OTHER");
  }
  return value as PeriodCode;
};

const parseId = (value: string): number => {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError(400, "INVALID_QUERY", "L'identifiant doit être un entier positif");
  }
  return id;
};

const parseCreateBody = (value: unknown): { offerId: number; message: string | null } => {
  if (typeof value !== "object" || value === null) {
    throw new HttpError(400, "INVALID_BODY", "Le corps doit contenir offerId");
  }
  const body = value as Record<string, unknown>;
  if (
    typeof body.offerId !== "number" ||
    !Number.isInteger(body.offerId) ||
    body.offerId <= 0 ||
    (body.message !== undefined && body.message !== null && typeof body.message !== "string")
  ) {
    throw new HttpError(400, "INVALID_BODY", "Le corps contient des valeurs invalides");
  }
  const message = typeof body.message === "string" ? body.message.trim() || null : null;
  return { offerId: body.offerId, message };
};

export const createApplicationsRouter = (service: ApplicationsService) => {
  const router = Router();

  router.use(authorize(isStudent));

  router.get("/", (req, res) => {
    const applications = service.listApplications(getCurrentUser(req).id, parsePeriod(req.query.period));
    res.json(applications.map(toApplicationDto));
  });

  router.post("/", (req, res) => {
    const body = parseCreateBody(req.body);
    const application = service.createApplication(getCurrentUser(req).id, body.offerId, body.message);
    res.status(201).json(toApplicationDto(application));
  });

  router.delete("/:id", (req, res) => {
    const application = service.withdrawApplication(getCurrentUser(req).id, parseId(req.params.id));
    res.json(toApplicationDto(application));
  });

  return router;
};
