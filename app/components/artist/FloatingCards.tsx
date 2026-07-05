"use client";

import { useRef, useState } from "react";
import { MapPin, Users, Pencil } from "lucide-react";
import type { Artist } from "@/app/types/artist";

export default function FloatingCards({ artist }: { artist: Artist }) {
  const [notes, setNotes] = useState("");
  const [savedVisible, setSavedVisible] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleNotesChange(value: string) {
    setNotes(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      try { localStorage.setItem(`notes:${artist.slug}`, value); } catch {}
      setSavedVisible(true);
      if (fadeRef.current) clearTimeout(fadeRef.current);
      fadeRef.current = setTimeout(() => setSavedVisible(false), 2000);
    }, 800);
  }

  const { schedule } = artist;

  return (
    <div className="space-y-4">

      {/* Playing At */}
      <div className="rounded-2xl border border-[#00E5FF]/20 bg-[#00E5FF]/6 p-5">
        <h3 className="flex items-center gap-1.5 text-xs font-semibold text-[#00E5FF]/55 uppercase tracking-widest mb-3.5">
          <MapPin size={14} strokeWidth={2} className="text-[#00E5FF] flex-shrink-0" />
          Playing At
        </h3>
        <div className="space-y-2.5">
          <div className="text-sm font-semibold text-white">{schedule.festival}</div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/35">Date</span>
            <span className="text-xs text-white/75">{schedule.day}, {schedule.date}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/35">Time</span>
            <span className="text-xs font-semibold text-[#00E5FF]">
              {schedule.startTime} – {schedule.endTime}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/35">Stage</span>
            <span className="text-xs text-white/75">{schedule.stage}</span>
          </div>
        </div>
      </div>

      {/* Similar Artists */}
      <div className="rounded-2xl border border-white/10 bg-[#1B1535] p-5">
        <h3 className="flex items-center gap-1.5 text-xs font-semibold text-white/40 uppercase tracking-widest mb-3.5">
          <Users size={14} strokeWidth={2} className="text-[#00E5FF]/60 flex-shrink-0" />
          Similar Artists
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {artist.similarArtists.map((name) => (
            <span
              key={name}
              className="px-2.5 py-1 rounded-full bg-white/6 border border-white/10 text-xs text-white/60 hover:text-white/85 hover:border-white/20 transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-2xl border border-white/10 bg-[#1B1535] p-5">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="flex items-center gap-1.5 text-xs font-semibold text-white/40 uppercase tracking-widest">
            <Pencil size={14} strokeWidth={2} className="text-white/50 flex-shrink-0" />
            Notes
          </h3>
          <span
            className={`text-xs text-[#00E5FF]/60 transition-opacity duration-500 ${
              savedVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Saved
          </span>
        </div>
        <textarea
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Add a personal note..."
          rows={4}
          className="w-full bg-white/4 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white/80 placeholder-white/25 resize-none outline-none focus:border-[#00E5FF]/30 transition-colors leading-relaxed"
        />
      </div>

    </div>
  );
}
