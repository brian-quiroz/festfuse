import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse artists from TypeScript files
const thursday = fs.readFileSync(join(__dirname, "../app/data/artists/thursday.ts"), "utf-8");
const friday = fs.readFileSync(join(__dirname, "../app/data/artists/friday.ts"), "utf-8");
const saturday = fs.readFileSync(join(__dirname, "../app/data/artists/saturday.ts"), "utf-8");
const sunday = fs.readFileSync(join(__dirname, "../app/data/artists/sunday.ts"), "utf-8");

const extractArtists = (content) => {
  const regex =
    /^const\s+(\w+)\s*:\s*Artist\s*=\s*\{[\s\S]*?name:\s*"([^"]+)"[\s\S]*?slug:\s*"([^"]+)"[\s\S]*?tracks:\s*\[([\s\S]*?)\]/gm;
  const artists = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const tracksStr = match[4];
    const trackRegex = /name:\s*"([^"]+)"/g;
    const tracks = [];
    let trackMatch;
    while ((trackMatch = trackRegex.exec(tracksStr)) !== null) {
      tracks.push(trackMatch[1]);
    }
    artists.push({ name: match[2], slug: match[3], tracks });
  }
  return artists;
};

const allArtists = [
  ...extractArtists(thursday),
  ...extractArtists(friday),
  ...extractArtists(saturday),
  ...extractArtists(sunday),
];

const spotifyData = JSON.parse(
  fs.readFileSync(join(__dirname, "./spotify-fetched-data-2.json"), "utf-8")
);

const ARTIST_NAME_OVERRIDES = {
  "Sub Focus": "WORSHIP",
  "Marlon Hoffstadt": "WORSHIP",
  "Culture Shock": "WORSHIP",
  "Lil M.U.": "Chicago Made",
  "Queen Key": "Chicago Made",
  "Trixie Mattel": "DJ Trixie Mattel",
  "Peter Cottontale": "Chicago Made",
};

const matched = spotifyData.artists.filter((a) => !!a.spotify_id);

let partialMatches = [];
let noMatches = [];

for (const entry of matched) {
  const fetchedName = entry.name;
  const targetArtistName = ARTIST_NAME_OVERRIDES[fetchedName] || fetchedName;
  const artist = allArtists.find((a) => a.name.toLowerCase() === targetArtistName.toLowerCase());

  if (!artist) continue;

  for (const track of entry.tracks) {
    const dbTrackNames = artist.tracks;
    const spotifyTrackName = track.name;

    const exact = dbTrackNames.some((t) => t.toLowerCase() === spotifyTrackName.toLowerCase());

    if (!exact) {
      const partial = dbTrackNames.some(
        (dbName) =>
          dbName.toLowerCase().includes(spotifyTrackName.toLowerCase()) ||
          spotifyTrackName.toLowerCase().includes(dbName.toLowerCase())
      );

      if (partial) {
        const matchedDbTrack = dbTrackNames.find(
          (dbName) =>
            dbName.toLowerCase().includes(spotifyTrackName.toLowerCase()) ||
            spotifyTrackName.toLowerCase().includes(dbName.toLowerCase())
        );
        partialMatches.push({
          artist: targetArtistName,
          dbTrack: matchedDbTrack,
          spotifyTrack: spotifyTrackName,
        });
      } else {
        noMatches.push({
          artist: targetArtistName,
          dbTracks: dbTrackNames,
          spotifyTrack: spotifyTrackName,
        });
      }
    }
  }
}

console.log("=".repeat(70));
console.log("PARTIAL MATCHES (6 tracks)");
console.log("=".repeat(70));
partialMatches.forEach((m, i) => {
  console.log(`\n${i + 1}. ${m.artist}`);
  console.log(`   Database: "${m.dbTrack}"`);
  console.log(`   Spotify:  "${m.spotifyTrack}"`);
});

console.log("\n" + "=".repeat(70));
console.log("NO MATCHES (11 tracks)");
console.log("=".repeat(70));
noMatches.forEach((m, i) => {
  console.log(`\n${i + 1}. ${m.artist}`);
  console.log(`   Spotify:  "${m.spotifyTrack}"`);
  console.log(`   Database has: ${m.dbTracks.map((t) => `"${t}"`).join(", ")}`);
});
