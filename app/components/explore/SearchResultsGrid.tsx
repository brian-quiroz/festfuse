import type { Artist } from "@/app/types/artist";
import ArtistCard from "./ArtistCard";

interface SearchResultsGridProps {
  query: string;
  results: Artist[];
}

export default function SearchResultsGrid({ query, results }: SearchResultsGridProps) {
  return (
    <div className="px-8">
      <h2 className="text-xl font-bold text-white mb-8">
        {results.length === 0
          ? `No results for "${query}"`
          : `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`}
      </h2>
      {results.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-7">
          {results.map((artist) => (
            <ArtistCard key={artist.slug} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
}
