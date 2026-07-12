import Image from "next/image";

interface ArtistAvatarProps {
  name: string;
  imageUrl?: string;
  size?: number;
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

export default function ArtistAvatar({
  name,
  imageUrl,
  size = 32,
  className = "",
}: ArtistAvatarProps) {
  if (imageUrl) {
    return (
      <div
        className={`relative rounded-full overflow-hidden flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>
    );
  }

  const showInitials = size >= 22;
  const fontSize = Math.max(8, Math.round(size * 0.35));

  return (
    <div
      className={`rounded-full flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{
        width: size,
        height: size,
        background: "#1B1535",
        border: "1px solid rgba(255,255,255,0.22)",
      }}
    >
      {showInitials && (
        <span
          style={{
            fontSize,
            color: "rgba(255,255,255,0.65)",
            fontWeight: 700,
            letterSpacing: "0.02em",
            lineHeight: 1,
          }}
        >
          {getInitials(name)}
        </span>
      )}
    </div>
  );
}
