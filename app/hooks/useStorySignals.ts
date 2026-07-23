import { useMemo } from "react";
import type { Artist, FestivalAppearance } from "@/app/types/artist";
import type { ArtistDecision } from "@/app/store/decisionStore";
import { GENRE_TO_FAMILY } from "@/app/data/categories";
import type { GenreFamily } from "@/app/data/categories";
import { getSelectedDayAppearance } from "@/app/lib/appearances";
import {
  buildStorySeed,
  drawSamples,
  computeExtremeness,
  sampleMean,
  type SignalDirection,
} from "@/app/lib/story-sampling";

export interface StorySignal {
  type: string;
  headlineTemplate: string;
  supportingText: string;
  // Comparative signals only — the user's rate and the lineup baseline it was
  // compared against. Omitted for non-comparative signals (decisionProfile) and for
  // signal types with no single natural baseline. Kept for debugging/validation, not
  // rendered directly by FestivalStoryCard.
  userValue?: number;
  lineupValue?: number;
  deviation?: number;
}

export interface ComputeStorySignalsParams {
  festivalId: string;
  // The attendance days that scope this Story — must be the launching Quick Picks
  // session's captured snapshot, not necessarily whatever is currently persisted in
  // attendanceStore (see ARCHITECTURE.md § Quick Picks Attendance and § Festival
  // Story). Pure input — this function never reads Zustand state itself.
  attendanceDays: string[];
  allArtists: Artist[];
  decisionsByArtist: Record<string, ArtistDecision>;
}

// ============================================================================
// Product-level thresholds — centralized here, not scattered through card
// construction. See ARCHITECTURE.md § Festival Story for the full rationale.
// ============================================================================

// Product floor: below this many valid positive picks, Festival Story stays locked
// (see getValidPositivePicks/getEligibleArtists below, used by Quick Picks completion
// to decide whether to offer the Story at all).
export const MIN_POSITIVE_PICKS_FOR_STORY = 5;

// Deterministic sample-aware comparison (replaces a fixed universal percentage-point
// "noise floor"): how many random same-size subsets of the eligible lineup to draw,
// and how rare the user's real result must be among them to count as a real pattern
// rather than sampling noise from picking a subset of the lineup.
const SAMPLE_COUNT = 500;
const EXTREMENESS_THRESHOLD = 0.1; // no more than ~10% of random subsets did as well
// Minimum percentage-point gap from the random-subset average, shared by every
// rate-based comparative signal — a result can be statistically rare and still be
// practically trivial (e.g. 1pp), which must not produce dramatic copy.
const PRACTICAL_EFFECT_MIN_PP = 10;

// Extra observed-count floors: statistical rarity alone is not enough for these — a
// tiny raw count (e.g. one Chicago pick) shouldn't drive a "this defines you" claim
// even if it happens to be statistically unusual for the sample size.
const GENRE_AFFINITY_MIN_PICKS = 2;
const HOMETOWN_MIN_PICKS = 2;
const HOMETOWN_STRONG_MIN_PICKS = 4; // below this, use the moderate (non-"biggest fan") copy
const INTERNATIONAL_MIN_PICKS = 1;
const DAY_MIN_ATTENDANCE_DAYS = 2; // no day signal for a single-day session
const DAY_TOP_DAY_MIN_PICKS = 2;

// Decision Profile thresholds
const DECISION_PROFILE_RESTRAINED_MAX_PICKS = 7; // 5-7 picks: no "personality" claim
const DECISION_PROFILE_MUST_SEE_HEAVY = 0.75;
const DECISION_PROFILE_INTERESTED_HEAVY = 0.25;
const DECISION_PROFILE_NEAR_EVEN_MIN = 0.4; // 40%-60% inclusive: near-even
const DECISION_PROFILE_NEAR_EVEN_MAX = 0.6;
const DECISION_PROFILE_EXTREME_MUST_SEE = 0.9;
const DECISION_PROFILE_EXTREME_INTERESTED = 0.1;
const DECISION_PROFILE_EXTREME_MIN_PICKS = 10;

// Curated presentation order for the 4 selected cards. Selection (which dimensions
// qualify) is driven entirely by the statistics below; this list only decides display
// order afterward. genreAffinity and decisionProfile are the two fixed anchors
// (always first and always last respectively) but are included here so this is one
// complete, self-documenting ordering reference rather than two separate rules.
const DIMENSION_DISPLAY_PRIORITY = [
  "genreAffinity",
  "billing",
  "stage",
  "day",
  "genreBreadth",
  "hometown",
  "international",
  "countryDiversity",
  "decisionProfile",
];

// ============================================================================
// Attendance-scoped eligibility — single source of truth for "who is eligible" and
// "which decisions count," shared by computeStorySignals and by Quick Picks
// completion (to decide whether to unlock the Festival Story card at all).
// ============================================================================

export function getEligibleArtists(
  festivalId: string,
  attendanceDays: string[],
  allArtists: Artist[]
): Artist[] {
  return allArtists.filter((a) => getSelectedDayAppearance(a, festivalId, attendanceDays) !== undefined);
}

// Forward-constructed (real Artist -> decision lookup), so stale decision slugs and
// artists whose only appearances fall outside the selected days are silently
// excluded rather than special-cased. A decision counts regardless of its source
// (Quick Picks, Explore, Artist Detail) as long as it's mustSee/interested and the
// artist is in the attendance-scoped eligible pool; "passed" never counts.
export function getValidPositivePicks(
  festivalId: string,
  attendanceDays: string[],
  allArtists: Artist[],
  decisionsByArtist: Record<string, ArtistDecision>
): Artist[] {
  const eligibleArtists = getEligibleArtists(festivalId, attendanceDays, allArtists);
  return eligibleArtists.filter((a) => {
    const decision = decisionsByArtist[a.slug];
    return !!decision && (decision.verdict === "mustSee" || decision.verdict === "interested");
  });
}

// ============================================================================
// Internal candidate representation
// ============================================================================

interface Candidate {
  type: string;
  headlineTemplate: string;
  supportingText: string;
  userValue?: number;
  lineupValue?: number;
  deviation?: number;
  // Ranking only — never rendered. 1 marks a non-comparative or safe/fallback
  // candidate, which can still fill a slot but always loses to any real qualifying
  // candidate (extremeness <= EXTREMENESS_THRESHOLD).
  extremeness: number;
  practicalEffectPP: number;
}

function toStorySignal(c: Candidate): StorySignal {
  return {
    type: c.type,
    headlineTemplate: c.headlineTemplate,
    supportingText: c.supportingText,
    userValue: c.userValue,
    lineupValue: c.lineupValue,
    deviation: c.deviation,
  };
}

interface CandidateEvaluation {
  mean: number;
  extremeness: number;
  practicalEffectPP: number;
  qualifies: boolean;
}

function evaluateCandidate(
  observedValue: number,
  sampleValues: number[],
  direction: SignalDirection,
  practicalMinPP: number = PRACTICAL_EFFECT_MIN_PP
): CandidateEvaluation {
  const mean = sampleMean(sampleValues);
  const extremeness = computeExtremeness(observedValue, sampleValues, direction);
  const practicalEffectPP = direction === "high" ? observedValue - mean : mean - observedValue;
  return {
    mean,
    extremeness,
    practicalEffectPP,
    qualifies: extremeness <= EXTREMENESS_THRESHOLD && practicalEffectPP >= practicalMinPP,
  };
}

function pluralize(count: number, singular: string, plural: string = `${singular}s`): string {
  return count === 1 ? singular : plural;
}

// Deterministic, alphabetical (never dependent on any object's own key-iteration
// order) formatting for a tied set of genre family names. Capped at 3 named families
// so a rare 4+-way tie can't produce an unreadably long headline — "and N more"
// covers the rest while staying grammatically correct and deterministic.
const MAX_NAMED_FAMILIES = 3;
function formatFamilyList(names: string[]): string {
  const sorted = [...names].sort();
  if (sorted.length === 0) return "";
  if (sorted.length === 1) return sorted[0];
  if (sorted.length <= MAX_NAMED_FAMILIES) {
    if (sorted.length === 2) return `${sorted[0]} and ${sorted[1]}`;
    return `${sorted.slice(0, -1).join(", ")}, and ${sorted[sorted.length - 1]}`;
  }
  const shown = sorted.slice(0, MAX_NAMED_FAMILIES);
  const remaining = sorted.length - MAX_NAMED_FAMILIES;
  return `${shown.join(", ")}, and ${remaining} more`;
}

// ============================================================================
// Aggregate metrics — computed identically for the user's real picks and for every
// random sample, so the comparison is always apples-to-apples and every metric a
// signal might need is available from one pass over an artist array.
//
// maxFamilyRate deliberately searches across *every* genre family present in this
// specific artist set (not a single fixed family) — both the observed picks and each
// individual sample must run the identical "which family leads in this set" search,
// or the comparison would be biased (see computeStorySignals' Taste Profile section).
// ============================================================================

interface AggregateMetrics {
  headlinerRate: number; // % Headliner|Sub-headliner
  chicagoCount: number;
  chicagoRate: number;
  internationalCount: number;
  internationalRate: number;
  maxFamilyRate: number; // % in *this set's own* leading genre family
  stageCount: number;
  stageRate: number; // % of the eligible lineup's distinct stages
  genreCount: number;
  genreRate: number; // % of the eligible lineup's distinct genres
  countryCount: number;
  countryRate: number; // % of the eligible lineup's distinct countries
  dayRate: Record<string, number>; // % of this set on each attended day
}

function computeAggregateMetrics(
  artists: Artist[],
  appearanceOf: (artist: Artist) => FestivalAppearance,
  attendanceDays: string[],
  lineupStageCount: number,
  lineupGenreCount: number,
  lineupCountryCount: number
): AggregateMetrics {
  const n = artists.length;
  let headliner = 0;
  let chicago = 0;
  let international = 0;
  const stages = new Set<string>();
  const genres = new Set<string>();
  const countries = new Set<string>();
  const dayCounts: Record<string, number> = {};
  const familyPresence: Partial<Record<GenreFamily, number>> = {};

  for (const artist of artists) {
    const appearance = appearanceOf(artist);
    if (appearance.billingTier === "Headliner" || appearance.billingTier === "Sub-headliner") headliner++;
    if (artist.location.city === "Chicago") chicago++;
    if (artist.location.country !== "United States") international++;
    stages.add(appearance.stage);
    artist.genres.forEach((g) => genres.add(g));
    countries.add(artist.location.country);
    dayCounts[appearance.day] = (dayCounts[appearance.day] ?? 0) + 1;

    // Each family this artist has at least one genre in counts once, regardless of
    // how many of the artist's genres belong to it.
    const familiesForArtist = new Set(artist.genres.map((g) => GENRE_TO_FAMILY[g]));
    familiesForArtist.forEach((family) => {
      familyPresence[family] = (familyPresence[family] ?? 0) + 1;
    });
  }

  const maxFamilyCount = Math.max(0, ...Object.values(familyPresence));

  const dayRate: Record<string, number> = {};
  for (const day of attendanceDays) {
    dayRate[day] = n === 0 ? 0 : ((dayCounts[day] ?? 0) / n) * 100;
  }

  return {
    headlinerRate: n === 0 ? 0 : (headliner / n) * 100,
    chicagoCount: chicago,
    chicagoRate: n === 0 ? 0 : (chicago / n) * 100,
    internationalCount: international,
    internationalRate: n === 0 ? 0 : (international / n) * 100,
    maxFamilyRate: n === 0 ? 0 : (maxFamilyCount / n) * 100,
    stageCount: stages.size,
    stageRate: lineupStageCount === 0 ? 0 : (stages.size / lineupStageCount) * 100,
    genreCount: genres.size,
    genreRate: lineupGenreCount === 0 ? 0 : (genres.size / lineupGenreCount) * 100,
    countryCount: countries.size,
    countryRate: lineupCountryCount === 0 ? 0 : (countries.size / lineupCountryCount) * 100,
    dayRate,
  };
}

// ============================================================================
// Single source of truth for Festival Story's signal computation. Pure function —
// takes every input explicitly (festival, attendance scope, lineup, decisions) and
// never reads Zustand state itself, so it stays directly testable and the caller
// controls exactly which attendance scope applies (see ARCHITECTURE.md § Festival
// Story). useStorySignals below is a thin useMemo wrapper.
// ============================================================================

export function computeStorySignals(params: ComputeStorySignalsParams): StorySignal[] {
  const { festivalId, attendanceDays, allArtists, decisionsByArtist } = params;

  const eligibleArtists = getEligibleArtists(festivalId, attendanceDays, allArtists);
  const pickedArtists = getValidPositivePicks(festivalId, attendanceDays, allArtists, decisionsByArtist);

  // Product floor — below this, Festival Story does not run at all. Callers (Quick
  // Picks completion) should already be gating on this via getValidPositivePicks, but
  // this is enforced here too as a defensive guard against any other caller.
  if (pickedArtists.length < MIN_POSITIVE_PICKS_FOR_STORY) {
    return [];
  }

  const appearanceByArtist = new Map<string, FestivalAppearance>();
  for (const artist of eligibleArtists) {
    const appearance = getSelectedDayAppearance(artist, festivalId, attendanceDays);
    if (appearance) appearanceByArtist.set(artist.slug, appearance);
  }
  const appearanceOf = (artist: Artist): FestivalAppearance => appearanceByArtist.get(artist.slug)!;

  // ===== The user's own leading genre family (or families, on a tie) =====
  // Used only for *naming* the family in copy and for the min-picks guard — the
  // statistical comparison itself uses AggregateMetrics.maxFamilyRate (below), which
  // performs the identical "search all families" step for both observed picks and
  // every sample.
  const familyPresence: Partial<Record<GenreFamily, number>> = {};
  pickedArtists.forEach((a) => {
    new Set(a.genres.map((g) => GENRE_TO_FAMILY[g])).forEach((family) => {
      familyPresence[family] = (familyPresence[family] ?? 0) + 1;
    });
  });
  const topFamilyCount = Math.max(0, ...Object.values(familyPresence));
  const leadingFamilies = (Object.keys(familyPresence) as GenreFamily[])
    .filter((f) => familyPresence[f] === topFamilyCount)
    .sort();
  const isFamilyTie = topFamilyCount > 0 && leadingFamilies.length > 1;
  const topFamilyName: GenreFamily = leadingFamilies[0] ?? ("Unknown" as GenreFamily);

  // ===== Lineup-wide denominators (eligible pool only, not the full festival) =====
  const lineupStageCount = new Set(eligibleArtists.map((a) => appearanceOf(a).stage)).size;
  const lineupGenreSet = new Set<string>();
  eligibleArtists.forEach((a) => a.genres.forEach((g) => lineupGenreSet.add(g)));
  const lineupCountrySet = new Set(eligibleArtists.map((a) => a.location.country));

  // ===== Deterministic sample-aware comparison =====
  // Seeded from the comparison universe (festival, attendance, sample size, eligible
  // lineup) only — never from which specific artists were picked. See
  // app/lib/story-sampling.ts.
  const seed = buildStorySeed(
    festivalId,
    attendanceDays,
    pickedArtists.length,
    eligibleArtists.map((a) => a.slug)
  );
  const samples = drawSamples(eligibleArtists, pickedArtists.length, SAMPLE_COUNT, seed);

  const observed = computeAggregateMetrics(
    pickedArtists,
    appearanceOf,
    attendanceDays,
    lineupStageCount,
    lineupGenreSet.size,
    lineupCountrySet.size
  );
  const sampleMetrics = samples.map((s) =>
    computeAggregateMetrics(s, appearanceOf, attendanceDays, lineupStageCount, lineupGenreSet.size, lineupCountrySet.size)
  );

  function values(key: keyof AggregateMetrics): number[] {
    return sampleMetrics.map((m) => m[key] as number);
  }

  const totalPositive = pickedArtists.length;
  const round = (n: number) => Math.round(n);

  // ============================================================================
  // Taste Profile / Genre Affinity — fixed anchor, always the first insight.
  //
  // Selection-adjusted: the observed metric is the user's OWN maximum family-presence
  // rate across every family (AggregateMetrics.maxFamilyRate on `observed`), and each
  // sample's comparison value is that SAME sample's own maximum across every family
  // (AggregateMetrics.maxFamilyRate on each entry in `sampleMetrics`) — never the
  // sample's rate for just the user's winning family. Comparing "the best any random
  // same-size subset could do" against "the best the user's picks did" is the fair
  // test; comparing the sample's rate for one pre-chosen family against the user's
  // maximum would be a biased comparison (searching harder for the observed side).
  // ============================================================================
  let tasteCandidate: Candidate;
  if (topFamilyCount === 0) {
    // Defensive: no picked artist has any genre data at all. This is a data-
    // completeness gap, not a claim about the picks themselves — must not assert the
    // picks "span a mix of styles" when the real condition is insufficient
    // information to say anything about the picks' genre makeup.
    tasteCandidate = {
      type: "genreAffinity",
      headlineTemplate: "There isn't enough genre information to name a leading sound yet",
      supportingText: "Keep exploring and your taste profile will become clearer.",
      extremeness: 1,
      practicalEffectPP: 0,
    };
  } else if (isFamilyTie) {
    // Ties never get the single-family interpretive treatment — naming one family as
    // "the" leader when two or more are genuinely tied would misrepresent the picks.
    tasteCandidate = {
      type: "genreAffinity",
      userValue: observed.maxFamilyRate,
      headlineTemplate: "Your leading sounds",
      supportingText: `${formatFamilyList(leadingFamilies)} shared the lead across your festival picks.`,
      extremeness: 1,
      practicalEffectPP: 0,
    };
  } else {
    const familyEval = evaluateCandidate(observed.maxFamilyRate, values("maxFamilyRate"), "high");
    if (topFamilyCount >= GENRE_AFFINITY_MIN_PICKS && familyEval.qualifies) {
      tasteCandidate = {
        type: "genreAffinity",
        userValue: observed.maxFamilyRate,
        lineupValue: familyEval.mean,
        deviation: familyEval.practicalEffectPP,
        headlineTemplate: `${topFamilyName} connects many of your picks`,
        supportingText: "That pattern is stronger than random picks from your selected-day lineup usually produce.",
        extremeness: familyEval.extremeness,
        practicalEffectPP: familyEval.practicalEffectPP,
      };
    } else {
      tasteCandidate = {
        type: "genreAffinity",
        userValue: observed.maxFamilyRate,
        headlineTemplate: `${topFamilyName} led your festival picks`,
        supportingText: `${topFamilyCount} of your ${totalPositive} picks (${round(observed.maxFamilyRate)}%) connect through ${topFamilyName}.`,
        extremeness: 1,
        practicalEffectPP: 0,
      };
    }
  }

  // ============================================================================
  // Decision Profile — fixed anchor, always included, always the last insight.
  // ============================================================================
  const mustSeeTotal = pickedArtists.filter((a) => decisionsByArtist[a.slug].verdict === "mustSee").length;
  const interestedTotal = totalPositive - mustSeeTotal;
  const mustSeeRate = mustSeeTotal / totalPositive;
  const mustSeeRatePct = round(mustSeeRate * 100);

  let decisionProfile: Candidate;
  if (totalPositive <= DECISION_PROFILE_RESTRAINED_MAX_PICKS) {
    decisionProfile = {
      type: "decisionProfile",
      headlineTemplate: "Your picks are taking shape",
      supportingText: `${mustSeeTotal} Must See and ${interestedTotal} Interested — your festival priorities are coming into focus.`,
      extremeness: 1,
      practicalEffectPP: 0,
    };
  } else if (mustSeeRate >= DECISION_PROFILE_EXTREME_MUST_SEE && totalPositive >= DECISION_PROFILE_EXTREME_MIN_PICKS) {
    decisionProfile = {
      type: "decisionProfile",
      headlineTemplate: "No hesitation, zero fluff",
      supportingText: `${mustSeeRatePct}% of your picks landed in Must See (${mustSeeTotal} of ${totalPositive}). You made the call.`,
      extremeness: 1,
      practicalEffectPP: 0,
    };
  } else if (
    mustSeeRate <= DECISION_PROFILE_EXTREME_INTERESTED &&
    totalPositive >= DECISION_PROFILE_EXTREME_MIN_PICKS
  ) {
    decisionProfile = {
      type: "decisionProfile",
      headlineTemplate: "Keeping every door wide open",
      supportingText: `${interestedTotal} of your ${totalPositive} picks are Interested — you're leaving room to be surprised.`,
      extremeness: 1,
      practicalEffectPP: 0,
    };
  } else if (mustSeeRate >= DECISION_PROFILE_MUST_SEE_HEAVY) {
    decisionProfile = {
      type: "decisionProfile",
      headlineTemplate: "Your Must See list leads the way",
      supportingText: `${mustSeeTotal} of your ${totalPositive} picks (${mustSeeRatePct}%) are Must See — your priorities are clear.`,
      extremeness: 1,
      practicalEffectPP: 0,
    };
  } else if (mustSeeRate <= DECISION_PROFILE_INTERESTED_HEAVY) {
    decisionProfile = {
      type: "decisionProfile",
      headlineTemplate: "Keeping your options open",
      supportingText: `${interestedTotal} of your ${totalPositive} picks are Interested — discovery is still part of the plan.`,
      extremeness: 1,
      practicalEffectPP: 0,
    };
  } else if (mustSeeRate > DECISION_PROFILE_NEAR_EVEN_MAX) {
    // > 60% and < 75% (the >= 75% branch above already handled the heavy case)
    decisionProfile = {
      type: "decisionProfile",
      headlineTemplate: "A shortlist with clear priorities",
      supportingText: `${mustSeeTotal} of your ${totalPositive} picks are Must See, with ${interestedTotal} still in the mix.`,
      extremeness: 1,
      practicalEffectPP: 0,
    };
  } else if (mustSeeRate < DECISION_PROFILE_NEAR_EVEN_MIN) {
    // > 25% and < 40% (the <= 25% branch above already handled the heavy case)
    decisionProfile = {
      type: "decisionProfile",
      headlineTemplate: "Room for discovery",
      supportingText: `${interestedTotal} of your ${totalPositive} picks are Interested, while ${mustSeeTotal} have already reached Must See.`,
      extremeness: 1,
      practicalEffectPP: 0,
    };
  } else {
    // 40% through 60% inclusive
    decisionProfile = {
      type: "decisionProfile",
      headlineTemplate: "Certainty meets curiosity",
      supportingText: `Your picks split ${mustSeeTotal} Must See to ${interestedTotal} Interested — a little certainty, a little room to explore.`,
      extremeness: 1,
      practicalEffectPP: 0,
    };
  }

  // ============================================================================
  // Competitive pool.
  //
  // Four stable profile dimensions (Decision Profile, Taste Profile, Billing Profile,
  // Festival Footprint) are always AVAILABLE — each can always produce at least a
  // safe, factual candidate. Decision Profile and Taste Profile are fixed anchors and
  // always appear (slot 1 and slot 4). Billing and Festival Footprint are NOT
  // guaranteed to appear: they always contribute one entry to this competitive pool
  // (their interpretive form if it qualifies, otherwise their safe form), which
  // guarantees the pool is never smaller than 2 — but a strong bonus candidate
  // (Genre Breadth, Hometown, International/Country Diversity, Day) can outrank and
  // displace either or both of them for the 2 remaining slots. The guaranteed
  // 4-card outcome comes from two fixed anchors (Taste, Decision Profile) plus
  // exactly 2 pool winners — never three anchors, since only two dimensions are
  // anchors at all.
  // ============================================================================
  const pool: Candidate[] = [];

  // ----- Billing Profile / headliner-undercard mix -----
  {
    const headlinerCount = pickedArtists.filter((a) => {
      const tier = appearanceOf(a).billingTier;
      return tier === "Headliner" || tier === "Sub-headliner";
    }).length;
    const subHeadlinerCount = pickedArtists.filter((a) => appearanceOf(a).billingTier === "Sub-headliner").length;
    const headlinerOnlyCount = pickedArtists.filter((a) => appearanceOf(a).billingTier === "Headliner").length;
    const undercardCount = totalPositive - headlinerCount;

    const highEval = evaluateCandidate(observed.headlinerRate, values("headlinerRate"), "high");
    const lowEval = evaluateCandidate(observed.headlinerRate, values("headlinerRate"), "low");

    if (highEval.qualifies) {
      pool.push({
        type: "billing",
        userValue: observed.headlinerRate,
        lineupValue: highEval.mean,
        deviation: highEval.practicalEffectPP,
        headlineTemplate: "Main-stage energy led the way",
        supportingText: `${round(observed.headlinerRate)}% of your picks are headliners or sub-headliners — the festival's biggest stages pulled you in.`,
        extremeness: highEval.extremeness,
        practicalEffectPP: highEval.practicalEffectPP,
      });
    } else if (lowEval.qualifies) {
      const undercardRate = 100 - observed.headlinerRate;
      pool.push({
        type: "billing",
        userValue: observed.headlinerRate,
        lineupValue: lowEval.mean,
        deviation: lowEval.practicalEffectPP,
        headlineTemplate: "You found the next wave",
        supportingText: `${round(undercardRate)}% of your picks are undercard artists — discovery drove your lineup.`,
        extremeness: lowEval.extremeness,
        practicalEffectPP: lowEval.practicalEffectPP,
      });
    } else {
      pool.push({
        type: "billing",
        userValue: observed.headlinerRate,
        headlineTemplate: "Your picks span the lineup",
        supportingText: `${headlinerOnlyCount} headliner ${pluralize(headlinerOnlyCount, "pick", "picks")}, ${subHeadlinerCount} sub-headliner ${pluralize(subHeadlinerCount, "pick", "picks")}, and ${undercardCount} undercard ${pluralize(undercardCount, "pick", "picks")}.`,
        extremeness: 1,
        practicalEffectPP: 0,
      });
    }
  }

  // ----- Festival Footprint / Stage diversity -----
  {
    const highEval = evaluateCandidate(observed.stageRate, values("stageRate"), "high");
    const lowEval = evaluateCandidate(observed.stageRate, values("stageRate"), "low");

    if (highEval.qualifies) {
      pool.push({
        type: "stage",
        userValue: observed.stageRate,
        lineupValue: highEval.mean,
        deviation: highEval.practicalEffectPP,
        headlineTemplate: "Your picks go all over the map",
        supportingText: `Your picks cover ${observed.stageCount} different stages — you're exploring across the festival grounds.`,
        extremeness: highEval.extremeness,
        practicalEffectPP: highEval.practicalEffectPP,
      });
    } else if (lowEval.qualifies) {
      pool.push({
        type: "stage",
        userValue: observed.stageRate,
        lineupValue: lowEval.mean,
        deviation: lowEval.practicalEffectPP,
        headlineTemplate: "A focused festival footprint",
        supportingText: `Your picks cluster across ${observed.stageCount} ${pluralize(observed.stageCount, "stage")} — a tighter route through the grounds.`,
        extremeness: lowEval.extremeness,
        practicalEffectPP: lowEval.practicalEffectPP,
      });
    } else {
      pool.push({
        type: "stage",
        userValue: observed.stageRate,
        headlineTemplate: "Your festival footprint",
        supportingText: `Your picks span ${observed.stageCount} of the festival's ${lineupStageCount} stages.`,
        extremeness: 1,
        practicalEffectPP: 0,
      });
    }
  }

  // ----- Genre Breadth (bonus — no safe fallback) -----
  {
    const highEval = evaluateCandidate(observed.genreRate, values("genreRate"), "high");
    const lowEval = evaluateCandidate(observed.genreRate, values("genreRate"), "low");
    if (highEval.qualifies) {
      pool.push({
        type: "genreBreadth",
        userValue: observed.genreRate,
        lineupValue: highEval.mean,
        deviation: highEval.practicalEffectPP,
        headlineTemplate: "Your taste refused to stay in one lane",
        supportingText: `Your picks span ${observed.genreCount} distinct genres — you're not sticking to one sound.`,
        extremeness: highEval.extremeness,
        practicalEffectPP: highEval.practicalEffectPP,
      });
    } else if (lowEval.qualifies) {
      pool.push({
        type: "genreBreadth",
        userValue: observed.genreRate,
        lineupValue: lowEval.mean,
        deviation: lowEval.practicalEffectPP,
        headlineTemplate: "You found your lane",
        supportingText: `Your picks cluster around ${observed.genreCount} ${pluralize(observed.genreCount, "genre")} — a focused musical direction.`,
        extremeness: lowEval.extremeness,
        practicalEffectPP: lowEval.practicalEffectPP,
      });
    }
  }

  // ----- Hometown / Chicago (bonus — positive concentration only) -----
  {
    if (observed.chicagoCount >= HOMETOWN_MIN_PICKS) {
      const highEval = evaluateCandidate(observed.chicagoRate, values("chicagoRate"), "high");
      if (highEval.qualifies) {
        const strong = observed.chicagoCount >= HOMETOWN_STRONG_MIN_PICKS;
        pool.push({
          type: "hometown",
          userValue: observed.chicagoRate,
          lineupValue: highEval.mean,
          deviation: highEval.practicalEffectPP,
          headlineTemplate: strong ? "Chicago runs through your picks" : "Chicago showed up in your picks",
          supportingText: strong
            ? `${round(observed.chicagoRate)}% of your picks are Chicago artists — the city made its mark.`
            : `${observed.chicagoCount} of your picks call Chicago home — local artists earned a place in your lineup.`,
          extremeness: highEval.extremeness,
          practicalEffectPP: highEval.practicalEffectPP,
        });
      }
    }
  }

  // ----- International (bonus — positive concentration only) -----
  let geographicCandidate: Candidate | null = null;
  {
    if (observed.internationalCount >= INTERNATIONAL_MIN_PICKS) {
      const highEval = evaluateCandidate(observed.internationalRate, values("internationalRate"), "high");
      if (highEval.qualifies) {
        geographicCandidate = {
          type: "international",
          userValue: observed.internationalRate,
          lineupValue: highEval.mean,
          deviation: highEval.practicalEffectPP,
          headlineTemplate: "Your picks went global",
          supportingText: `${round(observed.internationalRate)}% of your picks come from outside the United States.`,
          extremeness: highEval.extremeness,
          practicalEffectPP: highEval.practicalEffectPP,
        };
      }
    }
  }

  // ----- Country Diversity (bonus — both directions possible) -----
  {
    const highEval = evaluateCandidate(observed.countryRate, values("countryRate"), "high");
    const lowEval = evaluateCandidate(observed.countryRate, values("countryRate"), "low");
    let countryCandidate: Candidate | null = null;
    if (highEval.qualifies) {
      countryCandidate = {
        type: "countryDiversity",
        userValue: observed.countryRate,
        lineupValue: highEval.mean,
        deviation: highEval.practicalEffectPP,
        headlineTemplate: "Your picks crossed borders",
        supportingText: `Your picks represent artists from ${observed.countryCount} different ${pluralize(observed.countryCount, "country", "countries")}.`,
        extremeness: highEval.extremeness,
        practicalEffectPP: highEval.practicalEffectPP,
      };
    } else if (lowEval.qualifies) {
      countryCandidate = {
        type: "countryDiversity",
        userValue: observed.countryRate,
        lineupValue: lowEval.mean,
        deviation: lowEval.practicalEffectPP,
        headlineTemplate: "A focused geographic mix",
        supportingText: `Your picks represent artists from ${observed.countryCount} ${pluralize(observed.countryCount, "country", "countries")} — a concentrated part of your festival taste.`,
        extremeness: lowEval.extremeness,
        practicalEffectPP: lowEval.practicalEffectPP,
      };
    }

    // International and Country Diversity are treated as potentially duplicative
    // geographic stories — at most one of the two ever competes for a slot. Keep
    // whichever is statistically stronger (lower extremeness).
    if (geographicCandidate && countryCandidate) {
      geographicCandidate =
        countryCandidate.extremeness < geographicCandidate.extremeness ? countryCandidate : geographicCandidate;
    } else if (countryCandidate) {
      geographicCandidate = countryCandidate;
    }
  }
  if (geographicCandidate) pool.push(geographicCandidate);

  // ----- Day concentration (bonus — positive concentration only, >=2 attended days) -----
  //
  // Selection-adjusted, mirroring Taste Profile's fix: production searches every
  // selected day to find the strongest positive over-index (not the day with the
  // highest raw pick share, which can under-index its own baseline — e.g. Thursday at
  // 45% of picks but a 55% eligible-lineup baseline is a real under-index, while
  // Friday at 35% of picks against a 15% baseline is the actual story). Every sample
  // must run the identical "search all days for the best over-index" step, or the
  // comparison is biased toward finding the observed picks more unusual than they are.
  {
    if (attendanceDays.length >= DAY_MIN_ATTENDANCE_DAYS) {
      // Exact (non-sampled) eligible-lineup day distribution — the fixed baseline
      // both the observed search and every sample's search are measured against.
      const eligibleDayRate: Record<string, number> = {};
      if (eligibleArtists.length > 0) {
        for (const day of attendanceDays) {
          const count = eligibleArtists.filter((a) => appearanceOf(a).day === day).length;
          eligibleDayRate[day] = (count / eligibleArtists.length) * 100;
        }
      }

      const bestDayOverIndex = (dayRate: Record<string, number>): { day: string | null; score: number } => {
        let bestDay: string | null = null;
        let bestScore = -Infinity;
        for (const day of attendanceDays) {
          const score = (dayRate[day] ?? 0) - (eligibleDayRate[day] ?? 0);
          if (score > bestScore) {
            bestScore = score;
            bestDay = day;
          }
        }
        return { day: bestDay, score: bestScore };
      };

      const { day: winningDay, score: observedScore } = bestDayOverIndex(observed.dayRate);
      if (winningDay && observedScore > 0) {
        const topDayPickCount = pickedArtists.filter((a) => appearanceOf(a).day === winningDay).length;
        if (topDayPickCount >= DAY_TOP_DAY_MIN_PICKS) {
          // Every sample's own best-day-over-index — not a lookup of the sample's
          // rate for the observed winning day.
          const sampleMaxScores = sampleMetrics.map((m) => bestDayOverIndex(m.dayRate).score);
          const extremeness = computeExtremeness(observedScore, sampleMaxScores, "high");
          const qualifies = extremeness <= EXTREMENESS_THRESHOLD && observedScore >= PRACTICAL_EFFECT_MIN_PP;
          if (qualifies) {
            pool.push({
              type: "day",
              userValue: observed.dayRate[winningDay],
              lineupValue: eligibleDayRate[winningDay],
              deviation: observedScore,
              headlineTemplate: `${winningDay} stands out`,
              supportingText: `${round(observed.dayRate[winningDay])}% of your picks play on ${winningDay} — a stronger concentration than the selected-day lineup would suggest.`,
              extremeness,
              practicalEffectPP: observedScore,
            });
          }
        }
      }
    }
  }

  // ===== Select the top 2 pool candidates for the remaining 2 non-anchor slots =====
  pool.sort((a, b) => {
    if (a.extremeness !== b.extremeness) return a.extremeness - b.extremeness;
    if (a.practicalEffectPP !== b.practicalEffectPP) return b.practicalEffectPP - a.practicalEffectPP;
    return DIMENSION_DISPLAY_PRIORITY.indexOf(a.type) - DIMENSION_DISPLAY_PRIORITY.indexOf(b.type);
  });
  const poolWinners = pool.slice(0, 2);

  // ===== Assemble (2 fixed anchors + 2 pool winners = 4) + curated presentation order =====
  const selected = [tasteCandidate, ...poolWinners, decisionProfile];
  selected.sort(
    (a, b) => DIMENSION_DISPLAY_PRIORITY.indexOf(a.type) - DIMENSION_DISPLAY_PRIORITY.indexOf(b.type)
  );

  // Defensive: the four slots above are structurally guaranteed (2 fixed anchors plus
  // 2 always-available pool fallbacks — Billing/Footprint safe forms — so the pool
  // never has fewer than 2 entries), so this should never trip in practice. If it
  // somehow does, keep the Story unavailable rather than show a partial result.
  if (selected.length !== 4) {
    return [];
  }

  return selected.map(toStorySignal);
}

export function useStorySignals(params: ComputeStorySignalsParams): StorySignal[] {
  const { festivalId, attendanceDays, allArtists, decisionsByArtist } = params;
  return useMemo(
    () => computeStorySignals({ festivalId, attendanceDays, allArtists, decisionsByArtist }),
    [festivalId, attendanceDays, allArtists, decisionsByArtist]
  );
}
