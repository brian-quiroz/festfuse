import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Artist } from "@/app/types/artist"

interface QuickPicksBannerProps {
  previewArtists: Artist[]
}

export default function QuickPicksBanner({ previewArtists }: QuickPicksBannerProps) {
  const cards = previewArtists.slice(0, 3)
  const rotations = [-10, -2, 6]

  return (
    <div className="mx-8 rounded-2xl overflow-hidden bg-[#1B1535] border border-[#2D2556]">
      <div className="flex items-center gap-10 px-10 py-9">

        {/* Stacked card previews */}
        <div className="relative w-32 h-48 flex-shrink-0" style={{ perspective: "600px" }}>
          {cards.map((artist, i) => (
            <div
              key={artist.slug}
              className="absolute rounded-xl overflow-hidden border border-white/15"
              style={{
                width: 88,
                height: 124,
                left: "50%",
                top: "50%",
                marginLeft: -44,
                marginTop: -62,
                transform: `rotate(${rotations[i]}deg)`,
                zIndex: i + 1,
                boxShadow: "0 6px 24px rgba(0,0,0,0.5)",
              }}
            >
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
            </div>
          ))}
        </div>

        {/* Text + CTA */}
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Quick Picks</h2>
          <p className="text-sm text-white/45 mt-1.5 leading-relaxed">
            Discover artists one decision at a time.
          </p>
          <Link
            href="/quick-picks"
            className="inline-flex items-center gap-1.5 mt-5 px-5 py-2.5 rounded-lg bg-[#FF2D78] text-white text-sm font-bold hover:bg-[#FF2D78]/90 transition-colors"
          >
            Start Quick Picks
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>

      </div>
    </div>
  )
}
