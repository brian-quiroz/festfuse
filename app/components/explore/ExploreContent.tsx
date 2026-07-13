"use client";

import { useState, useMemo } from "react";
import { allArtists } from "@/app/data/artists";
import Sidebar from "@/app/components/Sidebar";
import ArtistCarousel from "@/app/components/explore/ArtistCarousel";
import QuickPicksBanner from "@/app/components/explore/QuickPicksBanner";
import ExploreFilters from "@/app/components/explore/ExploreFilters";
import { searchArtists } from "@/app/lib/search";
import { filterArtists } from "@/app/lib/filters";
import { shuffleDayBlocks, interleaveByDayShuffled } from "@/app/lib/carousel";
import ArtistResultsGrid from "@/app/components/explore/ArtistResultsGrid";
import ActiveFilters from "@/app/components/explore/ActiveFilters";
import { Shuffle } from "lucide-react";
import { createSeededRandom } from "@/app/lib/random";
import type { Genre, Stage } from "@/app/data/categories";

interface ExploreContentProps {
  seed: number;
}

export default function ExploreContent({ seed }: ExploreContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenres, setActiveGenres] = useState<Genre[]>([]);
  const [activeDay, setActiveDay] = useState<string>("");
  const [activeStages, setActiveStages] = useState<Stage[]>([]);

  // Create separate seeded RNGs for each carousel with derived seeds.
  // Each gets a unique seed (seed + offset) so shuffles are genuinely independent,
  // while staying deterministic per page load (server/client produce identical results).
  const festivalFavoritesRandom = useMemo(() => createSeededRandom(seed), [seed]);
  const hiddenGemsRandom = useMemo(() => createSeededRandom(seed + 1), [seed]);
  const internationalPicksRandom = useMemo(() => createSeededRandom(seed + 2), [seed]);
  const chicagosOwnRandom = useMemo(() => createSeededRandom(seed + 3), [seed]);
  const cinematicVisualsRandom = useMemo(() => createSeededRandom(seed + 4), [seed]);

  // Carousel rows computed with seeded RNG for deterministic, identical server/client rendering
  // See ARCHITECTURE.md § Carousel Presentation Strategies for algorithm details.

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const festivalFavorites = useMemo(
    () =>
      shuffleDayBlocks(
        allArtists.filter(
          (a) =>
            a.appearance.billingTier === "Headliner" ||
            a.appearance.billingTier === "Sub-headliner"
        ),
        festivalFavoritesRandom
      ),
    [festivalFavoritesRandom]
  );

  // Suppress against Festival Favorites (Hidden Gems' premise is "overlooked")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hiddenGems = useMemo(
    () => {
      const shownInFestival = new Set(festivalFavorites.map((a) => a.slug));
      return interleaveByDayShuffled(
        allArtists.filter((a) =>
          a.genres.some((g) =>
            ["Bedroom Pop", "Indie Pop", "Alternative R&B", "Art Pop", "Shoegaze"].includes(g)
          ) &&
          a.appearance.billingTier !== "Headliner" &&
          a.appearance.billingTier !== "Sub-headliner" &&
          !shownInFestival.has(a.slug)
        ),
        hiddenGemsRandom
      );
    },
    [festivalFavorites, hiddenGemsRandom]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const internationalPicks = useMemo(
    () =>
      interleaveByDayShuffled(
        allArtists.filter((a) => a.location.country !== "United States"),
        internationalPicksRandom
      ),
    [internationalPicksRandom]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chicagosOwn = useMemo(
    () =>
      interleaveByDayShuffled(
        allArtists.filter((a) =>
          a.location.city === "Chicago" || a.location.state === "Illinois"
        ),
        chicagosOwnRandom
      ),
    [chicagosOwnRandom]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cinematicVisuals = useMemo(
    () =>
      interleaveByDayShuffled(
        allArtists.filter((a) => a.whatToExpect.includes("Cinematic Visuals")),
        cinematicVisualsRandom
      ),
    [cinematicVisualsRandom]
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#110D24]">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Page header */}
        <div className="px-8 pt-10 pb-0">
          <div className="flex items-start justify-between mb-7">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Explore Artists</h1>
              <p className="text-sm text-white/45 mt-1.5">
                Discover new artists and build your perfect lineup.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#00E5FF] text-[#110D24] text-sm font-bold hover:bg-[#00E5FF]/90 transition-colors mt-1 flex-shrink-0">
              <Shuffle size={14} strokeWidth={2} />
              Surprise Me
            </button>
          </div>

          <ExploreFilters
            onSearchChange={setSearchQuery}
            onGenresChange={setActiveGenres}
            onDayChange={setActiveDay}
            onStagesChange={setActiveStages}
          />
        </div>

        {/* Result count summary */}
        {(() => {
          const hasFilters = activeGenres.length > 0 || activeDay || activeStages.length > 0;
          const hasSearch = searchQuery.trim().length > 0;

          if (!hasFilters && !hasSearch) return null;

          const filtered = filterArtists(allArtists, {
            genres: activeGenres.length > 0 ? activeGenres : undefined,
            day: activeDay || undefined,
            stages: activeStages.length > 0 ? activeStages : undefined,
          });

          const results = hasSearch ? searchArtists(searchQuery, filtered) : filtered;

          let summaryText = "";
          if (hasSearch && hasFilters) {
            summaryText = results.length === 0
              ? `No artists found`
              : `${results.length} result${results.length === 1 ? "" : "s"} for "${searchQuery}"`;
          } else if (hasSearch) {
            summaryText = results.length === 0
              ? `No results for "${searchQuery}"`
              : `${results.length} result${results.length === 1 ? "" : "s"} for "${searchQuery}"`;
          } else {
            summaryText = `${results.length} artist${results.length === 1 ? "" : "s"}`;
          }

          return (
            <div className="px-8 py-3 text-sm text-white/50">
              {summaryText}
            </div>
          );
        })()}

        {/* Four-state rendering */}
        {(() => {
          const hasFilters = activeGenres.length > 0 || activeDay || activeStages.length > 0;
          const hasSearch = searchQuery.trim().length > 0;

          // Apply filters first, then search within filtered results
          const filtered = filterArtists(allArtists, {
            genres: activeGenres.length > 0 ? activeGenres : undefined,
            day: activeDay || undefined,
            stages: activeStages.length > 0 ? activeStages : undefined,
          });

          const results = hasSearch ? searchArtists(searchQuery, filtered) : filtered;

          // State 1: No search, no filters → curated carousels
          if (!hasFilters && !hasSearch) {
            return (
              <div className="pt-10 pb-16 space-y-12">
                <ArtistCarousel title="Festival Favorites" artists={festivalFavorites} cardSize="large" />

                <QuickPicksBanner />

                <ArtistCarousel title="Hidden Gems" artists={hiddenGems} />

                <ArtistCarousel title="International Picks" artists={internationalPicks} />

                <ArtistCarousel title="Chicago's Own" artists={chicagosOwn} />

                <ArtistCarousel title="Cinematic Visuals" artists={cinematicVisuals} />
              </div>
            );
          }

          // State 2 & 4: Filters active (with or without search) → ActiveFilters + ArtistResultsGrid
          if (hasFilters) {
            return (
              <>
                <ActiveFilters
                  genres={activeGenres}
                  day={activeDay}
                  stages={activeStages}
                  onClearGenre={(genre) =>
                    setActiveGenres(activeGenres.filter((g) => g !== genre))
                  }
                  onClearDay={() => setActiveDay("")}
                  onClearStage={(stage) =>
                    setActiveStages(activeStages.filter((s) => s !== stage))
                  }
                  onClearAll={() => {
                    setActiveGenres([]);
                    setActiveDay("");
                    setActiveStages([]);
                  }}
                />
                <div className="pt-10 pb-16">
                  {results.length === 0 ? (
                    <div className="px-8 text-center py-12">
                      <p className="text-white/60">No artists match your filters{hasSearch ? ` and search "${searchQuery}"` : ""}.</p>
                    </div>
                  ) : (
                    <ArtistResultsGrid results={results} />
                  )}
                </div>
              </>
            );
          }

          // State 3: Search only (no filters) → ArtistResultsGrid with search heading
          return (
            <div className="pt-10 pb-16 px-8">
              <h2 className="text-xl font-bold text-white mb-8">
                {results.length === 0
                  ? `No results for "${searchQuery}"`
                  : `${results.length} result${results.length === 1 ? "" : "s"} for "${searchQuery}"`}
              </h2>
              {results.length > 0 && <ArtistResultsGrid results={results} />}
            </div>
          );
        })()}

      </main>
    </div>
  );
}
