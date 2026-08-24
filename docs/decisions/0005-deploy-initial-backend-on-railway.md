# ADR-0005: Deploy the initial hosted backend on Railway

- Status: Accepted
- Recorded: 2026-08-24 (retrospective)

## Context

FestFuse needs a publicly reachable FastAPI service and a hosted PostgreSQL database
before a deployed frontend can consume database-backed Artist data. The first hosting
step should prove the complete path without making infrastructure learning the
project's main source of complexity or prematurely committing the application to a
large cloud architecture.

The backend already has reproducible Alembic migrations, deliberate seed/import
workflows, and environment-based database configuration. Hosting therefore needs to
preserve those boundaries: schema migration may accompany deployment, but importing
the curated snapshot and changing Artist publication state must remain explicit
operator actions.

## Decision

Use Railway for the initial hosted backend environment:

- Run FastAPI and managed PostgreSQL as separate Railway services in one project and
  environment.
- Expose FastAPI through a public domain while keeping PostgreSQL private.
- Connect FastAPI to PostgreSQL over Railway's private network using service-reference
  environment variables rather than committed credentials.
- Build and run FastAPI from the repository's `backend/` directory.
- Run `alembic upgrade head` as the FastAPI service's pre-deploy command so an
  unapplied or failed schema revision prevents the new application version from
  starting.
- Keep festival seeding, Artist import, and Artist publication out of ordinary deploy
  and application-startup commands. Run them deliberately using the documented
  administrative workflow.
- Treat this as the initial backend hosting choice, not a permanent prohibition on
  adopting AWS, Azure, or another provider when a concrete infrastructure need or
  learning objective justifies the additional complexity.

## Consequences

- FestFuse has a hosted end-to-end path with comparatively little platform setup,
  allowing backend and frontend integration work to continue incrementally.
- The API and database have independent service lifecycles while sharing a private
  network and environment-level configuration.
- PostgreSQL does not need a public endpoint for ordinary application traffic.
- Committed migrations remain the database-structure source of truth across local and
  hosted environments.
- Data bootstrap remains visible and deliberate, reducing the risk that every deploy
  overwrites curated application data.
- Operational procedures now include Railway-specific concepts and commands, creating
  some provider coupling and a future migration cost.
- The current setup provides less direct experience with lower-level AWS or Azure
  infrastructure than deploying the same system there.
- Railway usage, limits, availability, and pricing become external operational
  dependencies that must be monitored as the application grows.
- The Railway environment is named `production`, but it initially serves as the hosted
  backend used during a bounded frontend rollout. The label alone does not mean the
  frontend has completed its production cutover.

## Alternatives considered

- **Deploy directly to AWS or Azure.** Attractive for cloud-infrastructure learning
  and finer operational control, but deferred because networking, identity, managed
  database, deployment, and observability setup would substantially widen the first
  backend-hosting milestone. Reconsider when FestFuse has a concrete cloud-specific
  requirement or a deliberately scoped infrastructure-learning phase.
- **Use Supabase for PostgreSQL and a separate FastAPI host.** Viable, but it would
  split the initial deployment across providers without a current need for
  Supabase-specific authentication, realtime, storage, or generated API features.
- **Use separate general-purpose application and database providers.** Rejected for
  the first deployment because it adds cross-provider networking, credentials, and
  operational coordination before those tradeoffs provide product value.
- **Keep the backend local while deploying only the frontend.** Rejected because a
  deployed Next.js preview cannot reliably depend on a developer machine, and it
  would not prove the production-shaped API-to-database path.

## References

- [Backend deployment and data-bootstrap runbook](../operations/backend-deployment.md)
- [Backend rollout roadmap](../roadmap/backend-rollout.md)
- [ADR-0001](0001-introduce-fastapi-postgresql-backend.md)
- [`backend/alembic.ini`](../../backend/alembic.ini)
- [`backend/app/config.py`](../../backend/app/config.py)
