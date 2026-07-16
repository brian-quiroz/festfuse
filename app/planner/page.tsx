"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";

export default function PlannerPage() {
  const [showMyPicks, setShowMyPicks] = useState(false);
  const [showScheduled, setShowScheduled] = useState(false);

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-[#2D2556]">
          <h1 className="text-3xl font-extrabold text-white">Planner</h1>
          <p className="text-sm text-white/60 mt-1">Build your festival schedule</p>
        </div>

        {/* Toggles */}
        <div className="px-8 py-4 border-b border-[#2D2556] flex gap-4">
          <button
            onClick={() => setShowMyPicks(!showMyPicks)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showMyPicks
                ? "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50"
                : "bg-[#231C45] text-white/70 hover:text-white border border-transparent"
            }`}
          >
            My Picks
          </button>
          <button
            onClick={() => setShowScheduled(!showScheduled)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showScheduled
                ? "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50"
                : "bg-[#231C45] text-white/70 hover:text-white border border-transparent"
            }`}
          >
            Scheduled
          </button>
        </div>

        {/* Grid placeholder */}
        <div className="flex-1 overflow-auto px-8 py-8">
          <div className="text-white/50 text-sm">
            Grid view coming soon — filtered by:
            {showMyPicks && <span className="block text-[#00E5FF]">+ My Picks</span>}
            {showScheduled && <span className="block text-[#00E5FF]">+ Scheduled</span>}
          </div>
        </div>
      </main>
    </div>
  );
}
