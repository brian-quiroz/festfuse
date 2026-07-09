import Sidebar from "@/app/components/Sidebar";
import SessionSetup from "@/app/components/quick-picks/SessionSetup";
import { ArrowRight } from "lucide-react";

export default function QuickPicksPage() {
    return (
        <div className="flex h-screen overflow-hidden bg-[#110D24]">
            <Sidebar />
            <main className="flex-1 min-w-0 overflow-y-auto">
                
                {/* Page header */}
                <div className="px-8 pt-10 pb-0">
                    <div className="flex flex-col items-center gap-8">
                        
                        {/* Title */}
                        <div>
                            <h1 className="text-3xl font-extrabold text-white tracking-tight">
                                Quick Picks
                            </h1>
                            <p className="text-sm text-white/45 mt-1.5">
                                One artist. One decision.
                            </p>
                        </div>

                        {/* Session Setup */}
                        <SessionSetup />

                        {/* Start Session Button */}
                         <button className="flex w-80 items-center justify-center gap-2 px-4 py-4 rounded-lg bg-[#00E5FF] text-[#110D24] text-base font-bold hover:bg-[#00E5FF]/90 transition-colors">
                            Start Quick Picks
                            <ArrowRight size={15} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>


            </main>
        </div>
    );
}
