import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read artist data
const artistsModule = await import("../app/data/artists/index.ts", { assert: { type: "json" } }).catch(() => null);
let allArtists = [];

if (!artistsModule) {
  // Fallback: parse artists from TypeScript files manually
  const thursday = fs.readFileSync(join(__dirname, "../app/data/artists/thursday.ts"), "utf-8");
  const friday = fs.readFileSync(join(__dirname, "../app/data/artists/friday.ts"), "utf-8");
  const saturday = fs.readFileSync(join(__dirname, "../app/data/artists/saturday.ts"), "utf-8");
  const sunday = fs.readFileSync(join(__dirname, "../app/data/artists/sunday.ts"), "utf-8");

  // Extract artist names and slugs using better regex (finds main artist definitions)
  const extractArtists = (content) => {
    const regex = /^const\s+\w+\s*:\s*Artist\s*=\s*\{[\s\S]*?name:\s*"([^"]+)"[\s\S]*?slug:\s*"([^"]+)"/gm;
    const artists = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      artists.push({ name: match[1], slug: match[2] });
    }
    return artists;
  };

  allArtists = [
    ...extractArtists(thursday),
    ...extractArtists(friday),
    ...extractArtists(saturday),
    ...extractArtists(sunday),
  ];
}

const spotifyData = JSON.parse(
  fs.readFileSync(join(__dirname, "./spotify-fetched-data-2.json"), "utf-8")
);

// Artist name overrides
const ARTIST_NAME_OVERRIDES = {
  "Sub Focus": "WORSHIP",
  "Marlon Hoffstadt": "WORSHIP",
  "Culture Shock": "WORSHIP",
  "Lil M.U.": "Chicago Made",
  "Queen Key": "Chicago Made",
  "Trixie Mattel": "DJ Trixie Mattel",
  "Peter Cottontale": "Chicago Made",
};

// Skip images for group members
const SKIP_IMAGES = new Set([
  "Sub Focus",
  "Marlon Hoffstadt",
  "Culture Shock",
  "Lil M.U.",
  "Queen Key",
  "Peter Cottontale",
]);

// Only successfully matched artists
const matched = spotifyData.artists.filter((a) => !!a.spotify_id);

// Build image map (skip for artists in SKIP_IMAGES)
const imageByExactName = new Map();
for (const a of matched) {
  if (SKIP_IMAGES.has(a.name)) continue;
  const url = a.images?.[2]?.url ?? a.images?.[1]?.url ?? a.images?.[0]?.url;
  if (url) {
    imageByExactName.set(a.requested_value, url);
    imageByExactName.set(a.name, url);
  }
}

function closeOf(content, pos, open, cl) {
  let depth = 1,
    i = pos + 1;
  while (i < content.length && depth > 0) {
    if (content[i] === open) depth++;
    else if (content[i] === cl) depth--;
    i++;
  }
  return i - 1;
}

function extractStr(text, field) {
  const m = text.match(new RegExp(String.raw`${field}:\s*"([^"]*)"`));
  return m?.[1] ?? "";
}

function artistRegion(content, slug) {
  // Find the MAIN artist definition, not similar artist references
  // Look for: const <name>: Artist = { ... slug: "<slug>" ...
  const pattern = new RegExp(`const\\s+\\w+\\s*:\\s*Artist\\s*=\\s*\\{[^}]*slug:\\s*"${slug}"`, "m");
  const match = pattern.exec(content);
  if (!match) return null;

  // Find the start of this artist's definition (the const keyword)
  const constPos = content.lastIndexOf("const", match.index);
  if (constPos === -1) return null;

  // Find the end of this artist's definition (next export const or end of file)
  const nextExport = content.indexOf("\nexport const ", constPos + 1);
  const regionEnd = nextExport === -1 ? content.length : nextExport;

  return { slugPos: match.index, regionEnd };
}

function patchSpotify(content, slugPos, regionEnd, url) {
  const socialsPos = content.indexOf("socials:", slugPos);
  if (socialsPos === -1 || socialsPos >= regionEnd) return content;
  const ob = content.indexOf("{", socialsPos);
  if (ob === -1 || ob >= regionEnd) return content;
  const cb = closeOf(content, ob, "{", "}");
  const inner = content.slice(ob + 1, cb);

  let newInner;
  if (/spotify:\s*"/.test(inner)) {
    newInner = inner.replace(/spotify:\s*"[^"]*"/, `spotify: "${url}"`);
  } else if (inner.trim() === "") {
    newInner = ` spotify: "${url}" `;
  } else {
    newInner = inner.replace(/^(\s*)(\S)/, `$1spotify: "${url}",\n    $2`);
  }

  return content.slice(0, ob + 1) + newInner + content.slice(cb);
}

function patchTrack(content, slug, trackName, spotifyId, duration, artworkUrl) {
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

function patchSimilarImages(content, nameSubset) {
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

const files = [
  "thursday.ts",
  "friday.ts",
  "saturday.ts",
  "sunday.ts",
].map((p) => join(__dirname, "../app/data/artists", p));

let artistCount = 0;
let trackCount = 0;
let skippedTracks = 0;
let notFound = [];
let noTracksFound = [];
let partialMatches = []; // Track partial/none matches for review

for (const file of files) {
  let content = fs.readFileSync(file, "utf-8");
  let changed = false;

  for (const entry of matched) {
    const fetchedName = entry.name;
    const targetArtistName = ARTIST_NAME_OVERRIDES[fetchedName] || fetchedName;

    // Case-insensitive artist lookup
    const artist = allArtists.find((a) => a.name.toLowerCase() === targetArtistName.toLowerCase());
    if (!artist) {
      if (!notFound.includes(targetArtistName)) notFound.push(targetArtistName);
      continue;
    }

    const region = artistRegion(content, artist.slug);
    if (!region) continue;

    const updated = patchSpotify(content, region.slugPos, region.regionEnd, entry.spotify_url);
    if (updated !== content) {
      content = updated;
      changed = true;
    }
    artistCount++;

    let tracksPatched = 0;
    for (const track of entry.tracks) {
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

  // Note: patchSimilarImages disabled for data-2 merge to avoid corrupting unrelated artists
  // Similar artist image patching is only needed for manual curation, not Spotify data imports

  if (!DRY_RUN && changed) {
    fs.writeFileSync(file, content);
    console.log(`✓ Patched ${file.split("/").at(-1)}`);
  }
}

console.log("\n" + "=".repeat(60));
if (DRY_RUN) {
  console.log("DRY RUN RESULTS:");
} else {
  console.log("✓ PATCH COMPLETE:");
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

if (partialMatches.length > 0) {
  console.log(`\n⚠ PARTIAL/NONE MATCHES (${partialMatches.length} tracks):`);
  const byArtist = {};
  for (const m of partialMatches) {
    if (!byArtist[m.artist]) byArtist[m.artist] = [];
    byArtist[m.artist].push(m);
  }
  for (const [artist, tracks] of Object.entries(byArtist)) {
    console.log(`  ${artist}:`);
    for (const t of tracks) {
      console.log(`    - "${t.track}" [${t.matchType}]`);
      console.log(`      Expected: "${t.expected}" -> Spotify: "${t.spotify}"`);
    }
  }
}

if (notFound.length === 0 && noTracksFound.length === 0 && partialMatches.length === 0) {
  console.log(`\n✓ No issues found!`);
}
