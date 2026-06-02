import Anthropic from '@anthropic-ai/sdk';
import { getAnthropic } from './anthropic';
import { env } from '../../config/env';
import { AppError } from '../../errors/AppError';

interface GenerateInput {
  resumeText: string;
  jobDescription: string;
  company?: string;
  role?: string;
  notes?: string;
}

const SYSTEM_INSTRUCTIONS = `You are an expert career writer composing a cover letter on behalf of the candidate whose resume is provided.

Rules:
- Ground every claim strictly in the resume. Never invent employers, titles, dates, degrees, or metrics.
- Tailor the letter to the specific job description: surface the candidate's most relevant experience and mirror the role's priorities and keywords, but only where the resume genuinely supports them.
- Tone: professional, confident, and concise. 3–4 short paragraphs, roughly 250–350 words.
- Open with a specific hook tied to the role or company — never "I am writing to apply for...".
- End with a warm, direct call to action.
- Output ONLY the body of the cover letter as plain text. No markdown, no salutation/signature placeholders unless a needed detail is genuinely missing, and no commentary about the letter.
- Make sure to have the same heading as the resume including the candidate's name and contact information and the next line will proceed with Dear [Company Name] or somehting along these lines.
- The first line of the cover letter should be a hook that is specific to the role, and not a generic opening. For example, if the job description emphasizes innovation and the candidate has experience leading a project that resulted in a novel solution, the opening could be: "When I led my team to develop an AI-driven analytics tool that increased our data processing efficiency by 30%, I discovered my passion for driving innovation in tech — a passion that draws me to [Company Name]'s commitment to pushing the boundaries of what's possible. also make sure that you state your intentions"`;

// Generates a tailored cover letter. The instructions + resume form a stable,
// cacheable prefix (cache_control on the last system block); the per-application
// job description is the volatile input and goes in the user turn after it. So
// generating several letters against the same resume reuses the cached prefix.
export async function generateCoverLetter(
  input: GenerateInput,
): Promise<{ content: string; model: string }> {
  const client = getAnthropic();
  const model = env.COVER_LETTER_MODEL;

  try {
    const response = await client.messages.create({
      model,
      max_tokens: 16000,
      thinking: { type: 'adaptive' },
      system: [
        { type: 'text', text: SYSTEM_INSTRUCTIONS },
        {
          type: 'text',
          text: `CANDIDATE RÉSUMÉ (LaTeX source — read it for facts, ignore the formatting commands):\n\n${input.resumeText}`,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: buildUserPrompt(input) }],
    });

    const content = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim();

    if (!content) {
      throw new AppError(502, 'The model returned an empty cover letter.', 'AI_EMPTY_RESPONSE');
    }

    return { content, model };
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      throw new AppError(502, `Claude API error: ${err.message}`, 'AI_ERROR');
    }
    throw err;
  }
}

function buildUserPrompt(input: GenerateInput): string {
  return [
    'Write a cover letter for the following role.',
    input.company ? `Company: ${input.company}` : '',
    input.role ? `Role: ${input.role}` : '',
    input.notes ? `Extra guidance from the candidate: ${input.notes}` : '',
    '',
    'JOB DESCRIPTION:',
    input.jobDescription,
  ]
    .filter(Boolean)
    .join('\n');
}
