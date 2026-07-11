"use client";

import { useState } from "react";
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";

export default function ExploreFilters() {
  const [activeFilter, setActiveFilter] = useState("All");

  const dropdownFilters = ["Genre", "Day", "Stage"];

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search
          size={15}
          strokeWidth={2}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search artists, genres, or keywords..."
          className="w-full bg-[#1B1535] border border-[#2D2556] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#00E5FF]/30 transition-colors"
        />
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setActiveFilter("All")}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
            activeFilter === "All"
              ? "bg-[#00E5FF] text-[#110D24]"
              : "border border-white/15 text-white/50 hover:border-white/25 hover:text-white/70"
          }`}
        >
          All
        </button>

        {dropdownFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter
                ? "border border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/8"
                : "border border-white/15 text-white/50 hover:border-white/25 hover:text-white/70"
            }`}
          >
            {filter}
            <ChevronDown size={13} strokeWidth={2} />
          </button>
        ))}

        <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border border-white/15 text-white/50 hover:border-white/25 hover:text-white/70 transition-colors">
          <SlidersHorizontal size={13} strokeWidth={2} />
          More Filters
        </button>
      </div>
    </div>
  );
}
