"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useChromeStore } from "@/app/store/chromeStore";
import StartScreen from "@/app/components/quick-picks/StartScreen";
import DecisionScreen from "@/app/components/quick-picks/DecisionScreen";
import DayCompleteScreen from "@/app/components/quick-picks/DayCompleteScreen";
import QuickPicksCompleteScreen from "@/app/components/quick-picks/QuickPicksCompleteScreen";
import { FestivalStorySequence } from "@/app/components/festival-story/FestivalStorySequence";
import AppearancesUnavailable from "@/app/components/AppearancesUnavailable";
import { FESTIVAL_STORY_IMAGES } from "@/app/data/festival-story";
import { COLORS } from "@/app/data/colors";
import {
  useDecisionStore,
  useEditionDecisions,
  type ArtistDecision,
} from "@/app/store/decisionStore";
import { useExploreFilterStore } from "@/app/store/exploreFilterStore";
import { useRunAppearances } from "@/app/store/runAppearancesStore";
import { useAnnouncedRunArtists } from "@/app/store/announcedRunArtistsStore";
import {
  getQuickPicksRunArtistsFromApi,
  type QuickPicksRunArtist,
} from "@/app/lib/api/mapRunAppearance";
import { getAnnouncedQuickPicksArtistsFromApi } from "@/app/lib/api/mapRunArtist";
import {
  interleaveByTierWithinDay,
  interleaveArtistsByTier,
  buildUngroupedQueue,
  getEligibleEntries,
  type QueueEntry,
} from "@/app/lib/quick-picks-queue";
import { contextHref, getDaysForFestival } from "@/app/data/festivals";
import { getAppearanceById, getAppearancesForFestival } from "@/app/lib/appearances";
import { getValidPositivePicks, MIN_POSITIVE_PICKS_FOR_STORY } from "@/app/hooks/useStorySignals";
import { useRunContext, useRunDays, useRunScheduleMode } from "@/app/components/RunContextProvider";
import type {
  QuickPicksStep,
  QuickPicksSession,
  QuickPicksSessionConfig,
  QuickPicksQueueItem,
  QuickPicksVerdict,
} from "@/app/types/quick-picks";

// Builds the queue from eligible {artist, appearance} entries — see
// getSelectedDayAppearance in app/lib/appearances.ts for how each artist's
// representative appearance is chosen. Exported so verification scripts share this
// orchestration; quickPicksArtists is a parameter (not a module import) so it works
// with both the TS-fallback and API-backed artist arrays.
export function createSession(
  config: QuickPicksSessionConfig,
  decisionsByArtist: Record<string, ArtistDecision>,
  quickPicksArtists: QuickPicksRunArtist[]
): QuickPicksSession {
  const { festivalId, runSlug, groupByDay, attendanceDays } = config;
  const dayOrder = getDaysForFestival(festivalId, runSlug);

  const eligible: QueueEntry[] = getEligibleEntries(
    quickPicksArtists,
    festivalId,
    attendanceDays,
    decisionsByArtist,
    dayOrder
  );

  const orderedDays = dayOrder.filter((day) => attendanceDays.includes(day));

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

// Announced-run session builder (ADR-0016). No schedule, so no day buckets, no
// attendance filter, no selected-day appearance: eligible = every artist with no
// verdict yet (any source), ordered by the shared tier interleave on each artist's
// run-level billingTier. Queue items carry null day/appearance fields — DecisionScreen
// and progress fall back to whole-queue counting. Exported alongside createSession for
// symmetry and testability.
export function createAnnouncedSession(
  config: QuickPicksSessionConfig,
  decisionsByArtist: Record<string, ArtistDecision>,
  quickPicksArtists: QuickPicksRunArtist[]
): QuickPicksSession {
  const eligible = quickPicksArtists.filter((artist) => !decisionsByArtist[artist.slug]);
  const ordered = interleaveArtistsByTier(eligible);

  const queue: QuickPicksQueueItem[] = ordered.map((artist) => ({
    artistId: artist.slug,
    appearanceId: null,
    day: null,
    dayPosition: null,
    dayTotal: null,
  }));

  return { config, queue, currentIndex: 0, decisions: {} };
}

export default function QuickPicksPage() {
  const router = useRouter();
  const setDecision = useDecisionStore((s) => s.setDecision);
  const showPassedArtists = useExploreFilterStore((state) => state.showPassedArtists);
  const setSidebarVisible = useChromeStore((state) => state.setSidebarVisible);
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

  const { editionSlug, runSlug } = useRunContext();
  const scheduleMode = useRunScheduleMode();
  const isAnnouncedMode = scheduleMode === "announced";
  const decisionsByArtist = useEditionDecisions(editionSlug);
  const dayOrder = useRunDays();
  // Only one feed is hydrated per run (ADR-0016); the unused hook returns its stable
  // empty slice.
  const { appearancesBySlug: runAppearancesBySlug, loadState: runAppearancesLoadState } =
    useRunAppearances(editionSlug, runSlug);
  const { artists: announcedApiArtists, loadState: announcedLoadState } = useAnnouncedRunArtists(
    editionSlug,
    runSlug
  );
  const quickPicksArtists = useMemo(
    () =>
      isAnnouncedMode
        ? getAnnouncedQuickPicksArtistsFromApi(announcedApiArtists)
        : getQuickPicksRunArtistsFromApi(runAppearancesBySlug, editionSlug),
    [isAnnouncedMode, announcedApiArtists, runAppearancesBySlug, editionSlug]
  );

  function handleStart(config: QuickPicksSessionConfig) {
    setHasUndone(false);
    setUndoneVerdict(null);
    setUndoToast(null);
    setIsScreenExiting(false);
    const newSession =
      config.mode === "announced"
        ? createAnnouncedSession(config, decisionsByArtist, quickPicksArtists)
        : createSession(config, decisionsByArtist, quickPicksArtists);

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
    setDecision(editionSlug, currentItem.artistId, verdict, "quickPicks");

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
      setDecision(editionSlug, prevItem.artistId, null, "quickPicks");
    } else if (priorState === null) {
      setDecision(editionSlug, prevItem.artistId, null, "quickPicks");
    } else {
      setDecision(editionSlug, prevItem.artistId, priorState, "quickPicks");
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
    ? (quickPicksArtists.find((a) => a.slug === currentQueueItem.artistId) ?? null)
    : null;
  // Resolve the session's chosen appearance from the queue item's appearanceId —
  // DecisionScreen displays this rather than independently recomputing a primary.
  // Null in announced mode: the queue item has no appearanceId (no schedule).
  const currentAppearance =
    currentArtist && currentQueueItem?.appearanceId && session
      ? (getAppearanceById(
          currentArtist,
          session.config.festivalId,
          currentQueueItem.appearanceId
        ) ?? null)
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
        ? {
            current: currentQueueItem.dayPosition ?? 0,
            total: currentQueueItem.dayTotal ?? 0,
          }
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
    ? getValidPositivePicks(
        session.config.festivalId,
        session.config.attendanceDays,
        quickPicksArtists,
        decisionsByArtist,
        dayOrder
      ).length >= MIN_POSITIVE_PICKS_FOR_STORY
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

  // Sidebar is a single shared instance in app/layout.tsx, so hiding it during
  // decisioning/completion (no-chrome design for this flow) goes through chromeStore
  // instead of a per-page conditional render.
  useEffect(() => {
    setSidebarVisible(step === "start");
  }, [step, setSidebarVisible]);

  // Restore visibility on unmount so leaving Quick Picks for another page never leaves
  // the shared Sidebar stuck hidden.
  useEffect(() => {
    return () => setSidebarVisible(true);
  }, [setSidebarVisible]);

  // The failure screen is a generic system message, not Quick Picks content — it
  // should look identical to Explore/Planner/Credits' plain-background version
  // rather than carrying this screen's decorative energy. Gated on the mode's own
  // feed load state (ADR-0016): only one store is hydrated per run. A zero-artist
  // announced run never reaches here — the run layout blocks it upstream.
  const feedLoadState = isAnnouncedMode ? announcedLoadState : runAppearancesLoadState;
  const showAppearancesUnavailable = step === "start" && feedLoadState === "error";

  return (
    <main className="relative flex-1 min-w-0 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col">
      {!showAppearancesUnavailable && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
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
      )}

      {step === "start" &&
        (showAppearancesUnavailable ? (
          <AppearancesUnavailable />
        ) : (
          <StartScreen
            onStart={handleStart}
            quickPicksArtists={quickPicksArtists}
            announced={isAnnouncedMode}
          />
        ))}

      {/* currentAppearance is legitimately null in announced mode — it is no longer
          part of the render gate; DecisionScreen handles a null appearance. */}
      {step === "decisioning" && session && currentArtist && progress && (
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
            announced={session?.config.mode === "announced"}
            storyUnlocked={storyUnlocked}
            onGoToFestivalStory={() => setShowFestivalStory(true)}
            onGoToSchedule={() => router.push(contextHref({ editionSlug, runSlug }, "planner"))}
            // Assumes at least one Passed artist exists in scope whenever this is
            // reachable (the Story is locked) — proven true for the current dataset,
            // not enforced here. See ARCHITECTURE.md § Future Consideration: Locked
            // Story Recovery Assumes a Non-Trivial Attendance Scope for the math and
            // the revisit trigger.
            onExploreArtists={() => {
              showPassedArtists();
              router.push(contextHref({ editionSlug, runSlug }, "explore"));
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
  );
}
