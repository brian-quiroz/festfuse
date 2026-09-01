"use client";

import { useState } from "react";
import {
  useRunScheduleStateStore,
  type RunStateEntry,
} from "@/app/store/runScheduleStateStore";

// Seeds runScheduleStateStore with every edition/run's schedule state and
// artist-presence flag, fetched once in the root layout. Rendered before HydrationGate,
// so the synchronous lazy-useState seed runs before Sidebar / HomeContent first read
// the store — the gate opens with the run-nav gating already correct, no flash.
// Idempotent: `hydrate` merges.
export default function RunScheduleStateHydrator({
  map,
}: {
  map: Record<string, RunStateEntry>;
}) {
  useState(() => {
    useRunScheduleStateStore.getState().hydrate(map);
  });

  return null;
}
