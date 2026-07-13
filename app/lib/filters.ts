import type { Artist } from "@/app/types/artist";
import type { Genre, Stage } from "@/app/data/categories";
import type { Verdict, StatusFilterValue } from "@/app/types/interest";

/**
 * Apply genre, day, stage, and status filters to an artist array.
 * Returns artists that match ALL active filters (AND logic between filter types, OR within each type).
 * Requires decisionsByArtist map to filter by verdict status.
 */
export function filterArtists(
  artists: Artist[],
  options: {
    genres?: Genre[];
    day?: string;
    stages?: Stage[];
    verdicts?: StatusFilterValue[];
  },
  decisionsByArtist?: Record<string, { verdict: Verdict }>
): Artist[] {
  const { genres, day, stages, verdicts } = options;

  return artists.filter((artist) => {
    // Genre filter: artist must have at least one of the selected genres
    if (genres && genres.length > 0) {
      if (!genres.some((g) => artist.genres.includes(g))) {
        return false;
      }
    }

    // Day filter: artist must perform on the selected day
    if (day) {
      if (artist.appearance.day !== day) {
        return false;
      }
    }

    // Stage filter: artist must perform on one of the selected stages
    if (stages && stages.length > 0) {
      if (!stages.includes(artist.appearance.stage)) {
        return false;
      }
    }

    // Status/Verdict filter: artist's verdict must match one of the selected verdicts (OR logic)
    // "undecided" is a special case matching artists with no entry in decisionsByArtist
    if (verdicts && verdicts.length > 0 && decisionsByArtist) {
      const decision = decisionsByArtist[artist.slug];
      const artistVerdict = decision?.verdict;
      const hasUndecidedFilter = verdicts.some((v) => v === "undecided");
      const verdictsToMatch = verdicts.filter((v) => v !== "undecided") as Verdict[];
      const matchesSelection =
        (hasUndecidedFilter && !artistVerdict) ||
        (artistVerdict && verdictsToMatch.includes(artistVerdict));
      if (!matchesSelection) {
        return false;
      }
    }

    return true;
  });
}
