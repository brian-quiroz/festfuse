import type { Artist } from "@/app/types/artist";

const tameImpala: Artist = {
  name: "Tame Impala",
  slug: "tame-impala",
  imageUrl: "https://image-cdn-fa.spotifycdn.com/image/ab67616100005174e412a782245eb20d9626c601",
  objectPosition: "center center",
  genres: ["Psychedelic Rock", "Indie", "Electronic"],
  origin: "Perth, Australia",
  tagline: "Where the mind wanders, the music follows.",
  socials: {
    spotify: "https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb",
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
  metrics: {
    monthlyListeners: "8.2M",
    popularityScore: "82/100",
    topTrack: "The Less I Know The Better",
    latestRelease: "The Slow Rush (2020)",
  },
  whySee: [
    "Kevin Parker writes, records, and produces everything solo — a rare one-man band at festival scale",
    "One of the most visually stunning live shows on the circuit, with immersive psychedelic lighting",
    "A 15-year setlist spanning every era, guaranteed crowd-pleasers wall to wall",
    "Late-night energy that turns a field into a cosmic dancefloor",
  ],
  whatToExpect: ["Visual light production", "Extended psychedelic jams", "Dense layered sound", "Crowd singalongs", "Late-night headliner energy"],
  bestFor: ["Psychedelic music lovers", "Festival veterans", "Night owls", "Indie and rock fans"],
  similarArtists: ["Pink Floyd", "Beach House", "Alt-J", "MGMT"],
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
    festival: "Glastonbury 2025",
    stage: "Pyramid Stage",
    day: "Saturday",
    date: "Jun 28",
    startTime: "10:30 PM",
    endTime: "11:45 PM",
  },
};

const jennie: Artist = {
  name: "Jennie",
  slug: "jennie",
  imageUrl: "https://image-cdn-fa.spotifycdn.com/image/ab67616100005174a8e3627e392a1d8f539cb575",
  objectPosition: "center 15%",
  genres: ["K-Pop", "R&B", "Hip-Hop"],
  origin: "Seoul, South Korea",
  tagline: "The one and only. Style meets swagger.",
  socials: {
    spotify: "https://open.spotify.com/artist/250b0Wlc5Vk0CoUsaCY84M",
    instagram: "#",
    twitter: "#",
  },
  stats: {
    stagePresence: 94,
    crowdEnergy: 96,
    vocals: 84,
    discoverability: 97,
    fanFamiliarity: 98,
  },
  metrics: {
    monthlyListeners: "18.5M",
    popularityScore: "91/100",
    topTrack: "SOLO",
    latestRelease: "Ruby (2025)",
  },
  whySee: [
    "Global K-pop icon making her solo debut on the festival stage — a historic moment",
    "Sharp choreography and high-fashion production that rival any pop headline act",
    "BLACKPINK energy distilled into one performer: all the charisma, none of the filler",
    "Crowd interaction and stage presence that make 80,000 people feel seen",
  ],
  whatToExpect: ["High-energy choreography", "Large crowd", "Visual production", "Crowd singalongs", "Fashion moments"],
  bestFor: ["K-pop fans", "Pop lovers", "First-time festival goers", "Dancing crowds"],
  similarArtists: ["CL", "Doja Cat", "Cardi B", "BLACKPINK"],
  tracks: [
    { name: "SOLO", album: "SOLO", duration: "2:58" },
    { name: "You & Me", album: "You & Me", duration: "3:19" },
    { name: "Mantra", album: "Ruby", duration: "2:52" },
  ],
  about:
    "Jennie Kim is a South Korean singer, rapper, and global fashion icon, best known as a member of BLACKPINK. Her 2018 debut solo single SOLO broke records across Asia and cemented her status as a bona fide solo force. Known for her sharp rap delivery, sleek pop hooks, and boundary-pushing style, Jennie commands stages with the effortless authority of someone who was always meant to headline them. Her 2025 debut album Ruby marked a new chapter — a fully realised artist with nothing left to prove.",
  trivia: [
    {
      emoji: "👗",
      fact: "Jennie has been a global ambassador for Chanel since 2017, becoming one of the youngest brand ambassadors in the house's history.",
    },
    {
      emoji: "🌏",
      fact: "She spent several years at school in New Zealand as a child, which is why her English is fluent and naturally accented.",
    },
    {
      emoji: "🎤",
      fact: "SOLO debuted at #1 on the Gaon Digital Chart and became the longest-charting song by a K-pop soloist on Billboard's World Digital Song Sales chart.",
    },
    {
      emoji: "🐈",
      fact: "She is a devoted cat person — her cat Kuma makes frequent appearances on her social media and has its own dedicated fanbase.",
    },
  ],
  schedule: {
    festival: "Glastonbury 2025",
    stage: "Other Stage",
    day: "Friday",
    date: "Jun 27",
    startTime: "8:00 PM",
    endTime: "9:15 PM",
  },
};

const beabadoobee: Artist = {
  name: "Beabadoobee",
  slug: "beabadoobee",
  imageUrl: "https://image-cdn-ak.spotifycdn.com/image/ab676161000051743a41a62e7193703d29d30a9a",
  objectPosition: "center 20%",
  genres: ["Indie Pop", "Shoegaze", "Bedroom Pop"],
  origin: "London, England",
  tagline: "Fuzzed-out feelings in perfect three minutes.",
  socials: {
    spotify: "https://open.spotify.com/artist/35l9BRT7MXmM8bv2WDQiyB",
    instagram: "#",
    twitter: "#",
  },
  stats: {
    stagePresence: 76,
    crowdEnergy: 73,
    vocals: 88,
    discoverability: 82,
    fanFamiliarity: 66,
  },
  metrics: {
    monthlyListeners: "3.8M",
    popularityScore: "68/100",
    topTrack: "Care",
    latestRelease: "This Is How Tomorrow Starts (2024)",
  },
  whySee: [
    "Catch her before she's headlining — Beabadoobee is on the cusp of breaking through",
    "Raw, emotionally honest songwriting that cuts through festival noise",
    "Intimate atmosphere even on a large stage — feels like a private show",
    "Perfect afternoon set to decompress between the big headliners",
  ],
  whatToExpect: ["Intimate and emotional", "Guitar-driven set", "Heartfelt singalongs", "Smaller crowd", "Afternoon chill"],
  bestFor: ["Indie music fans", "Discovering new artists", "Guitar pop lovers", "Emotional catharsis", "Quiet afternoon crowd"],
  similarArtists: ["Mitski", "Phoebe Bridgers", "Soccer Mommy", "Japanese Breakfast"],
  tracks: [
    { name: "Care", album: "Beatopia", duration: "3:09" },
    { name: "The Night Is Dark", album: "Fake It Flowers", duration: "3:20" },
    { name: "Last Day On Earth", album: "Beatopia", duration: "3:54" },
  ],
  about:
    "Bea Kristi, performing as Beabadoobee, burst onto the internet in 2017 with lo-fi bedroom recordings that resonated deeply with a generation of indie kids raised on Tumblr and thrift stores. Born in the Philippines and raised in London, her sound fuses 90s shoegaze warmth, jangly guitar pop, and earnest lyricism that feels both intimate and universal. From viral TikTok moments to headlining her own sold-out tours, she has grown from bedroom artist to festival mainstay without ever losing the handmade sincerity that made people fall in love with her.",
  trivia: [
    {
      emoji: "🎸",
      fact: "Beabadoobee only started playing guitar at 17 after her parents gave her one as a gift — within months she had a viral hit.",
    },
    {
      emoji: "🌸",
      fact: "Her debut EP Patched Up was recorded in her bedroom using just a laptop microphone, released almost entirely on a whim.",
    },
    {
      emoji: "📱",
      fact: "Her song 'Coffee' went viral on TikTok years after release, propelling her to millions of new listeners overnight and landing her a label deal.",
    },
    {
      emoji: "🇵🇭",
      fact: "She is proudly Filipino-British and has spoken about how her dual heritage influences her lyrics, aesthetics, and sense of identity.",
    },
  ],
  schedule: {
    festival: "Glastonbury 2025",
    stage: "West Holts Stage",
    day: "Sunday",
    date: "Jun 29",
    startTime: "2:30 PM",
    endTime: "3:30 PM",
  },
};

const majorLazer: Artist = {
  name: "Major Lazer",
  slug: "major-lazer",
  imageUrl: "https://image-cdn-fa.spotifycdn.com/image/ab67616100005174d18eac6f1e653551fd05a793",
  objectPosition: "center 30%",
  genres: ["Electronic", "Dancehall", "Dance Pop"],
  origin: "Miami, Florida",
  tagline: "The sound of the planet doing its thing.",
  socials: {
    spotify: "https://open.spotify.com/artist/738wLrAtLtCtFOLvQBXOXp",
    instagram: "#",
    twitter: "#",
  },
  stats: {
    stagePresence: 97,
    crowdEnergy: 99,
    vocals: 60,
    discoverability: 88,
    fanFamiliarity: 83,
  },
  metrics: {
    monthlyListeners: "12.1M",
    popularityScore: "79/100",
    topTrack: "Lean On",
    latestRelease: "Music Is the Weapon (Reloaded) (2021)",
  },
  whySee: [
    "Lean On live — one of the most-streamed songs ever, in a field with 50,000 people singing every word",
    "A full-blown spectacle: confetti cannons, pyrotechnics, and crowd surfers from minute one",
    "Legendary late-night party set with a decade of festival-proven bangers",
    "You will not stop dancing. This is not a threat.",
  ],
  whatToExpect: ["Party atmosphere", "Confetti and pyrotechnics", "Massive crowd", "Bass-heavy sound", "Nonstop dancing"],
  bestFor: ["Late-night ravers", "Dance music lovers", "Groups of friends", "Party-first festival goers"],
  similarArtists: ["DJ Snake", "J Balvin", "Skrillex", "Diplo"],
  tracks: [
    { name: "Lean On", album: "Peace Is the Mission", duration: "2:58" },
    { name: "Cold Water", album: "Music Is the Weapon", duration: "3:04" },
    { name: "Run the World", album: "Free the Universe", duration: "3:46" },
  ],
  about:
    "Major Lazer is the genre-defying electronic music project led by Diplo, alongside Walshy Fire and Ape Drums. Born from a love of Jamaican dancehall and Caribbean bass music, the group has spent over a decade building one of the most infectious and globe-spanning sounds in dance music. Their 2015 hit Lean On became one of the most-streamed songs in Spotify history. Live, Major Lazer shows are a full-blown spectacle — confetti cannons, crowd surfers, and a party that refuses to quit until the venue runs out of energy.",
  trivia: [
    {
      emoji: "🌍",
      fact: "Major Lazer performed a free concert in Cuba in 2016 attended by 400,000 people — one of the largest concerts ever held on the island.",
    },
    {
      emoji: "📊",
      fact: "Lean On was the most-streamed song on Spotify in 2015, accumulating over 526 million streams in a single year.",
    },
    {
      emoji: "🎬",
      fact: 'The animated music video for "Bubble Butt" features cameos from dozens of major artists and has become a cult festival classic.',
    },
    {
      emoji: "🤝",
      fact: "Diplo has produced for Beyoncé, Justin Bieber, M.I.A., Taylor Swift, and Bad Bunny — one of the most prolific crossover producers alive.",
    },
  ],
  schedule: {
    festival: "Glastonbury 2025",
    stage: "Park Stage",
    day: "Saturday",
    date: "Jun 28",
    startTime: "11:00 PM",
    endTime: "12:30 AM",
  },
};

export const allArtists: Artist[] = [tameImpala, jennie, beabadoobee, majorLazer];

export const artistsBySlug: Record<string, Artist> = Object.fromEntries(
  allArtists.map((a) => [a.slug, a])
);

export const mockArtist = tameImpala;
