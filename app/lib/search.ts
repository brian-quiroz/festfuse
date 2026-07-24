import type { Artist } from "@/app/types/artist";
import { ACTIVE_FESTIVAL_ID } from "@/app/data/festivals";
import { getPrimaryAppearance } from "@/app/lib/appearances";

/**
 * Search artists by query string, ranked by field priority.
 *
 * Matching logic:
 * - Checks fields in strict priority order (name exact → name partial → genre →
 *   country → state → city → stage)
 * - Stops at the FIRST matching field, does not continue checking
 * - Case-insensitive substring match only
 * - Only searches trustworthy, structured artist data. Does not search `tagline`,
 *   `whySee`, `whatToExpect`, or `bestFor` — those are unverified AI-generated prose,
 *   not something a query match should be able to surface an artist by.
 *
 * Minimum query length:
 * - Artist name (exact & partial): NO minimum — "V" should match artist "V" or "Vince Staples"
 * - All other fields (genre, location, stage): MINIMUM 2 characters
 *   This prevents single-character queries from matching too broadly
 *
 * @param query - Search query string
 * @param artists - Array of artists to search
 * @returns Ranked array of matching artists (best matches first)
 */
export function searchArtists(query: string, artists: Artist[]): Artist[] {
  const normalizedQuery = query.toLowerCase().trim();

  // Early exit: empty query
  if (!normalizedQuery) return [];

  const results = artists
    .map((artist) => {
      // Priority 0: Exact artist name match (no minimum length)
      if (artist.name.toLowerCase() === normalizedQuery) {
        return { artist, priority: 0 };
      }

      // Priority 1: Partial/substring artist name match (no minimum length)
      if (artist.name.toLowerCase().includes(normalizedQuery)) {
        return { artist, priority: 1 };
      }

      // All other fields require minimum 2 characters
      if (normalizedQuery.length < 2) {
        return null;
      }

      // Priority 2: Genre
      if (artist.genres.some((genre) => genre.toLowerCase().includes(normalizedQuery))) {
        return { artist, priority: 2 };
      }

      // Priority 3: Country
      if (artist.location.country.toLowerCase().includes(normalizedQuery)) {
        return { artist, priority: 3 };
      }

      // Priority 4: State (optional field)
      if (artist.location.state && artist.location.state.toLowerCase().includes(normalizedQuery)) {
        return { artist, priority: 4 };
      }

      // Priority 5: City
      if (artist.location.city.toLowerCase().includes(normalizedQuery)) {
        return { artist, priority: 5 };
      }

      // Priority 6: Stage — considers only the artist's primary appearance, per
      // app/lib/appearances.ts; a secondary appearance's stage never produces a match.
      if (
        getPrimaryAppearance(artist, ACTIVE_FESTIVAL_ID).stage.toLowerCase().includes(normalizedQuery)
      ) {
        return { artist, priority: 6 };
      }

      return null;
    })
    .filter((result): result is { artist: Artist; priority: number } => result !== null)
    .sort((a, b) => a.priority - b.priority)
    .map((result) => result.artist);

  return results;
}
