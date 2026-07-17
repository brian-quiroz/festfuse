import type { Artist } from "@/app/types/artist";

// Artist data stores times as "H:MM AM/PM" (e.g. "12:00 PM", "1:30 PM"), not 24-hour "HH:MM".
export function timeStringToMinutes(timeStr: string): number {
  const [time, period] = timeStr.split(" ");
  const [hoursStr, minutesStr] = time.split(":");
  let hours = Number(hoursStr) % 12;
  if (period === "PM") hours += 12;
  return hours * 60 + Number(minutesStr);
}

export function getConflictingArtists(
  scheduledIds: Set<string>,
  allArtists: Artist[]
): Set<string> {
  const conflicting = new Set<string>();

  // Group scheduled artists by day for efficiency
  const scheduledByDay = new Map<string, Artist[]>();
  for (const artist of allArtists) {
    if (scheduledIds.has(artist.slug)) {
      const day = artist.appearance.day;
      if (!scheduledByDay.has(day)) {
        scheduledByDay.set(day, []);
      }
      scheduledByDay.get(day)!.push(artist);
    }
  }

  // Check for conflicts within each day only
  for (const dayArtists of scheduledByDay.values()) {
    for (let i = 0; i < dayArtists.length; i++) {
      for (let j = i + 1; j < dayArtists.length; j++) {
        const a = dayArtists[i];
        const b = dayArtists[j];

        // Time overlap check: A.start < B.end && B.start < A.end
        if (
          timeStringToMinutes(a.appearance.startTime) < timeStringToMinutes(b.appearance.endTime) &&
          timeStringToMinutes(b.appearance.startTime) < timeStringToMinutes(a.appearance.endTime)
        ) {
          conflicting.add(a.slug);
          conflicting.add(b.slug);
        }
      }
    }
  }

  return conflicting;
}
