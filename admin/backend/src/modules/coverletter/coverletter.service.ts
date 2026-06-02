import { prisma } from '../../db/prisma';
import { resumeService } from '../resume/resume.service';
import { generateCoverLetter } from '../../services/ai/coverLetter';
import { BadRequestError, NotFoundError } from '../../errors/AppError';

export const coverLetterService = {
  // Generate a cover letter from an application's job description + the user's
  // current résumé draft. Snapshots the résumé used and links it to both the
  // application and the cover letter, so the record of "what was used" survives
  // later résumé edits.
  async generate(userId: string, applicationId: string, notes?: string) {
    const application = await prisma.application.findFirst({ where: { id: applicationId, userId } });
    if (!application) throw new NotFoundError('Application not found');
    if (!application.jobDescription) {
      throw new BadRequestError('Add a job description to this application before generating a cover letter.');
    }

    const draft = await resumeService.getDraft(userId);

    const { content, model } = await generateCoverLetter({
      resumeText: draft.texSource,
      jobDescription: application.jobDescription,
      company: application.company,
      role: application.role,
      notes,
    });

    const snapshot = await prisma.resumeVersion.create({
      data: {
        userId,
        label: `Used for ${application.company} — ${application.role}`,
        texSource: draft.texSource,
        isDraft: false,
        published: false,
      },
    });

    await prisma.application.update({
      where: { id: application.id },
      data: { resumeVersionId: snapshot.id },
    });

    return prisma.coverLetter.create({
      data: { applicationId, content, model, resumeVersionId: snapshot.id },
    });
  },

  async update(userId: string, id: string, content: string) {
    await this.ensureOwned(userId, id);
    return prisma.coverLetter.update({ where: { id }, data: { content } });
  },

  async remove(userId: string, id: string) {
    await this.ensureOwned(userId, id);
    await prisma.coverLetter.delete({ where: { id } });
  },

  // A cover letter is owned by the user who owns its parent application.
  async ensureOwned(userId: string, id: string) {
    const found = await prisma.coverLetter.findFirst({
      where: { id, application: { userId } },
      select: { id: true },
    });
    if (!found) throw new NotFoundError('Cover letter not found');
  },
};
