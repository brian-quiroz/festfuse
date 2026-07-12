const fs = require("fs");
const path = require("path");

/**
 * Final implementation: Surgical regex replacement within bounded objects.
 *
 * Strategy:
 * 1. For each file, find all "const <name>: Artist = { ... };" blocks
 * 2. Use bracket counting to get the exact boundaries
 * 3. Within each bounded block, find whatToExpect: [ ... ],
 * 4. Extract the items, map them, format them
 * 5. Replace just that array in place
 * 6. Process in reverse order to maintain positions
 */

const canonical = [
  { phrase: "Dreamy Atmosphere", keywords: ["dreamy", "ethereal", "shimmering"] },
  { phrase: "Ensemble Format", keywords: ["sibling", "band chemistry", "family", "trio", "two-piece"] },
  { phrase: "Multilingual Performance", keywords: ["bilingual", "multilingual"] },
  {
    phrase: "Retro-Futuristic Aesthetic",
    check: (lower) =>
      lower.includes("retro-futuristic") ||
      lower.includes("y2k") ||
      (lower.includes("glitchy") && lower.includes("visual")),
  },
  { phrase: "Dark Mood Visuals", keywords: ["gothic", "dark visual", "shadow", "hazy psychedelic"] },
  { phrase: "Period-Specific Sound", keywords: ["90s", "nostalgia"] },
  { phrase: "Conversational Delivery", keywords: ["banter", "conversational", "spoken-word", "deadpan"] },
  { phrase: "Raw Vocal Delivery", keywords: ["raw vocal", "screaming", "snarl", "vocal snarl"] },
  { phrase: "Technical Vocal Range", keywords: ["octave", "operatic", "baritone", "multi-octave", "three-octave"] },
  { phrase: "Energetic Mosh Pits", keywords: ["mosh", "pit"] },
  { phrase: "Massive Singalongs", keywords: ["singalong", "group sing", "stadium sing"] },
  { phrase: "Dance Floor Energy", keywords: ["dancing", "dance floor", "dance groove"] },
  { phrase: "Crowd Atmosphere", keywords: ["crowd", "atmosphere", "joyful"] },
  { phrase: "Intense Fan Connection", keywords: ["intense", "fan energy", "roaring", "unadulterated"] },
  { phrase: "High-Energy Pacing", keywords: ["nonstop", "relentless", "peak-time", "velocity", "maximum"] },
  { phrase: "Afternoon Vibes", keywords: ["afternoon", "daytime", "sun-drenched", "sunset", "upbeat sun"] },
  { phrase: "Late-Night Energy", keywords: ["late-night", "nocturnal"] },
  { phrase: "Lyrical Storytelling", keywords: ["storytelling", "lyricism", "narrative", "poetic narrative"] },
  { phrase: "Melodic Vocal Hooks", keywords: ["vocal hook", "vocal chop", "vocal melody"] },
  { phrase: "Guitar-Driven Sound", keywords: ["guitar", "riff", "fuzzed"] },
  { phrase: "Bass & Groove", keywords: ["bass", "bassline", "bass pocket", "groove", "sub-bass"] },
  { phrase: "Synth & Atmospheric", keywords: ["synth", "pad", "soundscape"] },
  { phrase: "Live Band Performance", keywords: ["live band", "horn", "saxophone", "instrumentation", "banjo"] },
  { phrase: "Choreography", keywords: ["choreography", "acrobatic", "synchronized"] },
  { phrase: "High-Production Visuals", keywords: ["blinding", "laser", "strobe"] },
  { phrase: "Cinematic Visuals", keywords: ["cinematic", "visual", "loop"] },
  { phrase: "Theatrical Staging", keywords: ["theatrical", "costume", "showmanship"] },
  { phrase: "Fashion Visual", keywords: ["fashion", "runway"] },
  { phrase: "Intimate Performance", keywords: ["intimate", "understated"] },
  { phrase: "Lush Sound", keywords: ["lush", "layered", "rich"] },
  { phrase: "Minimal Production", keywords: ["minimal", "sparse", "stripped"] },
  { phrase: "Large-Scale Production", keywords: ["arena", "festival", "stadium", "headliner scale"] },
  { phrase: "Lyrical Emotional Depth", keywords: ["heartbreak", "emotional specificity", "deeply emotional", "emotional crowd"] },
  { phrase: "Rhythm Complexity", keywords: ["complex", "progressive", "bouncy", "driving", "groove"] },
  { phrase: "Spectacle Moments", keywords: ["confetti", "pyrotechnics", "viral"] },
  { phrase: "Production Style Approach", keywords: ["polished", "pristine", "sleek", "gritty", "stripped"] },
];

function mapToCanonical(rawItem) {
  const lower = rawItem.toLowerCase();

  for (const config of canonical) {
    let matches = false;

    if (config.check) {
      matches = config.check(lower);
    } else {
      matches = config.keywords.some((kw) => lower.includes(kw));
    }

    if (matches) {
      return config.phrase;
    }
  }

  return null;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  const artistPattern = /const\s+(\w+):\s*Artist\s*=\s*\{/g;
  const artists = [];
  let match;

  // Find all artist blocks
  while ((match = artistPattern.exec(content)) !== null) {
    const objectOpenBracePos = match.index + match[0].length - 1;

    let braceCount = 1;
    let pos = objectOpenBracePos + 1;
    let objectCloseBracePos = -1;

    while (pos < content.length && braceCount > 0) {
      const char = content[pos];
      if (char === "{") braceCount++;
      if (char === "}") braceCount--;

      if (braceCount === 0) {
        objectCloseBracePos = pos;
        break;
      }
      pos++;
    }

    if (objectCloseBracePos === -1) continue;

    artists.push({
      startPos: match.index,
      endPos: objectCloseBracePos + 1,
    });
  }

  // Process artists in reverse order to maintain correct positions
  for (let i = artists.length - 1; i >= 0; i--) {
    const artist = artists[i];
    const objectText = content.slice(artist.startPos, artist.endPos);

    // Find whatToExpect within this object
    const whatToExpectMatch = /whatToExpect:\s*\[([\s\S]*?)\]/.exec(objectText);
    if (!whatToExpectMatch) continue;

    // Extract raw items
    const arrayContent = whatToExpectMatch[1];
    const rawItems = [];
    const stringPattern = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;
    let stringMatch;

    while ((stringMatch = stringPattern.exec(arrayContent)) !== null) {
      const unescaped = stringMatch[1]
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, "\\");
      rawItems.push(unescaped);
    }

    // Map and deduplicate
    const mapped = rawItems
      .map((raw) => mapToCanonical(raw))
      .filter((canonical) => canonical !== null);

    const uniqueMapped = [...new Set(mapped)];

    // Format new array content
    let newArrayContent;
    if (uniqueMapped.length === 0) {
      newArrayContent = "";
    } else {
      const formatted = uniqueMapped.map((tag) => `    "${tag}"`).join(",\n");
      newArrayContent = `\n${formatted},\n  `;
    }

    // Replace in original file
    const oldWhatToExpect = whatToExpectMatch[0];
    const newWhatToExpect = `whatToExpect: [${newArrayContent}]`;

    // Find the position within the full file
    const whatToExpectPosInObject = objectText.indexOf(oldWhatToExpect);
    const whatToExpectPosInFile = artist.startPos + whatToExpectPosInObject;

    content =
      content.slice(0, whatToExpectPosInFile) +
      newWhatToExpect +
      content.slice(whatToExpectPosInFile + oldWhatToExpect.length);
  }

  fs.writeFileSync(filePath, content);
  return artists.length;
}

// ============================================================================
// Main
// ============================================================================

const artistDir = path.join(__dirname, "..", "app", "data", "artists");
const dayFiles = ["thursday.ts", "friday.ts", "saturday.ts", "sunday.ts"];

console.log("=== FINAL IMPLEMENTATION ===\n");
console.log("Method: Surgical regex replacement within bounded artist objects\n");

let totalModified = 0;
dayFiles.forEach((file) => {
  const filePath = path.join(artistDir, file);
  if (!fs.existsSync(filePath)) return;

  const count = processFile(filePath);
  console.log(`✓ ${file}: ${count} artists updated`);
  totalModified += count;
});

console.log(`\n✓ Complete. ${totalModified} artists modified.\n`);
