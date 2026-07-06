"use client";

import { useRef, useState } from "react";
import { Plus, Star, Heart, BarChart2 } from "lucide-react";

export default function ArtistActions() {
  const [mustSee, setMustSee] = useState(false);
  const [saved, setSaved] = useState(false);
  const savedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMustSee = () => {
    if (!mustSee) {
      setMustSee(true);
      if (!saved) {
        savedTimeoutRef.current = setTimeout(() => setSaved(true), 100);
      }
    } else {
      setMustSee(false);
      if (savedTimeoutRef.current) {
        clearTimeout(savedTimeoutRef.current);
        savedTimeoutRef.current = null;
      }
      // saved stays intact — Option B
    }
  };

  const handleSaved = () => {
    if (saved) {
      setSaved(false);
      if (mustSee) setMustSee(false); // cascade down: unsaving removes Must See
    } else {
      setSaved(true);
    }
  };

  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#00E5FF] text-[#110D24] text-sm font-bold hover:bg-[#00E5FF]/90 transition-colors duration-200">
        <Plus size={14} strokeWidth={2.5} />
        Add to Schedule
      </button>

      <button
        onClick={handleMustSee}
        className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
          mustSee
            ? "bg-[#E8FF47] text-[#110D24] border border-transparent"
            : "border border-white/15 text-white/50 hover:border-[#E8FF47]/40 hover:text-[#E8FF47]"
        }`}
      >
        <Star size={14} fill={mustSee ? "currentColor" : "none"} strokeWidth={2} />
        Must See
      </button>

      <button
        onClick={handleSaved}
        className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
          saved
            ? "border border-[#E8FF47]/50 text-[#E8FF47] bg-[#E8FF47]/18"
            : "border border-white/15 text-white/50 hover:border-[#E8FF47]/40 hover:text-[#E8FF47]"
        }`}
      >
        <Heart size={14} fill={saved ? "currentColor" : "none"} strokeWidth={2} />
        {saved ? "Saved" : "Save"}
      </button>

      <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-white/15 text-white/40 text-sm font-medium hover:text-white/70 hover:border-white/25 transition-colors duration-200">
        <BarChart2 size={14} strokeWidth={2} />
        Compare
      </button>
    </div>
  );
}
