"use client";

import { useState } from "react";
import { useRunScheduleStateStore } from "@/app/store/runScheduleStateStore";
import type { ApiFestivalRunScheduleState } from "@/app/types/festivalApi";

// Seeds runScheduleStateStore with every edition/run's schedule state, fetched once in
// the root layout. Rendered before HydrationGate, so the synchronous lazy-useState seed
// runs before Sidebar / HomeContent first read the store — the gate opens with Planner
// gating already correct, no flash. Idempotent: `hydrate` merges.
export default function RunScheduleStateHydrator({
  map,
}: {
  map: Record<string, ApiFestivalRunScheduleState>;
}) {
  useState(() => {
    useRunScheduleStateStore.getState().hydrate(map);
  });

  return null;
}
