import type { Artist } from "@/app/types/artist";
import { timeStringToMinutes } from "@/app/lib/schedule";

// Pixels per minute of festival time — determines how tall the grid is and how much
// vertical room each artist block gets relative to its set duration.
export const PLANNER_PX_PER_MINUTE = 2.5;

export interface PlannerHourRange {
  startHour: number; // inclusive, 0–23
  endHour: number; // exclusive, up to 24; post-midnight rollover is unsupported
}

/**
 * Computes the hour range to render for a day's grid, based on that day's actual
 * lineup rather than a fixed festival-wide window — floored/ceiled to whole hours
 * so gridlines land on clean hour boundaries.
 */
export function getPlannerHourRange(dayArtists: Artist[]): PlannerHourRange {
  if (dayArtists.length === 0) {
    return { startHour: 12, endHour: 24 };
  }

  let minMinutes = Infinity;
  let maxMinutes = -Infinity;
  for (const artist of dayArtists) {
    const start = timeStringToMinutes(artist.appearance.startTime);
    const end = timeStringToMinutes(artist.appearance.endTime);
    if (start < minMinutes) minMinutes = start;
    if (end > maxMinutes) maxMinutes = end;
  }

  return {
    startHour: Math.floor(minMinutes / 60),
    endHour: Math.ceil(maxMinutes / 60),
  };
}

/** Pixel offset from the top of the grid for a given time-of-day in minutes. */
export function minutesToPlannerOffset(minutes: number, range: PlannerHourRange): number {
  return (minutes - range.startHour * 60) * PLANNER_PX_PER_MINUTE;
}

/** Total pixel height of the grid for a given hour range. */
export function getPlannerGridHeight(range: PlannerHourRange): number {
  return (range.endHour - range.startHour) * 60 * PLANNER_PX_PER_MINUTE;
}

/** Formats an hour (0-23) as a festival-style label, e.g. "2 PM". */
export function formatPlannerHour(hour: number): string {
  const normalized = ((hour % 24) + 24) % 24;
  const period = normalized < 12 ? "AM" : "PM";
  const display = normalized % 12 === 0 ? 12 : normalized % 12;
  return `${display} ${period}`;
}
