import { toApplication } from "../mappers/application.mapper.ts";
import type { Application } from "../models/application.ts";
import type { PeriodCode } from "../models/offer.ts";
import type { ApplicationsRepository } from "../repositories/applications.repository.ts";
import { HttpError } from "../utils/httpError.ts";

export const createApplicationsService = (repository: ApplicationsRepository) => ({
  listApplications: (studentId: number, period?: PeriodCode): Application[] =>
    repository.findAll(studentId, period).map(toApplication),

  createApplication: (studentId: number, offerId: number, message: string | null): Application => {
    const result = repository.create({ studentId, offerId, message });
    if (result.kind === "NOT_FOUND") {
      throw new HttpError(404, "OFFER_NOT_FOUND", "Cette offre n'existe pas");
    }
    if (result.kind === "NOT_PUBLISHED") {
      throw new HttpError(400, "OFFER_NOT_PUBLISHED", "La candidature est impossible pour cette offre");
    }
    if (result.kind === "DUPLICATE") {
      throw new HttpError(409, "APPLICATION_EXISTS", "Vous avez déjà candidaté à cette offre");
    }
    if (result.application === undefined) {
      throw new HttpError(500, "INTERNAL_ERROR", "La candidature n'a pas pu être créée");
    }
    return toApplication(result.application);
  },

  withdrawApplication: (studentId: number, applicationId: number): Application => {
    const result = repository.withdrawApplication(applicationId, studentId);
    if (result.kind === "NOT_FOUND") {
      throw new HttpError(404, "APPLICATION_NOT_FOUND", "Cette candidature n'existe pas");
    }
    if (result.kind === "ALREADY_PROCESSED") {
      throw new HttpError(409, "APPLICATION_PROCESSED", "Cette candidature a déjà été traitée");
    }
    if (result.application === undefined) {
      throw new HttpError(500, "INTERNAL_ERROR", "La candidature n'a pas pu être retirée");
    }
    return toApplication(result.application);
  },
});

export type ApplicationsService = ReturnType<typeof createApplicationsService>;
