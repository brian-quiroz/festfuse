import { allArtists } from "@/app/data/artists"
import Sidebar from "@/app/components/Sidebar"
import ArtistCarousel from "@/app/components/explore/ArtistCarousel"
import QuickPicksBanner from "@/app/components/explore/QuickPicksBanner"
import ExploreFilters from "@/app/components/explore/ExploreFilters"
import { Star, Compass, Gem, Zap, Shuffle } from "lucide-react"

export default function ExplorePage() {
  // Section groupings — curated manually until we have more artists and real personalization
  const festivalFavorites = allArtists
  const newToYou = [allArtists[2], allArtists[3], allArtists[0], allArtists[1]]
  const hiddenGems = [allArtists[3], allArtists[2], allArtists[1], allArtists[0]]
  const raveEnergy = [allArtists[3], allArtists[0], allArtists[2], allArtists[1]]

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
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 text-white/50 text-sm font-medium hover:border-white/25 hover:text-white/70 transition-colors mt-1 flex-shrink-0">
              <Shuffle size={14} strokeWidth={2} />
              Surprise Me
            </button>
          </div>

          <ExploreFilters />
        </div>

        {/* Sections */}
        <div className="pt-10 pb-16 space-y-12">

          <ArtistCarousel
            title="Festival Favorites"
            subtitle="Top picks everyone's excited about."
            icon={<Star size={15} fill="currentColor" strokeWidth={0} className="text-[#E8FF47]" />}
            artists={festivalFavorites}
            cardSize="large"
          />

          <QuickPicksBanner previewArtists={allArtists} />

          <ArtistCarousel
            title="New To You"
            subtitle="Emerging artists on the rise."
            icon={<Compass size={15} strokeWidth={2} className="text-[#00E5FF]" />}
            artists={newToYou}
          />

          <ArtistCarousel
            title="Hidden Gems"
            subtitle="Underrated acts worth catching."
            icon={<Gem size={15} strokeWidth={2} className="text-[#00E5FF]" />}
            artists={hiddenGems}
          />

          <ArtistCarousel
            title="Rave Energy"
            subtitle="High-energy sets for the late-night crowd."
            icon={<Zap size={15} fill="currentColor" strokeWidth={0} className="text-[#E8FF47]" />}
            artists={raveEnergy}
          />

        </div>
      </main>
    </div>
  )
}
