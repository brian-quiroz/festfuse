const fs = require("fs");

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("usage: node wrap-appearances.js <file.ts> [...]");
  process.exit(1);
}

for (const filePath of files) {
  const src = fs.readFileSync(filePath, "utf8");

  // Split into per-artist-record chunks using the top-level `const X: Artist = {`
  // declaration as the boundary. Each chunk (except a possible leading header chunk
  // with no match) starts at one such declaration and runs up to the next one (or EOF).
  const declRe = /^const \w+: Artist = \{$/gm;
  const starts = [];
  let m;
  while ((m = declRe.exec(src))) starts.push(m.index);

  if (starts.length === 0) {
    console.error(`${filePath}: no "const X: Artist = {" declarations found, skipping`);
    continue;
  }

  const chunks = [];
  chunks.push(src.slice(0, starts[0])); // header/imports before first record, unchanged
  for (let i = 0; i < starts.length; i++) {
    const end = i + 1 < starts.length ? starts[i + 1] : src.length;
    chunks.push(src.slice(starts[i], end));
  }

  let recordCount = 0;
  const rewritten = chunks.map((chunk, idx) => {
    if (idx === 0) return chunk; // header, not a record

    // Top-level slug: exactly 2-space indent, distinct from nested similarArtists slugs
    // (which are indented 6 spaces or appear inline inside `{ name, slug, imageUrl }`).
    const slugMatch = chunk.match(/^  slug: "([^"]+)",$/m);
    if (!slugMatch) {
      throw new Error(`No top-level slug found in chunk starting: ${chunk.slice(0, 60)}`);
    }
    const slug = slugMatch[1];

    // Top-level appearance block: exactly 2-space indent for both the opening and
    // closing brace, so this can never match anything inside similarArtists/tracks.
    const appearanceRe = /^  appearance: \{\n([\s\S]*?)\n  \},$/m;
    const appearanceMatch = chunk.match(appearanceRe);
    if (!appearanceMatch) {
      throw new Error(`No top-level appearance block found for slug "${slug}"`);
    }
    const innerLines = appearanceMatch[1]; // 4-space-indented field lines, verbatim

    // Re-indent every inner line by +2 spaces (4 -> 6), preserving content exactly.
    const reindented = innerLines
      .split("\n")
      .map((line) => (line.length > 0 ? "  " + line : line))
      .join("\n");

    // id is scoped to this artist's own appearances array, not globally unique on its
    // own — the artist's slug is already part of the composite schedule key
    // (`${festivalId}::${slug}::${appearanceId}`), so repeating it inside id here
    // would be redundant. A plain per-artist sequence number keeps this closer to how
    // a real DB table would separate an appearance's own PK from its artist foreign key.
    const replacement =
      `  appearances: [\n` +
      `    {\n` +
      `      id: "1",\n` +
      `${reindented}\n` +
      `    },\n` +
      `  ],`;

    recordCount++;
    return chunk.replace(appearanceRe, replacement);
  });

  const out = rewritten.join("");
  fs.writeFileSync(filePath, out, "utf8");
  console.log(`${filePath}: converted ${recordCount} records`);
}
