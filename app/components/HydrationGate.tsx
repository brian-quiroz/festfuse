"use client";

import { useDecisionStore } from "@/app/store/decisionStore";
import { useScheduleStore } from "@/app/store/scheduleStore";
import { usePlannerViewStore } from "@/app/store/plannerViewStore";
import { useAttendanceStore } from "@/app/store/attendanceStore";
import { useActiveContextStore } from "@/app/store/activeContextStore";

// Holds the first render until every persisted (localStorage-backed) store has actually
// read its saved values. Without this, each store briefly renders with its hardcoded
// default before rehydrating a moment later — most visibly on the Planner's toggles, but
// the same gap exists anywhere decisionStore/scheduleStore/attendanceStore-derived state
// renders (Sidebar counts, Explore's pick/schedule buttons, the Planner grid's own
// coloring, Quick Picks' Start Screen day picker). A single shared gate covers all of
// them at once rather than repeating this check in every consumer. The gap is only ever
// on a hard reload — client-side navigation never remounts these stores, so this never
// affects normal in-app browsing.
export default function HydrationGate({ children }: { children: React.ReactNode }) {
  const decisionHydrated = useDecisionStore((state) => state.hasHydrated);
  const scheduleHydrated = useScheduleStore((state) => state.hasHydrated);
  const plannerViewHydrated = usePlannerViewStore((state) => state.hasHydrated);
  const attendanceHydrated = useAttendanceStore((state) => state.hasHydrated);
  const activeContextHydrated = useActiveContextStore((state) => state.hasHydrated);

  if (
    !decisionHydrated ||
    !scheduleHydrated ||
    !plannerViewHydrated ||
    !attendanceHydrated ||
    !activeContextHydrated
  ) {
    return null;
  }

  return <>{children}</>;
}
