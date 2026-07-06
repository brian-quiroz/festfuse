"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Heart, Star } from "lucide-react"
import type { Artist } from "@/app/types/artist"

interface ArtistCardProps {
  artist: Artist
  size?: "default" | "large"
}

export default function ArtistCard({ artist, size = "default" }: ArtistCardProps) {
  const router = useRouter()
  const [mustSee, setMustSee] = useState(false)
  const [saved, setSaved] = useState(false)
  const savedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMustSee = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!mustSee) {
      setMustSee(true)
      if (!saved) {
        savedTimeoutRef.current = setTimeout(() => setSaved(true), 100)
      }
    } else {
      setMustSee(false)
      if (savedTimeoutRef.current) {
        clearTimeout(savedTimeoutRef.current)
        savedTimeoutRef.current = null
      }
    }
  }

  const handleSaved = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (saved) {
      setSaved(false)
      if (mustSee) setMustSee(false)
    } else {
      setSaved(true)
    }
  }

  const isLarge = size === "large"
  const cardW = isLarge ? "w-60" : "w-48"
  const photoH = isLarge ? "h-72" : "h-60"

  return (
    <div
      className={`${cardW} flex-shrink-0 rounded-2xl overflow-hidden bg-[#1B1535] cursor-pointer group select-none`}
      onClick={() => router.push(`/artist/${artist.slug}`)}
      role="article"
    >
      {/* Photo */}
      <div className={`relative ${photoH} overflow-hidden`}>
        {/* Scaled layer: image + gradient move together */}
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
          {artist.imageUrl ? (
            <Image
              src={artist.imageUrl}
              alt={artist.name}
              fill
              className="object-cover"
              style={{ objectPosition: artist.objectPosition ?? "center center" }}
            />
          ) : (
            <div className="absolute inset-0 bg-[#231C45]" />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(17,13,36,0.12) 0%, transparent 28%, rgba(17,13,36,0.65) 72%, rgba(17,13,36,0.95) 100%)",
            }}
          />
        </div>

        {/* Headliner badge — bottom-right, balances action icons on the left */}
        {artist.festivalStatus === "Headliner" && (
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase bg-[#FF2D78]/18 border border-[#FF2D78]/32 text-[#FF2D78]">
              Headliner
            </span>
          </div>
        )}

        {/* Action icons — bottom-left */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1">
          <button
            onClick={handleMustSee}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 border ${
              mustSee
                ? "bg-[#E8FF47] border-[#E8FF47] text-[#110D24]"
                : "bg-black/50 border-white/15 text-white/55 hover:text-white/80 hover:border-white/30"
            }`}
          >
            <Star size={11} fill={mustSee ? "currentColor" : "none"} strokeWidth={2} />
          </button>
          <button
            onClick={handleSaved}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 border ${
              saved
                ? "bg-[#E8FF47]/18 border-[#E8FF47]/50 text-[#E8FF47]"
                : "bg-black/50 border-white/15 text-white/55 hover:text-white/80 hover:border-white/30"
            }`}
          >
            <Heart size={11} fill={saved ? "currentColor" : "none"} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-3 pt-2.5 pb-3">
        <div className="font-bold text-white text-sm leading-tight truncate">{artist.name}</div>
        <div className="text-[12px] text-[#00E5FF] mt-1 truncate">{artist.genres[0]}</div>
        <div className="text-[11px] text-[#00E5FF]/60 mt-0.5">
          {artist.schedule.day} · {artist.schedule.startTime}
        </div>
        <div className="text-[11px] text-white/30 mt-0.5 truncate">{artist.schedule.stage} Stage</div>
      </div>
    </div>
  )
}
