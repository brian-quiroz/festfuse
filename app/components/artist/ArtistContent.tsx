"use client";

import { useState } from "react";
import type { Artist } from "@/app/types/artist";
import OverviewTab from "./OverviewTab";
import LiveTab from "./LiveTab";
import FloatingCards from "./FloatingCards";

type Tab = "Overview" | "Live";

export default function ArtistContent({ artist }: { artist: Artist }) {
  const tabs: Tab[] = ["Overview"];
  if (artist.liveVideoId) tabs.push("Live");

  const [active, setActive] = useState<Tab>("Overview");
  const hasMultipleTabs = tabs.length > 1;

  return (
    <div className="px-8 pt-2 pb-16">
      {/* Tab bar — only show if multiple tabs */}
      {hasMultipleTabs && (
        <div className="flex border-b border-white/8 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-5 py-3.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                active === tab
                  ? "border-[#00E5FF] text-[#00E5FF]"
                  : "border-transparent text-white/35 hover:text-white/70"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Content row: tab content left, floating cards right */}
      <div className="flex gap-10 items-start mt-8">
        <div className="flex-1 min-w-0">
          {active === "Overview" && <OverviewTab artist={artist} />}
          {active === "Live" && <LiveTab artist={artist} />}
        </div>

        {/* Floating cards — sticky while content scrolls */}
        <div className="w-72 flex-shrink-0 sticky top-6 pb-12">
          <FloatingCards artist={artist} />
        </div>
      </div>
    </div>
  );
}
