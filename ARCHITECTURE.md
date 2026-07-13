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

- `viewingCarousel` state tracks which carousel is being viewed (null = main Explore, string = carousel ID)
- `handleSeeAll()` clears filters/search, sets carousel ID, and scrolls main element to top
- `handleBackToExplore()` clears filters/search and sets `viewingCarousel` to null, returning to clean Explore state
- Carousel data is keyed in `carouselMap` for use by both carousel rows (State 1) and full view (State 5)

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

---

## Interest State

User decisions (Must See, Interested, Passed) are centralized in a Zustand store with localStorage persistence. This serves as the single source of truth across Explore, Artist Detail, Quick Picks, and future features. Decisions also track their source and timestamp for potential use by features like Festival Artifact.

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
- **Decision metadata:** Source and timestamp are captured at write-time. No features consume these yet, but Festival Artifact (planned near-term) may reference decision provenance (e.g., "most of your Must Sees came from Quick Picks"). Capturing now avoids data loss—this information cannot be reconstructed after the fact.
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
- `heartVisible` — animation/display detail and visual sync state. The heart icon's fill/color is driven by heartVisible, not by verdict directly, so its *initial value* on mount must be derived from the store (`heartVisible = verdict === "interested" || verdict === "mustSee"`). Only the *ongoing* cascade-delay behavior (the 100ms timeout when Must See is tapped from neutral) is truly local and session-only. Without this initialization, "Interested" silently fails to visually sync across pages while "Must See" (which reads directly from the store) works fine.

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

## Future Consideration: Festival-Agnostic Bookmarking

The current model (mustSee, interested, passed) is intentionally festival-scoped — all three verdicts describe a user's relationship to an artist within the context of one specific festival's lineup and schedule. This is correct for the current single-festival MVP and should not change.

If multi-festival support is added later, there may be value in a fourth, separate concept: a festival-agnostic "I like this artist in general" signal (working name: bookmarked or following) — independent of any specific festival's decision-making. For example, a user might want to note "I like this artist" even when browsing a festival where that artist isn't currently playing, or carry that signal forward across multiple festivals over time.

This should be introduced as an entirely NEW, additional field — never by redefining or repurposing "interested." Reasoning: "interested" already has an established, understood meaning in the current UI (a festival-specific decision), and users' existing localStorage data already reflects that meaning. Silently changing what "interested" means later would break the implicit contract with existing data and confuse users who already understand the current model.

If/when this is built, it needs its own distinct visual treatment — not another star or heart — since it represents a categorically different kind of fact (general taste, not a festival-specific decision), similar to how "Scheduled" was deliberately given a different visual treatment than "Must See"/"Interested" earlier in this project, since it's also a different kind of fact (a plan commitment, not an interest level).

**Do not implement this now.** This section exists so the option is preserved and clearly scoped for future consideration, not lost or forgotten.
