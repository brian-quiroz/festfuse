/**
 * Focused validation for Festival Story's attendance-scoped algorithm
 * (app/hooks/useStorySignals.ts). Not a test framework integration (this repo has
 * none) and not a mirrored reimplementation of the algorithm — every check below
 * calls the real exported production functions directly: computeStorySignals,
 * getValidPositivePicks, getEligibleArtists (app/hooks/useStorySignals.ts),
 * buildStorySeed (app/lib/story-sampling.ts), getSelectedDayAppearance
 * (app/lib/appearances.ts).
 *
 * Run with: npm run verify:story
 */
import type { Artist } from "@/app/types/artist";
import { allArtists } from "@/app/data/artists";
import { ACTIVE_FESTIVAL_ID, getDaysForActiveFestival } from "@/app/data/festivals";
import { getSelectedDayAppearance } from "@/app/lib/appearances";
import { GENRE_TO_FAMILY } from "@/app/data/categories";
import { buildStorySeed, drawSamples } from "@/app/lib/story-sampling";
import {
  computeStorySignals,
  getValidPositivePicks,
  getEligibleArtists,
  MIN_POSITIVE_PICKS_FOR_STORY,
} from "@/app/hooks/useStorySignals";
import type { ArtistDecision } from "@/app/store/decisionStore";

// Matches production's SAMPLE_COUNT (app/hooks/useStorySignals.ts) — not exported, so
// mirrored here as a plain constant (not algorithm logic) purely for this one direct
// sampling-distribution proof.
const SAMPLE_COUNT_FOR_PROOF = 500;

let failures = 0;
let checks = 0;
function check(label: string, pass: boolean, detail?: string) {
  checks++;
  console.log(`${pass ? "PASS" : "FAIL"} — ${label}${detail ? ` (${detail})` : ""}`);
  if (!pass) failures++;
}

const ALL_DAYS = [...getDaysForActiveFestival()];

function decision(verdict: "mustSee" | "interested" | "passed", source: ArtistDecision["source"] = "quickPicks"): ArtistDecision {
  return { verdict, source, updatedAt: Date.now() };
}
function decisionsFor(
  slugs: string[],
  verdict: "mustSee" | "interested" | "passed",
  source: ArtistDecision["source"] = "quickPicks"
): Record<string, ArtistDecision> {
  const out: Record<string, ArtistDecision> = {};
  for (const slug of slugs) out[slug] = decision(verdict, source);
  return out;
}
// Deterministic Fisher-Yates shuffle (LCG-seeded) — used because allArtists is stored
// Thursday-first within each day file (sorted by billing prominence), so an unshuffled
// slice() accidentally concentrates on one day/tier and can make a *different* signal
// win the ranking. Real user picks aren't file-order-correlated, so shuffled fixtures
// are the fairer test for anything that isn't deliberately testing one dimension.
function shuffled<T>(arr: T[], seed = 1): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function run(attendanceDays: string[], decisionsByArtist: Record<string, ArtistDecision>, artists: Artist[] = allArtists) {
  return computeStorySignals({ festivalId: ACTIVE_FESTIVAL_ID, attendanceDays, allArtists: artists, decisionsByArtist });
}
function dims(signals: ReturnType<typeof run>): string[] {
  return signals.map((s) => s.type);
}
function findType(signals: ReturnType<typeof run>, type: string) {
  return signals.find((s) => s.type === type);
}
// Matches the interpretive (non-tied, qualifying) Taste Profile headline —
// "{Family} runs the show" — without hardcoding a specific family name.
function isStrongTasteCopy(headline: string | undefined): boolean {
  return !!headline && headline.endsWith("runs the show");
}

// Fully synthetic fixture artist — used only where the real 172-artist lineup can't
// produce the specific baseline skew a test needs (the real data happens to be
// distributed very evenly across days: 42-44 artists/day). Deliberately minimal and
// isolated from other signals (neutral location/billing) so it only exercises the
// dimension under test.
let fixtureCounter = 0;
function fixtureArtist(day: string, opts: { genres?: string[]; city?: string; country?: string } = {}): Artist {
  const base = allArtists[0];
  fixtureCounter++;
  return {
    ...base,
    slug: `zzz-fixture-${fixtureCounter}`,
    genres: (opts.genres ?? ["Pop"]) as Artist["genres"],
    location: {
      city: opts.city ?? "Nowhere",
      state: undefined,
      country: (opts.country ?? "United States") as Artist["location"]["country"],
    },
    appearances: [
      {
        id: `fixture-${fixtureCounter}-1`,
        festivalId: ACTIVE_FESTIVAL_ID,
        stage: "T-Mobile",
        day,
        date: "Jul 30",
        startTime: "8:00 PM",
        endTime: "9:00 PM",
        billingTier: "Undercard",
      },
    ],
  };
}

console.log("\n========== ATTENDANCE AND SCOPING ==========\n");

{
  const eligible = getEligibleArtists(ACTIVE_FESTIVAL_ID, ALL_DAYS, allArtists);
  check("all days selected: eligible pool equals full lineup", eligible.length === allArtists.length, `${eligible.length}/${allArtists.length}`);
}
{
  const eligible = getEligibleArtists(ACTIVE_FESTIVAL_ID, ["Friday"], allArtists);
  const expected = allArtists.filter((a) => getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ["Friday"]) !== undefined);
  check("one selected day: eligible pool matches direct resolution", eligible.length === expected.length, `${eligible.length}`);
}
{
  const eligible = getEligibleArtists(ACTIVE_FESTIVAL_ID, ["Thursday", "Sunday"], allArtists);
  const onlyFriSat = allArtists.filter(
    (a) =>
      getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ["Friday", "Saturday"]) !== undefined &&
      getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ["Thursday", "Sunday"]) === undefined
  );
  check("nonconsecutive days (Thu+Sun): excludes artists only on Fri/Sat", onlyFriSat.every((a) => !eligible.includes(a)));
}
{
  const eligible = getEligibleArtists(ACTIVE_FESTIVAL_ID, [], allArtists);
  check("explicit zero attendance days: eligible pool is empty, not the full lineup", eligible.length === 0, `${eligible.length}`);
  const signals = run([], decisionsFor(allArtists.slice(0, 10).map((a) => a.slug), "mustSee"));
  check("zero attendance days: computeStorySignals returns no cards (nothing is eligible)", signals.length === 0);
}
{
  const decisions = decisionsFor(
    allArtists.filter((a) => getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ["Friday"])).slice(0, 6).map((a) => a.slug),
    "mustSee"
  );
  const withFriday = run(["Friday"], decisions);
  const withAllDays = run(ALL_DAYS, decisions);
  check(
    "same decisions, different attendanceDays inputs -> different results (function has no hidden persisted-state dependency)",
    JSON.stringify(withFriday) !== JSON.stringify(withAllDays) || withFriday.length === 0
  );
}
{
  const fridayEligible = allArtists.filter((a) => getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ["Friday"]) !== undefined);
  const decisions = {
    ...decisionsFor(fridayEligible.slice(0, 3).map((a) => a.slug), "mustSee", "explore"),
    ...decisionsFor(fridayEligible.slice(3, 6).map((a) => a.slug), "interested", "quickPicks"),
  };
  const picks = getValidPositivePicks(ACTIVE_FESTIVAL_ID, ["Friday"], allArtists, decisions);
  check("Explore-sourced decision counts as a valid positive pick", picks.length === 6, `${picks.length}`);
}
{
  const fridayOnly = allArtists.filter(
    (a) => getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ["Friday"]) !== undefined && getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ["Thursday"]) === undefined
  );
  const decisions = decisionsFor(fridayOnly.slice(0, 5).map((a) => a.slug), "mustSee");
  const picksOnThursday = getValidPositivePicks(ACTIVE_FESTIVAL_ID, ["Thursday"], allArtists, decisions);
  check("decisions for artists outside the selected days do not count", picksOnThursday.length === 0, `${picksOnThursday.length}`);
}
{
  const decisions = decisionsFor(["not-a-real-artist-slug", "another-fake-one"], "mustSee");
  const picks = getValidPositivePicks(ACTIVE_FESTIVAL_ID, ALL_DAYS, allArtists, decisions);
  check("stale decision slugs (no matching artist) do not count", picks.length === 0);
}
{
  const decisions = decisionsFor(["devault", ...allArtists.filter((a) => a.slug !== "devault").slice(0, 4).map((a) => a.slug)], "mustSee");
  const picks = getValidPositivePicks(ACTIVE_FESTIVAL_ID, ["Thursday"], allArtists, decisions);
  const devaultCount = picks.filter((a) => a.slug === "devault").length;
  check("multi-appearance artist (devault) counted exactly once", devaultCount === 1, `count=${devaultCount}`);
}
{
  const primaryExcluded = allArtists.find(
    (a) => getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ALL_DAYS.filter((d) => d !== "Friday")) !== undefined
  )!;
  check("fixture: found an artist eligible when Friday (an arbitrary day) is excluded", !!primaryExcluded);
}

console.log("\n========== STORY ELIGIBILITY ==========\n");

check("zero positive picks -> []", run(ALL_DAYS, {}).length === 0);
check("all Passed -> []", run(ALL_DAYS, decisionsFor(allArtists.slice(0, 10).map((a) => a.slug), "passed")).length === 0);
for (let n = 1; n <= 4; n++) {
  const picks = allArtists.slice(0, n).map((a) => a.slug);
  check(`${n} valid positive pick(s) -> []`, run(ALL_DAYS, decisionsFor(picks, "mustSee")).length === 0);
}
{
  const picks = allArtists.slice(0, MIN_POSITIVE_PICKS_FOR_STORY).map((a) => a.slug);
  const signals = run(ALL_DAYS, decisionsFor(picks, "mustSee"));
  check("exactly 5 valid positive picks -> exactly 4 cards", signals.length === 4, `${signals.length}`);
}
{
  const fridayEligible = allArtists.filter((a) => getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ["Friday"]) !== undefined);
  const fridayOnly = allArtists.filter(
    (a) => getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ["Friday"]) !== undefined && getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ["Thursday"]) === undefined
  );
  const decisions = {
    ...decisionsFor(fridayEligible.slice(0, 3).map((a) => a.slug), "mustSee"),
    ...decisionsFor(fridayOnly.slice(0, 2).map((a) => a.slug), "interested"),
  };
  const signals = run(["Thursday"], decisions);
  check("5 positive decisions, 2 outside attendance scope -> locked (< 5 valid)", signals.length === 0);
}
{
  const eligible = getEligibleArtists(ACTIVE_FESTIVAL_ID, ALL_DAYS, allArtists);
  const almostAll = eligible.slice(0, eligible.length - 2).map((a) => a.slug);
  const signals = run(ALL_DAYS, decisionsFor(almostAll, "mustSee"));
  check("nearly the entire eligible lineup selected -> still exactly 4 cards, no NaN", signals.length === 4 && signals.every((s) => Number.isFinite(s.userValue ?? 0)));
}

console.log("\n========== DIRECTIONAL CORRECTNESS ==========\n");

{
  const satEligible = allArtists.filter((a) => getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ["Saturday"]) !== undefined);
  const satNonChicago = satEligible.filter((a) => a.location.city !== "Chicago");
  const chicagoRate = (satEligible.filter((a) => a.location.city === "Chicago").length / satEligible.length) * 100;
  check("fixture: Saturday eligible Chicago baseline clears the old 12pp threshold territory", chicagoRate > 12, `${chicagoRate.toFixed(1)}%`);
  const signals = run(["Saturday"], decisionsFor(satNonChicago.slice(0, 8).map((a) => a.slug), "mustSee"));
  check("zero Chicago picks against a baseline above the old 12pp threshold -> no hometown card", !dims(signals).includes("hometown"), dims(signals).join(","));
}
{
  const satEligible = allArtists.filter((a) => getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ["Saturday"]) !== undefined);
  const oneChicago = satEligible.filter((a) => a.location.city === "Chicago").slice(0, 1);
  const rest = satEligible.filter((a) => a.location.city !== "Chicago").slice(0, 6);
  const signals = run(["Saturday"], decisionsFor([...oneChicago, ...rest].map((a) => a.slug), "mustSee"));
  check("exactly one Chicago pick -> no hometown card (below the 2-pick floor)", !dims(signals).includes("hometown"), dims(signals).join(","));
}
{
  const chicagoArtists = allArtists.filter((a) => a.location.city === "Chicago");
  const others = allArtists.filter((a) => a.location.city !== "Chicago");
  const signals = run(ALL_DAYS, decisionsFor([...chicagoArtists.slice(0, 5), ...others.slice(0, 3)].map((a) => a.slug), "mustSee"));
  const hometown = findType(signals, "hometown");
  check("2+ Chicago picks with meaningful over-index -> hometown card present", !!hometown, dims(signals).join(","));
  check(
    "hometown card direction is positive (userValue > lineupValue)",
    !hometown || (hometown.userValue !== undefined && hometown.lineupValue !== undefined && hometown.userValue > hometown.lineupValue)
  );
}
{
  const nonChicago = allArtists.filter((a) => a.location.city !== "Chicago");
  const signals = run(ALL_DAYS, decisionsFor(shuffled(nonChicago, 7).slice(0, 20).map((a) => a.slug), "mustSee"));
  check("Chicago under-indexing (0 of 20 picks) -> no hometown card of any kind", !dims(signals).includes("hometown"));
}
{
  const intlArtists = allArtists.filter((a) => a.location.country !== "United States");
  const usArtists = allArtists.filter((a) => a.location.country === "United States");
  const picks = [...shuffled(intlArtists, 17).slice(0, 10), ...shuffled(usArtists, 18).slice(0, 2)];
  const signals = run(ALL_DAYS, decisionsFor(picks.map((a) => a.slug), "mustSee"));
  const intl = findType(signals, "international");
  check("international over-indexing -> international card present, positive direction", !!intl && (intl.userValue ?? 0) > (intl.lineupValue ?? 0), dims(signals).join(","));
}
{
  const usArtists = allArtists.filter((a) => a.location.country === "United States");
  const signals = run(ALL_DAYS, decisionsFor(shuffled(usArtists, 3).slice(0, 20).map((a) => a.slug), "mustSee"));
  check("zero international picks -> no international card", !dims(signals).includes("international"));
}
{
  const usArtists = allArtists.filter((a) => a.location.country === "United States");
  const intlArtists = allArtists.filter((a) => a.location.country !== "United States");
  const signals = run(ALL_DAYS, decisionsFor([...shuffled(usArtists, 11).slice(0, 18), ...intlArtists.slice(0, 2)].map((a) => a.slug), "mustSee"));
  check("international under-indexing -> no international card (never an inverse 'American-heavy' card)", !dims(signals).includes("international"));
}
{
  const headliners = allArtists.filter((a) => {
    const t = getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ALL_DAYS)?.billingTier;
    return t === "Headliner" || t === "Sub-headliner";
  });
  const undercard = allArtists.filter((a) => {
    const t = getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ALL_DAYS)?.billingTier;
    return t !== "Headliner" && t !== "Sub-headliner";
  });
  const signals = run(ALL_DAYS, decisionsFor([...headliners.slice(0, 8), ...undercard.slice(0, 2)].map((a) => a.slug), "mustSee"));
  const billing = findType(signals, "billing");
  check("headliner-heavy picks -> billing card, headliner-heavy copy", billing?.headlineTemplate === "Big names lead the way", billing?.headlineTemplate);

  const allUndercardPicks = shuffled(undercard, 23).slice(0, 20);
  const signals2 = run(ALL_DAYS, decisionsFor(allUndercardPicks.map((a) => a.slug), "mustSee"));
  const billing2 = findType(signals2, "billing");
  check("undercard-heavy picks -> billing card, undercard-heavy copy", billing2?.headlineTemplate === "Heavy on the undercard", billing2?.headlineTemplate ?? dims(signals2).join(","));
}
{
  const byStage = new Map<string, Artist[]>();
  for (const a of allArtists) {
    const stage = getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ALL_DAYS)!.stage;
    if (!byStage.has(stage)) byStage.set(stage, []);
    byStage.get(stage)!.push(a);
  }
  const stages = [...byStage.keys()];
  const focusedPicks = byStage.get(stages[0])!.slice(0, 15);
  const focusedSignals = run(ALL_DAYS, decisionsFor(focusedPicks.map((a) => a.slug), "mustSee"));
  const focusedStage = findType(focusedSignals, "stage");
  check(
    "focused stage picks (all same stage) -> stage card, focused copy (or safe, never broad)",
    !focusedStage || focusedStage.headlineTemplate === "Anchored to a few stages" || focusedStage.headlineTemplate === "Your festival footprint",
    focusedStage?.headlineTemplate ?? "(none)"
  );

  const broadPicks: Artist[] = [];
  for (const s of stages) {
    if (broadPicks.length >= 15) break;
    const artist = byStage.get(s)![0];
    if (artist) broadPicks.push(artist);
  }
  for (const s of stages) {
    if (broadPicks.length >= 15) break;
    for (const a of byStage.get(s)!.slice(1)) {
      if (broadPicks.length >= 15) break;
      if (!broadPicks.includes(a)) broadPicks.push(a);
    }
  }
  const broadSignals = run(ALL_DAYS, decisionsFor(broadPicks.map((a) => a.slug), "mustSee"));
  const broadStage = findType(broadSignals, "stage");
  check(
    "broad stage picks (one per stage first) -> stage card, broad copy (or safe, never focused)",
    !broadStage || broadStage.headlineTemplate === "Stages all across the park" || broadStage.headlineTemplate === "Your festival footprint",
    broadStage?.headlineTemplate ?? "(none)"
  );
}
{
  const focusedGenrePicks = allArtists.filter((a) => a.genres.every((g) => a.genres[0] === g)).slice(0, 15);
  if (focusedGenrePicks.length >= 5) {
    const signals = run(ALL_DAYS, decisionsFor(focusedGenrePicks.map((a) => a.slug), "mustSee"));
    const genreBreadth = findType(signals, "genreBreadth");
    check(
      "single-genre-only picks -> genreBreadth card (if present) is focused, never broad",
      !genreBreadth || genreBreadth.headlineTemplate === "In the zone",
      genreBreadth?.headlineTemplate ?? "(none)"
    );
  } else {
    check("single-genre-only fixture unavailable in this dataset (skipped, not a failure)", true);
  }
}

console.log("\n========== GENRE AFFINITY: SELECTION-ADJUSTED + TIES ==========\n");

{
  // Representative/shuffled picks across many independent seeds should never claim
  // "runs on X" (the strong interpretive copy) — this is the main regression guard
  // against the old bug (each sample checked only against the user's own winning
  // family, which made ordinary results look artificially unusual). With a 10%
  // extremeness threshold, an occasional false positive from pure chance is expected
  // by design (see ARCHITECTURE.md § Festival Story → Known limitations) — this
  // checks the RATE stays in that expected neighborhood across many independent
  // seeds, not that it's literally zero (a "never" assertion would itself be wrong).
  const seeds = Array.from({ length: 30 }, (_, i) => i * 7 + 2);
  let strongHits = 0;
  for (const seed of seeds) {
    const picks = shuffled(allArtists, seed).slice(0, 20);
    const signals = run(ALL_DAYS, decisionsFor(picks.map((a) => a.slug), "mustSee"));
    const taste = findType(signals, "genreAffinity");
    if (isStrongTasteCopy(taste?.headlineTemplate)) strongHits++;
  }
  check(
    `strong genre-affinity copy rate across ${seeds.length} representative seeds stays near the ~10% design target, not wildly inflated`,
    strongHits / seeds.length <= 0.3,
    `${strongHits}/${seeds.length}`
  );
}
{
  // A genuinely concentrated family (all picks share one family; many sub-genres
  // within it so it isn't also a single-genre fixture) qualifies for interpretive copy.
  const edmOnly = allArtists.filter((a) => a.genres.length > 0 && a.genres.every((g) => GENRE_TO_FAMILY[g] === "Electronic/Dance"));
  const signals = run(ALL_DAYS, decisionsFor(edmOnly.slice(0, 20).map((a) => a.slug), "mustSee"));
  const taste = findType(signals, "genreAffinity");
  check("genuinely concentrated genre family qualifies for strong interpretive copy", isStrongTasteCopy(taste?.headlineTemplate), taste?.headlineTemplate);
}
{
  // Safe (non-interpretive) branch, single leading family = Electronic/Dance — a
  // family name that starts with a vowel sound, specifically chosen to catch a
  // regression of the "share a {Family} sound" article bug ("share a Electronic/Dance
  // sound"). Sample size deliberately equals the eligible pool size, so every one of
  // the 500 samples is a permutation of the exact same set (maxFamilyRate always
  // ties the observed value) and the statistical test can never qualify — this
  // reliably forces the safe branch rather than hoping a random pool lands there.
  const pool: Artist[] = [
    ...Array.from({ length: 3 }, () => fixtureArtist("Thursday", { genres: ["House"] })), // Electronic/Dance
    ...Array.from({ length: 2 }, () => fixtureArtist("Thursday", { genres: ["Pop"] })),
    ...Array.from({ length: 1 }, () => fixtureArtist("Thursday", { genres: ["Country"] })), // Folk/Americana/Country
  ];
  const signals = run(["Thursday"], decisionsFor(pool.map((a) => a.slug), "mustSee"), pool);
  const taste = findType(signals, "genreAffinity");
  check(
    "safe Taste Profile, single leading family (Electronic/Dance) -> corrected 'connect through' copy, no article",
    taste?.headlineTemplate === "Electronic/Dance leads the mix" &&
      taste?.supportingText === "More of your picks connect through Electronic/Dance than any other sound.",
    `${taste?.headlineTemplate} | ${taste?.supportingText}`
  );
}
{
  // Direct proof the sample side searches every family, not just the user's winning
  // one: draw the real 500-sample distribution (via the real exported
  // buildStorySeed/drawSamples) for a real attendance scope, then compare — for every
  // sample — its own true maximum family-presence rate (what production now uses)
  // against what its rate would have been for one arbitrarily fixed family alone (Pop
  // — what the old bug effectively used). The max can never be less than any single
  // family's rate by definition; the real question is whether it's actually *greater*
  // for a meaningful share of samples, proving the search changes the comparison
  // distribution rather than being a no-op.
  const eligibleForProof = allArtists;
  const sampleSize = 15;
  const seed = buildStorySeed(ACTIVE_FESTIVAL_ID, ALL_DAYS, sampleSize, eligibleForProof.map((a) => a.slug));
  const proofSamples = drawSamples(eligibleForProof, sampleSize, SAMPLE_COUNT_FOR_PROOF, seed);
  const fixedFamilyRate = (artists: Artist[]) =>
    artists.length === 0 ? 0 : (artists.filter((a) => a.genres.some((g) => GENRE_TO_FAMILY[g] === "Pop")).length / artists.length) * 100;
  const trueMaxFamilyRate = (artists: Artist[]) => {
    const presence: Record<string, number> = {};
    artists.forEach((a) => new Set(a.genres.map((g) => GENRE_TO_FAMILY[g])).forEach((f) => (presence[f] = (presence[f] ?? 0) + 1)));
    const max = Math.max(0, ...Object.values(presence));
    return artists.length === 0 ? 0 : (max / artists.length) * 100;
  };
  let strictlyHigherCount = 0;
  let everLowerCount = 0;
  for (const s of proofSamples) {
    const fixed = fixedFamilyRate(s);
    const max = trueMaxFamilyRate(s);
    if (max > fixed) strictlyHigherCount++;
    if (max < fixed) everLowerCount++;
  }
  check(
    "the true per-sample maximum (searched across all families) is never less than a single fixed family's rate, and is strictly greater for a meaningful share of samples — proving the comparison distribution actually changed, not a no-op",
    everLowerCount === 0 && strictlyHigherCount / proofSamples.length >= 0.2,
    `strictlyHigher=${strictlyHigherCount}/${proofSamples.length}, everLower=${everLowerCount}`
  );
}
{
  // Two-way tie
  const pool: Artist[] = [
    ...Array.from({ length: 3 }, () => fixtureArtist("Thursday", { genres: ["Pop"] })),
    ...Array.from({ length: 3 }, () => fixtureArtist("Thursday", { genres: ["Country"] })),
    ...Array.from({ length: 4 }, () => fixtureArtist("Thursday", { genres: ["House"] })),
  ];
  const picks = [...pool.slice(0, 3), ...pool.slice(3, 6)]; // 3 Pop + 3 Folk, tied at 3 each
  const signals = run(["Thursday"], decisionsFor(picks.map((a) => a.slug), "mustSee"), pool);
  const taste = findType(signals, "genreAffinity");
  check("two-way leading-family tie -> tied Taste Profile copy, names both families", taste?.headlineTemplate === "Your leading sounds" && (taste?.supportingText.includes("Folk/Americana/Country and Pop") ?? false), taste?.supportingText);
}
{
  // Three-way tie
  const pool: Artist[] = [
    ...Array.from({ length: 2 }, () => fixtureArtist("Thursday", { genres: ["Pop"] })),
    ...Array.from({ length: 2 }, () => fixtureArtist("Thursday", { genres: ["Country"] })),
    ...Array.from({ length: 2 }, () => fixtureArtist("Thursday", { genres: ["House"] })),
    ...Array.from({ length: 2 }, () => fixtureArtist("Thursday", { genres: ["Hip-Hop"] })),
  ];
  const picks = pool.slice(0, 6); // 2 Pop + 2 Folk + 2 House, tied at 2 each
  const signals = run(["Thursday"], decisionsFor(picks.map((a) => a.slug), "mustSee"), pool);
  const taste = findType(signals, "genreAffinity");
  check(
    "three-way leading-family tie -> tied Taste Profile copy, names all three families",
    taste?.headlineTemplate === "Your leading sounds" &&
      (taste?.supportingText.includes("Electronic/Dance, Folk/Americana/Country, and Pop") ?? false),
    taste?.supportingText
  );
}
{
  // Four-way tie -> capped at 3 named families, "and 1 more"
  const pool: Artist[] = [
    ...Array.from({ length: 2 }, () => fixtureArtist("Thursday", { genres: ["Pop"] })),
    ...Array.from({ length: 2 }, () => fixtureArtist("Thursday", { genres: ["Country"] })),
    ...Array.from({ length: 2 }, () => fixtureArtist("Thursday", { genres: ["House"] })),
    ...Array.from({ length: 2 }, () => fixtureArtist("Thursday", { genres: ["Hip-Hop"] })),
  ];
  const picks = pool; // all 8, tied at 2 each across 4 families
  const signals = run(["Thursday"], decisionsFor(picks.map((a) => a.slug), "mustSee"), pool);
  const taste = findType(signals, "genreAffinity");
  check(
    "four-way leading-family tie -> capped at 3 named families plus 'and 1 more'",
    taste?.headlineTemplate === "Your leading sounds" &&
      taste?.supportingText === "Electronic/Dance, Folk/Americana/Country, Hip-Hop/Rap, and 1 more are running neck and neck across your festival picks.",
    taste?.supportingText
  );
}
{
  // Five-way tie -> still capped at 3 named families, "and 2 more"
  const pool: Artist[] = [
    ...Array.from({ length: 2 }, () => fixtureArtist("Thursday", { genres: ["Pop"] })),
    ...Array.from({ length: 2 }, () => fixtureArtist("Thursday", { genres: ["Country"] })),
    ...Array.from({ length: 2 }, () => fixtureArtist("Thursday", { genres: ["House"] })),
    ...Array.from({ length: 2 }, () => fixtureArtist("Thursday", { genres: ["Hip-Hop"] })),
    ...Array.from({ length: 2 }, () => fixtureArtist("Thursday", { genres: ["Funk"] })),
  ];
  const picks = pool; // all 10, tied at 2 each across 5 families
  const signals = run(["Thursday"], decisionsFor(picks.map((a) => a.slug), "mustSee"), pool);
  const taste = findType(signals, "genreAffinity");
  check(
    "five-way leading-family tie -> still capped at 3 named families, 'and 2 more', headline stays readable",
    taste?.headlineTemplate === "Your leading sounds" &&
      taste?.supportingText === "Electronic/Dance, Folk/Americana/Country, Hip-Hop/Rap, and 2 more are running neck and neck across your festival picks.",
    taste?.supportingText
  );
}
{
  // No genre data at all -> defensive fallback, must not claim the picks "span a mix
  // of styles" (a false claim when the real condition is missing information).
  const pool: Artist[] = Array.from({ length: 6 }, () => fixtureArtist("Thursday", { genres: [] }));
  const signals = run(["Thursday"], decisionsFor(pool.map((a) => a.slug), "mustSee"), pool);
  const taste = findType(signals, "genreAffinity");
  check(
    "no genre data on any pick -> defensive fallback names the real condition (missing info, not a taste claim)",
    taste?.headlineTemplate === "Still tuning the frequency" &&
      taste?.supportingText === "Keep exploring and your taste profile will become clearer.",
    `${taste?.headlineTemplate} | ${taste?.supportingText}`
  );
}
{
  // Determinism + no dependency on object-key order: run the exact same tie scenario
  // twice, and once more with the fixture artists constructed in reverse order.
  const poolA: Artist[] = [
    ...Array.from({ length: 3 }, () => fixtureArtist("Thursday", { genres: ["Pop"] })),
    ...Array.from({ length: 3 }, () => fixtureArtist("Thursday", { genres: ["Country"] })),
  ];
  const poolB: Artist[] = [
    ...Array.from({ length: 3 }, () => fixtureArtist("Thursday", { genres: ["Country"] })),
    ...Array.from({ length: 3 }, () => fixtureArtist("Thursday", { genres: ["Pop"] })),
  ];
  const signalsA = run(["Thursday"], decisionsFor(poolA.map((a) => a.slug), "mustSee"), poolA);
  const signalsB = run(["Thursday"], decisionsFor(poolB.map((a) => a.slug), "mustSee"), poolB);
  const tasteA = findType(signalsA, "genreAffinity");
  const tasteB = findType(signalsB, "genreAffinity");
  check(
    "tied-family output does not depend on construction/object order",
    tasteA?.supportingText === tasteB?.supportingText,
    `A="${tasteA?.supportingText}" B="${tasteB?.supportingText}"`
  );
}

console.log("\n========== DAY SIGNAL: SELECTION-ADJUSTED ==========\n");

{
  const picks = allArtists.filter((a) => getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ["Friday"]) !== undefined).slice(0, 8);
  const signals = run(["Friday"], decisionsFor(picks.map((a) => a.slug), "mustSee"));
  check("one selected attendance day -> no day interpretive signal", !dims(signals).includes("day"), dims(signals).join(","));
}
{
  const thuArtists = allArtists.filter((a) => getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ["Thursday", "Sunday"])?.day === "Thursday");
  const sunArtists = allArtists.filter((a) => getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ["Thursday", "Sunday"])?.day === "Sunday");
  const signals = run(["Thursday", "Sunday"], decisionsFor([...thuArtists.slice(0, 8), ...sunArtists.slice(0, 1)].map((a) => a.slug), "mustSee"));
  check("nonconsecutive selected days (Thu+Sun) supported for day signal", signals.length === 4);
}
{
  // The documented bug scenario, constructed exactly (real festival data is too
  // evenly distributed by day — 42-44 artists/day — to produce this pattern
  // naturally, and the eligible pool needs enough size for the sampling distribution
  // to be statistically discriminating, not just directionally correct). Day A
  // (Thursday) is 80% of a 50-artist eligible pool, Day B (Friday) is 20%. Picks: 12
  // on Thursday (raw-leading, 60% of the 20 picks) but that UNDER-indexes Thursday's
  // 80% baseline (-20pp). 8 on Friday (40% of picks) OVER-indexes Friday's 20%
  // baseline (+20pp) — the real, meaningful signal, on the day with fewer raw picks.
  const dayPool: Artist[] = [
    ...Array.from({ length: 40 }, () => fixtureArtist("Thursday")),
    ...Array.from({ length: 10 }, () => fixtureArtist("Friday")),
  ];
  const picks = [...dayPool.slice(0, 12), ...dayPool.slice(40, 48)]; // 12 Thursday + 8 Friday
  const signals = run(["Thursday", "Friday"], decisionsFor(picks.map((a) => a.slug), "mustSee"), dayPool);
  const day = findType(signals, "day");
  check(
    "raw-leading day (Thursday, 12 of 20 picks) under-indexes its 80% baseline; Friday (8 of 20 picks) over-indexes its 20% baseline -> Friday is selected, not Thursday",
    day?.headlineTemplate === "Friday takes center stage",
    day?.headlineTemplate ?? dims(signals).join(",")
  );
}
{
  // Same 80/20 baseline pool, but picks proportional to that baseline (not a
  // meaningful preference) -> no day card, from either day.
  const dayPool: Artist[] = [
    ...Array.from({ length: 40 }, () => fixtureArtist("Thursday")),
    ...Array.from({ length: 10 }, () => fixtureArtist("Friday")),
  ];
  const proportionalPicks = [...dayPool.slice(0, 16), ...dayPool.slice(40, 44)]; // 16 Thu + 4 Fri = exactly 80/20
  const signals = run(["Thursday", "Friday"], decisionsFor(proportionalPicks.map((a) => a.slug), "mustSee"), dayPool);
  check(
    "picks proportional to the eligible baseline -> no day card (explained by baseline, not preference)",
    !dims(signals).includes("day"),
    dims(signals).join(",")
  );
}
{
  const eligible = getEligibleArtists(ACTIVE_FESTIVAL_ID, ["Thursday", "Friday"], allArtists);
  const devaultAppearance = getSelectedDayAppearance(eligible.find((a) => a.slug === "devault")!, ACTIVE_FESTIVAL_ID, ["Thursday", "Friday"]);
  check("devault (multi-appearance) resolves to exactly one day for the day signal", devaultAppearance?.day === "Thursday", devaultAppearance?.day);
}

console.log("\n========== SAMPLING SEED STABILITY ==========\n");

{
  const eligibleSlugs = allArtists.slice(0, 30).map((a) => a.slug);
  const seed1 = buildStorySeed(ACTIVE_FESTIVAL_ID, ["Friday"], 6, eligibleSlugs);
  const seed2 = buildStorySeed(ACTIVE_FESTIVAL_ID, ["Friday"], 6, eligibleSlugs);
  check("identical scope/sample-size/eligible-lineup -> identical seed (deterministic)", seed1 === seed2);
}
{
  // Same festival/scope/eligible-lineup/pick-count, but exercised through
  // computeStorySignals with two entirely different sets of specific picked
  // artists (same size) -> the seed (and therefore the comparison distribution)
  // must be identical regardless of *which* artists were picked.
  const eligible = getEligibleArtists(ACTIVE_FESTIVAL_ID, ALL_DAYS, allArtists);
  const picksA = shuffled(eligible, 41).slice(0, 15).map((a) => a.slug);
  const picksB = shuffled(eligible, 42).slice(0, 15).map((a) => a.slug);
  check("fixture: two independently-shuffled 15-artist pick sets are actually different", JSON.stringify([...picksA].sort()) !== JSON.stringify([...picksB].sort()));
  const eligibleSlugsSorted = [...eligible.map((a) => a.slug)];
  const seedA = buildStorySeed(ACTIVE_FESTIVAL_ID, ALL_DAYS, picksA.length, eligibleSlugsSorted);
  const seedB = buildStorySeed(ACTIVE_FESTIVAL_ID, ALL_DAYS, picksB.length, eligibleSlugsSorted);
  check("same scope/sample-size/eligible-lineup produces the same seed regardless of which artists were picked", seedA === seedB);
}
{
  const eligibleSlugs = allArtists.slice(0, 30).map((a) => a.slug);
  const seedThu = buildStorySeed(ACTIVE_FESTIVAL_ID, ["Thursday"], 6, eligibleSlugs);
  const seedFri = buildStorySeed(ACTIVE_FESTIVAL_ID, ["Friday"], 6, eligibleSlugs);
  check("different attendance scope changes the seed", seedThu !== seedFri);
}
{
  const eligibleSlugs = allArtists.slice(0, 30).map((a) => a.slug);
  const seed6 = buildStorySeed(ACTIVE_FESTIVAL_ID, ["Friday"], 6, eligibleSlugs);
  const seed7 = buildStorySeed(ACTIVE_FESTIVAL_ID, ["Friday"], 7, eligibleSlugs);
  check("different sample size changes the seed", seed6 !== seed7);
}
{
  const seedSmall = buildStorySeed(ACTIVE_FESTIVAL_ID, ["Friday"], 6, allArtists.slice(0, 30).map((a) => a.slug));
  const seedLarge = buildStorySeed(ACTIVE_FESTIVAL_ID, ["Friday"], 6, allArtists.slice(0, 31).map((a) => a.slug));
  check("different eligible-lineup fingerprint changes the seed", seedSmall !== seedLarge);
}
{
  const decisions = decisionsFor(shuffled(allArtists, 55).slice(0, 30).map((a) => a.slug), "mustSee");
  const r1 = run(ALL_DAYS, decisions);
  const r2 = run(ALL_DAYS, decisions);
  const r3 = run(ALL_DAYS, decisions);
  check("identical inputs produce byte-identical cards, copy, and order across repeated calls", JSON.stringify(r1) === JSON.stringify(r2) && JSON.stringify(r2) === JSON.stringify(r3));
}
{
  const decisions = decisionsFor(shuffled(allArtists, 55).slice(0, 30).map((a) => a.slug), "mustSee");
  const r1 = run(ALL_DAYS, decisions);
  const r2 = run(["Thursday", "Friday"], decisions);
  check("changing attendance scope changes the computed Story", JSON.stringify(r1) !== JSON.stringify(r2));
}

console.log("\n========== SELECTION CONTRACT ==========\n");

{
  const scenarios: Record<string, ArtistDecision>[] = [
    decisionsFor(allArtists.slice(0, 5).map((a) => a.slug), "mustSee"),
    decisionsFor(shuffled(allArtists, 1).slice(0, 15).map((a) => a.slug), "mustSee"),
    decisionsFor(shuffled(allArtists, 2).slice(0, 40).map((a) => a.slug), "interested"),
    decisionsFor(shuffled(allArtists, 3).slice(0, 80).map((a) => a.slug), "mustSee"),
  ];
  let allExactlyFour = true;
  let allHaveDecisionProfileLast = true;
  let allHaveGenreAffinityFirst = true;
  let anyDuplicateDims = false;
  for (const decisions of scenarios) {
    const signals = run(ALL_DAYS, decisions);
    if (signals.length !== 4) allExactlyFour = false;
    if (signals[3]?.type !== "decisionProfile") allHaveDecisionProfileLast = false;
    if (signals[0]?.type !== "genreAffinity") allHaveGenreAffinityFirst = false;
    const types = signals.map((s) => s.type);
    if (new Set(types).size !== types.length) anyDuplicateDims = true;
  }
  check("every eligible normal Story has exactly 4 insights", allExactlyFour);
  check("Decision Profile is always included and always the final insight", allHaveDecisionProfileLast);
  check("Taste/genreAffinity is always the first insight", allHaveGenreAffinityFirst);
  check("no duplicate dimensions within any single Story", !anyDuplicateDims);
  check("no journeySummary dimension anywhere", scenarios.every((d) => !dims(run(ALL_DAYS, d)).includes("journeySummary")));
}
{
  const intlArtists = allArtists.filter((a) => a.location.country !== "United States");
  const signals = run(ALL_DAYS, decisionsFor(shuffled(intlArtists, 9).slice(0, 15).map((a) => a.slug), "mustSee"));
  const hasIntl = dims(signals).includes("international");
  const hasCountry = dims(signals).includes("countryDiversity");
  check("international and countryDiversity are never both selected", !(hasIntl && hasCountry), dims(signals).join(","));
}
{
  const edmOnly = allArtists.filter((a) => a.genres.length > 0 && a.genres.every((g) => GENRE_TO_FAMILY[g] === "Electronic/Dance"));
  const picked: Artist[] = edmOnly.slice(0, 20);
  const signals = run(ALL_DAYS, decisionsFor(picked.map((a) => a.slug), "mustSee"));
  const taste = findType(signals, "genreAffinity");
  const breadth = findType(signals, "genreBreadth");
  check("genreAffinity(strong) and genreBreadth can coexist in the same Story", taste?.lineupValue !== undefined && !!breadth, dims(signals).join(","));
}

console.log("\n========== COPY: DECISION PROFILE BOUNDARIES ==========\n");

{
  const pool = shuffled(allArtists, 99);
  function decisionProfileFor(mustSeeCount: number, interestedCount: number) {
    const decisions = {
      ...decisionsFor(pool.slice(0, mustSeeCount).map((a) => a.slug), "mustSee"),
      ...decisionsFor(pool.slice(mustSeeCount, mustSeeCount + interestedCount).map((a) => a.slug), "interested"),
    };
    return findType(run(ALL_DAYS, decisions), "decisionProfile");
  }

  check("5 picks (5/0) -> restrained copy", decisionProfileFor(5, 0)?.headlineTemplate === "Your picks are taking shape", decisionProfileFor(5, 0)?.headlineTemplate);
  check("7 picks (mixed) -> restrained copy", decisionProfileFor(4, 3)?.headlineTemplate === "Your picks are taking shape", decisionProfileFor(4, 3)?.headlineTemplate);

  // 8 picks at 25% (2/8), 40% (not achievable at exactly 8 with integers close: use 3/8=37.5%), 60% (5/8=62.5%... need exact boundary values)
  check("8 picks at 25% Must See (2/8) -> Interested-heavy copy", decisionProfileFor(2, 6)?.headlineTemplate === "Scouting mode active", decisionProfileFor(2, 6)?.headlineTemplate);
  check("8 picks at 75% Must See (6/8) -> Must-See-heavy copy", decisionProfileFor(6, 2)?.headlineTemplate === "Heavy on the non-negotiables", decisionProfileFor(6, 2)?.headlineTemplate);

  // Use a 10-pick pool for clean 40%/60% boundary values.
  check("10 picks at 40% Must See (4/10, near-even boundary) -> near-even copy", decisionProfileFor(4, 6)?.headlineTemplate === "Balanced between priority and curiosity", decisionProfileFor(4, 6)?.headlineTemplate);
  check("10 picks at 60% Must See (6/10, near-even boundary) -> near-even copy", decisionProfileFor(6, 4)?.headlineTemplate === "Balanced between priority and curiosity", decisionProfileFor(6, 4)?.headlineTemplate);
  check("10 picks at 50% Must See -> near-even copy", decisionProfileFor(5, 5)?.headlineTemplate === "Balanced between priority and curiosity", decisionProfileFor(5, 5)?.headlineTemplate);

  // Middle-leaning branches: use a pool size that isn't a multiple of the extreme
  // floor's pick count coincidentally, e.g. 11 picks.
  check("11 picks at ~64% Must See (7/11, Must-See-leaning middle) -> shortlist copy", decisionProfileFor(7, 4)?.headlineTemplate === "Priorities set, curiosity intact", decisionProfileFor(7, 4)?.headlineTemplate);
  check("11 picks at ~36% Must See (4/11, Interested-leaning middle) -> discovery copy", decisionProfileFor(4, 7)?.headlineTemplate === "Room for discovery", decisionProfileFor(4, 7)?.headlineTemplate);

  const extreme9 = decisionProfileFor(8, 1); // 9 total, 88.9% -> heavy but not extreme (count<10)
  check("9 picks at ~89% Must See -> heavy but NOT extreme (below the 10-pick floor)", extreme9?.headlineTemplate === "Heavy on the non-negotiables", extreme9?.headlineTemplate);

  const extreme10 = decisionProfileFor(9, 1); // 10 total, 90% -> extreme
  check("10 picks at 90% Must See -> extreme copy", extreme10?.headlineTemplate === "Zero hesitation", extreme10?.headlineTemplate);

  const extremeInterested10 = decisionProfileFor(1, 9); // 10 total, 10% Must See -> extreme interested
  check("10 picks at 10% Must See -> extreme Interested copy", extremeInterested10?.headlineTemplate === "Keeping every door wide open", extremeInterested10?.headlineTemplate);
}

console.log("\n========== COPY: PLURALIZATION AND DEPRECATED PHRASES ==========\n");

{
  // Billing pluralization combinations: 1/1/1, 2/1/1, 1/2/1, mixed
  const headliners = allArtists.filter((a) => getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ALL_DAYS)?.billingTier === "Headliner");
  const subHeadliners = allArtists.filter((a) => getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ALL_DAYS)?.billingTier === "Sub-headliner");
  const undercard = allArtists.filter((a) => {
    const t = getSelectedDayAppearance(a, ACTIVE_FESTIVAL_ID, ALL_DAYS)?.billingTier;
    return t !== "Headliner" && t !== "Sub-headliner";
  });
  // Deliberately balanced (no direction qualifies) so the safe copy renders: 1
  // headliner, 1 sub-headliner, 3 undercard.
  const picks = [...headliners.slice(0, 1), ...subHeadliners.slice(0, 1), ...shuffled(undercard, 61).slice(0, 3)];
  const signals = run(ALL_DAYS, decisionsFor(picks.map((a) => a.slug), "mustSee"));
  const billing = findType(signals, "billing");
  check(
    "billing safe copy pluralizes each category independently",
    billing?.supportingText === "1 headliner, 1 sub-headliner, and 3 undercard acts make up your current list.",
    billing?.supportingText
  );
}
{
  const DEPRECATED_PHRASES = [
    "hidden gems",
    "crossed oceans",
    "your stage and stayed there",
    "plenty more to reveal",
    "you came with a plan",
    "Perfectly balanced",
    "what your lineup says about you",
  ];
  const scenarios: Record<string, ArtistDecision>[] = [
    decisionsFor(allArtists.slice(0, 5).map((a) => a.slug), "mustSee"),
    decisionsFor(shuffled(allArtists, 1).slice(0, 15).map((a) => a.slug), "mustSee"),
    decisionsFor(shuffled(allArtists, 4).slice(0, 8).map((a) => a.slug), "mustSee"),
    decisionsFor(shuffled(allArtists, 6).slice(0, 60).map((a) => a.slug), "interested"),
  ];
  const allText: string[] = [];
  for (const decisions of scenarios) {
    for (const s of run(ALL_DAYS, decisions)) {
      allText.push(s.headlineTemplate, s.supportingText);
    }
  }
  for (const phrase of DEPRECATED_PHRASES) {
    check(`deprecated phrase absent: "${phrase}"`, !allText.some((t) => t.includes(phrase)));
  }
}

console.log("\n========== ROBUSTNESS ==========\n");

{
  const scenarios = [
    decisionsFor(allArtists.slice(0, 5).map((a) => a.slug), "mustSee"),
    decisionsFor(shuffled(allArtists, 71).slice(0, 60).map((a) => a.slug), "mustSee"),
  ];
  let allFinite = true;
  for (const decisions of scenarios) {
    const signals = run(ALL_DAYS, decisions);
    for (const s of signals) {
      for (const v of [s.userValue, s.lineupValue, s.deviation]) {
        if (v !== undefined && !Number.isFinite(v)) allFinite = false;
      }
    }
  }
  check("no NaN/Infinity anywhere in userValue/lineupValue/deviation across scenarios", allFinite);
}

console.log(`\n${checks} checks run. ${failures === 0 ? "ALL PASS" : `${failures} FAILURE(S)`}`);
process.exit(failures > 0 ? 1 : 0);
