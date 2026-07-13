"use client";

import { useState } from "react";
import { allArtists } from "@/app/data/artists";
import Sidebar from "@/app/components/Sidebar";
import ArtistCarousel from "@/app/components/explore/ArtistCarousel";
import QuickPicksBanner from "@/app/components/explore/QuickPicksBanner";
import ExploreFilters from "@/app/components/explore/ExploreFilters";
import { searchArtists } from "@/app/lib/search";
import { filterArtists } from "@/app/lib/filters";
import ArtistResultsGrid from "@/app/components/explore/ArtistResultsGrid";
import ActiveFilters from "@/app/components/explore/ActiveFilters";
import { Shuffle } from "lucide-react";
import type { Genre, Stage } from "@/app/data/categories";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenres, setActiveGenres] = useState<Genre[]>([]);
  const [activeDay, setActiveDay] = useState<string>("");
  const [activeStages, setActiveStages] = useState<Stage[]>([]);
  const festivalFavorites = allArtists.filter(
    (a) => a.appearance.billingTier === "Headliner" || a.appearance.billingTier === "Sub-headliner"
  );
  const newToYou = allArtists.filter(
    (a) => !a.appearance.billingTier || a.appearance.billingTier === "Undercard"
  );
  const hiddenGems = allArtists.filter((a) =>
    a.genres.some((g) =>
      ["Bedroom Pop", "Indie Pop", "Alternative R&B", "Art Pop", "Shoegaze"].includes(g)
    )
  );
  const raveEnergy = allArtists.filter((a) =>
    a.genres.some((g) =>
      ["Electronic", "Dancehall", "Dance Pop", "J-Pop", "K-Pop", "Psychedelic Rock"].includes(g)
    )
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

                <ArtistCarousel title="New To You" artists={newToYou} />

                <ArtistCarousel title="Hidden Gems" artists={hiddenGems} />

                <ArtistCarousel title="Rave Energy" artists={raveEnergy} />
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
