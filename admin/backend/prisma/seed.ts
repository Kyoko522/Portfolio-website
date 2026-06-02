import fs from 'node:fs';
import path from 'node:path';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { env } from '../src/config/env';

const prisma = new PrismaClient();

async function main() {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env before seeding.');
  }

  // Hash with a cost factor of 12 — slow enough to resist brute force.
  const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 12);

  const user = await prisma.user.upsert({
    where: { email: env.ADMIN_EMAIL },
    update: { passwordHash },
    create: { email: env.ADMIN_EMAIL, passwordHash },
  });
  console.log(`Seeded admin user: ${user.email}`);

  // Import the existing résumé LaTeX on first run only, owned by this user, so
  // re-seeding won't clobber edits made in the portal.
  const existing = await prisma.resumeVersion.findFirst({ where: { userId: user.id } });
  if (!existing) {
    const texPath = path.join(__dirname, '..', 'seed', 'initial-resume.tex');
    const texSource = fs.existsSync(texPath)
      ? fs.readFileSync(texPath, 'utf8')
      : '% Paste your resume LaTeX here.\n\\documentclass{article}\\begin{document}\\end{document}\n';

    await prisma.resumeVersion.create({
      data: { userId: user.id, label: 'Initial import', texSource, isDraft: true, published: false },
    });
    console.log('Seeded initial resume version');
  } else {
    console.log('Resume version already exists — skipping resume seed');
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
