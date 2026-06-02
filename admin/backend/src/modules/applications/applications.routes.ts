import { Router } from 'express';
import { applicationsController } from './applications.controller';
import {
  createApplicationSchema,
  updateApplicationSchema,
  updateStatusSchema,
} from './applications.schemas';
import { validateBody } from '../../middleware/validate';
import { requireAuth } from '../../middleware/requireAuth';
import { asyncHandler } from '../../middleware/asyncHandler';

export const applicationsRouter = Router();

applicationsRouter.use(requireAuth);

applicationsRouter.get('/', asyncHandler(applicationsController.list));
applicationsRouter.post('/', validateBody(createApplicationSchema), asyncHandler(applicationsController.create));
applicationsRouter.get('/:id', asyncHandler(applicationsController.get));
applicationsRouter.put('/:id', validateBody(updateApplicationSchema), asyncHandler(applicationsController.update));
applicationsRouter.patch('/:id/status', validateBody(updateStatusSchema), asyncHandler(applicationsController.updateStatus));
applicationsRouter.delete('/:id', asyncHandler(applicationsController.remove));
