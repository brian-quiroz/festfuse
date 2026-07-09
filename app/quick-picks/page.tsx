"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import StartScreen from "@/app/components/quick-picks/StartScreen";
import DecisionScreen from "@/app/components/quick-picks/DecisionScreen";
import DayCompleteScreen from "@/app/components/quick-picks/DayCompleteScreen";
import FinalSummaryScreen from "@/app/components/quick-picks/FinalSummaryScreen";
import { allArtists } from "@/app/data/artists";
import type {
    QuickPicksStep,
    QuickPicksSession,
    QuickPicksSessionConfig,
    QuickPicksQueueItem,
    QuickPicksVerdict,
} from "@/app/types/quick-picks";

const DAY_ORDER = ["Thursday", "Friday", "Saturday", "Sunday"];

function parseTime(t: string): number {
    const [time, period] = t.split(" ");
    const [h, m] = time.split(":").map(Number);
    return (h % 12 + (period === "PM" ? 12 : 0)) * 60 + m;
}

// MVP: Build the queue in festival schedule order.
// The queue-generation strategy may evolve later (recommendations, popularity, etc.) without changing the session architecture.
function createSession(config: QuickPicksSessionConfig): QuickPicksSession {
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
    const queue: QuickPicksQueueItem[] = sorted.map((artist) => {
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

    function handleStart(config: QuickPicksSessionConfig) {
        setSession(createSession(config));
        setStep("decisioning");
    }

    function handleDecision(verdict: QuickPicksVerdict) {
        if (!session) return;
        const currentItem = session.queue[session.currentIndex];
        const newDecisions = { ...session.decisions, [currentItem.artistId]: verdict };
        const newIndex = session.currentIndex + 1;
        const updatedSession = { ...session, decisions: newDecisions, currentIndex: newIndex };

        setSession(updatedSession);

        if (newIndex >= session.queue.length) {
            setStep("finalSummary");
            return;
        }

        const nextItem = session.queue[newIndex];
        if (session.config.groupByDay && nextItem.day !== currentItem.day) {
            setStep("dayComplete");
        }
        // Otherwise currentIndex advances and we stay on "decisioning"
    }

    function handleDayContinue() {
        setStep("decisioning");
    }

    function handleExit() {
        setSession(null);
        setStep("start");
    }

    // Derive what DecisionScreen needs from the current session state
    const currentQueueItem = session?.queue[session.currentIndex] ?? null;
    const currentArtist = currentQueueItem
        ? (allArtists.find((a) => a.slug === currentQueueItem.artistId) ?? null)
        : null;

    const progress =
        session && currentQueueItem
            ? session.config.groupByDay
                ? { current: currentQueueItem.dayPosition, total: currentQueueItem.dayTotal }
                : { current: session.currentIndex + 1, total: session.queue.length }
            : null;

    const dayLabel = session?.config.groupByDay ? (currentQueueItem?.day ?? null) : null;

    // Completed day and upcoming day — used by the dayComplete placeholder
    const completedDay = session?.queue[(session.currentIndex ?? 1) - 1]?.day ?? null;
    const upcomingDay = session?.queue[session.currentIndex]?.day ?? null;

    return (
        <div className="flex h-screen overflow-hidden bg-[#110D24]">
            <Sidebar />
            <main className="relative flex-1 min-w-0 overflow-y-auto overflow-x-hidden flex flex-col">

                {step === "start" && <StartScreen onStart={handleStart} />}

                {step === "decisioning" && session && currentArtist && progress && (
                    <DecisionScreen
                        artist={currentArtist}
                        dayLabel={dayLabel}
                        progress={progress}
                        onDecision={handleDecision}
                        onExit={handleExit}
                    />
                )}

                {step === "dayComplete" && session && (
                    <DayCompleteScreen
                        completedDay={completedDay}
                        upcomingDay={upcomingDay}
                        onContinue={handleDayContinue}
                    />
                )}

                {step === "finalSummary" && session && (
                    <FinalSummaryScreen
                        decisions={session.decisions}
                        totalArtists={session.queue.length}
                        onExit={handleExit}
                    />
                )}

            </main>
        </div>
    );
}
