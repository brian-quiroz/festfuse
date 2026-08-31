"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Shuffle, ChevronLeft } from "lucide-react";
import { GENRES } from "@/app/data/categories";
import Footer from "@/app/components/Footer";
import AppearancesUnavailable from "@/app/components/AppearancesUnavailable";
import ArtistCarousel from "@/app/components/explore/ArtistCarousel";
import AnnouncedArtistCard from "@/app/components/explore/AnnouncedArtistCard";
import ArtistResultsGrid from "@/app/components/explore/ArtistResultsGrid";
import ExploreFilters from "@/app/components/explore/ExploreFilters";
import ActiveFilters from "@/app/components/explore/ActiveFilters";
import QuickPicksBanner from "@/app/components/explore/QuickPicksBanner";
import { filterArtists } from "@/app/lib/filters";
import { searchArtists } from "@/app/lib/search";
import { interleaveByTierShuffled, shuffleArray } from "@/app/lib/carousel";
import { sortAnnouncedByTier } from "@/app/lib/sort";
import { createSeededRandom } from "@/app/lib/random";
import { isEditionCity } from "@/app/lib/location";
import { artistHref, contextHref, findEdition } from "@/app/data/festivals";
import { useEditionDecisions } from "@/app/store/decisionStore";
import { useExploreFilterStore } from "@/app/store/exploreFilterStore";
import { useAnnouncedRunArtists } from "@/app/store/announcedRunArtistsStore";
import { getAnnouncedRunArtistsFromApi } from "@/app/lib/api/mapRunArtist";
import { useRunContext, useRunDays } from "@/app/components/RunContextProvider";
import type { RunArtist } from "@/app/lib/api/mapRunAppearance";

// Explore for an announced run — lineup, no schedule yet (ADR-0016). A separate render
// path from ExploreContent, not a mode branch inside it: there is no day axis at all,
// so the Day/Stage/Schedule-Status facets, the After Dark carousel, and per-day
// grouping are gone rather than conditionally hidden. Shared pure logic (filterArtists,
// searchArtists) is reused directly. See ARCHITECTURE.md § Announced-Lineup Mode.
export default function AnnouncedExploreContent({ seed }: { seed: number }) {
  const router = useRouter();
  const { editionSlug, runSlug } = useRunContext();
  const dayOrder = useRunDays();
  const decisionsByArtist = useEditionDecisions(editionSlug);
  const {
    genres: activeGenres,
    setGenres: setActiveGenres,
    day,
    stages,
    scheduleStatus,
    pickStatus,
    setPickStatus,
    searchQuery,
    setSearchQuery,
    viewingCarousel,
    navigationRevision,
    clearFilters,
    showCarousel,
    setDay,
    setStages,
    setScheduleStatus,
  } = useExploreFilterStore();
  const [showSurpriseTooltip, setShowSurpriseTooltip] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // A day/stage/schedule selection carried over from a scheduled run (the store is
  // persisted and app-wide) would silently filter this grid to nothing — those facets
  // aren't shown here to clear by hand. Reset them if any is set.
  useEffect(() => {
    if (day) setDay("");
    if (stages.length > 0) setStages([]);
    if (scheduleStatus.length > 0) setScheduleStatus([]);
  }, [day, stages, scheduleStatus, setDay, setStages, setScheduleStatus]);

  const { artists: apiArtists, loadState } = useAnnouncedRunArtists(editionSlug, runSlug);
  const runArtists = useMemo(() => getAnnouncedRunArtistsFromApi(apiArtists), [apiArtists]);

  const availableGenres = useMemo(
    () => GENRES.filter((genre) => runArtists.some((artist) => artist.genres.includes(genre))),
    [runArtists]
  );

  const eligibleArtists = useMemo(
    () => runArtists.filter((artist) => !decisionsByArtist[artist.slug]),
    [runArtists, decisionsByArtist]
  );

  const handleSurpriseMe = () => {
    if (eligibleArtists.length === 0) return;
    const picked = eligibleArtists[Math.floor(Math.random() * eligibleArtists.length)];
    router.push(artistHref({ editionSlug, runSlug }, picked.slug));
  };

  useLayoutEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [navigationRevision]);

  const editionCity = findEdition(editionSlug)?.city ?? "";

  const favoritesRandom = useMemo(() => createSeededRandom(seed), [seed]);
  const internationalRandom = useMemo(() => createSeededRandom(seed + 1), [seed]);
  const cityRandom = useMemo(() => createSeededRandom(seed + 2), [seed]);

  const festivalFavorites = useMemo(
    () =>
      interleaveByTierShuffled(
        runArtists.filter(
          (a) => a.billingTier === "Headliner" || a.billingTier === "Sub-headliner"
        ),
        favoritesRandom
      ),
    [runArtists, favoritesRandom]
  );
  const international = useMemo(
    () => shuffleArray(runArtists.filter((a) => a.location.country !== "United States"), internationalRandom),
    [runArtists, internationalRandom]
  );
  const cityArtists = useMemo(
    () => shuffleArray(runArtists.filter((a) => isEditionCity(a.location.city, editionCity)), cityRandom),
    [runArtists, editionCity, cityRandom]
  );
  const cityTitle = `${editionCity || "Local"}'s Own`;

  const carouselMap: Record<string, { title: string; artists: RunArtist[] }> = {
    "festival-favorites": { title: "Festival Favorites", artists: festivalFavorites },
    "international-picks": { title: "International Picks", artists: international },
    "chicagos-own": { title: cityTitle, artists: cityArtists },
  };
  const currentCarousel = viewingCarousel ? carouselMap[viewingCarousel] : null;

  const hasFilters = activeGenres.length > 0 || pickStatus.length > 0;
  const hasSearch = searchQuery.trim().length > 0;

  const filtered = useMemo(
    () =>
      filterArtists(
        runArtists,
        {
          festivalId: editionSlug,
          dayOrder,
          genres: activeGenres.length > 0 ? activeGenres : undefined,
          verdicts: pickStatus.length > 0 ? pickStatus : undefined,
        },
        decisionsByArtist
      ),
    [runArtists, editionSlug, dayOrder, activeGenres, pickStatus, decisionsByArtist]
  );
  const results = hasSearch
    ? searchArtists(searchQuery, filtered, editionSlug, dayOrder)
    : sortAnnouncedByTier(filtered);

  if (loadState === "error") {
    return (
      <main className="flex-1 min-w-0 overflow-y-auto themed-scrollbar flex flex-col">
        <AppearancesUnavailable />
      </main>
    );
  }

  const clearAllFacets = () => {
    setActiveGenres([]);
    setPickStatus([]);
  };

  return (
    <main ref={mainRef} className="flex-1 min-w-0 overflow-y-auto themed-scrollbar flex flex-col">
      <div className="flex-1 w-full max-w-[1760px] mx-auto">
        {!viewingCarousel && (
          <div className="px-4 sm:px-8 pt-10 pb-0">
            <div className="flex items-start justify-between gap-3 mb-7">
              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Explore Artists</h1>
                <p className="text-sm text-white/45 mt-1.5">No pressure. Just explore.</p>
              </div>
              {runArtists.length > 0 && (
                <div
                  className="relative"
                  onMouseEnter={() => eligibleArtists.length === 0 && setShowSurpriseTooltip(true)}
                  onMouseLeave={() => setShowSurpriseTooltip(false)}
                >
                  <button
                    onClick={handleSurpriseMe}
                    disabled={eligibleArtists.length === 0}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 whitespace-nowrap border transition-all duration-200 ${
                      eligibleArtists.length === 0
                        ? "border-white/10 text-white/25 cursor-not-allowed"
                        : "border-[#00E5FF]/25 text-white/60 hover:border-[#00E5FF]/60 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 hover:shadow-[0_0_14px_rgba(0,229,255,0.25)]"
                    }`}
                  >
                    <Shuffle
                      size={12}
                      strokeWidth={2}
                      className={eligibleArtists.length === 0 ? undefined : "text-[#00E5FF]/80"}
                    />
                    Surprise Me
                  </button>
                  {showSurpriseTooltip && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-white/60 whitespace-nowrap pointer-events-none">
                      All artists reviewed
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {viewingCarousel && currentCarousel && (
          <div className="px-4 sm:px-8 pt-10 pb-0">
            <button
              onClick={() => clearFilters()}
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

        <div className="px-4 sm:px-8 pt-6 pb-0">
          <ExploreFilters
            availableGenres={availableGenres}
            days={[]}
            availableStages={[]}
            showDay={false}
            showStage={false}
            showScheduleStatus={false}
            searchPlaceholder="Search artists, genres, or locations..."
            searchQuery={searchQuery}
            selectedGenres={activeGenres}
            selectedPickStatus={pickStatus}
            onSearchChange={setSearchQuery}
            onGenresChange={setActiveGenres}
            onPickStatusChange={setPickStatus}
          />
        </div>

        {!viewingCarousel && (hasFilters || hasSearch) && (
          <div className="px-4 sm:px-8 py-3 text-sm text-white/50">
            {hasSearch
              ? results.length === 0
                ? `No results for "${searchQuery}"`
                : `${results.length} result${results.length === 1 ? "" : "s"} for "${searchQuery}"`
              : `${results.length} artist${results.length === 1 ? "" : "s"}`}
          </div>
        )}

        {/* Carousel full view */}
        {currentCarousel && (
          <>
            {hasFilters && (
              <ActiveFilters
                genres={activeGenres}
                pickStatus={pickStatus}
                onClearGenre={(g) => setActiveGenres(activeGenres.filter((x) => x !== g))}
                onClearPickStatus={() => setPickStatus([])}
                onClearAll={clearAllFacets}
              />
            )}
            <div className="pt-10 pb-16">
              {(() => {
                const base =
                  viewingCarousel === "festival-favorites"
                    ? sortAnnouncedByTier(currentCarousel.artists)
                    : [...currentCarousel.artists].sort((a, b) => a.name.localeCompare(b.name));
                const scoped = filterArtists(
                  base,
                  {
                    festivalId: editionSlug,
                    dayOrder,
                    genres: activeGenres.length > 0 ? activeGenres : undefined,
                    verdicts: pickStatus.length > 0 ? pickStatus : undefined,
                  },
                  decisionsByArtist
                );
                const shown = hasSearch
                  ? searchArtists(searchQuery, scoped, editionSlug, dayOrder)
                  : scoped;
                return shown.length === 0 ? (
                  <div className="px-4 sm:px-8 text-center py-12">
                    <p className="text-white/60">No artists match your filters.</p>
                  </div>
                ) : (
                  <ArtistResultsGrid results={shown} CardComponent={AnnouncedArtistCard} />
                );
              })()}
            </div>
          </>
        )}

        {/* Default / filtered / searched */}
        {!viewingCarousel && (
          <>
            {!hasFilters && !hasSearch && (
              <div className="pt-10 pb-16 space-y-12">
                <ArtistCarousel
                  title="Festival Favorites"
                  artists={festivalFavorites}
                  cardSize="large"
                  carouselType="festival-favorites"
                  onSeeAll={() => showCarousel("festival-favorites")}
                  CardComponent={AnnouncedArtistCard}
                />
                <QuickPicksBanner href={contextHref({ editionSlug, runSlug }, "quick-picks")} />
                <ArtistCarousel
                  title="International Picks"
                  artists={international}
                  carouselType="international-picks"
                  onSeeAll={() => showCarousel("international-picks")}
                  CardComponent={AnnouncedArtistCard}
                />
                <ArtistCarousel
                  title={cityTitle}
                  artists={cityArtists}
                  carouselType="chicagos-own"
                  onSeeAll={() => showCarousel("chicagos-own")}
                  CardComponent={AnnouncedArtistCard}
                />
              </div>
            )}

            {hasFilters && (
              <>
                <ActiveFilters
                  genres={activeGenres}
                  pickStatus={pickStatus}
                  onClearGenre={(g) => setActiveGenres(activeGenres.filter((x) => x !== g))}
                  onClearPickStatus={() => setPickStatus([])}
                  onClearAll={clearAllFacets}
                />
                <div className="pt-10 pb-16">
                  {results.length === 0 ? (
                    <div className="px-4 sm:px-8 text-center py-12">
                      <p className="text-white/60">
                        No artists match your filters{hasSearch ? ` and search "${searchQuery}"` : ""}.
                      </p>
                    </div>
                  ) : (
                    <ArtistResultsGrid results={results} CardComponent={AnnouncedArtistCard} />
                  )}
                </div>
              </>
            )}

            {!hasFilters && hasSearch && (
              <div className="pt-10 pb-16 px-4 sm:px-8">
                <h2 className="text-xl font-bold text-white mb-8">
                  {results.length === 0
                    ? `No results for "${searchQuery}"`
                    : `${results.length} result${results.length === 1 ? "" : "s"} for "${searchQuery}"`}
                </h2>
                {results.length > 0 && <ArtistResultsGrid results={results} CardComponent={AnnouncedArtistCard} />}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
