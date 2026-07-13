"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import StartScreen from "@/app/components/quick-picks/StartScreen";
import DecisionScreen from "@/app/components/quick-picks/DecisionScreen";
import DayCompleteScreen from "@/app/components/quick-picks/DayCompleteScreen";
import FestivalCompleteScreen from "@/app/components/quick-picks/FestivalCompleteScreen";
import { allArtists } from "@/app/data/artists";
import { useInterestStore, type ArtistDecision } from "@/app/store/interestStore";
import { interleaveByTierWithinDay } from "@/app/lib/quick-picks-queue";
import { getDaysForActiveFestival } from "@/app/data/festivals";
import type {
  QuickPicksStep,
  QuickPicksSession,
  QuickPicksSessionConfig,
  QuickPicksQueueItem,
  QuickPicksVerdict,
} from "@/app/types/quick-picks";

// Build the queue using tier-interleaved order within each day.
// Within each day: headliners/sub-headliners are sprinkled throughout,
// with undercard artists filling most slots to maintain momentum and discovery.
// The queue-generation strategy may evolve later (recommendations, popularity, etc.) without changing the session architecture.
function createSession(
  config: QuickPicksSessionConfig,
  decisionsByArtist: Record<string, ArtistDecision>
): QuickPicksSession {
  // Filter to only undecided artists (no entry in store means undecided)
  const undecidedArtists = allArtists.filter((a) => !decisionsByArtist[a.slug]);

  // Group artists by day
  const byDay = new Map<string, typeof undecidedArtists>();
  for (const artist of undecidedArtists) {
    const day = artist.appearance.day;
    if (!byDay.has(day)) {
      byDay.set(day, []);
    }
    byDay.get(day)!.push(artist);
  }

  // For each day (in festival order), interleave by tier
  const sorted: typeof undecidedArtists = [];
  const days = getDaysForActiveFestival();
  for (const day of days) {
    if (byDay.has(day)) {
      const dayArtists = interleaveByTierWithinDay(byDay.get(day)!);
      sorted.push(...dayArtists);
    }
  }

  const dayCounts: Record<string, number> = {};
  for (const artist of sorted) {
    dayCounts[artist.appearance.day] = (dayCounts[artist.appearance.day] ?? 0) + 1;
  }

  const dayCounters: Record<string, number> = {};
  const queue: QuickPicksQueueItem[] = sorted.map((artist) => {
    const day = artist.appearance.day;
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
  const { decisionsByArtist, setDecision } = useInterestStore();
  const [step, setStep] = useState<QuickPicksStep>("start");
  const [session, setSession] = useState<QuickPicksSession | null>(null);
  const [initialDecisions, setInitialDecisions] = useState<Record<string, QuickPicksVerdict | null>>({});
  const [hasUndone, setHasUndone] = useState(false);
  const [undoneVerdict, setUndoneVerdict] = useState<QuickPicksVerdict | null>(null);
  const [undoToast, setUndoToast] = useState<{ message: string; key: number } | null>(null);
  const [isScreenExiting, setIsScreenExiting] = useState(false);

  function handleStart(config: QuickPicksSessionConfig) {
    setHasUndone(false);
    setUndoneVerdict(null);
    setUndoToast(null);
    setIsScreenExiting(false);
    const newSession = createSession(config, decisionsByArtist);

    // If no undecided artists, show "all reviewed" screen instead of blank page
    if (newSession.queue.length === 0) {
      setSession(newSession);
      setStep("allDecided");
      return;
    }

    // Capture the current state of decisions for all artists in the queue for undo purposes
    const initial: Record<string, QuickPicksVerdict | null> = {};
    for (const item of newSession.queue) {
      initial[item.artistId] = decisionsByArtist[item.artistId]?.verdict ?? null;
    }
    setInitialDecisions(initial);
    setSession(newSession);
    setStep("decisioning");
  }

  function handleDecision(verdict: QuickPicksVerdict) {
    if (!session) return;
    setHasUndone(false);
    setUndoneVerdict(null);
    setUndoToast(null);
    const currentItem = session.queue[session.currentIndex];
    const newDecisions = { ...session.decisions, [currentItem.artistId]: verdict };

    // Write decision to the shared store immediately so it's visible on other pages
    setDecision(currentItem.artistId, verdict, "quickPicks");

    const newIndex = session.currentIndex + 1;

    const isLastOfSession = newIndex >= session.queue.length;
    const nextItem = isLastOfSession ? null : session.queue[newIndex];
    const isDayTransition =
      !isLastOfSession && !!session.config.groupByDay && nextItem!.day !== currentItem.day;

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
    const previousVerdict =
      (session.decisions[prevItem.artistId] as QuickPicksVerdict | undefined) ?? null;
    const verdictLabels: Record<QuickPicksVerdict, string> = {
      passed: "Passed",
      interested: "Interested",
      mustSee: "Must See",
    };
    const verdictLabel = previousVerdict ? verdictLabels[previousVerdict] : "decision";
    const toastMessage = `${verdictLabel} undone`;
    const newDecisions = { ...session.decisions };
    delete newDecisions[prevItem.artistId];

    // Restore the artist's previous persisted verdict from the store
    const priorState = initialDecisions[prevItem.artistId];
    if (priorState === "passed") {
      setDecision(prevItem.artistId, null, "quickPicks");
    } else if (priorState === null) {
      setDecision(prevItem.artistId, null, "quickPicks");
    } else {
      setDecision(prevItem.artistId, priorState, "quickPicks");
    }

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

  const prevQueueItem =
    session && session.currentIndex > 0 ? session.queue[session.currentIndex - 1] : null;
  const undoVerdict: QuickPicksVerdict | null = prevQueueItem
    ? ((session!.decisions[prevQueueItem.artistId] as QuickPicksVerdict | undefined) ?? null)
    : null;

  // Completed day and upcoming day — used by DayCompleteScreen
  const completedDay = session?.queue[(session.currentIndex ?? 1) - 1]?.day ?? null;
  const upcomingDay = session?.queue[session.currentIndex]?.day ?? null;

  // Per-day verdict counts for DayCompleteScreen
  let completedDayStats: {
    mustSee: number;
    interested: number;
    passed: number;
    total: number;
  } | null = null;
  if (session && completedDay) {
    const dayItems = session.queue.filter((item) => item.day === completedDay);
    let mustSee = 0,
      interested = 0,
      passed = 0;
    for (const item of dayItems) {
      const v = session.decisions[item.artistId] as QuickPicksVerdict | undefined;
      if (v === "mustSee") mustSee++;
      else if (v === "interested") interested++;
      else if (v === "passed") passed++;
    }
    completedDayStats = { mustSee, interested, passed, total: dayItems.length };
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#110D24]">
      <Sidebar />
      <main className="relative flex-1 min-w-0 overflow-y-auto overflow-x-hidden flex flex-col">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <filter id="grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 85% 75% at 50% 45%, transparent 35%, rgba(17,13,36,0.6) 100%)",
            }}
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

        {(step === "festivalComplete" || step === "allDecided") && (
          <FestivalCompleteScreen
            context={step === "festivalComplete" ? "sessionComplete" : "nothingToReview"}
            onGoToBlueprint={handleExit}
            onGoToSchedule={handleExit}
          />
        )}
      </main>
    </div>
  );
}
