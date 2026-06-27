import type { Artist } from "@/app/types/artist";

export const mockArtist: Artist = {
  name: "Tame Impala",
  slug: "tame-impala",
  genres: ["Psychedelic Rock", "Indie", "Electronic"],
  origin: "Perth, Australia",
  tagline: "Where the mind wanders, the music follows.",
  socials: {
    spotify: "#",
    instagram: "#",
    twitter: "#",
  },
  stats: {
    stagePresence: 92,
    crowdEnergy: 88,
    vocals: 78,
    discoverability: 95,
    fanFamiliarity: 90,
  },
  vibes: ["Euphoric", "Dreamy", "Late Night", "Cosmic", "Chill", "Hypnotic"],
  fansOf: ["Pink Floyd", "Beach House", "Alt-J", "MGMT"],
  tracks: [
    { name: "The Less I Know The Better", album: "Currents", duration: "3:34" },
    { name: "Eventually", album: "Currents", duration: "5:18" },
    { name: "Let It Happen", album: "Currents", duration: "7:47" },
  ],
  about:
    "Tame Impala is the psychedelic music project of Australian multi-instrumentalist Kevin Parker. Writing, recording, performing, and producing everything himself, Parker has evolved the project from sun-baked psych-rock into a shimmering fusion of psychedelia, synth-pop, and electronic music. Known for expansive live sets and meticulous sonic textures, Tame Impala has become one of the defining acts of the modern festival circuit.",
  trivia: [
    {
      emoji: "🎛️",
      fact: "Kevin Parker writes, records, mixes, and produces every track entirely on his own — no outside producers or co-writers.",
    },
    {
      emoji: "🏠",
      fact: "The landmark album Currents was largely built in a makeshift studio inside Kevin's childhood bedroom in Perth.",
    },
    {
      emoji: "🤝",
      fact: "Beyoncé, Lady Gaga, Mark Ronson, and Travis Scott have all sought collaborations with Kevin Parker.",
    },
    {
      emoji: "🎹",
      fact: "Parker has an obsession with vintage synthesizers — he owns dozens, many discovered at garage sales and thrift stores.",
    },
  ],
  schedule: {
    stage: "Pyramid Stage",
    day: "Saturday",
    time: "10:30 PM",
    duration: "75 min",
  },
};
