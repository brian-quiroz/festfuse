"use client";

import { useState } from "react";
import { Plus, Star, Heart, BarChart2 } from "lucide-react";

export default function ArtistActions() {
  const [mustSee, setMustSee] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#00E5FF] text-[#110D24] text-sm font-bold hover:bg-[#00E5FF]/90 transition-colors">
        <Plus size={14} strokeWidth={2.5} />
        Add to Schedule
      </button>

      <button
        onClick={() => setMustSee(!mustSee)}
        className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
          mustSee
            ? "bg-[#E8FF47] text-[#110D24]"
            : "border border-white/15 text-white/50 hover:border-[#E8FF47]/40 hover:text-[#E8FF47]"
        }`}
      >
        <Star size={14} fill={mustSee ? "currentColor" : "none"} strokeWidth={2} />
        Must See
      </button>

      <button
        onClick={() => setSaved(!saved)}
        className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
          saved
            ? "border border-[#E8FF47]/60 text-[#E8FF47] bg-[#E8FF47]/10"
            : "border border-white/15 text-white/50 hover:border-[#E8FF47]/40 hover:text-[#E8FF47]"
        }`}
      >
        <Heart size={14} fill={saved ? "currentColor" : "none"} strokeWidth={2} />
        {saved ? "Saved" : "Save"}
      </button>

      <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-white/15 text-white/40 text-sm font-medium hover:text-white/70 hover:border-white/25 transition-colors">
        <BarChart2 size={14} strokeWidth={2} />
        Compare
      </button>
    </div>
  );
}
