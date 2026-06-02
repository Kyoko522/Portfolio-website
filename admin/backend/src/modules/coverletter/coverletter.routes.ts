import { Router } from 'express';
import { coverLetterController } from './coverletter.controller';
import { generateSchema, updateCoverLetterSchema, pdfSchema } from './coverletter.schemas';
import { validateBody } from '../../middleware/validate';
import { requireAuth } from '../../middleware/requireAuth';
import { asyncHandler } from '../../middleware/asyncHandler';
import { aiLimiter } from '../../middleware/rateLimit';

export const coverLetterRouter = Router();

coverLetterRouter.use(requireAuth);

// aiLimiter caps how often the (paid) Claude endpoint can be hit.
coverLetterRouter.post('/generate', aiLimiter, validateBody(generateSchema), asyncHandler(coverLetterController.generate));
coverLetterRouter.post('/pdf', validateBody(pdfSchema), asyncHandler(coverLetterController.pdf));
coverLetterRouter.put('/:id', validateBody(updateCoverLetterSchema), asyncHandler(coverLetterController.update));
coverLetterRouter.delete('/:id', asyncHandler(coverLetterController.remove));
