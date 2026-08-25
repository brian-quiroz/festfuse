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

Only artists in `FESTFUSE_API_ARTIST_SLUGS` (also set in `.env.local`) are actually
read from the API; every other Artist Detail page still reads TypeScript data
regardless of which backend `FESTFUSE_API_BASE_URL` points at.
