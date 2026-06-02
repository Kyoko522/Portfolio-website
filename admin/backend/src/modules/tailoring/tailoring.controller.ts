import type { Request, Response } from 'express';
import { tailoringService } from './tailoring.service';
import type { SaveTexInput } from './tailoring.schemas';

// Each AI step is keyed by the application id in the URL. Responses always
// return the updated session so the front end can re-render from one payload.
export const tailoringController = {
  async get(req: Request, res: Response) {
    const session = await tailoringService.getSession(req.userId!, req.params.applicationId);
    res.json({ session });
  },

  async assemble(req: Request, res: Response) {
    const session = await tailoringService.assemble(req.userId!, req.params.applicationId);
    res.status(201).json({ session });
  },

  async scan(req: Request, res: Response) {
    res.json({ session: await tailoringService.scan(req.userId!, req.params.applicationId) });
  },

  async operate(req: Request, res: Response) {
    res.json({ session: await tailoringService.operate(req.userId!, req.params.applicationId) });
  },

  async stress(req: Request, res: Response) {
    res.json({ session: await tailoringService.stress(req.userId!, req.params.applicationId) });
  },

  async saveTex(req: Request, res: Response) {
    const { texSource } = req.body as SaveTexInput;
    res.json({ session: await tailoringService.saveTex(req.userId!, req.params.applicationId, texSource) });
  },

  async saveAsVersion(req: Request, res: Response) {
    const version = await tailoringService.saveAsVersion(req.userId!, req.params.applicationId);
    res.status(201).json({ version });
  },
};
