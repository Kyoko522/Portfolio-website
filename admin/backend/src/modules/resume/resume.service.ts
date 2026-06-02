import { prisma } from '../../db/prisma';
import { latexCompiler } from '../../services/latex/latexCompiler';
import { getPublisher } from '../../services/publish';
import { NotFoundError } from '../../errors/AppError';

export const resumeService = {
  // The working draft is the user's single `isDraft` row (seeded on first run).
  async getDraft(userId: string) {
    const draft = await prisma.resumeVersion.findFirst({
      where: { userId, isDraft: true },
      orderBy: { updatedAt: 'desc' },
    });
    if (!draft) throw new NotFoundError('No resume draft found');
    return draft;
  },

  async saveDraft(userId: string, texSource: string) {
    const draft = await this.getDraft(userId);
    return prisma.resumeVersion.update({
      where: { id: draft.id },
      data: { texSource },
    });
  },

  // Compile arbitrary source for preview — does not touch the DB or the site.
  compile(texSource: string) {
    return latexCompiler.compile(texSource);
  },

  // Compile the current draft, push the PDF to the public site, and snapshot a
  // published version for history.
  async publish(userId: string) {
    const draft = await this.getDraft(userId);
    const pdf = await latexCompiler.compile(draft.texSource);
    const result = await getPublisher().publish(pdf);

    const snapshot = await prisma.resumeVersion.create({
      data: {
        userId,
        label: `Published ${new Date().toISOString()}`,
        texSource: draft.texSource,
        pdfPath: result.pdfPath,
        published: true,
        isDraft: false,
      },
    });

    return { ...result, versionId: snapshot.id };
  },

  // Freeze the current draft as a non-draft version — used to record exactly
  // which résumé was used for an application/cover letter.
  async snapshotCurrentDraft(userId: string, label: string) {
    const draft = await this.getDraft(userId);
    return prisma.resumeVersion.create({
      data: { userId, label, texSource: draft.texSource, isDraft: false, published: false },
    });
  },

  listVersions(userId: string) {
    return prisma.resumeVersion.findMany({
      where: { userId, published: true },
      orderBy: { createdAt: 'desc' },
      select: { id: true, label: true, pdfPath: true, createdAt: true },
    });
  },
};
