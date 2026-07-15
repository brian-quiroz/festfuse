"use client";

import { motion } from "framer-motion";
import { ArrowRight, Film } from "lucide-react";
import type { StorySignal } from "@/app/hooks/useStorySignals";

interface FestivalStoryCardProps {
  signal: StorySignal;
  progress: number; // 0–1
  isLastCard: boolean;
  isIntroCard?: boolean;
  imageUrl: string;
  onRevealNext: () => void;
  isInitialLoad?: boolean;
}

export function FestivalStoryCard({
  signal,
  progress,
  isLastCard,
  isIntroCard,
  imageUrl,
  onRevealNext,
  isInitialLoad = false,
}: FestivalStoryCardProps) {
  const progressPercent = progress * 100;
  const hotPink = "#FF2D78";

  // Simple unified animation: fade + subtle scale for premium feel
  const cardVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.2, ease: "easeIn" as const },
    },
  };

  return (
    <motion.div
      className="w-full"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 1,
      }}
      variants={cardVariants}
      initial={isInitialLoad ? "animate" : "initial"}
      animate="animate"
      exit="exit"
    >
      {/* Full-bleed image: fills entire viewport */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      ></div>

      {/* Content: Eyebrow, Headline, Supporting Text, Progress Bar, Button */}
      {/* Anchored to bottom of viewport, grows upward naturally based on content height */}
      {/* Single gradient overlay: fade from transparent to black for text legibility */}
      <div
        className="absolute left-0 right-0 px-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col"
        style={{
          bottom: 0,
          paddingTop: "3rem",
          paddingBottom: "2rem",
        }}
      >
        {/* Eyebrow label (skip for intro card) */}
        {!isIntroCard && (
          <div
            className="text-sm font-bold tracking-widest uppercase mb-2 w-fit px-3 py-1.5 rounded-full flex items-center gap-1"
            style={{
              color: hotPink,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            — <Film size={16} strokeWidth={2} /> FESTIVAL STORY —
          </div>
        )}

        {/* Headline: responsive sizing with clamp (scales with viewport width) */}
        <h1
          className="mt-4 font-bold leading-tight text-white drop-shadow-lg"
          style={{
            fontSize: "clamp(1.875rem, 5vw, 3.5rem)",
          }}
        >
          {signal.headlineTemplate}
        </h1>

        {/* Supporting text: responsive sizing with clamp */}
        <p
          className="mt-3 text-slate-300 drop-shadow-md"
          style={{
            fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
          }}
        >
          {signal.supportingText}
        </p>

        {/* Progress bar + Button: flow immediately after text content, no gap */}
        <div className="mt-8">
          {/* Progress bar */}
          <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-slate-700">
            <motion.div
              className="h-full"
              initial={{ width: `${progressPercent}%` }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
              style={{
                background: isLastCard ? `linear-gradient(to right, ${hotPink}, #A78BFA)` : hotPink,
                opacity: 0.85,
              }}
            ></motion.div>
          </div>

          {/* Button */}
          <button
            onClick={onRevealNext}
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all hover:opacity-90 active:scale-95 rounded-xl"
            style={{
              background: isLastCard ? `linear-gradient(to right, ${hotPink}, #A78BFA)` : hotPink,
            }}
          >
            {isLastCard ? (
              <>
                View My Picks <ArrowRight size={18} strokeWidth={2} />
              </>
            ) : (
              <>
                Reveal Next <ArrowRight size={18} strokeWidth={2} />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
