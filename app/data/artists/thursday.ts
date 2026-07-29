// Storage only — do not import this file directly in product code.
// To filter by day, import allArtists from index.ts and filter by getPrimaryAppearance(artist, ACTIVE_FESTIVAL_ID).day === "Thursday".
import type { Artist } from "@/app/types/artist";

const lorde: Artist = {
  name: "Lorde",
  slug: "lorde",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageVerified: true,
  imageUrl: "/artists/global/lorde.jpg",
  imageCredit: {
    author: "Raph_PH",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:LordePrimavera100622_(28_of_69)_(52189510875).jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
  },
  mbid: "8e494408-8620-4c6a-82c2-c2ca4a1e4f12",
  liveVideoId: "KoDFBeyeHYM",
  liveVideoLabel: "Live at Lollapalooza Chile 2026",
  objectPosition: "center 5%",
  genres: ["Alt-Pop", "Electropop", "Art Pop"],
  location: { city: "Auckland", country: "New Zealand" },
  tagline: "The alt-pop high priestess guiding crowds through visceral emotional catharsis.",
  socials: {
    spotify: "https://open.spotify.com/artist/163tK9Wjr9P9DmM0AVK7lm",
    youtube: "https://www.youtube.com/@Lorde",
    tiktok: "https://www.tiktok.com/@lorde",
  },
  whySee: [
    "One of the sharpest songwriters of her generation — every lyric earns its place",
    "Intimate stage presence that makes a festival field feel like a private listening session",
    "A rare performer who chooses emotional impact over spectacle — no gimmicks, just songs",
    "Three distinct eras across Pure Heroine, Melodrama, and Solar Power — all essential, all in one set",
  ],
  whatToExpect: ["Minimal Production", "Massive Singalongs", "Crowd Atmosphere"],
  bestFor: ["Lyric & Narrative Obsessives"],
  similarArtists: [
    {
      name: "Charli XCX",
      slug: "charli-xcx",
    },
    {
      name: "MUNA",
      slug: "muna",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a454d2d193b70d07b91a9345",
    },
    {
      name: "The XX",
      slug: "the-xx",
    },
    {
      name: "Ethel Cain",
      slug: "ethel-cain",
    },
  ],
  tracks: [
    {
      spotifyId: "2MvvoeRt8NcOXWESkxWn3g",
      name: "Ribs",
      album: "Pure Heroine",
      duration: "4:18",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02187331e276c898d39764cc98",
    },
    {
      spotifyId: "6ie2Bw3xLj2JcGowOlcMhb",
      name: "Green Light",
      album: "Melodrama",
      duration: "3:54",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02f8553e18a11209d4becd0336",
    },
    {
      spotifyId: "1gvOEwQbIEjkpLdcZwtBoB",
      name: "Man Of The Year",
      album: "Virgin",
      duration: "3:00",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0223d41bf736920a032e222a78",
    },
  ],
  about:
    "Ella Yelich-O'Connor, performing as Lorde, emerged as a defining voice in modern pop with her 2013 debut 'Pure Heroine', released at just sixteen and eventually certified six times platinum in the US. Her 2017 follow-up 'Melodrama' cemented her reputation as one of pop's sharpest lyricists, turning heartbreak and self-discovery into vivid, specific detail. After the sun-drenched detour of 'Solar Power', her late-2025 album 'Virgin' marked a return to darker, more cinematic electronic textures. Her live show moves fluidly across all four eras, pairing large-scale production with the same direct, intimate delivery that made her a generation-defining songwriter in the first place.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Headliner",
      stage: "T-Mobile",
      day: "Thursday",
      date: "Jul 30",
      startTime: "8:30 PM",
      endTime: "10:00 PM",
    },
  ],
};

const johnSummit: Artist = {
  name: "John Summit",
  slug: "john-summit",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageVerified: true,
  imageUrl: "/artists/global/john-summit.jpg",
  imageCredit: {
    author: "Wynneplaga",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:John_Summit_DJ%E2%80%99ing_at_Vail,_March_20th,_2026.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
  },
  mbid: "2547c5e3-314c-4332-981d-f18c902a4086",
  objectPosition: "center 40%",
  liveVideoId: "aloPGSlq31Y",
  liveVideoLabel: "Live at Ultra Miami 2026",
  genres: ["Tech House", "House", "Progressive House"],
  location: { city: "Chicago", state: "Illinois", country: "United States" },
  tagline: "The hometown hero turning Perry's into a massive, state-of-the-art warehouse rave.",
  socials: {
    spotify: "https://open.spotify.com/artist/7kNqXtgeIwFtelmRjWv205",
    youtube: "https://www.youtube.com/@JohnSummit",
    tiktok: "https://www.tiktok.com/@johnsummit",
  },
  whySee: [
    "One of the fastest-rising DJs in the world — a Perry's set that will define the weekend",
    "Deep, driving house music rooted in the city that invented it — Chicago through and through",
    "Builds sets like a story: patient, relentless, and explosive at exactly the right moment",
    "The late-night crowd catalyst — you don't go home the same person",
  ],
  whatToExpect: [
    "Rhythm Complexity",
    "Late-Night Energy",
    "High-Energy Pacing",
    "Large-Scale Production",
  ],
  bestFor: ["Dance Floor Seekers"],
  similarArtists: [
    {
      name: "SIDEPIECE",
      slug: "sidepiece",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17821705221c7f192d4a7963910",
    },
    {
      name: "Westend",
      slug: "westend",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bc781a35d287a09940ae6046",
    },
    {
      name: "Dombresky",
      slug: "dombresky",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178d1aa3bdf9b1797388de4eff0",
    },
    {
      name: "Omnom",
      slug: "omnom",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a9b9e8e9f12e78d2eb637a6a",
    },
  ],
  tracks: [
    {
      spotifyId: "3pUz2qJe5nqZemi3hhIxMk",
      name: "Where You Are",
      album: "Comfort In Chaos",
      duration: "3:56",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02ac2be70b09319ac92b074fde",
    },
    {
      spotifyId: "4krcWtZK3AsVE1Jl4oqH8w",
      name: "ALL THE TIME",
      album: "CTRL ESCAPE",
      duration: "3:00",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02edd455c68b4f20c12a76c8c6",
    },
    {
      spotifyId: "32VIrOsJmwvqRm4rWFBCsi",
      name: "Shiver",
      album: "Comfort In Chaos",
      duration: "3:54",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02ac2be70b09319ac92b074fde",
    },
  ],
  about:
    "John Summit emerged from Chicago, the birthplace of house music, and rapidly grew into a global dance music phenomenon. His sets are built on tension and release, blending underground tech-house grooves with massive, stadium-sized vocal melodies. Following the acclaim of his 2024 debut album 'Comfort In Chaos', his 2026 sophomore album 'CTRL ESCAPE' pushed his sound even further, landing him his first arena tour and cementing him as one of dance music's biggest headliners.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Headliner",
      stage: "Bud Light",
      day: "Thursday",
      date: "Jul 30",
      startTime: "8:30 PM",
      endTime: "10:00 PM",
    },
  ],
};

const sombr: Artist = {
  name: "sombr",
  slug: "sombr",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageVerified: true,
  imageUrl: "/artists/global/sombr.jpg",
  imageCredit: {
    author: "Drew de F Fawkes",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sombr,_Islington_Academy,_London.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
  },
  mbid: "502cf908-9921-48bc-bf0e-265c881c0156",
  objectPosition: "center 20%",
  genres: ["Alt-Pop", "Indie Rock", "Indie Pop"],
  location: { city: "New York City", state: "New York", country: "United States" },
  tagline: "Late nights and young romance, scaled for the mainstage.",
  socials: {
    spotify: "https://open.spotify.com/artist/4G9NDjRyZFDlJKMRL8hx3S",
    youtube: "https://www.youtube.com/channel/UCXlqFQmZZOb78teSnAqhuwA",
    tiktok: "https://www.tiktok.com/@sombr",
  },
  whySee: [
    "Catch him at this size — the intimacy won't last once the world fully catches up",
    "Songwriting that lands like a confession: specific, unguarded, quietly devastating",
    "A midday set that hits harder than the headliners if you find the right mood",
    "The kind of discovery that makes you feel like the festival was made for you",
  ],
  whatToExpect: [
    "Intimate Performance",
    "Guitar-Driven Sound",
    "Crowd Atmosphere",
    "Lyrical Emotional Depth",
    "Afternoon Vibes",
  ],
  bestFor: [],
  similarArtists: [
    {
      name: "The Neighbourhood",
      slug: "the-neighbourhood",
    },
    {
      name: "Ryman",
      slug: "ryman",
    },
    {
      name: "beabadoobee",
      slug: "beabadoobee",
    },
    {
      name: "Paris Paloma",
      slug: "paris-paloma",
    },
  ],
  tracks: [
    {
      spotifyId: "0FTmksd2dxiE5e3rWyJXs6",
      name: "back to friends",
      album: "back to friends",
      duration: "3:19",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e027fd4049ad3b037358cf809ef",
    },
    {
      spotifyId: "79RJg6MqIJlBuedcMqB9F0",
      name: "My Body Isn't Ready",
      album: "My Body Isn't Ready",
      duration: "3:37",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0255615e9242bd96706c68a743",
    },
    {
      spotifyId: "7tICCrK3CcyRFKza7yrR0z",
      name: "Homewrecker",
      album: "Homewrecker",
      duration: "3:29",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e029a8d41dca4c7d0ef23d76dd7",
    },
  ],
  about:
    "sombr (Shane Michael Boose) grew up on New York City's Lower East Side, writing and producing music alone at home before signing to Warner Records. His singles 'back to friends' and 'undressed' went viral in 2025, with 'back to friends' surpassing a billion Spotify streams and helping his debut album 'I Barely Know Her' chart in the top ten worldwide. That breakout year earned him a Best Alternative win at the MTV VMAs and three wins at the American Music Awards, bringing his raw, guitar-driven bedroom-pop confessions to festival mainstages.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Sub-headliner",
      stage: "T-Mobile",
      day: "Thursday",
      date: "Jul 30",
      startTime: "6:30 PM",
      endTime: "7:30 PM",
    },
  ],
};

const empireOfTheSun: Artist = {
  name: "Empire of the Sun",
  slug: "empire-of-the-sun",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageVerified: true,
  imageUrl: "/artists/global/empire-of-the-sun.jpg",
  imageCredit: {
    author: "goatling",
    sourceUrl: "https://www.flickr.com/photos/mmmchoco/23507201099/in/album-72157662172643860",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
  },
  genres: ["Synth-Pop", "Electropop", "Indie Electronica"],
  location: { city: "Sydney", country: "Australia" },
  tagline: "Theatrical cosmic pop that turns every festival into a spectacle.",
  socials: {
    spotify: "https://open.spotify.com/artist/67hb7towEyKvt5Z8Bx306c",
    youtube: "https://www.youtube.com/@empireofthesun",
    tiktok: "https://www.tiktok.com/@empireofthesun",
  },
  whySee: [
    "A multi-sensory visual odyssey featuring high-concept choreography, legendary cinematic costumes, and otherworldly lighting architecture",
    "The grand festival return of one of electronic pop's most legendary live acts, armed with multi-platinum legacy stadium anthems",
    "Hear the soaring, transformative live debuts of their highly anticipated 2024 studio return, Ask That God, under the sunset skyline",
    "An pure shot of celebratory, outdoor festival escapism that unifies tens of thousands of fans into one dancing crowd",
  ],
  whatToExpect: [
    "Theatrical Staging",
    "Massive Singalongs",
    "Cinematic Visuals",
    "Large-Scale Production",
  ],
  bestFor: ["Dance Floor Seekers", "Legacy & Milestone Hunters"],
  similarArtists: [
    {
      name: "The xx",
      slug: "the-xx",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783a96db4736ef035e1fcb2516",
    },
    {
      name: "MUNA",
      slug: "muna",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a454d2d193b70d07b91a9345",
    },
    {
      name: "Vandelux",
      slug: "vandelux",
    },
    {
      name: "Pearly Drops",
      slug: "pearly-drops",
    },
  ],
  tracks: [
    {
      spotifyId: "5r5cp9IpziiIsR6b93vcnQ",
      name: "Walking on a Dream",
      album: "Walking on a Dream",
      duration: "",
    },
    { name: "We Are the People", album: "Walking on a Dream", duration: "" },
    {
      spotifyId: "5NolEMcA7mmw27vpyzvzIT",
      name: "Changes",
      album: "Ask That God",
      duration: "3:38",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02539b85bf093856207373e138",
    },
  ],
  about:
    "Empire of the Sun is the Australian electronic duo of Luke Steele and Nick Littlemore, whose debut single 'Walking on a Dream' became one of the defining anthems of the late 2000s. Their sound blends lush synth-pop and art-rock with an extravagant visual world: elaborate costumes, ancient mythology, and cinematic fantasy. Four studio albums deep, from the sun-drenched 2008 debut to 2024's 'Ask That God', which marked their return after an eight-year hiatus, their live show is a full theatrical production that transforms festival stages into otherworldly spectacles.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Sub-headliner",
      stage: "Bud Light",
      day: "Thursday",
      date: "Jul 30",
      startTime: "6:30 PM",
      endTime: "7:30 PM",
    },
  ],
};

const wetLeg: Artist = {
  name: "Wet Leg",
  slug: "wet-leg",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageVerified: true,
  imageUrl: "/artists/global/wet-leg.jpg",
  imageCredit: {
    author: "Sol Procter-Tarabanov",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Wet_Leg_O2_Academy_Brixton_2025-05-24_-29.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
  },
  objectPosition: "center 5%",
  genres: ["Indie Rock", "Post-Punk", "Alternative Rock"],
  location: { city: "Isle of Wight", country: "England" },
  tagline: "Dry wit, big riffs, and the best debut in recent memory.",
  socials: {
    spotify: "https://open.spotify.com/artist/2TwOrUcYnAlIiKmVQkkoSZ",
    youtube: "https://www.youtube.com/@wetlegband",
    tiktok: "https://www.tiktok.com/@wetlegband",
  },
  whySee: [
    "Witness the sharp, live evolution of a two-time Grammy-winning powerhouse expanding their signature indie sound on the mainstage",
    "The global festival premiere of their razor-sharp, critically acclaimed 2025 sophomore studio triumph, Moisturizer",
    "A masterclass in dry, sarcastic British wit matched with massive, fuzzed-out indie rock guitar riffs",
    "Unrivaled crowd momentum fueled by explosive, viral indie staples like 'Chaise Longue' and 'Wet Dream'",
  ],
  whatToExpect: ["Conversational Delivery", "Intense Fan Connection", "Dance Floor Energy"],
  bestFor: ["Lyric & Narrative Obsessives"],
  similarArtists: [
    {
      name: "Water From Your Eyes",
      slug: "water-from-your-eyes",
    },
    {
      name: "Viagra Boys",
      slug: "viagra-boys",
    },
    {
      name: "Geese",
      slug: "geese",
    },
    {
      name: "Chalk",
      slug: "chalk",
    },
  ],
  tracks: [
    {
      spotifyId: "0nys6GusuHnjSYLW0PYYb7",
      name: "Chaise Longue",
      album: "Wet Leg",
      duration: "3:16",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e021ce49e09e09c4f4f54533a1e",
    },
    {
      spotifyId: "260Ub1Yuj4CobdISTOBvM9",
      name: "Wet Dream",
      album: "Wet Leg",
      duration: "2:20",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e021ce49e09e09c4f4f54533a1e",
    },
    {
      spotifyId: "0K7FxrnT2QE5O4EqjQU7kO",
      name: "CPR",
      album: "Moisturizer",
      duration: "2:50",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e022f9e981ef2f67e481a6bac03",
    },
  ],
  about:
    "Formed on the Isle of Wight by Rhian Teasdale and Hester Chambers, Wet Leg broke through with their 2021 viral single 'Chaise Longue'. Their 2022 self-titled debut album earned two Grammy Awards for its blend of deadpan humor, driving post-punk riffs, and infectious hooks. Expanding into a full five-piece band for their 2025 follow-up album 'Moisturizer', their live performances showcase high-energy indie rock delivered with sharp, witty lyricism.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Sub-headliner",
      stage: "Allianz",
      day: "Thursday",
      date: "Jul 30",
      startTime: "7:30 PM",
      endTime: "8:30 PM",
    },
  ],
};

const worship: Artist = {
  name: "WORSHIP",
  slug: "worship",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageUrl: "/artists/heroes/worship.webp",
  genres: ["Drum and Bass", "Dance", "Electronic"],
  location: { city: "London", country: "England" },
  tagline: "Drum and bass' biggest names, B2B, all night.",
  socials: {
    youtube: "https://www.youtube.com/@WORSHIP_artists",
    tiktok: "https://www.tiktok.com/@worshipartists",
  },
  whySee: [
    "Four of drum and bass' absolute elite titans sharing one single stage in a fluid, relentless four-way B2B performance",
    "The standard-bearers of modern UK dancefloor culture delivering the heaviest bass-heavy set of the entire weekend",
    "Sub Focus, Dimension, Culture Shock, and 1991 are individually festival headliners — together they're something else entirely",
    "An absolute adrenaline-fueled masterclass in hyper-precise electronic sound design, tension, and massive structural bass releases",
  ],
  whatToExpect: ["High-Energy Pacing", "Bass & Groove", "High-Production Visuals"],
  bestFor: ["Bass & Groove Lovers", "Dance Floor Seekers", "Sound Design & Production Nerds"],
  similarArtists: [
    {
      name: "Avello",
      slug: "avello",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781a61a6367dead8dac77f1911",
    },
    {
      name: "MC4D",
      slug: "mc4d",
    },
    {
      name: "MPH",
      slug: "mph",
    },
    {
      name: "Notion",
      slug: "notion",
    },
  ],
  tracks: [
    {
      spotifyId: "507UUx311ghfFTMSuHUeyS",
      name: "Desire (Sub Focus & Dimension)",
      album: "Desire (with Dimension) [Sub Focus & Dimension]",
      duration: "3:35",
    },
    {
      spotifyId: "7cGXx6FiS6fhp0aIBliXFo",
      name: "Miracle",
      album: "Miracle (VIP Remix)",
      duration: "2:45",
    },
    {
      spotifyId: "6tGtFeIO3yYuVvNLAdHU0A",
      name: "Tell Me Why - 1991 Remix",
      album: "Tell Me Why (1991 Remix)",
      duration: "4:04",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e021cbdf6e04a64c34bbb5f62f5",
    },
  ],
  listenFirst: {
    mode: "tracks",
    note: "Music from some of the artists that comprise WORSHIP",
  },
  about:
    "WORSHIP is the UK drum & bass supergroup composed of Sub Focus, Dimension, Culture Shock, and 1991. Originally formed as a collaborative touring collective, the four producers perform together in an expansive back-to-back format. Merging euphoric vocal hooks, heavy basslines, and cinematic synth production, their sets bring the energy of current UK club culture to major international festival stages.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Sub-headliner",
      stage: "Perry's",
      day: "Thursday",
      date: "Jul 30",
      startTime: "8:30 PM",
      endTime: "9:45 PM",
    },
  ],
};

const bloodOrange: Artist = {
  name: "Blood Orange",
  slug: "blood-orange",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageVerified: true,
  imageUrl: "/artists/global/blood-orange.jpg",
  imageCredit: {
    author: "Raph_PH",
    sourceUrl:
      "https://www.flickr.com/photos/raph_ph/50012679158/in/photolist-aQk7Xa-aQk2nV-aQjXTK-aQjTBi-aQjVYk-aQjZnn-aQjRQp-aQk5na-2jcuLuH-4ocPdZ-4LuL32-2jcw5AM-2jcw6Kv-2jcw74B-2jcw7te-2jcw7f3-2jcw7bf-2jcs46G-2jcuJru-2jcs1ro-2jcs3zw-2jcuKYH-2jcs1e9-2jcw5F6-2jcuKNh-2jcs3GR-2jcw7m5-2jcw5pV-2jcw6fh-2jcuKu1-2jcw5QQ-2jcw5Ve-2jcw5JT-2jcs1h5-2jcw695-2jcuKbA-2jcw54E-2jcs2hb-2jcw4Y9-2jcs1xF-4LuLae-2jcs1Yf-2jcw4vA-2jcuHYR-4RLq3j-2jcs24f-7eJZgk-7eNU6m-4LuL4V-7eNUhL",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
  },
  objectPosition: "center 5%",
  genres: ["R&B", "Soul", "Art Pop"],
  location: { city: "New York City", state: "New York", country: "United States" },
  tagline: "Genre-fluid R&B from New York's most restlessly creative artist.",
  socials: {
    spotify: "https://open.spotify.com/artist/6LEeAFiJF8OuPx747e1wxR",
    youtube: "https://www.youtube.com/@devhynes",
    tiktok: "https://www.tiktok.com/@bloodorange",
  },
  whySee: [
    "Dev Hynes' first extensive live festival outing in over six years, bringing an elite alternative collective to Grant Park",
    "A live rendering of his gorgeous, star-studded 2025 masterpiece Essex Honey, blending despondent bliss with lush instrumentation",
    "Experience the genre-fluid genius of an avant-garde mastermind who has written and produced for pop's top tier royalty",
    "Deeply cinematic, soulful indie arrangements that act as a gorgeous, intimate emotional oasis amid festival chaos",
  ],
  whatToExpect: ["Bass & Groove", "Cinematic Visuals", "Intimate Performance"],
  bestFor: ["Sound Design & Production Nerds"],
  similarArtists: [
    {
      name: "Leon Thomas",
      slug: "leon-thomas",
    },
    {
      name: "Khamari",
      slug: "khamari",
    },
    {
      name: "Amber Mark",
      slug: "amber-mark",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a7f15e8167fb79fe64582e96",
    },
    {
      name: "Destin Conrad",
      slug: "destin-conrad",
    },
  ],
  tracks: [
    {
      spotifyId: "2KufM8PiQY4i52XhRL96Fd",
      name: "Champagne Coast",
      album: "Coastal Grooves",
      duration: "4:52",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02a790082aa893b1f841d7d545",
    },
    {
      spotifyId: "7vcNp4cj4uF4AyX5aKY4Ps",
      name: "You're Not Good Enough",
      album: "Cupid Deluxe",
      duration: "4:21",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e029d6bd2afa2987a69b7b55f72",
    },
    { name: "Mind Loaded", album: "Essex Honey", duration: "" },
  ],
  about:
    "Blood Orange is the alt-R&B and art-pop project of British-born, New York-based songwriter, producer, and multi-instrumentalist Devonté Hynes. Debuting with 2011's Coastal Grooves, Hynes crafts lush, atmospheric soundscapes that merge 80s funk, soul, and modern R&B with themes of identity and urban life. Renowned for his collaborations with artists across pop and indie scenes, his live performances feature rich vocal harmonies and smooth, guitar-driven arrangements.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Sub-headliner",
      stage: "Bud Light",
      day: "Thursday",
      date: "Jul 30",
      startTime: "4:45 PM",
      endTime: "5:45 PM",
    },
  ],
};

const fiveSecondsOfSummer: Artist = {
  name: "5 Seconds of Summer",
  slug: "five-seconds-of-summer",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageVerified: true,
  imageUrl: "/artists/global/five-seconds-of-summer.jpg",
  imageCredit: {
    author: "Sharkywoo",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:5_Seconds_of_Summer_at_Enmore_Theatre,_Sydney,_30.04.14.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  objectPosition: "center 60%",
  genres: ["Pop-Rock", "Pop-Punk", "Alt-Pop"],
  location: { city: "Sydney", country: "Australia" },
  tagline: "Four friends from Sydney who've grown up on stage.",
  socials: {
    spotify: "https://open.spotify.com/artist/5Rl15oVamLq7FbSb0NNBNy",
    youtube: "https://www.youtube.com/@5SOS",
    tiktok: "https://www.tiktok.com/@5SOS",
  },
  whySee: [
    "A seasoned, stadium-proven live outfit celebrating fifteen years of explosive anthems on a massive mainstage scale",
    "Hear the live premiere of their clever, self-aware 2025 sixth studio effort, Everyone's a Star!",
    "Unrivaled crowd singalongs driven by massive global generation-defining radio chart-toppers like 'Youngblood'",
    "High-energy pop-punk grit seamlessly married to exceptionally tight, polished modern rock musicianship",
  ],
  whatToExpect: ["Massive Singalongs", "Large-Scale Production"],
  bestFor: [],
  similarArtists: [
    {
      name: "Yungblud",
      slug: "yungblud",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1787c9287712c4355e54c94e0d0",
    },
    {
      name: "Hot Mulligan",
      slug: "hot-mulligan",
    },
    {
      name: "The Story So Far",
      slug: "the-story-so-far",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1784d8d055d82fc1e5b1c5ecb1d",
    },
    {
      name: "The Neighbourhood",
      slug: "the-neighbourhood",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178df0b5ac84376a0a4b2166816",
    },
  ],
  tracks: [
    {
      spotifyId: "55S2PQgSMYAhgoTCcGCDfw",
      name: "Youngblood",
      album: "Youngblood",
      duration: "3:23",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02240353172d4b7f2feb8a3e2c",
    },
    {
      spotifyId: "1gugDOSMREb34Xo0c1PlxM",
      name: "She Looks So Perfect",
      album: "5 Seconds of Summer",
      duration: "3:22",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0293432e914046a003229378da",
    },
    {
      spotifyId: "3NxWJWftvkstyxvb1pZlFo",
      name: "Teeth",
      album: "CALM",
      duration: "3:25",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02726005f0f81903e157d9dbc7",
    },
  ],
  about:
    "5 Seconds of Summer, made up of Luke Hemmings, Calum Hood, Ashton Irwin, and Michael Clifford, formed in Sydney in 2011, first breaking through with acoustic covers posted to YouTube before signing a record deal as teenagers. Their 2018 album Youngblood marked a major pivot into polished, dance-driven pop, and their 2025 sixth album Everyone's a Star! leans into that history, with the single 'Boyband' openly poking fun at their own boy-band label. Now over a decade into their career, they draw festival crowds who have grown up alongside the band and know every word.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Sub-headliner",
      stage: "T-Mobile",
      day: "Thursday",
      date: "Jul 30",
      startTime: "4:30 PM",
      endTime: "5:30 PM",
    },
  ],
};

const kettama: Artist = {
  name: "KETTAMA",
  slug: "kettama",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageUrl: "/artists/heroes/kettama.webp",
  genres: ["House", "Speed Garage", "UK Garage"],
  location: { city: "Galway", country: "Ireland" },
  tagline: "Big-hearted house anthems built for the floor.",
  socials: {
    spotify: "https://open.spotify.com/artist/3an9rnsXKPCAMlZgH4A0n4",
    youtube: "https://www.youtube.com/@KETTAMAG-TOWN",
    tiktok: "https://www.tiktok.com/@kettamabrah",
  },
  whySee: [
    "Ireland's premier electronic export brings a raw, high-tempo speed garage assault straight to the Perry's tent",
    "The official tour run of his heavy, critically acclaimed late-2025 debut studio album statement, Archangel",
    "Furious, fast-paced rhythm blocks designed purely to push underground club culture into massive festival crowds",
    "Endorsed by heavy hitters globally, it stands as an elite option for absolute, raw electronic dancefloor momentum",
  ],
  whatToExpect: [
    "Cinematic Visuals",
    "Bass & Groove",
    "High-Energy Pacing",
    "Intense Fan Connection",
  ],
  bestFor: ["Tent & Club Venue Seekers", "Bass & Groove Lovers"],
  similarArtists: [
    {
      name: "Notion",
      slug: "notion",
    },
    {
      name: "Westend",
      slug: "westend",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bc781a35d287a09940ae6046",
    },
    {
      name: "Omnom",
      slug: "omnom",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a9b9e8e9f12e78d2eb637a6a",
    },
    {
      name: "MPH",
      slug: "mph",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1787e64c67ba432f9223f1acf9f",
    },
  ],
  tracks: [
    {
      spotifyId: "3xQPerJjDVZrSFVE340D8r",
      name: "Comes and Goes",
      album: "Comes and Goes",
      duration: "4:22",
    },
    {
      spotifyId: "3ofFprvy4v6czkx7mOUI7P",
      name: "Archangel",
      album: "Archangel",
      duration: "3:10",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e021aa009083cdad1b29161f6be",
    },
    {
      spotifyId: "001FYsI7fPucdnDc2twhuu",
      name: "If U Want My Heart",
      album: "Archangel",
      duration: "3:23",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e021aa009083cdad1b29161f6be",
    },
  ],
  about:
    "KETTAMA is the alias of Evan Campbell, a DJ and producer from Galway, Ireland. His 2018 breakthrough 'B O D Y' went viral after plays from Mall Grab and Annie Mac, launching him from bedroom producer to festival mainstay. He's since built a catalog of high-octane tracks rooted in UK garage and speed garage, releasing his 2025 debut album Archangel on Steel City Dance Discs with collaborations from DJ Heartstring, Interplanetary Criminal, and Prospa. His sets run on relentless low end, rewound breaks, and a crowd bouncing from the first drop.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Perry's",
      day: "Thursday",
      date: "Jul 30",
      startTime: "7:00 PM",
      endTime: "8:00 PM",
    },
  ],
};

const viagraBoys: Artist = {
  name: "Viagra Boys",
  slug: "viagra-boys",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageUrl: "/artists/heroes/viagra-boys.webp",
  genres: ["Post-Punk", "Dance-Punk", "Noise Rock"],
  location: { city: "Stockholm", country: "Sweden" },
  tagline: "Controlled post-punk chaos, weaponized humor, and raw underground energy.",
  socials: {
    spotify: "https://open.spotify.com/artist/2nAKP6etu8wXNnezKXgqgg",
    youtube: "https://www.youtube.com/@vboysstockholm",
    tiktok: "https://www.tiktok.com/@viagra_boys",
  },
  whySee: [
    "Stockholm's most feral post-punk outfit delivering a chaotic, satirical live show unmatched anywhere else on the bill",
    "The premier festival showcase of their independent, punk-infused 2025 studio record, viagr aboys",
    "Frontman Sebastian Murphy's unmatched, completely unhinged deadpan swagger and theatrical crowd command",
    "A blistering, saxophone-fueled rock engine that transforms traditional mosh pits into performance art spectacles",
  ],
  whatToExpect: ["Live Band Performance", "Guitar-Driven Sound"],
  bestFor: ["Mosh Pit Lovers"],
  similarArtists: [
    {
      name: "Geese",
      slug: "geese",
    },
    {
      name: "Bad Nerves",
      slug: "bad-nerves",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178ca8c5f607e5e4d7c70c4da79",
    },
    {
      name: "Turnstile",
      slug: "turnstile",
    },
    {
      name: "Wet Leg",
      slug: "wet-leg",
    },
  ],
  tracks: [
    {
      spotifyId: "5gR6gTGOGsg9zcR7JhvwQz",
      name: "Man Made of Meat",
      album: "viagr aboys",
      duration: "3:09",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02bf26b3f697a7d4a039a6e3a9",
    },
    {
      spotifyId: "5aLD8CPaEu3Cj9ZcAqWWA6",
      name: "Sports",
      album: "Street Worms",
      duration: "3:57",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02cd546f0a193d75f8b48a4c72",
    },
    {
      spotifyId: "4GCXxLQnqf6pP6SI7ljbZV",
      name: "Uno II",
      album: "viagr aboys",
      duration: "2:15",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02bf26b3f697a7d4a039a6e3a9",
    },
  ],
  about:
    "Viagra Boys are a Swedish post-punk band formed in Stockholm in 2015 by frontman Sebastian Murphy, bassist Henrik Höckert, and drummer Sol Tor Sjödén. The group released their debut album Street Worms in 2018, followed by Welfare Jazz in 2021 and Cave World in 2022. In April 2025, they launched their fourth studio album, Viagr Aboys, on their independent label Shrimptech Enterprises. Their live performances combine driving basslines and saxophone with Murphy's deadpan vocals and satirical lyrical style.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Airbnb",
      day: "Thursday",
      date: "Jul 30",
      startTime: "9:00 PM",
      endTime: "10:00 PM",
    },
  ],
};

const audreyHobert: Artist = {
  name: "Audrey Hobert",
  slug: "audrey-hobert",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageUrl: "/artists/heroes/audrey-hobert.avif",
  genres: ["Indie Pop", "Singer-Songwriter", "Pop"],
  location: { city: "Los Angeles", state: "California", country: "United States" },
  tagline:
    "Witty, wordy stream-of-consciousness pop music that plays out like voice memos from your funniest friend.",
  socials: {
    spotify: "https://open.spotify.com/artist/4N0TAwz9vhnQtjCqS65aKS",
    youtube: "https://www.youtube.com/@audreyhobert",
    tiktok: "https://www.tiktok.com/@_mikemonster",
  },
  whySee: [
    "Catch a hyper-gifted pop writer making her highly anticipated festival debut after co-writing Gracie Abrams' biggest hits",
    "Hear the live execution of her brilliant, critically beloved 2025 RCA Records solo debut, Who's the Clown?",
    "The rare songwriter who can make a lyric feel like a voice memo you sent at 2am — instantly relatable, painfully specific",
    "Sharp, self-aware stage banter that makes a big outdoor crowd feel like a small living room show",
  ],
  whatToExpect: ["Lyrical Storytelling", "Conversational Delivery", "Crowd Atmosphere"],
  bestFor: ["Lyric & Narrative Obsessives"],
  similarArtists: [
    {
      name: "Asha Banks",
      slug: "asha-banks",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17869c0fcff58dab2188dd93b44",
    },
    {
      name: "Whitney Whitney",
      slug: "whitney-whitney",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b9b32a1845c72390fc48c28c",
    },
    {
      name: "Paris Paloma",
      slug: "paris-paloma",
    },
    {
      name: "Stella Lefty",
      slug: "stella-lefty",
    },
  ],
  tracks: [
    {
      spotifyId: "6ZAuQOgLrNQb9s7BXheuTy",
      name: "Sue Me",
      album: "Who's the Clown?",
      duration: "2:50",
    },
    { name: "Bowling Alley", album: "Who's the Clown?", duration: "" },
    {
      spotifyId: "52do0UW8A6zxZaZh5ptCAg",
      name: "Wet Hair",
      album: "Who's the Clown?",
      duration: "3:07",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02d754a73edca1a9d88ebd7658",
    },
  ],
  about:
    "Audrey Hobert is a Los Angeles-based singer-songwriter and director. She began her career co-writing tracks for Gracie Abrams, including multiple songs on the 2024 album The Secret of Us. In February 2025, she released her debut solo single Sue Me on RCA Records, followed by her debut EP Who's the Clown? in May 2025. Her live performances feature narrative pop compositions driven by conversational lyricism and rhythm guitar.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Allianz",
      day: "Thursday",
      date: "Jul 30",
      startTime: "5:30 PM",
      endTime: "6:30 PM",
    },
  ],
};

const snowStrippers: Artist = {
  name: "Snow Strippers",
  slug: "snow-strippers",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageUrl: "/artists/heroes/snow-strippers.jpg",
  genres: ["Witch House", "Electroclash", "Hyperpop"],
  location: { city: "Detroit", state: "Michigan", country: "United States" },
  tagline: "Frenetic, blown-out electroclash born in the internet underground.",
  socials: {
    spotify: "https://open.spotify.com/artist/6TsAG8Ve1icEC8ydeHm3C8",
    youtube: "https://www.youtube.com/@snowstrippers7154",
    tiktok: "https://www.tiktok.com/@snowstrippersofficial",
  },
  whySee: [
    "The absolute peak of the modern electronic underground crossing over into an explosive, boundary-pushing tent environment",
    "Tatiana Schwaninger's completely detached, hypnotic vocals riding underneath Graham Perez's brutally heavy, corrupted electronic production",
    "Experience a cult-favorite internet phenomenon that has rapidly grown into one of the most talked-about live underground projects",
    "A blistering, unapologetic wall of fuzzed-out industrial energy that makes standard club sets look soft by comparison",
  ],
  whatToExpect: ["Bass & Groove", "High-Production Visuals"],
  bestFor: ["Tent & Club Venue Seekers", "Dance Floor Seekers"],
  similarArtists: [
    {
      name: "Frost Children",
      slug: "frost-children",
    },
    {
      name: "Slayyyter",
      slug: "slayyyter",
    },
    {
      name: "Nettspend",
      slug: "nettspend",
    },
    {
      name: "Viagra Boys",
      slug: "viagra-boys",
    },
  ],
  tracks: [
    {
      spotifyId: "5q0N5SaFhROG9UQiPukv9p",
      name: "Under Your Spell",
      album: "April Mixtape 3",
      duration: "3:38",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0217dbd78819c31da3641cb8ca",
    },
    { name: "In My Head", album: "Night Killaz Vol. 1", duration: "" },
    { name: "Almost A Year", album: "Night Killaz Vol. 2", duration: "" },
  ],
  about:
    "Snow Strippers are an American electronic music duo formed in Detroit, Michigan, in 2021 by vocalist Tatiana Schwaninger and producer Graham Perez. The pair gained traction online through self-released projects before partnering with the NYC-based record label Surf Gang and Diplo's Mad Decent imprint. Their discography includes the 2022 self-titled debut album alongside several mixtapes, including April Mixtape 3 and the Night Killaz EP series. Their sound pairs distorted synths and heavy basslines with deadpan vocal hooks and high-tempo dance beats.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Airbnb",
      day: "Thursday",
      date: "Jul 30",
      startTime: "7:45 PM",
      endTime: "8:30 PM",
    },
  ],
};

const borisBrejcha: Artist = {
  name: "Boris Brejcha",
  slug: "boris-brejcha",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageUrl: "/artists/heroes/boris-brejcha.jpg",
  genres: ["High-Tech Minimal", "Techno", "Minimal Tech"],
  location: { city: "Ludwigshafen", country: "Germany" },
  tagline: "The masked maestro of hypnotic, stadium-scale high-tech minimal.",
  socials: {
    spotify: "https://open.spotify.com/artist/6caPJFLv1wesmM7gwK1ACy",
    youtube: "https://www.youtube.com/@BorisBrejcha_official",
    tiktok: "https://www.tiktok.com/@borisbrejcha",
  },
  whySee: [
    "The absolute pioneer of 'High-Tech Minimal' delivering a hyper-precise, calculated club sermon directly to Grant Park",
    "His iconic, theatrical Venetian Joker mask performance framing a deeply hypnotic audio-visual stage landscape",
    "A rare festival appearance from a global techno titan renowned for playing massive, multi-hour headline arena sets across Europe",
    "Experience incredibly patient, complex minimal techno infrastructure that delivers massive, earth-shaking low-end bass pay-offs",
  ],
  whatToExpect: ["Minimal Production", "Theatrical Staging", "Bass & Groove"],
  bestFor: ["Tent & Club Venue Seekers", "Sound Design & Production Nerds"],
  similarArtists: [
    {
      name: "Boys Noize",
      slug: "boys-noize",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781fc195ac5c1868725eced009",
    },
    {
      name: "John Summit",
      slug: "john-summit",
    },
    {
      name: "KETTAMA",
      slug: "kettama",
    },
    {
      name: "DEVAULT",
      slug: "devault",
    },
  ],
  tracks: [
    {
      spotifyId: "30WnQsvwFeYEd9k08vV7Dl",
      name: "Gravity (feat. Laura Korinth) - Edit",
      album: "Gravity (feat. Laura Korinth)",
      duration: "3:36",
    },
    { name: "Purple Noise", album: "Feuerfalter Part02", duration: "" },
    { name: "Spacewalker", album: "Space Diver", duration: "" },
  ],
  about:
    "Boris Brejcha is a German DJ and record producer born in Ludwigshafen. He began releasing music in 2006, debuting on the Harthouse label before founding his own record imprint, Fckng Serious, in 2015. Brejcha performs in a Venetian Joker mask and defines his sound as High-Tech Minimal, combining driving techno basslines with complex percussive structures and melodic synth hooks. His album discography includes Space Diver and Level One.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Perry's",
      day: "Thursday",
      date: "Jul 30",
      startTime: "5:45 PM",
      endTime: "6:45 PM",
    },
  ],
};

const parisPaloma: Artist = {
  name: "Paris Paloma",
  slug: "paris-paloma",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageUrl: "/artists/heroes/paris-paloma.webp",
  objectPosition: "center 40%",
  genres: ["Dark Folk", "Indie Pop", "Indie Folk"],
  location: { city: "Ashbourne", country: "England" },
  tagline: "Visceral, mythological dark folk built on fierce emotional catharsis.",
  socials: {
    spotify: "https://open.spotify.com/artist/2EXpthNgSeTDeX8nGwxppp",
    youtube: "https://www.youtube.com/@parispaloma",
    tiktok: "https://www.tiktok.com/@parispalomaofficial",
  },
  whySee: [
    "A deeply theatrical, folklore-inspired performance that acts as a beautifully dark, haunting oasis on the line-up",
    "Experience the raw, bone-chilling crowd energy during her massive, viral feminist anthem 'labor' live in a festival setting",
    "Stunning, rich chamber-pop arrangements tracking complex themes of grief, bodily autonomy, and mythological fury",
    "The official festival tour run introducing her highly anticipated, deeply personal debut studio statement, Cacophony",
  ],
  whatToExpect: ["Technical Vocal Range", "Crowd Atmosphere", "Dark Mood Visuals"],
  bestFor: ["Lyric & Narrative Obsessives"],
  similarArtists: [
    {
      name: "Porch Light",
      slug: "porch-light",
    },
    {
      name: "Ethel Cain",
      slug: "ethel-cain",
    },
    {
      name: "Whitney Whitney",
      slug: "whitney-whitney",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b9b32a1845c72390fc48c28c",
    },
    {
      name: "Ella Boh",
      slug: "ella-boh",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f3ca12f1b323dbb7027d78dc",
    },
  ],
  tracks: [
    {
      spotifyId: "0e00DiF2T9znEdmWakYSC3",
      name: "labor",
      album: "Cacophony",
      duration: "3:57",
    },
    { name: "yours", album: "Cacophony", duration: "" },
    {
      spotifyId: "03p1bgcOw398mneQ9H8891",
      name: "as good a reason",
      album: "Cacophony",
      duration: "2:49",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0238c7e52477eeebf6b6dbb15c",
    },
  ],
  about:
    "Paris Paloma is a British singer-songwriter from Ashbourne, Derbyshire. She earned a Fine Arts degree from Goldsmiths, University of London, before releasing her debut singles in 2020. Her 2023 single 'labor' reached the Billboard Hot 100, earned RIAA Platinum certification, and accumulated over 100 million streams. She released her debut studio album, Cacophony, in August 2024 through Nettwerk Music Group. Her recorded work centers on acoustic guitar, choral vocal layering, and lyrics referencing historical art and folklore.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Tito's",
      day: "Thursday",
      date: "Jul 30",
      startTime: "3:45 PM",
      endTime: "4:45 PM",
    },
  ],
};

const littleSimz: Artist = {
  name: "Little Simz",
  slug: "little-simz",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageUrl: "/artists/heroes/little-simz.jpg",
  objectPosition: "center 0%",
  genres: ["Alternative Hip-Hop", "Conscious Rap", "Neo-Soul"],
  location: { city: "London", country: "England" },
  tagline: "One of the absolute greatest lyricists alive delivering pure live mastery.",
  socials: {
    spotify: "https://open.spotify.com/artist/6eXZu6O7nAUA5z6vLV8NKI",
    youtube: "https://www.youtube.com/@LittleSimz",
    tiktok: "https://www.tiktok.com/@littlesimz",
  },
  whySee: [
    "A blistering, career-defining masterclass in pure structural lyricism backed by an elite live multi-instrumental ensemble",
    "Hear the sweeping, cinematic live cuts from her critically acclaimed 2024 full-length masterpiece, Drop 7",
    "Unmatched theatrical stage command that shifts effortlessly from aggressive, rapid-fire flows to introspective soul grooves",
    "A legendary performer operating at the absolute absolute peak of her powers, commanding mainstage festival authority",
  ],
  whatToExpect: ["Live Band Performance", "Cinematic Visuals", "Intense Fan Connection"],
  bestFor: ["Lyric & Narrative Obsessives"],
  similarArtists: [
    {
      name: "Freddie Gibbs",
      slug: "freddie-gibbs",
    },
    {
      name: "Blood Orange",
      slug: "blood-orange",
    },
    {
      name: "Ric Wilson",
      slug: "ric-wilson",
    },
    {
      name: "Clipse",
      slug: "clipse",
    },
  ],
  tracks: [
    {
      spotifyId: "2tHdQjwO5zN86MLF7ZtU1X",
      name: "Venom",
      album: "GREY Area",
      duration: "2:34",
    },
    {
      spotifyId: "0pJO1tc1GpnxFyQp6Zp82r",
      name: "Gorilla",
      album: "No Thank You",
      duration: "4:05",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0272f48f1e2e04cc76d06ee708",
    },
    {
      spotifyId: "1Tva251P6CYwQWpJOedwQ8",
      name: "Introvert",
      album: "Sometimes I Might Be Introvert",
      duration: "6:02",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02aede85ed28c2237a33b63dba",
    },
    {
      spotifyId: "124nj3QzqpccVdLbiFHPeB",
      name: "Mood Swings",
      album: "Drop 7",
      duration: "2:20",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e024de8d5c48a2f7ab893e25e1f",
    },
  ],
  about:
    "Little Simz is the stage name of Simbiatu Ajikawo, a rapper, songwriter, and actress from Islington, London. She released her debut album, A Curious Tale of Trials + Persons, in 2015 through her independent imprint Age 101 Music. Her fourth studio record, Sometimes I Might Be Introvert, won the Mercury Prize in 2022. Her discography spans orchestral rap, West African highlife, neo-soul, and club-driven electronic music, including 2024's Drop 7 EP. On stage, her performance relies on sharp vocal pacing, live basslines, brass arrangements, and solo stage presence.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Tito's",
      day: "Thursday",
      date: "Jul 30",
      startTime: "5:45 PM",
      endTime: "6:30 PM",
    },
  ],
};

const cmat: Artist = {
  name: "CMAT",
  slug: "cmat",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageUrl: "/artists/heroes/cmat.webp",
  genres: ["Country Pop", "Indie Pop", "Singer-Songwriter"],
  location: { city: "Dublin", country: "Ireland" },
  tagline: "High-camp pop anthems matched with devastating, razor-sharp heartbreak storytelling.",
  socials: {
    spotify: "https://open.spotify.com/artist/3VBNIRx1LxVdRqOiPgkLwv",
    youtube: "https://www.youtube.com/@CMATbaby",
    tiktok: "https://www.tiktok.com/@cmatbaby",
  },
  whySee: [
    "The undisputed pop-country princess of Ireland delivering the funniest, most emotionally raw camp spectacle of the weekend",
    "Ciara Mary-Alice Thompson's jaw-dropping, operatic vocal range that completely commands giant festival fields",
    "Brilliant, tragi-comic anthem layouts that feel simultaneously like a massive Dolly Parton show and a chaotic indie pop party",
    "A deeply passionate live environment fueled by elite storytelling, line dancing, and collective crowd catharsis",
  ],
  whatToExpect: [
    "Choreography",
    "Lyrical Emotional Depth",
    "Conversational Delivery",
    "Massive Singalongs",
  ],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Elizabeth Nichols",
      slug: "elizabeth-nichols",
    },
    {
      name: "Ethel Cain",
      slug: "ethel-cain",
    },
    {
      name: "Kingfishr",
      slug: "kingfishr",
    },
    {
      name: "Wet Leg",
      slug: "wet-leg",
    },
  ],
  tracks: [
    {
      spotifyId: "6VXIZWHmdOTHIFhsSkYFgQ",
      name: "When a Good Man Cries",
      album: "EURO-COUNTRY",
      duration: "4:32",
    },
    {
      spotifyId: "05TyHrGHIEg8EyW31zJj0c",
      name: "Stay For Something",
      album: "Crazymad, For Me",
      duration: "3:36",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02ca8165d31b3a9d6743435d10",
    },
    {
      spotifyId: "6X7ij8jz33hp7xPe1Psn7r",
      name: "California",
      album: "Crazymad, For Me",
      duration: "4:05",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02ca8165d31b3a9d6743435d10",
    },
  ],
  about:
    "Dublin-born singer-songwriter Ciara Mary-Alice Thompson performs under the name CMAT. Her music pairs country songwriting structures with indie-pop arrangements and narrative lyrics. Her 2022 debut album, If My Wife New I'd Be Dead, won the Choice Music Prize for Irish Album of the Year, and her 2023 follow-up, Crazymad, For Me, received a Mercury Prize nomination and a BRIT Award nomination for International Artist of the Year. Her 2025 album Euro-Country expanded her sound with full-band production. On stage, CMAT performs backed by a live band, frequently incorporating camp theatrical choreography and country line-dancing routines into her sets.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Airbnb",
      day: "Thursday",
      date: "Jul 30",
      startTime: "6:30 PM",
      endTime: "7:15 PM",
    },
  ],
};

const boysNoize: Artist = {
  name: "Boys Noize",
  slug: "boys-noize",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageUrl: "/artists/heroes/boys-noize.jpg",
  objectPosition: "center 30%",
  genres: ["Electro House", "Techno", "Industrial Electronic"],
  location: { city: "Berlin", country: "Germany" },
  tagline:
    "Industrial Berlin techno and distorted punk energy designed to shatter warehouse dance floors.",
  socials: {
    spotify: "https://open.spotify.com/artist/62k5LKMhymqlDNo2DWOvvv",
    youtube: "https://www.youtube.com/@boysnoize",
    tiktok: "https://www.tiktok.com/@boysnoize",
  },
  whySee: [
    "A legendary titan of underground electronic music delivering a blistering, high-velocity audio-visual assault to the Perry's tent",
    "Experience his historic, heavy-hitting club staples alongside brand-new, unreleased electronic studio cut collaborations",
    "A relentless masterclass in modular hardware manipulation, metallic techno grooves, and distorted punk rock pacing",
    "The absolute ultimate alternative electronic set for ravers looking for raw industrial muscle over commercial pop EDM",
  ],
  whatToExpect: ["Cinematic Visuals", "High-Production Visuals", "High-Energy Pacing"],
  bestFor: ["Lyric & Narrative Obsessives", "Bass & Groove Lovers"],
  similarArtists: [
    {
      name: "Boris Brejcha",
      slug: "boris-brejcha",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782cc3d29c6605e96958abf585",
    },
    {
      name: "Chalk",
      slug: "chalk",
    },
    {
      name: "DEVAULT",
      slug: "devault",
    },
    {
      name: "Eli Brown",
      slug: "eli-brown",
    },
  ],
  tracks: [
    {
      spotifyId: "6tifCCTIVBLC2TmTquYG7G",
      name: "Fine Day Anthem",
      album: "Fine Day Anthem",
      duration: "3:13",
    },
    { name: "Fine Baseline", album: "Mayday", duration: "" },
    { name: "Chamber", album: "Strictly Raw Vol. 2", duration: "" },
  ],
  about:
    "German producer and DJ Alexander Ridha has spent over two decades shaping raw, high-voltage club music under the name Boys Noize. Grounded in the Berlin underground and propelled by his label Boysnoize Records, his signature sound fuses gritty electro house with heavy techno and industrial textures. Beyond his solo discography, Ridha's production instincts have driven high-profile collaborations with Skrillex (as Dog Blood), Frank Ocean, Nine Inch Nails, and Lady Gaga. On stage, Boys Noize delivers relentless, analog-driven sets built on physical basslines and strobe-lit intensity.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Perry's",
      day: "Thursday",
      date: "Jul 30",
      startTime: "4:15 PM",
      endTime: "5:15 PM",
    },
  ],
};

const betweenFriends: Artist = {
  name: "BETWEEN FRIENDS",
  slug: "between-friends",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageUrl: "/artists/heroes/between-friends.webp",
  objectPosition: "center 20%",
  genres: ["Indie Pop", "Bedroom Pop", "Alt-Pop"],
  location: { city: "Los Angeles", state: "California", country: "United States" },
  tagline: "Glitchy, neon-drenched notebook bedroom pop for late-night drives under palm trees.",
  socials: {
    spotify: "https://open.spotify.com/artist/2HkSsS8O2U2gPhnCGVN5vn",
    youtube: "https://www.youtube.com/@betweenfriends",
    tiktok: "https://www.tiktok.com/@itsbetweenfriends",
  },
  whySee: [
    "The absolute internet-favorite sibling duo bringing their hyper-aesthetic, nostalgic indie pop directly to a massive festival setting",
    "Savannah and Brandon Hudson's perfectly synchronized, dreamy vocal lines gliding over lush lo-fi synth instrumentation",
    "Hear the live execution of their gorgeous, genre-fluid 2024 concept EP string, mapping a distinct modern pop landscape",
    "A perfectly curated afternoon vibe check that translates internet aesthetic culture into a beautiful, communal live experience",
  ],
  whatToExpect: [
    "Retro-Futuristic Aesthetic",
    "Dreamy Atmosphere",
    "Synth & Atmospheric",
    "Ensemble Format",
  ],
  bestFor: ["Bass & Groove Lovers"],
  similarArtists: [
    {
      name: "Claire Rosinkranz",
      slug: "claire-rosinkranz",
    },
    {
      name: "Frost Children",
      slug: "frost-children",
    },
    {
      name: "Julia Wolf",
      slug: "julia-wolf",
    },
    {
      name: "Oklou",
      slug: "oklou",
    },
  ],
  tracks: [
    {
      spotifyId: "4EtgDIWb8Wm5mnaK701c0C",
      name: "affection",
      album: "we just need some time together",
      duration: "",
    },
    { name: "iloveyou", album: "I Love My Friends", duration: "" },
    { name: "Bruise", album: "I Love My Friends", duration: "" },
  ],
  about:
    "Formed by LA-based siblings Brandon and Savannah Hudson, BETWEEN FRIENDS crafts an intimate, nostalgic blend of DIY bedroom pop and atmospheric alt-pop. After breaking out with their hit single 'Affection,' the duo built a loyal following through visually striking EPs, aesthetic short films, and danceable festival sets rooted in modern internet culture and warm synth textures.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Bud Light",
      day: "Thursday",
      date: "Jul 30",
      startTime: "2:45 PM",
      endTime: "3:45 PM",
    },
  ],
};

const mph: Artist = {
  name: "MPH",
  slug: "mph",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["UK Garage", "Bassline", "Bass House"],
  location: { city: "Canterbury", country: "England" },
  tagline:
    "High-octane, hyper-precise UK garage driving the modern electronic underground dance revival.",
  socials: {
    spotify: "https://open.spotify.com/artist/62SCu33InHVq97VaWw3eof",
  },
  whySee: [
    "One of the UK garage underground's absolute finest modern technicians commanding an intense, high-energy dance session",
    "Experience a relentless display of syncopated swing rhythms, heavy bassline rollers, and infectious classic vocal chops",
    "Catch a pioneer of the current international electronic groove resurgence during a prime, highly anticipated tent slot",
    "An absolute, non-stop dance accelerator designed perfectly to turn a festival crowd into a boiling warehouse rave",
  ],
  whatToExpect: ["Bass & Groove", "Melodic Vocal Hooks", "High-Energy Pacing"],
  bestFor: ["Bass & Groove Lovers", "Tent & Club Venue Seekers", "Dance Floor Seekers"],
  similarArtists: [
    {
      name: "Notion",
      slug: "notion",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1788436c7707f218912b3dc25a4",
    },
    {
      name: "Riordan",
      slug: "riordan",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a9b9e8e9f12e78d2eb637a6a",
    },
    {
      name: "SIDEPIECE",
      slug: "sidepiece",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f75bb8d64c3d43282ad006f7",
    },
    {
      name: "Westend",
      slug: "westend",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bc781a35d287a09940ae6046",
    },
  ],
  tracks: [
    {
      spotifyId: "2U9RtZORzcu54vkWI19PIL",
      name: "Raw",
      album: "Raw",
      duration: "3:12",
    },
    { name: "One0Two", album: "Refraction", duration: "" },
    { name: "Ghost", album: "Refraction", duration: "" },
    {
      spotifyId: "1YHJZoMn2iOKoeFIvjn0Xi",
      name: "Rush",
      album: "Rush",
      duration: "3:52",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02ab3379fd7d86150a165d4a3a",
    },
  ],
  about:
    "Canterbury-born producer Myles Fairbairn, performing as MPH, stands at the forefront of the modern UK Garage and bass revival. Blending the soulful, syncopated swing of classic '90s UKG with high-octane bassline and bass house energy, he has built a reputation through standout releases on imprints like Night Bass, Crucast, and Nuvolve. His 2024 LP Refraction solidified his signature sound, while his high-tempo, rhythmically intricate DJ sets have made him a fixture across major global festival stages.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Perry's",
      day: "Thursday",
      date: "Jul 30",
      startTime: "3:00 PM",
      endTime: "4:00 PM",
    },
  ],
};

const amble: Artist = {
  name: "Amble",
  slug: "amble",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Contemporary Folk", "Indie Folk", "Irish Folk"],
  location: { city: "Midlands", country: "Ireland" },
  tagline:
    "Stripped-back, deeply nostalgic three-piece contemporary folk rooted in timeless storytelling.",
  socials: {
    spotify: "https://open.spotify.com/artist/5ZC7GPz5h9zkEfjZBUDNzI",
    youtube: "https://www.youtube.com/@ambleofficial",
    tiktok: "https://www.tiktok.com/@ambleofficial",
  },
  whySee: [
    "Ireland's fastest-rising contemporary folk phenomena bringing an intimate, breathtakingly acoustic experience to Grant Park",
    "Three-part vocal harmonies of jaw-dropping precision singing gorgeous, poetic modern hymns of ordinary Irish life",
    "A stunningly quiet, emotionally enormous oasis on the bill that commands absolute, pin-drop silence from a crowd",
    "The premier festival tour run showcasing the rich, stark instrumentation of their highly celebrated studio catalog",
  ],
  whatToExpect: ["Live Band Performance", "Lyrical Storytelling", "Crowd Atmosphere"],
  bestFor: ["Lyric & Narrative Obsessives"],
  similarArtists: [
    {
      name: "Kingfishr",
      slug: "kingfishr",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17880e8456f3ecc34f93ceebdde",
    },
    {
      name: "Will Swinton",
      slug: "will-swinton",
    },
    {
      name: "Nat Myers",
      slug: "nat-myers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782f32ced200ebf7a8f6047377",
    },
    {
      name: "Elizabeth Nichols",
      slug: "elizabeth-nichols",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786a6686aacc775a0807c37cd8",
    },
  ],
  tracks: [
    {
      spotifyId: "2vP6iFxnIV3awDVEaBnqut",
      name: "Lonely Island",
      album: "Lonely Island",
      duration: "3:58",
    },
    { name: "Mariner Boy", album: "The Name, The Trade and the Mirror", duration: "" },
    { name: "Tonylion", album: "Amble EP", duration: "" },
  ],
  about:
    "Irish folk trio Amble consists of Robbie Cunningham, Ross McNerney, and Oisin McCaffrey. Formed in late 2022, the group pairs acoustic guitars, mandolin, and bouzouki with three-part vocal harmonies. Their 2025 debut studio album, Reverie, debuted at number one on the Official Irish Albums Chart following breakout singles like 'Lonely Island' and 'Mariner Boy.' Recorded mostly live in studio takes, their catalog has amassed over 100 million streams alongside international headline tours and North American stadium support dates with Hozier.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Airbnb",
      day: "Thursday",
      date: "Jul 30",
      startTime: "5:15 PM",
      endTime: "6:00 PM",
    },
  ],
};

const kingfishr: Artist = {
  name: "Kingfishr",
  slug: "kingfishr",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Indie Folk", "Alternative Folk", "Irish Folk"],
  location: { city: "Limerick", country: "Ireland" },
  tagline: "Epic, stadium-scale acoustic indie folk built on soaring cinematic poetry.",
  socials: {
    spotify: "https://open.spotify.com/artist/6c2qQFq3xfxFJndX6wSe4f",
    youtube: "https://www.youtube.com/@kingfishr",
    tiktok: "https://www.tiktok.com/@kingfishrofficial",
  },
  whySee: [
    "The absolute vanguard of the current Irish acoustic movement making an immensely anticipated debut on the American festival circuit",
    "Eddie Keogh's deeply resonant, earth-shaking baritone vocals cutting right through the open afternoon air of Grant Park",
    "Experience a rapidly escalating independent phenomenon that has built a fierce cult reputation for emotionally overwhelming live sets",
    "A gorgeous, towering wall of acoustic guitar and masterfully layered banjo hooks that makes standard folk acts feel quiet by comparison",
  ],
  whatToExpect: ["Technical Vocal Range", "Live Band Performance", "Intense Fan Connection"],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Amble",
      slug: "amble",
    },
    {
      name: "Nat Myers",
      slug: "nat-myers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782f32ced200ebf7a8f6047377",
    },
    {
      name: "Cameron Whitcomb",
      slug: "cameron-whitcomb",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178712f78798ce31073c16673c8",
    },
    {
      name: "Case Oats",
      slug: "case-oats",
    },
  ],
  tracks: [
    {
      spotifyId: "4q5n1e9OgkSv2qIWXVp9sC",
      name: "Caroline",
      album: "Caroline",
      duration: "3:50",
    },
    { name: "Eyes Don't Lie", album: "Live From Dublin", duration: "" },
    {
      spotifyId: "3LKpYgSpXt5hRvr5LCVGdB",
      name: "Anyway",
      album: "Anyway",
      duration: "3:43",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02634befe65ac8dd64c21f3cae",
    },
    {
      spotifyId: "2PwijjlniJ9OcHqPIv3ccD",
      name: "Shadow",
      album: "Shadow",
      duration: "2:47",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02eb13defcac2e7872a3c4c4d5",
    },
  ],
  about:
    "Kingfishr formed when vocalist and guitarist Eddie Keogh, banjo player Eoghan McGrath, and bassist Eoin Fitzgibbon met while studying engineering at the University of Limerick in 2017, releasing their debut single 'flowers-fire' in 2022. Their cinematic vocal arrangements and banjo-led melodies broke through with 'Killeagh', which spent 17 weeks at number one on the Irish Singles Chart in 2025 and became the country's Christmas number one that year. That same year's debut album 'Halcyon' topped the Irish albums chart, and the trio have opened UK and European arena dates for Bruce Springsteen and George Ezra.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Tito's",
      day: "Thursday",
      date: "Jul 30",
      startTime: "1:45 PM",
      endTime: "2:45 PM",
    },
  ],
};

const ninajirachi: Artist = {
  name: "Ninajirachi",
  slug: "ninajirachi",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageUrl: "/artists/heroes/ninajirachi.webp",
  genres: ["Hyperpop", "Club", "Electronic"],
  location: { city: "Sydney", country: "Australia" },
  tagline: "Glitchy, hyper-futuristic club music delivered at terminal velocity.",
  socials: {
    spotify: "https://open.spotify.com/artist/3MekbRujJg5VZThubOlrkR",
    youtube: "https://www.youtube.com/@ninajirachi",
    tiktok: "https://www.tiktok.com/@ninajirachi",
  },
  whySee: [
    "Australia's premier electronic auteur bringing a boundary-pushing, hyper-glossy club sermon directly to the mid-afternoon crowd",
    "Experience an elite display of syncopated percussion blocks, metallic baseline steps, and brilliantly pitch-shifted vocal arrays",
    "A masterclass in avant-garde sound design that bridges left-field bedroom hyperpop with heavy, warehouse-ready techno infrastructure",
    "The absolute blueprint for where electronic pop culture is heading next, delivered by an intensely innovative pioneer",
  ],
  whatToExpect: [
    "Retro-Futuristic Aesthetic",
    "Bass & Groove",
    "High-Energy Pacing",
    "High-Production Visuals",
  ],
  bestFor: ["Tent & Club Venue Seekers", "Sound Design & Production Nerds"],
  similarArtists: [
    {
      name: "Frost Children",
      slug: "frost-children",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17851daae4f55980f7ff0ea8c30",
    },
    {
      name: "Slayyyter",
      slug: "slayyyter",
    },
    {
      name: "Snow Strippers",
      slug: "snow-strippers",
    },
    {
      name: "bradeazy",
      slug: "bradeazy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781c9da6b48887663d291b8df4",
    },
  ],
  tracks: [
    {
      spotifyId: "1xqT27jSG1Y15vOXfsV0gv",
      name: "iPod Touch",
      album: "I Love My Computer",
      duration: "3:16",
    },
    {
      spotifyId: "3Zzb5zbAY02YU4p7I4oVim",
      name: "Start Small",
      album: "Second Nature",
      duration: "3:48",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0272b09c28b68999fdd15b0671",
    },
    { name: "Watermelo", album: "Blumiere EP", duration: "" },
    { name: "Shatter", album: "4x4", duration: "" },
  ],
  about:
    "Australian DJ and producer Nina Wilson performs under the moniker Ninajirachi, crafting hyper-stylized dance music that bridges left-field club music and boundary-pushing hyperpop. The Central Coast native broke through as a teenager, reaching the finals of Triple J's Unearthed High competition before her 2017 single 'Pure Luck' became one of the station's most-played songs that year. Her debut studio album 'I Love My Computer' earned eight ARIA Award nominations in 2025, including Album of the Year, and won three, establishing her high-octane live sets on the global festival circuit.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Airbnb",
      day: "Thursday",
      date: "Jul 30",
      startTime: "4:00 PM",
      endTime: "4:45 PM",
    },
  ],
};

const hauteAndFreddy: Artist = {
  name: "Haute & Freddy",
  slug: "haute-and-freddy",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageUrl: "/artists/heroes/haute-and-freddy.webp",
  genres: ["Synth-Pop", "Alt-Pop", "Electropop"],
  location: { city: "Los Angeles", state: "California", country: "United States" },
  tagline: "Sleek, runway-ready French electronic pop built for the open air.",
  socials: {
    spotify: "https://open.spotify.com/artist/66T34XqGkEWbzKWALSBDuR",
    youtube: "https://www.youtube.com/@hauteandfreddy",
    tiktok: "https://www.tiktok.com/@hauteandfreddy",
  },
  whySee: [
    "The absolute definition of modern French electronic polish making a high-visibility crossover statement on the mainstage",
    "A perfectly synchronized live-electronic set that balances deep, driving baseline grooves with incredibly infectious vocal hooks",
    "Experience a chic, hyper-stylized dance floor environment that translates European underground club ethos onto an enormous scale",
    "The ultimate high-energy afternoon catalyst designed perfectly to unify a massive, moving festival crowd under the sun",
  ],
  whatToExpect: ["Production Style Approach", "Cinematic Visuals", "Synth & Atmospheric"],
  bestFor: ["Dance Floor Seekers", "Bass & Groove Lovers"],
  similarArtists: [
    {
      name: "Slayyyter",
      slug: "slayyyter",
    },
    {
      name: "MUNA",
      slug: "muna",
    },
    {
      name: "Charli XCX",
      slug: "charli-xcx",
    },
    {
      name: "Empire of the Sun",
      slug: "empire-of-the-sun",
    },
  ],
  tracks: [
    {
      spotifyId: "7KNFJbMvPdplvrolBUkK2N",
      name: "Shy Girl",
      album: "Shy Girl",
      duration: "3:07",
    },
    { name: "U Want", album: "haute & freddy", duration: "" },
    { name: "Late Night", album: "Late Night", duration: "" },
    { name: "Paris Express", album: "Rouge", duration: "" },
  ],
  about:
    "Los Angeles-based alternative pop duo Haute & Freddy, composed of vocalist Michelle Buzz and drummer/producer Lance Shipp, blend 1980s synth-pop with theatrical, carnival-inspired aesthetics. Buzz had already written hits for Katy Perry and Shipp had produced for Britney Spears before the two joined forces in late 2024, channeling that pop songcraft into a campy, high-energy world of dramatic hooks and vintage synth textures. Signed to Atlantic Records, the duo released their debut album 'Big Disgrace' in 2026, building on standout festival and tour appearances across North America.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "T-Mobile",
      day: "Thursday",
      date: "Jul 30",
      startTime: "2:30 PM",
      endTime: "3:30 PM",
    },
  ],
};

const bellaKay: Artist = {
  name: "Bella Kay",
  slug: "bella-kay",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Indie Pop", "Alt-Pop", "Singer-Songwriter"],
  location: { city: "Orlando", state: "Florida", country: "United States" },
  tagline: "Vulnerable, shadow-drenched bedroom alt-pop for late-night overthinkers.",
  socials: {
    spotify: "https://open.spotify.com/artist/4Z8MrrKMBHMPa8d04Ivur8",
    youtube: "https://www.youtube.com/@itsBellaKaymusic",
    tiktok: "https://www.tiktok.com/@itsbellakaymusic",
  },
  whySee: [
    "Catch a hyper-gifted independent lyricist executing a deeply atmospheric, confessional performance on the BMI stage",
    "Songwriting that lands like an intense, unguarded voice memo tracking the complex textures of young romance and identity",
    "A stunning afternoon oasis that pairs delicate, close-mic'd vocal textures with unexpectedly heavy electronic drops",
    "The official festival tour run introducing her highly celebrated independent studio catalog to a massive live audience",
  ],
  whatToExpect: ["Dark Mood Visuals", "Conversational Delivery", "Lyrical Storytelling"],
  bestFor: ["Lyric & Narrative Obsessives", "Bass & Groove Lovers"],
  similarArtists: [
    {
      name: "ivri",
      slug: "ivri",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178db6265ab7c2b7e2a156c99ae",
    },
    {
      name: "Sombr",
      slug: "sombr",
    },
    {
      name: "Ryman",
      slug: "ryman",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783b319d5a8ef036ba5e7fed10",
    },
    {
      name: "Julia Wolf",
      slug: "julia-wolf",
    },
  ],
  tracks: [
    {
      spotifyId: "18d1pubaNYUpaKIeSoxPFA",
      name: "The Sick",
      album: "The Sick",
      duration: "3:15",
    },
    { name: "Overthinking", album: "Shadows", duration: "" },
    { name: "Ghost Town", album: "Shadows", duration: "" },
    { name: "Bleach", album: "Bleach", duration: "" },
  ],
  about:
    "Orlando-based singer and songwriter Bella Kay released her debut single 'The Sick' in 2025, which accumulated over 100 million Spotify streams. Her 2026 single 'iloveitiloveitiloveit' reached number 17 on the US Billboard Hot 100 and number 2 on the UK Singles Chart. Signed to Atlantic Records, she released her debut EP 'sick to my stomach' in November 2025. Her music pairs alt-pop production with acoustic guitar and confessional songwriting.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "BMI",
      day: "Thursday",
      date: "Jul 30",
      startTime: "4:30 PM",
      endTime: "5:10 PM",
    },
  ],
};

const marlonFunaki: Artist = {
  name: "Marlon Funaki",
  slug: "marlon-funaki",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Indie Rock", "Surf Rock", "Alternative Rock"],
  location: { city: "Redlands", state: "California", country: "United States" },
  tagline: "Fuzzed-out surf rock grit married to blistering, soulful blues guitar mastery.",
  socials: {
    spotify: "https://open.spotify.com/artist/3BcSXip92N0HwJRA9sVmP6",
    youtube: "https://www.youtube.com/@marlonfunaki",
    tiktok: "https://www.tiktok.com/@marlonfunaki",
  },
  whySee: [
    "An absolute masterclass in raw, traditional showmanship driven by a generation-defining young guitar virtuoso",
    "Blistering, extended psychedelic blues solos that recall classic rock legends but delivered with a modern indie snarl",
    "Experience an intensely passionate, high-energy live rock engine that completely bypasses processed backing tracks",
    "A rare, guitar-driven underground discovery set that will leave music traditionalists completely floored by the talent",
  ],
  whatToExpect: ["Guitar-Driven Sound", "Ensemble Format"],
  bestFor: ["Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Spacey Jane",
      slug: "spacey-jane",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f5864abfed7a8d4b9334a7a0",
    },
    { name: "Easy Honey", slug: "easy-honey" },
    { name: "Surfing for Daisy", slug: "surfing-for-daisy" },
    {
      name: "Ink",
      slug: "ink",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b3df8a3980032366a3a040bc",
    },
  ],
  tracks: [
    {
      spotifyId: "1qTLYAQcXTs1JGbt8DfedM",
      name: "When Sunday Comes Around",
      album: "Monterey Village",
      duration: "5:19",
    },
    { name: "Summering", album: "Marlon Funaki", duration: "" },
    { name: "Prone", album: "Prone", duration: "" },
    { name: "Escapism", album: "Escapism", duration: "" },
  ],
  about:
    "California-based singer, songwriter, and multi-instrumentalist Marlon Funaki writes, records, and produces his own music. Raised in Southern California, he began his music career busking with an electric guitar before releasing his debut studio project Monterey Village in 2022. His catalog includes popular singles such as 'When Sunday Comes Around' and 'Red Hearts.' His live sets feature guitar-driven alternative rock performed in a power trio setup.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Airbnb",
      day: "Thursday",
      date: "Jul 30",
      startTime: "1:50 PM",
      endTime: "2:30 PM",
    },
  ],
};

const devault: Artist = {
  name: "DEVAULT",
  slug: "devault",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  imageUrl: "/artists/heroes/devault.jpg",
  genres: ["Melodic House", "Techno", "Electropop"],
  location: { city: "Los Angeles", state: "California", country: "United States" },
  tagline: "Dark, cinematic industrial techno that turns early evenings into warehouse raves.",
  socials: {
    spotify: "https://open.spotify.com/artist/1VBAKMui4zm5MnBWNn3NbL",
    youtube: "https://www.youtube.com/@DEVAULT",
    tiktok: "https://www.tiktok.com/@devaultmusic",
  },
  whySee: [
    "A hyper-dark, cinematic electronic sermon that injects intense, late-night warehouse energy straight into the evening lineup",
    "Sage DeVault's flawless engineering style delivering the most calculated, punishing baseline grooves of the day on Tito's",
    "Experience a masterclass in gothic electronic ambiance, metallic midtempo techno structures, and dark vocal samples",
    "The absolute premier alternative option for electronic fans hunting heavy, stylized atmospheric warehouse tension",
  ],
  whatToExpect: ["Bass & Groove", "Dark Mood Visuals"],
  bestFor: ["Bass & Groove Lovers", "Tent & Club Venue Seekers", "Sound Design & Production Nerds"],
  similarArtists: [
    {
      name: "Eli Brown",
      slug: "eli-brown",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178264c8c3a982604908c6cf188",
    },
    {
      name: "Peace Control",
      slug: "peace-control",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17817b940b1cfc87546d75925c0",
    },
    {
      name: "Max Styler",
      slug: "max-styler",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178ded53da461b13994a9ef8347",
    },
    { name: "Klo", slug: "klo" },
  ],
  tracks: [
    {
      spotifyId: "23Hxd8ph2vJWlXngubtyuO",
      name: "Feels Like Us",
      album: "Feels Like Us",
      duration: "3:54",
    },
    { name: "Runway", album: "Stay", duration: "" },
    { name: "Between The Lines", album: "Between The Lines", duration: "" },
    { name: "Strom", album: "Strom", duration: "" },
  ],
  about:
    "Sage DeVault, performing as DEVAULT, is an Orange County-born electronic producer known for blending dark, cinematic soundscapes with heavy-hitting house and techno beats. Breaking through in 2017 with a critically acclaimed DJ Snake remix, he built a distinctive reputation through atmospheric EPs and high-profile collaborations. Recently linking up with John Summit's Experts Only label for standout club anthems like 'Feels Like Us' and 'SHADES OF BLUE,' DEVAULT brings an intense, strobe-lit audio-visual experience to festival stages.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Perry's",
      day: "Thursday",
      date: "Jul 30",
      startTime: "1:45 PM",
      endTime: "2:45 PM",
    },
    {
      id: "2",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Tito's",
      day: "Thursday",
      date: "Jul 30",
      startTime: "7:30 PM",
      endTime: "8:30 PM",
    },
  ],
};

const sb19: Artist = {
  name: "SB19",
  slug: "sb19",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["P-Pop", "Pop", "Dance Pop"],
  location: { city: "Manila", country: "Philippines" },
  tagline:
    "The historic Kings of P-pop delivering flawless, hyper-synchronized vocal and dance mastery.",
  socials: {
    spotify: "https://open.spotify.com/artist/3g7vYcdDXnqnDKYFwqXBJP",
    youtube: "https://www.youtube.com/@officialsb19",
    tiktok: "https://www.tiktok.com/@officialsb19",
  },
  whySee: [
    "A historic milestone performance as the first-ever Filipino act to grace the Lollapalooza stage, making live music history",
    "Mind-blowing, world-class choreography executed with flawless, military-grade precision across an entirely high-energy set",
    "Pablo, Stell, Ken, Justin, and Josh bringing their legendary multi-octave vocal harmonies live to an intense, dedicated fanbase",
    "An absolute stadium-proven spectacle packed with explosive charisma, seamless dance breakdowns, and soaring pop hooks",
  ],
  whatToExpect: [
    "Choreography",
    "Technical Vocal Range",
    "Cinematic Visuals",
    "Intense Fan Connection",
  ],
  bestFor: ["Dance Floor Seekers", "Legacy & Milestone Hunters"],
  similarArtists: [
    {
      name: "aespa",
      slug: "aespa",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178053bbb910dda6d4ab0618b8b",
    },
    {
      name: "Zara Larsson",
      slug: "zara-larsson",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178d519a7e349541cba8f85e965",
    },
    {
      name: "ADÉLA",
      slug: "adela",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fa24d9eab0a75b1ab0f9013b",
    },
    {
      name: "Tate McRae",
      slug: "tate-mcrae",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bed8016bd64422793ff3bc75",
    },
  ],
  tracks: [
    {
      spotifyId: "6RYhIHur2unkQv28fcinNO",
      name: "GENTO",
      album: "PAGTATAG!",
      duration: "3:52",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02fdc4605ec272cfd1a52317d4",
    },
    {
      spotifyId: "4mH8Tdoe1bbfkXp8Mai3lH",
      name: "MAPA",
      album: "Pagsibol",
      duration: "4:35",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e022df704df7b4ede5f71b053cf",
    },
    { name: "MOONLIGHT", album: "MOONLIGHT", duration: "" },
  ],
  about:
    "SB19 formed in Manila through a K-pop-style trainee program, debuting in 2018 as pioneers of P-pop, Philippine pop built on synchronized choreography and idol-group conventions but performed in Filipino and English. The group, made up of Pablo, Josh, Stell, Ken, and Justin, left their original management company in 2023 to found their own label, 1Z Entertainment, a rare move for an act in this genre. In 2021, they became the first Southeast Asian act nominated for Top Social Artist at the Billboard Music Awards, and they've since sold out two nights at the Philippine Arena, the world's largest indoor arena by capacity. Their choreography-driven live show has carried that momentum onto international festival stages.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Allianz",
      day: "Thursday",
      date: "Jul 30",
      startTime: "3:30 PM",
      endTime: "4:30 PM",
    },
  ],
};

const eccaVandal: Artist = {
  name: "Ecca Vandal",
  slug: "ecca-vandal",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Punk Rock", "Alternative Hip-Hop", "Electronic Rock"],
  location: { city: "Melbourne", country: "Australia" },
  tagline: "A ferocious, genre-shattering riot of heavy punk riffs and abrasive hip-hop grit.",
  socials: {
    spotify: "https://open.spotify.com/artist/0NhKCHTPG7Sz62S3zxV1Cf",
    youtube: "https://www.youtube.com/@ECCAVANDAL",
    tiktok: "https://www.tiktok.com/@eccavandal",
  },
  whySee: [
    "The absolute ultimate alternative live wildcard of the afternoon, delivering an intensely aggressive sonic collision of punk and rap",
    "Ecca Vandal's magnetic, completely untamed stage presence that commands absolute mosh-pit chaos from a crowd",
    "Experience a brilliant, boundary-pushing soundscape that channels the raw energy of Beastie Boys and the heavy distortion of electronic rock",
    "Blistering live vocal delivery backed by razor-sharp instrumentation designed purely to shock and awaken the senses",
  ],
  whatToExpect: ["Guitar-Driven Sound", "Energetic Mosh Pits"],
  bestFor: ["Mosh Pit Lovers"],
  similarArtists: [
    {
      name: "Viagra Boys",
      slug: "viagra-boys",
    },
    {
      name: "Bad Nerves",
      slug: "bad-nerves",
    },
    {
      name: "Kim Theory",
      slug: "kim-theory",
    },
    {
      name: "Wolf Alice",
      slug: "wolf-alice",
    },
  ],
  tracks: [
    {
      spotifyId: "4cErKi16sjFZOfd85t9dnt",
      name: "CRUISING TO SELF SOOTHE",
      album: "LOOKING FOR PEOPLE TO UNFOLLOW",
      duration: "2:30",
    },
    { name: "Broke", album: "Ecca Vandal", duration: "" },
    { name: "Future You", album: "Ecca Vandal", duration: "" },
    { name: "Pricey", album: "Ecca Vandal", duration: "" },
  ],
  about:
    "Ecca Vandal was born in Louis Trichardt, South Africa, to Sri Lankan Tamil refugee parents before her family settled in Melbourne, where she studied jazz at the Victorian College of the Arts. Her self-titled 2017 debut album fused punk, hip-hop, and electronic elements into what NME called 'Beastie Boys-esque' songwriting, featuring guest vocals from Refused's Dennis Lyxzén and Letlive's Jason Aalon Butler. She won the 2019 Levi's Music Prize at BIGSOUND, and while supporting Limp Bizkit's 2025 European tour, Fred Durst joined her onstage in Frankfurt during her own song 'Cruising to Self Soothe.' Her 2026 second album, 'Looking for People to Unfollow', pushes further into bass-heavy production drawing on reggaeton, trap, and her South Asian heritage.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Airbnb",
      day: "Thursday",
      date: "Jul 30",
      startTime: "2:50 PM",
      endTime: "3:30 PM",
    },
  ],
};

const badNerves: Artist = {
  name: "Bad Nerves",
  slug: "bad-nerves",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Power Pop", "Garage Rock", "Punk Rock"],
  location: { city: "London", country: "England" },
  tagline:
    "Hyper-speed, distortion-soaked power pop garage rock delivered like a lightning strike.",
  socials: {
    spotify: "https://open.spotify.com/artist/7IPyXY4ZHkuvQY1ny8TnMQ",
    youtube: "https://www.youtube.com/@badnerves",
    tiktok: "https://www.tiktok.com/@badbadnerves",
  },
  whySee: [
    "London's premier garage-punk sensation bringing a relentless, hyper-fast guitar assault straight to the Allianz stage",
    "Experience incredibly infectious, melody-heavy punk anthems played at an absolute terminal, breathtaking velocity",
    "A masterclass in traditional analog band energy that channels the rapid-fire hooks of The Ramones with a sharp, modern indie rock snarl",
    "A non-stop, high-octane rock catalyst built around sharp distortion, massive group choruses, and pure adrenaline",
  ],
  whatToExpect: ["Guitar-Driven Sound", "High-Energy Pacing"],
  bestFor: ["Scene Trend Spotters"],
  similarArtists: [
    {
      name: "Viagra Boys",
      slug: "viagra-boys",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1789c1e2f2acd631e30c6ad153e",
    },
    {
      name: "High Vis",
      slug: "high-vis",
    },
    {
      name: "Kim Theory",
      slug: "kim-theory",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178aeb5f081b1d106a80f4a67a6",
    },
    {
      name: "Finn Wolfhard",
      slug: "finn-wolfhard",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178221291d43457048ddb8f0f5e",
    },
  ],
  tracks: [
    {
      spotifyId: "3AL0jiB2Ix2u6x1MKMNcQv",
      name: "Baby Drummer",
      album: "Bad Nerves",
      duration: "2:20",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e026637880b7e0b7b5e63164976",
    },
    { name: "Can't Be Happy", album: "Bad Nerves", duration: "" },
    {
      spotifyId: "14Rut7t4hyhWblw9O8qrt1",
      name: "Antidote",
      album: "Still Nervous",
      duration: "1:48",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e022d7099fc381829b61795df23",
    },
  ],
  about:
    "Bad Nerves began in 2015 when guitarist Will Phillipson messaged frontman Bobby Nerves with an idea for a band, writing songs in a garage with no plans to play live. The five-piece, rounded out by George Berry, Jonathan Poulton, and Samuel Thompson, released their self-titled debut album in 2020 and its follow-up, 'Still Nervous', in 2024, both recorded in that same garage. Their hook-driven, sub-two-minute songs have drawn comparisons to the Ramones, Supergrass, and The Strokes, and earned them support slots with Royal Blood, The Hives, and Nothing But Thieves. In 2024 they signed to Loosegroove Records, the label founded by Pearl Jam's Stone Gossard, and the following year Green Day's Billie Joe Armstrong invited them to open shows on his band's South American tour.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Allianz",
      day: "Thursday",
      date: "Jul 30",
      startTime: "1:30 PM",
      endTime: "2:30 PM",
    },
  ],
};

const asha_banks: Artist = {
  name: "Asha Banks",
  slug: "asha-banks",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Indie Pop", "Singer-Songwriter", "Alt-Pop"],
  location: { city: "London", country: "England" },
  tagline: "Stunning, whisper-close confessional indie pop tracking the messy textures of youth.",
  socials: {
    spotify: "https://open.spotify.com/artist/2uDFxcjRQnf8mjFwfqieSw",
    youtube: "https://www.youtube.com/@ashaabanks",
    tiktok: "https://www.tiktok.com/@ashaabanks",
  },
  whySee: [
    "Catch an exceptional independent lyricist executing a deeply atmospheric, storyteller-style performance on the mainstage",
    "Songwriting that lands like an intense, unguarded voice memo tracking the complex vulnerabilities of modern romance",
    "A beautiful, sun-drenched early afternoon oasis that pairs delicate vocal textures with soaring indie pop melodies",
    "The official premier festival tour run showcasing her highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: [
    "Lyrical Storytelling",
    "Guitar-Driven Sound",
    "Conversational Delivery",
    "Dreamy Atmosphere",
  ],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Audrey Hobert",
      slug: "audrey-hobert",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1784fc78e354b19324810f1e933",
    },
    {
      name: "Sienna Spiro",
      slug: "sienna-spiro",
    },
    {
      name: "Paris Paloma",
      slug: "paris-paloma",
    },
    {
      name: "Suki Waterhouse",
      slug: "suki-waterhouse",
    },
  ],
  tracks: [
    {
      spotifyId: "1H2kXCdkoYqLjS0iKbWryR",
      name: "Too Busy Missing You",
      album: "Too Busy Missing You",
      duration: "3:25",
    },
    { name: "Something In Between", album: "Something In Between", duration: "" },
    { name: "I'm Just A Ghost", album: "Something In Between", duration: "" },
    { name: "Too Old For This", album: "Something In Between", duration: "" },
  ],
  about:
    "Asha Banks is an English singer-songwriter and actress born in St Albans and based in London. Her music couples acoustic guitar arrangements and close-mic'd vocals with subtle electronic textures. Following a series of West End musical roles and screen projects, she launched her recording career with the single 'So Green' in late 2024, leading to two short-length releases in 2025: Untie My Tongue and her Island Records debut, How Real Was It?. In 2026, she expanded her sound through the collaborative three-track release Everything Is About You with Novo Amor and Lowswimmer. Her live set features an intimate guitar-led setup backed by atmospheric soundscapes.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "T-Mobile",
      day: "Thursday",
      date: "Jul 30",
      startTime: "12:45 PM",
      endTime: "1:30 PM",
    },
  ],
};

const faouzia: Artist = {
  name: "Faouzia",
  slug: "faouzia",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Dark Pop", "Chamber Pop", "Pop"],
  location: { city: "Carman", country: "Canada" },
  tagline:
    "A breathtakingly cinematic, three-octave vocal powerhouse commanding tragic dark pop melodies.",
  socials: {
    spotify: "https://open.spotify.com/artist/5NhgsV7qPWHZqYEMKzbYvo",
    youtube: "https://www.youtube.com/@faouzia",
    tiktok: "https://www.tiktok.com/@faouziaofficial",
  },
  whySee: [
    "Witness one of the most technically gifted, jaw-dropping vocalists performing anywhere across the entire weekend",
    "Faouzia's operatic, powerhouse vocal delivery effortlessly filling the open air with staggering emotional power",
    "A beautifully dramatic, orchestrally layered sonic experience that seamlessly fuses contemporary pop with traditional Moroccan modal textures",
    "Experience the raw, bone-chilling crowd energy driven by intense, massive dark-pop stadium singalongs",
  ],
  whatToExpect: ["Technical Vocal Range", "Cinematic Visuals", "Theatrical Staging", "Lush Sound"],
  bestFor: ["Early Afternoon Discovery", "Storytelling Lovers"],
  similarArtists: [
    {
      name: "Valencia Grace",
      slug: "valencia-grace",
    },
    {
      name: "Sienna Spiro",
      slug: "sienna-spiro",
    },
    {
      name: "Ella Boh",
      slug: "ella-boh",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f3ca12f1b323dbb7027d78dc",
    },
    {
      name: "Paris Paloma",
      slug: "paris-paloma",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fea2286a364dd2a0c4209136",
    },
  ],
  tracks: [
    {
      spotifyId: "6QKpHmO41jkd9pTp0FfmHs",
      name: "UNETHICAL",
      album: "UNETHICAL",
      duration: "3:39",
    },
    { name: "Tears of Gold", album: "CITIZEN", duration: "" },
    { name: "RIP, Love", album: "CITIZEN", duration: "" },
    {
      spotifyId: "1OU4E4HiVjdak0mL4blVWT",
      name: "Minefields",
      album: "Minefields",
      duration: "3:10",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02c4274cc5f675c2caab258f20",
    },
  ],
  about:
    "Faouzia Ouihya, performing mononymously as Faouzia, is a Moroccan-born, Canadian-raised singer-songwriter and multi-instrumentalist. Based in Canada, she pairs classical piano training and sweeping vocal trills rooted in Arab musical traditions with cinematic, dark-pop production. After gaining early traction with self-released singles and high-profile collaborations like 'Minefields' with John Legend, she released her debut project CITIZENS followed by her 2025 album FILM NOIR, anchored by the viral breakout track 'UNETHICAL'. Her live performances center on powerful, operatic vocals and dramatic piano-led arrangements.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Tito's",
      day: "Thursday",
      date: "Jul 30",
      startTime: "12:15 PM",
      endTime: "1:00 PM",
    },
  ],
};

const eveningElephants: Artist = {
  name: "Evening Elephants",
  slug: "evening-elephants",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Indie Pop", "Pop-Rock", "Indie Rock"],
  location: { city: "Los Angeles", state: "California", country: "United States" },
  tagline:
    "Sun-drenched indie rock hooks floating over crisp hip-hop grooves for endless summer vibes.",
  socials: {
    spotify: "https://open.spotify.com/artist/4mvJqW3HQswIu7RmvcAQUy",
    youtube: "https://www.youtube.com/@eveningelephants",
    tiktok: "https://www.tiktok.com/@eveningelephants",
  },
  whySee: [
    "The absolute perfect early evening vibe catalyst bringing a hyper-catchy, genre-fluid party directly to the BMI stage",
    "Dreamy, shimmering indie guitar lines gliding effortlessly over crisp, low-slung alternative hip-hop rhythm sections",
    "A loose, remarkably fun and charismatic live performance built specifically to celebrate carefree youth culture",
    "The ultimate sunset groove opportunity designed to get groups of friends dancing as the skyline begins to light up",
  ],
  whatToExpect: ["Dreamy Atmosphere", "Afternoon Vibes"],
  bestFor: ["Dance Floor Seekers", "Chill Summer Vibes"],
  similarArtists: [
    {
      name: "bixby",
      slug: "bixby",
    },
    {
      name: "Balu Brigada",
      slug: "balu-brigada",
    },
    {
      name: "Quadeca",
      slug: "quadeca",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781eee118b4a489ddd3de9f47b",
    },
    {
      name: "Spacey Jane",
      slug: "spacey-jane",
    },
  ],
  tracks: [
    {
      spotifyId: "77wAbXWeBBK3A6EYV7IuDW",
      name: "Snow on The Bluff",
      album: "Snow on The Bluff",
      duration: "03:06",
    },
    { name: "Life Is Good", album: "Evening Elephants", duration: "" },
    { name: "Spit It Out", album: "Evening Elephants", duration: "" },
    { name: "Float", album: "Float", duration: "" },
  ],
  about:
    'Vocalist Sam Boggs and producer Brandon Leslie formed Evening Elephants in Los Angeles in 2021. The duo combines bouncy basslines, guitar-driven pop-rock melodies, and hip-hop rhythm pockets. Following early self-released tracks, they broke out with the singles "Life Is Swell" and "Snow on The Bluff". Their catalog includes the 2023 EP Carefree, very. Live sets center on energetic vocal delivery and dynamic rhythm arrangements.',
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "BMI",
      day: "Thursday",
      date: "Jul 30",
      startTime: "6:50 PM",
      endTime: "7:30 PM",
    },
  ],
};

const pearlyDrops: Artist = {
  name: "Pearly Drops",
  slug: "pearly-drops",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Dream Pop", "Electro-Pop", "Indie Electronica"],
  location: { city: "Helsinki", country: "Finland" },
  tagline: "Dreamlike, feverish electro-pop designed to bottle up a sense of beautiful isolation.",
  socials: {
    spotify: "https://open.spotify.com/artist/2eMb96S1ZJ1YQ7FhWAzWJL",
    youtube: "https://www.youtube.com/@PearlyDropsOfficial",
    tiktok: "https://www.tiktok.com/@pearly_drops",
  },
  whySee: [
    "The premier live American festival showcase of Sandra Tervonen and Juuso Malin's surreal, feverish bedroom pop universe",
    "Haunting, pitch-perfect vocal textures floating effortlessly over cold, meticulously layered analog synthesizers",
    "Experience a cult-favorite Nordic synth-pop phenomenon hot off the heels of their highly praised studio statement, The Voices Are Coming Back",
    "A gorgeous, intensely atmospheric midday set that transforms the open air into an intimate, dream-like club haven",
  ],
  whatToExpect: [
    "Synth & Atmospheric",
    "Dreamy Atmosphere",
    "Cinematic Visuals",
    "Intimate Performance",
  ],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Oklou",
      slug: "oklou",
    },
    {
      name: "New Constellations",
      slug: "new-constellations",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786a3aa969f4f79f38b0c16c91",
    },
    {
      name: "Suki Waterhouse",
      slug: "suki-waterhouse",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781696da72cfcb968be92b84d4",
    },
    {
      name: "Sunday (1994)",
      slug: "sunday-1994",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b7e25151a004217ba46eb173",
    },
  ],
  tracks: [
    {
      spotifyId: "3l5qctI4FqhfjIZzs06cbk",
      name: "Call For Help",
      album: "Call For Help",
      duration: "03:18",
    },
    {
      spotifyId: "0OV191noT9tzOg2QwaWN39",
      name: "Delusional On Sunset Blvd",
      album: "The Voices Are Coming Back",
      duration: "3:34",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02919bee4ca9f1ccdb014dfabc",
    },
    {
      spotifyId: "1RFjldJskq5ET8nbXuR5H0",
      name: "Ratgirl",
      album: "The Voices Are Coming Back",
      duration: "3:28",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02919bee4ca9f1ccdb014dfabc",
    },
    { name: "Bloom", album: "Call For Help", duration: "" },
  ],
  about:
    "Helsinki-born duo Sandra Tervonen and Juuso Malin formed Pearly Drops following careers in sound design and pop production. The pair self-produce their music, blending tape-warped synth textures, ethereal vocal layers, and lo-fi electronic arrangements. After debuting with the 2020 album Call For Help, they released A Little Disaster in 2023 and The Voices Are Coming Back. Live performances center on synth instrumentation and vocal processing.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Allianz",
      day: "Thursday",
      date: "Jul 30",
      startTime: "12:00 PM",
      endTime: "12:45 PM",
    },
  ],
};

const bixby: Artist = {
  name: "bixby",
  slug: "bixby",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Indie Pop", "Pop-Rock", "R&B"],
  location: { city: "Los Angeles", state: "California", country: "United States" },
  tagline: "Glitched-out R&B vocals running over intense, guitar-driven internet indie-pop energy.",
  socials: {
    spotify: "https://open.spotify.com/artist/3vqtY7Lhhuw6sEwU4HmIRv",
    youtube: "https://www.youtube.com/@ihatebixby",
    tiktok: "https://www.tiktok.com/@ihatebixby",
  },
  whySee: [
    "Catch one of the fastest-rising visionaries of the alternative pop sphere executing a hyper-kinetic, high-energy live band set",
    "Experience the thrilling live execution of his massive 2026 international headline run, The Marvel of The Century! Showtour",
    "A seamless vocal display trading between soulful, low-slung R&B runs and explosive, fuzzed-out indie rock guitar choruses",
    "An absolute catalyst of youthful energy, complete with intense, localized crowd mosh pits on the Bud Light lawn",
  ],
  whatToExpect: ["Retro-Futuristic Aesthetic", "Guitar-Driven Sound", "Energetic Mosh Pits"],
  bestFor: [],
  similarArtists: [
    {
      name: "Quadeca",
      slug: "quadeca",
    },
    {
      name: "Balu Brigada",
      slug: "balu-brigada",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178871bccd59b468f93c4650066",
    },
    {
      name: "Emi Grace",
      slug: "emi-grace",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781d8d8c934c382100d033bb41",
    },
    {
      name: "Ethel Cain",
      slug: "ethel-cain",
    },
  ],
  tracks: [
    {
      spotifyId: "2stuYeS9icwoQf79tUmnv8",
      name: "distance",
      album: "distance",
      duration: "01:53",
    },
    {
      spotifyId: "59IZjbjihzu5wbWKQa3tKS",
      name: "desire",
      album: "desire",
      duration: "2:31",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e023275d8cfc2a447941ffc600d",
    },
    { name: "endlessly", album: "endlessly", duration: "" },
  ],
  about:
    "bixby is the stage name of Bradley Au, a singer, songwriter, and producer from Orange County, California. His breakout single 'endlessly' caught the attention of 100 gecs' Dylan Brady, leading to a deal with Brady's Dog Show Records, an Atlantic Records imprint, in 2022. Built on falsetto vocals and glossy, hook-driven production, his sound blends indie pop, R&B, and rock textures across releases like 'desire' and the 2023 EP 'are you sleeping alone again?'. After supporting ericdoa's Dead on Arrival tour, he headlined for the first time on 2026's The Marvel of the Century! Showtour.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Bud Light",
      day: "Thursday",
      date: "Jul 30",
      startTime: "1:00 PM",
      endTime: "1:45 PM",
    },
  ],
};

const penelopeRoad: Artist = {
  name: "Penelope Road",
  slug: "penelope-road",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Funk", "Soul", "Indie Pop"],
  location: { city: "Atlanta", state: "Georgia", country: "United States" },
  tagline:
    "Towering, multi-instrumental indie folk built around explosive, orchestral rock releases.",
  socials: {
    spotify: "https://open.spotify.com/artist/2BxNY82SWxJkGveOWm2oxH",
    youtube: "https://www.youtube.com/@peneloperoad",
    tiktok: "https://www.tiktok.com/@peneloperoadband",
  },
  whySee: [
    "A staggering, beautifully raw live folk-rock engine making an immensely anticipated debut on the Lollapalooza bill",
    "Sweeping, cinematic instrumental arrangements that trade effortlessly between quiet acoustic guitar lines and roaring rock crescendos",
    "Experience deeply poetic storytelling that functions like a stark, emotional essay on the complex vulnerabilities of youth",
    "The official festival tour run highlighting their widely discussed new studio material under the Nettwerk Music banner",
  ],
  whatToExpect: ["Lush Sound", "Intimate Performance"],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Olivia Dean",
      slug: "olivia-dean",
    },
    {
      name: "Blood Orange",
      slug: "blood-orange",
    },
    {
      name: "Balu Brigada",
      slug: "balu-brigada",
    },
    {
      name: "Destin Conrad",
      slug: "destin-conrad",
    },
  ],
  tracks: [
    {
      spotifyId: "3LQOigrklsh8qQ1eC5xKN7",
      name: "Feel It Coming My Way",
      album: "Feel It Coming My Way",
      duration: "03:44",
    },
    { name: "Winyah", album: "Penelope Road", duration: "" },
    { name: "Daisies", album: "Penelope Road", duration: "" },
    { name: "Backseat", album: "Penelope Road", duration: "" },
  ],
  about:
    "Penelope Road is the alternative folk collective whose combination of stark acoustic traditionalism, rich chamber-pop strings, and heavy indie rock dynamics has earned widespread critical adoration. Signing into the esteemed Nettwerk roster, the group maps a deeply evocative sonic universe centered around personal identity, modern isolation, and landscape poetry. Coming off high-profile co-headlining tour packages, their afternoon performance brings an absolute wall of orchestral sound that fills giant open festival fields with effortless power.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Airbnb",
      day: "Thursday",
      date: "Jul 30",
      startTime: "12:50 PM",
      endTime: "1:30 PM",
    },
  ],
};

const knowGood: Artist = {
  name: "Know Good",
  slug: "know-good",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Trap", "Future Bass", "Electronic"],
  location: { city: "Los Angeles", state: "California", country: "United States" },
  tagline: "Dark, dynamic future bass and trap infused with heavy, genre-defying rhythms.",
  socials: {
    spotify: "https://open.spotify.com/artist/4iogDJBJ2BO2jl8OkPrfpx",
    tiktok: "https://www.tiktok.com/@weareknowgood",
  },
  whySee: [
    "A blistering, high-velocity bass assault bringing intense warehouse electronic energy straight to the mid-day Perry's tent",
    "The product of cousins Tanner and Sylas Morgan executing a flawless live blend of heavy electronic production and sharp verses",
    "Experience a genre-defying performance that pulses with rolling low frequencies woven through alternative rock and hip-hop samples",
    "An absolute, non-stop dance accelerator designed purely to push underground trap culture into massive festival spaces",
  ],
  whatToExpect: ["Bass & Groove", "High-Energy Pacing"],
  bestFor: [
    "Bass & Groove Lovers",
    "Tent & Club Venue Seekers",
    "Dance Floor Seekers",
    "Sound Design & Production Nerds",
  ],
  similarArtists: [
    {
      name: "LYNY",
      slug: "lyny",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178ec6b5f8aa6b2ee962d3de80f",
    },
    {
      name: "MPH",
      slug: "mph",
    },
    {
      name: "Boys Noize",
      slug: "boys-noize",
    },
    {
      name: "AVELLO",
      slug: "avello",
    },
  ],
  tracks: [
    {
      spotifyId: "3EB2capRBxxmTvW4fxYQht",
      name: "Bodies",
      album: "Bodies",
      duration: "01:51",
    },
    { name: "Bulls On Parade - Remix", album: "Bulls On Parade", duration: "" },
    { name: "Dust", album: "Dust", duration: "" },
  ],
  about:
    "Know Good is the project of cousins Tanner and Sylas Morgan, who bonded over a shared family history of musicians before joining forces in 2020. Sylas built a decade of experience DJing nightclubs and bars across the US, while Tanner plays over ten instruments and handles the group's vocals. Their live show blends the intensity of a DJ set with live instrumentation, incorporating drums, guitar, violin, and vocals alongside their trap and future bass productions.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Perry's",
      day: "Thursday",
      date: "Jul 30",
      startTime: "12:45 PM",
      endTime: "1:30 PM",
    },
  ],
};

const elizabethNichols: Artist = {
  name: "Elizabeth Nichols",
  slug: "elizabeth-nichols",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Country", "Country Pop", "Singer-Songwriter"],
  location: { city: "Nashville", state: "Tennessee", country: "United States" },
  tagline: "Grounded, cheekily titled country storytelling built on timeless vocal authority.",
  socials: {
    spotify: "https://open.spotify.com/artist/06cAJQBSPkt3bG7uMoWfmA",
    youtube: "https://www.youtube.com/@elizabethnicholsmusic",
    tiktok: "https://www.tiktok.com/@elizabethnichols",
  },
  whySee: [
    "A rising country standout bringing her highly celebrated Grand Ole Opry debut charisma straight to Grant Park",
    "The official festival tour preview showcasing her debut headlining trek, the I Don't Kiss and Tell, I Kiss and Tour Tour",
    "Razor-sharp country lyrics that trade on absolute emotional honesty, modern wit, and incredible acoustic guitar hooks",
    "A stunning afternoon oasis that pairs traditional acoustic instrumentation with a truly monumental, timeless singing voice",
  ],
  whatToExpect: ["Lyrical Storytelling", "Conversational Delivery"],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Waylon Wyatt",
      slug: "waylon-wyatt",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17851e191838dca7d4729b268a2",
    },
    { name: "Will Swinton", slug: "will-swinton" },
    {
      name: "Cameron Whitcomb",
      slug: "cameron-whitcomb",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178712f78798ce31073c16673c8",
    },
    {
      name: "CMAT",
      slug: "cmat",
    },
  ],
  tracks: [
    {
      spotifyId: "3YQzOzUKb2hcx64XQhmct5",
      name: "I Got A New One",
      album: "I Got A New One",
      duration: "",
    },
    { name: "Kiss & Tell", album: "Kiss & Tell", duration: "" },
    { name: "Stay True", album: "Stay True", duration: "" },
  ],
  about:
    "Elizabeth Nichols is a country singer-songwriter who moved to Nashville in 2024 to pursue music full time, after growing up on a farm near Louisville, Kentucky. Her 2024 single 'I Got A New One' became a viral breakout, racking up tens of millions of streams and earning her a spot as Billboard's Country Rookie of the Month in 2025. She made her Grand Ole Opry debut that same year, and in 2026 she launched her first headlining run, the I Don't Kiss & Tell, I Kiss & Tour.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "BMI",
      day: "Thursday",
      date: "Jul 30",
      startTime: "3:20 PM",
      endTime: "4:00 PM",
    },
  ],
};

const klo: Artist = {
  name: "Klo",
  slug: "klo",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["UK Garage", "Bass House", "Dubstep"],
  location: { city: "Los Angeles", state: "California", country: "United States" },
  tagline:
    "Aggressive hometown trap flips and distorted electronic bass loops designed to shatter tents.",
  socials: {
    spotify: "https://open.spotify.com/artist/2QlABGwVVmqOu8SHMyyZMq",
    tiktok: "https://www.tiktok.com/@klomusicc",
  },
  whySee: [
    "A premier hometown electronic opener firing up the Perry's tent at high noon with punishing underground energy",
    "Experience an elite display of distorted trap steps, high-velocity dubstep rolls, and viral, independent sound designs",
    "A masterclass in technical deck manipulation, heavy syncopated basslines, and chaotic, bass-heavy club paces",
    "The absolute perfect early-day adrenaline booster for ravers looking for heavy bass muscle from the very first minute",
  ],
  whatToExpect: ["Bass & Groove", "High-Production Visuals", "High-Energy Pacing"],
  bestFor: [
    "Hometown & Local Supporters",
    "Bass & Groove Lovers",
    "Tent & Club Venue Seekers",
    "Sound Design & Production Nerds",
  ],
  similarArtists: [
    {
      name: "MPH",
      slug: "mph",
    },
    {
      name: "KETTAMA",
      slug: "kettama",
    },
    {
      name: "Notion",
      slug: "notion",
    },
    {
      name: "Avello",
      slug: "avello",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781a61a6367dead8dac77f1911",
    },
  ],
  tracks: [
    {
      spotifyId: "2Ua1gdg52itBvIelrsR0lj",
      name: "Say Something",
      album: "Say Something",
      duration: "",
    },
    { name: "Vandal", album: "Vandal", duration: "" },
    { name: "Static", album: "Static", duration: "" },
  ],
  about:
    "Klo is an electronic producer and DJ who started DJing in high school in Colorado before studying at the University of Colorado Boulder, where she opened for Galantis and 3LAU at Red Rocks Amphitheatre in 2022. Now based in Los Angeles, her sound blends UK garage, bass house, and 140/dubstep into a heavier strain of bass music, including flips of tracks like EsDeeKid and Fimiguerrero's 'Tartan.' Her 2026 collaboration 'Midas Touch' with Tiaro and Rakjay pushed further into UK bass territory, and her breakout track 'Say Something' remains her most-streamed release.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Perry's",
      day: "Thursday",
      date: "Jul 30",
      startTime: "12:00 PM",
      endTime: "12:30 PM",
    },
  ],
};

const theBraymores: Artist = {
  name: "The Braymores",
  slug: "the-braymores",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Indie Rock", "Alternative Rock", "Folk Rock"],
  location: { city: "Chicago", state: "Illinois", country: "United States" },
  tagline:
    "Hometown indie-rock anthems fusing driving alternative grit with timeless folk-rock poetry.",
  socials: {
    spotify: "https://open.spotify.com/artist/7CrVM33l2Pt32fCxJWGVw6",
    youtube: "https://www.youtube.com/@TheBraymores",
    tiktok: "https://www.tiktok.com/@braymores",
  },
  whySee: [
    "A massive, highly anticipated hometown showcase performance on the BMI stage celebrating their rapid ascent in the indie world",
    "Vocalist Matt Tilles' raw, soaring vocal delivery cutting through a wall of masterfully layered dual-guitar melodies",
    "Experience the live, energetic debuts of new music from their highly anticipated upcoming studio project, When The Lights Went Out",
    "An absolute masterclass in traditional analog band chemistry that treats giant festival fields like intimate local basement clubs",
  ],
  whatToExpect: ["Guitar-Driven Sound", "Lyrical Storytelling"],
  bestFor: ["Hometown & Local Supporters", "Dance Floor Seekers"],
  similarArtists: [
    {
      name: "The Creekers",
      slug: "the-creekers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783bd55f87a9e1be1eb5b1c1e1",
    },
    { name: "Case Oats", slug: "case-oats" },
    { name: "Whatmore", slug: "whatmore" },
    { name: "Cruz Beckham and the Breakers", slug: "cruz-beckham-and-the-breakers" },
  ],
  tracks: [
    {
      spotifyId: "4fg15w0DI1v9O3FFxDQBS5",
      name: "Where Did My Baby Go",
      album: "Who You'd Have Been",
      duration: "",
    },
    {
      spotifyId: "5VfmrSICowc3R0QF5p0F3E",
      name: "Who You'd Have Been",
      album: "Who You'd Have Been",
      duration: "2:19",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02d28700f4d11bb7940925fdbe",
    },
    { name: "When The Lights Went Out", album: "When The Lights Went Out", duration: "" },
  ],
  about:
    "The Braymores are a Chicago indie rock quartet made up of Matt Tilles, Keegan Melaniphy, Russell Oren, and Connor Kohanzo. Tilles and Melaniphy formed the band in 2022 after reconnecting as former high school classmates, taking their name from Braymore Street, where Melaniphy first learned guitar. Following their 2023 debut EP 'Talking to Trees,' their 2024 debut album 'Who You'd Have Been' built a dedicated following, and their 2026 sophomore album 'When The Lights Went Out' arrived after the band signed with Red Light Management and ROAM Artists while remaining independently released.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "BMI",
      day: "Thursday",
      date: "Jul 30",
      startTime: "1:00 PM",
      endTime: "1:40 PM",
    },
  ],
};

const chalk: Artist = {
  name: "Chalk",
  slug: "chalk",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Post-Punk", "Industrial Techno", "Dance-Punk"],
  location: { city: "Belfast", country: "Northern Ireland" },
  tagline:
    "A terrifyingly brilliant, blistering collision of jagged post-punk guitars and industrial techno loops.",
  socials: {
    spotify: "https://open.spotify.com/artist/3qa9pv6B0dmiBVETLQOCpi",
    youtube: "https://www.youtube.com/@chalkband",
    tiktok: "https://www.tiktok.com/@chalk_band",
  },
  whySee: [
    "An absolute dark live wildcard of the evening lineup, delivering an intensely aggressive sonic assault unlike anything else on the bill",
    "Ross Cullen's feral, spoken-word poetic delivery racing over Benedict Goddard's brutally heavy, industrial noise foundations",
    "The official premier American showcase run introducing the towering sonic weight of their debut album statement, Crystalpunk",
    "A blistering, blindingly intense live landscape that completely transforms a festival mosh pit into performance art theater",
  ],
  whatToExpect: [
    "Bass & Groove",
    "Guitar-Driven Sound",
    "Conversational Delivery",
    "High-Production Visuals",
  ],
  bestFor: ["Mosh Pit Lovers"],
  similarArtists: [
    {
      name: "Yungblud",
      slug: "yungblud",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1787c9287712c4355e54c94e0d0",
    },
    {
      name: "Wunderhorse",
      slug: "wunderhorse",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1780e05e549428cb38b2f3e7a60",
    },
    {
      name: "Geese",
      slug: "geese",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bc9546a945c7563a9eb21f3d",
    },
    {
      name: "Not for Radio",
      slug: "not-for-radio",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17859a30bdb69e6a990c22a5d32",
    },
  ],
  tracks: [
    {
      spotifyId: "1nvvS29FuUjex61pTTRgjV",
      name: "Pain",
      album: "Crystalpunk",
      duration: "",
    },
    { name: "Static", album: "Conditions EP", duration: "" },
  ],
  about:
    "Chalk is a Belfast duo made up of Ross Cullen and Benedict Goddard, who met as film students before forming the band around a fusion of post-punk, industrial techno, and dance-punk. The pair won Best Live Act at the 2023 Northern Ireland Music Prize and have opened for IDLES and Fontaines D.C. Their 2026 debut album 'Crystalpunk' reached number one on the UK Dance Albums Chart, earning a five-star review from NME and a spot on The Guardian's best albums of the year so far list.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "BMI",
      day: "Thursday",
      date: "Jul 30",
      startTime: "5:40 PM",
      endTime: "6:20 PM",
    },
  ],
};

const simonGrossmann: Artist = {
  name: "Simon Grossmann",
  slug: "simon-grossmann",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Latin Pop", "Indie Pop", "Singer-Songwriter"],
  location: { city: "Miami", state: "Florida", country: "United States" },
  tagline: "Sun-drenched, melancholic Latin indie folk built around intimate, raspy storytelling.",
  socials: {
    spotify: "https://open.spotify.com/artist/6t38N9HASTn9ca0PIxfReQ",
    youtube: "https://www.youtube.com/channel/UCvcDBIJQAQOEnQ8JS4QUSwA",
    tiktok: "https://www.tiktok.com/@simongrossmannoficial",
  },
  whySee: [
    "Catch an exceptional bilingual lyricist bringing a beautifully warm, beach-side indie pop oasis directly to the afternoon lineup",
    "Grossmann's distinctively raspy, soulful vocal delivery wrapping seamlessly around rich, close-mic'd acoustic arrangements",
    "Experience a cult-favorite singer-songwriter celebrated for crafting laid-back, deeply nostalgic anthems that connect across borders",
    "A gorgeously breezy, rhythmic afternoon set designed perfectly to get a crowd moving smoothly under the open sun",
  ],
  whatToExpect: ["Multilingual Performance"],
  bestFor: ["Lyric & Narrative Obsessives", "Bass & Groove Lovers"],
  similarArtists: [
    {
      name: "Penelope Road",
      slug: "penelope-road",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17852fea332b35d65cd61fa5d39",
    },
    {
      name: "Kingfishr",
      slug: "kingfishr",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17880e8456f3ecc34f93ceebdde",
    },
    {
      name: "Los Retros",
      slug: "los-retros",
    },
    {
      name: "CMAT",
      slug: "cmat",
    },
  ],
  tracks: [
    {
      spotifyId: "2uKYlHL8AVryiFPeQLQQLR",
      name: "Agüitaecoco",
      album: "Ciclo",
      duration: "",
    },
    {
      spotifyId: "131pRjxiSb3iaZavjVutiQ",
      name: "Ciclo",
      album: "Ciclo",
      duration: "2:52",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0221c5098d041f8c753c0cb3a3",
    },
  ],
  about:
    "Simon Grossmann was born in Caracas, Venezuela, and has been based in Miami for the past 15 years. He got his start performing as a summer camp counselor, and his songs spread through campers' word-of-mouth voice notes, leading to an SXSW invite shortly after his 2017 debut album 'Ciclo.' His 2021 album 'Bahía Margarita,' inspired by Venezuela's Isla Margarita, marked his most ambitious project yet, and he's featured on Rawayana's 'Bebé', which won the 2025 Grammy for Best Latin Rock or Alternative Album.",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "BMI",
      day: "Thursday",
      date: "Jul 30",
      startTime: "2:10 PM",
      endTime: "2:50 PM",
    },
  ],
};

const kimTheory: Artist = {
  name: "Kim Theory",
  slug: "kim-theory",
  aboutVerified: true,
  similarArtistsVerified: true,
  socialsVerified: true,
  genres: ["Riot Grrrl", "Punk Rock", "Indie Rock"],
  location: { city: "Los Angeles", state: "California", country: "United States" },
  tagline:
    "Ferocious, teenage riot grrrl punk bringing raw house party audacity to the festival stage.",
  socials: {
    spotify: "https://open.spotify.com/artist/3yyFgRwj9zkv2pZ5CGUsEa",
    youtube: "https://www.youtube.com/@kim_theory_band",
    tiktok: "https://www.tiktok.com/@kim.theory.band",
  },
  whySee: [
    "An absolute lightning-strike opening set from LA's favorite teen punk quartet executing their massive festival debut",
    "Experience the blisteringly raw, live execution of tracks from their brand-new, ferocious sophomore statement, Trophy Wife",
    "A glorious display of untamed, garage-rock distortion that echoes underground legends like Kim Gordon and Bratmobile",
    "Catch a meteoric, fast-rising live force running on pure analog adrenaline before they completely explode globally",
  ],
  whatToExpect: ["Raw Vocal Delivery", "Energetic Mosh Pits", "High-Energy Pacing"],
  bestFor: ["Scene Trend Spotters"],
  similarArtists: [
    {
      name: "Die Spitz",
      slug: "die-spitz",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178221291d43457048ddb8f0f5e",
    },
    {
      name: "Bad Nerves",
      slug: "bad-nerves",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178ca8c5f607e5e4d7c70c4da79",
    },
    {
      name: "Momma",
      slug: "momma",
    },
    {
      name: "Wet Leg",
      slug: "wet-leg",
    },
  ],
  tracks: [
    {
      spotifyId: "5IC4yO8jDY9tOMMAezGWIF",
      name: "He Said She Said",
      album: "Bitch Scene",
      duration: "2:20",
    },
  ],
  about:
    "Kim Theory is an LA teen punk quartet made up of Audrey Cymone, Lula Seifert, Lucy Fraser, and Zoey Su, who take their name from three riot grrrl and alt-rock icons: Kim Gordon, Kim Shattuck, and Kim Deal. Their 2025 debut EP 'Bitch Scene' was produced by Screamers and 45 Grave veteran Paul Roessler and drew coverage from Vogue and CBS LA. After Bratmobile reposted their cover of 'Gimme Brains' and brought them onstage at a sold-out Belasco show, Kim Theory is set to open a Bratmobile date in 2026, following their second EP, 'Trophy Wife.'",
  appearances: [
    {
      id: "1",
      festivalId: "lollapalooza-2026",
      billingTier: "Undercard",
      stage: "Airbnb",
      day: "Thursday",
      date: "Jul 30",
      startTime: "12:00 PM",
      endTime: "12:30 PM",
    },
  ],
};

export const thursdayArtists: Artist[] = [
  lorde,
  johnSummit,
  sombr,
  empireOfTheSun,
  wetLeg,
  worship,
  bloodOrange,
  fiveSecondsOfSummer,
  kettama,
  viagraBoys,
  audreyHobert,
  snowStrippers,
  borisBrejcha,
  parisPaloma,
  littleSimz,
  cmat,
  boysNoize,
  betweenFriends,
  mph,
  amble,
  kingfishr,
  ninajirachi,
  hauteAndFreddy,
  bellaKay,
  marlonFunaki,
  devault,
  sb19,
  eccaVandal,
  badNerves,
  asha_banks,
  faouzia,
  eveningElephants,
  pearlyDrops,
  bixby,
  penelopeRoad,
  knowGood,
  elizabethNichols,
  klo,
  theBraymores,
  chalk,
  simonGrossmann,
  kimTheory,
];
