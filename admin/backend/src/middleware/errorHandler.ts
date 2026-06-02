import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';
import { env } from '../config/env';

// Catch-all for unmatched routes — returns JSON instead of Express's HTML 404.
export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ error: 'NOT_FOUND', message: 'Route not found' });
};

// The single place that turns thrown errors into HTTP responses. Registered
// last in the middleware chain. Keeps internal details out of prod responses.
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({ error: 'VALIDATION_ERROR', details: err.flatten() });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.code, message: err.message });
    return;
  }

  // Unknown/unexpected error: log it server-side, return a generic message.
  console.error('[unhandled]', err);
  const body: Record<string, unknown> = {
    error: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong',
  };
  if (env.NODE_ENV !== 'production') {
    body.detail = err instanceof Error ? err.message : String(err);
  }
  res.status(500).json(body);
};
