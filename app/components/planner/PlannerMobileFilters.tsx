"use client";

import { useEffect, useRef, useState } from "react";
import { Filter } from "lucide-react";
import Switch from "@/app/components/Switch";

interface PlannerMobileFiltersProps {
  showMyPicks: boolean;
  showScheduled: boolean;
  onShowMyPicksChange: (value: boolean) => void;
  onShowScheduledChange: (value: boolean) => void;
  myPicksDisabled: boolean;
}

// Mobile-only progressive-disclosure counterpart to the always-visible "Show only:" row
// in page.tsx (md:+). Day tabs stay a full-width single row on mobile — this trigger
// keeps the My Picks/Scheduled switches reachable without permanently costing the
// vertical space the schedule grid below needs. Prop-driven rather than reading
// usePlannerViewStore directly: myPicksDisabled is derived in page.tsx from
// useDecisionStore and isn't itself in any store, so page.tsx stays the single source
// of truth for both stores' derived state, same "fully controlled" convention
// ExploreFilters.tsx documents for its own props.
export default function PlannerMobileFilters({
  showMyPicks,
  showScheduled,
  onShowMyPicksChange,
  onShowScheduledChange,
  myPicksDisabled,
}: PlannerMobileFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeCount = (showMyPicks && !myPicksDisabled ? 1 : 0) + (showScheduled ? 1 : 0);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Filter schedule view"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
          activeCount > 0
            ? "border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/8"
            : "border-white/15 text-white/50 hover:border-white/25 hover:text-white/70"
        }`}
      >
        <Filter size={14} strokeWidth={2} />
        {activeCount > 0 && <span>{activeCount}</span>}
      </button>

      {isOpen && (
        // right-0, not left-0 like MultiSelectDropdown/SingleSelectDropdown — this
        // trigger sits at the far right of the toolbar row, so a left-anchored panel
        // would run off the viewport edge on the narrowest phones.
        <div className="absolute top-full right-0 mt-2 bg-[#1B1535] border border-[#2D2556] rounded-lg z-50 min-w-56 p-4 space-y-4">
          {/* Matches the desktop row's "Show only:" framing (page.tsx) — without it, a
              bare "Scheduled" switch reads as a layer-visibility toggle (off = hide
              scheduled items) rather than its actual meaning. */}
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wide">Show only</p>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-white/70">My Picks</span>
            <Switch
              checked={showMyPicks && !myPicksDisabled}
              onChange={onShowMyPicksChange}
              disabled={myPicksDisabled}
              disabledReason="No picks yet, so there's nothing to filter to."
              aria-label="Show only My Picks"
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-white/70">Scheduled</span>
            <Switch checked={showScheduled} onChange={onShowScheduledChange} aria-label="Show only Scheduled" />
          </div>
        </div>
      )}
    </div>
  );
}
