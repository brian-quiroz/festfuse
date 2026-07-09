"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import StartScreen from "@/app/components/quick-picks/StartScreen";
import { allArtists } from "@/app/data/artists";
import type {
    QuickPicksStep,
    QuickPicksSession,
    SessionConfig,
    QueueItem,
} from "@/app/types/quick-picks";

const DAY_ORDER = ["Thursday", "Friday", "Saturday", "Sunday"];

function parseTime(t: string): number {
    const [time, period] = t.split(" ");
    const [h, m] = time.split(":").map(Number);
    return (h % 12 + (period === "PM" ? 12 : 0)) * 60 + m;
}

// MVP: Build the queue in festival schedule order.
// The queue-generation strategy may evolve later (recommendations, popularity, etc.) without changing the session architecture.
function createSession(config: SessionConfig): QuickPicksSession {
    const sorted = [...allArtists].sort((a, b) => {
        const dayDiff =
            DAY_ORDER.indexOf(a.schedule.day) - DAY_ORDER.indexOf(b.schedule.day);
        return dayDiff !== 0
            ? dayDiff
            : parseTime(a.schedule.startTime) - parseTime(b.schedule.startTime);
    });

    const dayCounts: Record<string, number> = {};
    for (const artist of sorted) {
        dayCounts[artist.schedule.day] = (dayCounts[artist.schedule.day] ?? 0) + 1;
    }

    const dayCounters: Record<string, number> = {};
    const queue: QueueItem[] = sorted.map((artist) => {
        const day = artist.schedule.day;
        dayCounters[day] = (dayCounters[day] ?? 0) + 1;
        return {
            artistId: artist.slug,
            day,
            dayPosition: dayCounters[day],
            dayTotal: dayCounts[day],
        };
    });

    return { config, queue, currentIndex: 0, decisions: {} };
}

export default function QuickPicksPage() {
    const [step, setStep] = useState<QuickPicksStep>("start");
    const [session, setSession] = useState<QuickPicksSession | null>(null);

    function handleStart(config: SessionConfig) {
        setSession(createSession(config));
        setStep("decisioning");
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[#110D24]">
            <Sidebar />
            <main className="relative flex-1 min-w-0 overflow-y-auto overflow-x-hidden flex flex-col">
                {step === "start" && (
                    <StartScreen onStart={handleStart} />
                )}

                {/* TODO: Replace this temporary wiring placeholder with <DecisionScreen /> once the decisioning UI is implemented. Remove the Row helper below. */}
                {step === "decisioning" && session && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-white font-mono text-sm">
                        <p className="text-white/40 uppercase tracking-widest text-xs">Quick Picks — wiring placeholder</p>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col gap-2 min-w-[320px]">
                            <Row label="step" value={step} />
                            <Row label="festivalId" value={session.config.festivalId} />
                            <Row label="groupByDay" value={String(session.config.groupByDay)} />
                            <Row label="queue.length" value={String(session.queue.length)} />
                            <Row label="currentIndex" value={String(session.currentIndex)} />
                        </div>
                        <button
                            onClick={() => setStep("start")}
                            className="text-xs text-white/30 hover:text-white/60 underline underline-offset-2 transition-colors"
                        >
                            ← back to start
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between gap-8">
            <span className="text-white/40">{label}</span>
            <span className="text-[#00E5FF]">{value}</span>
        </div>
    );
}
