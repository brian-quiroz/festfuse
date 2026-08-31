import type { RunArtist } from "@/app/lib/api/mapRunAppearance";
import ArtistCard from "./ArtistCard";

interface ArtistResultsGridProps {
  results: RunArtist[];
  // The card to render per artist. Defaults to the scheduled ArtistCard; announced
  // Explore (ADR-0016) passes AnnouncedArtistCard.
  CardComponent?: React.ComponentType<{ artist: RunArtist; responsive?: boolean }>;
}

export default function ArtistResultsGrid({
  results,
  CardComponent = ArtistCard,
}: ArtistResultsGridProps) {
  return (
    <div className="px-4 sm:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-x-3 sm:gap-x-4 gap-y-6 sm:gap-y-7">
        {results.map((artist) => (
          <CardComponent key={artist.slug} artist={artist} responsive />
        ))}
      </div>
    </div>
  );
}
