"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import type { Genre, Stage } from "@/app/data/categories";
import {
  PICK_STATUS_FILTER_LABELS,
  SCHEDULE_STATUS_LABELS,
  groupGenresByFamily,
} from "@/app/data/categories";
import type { PickStatusFilterValue } from "@/app/types/decision";
import type { ScheduleStatusValue } from "@/app/types/schedule";
import MultiSelectDropdown from "@/app/components/explore/MultiSelectDropdown";
import GroupedMultiSelectDropdown from "@/app/components/explore/GroupedMultiSelectDropdown";
import SingleSelectDropdown from "@/app/components/explore/SingleSelectDropdown";

interface ExploreFiltersProps {
  availableGenres: Genre[];
  // The active run's day and stage options, resolved from route context by the parent.
  days: string[];
  availableStages: Stage[];
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
  availableGenres,
  days,
  availableStages,
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

  // iOS/WebKit auto-zooms on input focus when the page's real scrolling happens in a
  // nested overflow-y-auto container (this app's shared shell, everywhere) rather than
  // the document itself, once that container has scrolled off zero — see
  // ARCHITECTURE.md § Explore Search Input Zoom-on-Focus. Distinct from the
  // font-size-under-16px trigger already handled by this input's own text-base class
  // and the global 16px CSS guardrail. Preventing the zoom at focus time loses the race
  // against WebKit's own synchronous zoom-on-focus decision, so this corrects it at
  // blur instead, where there's no native behavior to race against: forcing a viewport
  // recalculation plus a same-effect scroll nudge reproduces the confirmed manual fix
  // (dragging the background) without depending on the user finding it.
  const handleSearchBlur = () => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta instanceof HTMLMetaElement) {
      const original = meta.content;
      meta.content = "width=device-width, initial-scale=1, maximum-scale=1";
      requestAnimationFrame(() => {
        meta.content = original;
      });
    }
    requestAnimationFrame(() => {
      window.scrollTo(0, 1);
      requestAnimationFrame(() => window.scrollTo(0, 0));
    });
  };

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
        .dropdown-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
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
          placeholder="Search artists, genres, locations, or stages..."
          value={externalSearchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onBlur={handleSearchBlur}
          autoComplete="off"
          className="w-full bg-[#1B1535] border border-[#2D2556] rounded-xl pl-11 pr-11 py-3 text-base md:text-sm text-white placeholder:text-white/30 outline-none focus:border-[#00E5FF]/30 transition-colors"
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
          className={`px-4 py-2.5 md:py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ease-out ${
            allButtonPressed
              ? "border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/8"
              : "border-white/15 text-white/50 hover:border-white/25 hover:text-white/70"
          }`}
        >
          All
        </button>

        {/* Genre Dropdown (Multi-select, grouped by parent family) */}
        <GroupedMultiSelectDropdown
          title="Genre"
          groups={groupGenresByFamily(availableGenres)}
          selected={externalGenres}
          onToggle={handleGenreToggle}
          isOpen={openDropdown === "Genre"}
          onOpenChange={(isOpen) => setOpenDropdown(isOpen ? "Genre" : null)}
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

        {/* Stage Dropdown (Multi-select, count mode — matches Genre's trigger. Unlike Pick
            Status/Schedule Status, its ActiveFilters representation stays one chip per
            selected stage rather than one summary pill, since users remove specific stages
            individually more often than they clear the whole facet at once) */}
        <MultiSelectDropdown
          title="Stage"
          options={availableStages}
          selected={externalStages}
          onToggle={handleStageToggle}
          isOpen={openDropdown === "Stage"}
          onOpenChange={(isOpen) => setOpenDropdown(isOpen ? "Stage" : null)}
          displayMode="count"
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
