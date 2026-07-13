"use client";

import { useState } from "react";
import { allArtists } from "@/app/data/artists";
import Sidebar from "@/app/components/Sidebar";
import ArtistCarousel from "@/app/components/explore/ArtistCarousel";
import QuickPicksBanner from "@/app/components/explore/QuickPicksBanner";
import ExploreFilters from "@/app/components/explore/ExploreFilters";
import { searchArtists } from "@/app/lib/search";
import SearchResultsGrid from "@/app/components/explore/SearchResultsGrid";
import { Shuffle } from "lucide-react";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
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

          <ExploreFilters onSearchChange={setSearchQuery} />
        </div>

        {/* Sections */}
        <div className="pt-10 pb-16">
          {searchQuery ? (
            <SearchResultsGrid query={searchQuery} results={searchArtists(searchQuery, allArtists)} />
          ) : (
            <div className="space-y-12">
              <ArtistCarousel title="Festival Favorites" artists={festivalFavorites} cardSize="large" />

              <QuickPicksBanner />

              <ArtistCarousel title="New To You" artists={newToYou} />

              <ArtistCarousel title="Hidden Gems" artists={hiddenGems} />

              <ArtistCarousel title="Rave Energy" artists={raveEnergy} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
