import type { RunArtist } from "@/app/lib/api/mapRunAppearance";
import type { Genre, Stage } from "@/app/data/categories";
import type { Verdict, PickStatusFilterValue } from "@/app/types/decision";
import type { ScheduleStatusValue } from "@/app/types/schedule";
import { getPrimaryAppearance } from "@/app/lib/appearances";

/**
 * Apply genre, day, stage, pick status, and schedule status filters to an artist array.
 * Returns artists that match ALL active filters (AND logic between filter types, OR within each type).
 * Requires decisionsByArtist map to filter by verdict status.
 */
export function filterArtists(
  artists: RunArtist[],
  options: {
    // The active edition slug and the run's weekday order, for resolving each artist's
    // primary appearance — passed in rather than read from a constant.
    festivalId: string;
    dayOrder: readonly string[];
    genres?: Genre[];
    day?: string;
    stages?: Stage[];
    verdicts?: PickStatusFilterValue[];
    scheduleStatus?: ScheduleStatusValue[];
    // Artist-slug-keyed, precomputed by scheduleStore.ts — not the raw appearance-keyed
    // Sets (those are Planner-only). See app/lib/schedule.ts's getScheduledArtistSlugs/
    // getConflictingArtistSlugs.
    scheduledArtistSlugs?: Set<string>;
    conflictingArtistSlugs?: Set<string>;
  },
  decisionsByArtist?: Record<string, { verdict: Verdict }>
): RunArtist[] {
  const {
    festivalId,
    dayOrder,
    genres,
    day,
    stages,
    verdicts,
    scheduleStatus,
    scheduledArtistSlugs,
    conflictingArtistSlugs,
  } = options;

  return artists.filter((artist) => {
    // Genre filter: artist must have at least one of the selected genres
    if (genres && genres.length > 0) {
      if (!genres.some((g) => artist.genres.includes(g))) {
        return false;
      }
    }

    // Day/Stage filters consider only the artist's primary appearance — see
    // app/lib/appearances.ts. A secondary appearance never causes an artist to match
    // a filter the rest of the UI isn't otherwise showing. Resolved lazily: an
    // announced run (ADR-0016) has no appearances and never passes these two facets
    // (they are hidden in announced Explore), so getPrimaryAppearance is never called.
    if (day || (stages && stages.length > 0)) {
      const primaryAppearance = getPrimaryAppearance(artist, festivalId, dayOrder);

      // Day filter: artist must perform on the selected day
      if (day && primaryAppearance.day !== day) {
        return false;
      }

      // Stage filter: artist must perform on one of the selected stages
      if (stages && stages.length > 0 && !stages.includes(primaryAppearance.stage)) {
        return false;
      }
    }

    // Pick Status/Verdict filter: artist's verdict must match one of the selected verdicts (OR logic)
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

    // Schedule Status filter: artist's aggregate schedule state must match one of the
    // selected statuses (OR logic). Reads the same precomputed, artist-slug-keyed Sets
    // scheduleStore.ts derives for ArtistCard/Sidebar, so this facet and the card
    // badges can never disagree.
    if (
      scheduleStatus &&
      scheduleStatus.length > 0 &&
      scheduledArtistSlugs &&
      conflictingArtistSlugs
    ) {
      const isScheduled = scheduledArtistSlugs.has(artist.slug);
      const isConflicting = conflictingArtistSlugs.has(artist.slug);
      const matchesSelection = scheduleStatus.some((status) => {
        if (status === "scheduled") return isScheduled;
        if (status === "unscheduled") return !isScheduled;
        if (status === "conflicting") return isConflicting;
        return false;
      });
      if (!matchesSelection) {
        return false;
      }
    }

    return true;
  });
}
