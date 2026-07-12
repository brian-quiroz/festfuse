// @ts-nocheck
import { allArtists } from "../app/data/artists/index.ts";
import * as fs from "fs";

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (Math.imul(31, h) + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (Math.imul(1664525, s) + 1013904223) | 0;
    const j = Math.abs(s) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function computeRelated(slug: string): { name: string }[] {
  const artist = allArtists.find((a) => a.slug === slug)!;
  const genreSet = new Set(artist.genres);
  const candidates = seededShuffle(
    allArtists.filter((a) => a.slug !== slug),
    hashSlug(slug)
  );

  return candidates
    .map((a) => ({
      name: a.name,
      score: a.genres.filter((g) => genreSet.has(g)).length,
    }))
    .filter((a) => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ name }) => ({ name }));
}

function patch(content: string, slug: string, related: { name: string }[]): string {
  const slugPos = content.indexOf(`slug: "${slug}"`);
  if (slugPos === -1) return content;

  const fieldPos = content.indexOf("similarArtists:", slugPos);
  if (fieldPos === -1) return content;

  const openBracket = content.indexOf("[", fieldPos);
  if (openBracket === -1) return content;

  // Walk to matching ]
  let depth = 1;
  let i = openBracket + 1;
  while (i < content.length && depth > 0) {
    if (content[i] === "[") depth++;
    else if (content[i] === "]") depth--;
    i++;
  }
  // Consume trailing comma
  if (content[i] === ",") i++;

  const items = related.map((r) => `\n    { name: "${r.name}" }`).join(",");
  const newBlock =
    related.length === 0 ? "similarArtists: []," : `similarArtists: [${items},\n  ],`;

  return content.slice(0, fieldPos) + newBlock + content.slice(i);
}

const DRY_RUN = process.argv.includes("--dry-run");

// --artists worship,5-seconds-of-summer  → only patch those slugs
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

const files = [
  "../app/data/artists/thursday.ts",
  "../app/data/artists/friday.ts",
  "../app/data/artists/saturday.ts",
  "../app/data/artists/sunday.ts",
].map((p) => new URL(p, import.meta.url).pathname);

if (DRY_RUN) {
  console.log(`=== DRY RUN — ${artists.length} artist(s) ===\n`);
  for (const artist of artists) {
    const related = computeRelated(artist.slug);
    console.log(`${artist.name} (${artist.slug})`);
    console.log(`  genres: [${artist.genres.join(", ")}]`);
    console.log(`  related: ${related.map((r) => r.name).join(", ") || "(none)"}`);
    console.log();
  }
} else {
  for (const file of files) {
    let content = fs.readFileSync(file, "utf-8");
    let changed = false;
    for (const artist of artists) {
      const updated = patch(content, artist.slug, computeRelated(artist.slug));
      if (updated !== content) {
        content = updated;
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(file, content);
      console.log(`Patched ${file.split("/").at(-1)}`);
    }
  }
  console.log("Done.");
}
