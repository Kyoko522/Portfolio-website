import { Router } from 'express';
import { tailoringController } from './tailoring.controller';
import { saveTexSchema } from './tailoring.schemas';
import { validateBody } from '../../middleware/validate';
import { requireAuth } from '../../middleware/requireAuth';
import { asyncHandler } from '../../middleware/asyncHandler';
import { aiLimiter } from '../../middleware/rateLimit';

export const tailoringRouter = Router();

tailoringRouter.use(requireAuth);

// Read the current session for an application.
tailoringRouter.get('/:applicationId', asyncHandler(tailoringController.get));

// The four paid Claude steps — rate-limited like the cover-letter endpoint.
tailoringRouter.post('/:applicationId/assemble', aiLimiter, asyncHandler(tailoringController.assemble));
tailoringRouter.post('/:applicationId/scan', aiLimiter, asyncHandler(tailoringController.scan));
tailoringRouter.post('/:applicationId/operate', aiLimiter, asyncHandler(tailoringController.operate));
tailoringRouter.post('/:applicationId/stress', aiLimiter, asyncHandler(tailoringController.stress));

// Free actions: persist a manual edit, or snapshot the finished résumé.
tailoringRouter.put('/:applicationId/tex', validateBody(saveTexSchema), asyncHandler(tailoringController.saveTex));
tailoringRouter.post('/:applicationId/save-version', asyncHandler(tailoringController.saveAsVersion));
