"use client";

import { Calendar, Check } from "lucide-react";
import { COLORS } from "@/app/data/colors";
import Switch from "@/app/components/Switch";

interface Props {
  festivalDays: readonly string[];
  datesByDay: Record<string, string>;
  selectedDays: string[];
  onToggleDay: (day: string) => void;
  groupByDay: boolean;
  onGroupByDayChange: (value: boolean) => void;
  isGroupingLocked: boolean;
  // True while the Start button's press animation is in flight. Uses a real `disabled`
  // attribute (not just a pointer-events CSS trick) on the day cards and grouping
  // toggle so the persisted attendance selection can't drift out of sync with the
  // session snapshot via keyboard/assistive-tech activation either.
  disabled: boolean;
}

function StepLabel({ step, label }: { step: number; label: string }) {
  return (
    <div className="mb-3">
      <p className="text-[10px] text-white/35 uppercase tracking-widest font-semibold">
        Step {step}
      </p>
      <p className="text-sm text-white/75 mt-0.5">{label}</p>
    </div>
  );
}

export default function StartOptions({
  festivalDays,
  datesByDay,
  selectedDays,
  onToggleDay,
  groupByDay,
  onGroupByDayChange,
  isGroupingLocked,
  disabled,
}: Props) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full">
      {/* Step 1: Days Attending */}
      <div>
        <StepLabel step={1} label="Days Attending" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {festivalDays.map((day) => {
            const isSelected = selectedDays.includes(day);
            const date = datesByDay[day];
            return (
              <button
                key={day}
                type="button"
                disabled={disabled}
                aria-pressed={isSelected}
                onClick={() => onToggleDay(day)}
                className={`relative flex flex-col items-center justify-center gap-1 rounded-xl border px-2 py-3 min-h-[64px] transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60 ${
                  isSelected
                    ? "border-[#E8FF47]/70 bg-[#E8FF47]/[0.12] text-[#E8FF47]"
                    : "border-white/12 bg-[#1B1535] text-white/45 hover:border-white/25 hover:text-white/70"
                }`}
              >
                {isSelected && (
                  <span
                    className="absolute top-2 right-2 flex items-center justify-center w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS.yellow }}
                  >
                    <Check size={7} strokeWidth={3} className="text-[#110D24]" />
                  </span>
                )}
                <span className="text-sm font-semibold">{day}</span>
                {date && <span className="text-[11px] opacity-70">{date}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Grouping */}
      <div>
        <StepLabel step={2} label="Grouping" />
        <div className="rounded-2xl border border-white/12 bg-[#1B1535] p-3 sm:p-4 min-h-[72px] sm:min-h-[88px] flex items-center">
          <div className="flex items-center justify-between w-full gap-4">
            <div className="flex items-center gap-4">
              {/* Decorative — hidden on mobile to reclaim width for the label + badge
                  below, which otherwise wrap to a second line at narrow widths. */}
              <Calendar size={22} strokeWidth={2} className="hidden md:block text-[#00E5FF]/65" />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-white/75">Group by Festival Day</h3>
                  {!isGroupingLocked && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#00E5FF]/8 border border-[#00E5FF]/15 text-[#00E5FF]/60 tracking-wide uppercase">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/45 mt-1.5">
                  {isGroupingLocked
                    ? "Only applies when attending multiple days."
                    : "Focus on one day at a time."}
                </p>
              </div>
            </div>

            <Switch
              checked={groupByDay}
              onChange={onGroupByDayChange}
              disabled={isGroupingLocked || disabled}
              aria-label="Group by Festival Day"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
