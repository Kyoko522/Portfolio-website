import { prisma } from '../../db/prisma';
import { NotFoundError } from '../../errors/AppError';

// CRUD for the four profile-bank collections, plus an aggregator the tailoring
// engine uses to read the entire pool at once. Every query is scoped by userId
// so one user can never touch another's data.

const listOrder = [{ sortOrder: 'asc' as const }, { createdAt: 'asc' as const }];

export const profileService = {
  // The whole bank in one shot — what the AI sees when assembling a résumé.
  async getFullProfile(userId: string) {
    const [experiences, projects, education, skills] = await Promise.all([
      prisma.experienceItem.findMany({ where: { userId }, orderBy: listOrder }),
      prisma.projectItem.findMany({ where: { userId }, orderBy: listOrder }),
      prisma.educationItem.findMany({ where: { userId }, orderBy: listOrder }),
      prisma.skillItem.findMany({ where: { userId }, orderBy: listOrder }),
    ]);
    return { experiences, projects, education, skills };
  },

  // ── Experiences ──
  listExperiences(userId: string) {
    return prisma.experienceItem.findMany({ where: { userId }, orderBy: listOrder });
  },
  createExperience(userId: string, data: object) {
    return prisma.experienceItem.create({ data: { ...data, userId } as never });
  },
  async updateExperience(userId: string, id: string, data: object) {
    await ensureOwned(prisma.experienceItem, userId, id);
    return prisma.experienceItem.update({ where: { id }, data: data as never });
  },
  async removeExperience(userId: string, id: string) {
    await ensureOwned(prisma.experienceItem, userId, id);
    await prisma.experienceItem.delete({ where: { id } });
  },

  // ── Projects ──
  listProjects(userId: string) {
    return prisma.projectItem.findMany({ where: { userId }, orderBy: listOrder });
  },
  createProject(userId: string, data: object) {
    return prisma.projectItem.create({ data: { ...normalizeUrl(data), userId } as never });
  },
  async updateProject(userId: string, id: string, data: object) {
    await ensureOwned(prisma.projectItem, userId, id);
    return prisma.projectItem.update({ where: { id }, data: normalizeUrl(data) as never });
  },
  async removeProject(userId: string, id: string) {
    await ensureOwned(prisma.projectItem, userId, id);
    await prisma.projectItem.delete({ where: { id } });
  },

  // ── Education ──
  listEducation(userId: string) {
    return prisma.educationItem.findMany({ where: { userId }, orderBy: listOrder });
  },
  createEducation(userId: string, data: object) {
    return prisma.educationItem.create({ data: { ...data, userId } as never });
  },
  async updateEducation(userId: string, id: string, data: object) {
    await ensureOwned(prisma.educationItem, userId, id);
    return prisma.educationItem.update({ where: { id }, data: data as never });
  },
  async removeEducation(userId: string, id: string) {
    await ensureOwned(prisma.educationItem, userId, id);
    await prisma.educationItem.delete({ where: { id } });
  },

  // ── Skills ──
  listSkills(userId: string) {
    return prisma.skillItem.findMany({ where: { userId }, orderBy: listOrder });
  },
  createSkill(userId: string, data: object) {
    return prisma.skillItem.create({ data: { ...data, userId } as never });
  },
  async updateSkill(userId: string, id: string, data: object) {
    await ensureOwned(prisma.skillItem, userId, id);
    return prisma.skillItem.update({ where: { id }, data: data as never });
  },
  async removeSkill(userId: string, id: string) {
    await ensureOwned(prisma.skillItem, userId, id);
    await prisma.skillItem.delete({ where: { id } });
  },
};

// Treat empty-string URL as "no URL" so the optional Prisma column stays null.
function normalizeUrl(data: object): object {
  if ('url' in data && (data as { url?: string }).url === '') {
    return { ...data, url: null };
  }
  return data;
}

// Confirms a row exists AND belongs to this user before an update/delete, so a
// guessed id can't mutate someone else's record. `delegate` is any Prisma model
// client exposing findFirst — typed loosely on purpose to stay generic.
async function ensureOwned(
  delegate: { findFirst: (args: object) => Promise<{ id: string } | null> },
  userId: string,
  id: string,
) {
  const found = await delegate.findFirst({ where: { id, userId }, select: { id: true } });
  if (!found) throw new NotFoundError('Item not found');
}
