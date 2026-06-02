import dotenv from 'dotenv';
import { z } from 'zod';

// Load .env into process.env before we read anything.
dotenv.config();

// A schema that both validates AND types our environment. If a required var is
// missing or malformed, the app refuses to boot with a clear message — far
// better than a confusing crash deep in a request handler later.
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  FRONTEND_ORIGIN: z.string().url().default('http://localhost:5173'),

  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),

  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().min(8).optional(),

  ANTHROPIC_API_KEY: z.string().optional(),
  COVER_LETTER_MODEL: z.string().default('claude-opus-4-7'),
  // Model used for the résumé tailoring pipeline (assemble/scan/surgeon/stress).
  RESUME_MODEL: z.string().default('claude-opus-4-7'),

  PUBLISH_PDF_PATH: z.string().default('../../public/assets/Resume.pdf'),
  // env vars are always strings; treat only the literal "true" as true.
  PUBLISH_GIT_ENABLED: z
    .string()
    .optional()
    .transform((v) => v === 'true'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;
