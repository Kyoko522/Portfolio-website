import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import { apiRouter } from './routes';
import { apiLimiter } from './middleware/rateLimit';
import { notFoundHandler, errorHandler } from './middleware/errorHandler';

// Assembles the Express app. Order matters: security + parsers first, then
// routes, then the 404 + error handlers last.
export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  // credentials:true lets the browser send our auth cookie cross-origin; the
  // origin is locked to the known frontend.
  app.use(cors({ origin: env.FRONTEND_ORIGIN, credentials: true }));
  app.use(express.json({ limit: '2mb' }));
  app.use(cookieParser());

  app.use('/api', apiLimiter, apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
