import type { Request, Response } from 'express';
import { profileService } from './profile.service';

// Thin HTTP layer over profileService. The collection name is fixed per route,
// so each handler just forwards req.userId + body to the matching service call.
export const profileController = {
  async getFull(req: Request, res: Response) {
    res.json(await profileService.getFullProfile(req.userId!));
  },

  // Experiences
  async createExperience(req: Request, res: Response) {
    res.status(201).json({ item: await profileService.createExperience(req.userId!, req.body) });
  },
  async updateExperience(req: Request, res: Response) {
    res.json({ item: await profileService.updateExperience(req.userId!, req.params.id, req.body) });
  },
  async removeExperience(req: Request, res: Response) {
    await profileService.removeExperience(req.userId!, req.params.id);
    res.status(204).end();
  },

  // Projects
  async createProject(req: Request, res: Response) {
    res.status(201).json({ item: await profileService.createProject(req.userId!, req.body) });
  },
  async updateProject(req: Request, res: Response) {
    res.json({ item: await profileService.updateProject(req.userId!, req.params.id, req.body) });
  },
  async removeProject(req: Request, res: Response) {
    await profileService.removeProject(req.userId!, req.params.id);
    res.status(204).end();
  },

  // Education
  async createEducation(req: Request, res: Response) {
    res.status(201).json({ item: await profileService.createEducation(req.userId!, req.body) });
  },
  async updateEducation(req: Request, res: Response) {
    res.json({ item: await profileService.updateEducation(req.userId!, req.params.id, req.body) });
  },
  async removeEducation(req: Request, res: Response) {
    await profileService.removeEducation(req.userId!, req.params.id);
    res.status(204).end();
  },

  // Skills
  async createSkill(req: Request, res: Response) {
    res.status(201).json({ item: await profileService.createSkill(req.userId!, req.body) });
  },
  async updateSkill(req: Request, res: Response) {
    res.json({ item: await profileService.updateSkill(req.userId!, req.params.id, req.body) });
  },
  async removeSkill(req: Request, res: Response) {
    await profileService.removeSkill(req.userId!, req.params.id);
    res.status(204).end();
  },
};
