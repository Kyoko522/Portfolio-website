import { Router } from 'express';
import { profileController } from './profile.controller';
import {
  experienceSchema,
  experienceUpdateSchema,
  projectSchema,
  projectUpdateSchema,
  educationSchema,
  educationUpdateSchema,
  skillSchema,
  skillUpdateSchema,
} from './profile.schemas';
import { validateBody } from '../../middleware/validate';
import { requireAuth } from '../../middleware/requireAuth';
import { asyncHandler } from '../../middleware/asyncHandler';

export const profileRouter = Router();

profileRouter.use(requireAuth);

// One GET returns the entire bank; the front end edits collections in place.
profileRouter.get('/', asyncHandler(profileController.getFull));

// Experiences
profileRouter.post('/experiences', validateBody(experienceSchema), asyncHandler(profileController.createExperience));
profileRouter.put('/experiences/:id', validateBody(experienceUpdateSchema), asyncHandler(profileController.updateExperience));
profileRouter.delete('/experiences/:id', asyncHandler(profileController.removeExperience));

// Projects
profileRouter.post('/projects', validateBody(projectSchema), asyncHandler(profileController.createProject));
profileRouter.put('/projects/:id', validateBody(projectUpdateSchema), asyncHandler(profileController.updateProject));
profileRouter.delete('/projects/:id', asyncHandler(profileController.removeProject));

// Education
profileRouter.post('/education', validateBody(educationSchema), asyncHandler(profileController.createEducation));
profileRouter.put('/education/:id', validateBody(educationUpdateSchema), asyncHandler(profileController.updateEducation));
profileRouter.delete('/education/:id', asyncHandler(profileController.removeEducation));

// Skills
profileRouter.post('/skills', validateBody(skillSchema), asyncHandler(profileController.createSkill));
profileRouter.put('/skills/:id', validateBody(skillUpdateSchema), asyncHandler(profileController.updateSkill));
profileRouter.delete('/skills/:id', asyncHandler(profileController.removeSkill));
