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
 */
export const FESTIVAL_STAGES: Record<string, readonly string[]> = {
  "lollapalooza-2026": [
    "Airbnb",
    "Allianz",
    "BMI",
    "Bud Light",
    "Perry's",
    "T-Mobile",
    "Tito's",
  ] as const,
};

/**
 * Get the day schedule for the currently active festival.
 * Insulates callers from how active festival is resolved.
 */
export function getDaysForActiveFestival(): readonly string[] {
  return FESTIVAL_DAYS[ACTIVE_FESTIVAL_ID];
}

/**
 * Get the stages for the currently active festival.
 * Insulates callers from how active festival is resolved.
 */
export function getStagesForActiveFestival(): readonly string[] {
  return FESTIVAL_STAGES[ACTIVE_FESTIVAL_ID];
}
