/**
 * Test utility to validate story signal computation against different scenarios.
 * Run this to see actual computed numbers (user rate, lineup rate, deviation) for each signal.
 * Usage: import and call in a test or validation context.
 */

import type { Artist } from "@/app/types/artist";
import type { ArtistDecision } from "@/app/store/decisionStore";
import { ACTIVE_FESTIVAL_ID } from "@/app/data/festivals";
import { getPrimaryAppearance, getPrimaryBillingTier } from "@/app/lib/appearances";

// Mock computation (mirrors useStorySignals logic)
export function computeStorySignalsTestable(
  decisionsByArtist: Record<string, ArtistDecision>,
  allArtists: Artist[]
) {
  const pickedSlugs = Object.entries(decisionsByArtist)
    .filter(([_, decision]) => decision.verdict === "mustSee" || decision.verdict === "interested")
    .map(([slug]) => slug);

  if (pickedSlugs.length === 0) {
    return { signals: [], pickedCount: 0 };
  }

  const pickedArtists = pickedSlugs
    .map((slug) => allArtists.find((a) => a.slug === slug))
    .filter(Boolean) as Artist[];

  // Genre Dominance
  const userGenreCounts: Record<string, number> = {};
  const lineupGenreCounts: Record<string, number> = {};

  pickedArtists.forEach((a) => {
    a.genres.forEach((g) => {
      userGenreCounts[g] = (userGenreCounts[g] || 0) + 1;
    });
  });

  allArtists.forEach((a) => {
    a.genres.forEach((g) => {
      lineupGenreCounts[g] = (lineupGenreCounts[g] || 0) + 1;
    });
  });

  const topUserGenre = Object.entries(userGenreCounts).sort(([, a], [, b]) => b - a)[0];
  const topGenreName = topUserGenre?.[0] || "Unknown";
  const userTopGenreCount = topUserGenre?.[1] || 0;
  const userGenreRate = (userTopGenreCount / pickedArtists.length) * 100;
  const lineupGenreRate = ((lineupGenreCounts[topGenreName] || 0) / allArtists.length) * 100;
  const genreDeviation = Math.abs(userGenreRate - lineupGenreRate);

  // Hometown
  const chicagoCount = pickedArtists.filter(
    (a) => a.location.city === "Chicago" || a.location.state === "Illinois"
  ).length;
  const userChicagoRate = (chicagoCount / pickedArtists.length) * 100;
  const lineupChicagoCount = allArtists.filter(
    (a) => a.location.city === "Chicago" || a.location.state === "Illinois"
  ).length;
  const lineupChicagoRate = (lineupChicagoCount / allArtists.length) * 100;
  const chicagoDeviation = Math.abs(userChicagoRate - lineupChicagoRate);

  // Headliner
  const headlinerCount = pickedArtists.filter(
    (a) => getPrimaryBillingTier(a, ACTIVE_FESTIVAL_ID) === "Headliner" || getPrimaryBillingTier(a, ACTIVE_FESTIVAL_ID) === "Sub-headliner"
  ).length;
  const userHeadlinerRate = (headlinerCount / pickedArtists.length) * 100;
  const lineupHeadlinerCount = allArtists.filter(
    (a) => getPrimaryBillingTier(a, ACTIVE_FESTIVAL_ID) === "Headliner" || getPrimaryBillingTier(a, ACTIVE_FESTIVAL_ID) === "Sub-headliner"
  ).length;
  const lineupHeadlinerRate = (lineupHeadlinerCount / allArtists.length) * 100;
  const headlinerDeviation = Math.abs(userHeadlinerRate - lineupHeadlinerRate);

  // Time of Day
  const eveningCount = pickedArtists.filter((a) => {
    const startTime = getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).startTime;
    const hour = parseInt(startTime.split(":")[0], 10);
    return hour >= 16;
  }).length;
  const userEveningRate = (eveningCount / pickedArtists.length) * 100;
  const lineupEveningCount = allArtists.filter((a) => {
    const startTime = getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).startTime;
    const hour = parseInt(startTime.split(":")[0], 10);
    return hour >= 16;
  }).length;
  const lineupEveningRate = (lineupEveningCount / allArtists.length) * 100;
  const eveningDeviation = Math.abs(userEveningRate - lineupEveningRate);

  // International
  const internationalCount = pickedArtists.filter(
    (a) => a.location.country !== "United States"
  ).length;
  const userInternationalRate = (internationalCount / pickedArtists.length) * 100;
  const lineupInternationalCount = allArtists.filter(
    (a) => a.location.country !== "United States"
  ).length;
  const lineupInternationalRate = (lineupInternationalCount / allArtists.length) * 100;
  const internationalDeviation = Math.abs(userInternationalRate - lineupInternationalRate);

  const signals = [
    {
      name: "Genre Dominance",
      genre: topGenreName,
      userRate: userGenreRate,
      lineupRate: lineupGenreRate,
      deviation: genreDeviation,
    },
    {
      name: "Hometown (Chicago)",
      userRate: userChicagoRate,
      lineupRate: lineupChicagoRate,
      deviation: chicagoDeviation,
    },
    {
      name: "Headliner/Sub-headliner",
      userRate: userHeadlinerRate,
      lineupRate: lineupHeadlinerRate,
      deviation: headlinerDeviation,
    },
    {
      name: "Evening (4PM+)",
      userRate: userEveningRate,
      lineupRate: lineupEveningRate,
      deviation: eveningDeviation,
    },
    {
      name: "International",
      userRate: userInternationalRate,
      lineupRate: lineupInternationalRate,
      deviation: internationalDeviation,
    },
  ];

  // Sort by deviation
  signals.sort((a, b) => b.deviation - a.deviation);

  return { signals, pickedCount: pickedArtists.length, lineupCount: allArtists.length };
}

export function formatSignalReport(
  scenario: string,
  signals: ReturnType<typeof computeStorySignalsTestable>
) {
  console.log(`\n${"=".repeat(70)}\nSCENARIO: ${scenario}\n${"=".repeat(70)}`);
  console.log(`Picks: ${signals.pickedCount} artists | Lineup: ${signals.lineupCount} total`);
  console.log(`\nSignals ranked by deviation (highest deviation first):\n`);

  signals.signals.forEach((signal, i) => {
    const genre = (signal as any).genre ? ` (${(signal as any).genre})` : "";
    const filtered = signal.deviation < 5 ? " [FILTERED: < 5pp noise floor]" : "";
    console.log(
      `${i + 1}. ${signal.name}${genre} — Deviation: ${signal.deviation.toFixed(1)}pp${filtered}`
    );
    console.log(
      `   User: ${signal.userRate.toFixed(1)}% | Lineup: ${signal.lineupRate.toFixed(1)}%`
    );
  });
}
