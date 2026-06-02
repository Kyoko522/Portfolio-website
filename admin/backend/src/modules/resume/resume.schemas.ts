import { z } from 'zod';

export const saveDraftSchema = z.object({
  texSource: z.string().min(1, 'texSource cannot be empty'),
});

export const compileSchema = z.object({
  texSource: z.string().min(1, 'texSource cannot be empty'),
});

export type SaveDraftInput = z.infer<typeof saveDraftSchema>;
export type CompileInput = z.infer<typeof compileSchema>;
