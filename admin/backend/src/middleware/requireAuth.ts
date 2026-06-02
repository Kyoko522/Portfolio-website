import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { UnauthorizedError } from '../errors/AppError';

const COOKIE_NAME = 'token';

interface TokenPayload {
  sub: string;
}

// Gate for protected routes. Reads the JWT from the httpOnly cookie, verifies
// the signature/expiry, and attaches the user id to the request.
export const requireAuth: RequestHandler = (req, _res, next) => {
  const token = req.cookies?.[COOKIE_NAME] as string | undefined;
  if (!token) {
    next(new UnauthorizedError('Not authenticated'));
    return;
  }
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    req.userId = payload.sub;
    next();
  } catch {
    next(new UnauthorizedError('Invalid or expired session'));
  }
};
