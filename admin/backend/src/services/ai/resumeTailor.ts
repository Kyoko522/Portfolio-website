import Anthropic from '@anthropic-ai/sdk';
import { getAnthropic } from './anthropic';
import { env } from '../../config/env';
import { AppError } from '../../errors/AppError';
import { RESUME_PREAMBLE, RESUME_DOC_END, RESUME_EXAMPLE } from '../latex/resumeTemplate';

// ─────────────────────────────────────────────────────────────────────────────
// The "Make Your Résumé Unrejectable" pipeline, as four backend steps:
//   assemble  → pick best-fit material from the profile bank into ATS LaTeX
//   scan      → Scanner: diagnose (match score, missing keywords, red flags)
//   operate   → Surgeon: rewrite bullets (XYZ formula), inject keywords, fix flags
//   stress    → Stress Test: ATS re-scan + 7-second skim, rewrite skipped parts
// Each is one Claude call. Diagnostic steps return structured JSON via a forced
// tool call (guaranteed shape, no fragile parsing); rewrite steps return LaTeX.
// ─────────────────────────────────────────────────────────────────────────────

export interface ProfileBank {
  experiences: Array<{
    company: string; title: string; location?: string | null;
    startDate?: string | null; endDate?: string | null; current: boolean;
    bullets: string[]; skills: string[];
  }>;
  projects: Array<{ name: string; description?: string | null; bullets: string[]; skills: string[]; url?: string | null }>;
  education: Array<{
    school: string; degree?: string | null; field?: string | null; location?: string | null;
    startDate?: string | null; endDate?: string | null; gpa?: string | null; notes?: string | null;
  }>;
  skills: Array<{ name: string; category?: string | null }>;
}

export interface ScannerReport {
  matchScore: number;
  missingKeywords: Array<{ keyword: string; placement: string }>;
  redFlags: string[];
  sectionRatings: Array<{ section: string; score: number; notes: string }>;
  topPriorityChange: string;
}

export interface StressReport {
  atsScore: number;
  scoreImproved: boolean;
  formattingIssues: string[];
  keywordsStillMissing: string[];
  skippedSections: string[];
  repetitiveBullets: string[];
  stopTheScroll: string;
}

interface JobContext {
  jobDescription: string;
  company?: string;
  role?: string;
}

const MODEL = () => env.RESUME_MODEL;
const MAX_TOKENS = 16000;

const LATEX_RULES = `LaTeX output rules (follow exactly):
- Keep the preamble EXACTLY as provided. Do not add, remove, or reorder any \\usepackage or \\newcommand lines. Output the full document including the preamble and \\end{document}.
- Single column only. No tabular, no multicol, no minipage side-by-side, no graphics.
- Use the provided helper commands: \\name{...} for the candidate name, \\contact{...} for the contact line.
- Sections: use \\section{...}. Typical order: Summary, Skills, Experience, Projects, Education (drop any section with no content).
- Bullets go inside itemize. Right-align dates/links with \\hfill.
- Escape LaTeX specials in all text: & % # _ $ { } become \\& \\% \\# \\_ \\$ \\{ \\} and ~ ^ become \\textasciitilde{} \\textasciicircum{}.
- Output ONLY the LaTeX source. No markdown fences, no commentary before or after.`;

// ── Public API ───────────────────────────────────────────────────────────────

// STEP 1 — Assemble. Selects the strongest-fitting subset of the profile bank
// for this job and produces a first-draft ATS-safe résumé. This is the "AI picks
// the best projects/experience" step.
export async function assembleResume(input: {
  profile: ProfileBank;
  existingResume?: string;
  job: JobContext;
}): Promise<{ texSource: string; model: string }> {
  const system = `You are an expert résumé writer and recruiter. You build single-page, ATS-optimized résumés tailored to a specific job.

Your job: from the candidate's FULL profile bank, SELECT the experiences, projects, and skills that best match this job description, ORDER them by relevance, and assemble a clean one-page résumé.

Selection rules:
- Prioritize material whose skills/keywords overlap the job description. A strong, relevant project beats a weak, irrelevant job.
- Aim for one page. Include the 2-4 most relevant experiences and 2-3 most relevant projects; you may omit weak/irrelevant items entirely.
- Ground everything strictly in the provided facts. Never invent employers, titles, dates, metrics, or skills the candidate didn't list.
- Take the candidate's name and contact details from the existing résumé if provided.

${LATEX_RULES}`;

  const user = `PREAMBLE (use verbatim):
${RESUME_PREAMBLE}
...your assembled body here...
${RESUME_DOC_END}

EXAMPLE BODY (for structure/commands only — do not copy its content):
${RESUME_EXAMPLE}

CANDIDATE PROFILE BANK:
${serializeProfile(input.profile)}

${input.existingResume ? `EXISTING RÉSUMÉ (for name + contact details, and any facts not in the bank):\n${input.existingResume}\n` : ''}
${jobBlock(input.job)}

Assemble the tailored résumé now.`;

  return { texSource: await generateLatex(system, user), model: MODEL() };
}

// STEP 2 — Scanner. Diagnoses the current résumé against the job. Returns a
// structured report (match score, missing keywords + placement, red flags,
// section ratings, single highest-impact fix).
export async function scanResume(input: {
  texSource: string;
  job: JobContext;
}): Promise<{ report: ScannerReport; matchScore: number; model: string }> {
  const system = `Act as a senior recruiter at the hiring company who has filled this exact role for years. You know precisely what makes a résumé stand out versus get tossed by the ATS and by a human skim. Be brutally honest and specific.`;

  const user = `Analyze this résumé against the job description.

RÉSUMÉ (LaTeX — read for content, ignore formatting commands):
${input.texSource}

${jobBlock(input.job)}

Produce: a 0-100 match score; the top 10 job-description keywords missing from the résumé with where each should naturally appear; the 5 biggest red flags a hiring manager spots in the first 10 seconds; a 1-10 rating of each section (summary, skills, experience, projects, education) with notes; and the single highest-impact change to get past the ATS.`;

  const report = await generateJson<ScannerReport>(system, user, SCANNER_TOOL);
  return { report, matchScore: report.matchScore, model: MODEL() };
}

// STEP 3 — Surgeon. Rewrites the résumé using the Scanner's findings: every
// experience/project bullet becomes XYZ-formula ("Accomplished X measured by Y
// by doing Z"), missing keywords are woven in naturally, red flags fixed, and
// the summary + skills are rewritten for this role. Returns updated LaTeX.
export async function operateResume(input: {
  texSource: string;
  scannerReport: ScannerReport;
  profile: ProfileBank;
  job: JobContext;
}): Promise<{ texSource: string; model: string }> {
  const system = `You are an expert résumé editor. You rewrite résumés using the Google XYZ formula — "Accomplished [X] as measured by [Y] by doing [Z]" — so every bullet has a concrete accomplishment, a measurable result, and how it was achieved.

Hard rules:
- Do NOT invent numbers or metrics. Use only metrics present in the candidate's facts. If a bullet has no real metric, make it specific and outcome-focused without fabricating a figure.
- Weave in the missing keywords from the Scanner naturally — never keyword-stuff.
- Fix every red flag the Scanner identified. Keep the candidate's authentic voice; avoid corporate template language.
- Rewrite the Summary as a 3-sentence pitch (who they are, what they do best, why they fit this role) including the top keywords naturally.
- Rewrite Skills to match the job's technical + soft skills; drop irrelevant ones, add missing ones the candidate actually has.

${LATEX_RULES}`;

  const user = `Rewrite the entire résumé below per the rules. Keep it one page.

CURRENT RÉSUMÉ (LaTeX):
${input.texSource}

SCANNER FINDINGS (address all of these):
${JSON.stringify(input.scannerReport, null, 2)}

CANDIDATE FACTS (the only source of truth for metrics/claims):
${serializeProfile(input.profile)}

${jobBlock(input.job)}

Output the complete rewritten résumé as LaTeX.`;

  return { texSource: await generateLatex(system, user), model: MODEL() };
}

// STEP 4 — Stress Test. Two passes in one: (a) ATS re-scan — formatting issues,
// keyword coverage, a fresh match score; (b) a tired hiring manager's 7-second
// skim — which sections get skipped, which bullets blend together. Rewrites the
// skipped/weak sections so the first words of each bullet stop the scroll.
// Returns the final LaTeX plus the report.
export async function stressTestResume(input: {
  texSource: string;
  job: JobContext;
  previousScore?: number;
}): Promise<{ texSource: string; report: StressReport; finalScore: number; model: string }> {
  // 4a — structured ATS + skim diagnosis.
  const diagSystem = `You do two things at once: (1) act as an ATS parser checking a résumé for formatting that confuses parsers (tables, columns, odd characters) and for keyword coverage against the job; (2) act as a hiring manager who has read résumés for 8 hours, has 200 left, and spends 7 seconds skimming each one.`;
  const diagUser = `Stress-test this résumé.

RÉSUMÉ (LaTeX):
${input.texSource}

${jobBlock(input.job)}
${input.previousScore != null ? `\nPrevious match score: ${input.previousScore}/100.` : ''}

Give a fresh 0-100 ATS match score and whether it improved; any formatting issues that could break an ATS parser; job keywords still missing; with 7-second eyes, which sections you'd skip, which bullets blend together, and the one thing that would make you stop and actually read.`;

  const report = await generateJson<StressReport>(diagSystem, diagUser, STRESS_TOOL);

  // 4b — apply the fixes the diagnosis surfaced.
  const fixSystem = `You are an expert résumé editor making targeted final edits so nothing gets skipped in a 7-second skim. Make the first 1-2 words of each bullet the most compelling part (lead with the accomplishment). Do not fabricate metrics.

${LATEX_RULES}`;
  const fixUser = `Apply these stress-test findings to the résumé, rewriting any section that would get skipped and any repetitive bullets. Keep everything else intact and keep it one page.

CURRENT RÉSUMÉ (LaTeX):
${input.texSource}

STRESS-TEST FINDINGS:
${JSON.stringify(report, null, 2)}

Output the complete final résumé as LaTeX.`;

  const texSource = await generateLatex(fixSystem, fixUser);
  return { texSource, report, finalScore: report.atsScore, model: MODEL() };
}

// ── Internals ────────────────────────────────────────────────────────────────

function jobBlock(job: JobContext): string {
  return [
    job.company ? `Company: ${job.company}` : '',
    job.role ? `Role: ${job.role}` : '',
    '',
    'JOB DESCRIPTION:',
    job.jobDescription,
  ]
    .filter(Boolean)
    .join('\n');
}

// Render the structured bank as readable text for the model.
function serializeProfile(p: ProfileBank): string {
  const parts: string[] = [];

  if (p.experiences.length) {
    parts.push('## EXPERIENCE');
    for (const e of p.experiences) {
      const dates = [e.startDate, e.current ? 'Present' : e.endDate].filter(Boolean).join(' – ');
      parts.push(`- ${e.title} @ ${e.company}${e.location ? `, ${e.location}` : ''}${dates ? ` (${dates})` : ''}`);
      if (e.skills.length) parts.push(`  Skills: ${e.skills.join(', ')}`);
      for (const b of e.bullets) parts.push(`  • ${b}`);
    }
  }

  if (p.projects.length) {
    parts.push('\n## PROJECTS');
    for (const pr of p.projects) {
      parts.push(`- ${pr.name}${pr.url ? ` (${pr.url})` : ''}${pr.description ? ` — ${pr.description}` : ''}`);
      if (pr.skills.length) parts.push(`  Skills: ${pr.skills.join(', ')}`);
      for (const b of pr.bullets) parts.push(`  • ${b}`);
    }
  }

  if (p.education.length) {
    parts.push('\n## EDUCATION');
    for (const ed of p.education) {
      const dates = [ed.startDate, ed.endDate].filter(Boolean).join(' – ');
      parts.push(`- ${[ed.degree, ed.field].filter(Boolean).join(', ')} @ ${ed.school}${dates ? ` (${dates})` : ''}${ed.gpa ? ` — GPA ${ed.gpa}` : ''}`);
      if (ed.notes) parts.push(`  ${ed.notes}`);
    }
  }

  if (p.skills.length) {
    parts.push('\n## SKILLS');
    const byCat = new Map<string, string[]>();
    for (const s of p.skills) {
      const cat = s.category || 'General';
      byCat.set(cat, [...(byCat.get(cat) ?? []), s.name]);
    }
    for (const [cat, names] of byCat) parts.push(`- ${cat}: ${names.join(', ')}`);
  }

  return parts.join('\n') || '(empty profile bank)';
}

// Free-form LaTeX generation. Adaptive thinking improves quality for the
// rewrite/assembly steps. Strips accidental markdown fences if the model adds them.
async function generateLatex(system: string, user: string): Promise<string> {
  const client = getAnthropic();
  try {
    const res = await client.messages.create({
      model: MODEL(),
      max_tokens: MAX_TOKENS,
      thinking: { type: 'adaptive' },
      system,
      messages: [{ role: 'user', content: user }],
    });
    const text = res.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();
    if (!text) throw new AppError(502, 'The model returned an empty résumé.', 'AI_EMPTY_RESPONSE');
    return stripFences(text);
  } catch (err) {
    throw wrap(err);
  }
}

// Structured generation via a forced tool call — guarantees a JSON object in the
// exact shape, so there's no brittle parsing of prose. (No thinking: forced tool
// use is the goal here, and it keeps the call fast.)
async function generateJson<T>(system: string, user: string, tool: Anthropic.Tool): Promise<T> {
  const client = getAnthropic();
  try {
    const res = await client.messages.create({
      model: MODEL(),
      max_tokens: MAX_TOKENS,
      system,
      tools: [tool],
      tool_choice: { type: 'tool', name: tool.name },
      messages: [{ role: 'user', content: user }],
    });
    const block = res.content.find((b): b is Anthropic.ToolUseBlock => b.type === 'tool_use');
    if (!block) throw new AppError(502, 'The model did not return a structured report.', 'AI_EMPTY_RESPONSE');
    return block.input as T;
  } catch (err) {
    throw wrap(err);
  }
}

function stripFences(text: string): string {
  const fence = text.match(/```(?:latex|tex)?\s*([\s\S]*?)```/i);
  return (fence ? fence[1] : text).trim();
}

function wrap(err: unknown): unknown {
  if (err instanceof Anthropic.APIError) {
    return new AppError(502, `Claude API error: ${err.message}`, 'AI_ERROR');
  }
  return err;
}

// ── Tool schemas (structured-output contracts) ───────────────────────────────

const SCANNER_TOOL: Anthropic.Tool = {
  name: 'report_scan',
  description: 'Report the résumé-vs-job diagnosis.',
  input_schema: {
    type: 'object',
    properties: {
      matchScore: { type: 'integer', minimum: 0, maximum: 100 },
      missingKeywords: {
        type: 'array',
        items: {
          type: 'object',
          properties: { keyword: { type: 'string' }, placement: { type: 'string' } },
          required: ['keyword', 'placement'],
        },
      },
      redFlags: { type: 'array', items: { type: 'string' } },
      sectionRatings: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            section: { type: 'string' },
            score: { type: 'integer', minimum: 1, maximum: 10 },
            notes: { type: 'string' },
          },
          required: ['section', 'score', 'notes'],
        },
      },
      topPriorityChange: { type: 'string' },
    },
    required: ['matchScore', 'missingKeywords', 'redFlags', 'sectionRatings', 'topPriorityChange'],
  },
};

const STRESS_TOOL: Anthropic.Tool = {
  name: 'report_stress_test',
  description: 'Report the ATS re-scan and 7-second-skim findings.',
  input_schema: {
    type: 'object',
    properties: {
      atsScore: { type: 'integer', minimum: 0, maximum: 100 },
      scoreImproved: { type: 'boolean' },
      formattingIssues: { type: 'array', items: { type: 'string' } },
      keywordsStillMissing: { type: 'array', items: { type: 'string' } },
      skippedSections: { type: 'array', items: { type: 'string' } },
      repetitiveBullets: { type: 'array', items: { type: 'string' } },
      stopTheScroll: { type: 'string' },
    },
    required: ['atsScore', 'scoreImproved', 'formattingIssues', 'keywordsStillMissing', 'skippedSections', 'repetitiveBullets', 'stopTheScroll'],
  },
};
