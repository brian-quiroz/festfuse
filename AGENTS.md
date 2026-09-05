<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# FestFuse

FestFuse helps festivalgoers discover artists, decide who to see, and build excitement before the festival.
Every feature should reduce the friction of those decisions.

---

## Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- FastAPI
- Python
- SQLAlchemy
- Alembic

### Database

- PostgreSQL

The frontend reads all artist data from the FastAPI/PostgreSQL backend.

---

## Product Goals

Every feature should accomplish at least one of these:

- Help users discover artists.
- Help users feel confident and excited about who they’ll see.
- Help users remember artists they liked.
- Build excitement before the festival.

Avoid adding features that do not directly support one of these goals.

---

## Product Philosophy

FestFuse is a festival decision assistant, not a music encyclopedia.

Every screen should reduce the friction of deciding who to see.

Guide users toward confident decisions instead of overwhelming them with information.

Discovery should feel exciting, playful, and premium rather than like filling out a spreadsheet.

Whenever proposing a new feature, ask first: does this help the user decide who to see? If not, it probably doesn't belong in the MVP.

---

## Screen Design Intent

Each screen has a distinct purpose and tone — don't blur them together. Color and visual design rules live in `.claude/rules/design-principles.md`.

### Home

Inviting, low-information entry point. Large cards direct the user toward the three main workflows (Explore, Quick Picks, Planner) without bombarding them with information. A light nudge toward "how it works," not a dashboard.

### Explore

Curious, self-directed discovery.
Browse the festival lineup, filter artists, and follow your curiosity in a low-pressure environment.

### Artist Detail

Editorial deep dive.
Build excitement and confidence around a single artist. This page should inspire rather than compare.

### Quick Picks

Guided decision making.
Present artists one at a time with just enough information to confidently decide:

- Pass
- Interested
- Must See

Quick Picks optimizes for momentum, not perfect decisions.

Favor forward progress over exhaustive review. Provide lightweight error recovery (e.g. undoing the last decision), but avoid introducing workflows that encourage second-guessing or turn Quick Picks back into browsing.

The button confirmation is the emotional hierarchy. The card transition is the flow hierarchy. The direction already carries meaning. Don’t add personality on top of geometry.

### Planner

The intended next step once you have some picks — turn interest into an actual schedule and surface conflicts. Usable on its own too, but that's flexibility, not the intended path; Explore and Quick Picks (in either order, or mixed) are how picks get made first.

### Festival Story

Celebrate the user's festival journey.
Summarize their taste, discoveries, and decisions in a memorable, shareable format.

### Credits

Utility, not discovery. Attributes externally-sourced artist photos. No product goal
above applies here — keep it plain and out of the way of the rest of the app.

---

## Current Milestone

Shipped: MVP 1.0 (Artist Page, Explore, Quick Picks, Festival Story, Planner), the
backend data cutover (PostgreSQL is the sole artist data source, read and write), and
MVP 2.0's multi-festival and multi-run support (`docs/roadmap/multi-festival.md`,
ADR-0015): Austin City Limits 2026 is live in production as a second edition with two
scheduled weekend runs alongside Lollapalooza 2026, reached through a
`/festivals/{edition}/{run}` routing model and a persisted active-context selection;
the full frontend experience for an announced lineup with no schedule yet (ADR-0016);
festival- and city-generic content; and video-only publication readiness (ADR-0017).
The ACL roster is imported and published on both databases; its editorial polish
(per-run similar-artist sets, non-headliner `about` copy, photos) continues on the
parallel track.

Remaining (MVP 2.0): broader automated test coverage — standing up a frontend test
framework (none exists today) and expanding the backend suite — as its own effort.

Not in scope now: accessibility/performance work; accounts; Compare.

---

## Data Architecture

### Artist Data

PostgreSQL is the sole artist data source, read and write: the frontend reads it via
FastAPI, and artist facts are authored directly in PostgreSQL through `backend/scripts/`
(`add_artist` / `edit_artist` / `build_roster_payloads`). `app/types/artist.ts`,
`app/data/categories.ts`, and `app/data/festivals.ts` hold the frontend's artist type,
category vocabularies, and festival config. Detail: `docs/roadmap/artist-authoring.md`.

### Editorial Review

The editorial process (ownership split, research/review flow, about-copy voice, the
similar-artist heuristic) is in `docs/process/artist-editorial-process.md`; rationale in
ADR-0013, and the `artist-review` skill points there. Follow that doc rather than
improvising.

---

## Refactoring & Code Integrity

- Never remove or break existing UI silently during a restructure, even if it looks redundant or is just being moved.
- Test the full page, not just the section being changed — a restructure in one part can break rendering elsewhere.
- Prefer smaller, testable changes over one aggressive restructure.
- Use `git diff` as the safety net if something disappears.
- When in doubt, be conservative about removing code until you're certain nothing uses it.

---

## Engineering Workflow

**Verify before calling a change complete.**

- Before calling a change to a shared/utility function complete, trace every call site (grep, not memory).
- When a plan has you build something structurally parallel to existing code, diff the new implementation against that sibling's actual behavior for every shared concern before trusting the plan's literal wording — a plan can under-specify or quietly contradict existing precedent.

**Ask before searching.**

- For facts about this project the developer would know directly (is this file auto-generated, does this pattern already exist, why was this built this way), ask first instead of spending a search step.
- Default to searching for facts not about this codebase — external tool/library behavior, official documentation.

**File size.**

- Target under ~200 lines for this file (Claude Code's own documented threshold — longer measurably reduces adherence); prefer bullets over prose.
- Move content only relevant to part of the codebase into `.claude/rules/` (path-scoped) or a skill rather than expanding this file inline.
- Soft constraint — exceed it when content genuinely needs to be always-loaded, not by default.

**Documentation completeness — check each trigger before calling a change done:**

- New automated test file (frontend or backend) → its test README needs a new paragraph and a coverage-list bullet.
- A choice that materially affects structure, interfaces, data integrity, operational behavior, or an
  expensive-to-reverse dependency clears docs/decisions/README.md's ADR bar → a new ADR (the why), written
  retroactively if needed.
- Never amend an existing accepted ADR's body — only typo, broken-link, and stale-reference fixes
  are exempt (a renamed/moved file, a changed path or symbol name: a pointer that no longer resolves
  is a broken link, correct it). See docs/decisions/README.md. A related but distinct decision gets
  its own new ADR instead; the bar is adding or changing meaning, not keeping references accurate.
- A long discussion alone isn't the ADR bar — a local implementation detail (a formatting choice, a
  workaround) belongs in a code comment, not an ADR.
- Changed roadmap status or sequence → the relevant `docs/roadmap/` file (`artist-authoring.md` for authoring/backend-data work).
- An actual change to the artist domain schema → `docs/design/artist-data-model.md` (a reference for the model as built, not a progress tracker).
- A notable new frontend behavior/pattern worth a technical record → `ARCHITECTURE.md` (the what only) —
  if it also has a why worth capturing, that belongs in an ADR, not as rationale prose here.
- A deliberately deferred gap, frontend or backend → `docs/FUTURE_CONSIDERATIONS.md`.
- Shipped or completed something tracked in Current Milestone → update that section
  directly, and re-check Stack for matching stale status language — this file's
  claims can drift out of sync with themselves, not just with the code.

**Comments.** Short code comments carrying the local "why". Rationale past a sentence or two — shape,
trade-offs, a reusable pattern — is the signal to move it into `ARCHITECTURE.md` (or an ADR if it
clears that bar), same commit, leaving a one-line pointer comment. Don't let a comment block become a
decision's only record. Not retroactive.

**Commits.** Never run `git commit` or `git push` directly — hand over the message text and let the developer run it.
