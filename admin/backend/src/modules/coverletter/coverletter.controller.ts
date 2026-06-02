import type { Request, Response } from 'express';
import { coverLetterService } from './coverletter.service';
import type { GenerateInput } from './coverletter.schemas';
import { latexCompiler } from '../../services/latex/latexCompiler';
import { coverLetterToLatex } from '../../services/latex/letterTemplate';

export const coverLetterController = {
  async generate(req: Request, res: Response) {
    const { applicationId, notes } = req.body as GenerateInput;
    const coverLetter = await coverLetterService.generate(req.userId!, applicationId, notes);
    res.status(201).json({ coverLetter });
  },

  // Compile the supplied cover-letter text (whatever is currently in the editor)
  // to a downloadable PDF. Stateless — doesn't require saving first.
  async pdf(req: Request, res: Response) {
    const { content } = req.body as { content: string };
    const pdf = await latexCompiler.compile(coverLetterToLatex(content));
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="cover-letter.pdf"');
    res.send(pdf);
  },

  async update(req: Request, res: Response) {
    const { content } = req.body as { content: string };
    const coverLetter = await coverLetterService.update(req.userId!, req.params.id, content);
    res.json({ coverLetter });
  },

  async remove(req: Request, res: Response) {
    await coverLetterService.remove(req.userId!, req.params.id);
    res.status(204).end();
  },
};
