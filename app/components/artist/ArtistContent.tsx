"use client";

import { useState } from "react";
import type { Artist } from "@/app/types/artist";
import OverviewTab from "./OverviewTab";
import TriviaTab from "./TriviaTab";
import StatsTab from "./StatsTab";
import FloatingCards from "./FloatingCards";

const TABS = ["Overview", "Stats", "Trivia"] as const;
type Tab = (typeof TABS)[number];

export default function ArtistContent({ artist }: { artist: Artist }) {
  const [active, setActive] = useState<Tab>("Overview");

  return (
    <div className="px-8 pt-6">
      {/* Tab bar */}
      <div className="flex border-b border-[#2D2556] mb-7">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${
              active === tab
                ? "border-[#00E5FF] text-[#00E5FF]"
                : "border-transparent text-[#6B6893] hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content row: tab content left, floating cards right */}
      <div className="flex gap-8 items-start">
        <div className="flex-1 min-w-0">
          {active === "Overview" && <OverviewTab artist={artist} />}
          {active === "Stats" && <StatsTab artist={artist} />}
          {active === "Trivia" && <TriviaTab artist={artist} />}
        </div>

        {/* Floating cards — sticky while content scrolls */}
        <div className="w-64 flex-shrink-0 sticky top-6 pb-12">
          <FloatingCards artist={artist} />
        </div>
      </div>
    </div>
  );
}
