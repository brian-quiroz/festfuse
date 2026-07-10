"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CornerDownLeft } from "lucide-react";

interface DayStats {
    mustSee: number;
    interested: number;
    pass: number;
    total: number;
}

interface Props {
    completedDay: string | null;
    upcomingDay: string | null;
    dayStats: DayStats | null;
    onContinue: () => void;
}

export default function DayCompleteScreen({ completedDay, upcomingDay, dayStats, onContinue }: Props) {
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            if (e.key === "Enter") {
                e.preventDefault();
                onContinue();
            }
        }
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onContinue]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-1 flex flex-col items-center justify-center px-8 py-16"
        >
            <div className="flex flex-col items-center gap-10 w-full max-w-md text-center">

                {/* Eyebrow */}
                <div className="flex items-center gap-3">
                    <span className="h-px w-10 bg-[#FF2D78]/45" />
                    <p className="text-[#FF2D78]/85 text-sm uppercase tracking-widest font-semibold">Day Complete</p>
                    <span className="h-px w-10 bg-[#FF2D78]/45" />
                </div>

                {/* Headline + supporting copy */}
                <div className="flex flex-col items-center gap-3">
                    <h1 className="text-6xl font-extrabold tracking-tight leading-none">
                        <span className="text-white">{completedDay ?? "Day"} </span>
                        <span className="text-[#FF2D78]">complete!</span>
                    </h1>
                    {dayStats && (
                        <p className="text-white/40 text-base">
                            You reviewed all {dayStats.total} {completedDay} artists.
                        </p>
                    )}
                </div>

                {/* Stats — colors mirror the decision buttons */}
                {dayStats && (
                    <div className="flex items-start gap-10">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-[#E8FF47]">{dayStats.mustSee}</p>
                            <p className="text-white/35 text-xs mt-1">Must See</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-[#E8FF47]/55">{dayStats.interested}</p>
                            <p className="text-white/35 text-xs mt-1">Interested</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-red-400/65">{dayStats.pass}</p>
                            <p className="text-white/35 text-xs mt-1">Passed</p>
                        </div>
                    </div>
                )}

                {/* Primary CTA */}
                <div className="flex flex-col items-center gap-3 w-full">
                    <motion.button
                        onClick={onContinue}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "tween", duration: 0.1 }}
                        className="flex items-center justify-between w-full px-6 py-4 rounded-lg bg-[#00E5FF] text-[#110D24] font-bold text-base hover:bg-[#00E5FF]/90 transition-colors"
                    >
                        <span>Continue to {upcomingDay ?? "Next Day"}</span>
                        <CornerDownLeft size={16} strokeWidth={2.5} className="opacity-55" />
                    </motion.button>
                    <p className="text-white/30 text-xs">You're making great picks.</p>
                </div>

            </div>
        </motion.div>
    );
}
