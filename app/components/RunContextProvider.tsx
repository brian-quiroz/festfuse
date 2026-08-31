"use client";

import { createContext, useContext, useEffect } from "react";
import { getDaysForFestival, getStagesForFestival } from "@/app/data/festivals";
import { useActiveContextStore } from "@/app/store/activeContextStore";
import { useRunScheduleState } from "@/app/store/runScheduleStateStore";
import type { ApiFestivalRunScheduleState } from "@/app/types/festivalApi";

type RunContextValue = { editionSlug: string; runSlug: string };

const RunContext = createContext<RunContextValue | null>(null);

// Provides the active { edition, run } to every client component under the
// app/festivals/[edition]/[run] segment. The segment layout (a server component) reads
// the slugs from the route params and passes them here; components call the hooks below
// rather than useParams() so the values are typed and resolved in one place. Also
// mirrors the context into activeContextStore for the non-hook readers (scheduleStore)
// and for Sidebar, which sits outside this segment.
export function RunContextProvider({
  editionSlug,
  runSlug,
  children,
}: {
  editionSlug: string;
  runSlug: string;
  children: React.ReactNode;
}) {
  // The activeContextStore mirror is written in an effect, not during render: this
  // component renders inside HydrationGate, after Sidebar (a store subscriber) has
  // already rendered this pass, so a synchronous store write here would be a
  // setState-during-render of another component. useRunContext() below still delivers
  // the value synchronously via React context — only the store mirror lags by a tick,
  // which is the same timing a persisted store would hydrate on.
  useEffect(() => {
    useActiveContextStore.getState().setContext(editionSlug, runSlug);
  }, [editionSlug, runSlug]);

  return (
    <RunContext.Provider value={{ editionSlug, runSlug }}>{children}</RunContext.Provider>
  );
}

export function useRunContext(): RunContextValue {
  const value = useContext(RunContext);
  if (value === null) {
    throw new Error("useRunContext must be used within a RunContextProvider");
  }
  return value;
}

/** Weekday names in festival order for the active run. */
export function useRunDays(): readonly string[] {
  const { editionSlug, runSlug } = useRunContext();
  return getDaysForFestival(editionSlug, runSlug);
}

/** Stages in display order for the active edition. */
export function useRunStages(): readonly string[] {
  const { editionSlug } = useRunContext();
  return getStagesForFestival(editionSlug);
}

/**
 * The active run's schedule mode (ADR-0016): `"announced"` while only its lineup
 * exists, `"scheduled"` once set times are published. Each announced-capable screen
 * branches on this once at the top. Backed by runScheduleStateStore, seeded
 * synchronously in the root layout before HydrationGate, so it is correct on the first
 * client render with no flash. Fails open to `"scheduled"` for an unknown run.
 */
export function useRunScheduleMode(): ApiFestivalRunScheduleState {
  const { editionSlug, runSlug } = useRunContext();
  return useRunScheduleState(editionSlug, runSlug);
}
