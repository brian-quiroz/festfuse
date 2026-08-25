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

### Backend (planned)

- FastAPI
- Python

### Database (planned)

- PostgreSQL

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

---

## Core User Modes

FestFuse intentionally separates discovery into distinct experiences rather than combining everything into one screen.

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

### Festival Story

Celebrate the user's festival journey.
Summarize their taste, discoveries, and decisions in a memorable, shareable format.

Future expansions:

- **Compare:** Resolve difficult tradeoffs between artists.
- **Schedule:** Organize a finalized festival plan after decisions have already been made.

---

## Design Principles

### Color Semantics

Colors communicate meaning, not just aesthetics. Use them consistently throughout the product.

#### Cyan (#00E5FF) — Information & Navigation

Use cyan for things the user learns, explores, or uses to navigate.

Examples:

- Active navigation and tabs
- Primary workflow actions (e.g. Add to Schedule, Compare)
- Genre pills
- Playing At
- Music-related UI
- Informational icons
- Links and navigational affordances

Cyan should communicate:

> "Here's something to discover or use."

---

#### Yellow (#E8FF47) — User Intent & Personalization

Use yellow for things the user has intentionally chosen or personalized.

Examples:

- Must See
- Saved
- Personalized recommendations
- Best For
- User-created collections
- Festival Story highlights

Yellow should communicate:

> "This reflects your taste."

---

#### Celebration (#D946EF) — Festival Energy & Celebration

Use celebration magenta sparingly to reinforce the festival atmosphere and moments of delight.

Examples:

- Festival branding
- Decorative gradients
- Celebration states
- Wrapped / Festival Story accents
- Limited promotional moments

Avoid using celebration magenta for standard navigation or persistent actions.

Celebration magenta should communicate:

> "This is exciting."

---

#### Red — Conflict & Warning

Reserve red for situations requiring attention.

Examples:

- Schedule conflicts
- Delete / Remove actions
- Error states
- Warning messages
- Conflict indicators

Avoid decorative use of red.

Red should communicate:

> "Pay attention."

---

#### Pass (#6B7080) — Neutral Dismissal

Use neutral gray for low-stakes skip actions that do not require attention or emphasis.

Examples:

- Pass / Skip button in Quick Picks
- Neutral decision that implies "not interested, no issue"

Pass gray should communicate:

> "This is a neutral choice."

---

#### Foundation

Deep violet (#110D24) and surrounding dark neutrals form the visual foundation of FestFuse.

Favor:

- photography over illustrations
- whitespace over borders
- hierarchy over information density
- subtle depth over heavy visual effects

Use color intentionally. Users should be able to infer meaning from color alone after spending time with the product.

### Visual Design Principles

Favor:

- photography over illustrations
- whitespace over borders
- hierarchy over information density
- subtle depth over heavy visual effects
- editorial presentation over dashboard density
- emotional storytelling over exhaustive reference data

The UI should feel closer to Spotify, Apple Music, Linear, or Raycast than an admin dashboard.

Every screen should have a primary visual focus. Avoid competing points of emphasis.

Prefer progressive disclosure: reveal additional information as the user shows interest rather than presenting everything at once.

Avoid unnecessary widgets, cards, or metrics that do not help users discover artists, build excitement, or make confident decisions.

---

## UX Philosophy

Overview:
Help me decide.

Stats:
Give me objective facts.

Trivia:
Help me geek out.

Each section should answer a specific user question.

Whenever proposing a new feature, first ask:

"Does this help the user decide who to see?"

If not, it probably doesn't belong in the MVP.

---

## Current MVP Scope

Focus on a single festival.

Core workflow:

1. Discover artists
2. Learn about artists
3. Build interest through Quick Picks
4. Produce a shareable festival story summarizing the user's taste and picks

Planning, conflict detection, and scheduling will be expanded after the core discovery experience feels polished.

---

## Data Architecture

### Artist Data

Artist records live in `app/data/artists/`, split into one file per festival day for easier editing:

- `thursday.ts`, `friday.ts`, `saturday.ts`, `sunday.ts` — storage only
- `index.ts` — combines all four and exports `allArtists` and `artistsBySlug`

**Rule: always import from `index.ts`, never from individual day files.**

The day files are an editing convenience, not a data boundary. Any feature that needs to filter by day (e.g. Quick Picks for Friday only) must import `allArtists` from `index.ts` and filter by `artist.appearance.day === "Friday"`. Never use a day file as a shortcut to get that day's artists — it will silently break if an artist is miscategorized or moved.

---

## About Section Voice

`about` is the only AI-authored artist-prose field actually rendered in the UI (Artist Detail's About section). `tagline`, `whySee`, and `whatToExpect` are unverified content that don't currently drive any rendered copy — `about` is the one worth getting right.

### Verify every fact before writing it

Album titles, release years, awards, chart positions, stream counts, band members, hometowns, tour details — check each against a real source before it goes in. Don't guess and don't reuse a claim from memory. If a fact can't be verified, cut it rather than soften it into something vaguer that's still unverified.

### Excitement comes from specifics, not adjectives

Don't reach for a critic's verdict: "legendary," "masterclass," "premier," "one of the most exciting figures in X." Those are claims only someone with real listening authority can back up, and this copy doesn't have that authority.

A good test: would the sentence still be true if a stranger who'd never heard the artist's music wrote it? A real album, a real award, a real stream count passes. A taste verdict doesn't.

State the actual achievement plainly and it carries its own charge — no hype adjective needed on top.

### A notch of warmth, not flat recitation

Real achievements can be delivered with genuine appreciation, not spec sheet neutrality. If an artist has a real award, a viral single, a startling stream count, let the tone register that it's actually impressive. That's a matter of delivery, not word choice: stating an achievement plainly and clearly as the sentence's highlight can read as warm without any hype adjective attached to it.

Calibrate to what's actually there. An artist with real accolades earns a slightly more celebratory tone. An artist where research only turns up sparse, ordinary facts doesn't need padding to compensate, don't manufacture warmth that isn't backed by anything. The same applies to live performance details specifically: include them only when something concrete and documented actually turns up, never add a live show sentence just to round out the paragraph. Most smaller or underground artists simply won't have much public information here, and that's fine to leave as is.

### No dashes

No em dashes or standalone hyphens as punctuation. Use a period or colon instead. Reads as AI-generated otherwise.

### Titles in single quotes

Album, EP, and song titles referenced in `about` are wrapped in single quotes (`'BRAT'`, `'Halcyon'`), not double quotes.

### Describe the show, don't instruct the reader

Avoid "Expect X" or "You'll experience X" framing. Telling the reader what they will feel is an authoritative claim this copy hasn't earned. Say what the show consists of instead ("His sets run on relentless low end..." not "Expect relentless low end...").

### Live performance details are fair game when documented, not witnessed

Format and reputation facts about how an artist performs are verifiable the same way any other fact is: "expanded to a five-piece for live shows," "performs as a four-way back-to-back set," "known for elaborate theatrical staging" are all fine when multiple independent sources consistently describe them as an ongoing, established part of the act, not one reviewer's account of a single show.

What's not fine: describing what a show feels like as if the copy witnessed it firsthand, or presenting a single review's subjective impression as settled fact. That's a different failure than the one above, but the same root cause: an authority the copy hasn't earned.

### Nothing tied to one specific appearance

Never name a specific stage, date, or "this weekend," and never call a show a "hometown set." An artist record isn't scoped to a single festival or booking (see `festivalId` on `appearances`) — anything that's only true for _this_ appearance breaks the moment the same data is reused for a different one or the schedule changes. Biographical origin facts ("emerged from Chicago") are permanent and fine; tying that origin to "this show" is not.

> Would this sentence still be true next year, at a different festival, written by someone who's never heard the music? If not, it doesn't belong in `about`.

---

## Refactoring & Code Integrity

When restructuring layouts or reorganizing component hierarchies, **never remove or break existing UI components in the process**, even when they look redundant or are being moved around.

During refactoring:

1. **Test the full page**, not just the section being changed. A restructure in one part can silently break rendering elsewhere.
2. **Keep critical UI components in your mental checklist** — before considering a refactor done, verify that things like filter displays, buttons, and navigational elements are still working in all contexts they should appear.
3. **Make smaller, testable changes** rather than aggressive restructuring in one shot. This makes it easier to spot what broke.
4. **Use version control as a safety net** — if something disappears, `git diff` should make it obvious.

A component that's hard to find in a refactor is still a problem. Better to err on the side of being conservative with code removal until you're certain nothing is using it.

---

## Engineering Workflow

**Verify before calling a change complete.** Before calling a change to a shared/utility function complete, trace every call site (grep, not memory). When a plan has you build something structurally parallel to existing code, diff the new implementation against that sibling's actual behavior for every shared concern before trusting the plan's literal wording — a plan can under-specify or quietly contradict existing precedent.

**Ask before searching.** For facts about this project the developer would know directly (is this file auto-generated, does this pattern already exist, why was this built this way), ask first instead of spending a search step. Default to searching for facts not about this codebase — external tool/library behavior, official documentation.

**Documentation completeness — check each trigger before calling a change done:**

- New automated test file (frontend or backend) → its test README needs a new paragraph and a coverage-list bullet.
- A change that confirms or completes something an existing ADR's Consequences section already anticipated → a dated follow-up note on that same ADR, not a new one.
- A decision that took real back-and-forth to reach, or whose reasoning is worth preserving, regardless of domain → a new ADR.
- Changed rollout status or sequence → `docs/roadmap/backend-rollout.md`.
- A completed backend data-model implementation milestone → `docs/design/artist-data-model.md`'s Implementation status checklist.
- A notable new frontend behavior/pattern worth a technical record → `ARCHITECTURE.md`.
- A deliberately deferred gap, frontend or backend → `docs/FUTURE_CONSIDERATIONS.md`.

**Comments.** Default to short code comments. When a decision needs real justification, put it in the relevant ADR/FUTURE_CONSIDERATIONS entry instead of the comment itself.

**Commits.** Never run `git commit` or `git push` directly — hand over the message text and let the developer run it.

---

## Build Order

✅ Artist Page
✅ Explore
✅ Quick Picks
✅ Festival Story / Wrapped-style summary
✅ Schedule

Next priority:

1. Compare
