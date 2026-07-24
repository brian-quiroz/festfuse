import Image from "next/image";
import type { Genre } from "@/app/data/categories";
import GenreGradientFallback from "@/app/components/ui/GenreGradientFallback";

interface ArtistAvatarProps {
  name: string;
  imageUrl?: string;
  genres?: Genre[];
  size?: number;
  className?: string;
}

export default function ArtistAvatar({
  name,
  imageUrl,
  genres = [],
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

  return (
    <GenreGradientFallback
      name={name}
      genres={genres}
      shape="circle"
      size={size}
      className={className}
    />
  );
}
