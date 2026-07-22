import { Headphones } from "lucide-react";
import type { Artist } from "@/app/types/artist";
import { parseSpotifyArtistId } from "@/app/lib/spotify";
import SpotifyArtistEmbed from "@/app/components/ui/SpotifyArtistEmbed";

// Self-contained: returns null when there's no valid Spotify artist URL, so the parent
// can render it unconditionally. Prototype checkpoint — uses the artist-level embed via
// artist.socials.spotify, not the curated per-track spotifyId data, while this artist-
// embed approach is being visually evaluated against the prior curated-tracks version.
export default function ListenFirstSection({ artist }: { artist: Artist }) {
  const spotifyArtistId = parseSpotifyArtistId(artist.socials.spotify);
  if (!spotifyArtistId) return null;

  return (
    <section>
      <h3 className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
        <Headphones size={15} strokeWidth={2} className="text-[#00E5FF] flex-shrink-0" />
        Listen First
      </h3>
      <SpotifyArtistEmbed artistId={spotifyArtistId} artistName={artist.name} />
    </section>
  );
}
