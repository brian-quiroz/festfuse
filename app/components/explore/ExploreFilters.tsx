"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";
import type { Genre, Stage } from "@/app/data/categories";
import { GENRES } from "@/app/data/categories";
import { ACTIVE_FESTIVAL_ID, FESTIVAL_STAGES } from "@/app/data/festivals";
import { allArtists } from "@/app/data/artists";

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

        {/* Genre Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "Genre" ? null : "Genre")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              selectedGenres.length > 0
                ? "border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/8"
                : "border-white/15 text-white/50 hover:border-white/25 hover:text-white/70"
            }`}
          >
            Genre
            <ChevronDown
              size={13}
              strokeWidth={2}
              className={`transition-transform ${openDropdown === "Genre" ? "rotate-180" : ""}`}
            />
          </button>

          {openDropdown === "Genre" && (
            <div className="absolute top-full left-0 mt-2 bg-[#1B1535] border border-[#2D2556] rounded-lg p-3 z-50 min-w-48 max-h-64 overflow-y-auto">
              {availableGenres.map((genre) => (
                <label key={genre} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-white/5 rounded">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreToggle(genre)}
                    className="w-4 h-4 rounded border-white/30 bg-[#110D24] cursor-pointer"
                  />
                  <span className="text-sm text-white/70">{genre}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Day Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "Day" ? null : "Day")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              selectedDay
                ? "border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/8"
                : "border-white/15 text-white/50 hover:border-white/25 hover:text-white/70"
            }`}
          >
            Day
            <ChevronDown
              size={13}
              strokeWidth={2}
              className={`transition-transform ${openDropdown === "Day" ? "rotate-180" : ""}`}
            />
          </button>

          {openDropdown === "Day" && (
            <div className="absolute top-full left-0 mt-2 bg-[#1B1535] border border-[#2D2556] rounded-lg p-2 z-50 min-w-40">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => handleDaySelect(day)}
                  className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    selectedDay === day
                      ? "bg-[#00E5FF]/20 text-[#00E5FF]"
                      : "text-white/70 hover:bg-white/5"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Stage Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "Stage" ? null : "Stage")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              selectedStages.length > 0
                ? "border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/8"
                : "border-white/15 text-white/50 hover:border-white/25 hover:text-white/70"
            }`}
          >
            Stage
            <ChevronDown
              size={13}
              strokeWidth={2}
              className={`transition-transform ${openDropdown === "Stage" ? "rotate-180" : ""}`}
            />
          </button>

          {openDropdown === "Stage" && (
            <div className="absolute top-full left-0 mt-2 bg-[#1B1535] border border-[#2D2556] rounded-lg p-3 z-50 min-w-48 max-h-64 overflow-y-auto">
              {availableStages.map((stage) => (
                <label key={stage} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-white/5 rounded">
                  <input
                    type="checkbox"
                    checked={selectedStages.includes(stage)}
                    onChange={() => handleStageToggle(stage)}
                    className="w-4 h-4 rounded border-white/30 bg-[#110D24] cursor-pointer"
                  />
                  <span className="text-sm text-white/70">{stage}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* More Filters button */}
        <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border border-white/15 text-white/50 hover:border-white/25 hover:text-white/70 transition-colors">
          <SlidersHorizontal size={13} strokeWidth={2} />
          More Filters
        </button>
      </div>
    </div>
  );
}
