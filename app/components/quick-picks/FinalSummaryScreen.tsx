"use client";

import { motion } from "framer-motion";
import type { QuickPicksVerdict } from "@/app/types/quick-picks";

interface Props {
    decisions: Record<string, QuickPicksVerdict>;
    totalArtists: number;
    onExit: () => void;
}

export default function FinalSummaryScreen({ decisions, totalArtists, onExit }: Props) {
    const verdicts = Object.values(decisions);
    const mustSeeCount = verdicts.filter((v) => v === "mustSee").length;
    const interestedCount = verdicts.filter((v) => v === "interested").length;
    const passCount = verdicts.filter((v) => v === "pass").length;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-1 flex flex-col"
        >
            <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-white">
                <p className="text-white/35 text-xs uppercase tracking-widest">Quick Picks Complete</p>
                <h2 className="text-2xl font-bold">You've rated all {totalArtists} artists</h2>
                <div className="flex gap-8 mt-3 text-center">
                    <div>
                        <p className="text-2xl font-bold text-[#E8FF47]">{mustSeeCount}</p>
                        <p className="text-white/35 text-xs mt-0.5">Must See</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[#E8FF47]/60">{interestedCount}</p>
                        <p className="text-white/35 text-xs mt-0.5">Interested</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white/30">{passCount}</p>
                        <p className="text-white/35 text-xs mt-0.5">Passed</p>
                    </div>
                </div>
                <button
                    onClick={onExit}
                    className="mt-6 px-6 py-3 rounded-lg bg-[#00E5FF] text-[#110D24] font-bold text-sm hover:bg-[#00E5FF]/90 transition-colors"
                >
                    Back to Start
                </button>
            </div>
        </motion.div>
    );
}
