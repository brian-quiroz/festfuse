"use client";

import { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Genre, Stage } from "@/app/data/categories";
import { GENRES } from "@/app/data/categories";
import { ACTIVE_FESTIVAL_ID, FESTIVAL_STAGES } from "@/app/data/festivals";
import { allArtists } from "@/app/data/artists";
import MultiSelectDropdown from "@/app/components/explore/MultiSelectDropdown";
import SingleSelectDropdown from "@/app/components/explore/SingleSelectDropdown";

interface ExploreFiltersProps {
  onSearchChange?: (query: string) => void;
  onGenresChange?: (genres: Genre[]) => void;
  onDayChange?: (day: string) => void;
  onStagesChange?: (stages: Stage[]) => void;
}

export default function ExploreFilters({
  onSearchChange,
  onGenresChange,
  onDayChange,
  onStagesChange,
}: ExploreFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedStages, setSelectedStages] = useState<Stage[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get available genres (filter GENRES to only those present in allArtists)
  const availableGenres = GENRES.filter((genre) =>
    allArtists.some((artist) => artist.genres.includes(genre))
  );

  // Days of the week
  const days = ["Thursday", "Friday", "Saturday", "Sunday"];

  // Available stages for this festival
  const availableStages = (FESTIVAL_STAGES[ACTIVE_FESTIVAL_ID] || []) as Stage[];

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  const handleGenreToggle = (genre: Genre) => {
    const updated = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updated);
    onGenresChange?.(updated);
  };

  const handleDaySelect = (day: string) => {
    const updated = selectedDay === day ? "" : day;
    setSelectedDay(updated);
    onDayChange?.(updated);
    setOpenDropdown(null);
  };

  const handleStageToggle = (stage: Stage) => {
    const updated = selectedStages.includes(stage)
      ? selectedStages.filter((s) => s !== stage)
      : [...selectedStages, stage];
    setSelectedStages(updated);
    onStagesChange?.(updated);
  };

  const handleClearAll = () => {
    setSelectedGenres([]);
    setSelectedDay("");
    setSelectedStages([]);
    onGenresChange?.([]);
    onDayChange?.("");
    onStagesChange?.([]);
  };

  return (
    <div className="space-y-3">
      <style>{`
        .dropdown-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .dropdown-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .dropdown-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .dropdown-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>

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
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full bg-[#1B1535] border border-[#2D2556] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#00E5FF]/30 transition-colors"
        />
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 flex-wrap" ref={dropdownRef}>
        {/* All button */}
        <button
          onClick={handleClearAll}
          className="px-4 py-1.5 rounded-full text-sm font-semibold border border-white/15 text-white/50 hover:border-white/25 hover:text-white/70 transition-colors"
        >
          All
        </button>

        {/* Genre Dropdown (Multi-select) */}
        <MultiSelectDropdown
          title="Genre"
          options={availableGenres}
          selected={selectedGenres}
          onToggle={handleGenreToggle}
          isOpen={openDropdown === "Genre"}
          onOpenChange={(isOpen) => setOpenDropdown(isOpen ? "Genre" : null)}
        />

        {/* Day Dropdown (Single-select) */}
        <SingleSelectDropdown
          title="Day"
          options={days as any}
          selected={selectedDay}
          onSelect={handleDaySelect}
          isOpen={openDropdown === "Day"}
          onOpenChange={(isOpen) => setOpenDropdown(isOpen ? "Day" : null)}
        />

        {/* Stage Dropdown (Multi-select) */}
        <MultiSelectDropdown
          title="Stage"
          options={availableStages}
          selected={selectedStages}
          onToggle={handleStageToggle}
          isOpen={openDropdown === "Stage"}
          onOpenChange={(isOpen) => setOpenDropdown(isOpen ? "Stage" : null)}
        />

        {/* More Filters button */}
        <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border border-white/15 text-white/50 hover:border-white/25 hover:text-white/70 transition-colors">
          <SlidersHorizontal size={13} strokeWidth={2} />
          More Filters
        </button>
      </div>
    </div>
  );
}
