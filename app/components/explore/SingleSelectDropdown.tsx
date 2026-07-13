"use client";

import { ChevronDown } from "lucide-react";

interface SingleSelectDropdownProps<T extends string> {
  title: string;
  options: T[];
  selected: T;
  onSelect: (option: T) => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function SingleSelectDropdown<T extends string>({
  title,
  options,
  selected,
  onSelect,
  isOpen,
  onOpenChange,
}: SingleSelectDropdownProps<T>) {
  return (
    <div className="relative">
      <button
        onClick={() => onOpenChange(!isOpen)}
        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
          selected
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
        <div className="absolute top-full left-0 mt-2 bg-[#1B1535] border border-[#2D2556] rounded-lg overflow-hidden z-50 min-w-44">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                onOpenChange(false);
              }}
              className={`block w-full text-left px-4 py-3 text-sm transition-colors border-b border-white/5 last:border-b-0 ${
                selected === option
                  ? "bg-[#00E5FF]/15 text-[#00E5FF] font-medium"
                  : "text-white/70 hover:bg-white/5"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
