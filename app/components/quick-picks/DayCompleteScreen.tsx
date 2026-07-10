"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
    completedDay: string | null;
    upcomingDay: string | null;
    onContinue: () => void;
}

export default function DayCompleteScreen({ completedDay, upcomingDay, onContinue }: Props) {
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
            className="flex-1 flex flex-col"
        >
            <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-white">
                <p className="text-white/35 text-xs uppercase tracking-widest">Day Complete</p>
                <h2 className="text-2xl font-bold">{completedDay} is done</h2>
                {upcomingDay && (
                    <p className="text-white/45 text-sm">Up next: {upcomingDay}</p>
                )}
                <button
                    onClick={onContinue}
                    className="mt-4 flex items-center justify-between w-64 px-6 py-3 rounded-lg bg-[#00E5FF] text-[#110D24] font-bold text-sm hover:bg-[#00E5FF]/90 transition-colors"
                >
                    <span>Continue</span>
                    <span className="opacity-60">↵</span>
                </button>
            </div>
        </motion.div>
    );
}
