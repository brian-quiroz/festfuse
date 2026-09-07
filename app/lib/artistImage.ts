import type { Artist } from "@/app/types/artist";

// Single choke point for whether an artist photo is safe to render — callers should
// use this instead of reading artist.imageUrl directly, so imageVerified can't be
// forgotten at any individual render site. Also carries the local image-review harness
// override (NEXT_PUBLIC_ARTIST_IMAGE_TEST_DIR) — see docs/process/artist-image-sourcing.md.
export function getVerifiedImageUrl(
  artist: Pick<Artist, "slug" | "imageUrl" | "imageVerified">
): string | undefined {
  const testDir = process.env.NEXT_PUBLIC_ARTIST_IMAGE_TEST_DIR;
  if (testDir) return `/${testDir}/${artist.slug}.jpg`;
  return artist.imageVerified ? artist.imageUrl : undefined;
}
