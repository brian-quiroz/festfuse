"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { COLORS } from "@/app/data/colors";

interface Props {
  context: "sessionComplete" | "nothingToReview";
  onGoToFestivalStory: () => void;
  onGoToSchedule: () => void;
}

export default function FestivalCompleteScreen({ context, onGoToFestivalStory, onGoToSchedule }: Props) {
  const [pressingFestivalStory, setPressingFestivalStory] = useState(false);
  const [pressingSchedule, setPressingSchedule] = useState(false);

  function handleFestivalStory() {
    if (pressingFestivalStory) return;
    setPressingFestivalStory(true);
    setTimeout(() => {
      setPressingFestivalStory(false);
      onGoToFestivalStory();
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
      <div className="flex flex-col items-center gap-8 w-full max-w-xl text-center">
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <span className="h-px w-12" style={{ backgroundColor: `${COLORS.celebration}99` }} />
          <p className="text-sm uppercase tracking-widest font-extrabold" style={{ color: COLORS.celebration }}>
            {context === "sessionComplete" ? "Festival Complete" : "All Caught Up"}
          </p>
          <span className="h-px w-12" style={{ backgroundColor: `${COLORS.celebration}99` }} />
        </div>

        {/* Celebration + closure */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-6xl font-extrabold tracking-tight leading-none">
            <span className="text-white">All </span>
            <span style={{ color: COLORS.celebration }}>done!</span>
          </h1>
          <p className="text-white/50 text-base">
            {context === "sessionComplete"
              ? "You've explored the entire lineup."
              : "You've already made a decision on every artist."}
          </p>
        </div>

        {/* Transition flows into destination cards — grouped to signal connection */}
        <div className="flex flex-col items-center gap-5 w-full mt-4">
          <p className="text-white/70 text-base">Your festival is starting to take shape.</p>

          <div className="grid grid-cols-2 gap-4 w-full">
            {/* Festival Story — yellow: user intent / personalization */}
            <button
              onClick={handleFestivalStory}
              className={`flex flex-col justify-between p-6 rounded-xl border border-[#E8FF47]/48 bg-[#E8FF47]/[0.09] text-left hover:border-[#E8FF47]/65 hover:bg-[#E8FF47]/[0.13] transition duration-150 ${pressingFestivalStory ? "scale-[0.97]" : ""}`}
            >
              <div className="flex flex-col gap-2">
                <p className="text-[#E8FF47] text-xs uppercase tracking-widest font-bold">
                  Festival Story
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Discover what your lineup says about you.
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <ArrowRight size={17} strokeWidth={2.5} className="text-[#E8FF47]/70" />
              </div>
            </button>

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
              <div className="flex justify-end mt-4">
                <ArrowRight size={17} strokeWidth={2.5} className="text-[#00E5FF]/70" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
