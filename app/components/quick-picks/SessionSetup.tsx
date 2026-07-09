"use client";

import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import Image from "next/image";

export default function SessionSetup() {
    const [groupByDay, setGroupByDay] = useState(true);

    return (
        <div className="grid grid-cols-2 gap-6 w-full">

            <div>
                <div className="mb-3">
                    <p className="text-[10px] text-white/35 uppercase tracking-widest font-semibold">Step 1</p>
                    <p className="text-sm text-white/75 mt-0.5">Festival</p>
                </div>
                <button className="w-full rounded-2xl border border-white/12 bg-[#1B1535] p-5 min-h-[104px] text-left flex items-center"> {/* flex items-center vertically centers content within min-h */}
                    <div className="flex items-center justify-between w-full">

                        <div className="flex items-center gap-4">
                            {/*
                              Logo container: white background by default (works for most festival logos).
                              For logos designed for dark backgrounds, swap bg-white for bg-[#110D24] or bg-black.
                            */}
                            <div className="w-14 h-14 rounded-xl bg-white overflow-hidden flex items-center justify-center p-2 flex-shrink-0">
                                <Image
                                    src="/festivals/logos/lollapalooza.webp"
                                    width={48}
                                    height={48}
                                    alt="Lollapalooza logo"
                                    className="object-contain w-full h-full"
                                />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-white/75">
                                    Lollapalooza 2026
                                </h3>
                                <p className="text-xs text-white/45 mt-1.5">
                                    Jul 30 - Aug 2, 2026 • Grant Park, Chicago
                                </p>
                            </div>
                        </div>

                        <ChevronDown className="text-white/45" size={16} strokeWidth={2} />

                    </div>
                </button>
            </div>

            <div>
                <div className="mb-3">
                    <p className="text-[10px] text-white/35 uppercase tracking-widest font-semibold">Step 2</p>
                    <p className="text-sm text-white/75 mt-0.5">Grouping</p>
                </div>
                <div className="rounded-2xl border border-white/12 bg-[#1B1535] p-5 min-h-[104px] flex items-center">
                    <div className="flex items-center justify-between w-full">

                        <div className="flex items-center gap-4">
                            <Calendar size={22} strokeWidth={2} className="text-[#00E5FF]/65"/>
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-sm font-semibold text-white/75">
                                        Group by Festival Day
                                    </h3>
                                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#00E5FF]/8 border border-[#00E5FF]/15 text-[#00E5FF]/60 tracking-wide uppercase">
                                        Recommended
                                    </span>
                                </div>
                                <p className="text-xs text-white/45 mt-1.5">
                                    Focus on one day at a time.
                                </p>
                            </div>
                        </div>

                        {/* Toggle — pill color transitions between states */}
                        <button
                            className={`w-11 h-6 rounded-full relative p-0 flex-shrink-0 transition-colors duration-300 ease-in-out ${
                                groupByDay ? "bg-[#00E5FF]/75" : "bg-white/20"
                            }`}
                            onClick={() => setGroupByDay(!groupByDay)}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform duration-300 ease-in-out ${
                                groupByDay ? "translate-x-5" : "translate-x-0"
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
