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
import { shuffleDayBlocks, interleaveByDayShuffled } from "@/app/lib/carousel";
import ArtistResultsGrid from "@/app/components/explore/ArtistResultsGrid";
import ActiveFilters from "@/app/components/explore/ActiveFilters";
import { Shuffle, ChevronLeft } from "lucide-react";
import { createSeededRandom } from "@/app/lib/random";
import { sortChronologically, sortFestivalFavoritesForFullView } from "@/app/lib/sort";
import { useDecisionStore } from "@/app/store/decisionStore";
import { useExploreFilterStore } from "@/app/store/exploreFilterStore";
import { useScheduleStore } from "@/app/store/scheduleStore";
import { getConflictingArtists } from "@/app/lib/schedule";
import type { Genre, Stage } from "@/app/data/categories";
import type { Artist } from "@/app/types/artist";

interface ExploreContentProps {
  seed: number;
}

export default function ExploreContent({ seed }: ExploreContentProps) {
  const router = useRouter();
  const { decisionsByArtist } = useDecisionStore();
  const { scheduledArtists } = useScheduleStore();
  const {
    preAppliedGenres,
    preAppliedDay,
    preAppliedStages,
    preAppliedPickStatus,
    preAppliedScheduleStatus,
    pickStatus,
    setPickStatus,
    scheduleStatus,
    setScheduleStatus,
    sidebarNavigationCount,
    clearAllPreAppliedFilters,
  } = useExploreFilterStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenres, setActiveGenres] = useState<Genre[]>([]);
  const [activeDay, setActiveDay] = useState<string>("");
  const [activeStages, setActiveStages] = useState<Stage[]>([]);
  const [viewingCarousel, setViewingCarousel] = useState<string | null>(null);
  const [showSurpriseTooltip, setShowSurpriseTooltip] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Compute conflicting artists once
  const conflictingArtists = useMemo(
    () => getConflictingArtists(scheduledArtists, allArtists),
    [scheduledArtists]
  );

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

  // Apply pre-applied filters from sidebar navigation (on mount or when sidebar link clicked)
  // Must apply unconditionally (including null/empty values) to clear stale local state when switching between sidebar links
  // sidebarNavigationCount in dependencies ensures effects re-run even when pre-applied values don't change (e.g., clearing from null to null)
  // useLayoutEffect ensures clearing happens before paint, preventing view-mode flicker
  useLayoutEffect(() => {
    setActiveGenres(preAppliedGenres || []);
  }, [preAppliedGenres, sidebarNavigationCount]);

  useLayoutEffect(() => {
    setActiveDay(preAppliedDay || "");
  }, [preAppliedDay, sidebarNavigationCount]);

  useLayoutEffect(() => {
    setActiveStages(preAppliedStages || []);
  }, [preAppliedStages, sidebarNavigationCount]);

  useLayoutEffect(() => {
    setPickStatus(preAppliedPickStatus || []);
  }, [preAppliedPickStatus, sidebarNavigationCount]);

  useLayoutEffect(() => {
    setScheduleStatus(preAppliedScheduleStatus || []);
  }, [preAppliedScheduleStatus, sidebarNavigationCount]);

  // Sidebar/Explore navigation always means "leave carousel detail view, back to top of results" —
  // viewingCarousel and scroll position have no store-backed pre-applied equivalent, so both must
  // be reset directly here rather than via the preAppliedX sync pattern above. Same reasoning as
  // handleSeeAll's explicit scrollTo: this container's scroll isn't touched by Next's own navigation.
  useLayoutEffect(() => {
    setViewingCarousel(null);
    mainRef.current?.scrollTo(0, 0);
  }, [sidebarNavigationCount]);

  // Helper: Reset search/filter state and enter carousel view
  const handleSeeAll = (carouselName: string) => {
    // Clear any unapplied sidebar filters (defensive: guards against sidebar navigation + See All race)
    clearAllPreAppliedFilters();
    setSearchQuery("");
    setActiveGenres([]);
    setActiveDay("");
    setActiveStages([]);
    setPickStatus([]);
    setScheduleStatus([]);
    setViewingCarousel(carouselName);
    // Scroll to top so user sees the carousel header
    mainRef.current?.scrollTo(0, 0);
  };

  // Helper: Reset search/filter state and return to main explore (symmetric with handleSeeAll)
  const handleBackToExplore = () => {
    // Clear any unapplied sidebar filters (defensive: guards against sidebar navigation + Back race)
    clearAllPreAppliedFilters();
    setSearchQuery("");
    setActiveGenres([]);
    setActiveDay("");
    setActiveStages([]);
    setPickStatus([]);
    setScheduleStatus([]);
    setViewingCarousel(null);
  };

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
            a.appearance.billingTier === "Headliner" || a.appearance.billingTier === "Sub-headliner"
        ),
        festivalFavoritesRandom
      ),
    [festivalFavoritesRandom]
  );

  // Suppress against Festival Favorites (Hidden Gems' premise is "overlooked")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hiddenGems = useMemo(() => {
    const shownInFestival = new Set(festivalFavorites.map((a) => a.slug));
    return interleaveByDayShuffled(
      allArtists.filter(
        (a) =>
          a.genres.some((g) =>
            ["Bedroom Pop", "Indie Pop", "Alternative R&B", "Art Pop", "Shoegaze"].includes(g)
          ) &&
          a.appearance.billingTier !== "Headliner" &&
          a.appearance.billingTier !== "Sub-headliner" &&
          !shownInFestival.has(a.slug)
      ),
      hiddenGemsRandom
    );
  }, [festivalFavorites, hiddenGemsRandom]);

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
        allArtists.filter((a) => a.location.city === "Chicago" || a.location.state === "Illinois"),
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

  // Carousel data map — computed after all carousels are ready, for use in both header and view
  const carouselMap: Record<string, { title: string; artists: Artist[] }> = {
    "festival-favorites": { title: "Festival Favorites", artists: festivalFavorites },
    "hidden-gems": { title: "Hidden Gems", artists: hiddenGems },
    "international-picks": { title: "International Picks", artists: internationalPicks },
    "chicagos-own": { title: "Chicago's Own", artists: chicagosOwn },
    "cinematic-visuals": { title: "Cinematic Visuals", artists: cinematicVisuals },
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
                scheduledArtists,
                conflictingArtists,
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
                scheduledArtists,
                conflictingArtists,
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
                scheduledArtists,
                conflictingArtists,
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
                    title="Cinematic Visuals"
                    artists={cinematicVisuals}
                    carouselType="cinematic-visuals"
                    onSeeAll={() => handleSeeAll("cinematic-visuals")}
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
