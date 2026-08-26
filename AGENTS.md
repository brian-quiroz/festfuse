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

The frontend still defaults to TypeScript data during the ongoing backend cutover —
see `docs/roadmap/backend-rollout.md` for current status rather than treating this as
a fixed point-in-time claim.

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

---

## Current Milestone

**Shipped (MVP 1.0):** Artist Page, Explore, Quick Picks, Festival Story, Planner.

**In progress (MVP 2.0):**

1. Complete the backend rollout — see `docs/roadmap/backend-rollout.md`.
2. Multi-festival support — any festival beyond Lollapalooza.
3. Multi-run support — festivals (e.g. ACL) with multiple weekends per edition.
4. Support an announced lineup entry with no schedule yet — see ADR-0004 and `FUTURE_CONSIDERATIONS.md`.
5. More robust automated test coverage — backend and frontend.
6. A better artist-adding/updating workflow — pipeline (backend migration) and editorial (`artist-review` skill) sides.

**Not in scope right now:** accessibility/performance work; accounts and Compare.

---

## Data Architecture

### Artist Data

Artist records live in `app/data/artists/`, split into one file per festival day for editing convenience only — never a data boundary. **Always import from `index.ts` (`allArtists`/`artistsBySlug`), never from an individual day file** — see ARCHITECTURE.md's "Storage" section for the full explanation and why day files break silently if used as a shortcut.

Some artists now resolve through the FastAPI/PostgreSQL backend instead of this TypeScript data — see `docs/roadmap/backend-rollout.md` for current cutover status.

### Editorial Review

Fact-checking an artist's `about` copy, socials, location, and genres; correcting name/slug stylization; curating the four `similarArtists` picks; and selecting the flagship Quick Picks track are all handled by the `artist-review` skill — use it rather than improvising this work from scratch.

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
- A change that confirms or completes something an existing ADR's Consequences section already anticipated → a dated follow-up note on that same ADR, not a new one.
- A choice that materially affects structure, interfaces, data integrity, operational behavior, or an
  expensive-to-reverse dependency clears docs/decisions/README.md's ADR bar → a new ADR (the why), written
  retroactively if needed. A long discussion alone isn't the bar — a local implementation detail (a
  formatting choice, a workaround) belongs in a code comment, not an ADR.
- Changed rollout status or sequence → `docs/roadmap/backend-rollout.md`.
- A completed backend data-model implementation milestone → `docs/design/artist-data-model.md`'s Implementation status checklist.
- A notable new frontend behavior/pattern worth a technical record → `ARCHITECTURE.md` (the what only) —
  if it also has a why worth capturing, that belongs in an ADR, not as rationale prose here.
- A deliberately deferred gap, frontend or backend → `docs/FUTURE_CONSIDERATIONS.md`.
- Shipped or completed something tracked in Current Milestone → update that section
  directly, and re-check Stack for matching stale status language — this file's
  claims can drift out of sync with themselves, not just with the code.

**Comments.** Default to short code comments. When a decision clears the ADR bar above, put its
justification there instead of the comment; otherwise keep the reasoning in the comment itself, briefly.

**Commits.** Never run `git commit` or `git push` directly — hand over the message text and let the developer run it.
