// One-off: seed the profile bank from Sheel's résumé (admin/backend/seed/
// initial-resume.tex). Idempotent per item — re-running won't create duplicates.
// Run from admin/backend:  node scripts/seed-profile-from-resume.mjs
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const EDUCATION = [
  {
    school: 'Toronto Metropolitan University (formerly Ryerson University)',
    degree: 'Bachelor of Science in Computer Science (Co-op)',
    field: 'Computer Science',
    location: 'Toronto, ON',
    startDate: 'Sept 2022',
    endDate: 'April 2026',
    gpa: '3.77',
    notes:
      "Dean's List. Coursework: Data Structures, Algorithms, Software Engineering (SDLC, Agile), Database Systems I & II, Operating Systems, Computer Networks, Web Systems Development, Web Applications, Computer Security, Machine Learning, Computer Vision.",
  },
];

const EXPERIENCE = [
  {
    title: 'Data Analyst',
    company: 'Practical Applications of Computer Science',
    location: 'Toronto, ON',
    startDate: 'Sept 2023',
    endDate: 'Jun 2024',
    current: false,
    bullets: [
      'Engineered data pipelines for 1000+ website interactions using PostgreSQL and Python, boosting engagement by 40%.',
      'Deployed infrastructure across OpenShift, AWS, and private cloud, sustaining 99.7% uptime across 10+ deployments.',
      'Analyzed event registration data, identifying 8 critical UI bottlenecks that reduced no-show rates by 35%.',
      'Led team of 10+ staff using Jira/Confluence, implementing workflows that increased task completion by 80%.',
    ],
    skills: ['PostgreSQL', 'Python', 'OpenShift', 'AWS', 'Jira', 'Confluence', 'ETL'],
  },
  {
    title: 'Lifeguard',
    company: "Canada's Wonderland",
    location: 'Toronto, ON',
    startDate: 'May 2023',
    endDate: 'Sept 2024',
    current: false,
    bullets: [
      'Monitored safety of 1000+ daily guests, enforcing protocols that reduced reported incidents by 20%.',
      'Collaborated with 15+ team members on emergency protocols, decreasing response time by 20% with 100% positive feedback.',
      'Documented safety incidents and improvements, enhancing training effectiveness for 30+ new staff members.',
    ],
    skills: [],
  },
];

const PROJECTS = [
  {
    name: 'F1 Real-Time Dashboard',
    url: 'https://github.com/Kyoko522/Grit',
    description: 'Real-time Formula 1 telemetry dashboard with live track playback.',
    bullets: [
      'Analyzed GPS telemetry from 100+ F1 sessions using Python, pandas, and FastF1, applying 3x downsampling logic to identify lap performance patterns and improve visualization accuracy by 35% across all 20 drivers.',
      'Engineered thread-safe session cache with LRU eviction capped at 5 sessions, ensuring only one thread loads each FastF1 session while up to 20 concurrent requests await and share the cached result, reducing average load time by 60%.',
      'Implemented FastAPI backend with a unified session-init endpoint returning driver data, lap positions, and track outline in one call, consolidating 3 sequential page-load round-trips into 1 and reducing data payload overhead by 60%.',
      'Developed 60fps Canvas renderer via requestAnimationFrame reading all live state through refs with zero React re-renders, pre-rendering the static track to an offscreen canvas and achieving smooth real-time playback at 8x speed.',
    ],
    skills: ['Python', 'FastAPI', 'pandas', 'React', 'Canvas API', 'Docker', 'FastF1'],
  },
  {
    name: 'PawFind',
    url: 'https://github.com/koshgupta/cps630-Assignment-2',
    description: 'Full-stack pet-finder platform with real-time messaging and role-based access.',
    bullets: [
      'Architected full-stack Node.js/MongoDB data platform with 5 Mongoose schemas and JWT tiered middleware, enabling role-based access control across admin and user routes and eliminating unauthorized data access.',
      'Integrated Socket.IO WebSocket layer with MongoDB-persisted message store, cutting server polling overhead and enabling real-time bidirectional data streaming across 9 REST API endpoints for concurrent admin and user sessions.',
      'Constructed Docker Compose deployment pipeline with automated MongoDB seeding, reducing environment setup from manual configuration to a single command and ensuring consistent data state across 5 collections.',
      'Optimized socket room topology using per-conversation rooms and in-memory connection tracking, eliminating cross-session message bleed and enabling live admin inbox updates without polling.',
    ],
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Docker', 'JWT'],
  },
  {
    name: 'Event Management System',
    url: 'https://github.com/Kyoko522/Dance-Club-Management-App',
    description: 'Event/attendee management platform with reporting dashboards.',
    bullets: [
      'Developed data management platform using Ruby on Rails, processing records for 25+ events and 500+ monthly attendees.',
      'Engineered 20 reporting components with Tailwind and React, reducing dashboard development time by 40%.',
      'Streamlined data operations with Go and SQLite3, achieving 99.8% transformation accuracy and 60% faster queries.',
      'Implemented JWT authentication workflows, securing 300+ user accounts while reducing system access issues by 75%.',
    ],
    skills: ['Ruby on Rails', 'SQLite', 'Heroku', 'React', 'Tailwind', 'Go', 'JWT'],
  },
];

const SKILLS = [
  ['Languages', ['Java', 'Python', 'SQL', 'JavaScript', 'C/C++', 'Go', 'Ruby', 'Bash']],
  ['Data & Analytics', ['pandas', 'matplotlib', 'numpy', 'ETL pipelines', 'data modeling', 'REST API integrations', 'FastAPI']],
  ['Databases', ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite']],
  ['Frameworks', ['React', 'Next.js', 'Node.js', 'Spring Boot']],
  ['Tools & Cloud', ['Git', 'Jira', 'Confluence', 'AWS', 'OpenShift', 'Docker', 'CI/CD']],
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const user =
    (adminEmail && (await prisma.user.findUnique({ where: { email: adminEmail } }))) ||
    (await prisma.user.findFirst());
  if (!user) {
    console.error('No user found. Run `npm run db:seed` first.');
    process.exit(1);
  }
  const userId = user.id;
  const added = { education: 0, experience: 0, projects: 0, skills: 0 };
  let order = 0;

  for (const ed of EDUCATION) {
    const exists = await prisma.educationItem.findFirst({ where: { userId, school: ed.school } });
    if (!exists) { await prisma.educationItem.create({ data: { ...ed, userId, sortOrder: order++ } }); added.education++; }
  }

  order = 0;
  for (const ex of EXPERIENCE) {
    const exists = await prisma.experienceItem.findFirst({ where: { userId, company: ex.company, title: ex.title } });
    if (!exists) { await prisma.experienceItem.create({ data: { ...ex, userId, sortOrder: order++ } }); added.experience++; }
  }

  order = 1; // 0 reserved for the portfolio project added earlier
  for (const pr of PROJECTS) {
    const exists = await prisma.projectItem.findFirst({ where: { userId, name: pr.name } });
    if (!exists) { await prisma.projectItem.create({ data: { ...pr, userId, sortOrder: order++ } }); added.projects++; }
  }

  order = 0;
  for (const [category, names] of SKILLS) {
    for (const name of names) {
      const exists = await prisma.skillItem.findFirst({ where: { userId, name } });
      if (!exists) { await prisma.skillItem.create({ data: { name, category, userId, sortOrder: order++ } }); added.skills++; }
    }
  }

  console.log(`Seeded for ${user.email}:`, added);
}

main()
  .catch((e) => {
    if (String(e?.message || e).match(/does not exist|P2021/i)) {
      console.error('Profile-bank tables missing. Run: npm run db:migrate -- --name add_profile_bank_and_tailoring');
    } else {
      console.error('Failed:', e?.message || e);
    }
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
