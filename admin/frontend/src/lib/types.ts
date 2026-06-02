export interface User {
  id: string;
  email: string;
  createdAt?: string;
}

export interface ResumeDraft {
  id: string;
  texSource: string;
  updatedAt: string;
}

// ── Profile bank ──
export interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  current: boolean;
  bullets: string[];
  skills: string[];
  sortOrder: number;
}

export interface ProjectItem {
  id: string;
  name: string;
  description?: string | null;
  bullets: string[];
  skills: string[];
  url?: string | null;
  sortOrder: number;
}

export interface EducationItem {
  id: string;
  school: string;
  degree?: string | null;
  field?: string | null;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  gpa?: string | null;
  notes?: string | null;
  sortOrder: number;
}

export interface SkillItem {
  id: string;
  name: string;
  category?: string | null;
  sortOrder: number;
}

export interface ProfileBank {
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  skills: SkillItem[];
}

// ── Tailoring ──
export type TailoringStage = 'NEW' | 'ASSEMBLED' | 'SCANNED' | 'OPERATED' | 'TESTED';

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

export interface TailoringSession {
  id: string;
  applicationId: string;
  stage: TailoringStage;
  texSource?: string | null;
  scannerReport?: ScannerReport | null;
  stressReport?: StressReport | null;
  matchScore?: number | null;
  finalScore?: number | null;
  model?: string | null;
  updatedAt: string;
}

export interface PublishResult {
  pdfPath: string;
  committed: boolean;
  commit?: string;
  message: string;
  versionId: string;
}

export const APPLICATION_STATUSES = [
  'DRAFT',
  'APPLIED',
  'WAITING',
  'INTERVIEW',
  'OFFER',
  'REJECTED',
  'WITHDRAWN',
] as const;

export type Status = (typeof APPLICATION_STATUSES)[number];

export interface CoverLetter {
  id: string;
  content: string;
  model?: string | null;
  createdAt: string;
  applicationId: string;
}

export interface Application {
  id: string;
  company: string;
  role: string;
  jobUrl?: string | null;
  jobDescription?: string | null;
  status: Status;
  notes?: string | null;
  appliedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  resumeVersionId?: string | null;
  resumeVersion?: { id: string; label?: string | null } | null;
  coverLetters?: CoverLetter[];
}
