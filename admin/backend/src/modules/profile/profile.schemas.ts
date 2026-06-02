import { z } from 'zod';

// The profile bank is four independent collections. Each has a create schema;
// updates reuse the same shape with every field optional (PATCH semantics).

const bulletList = z.array(z.string().min(1).max(600)).max(20).default([]);
const skillList = z.array(z.string().min(1).max(80)).max(40).default([]);

export const experienceSchema = z.object({
  company: z.string().min(1).max(160),
  title: z.string().min(1).max(160),
  location: z.string().max(160).optional(),
  startDate: z.string().max(40).optional(),
  endDate: z.string().max(40).optional(),
  current: z.boolean().default(false),
  bullets: bulletList,
  skills: skillList,
  sortOrder: z.number().int().default(0),
});

export const projectSchema = z.object({
  name: z.string().min(1).max(160),
  description: z.string().max(1000).optional(),
  bullets: bulletList,
  skills: skillList,
  url: z.string().url().max(300).optional().or(z.literal('')),
  sortOrder: z.number().int().default(0),
});

export const educationSchema = z.object({
  school: z.string().min(1).max(200),
  degree: z.string().max(200).optional(),
  field: z.string().max(200).optional(),
  location: z.string().max(160).optional(),
  startDate: z.string().max(40).optional(),
  endDate: z.string().max(40).optional(),
  gpa: z.string().max(20).optional(),
  notes: z.string().max(1000).optional(),
  sortOrder: z.number().int().default(0),
});

export const skillSchema = z.object({
  name: z.string().min(1).max(80),
  category: z.string().max(80).optional(),
  sortOrder: z.number().int().default(0),
});

// Updates: same fields, all optional.
export const experienceUpdateSchema = experienceSchema.partial();
export const projectUpdateSchema = projectSchema.partial();
export const educationUpdateSchema = educationSchema.partial();
export const skillUpdateSchema = skillSchema.partial();

export type ExperienceInput = z.infer<typeof experienceSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type EducationInput = z.infer<typeof educationSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
