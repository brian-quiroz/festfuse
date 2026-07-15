"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDecisionStore } from "@/app/store/decisionStore";
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

  // Compute story signals
  const signals = useStorySignals(decisionsByArtist, allArtists);

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

  // Add final card (same template, celebration-focused, share-focused)
  const finalCard: StorySignal = useMemo(
    () => ({
      type: "final",
      userValue: 100,
      lineupValue: 100,
      deviation: 0,
      headlineTemplate: "Your festival awaits",
      supportingText: "Share your discoveries and build excitement with your friends.",
    }),
    []
  );

  const allCards = [introCard, ...signals, finalCard];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRevealNext = () => {
    if (currentIndex < allCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Last card clicked → navigate home or close
      onClose?.();
      router.push("/");
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900">
      {/* Close button (top-right) */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 text-slate-400 hover:text-white transition"
        aria-label="Close story"
      >
        ✕
      </button>

      {/* Card carousel (no vertical scroll, just horizontal card swap) */}
      <FestivalStoryCard
        signal={currentCard}
        progress={progress}
        isLastCard={isLastCard}
        isIntroCard={isIntroCard}
        imageUrl={imageUrl}
        onRevealNext={handleRevealNext}
      />
    </div>
  );
}
