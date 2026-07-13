# FestFuse Architecture

System design decisions and data structure rationale for FestFuse.

---

## Artist Data Structure

### Storage

Artist records live in `app/data/artists/`, organized by festival day for easier editing:
- `thursday.ts`, `friday.ts`, `saturday.ts`, `sunday.ts` — storage only
- `index.ts` — combines all four and exports `allArtists` and `artistsBySlug`

**Rule: Always import from `index.ts`, never from individual day files.**

The day files are an editing convenience, not a data boundary. Any feature that needs to filter by day must import `allArtists` from `index.ts` and filter by `artist.appearance.day === "Friday"`. This prevents silent bugs when artists are miscategorized or moved between days.

### Types

Located in `app/types/artist.ts`, using normalized categories from `app/data/categories.ts`:

```typescript
location: { city: string; state?: USState; country: Country }
genres: Genre[]
whatToExpect: WhatToExpectTag[]
bestFor: BestForTag[]
```

All categories are typed constants with `as const` for perfect type sync.

---

## Categories Design

### Why Normalized Categories?

Raw artist data contained overlapping, redundant, and inconsistent values:
- **whatToExpect:** 448 unique raw phrases → 36 canonical
- **bestFor:** 285 unique raw phrases → 15 canonical
- **genres:** 124 distinct values, grouped into 11 parent categories for reference

Normalization ensures:
- Type safety (TypeScript derivation from constants)
- Single source of truth (`app/data/categories.ts`)
- Consistent filtering and search behavior
- Editorial control over language and meaning

### Genre Parent Categories (11 total)

For organizational reference—filters and search use the full 124-genre list:

- **Rock/Alternative:** 90s Alternative, Alternative Rock, Art Rock, Grunge, Indie Rock, Post-Punk, Shoegaze, etc.
- **Pop:** Alt-Pop, Art Pop, Dance Pop, Electropop, Hyperpop, Synth-Pop, etc.
- **Folk/Americana/Country:** Americana, Country, Indie Folk, Singer-Songwriter, etc.
- **Hip-Hop/Rap:** Boom Bap, Hip-Hop, Plugg, Trap, Underground Rap, etc.
- **R&B/Soul:** Alternative R&B, Funk, Neo-Soul, R&B, Soul, etc.
- **Indie/Bedroom/Shoegaze:** Bedroom Pop, Dream Pop, Indie Pop, Lo-Fi Indie, Slowcore, etc.
- **Electronic/Dance:** House, Techno, Drum and Bass, Dubstep, Future Bass, Industrial Techno, etc.
- **K-Pop/J-Pop/P-Pop:** J-Pop, K-Pop, P-Pop
- **Punk/Hardcore/Metal:** Alternative Metal, Emo, Hardcore Punk, Metalcore, Punk Rock, etc.
- **Classical/Orchestral:** Classical, Symphonic Rock, etc.
- **Global Pop:** Afroswing, Tropicalia, etc.

---

## What to Expect — Design Rationale

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

Festival-specific data lives in `app/data/festivals.ts`:

```typescript
export const ACTIVE_FESTIVAL_ID = "lollapalooza-2026";

export const FESTIVAL_STAGES: Record<string, readonly string[]> = {
  "lollapalooza-2026": [
    "Airbnb", "Allianz", "BMI", "Bud Light", "Perry's", "T-Mobile", "Tito's"
  ]
};
```

**Future expansion:** When adding a new festival, create a new entry in `FESTIVAL_STAGES` keyed by festival ID. This avoids hardcoding and enables eventual multi-festival support without major refactoring.

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
8. Best For
9. What to Expect

**Minimum query length:**
- Artist name: no minimum (allows "V" to match "V" or "Vince Staples")
- All other fields: 2-character minimum (prevents overly broad single-character matches)

**Matching:** Case-insensitive substring only, no fuzzy/typo tolerance.

---

## Component Architecture

### Explore Page State

The Explore page manages four distinct states:

1. **No filters + no search** → Show curated carousels (Festival Favorites, Hidden Gems, International Picks, Chicago's Own, Cinematic Visuals)
2. **Filters only** → Show ActiveFilters bar + ArtistResultsGrid
3. **Search only** → Show search heading + ArtistResultsGrid
4. **Search + filters** → Show ActiveFilters bar + ArtistResultsGrid

### Dropdown Components

- **MultiSelectDropdown:** Reusable for Genre and Stage (checkboxes, multiple selection)
- **SingleSelectDropdown:** Reusable for Day (highlighted rows, single selection)

Both handle open/close state via parent, enabling clean separation of concerns.

---

## Carousel Duplicate Suppression

Carousel rows are classified by whether they answer objective (factual) or subjective (curatorial) questions.

### Row Classification

**Factual/Criteria-Based Rows** (answer checkable, objective questions):
- Festival Favorites — "Is this artist a headliner/sub-headliner?" (objective fact)
- International Picks — "Is this artist from outside the US?" (objective fact)
- Chicago's Own — "Is this artist from Chicago?" (objective fact)
- Cinematic Visuals — "Does this artist have this tag?" (objective fact)
- Future rows: Larger Than Life, etc.

**Curatorial/Discovery Rows** (answer subjective "is this worth surfacing" questions):
- Hidden Gems — "Is this artist overlooked/underrated?" (editorial judgment)

### Suppression Rules

**Rule A: Factual rows never suppress against each other or Festival Favorites.**

An artist can legitimately be:
- A headliner *and* international *and* have Cinematic Visuals simultaneously
- From Chicago *and* a sub-headliner *and* have great lyrics

All three facts are simultaneously true. Hiding an artist from one row because they appear in another would make each row factually incomplete or misleading.

**Rule B: Hidden Gems suppresses only against Festival Favorites.**

Hidden Gems' premise is "overlooked," which is contradicted if a headliner appears in it. This is the *only* suppression relationship in the current system.

**Rule C: If you had two curatorial rows, they'd suppress against each other** (currently hypothetical).

If you added a second curatorial row (e.g., "Artists Worth Seeing Early"), you'd want the same editorially-chosen artist to not appear twice under different curatorial framings.

Right now Rule C doesn't apply to anything — Cinematic Visuals is factual (Rule A), not curatorial, so there's no second curatorial row to protect.

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

**Why this pattern:** All other rows (International Picks, Chicago's Own, Cinematic Visuals, Hidden Gems) don't care about billing prominence — they're answering a different question ("Is this artist from outside the US?" not "Is this artist famous?"). File-order bias is a hazard: if the data file happens to list headliners first, every row would inherit that prominence bias without editing work. Shuffling within days breaks that bias. Round-robin interleaving distributes artists across visible viewport positions evenly (first visible artist comes from each day in order) rather than front-loading any single day.

**Example:**
- Input: Thu=[A, B], Fri=[C, D], Sat=[E], Sun=[F]
- After shuffle within days: Thu=[B, A], Fri=[D, C], Sat=[E], Sun=[F]
- Interleaved (one from each day): [B, D, E, F, A, C]
- Result: Mix of days visible at all scroll positions, no day/artist clustering

**Data Consistency Note:**
Both functions call `sortByDay()` defensively at the start. This prevents silent bugs if artist data ever gets shuffled or if upstream filters reorder artists unexpectedly. The sort is cheap and provides defensive consistency.

### Implementation Pattern

The following is a **simplified illustration** of how each carousel is computed in `app/explore/page.tsx`. See that file for the actual implementation, including memoization, dependency arrays, and ESLint overrides. The patterns here show the filter + presentation logic only:

```typescript
// Festival Favorites: factual, no upstream suppression
// Pipeline: filter to headliners/sub-headliners → sort by day → sort within each day by billing tier
// → shuffle day-block order → concatenate (see shuffleDayBlocks in app/lib/carousel.ts)
// Result: each day's billing tier order is explicit & consistent, but day sequence varies per load
const festivalFavorites = shuffleDayBlocks(
  allArtists.filter((a) => a.appearance.billingTier === "Headliner" || a.appearance.billingTier === "Sub-headliner")
);

// Hidden Gems: curatorial, suppress only against Festival Favorites (Rule B)
// Pipeline: filter by genre → exclude headliners/sub-headliners → exclude artists already in Festival Favorites
// → sort by day → shuffle within days → interleave across days (see interleaveByDayShuffled)
const shownInFestival = new Set(festivalFavorites.map((a) => a.slug));
const hiddenGems = interleaveByDayShuffled(
  allArtists.filter((a) =>
    a.genres.some(g => ["Bedroom Pop", "Indie Pop", "Alternative R&B", "Art Pop", "Shoegaze"].includes(g)) &&
    a.appearance.billingTier !== "Headliner" &&
    a.appearance.billingTier !== "Sub-headliner" &&
    !shownInFestival.has(a.slug) // Rule B suppression: don't show already-featured artists
  )
);

// International Picks: factual, no suppression (Rule A)
// Pipeline: filter to non-US → sort by day → shuffle within days → interleave
// Result: represents all qualifying artists, shuffled presentation breaks file-order bias
const internationalPicks = interleaveByDayShuffled(
  allArtists.filter((a) => a.location.country !== "United States")
);

// Chicago's Own: factual, no suppression (Rule A)
// Pipeline: filter to Chicago/Illinois → sort by day → shuffle within days → interleave
// Result: represents all qualifying artists, shuffled presentation breaks file-order bias
const chicagosOwn = interleaveByDayShuffled(
  allArtists.filter((a) =>
    a.location.city === "Chicago" || a.location.state === "Illinois"
  )
);

// Cinematic Visuals: factual, no suppression (Rule A)
// Pipeline: filter by tag → sort by day → shuffle within days → interleave
// Result: represents all qualifying artists, shuffled presentation breaks file-order bias
const cinematicVisuals = interleaveByDayShuffled(
  allArtists.filter((a) => a.whatToExpect.includes("Cinematic Visuals"))
);
```
