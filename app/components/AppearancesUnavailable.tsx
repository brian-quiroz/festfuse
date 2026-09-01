"use client";

import { CircleAlert } from "lucide-react";

// Shown by a run-feed consumer when its store's loadState is "error" (the fetch
// failed or 404'd) — see ADR-0010. A legitimately empty feed renders the normal empty
// UI instead. flex-1 centers this within its flex-column parent, mirroring StartScreen
// (which this replaces on Quick Picks).
export default function AppearancesUnavailable() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
      <CircleAlert
        size={40}
        strokeWidth={1.5}
        aria-hidden="true"
        className="text-[#EF4444]/80 mb-5"
      />
      <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
        Festival data unavailable
      </h1>
      <p className="text-sm text-white/50 mb-8 max-w-sm">
        We couldn&apos;t load festival data. Try reloading.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-5 py-2.5 rounded-lg bg-[#00E5FF] text-[#110D24] text-sm font-semibold hover:bg-[#00E5FF]/90 transition-colors"
      >
        Reload
      </button>
    </div>
  );
}
