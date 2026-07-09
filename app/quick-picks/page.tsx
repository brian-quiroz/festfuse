"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import StartScreen from "@/app/components/quick-picks/StartScreen";

type QuickPicksStep = "start" | "decisioning" | "checkpoint" | "summary";

export default function QuickPicksPage() {
    const [step, setStep] = useState<QuickPicksStep>("start");

    return (
        <div className="flex h-screen overflow-hidden bg-[#110D24]">
            <Sidebar />
            <main className="relative flex-1 min-w-0 overflow-y-auto overflow-x-hidden flex flex-col">
                {step === "start" && (
                    <StartScreen onStart={() => setStep("decisioning")} />
                )}
            </main>
        </div>
    );
}
