"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import StartScreen from "@/app/components/quick-picks/StartScreen";
import DecisionScreen from "@/app/components/quick-picks/DecisionScreen";
import DayCompleteScreen from "@/app/components/quick-picks/DayCompleteScreen";
import FestivalCompleteScreen from "@/app/components/quick-picks/FestivalCompleteScreen";
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
    const [hasUndone, setHasUndone] = useState(false);
    const [undoneVerdict, setUndoneVerdict] = useState<QuickPicksVerdict | null>(null);
    const [undoToast, setUndoToast] = useState<{ message: string; key: number } | null>(null);
    const [isScreenExiting, setIsScreenExiting] = useState(false);

    function handleStart(config: QuickPicksSessionConfig) {
        setHasUndone(false);
        setUndoneVerdict(null);
        setUndoToast(null);
        setIsScreenExiting(false);
        setSession(createSession(config));
        setStep("decisioning");
    }

    function handleDecision(verdict: QuickPicksVerdict) {
        if (!session) return;
        setHasUndone(false);
        setUndoneVerdict(null);
        setUndoToast(null);
        const currentItem = session.queue[session.currentIndex];
        const newDecisions = { ...session.decisions, [currentItem.artistId]: verdict };
        const newIndex = session.currentIndex + 1;

        const isLastOfSession = newIndex >= session.queue.length;
        const nextItem = isLastOfSession ? null : session.queue[newIndex];
        const isDayTransition = !isLastOfSession && !!session.config.groupByDay && nextItem!.day !== currentItem.day;

        if (isLastOfSession || isDayTransition) {
            // Record the decision but keep currentIndex pointing at the last valid artist
            // so DecisionScreen stays mounted and can animate the card out first.
            const capturedSession = session;
            setSession({ ...capturedSession, decisions: newDecisions });
            setIsScreenExiting(true);
            const targetStep: QuickPicksStep = isLastOfSession ? "festivalComplete" : "dayComplete";
            setTimeout(() => {
                setIsScreenExiting(false);
                setSession({ ...capturedSession, decisions: newDecisions, currentIndex: newIndex });
                setStep(targetStep);
            }, 320);
            return;
        }

        setSession({ ...session, decisions: newDecisions, currentIndex: newIndex });
        // step stays "decisioning"
    }

    function handleUndo() {
        if (!session || session.currentIndex === 0) return;
        const prevIndex = session.currentIndex - 1;
        const prevItem = session.queue[prevIndex];
        const previousVerdict = (session.decisions[prevItem.artistId] as QuickPicksVerdict | undefined) ?? null;
        const verdictLabels: Record<QuickPicksVerdict, string> = { pass: "Pass", interested: "Interested", mustSee: "Must See" };
        const verdictLabel = previousVerdict ? verdictLabels[previousVerdict] : "decision";
        const toastMessage = `${verdictLabel} undone`;
        const newDecisions = { ...session.decisions };
        delete newDecisions[prevItem.artistId];
        setHasUndone(true);
        setUndoneVerdict(previousVerdict);
        setUndoToast({ message: toastMessage, key: Date.now() });
        setSession({ ...session, currentIndex: prevIndex, decisions: newDecisions });
        setStep("decisioning");
    }

    function handleDayContinue() {
        setStep("decisioning");
    }

    function handleExit() {
        setHasUndone(false);
        setUndoneVerdict(null);
        setUndoToast(null);
        setIsScreenExiting(false);
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
    const canUndo = !hasUndone && !isScreenExiting && session !== null && session.currentIndex > 0;

    const prevQueueItem = session && session.currentIndex > 0
        ? session.queue[session.currentIndex - 1]
        : null;
    const undoVerdict: QuickPicksVerdict | null = prevQueueItem
        ? ((session!.decisions[prevQueueItem.artistId] as QuickPicksVerdict | undefined) ?? null)
        : null;

    // Completed day and upcoming day — used by DayCompleteScreen
    const completedDay = session?.queue[(session.currentIndex ?? 1) - 1]?.day ?? null;
    const upcomingDay = session?.queue[session.currentIndex]?.day ?? null;

    // Per-day verdict counts for DayCompleteScreen
    let completedDayStats: { mustSee: number; interested: number; pass: number; total: number } | null = null;
    if (session && completedDay) {
        const dayItems = session.queue.filter((item) => item.day === completedDay);
        let mustSee = 0, interested = 0, pass = 0;
        for (const item of dayItems) {
            const v = session.decisions[item.artistId] as QuickPicksVerdict | undefined;
            if (v === "mustSee") mustSee++;
            else if (v === "interested") interested++;
            else if (v === "pass") pass++;
        }
        completedDayStats = { mustSee, interested, pass, total: dayItems.length };
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[#110D24]">
            <Sidebar />
            <main className="relative flex-1 min-w-0 overflow-y-auto overflow-x-hidden flex flex-col">
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

                {step === "start" && <StartScreen onStart={handleStart} />}

                {step === "decisioning" && session && currentArtist && progress && (
                    <DecisionScreen
                        artist={currentArtist}
                        dayLabel={dayLabel}
                        progress={progress}
                        onDecision={handleDecision}
                        onUndo={handleUndo}
                        canUndo={canUndo}
                        priorVerdict={undoneVerdict}
                        undoVerdict={undoVerdict}
                        toast={undoToast}
                        onExit={handleExit}
                        isScreenExiting={isScreenExiting}
                    />
                )}

                {step === "dayComplete" && session && (
                    <DayCompleteScreen
                        completedDay={completedDay}
                        upcomingDay={upcomingDay}
                        dayStats={completedDayStats}
                        onContinue={handleDayContinue}
                    />
                )}

                {step === "festivalComplete" && (
                    <FestivalCompleteScreen
                        onGoToBlueprint={handleExit}
                        onGoToSchedule={handleExit}
                    />
                )}

            </main>
        </div>
    );
}
