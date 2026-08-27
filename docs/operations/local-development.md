# Local Development Against the Backend

`npm run dev` reads `.env.local`, which points the frontend at the hosted Railway API
by default (see [`backend-deployment.md`](backend-deployment.md)). No extra setup is
needed for that path. This doc covers the alternative: running the frontend against a
local FastAPI/PostgreSQL backend instead, for example while working on an endpoint
that hasn't been deployed yet.

This assumes a local PostgreSQL database already exists and is migrated/seeded, with
its connection details in `backend/.env` (`POSTGRES_HOST`, `POSTGRES_PORT`,
`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`). If the schema is behind, apply
migrations first:

```bash
cd backend
alembic upgrade head
```

## 1. Start the local backend

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

## 2. Point the frontend at it

`FESTFUSE_API_BASE_URL` in `.env.local` already points at the hosted Railway API, and
Next.js won't let a value already set in `.env.local` be overridden by another
`.env` file. Set it inline on the same command instead, so the shell-level value
takes precedence for that run only:

```bash
FESTFUSE_API_BASE_URL=http://127.0.0.1:8000 npm run dev
```

Every frontend read goes through whichever backend `FESTFUSE_API_BASE_URL` points
at, with no TypeScript-backed fallback (see [ADR-0010](../decisions/0010-api-failure-ux-after-typescript-fallback-removal.md)).

## 3. Fast-tracking Festival Story locally

Festival Story only unlocks after a Quick Picks session's queue is fully decided —
for one day, that's 40+ individual decisions. To skip the grind while testing, write
the equivalent state directly into the browser's `localStorage` (the same place
Quick Picks persists decisions) via DevTools' Console, then reload before navigating
to Quick Picks:

```js
const thu = ["kim-theory", "pearly-drops", /* ...every artist slug for the target day */];
const decisionsByArtist = Object.fromEntries(
  thu.map((slug, i) => [slug, { verdict: i < 6 ? "mustSee" : "passed", source: "quickPicks", updatedAt: Date.now() }])
);
localStorage.setItem("decision-store", JSON.stringify({ state: { decisionsByArtist, hasHydrated: false }, version: 0 }));
localStorage.setItem("attendance-store", JSON.stringify({ state: { attendanceDaysByFestival: { "lollapalooza-2026": ["Thursday"] }, hasHydrated: false }, version: 0 }));
```

Two things that trip this up:

- **Get the slug list via `curl` against the backend in a terminal, not `fetch()`
  inside the browser console.** The backend's CORS policy only allows server-side
  (Next.js) requests by design (see step 4's guardrail in
  `docs/roadmap/backend-rollout.md`) — a direct browser-side `fetch()` to the local
  backend is correctly rejected, not a bug.
- **Hard-reload (not a client-side navigation) after writing to `localStorage`,
  before clicking anything.** Zustand's `persist` middleware only reads
  `localStorage` once, when a store is first created on a fresh page load — writing
  new data doesn't affect a store already hydrated in memory from earlier in that
  same tab. An incognito/private window sidesteps this entirely by guaranteeing
  empty state to start from.
