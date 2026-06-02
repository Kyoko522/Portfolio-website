import { z } from 'zod';

// Manually saving edits to the working résumé between AI steps.
export const saveTexSchema = z.object({
  texSource: z.string().min(1, 'texSource cannot be empty'),
});

export type SaveTexInput = z.infer<typeof saveTexSchema>;
