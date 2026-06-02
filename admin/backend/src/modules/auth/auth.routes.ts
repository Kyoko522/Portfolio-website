import { Router } from 'express';
import { authController } from './auth.controller';
import { loginSchema } from './auth.schemas';
import { validateBody } from '../../middleware/validate';
import { requireAuth } from '../../middleware/requireAuth';
import { loginLimiter } from '../../middleware/rateLimit';
import { asyncHandler } from '../../middleware/asyncHandler';

export const authRouter = Router();

authRouter.post('/login', loginLimiter, validateBody(loginSchema), asyncHandler(authController.login));
authRouter.post('/logout', authController.logout);
authRouter.get('/me', requireAuth, asyncHandler(authController.me));
