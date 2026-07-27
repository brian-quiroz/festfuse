"use client";

import { useLayoutEffect, useRef, useState } from "react";
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
  // See MultiSelectDropdown.tsx for the full rationale and why this needs a genuine
  // two-pass measure-then-reveal rather than a single measure+setState effect.
  const panelRef = useRef<HTMLDivElement>(null);
  const [align, setAlign] = useState<"measuring" | "left" | "right">("left");

  useLayoutEffect(() => {
    if (isOpen) setAlign("measuring");
  }, [isOpen]);

  useLayoutEffect(() => {
    if (align !== "measuring") return;
    const panel = panelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    setAlign(rect.right > window.innerWidth ? "right" : "left");
  }, [align]);

  return (
    <div className="relative">
      <button
        onClick={() => onOpenChange(!isOpen)}
        className={`flex items-center gap-1.5 px-4 py-2.5 md:py-1.5 rounded-full text-sm font-medium border transition-colors ${
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
        <div
          ref={panelRef}
          className={`absolute top-full ${align === "right" ? "right-0" : "left-0"} mt-2 bg-[#1B1535] border border-[#2D2556] rounded-lg overflow-hidden z-50 min-w-44 ${align === "measuring" ? "invisible" : ""}`}
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                onOpenChange(false);
              }}
              className={`block w-full text-left pl-3 pr-4 py-3 text-[15px] md:text-sm transition-colors border-b border-white/5 last:border-b-0 ${
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
