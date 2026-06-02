import Anthropic from '@anthropic-ai/sdk';
import { env } from '../../config/env';
import { ServiceUnavailableError } from '../../errors/AppError';

let client: Anthropic | null = null;

// Lazily construct a single Anthropic client. Fails clearly if the key is
// missing rather than crashing deep inside a request.
export function getAnthropic(): Anthropic {
  if (!env.ANTHROPIC_API_KEY) {
    throw new ServiceUnavailableError(
      'ANTHROPIC_API_KEY is not configured. Add it to the backend .env to enable cover-letter generation.',
    );
  }
  if (!client) {
    client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  }
  return client;
}
