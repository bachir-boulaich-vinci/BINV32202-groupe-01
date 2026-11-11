import type { Db } from "../db/database.ts";
import type { ApplicationDbo } from "../models/application.ts";
import type { PeriodCode } from "../models/offer.ts";

interface FindAllParams {
  studentId: number;
  period: PeriodCode | null;
}

interface CreateParams {
  studentId: number;
  offerId: number;
  message: string | null;
}

export const createApplicationsRepository = (db: Db) => {
  const findAll = db.prepare<FindAllParams, ApplicationDbo>(`
    SELECT a.id, a.offer_id, o.title AS offer_title, c.short_name AS company_short_name,
           ay.label AS academic_year_label, p.code AS period_code,
           a.student_id, a.message, a.status, a.applied_at
    FROM applications a
    JOIN offers o ON o.id = a.offer_id
    JOIN companies c ON c.id = o.company_id
    JOIN academic_years ay ON ay.id = o.academic_year_id
    JOIN periods p ON p.id = o.period_id
    WHERE a.student_id = @studentId
      AND (@period IS NULL OR p.code = @period)
    ORDER BY a.applied_at DESC, a.id DESC
  `);
  const findOffer = db.prepare<[number], { status: string }>(
    "SELECT status FROM offers WHERE id = ?",
  );
  const findActive = db.prepare<[number, number], { id: number }>(`
    SELECT id FROM applications
    WHERE student_id = ? AND offer_id = ? AND status = 'IN_PROGRESS'
  `);
  const insert = db.prepare<CreateParams>(`
    INSERT INTO applications (offer_id, student_id, message)
    VALUES (@offerId, @studentId, @message)
  `);
  const findByIdForStudent = db.prepare<[number, number], ApplicationDbo>(`
    SELECT a.id, a.offer_id, o.title AS offer_title, c.short_name AS company_short_name,
           ay.label AS academic_year_label, p.code AS period_code,
           a.student_id, a.message, a.status, a.applied_at
    FROM applications a
    JOIN offers o ON o.id = a.offer_id
    JOIN companies c ON c.id = o.company_id
    JOIN academic_years ay ON ay.id = o.academic_year_id
    JOIN periods p ON p.id = o.period_id
    WHERE a.id = ? AND a.student_id = ?
  `);
  const withdraw = db.prepare<[number, number]>(`
    UPDATE applications SET status = 'WITHDRAWN'
    WHERE id = ? AND student_id = ? AND status = 'IN_PROGRESS'
  `);

  const create = db.transaction(({ studentId, offerId, message }: CreateParams) => {
    const offer = findOffer.get(offerId);
    if (offer === undefined) return { kind: "NOT_FOUND" as const };
    if (offer.status !== "PUBLISHED") return { kind: "NOT_PUBLISHED" as const };
    if (findActive.get(studentId, offerId) !== undefined) return { kind: "DUPLICATE" as const };
    const result = insert.run({ studentId, offerId, message });
    return {
      kind: "CREATED" as const,
      application: findByIdForStudent.get(Number(result.lastInsertRowid), studentId),
    };
  });

  const withdrawApplication = db.transaction((applicationId: number, studentId: number) => {
    const application = findByIdForStudent.get(applicationId, studentId);
    if (application === undefined) return { kind: "NOT_FOUND" as const };
    if (application.status !== "IN_PROGRESS") return { kind: "ALREADY_PROCESSED" as const };
    withdraw.run(applicationId, studentId);
    return { kind: "WITHDRAWN" as const, application: findByIdForStudent.get(applicationId, studentId) };
  });

  return {
    findAll: (studentId: number, period?: PeriodCode): ApplicationDbo[] =>
      findAll.all({ studentId, period: period ?? null }),
    create,
    withdrawApplication,
  };
};

export type ApplicationsRepository = ReturnType<typeof createApplicationsRepository>;
