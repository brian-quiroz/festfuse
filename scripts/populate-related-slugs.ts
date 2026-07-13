// @ts-nocheck
import { allArtists } from "../app/data/artists/index.ts";
import * as fs from "fs";

const nameToSlug = new Map(allArtists.map((a) => [a.name, a.slug]));

function patchSlugs(content: string): string {
  for (const artist of allArtists) {
    for (const similar of artist.similarArtists) {
      if (similar.slug) continue; // Already has slug
      const slug = nameToSlug.get(similar.name);
      if (!slug) continue;

      // Find and update this specific similarArtist entry
      const esc = similar.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const nameMatch = `name: "${esc}"`;

      // Match pattern: { name: "...", ... } — add slug after name if not present
      content = content.replace(
        new RegExp(String.raw`(\{\s*name:\s*"${esc}")([^}]*?)(\})`, "g"),
        (match, before, middle, after) => {
          if (middle.includes("slug:")) return match;
          return `${before}, slug: "${slug}"${middle}${after}`;
        }
      );
    }
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

if (DRY_RUN) {
  console.log("=== DRY RUN ===\n");
  for (const artist of allArtists) {
    const missing = artist.similarArtists.filter((s) => !s.slug);
    if (missing.length) {
      console.log(`${artist.name}:`);
      for (const s of missing) {
        const slug = nameToSlug.get(s.name);
        console.log(`  ${s.name} → slug: "${slug || "(not found)"}"`);
      }
    }
  }
} else {
  let updated = 0;
  for (const file of files) {
    let content = fs.readFileSync(file, "utf-8");
    const before = content;
    content = patchSlugs(content);
    if (content !== before) {
      fs.writeFileSync(file, content);
      console.log(`Patched ${file.split("/").at(-1)}`);
      updated++;
    }
  }
  console.log(`Done. Updated ${updated} files.`);
}
