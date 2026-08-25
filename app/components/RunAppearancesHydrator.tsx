"use client";

import { useState } from "react";
import { useRunAppearancesStore } from "@/app/store/runAppearancesStore";
import type { ApiRunAppearance } from "@/app/types/festivalRunAppearancesApi";

// Seeds runAppearancesStore synchronously on first render, via a lazy useState
// initializer rather than useEffect — the server has already fetched this data by the
// time this component renders, so there's no reason to wait a tick after commit to use
// it. Placed before HydrationGate/children in layout.tsx so every consumer sees the
// seeded store on their own first render, not a later one. Idempotent, so React Strict
// Mode's dev-only double-invocation of this initializer is harmless.
export default function RunAppearancesHydrator({
  appearances,
}: {
  appearances: ApiRunAppearance[] | null;
}) {
  useState(() => {
    if (appearances) useRunAppearancesStore.getState().setAppearances(appearances);
  });

  return null;
}
