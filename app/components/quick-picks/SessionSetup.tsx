"use client";

import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import Image from "next/image";

export default function SessionSetup() {
    const [groupByDay, setGroupByDay] = useState(true);

    return (
        <div className="grid grid-cols-2 gap-6">

            <div>
                <div className="mb-3 text-white/75 text-sm">
                    Festival
                </div>
                <button className="w-full rounded-2xl border border-white/10 bg-[#1B1535] p-5 min-h-[104px] text-left"> {/* Text Left is to override default button centered text */}
                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-4">
                            <Image 
                            src="/festivals/logos/lollapalooza.webp"
                            width={60}
                            height={60}
                            alt="Lollapalooza logo"
                            className="object-contain"
                            />
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
                <div className="mb-3 text-white/75 text-sm">
                    Grouping
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#1B1535] p-5 min-h-[104px]">
                    <div className="flex items-center justify-between">
                        
                        <div className="flex items-center gap-4">
                            <Calendar size={22} strokeWidth={2} className="text-[#00E5FF]/65"/>
                            <div>
                                <h3 className="text-sm font-semibold text-white/75">
                                Group by Festival Day
                                </h3>
                                <p className="text-xs text-white/45 mt-1.5">
                                    Focus on one day at a time.
                                </p>
                                <p className="text-xs text-white/45 mt-1.5">
                                    Recommended.
                                </p>
                            </div> 
                        </div>

                        {/* Toggle */}
                        <button
                            className="w-11 h-6 bg-[#00E5FF]/75 rounded-full relative p-0"
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