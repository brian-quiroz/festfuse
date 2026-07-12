import type { Artist } from "@/app/types/artist";
import { thursdayArtists } from "./thursday";
import { fridayArtists } from "./friday";
import { saturdayArtists } from "./saturday";
import { sundayArtists } from "./sunday";

export const allArtists: Artist[] = [
  ...thursdayArtists,
  ...fridayArtists,
  ...saturdayArtists,
  ...sundayArtists,
];

export const artistsBySlug: Record<string, Artist> = Object.fromEntries(
  allArtists.map((a) => [a.slug, a])
);
