export type Festival = {
  name: string;
};

export const ACTIVE_FESTIVAL_ID = "lollapalooza-2026";

export const festivals: Record<string, Festival> = {
  "lollapalooza-2026": { name: "Lollapalooza 2026" },
};

/**
 * Festival-specific day schedules.
 * Add new festivals here only when artist data is actually added for that festival.
 */
export const FESTIVAL_DAYS: Record<string, readonly string[]> = {
  "lollapalooza-2026": ["Thursday", "Friday", "Saturday", "Sunday"] as const,
};

/**
 * Festival-specific stage mappings.
 * Add new festivals here only when artist data is actually added for that festival.
 * Array order is the display order (e.g. Planner grid columns) and matches the
 * festival's official schedule's left-to-right stage order — not arbitrary, don't reorder casually.
 */
export const FESTIVAL_STAGES: Record<string, readonly string[]> = {
  "lollapalooza-2026": [
    "T-Mobile",
    "Perry's",
    "Allianz",
    "BMI",
    "Airbnb",
    "Tito's",
    "Bud Light",
  ] as const,
};

/**
 * Get the day schedule for the currently active festival.
 * Insulates callers from how active festival is resolved.
 */
export function getDaysForActiveFestival(): readonly string[] {
  return FESTIVAL_DAYS[ACTIVE_FESTIVAL_ID];
}

export function getDaysForFestival(festivalId: string): readonly string[] {
  return FESTIVAL_DAYS[festivalId] ?? [];
}

/**
 * Get the stages for the currently active festival.
 * Insulates callers from how active festival is resolved.
 */
export function getStagesForActiveFestival(): readonly string[] {
  return FESTIVAL_STAGES[ACTIVE_FESTIVAL_ID];
}
