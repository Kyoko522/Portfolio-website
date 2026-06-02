import type { RequestHandler } from 'express';
import type { ZodTypeAny } from 'zod';

// Validates and *replaces* req.body with the parsed (and coerced) data, so
// controllers always receive clean, typed input. On failure, forwards the
// ZodError to the error handler, which formats it into a 400.
export const validateBody =
  (schema: ZodTypeAny): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      next(result.error);
      return;
    }
    req.body = result.data;
    next();
  };
