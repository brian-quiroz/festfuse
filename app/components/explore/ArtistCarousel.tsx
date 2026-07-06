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
      <div className="flex items-end justify-between px-8 mb-5">
        <div>
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="text-lg font-bold text-white">{title}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/35 hover:text-white/60 hover:bg-white/8 transition-colors"
          >
            <ChevronLeft size={14} strokeWidth={2} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/35 hover:text-white/60 hover:bg-white/8 transition-colors"
          >
            <ChevronRight size={14} strokeWidth={2} />
          </button>
          <button className="text-sm text-white/30 hover:text-white/55 transition-colors ml-1">
            See all
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
    </section>
  )
}
