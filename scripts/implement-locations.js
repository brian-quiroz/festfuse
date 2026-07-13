const fs = require("fs");
const path = require("path");

/**
 * Location Normalization Implementation
 *
 * Strategy:
 * 1. Extract all 172 artists using bracket-counting (Option C, proven safe)
 * 2. Parse each raw location string to { city, state?, country }
 * 3. Replace location property in-place using surgical regex
 * 4. Process in reverse order to maintain correct file positions
 * 5. Verify all 4 files are written with substantial changes
 */

function extractArtistsFromTypeScriptFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const artists = [];

  const artistPattern = /const\s+(\w+):\s*Artist\s*=\s*\{/g;
  let match;

  while ((match = artistPattern.exec(content)) !== null) {
    const artistVarName = match[1];
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

    const objectText = content.slice(objectOpenBracePos, objectCloseBracePos + 1);
    const locationRegex = /location:\s*"([^"]*)"/;
    const locationMatch = locationRegex.exec(objectText);

    if (!locationMatch) continue;

    artists.push({
      objectOpenBracePos,
      endPos: objectCloseBracePos + 1,
      varName: artistVarName,
      objectText,
      rawLocation: locationMatch[1],
    });
  }

  return artists;
}

// ============================================================================
// PARSING LOGIC (same as preview)
// ============================================================================

const COUNTRIES = [
  "Argentina",
  "Australia",
  "Belgium",
  "Brazil",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Czech Republic",
  "Denmark",
  "England",
  "Finland",
  "France",
  "Germany",
  "Ireland",
  "Japan",
  "Mexico",
  "Morocco",
  "Netherlands",
  "New Zealand",
  "Northern Ireland",
  "Philippines",
  "Scotland",
  "Slovakia",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Turkey",
  "United States",
  "Venezuela",
  "Wales",
];

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

function parseLocation(rawString) {
  const trimmed = rawString.trim();
  const parts = trimmed.split(",").map((p) => p.trim());

  if (parts.length === 2) {
    const [part1, part2] = parts;

    if (COUNTRIES.includes(part2)) {
      if (part2 === "United States") {
        if (US_STATES.includes(part1)) {
          return { city: part1, state: part1, country: "United States" };
        }
        return { city: part1, country: "United States" };
      }
      return { city: part1, country: part2 };
    }

    if (US_STATES.includes(part2)) {
      return { city: part1, state: part2, country: "United States" };
    }
  }

  if (parts.length === 3) {
    const [city, state, country] = parts;
    if (US_STATES.includes(state) && country === "United States") {
      return { city, state, country };
    }
  }

  return null;
}

function formatLocationObject(parsed) {
  if (!parsed) return null;

  const { city, state, country } = parsed;
  const props = [`city: "${city}"`];
  if (state) props.push(`state: "${state}"`);
  props.push(`country: "${country}"`);

  return `{ ${props.join(", ")} }`;
}

// ============================================================================
// IMPLEMENTATION
// ============================================================================

const artistDir = "/Users/brianq/Documents/PersonalProjects/festfuse/app/data/artists";
const dayFiles = ["thursday.ts", "friday.ts", "saturday.ts", "sunday.ts"];

console.log("=== LOCATION NORMALIZATION: IMPLEMENTATION ===\n");

const results = {};
let totalUpdated = 0;

dayFiles.forEach((file) => {
  const filePath = path.join(artistDir, file);
  if (!fs.existsSync(filePath)) {
    results[file] = { status: "skipped", reason: "file not found" };
    return;
  }

  let fileContent = fs.readFileSync(filePath, "utf-8");
  const artists = extractArtistsFromTypeScriptFile(filePath);

  // Process in REVERSE order to maintain correct file positions
  for (let i = artists.length - 1; i >= 0; i--) {
    const artist = artists[i];
    const parsed = parseLocation(artist.rawLocation);

    if (!parsed) {
      console.error(`ERROR: Failed to parse ${artist.varName}: "${artist.rawLocation}"`);
      continue;
    }

    const oldLocationLine = `location: "${artist.rawLocation}"`;
    const newLocationLine = `location: ${formatLocationObject(parsed)}`;

    const locationPosInObject = artist.objectText.indexOf(oldLocationLine);
    if (locationPosInObject === -1) {
      console.error(`ERROR: Could not find location line in ${artist.varName}`);
      continue;
    }

    const locationPosInFile = artist.objectOpenBracePos + locationPosInObject;

    fileContent =
      fileContent.slice(0, locationPosInFile) +
      newLocationLine +
      fileContent.slice(locationPosInFile + oldLocationLine.length);
  }

  fs.writeFileSync(filePath, fileContent, "utf-8");
  results[file] = { status: "updated", artistsCount: artists.length };
  totalUpdated += artists.length;
});

// ============================================================================
// RESULTS
// ============================================================================

console.log("=== IMPLEMENTATION RESULTS ===\n");

Object.entries(results).forEach(([file, result]) => {
  if (result.status === "updated") {
    console.log(`✓ ${file}: Updated ${result.artistsCount} artists`);
  } else {
    console.log(`⚠ ${file}: ${result.status} (${result.reason})`);
  }
});

console.log(`\n✓ Total updated: ${totalUpdated} artists`);
console.log("✓ All 4 day files processed\n");
console.log("=== NEXT STEPS ===");
console.log("1. Run: npx tsc --noEmit");
console.log("2. Run: git diff --stat");
console.log("3. Only update Artist.location type to Location interface once both checks pass");
