// @ts-nocheck
import { allArtists } from "../app/data/artists/index.ts";
import * as fs from "fs";

const spotifyData = JSON.parse(
  fs.readFileSync(new URL("./spotify-fetched-data-2.json", import.meta.url).pathname, "utf-8")
);

// Artist name overrides: map fetched artist names to target artist names in our database
const ARTIST_NAME_OVERRIDES: Record<string, string> = {
  "Sub Focus": "WORSHIP",
  "Marlon Hoffstadt": "WORSHIP",
  "Culture Shock": "WORSHIP",
  "Lil M.U.": "Chicago Made",
  "Queen Key": "Chicago Made",
  "Trixie Mattel": "DJ Trixie Mattel", // Name discrepancy, but keep her image
  "Peter Cottontale": "Chicago Made", // For future batches
};

// Skip artist images for group members (images are not needed for them, only for the group artist)
const SKIP_IMAGES = new Set([
  "Sub Focus",
  "Marlon Hoffstadt",
  "Culture Shock",
  "Lil M.U.",
  "Queen Key",
  "Peter Cottontale",
]);

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
  // Skip image collection for artists in SKIP_IMAGES
  if (SKIP_IMAGES.has(a.name)) continue;

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

function artistRegion(
  content: string,
  slug: string
): { slugPos: number; regionEnd: number } | null {
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

function patchSimilarImages(content: string, nameSubset?: Set<string>): string {
  for (const artist of allArtists) {
    if (nameSubset && !nameSubset.has(artist.name)) continue;
    const imageUrl = imageByExactName.get(artist.name);
    if (!imageUrl) continue;

    const esc = artist.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    content = content.replace(
      new RegExp(`\\{\\s*name:\\s*"${esc}"\\s*\\}`, "g"),
      `{ name: "${artist.name}", imageUrl: "${imageUrl}" }`
    );
    content = content.replace(
      new RegExp(`\\{\\s*name:\\s*"${esc}",\\s*imageUrl:\\s*"[^"]*"\\s*\\}`, "g"),
      `{ name: "${artist.name}", imageUrl: "${imageUrl}" }`
    );
  }
  return content;
}

const DRY_RUN = process.argv.includes("--dry-run");

// --artists=slug1,slug2 → only patch those artists
const artistsArg = process.argv.find((a) => a.startsWith("--artists="));
const targetSlugs = artistsArg
  ? new Set(
      artistsArg
        .replace("--artists=", "")
        .split(",")
        .map((s) => s.trim())
    )
  : null;

const artists = targetSlugs ? allArtists.filter((a) => targetSlugs.has(a.slug)) : allArtists;

if (targetSlugs) {
  const unknown = [...targetSlugs].filter((s) => !allArtists.find((a) => a.slug === s));
  if (unknown.length) console.warn(`Warning: unknown slugs: ${unknown.join(", ")}`);
}

// When targeting, only patch similarArtist images for names that appear
// as similar artists of the targeted artists (avoids touching unrelated entries).
const similarImageSubset = targetSlugs
  ? new Set(artists.flatMap((a) => a.similarArtists.map((s) => s.name)))
  : undefined;

const files = [
  "../app/data/artists/thursday.ts",
  "../app/data/artists/friday.ts",
  "../app/data/artists/saturday.ts",
  "../app/data/artists/sunday.ts",
].map((p) => new URL(p, import.meta.url).pathname);

let artistCount = 0;
let trackCount = 0;
let skippedTracks = 0;
let notFound: string[] = [];
let noTracksFound: string[] = [];

for (const file of files) {
  let content = fs.readFileSync(file, "utf-8");
  let changed = false;

  for (const entry of matched) {
    // Get fetched artist name, apply override if applicable
    const fetchedName = entry.name;
    const targetArtistName = ARTIST_NAME_OVERRIDES[fetchedName] || fetchedName;

    // Find matching artist in our database
    const artist = allArtists.find((a) => a.name === targetArtistName);
    if (!artist) {
      notFound.push(targetArtistName);
      continue;
    }

    const region = artistRegion(content, artist.slug);
    if (!region) continue;

    // Patch Spotify URL (only for non-override artists, or for Worship which may already have it)
    const updated = patchSpotify(content, region.slugPos, region.regionEnd, entry.spotify_url);
    if (updated !== content) {
      content = updated;
      changed = true;
    }
    artistCount++;

    // Patch tracks
    let tracksPatched = 0;
    for (const track of entry.tracks) {
      if (track.album_match_type !== "exact") {
        skippedTracks++;
        continue;
      }
      const artworkUrl = track.album_images?.[1]?.url ?? track.album_images?.[0]?.url ?? "";
      const patched = patchTrack(
        content,
        artist.slug,
        track.name,
        track.spotify_id,
        track.duration,
        artworkUrl
      );
      if (patched !== content) {
        content = patched;
        changed = true;
        tracksPatched++;
      }
      trackCount++;
    }

    if (tracksPatched === 0 && entry.tracks.length > 0) {
      noTracksFound.push(`${fetchedName} (${entry.tracks.length} tracks, none matched)`);
    }
  }

  const withImages = patchSimilarImages(content, similarImageSubset);
  if (withImages !== content) {
    content = withImages;
    changed = true;
  }

  if (!DRY_RUN && changed) {
    fs.writeFileSync(file, content);
    console.log(`Patched ${file.split("/").at(-1)}`);
  }
}

console.log("\n" + "=".repeat(60));
if (DRY_RUN) {
  console.log(`DRY RUN RESULTS:`);
} else {
  console.log(`PATCH COMPLETE:`);
}
console.log("=".repeat(60));
console.log(`Artists patched: ${artistCount}/${matched.length}`);
console.log(`Tracks patched: ${trackCount}`);
console.log(`Tracks skipped (non-exact album): ${skippedTracks}`);

if (notFound.length > 0) {
  console.log(`\n⚠ Artists NOT FOUND in database (${notFound.length}):`);
  notFound.forEach((name) => console.log(`  - ${name}`));
}

if (noTracksFound.length > 0) {
  console.log(`\n⚠ Artists with NO MATCHED TRACKS (${noTracksFound.length}):`);
  noTracksFound.forEach((name) => console.log(`  - ${name}`));
}

if (notFound.length === 0 && noTracksFound.length === 0) {
  console.log(`\n✓ No issues found!`);
}
