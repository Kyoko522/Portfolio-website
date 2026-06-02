import { prisma } from '../../db/prisma';
import { NotFoundError } from '../../errors/AppError';
import type { CreateApplicationInput, UpdateApplicationInput } from './applications.schemas';

export const applicationsService = {
  list(userId: string) {
    return prisma.application.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      include: {
        resumeVersion: { select: { id: true, label: true } },
        coverLetters: {
          select: { id: true, content: true, model: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  },

  async get(userId: string, id: string) {
    const application = await prisma.application.findFirst({
      where: { id, userId },
      include: {
        resumeVersion: { select: { id: true, label: true } },
        coverLetters: true,
      },
    });
    if (!application) throw new NotFoundError('Application not found');
    return application;
  },

  create(userId: string, data: CreateApplicationInput) {
    return prisma.application.create({ data: { ...data, userId } });
  },

  async update(userId: string, id: string, data: UpdateApplicationInput) {
    await this.ensureOwned(userId, id);
    return prisma.application.update({ where: { id }, data });
  },

  async updateStatus(userId: string, id: string, status: string) {
    await this.ensureOwned(userId, id);
    return prisma.application.update({ where: { id }, data: { status } });
  },

  async remove(userId: string, id: string) {
    await this.ensureOwned(userId, id);
    await prisma.application.delete({ where: { id } });
  },

  async ensureOwned(userId: string, id: string) {
    const count = await prisma.application.count({ where: { id, userId } });
    if (count === 0) throw new NotFoundError('Application not found');
  },
};
