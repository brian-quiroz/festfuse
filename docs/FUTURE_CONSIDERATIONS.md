# Future Considerations

Deferred polish items, open questions, and dismissed proposals for FestFuse, kept out
of [ARCHITECTURE.md](../ARCHITECTURE.md) so that document stays focused on the system
as it currently exists. Nothing here is scheduled — these are candidates, not commitments.

---

## Future Consideration: Date/Day Normalization

`FestivalAppearance.day` (a weekday label, e.g. `"Thursday"`) and `.date` (e.g.
`"Jul 30"`) currently duplicate calendar information authored independently — nothing
enforces that they agree, so they can theoretically diverge (e.g. a data edit updates
`date` but not `day`, or vice versa). Conflict detection groups by `` `${festivalId}::${date}` ``
specifically to avoid the weekday-label ambiguity (see "Multi-Appearance Support →
Conflict Detection"), but that only works if `date` itself is trustworthy.

When festival data moves to a real database, store `date` as an ISO calendar date
(`YYYY-MM-DD`) and derive the weekday label from it (using the festival's timezone)
rather than authoring both independently. Until then, both fields must be kept
consistent by hand whenever appearance data is added or edited.

**Update (2026-08-25):** Resolved for the API-sourced path. Planner's
`getAppearanceEntriesFromApi` (`app/lib/schedule.ts`) now derives both `day` and `date`
from the API's `festival_date` alone (`formatApiDayAndDate` in
`app/lib/api/mapRunAppearance.ts`), rather than authoring them independently.

**Update (2026-08-26):** Fully resolved. `getAllAppearanceEntries`, the
TypeScript-sourced fallback that still hand-authored both fields independently, was
deleted along with its sole caller when `app/data/artists` was retired as a frontend
runtime dependency (`docs/roadmap/backend-rollout.md` step 7 item 7). No hand-authored
path remains.

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

## Future Consideration: Onboarding / How It Works Explainer

**Resolved** — built as the Home page's "How FestFuse works" modal. See "Home Page &
Onboarding" above for the actual implementation and rationale.

---

## Future Consideration: Usage Analytics

There is currently no usage tracking of any kind (no backend, no analytics pipeline). This means decisions like "should Festival Story be reachable before full Quick Picks completion" currently cannot be informed by real user behavior (e.g., drop-off rates) — only by product reasoning.

**If this becomes worth knowing:** A lightweight approximation is possible without a real backend: logging simple events (e.g., "started Quick Picks," "reached Festival Complete") to the same localStorage-backed store already used for decisions. This would not require a backend or third-party analytics service, just an additional small piece of local state.

**Not built now** — noted here so the option isn't forgotten if the question resurfaces later.

---

## Future Consideration: Session Resilience to Data Changes Mid-Session

Quick Picks' decisioning screen resolves `currentAppearance` (`app/quick-picks/page.tsx`) by looking up the current queue item's `appearanceId` against `allArtists` via `getAppearanceById`. That lookup assumes `allArtists` — static, module-level data, imported once — never changes shape during an active session. If `currentQueueItem`/`currentArtist` resolve but `currentAppearance` doesn't, the `step === "decisioning"` render branch's guard (`currentArtist && currentAppearance && progress`) simply doesn't render anything: no fallback UI, no path back to Start.

**Not a live defect today.** Reaching this state requires the artist dataset to change out from under an already-open tab mid-session. `allArtists` never mutates at runtime, and Quick Picks session state lives in local `useState`, never persisted — a page reload always resets to `step: "start"`. The only realistic trigger is a live redeploy landing while someone has Quick Picks open, a thin edge case for a single-festival, hand-authored MVP dataset.

**Same root cause applies to appearance ordering.** `pickPrimaryFromCandidates`'s tie-break (`app/lib/appearances.ts`) indexes into `getDaysForFestival(festivalId)`, which resolves to `[]` for an unconfigured `festivalId` rather than throwing — `Array.prototype.sort` is stable, so an all-`-1` tie-break degrades to a no-op, not a crash or randomized order. `attendanceDays` itself can't carry an unconfigured day string today regardless: `sanitizeAttendanceDays` filters against `FESTIVAL_DAYS[festivalId]` on both write (`setAttendanceDays`) and every read (`useAttendanceDays`), not just at save time. The residual risk is the same multi-festival scenario described above, not a distinct one.

**Revisit when:** artist data moves to the planned FastAPI/PostgreSQL backend and can genuinely change between session start and a later decision. At that point, add an explicit guard: if `currentQueueItem` exists but `currentAppearance` doesn't resolve, invalidate the session and return to Start with a short explanation, rather than leaving an unrendered dead end.

---

## Future Consideration: Seeded Quick Picks Queue Shuffle

The Quick Picks queue shuffle (`shuffleArray`, used by `interleaveByTierWithinDay` and `buildUngroupedQueue` in `app/lib/quick-picks-queue.ts`) uses plain `Math.random()`, producing a genuinely different artist order every time a session starts. This is intentional — it matches the "go with your gut," momentum-over-precision philosophy in AGENTS.md's Quick Picks section — and is a different tradeoff than `createSeededRandom` (`app/lib/random.ts`), which other features (Explore's carousels, Festival Story's sampling) use deliberately where _within-session_ stability matters.

**The tradeoff:** because the shuffle isn't seeded, a specific queue order can't be reproduced across reloads, which makes verifying a bug report about ordering harder than it would be with a seeded shuffle.

**Not seeding now** — reproducibility is a debugging convenience, not a product requirement, and seeding would trade away the intentional per-session freshness for a benefit that only helps internal QA.

**If this becomes a real debugging blocker:** consider a dev-only override (e.g. a query param or env flag that seeds `shuffleArray` via the existing `createSeededRandom`) rather than changing default production behavior.

---

## Future Consideration: Locked Story Recovery Assumes a Non-Trivial Attendance Scope

The locked Festival Story card's recovery path ("Take a Second Look") always routes to Explore filtered to Passed artists (`onExploreArtists` in `app/quick-picks/page.tsx`, `showPassedArtists()` in `app/store/exploreFilterStore.ts`). This assumes at least one Passed artist exists in scope to reconsider.

**Why this holds today:** `QuickPicksCompleteScreen` only renders once every eligible artist on the selected attendance day(s) has a decision — either the session's queue was fully exhausted, or it was empty because everything was already decided beforehand. Every decision is exactly one of three verdicts (Must See / Interested / Passed), so for the selected-day scope, `total = positive + passed`. Being locked means `positive < MIN_POSITIVE_PICKS_FOR_STORY` (5), which forces `passed > total - 5`. The smallest single festival day in the current dataset has 42 artists, so being locked guarantees more than 37 Passed artists exist to reconsider. The "zero Passed artists" dead-end this recovery path implicitly assumes away is mathematically unreachable under the current dataset.

**Revisit when:** a future festival, or an attendance-day combination, has a total eligible lineup close to or below `MIN_POSITIVE_PICKS_FOR_STORY`. At that point, `onExploreArtists` should check whether any Passed artists actually exist in scope before routing there, and fall back to a broader recoverable set (e.g. My Picks or unfiltered Explore) with matching copy, rather than assuming Passed is always non-empty.

---

## Future Consideration: Light Mode

`app/globals.css` sets `color-scheme: dark` on `:root` unconditionally, and the new `.themed-scrollbar` utility hardcodes white-based `rgba()` values for its thumb/track — both assume a permanently dark app. This is correct for the current dark-only design (`.claude/rules/design-principles.md`: "Deep violet (#110D24) and surrounding dark neutrals form the visual foundation"), but neither will automatically adapt if light mode is ever added.

**If light mode is built:** `color-scheme` needs to become conditional — driven by a theme class/attribute (e.g. `color-scheme: light` or `color-scheme: light dark` swapped based on the active theme) rather than a blanket root-level `dark`. `.themed-scrollbar`'s thumb/track colors would similarly need theme-aware values (e.g. dark-based `rgba()` values for a light theme, mirroring the current white-based ones) rather than a single hardcoded palette.

**Not built now** — noted here so it isn't rediscovered as a bug later; the app is dark-only today and there's no light mode work planned yet.

---

## Future Consideration: Planner Fade vs. Trackpad Elastic Overscroll (Desktop)

On macOS Chrome, trackpad momentum scrolling past the Planner grid's horizontal edge triggers the browser's native elastic "rubber-band" bounce. Because the edge fades (`app/components/planner/PlannerGrid.tsx`) are a separate absolutely-positioned overlay sitting on top of the scroll container — not part of the scrolling content itself — the content briefly slides past its edge during the bounce while the fade stays fixed, making the fade line appear to shift momentarily before springing back with the content. Reproduces on desktop Chrome; not observed on desktop Safari.

**Tried:** `overscroll-behavior-x: contain` on the scroll container — did not change the behavior. Expected, in hindsight: that property mainly prevents overscroll from _chaining_ to a scrollable ancestor; it doesn't suppress the local elastic bounce on the element itself, and there's no bouncing ancestor here for it to have chained to regardless.

**What a real fix would take:** rendering the fade as a `mask-image` on the scroll container itself (so it moves with the same box that bounces) rather than a fixed overlay. Not a simple swap — the grid has a sticky hour-label column and sticky stage headers, which a whole-container mask would also fade unless carefully excluded, and a mask's gradient is positioned relative to the full scrollable content, not the visible viewport, so keeping the fade anchored to the visible edges while scrolling would require continuously syncing the mask's position to scroll offset rather than a static CSS value.

**Not done now** — rare, cosmetic, native-feeling (most users won't read it as a bug), and the real fix is meaningfully more involved than it first appears. Revisit only if this turns out to bother people in regular use, not just as a one-off observation. Desktop keeps the fade as-is, including this known quirk.

### Mobile: fade removed and hour column un-stickied below `md:`, not patched

Touch-drag scrolling on the Planner grid produces a related but more disruptive desync — confirmed on both iPhone and Android, reliably reproducible (not an edge-case overscroll-boundary trigger like the desktop case above): mid-drag, the sticky hour-label column visually lags behind the actual scroll position, appearing to "detach" partway across the stage columns rather than staying pinned flush against the visible left edge, which in turn made the left edge fade read as floating in the wrong place.

**Tried and reverted:** (1) a `scrollend` listener alongside the existing `scroll` handler in `updateScrollFade`, meant to correct `canScrollLeft`/`canScrollRight` state that a missed final `scroll` event during momentum deceleration could leave stale — reverted because it has no confirmed bug to point to: it was reasoned about for the mobile fade specifically, which is now removed below `md:` (see below) and no longer reads this state at all, and it doesn't address the desktop overscroll issue above either (that's a different mechanism — bounce animation, not a missed event). (2) Forcing the sticky hour-label column onto its own composited layer (`will-change: transform` + `transform: translateZ(0)`) — reverted because it was tested against the real symptom (the column visibly lagging during touch drag) and did not fix it.

**Resolution:** rather than continue patching a symptom of an architecture that's fundamentally prone to this (see "What a real fix would take" above — a mask-image approach is the actual fix, and is a real rewrite), two things were done below `md:` only: the edge fades are hidden entirely (`hidden md:block` on both fade elements), and the hour-label column is no longer `position: sticky` at all (`static md:sticky md:left-0`) — it now scrolls away with the rest of the grid like any other column instead of attempting to stay pinned. The attempted pin was the actual source of the visible "detach mid-drag, then snap back" artifact; removing the attempt removes the artifact, rather than trying to make the pin track more smoothly. Desktop is unaffected by either change — it keeps both the fade and the sticky hour column exactly as before, including the known overscroll quirk above. The schedule remains scrollable exactly as before on mobile; it just loses the sticky hour labels and the edge-fade hint while scrolling. Revisit alongside the desktop fix above, if the mask-image approach is ever built — at that point it could plausibly restore both for mobile too.

---

## Future Consideration: Orientation-Aware Mobile Breakpoints

Mobile chrome (`Sidebar.tsx`'s drawer, `MobileTopBar.tsx`) and the Explore/Planner mobile layouts switch on `md:` — a width breakpoint only. A phone rotated to landscape can exceed that width threshold despite still being a phone with a short viewport. Confirmed on Android: landscape width crosses `md:`, so the app renders its full desktop layout — a fixed-width static sidebar consuming roughly a third of an already-short landscape viewport, none of the compacted mobile spacing. On iPhone, landscape width stays under `md:` (mobile drawer/layout persists), but the header and toolbar chrome, sized for portrait's taller viewport, leaves very little of the short landscape height for the actual page content (e.g. Planner's schedule grid).

**Not fixed now** — a proper fix needs an orientation/height-aware rule (e.g. a `max-height` media query driving a distinct short-viewport compact mode) layered on top of the existing width-only breakpoint. That's a change to the shared app shell (`Sidebar.tsx`/`MobileTopBar.tsx`/`layout.tsx`), not something scoped to any one page. **Revisit when:** landscape mobile usage is common enough to justify that shell-level work, or another page hits the same ceiling this acutely.

---

## Future Consideration: Planner Vertical Density on Mobile

The title/day-tabs/filter-trigger chrome above the grid, plus the app-wide `MobileTopBar`, take a real slice of a phone's limited viewport height, leaving the schedule grid less room than would be ideal for reviewing many overlapping time slots at once on a small screen.

**Done:** mobile (below `md:`) drops the "Build your festival schedule" subtitle entirely — `MobileTopBar` already establishes app identity and the day tabs + grid make the page's purpose obvious, so the subtitle was pure vertical cost with no orientation value it wasn't already getting elsewhere; the `h1` itself stays, shrunk, so a direct link or refresh into `/planner` still has some page-identity text before the grid renders. Alongside that: `MobileTopBar`'s own padding, the header block's padding, the day-tabs row's padding, and the grid's stage-header row height (`PlannerGrid.tsx`) were all trimmed a further few px each on mobile. None of this is Planner-specific in the `MobileTopBar` case — that component is shared by every page — but the trim is small enough (`py-3` → `py-2`) that it's a safe global change, not a Planner-only exception.

**Not addressed further now** — these were mechanical spacing/copy trims, not a redesign, and further compaction has diminishing returns (the day tabs are the primary navigation and can't shrink much more without hurting usability). A more meaningful improvement here is more likely a genuine mobile-specific schedule presentation than another round of spacing tweaks. **Revisit when:** there's a concrete design direction for that.

---

## Future Consideration: Automated Coverage for Quick Picks Queue Building

`app/lib/quick-picks-queue.ts` (`interleaveByTierWithinDay`, `buildUngroupedQueue`, `mergeUndercardAndRecognizable`) has real algorithmic complexity — cross-day round-robin balancing, ~2-undercard-to-1-recognizable pacing — and zero automated test coverage today. `verify-story-signals.ts` only exercises Festival Story signal computation, not queue construction.

**Why this isn't a simple addition:** `shuffleArray` uses real `Math.random()` (see "Future Consideration: Seeded Quick Picks Queue Shuffle" above), so tests can't assert exact output order the way the deterministic Story-signal checks do. Coverage here would need structural/property-based assertions instead — e.g. total count preserved, day balance within expected bounds, recognizable:undercard ratio near the intended ~1:2 across a large sample — closer to writing a new test file than adding a `check()` call to the existing one.

**Not built now** — larger, separate effort than the other verification gaps addressed alongside this note. Revisit as its own scoped task if queue-building bugs start surfacing in practice.

---

## Future Consideration: Frontend Automated Test Coverage

No automated test framework is installed for the Next.js frontend today — no
Jest/Vitest/Testing Library dependency, no frontend `test` script in `package.json`,
and no `*.test.ts`/`*.spec.ts` files. `verify-story-signals.ts` is a standalone manual
verification script (`npm run verify:story`), not part of an automated frontend
suite. The Python backend separately has pytest route tests and opt-in PostgreSQL
integration tests; see [`backend/tests/README.md`](../backend/tests/README.md).

`app/lib/spotify.ts`'s `parseSpotifyArtistId` is a good first candidate whenever a
frontend framework does get set up: a pure function with no React/DOM dependency and
clearly enumerable edge cases (malformed URL, non-`open.spotify.com` hostname,
missing artist-ID path segment, trailing query params) — straightforward input/output
assertions, unlike the queue-building coverage gap above, which needs property-based
tests because of real `Math.random()` use. Not built now — no frontend framework
exists yet; revisit alongside standing up frontend testing generally, post-MVP.

---

## Future Consideration: Reproducible Backend Bootstrap From a Clean Clone

The committed database tooling now has distinct responsibilities: Alembic migrations
recreate structure, `scripts.seed_festival` idempotently creates the foundational
festival hierarchy, and `scripts.import_artists` performs a guarded one-time import of
the validated TypeScript artist snapshot. Keeping the initial importer is valuable
even though it intentionally refuses a populated target: it records provenance,
supports rebuilding development/staging data, and makes the normalization process
auditable instead of relying on manual pgAdmin edits.

The pieces have been tested individually and the complete importer has run against a
real migrated PostgreSQL schema, but a new contributor cannot yet rely on one fully
documented and automatically verified clean-clone path. The root README documents only
frontend startup, no safe `.env.example` exists, and no test currently creates a brand-
new disposable database and proves the entire sequence from migration zero through the
final imported counts.

**Desired bootstrap order:** install frontend dependencies (the exporter requires
`tsx`), create the backend virtual environment and install `requirements-dev.txt`,
create/configure PostgreSQL, run `alembic upgrade head`, run
`python -m scripts.seed_festival`, validate with
`python -m scripts.import_artists --dry-run`, and finally run
`python -m scripts.import_artists --apply`.

**Completion criteria:**

- add a backend setup section with exact working-directory assumptions and commands;
- commit a credential-free `.env.example` containing every required setting;
- add an isolated clean-database smoke test that applies every migration, runs the
  festival seed and artist importer, and verifies canonical row totals/relationships;
- ensure cleanup cannot target or mutate a developer's normal database; and
- optionally add one convenience command that orchestrates the existing steps without
  duplicating migration, seed, or importer logic.

Do not describe the backend as fully reproducible from a clean clone until that smoke
test passes. The festival seed may remain idempotent, while the artist importer should
remain a guarded initial-snapshot operation; ordinary updates belong to APIs or a
purpose-built synchronization workflow rather than rerunning the bootstrap importer.

---

## Future Consideration: Footer Links

`app/components/Footer.tsx` currently renders two static text lines (attribution + disclaimer) with no links. About/Feedback/Privacy/data-attribution pages were considered as footer destinations, but explicitly deferred — none of those destinations exist yet, and building placeholder pages just to have somewhere for the footer to point would be scope creep ahead of the actual need.

**If built later:** each link should only be added once its destination page is worth writing (e.g. an About page explaining why the site exists, how it's built, accuracy/update cadence, and any affiliate/advertising disclosure — not just a stub). Revisit alongside whichever of those pages becomes the first one worth building.

**Not built now** — noted here so the idea isn't lost or rediscovered as "should the footer have links?" from scratch.

---

## Future Consideration: Festival Story Standalone Route

Festival Story is currently only reachable via Quick Picks completion (`app/quick-picks/page.tsx` conditionally mounts `FestivalStorySequence` once `QuickPicksCompleteScreen` unlocks it). There is no standalone route (e.g. `app/festival-story/page.tsx`) that lets a user reopen their Story later without re-entering Quick Picks.

Groundwork for this already exists: `FestivalStorySequence`'s `attendanceDays` prop is optional and falls back to `useAttendanceDays(ACTIVE_FESTIVAL_ID)` (the persisted selection) specifically for this case — see the prop's doc comment and "Attendance scope" above.

**What's still undecided:** the route itself doesn't exist yet, and more importantly, the unlock check does not live at the component level today — `storyUnlocked` is computed as part of the Quick Picks completion flow, gating whether the card is even clickable. A standalone entry point would need to run that same eligibility check itself (`getEligibleArtists`/`getValidPositivePicks`, the same helpers `computeStorySignals` uses) before rendering, rather than assuming a valid session already gated access.

**Not built now** — the current flow (Story reachable only right after completing Quick Picks) is intentional and sufficient for MVP. Revisit if users want to revisit a completed Story without re-running Quick Picks.

---

## Future Consideration: "Surprise Me" Button on Ultra-Wide Viewports

`app/components/explore/ExploreContent.tsx`'s "Surprise Me" button is a small, fixed-size pill anchored to the right edge of Explore's header row, inside the same `w-full max-w-[1760px] mx-auto` content shell used by Planner (`planner/page.tsx`) and Artist Detail (`ArtistContent.tsx`/`ArtistHero.tsx`). Below roughly 2000px of total viewport width (sidebar plus content), that shell is edge-to-edge and the button reads as anchored to the browser's edge; above it, the shell centers with growing gutters on both sides, and the button — never anchored to the true viewport edge, and never resized — can read as floating rather than intentionally placed.

**Not a defect specific to this button, or to Quick Picks-style pages** — it's a shared consequence of the `max-w-[1760px]` content-shell pattern used consistently across Explore, Planner, and Artist Detail. Fixing it would mean revisiting that shared shell pattern across all three surfaces, not a one-off tweak to Explore alone. Not pursued in this pass; flagged as low priority.

## Future Consideration: Quick Picks Setup Screen Subtitle Line Wrap

`StartScreen.tsx`'s subtitle ("Quick Listen when you need a first impression, then make your pick.") has no explicit width constraint or forced line break — it wraps naturally based on the rendering device's width. Different phone widths (confirmed across iOS and Android) produce different, sometimes visually unbalanced wrap points, such as a short line followed by a long one. Forcing a specific break for one device width risks creating an equally awkward break at another, so this is left as natural text reflow rather than something to fix — expected cross-device variance, not a bug.

---

## Future Consideration: Safari Corner-Clip Bug on Home Cards

iOS Safari fails to properly clip descendant content to a rounded corner (`rounded-2xl overflow-hidden`) on an element that also carries a `transform` — even a resting, effectively-no-op one, which `HomeContent.tsx`'s hover-tilt cards always have via inline style. This showed up as a faint square corner visible behind each card's rounded corner, on iPhone only — not observed on desktop Safari (plausibly because iOS Safari does more aggressive GPU layer promotion for touch/scroll performance than desktop Safari), and not observed on Android at all.

**Tried:** moving the `transform` onto a non-clipping wrapper div, separate from the `rounded-2xl overflow-hidden` element (the standard fix for this class of bug) — did not resolve it, which suggests the actual leak is each card's `blur-3xl` glow circle bleeding past the rounded mask independent of the transform.

**Tried:** `-webkit-mask-image` on the card to force a mask-based clip instead of the default overflow-hidden clip path — this did fix the iOS corner bug, but the property is also honored by Chrome/Blink (not Safari-exclusive), and a real gradient between two different color stops vignettes the mask, dimming the hover glow near every card's corners in every browser, not just iOS. Making both gradient stops identical avoided the vignette but the hover glow still didn't come back.

**Not fixed** — reverted to the original single-element card markup. Revisit only if this becomes a recurring complaint; a real fix likely needs a differently-shaped mask (sized to clear the glow's own blur radius) rather than another gradient-stop adjustment.

---

## Future Consideration: Group-Photo Hero Framing

`ArtistHero.tsx`'s photo (`object-fit: cover`, full width, fixed low height) always resolves with the photo's width matched exactly to the box — the box's aspect ratio is always far wider/shorter than any real photo, so there's zero horizontal slack for `objectPosition`'s x-component to act on; only the vertical component ever does anything (every artist's `objectPosition` in the data files hardcodes x as `"center"` for this reason). For a wide group-lineup photo, this means a member positioned toward the left of the source photo can end up hidden under the hero's left-side text-legibility gradient (desktop only — that gradient is `hidden md:block`), with no way to reposition them out from under it via `objectPosition` alone.

**Tried, on Major Lazer and aespa:** a `transform: scale()` plus an off-center `transform-origin` pan (reusing the artist's position string) to manufacture crop slack `cover` doesn't have. The underlying geometry is a single uniform affine scale, so pushing the obscured member rightward proportionally pushes everyone else further right too — worked out concretely for both artists that any zoom/origin strong enough to meaningfully clear the obscured member pushes the group's rightmost member off the opposite edge entirely.

**Tried:** `object-fit: contain` instead (shrink to fit, nothing cropped, hero's own background shows through as padding) — fully deterministic, but trades in visible blank space wherever the box's aspect ratio doesn't match the photo's, which is essentially always true across breakpoints (mobile portrait and desktop wide are never the same shape as any one photo). A responsive version (contain + right-shifted only at `md:` and up, plain centered `cover` below it, matching the fact that the gradient itself is desktop-only) is possible, but requires expressing `object-position` via Tailwind's static keyword classes (`object-center md:object-right`) rather than the per-artist dynamic string, since inline `style` can't vary by breakpoint.

**Not shipped** — both artists reverted to their original `objectPosition` values (`"center 26%"` and `"center 10%"` respectively), and no `imageZoom`/`imageFit` fields were added to the `Artist` type. These two artists' current hero photos are believed to be copyright placeholders likely to be replaced before launch, so a responsive crop/pan mechanism wasn't worth building for images that won't ship. **If a real (non-placeholder) group photo hits this same problem later:** the actual fix is almost certainly picking or cropping a source image where nobody sits in the frame's left ~30–40% to begin with — an image-selection step, not something CSS alone can solve cleanly for a lineup spanning the full frame width.

---

## Future Consideration: React Hook Lint Warnings (set-state-in-effect, exhaustive-deps)

A pre-release `npm run lint` pass surfaced `react-hooks/set-state-in-effect` errors and `react-hooks/exhaustive-deps` warnings, from a stricter hook-lint rule that flags any synchronous `setState` call inside an effect body, even in early-return guard clauses:

- `set-state-in-effect`: `SingleSelectDropdown.tsx:29`, `MultiSelectDropdown.tsx:49` (the two-pass measure-then-position dropdown alignment), `DayCompleteScreen.tsx:15` (count-up reset when target is 0), `DecisionScreen.tsx:207` and `:217` (flash/toast reset when the underlying value clears), `LiveVideoSection.tsx`'s `showFallback` reset at the top of its effect (fires whenever `artist.liveVideoId` changes — necessary since Next.js reuses this component instance across artist-to-artist navigation on the `/artist/[slug]` route rather than remounting it, so a stale `true` from a previous artist would otherwise leak into the next one).
- `exhaustive-deps`: `DayCompleteScreen.tsx:93` (missing `handleContinue`), `DecisionScreen.tsx:226` (missing `toast`).

These don't block `next build` — Next 16 doesn't run ESLint as part of the production build, only `npm run lint` itself. All of the affected components were exercised extensively during the pre-release audit (dozens of dropdown opens, full Quick Picks runs through all 4 days) with no observed visual glitches or stale-value symptoms. Deferred as lint-only cleanup; the real fix is computing the derived value during render instead of via effect+state, or stabilizing the missing-dep callbacks with `useCallback`.

---

## Future Consideration: next/image sizes Prop for fill Images

Every `fill`-mode `<Image>` in the app (`ArtistCard.tsx`, `DecisionScreen.tsx`, `ArtistHero.tsx`, etc.) omits the `sizes` prop, which Next.js warns about via `console.warn` in dev. Checked and confirmed this warning is dev-only: `node_modules/next/dist/shared/lib/utils/warn-once.js` makes `warnOnce` a no-op whenever `NODE_ENV === 'production'`, so it never reaches a real deployed user's console. No prior attempt at adding `sizes` exists in git history or elsewhere in this file, despite a vague recollection that it was tried once and didn't look right. The likely culprit if it's tried again: `ArtistCard.tsx`'s `cardW`/`photoH` vary by context (fixed `w-60`/`w-48` in the two carousel sizes, fluid `w-full` in the responsive grid), so a single hardcoded `sizes` value doesn't fit every caller — getting it right requires a different value per layout mode, not a copy-pasted constant. Deferred indefinitely as a distinct backlog item, independent of the upcoming image-replacement pass.

---

## Future Consideration: LCP priority Prop on Explore's First Carousel Card

Next.js's LCP heuristic flags Explore's "Festival Favorites" carousel first card image as a good `priority`/`loading="eager"` candidate. Not applied, because the carousel's artist order is a per-session seeded shuffle (see Carousel Presentation Strategies), so whichever artist happens to render first varies — a correct fix would add a `priority` prop to `ArtistCard` and have `ArtistCarousel.tsx`'s map pass `true` only for index `0`, not hardcode it to a specific artist. Layout-neutral, minor real speed win, tracked as its own post-MVP item separate from the `sizes` prop finding above and from the image-replacement pass.

---

## Future Consideration: Duplicated Filter/Search Computation in ExploreContent

`ExploreContent.tsx` computes `filterArtists(...)` and the `hasSearch ? searchArtists(...) : ...` fallback three separate times, in three independent inline closures, rather than once and shared:

1. The result-count summary label (~line 271) — only reads `results.length` and the search query text; order is irrelevant here.
2. The single-carousel "See all" expanded view (~line 318) — operates over `currentCarousel.artists`, already sorted by that carousel's own logic before filtering runs.
3. The main four-state render (~line 405) — the only one of the three whose `results` actually reaches `ArtistResultsGrid`, and where the filters-only path needs (and now has) `sortFestivalFavoritesForFullView(filtered)` applied before rendering.

Only #3 needed the sort fix; #1 and #2 didn't, which is why the fix touches one line, not three. But the underlying triplication predates that fix and is a separate, structural redundancy — the same `allArtists`/`filterArtists` call runs three times per render. Consolidating into one `useMemo` shared across the three closures is possible but not done now — out of scope for a one-line sort fix, and a large-target diff on this page during a fast pre-launch pass isn't worth taking on tonight. Revisit post-MVP.

---

## Future Consideration: YouTube Player `useId()` String Id

`LiveVideoSection.tsx` passes `useId()`'s output directly to `YT.Player` as a string element id and as the target `<div>`'s `id` attribute. This is safe specifically because the YouTube IFrame API resolves a string id via `document.getElementById`, not a CSS selector — colons (which `useId()` produces) are legal in `id` attributes and don't affect `getElementById` matching. Would need reconsidering if this id is ever passed to a selector-based lookup (e.g. `querySelector`) instead.

---

## Future Consideration: Switch `aria-disabled` Single-Path Guard

`Switch.tsx` uses `aria-disabled` rather than native `disabled` so the control stays focusable and announces its `disabledReason` to screen readers, guarding the one activation path (`onClick`) with an early return. This is correct as long as `onClick` stays the only activation path — if a second one is ever added (e.g. a standalone `onKeyDown` handler rather than relying on the button's native Enter/Space-to-click behavior), it would need the same `disabled` guard.

---

## Future Consideration: Mobile Drawer State Not Reset Entering Quick Picks

`isMobileDrawerOpen` (`chromeStore.ts`) is only reset to `false` via Sidebar's own link `onClick` handlers and the backdrop's `onClick`. Quick Picks hides the Sidebar (and its backdrop) entirely via `isSidebarVisible` while decisioning, without separately resetting the drawer flag. In practice this isn't reachable by tapping: the backdrop is a `fixed inset-0` click-catcher that sits above the rest of the page while the drawer is open, so any tap outside the drawer panel (including on an off-Sidebar link to `/quick-picks`, e.g. from `HomeContent.tsx` or `QuickPicksBanner.tsx`) closes the drawer instead of also activating whatever's underneath. The one remaining path is keyboard/assistive-tech navigation — z-index doesn't affect tab order, so a user could Tab past the drawer to an off-drawer link and press Enter, activating it without ever triggering the backdrop's `onClick`. Narrow enough to not warrant a fix now; revisit if keyboard-only mobile navigation becomes a tracked concern.

---

## Future Consideration: `sortFestivalFavoritesForFullView` Reused for Generic Deterministic Sort

`ExploreContent.tsx`'s filters-only branch (no search, filters active) calls `sortFestivalFavoritesForFullView` to get a stable day → tier → time → name order, despite the function's name describing it as Festival-Favorites-specific. The day → tier → time → name logic isn't actually tied to that carousel — it's just the only existing helper with the right ordering — but the name implies carousel-specific semantics that could mislead a future editor changing the Festival Favorites carousel's sort and unintentionally affecting all filtered Explore views. No behavior risk today. The real fix is extracting a genericly-named helper (e.g. `sortArtistsDeterministic`) and pointing both call sites at it. Deferred as a naming/maintenance cleanup, not launch-blocking.

---

## Mobile Accessibility Review: Dismissed Findings

A second Copilot review pass, scoped to mobile accessibility, raised four "fix today if confirmed" items beyond the Sidebar drawer keyboard-close gap addressed above (see § Dialog Accessibility). None held up once traced against the actual implementation:

- **Nested scroll / `100dvh` risk** — the concern was competing `overflow-y-auto` ancestors creating unreachable "dead" scroll zones. The app already does the opposite: `<body>` is `overflow-hidden` (`layout.tsx`) and each page owns exactly one scroll container (`<main overflow-y-auto>`). The one real `100dvh` fragility (`DecisionScreen.tsx`'s hero, against Safari chrome expand/collapse) is already tracked above under § Decisioning Screen Mobile Density.
- **Drawer close/navigation race** — the concern was a stale animation-frame leaving the backdrop mounted after a rapid nav-and-interact sequence. `setMobileDrawerOpen(false)` and the backdrop's unmount are both synchronous with the triggering click; there's no timeout or animation-frame step in that path for a stale intercept layer to exist in.
- **Quick Picks controls unreachable on short/landscape viewports** — the concern assumed a `fixed` CTA cluster that could get covered. The Pass/Interested/Must See buttons are in normal document flow inside `quick-picks/page.tsx`'s own scrollable `<main>`, not `fixed` — worst case on a short viewport is scrolling, not unreachable controls. Already covered by § Decisioning Screen Mobile Density's accepted residual-scroll tradeoff and § Orientation-Aware Mobile Breakpoints.
- **Explore filter/search iOS zoom** — already fully addressed by § Explore Search Input Zoom-on-Focus (global 16px input floor plus a blur-based recovery fix for the WebKit nested-scroll zoom trigger). Filter dropdown triggers are buttons, not text inputs, so were never in scope for focus-triggered zoom.

---

## Future Consideration: Touch-Target Consistency Across Icon/Button Rows

Some icon-only buttons in dense rows (e.g. filter chip rows, carousel controls) haven't been individually audited against a 44px minimum hit-target, unlike `DecisionScreen.tsx`'s Back/Exit buttons, which got `p-2 -m-2` specifically to reach that size. Unverified either way — not confirmed broken, not confirmed fine. Revisit as a dedicated sweep rather than guessing at individual components.

---

## Future Consideration: Focus-Visible Ring Consistency

Whether every interactive control — especially icon-only buttons without a text label — shows a strong, consistent visible focus ring hasn't been audited app-wide. Unverified either way. Revisit as a dedicated keyboard-navigation sweep.

---

## Future Consideration: Festival Story Text Wrap at 320px + Large Text Settings

Festival Story card copy hasn't been specifically checked at the intersection of the narrowest supported width (320px) and iOS/Android large-text accessibility settings, where line-wrap could look cramped or overflow. Unverified either way. Revisit alongside a real-device accessibility pass.

---

## Future Consideration: ExploreFilters Blur-Recovery Runs on Every Browser, Not Just iOS

`ExploreFilters.tsx`'s `handleSearchBlur` (the viewport-meta + scroll-nudge fix for iOS/WebKit's zoom-on-focus bug, see § Explore Search Input Zoom-on-Focus) runs unconditionally on every blur of the search input, regardless of platform — it was never gated to iOS/WebKit specifically, even though the bug it corrects only exists there.

**Considered and not adopted:** gating it behind a `navigator.userAgent` check. The concrete version proposed (matching `/iP(hone|od|ad)/` in the UA string) has a real bug: iPadOS has defaulted to a desktop-class User-Agent (masquerading as macOS Safari) since iPadOS 13, specifically so sites don't serve it a "mobile" experience — that regex never matches a real iPad's UA, so gating this way would silently break the recovery fix for iPad users, one of the platforms it was built for, while leaving it "fixed" for iPhone. Adopting it as suggested would be a regression, not an improvement.

**Why not gate some other way instead:** the actual cost of running unconditionally is close to zero. The viewport-meta mutation has no visible effect on desktop browsers (they don't tie zoom behavior to that meta tag the way mobile Safari does), and the `scrollTo(0,1)`/`scrollTo(0,0)` nudge operates on `window`/document scroll, which per this app's own architecture (§ "`<body>` is `overflow-hidden`, deliberately") is never the real scroll container anywhere in the app — that position is already pinned at 0. So non-iOS platforms pay a handful of cheap, no-op DOM reads/writes per search-input blur, not visible churn or jank. Not worth the correctness risk of UA-sniffing to eliminate a cost this small. Revisit only with a real feature-detection approach, not UA sniffing, if this ever needs to change.

---

## Future Consideration: Sidebar Mobile Drawer Contents Stay Tabbable While Visually Closed

`Sidebar.tsx`'s `<aside>` (all nav links, My Festival items, How it works) is always mounted in the DOM — on mobile, "closed" is purely visual, via `-translate-x-full`. Nothing marks its contents `inert`/`aria-hidden` while off-screen. Combined with render order in `app/layout.tsx` (`MobileTopBar` → `Sidebar` → `{children}`), a keyboard user tabbing from the hamburger button on mobile would tab through all of the drawer's ~8-9 links/buttons — invisible, off-screen — before ever reaching visible page content.

This is distinct from the round-2 fix (`useDialogA11y` wired into the drawer, see § Dialog Accessibility): that hook only runs `if (isOpen)` — it governs Escape/Tab-trap/focus-restore while the drawer is open, and never touches the closed state at all. The two gaps are complementary, not overlapping.

**Not fixed now.** Real, but narrow exposure: only affects Tab-key keyboard navigation on a mobile viewport specifically — not touch (the overwhelming majority of mobile users) and not VoiceOver/TalkBack (which navigate via swipe gestures, not Tab). Doesn't block product usage or lose data for anyone it does affect. Given a small initial user base at launch, the realistic odds of this mattering pre-launch are low, and it wasn't worth the added risk of shipping an under-tested fix this late — the correct version isn't a one-line change: the same component serves desktop's always-visible static column, so any "inert while closed" logic must be scoped to mobile-viewport-and-closed specifically (a naive `inert={!isMobileDrawerOpen}` would break desktop, where that flag is always `false`), and needs to avoid making the drawer's content disappear before its 300ms slide-out transition finishes.

**What a real fix would look like:** add `invisible`/`visible` Tailwind classes alongside the existing transform classes, using the same `md:` override pattern already used for the transform itself (`md:visible` unconditional, `visible`/`invisible` toggled with `isMobileDrawerOpen` for mobile) — `visibility:hidden` natively removes an element from the tab order and accessibility tree, no `inert` polyfill needed. Needs a transition delay (or the `isScreenExiting`-style deferred-state pattern already used in Quick Picks) so it only goes inert once the close animation has actually finished, not the instant it starts. Revisit post-launch, or sooner if keyboard-only mobile navigation becomes a tracked concern.

---

## Future Consideration: Festival Story Country-Diversity Count and UK Constituent Nations

`app/data/categories.ts` stores England, Scotland, Wales, and Northern Ireland as four separate `Country` values. The Artist Detail page now rolls these up to a single "United Kingdom" label for display (`displayCountry()` in `app/lib/location.ts`), but Festival Story's country-diversity signal (`useStorySignals.ts`) still builds its distinct-country count directly off the raw `location.country` value — so a user whose picks include both an England artist and a Scotland/Northern Ireland/Wales artist would currently have those counted as 2 distinct countries in that signal, not 1, even though the rest of the app now presents them under one label.

**Not fixed now.** Two open questions, not just one mechanical gap: first, whether the country-diversity count feeds into the same selection-adjusted, sample-compared threshold logic documented for other Festival Story signals (genre affinity, day concentration) — if so, changing which values collapse into one entry changes the input distribution that calibration was built around, and that needs to be understood before touching it, not assumed safe. Second, whether collapsing UK nations for this specific signal is even the right product call — "your picks span N countries" is meant to celebrate geographic diversity, and collapsing England+Scotland to one entry could arguably undersell a pick set that's more varied than the UI would then represent it as.

**Current real-world exposure is narrow:** only England (27 artists) and Northern Ireland (1 artist, Chalk) exist in the current lineup — Scotland and Wales have zero. The double-counting case can only occur today if a user's picks include an England artist and Chalk specifically.

**Revisit when:** either a Scotland or Wales artist is added (widening the surface this could affect), or the UK display rollup expands beyond Artist Detail into a surface where the mismatch would be more visible. At that point, read `useStorySignals.ts`'s country-diversity logic closely enough to know whether swapping in `displayCountry()` there is a safe, isolated change or one that needs threshold re-validation.

---

## Future Consideration: Stale Chicago-Baseline Fixture in verify-story-signals.ts

`verify-story-signals.ts`'s hometown-signal check ("fixture: Saturday eligible
Chicago baseline clears the old 12pp threshold territory") asserts the real Saturday
lineup's actual Chicago-artist rate exceeds 12% — a precondition for the regression
check right after it (zero Chicago picks against that baseline should produce no
hometown card). This currently fails: the real rate is 11.6%, just under the
assumed threshold.

**Not a logic bug.** Confirmed pre-existing and unrelated to the `RunArtist`
migration work in progress around it — fails identically on `main`, before any of
those changes. This is data drift: the real Saturday lineup's Chicago-artist
proportion has settled below the value assumed when this fixture was written, most
likely because the artist roster changed since (an addition, removal, or location
correction) without anyone revisiting this one precondition.

**Effect:** only this one fixture precondition fails; the dependent regression check
never actually ran against real data confirming its precondition held (though it
likely still would). Every other check in the suite (86 of 87) passes.

**Not fixed now** — out of scope for whichever change happens to surface it next.
Fixing means either finding a Saturday-eligible subset that still clears 12% today,
or reworking the fixture to compute its own threshold from the current real baseline
rather than hardcoding one. **Revisit when:** next touching
`verify-story-signals.ts` directly, or if this drifts further.

---

## Future Consideration: Quick Picks Bypasses Similar-Artist Verification Gate

Artist Detail's `FloatingCards.tsx` renders Similar Artists only when
`similarArtistsVerified` is true and the list is nonempty. Quick Picks'
`DecisionScreen.tsx` currently checks only whether `similarArtists.length > 0`, then
shows the first four names on desktop. This conflicts with the documented rule that
AI-assisted Similar Artists content stays hidden until editorial review.

Do not fold this into the artist-schema work. Fix it in a focused frontend branch by
applying the verification gate consistently, then cover both verified and unverified
cases with tests. The future backend API should expose only a verified, nonempty
FestivalRun-scoped Similar Artist set, making the frontend contract harder to bypass.

---

## Future Consideration: Artist Detail Schedule States

The run-scoped API can represent an announced lineup entry before its schedule exists,
but the current Artist Detail UI assumes every displayed Artist has at least one
scheduled Appearance. Before consuming an Artist with no Appearances, decide and test
the intended user experience, including whether to show a "schedule coming soon"
message and what happens to schedule actions and the Playing At card.

The API can also return cancelled Appearances, while the current TypeScript-backed UI
has no cancellation state. Decide how cancellations, optional reasons, and schedule
store behavior should appear before mapping them into the legacy frontend `Artist`
shape. Until both designs are approved, the API adapter rejects these states so the
temporary TypeScript fallback preserves existing behavior.

The bulk `read_festival_run_appearances` query (behind `runAppearancesStore`, shared
by Explore/Planner/Quick Picks/Festival Story) takes the simpler route of excluding
cancelled Appearances server-side entirely, rather than returning and ignoring them —
see [ADR-0006](decisions/0006-shared-run-appearances-store.md). Widen that filter
together with adding a status field to `FestivalRunAppearanceRead` once a
cancellation UI design exists for these bulk-consuming surfaces too.

---

## Future Consideration: Wider Consumption of the Run-Appearances Store

**Resolved.** `runAppearancesStore` (fed by `GET .../appearances`) was built to fix
scheduling-identity resolution, then extended into the display-data source for
Planner and Explore — see [ADR-0006](decisions/0006-shared-run-appearances-store.md)
for the full pattern (lean per-consumer projection types, originally a TS/API
constructor pair gated on `hasLoaded`). Quick Picks (backend rollout step 7 item 4,
`QuickPicksRunArtist`, see [ADR-0007](decisions/0007-quick-picks-track-and-similar-artists-on-bulk-appearances.md))
and Festival Story (step 7 item 5, retyped onto `RunArtist` directly — no new
projection type needed, since its signal computation never touches an editorial
field) now both read from this store, following the same pattern.

**Update (2026-08-26):** Fully resolved, including the item this entry originally
left open. `app/data/artists`'s removal as a frontend runtime dependency (step 7 item
7) is complete — every consumer's TS-fallback constructor was deleted alongside its
sole caller, so the per-consumer projection types above now each have exactly one
live (API-only) constructor rather than a fallback pair. `app/data/artists` remains
in the repo only as the authoring/import source (see `docs/roadmap/artist-authoring.md`).
