// One-off: append "standout" candidate bullets (client communication, prototyping,
// Agile, full-stack ownership, role-typical duties) to existing entries. These are
// drafts to PRUNE — Sheel will remove anything he didn't actually do.
// Idempotent: skips a bullet if its first ~40 chars already exist on the entry.
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PROJECT_ADDS = {
  'USSTM Website (Undergraduate Science Society of TMU)': [
    'Worked directly with USSTM executives to gather requirements and translate their vision for the home page into wireframes and prototypes before development began.',
    'Presented design mockups and iterated across multiple feedback cycles, aligning the final build with what stakeholders actually wanted.',
    'Communicated technical trade-offs (Supabase asset hosting, static export, GitHub Pages deployment) to non-technical student leaders in clear, accessible language.',
  ],
};

const EXPERIENCE_ADDS = {
  'Full Stack Developer Intern': [
    'Collaborated with cross-functional teammates and stakeholders in an Agile workflow (sprint planning, daily standups, retrospectives) to scope and ship features on schedule.',
    'Gathered requirements from non-technical stakeholders, prototyped solutions, and iterated on feedback to ensure deliverables matched what was actually needed.',
    'Designed and consumed REST APIs and built responsive front-end components, owning features end-to-end across database, backend, and UI.',
    'Contributed to a shared Git workflow with feature branches, pull requests, and code reviews, helping maintain code quality across the team.',
    'Debugged and resolved issues spanning front-end and back-end, improving application reliability and user experience.',
  ],
  'Lifeguard': [
    'Communicated clearly and calmly under pressure with guests and teammates during emergencies, de-escalating conflicts and coordinating orderly responses.',
    'Maintained CPR / First Aid / AED certification and educated patrons on water-safety practices and emergency procedures.',
  ],
};

// Append only bullets not already present (compared on a normalized prefix).
function merge(existing, adds) {
  const seen = new Set(existing.map((b) => b.slice(0, 40).toLowerCase()));
  const fresh = adds.filter((b) => !seen.has(b.slice(0, 40).toLowerCase()));
  return { merged: [...existing, ...fresh], addedCount: fresh.length };
}

async function main() {
  const admin =
    (await prisma.user.findUnique({ where: { email: process.env.ADMIN_EMAIL } })) ||
    (await prisma.user.findFirst());
  const userId = admin.id;

  for (const [name, adds] of Object.entries(PROJECT_ADDS)) {
    const row = await prisma.projectItem.findFirst({ where: { userId, name } });
    if (!row) { console.log(`(skip) project not found: ${name}`); continue; }
    const { merged, addedCount } = merge(row.bullets, adds);
    await prisma.projectItem.update({ where: { id: row.id }, data: { bullets: merged } });
    console.log(`Project "${name}": +${addedCount} bullets (now ${merged.length})`);
  }

  for (const [title, adds] of Object.entries(EXPERIENCE_ADDS)) {
    const row = await prisma.experienceItem.findFirst({ where: { userId, title } });
    if (!row) { console.log(`(skip) experience not found: ${title}`); continue; }
    const { merged, addedCount } = merge(row.bullets, adds);
    await prisma.experienceItem.update({ where: { id: row.id }, data: { bullets: merged } });
    console.log(`Experience "${title}": +${addedCount} bullets (now ${merged.length})`);
  }
}

main()
  .catch((e) => { console.error('Failed:', e?.message || e); process.exit(1); })
  .finally(() => prisma.$disconnect());
