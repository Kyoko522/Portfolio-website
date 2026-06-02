import { Prisma } from '@prisma/client';
import { prisma } from '../../db/prisma';
import { profileService } from '../profile/profile.service';
import { resumeService } from '../resume/resume.service';
import { BadRequestError, NotFoundError } from '../../errors/AppError';
import {
  assembleResume,
  scanResume,
  operateResume,
  stressTestResume,
  type ProfileBank,
  type ScannerReport,
} from '../../services/ai/resumeTailor';

// Orchestrates the step-by-step tailoring loop for one application. Each AI step
// reads the current TailoringSession, calls the matching engine function, and
// advances `stage` + persists the new working LaTeX / report so the UI can show
// progress and the user can review between steps.

export const tailoringService = {
  // The session for an application (or null if not started yet).
  getSession(userId: string, applicationId: string) {
    return prisma.tailoringSession.findFirst({ where: { userId, applicationId } });
  },

  // STEP 1 — assemble a first draft from the profile bank for this job.
  // Creates the session (or restarts an existing one).
  async assemble(userId: string, applicationId: string) {
    const application = await requireApplicationWithJd(userId, applicationId);
    const profile = await profileService.getFullProfile(userId);
    if (isEmptyProfile(profile)) {
      throw new BadRequestError('Your profile bank is empty. Add experience, projects, and skills before tailoring.');
    }
    const existingResume = await safeDraftTex(userId);

    const { texSource, model } = await assembleResume({
      profile: profile as ProfileBank,
      existingResume,
      job: jobContext(application),
    });

    return prisma.tailoringSession.upsert({
      where: { applicationId },
      create: { userId, applicationId, stage: 'ASSEMBLED', texSource, model },
      // Restarting clears prior reports/scores so stale data never lingers.
      update: { stage: 'ASSEMBLED', texSource, model, scannerReport: Prisma.DbNull, stressReport: Prisma.DbNull, matchScore: null, finalScore: null },
    });
  },

  // STEP 2 — Scanner: diagnose the current draft.
  async scan(userId: string, applicationId: string) {
    const { session, application } = await requireSessionWithTex(userId, applicationId);
    const { report, matchScore, model } = await scanResume({
      texSource: session.texSource!,
      job: jobContext(application),
    });
    return prisma.tailoringSession.update({
      where: { id: session.id },
      data: { stage: 'SCANNED', scannerReport: report as unknown as Prisma.InputJsonValue, matchScore, model },
    });
  },

  // STEP 3 — Surgeon: rewrite using the Scanner findings.
  async operate(userId: string, applicationId: string) {
    const { session, application } = await requireSessionWithTex(userId, applicationId);
    if (!session.scannerReport) {
      throw new BadRequestError('Run the Scanner before the Surgeon — the rewrite needs the diagnosis.');
    }
    const profile = await profileService.getFullProfile(userId);
    const { texSource, model } = await operateResume({
      texSource: session.texSource!,
      scannerReport: session.scannerReport as unknown as ScannerReport,
      profile: profile as ProfileBank,
      job: jobContext(application),
    });
    return prisma.tailoringSession.update({
      where: { id: session.id },
      data: { stage: 'OPERATED', texSource, model },
    });
  },

  // STEP 4 — Stress Test: ATS re-scan + 7-second skim, then final edits.
  async stress(userId: string, applicationId: string) {
    const { session, application } = await requireSessionWithTex(userId, applicationId);
    const { texSource, report, finalScore, model } = await stressTestResume({
      texSource: session.texSource!,
      job: jobContext(application),
      previousScore: session.matchScore ?? undefined,
    });
    return prisma.tailoringSession.update({
      where: { id: session.id },
      data: { stage: 'TESTED', texSource, stressReport: report as unknown as Prisma.InputJsonValue, finalScore, model },
    });
  },

  // Persist a manual edit to the working résumé between steps.
  async saveTex(userId: string, applicationId: string, texSource: string) {
    const { session } = await requireSessionWithTex(userId, applicationId, false);
    return prisma.tailoringSession.update({ where: { id: session.id }, data: { texSource } });
  },

  // Snapshot the finished résumé as a ResumeVersion and link it to the
  // application — mirrors how cover letters record "what was used".
  async saveAsVersion(userId: string, applicationId: string) {
    const { session, application } = await requireSessionWithTex(userId, applicationId);
    const version = await prisma.resumeVersion.create({
      data: {
        userId,
        label: `Tailored for ${application.company} — ${application.role}`,
        texSource: session.texSource!,
        isDraft: false,
        published: false,
      },
    });
    await prisma.application.update({ where: { id: applicationId }, data: { resumeVersionId: version.id } });
    return version;
  },
};

// ── Helpers ──

function jobContext(app: { jobDescription: string | null; company: string; role: string }) {
  return { jobDescription: app.jobDescription ?? '', company: app.company, role: app.role };
}

async function requireApplicationWithJd(userId: string, applicationId: string) {
  const application = await prisma.application.findFirst({ where: { id: applicationId, userId } });
  if (!application) throw new NotFoundError('Application not found');
  if (!application.jobDescription?.trim()) {
    throw new BadRequestError('Add a job description to this application before tailoring a résumé.');
  }
  return application;
}

// Loads the session + its application, asserting there's working LaTeX to act on.
async function requireSessionWithTex(userId: string, applicationId: string, needsTex = true) {
  const session = await prisma.tailoringSession.findFirst({ where: { userId, applicationId } });
  if (!session) throw new BadRequestError('Start by assembling a résumé for this application.');
  if (needsTex && !session.texSource) throw new BadRequestError('No working résumé yet — assemble one first.');
  const application = await requireApplicationWithJd(userId, applicationId);
  return { session, application };
}

async function safeDraftTex(userId: string): Promise<string | undefined> {
  try {
    return (await resumeService.getDraft(userId)).texSource;
  } catch {
    return undefined; // no draft seeded yet — assembly works from the bank alone
  }
}

function isEmptyProfile(p: { experiences: unknown[]; projects: unknown[]; education: unknown[]; skills: unknown[] }) {
  return !p.experiences.length && !p.projects.length && !p.education.length && !p.skills.length;
}
