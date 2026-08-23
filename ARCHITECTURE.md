# FestFuse Architecture

System design decisions and data structure rationale for FestFuse.

## Overview

This document covers the current, built system: how artist and festival data is
modeled and normalized, how the Explore/Quick Picks/Planner/Festival Story features
work internally, and how the new backend persistence foundation is structured.

Significant choices and their tradeoffs are recorded separately in the
[architecture decision log](docs/decisions/README.md). This document describes the
accepted architecture as it exists now; the decision records preserve why it took
that shape.

Deferred polish items, open questions, and dismissed proposals live in
[FUTURE_CONSIDERATIONS.md](docs/FUTURE_CONSIDERATIONS.md) instead of inline here, so
this document stays focused on what actually exists.

### Highlights

A few decisions below are worth reading first if you're skimming:

- **[Multi-appearance modeling](#multi-appearance-support)** — repeat festival performances are modeled as separate appearance records tied back to one artist, not duplicated artist rows, so the same artist can play multiple sets without data drift between them.
- **[Backend persistence foundation](#backend-persistence-foundation)** — FastAPI, SQLAlchemy, PostgreSQL, and Alembic now provide a versioned path from the frontend's typed source data to a database-backed multi-festival system.
- **[Category normalization at scale](#categories-design)** — 448 raw "what to expect" phrases collapsed to 36 canonical tags, 285 "best for" phrases to 15, and 123 genres grouped into 10 families, all typed from one source of truth.
- **[Festival Story's insight engine](#festival-story)** — the personalized recap is computed from a user's actual attendance scope and picks each time, not a fixed or randomized script.
- **[Schedule conflict detection](#schedule-feature-mvp)** — the Planner grid flags real time/stage overlaps across a user's scheduled picks, not just a static calendar view.
- **[The interest-state model](#interest-state)** — Must See / Interested / Passed is a deliberately small, festival-scoped decision model, with a documented reason for *not* generalizing it further (see [Future Considerations](docs/FUTURE_CONSIDERATIONS.md)).
- **[Deterministic carousel sampling](#carousel-duplicate-suppression)** — Explore's featured rows look freshly shuffled but render identically between server and client, avoiding hydration mismatches.
- **[A rehydration-error debugging writeup](#hydrationgate-resilience-to-rehydration-errors)** — three separate, layered failure modes in the Zustand persist + localStorage + Next.js stack, each traced to root cause and fixed, not just patched over.

---

## Artist Data Structure

### Storage

Artist records live in `app/data/artists/`, organized by festival day for easier editing:

- `thursday.ts`, `friday.ts`, `saturday.ts`, `sunday.ts` — storage only
- `index.ts` — combines all four and exports `allArtists` and `artistsBySlug`

**Rule: Always import from `index.ts`, never from individual day files.**

The day files are an editing convenience, not a data boundary. Any feature that needs to filter by day must import `allArtists` from `index.ts` and filter using the artist's primary appearance — `getPrimaryAppearance(artist, ACTIVE_FESTIVAL_ID).day === "Friday"` (see "Multi-Appearance Support" below for why the primary appearance, not `artist.appearance`, which no longer exists as a singular field). This prevents silent bugs when artists are miscategorized or moved between days.

### Types

Located in `app/types/artist.ts`, using normalized categories from `app/data/categories.ts`:

```typescript
location: { city: string; state?: USState; country: Country }
genres: Genre[]
whatToExpect: WhatToExpectTag[]
bestFor: BestForTag[]
```

All categories are typed constants with `as const` for perfect type sync.

### Slug Naming Convention

`slug` is the canonical, ASCII-safe identifier for an artist — used for routing
(`/artist/[slug]`), `artistsBySlug` lookups, and (see "Search & Filter Pipeline") as
an exact/partial match target in Explore search, specifically so non-ASCII display
names stay findable via their plain-ASCII form.

Rules, in order of precedence:

- **Base form:** lowercase, hyphen-separated fold of the full `name`.
- **Leading articles are kept, not dropped:** `"The Chainsmokers"` → `"the-chainsmokers"`,
  `"The xx"` → `"the-xx"`.
- **Non-ASCII characters fold to their nearest plain-ASCII letter:** `"RØZ"` →
  `"roz"`, `"ADÉLA"` → `"adela"`.
- **Symbols are spelled out as the word they actually mean in context, never dropped
  silently** — and that word must be verified, not assumed: `"Haute & Freddy"` →
  `"haute-and-freddy"` ("&" means "and" here), `"bbno$"` → `"bbno-money"` (the
  artist's own stated pronunciation is "baby no money" — "$" means "money," not the
  more obvious-looking "dollar").
- **A well-known public abbreviation may replace a full transposition**, when it's
  the artist's own genuinely recognized shorthand, not one invented for this app —
  e.g. `"Chicago Youth Symphony Orchestra"` → `"cyso"`, `"5 Seconds of Summer"` →
  `"5sos"`. This is a real-world verification call, not a mechanical one.
- **No blanket rule for leading digits.** A number that's a specific, meaningful part
  of the artist's identity (e.g. `"54 Ultra"` → `"54-ultra"`, referencing Studio 54)
  is kept literal — there's no requirement to spell it out.

**Whenever a slug changes, every denormalized copy must be updated too.**
`similarArtists` entries elsewhere in the dataset store their own `{ name, slug }`
copy of the artist they reference, for display — these do not update automatically
and must be corrected by hand alongside the primary record.

### Editorial content: curation standard, not a runtime computation

`about` and `similarArtists` are AI-assisted editorial content, gated behind `aboutVerified`/`similarArtistsVerified` flags — neither renders in the app until it passes a fact-check pass against a documented source hierarchy (official artist/label/festival/Spotify pages first, then reputable music publications, AllMusic, and citation-checked Wikipedia; other festival tools and MusicBrainz/community tags are used only as cross-checks, never as a sole source). This is a data-authoring standard applied during review, not something the running app computes.

`similarArtists` specifically is chosen by deliberately mixing different matching dimensions per artist (sound/genre overlap, scene/scale, thematic parallel) rather than defaulting to genre-nearest-neighbors, and by always pairing at least one bigger-name act with one smaller/rising act instead of four similarly-sized names — with the reasoning behind the set and its ordering stated explicitly during review, not left implicit.

---

## Categories Design

### Why Normalized Categories?

Raw artist data contained overlapping, redundant, and inconsistent values:

- **whatToExpect:** 448 unique raw phrases → 36 canonical
- **bestFor:** 285 unique raw phrases → 15 canonical
- **genres:** 123 distinct values, grouped into 10 parent categories for reference

Normalization ensures:

- Type safety (TypeScript derivation from constants)
- Single source of truth (`app/data/categories.ts`)
- Consistent filtering and search behavior
- Editorial control over language and meaning

### Genre Parent Categories (10 total)

For organizational reference—filters and search use the full 123-genre list. Five of
the ten were renamed from their original slash-joined form (e.g.
`Punk/Hardcore/Metal` -> `Heavy`): multi-slash names were overflowing/clipping in
Festival Story headline copy, which interpolates the family name as a bare noun phrase
with no truncation or wrapping. The remaining slash-joined pairs (`Hip-Hop/Rap`,
`R&B/Soul`, `Dance/Electronic`) were kept specifically because they're verified
industry-standard joint category names (Apple Music's own genre list; the Grammys'
"Best Dance/Electronic Recording" award category) rather than two synonyms stapled
together — that distinction was the actual rule applied, not name length alone.

- **Rock:** 90s Alternative, Alternative Rock, Art Rock, Grunge, Indie Rock, Post-Punk, Shoegaze, etc.
- **Pop:** Alt-Pop, Art Pop, Dance Pop, Dancehall, Electropop, Hyperpop, J-Pop, P-Pop, Synth-Pop, etc.
- **Americana:** Americana, Country, Indie Folk, Singer-Songwriter, etc.
- **Hip-Hop/Rap:** Boom Bap, Hip-Hop, Plugg, Trap, Underground Rap, etc.
- **R&B/Soul:** Alternative R&B, Funk, Neo-Soul, R&B, Soul, etc.
- **Indie:** Bedroom Pop, Dream Pop, Indie Pop, Lo-Fi Indie, Slowcore, etc.
- **Dance/Electronic:** House, Techno, Drum and Bass, Dubstep, Future Bass, Industrial Techno, etc.
- **K-Pop:** K-Pop
- **Heavy:** Alternative Metal, Emo, Hardcore Punk, Metalcore, Punk Rock, etc.
- **Classical:** Classical, Symphonic Rock, etc.

---

## Genre Gradient Fallback (No-Photo Placeholder)

**Where used:** Artist Detail hero (`ArtistHero.tsx`), avatars including Similar
Artists (`ArtistAvatar.tsx`), Quick Picks' hero card (`DecisionScreen.tsx`), and
Explore grid cards (`ArtistCard.tsx`) — anywhere an artist has no curated `imageUrl`
yet. Replaces four previously separate, inconsistent placeholder implementations (a
flat circle + initials duplicated in two components, and a flat blank rectangle with
no initials at all in Quick Picks) with one shared component,
`app/components/ui/GenreGradientFallback.tsx`.

### Color mapping

`app/data/genreGradients.ts` maps each of the 10 `GenreFamily` values to a single
accent hex (`GENRE_FAMILY_GRADIENTS`), paired with one shared dark base
(`GENRE_GRADIENT_BASE = "#1B1535"`) for every gradient. Two rules constrain the
palette:

- **Stays clear of the 5 semantic colors.** Each accent hue sits outside a ±12°
  exclusion zone around the _actual computed hue_ of cyan/yellow/celebration/conflict
  (not eyeballed ranges) — a genre color must never risk being misread as one of those
  meaningful signals.
- **Energy tiers, not a flat envelope.** Saturation/lightness vary per family — deep
  and muted for grounded genres (Rock, Americana, Classical, R&B/Soul), bright and
  punchy for high-energy ones (Pop, Dance/Electronic, K-Pop) — rather
  than one uniform S/L for all 10. An earlier flat-envelope pass made most families
  visually indistinguishable from their neighbors; hue alone wasn't enough separation
  at low, uniform saturation.
- **Hip-Hop/Rap avoids the entire 240-290° hue range**, not just the neutral-violet
  midpoint — the app's own foundation (`#110D24`, `#1B1535`, `#2D2556`) is violet-toned
  throughout, so any genre color in that range reads as UI chrome rather than a
  deliberate choice, regardless of saturation. It sits in the warm cluster instead,
  differentiated from its neighbors by value alone (brighter/more saturated) — the
  same pattern that separates Rock from Pop at a similarly tight hue gap.

### Why `direction` is a prop, not hardcoded

Each call site already has its own text-legibility overlay (a gradient that darkens
part of the card so text stays readable). The fallback's own gradient direction must
be chosen so its vivid accent lands where that overlay is _weakest_, not where it's
strongest — getting this backwards effectively double-darkens the accent into
invisibility (hit twice during development: once on Artist Hero, once on Quick
Picks/Explore cards). Left-anchored text (Artist Hero) uses the default `135deg` (base
top-left, accent bottom-right); bottom-anchored text (Quick Picks, Explore cards)
passes `direction="to top"` so the accent sits at the top, away from each card's own
bottom-heavy darkening overlay.

Several call sites also needed their _own_ overlay softened for the fallback case —
the fallback already darkens progressively toward the text on its own, so stacking a
full photo-legibility overlay on top double-darkens (a photo needs that overlay to
create any darkening at all; the gradient doesn't). `ArtistHero`, `DecisionScreen`,
and `ArtistCard` each skip or shorten their normal overlay when rendering the
fallback, using a much shorter eased fade at the seam into whatever's below instead.

### Known limitation

The circle variant's border (`ArtistAvatar`) must be a fully opaque color, never a
translucent `rgba()` — a translucent border alpha-blends with whatever gradient color
sits behind each point on the ring, which reads as an uneven, "broken" border on a
background this varied in lightness. Kept muted/dark (`#5A5578`) rather than light so
it doesn't outcompete real photo avatars sitting next to it in the same list.

### Similar Artists now reuse the linked artist's own data

`FloatingCards.tsx`'s Similar Artists list no longer reads `similarArtists[].imageUrl`
(a separately-curated, externally-sourced field) for its avatars. Since every similar
artist is always a lineup artist (the recommendation algorithm draws from the
festival's own roster), it looks the artist up via `artistsBySlug` and reuses _their
own_ `imageUrl`/`genres` — the same asset already curated for their own artist page —
falling back to the gradient above when that artist doesn't have a photo yet either.

**`similarArtists[].imageUrl` itself is now dead code** — no remaining reader anywhere
in the app — but is being kept in the type and in all ~675 data entries for now rather
than removed. This is a deliberate product decision, not an oversight — don't clean it
up without checking first.

---

## What to Expect — Design Rationale

**Current status:** `whatToExpect`, along with `tagline`, `whySee`, and `bestFor`, is
unverified AI-generated content. None of the four drive any application behavior
(search, filter, carousel, rank, recommend, or Festival Story signal) — they remain
dormant in the type and artist data below as a taxonomy/content reference, not as
something the app currently reads. `about` is the only AI-authored artist prose
actually rendered in the UI (Artist Detail's About section).

### Overview

The `whatToExpect` field describes what the audience will experience at a performance—observable, reusable, and orthogonal to genre when possible.

**Coverage:** ~336 of 448 raw values (75%). The unmapped 25% are acceptable; artists receive fewer tags for non-fitting descriptors rather than forced fits.

### 36 Canonical Phrases

#### Crowd Participation & Energy (6 phrases)

1. **Energetic Mosh Pits** — Crowd participation via physical intensity and pit formation
2. **Massive Singalongs** — Audience collectively singing along; anthemic moments
3. **Dance Floor Energy** — Continuous groove-oriented participation without structured mosh
4. **Crowd Atmosphere** — Crowd size, mood, and communal feeling (independent of participation type)
5. **Intense Fan Connection** — Deep fan passion, emotional investment, and mutual intensity
6. **High-Energy Pacing** — Relentless, nonstop momentum and velocity throughout

#### Time & Mood Context (2 phrases)

7. **Afternoon Vibes** — Daytime/warm/upbeat emotional tone and timing aesthetic
8. **Late-Night Energy** — Nocturnal, after-hours, or club-era mood and timing aesthetic

#### Vocal Performance (5 phrases)

9. **Technical Vocal Range** — Exceptional multi-octave range, operatic, or classical vocal technique
10. **Raw Vocal Delivery** — Unprocessed, aggressive, visceral, or powerful vocal approach
11. **Conversational Delivery** — Spoken-word, banter-driven, witty, deadpan, or dialogue-based vocals
12. **Lyrical Storytelling** — Narrative-driven, literary, poetic, or storyteller-focused lyrics
13. **Melodic Vocal Hooks** — Catchy, singable, chopped, or memorable vocal moments

#### Instrumentation & Sound (5 phrases)

14. **Guitar-Driven Sound** — Guitar as primary instrument; riffs, distortion, or prominent lead
15. **Bass & Groove** — Bass-heavy, groove-oriented, funk-influenced, or rhythmic pocket focus
16. **Synth & Atmospheric** — Synth textures, pads, atmospheric soundscapes, or electronic layering
17. **Live Band Performance** — Full live instrumentation, horns, multi-piece ensemble, or live band setup
18. **Rhythm Complexity** — Complex time signatures, progressive structures, or intricate rhythmic layering

#### Performance Format & Dynamics (3 phrases)

19. **Choreography** — Synchronized movement, dance, acrobatics, or choreographed stage presence
20. **Ensemble Format** — Family/sibling performance, band chemistry, or group/collaborative dynamic
21. **Multilingual Performance** — Bilingual, cross-language, or multilingual performance delivery

#### Visual Presentation (6 phrases)

22. **High-Production Visuals** — Elaborate laser arrays, strobe effects, or intensive lighting design
23. **Cinematic Visuals** — Narrative-driven backdrops, visual loops, or theatrical visual storytelling
24. **Theatrical Staging** — Costumes, dramatic lighting, showmanship, or theatrical presentation
25. **Fashion Visual** — Fashion-forward styling, runway-ready presentation, or high-fashion aesthetic
26. **Retro-Futuristic Aesthetic** — Y2K, glitchy, or futuristic visual design language (visual, not genre)
27. **Dark Mood Visuals** — Gothic, shadowy, moody, or dark visual aesthetic (visual, not genre)

#### Production & Texture (5 phrases)

28. **Intimate Performance** — Close-mic'd, small-scale, vulnerable, or personal connection focus
29. **Lush Sound** — Layered, orchestrated, richly textured, or densely arranged instrumentation
30. **Dreamy Atmosphere** — Ethereal, shimmering, or ambient-quality vocals/texture (adds signal beyond Dream Pop genre)
31. **Minimal Production** — Sparse, stripped-back, minimalist, or low-density aesthetic
32. **Production Style Approach** — Observable production texture: polished, pristine, sleek, gritty, or stripped

#### Scale, Scope & Lyrical Depth (4 phrases)

33. **Large-Scale Production** — Arena-scale, festival-scale, headliner-level, or grand production values
34. **Period-Specific Sound** — Era-specific or nostalgic sound reference (90s, 80s, 70s throwback, etc.)
35. **Lyrical Emotional Depth** — Heartfelt, emotionally specific, or deeply personal lyrical content
36. **Spectacle Moments** — Pyrotechnics, confetti, career-spanning setlist, or viral/memorable moments

### Design Decisions

- **All 6 sparse-coverage categories kept:** Multilingual Performance, Retro-Futuristic Aesthetic, Ensemble Format, Period-Specific Sound, Dark Mood Visuals, and Dreamy Atmosphere are real, reusable concepts orthogonal to genre or empirically add signal.
- **Production Style Approach added:** Observable production texture descriptors (polished/pristine/sleek/gritty/stripped) distinct from production scale or genre.
- **No force-fitting:** Artists without a matching descriptor simply have fewer tags — this is correct behavior, not a problem to solve.

---

## Festival Configuration

The current frontend still reads festival-specific configuration from
`app/data/festivals.ts` while the database-backed system is introduced
incrementally:

```typescript
export const ACTIVE_FESTIVAL_ID = "lollapalooza-2026";

export const FESTIVAL_STAGES: Record<string, readonly string[]> = {
  "lollapalooza-2026": ["Airbnb", "Allianz", "BMI", "Bud Light", "Perry's", "T-Mobile", "Tito's"],
};
```

Until a frontend flow is migrated to the API, its TypeScript data remains the
runtime source of truth. The PostgreSQL models described below are the target
persistence model, not yet a replacement data source for the UI.

---

## Backend Persistence Foundation

The backend lives in `backend/` and uses FastAPI for HTTP APIs, SQLAlchemy 2 for
database mapping, Psycopg 3 for PostgreSQL connectivity, and Alembic for versioned
schema migrations. Environment-specific connection values are loaded from the
ignored `backend/.env`; committed migration files are the reproducible source of
truth for database structure.

The API currently exposes health checks, including a database health check that
verifies the configured PostgreSQL database. The Next.js frontend does not consume
festival data from the API yet.

### Festival hierarchy

```text
Festival
└── FestivalRun
    └── FestivalDay
        └── Appearance (planned)
```

- `Festival` represents a dated edition such as Lollapalooza 2026 or ACL 2026.
- `FestivalRun` represents a distinct schedule/lineup variant such as Weekend One
  or Weekend Two. A single-run festival still owns one run.
- `FestivalDay` stores an actual calendar date within a run. Weekday names are
  derived from the date; its nullable `label` is reserved for non-derivable copy
  such as "Opening Night."
- Artist appearances will eventually reference a festival day rather than storing
  a free-standing weekday string.

Start/end dates are derived from the edition's days instead of stored on
`Festival`, which supports non-contiguous dates without implying that the festival
runs on every intervening day.

Initial application data is created through committed, rerunnable seed/import
scripts rather than embedded in schema migrations. Alembic owns structure; seed and
import workflows own application records.

See [ADR-0001](docs/decisions/0001-introduce-fastapi-postgresql-backend.md) and
[ADR-0002](docs/decisions/0002-model-festival-runs-and-days.md) for the context,
alternatives, and consequences behind these choices.

---

## Search & Filter Pipeline

**Order matters:** Filters apply first, then search within the filtered set.

**Search matching hierarchy** (stops at first match):

1. Artist name (exact)
2. Artist name (partial/substring)
3. Genre
4. Country
5. State
6. City
7. Stage

Deliberately does not search `tagline`, `whySee`, `whatToExpect`, or `bestFor` —
unverified AI-generated prose, excluded from every search/filter/rank/recommend path
app-wide.

**Minimum query length:**

- Artist name: no minimum (allows "V" to match "V" or "Vince Staples")
- All other fields: 2-character minimum (prevents overly broad single-character matches)

**Matching:** Case-insensitive substring only, no fuzzy/typo tolerance.

---

## Component Architecture

### Explore Page State

The Explore page manages four distinct states:

1. **No filters + no search** → Show curated carousels (Festival Favorites, International Picks, Chicago's Own, After Dark)
2. **Filters only** → Show ActiveFilters bar + ArtistResultsGrid
3. **Search only** → Show search heading + ArtistResultsGrid
4. **Search + filters** → Show ActiveFilters bar + ArtistResultsGrid

**Known limitation:** `exploreFilterStore` (and search) is a plain, non-persisted
Zustand store, so it already survives ordinary in-app navigation (browse → view an
artist → return), but not a hard page reload. A potential future change would give it
the same `persist` + `hasHydrated` treatment as `decisionStore`/`scheduleStore`/
`plannerViewStore`/`attendanceStore` (see "State Summary → Stores" under Schedule
Feature) — not committed to, lower priority since the common case already works.

### Dropdown Components

- **MultiSelectDropdown:** Reusable for Genre, Stage, Pick Status, and Schedule Status (checkboxes, multiple selection)
- **SingleSelectDropdown:** Reusable for Day (highlighted rows, single selection)

Both handle open/close state via parent, enabling clean separation of concerns.

Both also auto-flip their panel from `left-0` to `right-0` when it would overflow the viewport — necessary because which filter pill ends up rightmost is decided by `flex-wrap` at render time, not by which filter it is (the same pill can sit mid-row on one viewport width and last-in-row on another), so the anchor can't be assigned per-instance. This needs a genuine two-pass measure-then-reveal (render "measuring" — always left-anchored, invisible — then a second effect measures that clean baseline and reveals the real position) rather than a single measure+`setState` effect; the single-pass version measured a stale DOM snapshot left over from the panel's previous open and caused the anchor to oscillate between left and right on repeated opens. See the `align` state and its paired `useLayoutEffect`s in either component for the implementation.

`PlannerMobileFilters.tsx` (`app/components/planner/`) is a related but simpler pattern for the Planner toolbar's mobile filter trigger — it doesn't need the same flip logic since it's always the rightmost element in its row by construction, so it hardcodes `right-0`.

---

## Carousel Duplicate Suppression

Carousel rows are classified by whether they answer objective (factual) or subjective (curatorial) questions.

### Row Classification

**Factual/Criteria-Based Rows** (answer checkable, objective questions):

- Festival Favorites — "Is this artist a headliner/sub-headliner?" (objective fact)
- International Picks — "Is this artist from outside the US?" (objective fact)
- Chicago's Own — "Is this artist from Chicago?" (objective fact; `location.city ===
"Chicago"` exactly, not the whole state of Illinois)
- After Dark — "Does this artist's primary appearance start at 8:00 PM or later?"
  (objective fact, via the shared `timeStringToMinutes` parser — see "Carousel
  Presentation Strategies" below)
- Future rows: Larger Than Life, etc.

**Curatorial/Discovery Rows** (answer subjective "is this worth surfacing" questions):

- None currently — all active rows are factual/criteria-based. A future row like "Hidden
  Gems" ("Is this artist overlooked/underrated?") is possible but requires ongoing
  editorial curation to keep accurate, so it's future work rather than a current row.

### Suppression Rules

**Rule A: Factual rows never suppress against each other or Festival Favorites.**

An artist can legitimately be:

- A headliner _and_ international _and_ playing After Dark simultaneously
- From Chicago _and_ a sub-headliner _and_ have great lyrics

All three facts are simultaneously true. Hiding an artist from one row because they appear in another would make each row factually incomplete or misleading.

**Rule B: A curatorial row suppresses against Festival Favorites** (future work, no curatorial row currently exists).

A curatorial row's premise is typically "overlooked" or similarly editorial, which is contradicted if a headliner appears in it. If a curatorial row is added, it should exclude artists already shown in Festival Favorites.

**Rule C: If you had two curatorial rows, they'd suppress against each other** (future work).

If you added a second curatorial row (e.g., "Artists Worth Seeing Early"), you'd want the same editorially-chosen artist to not appear twice under different curatorial framings.

Right now neither Rule B nor Rule C applies to anything — After Dark is factual (Rule A), not curatorial, and no curatorial row currently exists.

---

## Carousel Presentation Strategies

Two distinct algorithms power carousel rows, chosen based on the row's editorial intent:

### shuffleDayBlocks (Festival Favorites only)

**Intent:** Maintain billing tier hierarchy within each day, vary which day appears first.

**Algorithm:**

1. Filter artists (headliners/sub-headliners)
2. Sort by day (defensive)
3. Group by day, sort within each group by billing tier (explicit enforcement)
4. Shuffle the order of day-blocks (not artists)
5. Concatenate shuffled blocks

**Why this pattern:** Billing prominence matters for Festival Favorites — headliners should appear before sub-headliners within a day. But showing Thursday first every page load is boring. Day-block shuffling varies the sequence while preserving the billboard poster order within each day. Avoids the "headliner-clumping" problem that artist-level interleaving would cause.

**Example:**

- Input (after filtering): Thu=[H1, S1], Fri=[H1, S1], Sat=[H1, S1], Sun=[H1, S1]
- After shuffle: [Sat=[H1, S1], Thu=[H1, S1], Sun=[H1, S1], Fri=[H1, S1]]
- Result: Each day's block is contiguous and tier-ordered, day sequence varies

### interleaveByDayShuffled (all other carousel rows)

**Intent:** Break file-order bias, distribute artists across days evenly, no tier enforcement.

**Algorithm:**

1. Filter artists (apply row-specific criteria)
2. Sort by day (defensive)
3. Group by day, shuffle within each group (breaks bias)
4. Round-robin interleave across shuffled groups
5. Concatenate result

**Why this pattern:** All other rows (International Picks, Chicago's Own, After Dark) don't care about billing prominence — they're answering a different question ("Is this artist from outside the US?" not "Is this artist famous?"). File-order bias is a hazard: if the data file happens to list headliners first, every row would inherit that prominence bias without editing work. Shuffling within days breaks that bias. Round-robin interleaving distributes artists across visible viewport positions evenly (first visible artist comes from each day in order) rather than front-loading any single day.

**After Dark's 8:00 PM threshold:** chosen from the actual lineup distribution, not a
round-number guess. At 8:00 PM, 19 artists qualify, spread 4-5 per day across all four
festival days — a well-populated, evenly-distributed row. 8:30 PM narrows this to 16
(4/day); 9:00 PM drops to just 5 total, too sparse for a discovery row. Uses each
artist's primary appearance (`getPrimaryAppearance`, consistent with every other
carousel) and the shared `timeStringToMinutes` parser (`app/lib/time.ts`) rather than
comparing time strings lexicographically.

**Example:**

- Input: Thu=[A, B], Fri=[C, D], Sat=[E], Sun=[F]
- After shuffle within days: Thu=[B, A], Fri=[D, C], Sat=[E], Sun=[F]
- Interleaved (one from each day): [B, D, E, F, A, C]
- Result: Mix of days visible at all scroll positions, no day/artist clustering

**Data Consistency Note:**
Both functions call `sortByDay()` defensively at the start. This prevents silent bugs if artist data ever gets shuffled or if upstream filters reorder artists unexpectedly. The sort is cheap and provides defensive consistency.

---

## Carousel "See All" Full View

Clicking "See all" on any carousel row enters a full-page grid view of that row's artists. The design follows these principles:

### Design Specs

1. **Full grid view, not modal** — "See all" navigates to a full page view, not an overlay. The carousel row's artists display in a standard ArtistResultsGrid.

2. **Stable sort order** — Display order is deterministic and differs from the carousel's shuffled presentation:
   - **Festival Favorites:** day → billing tier → appearance time → artist name
   - **All other rows:** day → appearance time → artist name

   This provides consistent reference ordering for browsing, distinct from the carousel's curatorial shuffle.

3. **Header with row name + count + back button** — Shows "International Picks · 24 artists" plus a clear "Back to Explore" button. Heading is visible at top of page on entry.

4. **Row criteria as locked filter** — The row's filter is implicit but fixed (e.g., "International Picks" = non-US artists). Reuse the existing filter/search UI and ArtistResultsGrid on top of it. Users can add additional filters (by genre, day, stage) but cannot remove the row's base criteria.

5. **State reset bidirectionally** — Filters and search do not persist between contexts:
   - Entering "See all" clears any active filters/search from the main Explore view. The row's criteria becomes the sole starting filter.
   - Exiting back to Explore from a carousel view clears any filters/search applied within that carousel. The user returns to a clean Explore state.

   This ensures "See all" means "show me everyone in this row" and prevents confusion from filters carrying over between distinct discovery contexts.

### Implementation

- `viewingCarousel` lives in `exploreFilterStore` (`null` = main Explore, string = carousel ID) — see "Sidebar Filter Shortcuts" below for why it's store-resident rather than local state.
- `handleSeeAll()` calls `showCarousel()`, which atomically clears filters/search, enters the carousel view, and bumps `navigationRevision`.
- `handleBackToExplore()` calls `clearFilters()`, which returns to clean Explore and bumps `navigationRevision`.
- `ExploreContent` scrolls the results container to the top in a `useLayoutEffect` keyed on `navigationRevision`.
- Carousel data is keyed in `carouselMap` for use by both carousel rows (State 1) and full view (State 5)

The following is a **simplified illustration** of how each carousel is computed in `app/components/explore/ExploreContent.tsx`. See that file for the actual implementation, including memoization, dependency arrays, and ESLint overrides. The patterns here show the filter + presentation logic only:

```typescript
// Festival Favorites: factual, no upstream suppression
// Pipeline: filter to headliners/sub-headliners → sort by day → sort within each day by billing tier
// → shuffle day-block order → concatenate (see shuffleDayBlocks in app/lib/carousel.ts)
// Result: each day's billing tier order is explicit & consistent, but day sequence varies per load
const festivalFavorites = shuffleDayBlocks(
  allArtists.filter((a) => {
    const tier = getPrimaryBillingTier(a, ACTIVE_FESTIVAL_ID);
    return tier === "Headliner" || tier === "Sub-headliner";
  })
);

// A future curatorial row (see Rule B above) would filter by editorial criteria,
// exclude headliners/sub-headliners, and exclude artists already in Festival Favorites:
//   const shownInFestival = new Set(festivalFavorites.map((a) => a.slug));
//   allArtists.filter((a) => meetsCuratorialCriteria(a) && !shownInFestival.has(a.slug))
// then sort by day → shuffle within days → interleave across days, same as the rows below.

// International Picks: factual, no suppression (Rule A)
// Pipeline: filter to non-US → sort by day → shuffle within days → interleave
// Result: represents all qualifying artists, shuffled presentation breaks file-order bias
const internationalPicks = interleaveByDayShuffled(
  allArtists.filter((a) => a.location.country !== "United States")
);

// Chicago's Own: factual, no suppression (Rule A)
// Pipeline: filter to Chicago (city only) → sort by day → shuffle within days → interleave
// Result: represents all qualifying artists, shuffled presentation breaks file-order bias
const chicagosOwn = interleaveByDayShuffled(
  allArtists.filter((a) => a.location.city === "Chicago")
);

// After Dark: factual, no suppression (Rule A)
// Pipeline: filter to primary appearance >= 8:00 PM → sort by day → shuffle within days → interleave
// Result: represents all qualifying artists, shuffled presentation breaks file-order bias
const afterDark = interleaveByDayShuffled(
  allArtists.filter(
    (a) => timeStringToMinutes(getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).startTime) >= 20 * 60
  )
);
```

---

## Interest State

User decisions (Must See, Interested, Passed) are centralized in a Zustand store with localStorage persistence. This serves as the single source of truth across Explore, Artist Detail, Quick Picks, and future features. Decisions also track their source and timestamp for potential use by features like Festival Story.

### Store Shape

```typescript
type Verdict = "mustSee" | "interested" | "passed";

interface ArtistDecision {
  verdict: Verdict;
  source: "explore" | "artist" | "quickPicks";
  updatedAt: number; // millisecond timestamp
}

interface InterestState {
  decisionsByArtist: Record<string, ArtistDecision>;
  setDecision: (
    artistId: string,
    verdict: Verdict | null,
    source: ArtistDecision["source"]
  ) => void;
}
```

**Key design choices:**

- **Three verdict states, not two:** "passed" is distinct from unset/null. Allows Quick Picks re-runs to differentiate "never considered" from "actively rejected," and lets Surprise Me treat "passed" as eligible for second-chance while excluding "mustSee"/"interested".
- **Missing key = undecided:** No entry in `decisionsByArtist` means the artist has never received a verdict.
- **Decision metadata:** Source and timestamp are captured at write-time. No features consume these yet, but Festival Story (planned near-term) may reference decision provenance (e.g., "most of your Must Sees came from Quick Picks"). Capturing now avoids data loss—this information cannot be reconstructed after the fact.
- **Note on Surprise Me:** Surprise Me only navigates to a random artist's detail page—it doesn't present a decision UI. Any verdict set after landing on that page correctly uses `source: "artist"`, the same as any other artist-page decision.

### Interest State: Must See / Interested Selection Model

#### Design

Must See and Interested are displayed as two independent, always-visible controls (star and heart), but they represent a **single underlying field**: `verdict`, which holds exactly one of `"mustSee" | "interested" | "passed" | null` (missing key = `null`/undecided) per artist.

The two controls are **mutually exclusive** in the UI:

- Clicking **Must See** sets `verdict` to `"mustSee"` directly. If `verdict` is already `"mustSee"`, clicking again clears it to `null`.
- Clicking **Interested** sets `verdict` to `"interested"` directly. If `verdict` is already `"interested"`, clicking again clears it to `null`.
- Only one icon is ever shown active at a time. Selecting one always fully deselects the other, since both are values of the same field, not independent flags.

There is no cascade (Must See does not also visually activate Interested) and no cycling order between the two buttons — each is a direct-access control for its own value.

#### Why this model, not the alternatives

**Why not two independent flags?** An artist cannot simultaneously be "Must See" and "not Interested" — that combination doesn't correspond to anything meaningful, and more importantly, it's a state Quick Picks can never produce (Quick Picks presents Pass / Interested / Must See as one discrete choice). Two independent flags would let Explore and the artist page create states that don't exist anywhere else in the app.

**Why not a visual cascade (Must See implies Interested, both icons light up)?** This was the original design and was replaced. It correctly modeled the single-field data, but visually implied a hierarchy that didn't match how the icons were interacted with — clicking felt like operating two related-but-separate toggles, not one shared choice. This mismatch caused two concrete problems: `heartVisible` required local state kept in sync with `verdict` via delayed animation and cascade logic, which produced multiple real bugs (stale state on mount, stale state after in-place edits, animation timing races); and sidebar counts moving in pairs (Must See count down, Interested count up) when downgrading a decision, which was correct but visually confusing without understanding the underlying cascade rule.

**Why not a single cycling button (Pass → Interested → Must See → …)?** This makes the implicit ranking explicit, but forces users through unwanted intermediate states to reach a specific one — e.g., moving from Interested to Passed would require cycling through or past Must See. Two direct-access buttons let a user reach any state in exactly one click.

**Why not a dropdown or labeled radio group?** Functionally equivalent to the discrete-buttons model, but heavier UI — hides options behind an extra interaction (dropdown) or requires a labeled group treatment that doesn't fit the existing icon-button placement on artist cards and the artist detail page.

#### Why mutual exclusivity is the right visual language

Since Must See and Interested are the same field, showing only one icon active at a time **is** the hierarchy — a user doesn't need cascade animation or explanatory copy to understand "these are exclusive choices," because the UI never allows both to appear active simultaneously. This is a more honest representation of the data than implying Must See is additive on top of Interested.

#### Interaction with Quick Picks re-eligibility

Clearing a verdict (clicking an active button to deselect it) sets `verdict` back to `null`. Since Quick Picks' default queue excludes any artist with an entry in `decisionsByArtist`, clearing a decision on Explore or the artist page makes that artist eligible to reappear in a future Quick Picks session. This is intentional — it is the app's only "undo history" mechanism, and it works at the level of a single artist rather than requiring a bulk reset. No separate "reset all decisions" feature is needed for this reason: any decision, anywhere, can be individually cleared, and doing so naturally re-opens that artist to Quick Picks.

### Festival Scoping

**Current limitation:** `decisionsByArtist` is keyed by artist ID (slug) alone, with no festival-level scoping. This is safe only because exactly one festival's data exists today (Lollapalooza 2026). Artist IDs themselves are not inherently festival-unique — the same artist can and will appear on multiple festivals' lineups.

**Before adding multi-festival support, this MUST change.** Without festival scoping, a decision made for an artist at one festival would silently and incorrectly apply to every festival that artist appears on. For example: if a user marks "Taylor Swift" as "Must See" at Lollapalooza, the store would later incorrectly mark that user as intending to see Taylor Swift at Coachella, despite never having made that choice.

**Migration path:** Either:

1. **Compound key:** Rekey `decisionsByArtist` to use `{festivalId}:{artistSlug}` as the dictionary key.
2. **Nested structure:** Restructure to `decisionsByFestival[festivalId][artistSlug]` for explicit per-festival scoping.

**Do not add a second festival without addressing this first.** It will silently corrupt user decisions across festival contexts.

**Attendance-day awareness is similarly narrow today.** `attendanceDaysByFestival` (see "Quick Picks Attendance" below) is already festival-scoped, but only two consumers read it: Quick Picks (`StartScreen`) and Festival Story (`FestivalStorySequence`). Explore, Home, Planner, and Artist Detail never read the user's selected attendance days — day-based filtering on those surfaces (e.g. Explore's day filter) uses each artist's own `appearance.day`, not the user's attendance selection. This is current state, not a defect; expanding attendance-day awareness app-wide is a separate, undecided product question from the festival-scoping fix above.

One surface has since had its copy made day-aware without changing this underlying scope: `QuickPicksCompleteScreen.tsx`'s locked Festival Story explanation now names the specific attended day (or "your selected days" for multi-day sessions), sourced from the same `attendanceDays` prop the screen already used for other copy. This exists because `Sidebar.tsx`'s "My Picks" count sums every decision across the entire `decisionsByArtist` map with no day filtering, while the Story's unlock threshold is attendance-scoped — a user can see a much higher unscoped total in the Sidebar and be confused why the Story still reads as locked. The copy fix addresses that confusion in place; it does not change what counts toward the unlock threshold, and the Sidebar count itself remains unscoped, consistent with the app-wide state described above.

### State Boundaries

**In shared store (persisted to localStorage):**

- `ArtistDecision` per artist — the verdict, where it came from, and when it was decided.

**In local component state:**

- `heartVisible` — animation/display detail and visual sync state. The heart icon's fill/color is driven by heartVisible, not by verdict directly, so its _initial value_ on mount must be derived from the store (`heartVisible = verdict === "interested" || verdict === "mustSee"`). Only the _ongoing_ cascade-delay behavior (the 100ms timeout when Must See is tapped from neutral) is truly local and session-only. Without this initialization, "Interested" silently fails to visually sync across pages while "Must See" (which reads directly from the store) works fine.

Keeps the store focused (one decision fact per artist) while preserving all existing UI cascade behavior and ensuring visual state stays consistent across navigation.

### Quick Picks Session vs. Shared Store

Quick Picks maintains two separate, coherent pieces of state:

**Session state (ephemeral):**

- Queue position, verdicts recorded during this session, undo eligibility, day boundaries

**Shared store (persistent):**

- Current decision (verdict, source, timestamp) for each artist

**Critical rule:** When a Quick Picks verdict is recorded (mustSee/interested/passed), it must call `setDecision()` immediately with `source: "quickPicks"`. The session state tracks verdicts for undo and progress; the shared store makes the decision visible across the app. Verdicts should not wait until Quick Picks completes.

### Filtering Rules by Feature

- **Quick Picks default queue:** Only artists with no entry in `decisionsByArtist` (fully undecided).
- **Quick Picks re-runs:** Same as above—only undecided artists, skipping those with any prior verdict.
- **Surprise Me:** Exclude artists with verdict "mustSee" or "interested"; include artists with verdict "passed" (second-chance discovery).
- **Explore / Artist page:** Can freely set/overwrite any current verdict.

### Undo Requirement

Undoing a Quick Picks decision has two effects:

1. **Session undo:** Remove the verdict from the session's `decisions` object and rewind queue position for the animation.
2. **Store undo:** Restore the artist's previous verdict from the store (or remove the key entirely if there was no prior verdict).

This prevents inconsistency where Quick Picks shows "undo worked" but Explore or the Artist page still shows the old decision.

**Example:** If an artist was previously marked "mustSee" on the artist page, then Quick Picks marks them "passed," undoing the Quick Picks verdict restores "mustSee" in the store and UI.

### Migration Note

When implementing the store, `app/types/quick-picks.ts` currently defines `QuickPicksVerdict = "pass" | InterestLevel` using "pass" (old spelling). After this architecture is implemented, `QuickPicksVerdict` should become an alias to `Verdict` from `app/types/interest.ts`, and all uses of the string "pass" in DecisionScreen and quick-picks/page.tsx should be updated to "passed" for consistency. After the change, run `npx tsc --noEmit` to confirm zero errors across the whole project, not just the files directly touched.

---

### Status Filtering: Verdict vs. StatusFilterValue

The Status filter (Explore page) displays four options—Must See, Interested, Passed, Undecided—but these are not all stored verdict values.

**Stored verdicts** (`app/types/decision.ts`):

- `Verdict = "mustSee" | "interested" | "passed"`
- Represents an actual decision a user has made and persisted to the store

**Undecided** is not a stored verdict—it represents the _absence_ of a decision (no entry in `decisionsByArtist`). To filter by it, the Status filter uses an extended type:

```typescript
type StatusFilterValue = Verdict | "undecided";
```

This distinction is important:

- User decisions always use `Verdict`, never `"undecided"`. You cannot call `setDecision(artistId, "undecided", source)`.
- The Status filter can use `StatusFilterValue` because filtering is read-only. When the filter includes `"undecided"`, it matches artists where `decisionsByArtist[artistId]` is undefined.
- This prevents a bug where someone accidentally passes `"undecided"` to `setDecision()`, which would try to persist a meaningless value to localStorage.

**Filter logic** (`app/lib/filters.ts`):

- If `StatusFilterValue[]` includes `"undecided"`, also include artists with no entry in `decisionsByArtist`
- If it includes actual verdicts, match artists whose stored verdict is in the list
- Combined with OR logic: "Show me artists that are mustSee OR interested OR undecided"

**UI** (`STATUS_FILTER_LABELS` in `app/data/categories.ts`):

- Maps all four options to human-readable labels for the dropdown and pill display
- Separates `VERDICT_LABELS` (for undo toast, sidebar counts, etc.) from `STATUS_FILTER_LABELS` (filter UI only)

### Sidebar Filter Shortcuts

The Explore page's five filter facets (`genres`, `day`, `stages`, `pickStatus`,
`scheduleStatus`) can be pre-selected by clicking sidebar links ("My Picks", "Must See",
"Interested", "Scheduled", "Conflicts") without requiring URL state or navigation to a
different page.

**Design:**

1. **Live filter store** (`app/store/exploreFilterStore.ts`):
   - Zustand store holding all five filter facets directly — `genres`, `day`, `stages`,
     `pickStatus`, `scheduleStatus` — plus `searchQuery`, `viewingCarousel` (which carousel,
     if any, is showing its "See all" full view), and `activeNavItem` (which sidebar
     destination is current, since Explore and all five My Festival links share the
     `/explore` pathname). `searchQuery` and `viewingCarousel` live here rather than as
     local state in `ExploreContent` for the same reason the five facets do: Sidebar-driven
     navigation needs to be able to reset them as part of landing on a clean preset view,
     and only the store is reachable from both `Sidebar.tsx` and `ExploreContent.tsx`.
   - **Intentionally in-memory-only** — does NOT use Zustand's persist middleware (unlike
     `useDecisionStore`/`useScheduleStore`). A full page refresh resets everything to empty,
     since nothing is written to localStorage. Browser back/forward is a separate case —
     see the manual test checklist below — it's been observed to restore whatever state was
     active rather than resetting.
   - No separate "pre-applied" representation and no one-shot consume-then-clear signal —
     the store IS what Explore currently shows, always. Callers set it directly and
     synchronously, before navigating, so a freshly-mounted Explore reads an already-
     correct store on its very first render.
   - `NAV_PRESETS`: a `Record<Exclude<ActiveNavItem, "explore">, NavPreset>` map (a
     `{facet: "pick", values: PickStatusFilterValue[]} | {facet: "schedule", values:
ScheduleStatusValue[]}` discriminated union, built with `satisfies` so a typo in a
     value fails to compile) — the single source of truth for what each My Festival preset
     means in terms of `pickStatus`/`scheduleStatus`. Exported so `Sidebar.tsx` can reuse it
     for highlight validation instead of keeping a second, driftable copy.
   - `navigationRevision`: a counter bumped by all three actions below. It's a pure
     trigger — `ExploreContent` uses it only to know "scroll the results container back to
     top," never as data — which is a narrower, safer use of a counter than this store's
     old `sidebarNavigationCount` (removed earlier in this refactor). That one gated
     _application of filter values_, so which value was "current" depended on timing
     relative to the counter — the exact mechanism behind this session's stale-filter
     bugs. `navigationRevision` only re-triggers an idempotent DOM action, so there's no
     staleness for it to introduce.
   - `applyPreset(preset)`: resets `genres`/`day`/`stages`/`searchQuery` to empty, leaves
     carousel view, sets `pickStatus`/`scheduleStatus` per `NAV_PRESETS[preset]`, sets
     `activeNavItem`, and bumps `navigationRevision` — one atomic `set()` call.
   - `clearFilters()`: resets every facet, `searchQuery`, and `viewingCarousel` to empty,
     sets `activeNavItem` to `"explore"`, and bumps `navigationRevision` — used by the
     Explore link and "Back to Explore."
   - `showCarousel(carouselName)`: same reset as `clearFilters()`, but lands in a
     carousel's full view instead of the unfiltered grid — used by a carousel's "See all."

2. **Sidebar click handler** (`app/components/Sidebar.tsx`):
   - Explore link: `clearFilters()`, then `router.push("/explore")` (skipped if already on
     `/explore`).
   - Each My Festival link: `applyPreset(NAV_ITEM_BY_LABEL[label])`, then the same
     navigate-if-needed check.
   - Both calls happen synchronously in the click handler, before `router.push` — this
     matters for cross-page navigation (e.g. Quick Picks → Explore), where Next's
     transition machinery means a layout effect on the freshly-mounted Explore can't be
     relied on to beat first paint. Setting the store before the navigation even starts
     means there's no stale value for that first paint to show.

3. **Explore reads the store directly** (`app/components/explore/ExploreContent.tsx`):
   - `genres`/`day`/`stages`/`pickStatus`/`scheduleStatus`/`searchQuery`/`viewingCarousel`
     are all read straight from `useExploreFilterStore()` — no local mirror, no sync effect.
   - `viewingCarousel` is deliberately _not_ reset from an effect keyed on `activeNavItem`.
     An earlier version did that, and it broke when `activeNavItem` didn't actually change
     value — e.g. clicking "Explore" while already on the unfiltered view left a carousel's
     full view stuck open, since a same-value dependency doesn't retrigger a `useLayoutEffect`.
     It also violates the `react-hooks/set-state-in-effect` lint rule (effects are for
     synchronizing with external systems, not calling React setters). Setting
     `viewingCarousel` directly and unconditionally inside `clearFilters()`/`applyPreset()`/
     `showCarousel()` — the same atomic action that changes `activeNavItem` — removes the
     failure mode entirely rather than patching the effect's dependency list again.
   - The one thing still handled by a `useLayoutEffect` is scrolling the results container
     back to top, keyed on `navigationRevision` (not `activeNavItem`/`viewingCarousel` —
     those can both stay the same value across a click, e.g. re-clicking the already-active
     My Festival link, where a scroll reset is still the right call). This is a plain DOM
     side effect, not a React state update, so it's exempt from the
     `react-hooks/set-state-in-effect` concern above.

4. **Festival Story's "view your picks" exit** (`app/components/festival-story/FestivalStorySequence.tsx`):
   - Calls `applyPreset("myPicks")` then `router.push("/explore")` — same mechanism as a
     Sidebar My Festival click, just triggered from a different UI.

**Why this approach over alternatives:**

- **Not URL state:** Consistent with how search and other filters currently work (no
  query params). Filters reset on page load from a fresh URL.
- **No one-shot "pre-applied" indirection:** An earlier version of this design used a
  separate `preAppliedX` signal consumed-then-cleared by an effect on Explore's mount,
  synchronized against live `activeX` state via a navigation counter. That produced a
  string of hard-to-diagnose bugs (stale filters reapplying, same-page flash-then-clear,
  a ref-guard that broke fresh cross-page navigation) because three representations of
  the same filter existed at once. Removing the indirection — the store IS the live
  filter state, set directly by callers — removed the class of bug, not just individual
  instances of it.
- **Reuses existing logic:** No separate filter code path. Once the store's facets are
  set, the existing Explore state machine and filter rendering all work normally.
- **No restrictions:** Users can freely modify filters after landing (add more filters on
  top, search, clear everything). Nothing is locked or read-only.

**Manual test checklist** (re-run whenever this area changes — these are the exact
navigation paths that broke in different ways during development):

1. Sidebar link → different sidebar link → Explore (same-page, no remount) — filter
   updates instantly, no flash of the previous filter or previous carousel-detail view.
2. My Festival link from a different page (Quick Picks/Planner) → Explore (cross-page,
   fresh mount) — lands with exactly that preset applied, no stale leftover facet from
   whatever was set before leaving Explore last time.
3. Festival Story's last-card "view your picks" exit → Explore — lands with My Picks
   applied (`pickStatus` = mustSee + interested).
4. Browser back/forward — manually verified in the target browser to restore the active
   Explore state without flashing, e.g. Scheduled → back → forward still shows Scheduled
   selected. The exact restoration mechanism is owned by the browser and Next.js's routing
   (possibly bfcache, possibly Next/React route-level state preservation) and can differ by
   environment — an earlier headless-Playwright check in this same investigation saw a full
   document reload for the same navigation instead of a restore, and a full reload always
   resets the in-memory store, since `exploreFilterStore` has no `persist` middleware. The
   contract this implementation can actually guarantee isn't "always restored" — it's that
   the page renders one stable state, restored or freshly reset, without ever flashing
   stale filters first. A full page _refresh_ (as opposed to back/forward) reliably resets
   the in-memory Explore state to empty.

---

## Festival Story

**Confirmed** — `computeStorySignals({ festivalId, attendanceDays, allArtists,
decisionsByArtist })` (`app/hooks/useStorySignals.ts`) is the single source of truth;
a pure function that never reads Zustand state itself — every input is explicit.
`useStorySignals` is a thin `useMemo` wrapper. `app/lib/verify-story-signals.ts`
imports and calls the real function directly — no mirrored/reimplemented copy. Run it
with `npm run verify:story` (declares `tsx` as a devDependency — do not rely on `npx`
downloading an undeclared package at validation time).

`FestivalStorySequence` is only mounted by its parent (`app/quick-picks/page.tsx`)
once the user actually opens Festival Story (`{showFestivalStory && <FestivalStorySequence ... />}`),
not merely once Quick Picks completion is showing — mounting is what triggers
`useStorySignals`' ~500-sample computation, so it must not run before the user asks
for it. Unmounting on close also resets the sequence's internal `currentIndex` for
free, so reopening always starts at the intro card without any manual state-reset
effect.

### Attendance scope

Scoped to the _launching_ Quick Picks session's captured `attendanceDays` snapshot,
passed explicitly via `FestivalStorySequence`'s `attendanceDays` prop — never re-read
from the persisted `attendanceStore` for a session that already completed, so a
changed persisted selection afterward can't silently rescope a finished session. The
prop is optional and falls back to `useAttendanceDays(ACTIVE_FESTIVAL_ID)` only for a
future standalone Story entry point not launched from a specific session.

`getEligibleArtists`/`getValidPositivePicks` (same file) are the shared eligibility
resolution, used both by `computeStorySignals` and by Quick Picks completion's unlock
check: eligible = has a `getSelectedDayAppearance` on a selected day; a valid positive
pick = an eligible artist with a `mustSee`/`interested` verdict in
`decisionsByArtist`, regardless of source (Quick Picks — any session — Explore, or
Artist Detail) or of whether the artist's _global primary_ appearance falls outside
the selected days. Forward-constructed, so stale decision slugs and artists whose only
appearances fall outside the selected days are silently excluded. An explicit
zero-day attendance selection resolves to zero eligible artists, never the full
lineup.

### Unlock requirement

`MIN_POSITIVE_PICKS_FOR_STORY = 5`. Below 5 valid positive picks,
`computeStorySignals` returns `[]`. Quick Picks completion
(`QuickPicksCompleteScreen`) keeps the Festival Story card visible but semantically
disabled (`disabled`/`aria-disabled`, "Reach 5 picks to unlock your Festival
Story."), gated by the same `getValidPositivePicks` call — never a separate
raw-decision count that could disagree with what the Story itself would compute.
`FestivalStorySequence` has its own independent guard (`signals.length !== 4` →
render nothing) so no other caller can open an intro-and-final-only sequence.

### Card structure: exactly 4 insights, two fixed anchors

**Taste Profile** (`genreAffinity`) is always the first insight; **Decision Profile**
(renamed from Decision Confidence) is always the last. The remaining 2 slots are
filled by ranking a pool of {Billing Profile (`billing`), Festival Footprint
(`stage`), Genre Breadth (`genreBreadth`), Hometown (`hometown`),
International/Country Diversity (`international`/`countryDiversity`), Day (`day`)}.
Billing and Footprint always contribute one pool entry — their interpretive form if it
qualifies, otherwise a safe factual form — so the pool never has fewer than 2 entries.
The rest only enter the pool when they qualify. There is no Journey Summary — deleted
along with its image mapping; its old role (a fallback for when comparative signals
ran short) is unnecessary now that the four stable dimensions are each always
individually computable.

### Stable vs. interpretive

Four stable profile dimensions (Decision Profile, Taste Profile, Billing Profile,
Festival Footprint) are always **available** — each can always produce at least a
safe, factual, non-comparative candidate, never both a safe and an interpretive
version at once. That is not the same as always **rendering**: Decision Profile and
Taste Profile are fixed anchors and do always appear (slots 1 and 4), but Billing and
Festival Footprint only guarantee that the competitive pool can fill its 2 remaining
slots — they do not themselves guarantee a place in the final four. A qualifying
distinct interpretive candidate (Genre Breadth, Hometown, International/Country
Diversity, Day — none of which have a safe form of their own) can outrank and
displace either or both of them. `international` and `countryDiversity` are treated
as one potentially-duplicative "geographic story" — at most one is ever selected,
keeping whichever is statistically stronger. Selection never lowers a threshold to
fill a slot; the guaranteed 4-card outcome comes from the two fixed anchors plus the
pool's two winners, and the pool is never empty because Billing/Footprint's safe
forms are always in it.

### Comparison method: deterministic sample-aware, not a fixed percentage-point floor

Replaces the old fixed 12-percentage-point "noise floor," which was only accidentally
protective because Chicago happens to be ~10.5% of the _full_ lineup — attendance
scoping breaks that accident (Saturday's eligible lineup alone is ~14% Chicago, so
zero Chicago picks could have cleared the old 12pp bar once scoped to Saturday).

`app/lib/story-sampling.ts` draws 500 deterministic same-size subsets (no
replacement) from the attendance-scoped eligible lineup, seeded via
`buildStorySeed(festivalId, attendanceDays, sampleSize, eligibleArtistSlugs)` —
sorted inputs, so click order and array order never affect the seed — through the
existing `createSeededRandom` (`app/lib/random.ts`). For each candidate dimension, the
real picks' metric and the 500 samples' metrics are compared via
`computeExtremeness`: the fraction of samples that did at least as well, in the
tested direction, as the real picks.

**The seed depends only on the comparison universe, never on which artists were
picked.** It's built from festival ID, sorted attendance days, the pick _count_
(sample size), and a sorted fingerprint of the eligible lineup's own artist slugs —
deliberately not the identities of the picked artists themselves. Two users with the
same festival, attendance scope, eligible lineup, and number of valid positive picks
draw the exact same 500 samples even if they picked entirely different artists. This
matters because the samples are the _ruler_ a pick set is measured against; if the
ruler itself flexed based on which specific artists were picked, a borderline
qualification could tip one way or the other partly because the ruler changed rather
than because the picks themselves did — a real risk at only 500 samples. The observed
values are still, obviously, computed from the actual picks.

**Selection-adjusted comparison for Taste Profile and Day.** Both of these signals
pick their subject by _searching_ — Taste Profile searches every genre family for the
user's best-represented one; Day searches every selected attendance day for the
strongest positive over-index. Production must apply that same search to every random
sample, or the comparison is biased: checking only "how did this sample do in the
family/day the user happened to win on" is an easier bar to clear than "how did this
sample do at its _own_ best family/day," which inflates how unusual the observed
result looks. Both signals therefore compare **max-vs-max**: the observed picks'
maximum family-presence-rate (or day-over-index) against the distribution of each
sample's own maximum across the same candidate set. Every other comparative signal
(Billing, Footprint, Genre Breadth, Hometown, International, Country Diversity) tests
one fixed, unambiguous metric per set, so this correction doesn't apply to them.

A candidate qualifies only when **all** of:

1. **Direction** — the claimed direction is the one actually observed; one-directional
   signals (Hometown, International, Day) never have an inverse/under-index copy path.
2. **Extremeness ≤ 10%** (`EXTREMENESS_THRESHOLD`) — no more than 1 in 10 random
   same-size subsets did as well.
3. **Practical effect ≥ 10 percentage points** (`PRACTICAL_EFFECT_MIN_PP`) — a
   statistically rare but trivial gap (e.g. 1pp) still can't headline.
4. **Signal-specific observed-count floor** — Chicago requires ≥2 picks (≥4 for its
   stronger copy tier), genre-family affinity requires ≥2 picks in the
   leading family, International requires ≥1, the Day signal's top day requires ≥2
   picks on it and ≥2 selected attendance days total.

This is a **product-level lineup comparison, not a scientific significance test** — no
p-values or "statistically significant" language surface in the UI; extremeness and
practical effect are internal ranking/eligibility fields, never rendered.

### Decision Profile thresholds

- **5-7 total valid positive picks**: restrained, provisional copy with no numerical
  breakdown or personality claim from a tiny sample.
- **8+ picks, outer heavy thresholds**: Must-See rate ≥75% → Must-See-heavy copy;
  ≤25% → Interested-heavy.
- **8+ picks, middle range** (25%-75%, previously one undifferentiated "balanced"
  bucket): split into three copy branches — 40%-60% inclusive is near-even; above
  60% and below 75% leans Must-See; above 25% and below 40% leans Interested. Each
  gets its own distinct copy rather than one generic "balanced" line for the entire
  middle half of the range.
- **Extreme tier**: ≥90% Must See (or ≤10%, mirrored) **and** ≥10 total picks → the
  most dramatic copy. The count floor exists so 2-of-3 can't read as "zero fluff."

### Genre Affinity: selection-adjusted, with tie handling

The observed metric is the user's own maximum family-presence rate, found by
searching **every** genre family — not a rate looked up for one pre-selected family.
Each of the 500 samples performs the identical search over its own picks and
contributes its own maximum to the comparison distribution (see "Comparison method"
above); comparing the observed max against a distribution of per-family lookups for
only the user's winning family would systematically overstate how unusual the result
is, since the observed side searched harder than each sample did.

**Ties**: if two or more families are tied for the highest presence count among the
picks, the tie is detected explicitly and the interpretive single-family copy is never
used — an arbitrary "first in object order" family is never crowned sole leader. Tied
results render "Your leading sounds" with the tied families alphabetically sorted,
so the phrasing never depends on any internal object's key-iteration order. Up to
three families are named directly; larger ties name the first three followed by
"and N more" to keep the card readable. The `GENRE_AFFINITY_MIN_PICKS` floor still
applies to the non-tied interpretive path.

### Day concentration signal: selection-adjusted, strongest over-index (not raw share)

Only computed with ≥2 selected attendance days. Each valid pick is attributed to
exactly one day via its own `getSelectedDayAppearance` (never double-counted across
days, including for multi-appearance artists).

**The candidate day is whichever selected day has the strongest _positive over-index_
against the eligible lineup's own day distribution — not whichever day has the user's
highest raw pick share.** A day can hold the largest share of picks while still
under-indexing its own baseline (e.g. 45% of picks on a day that's 55% of the eligible
lineup), while a different day with a smaller raw share can be the real,
statistically meaningful story (e.g. 35% of picks on a day that's only 15% of the
eligible lineup). Every one of the 500 samples performs the same "search all selected
days, take the best over-index" step (see "Comparison method" above), so the
extremeness test compares "the best day search found in the observed picks" against
"the best day search found in a random same-size sample" — not the observed winning
day's rate against samples that were never asked to search for their own best day.
Positive-concentration framing only; no avoidance/negative-day copy path exists. No
weekday/weekend hardcoding — works for any combination (e.g. Thursday + Sunday).

### Directional fixes

- **Chicago**: requires `chicagoCount > 0` **and** user rate > the attendance-scoped
  baseline **and** the standard extremeness/practical-effect gates **and** ≥2 picks
  (≥4 for the strongest copy tier) — closes an accidental-protection gap where the
  old fixed 12pp threshold happened to block zero-Chicago results only because
  Chicago is ~10.5% of the _full_ lineup; attendance scoping breaks that accident
  (Saturday's eligible lineup alone is ~14% Chicago). Zero/under-indexing never
  produces a card of any kind. `isChicago` (`app/lib/location.ts`) normalizes
  trim/case only, deliberately not state-suffix variants like "Chicago, IL" — that
  shape violates the documented `Location` contract (`app/data/categories.ts`) and is
  treated as bad data to fix at authoring time, not a formatting variant for
  comparison logic to absorb.
- **International**: positive over-indexing only; zero or under-indexed picks omit
  the card rather than showing an inverse "American-heavy" card.
- **Billing (Headliner/Undercard)**: both directions valid; fixed an unmatched
  quotation mark, a subject-verb grammar error, and removed "hidden gems"/"before
  everyone else" phrasing from the undercard copy.
- **Stage/Genre diversity**: both broad and focused directions valid, qualifying via
  the sampling engine instead of the old closed-form "expected value" formula. Fixed
  a display bug where an integer stage count rendered as `5.0`.
- **Genre Affinity vs. Genre Breadth**: allowed to coexist (different questions —
  which family leads vs. how widely picks range) with separated copy. Concentrating in
  one genre family mechanically _reduces_ expected genre-tag variety relative to a
  random sample, so affinity(strong) more often pairs with breadth(focused) than
  breadth(broad) in practice — a property of what the two metrics measure, not a bug.

### Copy status

The Festival Story headline/supporting-text matrix has been reviewed and approved by
the product owner. Copy changes should preserve the stable/interpretive strength of
each branch, the no-em-dash style rule, and the general limit of at most one numeric
value per card (with the safe Billing breakdown as the deliberate exception).
Validation covers copy-dependent branch boundaries and key dynamic formatting, but
future wording changes still require product review.

### Known limitations

- **Multiple comparisons**: up to ~7 candidate dimensions are tested per Story against
  a 10%-extremeness bar, so a genuinely average/representative set of picks has a
  non-trivial chance that at least one dimension clears the bar by chance alone. This
  is an accepted product-level tradeoff (a lineup comparison, not a peer-reviewed
  test), not a bug — documented here so it isn't rediscovered as a mystery later.
- Sample count (500) and thresholds (10% extremeness, 10pp practical effect) are
  product-chosen and centralized in `app/hooks/useStorySignals.ts`, not derived from a
  formal statistical power calculation.
- A discovery-source/Quick-Picks-provenance signal was considered and rejected —
  Festival Story only unlocks after Quick Picks, so that signal would describe the
  product funnel rather than the user.

### Not touched in this iteration

Planner/Explore attendance behavior; the AI-prose data-policy (`tagline`/`whySee`/
`whatToExpect`/`bestFor` remain excluded from every signal).

---

## Schedule Feature (MVP)

**Confirmed** — Overall feature scope and approach.

### Product Context

**Confirmed** — From CLAUDE.md:

- Schedule is a separate feature from Quick Picks decisions (Must See / Interested / Passed)
- "Organize a finalized festival plan after decisions have already been made"
- Planning, conflict detection, and scheduling were deferred until the core discovery experience felt polished
- Artist Detail page "should inspire rather than compare" — no conflict warnings on that page per design philosophy

### Data Model

#### Store: `scheduleStore` (Zustand + persist)

**Confirmed** — New store, completely independent of `decisionStore`.

```typescript
interface ScheduleState {
  scheduledAppearanceKeys: Set<string>; // composite appearance keys — see Multi-Appearance Support
  toggleScheduled: (key: string) => void; // per-appearance; used only by the Planner
  toggleAllAppearances: (artist: Artist, festivalId: string) => void; // aggregate control
}
```

**Location:** `app/store/scheduleStore.ts`

- `scheduledAppearanceKeys`: Set of appearance keys (`` `${festivalId}::${slug}::${appearanceId}` ``, see "Multi-Appearance Support" below) that the user has scheduled — named for what it actually stores, not artist slugs
- `toggleScheduled(key)`: Add/remove a single appearance key — the Planner's per-block action
- `toggleAllAppearances(artist, festivalId)`: Schedule every appearance the artist has at that festival if not all are already scheduled; unschedule all of them if they are — the aggregate action used everywhere outside the Planner

Persisted to localStorage under key `schedule-store` (unchanged) via Zustand's `persist` middleware — see "Multi-Appearance Support → Persistence" for why no version/migrate step was added despite the internal state shape changing.

#### Pure Function: `getConflictingArtists()`

**Confirmed** — Single source of truth for conflict detection. No side effects — accepts
`scheduledAppearanceKeys` and `allArtists` as inputs, returns a Set of conflicting
**appearance keys** (not artist IDs — see "Multi-Appearance Support" below).

**Location:** `app/lib/schedule.ts`

```typescript
function getConflictingArtists(
  scheduledAppearanceKeys: Set<string>,
  allArtists: Artist[]
): Set<string> {
  const conflicting = new Set<string>();

  // Group scheduled appearances by festival + calendar date (not the `day` weekday
  // label alone — two appearances just sharing a "Thursday" label but belonging to
  // different festivals, or different actual calendar dates, must never be compared).
  const scheduledByDate = new Map<string, Array<{ appearance: FestivalAppearance; key: string }>>();
  for (const artist of allArtists) {
    for (const appearance of artist.appearances) {
      const key = getAppearanceKey(artist, appearance);
      if (!scheduledAppearanceKeys.has(key)) continue; // forward-construct + check, never reverse-parse
      const groupKey = `${appearance.festivalId}::${appearance.date}`;
      if (!scheduledByDate.has(groupKey)) scheduledByDate.set(groupKey, []);
      scheduledByDate.get(groupKey)!.push({ appearance, key });
    }
  }

  // Check for conflicts within each (festival, date) group only
  for (const entries of scheduledByDate.values()) {
    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        const a = entries[i];
        const b = entries[j];

        // Time overlap check: A.start < B.end && B.start < A.end
        if (
          timeStringToMinutes(a.appearance.startTime) < timeStringToMinutes(b.appearance.endTime) &&
          timeStringToMinutes(b.appearance.startTime) < timeStringToMinutes(a.appearance.endTime)
        ) {
          conflicting.add(a.key);
          conflicting.add(b.key);
        }
      }
    }
  }

  return conflicting;
}
```

**Design rationale:**

- Group by `(festivalId, date)` first, then compare pairwise within each group (reduces comparisons vs. checking all pairs unconditionally, and prevents cross-festival/cross-date false positives from a shared `day` label)
- Pairwise comparison prevents false positives (Appearance A conflicts with B, B with C, but A and C don't overlap). The same artist's two scheduled appearances overlapping each other is correctly caught as a real conflict, not special-cased away.
- Artist data stores times as `"H:MM AM/PM"` (e.g. `"12:00 PM"`), not 24-hour `"HH:MM"`. `timeStringToMinutes()` (`app/lib/time.ts`) parses this format explicitly and is the single shared helper, kept in a neutral module with no dependencies of its own so it can't create an import cycle between `app/lib/schedule.ts` and `app/lib/appearances.ts` (the latter depends on it for primary-appearance selection, the former depends on the latter for festival-scoped appearance lookups). `app/lib/schedule.ts` (conflict detection), `app/lib/sort.ts` (chronological sorts), `app/lib/appearances.ts` (primary-appearance selection), and `app/lib/planner.ts`/`PlannerGrid.tsx` (Planner grid positioning) all import it from there rather than re-parsing times themselves.
- Every lookup is forward-constructed (real appearance → key → `Set.has()`) — nothing iterates `scheduledAppearanceKeys` and tries to parse an entry, so a stale or unrecognized key is simply never matched, never an error.
- No caching — computed fresh when needed; the data set is small enough that computation cost is negligible

**Known limitation — post-midnight sets:** `timeStringToMinutes()` has no way to distinguish a set happening late that festival night (e.g. `"12:30 AM"` after an evening of PM sets) from one happening early the next calendar day — it always maps AM times to the 0–719 minute range. A set spanning midnight (e.g. `11:30 PM`–`12:30 AM`) would compute a negative duration and break both conflict detection and the Planner grid's range/positioning math. The current dataset contains no AM times, so this isn't an active bug, but it should not be assumed to work. A correct fix would need to use `FestivalAppearance.date` to disambiguate which calendar day an AM time actually belongs to, rather than inferring it from AM/PM alone — not done now; revisit if festival data ever includes overnight sets. Applies per-appearance now, same as before.

### Entry Points for Scheduling

#### 1. Artist Detail Page (`/artist/[slug]`)

**Confirmed** — Wire existing "Schedule" button to `toggleAllAppearances(artist, festivalId)` — the aggregate control (see "Multi-Appearance Support" below).

**File:** `app/components/artist/ArtistActions.tsx`

- Wired to `toggleAllAppearances(artist, festivalId)` — the aggregate control, not
  per-appearance (see "Multi-Appearance Support" below for why per-appearance control
  is Planner-only).
- Three visual states driven by `getArtistScheduleState()`: inactive (none), subtle
  indeterminate (partial — reachable if some of the artist's appearances were
  scheduled individually via the Planner), fully active (full).
- No conflict warning shown per CLAUDE.md ("should inspire rather than compare")
- Behavior: click schedules every appearance at the active festival unless all are
  already scheduled, in which case it unschedules all of them
- Label: "Schedule" for single-appearance artists (consistent across Artist Detail and
  Explore cards); for multi-appearance artists, button text communicates state + a
  small "N sets" disclosure together, e.g. "Add to Schedule · 2 sets" / "Complete
  Schedule · 2 sets" / "Scheduled · 2 sets" — never exposes individual appearance
  times, never a second control

#### 2. Explore Page (`/explore`)

**Confirmed** — Extend existing Must See / Interested action buttons with scheduling support.

**File:** `app/components/explore/ArtistCard.tsx`

- **Schedule toggle icon** (calendar icon, cyan per CLAUDE.md "Primary workflow actions")
  - Click calls `toggleAllAppearances(artist, festivalId)` — same aggregate action as
    Artist Detail, never per-appearance
  - Three visual states via `getArtistScheduleState()`: inactive (none), subtle
    indeterminate (partial), filled/highlighted (full) — a binary icon would render
    "partial" identically to "none," which reads as data loss to a user who scheduled
    one of several appearances via the Planner
  - Shows tooltip on hover reflecting the current state
  - **Multi-appearance artists get a small always-visible "N sets" disclosure**, as
    plain metadata text (not a pill) in the info area below the photo, beside the
    stage line — not the photo overlay, where contrast against the photograph isn't
    reliable, and not styled like the Headliner badge, which is billing/artist status
    rather than schedule metadata and keeps its own existing overlay position. Normal
    casing, muted cyan dimmer than the day/time line, so it's discoverable without
    competing with the artist name or Schedule action. Not hover-only, since touch
    devices have no hover state. Purely informational: never both set times, never a
    second control.

- **Conflict highlight** (red border/highlight only if conflicting)
  - Shown if any of the artist's appearance keys is in the conflict set returned by
    `getConflictingArtists()` — independent of the three schedule states above
  - Uses red per CLAUDE.md ("Schedule conflicts" → Red)
  - Example: thin red border, or subtle background tint
  - Subtle styling — not aggressive, doesn't distract from the card itself

#### 3. Sidebar (`app/components/Sidebar.tsx`)

**Confirmed** — Sidebar navigation and "My Festival" section structure.

**Top-level nav items (before "My Festival" section):**

1. Home
2. Explore
3. Quick Picks
4. **Planner** — RENAMED from "Schedule"
   - Links to `/planner` (the Planner grid view page)
   - No count shown

**"My Festival" section (below main nav):**

Two labeled groups (`picksItems`, `scheduleItems`), not one flat list — reinforces that
Picks and Schedule are separate dimensions, the same distinction the Planner's own
"Show only:" toggles make. Not a parent/child indent tree: Conflicts isn't a true subset
of Scheduled the way Must See/Interested are subsets of My Picks (a conflict is a derived
problem-state among scheduled items, not a category of it), so two flat, labeled groups
represents the actual relationship more accurately than nesting would.

**Picks group:**

1. **My Picks** — NEW
   - Calls `applyPreset("myPicks")`, then navigates to `/explore`
   - Shows count: "My Picks (X)" where X = count of Must See + count of Interested
   - Yellow color per CLAUDE.md ("User Intent & Personalization") — matches Must See/
     Interested directly below it; was cyan originally, corrected after noticing it
     contradicted its own two constituent categories in the same list

2. **Must See** — Existing link (no change)
   - Calls `applyPreset("mustSee")` then navigates to `/explore`
   - Shows count

3. **Interested** — Existing link (no change)
   - Calls `applyPreset("interested")` then navigates to `/explore`
   - Shows count

**Schedule group:**

4. **Scheduled** — NEW
   - Calls `applyPreset("scheduled")`, then navigates to `/explore`
   - Filters Explore to show all scheduled artists
   - Shows count: "Scheduled (X)" — X is an **artist count** (artists with
     `getArtistScheduleState(...) !== "none"`), not an appearance count, so it matches
     the number of cards Explore actually shows when this filter is applied
   - Cyan color per CLAUDE.md ("Primary workflow actions")

5. **Conflicts** — NEW, conditionally rendered
   - Only shown if conflict count > 0
   - Calls `applyPreset("conflicts")`, then navigates to `/explore`
   - Filters Explore to show ONLY conflicting artists (strict subset of scheduled)
   - Shows count: "Conflicts (X)" — X is likewise an **artist count** (artists with at
     least one conflicting appearance), same reasoning as "Scheduled" above
   - Red color per CLAUDE.md ("Schedule conflicts")

**Technical implementation:**

- `useExploreFilterStore()` tracks **two independent filter facets** among its five live
  facets:
  - `pickStatus`: Must See / Interested / Passed / Undecided — multi-select, no "All" value (deselecting everything shows the unfiltered list)
  - `scheduleStatus`: Scheduled / Unscheduled / Conflicting — multi-select, same pattern, no "All" value
- The two facets combine with AND logic between them; within a single facet, multiple selected values combine with OR logic (e.g., My Picks = mustSee OR interested, both within the pickStatus facet)
- Sidebar links call `applyPreset(...)` (or `clearFilters()` for the plain Explore link), which sets `pickStatus`/`scheduleStatus`/`genres`/`day`/`stages` synchronously, then navigate to `/explore`
- ExploreContent reads all five facets directly from `useExploreFilterStore()` — no local mirror, no mount effect to reconcile anything (see "Sidebar Filter Shortcuts" above for the full design and its manual test checklist)
- Sidebar derives counts from `decisionStore`, `scheduleStore`, and conflict detection

### Explore Page Filter Extensions

**Confirmed** — Extend existing filter handling with two independent filter facets.

**File:** `app/components/explore/ExploreContent.tsx` (existing file)

**Two independent filter facets:**

**Facet 1: Pick Status** (replaces existing "Status" filter)

- Values: Must See / Interested / Passed / Undecided
- Multi-select within facet (OR logic)
- Represents user's discovery/decision state per CLAUDE.md

**Facet 2: Schedule Status** (new facet)

- Values: Scheduled / Unscheduled / Conflicting
- Multi-select within facet (OR logic)
- Represents scheduling commitment and conflict state

**Filter combination:**

- Between facets: AND logic (must match Pick Status AND Schedule Status)
- Within facet: OR logic (My Picks = mustSee OR interested within Pick Status facet)
- No "All" value — deselecting everything in a facet shows unfiltered results for that facet

**How Sidebar presets work** (see "Sidebar Filter Shortcuts" above for full design):

1. Sidebar calls `applyPreset(...)` (or `clearFilters()`), which sets `pickStatus`/`scheduleStatus` (and resets `genres`/`day`/`stages`) directly in `exploreFilterStore`, then navigates to `/explore`
2. ExploreContent reads `pickStatus`/`scheduleStatus` straight from `useExploreFilterStore()` — no local state, no mount effect
3. Filtering logic in `filterArtists()` applies both filters with AND logic

**Display behavior** (all cases):

- Page title remains: "Explore" (no change)
- Cards show all action buttons (Must See, Interested, Schedule)
- Users can add additional filters (Genre, Day, Stage) on top of the applied preset

**Default behavior** (no preset applied):

- No filter applied, display full lineup (existing behavior)

### Schedule View (`/planner`)

**Confirmed** — New route and full-page component for day-by-day grid scheduling.

**File:** `app/planner/page.tsx`

#### Layout & Presentation

**Confirmed** — Grid structure, day organization, and time row design:

**Grid columns and rows:**

- **Columns:** Festival stages (e.g., "Airbnb Stage", "T-Mobile Stage", etc., imported from `FESTIVAL_STAGES`)
- **Time rows:** Hour-based anchors with proportional artist blocks
  - Left column shows fixed hour labels (e.g., "2:00 PM", "3:00 PM", etc.)
  - Each artist's block size is proportional to their actual set duration within that hour
  - Artist blocks are NOT uniform fixed-height rows — they scale based on set duration
  - Hour lines are the fixed structure; artist blocks flow within them

**Days:** Separate grid per day (Thursday through Sunday)

- Tabbed interface for switching between days (not scrollable section headers)
- User can click tab to switch between days
- Only one day's grid visible at a time

**Data:** Full lineup for each day rendered by default (all artists, not pre-filtered)

- Artist name and start/end time displayed in each grid cell
- No lazy-loading/code-splitting for MVP — just conditionally render the active day's content

#### Visual Treatment (Per CLAUDE.md Color Semantics)

**Confirmed** — Fill, border, and pick icon are three independent channels, not a
priority-ordered stack — a block can be scheduled, conflicting, and a pick all at once
with nothing silently hidden:

- **Fill** — driven only by scheduled state: cyan tint if scheduled, neutral otherwise. Always renders regardless of either toggle.
- **Border** — driven only by conflict state: red per CLAUDE.md ("Schedule conflicts") if conflicting, otherwise falls back to the scheduled/neutral border color.
- **Icon** — a small static (non-interactive) glyph reflecting the artist's pick verdict, per CLAUDE.md ("User Intent & Personalization"): a solid star for Must See, a flat muted-gold heart for Interested (an opaque color, not an alpha variant of Must See's, since translucent color blends inconsistently depending on what's underneath it), nothing if no verdict. Always renders regardless of either toggle — see Interactions below.

#### Interactions

**Confirmed** — Two independent toggles at the top of the Planner grid, framed under one
shared "Show only:" label rather than each carrying its own "only" suffix (which would
read as a contradiction when both are active at once) or a bare, unqualified name (which
reads like a layer-visibility toggle — "Scheduled" off looking like it means "hide
scheduled items" — rather than the restrictive filter it actually is):

**"My Picks"** (cyan switch styling — a generic interactive-control color, not tied to
what the switch filters)

- Filters grid to display only artists with verdict === "mustSee" OR verdict === "interested"
- Independent of the "Scheduled" toggle
- When enabled, hides all other artists (Pass, Undecided) — except any that are part of a
  schedule conflict, which stay visible regardless of toggle state (see Combined behavior below)
- Purely a visibility filter — does not gate whether the pick icon renders (see Visual Treatment above); a block's icon always reflects its true verdict whether or not this toggle is on

**"Scheduled"**

- Filters grid to display only scheduled artists (`isScheduled(artist) === true`)
- Independent of the "My Picks" toggle
- When enabled, hides all unscheduled artists — the conflict exception above doesn't apply
  here since a conflicting artist is always scheduled by definition
- Purely a visibility filter, same as "My Picks" — both switches are symmetric in scope; fill/border rendering was never gated by this toggle to begin with

**Combined behavior (AND logic):**

- Both toggles can be enabled simultaneously to show artists that are both in Must See/Interested AND scheduled
- When both enabled, displays the intersection of the two filters
- Conflict artists remain visible and highlighted (red border/accent) regardless of toggle state
- Default state: My Picks on, Scheduled off — surfaces "what have I flagged but not scheduled yet" on first visit, matching this feature's own framing below (organizing a plan _after_ decisions have already been made). Defaulting both on instead would start blank for anyone with nothing scheduled yet, since that combination means "picks that are also scheduled."
- Persisted via `plannerViewStore` (see State Summary → Stores below) — survives navigating away and back, and a hard page reload, not just this page visit

**Artist cell interactions:**

- **Confirmed** — Clicking anywhere on a cell toggles that artist's scheduled status directly, in place — no navigation. This is the primary action for this screen, matching what the Planner is actually for.
  - Toggling scheduled state updates the grid cell appearance immediately
- **Confirmed** — A small secondary affordance within the cell (an icon or short link, not the whole cell) navigates to Artist Detail, for anyone who wants to see more before deciding. This is a real `Link`, not a `router.push` click handler — gives right-click/middle-click "open in new tab" and keyboard access, same reasoning as the stretched-link pattern used on Explore's `ArtistCard` for cards with their own nested interactive controls.
- **Confirmed** — No click-count-based shortcuts for setting Must See/Interested/Passed from this screen — decisions stay confined to Quick Picks and Explore.
- **Confirmed** — No preview modal — Artist Detail (via the secondary affordance) already covers that need.

**Confirmed** — No drag-and-drop rescheduling for MVP

- Set times are fixed festival data, not user-editable
- Users can only schedule/unschedule artists, not move them to different times
- Future expansions: Compare, Auto-Optimize, Add Travel Time, Custom Time Edits

#### Performance Notes

**Confirmed** — Optimization requirements:

- Memoize `getConflictingArtists()` result at page level
- Cache conflict set in local state to avoid recomputation on every render
- **Proposed — needs review:** Lazy-load day tabs if lineup is large (only render visible day's grid)

### State Summary for Schedule Feature

**Confirmed** — Store design and data flow:

#### Stores

1. **decisionStore** (existing, unchanged)
   - Must See / Interested / Passed decisions
   - Completely independent from scheduling

2. **scheduleStore** (new)
   - `scheduledAppearanceKeys` — appearance keys, not artist slugs (see "Multi-Appearance Support")
   - Completely independent from decisions
   - Persisted to localStorage under the unchanged `schedule-store` key

3. **plannerViewStore** (new)
   - The Planner's "My Picks"/"Scheduled" display-toggle booleans, persisted to localStorage under `planner-view-store`
   - Completely independent from decisions/scheduling — purely which rows are visible, never what they render as

**Hydration:** all three stores above track a `hasHydrated` flag, set inside their
`onRehydrateStorage` callback once localStorage has actually been read. A shared
`HydrationGate` (`app/components/HydrationGate.tsx`), wrapping the app in
`app/layout.tsx`, holds the very first render until every persisted store flips true
(a fourth, `attendanceStore`, joined the same gate later — see § HydrationGate
Resilience to Rehydration Errors) — without it, each store briefly renders its
hardcoded default before rehydrating a moment later, most visibly a wrong toggle
position, but the same gap exists anywhere decisionStore/scheduleStore-derived state
renders (Sidebar counts, Explore's pick/schedule buttons, the Planner grid's own
coloring). Only affects a hard reload — client-side navigation never remounts these
stores. Any future persisted store should wire into this same gate rather than
reinventing the check per-component.

#### Derived State

- **Conflict set** — computed from scheduleStore + allArtists via `getConflictingArtists()`, a Set of conflicting appearance keys
- **Sidebar counts** — Must See count, Interested count, Scheduled count, Conflict count (the latter two are artist counts, not appearance counts — see "Multi-Appearance Support")
- **Filtered lineups** — Explore with its five live filter facets (`exploreFilterStore`), Schedule with independent "My Picks" and "Scheduled" toggles

#### Data Flow

```
User actions
├── Explore card: click Schedule toggle → toggleAllAppearances(artist, festivalId) → scheduleStore updates
├── Explore card: click Must See/Interested → setDecision() → decisionStore updates
├── Artist Detail: click Schedule button → toggleAllAppearances(artist, festivalId) → scheduleStore updates
├── Planner: click an appearance block → toggleScheduled(appearanceKey) → scheduleStore updates
├── Sidebar: click My Picks → applyPreset("myPicks") → /explore
├── Sidebar: click Scheduled → applyPreset("scheduled") → /explore
├── Sidebar: click Conflicts → applyPreset("conflicts") → /explore
└── Schedule page: day tabs, independent "My Picks" & "Scheduled" toggles, etc.

Reactive computations
├── Sidebar counts: read from decisionStore + scheduleStore (Scheduled/Conflicts counts are artist counts, computed by mapping over allArtists)
├── Conflict set: computed via getConflictingArtists(scheduledAppearanceKeys, allArtists)
├── Explore cards: show three-state Schedule toggle (none/partial/full) + "N sets" metadata text for multi-appearance artists, conflict highlight (if applicable)
└── Planner grid: render each appearance as its own block with independent scheduled/conflicting styling
```

### Out of Scope (MVP)

**Confirmed** — The following features are explicitly deferred and should not be implemented:

- Compare (n-way comparison of artists)
- Auto-Optimize (algorithmic schedule suggestions)
- Add Travel Time (time padding between artists on different stages)
- Map View (stage location visualization)
- Drag-and-drop rescheduling
- Custom time edits (user changing artist set times)
- Gamification / XP / Leveling
- Quick Picks sidebar visibility toggle
- Color/palette rework (Pass color, celebration magenta refinements)

These are separate, later features and should not influence the Schedule MVP design.

### Planner "My Picks" filter: zero-positive-picks fallback

**Confirmed** — `app/planner/page.tsx`'s `visibleEntries` filter treats "Show only: My
Picks" as a no-op when `myPickSlugs.size === 0`, showing the full day's lineup instead
of an empty grid. `showMyPicks` defaults to `true` (`plannerViewStore.ts`), so without
this, a brand-new user landing on Planner saw a fully-structured but completely empty
grid — stage columns and hour gridlines are always built from the unfiltered
`allDayEntries` (see `getConflictingArtists`/range logic above), but the "My Picks"
filter itself had nothing to show.

Checks `myPickSlugs.size`, not `Object.keys(decisionsByArtist).length`. The two aren't
equivalent: a user who ran a full Quick Picks session and Passed on everything has a
non-empty `decisionsByArtist` but zero entries in `myPickSlugs` (which only counts
`mustSee`/`interested`) — hitting the identical empty-grid problem a brand-new user
does. Checking `decisionsByArtist` emptiness alone would have missed that case. Once
any positive pick exists, filtering resumes normally, including correctly showing an
empty grid for a specific day none of those picks fall on — that remains real, useful
information, not something this fallback should paper over.

#### The "My Picks" switch itself reflects the no-op, not just the filter

Making the filter a silent no-op solved the empty grid, but left the switch showing
"on" while doing nothing — indistinguishable from a broken toggle. `PlannerPage` now
derives `myPicksDisabled = myPickSlugs.size === 0` and passes it to `Switch` as
`disabled`, with `checked={showMyPicks && !myPicksDisabled}` so it also renders visibly
off in that state, not just inert. `visibleEntries` reads the same combined condition
(`myPicksActive = showMyPicks && !myPicksDisabled`) rather than checking
`myPickSlugs.size` a second time inline, so the switch's visual state and the filter's
actual behavior can't drift apart. Once any positive pick exists, both re-enable and
fall back to reflecting the real persisted `showMyPicks` preference.

`Switch` (`app/components/Switch.tsx`) gained a `disabledReason` prop to carry this:
shown as a native `title` tooltip and folded into the accessible name
(`"${label}. ${reason}"`) when disabled. More significantly, disabled state moved from
the native `disabled` attribute to `aria-disabled` with a guarded `onClick` (`if
(disabled) return;`) — native `disabled` removes an element from the tab order
entirely, so a keyboard/screen-reader user would never land on it to learn it exists,
let alone why it's off. `aria-disabled` keeps it focusable and inert instead. This
changed uniformly for every `Switch` usage (also the Start screen's "Group by Festival
Day" toggle in `StartOptions.tsx`), not just Planner's — `disabledReason` is optional
and that usage doesn't pass one, so its `title`/`aria-label` are unaffected; the only
change it inherits is the same focusability fix, which applies regardless of which
switch it is.

---

## Multi-Appearance Support

**Confirmed** — An artist can have more than one appearance at the active festival
(different day or time — a real Lollapalooza pattern, not hypothetical). **Multi-appearance
complexity is exposed only in the Planner.** Everywhere else — Explore, search,
filters, carousels, Quick Picks, Artist Detail, sorting, Festival Story — an artist
behaves as one entity represented by one deterministically-chosen primary appearance.

### Data Model

**Confirmed**

```typescript
export type FestivalAppearance = {
  id: string; // stable, independent of array position or schedule fields
  festivalId: string;
  billingTier?: BillingTier;
  stage: Stage;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
};

export type Artist = {
  // ...other fields unchanged...
  appearances: [FestivalAppearance, ...FestivalAppearance[]]; // non-empty tuple
};
```

`id` is authored per appearance, scoped to that artist's own `appearances` array —
just `"1"`, `"2"`, ... — rather than derived from array position or from the day/time
fields, so correcting an appearance's schedule details later never invalidates
anything keyed on it. It doesn't repeat the artist's slug: that's already part of the
composite schedule key (`` `${festivalId}::${slug}::${appearanceId}` ``, see
"Scheduling" below), so embedding it again here would be redundant — this also keeps
the shape closer to how a real database table would separate an appearance's own
primary key from its artist foreign key. The non-empty tuple reflects that every
lineup artist has at least one appearance.

### Primary Appearance

**Confirmed** — `getPrimaryAppearance(artist, festivalId)` (`app/lib/appearances.ts`)
is the single source of truth for "which appearance represents this artist" outside
the Planner. Rule: the appearance with the **latest start time** (clock time) wins;
ties are broken by the **earliest festival day**. Example: Thursday 8 PM / Friday 10
PM / Saturday 10 PM → primary is Friday 10 PM.

`getAppearancesForFestival(artist, festivalId)` and `getPrimaryBillingTier(artist,
festivalId)` live alongside it in the same module. Every display, sort, filter, and
search call site outside the Planner — including Day/Stage filters and search — reads
through these and considers **only** the primary appearance, never "any" appearance;
a secondary appearance never causes an artist to match something the UI isn't
otherwise showing.

### Scheduling

**Confirmed** — See the updated `ScheduleState` interface and `getConflictingArtists()`
under "Schedule Feature (MVP) → Data Model" above for the appearance-keyed shape.
Summary of what changed and why:

- **Appearance key**: `` `${festivalId}::${slug}::${appearanceId}` `` — festival-scoped
  and ID-based, not derived from day/time.
- **Two store actions**: `toggleScheduled(key)` (per-appearance, Planner-only) and
  `toggleAllAppearances(artist, festivalId)` (the aggregate control used everywhere
  else — none/partial scheduled → schedules every appearance at the active festival;
  all scheduled → unschedules all).
- **Three-state schedule status** — `getArtistScheduleState(artist, festivalId,
scheduledAppearanceKeys)` returns `"none" | "partial" | "full"`, shared by
  `ArtistCard`, `ArtistActions`, and `filters.ts`'s `scheduleStatus` facet so they can
  never disagree. Filter "Scheduled" = state !== "none"; "Unscheduled" = state ===
  "none"; "Conflicting" = any appearance key in the conflict set.
- **Aggregate control UI**: exactly one Schedule control per artist outside the
  Planner, never per-appearance. Three visual states (inactive / subtle indeterminate
  / fully active) matching the three schedule states — "partial" only becomes
  reachable when some of an artist's appearances were scheduled individually via the
  Planner. Multi-appearance artists additionally get a small always-visible
  disclosure (not a hover tooltip — touch devices have no hover state), purely
  informational, never both set times, never a second control — but placement and
  copy differ by surface:
  - `ArtistCard` (Explore): plain metadata text, **"N sets"**, in the info area below
    the photo beside the stage line — not the photo overlay, and not styled like the
    Headliner badge (billing status, a different kind of fact, keeps its own overlay
    position).
  - `ArtistActions` (Artist Detail): the button's own visible text communicates state
    _and_ count together — **"Add to Schedule · 2 sets"** (none), **"Complete
    Schedule · 2 sets"** (partial), **"Scheduled · 2 sets"** (full).
  - `DecisionScreen` (Quick Picks): a chip immediately after the date/time chip,
    styled identically to the other neutral metadata chips (translucent background,
    subtle white border, muted white text, no icon) — deliberately _not_ emphasized,
    since it's a minor fact rather than a decision input, and must not read as an
    interactive or recurring-event control. Quick Picks still decides on the primary
    appearance alone; the secondary appearance's own time/stage never appears here.
- **Planner** is the only place appearances render and toggle independently — each
  appearance is its own block at its own real time/stage, keyed by its appearance key.

### Persistence

**Confirmed** — The localStorage key stays exactly `"schedule-store"`; only the
values inside the stored Set changed format (artist slug → appearance key), and the
`scheduledArtists` state field was renamed `scheduledAppearanceKeys` to match what it
actually stores. No version bump, no migrate step — this app has never been deployed,
and an old bare-slug-keyed local schedule silently failing to match the new format
(appearing empty) is acceptable, disposable dev-time behavior, not something to design
around. Every lookup is forward-constructed (real appearance → key → `Set.has()`),
so a stale or unrecognized key is simply never matched — inert, not an error.

### Sidebar Counts

**Confirmed** — See "Entry Points for Scheduling → Sidebar" and "State Summary →
Derived State" above: "Scheduled" and "Conflicts" are **artist counts**, computed by
mapping over `allArtists`, not `.size` on the raw appearance-key Sets — otherwise
"3 Scheduled" could open Explore and show only 2 cards.

### Manual Verification Checklist

Re-run whenever this area changes, and whenever a real second appearance is added to
an artist's data:

- **Aggregate scheduling** — none/partial → schedules every appearance at the active
  festival; full → unschedules all.
- **Partial state** — scheduling one of an artist's appearances via the Planner shows
  a distinct (not "none"-identical) state on the Explore card and Artist Detail.
- **Planner independence** — two appearances render as two separate blocks at their
  own real times/stages, independently toggleable, without affecting each other.
- **Primary selection** — latest start time wins; equal start times resolve to the
  earliest festival day (Thu-8PM/Fri-10PM/Sat-10PM → Fri-10PM, checked explicitly).
- **Filters/search** — match only on the artist's primary appearance; a secondary
  appearance never causes an unrelated-looking match.
- **Conflict behavior** — appearances only conflict within the same festival +
  calendar date; same-artist self-overlap is correctly flagged; different
  festivals/dates sharing a `day` label never falsely conflict.
- **Sidebar counts** — "Scheduled"/"Conflicts" reflect artist counts, matching the
  number of cards Explore actually shows when that filter is applied.
- **"N sets" disclosure** — for a multi-appearance artist: `ArtistCard` shows plain
  "N sets" metadata text below the photo beside the stage line (not on the photo,
  not styled as a pill); `ArtistActions` shows the equivalent state+count text
  ("Add to Schedule · N sets" / "Complete Schedule · N sets" / "Scheduled · N sets");
  `DecisionScreen` (Quick Picks) shows a neutral-styled chip immediately after the
  date/time chip; `FloatingCards`' "Playing At" card shows a plain-text count next to
  its own heading (`· N sets`, no chrome/pill), added specifically because that card
  otherwise only ever renders the primary appearance and gave no hint a second one
  exists — unlike the other three, which already disclosed it. None of the four ever
  displays both appearance times, the secondary appearance's own time/stage, or an
  individual per-appearance control outside the Planner.
- **Quick Picks** — exactly one card per artist, built from its selected-day
  representative appearance (see "Quick Picks Attendance" below — this is Quick
  Picks' one deliberate exception to "primary appearance everywhere outside the
  Planner"); the "N sets" chip counts only appearances on the session's selected
  days, and wraps naturally with the other metadata chips on narrow screens rather
  than overlapping them.
- **Planner accessible names** — multiple appearances for the same artist expose
  distinct accessible names containing their day, start time, and stage (e.g. "Add
  Devault — Thursday, 1:45 PM at BMI Stage — to schedule" vs. "Remove Devault —
  Thursday, 7:30 PM at Tito's Stage — from schedule"), not just the artist's name.
- **Single-appearance regression** — every existing single-appearance artist is
  pixel/behavior-identical everywhere, before and after this change.

---

## Quick Picks Attendance

**Confirmed** — Quick Picks asks which festival days the user is actually attending
and scopes the entire session — eligibility, day grouping/progress, displayed
appearance, and billing-tier classification — to those days. This is the prerequisite
the deferred Festival Story "Day of Week Signal" (see below) was blocked on.

### Persisted attendance state

`app/store/attendanceStore.ts` persists `attendanceDaysByFestival: Record<string,
string[]>`, festival-scoped so a future second festival doesn't collide with this
one's selection. Carries the same `hasHydrated`/`HydrationGate.tsx` treatment as
`decisionStore`/`scheduleStore`/`plannerViewStore` (see § HydrationGate Resilience to
Rehydration Errors) — Quick Picks' Start Screen day picker and Festival Story's
attendance-scoped signals both read from this store, so a pre-hydration flash here
would be just as visible as on the other three. Reads and writes both go through
`sanitizeAttendanceDays(festivalId, saved)` — a plain exported function, not just
internal store logic, so it can be called directly (verification scripts do exactly
this):

- No saved selection yet (`undefined`), or a malformed/non-array value — defaults to
  every day in `FESTIVAL_DAYS[festivalId]` (`app/data/festivals.ts` — the single
  source of valid days; Quick Picks keeps no copy of its own).
- Otherwise, the result is built by filtering the _configured_ day list down to
  whichever of its days appear in the saved value. This both drops stale days (no
  longer in the festival configuration) and, as a side effect, de-duplicates and
  restores festival order regardless of click order or storage corruption.
- If that leaves zero valid days but the saved value was non-empty, the save is
  treated as entirely stale and falls back to all configured days — same as no
  selection ever having been made.
- An explicit empty selection (the user deselected every day, so the saved value
  legitimately _was_ `[]`) is preserved as empty, not reset — the UI's job is to
  disable Start Quick Picks for that state, not to silently override it.

Changing attendance never touches `decisionStore` — the two stores are independent,
and a changed selection only changes which undecided artists appear in the _next_
session's queue.

### Selected-day appearance resolution

`getSelectedDayAppearance(artist, festivalId, selectedDays)` and
`getSelectedDayBillingTier(...)` (`app/lib/appearances.ts`) apply the exact same
latest-time/earliest-day-tiebreak rule as `getPrimaryAppearance`, restricted to
appearances on the caller's selected days. Both functions share one private
comparator (`pickPrimaryFromCandidates`) so the two resolution rules cannot drift
apart. Unlike `getPrimaryAppearance`, this returns `undefined` rather than throwing
when the artist has no appearance on any selected day — a normal outcome of the
user's own choice, not a data-integrity violation.

Quick Picks is the one place outside the Planner that reads through this
selected-day helper instead of the unrestricted global primary — every other
non-Planner surface (Explore, search, filters, carousels, Artist Detail, sorting)
still uses `getPrimaryAppearance` unchanged.

### Setup flow

`StartScreen`/`StartOptions` present three vertically stacked steps — Festival, Days
Attending, Grouping. Days Attending renders one selectable card per configured
festival day (yellow when selected, per CLAUDE.md's user-intent color semantics;
neutral otherwise; a checkmark badge so selection state doesn't depend on color
alone), sourcing each day's short date from `getDatesByDay(allArtists, festivalId)`
(`app/lib/appearances.ts`) rather than a duplicated day→date table. Deselecting every
day disables Start Quick Picks and shows inline copy explaining why; the last card can
always be deselected (no "must keep one selected" guard) — the disabled Start button
is the validation.

Grouping's toggle is disabled (with explanatory copy, "Only applies when attending
multiple days") whenever 1 or 0 days are selected, but the underlying `groupByDay`
value is never overwritten — it simply isn't editable, so it returns unchanged if the
user selects another day.

**Snapshot-before-animation:** `handleStart` builds the `QuickPicksSessionConfig`
object synchronously, at click time — before the 100ms button-press animation delay,
not inside its `setTimeout`. The delay exists purely for visual feedback; it must not
be what determines which data the session starts with. That alone isn't sufficient,
though: the _persisted_ attendance selection could still change during those 100ms
and leave the setup screen showing something the session snapshot no longer matches.
`StartOptions` accepts a `disabled` prop, applied as a real `disabled` attribute (not
a `pointer-events-none` CSS trick, which blocks mouse input but not keyboard/assistive
-tech activation) on the day cards and the grouping toggle, so the persisted selection
genuinely cannot change for the duration of the press animation.

### Session snapshot

`QuickPicksSessionConfig` now carries `attendanceDays: string[]`, captured once at
Start in configured festival order (not the store's insertion order). `createSession`
(`app/quick-picks/page.tsx`, exported specifically so verification scripts call the
real orchestration rather than a reimplemented copy) builds the queue once from that
snapshot and derives day order via `getDaysForFestival(config.festivalId)` — scoped to
the session's own festival, not assumed to be the active one, so a future
multi-festival session can't silently pull another festival's day order. Exiting
discards the session and returns to setup, where the persisted selection reappears via
`sanitizeAttendanceDays` for the next Start.

### Eligibility

An artist is eligible when `getSelectedDayAppearance` returns a defined appearance
(at least one set on a selected day) **and** has no existing verdict in
`decisionsByArtist`, regardless of source (Quick Picks, Explore, or Artist Detail) —
unchanged from the pre-attendance filtering rule, just now composed with the
day-eligibility check. A "Passed" verdict counts as already reviewed here even though
it's excluded from the Sidebar's "My Picks" count elsewhere — different, unrelated
semantics for different features.

### Grouped queue

One day at a time, in festival order, skipping unselected days entirely.
`interleaveByTierWithinDay` (`app/lib/quick-picks-queue.ts`) now takes `QueueEntry[]`
(`{ artist, appearance }` pairs) instead of bare artists, reading billing tier from
the entry's own selected-day appearance rather than recomputing a global primary. Day
Complete screens appear only between selected days; "Continue to [Day]" always names
the _next selected_ day, never a skipped one, because it's read directly off the next
queue item. The final selected day proceeds straight to the completion screen.

### Ungrouped queue

`buildUngroupedQueue` (`app/lib/quick-picks-queue.ts`) avoids naively round-robining
already-interleaved per-day queues (which would place every selected day's headliner
back-to-back). Instead: split each selected day into recognizable
(Headliner/Sub-headliner) vs. undercard buckets and shuffle within each; round-robin
across days to build one day-balanced undercard stream and one day-balanced
recognizable stream; merge those two streams at ~2 undercard : 1 recognizable — the
same pacing `interleaveByTierWithinDay` uses within a single day, via a shared merge
helper (`mergeUndercardAndRecognizable`) so the two strategies can't drift apart. A
single selected day degenerates safely (both streams collapse to one bucket,
producing the same pacing as the grouped strategy for that day). No Day Complete
screens; progress uses the full queue.

### Multi-appearance disclosure, attendance-scoped

Inside Quick Picks only, the "N sets" chip counts appearances on the _session's_
selected days, not the artist's total appearance count — an artist playing Friday and
Sunday shows "2 sets" only if both days are selected; if only Friday is selected, no
chip appears at all. Artist Detail and Planner are unaffected and continue showing
complete appearance information regardless of Quick Picks attendance.

### Completion copy

`QuickPicksCompleteScreen.tsx` (renamed from `FestivalCompleteScreen.tsx` — the old
name implied "the whole festival," which is exactly the claim this rewrite removes)
derives its eyebrow, headline, and supporting copy from `context`
(`sessionComplete` | `nothingToReview`) and the session's captured `attendanceDays`:
one selected day names it directly ("every artist playing Friday"); multiple days say
"every artist playing on your selected days" — never a blanket "entire festival
lineup" claim, since that would only be true if every configured day were selected.
Its "Schedule" card now navigates to `/planner` (previously it silently returned to
the Quick Picks setup screen, which wasn't actually the Schedule feature).

### Not touched in this iteration

- **Planner / Explore** — unaffected by attendance; both continue showing the
  complete festival schedule/lineup regardless of Quick Picks attendance selection. A
  future Planner integration may _acknowledge_ attendance (e.g. a visual hint on
  unselected days) without requiring Planner to hide anything.
- **Festival Story** — now attendance-scoped; see "Festival Story" above (`§
Attendance scope`) for how it consumes the _launching session's_ captured
  `attendanceDays` rather than re-reading the persisted store.

---

## Spotify Listen First & Quick Listen

**Confirmed** — Artist Detail's "Listen First" and Quick Picks' "Quick Listen" play
audio via official Spotify `<iframe>` embeds only: no Web Playback SDK, no Spotify Web
API calls, no OAuth/client ID/secret, no data-fetching script. This is a hard
boundary, not just an MVP shortcut — revisit deliberately, not by accretion.

### Data Model

```typescript
export type Artist = {
  // ...other fields unchanged...
  tracks: Array<{
    spotifyId?: string;
    name: string;
    album: string;
    duration: string;
    artworkUrl?: string;
  }>;
  // Presence of this field is itself the "curated, not auto-resolved" signal — no
  // separate verified/reviewed flag.
  listenFirst?: {
    mode: "tracks";
    note?: string;
  };
};
```

### Product decision: Spotify artist embed is the default

**Confirmed** — The Spotify **artist** embed (`open.spotify.com/embed/artist/{id}`,
via `artist.socials.spotify`) is the default Listen First experience for this MVP.
`resolveListenFirst(artist)` (`app/lib/listenFirst.ts`) picks it whenever
`socials.spotify` parses to a valid artist URL (`parseSpotifyArtistId`,
`app/lib/spotify.ts` — tolerates query params/trailing slashes/locale prefixes,
validates a 22-char base62 ID).

The curated-tracks override (`listenFirst.mode: "tracks"`, up to 3 tracks with
`spotifyId`, rendered as compact `SpotifyTrackEmbed`s) exists **only** for acts with no
single Spotify artist page that represents them — showcases/collectives/supergroups
like Chicago Made, where the "artist" URL on file is really one member's profile. It
is not a general-purpose curation path for ordinary artists, and it always wins over
`socials.spotify` when present, since its presence is a deliberate correction.

Quick Picks' "Quick Listen" is simpler by design: only `artist.tracks[0]`, only when it
has a `spotifyId` — never a search through later tracks. This makes the Quick Picks
song a plain data-ordering convention (place the intended track first) rather than a
new field.

This artist-embed-as-default posture is the current product decision for the MVP, not
a placeholder — treat it as confirmed until deliberately revisited.

### Components

**Confirmed** — `SpotifyArtistEmbed` and `SpotifyTrackEmbed` (`app/components/ui/`)
are the two reusable embed primitives, shared across Artist Detail (curated tracks)
and Quick Picks (Quick Listen). Both: no autoplay, informative `title`, standard
Spotify `allow` list, never alter/crop/overlay Spotify's own iframe content. Artist
embed height is 370 (Spotify's non-compact layout, tall enough that a third track row
isn't clipped — Spotify's list can be longer; users scroll inside it, FestFuse doesn't
cap it). Track embed height is fixed at 80 (Spotify's compact layout).

`SpotifyTrackEmbed` defaults to `loading="lazy"`, correct for Artist Detail's stacked
multi-track "Listen First" list, where later tracks can sit below the fold. It also
takes an optional `priority` prop (mirrors `next/image`'s own prop of the same name) for
callers where the embed is always in the initial viewport and never stacked — Quick
Picks' single Quick Listen embed sets this, since a lazy-loaded blank box read poorly on
a screen designed around fast, confident decisions.

### Spotify Embed Corner-Clipping

The `rounded-xl overflow-hidden` wrapper around `SpotifyTrackEmbed`'s iframe doesn't
perfectly mask the iframe's own square corners — a faint brighter leak is visible at
each of the four corners, most noticeable on Quick Picks' Quick Listen against a mostly
dark box interior. Same category of issue as the Home Cards corner-clip bug above.

**Tried:** dimming the wrapper's border from `border-white/25` to `border-white/12`, to
match the app's other neutral chip/card borders (metadata pills, the Grouping card).
Reverted — at the dimmer value, the flat edges go nearly invisible, so the corner leak
reads as an obvious glitch rather than blending in. At `/25`, the brighter, more evenly
lit edge gives the whole box a subtle beveled feel, and the corner leak reads as part of
that bevel rather than a mistake. Kept at `border-white/25`.

### Playback lifecycle: key-based remount, not reset effects

**Confirmed** — Both embeds live inside JSX already keyed by `artist.slug` (Quick
Picks' animated hero, Artist Detail's per-artist `ListenFirstSection`), so switching
artists — forward or via undo — unmounts the previous iframe through React's normal
key-based remount. No `useEffect` reset, no global "currently playing" state. This was
a deliberate choice, not an oversight: an early draft used a reset effect and tripped
`react-hooks/set-state-in-effect`; switching to key-based remount removed that whole
class of state.

### Rejected alternatives

- **Spotify iFrame API** — deferred. A plain iframe meets every current requirement;
  the iFrame API would add complexity (and a package) for cross-embed playback
  coordination nothing here currently needs. Multiple curated-track embeds can
  technically play simultaneously today — accepted for the MVP.
- **Broad per-artist track curation as the default** — rejected. Curating 3 trustworthy
  tracks per artist is an editorial effort orthogonal to this feature; the artist
  embed is the default specifically so curation stays scoped to the narrow case where
  it's actually needed.
- **`verified`/`reviewed`/`quickPickSpotifyId` fields** — rejected. `listenFirst.mode`
  and `tracks[0]`'s position are themselves the signals; no parallel bookkeeping.

### Deferred

- Cross-embed playback coordination (pause-others-on-play) — not implemented, no
  near-term plan (see Rejected alternatives).
- `AlbumArtwork.tsx` (`app/components/ui/`) has no remaining callers since the old
  per-track selector UI was replaced by these embeds — kept, not deleted, in case
  per-track artwork is useful again.

### Embed Rate-Limiting Under Rapid Interaction

Quick Picks' Quick Listen embed sets `priority` (eager load, not lazy) per the
rationale above — every card change fires an immediate new `open.spotify.com/embed`
iframe request. A pre-release automated audit that clicked through ~50-90 decisions
in a few seconds hit a 503/504 from Spotify's own CDN on two of those runs.

**Plausibility for a real user (initial assessment, not rigorously measured):** this
isn't automation-only. Quick Picks has keyboard shortcuts (A/S/D) specifically so a
user can move fast, "Pass" requires no listening/reading before deciding, and
reaching Festival Story is designed around getting through all 4 days — up to ~168
decisions — in one sitting. A real user speed-skimming a day of artists they don't
recognize, using the shortcuts, could plausibly land in the same request-rate
neighborhood that triggered this. Spotify's actual rate-limit threshold (requests per
second/minute per IP) is unverified, and the exact trigger point wasn't isolated
precisely, so treat "plausible under a fast real session" as a working assumption,
not a confirmed frequency.

**Current state:** `SpotifyTrackEmbed`'s optional `showLink` prop adds a click-through
"Open in Spotify" footer (matching `SpotifyArtistEmbed`'s own, always-on link),
enabled in `ListenFirstSection.tsx`'s curated-tracks mode — so a failed or blocked
embed there still leaves the user a working path to the track. Quick Picks' Quick
Listen (`DecisionScreen.tsx`) uses the same component with `showLink` left off,
deliberately: a failed embed load renders as a blank/broken iframe box there with no
fallback, unchanged from before, since any added chrome works against the momentum
this specific screen is built around. The rate-limiting risk described above is
unaffected either way — Quick Listen is the one under real request-cadence pressure,
and it wasn't touched. Post-launch, still worth measuring actual request cadence
during real Quick Picks sessions and revisiting whether Quick Listen needs its own
lighter-weight fallback if it's anywhere near the threshold.

---

## Responsive Design

Mobile (`< md`), tablet/desktop (`md`+), and large-screen (`> 1760px` content width)
treatments across Explore, Artist Detail, Planner, and the shared Sidebar. Breakpoint
choice is deliberate per surface, not a single global cutoff: `md` for navigation
chrome (matches the app's existing sparse `md:`/`lg:` usage elsewhere), `lg` for the
Artist Detail two-column split (a 288px fixed sidebar plus its gap needs more room than
the nav does — `md` there would leave a cramped column at tablet-portrait widths).

### `<body>` is `overflow-hidden`, deliberately

`app/layout.tsx`'s `<body>` carries `overflow-hidden` alongside `min-h-screen`. Every page manages its own scrolling internally, inside a `<main overflow-y-auto>` (or equivalent) that already lives within the root layout's `h-dvh overflow-hidden` wrapper div — `<body>` itself was never meant to be a scroll container. Without its own `overflow-hidden`, it can still become one anyway: mobile browsers animate their address bar in and out, and `100dvh` can render a px or two taller than the true visible viewport during that transition, which is enough for `<body>` (unconstrained) to pick up a page-level scrollbar even though every page's actual content is fully handled by its own internal container. This was caught on `not-found.tsx` specifically — its content is short and static, so the stray scrollbar had nothing legitimate behind it and was immediately obvious, unlike on content-heavy pages where it would've been indistinguishable from real scrolling. The fix belongs here, not on any individual page — don't reintroduce a per-page `overflow-hidden` workaround for this same symptom if it resurfaces elsewhere; it means this root cause needs another look.

### Mobile Navigation: Sidebar as Drawer

`Sidebar.tsx` renders as both the desktop static column and the mobile drawer panel
from one component (no forked mobile nav) — `fixed md:static` with a `translate-x`
toggle driven by `chromeStore`'s `isMobileDrawerOpen`, plus a `MobileTopBar.tsx`
carrying the hamburger trigger. `MobileTopBar` mirrors `Sidebar`'s own
`isSidebarVisible` check (hidden together during the Quick Picks decisioning flow) —
the two must stay in lockstep, or mobile users see a hamburger that opens nothing.
`isMobileDrawerOpen` is intentionally non-persisted, same category as
`isSidebarVisible`.

The hamburger trigger sits on the leading (left) edge of `MobileTopBar`, with the
"FestFuse" wordmark absolutely centered in the bar rather than sharing the trailing
edge with it. This matches the drawer's own fixed `left-0` position (and the desktop
static sidebar's same left position) — trigger and result live on the same side, on
every breakpoint, rather than opening from the opposite edge of wherever it's tapped.

### Large-Screen Content Capping

Explore, Artist Detail, and Planner each cap their content column at
`max-w-[1760px] mx-auto`, applied **per-page**, not as a shared `layout.tsx` wrapper —
a global wrapper would also clip `ArtistHero`'s and Quick Picks' intentional full-bleed
treatments. `ArtistResultsGrid`'s `2xl:grid-cols-6` is unaffected (the cap only bites
above 1760px, so it's additive).

### Artist Hero: Diverging Mobile/Desktop Treatment

`ArtistHero.tsx` intentionally renders two different content blocks (shared
`identityBlock`/`metaRow` JSX, different wrappers), not one responsive layout: desktop
keeps genre/name/location/socials/actions overlaid in a left column with a left-right
cinematic gradient; mobile instead bottom-anchors genre/name/location over the photo
(bottom gradient only, no left-right darkening) and moves the action buttons (Must
See/Interested/Add to Schedule) out of the hero entirely, into normal page flow below
it (`ArtistContent.tsx`, `md:hidden`, alongside a `hidden md:block` duplicate of the
same overlay-positioned instance inside the hero). `ArtistActions` has no local state —
it only reads the shared decision/schedule stores — so two mounted instances stay in
sync automatically. This divergence is deliberate: a 58%-width left column that works
on a widescreen photo would otherwise either bury most of the mobile photo under text
(if kept at full width for legibility) or force cramped, easily-clipped text (if kept
narrow) — a portrait phone photo and a widescreen desktop photo are different enough
shapes that one hero layout doesn't serve both.

### Live Performance (YouTube Embed)

`LiveVideoSection.tsx` builds its player via the YouTube IFrame Player API
(`youtube.com/iframe_api`, one script load shared across mounts) targeting a
`useId()`-generated element by string ID, rather than a bare `<iframe src="...">`.

**Testing gotcha, worth knowing before "fixing" this again:** a YouTube embed loaded
from a bare LAN IP address over plain HTTP (used for testing this app on a phone over
the local network) reliably shows a permanent "Video unavailable" — browsers treat
`localhost` and real HTTPS as secure contexts but do **not** extend that exception to
an arbitrary LAN IP, and YouTube's embed depends on a secure context to actually load
video data (the player shell/UI still loads either way, so the failure looks content-
or platform-specific but isn't). This reproduces identically across devices and
browser engines on the same network, confirmed via a temporary HTTPS tunnel
(`cloudflared tunnel --url`) pointed at the same running dev server, which resolved it
with no code change. Production is always real HTTPS, so this only ever matters when
testing over a LAN IP during development — test via `localhost`, or a tunnel, not the
LAN IP, if a live video ever appears broken again.

**Fallback on API load failure:** `loadYouTubeApi()`'s promise only resolves via
YouTube's own global `onYouTubeIframeAPIReady` callback, with no `onerror` handler on
the injected `<script>` tag — if that script is blocked (e.g. by an ad blocker, which
commonly blocks `youtube.com` script domains) or otherwise fails to load, the promise
would never resolve. `LiveVideoSection.tsx` guards this with an 8-second timeout: if
the player hasn't mounted by then, the section swaps its empty target `<div>` for a
"Watch on YouTube" link to the video directly, rather than leaving a permanently blank
box with no indication anything's wrong.

The timeout also resets the module-level `apiPromise` cache to `null`. Found via manual
testing, not code review: without this, one blocked/failed script load poisons every
artist visited afterward in the same session (client-side navigation, no hard reload) —
each one's `loadYouTubeApi()` call would find `apiPromise` already set and reuse that
same dead, never-resolving promise instead of attempting its own fresh load, even after
whatever caused the original failure (e.g. an ad blocker toggled off mid-session) no
longer applies. Resetting it on timeout means each subsequent artist gets an independent
attempt. Safe even against the _delayed_, not dead, case from above: if the original
script does eventually load after a second one's been injected, both promises still
resolve, since `window.onYouTubeIframeAPIReady` chains onto whatever callback was
previously assigned rather than overwriting it.

### Explore Search Input Zoom-on-Focus

iOS/WebKit (Safari and Chrome-on-iOS both — they share WebKit; not reproducible on
Android) auto-zooms the page when the Explore search input (`ExploreFilters.tsx`, the
only text input in the app) is focused while the page has been scrolled — never at
scroll-top. Root cause is distinct from the classic under-16px-font-size trigger (this
input is already `text-base` on mobile, confirmed 16px): it's the "`<body>` is
`overflow-hidden`" shell immediately above — every page's real scrolling happens inside
its own `<main overflow-y-auto>`, not the document, and WebKit's zoom-to-bring-input-
into-view heuristic can misfire specifically when the scrolled container is nested
rather than the document itself. Confirmed to reproduce identically against a real
production build over a public HTTPS tunnel, ruling out a dev-mode or LAN-testing
artifact. Once triggered, the zoom is only recoverable by a gesture that reaches the
actual document-level scroll (dragging the background) — most users won't intuitively
do this, so without it the top of the page stays clipped off-screen indefinitely.

**Tried:** suppressing the zoom preemptively, by appending `maximum-scale=1` to the
viewport meta on the input's `focus` event and restoring it on blur. Confirmed not to
work on a real device — WebKit's zoom-on-focus decision happens essentially
synchronously with the native focus event, before a React `onFocus` handler gets a
chance to mutate the meta tag, so the mutation consistently loses the race.

**Fix:** correct it after the fact instead, on `blur` — no native zoom behavior fires
on blur, so there's no race to lose. `ExploreFilters.tsx`'s search input's `onBlur`
forces a viewport-meta recalculation (toggle `maximum-scale=1` on then immediately
back off) plus a same-effect scroll nudge (`window.scrollTo` by 1px and back),
reproducing the confirmed manual recovery (dragging the background) programmatically.
This still doesn't prevent the zoom from happening in the first place, and its
reliability across iOS/WebKit versions hasn't been broadly verified — if it turns out
not to hold up, the fallback is a static `maximum-scale=1` app-wide (reliable, at the
cost of disabling pinch-zoom everywhere, not just for this input) rather than trying
further variants of this same class of fix.

Separately, `app/globals.css` also enforces a `font-size: 16px` floor on any
`input`/`textarea`/`select` below `768px` — the classic, different under-16px-font-size
zoom trigger this section opens by ruling out for this one input. No shared `Input`
component exists to enforce that centrally, so it's a global CSS guardrail instead,
covering any input added elsewhere in the future.

### Decisioning Screen Mobile Density

`DecisionScreen.tsx`'s mobile layout: the hero's bottom content row
(`flex-col md:flex-row`) stacks the name/genre column above Quick Listen on mobile
instead of sitting side by side — at mobile widths, the previous single-row layout put
a fixed 288px column beside a flexible one with no responsive fallback, so the two
collided (the Quick Listen embed rendering on top of the artist name instead of beside
it). "Sounds Like" is hidden below `md:` entirely rather than collapsed behind a
disclosure toggle — Quick Picks optimizes for momentum, and an expand affordance on
every card would reintroduce the second-guessing the product philosophy explicitly
avoids; the fuller comparison stays available on Artist Detail. The four metadata chips
(day/time, sets, duration, stage) collapse to two consolidated pills on mobile
(day/time+sets, and stage) rather than one merged pill — combining everything into a
single pill risked an awkward two-line wrap on narrow devices; duration drops from the
mobile view entirely as the least decision-relevant of the four facts. The A/S/D/Z
keyboard-hint row (`DecisionScreen.tsx`) and the Enter hint (`DayCompleteScreen.tsx`)
are both `hidden md:flex` — meaningless on touch devices, pure vertical cost there. The
hero's height budget is responsive (`calc(100dvh-190px)` mobile, matching the
above-listed height recovered from removing the hint row and other spacing, vs.
`calc(100dvh-220px)` desktop, unchanged). Back and Exit both got `p-2 -m-2` (padding
expands the tappable box, matching negative margin cancels the visual footprint — same
pattern as `ArtistHero.tsx`'s social icons) since neither had any padding at all before.

**Zero scroll here is a strong preference, not an absolute requirement** — the goal is
no scroll on mainstream phone sizes (confirmed via headless-browser testing at
375×667 and 390×844 across a spread of artists, including gradient-fallback and
real-photo heroes, artists with and without a Quick Listen track, and the one
multi-appearance artist in the data). On genuinely extra-small devices, a small amount
of residual scroll is an accepted outcome if the alternative is compressing the card
past comfortable legibility — over-compression is the worse failure mode.

**Not pursued:** swipe-gesture decisioning. The exit-animation direction vocabulary
already exists and maps cleanly to a swipe metaphor (pass=left, interested=right,
mustSee=up), but that's the easy half — live drag-tracking, a commit threshold, and
disambiguating a 3-way gesture (versus the simpler 2-way left/right most swipe apps
use) is real, untested work. A verdict here isn't disposable the way a Tinder swipe is
(it feeds Festival Story and shapes the user's own sense of their taste later), and a
3-way gesture is more failure-prone than a deliberate button tap — worth a dedicated
spike with room to tune thresholds properly, not something to fold into a
responsiveness pass.

**Future consideration — natural-height hero instead of a fixed `calc(100dvh-Npx)`
budget.** Both the mobile and desktop height constants above assume a fixed pixel
budget for everything surrounding the hero, which is fragile against mobile browser
chrome (Safari's address bar expanding/collapsing changes the usable viewport
independently of `dvh`). A more robust version would let the top bar, metadata pills,
and decision buttons take their natural height in a flex column, with the hero as a
`flex-1 min-h-0` child absorbing whatever space is left, instead of the reverse. Real
structural change to the screen's flex hierarchy — worth doing eventually, not done
now, since the calc() approach (once tuned against real devices) covers the large
majority of phones.

### Quick Picks Setup Screen Reachability

`StartScreen.tsx` no longer renders a festival name/dates/location line above the day
picker — it was a one-off hardcoded string (disconnected from `festivals.ts`'s actual
data) with no equivalent anywhere else in the app, and removing it both resolved an
inconsistency question and recovered the height its occasional line-wrap was costing.
`StartOptions.tsx`'s "Grouping" card hides its decorative `Calendar` icon below `md:`
to reclaim the width that was pushing the "Recommended" badge onto its own line next to
"Group by Festival Day" — the wrap was costing height as well as looking wrong. Both
changes, plus tightened root/card padding on mobile, exist specifically to bring the
"Start Quick Picks" CTA closer to a comfortable thumb reach — previously the combined
height of the info line, the card's padding, and the wrapped badge pushed it low enough
to require a stretch or a scroll.

The CTA label itself now mirrors `HomeContent.tsx`'s existing Start/Continue rule
(`decisionsByArtist` has any decision whose `source` is `"quickPicks"` → "Continue Quick
Picks", never based on Explore-sourced decisions, since Explore has no session concept
to resume) rather than always reading "Start Quick Picks" — inlined the same one-line
check rather than extracting a shared hook, since `HomeContent.tsx` doesn't use one
either. `QuickPicksBanner.tsx` (the static Explore-carousel entry point) intentionally
keeps its unconditional "Start Quick Picks" label — it's advertising entry into the
mode, not reflecting personal session state the way Home's and the setup screen's own
CTAs do.

---

## Home Page & Onboarding

**Confirmed** — `/` (`app/page.tsx` → `app/components/home/HomeContent.tsx`) is a real
orientation screen, not the `create-next-app` boilerplate it used to be. Supersedes
"Future Consideration: Onboarding / How It Works Explainer" below — that idea is built;
this section is the actual record.

### Design principle: orientation vs. explanation

Home = orientation ("where do I start"), the Help modal = explanation on demand (opened
from Home or Sidebar), individual pages = contextual guidance (unchanged). Home does not
try to explain the app itself — CLAUDE.md's "prefer progressive disclosure" principle
means Home stays three entry cards plus a "How FestFuse works" link; the actual
explaining happens in the modal.

### Three cards: equal weight, not size-based hierarchy

Quick Picks, Explore, and Planner render as three equally-sized cards, differentiated
only by copy and row position (Planner last), never by size or decorative weight —
equal decorative weight (gradient + icon watermark + full-opacity text) on all three,
with Planner's "downstream of a decision" framing (per CLAUDE.md's Schedule
description, "organize a plan after decisions have already been made") carried entirely
by its copy ("Already have some picks? Turn them into a schedule.") and its position at
the end of the row.

Each card sits at a different point along the same cool/cyan spectrum rather than one
uniform teal for all three — electric cyan (Quick Picks), seafoam/turquoise (Explore),
azure (Planner). Deliberately stays inside that spectrum and never reaches toward
violet/magenta: CLAUDE.md reserves celebration magenta for actual celebration moments
(Festival Story/Wrapped-style accents) used sparingly — diffusing it onto a homepage
card, which every session touches, would erode the rarity that makes it read as special
where it's actually used (Quick Picks' own screens already lean on `COLORS.celebration`
— see `QuickPicksCompleteScreen.tsx`, `DayCompleteScreen.tsx`, `DecisionScreen.tsx`,
`StartScreen.tsx`).

No hierarchy is implied between Quick Picks and Explore specifically — CLAUDE.md frames
them as two equally legitimate, different approaches to discovery ("guided
decision-making" vs. "curious, self-directed"), not a primary/secondary pair. The one
existing asymmetry (Quick Picks' label uses a verb, "Start"/"Continue," while Explore
and Planner are static nouns) exists for the functional reason below, not as a
deliberate emphasis choice.

### Card hover interactions: restrained tilt + Quick Picks brightness parity

Each card gets a cursor-tracked tilt on hover (`useCardTilt` in `HomeContent.tsx`) —
max ~2° `rotateX`/`rotateY` derived from pointer position within the card, combined
with the existing `-4px` lift, applied as an inline `style` (not a Tailwind hover
class) since the rotation angle is continuous and pointer-position-dependent, not a
fixed on/off state. Deliberately capped low: this is a hover accent, not a 3D gimmick,
and CLAUDE.md's "the direction already carries meaning, don't add personality on top of
geometry" guidance (written for Quick Picks) applies here too — the tilt should read as
polish, not distract from the card's own color identity doing the differentiation work.

Quick Picks' gradient (`#00C2D6` → `#04303D`) reads slightly brighter at rest than
Explore's or Planner's despite comparable saturation, so it carries a `bg-black/[0.05]`
overlay that fades to `opacity-0` on hover (`group-hover`), landing all three cards at
comparable resting brightness while still letting Quick Picks reach its full, brighter
color on interaction. Implemented as an opacity-animated overlay rather than editing the
gradient's color stops directly, since browsers don't reliably animate `linear-gradient`
color-stop transitions but do animate opacity.

### Hero glow: anchored to the wordmark, not the layout

The atmospheric glow behind "FestFuse" is centered on the `<h1>`'s own box via
`top-1/2 left-1/2` + `-translate-x-1/2 -translate-y-1/2`, not hardcoded pixel offsets
against the outer container — this keeps it mathematically centered on the wordmark at
any viewport width or font scale, rather than a value eyeballed at one screen size that
drifts at another. Sized elliptical (`360×260`, wider than tall) to match the
wordmark's own proportions, with `blur-2xl` instead of a wider/softer blur — tight
enough to read as a glow behind the logo, not a haze bleeding into the subtitle below
it.

The gap between the cards row and the "How FestFuse works" link (`mt-10`) is sized to
clear more than just the glow's resting footprint: Quick Picks' hover box-shadow
(`0 20px 60px -15px rgba(...)`) isn't clipped by the card's `overflow-hidden` — box-
shadow renders outside an element's own box regardless of its overflow setting — so it
blooms downward on hover. `mt-10` leaves enough clearance that this bloom fades out
before reaching the link text instead of washing over it.

### Quick Picks label is state-aware, keyed on `source`, not on "any decision"

`quickPicksLabel` reads `decisionsByArtist` from `useDecisionStore()` and shows
"Continue Quick Picks" if **any** decision has `source === "quickPicks"`, otherwise
"Start Quick Picks." Deliberately not `Object.keys(decisionsByArtist).length > 0` —
most picks can come from Explore, which has no session concept to "continue," so that
broader check would show "Continue" for someone who's never touched Quick Picks.
`source`, not `verdict`, is what's checked: a session where every artist was Passed
still correctly counts as "you've done this before," since decisions are written to the
store the instant they're made (see "Quick Picks Session vs. Shared Store" above), not
deferred until completion.

### Shared Chrome (Sidebar)

`Sidebar` renders once, in `app/layout.tsx`, inside a `flex h-screen overflow-hidden`
wrapper that also contains `{children}` — every route shares this single instance
rather than each page mounting its own. `<main>` itself stays owned by each page (not
centralized in the layout), since pages differ in their `<main>` classes, refs, and
scroll-container needs.

Visibility is controlled by `app/store/chromeStore.ts`'s `isSidebarVisible` — a small,
non-persisted Zustand store, defaulting to `true` so every route needs zero wiring to
show it. `Sidebar` reads the flag and returns `null` when hidden, after all its own
hooks have run (Rules of Hooks) — this also unmounts `HowItWorksModal`, which `Sidebar`
owns, along with it. Quick Picks is the only consumer: it sets `isSidebarVisible` to
`step === "start"` (chrome only on the Start screen, hidden through decisioning and
completion, matching that flow's no-chrome design) and restores it to `true` on
unmount, so leaving Quick Picks for another route never leaves the shared Sidebar
stuck hidden.

Because Sidebar lives in the root layout, Next's default not-found boundary
(`app/not-found.tsx`) renders inside the same shared chrome — an invalid route shows
the Sidebar alongside the not-found message, not a bare unstyled page.

### Help modal: recoverable from Sidebar, not just Home

`app/store/helpStore.ts` — a small Zustand store, **intentionally non-persisted** (no
`persist` middleware), same "in-memory-only" precedent as `exploreFilterStore`:
ephemeral UI state that needs to be reachable from both `Sidebar.tsx` (which owns the
single `HowItWorksModal` instance) and `HomeContent.tsx`'s own separate trigger button,
without prop-drilling through the tree.

`Sidebar.tsx` renders a "Utilities" section — visually separate from the four primary
nav items and from "My Festival" — containing one entry, "How it works," and also
mounts `HowItWorksModal` itself, so the modal is available on every route via the one
shared Sidebar instance (see "Shared Chrome" above). On Quick Picks, Help is reachable
on the Start screen but not during decisioning or completion, since that's when the
shared Sidebar itself is hidden — consistent with that flow's no-chrome design, not a
gap.

Modal content stays to "30 seconds": four one-line concepts (Explore, Quick Picks,
Planner, Festival Story), each reusing the same icon as its Home card (`Search`, `Zap`,
`CalendarDays`, `Film` — `Film` matches the icon already used in
`FestivalStoryCard.tsx`). Deliberately excludes Must See/Interested mutual exclusivity,
Passed's lack of a card indicator, multi-appearance mechanics, and conflict logic — all
self-explanatory in the moment they occur, not worth pre-teaching. The Festival Story
line reuses `FestivalStorySequence.tsx`'s own intro card copy ("sounds and priorities
behind your picks") rather than inventing new phrasing.

### Dialog Accessibility (Focus Management)

`app/hooks/useDialogA11y.ts` is a shared behavior hook used by every full-screen or
modal-like surface in the app: `HowItWorksModal`, `FestivalStorySequence`,
`QuickPicksCompleteScreen`, `DayCompleteScreen`, and `Sidebar`'s mobile drawer. It
captures and restores the previously-focused element, moves focus to a target on
open, traps Tab within the surface's container, and closes/exits on Escape. Markup
concerns (`role="dialog"`, `aria-modal`, `aria-label`/`aria-labelledby`) stay in each
consumer's own JSX — the hook only owns behavior, via an optional `initialFocusRef`
(defaulting to the first focusable element in DOM order when omitted).

Each consumer's initial-focus target is a deliberate choice, not the default:

- **HowItWorksModal** — the close button. The modal's only real actions are reading
  the four one-line concepts and closing; there's no other CTA to prioritize.
- **FestivalStorySequence** — the active card's "Reveal Next" / "View My Picks"
  button, forwarded into `FestivalStoryCard` via a `buttonRef` prop. Deliberately not
  the close button: Close is intentionally understated (small, top-corner) since the
  intent is to draw the user through the story, not toward leaving it.
- **QuickPicksCompleteScreen** — the Festival Story card when `storyUnlocked`, since
  that's the destination this screen is built around; falls back to "Take a Second
  Look" when locked (Festival Story isn't a real button in that state — see "Recovery
  path for a locked Story" above), staying within the Festival Story slot rather than
  jumping to the unrelated Schedule card. Schedule is never the default target.
- **DayCompleteScreen** — the "Continue to {next day}" button, the screen's one
  unambiguous primary CTA. Its existing Enter-key shortcut is a separate,
  single-consumer `useEffect` (auto-advance on Enter) rather than being folded into
  the shared hook, since no other screen has an equivalent behavior.
- **Sidebar (mobile drawer)** — uses the hook's default (first focusable element in
  DOM order, the FestFuse logo link), since the drawer has no dedicated close button
  of its own — closing happens via the backdrop, a nav link, or now Escape.
  `isMobileDrawerOpen` is only ever `true` in the mobile drawer context, so the hook
  stays inert on desktop's static sidebar column. `onClose` restores focus to the
  hamburger button in `MobileTopBar.tsx` that opened it.

### Footer

`app/components/Footer.tsx` — two lines: "FestFuse · 2026" (identifies it as a footer,
not stray text) and a disclaimer ("FestFuse is an unofficial fan project and is not
affiliated with Lollapalooza or C3 Presents"), since the app uses real Lollapalooza 2026
data (`ACTIVE_FESTIVAL_ID`). No links — Privacy/Terms/Contact pages don't exist yet, and
a footer linking to nothing would be worse than no footer.

**Placement:** Home, Explore, Artist Detail. **Not** Planner or Quick Picks. Quick
Picks' exclusion is the momentum/no-chrome argument used throughout that flow. Planner's
is a distinct, concrete cost: its `<main>` doesn't scroll (`overflow-hidden`), and
`PlannerGrid` fills all remaining height via `flex-1` — a footer there wouldn't appear
"below scrollable content" the way it does on Explore/Artist Detail, it would
permanently shrink the grid's rendered height on every visit.

**Sticky-footer flex pattern**, applied on Home, Explore, and Artist Detail: `main` is
`flex flex-col`, and the content wrapper immediately before `Footer` gets `flex-1`.
This exists because `Footer` used to just follow whatever content preceded it with no
mechanism to sit at the true bottom of the viewport when that content was shorter than
the screen — invisible on Explore/Artist Detail, which are usually tall enough to fill
the viewport on their own, but reliably visible on Home, whose content (headline +
cards) is short. `flex-1` fixes both: it grows to fill available space when content is
short (pushing `Footer` to the bottom), and behaves exactly as before when content
exceeds the viewport, since flex items don't shrink below their own content size.

---

## Responsive Layout — Home & Artist Hero

**Home page card row** (`app/components/home/HomeContent.tsx`): the three entry cards (Quick Picks/Explore/Planner) are fixed-width (`w-64`), so the stacked mobile column needs an explicit `items-center` — without it, fixed-width flex children default to the cross-axis start (left) rather than centering. `sm:items-stretch` restores the row layout's prior implicit default so centering doesn't leak into desktop.

**Home page vertical centering:** the `max-w-5xl` content div adds `xl:flex xl:flex-col xl:justify-center` so content centers vertically on wide/tall viewports instead of sitting pinned near the top with dead space below. `xl:` (1280px), not `lg:`, because real laptops (1440px+ logical width) all clear it, while the 1024–1280px zone catches split-screen windows and landscape tablets with unpredictable vertical headroom. Safe regardless of viewport height: the div stays `flex-1` with no `min-h-0`/`overflow-hidden` of its own, so if content ever exceeds available height it just grows to content height and `main`'s `overflow-y-auto` scrolls from the top as normal — `justify-center` becomes a no-op rather than clipping anything. Don't add `min-h-0`/`overflow-hidden` to this div without re-verifying that fallback still holds.

**Artist Hero width cap** (`app/components/artist/ArtistHero.tsx`): the hero's outer div adds `max-w-[1760px] mx-auto`, matching `ArtistContent.tsx`'s existing content-column cap. Below that width (every laptop, tablet, and phone), zero behavior change. Above it (ultra-wide monitors), the hero stops growing — this bounds how extreme `object-cover`'s crop can get (a wider/shorter box forces a more aggressive zoom to fill it) and keeps the hero visually aligned with the narrower content column beneath it, instead of stretching edge-to-edge past it.

---

## Responsive Layout — Quick Picks & Festival Story

**Background containment on the Quick Picks page** (`app/quick-picks/page.tsx`): the decorative grain/gradient/blob layer is `fixed inset-0`, not `absolute inset-0` — it stays pinned to the viewport rather than scrolling with page content, matching the pattern `DecisionScreen.tsx`'s own radial glow already uses (`fixed inset-0`). The page's `<main>` also carries `min-h-0` alongside `flex-1 overflow-y-auto`, the standard fix for a flex item's `overflow-y-auto` being ignored in favor of the item simply growing past its allotted space (compare `planner/page.tsx`'s `min-h-0` for the same pattern). Both matter together: without `fixed`, the backdrop scrolls out of view and exposes the ancestor `bg-[#110D24]` flat color underneath once a screen's content exceeds one viewport height; without `min-h-0`, scrolling isn't reliably contained to `<main>` in the first place.

**StartScreen has no "Festival" selection step.** Since MVP is single-festival scoped (see CLAUDE.md's "Current MVP Scope"), a prior "Step 1: Festival" card rendering festival branding had no `onClick` — it was inert, and visually indistinguishable in weight from the two real interactive steps beside it. It's now a plain text line ("Lollapalooza 2026 · dates · venue") under the subtitle in `StartScreen.tsx`, and the two remaining real steps (Days Attending, Grouping) are numbered Step 1/Step 2 in `StartOptions.tsx`.

**StartScreen's hero `Zap` icon is absolutely positioned to the left of the "Quick Picks" `<h1>`**, not inline in the flex row with it, so the headline text alone — not the icon+headline pair — determines the centered box; this is what keeps the title visually centered against the subtitle beneath it. The icon and headline both drop a size below the `sm:` breakpoint (`w-8 h-8`/`text-5xl` vs `w-10 h-10`/`text-6xl`): at full size on a narrow phone the headline alone is already close to viewport-width, leaving no room for the icon to render without going off-screen to the left.

**Several StartScreen, QuickPicksCompleteScreen, and DayCompleteScreen spacing values are mobile-only reductions**, expressed as a bare class plus an `sm:` override restoring the original value (e.g. `py-6 sm:py-8`), so laptop/widescreen spacing is untouched. These exist to make better use of constrained mobile height, not to chase eliminating scroll entirely on the setup screen — real device viewport height varies with browser chrome state (address bar shown/hidden) by 50–80px or more, which no fixed spacing budget can reliably close. A small residual scroll on some phones is expected and acceptable there, not a defect to keep pursuing.

**The completion screens' headline-to-subtitle gap is `gap-3`, not `gap-2`.** Both `QuickPicksCompleteScreen.tsx` and `DayCompleteScreen.tsx` render their headline with `leading-none`, so a descender-heavy last word ("caught up!", "complete!") visually eats into a tighter gap even though the numeric spacing is otherwise identical to other stacked-text patterns in the app — `gap-3` was chosen specifically to compensate for that, not as a general spacing preference.

**`QuickPicksCompleteScreen.tsx`'s Festival Story/Schedule card grid is `grid-cols-1 sm:grid-cols-2`, not a flat two-column grid.** On mobile, two columns inside the screen's `max-w-xl` shell leave roughly 155px per card — too narrow for the locked Festival Story explanation (day-scoped copy, see "Attendance-day awareness is similarly narrow today" above) to avoid wrapping five or six lines. Any copy added to either card in the future should be checked against this same narrow-column constraint before reverting to a fixed two-column layout.

**Festival Story's source images (`public/festivals/story/*.jpg`) are hand-optimized for web delivery** — resized to roughly 2000px on the long edge and recompressed (JPEG quality ~82), not left at original camera resolution (some source photos were 3000–5400px wide and up to ~9MB). A new Festival Story image added later should go through the same resize/compress step before landing in this directory, or it will reintroduce a visible load-in delay on whichever card shows it first, which matters most for the intro card since it's the first thing the Story shows.

**`FestivalStoryCard.tsx`'s bottom text panel has `overflow-y-auto` and `maxHeight: "85dvh"` as a fallback**, normally invisible since the panel's natural content height fits comfortably in the common case. It only engages at unusually short viewport heights (a rotated/landscape phone, or a very short desktop window), letting the panel scroll internally rather than letting the dialog's `overflow-hidden` silently clip the top of the text (eyebrow label / start of the headline) with no way to reach it.

---

## HydrationGate Resilience to Rehydration Errors

`HydrationGate.tsx` holds the first render (`return null`) until `decisionStore`, `scheduleStore`, `plannerViewStore`, and `attendanceStore` all report `hasHydrated: true` — every persisted store gets the same treatment; `chromeStore`, `exploreFilterStore`, and `helpStore` are deliberately excluded from this list since none of them persist to `localStorage` in the first place (pure in-memory UI state has no hydration gap to gate on). Each store's `onRehydrateStorage` callback sets `hasHydrated = true` on both the success path (truthy `state`, the common case) and the error path (corrupt JSON in the persisted key, or a `migrate()` that throws) — zustand's persist middleware calls the callback with `state = undefined` on error, so there's nothing to mutate directly.

Getting the error branch to actually take effect required working around three separate, layered hazards in this exact stack (zustand `persist` + synchronous `localStorage` + Next.js/Turbopack, in both dev mode and `next build`'s server-side static generation) — all three confirmed by hand against real corrupted-storage reloads and real builds, not deduced from reading the library alone:

1. **Referencing the store's own exported `const` from inside `onRehydrateStorage` throws a TDZ `ReferenceError`.** `onRehydrateStorage`'s callback can fire _before_ `create()` finishes returning, so `useDecisionStore` (etc.) isn't assigned yet at that point. Fixed by never referencing the const at all: each store instead assigns a module-level `markHydratedOnError` variable _inside its own creator function_ (`(set) => { markHydratedOnError = () => set({ hasHydrated: true }); return {...}; }`) — the creator's `set` parameter is passed in directly, not read from the outer closure, so it has no such hazard.

2. **Even with a valid, non-TDZ'd reference to `set`, calling it _synchronously_ inside the error branch silently does nothing.** Root cause, traced into `zustand`'s own source: `persistImpl` (`node_modules/zustand/esm/middleware.mjs`) calls `hydrate()` synchronously — for `localStorage` (not an async storage), the entire rehydration chain, including our error callback, resolves within that same synchronous call, which is itself running _inside_ `zustand/vanilla.mjs`'s `createStoreImpl`, before its internal `state` variable has been assigned (`state = createState(...)` only completes _after_ this whole chain returns). Any `set()` call made during that window mutates a `state` reference that then gets **completely discarded**: on the error path, `persistImpl` always returns `stateFromStorage || configResult`, and `stateFromStorage` is only ever assigned on the _success_ path — so on error it's always `configResult`, the plain pre-hydration default, overwriting whatever the interim `set()` call did. No exception is thrown anywhere in this sequence, which is what made it hard to pin down: the call appears to succeed and simply has no lasting effect. Fixed by deferring the call by one tick — `setTimeout(() => markHydratedOnError?.(), 0)` — so it runs after the store has finished constructing rather than during it.

3. **The deferred call from fix #2 then surfaced a third, unrelated failure — but only during `next build`, not dev mode.** Node 22+'s own experimental global `localStorage` (unrelated to a browser's) is present in Next.js's server-side static-generation environment — functional enough that `createJSONStorage` doesn't treat it as absent, but not backed by a real file, so every call throws. That gets misread as a genuine rehydration error during the server-rendered pass of every page, and the now-deferred `set()` call from fix #2 fires into it moments later, throwing a `TypeError` (non-fatal to the overall build, but a real uncaught exception logged to the build output). Fixed with a `typeof document !== "undefined"` guard around the deferred call — real browsers always have `document`; this Node environment never does.

Verified with three independent cold-start test runs (`rm -rf .next` + fresh dev server each time, via Playwright) with fixes #1 and #2 in place, all three passing; the same setup reliably failed (blank screen, zero console output) without them. Fix #3 was caught by actually reading full `next build` output rather than just checking for a nonzero exit code — the build "succeeded" either way. A rehydration error resets that one store to its default in-memory state and still unblocks the gate, rather than leaving the app blank indefinitely.

---
