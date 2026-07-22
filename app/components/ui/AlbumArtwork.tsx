import Image from "next/image";
import { Play, Music } from "lucide-react";

interface AlbumArtworkProps {
  artworkUrl?: string;
  alt?: string;
  size?: number;
  className?: string;
}

// Purely visual component — no interactive elements.
// Wrap in a <button> in the parent to own play interaction.
// Both states respond to the nearest ancestor group hover.
//
// Currently unused — its last caller (Artist Detail's old per-track selector) was
// replaced by the Spotify artist/track embeds. Preserved rather than deleted in case
// per-track artwork is useful again later.
export default function AlbumArtwork({
  artworkUrl,
  alt = "Album artwork",
  size = 28,
  className = "",
}: AlbumArtworkProps) {
  const sizeStyle = { width: size, height: size };
  const iconSize = Math.max(8, Math.round(size * 0.38));

  if (artworkUrl) {
    return (
      <div
        className={`relative flex-shrink-0 rounded-md overflow-hidden ${className}`}
        style={sizeStyle}
      >
        <Image src={artworkUrl} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play size={iconSize} fill="white" strokeWidth={0} className="ml-0.5" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex-shrink-0 rounded-md flex items-center justify-center ${className}`}
      style={{
        ...sizeStyle,
        background: "#1B1535",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Music
        size={iconSize}
        strokeWidth={1.5}
        className="text-white/20 group-hover:text-[#00E5FF]/50 transition-colors"
      />
    </div>
  );
}
