import { readdirSync } from "node:fs";
import { join } from "node:path";

// Local image-review harness (see getVerifiedImageUrl and
// docs/process/artist-image-sourcing.md). Lists the slugs sitting in the review
// directory named by NEXT_PUBLIC_ARTIST_IMAGE_TEST_DIR, so the similar-artist row on
// Artist Detail can preview a sourced batch even for artists that have no real
// similar set yet. Server-only (reads the filesystem); returns [] in production.
//
// Returns a loosely shuffled slice so refreshes rotate through the batch (usually
// ~6 files). Pass the current artist's slug to keep it out of its own similar row.
export function reviewHarnessSlugs(excludeSlug?: string, limit = 4): string[] {
  const dir = process.env.NEXT_PUBLIC_ARTIST_IMAGE_TEST_DIR;
  if (!dir) return [];
  try {
    const slugs = readdirSync(join(process.cwd(), "public", dir))
      .filter((f) => f.toLowerCase().endsWith(".jpg"))
      .map((f) => f.slice(0, -4))
      .filter((s) => s !== excludeSlug);
    for (let i = slugs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [slugs[i], slugs[j]] = [slugs[j], slugs[i]];
    }
    return slugs.slice(0, limit);
  } catch {
    return [];
  }
}
