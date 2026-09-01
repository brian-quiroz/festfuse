"use client";

import { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useEditionDecisions } from "@/app/store/decisionStore";
import { useExploreFilterStore } from "@/app/store/exploreFilterStore";
import { useAttendanceDays } from "@/app/store/attendanceStore";
import { useRunAppearances } from "@/app/store/runAppearancesStore";
import { useAnnouncedRunArtists } from "@/app/store/announcedRunArtistsStore";
import { contextHref, festivals, findEdition } from "@/app/data/festivals";
import { useRunContext, useRunDays } from "@/app/components/RunContextProvider";
import { FESTIVAL_STORY_IMAGES } from "@/app/data/festival-story";
import { getRunArtistsFromApi } from "@/app/lib/api/mapRunAppearance";
import { getAnnouncedRunArtistsFromApi } from "@/app/lib/api/mapRunArtist";
import { useStorySignals, type StoryMode, type StorySignal } from "@/app/hooks/useStorySignals";
import { useDialogA11y } from "@/app/hooks/useDialogA11y";
import { FestivalStoryCard } from "./FestivalStoryCard";

interface FestivalStorySequenceProps {
  isOpen: boolean;
  onClose?: () => void;
  // The launching Quick Picks session's captured attendance snapshot. When provided,
  // this always wins over whatever is currently persisted in attendanceStore — a
  // session that already completed must not be rescoped by a since-changed
  // selection. Omit only for a future standalone Story entry point not launched from
  // a specific session, which falls back to the persisted selection.
  attendanceDays?: string[];
  // "announced" for a run with a lineup but no schedule (ADR-0016): artists come from
  // the /artists feed and the signal engine skips the schedule-derived dimensions.
  mode?: StoryMode;
}

export function FestivalStorySequence({
  isOpen,
  onClose,
  attendanceDays,
  mode = "scheduled",
}: FestivalStorySequenceProps) {
  const router = useRouter();
  const { editionSlug, runSlug } = useRunContext();
  const dayOrder = useRunDays();
  const decisionsByArtist = useEditionDecisions(editionSlug);
  const { applyPreset } = useExploreFilterStore();
  const persistedAttendanceDays = useAttendanceDays(editionSlug, runSlug, dayOrder);
  const scopedAttendanceDays = attendanceDays ?? persistedAttendanceDays;

  // Both feed hooks run unconditionally (hook rules); `mode` picks the source. Only
  // mounts once quick-picks/page.tsx's storyUnlocked gate has a non-empty list from the
  // matching store, so neither is read mid-load.
  const { appearancesBySlug: runAppearancesBySlug } = useRunAppearances(editionSlug, runSlug);
  const { artists: announcedApiArtists } = useAnnouncedRunArtists(editionSlug, runSlug);
  const runArtists = useMemo(
    () =>
      mode === "announced"
        ? getAnnouncedRunArtistsFromApi(announcedApiArtists)
        : getRunArtistsFromApi(runAppearancesBySlug, editionSlug),
    [mode, announcedApiArtists, runAppearancesBySlug, editionSlug]
  );

  // Compute story signals — pure function call, explicit inputs only. See
  // ARCHITECTURE.md § Festival Story.
  const signals = useStorySignals({
    festivalId: editionSlug,
    dayOrder,
    attendanceDays: scopedAttendanceDays,
    allArtists: runArtists,
    decisionsByArtist,
    editionCity: findEdition(editionSlug)?.city ?? "",
    mode,
  });

  // Intro image preload lives in the parent (app/quick-picks/page.tsx), not here —
  // this component is only mounted once the user opens the Story (see that file's
  // conditional mount), which is too late for a "preload before open" hint to help.
  // See page.tsx for the effect that fires while the completion screen is visible.

  const activeFestival = festivals[editionSlug];
  const festivalName = activeFestival?.name || "Festival";

  // Add intro card (hero photo + title sequence headline, no stats). Attendance-
  // neutral copy — does not assume hometown pride or that the user selected every day.
  const introCard: StorySignal = useMemo(
    () => ({
      type: "intro",
      userValue: 0,
      lineupValue: 0,
      deviation: 0,
      headlineTemplate: `This is your ${festivalName}`,
      supportingText: "A closer look at the sounds and priorities behind your picks.",
    }),
    [festivalName]
  );

  // Add final card (celebration-focused, action-focused on viewing picks). Does not
  // claim the schedule is "locked in" — Schedule/Planner is a separate later step.
  const finalCard: StorySignal = useMemo(
    () => ({
      type: "final",
      userValue: 100,
      lineupValue: 100,
      deviation: 0,
      headlineTemplate: "Your festival, in focus",
      supportingText: "See the picks that brought your Festival Story to life.",
    }),
    []
  );

  // Defensive guard: computeStorySignals returns either exactly 4 insights or none
  // at all (below the 5-pick floor, or in the exceptional case malformed data
  // prevents four truthful insights). Never assemble an intro-and-final-only
  // sequence — no other caller can bypass this by passing isOpen alone.
  const allCards = signals.length === 4 ? [introCard, ...signals, finalCard] : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  // Initial focus goes to the card's own "Reveal Next" button, not the close button —
  // Close is deliberately understated (small, top-corner, low-contrast) since the intent
  // is to draw the user through the story, not out of it. Forwarded into whichever
  // FestivalStoryCard is currently mounted; at first open that's always the intro card.
  const revealButtonRef = useRef<HTMLButtonElement>(null);

  // Called unconditionally (hooks run every render) even though the early return below
  // means it only ever has an effect while isOpen && allCards.length > 0.
  useDialogA11y({ isOpen, onClose, containerRef, initialFocusRef: revealButtonRef });

  const handleRevealNext = () => {
    if (currentIndex < allCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Last card clicked → view picks filtered by mustSee and interested
      applyPreset("myPicks");
      router.push(contextHref({ editionSlug, runSlug }, "explore"));
    }
  };

  if (!isOpen || allCards.length === 0) {
    return null;
  }

  const currentCard = allCards[currentIndex];
  const progress = (currentIndex + 1) / allCards.length;
  const isLastCard = currentIndex === allCards.length - 1;
  const isIntroCard = currentCard.type === "intro";
  const imageUrl = FESTIVAL_STORY_IMAGES[currentCard.type] || FESTIVAL_STORY_IMAGES.intro;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Festival Story"
      className="fixed inset-0 z-50 overflow-hidden bg-black"
    >
      {/* Close button (top-right) */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-2 text-white/65 hover:text-white transition-colors duration-200"
        aria-label="Close story"
      >
        ✕
      </button>

      {/* Card carousel with animated transitions */}
      <AnimatePresence mode="popLayout">
        <FestivalStoryCard
          key={currentCard.type}
          signal={currentCard}
          progress={progress}
          isLastCard={isLastCard}
          isIntroCard={isIntroCard}
          imageUrl={imageUrl}
          onRevealNext={handleRevealNext}
          buttonRef={revealButtonRef}
          isInitialLoad={currentIndex === 0}
        />
      </AnimatePresence>
    </div>
  );
}
