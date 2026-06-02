import type { Request, Response } from 'express';
import { applicationsService } from './applications.service';
import type { CreateApplicationInput, UpdateApplicationInput } from './applications.schemas';

export const applicationsController = {
  async list(req: Request, res: Response) {
    res.json({ applications: await applicationsService.list(req.userId!) });
  },

  async get(req: Request, res: Response) {
    res.json({ application: await applicationsService.get(req.userId!, req.params.id) });
  },

  async create(req: Request, res: Response) {
    const application = await applicationsService.create(req.userId!, req.body as CreateApplicationInput);
    res.status(201).json({ application });
  },

  async update(req: Request, res: Response) {
    const application = await applicationsService.update(
      req.userId!,
      req.params.id,
      req.body as UpdateApplicationInput,
    );
    res.json({ application });
  },

  async updateStatus(req: Request, res: Response) {
    const { status } = req.body as { status: string };
    const application = await applicationsService.updateStatus(req.userId!, req.params.id, status);
    res.json({ application });
  },

  async remove(req: Request, res: Response) {
    await applicationsService.remove(req.userId!, req.params.id);
    res.status(204).end();
  },
};
