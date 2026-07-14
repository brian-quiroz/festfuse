"use client";

import React from "react";
import type { StorySignal } from "@/app/hooks/useStorySignals";

interface FestivalStoryCardProps {
  signal: StorySignal;
  progress: number; // 0–1
  isLastCard: boolean;
  onRevealNext: () => void;
}

export function FestivalStoryCard({
  signal,
  progress,
  isLastCard,
  onRevealNext,
}: FestivalStoryCardProps) {
  // Placeholder image URL (marked for later replacement)
  const placeholderImageUrl = "/festivals/story/festival-daylight.avif"; // Replace with actual image URL

  const progressPercent = progress * 100;
  const buttonGradient = isLastCard
    ? "bg-gradient-to-r from-pink-500 to-purple-500"
    : "bg-pink-500";
  const progressBarGradient = isLastCard
    ? "bg-gradient-to-r from-pink-500 to-purple-500"
    : "bg-pink-500";

  return (
    <div className="relative flex h-screen w-full flex-col bg-slate-900">
      {/* Full-bleed image (top ~70%) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${placeholderImageUrl}')`,
          height: "65%",
        }}
      >
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900"></div>
      </div>

      {/* Content: Eyebrow, Headline, Supporting Text, Progress Bar, Button */}
      <div className="relative mt-auto flex flex-col gap-6 px-6 pb-8">
        {/* Eyebrow label */}
        <div className="text-xs font-semibold tracking-widest text-pink-500 uppercase">
          Festival Story —
        </div>

        {/* Headline (supports color spans) */}
        <h1 className="text-4xl font-bold leading-tight text-white">{signal.headlineTemplate}</h1>

        {/* Supporting text (stat sentence) */}
        <p className="text-sm text-slate-300">{signal.supportingText}</p>

        {/* Thin progress bar */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-slate-700">
          <div
            className={`h-full ${progressBarGradient} transition-all duration-500`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Reveal Next button */}
        <button
          onClick={onRevealNext}
          className={`${buttonGradient} self-start px-6 py-3 font-semibold text-white transition-all hover:opacity-90 active:scale-95`}
        >
          {isLastCard ? "See your festival" : "Reveal next"} →
        </button>
      </div>
    </div>
  );
}
