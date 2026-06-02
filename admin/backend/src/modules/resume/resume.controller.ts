import type { Request, Response } from 'express';
import { resumeService } from './resume.service';
import type { SaveDraftInput, CompileInput } from './resume.schemas';

export const resumeController = {
  async getDraft(req: Request, res: Response) {
    const draft = await resumeService.getDraft(req.userId!);
    res.json({ id: draft.id, texSource: draft.texSource, updatedAt: draft.updatedAt });
  },

  async saveDraft(req: Request, res: Response) {
    const { texSource } = req.body as SaveDraftInput;
    const draft = await resumeService.saveDraft(req.userId!, texSource);
    res.json({ id: draft.id, updatedAt: draft.updatedAt });
  },

  async compile(req: Request, res: Response) {
    const { texSource } = req.body as CompileInput;
    const pdf = await resumeService.compile(texSource);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="resume-preview.pdf"');
    res.send(pdf);
  },

  async publish(req: Request, res: Response) {
    const result = await resumeService.publish(req.userId!);
    res.json(result);
  },

  async versions(req: Request, res: Response) {
    res.json({ versions: await resumeService.listVersions(req.userId!) });
  },
};
