// Neutral, dependency-free module for time parsing — kept separate from schedule.ts
// so app/lib/appearances.ts can use it without creating a circular import (schedule.ts
// itself depends on appearances.ts for getAppearancesForFestival).

// Artist data stores times as "H:MM AM/PM" (e.g. "12:00 PM", "1:30 PM"), not 24-hour "HH:MM".
export function timeStringToMinutes(timeStr: string): number {
  const [time, period] = timeStr.split(" ");
  const [hoursStr, minutesStr] = time.split(":");
  let hours = Number(hoursStr) % 12;
  if (period === "PM") hours += 12;
  return hours * 60 + Number(minutesStr);
}
