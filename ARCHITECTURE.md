# FestFuse Architecture

System design decisions and data structure rationale for FestFuse.

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
  "lollapalooza-2026": ["Airbnb", "Allianz", "BMI", "Bud Light", "Perry's", "T-Mobile", "Tito's"],
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

- A headliner _and_ international _and_ have Cinematic Visuals simultaneously
- From Chicago _and_ a sub-headliner _and_ have great lyrics

All three facts are simultaneously true. Hiding an artist from one row because they appear in another would make each row factually incomplete or misleading.

**Rule B: Hidden Gems suppresses only against Festival Favorites.**

Hidden Gems' premise is "overlooked," which is contradicted if a headliner appears in it. This is the _only_ suppression relationship in the current system.

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

---

## Carousel "See All" Full View

Clicking "See all" on any carousel row enters a full-page grid view of that row's artists. The design follows these principles:

### Design Specs

1. **Full grid view, not modal** — "See all" navigates to a full page view, not an overlay. The carousel row's artists display in a standard ArtistResultsGrid.

2. **Stable sort order** — Display order is deterministic and differs from the carousel's shuffled presentation:
   - **Festival Favorites:** day → billing tier → appearance time → artist name
   - **All other rows:** day → appearance time → artist name

   This provides consistent reference ordering for browsing, distinct from the carousel's curatorial shuffle.

3. **Header with row name + count + back button** — Shows "Hidden Gems · 24 artists" plus a clear "Back to Explore" button. Heading is visible at top of page on entry.

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

// Hidden Gems: curatorial, suppress only against Festival Favorites (Rule B)
// Pipeline: filter by genre → exclude headliners/sub-headliners → exclude artists already in Festival Favorites
// → sort by day → shuffle within days → interleave across days (see interleaveByDayShuffled)
const shownInFestival = new Set(festivalFavorites.map((a) => a.slug));
const hiddenGems = interleaveByDayShuffled(
  allArtists.filter((a) => {
    const tier = getPrimaryBillingTier(a, ACTIVE_FESTIVAL_ID);
    return (
      a.genres.some((g) =>
        ["Bedroom Pop", "Indie Pop", "Alternative R&B", "Art Pop", "Shoegaze"].includes(g)
      ) &&
      tier !== "Headliner" &&
      tier !== "Sub-headliner" &&
      !shownInFestival.has(a.slug) // Rule B suppression: don't show already-featured artists
    );
  })
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
  allArtists.filter((a) => a.location.city === "Chicago" || a.location.state === "Illinois")
);

// Cinematic Visuals: factual, no suppression (Rule A)
// Pipeline: filter by tag → sort by day → shuffle within days → interleave
// Result: represents all qualifying artists, shuffled presentation breaks file-order bias
const cinematicVisuals = interleaveByDayShuffled(
  allArtists.filter((a) => a.whatToExpect.includes("Cinematic Visuals"))
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
     *application of filter values*, so which value was "current" depended on timing
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
   - `viewingCarousel` is deliberately *not* reset from an effect keyed on `activeNavItem`.
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
   stale filters first. A full page *refresh* (as opposed to back/forward) reliably resets
   the in-memory Explore state to empty.

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
- Artist data stores times as `"H:MM AM/PM"` (e.g. `"12:00 PM"`), not 24-hour `"HH:MM"`. `timeStringToMinutes()` (`app/lib/schedule.ts`) parses this format explicitly and is the single shared helper — `sort.ts`'s chronological sorts and the Planner grid's block positioning both import it rather than re-parsing times themselves.
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
  - **Multi-appearance artists get a small always-visible "N sets" pill**, styled like
    the existing Headliner badge — not hover-only, since touch devices have no hover
    state. Purely informational: never both set times, never a second control.

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

1. **My Picks** — NEW
   - Calls `applyPreset("myPicks")`, then navigates to `/explore`
   - Shows count: "My Picks (X)" where X = count of Must See + count of Interested
   - Cyan color per CLAUDE.md ("Primary workflow actions")

2. **Must See** — Existing link (no change)
   - Calls `applyPreset("mustSee")` then navigates to `/explore`
   - Shows count

3. **Interested** — Existing link (no change)
   - Calls `applyPreset("interested")` then navigates to `/explore`
   - Shows count

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

**Confirmed** — Color application per CLAUDE.md semantics:

- **Scheduled artists:** Cyan background or accent border per CLAUDE.md ("Primary workflow actions")
- **Conflicting scheduled artists:** Red border/highlight per CLAUDE.md ("Schedule conflicts")
- **Unscheduled artists:** Neutral presentation (no accent)
- **Must See/Interested (if visible with "My Picks" toggle enabled):** Yellow per CLAUDE.md ("User Intent & Personalization")

All colors layered appropriately so conflicts (red) take visual priority over scheduling state (cyan).

#### Interactions

**Confirmed** — Two independent toggles at the top of the Planner grid:

**Toggle 1: "My Picks"** (cyan styling)

- Filters grid to display only artists with verdict === "mustSee" OR verdict === "interested"
- Independent of the "Scheduled" toggle
- When enabled, hides all other artists (Pass, Undecided) — except any that are part of a
  schedule conflict, which stay visible regardless of toggle state (see Combined behavior below)

**Toggle 2: "Scheduled"** (cyan styling)

- Filters grid to display only scheduled artists (`isScheduled(artist) === true`)
- Independent of the "My Picks" toggle
- When enabled, hides all unscheduled artists — the conflict exception above doesn't apply
  here since a conflicting artist is always scheduled by definition

**Combined behavior (AND logic):**

- Both toggles can be enabled simultaneously to show artists that are both in Must See/Interested AND scheduled
- When both enabled, displays the intersection of the two filters
- Conflict artists remain visible and highlighted (red border/accent) regardless of toggle state
- Toggle state persists within this page visit; resets on navigation away

**Artist cell interactions:**

- **Confirmed** — Clicking anywhere on a cell toggles that artist's scheduled status directly, in place — no navigation. This is the primary action for this screen, matching what the Planner is actually for.
  - Toggling scheduled state updates the grid cell appearance immediately
- **Confirmed** — A small secondary affordance within the cell (an icon or short link, not the whole cell) navigates to Artist Detail, for anyone who wants to see more before deciding.
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
├── Explore cards: show three-state Schedule toggle (none/partial/full) + "N sets" pill for multi-appearance artists, conflict highlight (if applicable)
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

`id` is authored per appearance (convention: `"<slug>-1"`, `"<slug>-2"`) rather than
derived from array position or from the day/time fields, so correcting an
appearance's schedule details later never invalidates anything keyed on it. The
non-empty tuple reflects that every lineup artist has at least one appearance.

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
  Planner. Multi-appearance artists additionally get a small always-visible disclosure
  (styled like the existing Headliner badge, not a hover tooltip — touch devices have
  no hover state), purely informational, never both set times, never a second
  control — but the copy differs by surface:
  - `ArtistCard` (Explore): a standalone pill, just **"N sets"**.
  - `ArtistActions` (Artist Detail): the button's own visible text communicates state
    *and* count together — **"Add to Schedule · 2 sets"** (none), **"Complete
    Schedule · 2 sets"** (partial), **"Scheduled · 2 sets"** (full).
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
- **"N sets" disclosure** — for a multi-appearance artist, the pill appears on
  `ArtistCard` ("N sets") and the equivalent state+count text appears on
  `ArtistActions` ("Add to Schedule · N sets" / "Complete Schedule · N sets" /
  "Scheduled · N sets"), on both surfaces, without ever displaying both appearance
  times or adding an individual per-appearance control outside the Planner.
- **Quick Picks** — exactly one card per artist, built from its primary appearance.
- **Single-appearance regression** — every existing single-appearance artist is
  pixel/behavior-identical everywhere, before and after this change.

---

## Future Consideration: Festival-Agnostic Bookmarking

The current model (mustSee, interested, passed) is intentionally festival-scoped — all three verdicts describe a user's relationship to an artist within the context of one specific festival's lineup and schedule. This is correct for the current single-festival MVP and should not change.

If multi-festival support is added later, there may be value in a fourth, separate concept: a festival-agnostic "I like this artist in general" signal (working name: bookmarked or following) — independent of any specific festival's decision-making. For example, a user might want to note "I like this artist" even when browsing a festival where that artist isn't currently playing, or carry that signal forward across multiple festivals over time.

This should be introduced as an entirely NEW, additional field — never by redefining or repurposing "interested." Reasoning: "interested" already has an established, understood meaning in the current UI (a festival-specific decision), and users' existing localStorage data already reflects that meaning. Silently changing what "interested" means later would break the implicit contract with existing data and confuse users who already understand the current model.

If/when this is built, it needs its own distinct visual treatment — not another star or heart — since it represents a categorically different kind of fact (general taste, not a festival-specific decision), similar to how "Scheduled" was deliberately given a different visual treatment than "Must See"/"Interested" earlier in this project, since it's also a different kind of fact (a plan commitment, not an interest level).

**Do not implement this now.** This section exists so the option is preserved and clearly scoped for future consideration, not lost or forgotten.

---

## Future Consideration: Visible "Passed" Indicator

Currently, "Passed" has no visual representation anywhere in the UI outside the Status filter — cards don't show any distinction between an artist that's been passed on versus one that's fully undecided. This is a deliberate asymmetry, not an oversight: Must See and Interested get persistent icons because they represent a positive, actively-curated list the user wants reinforced everywhere they browse. Passed was never designed to carry that same visual weight — it's a lower-salience state, consistent with the decision not to give it a dedicated sidebar entry.

If this becomes worth revisiting later, two options were considered and explicitly deferred:

1. **A dedicated fourth icon/button on cards** (parallel to star/heart) — rejected for now due to real added complexity: a new interactive control, a new visual language, and risk of reintroducing the "too many discrete signals" clutter that was deliberately avoided when the Must See/Interested button design was simplified.
2. **A lightweight, read-only visual treatment** (e.g., reduced card opacity, or a small "Passed" text label) for artists with verdict "passed" — lower complexity than option 1 since it requires no new interactive control, just a passive display state.

Neither is being built for MVP. Passed remains reachable only via the Status filter's "Passed" option, which is considered sufficient for the state's intended low visibility. Revisit only if real usage shows people want to casually distinguish "passed" from "undecided" while browsing, not just when deliberately reviewing via the filter.

---

## Future Consideration: Festival Story — Day of Week Signal

**Deferred signal:** Festival Story currently computes 11 candidate signals for its revelation sequence. A 12th candidate (Day of Week concentration: Thu/Fri vs. Sat/Sun skew) was deliberately omitted, pending a prerequisite Quick Picks feature.

**Why deferred:** The signal cannot be computed honestly without knowing whether a user's Thursday-heavy picks reflect genuine preference or simply that they only attended Thursday and skipped Friday/Saturday/Sunday. Currently, Quick Picks has no "I'm only attending these days" input — it presents the entire lineup to every user regardless of attendance.

**Prerequisites to implement this signal:**

1. **Quick Picks feature:** Add day-selection UI to Quick Picks intro (e.g., "Which days are you attending?") so users can explicitly mark days they're skipping
2. **Filter upstream:** Filter the Quick Picks queue to only artists performing on selected days
3. **Store attendance plan:** Persist which days the user selected to localStorage (alongside decision data) for reference by Festival Story and future Schedule feature
4. **Then compute signal:** Compare user's day-of-week distribution (of their attended days) against the lineup's distribution (of those same days only)

Once Quick Picks gains day selection, this signal can be reintroduced without ambiguity.

---

## Future Consideration: Onboarding / How It Works Explainer

Throughout development, the idea of a lightweight explainer has come up multiple times — something that briefly walks a new user through how the app's core concepts connect: the difference between Must See / Interested / Passed, what Quick Picks does, and what the Festival Story/Snapshot reveal is and how you get there. Right now, this understanding is only conveyed implicitly, scattered across UI copy on individual screens (button labels, the Quick Picks intro screen, etc.) — there's no single place a new user could go to understand the whole system at a glance.

**Not built because:**

1. Schedule remains a higher-priority unbuilt feature
2. It's not yet clear whether this should be a full page, a first-visit modal, or something else entirely

**If revisited:** Keep it short — not full documentation, just enough to connect the dots between the app's core concepts (interest states, Quick Picks, Explore, Festival Story). A first-visit modal is probably lower-effort than a dedicated page and may be sufficient.

---

## Future Consideration: Usage Analytics

There is currently no usage tracking of any kind (no backend, no analytics pipeline). This means decisions like "should Festival Story be reachable before full Quick Picks completion" currently cannot be informed by real user behavior (e.g., drop-off rates) — only by product reasoning.

**If this becomes worth knowing:** A lightweight approximation is possible without a real backend: logging simple events (e.g., "started Quick Picks," "reached Festival Complete") to the same localStorage-backed store already used for decisions. This would not require a backend or third-party analytics service, just an additional small piece of local state.

**Not built now** — noted here so the option isn't forgotten if the question resurfaces later.
