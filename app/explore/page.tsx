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
import type { Genre, Stage } from "@/app/data/categories";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenres, setActiveGenres] = useState<Genre[]>([]);
  const [activeDay, setActiveDay] = useState<string>("");
  const [activeStages, setActiveStages] = useState<Stage[]>([]);
  // Festival Favorites: sort by billing tier within each day, shuffle day-block order
  // Each day's segment appears in billing tier order (headliner → subheadliner → undercard),
  // but which day's block appears first varies per page load
  // Memoized once per page visit — allArtists doesn't change during session
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const festivalFavorites = useMemo(
    () =>
      shuffleDayBlocks(
        allArtists.filter(
          (a) =>
            a.appearance.billingTier === "Headliner" ||
            a.appearance.billingTier === "Sub-headliner"
        )
      ),
    []
  );

  // Hidden Gems: curatorial row, suppress only against Festival Favorites (Rule B)
  // Pipeline: sort by day → filter (exclude headliners + subheadliners) → shuffle within days → interleave
  // Dependency: [festivalFavorites] because Hidden Gems' filter explicitly reads and excludes
  // artists from Festival Favorites (suppression rule). This is a real data dependency.
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
          !shownInFestival.has(a.slug) // Only suppression: Hidden Gems vs Festival Favorites
        )
      );
    },
    [festivalFavorites]
  );

  // International Picks: factual row, no suppression (Rule A)
  // Pipeline: sort by day → filter → shuffle within days → interleave
  // Memoized once per page visit — allArtists doesn't change during session
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const internationalPicks = useMemo(
    () =>
      interleaveByDayShuffled(
        allArtists.filter((a) => a.location.country !== "United States")
      ),
    []
  );

  // Chicago's Own: factual row, no suppression (Rule A)
  // Pipeline: sort by day → filter → shuffle within days → interleave
  // Memoized once per page visit — allArtists doesn't change during session
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chicagosOwn = useMemo(
    () =>
      interleaveByDayShuffled(
        allArtists.filter((a) =>
          a.location.city === "Chicago" || a.location.state === "Illinois"
        )
      ),
    []
  );

  // Cinematic Visuals: factual row, no suppression (Rule A)
  // Pipeline: sort by day → filter → shuffle within days → interleave
  // Memoized once per page visit — allArtists doesn't change during session
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cinematicVisuals = useMemo(
    () =>
      interleaveByDayShuffled(
        allArtists.filter((a) => a.whatToExpect.includes("Cinematic Visuals"))
      ),
    []
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
