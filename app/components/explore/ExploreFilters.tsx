"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import type { Genre, Stage } from "@/app/data/categories";
import { GENRES, PICK_STATUS_FILTER_LABELS, SCHEDULE_STATUS_LABELS } from "@/app/data/categories";
import { getDaysForActiveFestival, getStagesForActiveFestival } from "@/app/data/festivals";
import { allArtists } from "@/app/data/artists";
import type { PickStatusFilterValue } from "@/app/types/decision";
import type { ScheduleStatusValue } from "@/app/types/schedule";
import MultiSelectDropdown from "@/app/components/explore/MultiSelectDropdown";
import SingleSelectDropdown from "@/app/components/explore/SingleSelectDropdown";

interface ExploreFiltersProps {
  searchQuery?: string;
  selectedGenres?: Genre[];
  selectedDay?: string;
  selectedStages?: Stage[];
  selectedPickStatus?: PickStatusFilterValue[];
  selectedScheduleStatus?: ScheduleStatusValue[];
  onSearchChange?: (query: string) => void;
  onGenresChange?: (genres: Genre[]) => void;
  onDayChange?: (day: string) => void;
  onStagesChange?: (stages: Stage[]) => void;
  onPickStatusChange?: (status: PickStatusFilterValue[]) => void;
  onScheduleStatusChange?: (scheduleStatus: ScheduleStatusValue[]) => void;
}

// Fully controlled: every filter value is read directly from props and every change is
// reported directly via the onXChange callbacks — no local mirror of any of the six
// values, so there's no sync effect needed and nothing that can go stale for a frame.
export default function ExploreFilters({
  searchQuery: externalSearchQuery = "",
  selectedGenres: externalGenres = [],
  selectedDay: externalDay = "",
  selectedStages: externalStages = [],
  selectedPickStatus: externalPickStatus = [],
  selectedScheduleStatus: externalScheduleStatus = [],
  onSearchChange,
  onGenresChange,
  onDayChange,
  onStagesChange,
  onPickStatusChange,
  onScheduleStatusChange,
}: ExploreFiltersProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [allButtonPressed, setAllButtonPressed] = useState(false);
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

  // Festival days and stages (sourced from festival configuration)
  const days = getDaysForActiveFestival() as string[];
  const availableStages = getStagesForActiveFestival() as Stage[];

  const handleSearchChange = (value: string) => {
    onSearchChange?.(value);
  };

  const handleGenreToggle = (genre: Genre) => {
    const updated = externalGenres.includes(genre)
      ? externalGenres.filter((g) => g !== genre)
      : [...externalGenres, genre];
    onGenresChange?.(updated);
  };

  const handleDaySelect = (day: string) => {
    const updated = externalDay === day ? "" : day;
    onDayChange?.(updated);
    setOpenDropdown(null);
  };

  const handleStageToggle = (stage: Stage) => {
    const updated = externalStages.includes(stage)
      ? externalStages.filter((s) => s !== stage)
      : [...externalStages, stage];
    onStagesChange?.(updated);
  };

  const handlePickStatusToggle = (status: PickStatusFilterValue) => {
    const updated = externalPickStatus.includes(status)
      ? externalPickStatus.filter((s) => s !== status)
      : [...externalPickStatus, status];
    onPickStatusChange?.(updated);
  };

  const handleScheduleStatusToggle = (status: ScheduleStatusValue) => {
    const updated = externalScheduleStatus.includes(status)
      ? externalScheduleStatus.filter((s) => s !== status)
      : [...externalScheduleStatus, status];
    onScheduleStatusChange?.(updated);
  };

  const handleClearAll = () => {
    setAllButtonPressed(true);
    setTimeout(() => setAllButtonPressed(false), 300);
    onSearchChange?.("");
    onGenresChange?.([]);
    onDayChange?.("");
    onStagesChange?.([]);
    onPickStatusChange?.([]);
    onScheduleStatusChange?.([]);
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
          value={externalSearchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full bg-[#1B1535] border border-[#2D2556] rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#00E5FF]/30 transition-colors"
        />
        {externalSearchQuery.trim().length > 0 && (
          <button
            onClick={() => {
              handleSearchChange("");
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            aria-label="Clear search"
          >
            <X size={15} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 flex-wrap" ref={dropdownRef}>
        {/* All button */}
        <button
          onClick={handleClearAll}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ease-out ${
            allButtonPressed
              ? "border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/8"
              : "border-white/15 text-white/50 hover:border-white/25 hover:text-white/70"
          }`}
        >
          All
        </button>

        {/* Genre Dropdown (Multi-select, count mode) */}
        <MultiSelectDropdown
          title="Genre"
          options={availableGenres}
          selected={externalGenres}
          onToggle={handleGenreToggle}
          isOpen={openDropdown === "Genre"}
          onOpenChange={(isOpen) => setOpenDropdown(isOpen ? "Genre" : null)}
          displayMode="count"
        />

        {/* Day Dropdown (Single-select) */}
        <SingleSelectDropdown
          title="Day"
          options={days}
          selected={externalDay}
          onSelect={handleDaySelect}
          isOpen={openDropdown === "Day"}
          onOpenChange={(isOpen) => setOpenDropdown(isOpen ? "Day" : null)}
        />

        {/* Stage Dropdown (Multi-select) */}
        <MultiSelectDropdown
          title="Stage"
          options={availableStages}
          selected={externalStages}
          onToggle={handleStageToggle}
          isOpen={openDropdown === "Stage"}
          onOpenChange={(isOpen) => setOpenDropdown(isOpen ? "Stage" : null)}
        />

        {/* Pick Status Dropdown (Multi-select, count mode — the active-filter summary bar
            below shows the actual selected labels, so the trigger itself just shows a count
            to avoid repeating the same information in two places) */}
        <MultiSelectDropdown
          title="Pick Status"
          options={[
            "mustSee" as PickStatusFilterValue,
            "interested" as PickStatusFilterValue,
            "passed" as PickStatusFilterValue,
            "undecided" as PickStatusFilterValue,
          ]}
          selected={externalPickStatus}
          onToggle={handlePickStatusToggle}
          isOpen={openDropdown === "Pick Status"}
          onOpenChange={(isOpen) => setOpenDropdown(isOpen ? "Pick Status" : null)}
          displayMode="count"
          displayLabels={PICK_STATUS_FILTER_LABELS}
        />

        {/* Schedule Status Dropdown (Multi-select, count mode — same reasoning as Pick
            Status above) */}
        <MultiSelectDropdown
          title="Schedule Status"
          options={[
            "scheduled" as ScheduleStatusValue,
            "unscheduled" as ScheduleStatusValue,
            "conflicting" as ScheduleStatusValue,
          ]}
          selected={externalScheduleStatus}
          onToggle={handleScheduleStatusToggle}
          isOpen={openDropdown === "Schedule Status"}
          onOpenChange={(isOpen) => setOpenDropdown(isOpen ? "Schedule Status" : null)}
          displayMode="count"
          displayLabels={SCHEDULE_STATUS_LABELS}
        />
      </div>
    </div>
  );
}
