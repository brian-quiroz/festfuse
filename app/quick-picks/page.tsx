"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import StartScreen from "@/app/components/quick-picks/StartScreen";
import DecisionScreen from "@/app/components/quick-picks/DecisionScreen";
import DayCompleteScreen from "@/app/components/quick-picks/DayCompleteScreen";
import QuickPicksCompleteScreen from "@/app/components/quick-picks/QuickPicksCompleteScreen";
import { FestivalStorySequence } from "@/app/components/festival-story/FestivalStorySequence";
import { FESTIVAL_STORY_IMAGES } from "@/app/data/festival-story";
import { COLORS } from "@/app/data/colors";
import { allArtists } from "@/app/data/artists";
import { useDecisionStore, type ArtistDecision } from "@/app/store/decisionStore";
import { useExploreFilterStore } from "@/app/store/exploreFilterStore";
import {
  interleaveByTierWithinDay,
  buildUngroupedQueue,
  type QueueEntry,
} from "@/app/lib/quick-picks-queue";
import { getDaysForFestival } from "@/app/data/festivals";
import { getSelectedDayAppearance, getAppearanceById, getAppearancesForFestival } from "@/app/lib/appearances";
import { getValidPositivePicks, MIN_POSITIVE_PICKS_FOR_STORY } from "@/app/hooks/useStorySignals";
import type {
  QuickPicksStep,
  QuickPicksSession,
  QuickPicksSessionConfig,
  QuickPicksQueueItem,
  QuickPicksVerdict,
} from "@/app/types/quick-picks";

// Build the queue from eligible {artist, appearance} entries — one entry per
// undecided artist with at least one appearance on a selected attendance day, using
// that artist's selected-day representative appearance (see getSelectedDayAppearance
// in app/lib/appearances.ts) for day-bucketing and billing-tier classification.
// The queue-generation strategy may evolve later (recommendations, popularity, etc.) without changing the session architecture.
// Exported (not just page-local) so verification scripts can call the exact same
// orchestration production uses, rather than re-implementing a second copy.
export function createSession(
  config: QuickPicksSessionConfig,
  decisionsByArtist: Record<string, ArtistDecision>
): QuickPicksSession {
  const { festivalId, groupByDay, attendanceDays } = config;

  const eligible: QueueEntry[] = [];
  for (const artist of allArtists) {
    if (decisionsByArtist[artist.slug]) continue; // exclude any prior verdict, any source
    const appearance = getSelectedDayAppearance(artist, festivalId, attendanceDays);
    if (!appearance) continue; // no appearance on any selected day
    eligible.push({ artist, appearance });
  }

  const orderedDays = getDaysForFestival(festivalId).filter((day) =>
    attendanceDays.includes(day)
  );

  const sortedEntries: QueueEntry[] = groupByDay
    ? orderedDays.flatMap((day) =>
        interleaveByTierWithinDay(eligible.filter((e) => e.appearance.day === day))
      )
    : buildUngroupedQueue(eligible, orderedDays);

  const dayCounts: Record<string, number> = {};
  for (const entry of sortedEntries) {
    dayCounts[entry.appearance.day] = (dayCounts[entry.appearance.day] ?? 0) + 1;
  }

  const dayCounters: Record<string, number> = {};
  const queue: QuickPicksQueueItem[] = sortedEntries.map((entry) => {
    const day = entry.appearance.day;
    dayCounters[day] = (dayCounters[day] ?? 0) + 1;
    return {
      artistId: entry.artist.slug,
      appearanceId: entry.appearance.id,
      day,
      dayPosition: dayCounters[day],
      dayTotal: dayCounts[day],
    };
  });

  return { config, queue, currentIndex: 0, decisions: {} };
}

export default function QuickPicksPage() {
  const router = useRouter();
  const { decisionsByArtist, setDecision } = useDecisionStore();
  const showPassedArtists = useExploreFilterStore((state) => state.showPassedArtists);
  const [step, setStep] = useState<QuickPicksStep>("start");
  const [session, setSession] = useState<QuickPicksSession | null>(null);
  const [initialDecisions, setInitialDecisions] = useState<
    Record<string, QuickPicksVerdict | null>
  >({});
  const [hasUndone, setHasUndone] = useState(false);
  const [undoneVerdict, setUndoneVerdict] = useState<QuickPicksVerdict | null>(null);
  const [undoToast, setUndoToast] = useState<{ message: string; key: number } | null>(null);
  const [isScreenExiting, setIsScreenExiting] = useState(false);
  const [showFestivalStory, setShowFestivalStory] = useState(false);

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
  // Resolve the session's chosen appearance from the queue item's appearanceId —
  // DecisionScreen displays this rather than independently recomputing a primary.
  const currentAppearance =
    currentArtist && currentQueueItem && session
      ? (getAppearanceById(currentArtist, session.config.festivalId, currentQueueItem.appearanceId) ??
        null)
      : null;
  // Disclosure count scoped to the session's selected attendance days, not the
  // artist's full appearance count — see ARCHITECTURE.md § Quick Picks Attendance.
  const selectedDaySetCount =
    currentArtist && session
      ? getAppearancesForFestival(currentArtist, session.config.festivalId).filter((a) =>
          session.config.attendanceDays.includes(a.day)
        ).length
      : 0;

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

  // Festival Story unlock — attendance-scoped, using the same eligibility resolution
  // computeStorySignals itself uses (never a separate raw-decision count). Recomputed
  // from the live decision store, so a decision made mid-session already counts.
  const storyUnlocked = session
    ? getValidPositivePicks(session.config.festivalId, session.config.attendanceDays, allArtists, decisionsByArtist)
        .length >= MIN_POSITIVE_PICKS_FOR_STORY
    : false;

  // Preload the Story's intro image while the completion screen is visible — this
  // component stays mounted then, unlike FestivalStorySequence, which is only
  // mounted once the user actually opens the Story (see below) and would be too late
  // to preload anything useful. Only fires when Story is actually openable.
  const isOnCompletionScreen = step === "festivalComplete" || step === "allDecided";
  useEffect(() => {
    if (!isOnCompletionScreen || !storyUnlocked) return;
    const introImageUrl = FESTIVAL_STORY_IMAGES.intro;
    if (!introImageUrl) return;
    if (document.head.querySelector(`link[rel="preload"][href="${introImageUrl}"]`)) return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = introImageUrl;
    document.head.appendChild(link);
  }, [isOnCompletionScreen, storyUnlocked]);

  const showSidebar = step === "start";

  return (
    <div className="flex h-screen overflow-hidden bg-[#110D24]">
      {showSidebar && <Sidebar />}
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
          <div
            className="absolute bottom-[-80px] right-[-80px] w-[640px] h-[520px] rounded-full blur-[130px]"
            style={{ backgroundColor: `${COLORS.celebration}1f` }}
          />
          <div className="absolute top-[-60px] left-[-60px] w-[500px] h-[400px] rounded-full bg-[#A78BFA]/10 blur-[110px]" />
        </div>

        {step === "start" && <StartScreen onStart={handleStart} />}

        {step === "decisioning" && session && currentArtist && currentAppearance && progress && (
          <DecisionScreen
            artist={currentArtist}
            appearance={currentAppearance}
            selectedDaySetCount={selectedDaySetCount}
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
            onExit={handleExit}
          />
        )}

        {(step === "festivalComplete" || step === "allDecided") && (
          <>
            <QuickPicksCompleteScreen
              context={step === "festivalComplete" ? "sessionComplete" : "nothingToReview"}
              attendanceDays={session?.config.attendanceDays ?? []}
              storyUnlocked={storyUnlocked}
              onGoToFestivalStory={() => setShowFestivalStory(true)}
              onGoToSchedule={() => router.push("/planner")}
              onExploreArtists={() => {
                showPassedArtists();
                router.push("/explore");
              }}
              onExit={handleExit}
            />
            {/* Conditionally mounted, not just isOpen-gated: mounting is what triggers
                useStorySignals' ~500-sample computation, so it must not run merely
                because the completion screen is showing. Unmounting on close also
                resets FestivalStorySequence's internal currentIndex for free — no
                state to reset by hand, so reopening always starts at the intro. */}
            {showFestivalStory && storyUnlocked && (
              <FestivalStorySequence
                isOpen={showFestivalStory}
                onClose={() => setShowFestivalStory(false)}
                attendanceDays={session?.config.attendanceDays}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
