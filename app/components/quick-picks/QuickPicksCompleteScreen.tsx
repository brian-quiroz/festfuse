"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { COLORS } from "@/app/data/colors";

interface Props {
  context: "sessionComplete" | "nothingToReview";
  // The session's captured attendance days — drives whether the completion copy
  // refers to a single named day or "your selected days." Never claims the user
  // explored the entire festival lineup unless every configured day was selected.
  attendanceDays: string[];
  // Whether the attendance-scoped valid positive pick count clears Festival Story's
  // product floor (see MIN_POSITIVE_PICKS_FOR_STORY in useStorySignals.ts). The card
  // stays visible either way — it just does something different when locked (see
  // onExploreArtists below) rather than going inert.
  storyUnlocked: boolean;
  onGoToFestivalStory: () => void;
  onGoToSchedule: () => void;
  // Recovery path for a locked Story: by the time this screen renders, Quick Picks
  // has already excluded every artist with a verdict, so there are no undecided
  // artists left in scope — Passed is the only status still open for reconsideration.
  // Must not touch decisionStore; this only changes what Explore is filtered to.
  onExploreArtists: () => void;
  onExit: () => void;
}

export default function QuickPicksCompleteScreen({
  context,
  attendanceDays,
  storyUnlocked,
  onGoToFestivalStory,
  onGoToSchedule,
  onExploreArtists,
  onExit,
}: Props) {
  const [pressingFestivalStory, setPressingFestivalStory] = useState(false);
  const [pressingExploreArtists, setPressingExploreArtists] = useState(false);
  const [pressingSchedule, setPressingSchedule] = useState(false);

  const isSingleDay = attendanceDays.length === 1;
  const scope = isSingleDay ? `every artist playing ${attendanceDays[0]}` : "every artist playing on your selected days";
  const eyebrow = context === "sessionComplete" ? "Quick Picks Complete" : "All Caught Up";
  const headline = context === "sessionComplete" ? "All done!" : "All caught up!";
  const supportingCopy =
    context === "sessionComplete" ? `You've reviewed ${scope}.` : `You've already reviewed ${scope}.`;

  function handleFestivalStory() {
    if (pressingFestivalStory || !storyUnlocked) return;
    setPressingFestivalStory(true);
    setTimeout(() => {
      setPressingFestivalStory(false);
      onGoToFestivalStory();
    }, 100);
  }

  function handleExploreArtists() {
    if (pressingExploreArtists) return;
    setPressingExploreArtists(true);
    setTimeout(() => {
      setPressingExploreArtists(false);
      onExploreArtists();
    }, 100);
  }

  function handleSchedule() {
    if (pressingSchedule) return;
    setPressingSchedule(true);
    setTimeout(() => {
      setPressingSchedule(false);
      onGoToSchedule();
    }, 100);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex-1 flex flex-col items-center justify-center px-8 py-16"
    >
      <button
        onClick={onExit}
        className="absolute top-6 right-6 z-10 p-2 text-white/30 hover:text-white/60 transition-colors duration-200"
        aria-label="Exit Quick Picks"
      >
        ✕
      </button>

      <div className="flex flex-col items-center gap-8 w-full max-w-xl text-center">
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <span className="h-px w-12" style={{ backgroundColor: `${COLORS.celebration}99` }} />
          <p
            className="text-sm uppercase tracking-widest font-extrabold"
            style={{ color: COLORS.celebration }}
          >
            {eyebrow}
          </p>
          <span className="h-px w-12" style={{ backgroundColor: `${COLORS.celebration}99` }} />
        </div>

        {/* Celebration + closure */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-6xl font-extrabold tracking-tight leading-none">
            <span className="text-white">All </span>
            <span style={{ color: COLORS.celebration }}>
              {headline.replace(/^All /, "")}
            </span>
          </h1>
          <p className="text-white/50 text-base">{supportingCopy}</p>
        </div>

        {/* Transition flows into destination cards — grouped to signal connection */}
        <div className="flex flex-col items-center gap-5 w-full mt-4">
          <p className="text-white/70 text-base">Your festival is starting to take shape.</p>

          <div className="grid grid-cols-2 gap-4 w-full">
            {/* Festival Story — yellow: user intent / personalization. Unlocked: the
                whole card is the action, as usual. Locked: the card itself goes
                inert (title/copy only) — the only interactive element is the
                cyan "Explore Artists" button below, since that's a navigation/
                discovery action, not a Festival Story action. This exact
                threshold copy is valid because the only expected user-facing
                Story lock condition is fewer than 5 attendance-scoped positive
                picks. If another eligibility condition is introduced, use
                reason-specific locked copy. */}
            {storyUnlocked ? (
              <button
                onClick={handleFestivalStory}
                className={`flex flex-col justify-between p-6 rounded-xl border text-left transition duration-150 border-[#E8FF47]/48 bg-[#E8FF47]/[0.09] hover:border-[#E8FF47]/65 hover:bg-[#E8FF47]/[0.13] ${pressingFestivalStory ? "scale-[0.97]" : ""}`}
              >
                <div className="flex flex-col gap-2">
                  <p className="text-xs uppercase tracking-widest font-bold text-[#E8FF47]">
                    Festival Story
                  </p>
                  <p className="text-sm leading-relaxed text-white/80">Your picks have a story to tell.</p>
                </div>
                <div className="flex items-center justify-end h-8 mt-4">
                  <ArrowRight size={17} strokeWidth={2.5} className="text-[#E8FF47]/70" />
                </div>
              </button>
            ) : (
              <div className="flex flex-col justify-between p-6 rounded-xl border border-[#E8FF47]/20 bg-[#E8FF47]/[0.04] text-left">
                <div className="flex flex-col gap-2">
                  <p className="text-xs uppercase tracking-widest font-bold text-[#E8FF47]/50">Festival Story</p>
                  <p className="text-sm leading-relaxed text-white/45">
                    Festival Story unlocks once 5 artists are marked Interested or Must See.
                  </p>
                </div>
                {/* h-8 + items-center matches the bare-arrow rows in the other two cards
                    (Festival Story unlocked, Schedule) — this button carries its own
                    padding/border, so without a shared row height its icon sits higher
                    than the plain-icon rows once justify-between pins each row to the
                    bottom of an equal-height card. */}
                <div className="flex items-center justify-end h-8 mt-4">
                  <button
                    onClick={handleExploreArtists}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00E5FF] text-[#110D24] text-xs font-semibold transition duration-150 hover:bg-[#00E5FF]/90 ${pressingExploreArtists ? "scale-[0.97]" : ""}`}
                  >
                    Explore Artists
                    <ArrowRight size={13} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            )}

            {/* Schedule — cyan: workflow / navigation */}
            <button
              onClick={handleSchedule}
              className={`flex flex-col justify-between p-6 rounded-xl border border-[#00E5FF]/48 bg-[#00E5FF]/[0.09] text-left hover:border-[#00E5FF]/65 hover:bg-[#00E5FF]/[0.13] transition duration-150 ${pressingSchedule ? "scale-[0.97]" : ""}`}
            >
              <div className="flex flex-col gap-2">
                <p className="text-[#00E5FF] text-xs uppercase tracking-widest font-bold">
                  Schedule
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Build your weekend around your picks.
                </p>
              </div>
              <div className="flex items-center justify-end h-8 mt-4">
                <ArrowRight size={17} strokeWidth={2.5} className="text-[#00E5FF]/70" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
