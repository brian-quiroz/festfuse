import { useMemo } from "react";
import type { Artist } from "@/app/types/artist";
import type { ArtistDecision } from "@/app/store/decisionStore";
import {
  GENRE_TO_FAMILY,
  GENRE_FAMILIES,
  HIGH_ENERGY_TAGS,
  SPECTACLE_TAGS,
  INTIMATE_TAGS,
  LYRICAL_TAGS,
} from "@/app/data/categories";
import type { GenreFamily } from "@/app/data/categories";

export interface StorySignal {
  type: string;
  userValue: number;
  lineupValue: number;
  deviation: number;
  headlineTemplate: string;
  supportingText: string;
}

export function useStorySignals(
  decisionsByArtist: Record<string, ArtistDecision>,
  allArtists: Artist[]
): StorySignal[] {
  return useMemo(() => {
    // Build picked artists list
    const pickedSlugs = Object.entries(decisionsByArtist)
      .filter(
        ([_, decision]) => decision.verdict === "mustSee" || decision.verdict === "interested"
      )
      .map(([slug]) => slug);

    if (pickedSlugs.length === 0) {
      return [];
    }

    const pickedArtists = pickedSlugs
      .map((slug) => allArtists.find((a) => a.slug === slug))
      .filter(Boolean) as Artist[];

    const signals: StorySignal[] = [];

    // ===== SIGNAL 1: Genre Family Dominance =====
    // For each family, count picks with at least one genre in that family.
    // This handles multi-genre artists fairly: an artist is counted toward every family
    // whose genres they possess, not just their first genre (which we can't trust for prominence).
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
    const genreDeviation = Math.abs(userFamilyRate - lineupFamilyRate);

    signals.push({
      type: "genre",
      userValue: userFamilyRate,
      lineupValue: lineupFamilyRate,
      deviation: genreDeviation,
      headlineTemplate: `Your heart beat to the rhythm of ${topFamilyName}`,
      supportingText: `You didn't just dip your toes in - ${userFamilyRate.toFixed(0)}% of your picks are ${topFamilyName} artists.`,
    });

    // ===== SIGNAL 2: Hometown/Local Concentration =====
    const chicagoCount = pickedArtists.filter(
      (a) => a.location.city === "Chicago" || a.location.state === "Illinois"
    ).length;
    const userChicagoRate = (chicagoCount / pickedArtists.length) * 100;
    const lineupChicagoCount = allArtists.filter(
      (a) => a.location.city === "Chicago" || a.location.state === "Illinois"
    ).length;
    const lineupChicagoRate = (lineupChicagoCount / allArtists.length) * 100;
    const chicagoDeviation = Math.abs(userChicagoRate - lineupChicagoRate);

    signals.push({
      type: "hometown",
      userValue: userChicagoRate,
      lineupValue: lineupChicagoRate,
      deviation: chicagoDeviation,
      headlineTemplate: `A hometown hero's biggest fan`,
      supportingText: `Keeping it local: ${userChicagoRate.toFixed(0)}% of your picks are straight out of Chicago.`,
    });

    // ===== SIGNAL 3: Headliner/Sub-headliner vs. Undercard =====
    const headlinerCount = pickedArtists.filter(
      (a) =>
        a.appearance.billingTier === "Headliner" || a.appearance.billingTier === "Sub-headliner"
    ).length;
    const userHeadlinerRate = (headlinerCount / pickedArtists.length) * 100;
    const lineupHeadlinerCount = allArtists.filter(
      (a) =>
        a.appearance.billingTier === "Headliner" || a.appearance.billingTier === "Sub-headliner"
    ).length;
    const lineupHeadlinerRate = (lineupHeadlinerCount / allArtists.length) * 100;
    const headlinerDeviation = Math.abs(userHeadlinerRate - lineupHeadlinerRate);

    signals.push({
      type: "headliner",
      userValue: userHeadlinerRate,
      lineupValue: lineupHeadlinerRate,
      deviation: headlinerDeviation,
      headlineTemplate:
        userHeadlinerRate > lineupHeadlinerRate
          ? `You came for the main stage spectacle`
          : `An elite tier gatekeeper`,
      supportingText:
        userHeadlinerRate > lineupHeadlinerRate
          ? `Go big or go home. ${userHeadlinerRate.toFixed(0)}% of your picks are headliners and sub-headliners.`
          : `${(100 - userHeadlinerRate).toFixed(0)}% of your picks features rising undercard artists. You're catching them now so you can say "I knew them when...`,
    });

    // ===== SIGNAL 4: International/Domestic Mix =====
    const internationalCount = pickedArtists.filter(
      (a) => a.location.country !== "United States"
    ).length;
    const userInternationalRate = (internationalCount / pickedArtists.length) * 100;
    const lineupInternationalCount = allArtists.filter(
      (a) => a.location.country !== "United States"
    ).length;
    const lineupInternationalRate = (lineupInternationalCount / allArtists.length) * 100;
    const internationalDeviation = Math.abs(userInternationalRate - lineupInternationalRate);

    signals.push({
      type: "international",
      userValue: userInternationalRate,
      lineupValue: lineupInternationalRate,
      deviation: internationalDeviation,
      headlineTemplate: `Great music knows no borders`,
      supportingText: `${userInternationalRate.toFixed(0)}% of your picks are artists who crossed oceans to get here.`,
    });

    // ===== SIGNAL 5: High-Energy/Crowd Participation =====
    // Only compute if user has at least one pick with this tag (skip if zero)
    const highEnergyCount = pickedArtists.filter((a) =>
      a.whatToExpect.some((tag) => HIGH_ENERGY_TAGS.includes(tag))
    ).length;

    if (highEnergyCount > 0) {
      const userHighEnergyRate = (highEnergyCount / pickedArtists.length) * 100;
      const lineupHighEnergyCount = allArtists.filter((a) =>
        a.whatToExpect.some((tag) => HIGH_ENERGY_TAGS.includes(tag))
      ).length;
      const lineupHighEnergyRate = (lineupHighEnergyCount / allArtists.length) * 100;
      const highEnergyDeviation = Math.abs(userHighEnergyRate - lineupHighEnergyRate);

      signals.push({
        type: "highEnergy",
        userValue: userHighEnergyRate,
        lineupValue: lineupHighEnergyRate,
        deviation: highEnergyDeviation,
        headlineTemplate: `We hope you're packing comfortable shoes`,
        supportingText: `${userHighEnergyRate.toFixed(0)}% of your roster are high-octane energy zones.`,
      });
    }

    // ===== SIGNAL 6: Visual Spectacle =====
    // Only compute if user has at least one pick with this tag (skip if zero)
    const spectacleCount = pickedArtists.filter((a) =>
      a.whatToExpect.some((tag) => SPECTACLE_TAGS.includes(tag))
    ).length;

    if (spectacleCount > 0) {
      const userSpectacleRate = (spectacleCount / pickedArtists.length) * 100;
      const lineupSpectacleCount = allArtists.filter((a) =>
        a.whatToExpect.some((tag) => SPECTACLE_TAGS.includes(tag))
      ).length;
      const lineupSpectacleRate = (lineupSpectacleCount / allArtists.length) * 100;
      const spectacleDeviation = Math.abs(userSpectacleRate - lineupSpectacleRate);

      signals.push({
        type: "spectacle",
        userValue: userSpectacleRate,
        lineupValue: lineupSpectacleRate,
        deviation: spectacleDeviation,
        headlineTemplate: `The biggest productions are your jam`,
        supportingText: `Lasers, pyro, and massive art direction. ${userSpectacleRate.toFixed(0)}% of your picks are known for mind-blowing spectacles.`,
      });
    }

    // ===== SIGNAL 7: Intimate/Minimal Aesthetic =====
    // Only compute if user has at least one pick with this tag (skip if zero)
    const intimateCount = pickedArtists.filter((a) =>
      a.whatToExpect.some((tag) => INTIMATE_TAGS.includes(tag))
    ).length;

    if (intimateCount > 0) {
      const userIntimateRate = (intimateCount / pickedArtists.length) * 100;
      const lineupIntimateCount = allArtists.filter((a) =>
        a.whatToExpect.some((tag) => INTIMATE_TAGS.includes(tag))
      ).length;
      const lineupIntimateRate = (lineupIntimateCount / allArtists.length) * 100;
      const intimateDeviation = Math.abs(userIntimateRate - lineupIntimateRate);

      signals.push({
        type: "intimate",
        userValue: userIntimateRate,
        lineupValue: lineupIntimateRate,
        deviation: intimateDeviation,
        headlineTemplate: `No gimmicks, just pure soul`,
        supportingText: `You let the music speak for itself. ${userIntimateRate.toFixed(0)}% of your roster leans into raw, intimate, or minimalist magic.`,
      });
    }

    // ===== SIGNAL 8: Lyrical/Storytelling Focus =====
    // Only compute if user has at least one pick with this tag (skip if zero)
    const lyricsCount = pickedArtists.filter((a) =>
      a.whatToExpect.some((tag) => LYRICAL_TAGS.includes(tag))
    ).length;

    if (lyricsCount > 0) {
      const userLyricsRate = (lyricsCount / pickedArtists.length) * 100;
      const lineupLyricsCount = allArtists.filter((a) =>
        a.whatToExpect.some((tag) => LYRICAL_TAGS.includes(tag))
      ).length;
      const lineupLyricsRate = (lineupLyricsCount / allArtists.length) * 100;
      const lyricsDeviation = Math.abs(userLyricsRate - lineupLyricsRate);

      signals.push({
        type: "lyrics",
        userValue: userLyricsRate,
        lineupValue: lineupLyricsRate,
        deviation: lyricsDeviation,
        headlineTemplate: `You came for the poetry, not just the party`,
        supportingText: `You're hanging on every syllable. ${userLyricsRate.toFixed(0)}% of your selected artists put storytelling and lyricism first.`,
      });
    }

    // ===== SIGNAL 9: Stage Diversity =====
    // Expected value: for N random picks, how many distinct stages would you expect to hit?
    // Computed as sum of P(hit stage i) = 1 - ((total - count_on_stage_i) / total)^picks
    const stageCounts: Record<string, number> = {};
    allArtists.forEach((a) => {
      stageCounts[a.appearance.stage] = (stageCounts[a.appearance.stage] || 0) + 1;
    });
    const lineupStageCount = Object.keys(stageCounts).length;
    const totalArtists = allArtists.length;

    let expectedStageCount = 0;
    Object.values(stageCounts).forEach((count) => {
      const pMiss = Math.pow((totalArtists - count) / totalArtists, pickedArtists.length);
      expectedStageCount += 1 - pMiss;
    });

    const pickedStages = new Set(pickedArtists.map((a) => a.appearance.stage));
    const userStageCount = pickedStages.size;
    const userStageRate = (userStageCount / lineupStageCount) * 100;
    const expectedStageRate = (expectedStageCount / lineupStageCount) * 100;
    const stageDeviation = Math.abs(userStageRate - expectedStageRate);

    signals.push({
      type: "stageDiversity",
      userValue: userStageRate,
      lineupValue: expectedStageRate,
      deviation: stageDeviation,
      headlineTemplate:
        userStageCount > expectedStageCount
          ? `The festival's ultimate marathon runner`
          : `Loyalty is your middle name (or at least your festival strategy)`,
      supportingText:
        userStageCount > expectedStageCount
          ? `The festival will be your cardio for the month. You are hitting ${userStageCount.toFixed(1)} different stages.`
          : `You are sticking to ${userStageCount.toFixed(1)} stages. Quality over quantity.`,
    });

    // ===== SIGNAL 10: Genre Diversity =====
    // Expected value: for N random picks, how many distinct genres would you expect to touch?
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
    const genreDiversityDeviation = Math.abs(userGenreDiversityRate - expectedGenreRate);

    signals.push({
      type: "genreDiversity",
      userValue: userGenreDiversityRate,
      lineupValue: expectedGenreRate,
      deviation: genreDiversityDeviation,
      headlineTemplate:
        userGenreDiversityCount > expectedGenreCount
          ? `A certified sonic chameleon`
          : `You know exactly what you like`,
      supportingText:
        userGenreDiversityCount > expectedGenreCount
          ? `Your ears refuse to settle. Your picks span ${userGenreDiversityCount.toFixed(1)} distinct genres.`
          : `Why fix what's not broken? Your roster covers only ${userGenreDiversityCount.toFixed(1)} genres.`,
    });

    // ===== SIGNAL 11: Geographic Diversity =====
    // Expected value: for N random picks, how many distinct countries would you expect?
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
    const countryDiversityDeviation = Math.abs(userCountryRate - expectedCountryRate);

    signals.push({
      type: "geographicDiversity",
      userValue: userCountryRate,
      lineupValue: expectedCountryRate,
      deviation: countryDiversityDeviation,
      headlineTemplate:
        userCountryCount > expectedCountryCount
          ? `Your ears live in the fast lane of global travel`
          : `You have strong regional preferences`,
      supportingText:
        userCountryCount > expectedCountryCount
          ? `Your picks represent artists from ${userCountryCount} different countries.`
          : `You curated a tight-knit regional vibe. Your picks represent ${userCountryCount} countries.`,
    });

    // ===== RANKING & SELECTION =====
    // Sort all signals by deviation (highest first) and return top 5
    return signals.sort((a, b) => b.deviation - a.deviation).slice(0, 5);
  }, [decisionsByArtist, allArtists]);
}
