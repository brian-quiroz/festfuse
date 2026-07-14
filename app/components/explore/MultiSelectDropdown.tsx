"use client";

import { ChevronDown } from "lucide-react";
import Checkbox from "@/app/components/Checkbox";

interface MultiSelectDropdownProps<T extends string> {
  title: string;
  options: T[];
  selected: T[];
  onToggle: (item: T) => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  displayMode?: "count" | "labels"; // "count" shows selected count, "labels" shows selected item names
  displayLabels?: Record<T, string>; // Optional map to display human-readable labels instead of raw enum values
  showAllWhenComplete?: boolean; // When true and all options selected, show "All" instead of listing all labels
}

export default function MultiSelectDropdown<T extends string>({
  title,
  options,
  selected,
  onToggle,
  isOpen,
  onOpenChange,
  displayMode = "labels",
  displayLabels,
  showAllWhenComplete = false,
}: MultiSelectDropdownProps<T>) {
  const getDisplayLabel = (item: T): string => displayLabels?.[item] ?? item;
  const allSelected = selected.length === options.length;

  const displayText =
    displayMode === "count"
      ? selected.length > 0
        ? `${title} (${selected.length})`
        : title
      : selected.length > 0
      ? allSelected && showAllWhenComplete
        ? `${title}: All`
        : `${title}: ${selected.map(getDisplayLabel).join(", ")}`
      : title;

  return (
    <div className="relative">
      <button
        onClick={() => onOpenChange(!isOpen)}
        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
          selected.length > 0
            ? "border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/8"
            : "border-white/15 text-white/50 hover:border-white/25 hover:text-white/70"
        }`}
      >
        {displayText}
        <ChevronDown
          size={13}
          strokeWidth={2}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-[#1B1535] border border-[#2D2556] rounded-lg overflow-hidden z-50 min-w-56 max-h-80 dropdown-scrollbar overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => onToggle(option)}
              className="flex items-center gap-4 w-full px-4 py-3 text-sm hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0 cursor-pointer"
            >
              <div
                className={`relative w-4 h-4 rounded border transition-all flex-shrink-0 ${
                  selected.includes(option)
                    ? "bg-[#00E5FF] border-[#00E5FF]"
                    : "bg-[#1B1535] border border-white/20"
                }`}
              >
                {selected.includes(option) && (
                  <svg
                    className="absolute inset-0 m-auto w-3 h-3 text-[#110D24]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="truncate text-white/70">{getDisplayLabel(option)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
