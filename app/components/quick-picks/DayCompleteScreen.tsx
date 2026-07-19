"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CornerDownLeft } from "lucide-react";
import { COLORS } from "@/app/data/colors";

// Counts from 0 to target with cubic ease-out. cancelAnimationFrame(0) is a safe no-op.
function useCountUp(target: number, duration = 700, delay = 250) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setValue(0);
      return;
    }
    let raf = 0;
    const timeout = setTimeout(() => {
      let start: number | null = null;
      function step(timestamp: number) {
        if (start === null) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) raf = requestAnimationFrame(step);
      }
      raf = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, delay]);

  return value;
}

interface DayStats {
  mustSee: number;
  interested: number;
  passed: number;
  total: number;
}

interface Props {
  completedDay: string | null;
  upcomingDay: string | null;
  dayStats: DayStats | null;
  onContinue: () => void;
  onExit: () => void;
}

export default function DayCompleteScreen({
  completedDay,
  upcomingDay,
  dayStats,
  onContinue,
  onExit,
}: Props) {
  const mustSeeCount = useCountUp(dayStats?.mustSee ?? 0);
  const interestedCount = useCountUp(dayStats?.interested ?? 0);
  const passedCount = useCountUp(dayStats?.passed ?? 0);
  const [pressing, setPressing] = useState(false);

  function handleContinue() {
    if (pressing) return;
    setPressing(true);
    setTimeout(() => {
      setPressing(false);
      onContinue();
    }, 100);
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Enter") {
        e.preventDefault();
        handleContinue();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [pressing, onContinue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex-1 flex flex-col items-center justify-center px-8 py-16"
    >
      <button
        onClick={onExit}
        className="absolute top-6 right-6 z-10 p-2 text-white/30 hover:text-white/60 transition-colors duration-200"
        aria-label="Exit Quick Picks"
      >
        ✕
      </button>

      <div className="flex flex-col items-center gap-8 w-full max-w-md text-center">
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <span className="h-px w-12" style={{ backgroundColor: `${COLORS.celebration}99` }} />
          <p
            className="text-sm uppercase tracking-widest font-extrabold"
            style={{ color: COLORS.celebration }}
          >
            Day Complete
          </p>
          <span className="h-px w-12" style={{ backgroundColor: `${COLORS.celebration}99` }} />
        </div>

        {/* Headline + supporting copy */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-6xl font-extrabold tracking-tight leading-none">
            <span className="text-white">{completedDay ?? "Day"} </span>
            <span style={{ color: COLORS.celebration }}>complete!</span>
          </h1>
          {dayStats && (
            <p className="text-white/50 text-base">
              You reviewed all {dayStats.total} {completedDay} artists.
            </p>
          )}
        </div>

        {/* Stats — colors mirror the decision buttons; numbers count up on mount */}
        {dayStats && (
          <div className="flex items-start gap-10">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#E8FF47] tabular-nums">{mustSeeCount}</p>
              <p className="text-white/45 text-xs mt-1">Must See</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#E8FF47]/55 tabular-nums">{interestedCount}</p>
              <p className="text-white/45 text-xs mt-1">Interested</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white/40 tabular-nums">{passedCount}</p>
              <p className="text-white/45 text-xs mt-1">Passed</p>
            </div>
          </div>
        )}

        {/* Primary CTA */}
        <div className="flex flex-col items-center gap-3 w-full max-w-[390px] mt-3">
          <button
            onClick={handleContinue}
            className={`flex items-center justify-center gap-2 w-full px-6 py-4 rounded-lg bg-[#00E5FF] text-[#110D24] font-bold text-base hover:bg-[#00E5FF]/90 transition duration-100 ${pressing ? "scale-[0.97]" : ""}`}
          >
            Continue to {upcomingDay ?? "Next Day"}
            <ArrowRight size={15} strokeWidth={2.5} />
          </button>
          <span className="flex items-center gap-1 text-white/30 text-[11px]">
            <CornerDownLeft size={10} strokeWidth={2} />
            Enter
          </span>
          <p className="text-white/50 text-xs">
            You&apos;re making great picks. <span className="text-white/70">Keep it up!</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
