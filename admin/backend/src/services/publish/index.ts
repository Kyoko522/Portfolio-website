import type { PublishService } from './PublishService';
import { LocalGitPublisher } from './LocalGitPublisher';

let instance: PublishService | null = null;

// Single place that decides which adapter to use. To host the backend off-repo
// later, implement a GitHubApiPublisher and return it here — no caller changes.
export function getPublisher(): PublishService {
  if (!instance) instance = new LocalGitPublisher();
  return instance;
}

export type { PublishService, PublishResult } from './PublishService';
