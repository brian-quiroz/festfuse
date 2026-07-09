"use client";

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
        <>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
                    <filter id="grain">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#grain)" />
                </svg>
                <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse 85% 75% at 50% 45%, transparent 35%, rgba(17,13,36,0.6) 100%)" }}
                />
                <div className="absolute bottom-[-80px] right-[-80px] w-[640px] h-[520px] rounded-full bg-[#FF2D78]/12 blur-[130px]" />
                <div className="absolute top-[-60px] left-[-60px] w-[500px] h-[400px] rounded-full bg-[#A78BFA]/10 blur-[110px]" />
            </div>

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
        </>
    );
}
