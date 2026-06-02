import { Router } from 'express';
import { resumeController } from './resume.controller';
import { saveDraftSchema, compileSchema } from './resume.schemas';
import { validateBody } from '../../middleware/validate';
import { requireAuth } from '../../middleware/requireAuth';
import { asyncHandler } from '../../middleware/asyncHandler';

export const resumeRouter = Router();

// Everything under /resume requires a valid session.
resumeRouter.use(requireAuth);

resumeRouter.get('/draft', asyncHandler(resumeController.getDraft));
resumeRouter.put('/draft', validateBody(saveDraftSchema), asyncHandler(resumeController.saveDraft));
resumeRouter.post('/compile', validateBody(compileSchema), asyncHandler(resumeController.compile));
resumeRouter.post('/publish', asyncHandler(resumeController.publish));
resumeRouter.get('/versions', asyncHandler(resumeController.versions));
