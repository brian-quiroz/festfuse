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

### Festival Artifact

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
- Festival Artifact highlights

Yellow should communicate:

> "This reflects your taste."

---

#### Hot Pink — Festival Energy & Celebration

Use hot pink sparingly to reinforce the festival atmosphere and moments of delight.

Examples:

- Festival branding
- Decorative gradients
- Celebration states
- Wrapped / Festival Artifact accents
- Limited promotional moments

Avoid using hot pink for standard navigation or persistent actions.

Hot pink should communicate:

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
4. Produce a shareable festival "artifact" summarizing the user's taste and picks

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

## Build Order

✅ Artist Page

Next priorities:

1. Explore
2. Quick Picks
3. Festival Artifact / Wrapped-style summary
4. Compare
5. Schedule
