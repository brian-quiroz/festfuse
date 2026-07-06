"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Artist } from "@/app/types/artist"
import ArtistCard from "./ArtistCard"

interface ArtistCarouselProps {
  title: string
  icon?: React.ReactNode
  artists: Artist[]
  cardSize?: "default" | "large"
}

export default function ArtistCarousel({ title, icon, artists, cardSize = "default" }: ArtistCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -440 : 440, behavior: "smooth" })
  }

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between px-8 mb-5">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-lg font-bold text-white">{title}</h2>
        </div>
        <button className="text-sm text-white/30 hover:text-white/55 transition-colors">
          See all
        </button>
      </div>

      {/* Scroll area with side-hover arrows */}
      <div className="relative">

        {/* Left hover zone */}
        <div className="group/left absolute left-0 inset-y-0 w-20 z-10 flex items-center justify-start pl-3 pointer-events-none">
          <div className="pointer-events-auto">
            <button
              onClick={() => scroll("left")}
              className="opacity-0 group-hover/left:opacity-100 w-9 h-9 rounded-full bg-[#110D24]/80 backdrop-blur-sm border border-white/12 flex items-center justify-center text-white/80 shadow-xl transition-opacity duration-200 hover:bg-[#110D24] hover:text-white hover:border-white/20"
            >
              <ChevronLeft size={15} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Right hover zone */}
        <div className="group/right absolute right-0 inset-y-0 w-20 z-10 flex items-center justify-end pr-3 pointer-events-none">
          <div className="pointer-events-auto">
            <button
              onClick={() => scroll("right")}
              className="opacity-0 group-hover/right:opacity-100 w-9 h-9 rounded-full bg-[#110D24]/80 backdrop-blur-sm border border-white/12 flex items-center justify-center text-white/80 shadow-xl transition-opacity duration-200 hover:bg-[#110D24] hover:text-white hover:border-white/20"
            >
              <ChevronRight size={15} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pl-8 pr-8 pb-2 no-scrollbar"
        >
          {artists.map((artist, i) => (
            <ArtistCard key={`${artist.slug}-${i}`} artist={artist} size={cardSize} />
          ))}
        </div>
      </div>
    </section>
  )
}
