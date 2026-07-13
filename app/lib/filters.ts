import type { Artist } from "@/app/types/artist";
import type { Genre, Stage } from "@/app/data/categories";

/**
 * Apply genre, day, and stage filters to an artist array.
 * Returns artists that match ALL active filters (AND logic).
 */
export function filterArtists(
  artists: Artist[],
  options: {
    genres?: Genre[];
    day?: string;
    stages?: Stage[];
  }
): Artist[] {
  const { genres, day, stages } = options;

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

    return true;
  });
}
