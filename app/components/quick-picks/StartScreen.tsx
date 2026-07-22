"use client";

import { useMemo, useState } from "react";
import StartOptions from "@/app/components/quick-picks/StartOptions";
import { ArrowRight, Zap, Lock } from "lucide-react";
import { COLORS } from "@/app/data/colors";
import { allArtists } from "@/app/data/artists";
import { ACTIVE_FESTIVAL_ID, getDaysForActiveFestival } from "@/app/data/festivals";
import { getDatesByDay } from "@/app/lib/appearances";
import { useAttendanceDays, useAttendanceStore } from "@/app/store/attendanceStore";
import type { QuickPicksSessionConfig } from "@/app/types/quick-picks";

interface Props {
  onStart: (config: QuickPicksSessionConfig) => void;
}

export default function StartScreen({ onStart }: Props) {
  const [groupByDay, setGroupByDay] = useState(true);
  const [pressing, setPressing] = useState(false);

  const festivalDays = getDaysForActiveFestival();
  const attendanceDays = useAttendanceDays(ACTIVE_FESTIVAL_ID);
  const setAttendanceDays = useAttendanceStore((state) => state.setAttendanceDays);
  const datesByDay = useMemo(() => getDatesByDay(allArtists, ACTIVE_FESTIVAL_ID), []);

  const noDaysSelected = attendanceDays.length === 0;
  const isGroupingLocked = attendanceDays.length <= 1;

  function handleToggleDay(day: string) {
    const next = attendanceDays.includes(day)
      ? attendanceDays.filter((d) => d !== day)
      : [...attendanceDays, day];
    setAttendanceDays(ACTIVE_FESTIVAL_ID, next);
  }

  function handleStart() {
    if (pressing || noDaysSelected) return;
    // Snapshot synchronously, at click time — not inside the setTimeout below, whose
    // only job is the button-press animation delay. `disabled={pressing}` on the day
    // cards and grouping toggle (passed to StartOptions) is what actually prevents the
    // persisted attendance selection from changing during that delay; without it, this
    // snapshot alone wouldn't stop the setup screen from drifting out of sync with the
    // session that's about to start.
    const orderedAttendanceDays = festivalDays.filter((day) => attendanceDays.includes(day));
    const config: QuickPicksSessionConfig = {
      festivalId: ACTIVE_FESTIVAL_ID,
      groupByDay,
      attendanceDays: orderedAttendanceDays,
    };
    setPressing(true);
    setTimeout(() => {
      setPressing(false);
      onStart(config);
    }, 100);
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 lg:py-10">
      <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
        {/* Hero title */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-3">
            <Zap
              size={40}
              fill="currentColor"
              strokeWidth={0}
              style={{ color: COLORS.celebration }}
            />
            <h1
              className="text-6xl font-extrabold tracking-tight bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${COLORS.celebration}, #A78BFA)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Quick Picks
            </h1>
          </div>
          <div className="text-base text-white/50 text-center leading-relaxed">
            <p>Go with your gut.</p>
            <p>
              <span className="font-semibold text-white/75">Quick Listen</span> when you need
              a first impression, then make your pick.
            </p>
          </div>
        </div>

        {/* Start Options + CTA */}
        <div className="w-full flex flex-col items-center gap-4" aria-busy={pressing}>
          <StartOptions
            festivalDays={festivalDays}
            datesByDay={datesByDay}
            selectedDays={attendanceDays}
            onToggleDay={handleToggleDay}
            groupByDay={groupByDay}
            onGroupByDayChange={setGroupByDay}
            isGroupingLocked={isGroupingLocked}
            disabled={pressing}
          />

          <div className="w-full flex flex-col items-center gap-3">
            <button
              onClick={handleStart}
              disabled={noDaysSelected || pressing}
              className={`flex w-full max-w-md items-center justify-center gap-2 px-4 py-4 rounded-lg bg-[#00E5FF] text-[#110D24] text-base font-bold hover:bg-[#00E5FF]/90 transition duration-100 ${
                noDaysSelected ? "opacity-40 cursor-not-allowed hover:bg-[#00E5FF]" : ""
              } ${pressing ? "scale-[0.97]" : ""}`}
            >
              Start Quick Picks
              <ArrowRight size={15} strokeWidth={2.5} />
            </button>
            {noDaysSelected ? (
              <p className="text-xs" style={{ color: COLORS.conflict }}>
                Select at least one day to start Quick Picks.
              </p>
            ) : (
              <p className="flex items-center gap-1.5 text-xs text-white/30">
                <Lock size={11} strokeWidth={2} />
                Your picks are automatically saved
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
