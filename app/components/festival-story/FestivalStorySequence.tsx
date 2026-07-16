"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useDecisionStore } from "@/app/store/decisionStore";
import { useExploreFilterStore } from "@/app/store/exploreFilterStore";
import { allArtists } from "@/app/data/artists";
import { ACTIVE_FESTIVAL_ID, festivals } from "@/app/data/festivals";
import { FESTIVAL_STORY_IMAGES } from "@/app/data/festival-story";
import { useStorySignals, type StorySignal } from "@/app/hooks/useStorySignals";
import { FestivalStoryCard } from "./FestivalStoryCard";

interface FestivalStorySequenceProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function FestivalStorySequence({ isOpen, onClose }: FestivalStorySequenceProps) {
  const router = useRouter();
  const decisionsByArtist = useDecisionStore((state) => state.decisionsByArtist);
  const { setPreAppliedPickStatus } = useExploreFilterStore();

  // Compute story signals
  const signals = useStorySignals(decisionsByArtist, allArtists);

  // Preload intro image for instant first card load
  useEffect(() => {
    const introImageUrl = FESTIVAL_STORY_IMAGES.intro;
    if (introImageUrl) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = introImageUrl;
      document.head.appendChild(link);
    }
  }, []);

  const activeFestival = festivals[ACTIVE_FESTIVAL_ID];
  const festivalName = activeFestival?.name || "Festival";

  // Add intro card (hero photo + title sequence headline, no stats)
  const introCard: StorySignal = useMemo(
    () => ({
      type: "intro",
      userValue: 0,
      lineupValue: 0,
      deviation: 0,
      headlineTemplate: `This is your ${festivalName}`,
      supportingText: "A weekend built around discovery, hometown pride, and unforgettable nights.",
    }),
    [festivalName]
  );

  // Add final card (celebration-focused, action-focused on viewing picks)
  const finalCard: StorySignal = useMemo(
    () => ({
      type: "final",
      userValue: 100,
      lineupValue: 100,
      deviation: 0,
      headlineTemplate: "Your lineup is locked in",
      supportingText: "Time to dive into your picks and get hyped for what's ahead.",
    }),
    []
  );

  const allCards = [introCard, ...signals, finalCard];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRevealNext = () => {
    if (currentIndex < allCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Last card clicked → view picks filtered by mustSee and interested
      setPreAppliedPickStatus(["mustSee", "interested"]);
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
