import type { Genre } from "@/app/data/categories";
import { getGenreGradient } from "@/app/data/genreGradients";

interface GenreGradientFallbackProps {
  name: string;
  genres: Genre[];
  shape: "circle" | "rect";
  size?: number;
  showMonogram?: boolean;
  monogramOpacity?: number;
  direction?: string;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function GenreGradientFallback({
  name,
  genres,
  shape,
  size = 64,
  showMonogram = true,
  monogramOpacity,
  direction = "135deg",
  className = "",
}: GenreGradientFallbackProps) {
  const gradient = getGenreGradient(genres, direction);
  const initials = getInitials(name);

  if (shape === "circle") {
    const fontSize = Math.max(10, Math.round(size * 0.32));
    const opacity = monogramOpacity ?? 0.55;
    return (
      <div
        className={`rounded-full flex items-center justify-center flex-shrink-0 select-none overflow-hidden ${className}`}
        style={{
          width: size,
          height: size,
          background: gradient,
          // Opaque, not translucent — a translucent border alpha-blends with whatever
          // gradient color sits behind each point on the ring, so on a background this
          // varied in lightness it reads as an uneven, "broken" border instead of one
          // consistent line. Kept muted/dark rather than light so the ring stays quiet
          // next to real photo avatars instead of drawing extra attention.
          border: "1px solid #5A5578",
        }}
      >
        {showMonogram && size >= 22 && (
          <span
            style={{
              fontSize,
              color: `rgba(255,255,255,${opacity})`,
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            {initials}
          </span>
        )}
      </div>
    );
  }

  const opacity = monogramOpacity ?? 0.1;
  return (
    <div className={`overflow-hidden ${className}`} style={{ background: gradient }}>
      {showMonogram && (
        <div className="w-full h-full flex items-center justify-end pr-10">
          <span
            className="text-8xl font-extrabold tracking-tight select-none"
            style={{ color: `rgba(255,255,255,${opacity})` }}
            aria-hidden="true"
          >
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
