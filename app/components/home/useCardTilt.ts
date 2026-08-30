"use client";

import { useState } from "react";

// Extremely restrained cursor-tracked tilt (max ~2deg) for the large entry cards — a
// hover signal separate from the lift/shadow. One instance per card so each gets its
// own independent tilt state without duplicating the pointer math. Shared by the Home
// workflow cards (HomeContent) and the festival picker cards (FestivalPicker) so both
// read as the same component family.
export function useCardTilt(maxDeg = 2) {
  const [transform, setTransform] = useState(
    "translateY(0) perspective(800px) rotateX(0deg) rotateY(0deg)"
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `translateY(-4px) perspective(800px) rotateX(${(-py * maxDeg).toFixed(2)}deg) rotateY(${(px * maxDeg).toFixed(2)}deg)`
    );
  };

  const handleMouseLeave = () => {
    setTransform("translateY(0) perspective(800px) rotateX(0deg) rotateY(0deg)");
  };

  return {
    style: { transform, transition: "transform 150ms ease-out" },
    handleMouseMove,
    handleMouseLeave,
  };
}
