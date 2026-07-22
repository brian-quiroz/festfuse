import { useMemo } from "react";
import type { Artist } from "@/app/types/artist";
import type { ArtistDecision } from "@/app/store/decisionStore";
import { GENRE_TO_FAMILY, GENRE_FAMILIES } from "@/app/data/categories";
import type { GenreFamily } from "@/app/data/categories";
import { ACTIVE_FESTIVAL_ID } from "@/app/data/festivals";
import { getPrimaryAppearance, getPrimaryBillingTier } from "@/app/lib/appearances";

export interface StorySignal {
  type: string;
  headlineTemplate: string;
  supportingText: string;
  // Comparative signals only — the user's rate vs. the lineup baseline, and the
  // absolute difference between them. Omitted for signals with no meaningful lineup
  // baseline (decisionConfidence, journeySummary) — see computeStorySignals.
  userValue?: number;
  lineupValue?: number;
  deviation?: number;
}

// A comparative signal only earns a card if the user's rate diverges from the lineup
// baseline by at least this many percentage points. Below this, the gap is plausibly
// just sampling noise from picking a subset of a 170+ artist lineup, not a real taste
// signal — e.g. 8pp on a lineup this size is well within what a fairly "average" set
// of picks can land on by chance.
const NOISE_THRESHOLD_PP = 12;

// Decision confidence requires at least this many total positive decisions before it
// will classify the user as any particular "type." Below this, a single pick flipping
// the ratio from 100% to 0% would read as a dramatic conclusion from almost no data.
const MIN_DECISIONS_FOR_CONFIDENCE = 3;
const MUST_SEE_HEAVY_THRESHOLD = 0.6; // >=60% Must See -> "heavy"
const INTERESTED_HEAVY_THRESHOLD = 0.35; // <=35% Must See -> Interested-heavy

// Single source of truth for Festival Story's signal computation — the hook below is a
// thin useMemo wrapper so this can also be called directly (e.g. from a verification
// script) without a second, driftable copy of the logic.
export function computeStorySignals(
  decisionsByArtist: Record<string, ArtistDecision>,
  allArtists: Artist[]
): StorySignal[] {
  const pickedSlugs = Object.entries(decisionsByArtist)
    .filter(([, decision]) => decision.verdict === "mustSee" || decision.verdict === "interested")
    .map(([slug]) => slug);

  if (pickedSlugs.length === 0) {
    return [];
  }

  const pickedArtists = pickedSlugs
    .map((slug) => allArtists.find((a) => a.slug === slug))
    .filter(Boolean) as Artist[];

  const comparative: Required<StorySignal>[] = [];

  // ===== Genre Family Dominance =====
  // For each family, count picks with at least one genre in that family. Handles
  // multi-genre artists fairly: an artist counts toward every family it has a genre
  // in, not just its first genre (which we can't trust for prominence).
  const familyPresence: Record<GenreFamily, number> = {} as Record<GenreFamily, number>;
  const lineupFamilyPresence: Record<GenreFamily, number> = {} as Record<GenreFamily, number>;

  for (const family of Object.keys(GENRE_FAMILIES) as GenreFamily[]) {
    familyPresence[family] = pickedArtists.filter((a) =>
      a.genres.some((g) => GENRE_TO_FAMILY[g] === family)
    ).length;
    lineupFamilyPresence[family] = allArtists.filter((a) =>
      a.genres.some((g) => GENRE_TO_FAMILY[g] === family)
    ).length;
  }

  const topFamily = Object.entries(familyPresence).sort(([, a], [, b]) => b - a)[0];
  const topFamilyName = (topFamily?.[0] as GenreFamily) || "Unknown";
  const userFamilyRate = (familyPresence[topFamilyName] / pickedArtists.length) * 100;
  const lineupFamilyRate = (lineupFamilyPresence[topFamilyName] / allArtists.length) * 100;

  comparative.push({
    type: "genre",
    userValue: userFamilyRate,
    lineupValue: lineupFamilyRate,
    deviation: Math.abs(userFamilyRate - lineupFamilyRate),
    headlineTemplate: `Your heart beat to the rhythm of ${topFamilyName}`,
    supportingText: `You didn't just dip your toes in - ${userFamilyRate.toFixed(0)}% of your picks are ${topFamilyName} artists.`,
  });

  // ===== Hometown Concentration =====
  // City === "Chicago" only — not the whole state. "Chicago's Own" (Explore) uses the
  // same definition; a Rockford or Springfield artist is Illinois, not Chicago.
  const chicagoCount = pickedArtists.filter((a) => a.location.city === "Chicago").length;
  const userChicagoRate = (chicagoCount / pickedArtists.length) * 100;
  const lineupChicagoCount = allArtists.filter((a) => a.location.city === "Chicago").length;
  const lineupChicagoRate = (lineupChicagoCount / allArtists.length) * 100;

  comparative.push({
    type: "hometown",
    userValue: userChicagoRate,
    lineupValue: lineupChicagoRate,
    deviation: Math.abs(userChicagoRate - lineupChicagoRate),
    headlineTemplate: `A hometown hero's biggest fan`,
    supportingText: `Keeping it local: ${userChicagoRate.toFixed(0)}% of your picks are straight out of Chicago.`,
  });

  // ===== Headliner/Sub-headliner vs. Undercard =====
  const headlinerCount = pickedArtists.filter((a) => {
    const tier = getPrimaryBillingTier(a, ACTIVE_FESTIVAL_ID);
    return tier === "Headliner" || tier === "Sub-headliner";
  }).length;
  const userHeadlinerRate = (headlinerCount / pickedArtists.length) * 100;
  const lineupHeadlinerCount = allArtists.filter((a) => {
    const tier = getPrimaryBillingTier(a, ACTIVE_FESTIVAL_ID);
    return tier === "Headliner" || tier === "Sub-headliner";
  }).length;
  const lineupHeadlinerRate = (lineupHeadlinerCount / allArtists.length) * 100;

  comparative.push({
    type: "headliner",
    userValue: userHeadlinerRate,
    lineupValue: lineupHeadlinerRate,
    deviation: Math.abs(userHeadlinerRate - lineupHeadlinerRate),
    headlineTemplate:
      userHeadlinerRate > lineupHeadlinerRate
        ? `You came for the main stage spectacle`
        : `An elite tier gatekeeper`,
    supportingText:
      userHeadlinerRate > lineupHeadlinerRate
        ? `Go big or go home. ${userHeadlinerRate.toFixed(0)}% of your picks are headliners and sub-headliners.`
        : `${(100 - userHeadlinerRate).toFixed(0)}% of your picks features rising undercard artists. You're catching them now so you can say "I knew them when...`,
  });

  // ===== International/Domestic Mix =====
  const internationalCount = pickedArtists.filter(
    (a) => a.location.country !== "United States"
  ).length;
  const userInternationalRate = (internationalCount / pickedArtists.length) * 100;
  const lineupInternationalCount = allArtists.filter(
    (a) => a.location.country !== "United States"
  ).length;
  const lineupInternationalRate = (lineupInternationalCount / allArtists.length) * 100;

  comparative.push({
    type: "international",
    userValue: userInternationalRate,
    lineupValue: lineupInternationalRate,
    deviation: Math.abs(userInternationalRate - lineupInternationalRate),
    headlineTemplate: `Great music knows no borders`,
    supportingText: `${userInternationalRate.toFixed(0)}% of your picks are artists who crossed oceans to get here.`,
  });

  // ===== Stage Diversity =====
  // Expected value: for N random picks, how many distinct stages would you expect to hit?
  const stageCounts: Record<string, number> = {};
  allArtists.forEach((a) => {
    const stage = getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).stage;
    stageCounts[stage] = (stageCounts[stage] || 0) + 1;
  });
  const lineupStageCount = Object.keys(stageCounts).length;
  const totalArtists = allArtists.length;

  let expectedStageCount = 0;
  Object.values(stageCounts).forEach((count) => {
    const pMiss = Math.pow((totalArtists - count) / totalArtists, pickedArtists.length);
    expectedStageCount += 1 - pMiss;
  });

  const pickedStages = new Set(
    pickedArtists.map((a) => getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).stage)
  );
  const userStageCount = pickedStages.size;
  const userStageRate = (userStageCount / lineupStageCount) * 100;
  const expectedStageRate = (expectedStageCount / lineupStageCount) * 100;

  comparative.push({
    type: "stageDiversity",
    userValue: userStageRate,
    lineupValue: expectedStageRate,
    deviation: Math.abs(userStageRate - expectedStageRate),
    headlineTemplate:
      userStageCount > expectedStageCount
        ? `The festival's ultimate marathon runner`
        : `Loyalty is your middle name (or at least your festival strategy)`,
    supportingText:
      userStageCount > expectedStageCount
        ? `The festival will be your cardio for the month. You are hitting ${userStageCount.toFixed(1)} different stages.`
        : `You are sticking to ${userStageCount.toFixed(1)} stages. Quality over quantity.`,
  });

  // ===== Genre Diversity =====
  const genreCounts: Record<string, number> = {};
  allArtists.forEach((a) => {
    a.genres.forEach((g) => {
      genreCounts[g] = (genreCounts[g] || 0) + 1;
    });
  });
  const lineupGenreDiversityCount = Object.keys(genreCounts).length;

  let expectedGenreCount = 0;
  Object.values(genreCounts).forEach((count) => {
    const pMiss = Math.pow((totalArtists - count) / totalArtists, pickedArtists.length);
    expectedGenreCount += 1 - pMiss;
  });

  const pickedGenres = new Set<string>();
  pickedArtists.forEach((a) => a.genres.forEach((g) => pickedGenres.add(g)));
  const userGenreDiversityCount = pickedGenres.size;
  const userGenreDiversityRate = (userGenreDiversityCount / lineupGenreDiversityCount) * 100;
  const expectedGenreRate = (expectedGenreCount / lineupGenreDiversityCount) * 100;

  comparative.push({
    type: "genreDiversity",
    userValue: userGenreDiversityRate,
    lineupValue: expectedGenreRate,
    deviation: Math.abs(userGenreDiversityRate - expectedGenreRate),
    headlineTemplate:
      userGenreDiversityCount > expectedGenreCount
        ? `A certified sonic chameleon`
        : `You know exactly what you like`,
    supportingText:
      userGenreDiversityCount > expectedGenreCount
        ? `Your ears refuse to settle. Your picks span ${userGenreDiversityCount.toFixed(0)} distinct genres.`
        : `Why fix what's not broken? Your roster covers only ${userGenreDiversityCount.toFixed(0)} genres.`,
  });

  // ===== Geographic Diversity =====
  const countryCounts: Record<string, number> = {};
  allArtists.forEach((a) => {
    countryCounts[a.location.country] = (countryCounts[a.location.country] || 0) + 1;
  });
  const lineupCountryCount = Object.keys(countryCounts).length;

  let expectedCountryCount = 0;
  Object.values(countryCounts).forEach((count) => {
    const pMiss = Math.pow((totalArtists - count) / totalArtists, pickedArtists.length);
    expectedCountryCount += 1 - pMiss;
  });

  const pickedCountries = new Set(pickedArtists.map((a) => a.location.country));
  const userCountryCount = pickedCountries.size;
  const userCountryRate = (userCountryCount / lineupCountryCount) * 100;
  const expectedCountryRate = (expectedCountryCount / lineupCountryCount) * 100;

  comparative.push({
    type: "geographicDiversity",
    userValue: userCountryRate,
    lineupValue: expectedCountryRate,
    deviation: Math.abs(userCountryRate - expectedCountryRate),
    headlineTemplate:
      userCountryCount > expectedCountryCount
        ? `Your ears live in the fast lane of global travel`
        : `You have strong regional preferences`,
    supportingText:
      userCountryCount > expectedCountryCount
        ? `Your picks represent artists from ${userCountryCount} different countries.`
        : `You curated a tight-knit regional vibe. Your picks represent ${userCountryCount} countries.`,
  });

  // ===== Decision Confidence =====
  // Objective, but NOT lineup-relative — there's no meaningful "expected" Must-See
  // rate to compare against, so this never computes a fake deviation. Based only on
  // the user's own verdict counts.
  const mustSeeTotal = pickedSlugs.filter(
    (slug) => decisionsByArtist[slug].verdict === "mustSee"
  ).length;
  const interestedTotal = pickedSlugs.length - mustSeeTotal;
  const totalPositive = pickedSlugs.length;

  let decisionConfidence: StorySignal | null = null;
  if (totalPositive >= MIN_DECISIONS_FOR_CONFIDENCE) {
    const mustSeeRate = mustSeeTotal / totalPositive;
    if (mustSeeRate >= MUST_SEE_HEAVY_THRESHOLD) {
      decisionConfidence = {
        type: "decisionConfidence",
        headlineTemplate: `No hesitation, zero fluff`,
        supportingText: `${(mustSeeRate * 100).toFixed(0)}% of your picks are locked in as Must See (${mustSeeTotal} out of ${totalPositive}). You came here with a clear mission.`,
      };
    } else if (mustSeeRate <= INTERESTED_HEAVY_THRESHOLD) {
      decisionConfidence = {
        type: "decisionConfidence",
        headlineTemplate: `Here for the plot and the side quests`,
        supportingText: `${interestedTotal} out of your ${totalPositive} picks are marked Interested. You like having options and letting the festival energy guide your steps.`,
      };
    } else {
      decisionConfidence = {
        type: "decisionConfidence",
        headlineTemplate: `Perfectly balanced, as all things should be`,
        supportingText: `Your lineup splits ${mustSeeTotal} Must See to ${interestedTotal} Interested. Best of both worlds.`,
      };
    }
  }

  // ===== Selection =====
  // Rank comparative signals by deviation and drop anything under the noise floor.
  // Decision confidence (when computable) always takes a slot first, since it's
  // objective by construction and not subject to the same noise concern. Comparative
  // signals fill the rest, strongest first, capped at 5 total.
  const qualifyingComparative = comparative
    .filter((s) => s.deviation >= NOISE_THRESHOLD_PP)
    .sort((a, b) => b.deviation - a.deviation);

  const insights: StorySignal[] = [];
  if (decisionConfidence) insights.push(decisionConfidence);
  insights.push(...qualifyingComparative.slice(0, 5 - insights.length));

  // Never fewer than 4: if comparative + decision confidence can't get there, add one
  // neutral, purely descriptive fallback built only from the user's own decision
  // counts — distinct from decisionConfidence's interpretive framing, so the two never
  // restate the same conclusion. Not another speculative artist-taste classification.
  if (insights.length < 4) {
    insights.push({
      type: "journeySummary",
      headlineTemplate: `Crafted by you, for you`,
      supportingText: `You built a lineup with ${pickedArtists.length} total picks, including ${mustSeeTotal} Must See sets and ${interestedTotal} Interested spots. It is looking like a legendary weekend.`,
    });
  }

  return insights.slice(0, 5);
}

export function useStorySignals(
  decisionsByArtist: Record<string, ArtistDecision>,
  allArtists: Artist[]
): StorySignal[] {
  return useMemo(
    () => computeStorySignals(decisionsByArtist, allArtists),
    [decisionsByArtist, allArtists]
  );
}
