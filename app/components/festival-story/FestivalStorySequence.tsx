"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useDecisionStore } from "@/app/store/decisionStore";
import { useExploreFilterStore } from "@/app/store/exploreFilterStore";
import { useAttendanceDays } from "@/app/store/attendanceStore";
import { allArtists } from "@/app/data/artists";
import { ACTIVE_FESTIVAL_ID, festivals } from "@/app/data/festivals";
import { FESTIVAL_STORY_IMAGES } from "@/app/data/festival-story";
import { useStorySignals, type StorySignal } from "@/app/hooks/useStorySignals";
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
}

export function FestivalStorySequence({ isOpen, onClose, attendanceDays }: FestivalStorySequenceProps) {
  const router = useRouter();
  const decisionsByArtist = useDecisionStore((state) => state.decisionsByArtist);
  const { applyPreset } = useExploreFilterStore();
  const persistedAttendanceDays = useAttendanceDays(ACTIVE_FESTIVAL_ID);
  const scopedAttendanceDays = attendanceDays ?? persistedAttendanceDays;

  // Compute story signals — pure function call, explicit inputs only. See
  // ARCHITECTURE.md § Festival Story.
  const signals = useStorySignals({
    festivalId: ACTIVE_FESTIVAL_ID,
    attendanceDays: scopedAttendanceDays,
    allArtists,
    decisionsByArtist,
  });

  // Intro image preload lives in the parent (app/quick-picks/page.tsx), not here —
  // this component is only mounted once the user opens the Story (see that file's
  // conditional mount), which is too late for a "preload before open" hint to help.
  // See page.tsx for the effect that fires while the completion screen is visible.

  const activeFestival = festivals[ACTIVE_FESTIVAL_ID];
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
      headlineTemplate: "Your festival is taking shape",
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

  const handleRevealNext = () => {
    if (currentIndex < allCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Last card clicked → view picks filtered by mustSee and interested
      applyPreset("myPicks");
      router.push("/explore");
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">
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
          isInitialLoad={currentIndex === 0}
        />
      </AnimatePresence>
    </div>
  );
}
