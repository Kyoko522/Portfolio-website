import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { BadRequestError, ServiceUnavailableError } from '../../errors/AppError';

const execFileAsync = promisify(execFile);

// First compile may download the LaTeX package bundle, so allow generous time.
const COMPILE_TIMEOUT_MS = 120_000;

export const latexCompiler = {
  // Compiles LaTeX source to a PDF buffer using the Tectonic engine.
  async compile(texSource: string): Promise<Buffer> {
    // Each compile runs in its own throwaway temp dir, cleaned up in `finally`.
    const workDir = await fs.mkdtemp(path.join(os.tmpdir(), 'resume-'));
    const texFile = path.join(workDir, 'resume.tex');
    const pdfFile = path.join(workDir, 'resume.pdf');

    try {
      await fs.writeFile(texFile, texSource, 'utf8');

      // execFile (not exec) + an argument array means no shell is involved, so
      // nothing in the .tex content can be interpreted as a shell command.
      await execFileAsync('tectonic', ['resume.tex', '--outdir', workDir, '--chatter', 'minimal'], {
        cwd: workDir,
        timeout: COMPILE_TIMEOUT_MS,
      });

      return await fs.readFile(pdfFile);
    } catch (err) {
      if (isMissingBinary(err)) {
        throw new ServiceUnavailableError('LaTeX engine (tectonic) is not installed on the server.');
      }
      // Tectonic writes LaTeX errors to stderr — surface them so the editor can
      // show the user exactly what failed.
      throw new BadRequestError(`LaTeX compilation failed:\n${extractStderr(err)}`);
    } finally {
      await fs.rm(workDir, { recursive: true, force: true });
    }
  },
};

function isMissingBinary(err: unknown): boolean {
  return typeof err === 'object' && err !== null && (err as { code?: string }).code === 'ENOENT';
}

function extractStderr(err: unknown): string {
  if (typeof err === 'object' && err !== null) {
    const e = err as { stderr?: string; message?: string };
    return (e.stderr || e.message || 'Unknown error').slice(0, 4000);
  }
  return 'Unknown error';
}
