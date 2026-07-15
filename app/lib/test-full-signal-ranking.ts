/**
 * Full signal ranking test: all 11 signals ranked together for each scenario.
 * Verifies diversity signals rank fairly (not dominating, not drowned out).
 */

import type { Artist } from "@/app/types/artist";
import type { ArtistDecision } from "@/app/store/decisionStore";

// Mirror of useStorySignals logic for testing without React hooks
export function computeAllSignalsTestable(
  decisionsByArtist: Record<string, ArtistDecision>,
  allArtists: Artist[]
): Array<{ name: string; type: string; userValue: number; lineupValue: number; deviation: number }> {
  const pickedSlugs = Object.entries(decisionsByArtist)
    .filter(([_, decision]) => decision.verdict === "mustSee" || decision.verdict === "interested")
    .map(([slug]) => slug);

  if (pickedSlugs.length === 0) {
    return [];
  }

  const pickedArtists = pickedSlugs
    .map((slug) => allArtists.find((a) => a.slug === slug))
    .filter(Boolean) as Artist[];

  const signals: Array<{ name: string; type: string; userValue: number; lineupValue: number; deviation: number }> = [];
  const totalArtists = allArtists.length;

  // ===== SIGNAL 1: Genre Family Dominance =====
  {
    const GENRE_FAMILIES: Record<string, string[]> = {
      "Rock/Alternative": [
        "90s Alternative",
        "Alternative Rock",
        "Art Rock",
        "Blues Rock",
        "Electronic Rock",
        "Garage Rock",
        "Gothic Rock",
        "Grunge",
        "Indie Rock",
        "Industrial Rock",
        "Madchester",
        "Neo-Psychedelia",
        "Post-Punk",
        "Shoegaze",
        "Surf Rock",
        "Rock",
        "Symphonic Rock",
      ],
      Pop: [
        "Alt-Pop",
        "Ambient Pop",
        "Art Pop",
        "Chamber Pop",
        "Dance Pop",
        "Dark Pop",
        "Electro-Pop",
        "Electropop",
        "Experimental Pop",
        "Groove Pop",
        "Hyperpop",
        "Latin Pop",
        "Power Pop",
        "Psychedelic Pop",
        "Subversive Pop",
        "Synth-Pop",
        "Pop",
        "House-Pop",
        "Hip-Hop-Pop",
        "Electronic Pop",
      ],
      "Folk/Americana/Country": [
        "Alternative Folk",
        "Americana",
        "Americana-Pop",
        "Brass Band",
        "Contemporary Folk",
        "Country",
        "Country Blues",
        "Country Pop",
        "Dark Folk",
        "Folk Rock",
        "Gothic Folk",
        "Indie Folk",
        "Singer-Songwriter",
        "Traditional Irish Folk",
      ],
      "Hip-Hop/Rap": [
        "Alternative Hip-Hop",
        "Boom Bap",
        "Conscious Rap",
        "Emo-Rap",
        "Gangsta Rap",
        "Hip-Hop",
        "Korean Hip-Hop",
        "Plugg",
        "Rage Rap",
        "Southern Rap",
        "Trap",
        "Underground Rap",
        "West Coast Rap",
      ],
      "R&B/Soul": ["Alternative R&B", "Chicano Soul", "Funk", "Neo-Soul", "R&B", "Soul"],
      "Indie/Bedroom": ["Bedroom Pop", "Dream Pop", "Indie Electronica", "Indie Pop", "Lo-Fi Indie", "Slowcore"],
      "Electronic/Dance": [
        "Bass House",
        "Bassline",
        "Club",
        "Dark Techno",
        "Deep House",
        "Digital Hardcore",
        "Disco House",
        "Drum and Bass",
        "Dubstep",
        "Electro House",
        "Electroclash",
        "Electronic",
        "Eurodance",
        "Folktronica",
        "Future Bass",
        "G-House",
        "Happy Hardcore",
        "High-Tech Minimal",
        "House",
        "Industrial Electronic",
        "Industrial House",
        "Industrial Techno",
        "Melodic Bass",
        "Melodic House",
        "Minimal Tech",
        "Speed Garage",
        "Tech House",
        "Techno",
        "UK Garage",
        "Witch House",
      ],
      "K-Pop/J-Pop/P-Pop": ["J-Pop", "K-Pop", "P-Pop"],
      "Punk/Hardcore/Metal": [
        "Alternative Metal",
        "Emo",
        "Hardcore Punk",
        "Metalcore",
        "Pop-Punk",
        "Post-Hardcore",
        "Punk Rock",
        "Riot Grrrl",
      ],
      "Classical/Orchestral": ["Classical", "Cinematic Orchestral"],
      "Global Pop": ["Afroswing", "Tropicalia", "Dancehall"],
    };

    const GENRE_TO_FAMILY: Record<string, string> = {};
    Object.entries(GENRE_FAMILIES).forEach(([family, genres]) => {
      genres.forEach((g) => {
        GENRE_TO_FAMILY[g] = family;
      });
    });

    const familyPresence: Record<string, number> = {};
    const lineupFamilyPresence: Record<string, number> = {};

    for (const family of Object.keys(GENRE_FAMILIES)) {
      familyPresence[family] = pickedArtists.filter((a) =>
        a.genres.some((g) => GENRE_TO_FAMILY[g] === family)
      ).length;

      lineupFamilyPresence[family] = allArtists.filter((a) =>
        a.genres.some((g) => GENRE_TO_FAMILY[g] === family)
      ).length;
    }

    const topFamily = Object.entries(familyPresence).sort(([, a], [, b]) => b - a)[0];
    const topFamilyName = topFamily?.[0] || "Unknown";
    const userFamilyRate = (familyPresence[topFamilyName] / pickedArtists.length) * 100;
    const lineupFamilyRate = (lineupFamilyPresence[topFamilyName] / allArtists.length) * 100;
    const genreDeviation = Math.abs(userFamilyRate - lineupFamilyRate);

    signals.push({
      name: `Genre Family (${topFamilyName})`,
      type: "genre",
      userValue: userFamilyRate,
      lineupValue: lineupFamilyRate,
      deviation: genreDeviation,
    });
  }

  // ===== SIGNAL 2: Hometown =====
  {
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
      name: "Hometown (Chicago)",
      type: "hometown",
      userValue: userChicagoRate,
      lineupValue: lineupChicagoRate,
      deviation: chicagoDeviation,
    });
  }

  // ===== SIGNAL 3: Headliner =====
  {
    const headlinerCount = pickedArtists.filter(
      (a) => a.appearance.billingTier === "Headliner" || a.appearance.billingTier === "Sub-headliner"
    ).length;
    const userHeadlinerRate = (headlinerCount / pickedArtists.length) * 100;
    const lineupHeadlinerCount = allArtists.filter(
      (a) => a.appearance.billingTier === "Headliner" || a.appearance.billingTier === "Sub-headliner"
    ).length;
    const lineupHeadlinerRate = (lineupHeadlinerCount / allArtists.length) * 100;
    const headlinerDeviation = Math.abs(userHeadlinerRate - lineupHeadlinerRate);

    signals.push({
      name: "Headliner/Undercard",
      type: "headliner",
      userValue: userHeadlinerRate,
      lineupValue: lineupHeadlinerRate,
      deviation: headlinerDeviation,
    });
  }

  // ===== SIGNAL 4: International =====
  {
    const internationalCount = pickedArtists.filter((a) => a.location.country !== "United States")
      .length;
    const userInternationalRate = (internationalCount / pickedArtists.length) * 100;
    const lineupInternationalCount = allArtists.filter(
      (a) => a.location.country !== "United States"
    ).length;
    const lineupInternationalRate = (lineupInternationalCount / allArtists.length) * 100;
    const internationalDeviation = Math.abs(userInternationalRate - lineupInternationalRate);

    signals.push({
      name: "International",
      type: "international",
      userValue: userInternationalRate,
      lineupValue: lineupInternationalRate,
      deviation: internationalDeviation,
    });
  }

  // ===== SIGNAL 5: High-Energy =====
  {
    const highEnergyTags = [
      "Energetic Mosh Pits",
      "Massive Singalongs",
      "Dance Floor Energy",
      "Crowd Atmosphere",
      "High-Energy Pacing",
    ];
    const highEnergyCount = pickedArtists.filter((a) =>
      a.whatToExpect.some((tag) => highEnergyTags.includes(tag))
    ).length;
    const userHighEnergyRate = (highEnergyCount / pickedArtists.length) * 100;
    const lineupHighEnergyCount = allArtists.filter((a) =>
      a.whatToExpect.some((tag) => highEnergyTags.includes(tag))
    ).length;
    const lineupHighEnergyRate = (lineupHighEnergyCount / allArtists.length) * 100;
    const highEnergyDeviation = Math.abs(userHighEnergyRate - lineupHighEnergyRate);

    signals.push({
      name: "High-Energy",
      type: "highEnergy",
      userValue: userHighEnergyRate,
      lineupValue: lineupHighEnergyRate,
      deviation: highEnergyDeviation,
    });
  }

  // ===== SIGNAL 6: Spectacle =====
  {
    const spectacleTags = [
      "High-Production Visuals",
      "Cinematic Visuals",
      "Theatrical Staging",
      "Large-Scale Production",
      "Fashion Visual",
    ];
    const spectacleCount = pickedArtists.filter((a) =>
      a.whatToExpect.some((tag) => spectacleTags.includes(tag))
    ).length;
    const userSpectacleRate = (spectacleCount / pickedArtists.length) * 100;
    const lineupSpectacleCount = allArtists.filter((a) =>
      a.whatToExpect.some((tag) => spectacleTags.includes(tag))
    ).length;
    const lineupSpectacleRate = (lineupSpectacleCount / allArtists.length) * 100;
    const spectacleDeviation = Math.abs(userSpectacleRate - lineupSpectacleRate);

    signals.push({
      name: "Spectacle",
      type: "spectacle",
      userValue: userSpectacleRate,
      lineupValue: lineupSpectacleRate,
      deviation: spectacleDeviation,
    });
  }

  // ===== SIGNAL 7: Intimate =====
  {
    const intimateTags = ["Intimate Performance", "Minimal Production", "Dreamy Atmosphere"];
    const intimateCount = pickedArtists.filter((a) =>
      a.whatToExpect.some((tag) => intimateTags.includes(tag))
    ).length;
    const userIntimateRate = (intimateCount / pickedArtists.length) * 100;
    const lineupIntimateCount = allArtists.filter((a) =>
      a.whatToExpect.some((tag) => intimateTags.includes(tag))
    ).length;
    const lineupIntimateRate = (lineupIntimateCount / allArtists.length) * 100;
    const intimateDeviation = Math.abs(userIntimateRate - lineupIntimateRate);

    signals.push({
      name: "Intimate",
      type: "intimate",
      userValue: userIntimateRate,
      lineupValue: lineupIntimateRate,
      deviation: intimateDeviation,
    });
  }

  // ===== SIGNAL 8: Lyrical =====
  {
    const lyricsTags = [
      "Lyrical Storytelling",
      "Conversational Delivery",
      "Lyrical Emotional Depth",
    ];
    const lyricsCount = pickedArtists.filter((a) =>
      a.whatToExpect.some((tag) => lyricsTags.includes(tag))
    ).length;
    const userLyricsRate = (lyricsCount / pickedArtists.length) * 100;
    const lineupLyricsCount = allArtists.filter((a) =>
      a.whatToExpect.some((tag) => lyricsTags.includes(tag))
    ).length;
    const lineupLyricsRate = (lineupLyricsCount / allArtists.length) * 100;
    const lyricsDeviation = Math.abs(userLyricsRate - lineupLyricsRate);

    signals.push({
      name: "Lyrical/Storytelling",
      type: "lyrics",
      userValue: userLyricsRate,
      lineupValue: lineupLyricsRate,
      deviation: lyricsDeviation,
    });
  }

  // ===== SIGNAL 9: Stage Diversity =====
  {
    const stageCounts: Record<string, number> = {};
    allArtists.forEach((a) => {
      stageCounts[a.appearance.stage] = (stageCounts[a.appearance.stage] || 0) + 1;
    });
    const lineupStageCount = Object.keys(stageCounts).length;

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
      name: "Stage Diversity",
      type: "stageDiversity",
      userValue: userStageRate,
      lineupValue: expectedStageRate,
      deviation: stageDeviation,
    });
  }

  // ===== SIGNAL 10: Genre Diversity =====
  {
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
      name: "Genre Diversity",
      type: "genreDiversity",
      userValue: userGenreDiversityRate,
      lineupValue: expectedGenreRate,
      deviation: genreDiversityDeviation,
    });
  }

  // ===== SIGNAL 11: Geographic Diversity =====
  {
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
      name: "Geographic Diversity",
      type: "geographicDiversity",
      userValue: userCountryRate,
      lineupValue: expectedCountryRate,
      deviation: countryDiversityDeviation,
    });
  }

  return signals;
}

export function runFullRankingTest(allArtists: Artist[]) {
  console.log("\n");
  console.log("█".repeat(90));
  console.log("FULL SIGNAL RANKING TEST: All 11 Signals Ranked Together");
  console.log("█".repeat(90));

  const decision = (verdict: "mustSee" | "interested"): ArtistDecision => ({
    verdict,
    source: "quickPicks",
    updatedAt: Date.now(),
  });

  // ============================================================================
  // SCENARIO 1: Concentrated Picks (all same stage)
  // ============================================================================
  {
    console.log("\n");
    console.log("📍 SCENARIO 1: CONCENTRATED PICKS (all from same stage)");
    console.log("─".repeat(90));

    const stageCounts: Record<string, Artist[]> = {};
    allArtists.forEach((a) => {
      if (!stageCounts[a.appearance.stage]) {
        stageCounts[a.appearance.stage] = [];
      }
      stageCounts[a.appearance.stage].push(a);
    });
    const stagesByCount = Object.entries(stageCounts).sort((a, b) => b[1].length - a[1].length);
    const concentratedArtists = stagesByCount[0][1].slice(0, 15);

    const concentratedDecisions: Record<string, ArtistDecision> = {};
    concentratedArtists.forEach((a) => {
      concentratedDecisions[a.slug] = decision("mustSee");
    });

    const allSignals = computeAllSignalsTestable(concentratedDecisions, allArtists);
    const ranked = allSignals.sort((a, b) => b.deviation - a.deviation);

    console.log(`\nAll 11 signals (ranked by deviation):\n`);
    ranked.forEach((sig, i) => {
      const top5Marker = i < 5 ? "🏆" : "  ";
      console.log(
        `${top5Marker} ${(i + 1).toString().padStart(2, " ")}. ${sig.name.padEnd(28, " ")} | Deviation: ${sig.deviation.toFixed(1)}pp | User: ${sig.userValue.toFixed(1)}% | Lineup: ${sig.lineupValue.toFixed(1)}%`
      );
    });

    console.log(`\n✨ TOP 5 SIGNALS:`);
    ranked.slice(0, 5).forEach((sig, i) => {
      console.log(`  ${i + 1}. ${sig.name.padEnd(30, " ")} ${sig.deviation.toFixed(1)}pp deviation`);
    });
  }

  // ============================================================================
  // SCENARIO 2: Spread-Out Picks (representative sample)
  // ============================================================================
  {
    console.log("\n\n");
    console.log("📍 SCENARIO 2: SPREAD-OUT PICKS (representative sample)");
    console.log("─".repeat(90));

    const spreadDecisions: Record<string, ArtistDecision> = {};
    const step = Math.floor(allArtists.length / 15);
    let count = 0;
    for (let i = 0; i < allArtists.length && count < 15; i += step) {
      spreadDecisions[allArtists[i].slug] = decision("mustSee");
      count++;
    }

    const allSignals = computeAllSignalsTestable(spreadDecisions, allArtists);
    const ranked = allSignals.sort((a, b) => b.deviation - a.deviation);

    console.log(`\nAll 11 signals (ranked by deviation):\n`);
    ranked.forEach((sig, i) => {
      const top5Marker = i < 5 ? "🏆" : "  ";
      console.log(
        `${top5Marker} ${(i + 1).toString().padStart(2, " ")}. ${sig.name.padEnd(28, " ")} | Deviation: ${sig.deviation.toFixed(1)}pp | User: ${sig.userValue.toFixed(1)}% | Lineup: ${sig.lineupValue.toFixed(1)}%`
      );
    });

    console.log(`\n✨ TOP 5 SIGNALS:`);
    ranked.slice(0, 5).forEach((sig, i) => {
      console.log(`  ${i + 1}. ${sig.name.padEnd(30, " ")} ${sig.deviation.toFixed(1)}pp deviation`);
    });
  }

  // ============================================================================
  // SCENARIO 3: Hyper-Diverse (maximizes diversity)
  // ============================================================================
  {
    console.log("\n\n");
    console.log("📍 SCENARIO 3: HYPER-DIVERSE PICKS (maximize stage/genre/country spread)");
    console.log("─".repeat(90));

    const hyperDecisions: Record<string, ArtistDecision> = {};
    const usedStages = new Set<string>();
    let count = 0;
    for (const artist of allArtists) {
      if (count >= 15) break;
      if (!usedStages.has(artist.appearance.stage)) {
        hyperDecisions[artist.slug] = decision("mustSee");
        usedStages.add(artist.appearance.stage);
        count++;
      }
    }
    for (const artist of allArtists) {
      if (count >= 15) break;
      if (!hyperDecisions[artist.slug]) {
        hyperDecisions[artist.slug] = decision("mustSee");
        count++;
      }
    }

    const allSignals = computeAllSignalsTestable(hyperDecisions, allArtists);
    const ranked = allSignals.sort((a, b) => b.deviation - a.deviation);

    console.log(`\nAll 11 signals (ranked by deviation):\n`);
    ranked.forEach((sig, i) => {
      const top5Marker = i < 5 ? "🏆" : "  ";
      console.log(
        `${top5Marker} ${(i + 1).toString().padStart(2, " ")}. ${sig.name.padEnd(28, " ")} | Deviation: ${sig.deviation.toFixed(1)}pp | User: ${sig.userValue.toFixed(1)}% | Lineup: ${sig.lineupValue.toFixed(1)}%`
      );
    });

    console.log(`\n✨ TOP 5 SIGNALS:`);
    ranked.slice(0, 5).forEach((sig, i) => {
      console.log(`  ${i + 1}. ${sig.name.padEnd(30, " ")} ${sig.deviation.toFixed(1)}pp deviation`);
    });
  }

  console.log("\n");
  console.log("█".repeat(90));
  console.log("VALIDATION: Diversity signals should:");
  console.log("  ✓ Rank high when user genuinely spreads out (Scenario 3)");
  console.log("  ✓ Rank low when user clusters (Scenario 1)");
  console.log("  ✓ Stay near-zero when picks are representative (Scenario 2)");
  console.log("  ✓ Compete fairly with other 8 signals (not dominating, not drowned out)");
  console.log("█".repeat(90));
  console.log("\n");
}
