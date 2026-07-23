"use client";

import { useState, useMemo, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { allArtists } from "@/app/data/artists";
import Sidebar from "@/app/components/Sidebar";
import ArtistCarousel from "@/app/components/explore/ArtistCarousel";
import QuickPicksBanner from "@/app/components/explore/QuickPicksBanner";
import ExploreFilters from "@/app/components/explore/ExploreFilters";
import { searchArtists } from "@/app/lib/search";
import { filterArtists } from "@/app/lib/filters";
import {
  shuffleDayBlocks,
  interleaveByDayShuffled,
  AFTER_DARK_THRESHOLD_MINUTES,
} from "@/app/lib/carousel";
import ArtistResultsGrid from "@/app/components/explore/ArtistResultsGrid";
import ActiveFilters from "@/app/components/explore/ActiveFilters";
import { Shuffle, ChevronLeft } from "lucide-react";
import { createSeededRandom } from "@/app/lib/random";
import { sortChronologically, sortFestivalFavoritesForFullView } from "@/app/lib/sort";
import { useDecisionStore } from "@/app/store/decisionStore";
import { useExploreFilterStore } from "@/app/store/exploreFilterStore";
import { useScheduleStore } from "@/app/store/scheduleStore";
import { ACTIVE_FESTIVAL_ID } from "@/app/data/festivals";
import { getPrimaryAppearance, getPrimaryBillingTier } from "@/app/lib/appearances";
import { timeStringToMinutes } from "@/app/lib/time";
import { isChicago } from "@/app/lib/location";
import type { Artist } from "@/app/types/artist";

interface ExploreContentProps {
  seed: number;
}

export default function ExploreContent({ seed }: ExploreContentProps) {
  const router = useRouter();
  const { decisionsByArtist } = useDecisionStore();
  // Artist-slug-keyed, precomputed in scheduleStore.ts — see ARCHITECTURE.md §
  // Multi-Appearance Support.
  const { scheduledArtistSlugs, conflictingArtistSlugs } = useScheduleStore();
  const {
    genres: activeGenres,
    setGenres: setActiveGenres,
    day: activeDay,
    setDay: setActiveDay,
    stages: activeStages,
    setStages: setActiveStages,
    pickStatus,
    setPickStatus,
    scheduleStatus,
    setScheduleStatus,
    searchQuery,
    setSearchQuery,
    viewingCarousel,
    navigationRevision,
    clearFilters,
    showCarousel,
  } = useExploreFilterStore();
  const [showSurpriseTooltip, setShowSurpriseTooltip] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Calculate eligible artists for Surprise Me: only those with no entry in decisionsByArtist
  const eligibleArtists = useMemo(
    () => allArtists.filter((artist) => !decisionsByArtist[artist.slug]),
    [decisionsByArtist]
  );

  // Handle Surprise Me click: pick random eligible artist and navigate
  const handleSurpriseMe = () => {
    if (eligibleArtists.length === 0) return;
    const randomIndex = Math.floor(Math.random() * eligibleArtists.length);
    const selectedArtist = eligibleArtists[randomIndex];
    router.push(`/artist/${selectedArtist.slug}`);
  };

  // genres/day/stages/pickStatus/scheduleStatus/searchQuery/viewingCarousel all live
  // directly in exploreFilterStore and are always current by the time this component reads
  // them — clearFilters()/applyPreset()/showCarousel() set every one of them atomically, so
  // there's nothing left to reconcile via an effect.
  //
  // Reset the results container's scroll position whenever navigation changes the active
  // Explore view. Keyed on navigationRevision (bumped by every one of the three actions
  // above) rather than activeNavItem/viewingCarousel — those can both stay the same value
  // across a click (e.g. re-clicking the already-active My Festival link), where a scroll
  // reset is still the right call. navigationRevision only ever drives this idempotent DOM
  // action, never gates a filter value, so unlike this store's old sidebarNavigationCount
  // there's no staleness for it to introduce.
  useLayoutEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [navigationRevision]);

  // Helper: enter a carousel's full view (resets search/filters via the store)
  const handleSeeAll = (carouselName: string) => {
    showCarousel(carouselName);
  };

  // Helper: return to main explore (resets search/filters via the store, symmetric with handleSeeAll)
  const handleBackToExplore = () => {
    clearFilters();
  };

  // Create separate seeded RNGs for each carousel with derived seeds.
  // Each gets a unique seed (seed + offset) so shuffles are genuinely independent,
  // while staying deterministic per page load (server/client produce identical results).
  const festivalFavoritesRandom = useMemo(() => createSeededRandom(seed), [seed]);
  const hiddenGemsRandom = useMemo(() => createSeededRandom(seed + 1), [seed]);
  const internationalPicksRandom = useMemo(() => createSeededRandom(seed + 2), [seed]);
  const chicagosOwnRandom = useMemo(() => createSeededRandom(seed + 3), [seed]);
  const afterDarkRandom = useMemo(() => createSeededRandom(seed + 4), [seed]);

  // Carousel rows computed with seeded RNG for deterministic, identical server/client rendering
  // See ARCHITECTURE.md § Carousel Presentation Strategies for algorithm details.

  const festivalFavorites = useMemo(
    () =>
      shuffleDayBlocks(
        allArtists.filter((a) => {
          const tier = getPrimaryBillingTier(a, ACTIVE_FESTIVAL_ID);
          return tier === "Headliner" || tier === "Sub-headliner";
        }),
        festivalFavoritesRandom
      ),
    [festivalFavoritesRandom]
  );

  // Suppress against Festival Favorites (Hidden Gems' premise is "overlooked")
  const hiddenGems = useMemo(() => {
    const shownInFestival = new Set(festivalFavorites.map((a) => a.slug));
    return interleaveByDayShuffled(
      allArtists.filter((a) => {
        const tier = getPrimaryBillingTier(a, ACTIVE_FESTIVAL_ID);
        return (
          a.genres.some((g) =>
            ["Bedroom Pop", "Indie Pop", "Alternative R&B", "Art Pop", "Shoegaze"].includes(g)
          ) &&
          tier !== "Headliner" &&
          tier !== "Sub-headliner" &&
          !shownInFestival.has(a.slug)
        );
      }),
      hiddenGemsRandom
    );
  }, [festivalFavorites, hiddenGemsRandom]);

  const internationalPicks = useMemo(
    () =>
      interleaveByDayShuffled(
        allArtists.filter((a) => a.location.country !== "United States"),
        internationalPicksRandom
      ),
    [internationalPicksRandom]
  );

  const chicagosOwn = useMemo(
    () =>
      interleaveByDayShuffled(
        allArtists.filter((a) => isChicago(a.location.city)),
        chicagosOwnRandom
      ),
    [chicagosOwnRandom]
  );

  const afterDark = useMemo(
    () =>
      interleaveByDayShuffled(
        allArtists.filter(
          (a) =>
            timeStringToMinutes(getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).startTime) >=
            AFTER_DARK_THRESHOLD_MINUTES
        ),
        afterDarkRandom
      ),
    [afterDarkRandom]
  );

  // Carousel data map — computed after all carousels are ready, for use in both header and view
  const carouselMap: Record<string, { title: string; artists: Artist[] }> = {
    "festival-favorites": { title: "Festival Favorites", artists: festivalFavorites },
    "hidden-gems": { title: "Hidden Gems", artists: hiddenGems },
    "international-picks": { title: "International Picks", artists: internationalPicks },
    "chicagos-own": { title: "Chicago's Own", artists: chicagosOwn },
    "after-dark": { title: "After Dark", artists: afterDark },
  };

  // Get current carousel data if viewing a carousel
  const currentCarousel = viewingCarousel ? carouselMap[viewingCarousel] : null;

  return (
    <div className="flex h-screen overflow-hidden bg-[#110D24]">
      <Sidebar />
      <main ref={mainRef} className="flex-1 min-w-0 overflow-y-auto">
        {/* Page header — only show when viewing carousels */}
        {!viewingCarousel && (
          <div className="px-8 pt-10 pb-0">
            <div className="flex items-start justify-between mb-7">
              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                  Explore Artists
                </h1>
                <p className="text-sm text-white/45 mt-1.5">
                  Discover new artists and build your perfect lineup.
                </p>
              </div>
              <div
                className="relative"
                onMouseEnter={() => eligibleArtists.length === 0 && setShowSurpriseTooltip(true)}
                onMouseLeave={() => setShowSurpriseTooltip(false)}
              >
                <button
                  onClick={handleSurpriseMe}
                  disabled={eligibleArtists.length === 0}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold flex-shrink-0 transition-colors mt-1 ${
                    eligibleArtists.length === 0
                      ? "bg-[#00E5FF]/30 text-[#110D24]/50 cursor-not-allowed"
                      : "bg-[#00E5FF] text-[#110D24] hover:bg-[#00E5FF]/90"
                  }`}
                >
                  <Shuffle size={14} strokeWidth={2} />
                  Surprise Me
                </button>
                {showSurpriseTooltip && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-white/60 whitespace-nowrap pointer-events-none">
                    All artists reviewed
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Carousel back header — only show when viewing a carousel */}
        {viewingCarousel && currentCarousel && (
          <div className="px-8 pt-10 pb-0">
            <button
              onClick={handleBackToExplore}
              className="flex items-center gap-2 text-white/50 hover:text-white/70 transition-colors mb-7"
            >
              <ChevronLeft size={18} strokeWidth={2} />
              Back to Explore
            </button>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {currentCarousel.title}
              <span className="text-white/50 font-normal ml-2">
                · {currentCarousel.artists.length} artists
              </span>
            </h1>
          </div>
        )}

        {/* Filters — always show */}
        <div className="px-8 pt-6 pb-0">
          <ExploreFilters
            searchQuery={searchQuery}
            selectedGenres={activeGenres}
            selectedDay={activeDay}
            selectedStages={activeStages}
            selectedPickStatus={pickStatus}
            selectedScheduleStatus={scheduleStatus}
            onSearchChange={setSearchQuery}
            onGenresChange={setActiveGenres}
            onDayChange={setActiveDay}
            onStagesChange={setActiveStages}
            onPickStatusChange={setPickStatus}
            onScheduleStatusChange={setScheduleStatus}
          />
        </div>

        {/* Result count summary — only show when viewing carousels, not in carousel detail view */}
        {!viewingCarousel &&
          (() => {
            const hasFilters =
              activeGenres.length > 0 ||
              activeDay ||
              activeStages.length > 0 ||
              pickStatus.length > 0 ||
              scheduleStatus.length > 0;
            const hasSearch = searchQuery.trim().length > 0;

            if (!hasFilters && !hasSearch) return null;

            const filtered = filterArtists(
              allArtists,
              {
                genres: activeGenres.length > 0 ? activeGenres : undefined,
                day: activeDay || undefined,
                stages: activeStages.length > 0 ? activeStages : undefined,
                verdicts: pickStatus.length > 0 ? pickStatus : undefined,
                scheduleStatus: scheduleStatus.length > 0 ? scheduleStatus : undefined,
                scheduledArtistSlugs,
                conflictingArtistSlugs,
              },
              decisionsByArtist
            );

            const results = hasSearch ? searchArtists(searchQuery, filtered) : filtered;

            let summaryText = "";
            if (hasSearch && hasFilters) {
              summaryText =
                results.length === 0
                  ? `No artists found`
                  : `${results.length} result${results.length === 1 ? "" : "s"} for "${searchQuery}"`;
            } else if (hasSearch) {
              summaryText =
                results.length === 0
                  ? `No results for "${searchQuery}"`
                  : `${results.length} result${results.length === 1 ? "" : "s"} for "${searchQuery}"`;
            } else {
              summaryText = `${results.length} artist${results.length === 1 ? "" : "s"}`;
            }

            return <div className="px-8 py-3 text-sm text-white/50">{summaryText}</div>;
          })()}

        {/* Carousel full view */}
        {currentCarousel &&
          (() => {
            // Apply stable sort order: Festival Favorites uses day → tier → time → name,
            // all other carousels use day → time → name
            const sortedArtists =
              viewingCarousel === "festival-favorites"
                ? sortFestivalFavoritesForFullView(currentCarousel.artists)
                : sortChronologically(currentCarousel.artists);

            // Apply additional filters and search if any
            const hasFilters =
              activeGenres.length > 0 ||
              activeDay ||
              activeStages.length > 0 ||
              pickStatus.length > 0 ||
              scheduleStatus.length > 0;
            const hasSearch = searchQuery.trim().length > 0;

            const filtered = filterArtists(
              sortedArtists,
              {
                genres: activeGenres.length > 0 ? activeGenres : undefined,
                day: activeDay || undefined,
                stages: activeStages.length > 0 ? activeStages : undefined,
                verdicts: pickStatus.length > 0 ? pickStatus : undefined,
                scheduleStatus: scheduleStatus.length > 0 ? scheduleStatus : undefined,
                scheduledArtistSlugs,
                conflictingArtistSlugs,
              },
              decisionsByArtist
            );

            const results = hasSearch ? searchArtists(searchQuery, filtered) : filtered;

            return (
              <>
                {/* Active filters bar with Clear all button */}
                {hasFilters && (
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
                    pickStatus={pickStatus}
                    scheduleStatus={scheduleStatus}
                    onClearPickStatus={() => setPickStatus([])}
                    onClearScheduleStatus={() => setScheduleStatus([])}
                    onClearAll={() => {
                      setActiveGenres([]);
                      setActiveDay("");
                      setActiveStages([]);
                      setPickStatus([]);
                      setScheduleStatus([]);
                    }}
                  />
                )}

                {/* Filtered count summary — simplified since total is shown in header */}
                {(hasFilters || hasSearch) && (
                  <div className="px-8 pt-6 pb-3 text-sm text-white/50">
                    {results.length === 0
                      ? "No artists match your filters"
                      : `${results.length} result${results.length === 1 ? "" : "s"}`}
                  </div>
                )}

                {/* Grid */}
                <div className="pt-10 pb-16">
                  {results.length === 0 ? (
                    <div className="px-8 text-center py-12">
                      <p className="text-white/60">No artists match your filters.</p>
                    </div>
                  ) : (
                    <ArtistResultsGrid results={results} />
                  )}
                </div>
              </>
            );
          })()}

        {/* Four-state rendering */}
        {!viewingCarousel &&
          (() => {
            const hasFilters =
              activeGenres.length > 0 ||
              activeDay ||
              activeStages.length > 0 ||
              pickStatus.length > 0 ||
              scheduleStatus.length > 0;
            const hasSearch = searchQuery.trim().length > 0;

            // Apply filters first, then search within filtered results
            const filtered = filterArtists(
              allArtists,
              {
                genres: activeGenres.length > 0 ? activeGenres : undefined,
                day: activeDay || undefined,
                stages: activeStages.length > 0 ? activeStages : undefined,
                verdicts: pickStatus.length > 0 ? pickStatus : undefined,
                scheduleStatus: scheduleStatus.length > 0 ? scheduleStatus : undefined,
                scheduledArtistSlugs,
                conflictingArtistSlugs,
              },
              decisionsByArtist
            );

            const results = hasSearch ? searchArtists(searchQuery, filtered) : filtered;

            // State 1: No search, no filters → curated carousels
            if (!hasFilters && !hasSearch && !viewingCarousel) {
              return (
                <div className="pt-10 pb-16 space-y-12">
                  <ArtistCarousel
                    title="Festival Favorites"
                    artists={festivalFavorites}
                    cardSize="large"
                    carouselType="festival-favorites"
                    onSeeAll={() => handleSeeAll("festival-favorites")}
                  />

                  <QuickPicksBanner />

                  <ArtistCarousel
                    title="Hidden Gems"
                    artists={hiddenGems}
                    carouselType="hidden-gems"
                    onSeeAll={() => handleSeeAll("hidden-gems")}
                  />

                  <ArtistCarousel
                    title="International Picks"
                    artists={internationalPicks}
                    carouselType="international-picks"
                    onSeeAll={() => handleSeeAll("international-picks")}
                  />

                  <ArtistCarousel
                    title="Chicago's Own"
                    artists={chicagosOwn}
                    carouselType="chicagos-own"
                    onSeeAll={() => handleSeeAll("chicagos-own")}
                  />

                  <ArtistCarousel
                    title="After Dark"
                    artists={afterDark}
                    carouselType="after-dark"
                    onSeeAll={() => handleSeeAll("after-dark")}
                  />
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
                    pickStatus={pickStatus}
                    scheduleStatus={scheduleStatus}
                    onClearPickStatus={() => setPickStatus([])}
                    onClearScheduleStatus={() => setScheduleStatus([])}
                    onClearAll={() => {
                      setActiveGenres([]);
                      setActiveDay("");
                      setActiveStages([]);
                      setPickStatus([]);
                      setScheduleStatus([]);
                    }}
                  />
                  <div className="pt-10 pb-16">
                    {results.length === 0 ? (
                      <div className="px-8 text-center py-12">
                        <p className="text-white/60">
                          No artists match your filters
                          {hasSearch ? ` and search "${searchQuery}"` : ""}.
                        </p>
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
