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
}

export default function MultiSelectDropdown<T extends string>({
  title,
  options,
  selected,
  onToggle,
  isOpen,
  onOpenChange,
}: MultiSelectDropdownProps<T>) {
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
        {title}
        <ChevronDown
          size={13}
          strokeWidth={2}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-[#1B1535] border border-[#2D2556] rounded-lg overflow-hidden z-50 min-w-56 max-h-80 dropdown-scrollbar overflow-y-auto">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onToggle(option)}
              className="flex items-center gap-4 w-full px-4 py-3 text-sm hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
            >
              <Checkbox checked={selected.includes(option)} onChange={() => {}} />
              <span className="truncate text-white/70">{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
