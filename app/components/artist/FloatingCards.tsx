"use client";

import { useRef, useState } from "react";
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
      // Persist to localStorage; swap for API call when backend is ready
      try { localStorage.setItem(`notes:${artist.slug}`, value); } catch {}
      setSavedVisible(true);
      if (fadeRef.current) clearTimeout(fadeRef.current);
      fadeRef.current = setTimeout(() => setSavedVisible(false), 2000);
    }, 800);
  }

  const { schedule } = artist;

  return (
    <div className="space-y-4">
      {/* Playing At — cyan tint */}
      <div className="bg-[#00E5FF]/5 rounded-xl border border-[#00E5FF]/20 p-4">
        <h3 className="text-xs font-semibold text-[#00E5FF]/70 uppercase tracking-widest mb-3">
          Playing At
        </h3>
        <div className="space-y-2.5">
          {/* Festival name */}
          <div className="text-sm font-bold text-white">{schedule.festival}</div>

          {/* Day + date */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#6B6893]">Date</span>
            <span className="text-sm text-white/80">
              {schedule.day}, {schedule.date}
            </span>
          </div>

          {/* Start → End time */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#6B6893]">Time</span>
            <span className="text-sm font-bold text-[#00E5FF]">
              {schedule.startTime} – {schedule.endTime}
            </span>
          </div>

          {/* Stage */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#6B6893]">Stage</span>
            <span className="text-sm text-white/80">{schedule.stage}</span>
          </div>
        </div>
      </div>

      {/* Similar Artists */}
      <div className="bg-[#1B1535] rounded-xl border border-[#2D2556] p-4">
        <h3 className="text-xs font-semibold text-[#6B6893] uppercase tracking-widest mb-3">
          Similar Artists
        </h3>
        <div className="flex flex-wrap gap-2">
          {artist.similarArtists.map((name) => (
            <span
              key={name}
              className="px-2.5 py-1 rounded-full bg-[#231C45] border border-[#2D2556] text-xs text-white/65 hover:text-white hover:border-[#00E5FF]/30 transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Notes — autosave */}
      <div className="bg-[#1B1535] rounded-xl border border-[#2D2556] p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-[#6B6893] uppercase tracking-widest">
            Notes
          </h3>
          <span
            className={`text-xs text-[#00E5FF] transition-opacity duration-500 ${
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
          className="w-full bg-[#231C45] border border-[#2D2556] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#6B6893] resize-none outline-none focus:border-[#00E5FF]/50 transition-colors leading-relaxed"
        />
      </div>
    </div>
  );
}
