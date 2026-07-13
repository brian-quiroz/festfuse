// Storage only — do not import this file directly in product code.
// To filter by day, import allArtists from index.ts and filter by appearance.day === "Thursday".
import type { Artist } from "@/app/types/artist";

const lorde: Artist = {
  name: "Lorde",
  slug: "lorde",
  mbid: "8e494408-8620-4c6a-82c2-c2ca4a1e4f12",
  liveVideoId: "KoDFBeyeHYM",
  liveVideoLabel: "Live at Lollapalooza Chile 2026",
  imageUrl: "/artists/heroes/lorde.jpg",
  objectPosition: "center 20%",
  genres: ["Indie Pop", "Electropop", "Art Pop"],
  origin: "Auckland, New Zealand",
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
      name: "MUNA",
      slug: "muna",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a454d2d193b70d07b91a9345",
    },
    {
      name: "Tate McRae",
      slug: "tate-mcrae",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bed8016bd64422793ff3bc75",
    },
    {
      name: "Mother Mother",
      slug: "mother-mother",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fdfbc01d2597633aae65f6b7",
    },
    { name: "Will Swinton", slug: "will-swinton" },
  ],
  tracks: [
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
    {
      spotifyId: "2MvvoeRt8NcOXWESkxWn3g",
      name: "Ribs",
      album: "Pure Heroine",
      duration: "4:18",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02187331e276c898d39764cc98",
    },
  ],
  about:
    "Ella Yelich-O'Connor, performing as Lorde, redefined modern pop music with her 2013 diamond-certified debut 'Pure Heroine' at just sixteen. Her 2017 follow-up 'Melodrama' cemented her as a generation-defining lyricist, celebrated for her devastating narrative precision. Following her sun-drenched acoustic detour 'Solar Power', her highly acclaimed late-2025 alternative studio album 'Virgin' marked a massive return to dark, heavy, and cinematic electronic textures. Performing a brilliant cross-examination of all four distinct eras, her live show balances massive festival-scale singalongs with raw, intimate emotional authority.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Headliner",
    stage: "T-Mobile",
    day: "Thursday",
    date: "Jul 30",
    startTime: "8:30 PM",
    endTime: "10:00 PM",
  },
};

const johnSummit: Artist = {
  name: "John Summit",
  slug: "john-summit",
  mbid: "2547c5e3-314c-4332-981d-f18c902a4086",
  imageUrl: "/artists/heroes/john-summit.jpg",
  objectPosition: "center 20%",
  liveVideoId: "aloPGSlq31Y",
  liveVideoLabel: "Live at Ultra Miami 2026",
  genres: ["House", "Tech House", "Electronic"],
  origin: "Chicago, Illinois",
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
      name: "Omnom",
      slug: "omnom",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a9b9e8e9f12e78d2eb637a6a",
    },
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
    "John Summit emerged from Chicago—the birthplace of house music—and rapidly transformed into a global dance music phenomenon. His performances are legendary masterclasses in tension and release, blending underground tech-house grooves with massive, stadium-sized vocal melodies. Following the global acclaim of his 2024 debut album 'Comfort In Chaos', his brand-new 2026 sophomore studio album 'CTRL ESCAPE' has further elevated his sound, landing him his first official arena tour and cementing his position as the ultimate hometown festival closer.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Headliner",
    stage: "Bud Light",
    day: "Thursday",
    date: "Jul 30",
    startTime: "8:30 PM",
    endTime: "10:00 PM",
  },
};

const sombr: Artist = {
  name: "sombr",
  slug: "sombr",
  mbid: "502cf908-9921-48bc-bf0e-265c881c0156",
  imageUrl: "/artists/heroes/sombr.jpg",
  objectPosition: "center 20%",
  genres: ["Bedroom Pop", "Indie Pop", "Alt-Pop"],
  origin: "New York, USA",
  tagline: "Late nights and young romance, scaled for the mainstage.",
  socials: {
    spotify: "https://open.spotify.com/artist/4G9NDjRyZFDlJKMRL8hx3S",
    youtube: "https://www.youtube.com/@sombr",
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
      name: "Claire Rosinkranz",
      slug: "claire-rosinkranz",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1789fd59f9fc4a311da6437b6a5",
    },
    {
      name: "Ryman",
      slug: "ryman",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783b319d5a8ef036ba5e7fed10",
    },
    {
      name: "Lucy Bedroque",
      slug: "lucy-bedroque",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178100cfd4653979ed518fbf28f",
    },
    {
      name: "Emi Grace",
      slug: "emi-grace",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781d8d8c934c382100d033bb41",
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
    "sombr is the alt-pop phenomenon bringing raw emotional vulnerability to stadium-level heights. He built a massive global audience through his signature style of bedroom-pop intimacy, anchored by heavy, yearning soundscapes and viral, multibillion-stream anthems like 'back to friends'. Following his 2025 debut album 'I Barely Know Her' and a series of massive 2026 single drops like 'Homewrecker' and 'My Body Isn't Ready', sombr's raw, guitar-driven confessions have transformed him from an internet secret into a premier, award-winning festival powerhouse.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "T-Mobile",
    day: "Thursday",
    date: "Jul 30",
    startTime: "6:30 PM",
    endTime: "7:30 PM",
  },
};

const empireOfTheSun: Artist = {
  name: "Empire of the Sun",
  slug: "empire-of-the-sun",
  imageUrl: "/artists/heroes/empire-of-the-sun.jpg",
  genres: ["Electronic", "Synth-Pop", "Indie Pop"],
  origin: "Sydney, Australia",
  tagline: "Theatrical cosmic pop that turns every festival into a spectacle.",
  socials: { spotify: "https://open.spotify.com/artist/67hb7towEyKvt5Z8Bx306c" },
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
      name: "YOASOBI",
      slug: "yoasobi",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178964812dece6096f894a1fe85",
    },
    {
      name: "MUNA",
      slug: "muna",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a454d2d193b70d07b91a9345",
    },
    {
      name: "The xx",
      slug: "the-xx",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783a96db4736ef035e1fcb2516",
    },
    {
      name: "haute & freddy",
      slug: "haute-and-freddy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f24b273d9959e097972d5992",
    },
  ],
  tracks: [
    { name: "Walking on a Dream", album: "Walking on a Dream", duration: "" },
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
    "Empire of the Sun is the Australian electronic duo of Luke Steele and Nick Littlemore, whose debut single 'Walking on a Dream' became one of the defining anthems of the late 2000s. Their sound blends lush synth-pop and art-rock with an extravagant visual world — elaborate costumes, ancient mythology, and cinematic fantasy. Four studio albums deep, from the sun-drenched 2008 debut to 2024's critically acclaimed 'Ask That God', their live show is a full theatrical production that transforms festival stages into otherworldly spectacles.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "Bud Light",
    day: "Thursday",
    date: "Jul 30",
    startTime: "6:45 PM",
    endTime: "7:45 PM",
  },
};

const wetLeg: Artist = {
  name: "Wet Leg",
  slug: "wet-leg",
  imageUrl: "/artists/heroes/wet-leg.jpg",
  objectPosition: "center 30%",
  genres: ["Indie Rock", "Post-Punk"],
  origin: "Isle of Wight, UK",
  tagline: "Dry wit, big riffs, and the best debut in recent memory.",
  socials: { spotify: "https://open.spotify.com/artist/2TwOrUcYnAlIiKmVQkkoSZ" },
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
      name: "Villanelle",
      slug: "villanelle",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781ece1eae58afddb4d3238501",
    },
    {
      name: "Water From Your Eyes",
      slug: "water-from-your-eyes",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b34bc1624b682463e153834a",
    },
    {
      name: "Ink",
      slug: "ink",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b3df8a3980032366a3a040bc",
    },
    {
      name: "Day We Ran",
      slug: "day-we-ran",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17896aa0ad1b8badab28252f80b",
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
    "Wet Leg is the British indie duo of Rhian Teasdale and Hester Chambers, formed on the Isle of Wight and launched into the spotlight with 'Chaise Longue' — a deadpan, guitar-driven viral hit from 2021. Their 2022 self-titled debut won the Grammy for Best Alternative Music Album and established them as one of the most exciting voices in indie rock: sardonic, sharp, and deeply hooky. Their 2025 follow-up 'Moisturizer', produced by Dan Carey, expanded the band to a five-piece and debuted at number one in the UK.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "Allianz",
    day: "Thursday",
    date: "Jul 30",
    startTime: "7:30 PM",
    endTime: "8:30 PM",
  },
};

const worship: Artist = {
  name: "WORSHIP",
  slug: "worship",
  imageUrl: "/artists/heroes/worship.webp",
  genres: ["Drum and Bass", "Electronic"],
  origin: "United Kingdom",
  tagline: "Drum and bass' biggest names, B2B, all night.",
  socials: {},
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
      name: "Empire of the Sun",
      slug: "empire-of-the-sun",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c806f3e714afa21861e20248",
    },
    {
      name: "Avello",
      slug: "avello",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781a61a6367dead8dac77f1911",
    },
    {
      name: "John Summit",
      slug: "john-summit",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17820662b32f3dbabad755dfb53",
    },
    {
      name: "haute & freddy",
      slug: "haute-and-freddy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f24b273d9959e097972d5992",
    },
  ],
  tracks: [
    { name: "Ready to Fly", album: "Evolve", duration: "" },
    { name: "It's That Time - Dimension Remix", album: "It's That Time (Remixes)", duration: "" },
    { name: "Bunker", album: "Sequel", duration: "" },
  ],
  about:
    "Formed as a live collective touring concept in 2020, WORSHIP officially solidified their four-way B2B supergroup format during their massive breakout 2024 North American tour, before graduating to global festival mainstages as a unified recording project in 2026.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "Perry's",
    day: "Thursday",
    date: "Jul 30",
    startTime: "8:30 PM",
    endTime: "9:45 PM",
  },
};

const bloodOrange: Artist = {
  name: "Blood Orange",
  slug: "blood-orange",
  imageUrl: "/artists/heroes/blood-orange.jpg",
  genres: ["R&B", "Soul", "Art Pop"],
  origin: "London, UK",
  tagline: "Genre-fluid R&B from New York's most restlessly creative artist.",
  socials: { spotify: "https://open.spotify.com/artist/6LEeAFiJF8OuPx747e1wxR" },
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
      name: "Jae Stephens",
      slug: "jae-stephens",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17886987e340bcff4b2debb3e84",
    },
    {
      name: "Valencia Grace",
      slug: "valencia-grace",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17825599b11aff6d045b573a13f",
    },
    {
      name: "Sienna Spiro",
      slug: "sienna-spiro",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fb0ab819bbd4502028cd1feb",
    },
    {
      name: "Amber Mark",
      slug: "amber-mark",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a7f15e8167fb79fe64582e96",
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
    "Blood Orange is the project of British-born, New York-based Dev Hynes — a restlessly creative songwriter, producer, and director whose music sits at the intersection of soul, R&B, pop, and art-rock. Since debuting in 2011 with Coastal Grooves, Hynes has built one of the most singular bodies of work in contemporary music, blending lush instrumentation with deeply personal explorations of identity, race, and belonging. His collaborators read like a who's who of the avant-garde, and his 2025 album Essex Honey — featuring Caroline Polachek, Lorde, and Mustafa — added another chapter to a discography that only gets richer.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "Bud Light",
    day: "Thursday",
    date: "Jul 30",
    startTime: "4:45 PM",
    endTime: "5:45 PM",
  },
};

const fiveSecondsOfSummer: Artist = {
  name: "5 Seconds of Summer",
  slug: "5-seconds-of-summer",
  imageUrl: "/artists/heroes/5-seconds-of-summer.png",
  objectPosition: "center 35%",
  genres: ["Pop-Punk", "Alternative Rock"],
  origin: "Sydney, Australia",
  tagline: "Four friends from Sydney who've grown up on stage.",
  socials: { spotify: "https://open.spotify.com/artist/5Rl15oVamLq7FbSb0NNBNy" },
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
      name: "YUNGBLUD",
      slug: "yungblud",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1787c9287712c4355e54c94e0d0",
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
    {
      name: "Day We Ran",
      slug: "day-we-ran",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17896aa0ad1b8badab28252f80b",
    },
  ],
  tracks: [
    {
      spotifyId: "1gugDOSMREb34Xo0c1PlxM",
      name: "She Looks So Perfect",
      album: "5 Seconds of Summer",
      duration: "3:22",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0293432e914046a003229378da",
    },
    {
      spotifyId: "55S2PQgSMYAhgoTCcGCDfw",
      name: "Youngblood",
      album: "Youngblood",
      duration: "3:23",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02240353172d4b7f2feb8a3e2c",
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
    "5 Seconds of Summer — Luke Hemmings, Calum Hood, Ashton Irwin, and Michael Clifford — formed in Sydney in 2011 and have spent over a decade proving that pop-punk energy and genuine songcraft can coexist. What began as a teenage YouTube project evolved into a global phenomenon. Their 2018 album Youngblood redefined their sound with darker, polished pop production, while their 2025 sixth album Everyone's a Star! found them poking wry fun at their own boy-band origins. At festivals, 5SOS are reliably massive — a crowd who has grown up alongside the band and will sing every word.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "T-Mobile",
    day: "Thursday",
    date: "Jul 30",
    startTime: "4:30 PM",
    endTime: "5:30 PM",
  },
};

const kettama: Artist = {
  name: "KETTAMA",
  slug: "kettama",
  imageUrl: "/artists/heroes/kettama.webp",
  genres: ["House", "Speed Garage"],
  origin: "Galway, Ireland",
  tagline: "Big-hearted house anthems built for the floor.",
  socials: { spotify: "https://open.spotify.com/artist/3an9rnsXKPCAMlZgH4A0n4" },
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
      name: "Chace",
      slug: "chace",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f75bb8d64c3d43282ad006f7",
    },
    {
      name: "MPH",
      slug: "mph",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1787e64c67ba432f9223f1acf9f",
    },
  ],
  tracks: [
    { name: "B. O. D. Y.", album: "Bucklyn Bridge", duration: "" },
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
    "KETTAMA is the alias of Evan Campbell, a DJ and producer from Galway, Ireland who has become one of the most exciting figures in contemporary house music. His 2018 breakthrough 'B O D Y' went viral after plays from Mall Grab and Annie Mac, and he has since built a catalog of high-energy bangers rooted in UK garage and speed garage. His 2025 debut album Archangel — released on Steel City Dance Discs and featuring collaborations with DJ Heartstring, Interplanetary Criminal, and Prospa — crystallised his sound into a full-length statement.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Thursday",
    date: "Jul 30",
    startTime: "7:00 PM",
    endTime: "8:00 PM",
  },
};

const viagraBoys: Artist = {
  name: "Viagra Boys",
  slug: "viagra-boys",
  imageUrl: "/artists/heroes/viagra-boys.webp",
  genres: ["Post-Punk", "Garage Rock"],
  origin: "Stockholm, Sweden",
  tagline: "Controlled post-punk chaos, weaponized humor, and raw underground energy.",
  socials: { spotify: "https://open.spotify.com/artist/2nAKP6etu8wXNnezKXgqgg" },
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
      name: "Bad Nerves",
      slug: "bad-nerves",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178ca8c5f607e5e4d7c70c4da79",
    },
    { name: "Cruz Beckham and the Breakers", slug: "cruz-beckham-and-the-breakers" },
    {
      name: "Day We Ran",
      slug: "day-we-ran",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17896aa0ad1b8badab28252f80b",
    },
    {
      name: "Finn Wolfhard",
      slug: "finn-wolfhard",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178926418bb71d5a111e6fbb9eb",
    },
  ],
  tracks: [
    {
      spotifyId: "5aLD8CPaEu3Cj9ZcAqWWA6",
      name: "Sports",
      album: "Street Worms",
      duration: "3:57",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02cd546f0a193d75f8b48a4c72",
    },
    {
      spotifyId: "5gR6gTGOGsg9zcR7JhvwQz",
      name: "Man Made of Meat",
      album: "viagr aboys",
      duration: "3:09",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02bf26b3f697a7d4a039a6e3a9",
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
    "Viagra Boys are a Swedish art-punk outfit led by frontman Sebastian Murphy, celebrated for their feral live energy, biting social satire, and completely irreverent attitude. Following a string of critically adored releases including 'Street Worms' (2018) and 'Cave World' (2022), the band launched their own independent imprint, Shrimptech Enterprises, to drop their fourth studio album 'viagr aboys' in 2025. Shifting their focus from acid-laced external commentary to absurd inward reflections, their live set is a relentless, saxophone-fueled masterclass in theatrical punk rock mayhem.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Thursday",
    date: "Jul 30",
    startTime: "9:00 PM",
    endTime: "10:00 PM",
  },
};

const audreyHobert: Artist = {
  name: "Audrey Hobert",
  slug: "audrey-hobert",
  imageUrl: "/artists/heroes/audrey-hobert.avif",
  genres: ["Indie Pop", "Singer-Songwriter"],
  origin: "Los Angeles, California",
  tagline:
    "Witty, wordy stream-of-consciousness pop music that plays out like voice memos from your funniest friend.",
  socials: { spotify: "https://open.spotify.com/artist/4N0TAwz9vhnQtjCqS65aKS" },
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
      name: "Next of Kin",
      slug: "next-of-kin",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178cbe19203158c6eae4ed0504a",
    },
    { name: "Stella Lefty", slug: "stella-lefty" },
  ],
  tracks: [
    { name: "Sue Me", album: "Who's the Clown?", duration: "" },
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
    "Audrey Hobert is a Los Angeles-based singer-songwriter who first captured global pop attention co-writing breakout hits on Gracie Abrams' 2024 album 'The Secret of Us'. Her 2025 RCA Records debut album 'Who's the Clown?' established her as a refreshingly sharp, self-aware solo force, weaponizing hyper-specific mid-twenties anxieties into wonderfully playful pop anthems. Following a massive run on television and the extension of her acclaimed 'Staircase to Stardom' tour, her live set delivers painfully honest lyricism backed by elite, high-energy pop instrumentation.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Thursday",
    date: "Jul 30",
    startTime: "5:30 PM",
    endTime: "6:30 PM",
  },
};

const snowStrippers: Artist = {
  name: "Snow Strippers",
  slug: "snow-strippers",
  imageUrl: "/artists/heroes/snow-strippers.jpg",
  genres: ["Witch House", "Electroclash", "Electronic"],
  origin: "Detroit, Michigan",
  tagline: "Frenetic, blown-out electroclash born in the internet underground.",
  socials: { spotify: "https://open.spotify.com/artist/6TsAG8Ve1icEC8ydeHm3C8" },
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
      name: "Empire of the Sun",
      slug: "empire-of-the-sun",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c806f3e714afa21861e20248",
    },
    {
      name: "haute & freddy",
      slug: "haute-and-freddy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f24b273d9959e097972d5992",
    },
    {
      name: "John Summit",
      slug: "john-summit",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17820662b32f3dbabad755dfb53",
    },
    {
      name: "Avello",
      slug: "avello",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781a61a6367dead8dac77f1911",
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
    "Snow Strippers is the Detroit-based electronic duo of Tatiana Schwaninger and Graham Perez, who ignited a global internet underground revival by fusing the gritty textures of early 2010s witch house with the maximalist velocity of electroclash. Operating out of the Surf Gang rap collective orbit alongside producers like evilgiane, their raw, distortion-heavy sound has earned them high-profile collaborations with Lil Uzi Vert. Live, they completely strip away the typical EDM polish, transforming the stage into a chaotic, adrenaline-fueled new rave paradise.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Thursday",
    date: "Jul 30",
    startTime: "7:45 PM",
    endTime: "8:30 PM",
  },
};

const borisBrejcha: Artist = {
  name: "Boris Brejcha",
  slug: "boris-brejcha",
  imageUrl: "/artists/heroes/boris-brejcha.jpg",
  genres: ["High-Tech Minimal", "Techno"],
  origin: "Ludwigshafen, Germany",
  tagline: "The masked maestro of hypnotic, stadium-scale high-tech minimal.",
  socials: { spotify: "https://open.spotify.com/artist/6caPJFLv1wesmM7gwK1ACy" },
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
  ],
  tracks: [
    { name: "Gravity", album: "Space Diver", duration: "" },
    { name: "Purple Noise", album: "Feuerfalter Part02", duration: "" },
    { name: "Spacewalker", album: "Space Diver", duration: "" },
  ],
  about:
    "Boris Brejcha is a legendary German DJ and producer who has spent two decades operating at the vanguard of electronic music, single-handedly conceptualizing the 'High-Tech Minimal' sub-genre. Characterized by intricate percussive architecture, soaring cinematic synth melodies, and an unyielding techno pulse, Brejcha commands stages across the globe wearing his signature carnival mask. Backed by an extensive catalog of dark masterpiece albums like 'Space Diver', his live performances are masterfully calculated, high-production journeys tailored for massive electronic crowds.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Thursday",
    date: "Jul 30",
    startTime: "5:45 PM",
    endTime: "6:45 PM",
  },
};

const parisPaloma: Artist = {
  name: "Paris Paloma",
  slug: "paris-paloma",
  imageUrl: "/artists/heroes/paris-paloma.webp",
  objectPosition: "center 40%",
  genres: ["Dark Folk", "Indie Pop", "Chamber Pop"],
  origin: "Derbyshire, England",
  tagline: "Visceral, mythological dark folk built on fierce emotional catharsis.",
  socials: { spotify: "https://open.spotify.com/artist/2EXpthNgSeTDeX8nGwxppp" },
  whySee: [
    "A deeply theatrical, folklore-inspired performance that acts as a beautifully dark, haunting oasis on the line-up",
    "Experience the raw, bone-chilling crowd energy during her massive, viral feminist anthem 'labor' live in a festival setting",
    "Stunning, rich chamber-pop arrangements tracking complex themes of grief, bodily autonomy, and mythological fury",
    "The official festival tour run introducing her highly anticipated, deeply personal debut studio statement, Cacophony",
  ],
  whatToExpect: ["Technical Vocal Range", "Crowd Atmosphere", "Dark Mood Visuals"],
  bestFor: ["Lyric & Narrative Obsessives"],
  similarArtists: [
    { name: "Porch Light", slug: "porch-light" },
    {
      name: "Ella Boh",
      slug: "ella-boh",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f3ca12f1b323dbb7027d78dc",
    },
    {
      name: "Whitney Whitney",
      slug: "whitney-whitney",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b9b32a1845c72390fc48c28c",
    },
    {
      name: "Next of Kin",
      slug: "next-of-kin",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178cbe19203158c6eae4ed0504a",
    },
  ],
  tracks: [
    { name: "labor", album: "Cacophony", duration: "" },
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
    "Paris Paloma is a Derbyshire-born singer-songwriter whose brilliant blend of dark indie-folk, baroque pop, and visceral storytelling has garnered a deeply passionate global community. Writing with the precision of a classical poet, Paloma weaponizes themes of historical mythology, ancestral fury, and deeply raw interpersonal grief into powerful sonic statements. Her breakout platinum single 'labor' became a massive international rallying cry, establishing her debut full-length album 'Cacophony' as a landmark showcase of gothic, jaw-dropping vocal authority.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Thursday",
    date: "Jul 30",
    startTime: "3:45 PM",
    endTime: "4:45 PM",
  },
};

const littleSimz: Artist = {
  name: "Little Simz",
  slug: "little-simz",
  imageUrl: "/artists/heroes/little-simz.jpg",
  objectPosition: "center 0%",
  genres: ["Hip-Hop", "Conscious Rap", "Neo-Soul"],
  origin: "London, England",
  tagline: "One of the absolute greatest lyricists alive delivering pure live mastery.",
  socials: { spotify: "https://open.spotify.com/artist/6eXZu6O7nAUA5z6vLV8NKI" },
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
      name: "Mustard",
      slug: "mustard",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17854406b7007a449aeaac06c44",
    },
    {
      name: "Destin Conrad",
      slug: "destin-conrad",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786be69fc54978eb83fa10167c",
    },
    {
      name: "Khamari",
      slug: "khamari",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786921bdf2ddc6e84970fd172e",
    },
    {
      name: "Lil Uzi Vert",
      slug: "lil-uzi-vert",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17862c272d76220f2e9dad56704",
    },
  ],
  tracks: [
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
    "Little Simz is the moniker of Simbiatu Ajikawo, a London-born rapper, songwriter, and actress whose uncompromising independent path has established her as one of hip-hop's most revered modern vanguards. Following the widespread critical masterpiece of 'Sometimes I Might Be Introvert'—which secured her a Mercury Prize—her evolution into 2024's club-ready electronic textures on 'Drop 7' showcased a restlessly creative artist who refuses to sit in one lane. Backed by a full live jazz-soul band, her live set is a deeply emotional, monumental tour de force of narrative performance.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Bud Light",
    day: "Friday",
    date: "Jul 31",
    startTime: "6:30 PM",
    endTime: "7:30 PM",
  },
};

const cmat: Artist = {
  name: "CMAT",
  slug: "cmat",
  imageUrl: "/artists/heroes/cmat.webp",
  genres: ["Indie Pop", "Country Pop", "Alternative Folk"],
  origin: "Dublin, Ireland",
  tagline: "High-camp pop anthems matched with devastating, razor-sharp heartbreak storytelling.",
  socials: { spotify: "https://open.spotify.com/artist/3VBNIRx1LxVdRqOiPgkLwv" },
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
    { name: "Will Swinton", slug: "will-swinton" },
    {
      name: "Next of Kin",
      slug: "next-of-kin",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178cbe19203158c6eae4ed0504a",
    },
    {
      name: "Bella Kay",
      slug: "bella-kay",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783d7290ae36694e14b0655753",
    },
    {
      name: "Los Retros",
      slug: "los-retros",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1789d019dcbc94351d723314b37",
    },
  ],
  tracks: [
    { name: "I Don't Really Care For You", album: "If My Wife New I Was Dead", duration: "" },
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
    "CMAT is the artistic project of Dublin-born singer-songwriter Ciara Mary-Alice Thompson, whose unique blend of classic country songwriting tropes, glittering indie pop hooks, and postmodern humor has earned her global critical adoration. Drawing sharp thematic parallels between the grand emotional isolation of Nashville legends and modern millennial anxieties, her Brit-nominated sophomore album 'Crazymad, For Me' became a landmark breakout statement. Live, CMAT strips away all traditional indie rock solemnity, deploying an elite theatrical performance that is equal parts stadium-sized tragedy and celebratory line-dance party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Friday",
    date: "Jul 31",
    startTime: "2:30 PM",
    endTime: "3:30 PM",
  },
};

const boysNoize: Artist = {
  name: "Boys Noize",
  slug: "boys-noize",
  imageUrl: "/artists/heroes/boys-noize.jpg",
  objectPosition: "center 30%",
  genres: ["Electro House", "Techno", "Industrial Electronic"],
  origin: "Berlin, Germany",
  tagline:
    "Industrial Berlin techno and distorted punk energy designed to shatter warehouse dance floors.",
  socials: { spotify: "https://open.spotify.com/artist/62k5LKMhymqlDNo2DWOvvv" },
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
  ],
  tracks: [
    {
      spotifyId: "2VJS0kuE7ozSYOWJpqlLhR",
      name: "XTC",
      album: "Out of the Black",
      duration: "4:38",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02df3f49516400836a55d5a5f4",
    },
    { name: "Fine Baseline", album: "Mayday", duration: "" },
    { name: "Chamber", album: "Strictly Raw Vol. 2", duration: "" },
  ],
  about:
    "Alex Ridha, performing under the iconic moniker Boys Noize, has spent two decades standing as one of global electronic music's most influential and restlessly creative underground forces. Emerging from the anarchic Berlin club network, his raw, distortion-heavy brand of electro house and techno completely rewrote the rules of crossover electronic music. From running his legendary Boysnoize Records label to producing for avant-garde heavyweights like Arca, Frank Ocean, and Skrillex, his live festival environments remain chaotic, blindingly strobe-lit masterclasses in pure analog club energy.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Friday",
    date: "Jul 31",
    startTime: "7:15 PM",
    endTime: "8:15 PM",
  },
};

const betweenFriends: Artist = {
  name: "Between Friends",
  slug: "between-friends",
  imageUrl: "/artists/heroes/between-friends.webp",
  objectPosition: "center 20%",
  genres: ["Indie Pop", "Bedroom Pop", "Neo-Psychedelia"],
  origin: "Los Angeles, California",
  tagline: "Glitchy, neon-drenched notebook bedroom pop for late-night drives under palm trees.",
  socials: { spotify: "https://open.spotify.com/artist/2HkSsS8O2U2gPhnCGVN5vn" },
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
      name: "Love Spells",
      slug: "love-spells",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b33be717b74e15b9f5c235f2",
    },
    {
      name: "sombr",
      slug: "sombr",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17878edaa6468cae153565c2c97",
    },
    {
      name: "Beabadoobee",
      slug: "beabadoobee",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783a41a62e7193703d29d30a9a",
    },
    {
      name: "Claire Rosinkranz",
      slug: "claire-rosinkranz",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1789fd59f9fc4a311da6437b6a5",
    },
  ],
  tracks: [
    { name: "Affection", album: "wejustneedtobalone", duration: "" },
    { name: "iloveyou", album: "I Love My Friends", duration: "" },
    { name: "Bruise", album: "I Love My Friends", duration: "" },
  ],
  about:
    "Between Friends is the Los Angeles-based alternative pop project of siblings Savannah and Brandon Hudson, who forged an intense internet-cult community through their meticulous blend of lo-fi bedroom recordings and glossy garage pop. Originally breaking out with their hazy bedroom anthem 'Affection', the duo expanded their sonic identity into a full-length statement on 'I Love My Friends', capturing the precise, hyper-aesthetic textures of Gen-Z youth culture. Live, their project functions as an intimate, neon-lit cinematic diary entry wrapped in warm, driving synthesizers.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Friday",
    date: "Jul 31",
    startTime: "4:00 PM",
    endTime: "4:45 PM",
  },
};

const mph: Artist = {
  name: "MPH",
  slug: "mph",
  genres: ["UK Garage", "Bassline", "House"],
  origin: "Canterbury, England",
  tagline:
    "High-octane, hyper-precise UK garage driving the modern electronic underground dance revival.",
  socials: { spotify: "https://open.spotify.com/artist/62SCu33InHVq97VaWw3eof" },
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
      name: "Chace",
      slug: "chace",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f75bb8d64c3d43282ad006f7",
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
  ],
  tracks: [
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
    "MPH is the artistic project of Canterbury-born DJ and electronic producer CJ Booth, who has rapidly solidified his position as one of the modern era's most prolific and essential UK Garage forces. Blending the nostalgic, soulful swing of late-90s garage with the crushing, heavy bassline weight of contemporary underground club culture, his landmark full-length project 'Refraction' earned widespread institutional praise. Behind the decks, MPH delivers a technically flawless, high-tempo masterclass in rhythm manipulation that sets the exact standard for modern club music.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Friday",
    date: "Jul 31",
    startTime: "1:45 PM",
    endTime: "2:45 PM",
  },
};

const amble: Artist = {
  name: "Amble",
  slug: "amble",
  genres: ["Contemporary Folk", "Alternative Folk", "Traditional Irish Folk"],
  origin: "Midlands, Ireland",
  tagline:
    "Stripped-back, deeply nostalgic three-piece contemporary folk rooted in timeless storytelling.",
  socials: { spotify: "https://open.spotify.com/artist/5ZC7GPz5h9zkEfjZBUDNzI" },
  whySee: [
    "Ireland's fastest-rising contemporary folk phenomena bringing an intimate, breathtakingly acoustic experience to Grant Park",
    "Three-part vocal harmonies of jaw-dropping precision singing gorgeous, poetic modern hymns of ordinary Irish life",
    "A stunningly quiet, emotionally enormous oasis on the bill that commands absolute, pin-drop silence from a crowd",
    "The premier festival tour run showcasing the rich, stark instrumentation of their highly celebrated studio catalog",
  ],
  whatToExpect: ["Live Band Performance", "Lyrical Storytelling", "Crowd Atmosphere"],
  bestFor: ["Lyric & Narrative Obsessives"],
  similarArtists: [
    { name: "Will Swinton", slug: "will-swinton" },
    {
      name: "Kingfishr",
      slug: "kingfishr",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17880e8456f3ecc34f93ceebdde",
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
    { name: "Mariner Boy", album: "The Name, The Trade and the Mirror", duration: "" },
    { name: "Tonylion", album: "Amble EP", duration: "" },
    { name: "Lonely Island", album: "The Name, The Trade and the Mirror", duration: "" },
  ],
  about:
    "Amble is the contemporary Irish folk three-piece consisting of Robbie Cunningham, Oisin McCaffrey, and Ross McNerney, whose minimalist, acoustic-led soundscapes have sparked a massive international folk resurgence. Rooted in the stark, timeless tradition of legendary acoustic storytellers, the trio pairs hauntingly beautiful acoustic guitars and bouzouki instrumentation with deeply moving tales of heartbreak, labor, and heritage. On the heels of their celebrated studio milestone 'The Name, The Trade and the Mirror', their live show translates raw, unadorned intimacy onto festival scales.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Friday",
    date: "Jul 31",
    startTime: "12:45 PM",
    endTime: "1:30 PM",
  },
};

const kingfishr: Artist = {
  name: "Kingfishr",
  slug: "kingfishr",
  genres: ["Indie Folk", "Alternative Folk"],
  origin: "Limerick, Ireland",
  tagline: "Epic, stadium-scale acoustic indie folk built on soaring cinematic poetry.",
  socials: { spotify: "https://open.spotify.com/artist/6c2qQFq3xfxFJndX6wSe4f" },
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
      name: "Elizabeth Nichols",
      slug: "elizabeth-nichols",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786a6686aacc775a0807c37cd8",
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
      name: "Penelope Road",
      slug: "penelope-road",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17852fea332b35d65cd61fa5d39",
    },
  ],
  tracks: [
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
    "Kingfishr is the Limerick-born alternative folk project consisting of Eddie Keogh, Eoghan McGrath, and Eoin Fitzgibbon, who emerged from their university dorms to become one of European acoustic music's most staggeringly successful breakout vanguards. Pairing the raw, structural weight of stadium-scale indie rock with traditional Irish folk textures, the trio writes sweeping tales of pride, identity, and interpersonal grief. Behind the instruments, their performance delivers an immediate, cinematic wall of sound that translates perfectly to monumental festival stages.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Thursday",
    date: "Jul 30",
    startTime: "1:45 PM",
    endTime: "2:45 PM",
  },
};

const ninajirachi: Artist = {
  name: "Ninajirachi",
  slug: "ninajirachi",
  imageUrl: "/artists/heroes/ninajirachi.webp",
  genres: ["Hyperpop", "Club", "Electronic"],
  origin: "Central Coast, Australia",
  tagline: "Glitchy, hyper-futuristic club music delivered at terminal velocity.",
  socials: { spotify: "https://open.spotify.com/artist/3MekbRujJg5VZThubOlrkR" },
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
      name: "bradeazy",
      slug: "bradeazy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781c9da6b48887663d291b8df4",
    },
    {
      name: "Frost Children",
      slug: "frost-children",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17851daae4f55980f7ff0ea8c30",
    },
    { name: "WORSHIP", slug: "worship" },
    {
      name: "YOASOBI",
      slug: "yoasobi",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178964812dece6096f894a1fe85",
    },
  ],
  tracks: [
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
    "Nina Wilson, performing under the moniker Ninajirachi, has spent the modern electronic era standing as one of the global underground's most fiercely creative and technologically precise sound designers. Emerging from Australia's left-field club network, her hyper-stylized brand of dance music completely shatters traditional genre boundaries by fusing pristine pop melodies with dark, abrasive percussive patterns. From running her own independent label initiatives to producing for avant-garde heavyweights, her live festival sets are relentless, adrenaline-fueled journeys into tomorrow's rave landscape.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Thursday",
    date: "Jul 30",
    startTime: "4:00 PM",
    endTime: "4:45 PM",
  },
};

const hauteAndFreddy: Artist = {
  name: "haute & freddy",
  slug: "haute-and-freddy",
  imageUrl: "/artists/heroes/haute-and-freddy.webp",
  genres: ["Dance Pop", "House", "Electronic"],
  origin: "Paris, France",
  tagline: "Sleek, runway-ready French electronic pop built for the open air.",
  socials: { spotify: "https://open.spotify.com/artist/66T34XqGkEWbzKWALSBDuR" },
  whySee: [
    "The absolute definition of modern French electronic polish making a high-visibility crossover statement on the mainstage",
    "A perfectly synchronized live-electronic set that balances deep, driving baseline grooves with incredibly infectious vocal hooks",
    "Experience a chic, hyper-stylized dance floor environment that translates European underground club ethos onto an enormous scale",
    "The ultimate high-energy afternoon catalyst designed perfectly to unify a massive, moving festival crowd under the sun",
  ],
  whatToExpect: ["Production Style Approach", "Cinematic Visuals", "Synth & Atmospheric"],
  bestFor: ["Dance Floor Seekers", "Bass & Groove Lovers"],
  similarArtists: [
    { name: "DJ Trixie Mattel", slug: "dj-trixie-mattel" },
    {
      name: "Omnom",
      slug: "omnom",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a9b9e8e9f12e78d2eb637a6a",
    },
    {
      name: "Disco Lines",
      slug: "disco-lines",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178965c9bf81cfe9ca329b8a5c7",
    },
    {
      name: "aespa",
      slug: "aespa",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178053bbb910dda6d4ab0618b8b",
    },
  ],
  tracks: [
    { name: "U Want", album: "haute & freddy", duration: "" },
    { name: "Late Night", album: "Late Night", duration: "" },
    { name: "Paris Express", album: "Rouge", duration: "" },
  ],
  about:
    "haute & freddy is the Paris-born electronic collaboration whose meticulous combination of classic French house loops, sleek tech-house grooves, and high-fashion aesthetics has captured global dance floor attention. Originally breaking out of the underground fashion show circuit, the duo rapidly scaled their project into a major recording statement by blending timeless analog synthesizers with modern pop precision. Live, their project strips away unnecessary club pretension, delivering a beautifully crisp, high-tempo celebration of modern European dance design.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "T-Mobile",
    day: "Thursday",
    date: "Jul 30",
    startTime: "2:30 PM",
    endTime: "3:30 PM",
  },
};

const bellaKay: Artist = {
  name: "Bella Kay",
  slug: "bella-kay",
  genres: ["Alt-Pop", "Dark Pop", "Indie Pop"],
  origin: "Los Angeles, California",
  tagline: "Vulnerable, shadow-drenched bedroom alt-pop for late-night overthinkers.",
  socials: { spotify: "https://open.spotify.com/artist/4Z8MrrKMBHMPa8d04Ivur8" },
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
      name: "Claire Rosinkranz",
      slug: "claire-rosinkranz",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1789fd59f9fc4a311da6437b6a5",
    },
    {
      name: "Balu Brigada",
      slug: "balu-brigada",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178871bccd59b468f93c4650066",
    },
    {
      name: "Ivri",
      slug: "ivri",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178db6265ab7c2b7e2a156c99ae",
    },
    {
      name: "Ryman",
      slug: "ryman",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783b319d5a8ef036ba5e7fed10",
    },
  ],
  tracks: [
    { name: "Overthinking", album: "Shadows", duration: "" },
    { name: "Ghost Town", album: "Shadows", duration: "" },
    { name: "Bleach", album: "Bleach", duration: "" },
  ],
  about:
    "Bella Kay is a Los Angeles-based singer-songwriter who built an intensely passionate internet community through her hyper-specific, diaristic brand of dark bedroom pop. Rooted in the emotional intimacy of close-mic'd acoustic elements but filtered through rich, brooding alternative electronic arrangements, her tracks explore the vulnerabilities of youth culture with profound honesty. Operating completely independent of major label machinery, her live festival execution transforms sprawling fields into intimate, shared listening sessions.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Thursday",
    date: "Jul 30",
    startTime: "4:30 PM",
    endTime: "5:10 PM",
  },
};

const marlonFunaki: Artist = {
  name: "Marlon Funaki",
  slug: "marlon-funaki",
  genres: ["Indie Rock", "Surf Rock", "Blues Rock"],
  origin: "Orange County, California",
  tagline: "Fuzzed-out surf rock grit married to blistering, soulful blues guitar mastery.",
  socials: { spotify: "https://open.spotify.com/artist/3BcSXip92N0HwJRA9sVmP6" },
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
    { name: "Summering", album: "Marlon Funaki", duration: "" },
    { name: "Prone", album: "Prone", duration: "" },
    { name: "Escapism", album: "Escapism", duration: "" },
  ],
  about:
    "Marlon Funaki is an Orange County-born singer, songwriter, and guitar technician whose brilliant blend of nostalgic surf rock distortion, raw garage indie, and virtuosic blues patterns has earned him a devoted independent following. Operating with the physical vocabulary of a seasoned road warrior, Funaki commands the stage with an extraordinary instrumental authority that feels completely analog. Backed by a relentless power-trio setup, his live performances are thrilling reminders of pure, raw, guitar-driven adrenaline.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Thursday",
    date: "Jul 30",
    startTime: "1:50 PM",
    endTime: "2:30 PM",
  },
};

const devault: Artist = {
  name: "Devault",
  slug: "devault",
  imageUrl: "/artists/heroes/devault.jpg",
  genres: ["Industrial House", "Dark Techno", "Electronic"],
  origin: "Orange County, California",
  tagline: "Dark, cinematic industrial techno that turns early evenings into warehouse raves.",
  socials: { spotify: "https://open.spotify.com/artist/1VBAKMui4zm5MnBWNn3NbL" },
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
    { name: "KLO", slug: "klo" },
  ],
  tracks: [
    { name: "Runway", album: "Stay", duration: "" },
    { name: "Between The Lines", album: "Between The Lines", duration: "" },
    { name: "Strom", album: "Strom", duration: "" },
  ],
  about:
    "Sage DeVault, operating under the singular moniker Devault, has carved out an exceptionally prominent space as electronic music's premier merchant of cinematic darkness. Blending the heavy, metallic weight of industrial house with the nostalgic, cold textures of late-80s new wave and gothic techno, his meticulously engineered tracks possess a distinct narrative tension. Highly sought after for his official atmospheric remixes for major pop icons, his live festival environments function as blindingly intense, strobe-lit audio-visual spectacles.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Thursday",
    date: "Jul 30",
    startTime: "7:45 PM",
    endTime: "8:30 PM",
  },
};

const sb19: Artist = {
  name: "SB19",
  slug: "sb19",
  genres: ["P-Pop", "Pop", "Dance Pop"],
  origin: "Manila, Philippines",
  tagline:
    "The historic Kings of P-pop delivering flawless, hyper-synchronized vocal and dance mastery.",
  socials: { spotify: "https://open.spotify.com/artist/3g7vYcdDXnqnDKYFwqXBJP" },
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
    "SB19 is the historic, self-managed Filipino boy band consisting of Pablo, Josh, Stell, Ken, and Justin, whose fiercely independent path and world-class performance training launched them into global pop prominence. Breaking barriers as the first Southeast Asian act nominated at the Billboard Music Awards, the quintet completely re-wrote the rules of the domestic music landscape with their multi-platinum, genre-fluid execution. Fresh off their massive trilogy concert finales, their highly anticipated afternoon performance brings an absolute masterclass in live theatrical vocal execution and intense, unbroken pop velocity.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Thursday",
    date: "Jul 30",
    startTime: "3:30 PM",
    endTime: "4:30 PM",
  },
};

const eccaVandal: Artist = {
  name: "Ecca Vandal",
  slug: "ecca-vandal",
  genres: ["Punk Rock", "Alternative Hip-Hop", "Electronic Rock"],
  origin: "Melbourne, Australia",
  tagline: "A ferocious, genre-shattering riot of heavy punk riffs and abrasive hip-hop grit.",
  socials: { spotify: "https://open.spotify.com/artist/0NhKCHTPG7Sz62S3zxV1Cf" },
  whySee: [
    "The absolute ultimate alternative live wildcard of the afternoon, delivering an intensely aggressive sonic collision of punk and rap",
    "Ecca Vandal's magnetic, completely untamed stage presence that commands absolute mosh-pit chaos from a crowd",
    "Experience a brilliant, boundary-pushing soundscape that channels the raw energy of Beastie Boys and the heavy distortion of electronic rock",
    "Blistering live vocal delivery backed by razor-sharp instrumentation designed purely to shock and awaken the senses",
  ],
  whatToExpect: ["Guitar-Driven Sound", "Energetic Mosh Pits"],
  bestFor: ["Mosh Pit Lovers"],
  similarArtists: [
    { name: "Sunshine", slug: "sunshine" },
    {
      name: "Fakemink",
      slug: "fakemink",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fea7ad1b3bc4a7f94234bd1c",
    },
    { name: "After", slug: "after" },
    {
      name: "Kim Theory",
      slug: "kim-theory",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178aeb5f081b1d106a80f4a67a6",
    },
  ],
  tracks: [
    { name: "Broke", album: "Ecca Vandal", duration: "" },
    { name: "Future You", album: "Ecca Vandal", duration: "" },
    { name: "Pricey", album: "Ecca Vandal", duration: "" },
  ],
  about:
    "Ecca Vandal is the South African-born, Melbourne-raised alternative powerhouse whose unapologetic fusion of aggressive post-punk instrumentation, alternative hip-hop lyricism, and abrasive electronic sub-bass has earned her critical acclaim from rock purists globally. Defying strict genre boxes, she crafts a high-tension sonic universe built around raw, confrontational storytelling and deeply political subtext. Backed by a relentless live touring setup, her afternoon performance stands as a fierce, adrenaline-fueled masterclass in pure, unadulterated live counter-culture showmanship.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Thursday",
    date: "Jul 30",
    startTime: "2:50 PM",
    endTime: "3:30 PM",
  },
};

const badNerves: Artist = {
  name: "Bad Nerves",
  slug: "bad-nerves",
  genres: ["Power Pop", "Garage Rock", "Punk Rock"],
  origin: "London, England",
  tagline:
    "Hyper-speed, distortion-soaked power pop garage rock delivered like a lightning strike.",
  socials: { spotify: "https://open.spotify.com/artist/7IPyXY4ZHkuvQY1ny8TnMQ" },
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
      name: "Kim Theory",
      slug: "kim-theory",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178aeb5f081b1d106a80f4a67a6",
    },
    {
      name: "Die Spitz",
      slug: "die-spitz",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178221291d43457048ddb8f0f5e",
    },
    {
      name: "Ecca Vandal",
      slug: "ecca-vandal",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17840f9fe3514200979e9aed6c8",
    },
    {
      name: "Viagra Boys",
      slug: "viagra-boys",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1789c1e2f2acd631e30c6ad153e",
    },
  ],
  tracks: [
    { name: "Can't Be Happy", album: "Bad Nerves", duration: "" },
    {
      spotifyId: "3AL0jiB2Ix2u6x1MKMNcQv",
      name: "Baby Drummer",
      album: "Bad Nerves",
      duration: "2:20",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e026637880b7e0b7b5e63164976",
    },
    {
      spotifyId: "14Rut7t4hyhWblw9O8qrt1",
      name: "Antidote",
      album: "Still Nervous",
      duration: "1:48",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e022d7099fc381829b61795df23",
    },
  ],
  about:
    "Bad Nerves is the London-born five-piece rock outfit whose hyper-speed blend of distorted garage punk grit and glittering, power-pop melodic hooks has earned them a reputation as one of the most exciting live rock bands in the UK. Writing music that operates with the urgent pacing of a racing pulse, the band relies on incredibly crisp dual-guitar layers and rapid-fire lyricism. Coming off massive, widely talked-about international support slots, their early afternoon performance provides a thrilling, beautifully raw antidote to overprocessed festival pop.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Thursday",
    date: "Jul 30",
    startTime: "1:30 PM",
    endTime: "2:30 PM",
  },
};

const asha_banks: Artist = {
  name: "Asha Banks",
  slug: "asha-banks",
  genres: ["Indie Pop", "Singer-Songwriter"],
  origin: "London, England",
  tagline: "Stunning, whisper-close confessional indie pop tracking the messy textures of youth.",
  socials: { spotify: "https://open.spotify.com/artist/2uDFxcjRQnf8mjFwfqieSw" },
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
    { name: "Porch Light", slug: "porch-light" },
    {
      name: "Audrey Hobert",
      slug: "audrey-hobert",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1784fc78e354b19324810f1e933",
    },
    {
      name: "Next of Kin",
      slug: "next-of-kin",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178cbe19203158c6eae4ed0504a",
    },
    {
      name: "Whitney Whitney",
      slug: "whitney-whitney",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b9b32a1845c72390fc48c28c",
    },
  ],
  tracks: [
    { name: "Something In Between", album: "Something In Between", duration: "" },
    { name: "I'm Just A Ghost", album: "Something In Between", duration: "" },
    { name: "Too Old For This", album: "Something In Between", duration: "" },
  ],
  about:
    "Asha Banks is a London-born singer-songwriter who built an intensely passionate global community through her hyper-specific, beautifully diaristic brand of contemporary indie pop. Rooted in the emotional intimacy of close-mic'd acoustic infrastructure but elevated by bright, modern pop production, her tracks dissect the anxieties and shifting dynamics of young adulthood with profound precision. Handpicked for a massive global breakout tour cycle, her early mainstage set transforms a sprawling festival lawn into an intimate, shared bedroom listening session.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "T-Mobile",
    day: "Thursday",
    date: "Jul 30",
    startTime: "12:45 PM",
    endTime: "1:30 PM",
  },
};

const faouzia: Artist = {
  name: "Faouzia",
  slug: "faouzia",
  genres: ["Pop", "Dark Pop", "Chamber Pop"],
  origin: "Casablanca, Morocco",
  tagline:
    "A breathtakingly cinematic, three-octave vocal powerhouse commanding tragic dark pop melodies.",
  socials: { spotify: "https://open.spotify.com/artist/5NhgsV7qPWHZqYEMKzbYvo" },
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
      name: "Paloma Morphy",
      slug: "paloma-morphy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782a6bf3b15254bb0bea52168c",
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
    {
      name: "ADÉLA",
      slug: "adela",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fa24d9eab0a75b1ab0f9013b",
    },
  ],
  tracks: [
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
    "Faouzia Ouihya, performing under the singular moniker Faouzia, is a Moroccan-born, Canadian-raised singer-songwriter and multi-instrumentalist whose extraordinary vocal range and tragi-comic cinematic pop anthems have earned her global multi-platinum acclaim. Fusing traditional Arab vocal ornamentation with heavy, contemporary dark-pop instrumentation and sharp piano lines, she writes sweeping tales of resilience, loss, and emotional autonomy. Commands the stage with profound, operatic authority, her early afternoon set stands as an undeniable showcase of pristine musical power.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Thursday",
    date: "Jul 30",
    startTime: "12:15 PM",
    endTime: "1:00 PM",
  },
};

const eveningElephants: Artist = {
  name: "Evening Elephants",
  slug: "evening-elephants",
  genres: ["Indie Pop", "Alternative Hip-Hop", "Indie Rock"],
  origin: "Los Angeles, California",
  tagline:
    "Sun-drenched indie rock hooks floating over crisp hip-hop grooves for endless summer vibes.",
  socials: { spotify: "https://open.spotify.com/artist/4mvJqW3HQswIu7RmvcAQUy" },
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
      name: "Water From Your Eyes",
      slug: "water-from-your-eyes",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b34bc1624b682463e153834a",
    },
    {
      name: "Quadeca",
      slug: "quadeca",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781eee118b4a489ddd3de9f47b",
    },
    {
      name: "Julia Wolf",
      slug: "julia-wolf",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178464afc83fc7ddaf9292bb9a8",
    },
    {
      name: "Sunday (1994)",
      slug: "sunday-1994",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b7e25151a004217ba46eb173",
    },
  ],
  tracks: [
    { name: "Life Is Good", album: "Evening Elephants", duration: "" },
    { name: "Spit It Out", album: "Evening Elephants", duration: "" },
    { name: "Float", album: "Float", duration: "" },
  ],
  about:
    "Evening Elephants is the Los Angeles-based alternative project whose meticulous combination of hazy indie rock guitar hooks, crisp hip-hop rhythm pockets, and carefree lyricism has fostered a deeply dedicated independent community. Forging a distinctively laid-back, sun-drenched sonic universe, the outfit crafts tracks that feel simultaneously nostalgic and deeply current. Performing a prime sunset slot, their live execution transforms the tree-lined perimeter of Grant Park into a vibrant, high-energy outdoor block party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Thursday",
    date: "Jul 30",
    startTime: "6:50 PM",
    endTime: "7:30 PM",
  },
};

const pearlyDrops: Artist = {
  name: "Pearly Drops",
  slug: "pearly-drops",
  genres: ["Dream Pop", "Electro-Pop", "Indie Electronica"],
  origin: "Helsinki, Finland",
  tagline: "Dreamlike, feverish electro-pop designed to bottle up a sense of beautiful isolation.",
  socials: { spotify: "https://open.spotify.com/artist/2eMb96S1ZJ1YQ7FhWAzWJL" },
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
      name: "Suki Waterhouse",
      slug: "suki-waterhouse",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781696da72cfcb968be92b84d4",
    },
    {
      name: "New Constellations",
      slug: "new-constellations",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786a3aa969f4f79f38b0c16c91",
    },
    { name: "Sunshine", slug: "sunshine" },
    {
      name: "Sunday (1994)",
      slug: "sunday-1994",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b7e25151a004217ba46eb173",
    },
  ],
  tracks: [
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
    "Pearly Drops is the Helsinki-born avant-pop collaboration of Sandra Tervonen and Juuso Malin, whose unique formula of hazy, tape-warped electro-pop and diaristic indie electronica has captured global underground attention. Writing with a distinct sense of beautiful nostalgia, the duo crafts tracks that focus on losing one's identity while chasing dreams under modern neon skylines. Celebrating their third full-length masterwork 'The Voices Are Coming Back', their early afternoon set translates raw bedroom intimacy into a beautifully crisp, outdoor electronic experience.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Thursday",
    date: "Jul 30",
    startTime: "12:00 PM",
    endTime: "12:45 PM",
  },
};

const bixby: Artist = {
  name: "Bixby",
  slug: "bixby",
  genres: ["Alt-Pop", "R&B", "Indie Pop"],
  origin: "Los Angeles, California",
  tagline: "Glitched-out R&B vocals running over intense, guitar-driven internet indie-pop energy.",
  socials: { spotify: "https://open.spotify.com/artist/3vqtY7Lhhuw6sEwU4HmIRv" },
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
      name: "Bella Kay",
      slug: "bella-kay",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783d7290ae36694e14b0655753",
    },
    {
      name: "Balu Brigada",
      slug: "balu-brigada",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178871bccd59b468f93c4650066",
    },
    {
      name: "Olivia Dean",
      slug: "olivia-dean",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1785c7577ad44daeb7ce4b941a1",
    },
    {
      name: "Emi Grace",
      slug: "emi-grace",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781d8d8c934c382100d033bb41",
    },
  ],
  tracks: [
    {
      spotifyId: "59IZjbjihzu5wbWKQa3tKS",
      name: "desire",
      album: "desire",
      duration: "2:31",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e023275d8cfc2a447941ffc600d",
    },
    { name: "are you weeping?", album: "the marvel of the century", duration: "" },
    { name: "endlessly", album: "the marvel of the century", duration: "" },
  ],
  about:
    "bixby is the moniker of singer, songwriter, and multi-instrumentalist producer whose meticulous combination of slick internet-pop textures, raw indie rock, and modern R&B vocal deliveries has cultivated a fierce global community. Breaking out through a series of viral single drops before completely elevating his production style into a full-scale rock band statement, his sound explores heartbreak and ambition with hyper-specific honesty. Fresh off his massive tour cycle, his early afternoon slot delivers an absolute masterclass in unadulterated indie-pop momentum.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Bud Light",
    day: "Thursday",
    date: "Jul 30",
    startTime: "1:00 PM",
    endTime: "1:45 PM",
  },
};

const penelopeRoad: Artist = {
  name: "Penelope Road",
  slug: "penelope-road",
  genres: ["Indie Folk", "Alternative Rock", "Chamber Pop"],
  origin: "Nashville, Tennessee",
  tagline:
    "Towering, multi-instrumental indie folk built around explosive, orchestral rock releases.",
  socials: { spotify: "https://open.spotify.com/artist/2BxNY82SWxJkGveOWm2oxH" },
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
      name: "Faouzia",
      slug: "faouzia",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786310c4d3dcfe99b0a9da2a30",
    },
    {
      name: "Ella Boh",
      slug: "ella-boh",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f3ca12f1b323dbb7027d78dc",
    },
    {
      name: "YUNGBLUD",
      slug: "yungblud",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1787c9287712c4355e54c94e0d0",
    },
    {
      name: "Day We Ran",
      slug: "day-we-ran",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17896aa0ad1b8badab28252f80b",
    },
  ],
  tracks: [
    { name: "Winyah", album: "Penelope Road", duration: "" },
    { name: "Daisies", album: "Penelope Road", duration: "" },
    { name: "Backseat", album: "Penelope Road", duration: "" },
  ],
  about:
    "Penelope Road is the alternative folk collective whose combination of stark acoustic traditionalism, rich chamber-pop strings, and heavy indie rock dynamics has earned widespread critical adoration. Signing into the esteemed Nettwerk roster, the group maps a deeply evocative sonic universe centered around personal identity, modern isolation, and landscape poetry. Coming off high-profile co-headlining tour packages, their afternoon performance brings an absolute wall of orchestral sound that fills giant open festival fields with effortless power.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Thursday",
    date: "Jul 30",
    startTime: "12:50 PM",
    endTime: "1:30 PM",
  },
};

const knowGood: Artist = {
  name: "Know Good",
  slug: "know-good",
  genres: ["Future Bass", "Trap", "Electronic"],
  origin: "Los Angeles, California",
  tagline: "Dark, dynamic future bass and trap infused with heavy, genre-defying rhythms.",
  socials: { spotify: "https://open.spotify.com/artist/4iogDJBJ2BO2jl8OkPrfpx" },
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
      name: "Alison Wonderland",
      slug: "alison-wonderland",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b7e4c34bfa9cf5b54afadb14",
    },
    { name: "KLO", slug: "klo" },
    {
      name: "The Chainsmokers",
      slug: "the-chainsmokers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1784567279fac84a0375c3d819b",
    },
  ],
  tracks: [
    { name: "Bodies", album: "BIG MODERN!", duration: "" },
    { name: "Bulls On Parade - Remix", album: "Bulls On Parade", duration: "" },
    { name: "Dust", album: "Dust", duration: "" },
  ],
  about:
    "KNOW GOOD is the electronic project of cousins Tanner and Sylas Morgan, who forged their sound out of a family musical legacy to emerge as a prominent force in the heavy dance scene. Blending the earth-shaking low-end bass of contemporary trap and future bass with sharp lyrical verses and multi-instrumental mastery, the duo delivers a dynamic sonic package. Backed by their highly talked-about single profiles, their live electronic festival environment completely strips away commercial EDM polish for pure, raw underground club energy.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Thursday",
    date: "Jul 30",
    startTime: "12:45 PM",
    endTime: "1:30 PM",
  },
};

const elizabethNichols: Artist = {
  name: "Elizabeth Nichols",
  slug: "elizabeth-nichols",
  genres: ["Country", "Alternative Folk", "Singer-Songwriter"],
  origin: "Nashville, Tennessee",
  tagline: "Grounded, cheekily titled country storytelling built on timeless vocal authority.",
  socials: { spotify: "https://open.spotify.com/artist/06cAJQBSPkt3bG7uMoWfmA" },
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
      name: "Skye Newman",
      slug: "skye-newman",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781401547523ecd0d6d329cebb",
    },
  ],
  tracks: [
    { name: "Voodoo", album: "Voodoo", duration: "" },
    { name: "Kiss & Tell", album: "Kiss & Tell", duration: "" },
    { name: "Stay True", album: "Stay True", duration: "" },
  ],
  about:
    "Elizabeth Nichols is a Nashville-based country singer-songwriter whose brilliant combination of traditional roots, modern storytelling wit, and jaw-dropping vocal authority has sparked widespread critical acclaim. Forging a distinctively cheekily titled lyrical universe that dissects romance and identity, Nichols commands the stage with the effortless confidence of a seasoned Opry veteran. Preparing for her extensive headlining autumn tour blocks, her early afternoon set provides a refreshing, beautifully authentic performance that cuts cleanly through standard festival pop noise.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Thursday",
    date: "Jul 30",
    startTime: "3:20 PM",
    endTime: "4:00 PM",
  },
};

const klo: Artist = {
  name: "KLO",
  slug: "klo",
  genres: ["Trap", "Dubstep", "Electronic"],
  origin: "Chicago, Illinois",
  tagline:
    "Aggressive hometown trap flips and distorted electronic bass loops designed to shatter tents.",
  socials: {},
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
      name: "Alison Wonderland",
      slug: "alison-wonderland",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b7e4c34bfa9cf5b54afadb14",
    },
    {
      name: "Know Good",
      slug: "know-good",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1785358de71801fad4a13adc2f2",
    },
    {
      name: "LYNY",
      slug: "lyny",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178ec6b5f8aa6b2ee962d3de80f",
    },
    {
      name: "Avello",
      slug: "avello",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781a61a6367dead8dac77f1911",
    },
  ],
  tracks: [
    { name: "TARTAN - Klo Flip", album: "Klo Flips", duration: "" },
    { name: "Vandal", album: "Vandal", duration: "" },
    { name: "Static", album: "Static", duration: "" },
  ],
  about:
    "KLO is a Chicago-born electronic producer and DJ whose raw brand of underground trap flips, distorted dubstep architecture, and aggressive percussive sound design has rapidly turned heads across the alternative bass scene. Rooted deeply in the localized Soundcloud production culture, his engineering shifts away from standard commercial templates toward deep, structural low-frequency weights. Earning a highly coveted hometown opening slot on Perry's stage, his performance serves as a blistering, high-tempo celebration of modern heavy bass infrastructure.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Thursday",
    date: "Jul 30",
    startTime: "12:00 PM",
    endTime: "12:30 PM",
  },
};

const theBraymores: Artist = {
  name: "The Braymores",
  slug: "the-braymores",
  genres: ["Alternative Rock", "Folk Rock", "Indie Rock"],
  origin: "Chicago, Illinois",
  tagline:
    "Hometown indie-rock anthems fusing driving alternative grit with timeless folk-rock poetry.",
  socials: { spotify: "https://open.spotify.com/artist/7CrVM33l2Pt32fCxJWGVw6" },
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
    { name: "Talking to Trees", album: "Talking to Trees EP", duration: "" },
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
    "The Braymores are the Chicago-born alternative rock quartet comprising Matt Tilles, Keegan Melaniphy, Russell Oren, and Connor Kohanzo, whose meticulous blend of fuzzed-out indie grit and traditional folk-rock songwriting has earned them major industry representation. Breaking out locally with their brilliant debut record 'Who You'd Have Been', the group writes sweeping, emotionally honest tales of personal history, identity, and midwestern isolation. Hot off the heels of major label distribution deals, their early afternoon performance brings a beautifully raw, guitar-driven masterclass to Grant Park.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Thursday",
    date: "Jul 30",
    startTime: "1:00 PM",
    endTime: "1:40 PM",
  },
};

const chalk: Artist = {
  name: "Chalk",
  slug: "chalk",
  genres: ["Post-Punk", "Industrial Techno", "Gothic Rock"],
  origin: "Belfast, Northern Ireland",
  tagline:
    "A terrifyingly brilliant, blistering collision of jagged post-punk guitars and industrial techno loops.",
  socials: { spotify: "https://open.spotify.com/artist/3qa9pv6B0dmiBVETLQOCpi" },
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
      name: "YUNGBLUD",
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
    { name: "Conditions", album: "Conditions EP", duration: "" },
    { name: "Static", album: "Crystalpunk", duration: "" },
    { name: "Velvet", album: "Crystalpunk", duration: "" },
  ],
  about:
    "CHALK is the award-winning Belfast-born duo consisting of Ross Cullen and Benedict Goddard, whose uncompromising fusion of gritty Irish and German electronic techno infrastructure, gothic rock poetry, and jagged noise guitars has sent shockwaves through the European underground. Drawing intense atmospheric parallels between dark warehouse rave culture and confrontational punk rock showmanship, their landmark full-length debut 'Crystalpunk' crystallized their status as critical darlings. Behind the instruments, their live environment strips away all pop pretense for an adrenaline-fueled, industrial punk sermon.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Thursday",
    date: "Jul 30",
    startTime: "5:40 PM",
    endTime: "6:20 PM",
  },
};

const simonGrossmann: Artist = {
  name: "Simon Grossmann",
  slug: "simon-grossmann",
  genres: ["Latin Pop", "Indie Folk", "Tropicalia"],
  origin: "Caracas, Venezuela",
  tagline: "Sun-drenched, melancholic Latin indie folk built around intimate, raspy storytelling.",
  socials: { spotify: "https://open.spotify.com/artist/6t38N9HASTn9ca0PIxfReQ" },
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
  ],
  tracks: [
    {
      spotifyId: "131pRjxiSb3iaZavjVutiQ",
      name: "Ciclo",
      album: "Ciclo",
      duration: "2:52",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0221c5098d041f8c753c0cb3a3",
    },
    { name: "Agüitaecoco", album: "Mujer Eléctrica", duration: "" },
    { name: "Limón", album: "Bahía", duration: "" },
  ],
  about:
    "Simon Grossmann is a Venezuelan-born singer-songwriter whose brilliant combination of nostalgic Latin pop, breezy tropical rhythms, and intimate bedroom folk has garnered a deeply devoted international community. Writing with the specific narrative precision of a classic beach-side storyteller, Grossmann explores themes of young romance, transient lifestyles, and warm escapism with profound emotional honesty. Backed by highly celebrated studio milestones like 'Bahía', his early afternoon performance transforms a sprawling festival lawn into a relaxed, sun-drenched coastal retreat.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Thursday",
    date: "Jul 30",
    startTime: "2:10 PM",
    endTime: "2:50 PM",
  },
};

const kimTheory: Artist = {
  name: "Kim Theory",
  slug: "kim-theory",
  genres: ["Riot Grrrl", "Punk Rock", "Garage Rock"],
  origin: "Los Angeles, California",
  tagline:
    "Ferocious, teenage riot grrrl punk bringing raw house party audacity to the festival stage.",
  socials: { spotify: "https://open.spotify.com/artist/3yyFgRwj9zkv2pZ5CGUsEa" },
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
      name: "Viagra Boys",
      slug: "viagra-boys",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1789c1e2f2acd631e30c6ad153e",
    },
    {
      name: "Finn Wolfhard",
      slug: "finn-wolfhard",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178926418bb71d5a111e6fbb9eb",
    },
  ],
  tracks: [
    { name: "He Said, She Said", album: "Bitch Scene", duration: "" },
    { name: "Trophy Wife", album: "Trophy Wife EP", duration: "" },
    { name: "Gimme Brains", album: "Trophy Wife EP", duration: "" },
  ],
  about:
    "Kim Theory is the Los Angeles-born teen girl punk powerhouse consisting of Audrey Cymone, Lula Seifert, Lucy Fraser, and Zoey Su, who rapidly revitalized the West Coast underground through homegrown house parties and raw audacity. Referencing the structural blueprints of their musical heroes Kim Gordon and Kim Deal, the quartet writes blistering, uncompromising statements tracking bodily autonomy and adolescent rebellion. Mentored directly by iconic punk legends, their high-noon performance delivers a thrilling masterclass in pure, unadulterated counter-culture urgency.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Thursday",
    date: "Jul 30",
    startTime: "12:00 PM",
    endTime: "12:30 PM",
  },
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
