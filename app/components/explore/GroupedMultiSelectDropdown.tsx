"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Genre, GenreFamily, GenreFamilyGroup } from "@/app/data/categories";

interface GroupedMultiSelectDropdownProps {
  title: string;
  groups: GenreFamilyGroup[];
  selected: Genre[];
  onToggle: (item: Genre) => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

// Genre-only sibling of MultiSelectDropdown: adds family accordion sections on top of
// the same panel shell. Kept as a separate component rather than a shared-prop
// extension so Stage/Pick Status/Schedule Status (still on MultiSelectDropdown) are
// never at risk from a change only Genre needs.
export default function GroupedMultiSelectDropdown({
  title,
  groups,
  selected,
  onToggle,
  isOpen,
  onOpenChange,
}: GroupedMultiSelectDropdownProps) {
  const displayText = selected.length > 0 ? `${title} (${selected.length})` : title;

  // Same two-pass anchor measurement as MultiSelectDropdown, duplicated verbatim: which
  // pill ends up rightmost is decided by flex-wrap at render time, not by which filter
  // this is, so the panel's anchor edge is measured after it renders. A single-pass
  // measure-then-reveal reads a stale DOM snapshot from the panel's previous open
  // (state updates don't apply mid-function, even in useLayoutEffect), causing a
  // left/right oscillation on repeated opens — hence "measuring" as its own pass.
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

  // Families containing an already-selected genre start expanded; everything else
  // starts collapsed given ~113 genres across 10 families. Derived fresh from `selected`
  // whenever this component mounts, not just on the page's very first render: `selected`
  // lives in useExploreFilterStore, a Zustand store outside this component's lifecycle,
  // so if a selection survives whatever navigation happened, this correctly re-expands
  // its family rather than needing the expand-state itself to persist. Whether a
  // selection survives a given navigation is browser/Next.js routing behavior, not
  // something this component controls — see ARCHITECTURE.md § Sidebar Filter Shortcuts
  // for what's guaranteed (no stale-filter flash) versus what's environment-dependent
  // (browser back/forward restoration). A hard page reload always resets it to empty.
  const [expandedFamilies, setExpandedFamilies] = useState<Set<GenreFamily>>(
    () => new Set(groups.filter((g) => g.genres.some((genre) => selected.includes(genre))).map((g) => g.family))
  );

  const selectedCountByFamily = useMemo(() => {
    const counts = new Map<GenreFamily, number>();
    groups.forEach((group) => {
      counts.set(group.family, group.genres.filter((g) => selected.includes(g)).length);
    });
    return counts;
  }, [groups, selected]);

  const toggleFamily = (family: GenreFamily) => {
    setExpandedFamilies((prev) => {
      const next = new Set(prev);
      if (next.has(family)) {
        next.delete(family);
      } else {
        next.add(family);
      }
      return next;
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => onOpenChange(!isOpen)}
        className={`flex items-center gap-1.5 px-4 py-2.5 md:py-1.5 rounded-full text-sm font-medium border transition-colors ${
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
        <div
          ref={panelRef}
          className={`absolute top-full ${align === "right" ? "right-0" : "left-0"} mt-2 bg-[#1B1535] border border-[#2D2556] rounded-lg overflow-hidden z-50 min-w-52 max-h-96 dropdown-scrollbar overflow-y-auto ${align === "measuring" ? "invisible" : ""}`}
        >
          {groups.map((group) => {
            const isExpanded = expandedFamilies.has(group.family);
            const familySelectedCount = selectedCountByFamily.get(group.family) ?? 0;
            return (
              <div key={group.family} className="border-b border-white/5 last:border-b-0">
                <div
                  onClick={() => toggleFamily(group.family)}
                  className="flex items-center justify-between gap-2 w-full pl-3 pr-4 py-3 text-[15px] md:text-sm hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="text-white/80 font-medium">
                    {group.family}
                    {familySelectedCount > 0 ? ` (${familySelectedCount})` : ""}
                  </span>
                  <ChevronDown
                    size={13}
                    strokeWidth={2}
                    className={`text-white/40 transition-transform flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </div>

                {isExpanded &&
                  group.genres.map((genre) => (
                    <div
                      key={genre}
                      onClick={() => onToggle(genre)}
                      className="flex items-center gap-3 w-full pl-6 pr-4 py-3 text-[15px] md:text-sm hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div
                        className={`relative w-5 h-5 md:w-4 md:h-4 rounded border transition-all flex-shrink-0 ${
                          selected.includes(genre)
                            ? "bg-[#00E5FF] border-[#00E5FF]"
                            : "bg-[#1B1535] border border-white/20"
                        }`}
                      >
                        {selected.includes(genre) && (
                          <svg
                            className="absolute inset-0 m-auto w-4 h-4 md:w-3 md:h-3 text-[#110D24]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="truncate text-white/70">{genre}</span>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
