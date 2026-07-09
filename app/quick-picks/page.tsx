import Sidebar from "@/app/components/Sidebar";
import SessionSetup from "@/app/components/quick-picks/SessionSetup";
import { ArrowRight, Zap, Lock } from "lucide-react";

export default function QuickPicksPage() {
    return (
        <div className="flex h-screen overflow-hidden bg-[#110D24]">
            <Sidebar />
            <main className="relative flex-1 min-w-0 overflow-y-auto overflow-x-hidden flex flex-col">

                {/* Background glow — bottom-right, mirrors mockup */}
                <div className="pointer-events-none absolute bottom-0 right-0 w-[520px] h-[400px] rounded-full bg-[#FF2D78]/8 blur-[120px]" />

                {/* Page content — vertically centered in the viewport */}
                <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
                    <div className="flex flex-col items-center gap-10 w-full">

                        {/* Hero title */}
                        <div className="flex flex-col items-center gap-3 text-center">
                            <div className="flex items-center gap-3">
                                <Zap size={36} fill="currentColor" strokeWidth={0} className="text-[#FF2D78]" />
                                <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#FF2D78] to-[#A78BFA] bg-clip-text text-transparent">
                                    Quick Picks
                                </h1>
                            </div>
                            <div className="text-base text-white/50 text-center leading-relaxed">
                                <p>One artist. One decision.</p>
                                <p>Build your <span className="text-[#FF2D78]">perfect</span> lineup.</p>
                            </div>
                        </div>

                        {/* Session Setup + CTA — share a width context */}
                        <div className="w-full flex flex-col items-center gap-6">
                            <SessionSetup />

                            <div className="w-full flex flex-col items-center gap-3">
                                <button className="flex w-full max-w-md items-center justify-center gap-2 px-4 py-4 rounded-lg bg-[#00E5FF] text-[#110D24] text-base font-bold hover:bg-[#00E5FF]/90 transition-colors">
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

            </main>
        </div>
    );
}
