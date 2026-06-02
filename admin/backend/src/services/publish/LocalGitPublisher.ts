import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import path from 'node:path';
import { env } from '../../config/env';
import type { PublishService, PublishResult } from './PublishService';

const execFileAsync = promisify(execFile);

// Adapter that publishes by writing the PDF into the portfolio repo and
// (optionally) committing + pushing it so Vercel redeploys. Works when the
// backend runs from inside the repo (locally or on your own server).
export class LocalGitPublisher implements PublishService {
  private readonly pdfPath = path.resolve(process.cwd(), env.PUBLISH_PDF_PATH);
  // Backend runs from admin/backend, so the repo root is two levels up.
  private readonly repoRoot = path.resolve(process.cwd(), '..', '..');

  async publish(pdf: Buffer): Promise<PublishResult> {
    await fs.mkdir(path.dirname(this.pdfPath), { recursive: true });
    await fs.writeFile(this.pdfPath, pdf);

    if (!env.PUBLISH_GIT_ENABLED) {
      return {
        pdfPath: this.pdfPath,
        committed: false,
        message: 'PDF written. Git publishing is disabled (set PUBLISH_GIT_ENABLED=true to commit & push).',
      };
    }

    const relPdf = path.relative(this.repoRoot, this.pdfPath);
    const commitMsg = `resume: publish ${new Date().toISOString().slice(0, 10)}`;

    try {
      // Commit only this file's current state, regardless of anything else
      // staged in the working tree.
      await this.git(['commit', '-m', commitMsg, '--', relPdf]);
    } catch (err) {
      if (isNothingToCommit(err)) {
        return {
          pdfPath: this.pdfPath,
          committed: false,
          message: 'No changes to publish (PDF identical to the live version).',
        };
      }
      throw err;
    }

    const { stdout } = await this.git(['rev-parse', '--short', 'HEAD']);
    await this.git(['push']);

    return {
      pdfPath: this.pdfPath,
      committed: true,
      commit: stdout.trim(),
      message: 'PDF written, committed, and pushed. Vercel will redeploy shortly.',
    };
  }

  private git(args: string[]) {
    return execFileAsync('git', args, { cwd: this.repoRoot });
  }
}

function isNothingToCommit(err: unknown): boolean {
  if (typeof err !== 'object' || err === null) return false;
  const e = err as { stdout?: string; stderr?: string };
  const text = `${e.stdout ?? ''}${e.stderr ?? ''}`;
  return /nothing to commit|no changes added/i.test(text);
}
