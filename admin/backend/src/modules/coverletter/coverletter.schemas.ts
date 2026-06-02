import { z } from 'zod';

export const generateSchema = z.object({
  applicationId: z.string().min(1),
  notes: z.string().max(2000).optional(),
});

export const updateCoverLetterSchema = z.object({
  content: z.string().min(1),
});

export const pdfSchema = z.object({
  content: z.string().min(1),
});

export type GenerateInput = z.infer<typeof generateSchema>;
