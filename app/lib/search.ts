import type { RunArtist } from "@/app/lib/api/mapRunAppearance";
import { getPrimaryAppearance } from "@/app/lib/appearances";
import { isUKConstituentCountry } from "@/app/lib/location";

/**
 * Search artists by query string, ranked by field priority.
 *
 * Matching logic:
 * - Checks fields in strict priority order (name exact → slug exact → name partial →
 *   slug partial → genre → country → state → city → stage)
 * - Stops at the FIRST matching field, does not continue checking
 * - Case-insensitive substring match only
 * - Slug is checked alongside name so artists with non-ASCII characters in their
 *   display name (e.g. "RØZ", "ADÉLA") stay findable via their plain-ASCII slug
 *   ("roz", "adela") — see ARCHITECTURE.md § Slug Naming Convention
 * - Only searches trustworthy, structured artist data. Does not search `tagline`,
 *   `whySee`, `whatToExpect`, or `bestFor` — those are unverified AI-generated prose,
 *   not something a query match should be able to surface an artist by.
 *
 * Minimum query length:
 * - Artist name and slug (exact & partial): NO minimum — "V" should match artist "V" or "Vince Staples"
 * - All other fields (genre, location, stage): MINIMUM 2 characters
 *   This prevents single-character queries from matching too broadly
 *
 * @param query - Search query string
 * @param artists - Array of artists to search
 * @param festivalId - Active edition slug, for resolving each artist's primary appearance
 * @param dayOrder - The run's weekday order, for the same
 * @returns Ranked array of matching artists (best matches first)
 */
export function searchArtists(
  query: string,
  artists: RunArtist[],
  festivalId: string,
  dayOrder: readonly string[]
): RunArtist[] {
  const normalizedQuery = query.toLowerCase().trim();

  // Early exit: empty query
  if (!normalizedQuery) return [];

  // Slug-only: hyphens and spaces are treated as equivalent word separators, so
  // "smashing pumpkins" and "smashing-pumpkins" both match a slug like
  // "the-smashing-pumpkins" the same way — matching a literal hyphen character would
  // otherwise be a coincidental side effect of slugs using it as a separator, not a
  // deliberate behavior. Kept separate from `normalizedQuery` because several genres
  // contain real hyphens (e.g. "Hip-Hop", "Post-Punk") and stripping those for the
  // genre-matching checks below would change their meaning.
  const normalizedQueryForSlug = normalizedQuery.replace(/-/g, " ");

  const results = artists
    .map((artist) => {
      // Priority 0: Exact artist name match (no minimum length)
      if (artist.name.toLowerCase() === normalizedQuery) {
        return { artist, priority: 0 };
      }

      // Priority 0: Exact artist slug match (no minimum length) — catches names with
      // non-ASCII characters (e.g. "RØZ", "ADÉLA") that a user is likely to type in
      // their plain-ASCII slug form ("roz", "adela") instead.
      if (artist.slug.toLowerCase().replace(/-/g, " ") === normalizedQueryForSlug) {
        return { artist, priority: 0 };
      }

      // Priority 1: Partial/substring artist name match (no minimum length)
      if (artist.name.toLowerCase().includes(normalizedQuery)) {
        return { artist, priority: 1 };
      }

      // Priority 1: Partial/substring artist slug match (no minimum length)
      if (artist.slug.toLowerCase().replace(/-/g, " ").includes(normalizedQueryForSlug)) {
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

      // Priority 3: Country — also matches "united kingdom" against any UK
      // constituent nation, since that's the label Artist Detail now shows instead of
      // the raw stored value (see displayCountry() in app/lib/location.ts).
      if (
        artist.location.country.toLowerCase().includes(normalizedQuery) ||
        (isUKConstituentCountry(artist.location.country) &&
          "united kingdom".includes(normalizedQuery))
      ) {
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
        getPrimaryAppearance(artist, festivalId, dayOrder)
          .stage.toLowerCase()
          .includes(normalizedQuery)
      ) {
        return { artist, priority: 6 };
      }

      return null;
    })
    .filter((result): result is { artist: RunArtist; priority: number } => result !== null)
    .sort((a, b) => a.priority - b.priority)
    .map((result) => result.artist);

  return results;
}
