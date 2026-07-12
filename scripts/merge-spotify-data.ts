// @ts-nocheck
import { allArtists } from "../app/data/artists/index.ts";
import * as fs from "fs";

const spotifyData = JSON.parse(
  fs.readFileSync(
    new URL("../app/scripts/spotify-fetched-data.json", import.meta.url).pathname,
    "utf-8"
  )
);

// Only successfully matched artists
const matched = spotifyData.artists.filter((a: any) => !!a.spotify_id);

// Lookup by lowercase name
const byName = new Map<string, any>();
for (const a of matched) {
  byName.set(a.requested_value.toLowerCase(), a);
  byName.set(a.name.toLowerCase(), a);
}

// For similarArtist images: prefer requested_value (which matches our artist.name exactly)
const imageByExactName = new Map<string, string>();
for (const a of matched) {
  const url = a.images?.[2]?.url ?? a.images?.[1]?.url ?? a.images?.[0]?.url;
  if (url) {
    imageByExactName.set(a.requested_value, url);
    imageByExactName.set(a.name, url);
  }
}

function closeOf(content: string, pos: number, open: string, cl: string): number {
  let depth = 1,
    i = pos + 1;
  while (i < content.length && depth > 0) {
    if (content[i] === open) depth++;
    else if (content[i] === cl) depth--;
    i++;
  }
  return i - 1;
}

function extractStr(text: string, field: string): string {
  const m = text.match(new RegExp(String.raw`${field}:\s*"([^"]*)"`));
  return m?.[1] ?? "";
}

function artistRegion(content: string, slug: string): { slugPos: number; regionEnd: number } | null {
  const slugPos = content.indexOf(`slug: "${slug}"`);
  if (slugPos === -1) return null;
  const next = content.indexOf("\nexport const ", slugPos + 1);
  return { slugPos, regionEnd: next === -1 ? content.length : next };
}

function patchSpotify(content: string, slugPos: number, regionEnd: number, url: string): string {
  const socialsPos = content.indexOf("socials:", slugPos);
  if (socialsPos === -1 || socialsPos >= regionEnd) return content;
  const ob = content.indexOf("{", socialsPos);
  if (ob === -1 || ob >= regionEnd) return content;
  const cb = closeOf(content, ob, "{", "}");
  const inner = content.slice(ob + 1, cb);

  let newInner: string;
  if (/spotify:\s*"/.test(inner)) {
    newInner = inner.replace(/spotify:\s*"[^"]*"/, `spotify: "${url}"`);
  } else if (inner.trim() === "") {
    newInner = ` spotify: "${url}" `;
  } else {
    // Prepend before first existing property
    newInner = inner.replace(/^(\s*)(\S)/, `$1spotify: "${url}",\n    $2`);
  }

  return content.slice(0, ob + 1) + newInner + content.slice(cb);
}

function patchTrack(
  content: string,
  slug: string,
  trackName: string,
  spotifyId: string,
  duration: string,
  artworkUrl: string
): string {
  const region = artistRegion(content, slug);
  if (!region) return content;

  const tracksPos = content.indexOf("tracks:", region.slugPos);
  if (tracksPos === -1 || tracksPos >= region.regionEnd) return content;
  const arrOpen = content.indexOf("[", tracksPos);
  if (arrOpen === -1) return content;
  const arrClose = closeOf(content, arrOpen, "[", "]");

  const nameToken = `name: "${trackName}"`;
  let searchFrom = arrOpen + 1;

  while (searchFrom < arrClose) {
    const namePos = content.indexOf(nameToken, searchFrom);
    if (namePos === -1 || namePos > arrClose) break;

    // Scan backward for opening { of this track object
    let ob = namePos - 1;
    while (ob > arrOpen && content[ob] !== "{") ob--;
    if (content[ob] !== "{") {
      searchFrom = namePos + nameToken.length;
      continue;
    }

    const cb = closeOf(content, ob, "{", "}");
    const inner = content.slice(ob + 1, cb);
    if (!inner.includes("album:")) {
      searchFrom = namePos + nameToken.length;
      continue;
    }

    const album = extractStr(inner, "album");
    const newBlock = [
      `spotifyId: "${spotifyId}"`,
      `name: "${trackName}"`,
      `album: "${album}"`,
      `duration: "${duration}"`,
      `artworkUrl: "${artworkUrl}"`,
    ].join(", ");

    return content.slice(0, ob) + "{ " + newBlock + " }" + content.slice(cb + 1);
  }

  return content;
}

function patchSimilarImages(content: string): string {
  for (const artist of allArtists) {
    const imageUrl = imageByExactName.get(artist.name);
    if (!imageUrl) continue;

    const esc = artist.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // { name: "Name" } → add imageUrl
    content = content.replace(
      new RegExp(`\\{\\s*name:\\s*"${esc}"\\s*\\}`, "g"),
      `{ name: "${artist.name}", imageUrl: "${imageUrl}" }`
    );
    // { name: "Name", imageUrl: "old" } → update imageUrl
    content = content.replace(
      new RegExp(`\\{\\s*name:\\s*"${esc}",\\s*imageUrl:\\s*"[^"]*"\\s*\\}`, "g"),
      `{ name: "${artist.name}", imageUrl: "${imageUrl}" }`
    );
  }
  return content;
}

const DRY_RUN = process.argv.includes("--dry-run");

const files = [
  "../app/data/artists/thursday.ts",
  "../app/data/artists/friday.ts",
  "../app/data/artists/saturday.ts",
  "../app/data/artists/sunday.ts",
].map((p) => new URL(p, import.meta.url).pathname);

let artistCount = 0;
let trackCount = 0;
let skippedTracks = 0;

for (const file of files) {
  let content = fs.readFileSync(file, "utf-8");

  for (const artist of allArtists) {
    const entry = byName.get(artist.name.toLowerCase());
    if (!entry) continue;

    // Re-derive region after each mutation
    const region = artistRegion(content, artist.slug);
    if (!region) continue;

    content = patchSpotify(content, region.slugPos, region.regionEnd, entry.spotify_url);
    artistCount++;

    for (const track of entry.tracks) {
      if (track.album_match_type !== "exact") {
        skippedTracks++;
        continue;
      }
      const artworkUrl = track.album_images?.[1]?.url ?? track.album_images?.[0]?.url ?? "";
      content = patchTrack(content, artist.slug, track.name, track.spotify_id, track.duration, artworkUrl);
      trackCount++;
    }
  }

  content = patchSimilarImages(content);

  if (!DRY_RUN) {
    fs.writeFileSync(file, content);
    console.log(`Patched ${file.split("/").at(-1)}`);
  }
}

if (DRY_RUN) {
  console.log(`Dry run: would patch ${artistCount} artists, ${trackCount} tracks (${skippedTracks} tracks skipped — non-exact album match).`);
} else {
  console.log(`Done. Patched ${artistCount} artists, ${trackCount} tracks (${skippedTracks} tracks skipped — non-exact album match).`);
}
