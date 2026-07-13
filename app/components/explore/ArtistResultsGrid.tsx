import type { Artist } from "@/app/types/artist";
import ArtistCard from "./ArtistCard";

interface ArtistResultsGridProps {
  results: Artist[];
}

export default function ArtistResultsGrid({ results }: ArtistResultsGridProps) {
  return (
    <div className="px-8">
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-7">
        {results.map((artist) => (
          <ArtistCard key={artist.slug} artist={artist} responsive />
        ))}
      </div>
    </div>
  );
}
