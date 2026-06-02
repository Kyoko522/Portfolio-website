import { Router } from 'express';
import { authRouter } from './modules/auth/auth.routes';
import { resumeRouter } from './modules/resume/resume.routes';
import { applicationsRouter } from './modules/applications/applications.routes';
import { coverLetterRouter } from './modules/coverletter/coverletter.routes';
import { profileRouter } from './modules/profile/profile.routes';
import { tailoringRouter } from './modules/tailoring/tailoring.routes';

// The root API router. Each feature mounts its own sub-router here, keeping
// route ownership inside the module that implements it.
export const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/resume', resumeRouter);
apiRouter.use('/applications', applicationsRouter);
apiRouter.use('/coverletter', coverLetterRouter);
apiRouter.use('/profile', profileRouter);
apiRouter.use('/tailoring', tailoringRouter);
