import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import type { Artist } from "@/app/types/artist";
import { COLORS } from "@/app/data/colors";
import { festivals, ACTIVE_FESTIVAL_ID } from "@/app/data/festivals";
import { getPrimaryAppearance } from "@/app/lib/appearances";
import ArtistAvatar from "@/app/components/ui/ArtistAvatar";

export default function FloatingCards({ artist }: { artist: Artist }) {
  // Displays the artist's primary appearance — see app/lib/appearances.ts. For a
  // multi-appearance artist, the aggregate Schedule control and its "N sets" disclosure
  // live in ArtistActions (rendered elsewhere on this page, inside ArtistHero) — this
  // card only ever shows one appearance's day/time/stage, never both.
  const appearance = getPrimaryAppearance(artist, ACTIVE_FESTIVAL_ID);

  return (
    <div className="space-y-4">
      {/* Playing At — neutral container (matching Similar Artists below), cyan reserved
          for the pin icon, heading, and performance time. */}
      <div className="rounded-2xl border border-white/10 bg-[#1B1535] p-5">
        <h3 className="flex items-center gap-1.5 text-xs font-semibold text-white/40 uppercase tracking-widest mb-3.5">
          <MapPin size={14} strokeWidth={2} className="flex-shrink-0" style={{ color: COLORS.cyan }} />
          Playing At
        </h3>
        <div className="space-y-2.5">
          <div className="text-sm font-semibold text-white">
            {festivals[appearance.festivalId]?.name}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/35">Date</span>
            <span className="text-xs text-white/75">
              {appearance.day}, {appearance.date}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/35">Time</span>
            <span className="text-xs font-semibold text-white/75">
              {appearance.startTime} – {appearance.endTime}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/35">Stage</span>
            <span className="text-xs text-white/75">{appearance.stage}</span>
          </div>
        </div>
      </div>

      {/* Similar Artists */}
      <div className="rounded-2xl border border-white/10 bg-[#1B1535] p-5">
        <h3 className="flex items-center gap-1.5 text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
          <Users size={14} strokeWidth={2} className="flex-shrink-0" style={{ color: COLORS.cyan }} />
          Similar Artists
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {artist.similarArtists.map((a) => (
            <Link key={a.name} href={a.slug ? `/artist/${a.slug}` : "#"}>
              <button className="flex flex-col items-center gap-1.5 py-3 rounded-xl hover:bg-white/4 hover:-translate-y-0.5 transition-[background-color,transform] duration-200 ease-out group w-full">
                <ArtistAvatar name={a.name} imageUrl={a.imageUrl} size={56} />
                <span className="text-xs font-medium text-white/75 group-hover:text-white leading-tight text-center transition-colors px-1 w-full">
                  {a.name}
                </span>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
