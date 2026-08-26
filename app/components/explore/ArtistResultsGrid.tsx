import type { RunArtist } from "@/app/lib/api/mapRunAppearance";
import ArtistCard from "./ArtistCard";

interface ArtistResultsGridProps {
  results: RunArtist[];
}

export default function ArtistResultsGrid({ results }: ArtistResultsGridProps) {
  return (
    <div className="px-4 sm:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-x-3 sm:gap-x-4 gap-y-6 sm:gap-y-7">
        {results.map((artist) => (
          <ArtistCard key={artist.slug} artist={artist} responsive />
        ))}
      </div>
    </div>
  );
}
