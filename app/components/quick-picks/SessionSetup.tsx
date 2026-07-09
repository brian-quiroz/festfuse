import { ChevronDown, Calendar } from "lucide-react";
import Image from "next/image";

export default function SessionSetup() {
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
                                    Focus on one day at at time.
                                </p>
                                <p className="text-xs text-white/45 mt-1.5">
                                    Recommended.
                                </p>
                            </div> 
                        </div>
                        
                        {/* Toggle */}
                        <div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}