# Résumé Portal

A private, local-first admin app for managing one résumé and a job-application
pipeline. It lets you:

- **Edit your résumé** (LaTeX) in a code editor with a live PDF preview, **Save**
  drafts, and **Publish** — which compiles the PDF and pushes it to your public
  portfolio so the live site updates. The previously published PDF stays live
  until you publish, so there's always a working CV online.
- **Track job applications** — company, role, job description, status
  (Applied → Waiting → Interview → Offer/Rejected), all in one place.
- **Generate tailored cover letters** from a job description using the Claude API,
  grounded in your résumé.

It is **not** deployed with the public portfolio (Vercel ignores `admin/`). Run it
locally now; host it on your own server or a free tier later.

---

## Architecture

```
admin/
  backend/   Express + TypeScript REST API (auth, résumé, applications, cover letters)
             Prisma + SQLite, Tectonic (LaTeX→PDF), Anthropic SDK
  frontend/  React + Vite SPA (Monaco editor, PDF preview, application tracker)
```

In **dev**, the Vite dev server (`:5173`) proxies `/api/*` to the Express backend
(`:4000`). That makes the SPA and API share an origin, so the auth cookie is
first-party — no CORS or cross-site-cookie headaches. In **production** (when you
host it), serve the built SPA from the same origin as the API.

The backend is layered so each concern has one home:

```
request → route → middleware (auth, validation, rate-limit)
        → controller (HTTP in/out)
        → service (business logic, no req/res)
        → repository / Prisma (database)
```

---

## The tools — and what each one teaches

This project is deliberately built with the stack a full-stack / AI engineer is
expected to know. What each piece is doing here:

| Tool | Role in this app | Why it's worth learning |
|---|---|---|
| **TypeScript** | Whole codebase | Types catch bugs before runtime; the industry default for new Node/React work. |
| **Express** | HTTP server + routing | The most common Node web framework; understand middleware + routing and you can read most Node backends. |
| **Layered architecture** | `routes → controller → service → repository` | Separation of concerns: HTTP details stay in controllers, logic in services, DB in repositories. Makes code testable and swappable. |
| **Prisma + Supabase (Postgres)** | ORM + hosted database | Typed DB queries + migrations from one schema file, against managed Postgres. Every record is owned by a `userId`, so the app is multi-user-ready (add signup later, no schema change). |
| **JWT + bcrypt + httpOnly cookies** | Auth | The standard session pattern. bcrypt hashes passwords; the JWT lives in an httpOnly cookie so browser JS can't steal it (XSS-safe). |
| **zod** | Request validation | Validate untrusted input at the boundary and get a TypeScript type for free. Nothing unvalidated reaches the DB. |
| **helmet / CORS / express-rate-limit** | Web security | Security headers, locked-down origins, and brute-force/abuse protection — the baseline every public API needs. |
| **dotenv + `.env`** | Config & secrets | 12-factor config: secrets live in the environment, never in code or git. |
| **Anthropic SDK + prompt caching** | Cover-letter AI | Calling an LLM API well: a cached stable prefix (résumé + instructions) and a volatile suffix (the job description) — the core cost/latency lever in AI apps. |
| **Tectonic + child_process** | LaTeX → PDF | Shelling out to a binary *safely* — argument arrays (no shell) so user content can't inject commands. |
| **Ports & adapters** | `PublishService` interface | The publish step depends on an interface, not a concrete implementation — so the "push to GitHub" mechanism can change without touching business logic. |
| **React + Vite + React Query** | Frontend | React Query handles server state (caching, refetch, loading/error) so components stay declarative. Vite is the fast modern dev server/bundler. |
| **Monaco editor** | Résumé editing | The editor that powers VS Code, embedded in the browser. |

---

## Running it locally

### Prerequisites
- Node 18+ and npm
- [Tectonic](https://tectonic-typst.github.io/) for LaTeX compilation:
  `brew install tectonic` (macOS) — required for résumé compile/publish.

### 1. Backend

```bash
cd admin/backend
npm install
cp .env.example .env        # then edit .env (see below)
npm run db:migrate          # creates the SQLite DB + tables
npm run db:seed             # creates your admin user + imports the résumé
npm run dev                 # starts the API on http://localhost:4000
```

### 2. Frontend (separate terminal)

```bash
cd admin/frontend
npm install
npm run dev                 # starts the SPA on http://localhost:5173
```

Open **http://localhost:5173** and log in with the `ADMIN_EMAIL` /
`ADMIN_PASSWORD` from your `.env`.

---

## Environment variables (`admin/backend/.env`)

| Var | What it is |
|---|---|
| `PORT` | Backend port (default 4000). |
| `FRONTEND_ORIGIN` | Allowed CORS origin (the SPA). |
| `DATABASE_URL` / `DIRECT_URL` | Supabase Postgres connection strings (app + migrations). |
| `JWT_SECRET` | Long random string. Generate: `openssl rand -base64 48`. |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded login. Change the password, then re-run `npm run db:seed`. |
| `ANTHROPIC_API_KEY` | Your Claude API key (cover letters). Server-side only. |
| `COVER_LETTER_MODEL` | `claude-opus-4-7` (default) or `claude-sonnet-4-6` for lower cost. |
| `PUBLISH_PDF_PATH` | Where Publish writes the PDF (default: the portfolio's `public/assets/Resume.pdf`). |
| `PUBLISH_GIT_ENABLED` | `false` = write the PDF only. `true` = also `git commit && git push` so Vercel redeploys. |

`.env` is gitignored — never commit it.

---

## The Publish flow

1. **Save draft** — stores your LaTeX in the DB. The live site is untouched.
2. **Compile preview** — renders the current editor content to a PDF in the
   preview pane (nothing is published).
3. **Publish** — compiles the saved draft, writes `public/assets/Resume.pdf`, and
   (if `PUBLISH_GIT_ENABLED=true`) commits + pushes it so Vercel redeploys.

Keep `PUBLISH_GIT_ENABLED=false` while testing — Publish will still write the PDF
locally so you can confirm the output before turning on the real push.

---

## Deploying later (notes)

- **Backend**: build a container that has Node **and** Tectonic installed (a
  `Dockerfile`), set the env vars, and run `npm run build && npm start`. Free Node
  hosts include Render, Railway, and Fly.io.
- **Serve the SPA from the backend** in production (one origin, one auth domain):
  `cd admin/frontend && npm run build`, then have Express serve `frontend/dist`.
- **Database is Supabase (Postgres)**, so it persists independently of where the
  backend runs — no volume needed. Just set `DATABASE_URL` / `DIRECT_URL` on the
  host. Rotate the DB password in Supabase if it's ever exposed.
- **Publishing off-repo**: when the backend no longer lives inside the portfolio
  repo, implement a `GitHubApiPublisher` (commit the PDF via the GitHub Contents
  API with a token) and return it from `services/publish/index.ts`. No other code
  changes — that's the point of the `PublishService` interface.

---

## Security notes

- Passwords are bcrypt-hashed; the session is a JWT in an httpOnly, sameSite,
  (in prod) secure cookie.
- All input is validated with zod; the central error handler hides internals in
  production.
- `helmet` sets security headers, CORS is locked to the frontend origin, and the
  login + cover-letter endpoints are rate-limited (the latter so a leaked session
  can't burn API credits).
- The Anthropic key stays server-side and is never sent to the browser.
