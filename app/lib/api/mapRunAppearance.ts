import type { Stage } from "@/app/data/categories";
import { KNOWN_STAGES, requireKnownValue } from "@/app/lib/api/mapFestivalArtist";

// `starts_at`/`ends_at` are already converted to the festival's configured timezone
// before the API serializes them (see queries/artists.py's `.astimezone(...)` and
// docs/design/artist-data-model.md), so the wall-clock digits embedded in the ISO
// string are already correct local time. Reading them directly avoids needing a
// timezone name this endpoint doesn't provide, and stays correct for any future
// festival regardless of its timezone. Artist Detail's mapper (mapFestivalArtist.ts)
// additionally converts via an explicit timezone name because its response happens to
// include one — both approaches are correct, just fitted to what each endpoint returns.
export function formatApiTime(isoDatetime: string): string {
  const match = isoDatetime.match(/T(\d{2}):(\d{2})/);
  if (!match) {
    throw new Error(`FestFuse API returned an unparseable datetime ${JSON.stringify(isoDatetime)}`);
  }
  const hours24 = Number(match[1]);
  const minutes = match[2];
  const period = hours24 < 12 ? "AM" : "PM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${minutes} ${period}`;
}

// `festival_date` is a bare calendar date (no time/offset) — the noon-UTC anchor and
// UTC-formatted output avoid any date-rollover ambiguity without needing a timezone
// name either. Mirrors mapFestivalArtist.ts's mapAppearance technique.
export function formatApiDayAndDate(festivalDate: string): { day: string; date: string } {
  const anchor = new Date(`${festivalDate}T12:00:00Z`);
  return {
    day: new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "UTC" }).format(anchor),
    date: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(
      anchor
    ),
  };
}

export function mapStage(name: string): Stage {
  return requireKnownValue<Stage>(name, KNOWN_STAGES, "stage");
}
