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
- Help users decide who to see.
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

## Design Principles

- Dark mode first.
- Primary accent: Cyan (#00E5FF).
- Secondary accent: Yellow (#E8FF47).
- Base background: Deep violet (#110D24).
- Font: Plus Jakarta Sans.

Favor:

- photography over illustrations
- whitespace over borders
- hierarchy over information density
- subtle depth over heavy visual effects

The UI should feel closer to Spotify, Apple Music, Linear, or Raycast than an admin dashboard.

Avoid unnecessary widgets or cards that do not help the user make a decision.

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

## Build Order

✅ Artist Page

Next priorities:

1. Explore
2. Quick Picks
3. Festival Artifact / Wrapped-style summary
4. Compare
5. Schedule