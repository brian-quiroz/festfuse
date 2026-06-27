"use client";

import { useState } from "react";
import type { Artist } from "@/app/types/artist";

export default function FloatingCards({ artist }: { artist: Artist }) {
  const [notes, setNotes] = useState("");

  return (
    <div className="space-y-4">
      {/* Playing At */}
      <div className="bg-[#1B1535] rounded-xl border border-[#2D2556] p-4">
        <h3 className="text-xs font-semibold text-[#6B6893] uppercase tracking-widest mb-3">
          Playing At
        </h3>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#6B6893]">Stage</span>
            <span className="text-sm font-semibold text-white">{artist.schedule.stage}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#6B6893]">Day</span>
            <span className="text-sm font-semibold text-white">{artist.schedule.day}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#6B6893]">Time</span>
            <span className="text-sm font-bold text-[#00E5FF]">{artist.schedule.time}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#6B6893]">Duration</span>
            <span className="text-sm text-white/70">{artist.schedule.duration}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-[#1B1535] rounded-xl border border-[#2D2556] p-4">
        <h3 className="text-xs font-semibold text-[#6B6893] uppercase tracking-widest mb-3">
          Notes
        </h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add a personal note..."
          rows={4}
          className="w-full bg-[#231C45] border border-[#2D2556] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#6B6893] resize-none outline-none focus:border-[#00E5FF]/50 transition-colors leading-relaxed"
        />
      </div>
    </div>
  );
}
