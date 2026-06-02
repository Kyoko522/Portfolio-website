import { z } from 'zod';

// The lifecycle of a job application. Stored as a String in SQLite, validated
// here so only these values can ever reach the database.
export const APPLICATION_STATUSES = [
  'DRAFT',
  'APPLIED',
  'WAITING',
  'INTERVIEW',
  'OFFER',
  'REJECTED',
  'WITHDRAWN',
] as const;

export const statusEnum = z.enum(APPLICATION_STATUSES);

export const createApplicationSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  jobUrl: z.string().url().optional().or(z.literal('')),
  jobDescription: z.string().optional(),
  status: statusEnum.default('DRAFT'),
  notes: z.string().optional(),
  resumeVersionId: z.string().optional(),
  appliedAt: z.coerce.date().optional(),
});

// Every field optional for partial updates (PATCH-style).
export const updateApplicationSchema = createApplicationSchema.partial();

export const updateStatusSchema = z.object({
  status: statusEnum,
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationInput = z.infer<typeof updateApplicationSchema>;
