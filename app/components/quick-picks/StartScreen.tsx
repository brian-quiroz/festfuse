"use client";

import { useState } from "react";
import StartOptions from "@/app/components/quick-picks/StartOptions";
import { ArrowRight, Zap, Lock } from "lucide-react";
import type { QuickPicksSessionConfig } from "@/app/types/quick-picks";

interface Props {
    onStart: (config: QuickPicksSessionConfig) => void;
}

export default function StartScreen({ onStart }: Props) {
    const [groupByDay, setGroupByDay] = useState(true);
    const [pressing, setPressing] = useState(false);

    function handleStart() {
        if (pressing) return;
        setPressing(true);
        setTimeout(() => {
            setPressing(false);
            onStart({ festivalId: "lollapalooza", groupByDay });
        }, 100);
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
            <div className="flex flex-col items-center gap-8 w-full max-w-4xl">

                {/* Hero title */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex items-center gap-3">
                        <Zap size={40} fill="currentColor" strokeWidth={0} className="text-[#FF2D78]" />
                        <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[#FF2D78] to-[#A78BFA] bg-clip-text text-transparent">
                            Quick Picks
                        </h1>
                    </div>
                    <div className="text-base text-white/50 text-center leading-relaxed">
                        <p>One artist. One decision.</p>
                        <p>Build your <span className="text-[#FF2D78]">perfect</span> lineup.</p>
                    </div>
                </div>

                {/* Start Options + CTA */}
                <div className="w-full flex flex-col items-center gap-5">
                    <StartOptions groupByDay={groupByDay} onGroupByDayChange={setGroupByDay} />

                    <div className="w-full flex flex-col items-center gap-3">
                        <button
                            onClick={handleStart}
                            className={`flex w-full max-w-md items-center justify-center gap-2 px-4 py-4 rounded-lg bg-[#00E5FF] text-[#110D24] text-base font-bold hover:bg-[#00E5FF]/90 transition duration-100 ${pressing ? "scale-[0.97]" : ""}`}
                        >
                            Start Quick Picks
                            <ArrowRight size={15} strokeWidth={2.5} />
                        </button>
                        <p className="flex items-center gap-1.5 text-xs text-white/30">
                            <Lock size={11} strokeWidth={2} />
                            Your picks are automatically saved
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
