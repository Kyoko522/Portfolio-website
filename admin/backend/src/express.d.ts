// Declaration merging: add our own fields to Express's Request type so
// `req.userId` is strongly typed everywhere after requireAuth runs.
import 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export {};
