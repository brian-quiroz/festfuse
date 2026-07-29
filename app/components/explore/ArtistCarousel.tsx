"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Artist } from "@/app/types/artist";
import ArtistCard from "./ArtistCard";

// How close to an edge (in px) the cursor needs to be before that side's arrow reveals.
const EDGE_ZONE = 80;

interface ArtistCarouselProps {
  title: string;
  artists: Artist[];
  cardSize?: "default" | "large";
  carouselType?:
    | "festival-favorites"
    | "hidden-gems"
    | "international-picks"
    | "chicagos-own"
    | "after-dark";
  onSeeAll?: () => void;
}

export default function ArtistCarousel({
  title,
  artists,
  cardSize = "default",
  onSeeAll,
}: ArtistCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoverEdge, setHoverEdge] = useState<"left" | "right" | null>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -440 : 440, behavior: "smooth" });
  };

  // Cards render a full-bleed clickable Link (for right-click/middle-click support), which
  // sits in front of the hover-zone divs below for hit-testing purposes almost everywhere
  // except their own tiny button — so CSS-only group-hover never reliably reveals the arrow.
  // Tracking cursor proximity here instead works regardless of what's rendered underneath,
  // since mousemove bubbles up to this wrapper from any descendant, cards included.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const fromLeft = e.clientX - rect.left;
    const fromRight = rect.right - e.clientX;
    const next = fromLeft < EDGE_ZONE ? "left" : fromRight < EDGE_ZONE ? "right" : null;
    setHoverEdge((prev) => (prev === next ? prev : next));
  };

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-8 mb-5">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <button
          onClick={onSeeAll}
          className="text-sm text-white/30 hover:text-white/55 transition-colors"
        >
          See all
        </button>
      </div>

      {/* Scroll area with side-hover arrows */}
      <div className="relative" onMouseMove={handleMouseMove} onMouseLeave={() => setHoverEdge(null)}>
        {/* Left hover zone */}
        <div className="absolute left-0 inset-y-0 w-20 z-20 flex items-center justify-start pl-3 pointer-events-none">
          <button
            onClick={() => scroll("left")}
            className={`pointer-events-auto w-9 h-9 rounded-full bg-[#110D24]/80 backdrop-blur-sm border border-white/12 flex items-center justify-center text-white/80 shadow-xl transition-opacity duration-200 hover:bg-[#110D24] hover:text-white hover:border-white/20 ${
              hoverEdge === "left" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronLeft size={15} strokeWidth={2.5} />
          </button>
        </div>

        {/* Right hover zone */}
        <div className="absolute right-0 inset-y-0 w-20 z-20 flex items-center justify-end pr-3 pointer-events-none">
          <button
            onClick={() => scroll("right")}
            className={`pointer-events-auto w-9 h-9 rounded-full bg-[#110D24]/80 backdrop-blur-sm border border-white/12 flex items-center justify-center text-white/80 shadow-xl transition-opacity duration-200 hover:bg-[#110D24] hover:text-white hover:border-white/20 ${
              hoverEdge === "right" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronRight size={15} strokeWidth={2.5} />
          </button>
        </div>

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pl-4 sm:pl-8 pr-4 sm:pr-8 pb-2 no-scrollbar">
          {artists.map((artist, i) => (
            <ArtistCard key={`${artist.slug}-${i}`} artist={artist} size={cardSize} />
          ))}
        </div>
      </div>
    </section>
  );
}
