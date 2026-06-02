// One-off: seed the "Personal Portfolio + AI Résumé Portal" project into the
// profile bank. Idempotent — skips if a project with the same name already
// exists for the user. Run from admin/backend:  node scripts/add-portfolio-project.mjs
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PROJECT = {
  name: 'Personal Portfolio + AI Résumé Portal',
  description:
    'Full-stack Next.js portfolio with a private, AI-powered admin console for tailoring résumés and cover letters to specific jobs.',
  url: '',
  bullets: [
    'Built a full-stack personal site in Next.js (App Router) + React, deployed on Vercel',
    'Designed a private admin "résumé portal" backend: Express + TypeScript REST API, Prisma ORM on Supabase Postgres, layered routes→controller→service architecture',
    'Implemented secure auth with JWT in httpOnly cookies, bcrypt password hashing, zod request validation, helmet, CORS lockdown, and per-endpoint rate limiting',
    'Integrated the Anthropic Claude API (with prompt caching) to generate job-tailored cover letters grounded in résumé facts',
    'Built a 4-stage résumé-tailoring pipeline (assemble → ATS scan → rewrite → stress test) that selects the best-fit experience from a structured profile bank and outputs ATS-safe LaTeX',
    'Built a LaTeX→PDF compilation service (Tectonic) with live in-browser PDF preview',
    'Implemented a client-side AES-GCM encrypted vault using the Web Crypto API (PBKDF2 key derivation) with brute-force lockout',
    'Added Discord webhook notifications for access logging',
  ],
  skills: [
    'Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL',
    'Supabase', 'Anthropic Claude API', 'JWT', 'bcrypt', 'zod', 'LaTeX', 'Vercel', 'Web Crypto API',
  ],
};

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const user =
    (adminEmail && (await prisma.user.findUnique({ where: { email: adminEmail } }))) ||
    (await prisma.user.findFirst());

  if (!user) {
    console.error('No user found. Run `npm run db:seed` first to create your admin account.');
    process.exit(1);
  }

  const existing = await prisma.projectItem.findFirst({
    where: { userId: user.id, name: PROJECT.name },
  });
  if (existing) {
    console.log(`Already exists (id=${existing.id}) for ${user.email} — nothing to do.`);
    return;
  }

  const created = await prisma.projectItem.create({
    data: { ...PROJECT, userId: user.id, sortOrder: 0 },
  });
  console.log(`Added project "${created.name}" (id=${created.id}) for ${user.email}.`);
  console.log(`Bullets: ${created.bullets.length}, skills: ${created.skills.length}`);
}

main()
  .catch((e) => {
    if (String(e?.message || e).match(/does not exist|relation .* does not exist|P2021/i)) {
      console.error(
        'The ProjectItem table does not exist yet. Run the migration first:\n' +
          '  npm run db:migrate -- --name add_profile_bank_and_tailoring',
      );
    } else {
      console.error('Failed:', e?.message || e);
    }
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
