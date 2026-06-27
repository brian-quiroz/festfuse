"use client";

import { useState } from "react";

export default function ArtistActions() {
  const [mustSee, setMustSee] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00E5FF] text-[#110D24] text-sm font-bold hover:bg-[#00E5FF]/90 transition-colors">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add to Schedule
      </button>

      <button
        onClick={() => setMustSee(!mustSee)}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
          mustSee
            ? "bg-[#E8FF47] text-[#110D24]"
            : "border border-[#2D2556] text-[#6B6893] hover:border-[#E8FF47]/50 hover:text-[#E8FF47]"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={mustSee ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        Must See
      </button>

      <button
        onClick={() => setSaved(!saved)}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
          saved
            ? "border border-[#E8FF47] text-[#E8FF47] bg-[#E8FF47]/10"
            : "border border-[#2D2556] text-[#6B6893] hover:border-[#E8FF47]/50 hover:text-[#E8FF47]"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
        {saved ? "Saved" : "Save"}
      </button>

      <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#2D2556] text-[#6B6893] text-sm font-medium hover:text-white hover:border-white/30 transition-colors">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
        Compare
      </button>
    </div>
  );
}
