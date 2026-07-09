"use client";

import StartOptions from "@/app/components/quick-picks/StartOptions";
import { ArrowRight, Zap, Lock } from "lucide-react";

interface Props {
    onStart: () => void;
}

export default function StartScreen({ onStart }: Props) {
    return (
        <>
            {/* Atmospheric background */}
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
                    style={{ background: 'radial-gradient(ellipse 85% 75% at 50% 45%, transparent 35%, rgba(17,13,36,0.6) 100%)' }}
                />
                <div className="absolute bottom-[-80px] right-[-80px] w-[640px] h-[520px] rounded-full bg-[#FF2D78]/12 blur-[130px]" />
                <div className="absolute top-[-60px] left-[-60px] w-[500px] h-[400px] rounded-full bg-[#A78BFA]/10 blur-[110px]" />
            </div>

            {/* Page content — vertically centered, max-w-4xl shared by all elements */}
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

                    {/* Session Setup + CTA */}
                    <div className="w-full flex flex-col items-center gap-5">
                        <StartOptions />

                        <div className="w-full flex flex-col items-center gap-3">
                            <button
                                onClick={onStart}
                                className="flex w-full max-w-md items-center justify-center gap-2 px-4 py-4 rounded-lg bg-[#00E5FF] text-[#110D24] text-base font-bold hover:bg-[#00E5FF]/90 transition-colors"
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
        </>
    );
}
