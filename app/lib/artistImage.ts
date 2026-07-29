import type { Artist } from "@/app/types/artist";

// Single choke point for whether an artist photo is safe to render — callers should
// use this instead of reading artist.imageUrl directly, so imageVerified can't be
// forgotten at any individual render site.
export function getVerifiedImageUrl(artist: Artist): string | undefined {
  return artist.imageVerified ? artist.imageUrl : undefined;
}
