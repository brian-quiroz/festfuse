"use client";

import { useEffect, useState } from "react";
import {
  useAnnouncedRunArtistsStore,
  getAnnouncedRunArtistsSlice,
} from "@/app/store/announcedRunArtistsStore";
import type { ApiRunArtist } from "@/app/types/festivalRunAppearancesApi";

// Seeds announcedRunArtistsStore with one run's schedule-agnostic feed. The
// announced-lineup counterpart of RunAppearancesHydrator; the segment layout renders
// exactly one of the two per run, keyed on schedule_state (ADR-0016).
//
// Only ever placed in the segment layout (inside HydrationGate) — the root layout's
// default context is always scheduled. Timing mirrors RunAppearancesHydrator: the lazy
// useState seeds synchronously only on the very first store write (nothing has
// subscribed yet); afterward an effect seeds so a client-side nav between runs re-seeds
// without a setState-during-render. `null` (fetch failed / 404) records the failure.
export default function AnnouncedRunArtistsHydrator({
  editionSlug,
  runSlug,
  artists,
}: {
  editionSlug: string;
  runSlug: string;
  artists: ApiRunArtist[] | null;
}) {
  useState(() => {
    if (useAnnouncedRunArtistsStore.getState().byContext.size !== 0) return;
    if (artists) {
      useAnnouncedRunArtistsStore.getState().setArtists(editionSlug, runSlug, artists);
    } else {
      useAnnouncedRunArtistsStore.getState().setLoadFailed(editionSlug, runSlug);
    }
  });

  useEffect(() => {
    // Retry until this context has real data — see RunAppearancesHydrator.
    if (getAnnouncedRunArtistsSlice(editionSlug, runSlug).loadState === "loaded") return;
    if (artists) {
      useAnnouncedRunArtistsStore.getState().setArtists(editionSlug, runSlug, artists);
    } else {
      useAnnouncedRunArtistsStore.getState().setLoadFailed(editionSlug, runSlug);
    }
  }, [editionSlug, runSlug, artists]);

  return null;
}
