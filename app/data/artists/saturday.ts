// Storage only — do not import this file directly in product code.
// To filter by day, import allArtists from index.ts and filter by appearance.day === "Saturday".
import type { Artist } from "@/app/types/artist";

const oliviaDean: Artist = {
  name: "Olivia Dean",
  slug: "olivia-dean",
  mbid: "15e0d608-0869-429b-898d-3d8db3ecedd5",
  imageUrl: "/artists/heroes/olivia-dean.jpg",
  objectPosition: "center 20%",
  liveVideoId: "QOcUC9mN2s0",
  liveVideoLabel: "Live at Fleet Steps, Mrs Macquaries Point, Sydney 2025",
  genres: ["Soul", "R&B", "Indie Pop"],
  origin: "London, England",
  tagline: "Soulful, sharp, and completely herself.",
  socials: {
    spotify: "https://open.spotify.com/artist/00x1fYSGhdqScXBRpSj3DW",
    youtube: "https://www.youtube.com/@oliviadean",
    tiktok: "https://www.tiktok.com/@oliviadeano_",
  },
  whySee: [
    "A voice that stops people mid-stride — genuinely one of the best singers performing this weekend",
    "Messy is a debut album full of career-defining songs — catch it while it still feels new",
    "Warm, joyful stage presence that turns a festival crowd into a community",
    "British soul at its finest: witty, specific, and deeply felt",
  ],
  whatToExpect: ["Live Band Performance", "Crowd Atmosphere", "Intimate Performance"],
  bestFor: [],
  similarArtists: [
    {
      name: "Blood Orange",
      slug: "blood-orange",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17882a833d61eafc09c05c24882",
    },
    {
      name: "Valencia Grace",
      slug: "valencia-grace",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17825599b11aff6d045b573a13f",
    },
    { name: "Justine Skye", slug: "justine-skye" },
    {
      name: "Sienna Spiro",
      slug: "sienna-spiro",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fb0ab819bbd4502028cd1feb",
    },
  ],
  tracks: [
    {
      spotifyId: "0mYXRQpTGjaLJt1l9MY4ps",
      name: "Man I Need",
      album: "The Art of Loving",
      duration: "3:04",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e029a336bfb6d40bbd90a507417",
    },
    {
      spotifyId: "6sGIMrtIzQjdzNndVxe397",
      name: "So Easy (To Fall In Love)",
      album: "The Art of Loving",
      duration: "2:49",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e029a336bfb6d40bbd90a507417",
    },
    {
      spotifyId: "36vmaZyO0iAE6FZ7287fg2",
      name: "Dive",
      album: "Messy",
      duration: "3:20",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02cac9b52107643faf13a7587b",
    },
  ],
  about:
    "Olivia Dean is a London-born singer-songwriter whose 2023 debut album 'Messy' earned a Mercury Prize nomination and announced her as one of British soul's most exciting new voices. Her sound bridges classic R&B warmth with a modern pop sensibility, delivering emotionally precise songs with genuine wit. Following a historic sweep at the BRIT Awards and a Grammy win, her massive 2025 sophomore studio album 'The Art of Loving' catapulted her to global pop stardom, landing a number-one record and transforming her live performances into massive, horn-backed arena spectacles perfect for the festival mainstage.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Headliner",
    stage: "T-Mobile",
    day: "Saturday",
    date: "Aug 1",
    startTime: "8:30 PM",
    endTime: "10:00 PM",
  },
};

const jennie: Artist = {
  name: "Jennie",
  slug: "jennie",
  mbid: "779351de-0da5-4943-928b-495a3c40e8c0",
  imageUrl: "/artists/heroes/jennie.jpg",
  objectPosition: "center 15%",
  liveVideoId: "aTP87bkvixE",
  liveVideoLabel: "Live at Governor's Ball 2026",
  genres: ["K-Pop", "R&B", "Hip-Hop"],
  origin: "Seoul, South Korea",
  tagline: "Unrivaled global pop icon delivering high-fashion, block-rocking festival energy.",
  socials: {
    spotify: "https://open.spotify.com/artist/250b0Wlc5Vk0CoUsaCY84M",
    youtube: "https://www.youtube.com/@jennierubyjane",
    tiktok: "https://www.tiktok.com/@jennierubyjane",
  },
  whySee: [
    "Global K-pop icon making her solo debut on the festival stage — a historic moment",
    "Sharp choreography and high-fashion production that rival any pop headline act",
    "BLACKPINK energy distilled into one performer: all the charisma, none of the filler",
    "Crowd interaction and stage presence that make 80,000 people feel seen",
  ],
  whatToExpect: [
    "Choreography",
    "Crowd Atmosphere",
    "Cinematic Visuals",
    "Massive Singalongs",
    "Fashion Visual",
  ],
  bestFor: ["Dance Floor Seekers"],
  similarArtists: [
    {
      name: "CORTIS",
      slug: "cortis",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178267afab76836557af2bd37c8",
    },
    {
      name: "Blood Orange",
      slug: "blood-orange",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17882a833d61eafc09c05c24882",
    },
    {
      name: "aespa",
      slug: "aespa",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178053bbb910dda6d4ab0618b8b",
    },
    {
      name: "bbno$",
      slug: "bbno-dollar",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178e7c585e9ecd65c76b7bf91ac",
    },
  ],
  tracks: [
    {
      spotifyId: "1kUyOJb3fzUo8r0OCz5SQk",
      name: "Mantra",
      album: "Ruby",
      duration: "2:16",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02dcf27dec5e479b2e39c4c993",
    },
    {
      name: "like JENNIE",
      album: "Ruby (The Complete Collection)",
      duration: "2:54",
      artworkUrl: "/albums/jennie/ruby-collection.jpg",
    },
    {
      spotifyId: "5yvVYFDUpbnjcnRBgjwTzM",
      name: "Dracula - JENNIE Remix",
      album: "Dracula (Remix)",
      duration: "3:29",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02c7c031ce9d06b131f8563676",
    },
  ],
  about:
    "Jennie Kim debuted in 2016 as a core member of global phenomenon BLACKPINK before launching an equally historic solo career. Known for her fierce rap flows, sultry R&B hooks, and trendsetting fashion authority, she shattered international charts with her 2024 solo smash 'Mantra'. Following the massive global success of her late-2025 solo debut album 'Ruby' and a string of blockbuster 2026 hits like 'like JENNIE' and the hard-hitting 'Dracula' remix, her headlining live production is a world-class masterclass in precision choreography, high-fashion staging, and sheer pop dominance.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Headliner",
    stage: "Bud Light",
    day: "Saturday",
    date: "Aug 1",
    startTime: "9:00 PM",
    endTime: "10:00 PM",
  },
};

const theNeighbourhood: Artist = {
  name: "The Neighbourhood",
  slug: "the-neighbourhood",
  genres: ["Indie Pop", "Alternative Rock", "Dark Pop"],
  origin: "Newbury Park, California",
  tagline: "Nocturnal, smoky indie-pop melancholia built for late-night festival fields.",
  socials: { spotify: "https://open.spotify.com/artist/77SW9BnxLY8rJ0RciFqkHh" },
  whySee: [
    "A massive, highly anticipated mainstage festival reunion set executing a monumental catalog of generation-defining dark pop anthems",
    "Jesse Rutherford's effortless, deeply charismatic vocal delivery commanding a crowd of tens of thousands singing every lyric",
    "Experience the iconic, monochromatic visual atmosphere that transforms a sprawling afternoon lawn into an intimate cinematic landscape",
    "Hear the live execution of massive diamond-certified streaming benchmarks like 'Sweater Weather' under a shifting twilight skyline",
  ],
  whatToExpect: [
    "Late-Night Energy",
    "Guitar-Driven Sound",
    "Massive Singalongs",
    "Production Style Approach",
  ],
  bestFor: ["Dance Floor Seekers", "Legacy & Milestone Hunters"],
  similarArtists: [
    {
      name: "Bella Kay",
      slug: "bella-kay",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783d7290ae36694e14b0655753",
    },
    {
      name: "54 Ultra",
      slug: "54-ultra",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1788fdf273bf26657879cccdc74",
    },
    { name: "Cruz Beckham and the Breakers", slug: "cruz-beckham-and-the-breakers" },
    {
      name: "Whitney Whitney",
      slug: "whitney-whitney",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b9b32a1845c72390fc48c28c",
    },
  ],
  tracks: [
    {
      spotifyId: "2QjOHCTQ1Jl3zawyYOpxh6",
      name: "Sweater Weather",
      album: "I Love You.",
      duration: "4:00",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e028265a736a1eb838ad5a0b921",
    },
    {
      spotifyId: "5E30LdtzQTGqRvNd7l6kG5",
      name: "Daddy Issues",
      album: "Wiped Out!",
      duration: "4:20",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e025260c62db020e5861a51556d",
    },
    {
      spotifyId: "2xql0pid3EUwW38AsywxhV",
      name: "Reflections",
      album: "Hard To Imagine The Neighbourhood Ever Changing",
      duration: "4:04",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e029b6ac98a52f62d5cb473da40",
    },
  ],
  about:
    "The Neighbourhood is the California-born alternative powerhouse whose meticulous combination of hazy indie-rock instrumentation, low-slung hip-hop rhythm pockets, and dark R&B melodic vocal lines completely re-engineered the soundscape of 2013 internet music culture. Anchored by the brooding lyricism of frontman Jesse Rutherford, the band maps a hyper-stylized, black-and-white sonic universe that explores identity and intimacy with profound emotional honesty. Occupying a highly visible sub-headlining slot on the mainstage, their performance provides a monumental, high-velocity celebration of modern indie history.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "T-Mobile",
    day: "Saturday",
    date: "Aug 2",
    startTime: "6:30 PM",
    endTime: "7:30 PM",
  },
};

const ethelCain: Artist = {
  name: "Ethel Cain",
  slug: "ethel-cain",
  genres: ["Gothic Folk", "Slowcore", "Dream Pop"],
  origin: "Tallahassee, Florida",
  tagline:
    "Devastating, southern-gothic slowcore epics delivered with bone-chilling vocal majesty.",
  socials: { spotify: "https://open.spotify.com/artist/0avMDS4HyoCEP6RqZJWpY2" },
  whySee: [
    "Hayden Anhedönia's first major mainstage festival run bringing a deeply moving, dark alternative community together in the park",
    "Towering, ten-minute slowcore rock arrangements that trade effortlessly between quiet ambient spaces and roaring guitar crescendos",
    "Witness an elite lyrical auteur executing raw, tragic narrative storytelling that reads closer to a personal essay than pop music",
    "A stunningly quiet, emotionally enormous sunset oasis that commands absolute, pin-drop silence from a massive festival crowd",
  ],
  whatToExpect: [
    "Technical Vocal Range",
    "Guitar-Driven Sound",
    "Dark Mood Visuals",
    "Crowd Atmosphere",
  ],
  bestFor: ["Lyric & Narrative Obsessives", "Dance Floor Seekers"],
  similarArtists: [
    {
      name: "Not for Radio",
      slug: "not-for-radio",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17859a30bdb69e6a990c22a5d32",
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
    {
      name: "Pearly Drops",
      slug: "pearly-drops",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178d8ffff9d4383a19d7101dffc",
    },
  ],
  tracks: [
    { name: "American Teenager", album: "Preacher's Daughter", duration: "" },
    { name: "Gibson Girl", album: "Preacher's Daughter", duration: "" },
    {
      spotifyId: "6JnZ9hXxtXTtjwB3aAptTf",
      name: "Punish",
      album: "Perverts",
      duration: "6:40",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02c6d1d934d100fa2167c71b5d",
    },
  ],
  about:
    "Hayden Anhedönia, performing under the conceptual moniker Ethel Cain, is a Florida-born singer-songwriter, multi-instrumentalist, and auteur whose brilliant blend of ambient dream pop, crushing slowcore distortion, and visceral southern gothic imagery has earned a monumental international cult following. Deconstructing complex ancestral traumas and interpersonal grief with painful precision, her critically adored concept records like 'Preacher's Daughter' established her as a generation-defining lyricist. Live, her performance strips away corporate pretense, transforming sprawling mainstage lawns into haunting, cathedral-scale communal sanctuaries.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "Bud Light",
    day: "Saturday",
    date: "Aug 1",
    startTime: "7:15 PM",
    endTime: "8:15 PM",
  },
};

const discoLines: Artist = {
  name: "Disco Lines",
  slug: "disco-lines",
  genres: ["Tech House", "Dance Pop", "Electronic"],
  origin: "Boulder, Colorado",
  tagline: "Bouncy, high-energy tech-house loops built purely for celebratory day parties.",
  socials: { spotify: "https://open.spotify.com/artist/5Kmr0b3ip8g9P2i0dLTC3Z" },
  whySee: [
    "Thadeus Labuszewski bringing his hyper-infectious, cheerful brand of modern tech-house straight to a boiling festival tent",
    "A non-stop, high-velocity dance party packed back-to-back with viral club weapons and multi-platinum independent single drops",
    "An absolute masterclass in cheerful party curation, blending heavy rolling basslines with exceptionally bright vocal hooks",
    "The ultimate late-afternoon crowd catalyst under the Perry's tent designed purely to get massive groups of friends dancing together",
  ],
  whatToExpect: [
    "Rhythm Complexity",
    "Melodic Vocal Hooks",
    "Afternoon Vibes",
    "High-Energy Pacing",
  ],
  bestFor: ["Dance Floor Seekers"],
  similarArtists: [
    {
      name: "INJI",
      slug: "inji",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bb9b2f1ed4018b6bd506516b",
    },
    {
      name: "bradeazy",
      slug: "bradeazy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781c9da6b48887663d291b8df4",
    },
    {
      name: "Whethan",
      slug: "whethan",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782717c8959d00aa37044bbb74",
    },
    {
      name: "Westend",
      slug: "westend",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bc781a35d287a09940ae6046",
    },
  ],
  tracks: [
    {
      spotifyId: "2cSdAkzAf2T4j4aLvx4LLz",
      name: "Baby Girl",
      album: "Baby Girl",
      duration: "1:51",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e027b0cbc69fe31ee3bc72c0c6a",
    },
    {
      spotifyId: "33fFeAVSb0ue54Izu9uADo",
      name: "MDMA",
      album: "MDMA",
      duration: "3:07",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0288d87ef7928e8c885cccbebe",
    },
    { name: "Anotha One", album: "Anotha One", duration: "" },
  ],
  about:
    "Thadeus Labuszewski, operating under the singular moniker Disco Lines, is a Colorado-born electronic producer and DJ whose meticulous formula of upbeat house tempos, deep tech-house rolling baselines, and massive crossover pop appeal has earned him global multi-platinum acclaim. Dominating festival circuits through an intensely playful digital presence and pristine production skills, he crafts a hyper-kinetic soundscape built around heavy groove loops. Ready to ignite his high-visibility afternoon slot, his live performance strips away club pretension for a beautifully unadulterated, celebratory dance party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "Perry's",
    day: "Saturday",
    date: "Aug 1",
    startTime: "8:30 PM",
    endTime: "9:45 PM",
  },
};

const leonThomas: Artist = {
  name: "Leon Thomas",
  slug: "leon-thomas",
  mbid: "412ff65d-26bf-4849-ba19-d2a58030fd1a",
  imageUrl: "/artists/heroes/leon-thomas.jpg",
  objectPosition: "center 20%",
  genres: ["Alternative R&B", "Soul", "Neo-Soul"],
  origin: "Brooklyn, New York",
  tagline: "Grammy-winning soul, built from the underground up.",
  socials: {
    spotify: "https://open.spotify.com/artist/0nnBZ8FXWjG9wZgM2cpfeb",
    youtube: "https://www.youtube.com/channel/@leonthomas",
    tiktok: "https://www.tiktok.com/@leonthomas",
  },
  whySee: [
    "One of the most naturally gifted vocalists performing anywhere this weekend",
    "MUTT landed as one of 2023's most acclaimed R&B albums — hear it live before it becomes legacy material",
    "An industry insider finally in the spotlight: he's written for Ariana Grande, Ty Dolla $ign, and more",
    "The rare artist who sounds better live — raw, unhurried, completely at ease",
  ],
  whatToExpect: ["Crowd Atmosphere", "Lush Sound"],
  bestFor: ["Sound Design & Production Nerds"],
  similarArtists: [
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
      name: "Chezile",
      slug: "chezile",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b1593dbc8b1c5ee3c62b55a1",
    },
    { name: "KWN", slug: "kwn" },
  ],
  tracks: [
    {
      name: "YES IT IS",
      album: "YES IT IS",
      duration: "3:14",
      artworkUrl: "/albums/leon-thomas/yes-it-is.png",
    },
    {
      spotifyId: "1mh9eHVRdNhzryG43PXdW1",
      name: "MUTT",
      album: "MUTT",
      duration: "3:13",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0282a5b97ffaf87e21ce6fdf4a",
    },
    {
      name: "Treasure In The Hills",
      album: "PHOLKS",
      duration: "2:54",
      artworkUrl: "/albums/leon-thomas/pholks.png",
    },
  ],
  about:
    "Leon Thomas spent years as one of the industry's most prolific hidden forces—writing and producing hits for the likes of Ariana Grande, Drake, and SZA. He solidified his status as a solo powerhouse with his critically acclaimed 2024 studio album 'MUTT', which earned deep critical praise and an extensive road to the 2026 Grammys. Blending alternative R&B instrumentation with a timeless, rich vocal execution, his subsequent 2025 and 2026 projects like 'PHOLKS' and the gold-certified 'YES IT IS' have established him as an unmissable, dynamic live performer on the modern soul circuit.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "T-Mobile",
    day: "Saturday",
    date: "Aug 1",
    startTime: "4:30 PM",
    endTime: "5:30 PM",
  },
};

const clipse: Artist = {
  name: "Clipse",
  slug: "clipse",
  genres: ["Hip-Hop", "Boom Bap", "Underground Rap"],
  origin: "Virginia Beach, Virginia",
  tagline: "Legendary coke-rap royalty delivering pristine, razor-sharp technical lyricism.",
  socials: { spotify: "https://open.spotify.com/artist/2J257euzcjnDLipsyJH3F2" },
  whySee: [
    "A historic, highly anticipated festival performance from brothers Pusha T and Malice executing their legendary reunion era",
    "A masterclass in technical rap execution from two of the absolute finest, most uncompromising pure lyricists in hip-hop history",
    "Experience the raw, stark instrumentation of early-2000s Neptunes-produced street masterpieces like 'Grindin' live at monumental scale",
    "An absolute elite option for hip-hop traditionalists looking for pure lyrical muscle and effortless mic authority over modern commercial pop trap",
  ],
  whatToExpect: ["Cinematic Visuals", "Intense Fan Connection"],
  bestFor: ["Lyric & Narrative Obsessives", "Sound Design & Production Nerds"],
  similarArtists: [
    { name: "Chicago Made", slug: "chicago-made" },
    {
      name: "Freddie Gibbs",
      slug: "freddie-gibbs",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178499def7bd0369aa26a22273c",
    },
    {
      name: "Lil Uzi Vert",
      slug: "lil-uzi-vert",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17862c272d76220f2e9dad56704",
    },
    {
      name: "Nettspend",
      slug: "nettspend",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786bc255a221b2d2db4c1de21f",
    },
  ],
  tracks: [
    {
      spotifyId: "3XrvEifl0hIzgBGUa5jBLS",
      name: "Grindin'",
      album: "Lord Willin'",
      duration: "4:24",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0295bf7f7dac7b61a95d47f07e",
    },
    {
      spotifyId: "0EXm0iaB0CzqtsB3VaupXj",
      name: "When the Last Time",
      album: "Lord Willin'",
      duration: "4:14",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0295bf7f7dac7b61a95d47f07e",
    },
    {
      spotifyId: "6cAldqwmbUwpM8D17FWtPL",
      name: "Mr. Me Too",
      album: "Hell Hath No Fury",
      duration: "3:41",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e021533f5dd895bb03556473485",
    },
  ],
  about:
    "Clipse is the iconic Virginia-born hip-hop duo comprising brothers Gene 'No Malice' Thornton and Terrence 'Pusha T' Thornton, whose uncompromising independent path and machine-gun lyrical delivery completely re-wrote the rules of contemporary street rap. Celebrated for their uncanny ability to float effortlessly over complex, avant-garde production landscapes built by Pharell Williams and The Neptunes, the duo writes stark, cinematic street journals with profound precision. Returning to the festival stage, their evening performance stands as an undeniable showcase of pristine musical power and raw hip-hop heritage.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "Bud Light",
    day: "Saturday",
    date: "Aug 1",
    startTime: "5:15 PM",
    endTime: "6:15 PM",
  },
};

const geese: Artist = {
  name: "Geese",
  slug: "geese",
  genres: ["Post-Punk", "Indie Rock", "Art Rock"],
  origin: "Brooklyn, New York",
  tagline: "Jagged, unpredictable art-punk chaos and thrillingly unhinged live energy.",
  socials: { spotify: "https://open.spotify.com/artist/0WCo84qtCKfbyIf1lqQWB4" },
  whySee: [
    "One of the absolute sharpest, most restlessly creative rock outfits of the modern underground executing an intense performance",
    "Cameron Winter's completely unhinged, acrobatic vocal deliveries shifting effortlessly from deadpan rants to soaring theatrical croons",
    "A masterclass in traditional analog power band energy, delivering jagged dual-guitar riffs and complex progressive rhythmic patterns",
    "A blistering, high-octane early evening rock catalyst designed to leave music traditionalists completely floored by the live talent",
  ],
  whatToExpect: ["Guitar-Driven Sound", "Choreography", "Rhythm Complexity", "Energetic Mosh Pits"],
  bestFor: ["Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Wet Leg",
      slug: "wet-leg",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a4e6cf8b3d6ea5a6b4b5fb8f",
    },
    {
      name: "Day We Ran",
      slug: "day-we-ran",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17896aa0ad1b8badab28252f80b",
    },
    {
      name: "Wunderhorse",
      slug: "wunderhorse",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1780e05e549428cb38b2f3e7a60",
    },
    {
      name: "Water From Your Eyes",
      slug: "water-from-your-eyes",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b34bc1624b682463e153834a",
    },
  ],
  tracks: [
    { name: "Disco Man", album: "Projector", duration: "" },
    {
      spotifyId: "5vtJPJsiwW5BZAYo8Nla0n",
      name: "Cowboy Nudes",
      album: "3D Country",
      duration: "2:50",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e028af65a82cdd9104f19e4047b",
    },
    {
      spotifyId: "1h0TAXegSmZzATP3MhqGbH",
      name: "3D Country",
      album: "3D Country",
      duration: "5:13",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e028af65a82cdd9104f19e4047b",
    },
  ],
  about:
    "Geese is the Brooklyn-born five-piece rock outfit whose hyper-vivid blend of distorted post-punk instrumentation, jangly alternative guitars, and avant-garde theatrical rock tropes has earned them a reputation as one of the most exciting young live bands in America. Writing music that operates with the urgent, unpredictable pacing of a fever dream, the band relies on incredibly crisp dual-guitar layers and satirical narrative lyricism. Coming off their highly acclaimed studio milestone '3D Country', their early afternoon performance provides a thrilling, beautifully raw antidote to overprocessed pop.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "Allianz",
    day: "Saturday",
    date: "Aug 1",
    startTime: "7:30 PM",
    endTime: "8:30 PM",
  },
};

const alisonWonderland: Artist = {
  name: "Alison Wonderland",
  slug: "alison-wonderland",
  genres: ["Trap", "Future Bass", "Electronic"],
  origin: "Sydney, Australia",
  tagline: "Cinematic, arena-scale future bass and heavy, deeply emotional electronic anthems.",
  socials: { spotify: "https://open.spotify.com/artist/11gWrKZMBsGQWmobv3oNfW" },
  whySee: [
    "An absolute pioneer of the international electronic circuit returning to detonate the mainstage with a world-class live performance",
    "Alexandra Sholler's flawless live execution, trading between hyper-precise deck manipulation, raw live vocals, and classical cello interludes",
    "An absolute wildfire crowd environment packed with blinding, high-production visual arrays and massive park-wide mosh pits",
    "Experience a legendary catalog of multi-platinum festival-proven crossover weapons designed to push crowds to terminal velocity",
  ],
  whatToExpect: ["Cinematic Visuals", "High-Energy Pacing"],
  bestFor: ["Bass & Groove Lovers", "Dance Floor Seekers", "Sound Design & Production Nerds"],
  similarArtists: [
    {
      name: "LYNY",
      slug: "lyny",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178ec6b5f8aa6b2ee962d3de80f",
    },
    {
      name: "Know Good",
      slug: "know-good",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1785358de71801fad4a13adc2f2",
    },
    { name: "KLO", slug: "klo" },
    {
      name: "Whethan",
      slug: "whethan",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782717c8959d00aa37044bbb74",
    },
  ],
  tracks: [
    {
      spotifyId: "6wb61u8ayuanWSHZzle5od",
      name: "I Want U",
      album: "Run",
      duration: "3:30",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e025b6b8e70388320d3410a6b92",
    },
    {
      spotifyId: "6Apozxrk03AIyQwyswUjbt",
      name: "Church",
      album: "Awake",
      duration: "3:03",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0248362f277592191f882a2b14",
    },
    {
      spotifyId: "1Z0N9hxlzZRPAKI5Q33jsq",
      name: "Something Real",
      album: "Loner",
      duration: "3:49",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e027da84e98f85118248ebfb17d",
    },
  ],
  about:
    "Alexandra Sholler, performing under the iconic moniker Alison Wonderland, is an Australian-born global dance powerhouse whose sharp combination of multi-platinum electronic production, classical cello training, and raw, vulnerable vocal deliveries has earned her billions of streams worldwide. Breaking onto international circuits as a vanguard of the future bass boom, she has spent over a decade refining a sound that pairs crushing trap basslines with pristine indie pop Hooks. Her late-night headlining performance provides a masterclass in high-production festival theater.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Saturday",
    date: "Aug 1",
    startTime: "7:00 PM",
    endTime: "8:00 PM",
  },
};

const djTrixieMattel: Artist = {
  name: "DJ Trixie Mattel",
  slug: "dj-trixie-mattel",
  genres: ["Dance Pop", "Electro-Pop", "Electronic"],
  origin: "Milwaukee, Wisconsin",
  tagline: "High-camp pop choreography and glittering, retro-fueled electro-pop club parties.",
  socials: {},
  whySee: [
    "The undisputed high priestess of drag pop bringing an explosive, completely unhinged celebratory club party directly to the park",
    "Brian Firkus' magnetic, larger-than-life stage command delivering sharp, high-fashion choreography alongside massive electronic drops",
    "Experience a beautifully curated afternoon dance floor environment packed back-to-back with iconic vocal mashups and pop classics",
    "The ultimate high-energy afternoon catalyst designed purely to get massive groups of friends dancing together under the sun",
  ],
  whatToExpect: [
    "Choreography",
    "Retro-Futuristic Aesthetic",
    "Massive Singalongs",
    "Crowd Atmosphere",
  ],
  bestFor: ["Dance Floor Seekers"],
  similarArtists: [
    {
      name: "The Chainsmokers",
      slug: "the-chainsmokers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1784567279fac84a0375c3d819b",
    },
    {
      name: "Whethan",
      slug: "whethan",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782717c8959d00aa37044bbb74",
    },
    {
      name: "INJI",
      slug: "inji",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bb9b2f1ed4018b6bd506516b",
    },
    {
      name: "MC4D",
      slug: "mc4d",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178042776271fc2c09e905c93e6",
    },
  ],
  tracks: [
    { name: "Malibu", album: "Barbara", duration: "" },
    { name: "Hello Hello", album: "The Blonde & Pink Albums", duration: "" },
    { name: "C'Mon Justine", album: "The Blonde & Pink Albums", duration: "" },
  ],
  about:
    "Brian Firkus, performing under the globally iconic multi-hyphenate moniker Trixie Mattel, is an award-winning singer, songwriter, and media titan who seamlessly bridged the gap between drag counter-culture and global live music billing. Fusing the glossy, maximalist electronic textures of early-2000s Eurodance with vintage country-pop songwriting tropes and postmodern humor, the project crafts an intensely joyful sonic universe. Live, her performance strips away traditional rock solemnity, deploying an exceptionally stylish masterclass in high-fashion pop showmanship.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Saturday",
    date: "Aug 1",
    startTime: "9:00 PM",
    endTime: "10:00 PM",
  },
};

const bbno_dollar: Artist = {
  name: "bbno$",
  slug: "bbno-dollar",
  genres: ["Hip-Hop", "Indie Pop", "Dance Pop"],
  origin: "Vancouver, Canada",
  tagline: "Witty, low-slung internet rap hooks and carefree, bounce-driven party grooves.",
  socials: { spotify: "https://open.spotify.com/artist/41X1TR6hrK8Q2ZCpp2EqCz" },
  whySee: [
    "The ultimate carefree afternoon hip-hop party catalyst bringing a hyper-catchy, viral performance directly to the Tito's stage",
    "Alexander Gumuchian's unmatched, completely charismatic live crowd banter and rapid-fire stream-of-consciousness comedic rap flows",
    "Experience the earth-shaking live execution of massive global internet streaming milestones like 'Lalala' at scale",
    "A loose, remarkably fun and high-energy crowd environment designed purely to get groups of friends dancing together",
  ],
  whatToExpect: ["Massive Singalongs"],
  bestFor: ["Hometown & Local Supporters", "Tent & Club Venue Seekers"],
  similarArtists: [
    {
      name: "ADÉLA",
      slug: "adela",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fa24d9eab0a75b1ab0f9013b",
    },
    {
      name: "The Chainsmokers",
      slug: "the-chainsmokers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1784567279fac84a0375c3d819b",
    },
    {
      name: "The Neighbourhood",
      slug: "the-neighbourhood",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178df0b5ac84376a0a4b2166816",
    },
    {
      name: "Empire of the Sun",
      slug: "empire-of-the-sun",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c806f3e714afa21861e20248",
    },
  ],
  tracks: [
    { name: "Lalala", album: "Recess", duration: "" },
    { name: "edamame (feat. Rich Brian)", album: "eat ya veggies", duration: "" },
    {
      spotifyId: "30K6y3aeYjmjCHhLiudtH9",
      name: "it boy",
      album: "it boy",
      duration: "2:26",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0214456281b63152fd75e6d931",
    },
  ],
  about:
    "Alexander Gumuchian, performing under the moniker bbno$ (baby no money), is a Vancouver-born rapper and songwriter whose unique formula of low-slung underground rap pockets, crisp disco-pop hooks, and postmodern internet humor has garnered billions of streams worldwide. Writing with the specific narrative precision of a cartoon auteur, he maps a distinctively laid-back, sun-drenched sonic landscape that rejects traditional rap solemnity. Backed by effortless live charisma, his late afternoon set transforms a sprawling festival field into a vibrant outdoor block party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Saturday",
    date: "Aug 1",
    startTime: "6:15 PM",
    endTime: "7:15 PM",
  },
};

const kwn: Artist = {
  name: "KWN",
  slug: "kwn",
  genres: ["Alternative R&B", "Soul", "Electronic Pop"],
  origin: "London, England",
  tagline: "Sultry, nocturnal alternative R&B tracking the raw vulnerabilities of modern romance.",
  socials: {},
  whySee: [
    "Catch an exceptional independent UK lyricist executing a deeply atmospheric, confessional performance on the alternative stage",
    "Songwriting that lands like an intense, unguarded voice memo tracking the complex, messy textures of young identity",
    "A beautiful, early afternoon oasis that pairs delicate, close-mic'd vocal layers with unexpectedly heavy baseline drops",
    "The official premier festival tour run showcasing her highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: ["Bass & Groove", "Intimate Performance", "Dark Mood Visuals", "Crowd Atmosphere"],
  bestFor: ["Early Afternoon Discovery", "Lyric & Narrative Obsessives"],
  similarArtists: [
    {
      name: "Chezile",
      slug: "chezile",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b1593dbc8b1c5ee3c62b55a1",
    },
    {
      name: "Leon Thomas",
      slug: "leon-thomas",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c6c4f4aaf40ebee92b8a8228",
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
  ],
  tracks: [
    { name: "wnad", album: "wnad", duration: "" },
    { name: "no love", album: "no love", duration: "" },
    { name: "sweet", album: "sweet", duration: "" },
  ],
  about:
    "Kiana Wong, performing under the singular moniker KWN, is a London-born singer, songwriter, and electronic engineer who built an intensely passionate global community through her hyper-specific, beautifully haunting brand of contemporary alternative R&B. Rooted in the emotional intimacy of bedroom pop recordings but elevated by deep, heavy urban rhythm pockets and sharp vocal deliveries, her tracks dissect young adulthood with profound precision. Handpicked for an extensive global tour cycle, her early afternoon live set transforms a sprawling festival field into an immersive listening experience.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Saturday",
    date: "Aug 1",
    startTime: "6:30 PM",
    endTime: "7:15 PM",
  },
};

const siennaSpiro: Artist = {
  name: "Sienna Spiro",
  slug: "sienna-spiro",
  genres: ["Soul", "R&B", "Chamber Pop"],
  origin: "London, England",
  tagline: "Stunning, earth-shaking British soul built on monumental, timeless vocal authority.",
  socials: { spotify: "https://open.spotify.com/artist/02gSuSAWEdWa5UOvqzjX6v" },
  whySee: [
    "Witness one of the most technically gifted, breathtakingly unique young vocalists performing anywhere across the entire weekend",
    "Spiro's operatic, powerhouse vocal delivery effortlessly filling the open air with staggering emotional power",
    "A beautifully dramatic, orchestrally layered sonic experience that seamlessly fuses contemporary pop with traditional soul",
    "Experience the raw, bone-chilling crowd connection driven by intense, massive dark-pop stadium singalongs",
  ],
  whatToExpect: ["Technical Vocal Range", "Lush Sound", "Theatrical Staging"],
  bestFor: ["Early Afternoon Discovery", "Storytelling Lovers"],
  similarArtists: [
    {
      name: "Valencia Grace",
      slug: "valencia-grace",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17825599b11aff6d045b573a13f",
    },
    {
      name: "Olivia Dean",
      slug: "olivia-dean",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1785c7577ad44daeb7ce4b941a1",
    },
    {
      name: "Jae Stephens",
      slug: "jae-stephens",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17886987e340bcff4b2debb3e84",
    },
    { name: "Justine Skye", slug: "justine-skye" },
  ],
  tracks: [
    { name: "Need Me", album: "Need Me", duration: "" },
    { name: "Stay", album: "Stay", duration: "" },
    { name: "Home", album: "Home", duration: "" },
  ],
  about:
    "Sienna Spiro is a London-born singer-songwriter whose extraordinary vocal range, rich neo-soul arrangements, and tragi-comic cinematic pop anthems have earned her widespread critical adoration. Fusing traditional Motown vocal ornamentation with heavy, contemporary dark-pop instrumentation and sharp piano lines, she writes sweeping tales of resilience, loss, and emotional autonomy. Commanding the stage with profound, operatic authority, her early afternoon set stands as an undeniable showcase of pristine musical power.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Saturday",
    date: "Aug 1",
    startTime: "5:15 PM",
    endTime: "6:00 PM",
  },
};

const maxStyler: Artist = {
  name: "Max Styler",
  slug: "max-styler",
  genres: ["Tech House", "Dark Techno", "Electronic"],
  origin: "San Luis Obispo, California",
  tagline: "Dark, hypnotic tech-house grooves built for early evening warehouse raves.",
  socials: { spotify: "https://open.spotify.com/artist/3NKKngINK1tP6BFy0WOyWk" },
  whySee: [
    "One of the tech-house underground's absolute finest modern technicians commanding an intense, high-energy dance session",
    "Experience a relentless display of syncopated swing rhythms, heavy bassline rollers, and infectious classic vocal chops",
    "Catch a pioneer of the current international electronic groove resurgence during a prime, highly anticipated slot under the tent",
    "An absolute, non-stop dance accelerator designed perfectly to turn a festival crowd into a boiling warehouse rave",
  ],
  whatToExpect: [
    "Cinematic Visuals",
    "Bass & Groove",
    "High-Energy Pacing",
    "Intense Fan Connection",
  ],
  bestFor: ["Tent & Club Venue Seekers", "Dance Floor Seekers", "Bass & Groove Lovers"],
  similarArtists: [
    {
      name: "Peace Control",
      slug: "peace-control",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17817b940b1cfc87546d75925c0",
    },
    {
      name: "Eli Brown",
      slug: "eli-brown",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178264c8c3a982604908c6cf188",
    },
    {
      name: "Disco Lines",
      slug: "disco-lines",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178965c9bf81cfe9ca329b8a5c7",
    },
    {
      name: "John Summit",
      slug: "john-summit",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17820662b32f3dbabad755dfb53",
    },
  ],
  tracks: [
    {
      spotifyId: "4XRROIQrTul8S5ISpQzeOh",
      name: "Resist",
      album: "Resist",
      duration: "3:23",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e026b5537c8b9d885ba5e29ce99",
    },
    { name: "Wanna Dance", album: "Wanna Dance", duration: "" },
    {
      spotifyId: "1TCJjzvQn6zaIzckTZiabG",
      name: "Hypnotic",
      album: "Hypnotic",
      duration: "3:20",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02807ec4836f7f3366efb4b516",
    },
  ],
  about:
    "Max Styler is a California-born DJ and electronic producer who has rapidly solidified his position as one of the modern era's most prolific and essential tech-house forces. Blending the nostalgic, soulful swing of underground clubs with the crushing, heavy bassline weight of contemporary dance networks, his landmark projects have earned widespread institutional praise. Behind the decks, Styler delivers a technically flawless, high-tempo masterclass in rhythm manipulation that sets the exact standard for modern club music.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Saturday",
    date: "Aug 1",
    startTime: "5:45 PM",
    endTime: "6:45 PM",
  },
};

const spaceyJane: Artist = {
  name: "Spacey Jane",
  slug: "spacey-jane",
  genres: ["Indie Rock", "Surf Rock", "Alt-Pop"],
  origin: "Fremantle, Australia",
  tagline: "Sun-drenched Australian indie rock packed with soaring, melancholic festival anthems.",
  socials: { spotify: "https://open.spotify.com/artist/6V70yeZQCoSR2M3fyW8qiA" },
  whySee: [
    "Australia's premier indie-rock export delivering a massive, high-energy mainstage performance packed with soaring guitar pop hooks",
    "Caleb Harper's deeply honest, conversational vocal leads commanding massive, park-wide crowd singalongs under the open sky",
    "Experience the live execution of massive global breakout anthems like 'Booster Seat' that perfectly bottle up youth anxieties",
    "A flawlessly tight live show built on years of relentless arena touring, delivering an absolute masterclass in sun-drenched camaraderie",
  ],
  whatToExpect: ["Guitar-Driven Sound", "Massive Singalongs", "Afternoon Vibes"],
  bestFor: ["Bass & Groove Lovers"],
  similarArtists: [
    {
      name: "Marlon Funaki",
      slug: "marlon-funaki",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178712c7cd98ae745930f1e86a6",
    },
    {
      name: "The Army, The Navy",
      slug: "the-army-the-navy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a80252ae3d399fc49014502d",
    },
    { name: "Surfing for Daisy", slug: "surfing-for-daisy" },
    {
      name: "Ella Red",
      slug: "ella-red",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17839b0de9171e1e5ff2d8a39cb",
    },
  ],
  tracks: [
    {
      spotifyId: "72RC6Kw32QfJi6RzlDKNxs",
      name: "Booster Seat",
      album: "Sunlight",
      duration: "4:28",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02f4e16426b9de1ae437f588e7",
    },
    { name: "Feeding the Family", album: "Sunlight", duration: "" },
    {
      spotifyId: "14hUuDsgEshd6VjyGxk8RB",
      name: "Hardlight",
      album: "Here Comes Everybody",
      duration: "3:33",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02cc3d962daa7e5d11efc6563e",
    },
  ],
  about:
    "Spacey Jane is the Fremantle-born alternative rock quartet comprising Caleb Harper, Ashton Hardman-Le Cornu, Jerra Anstey, and Peppa Lane, whose meticulous blend of fuzzed-out surf rock distortion, driving indie rhythms, and earnest lyricism has earned them massive global acclaim. Breaking out of Western Australia to capture international chart dominance, the band writes sweeping, emotionally precise tales of relationship anxieties, identity, and modern isolation. Occupying a high-visibility late-afternoon slot, their performance brings a beautifully raw rock clinic to Grant Park.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Saturday",
    date: "Aug 1",
    startTime: "5:30 PM",
    endTime: "6:30 PM",
  },
};

const wolfAlice: Artist = {
  name: "Wolf Alice",
  slug: "wolf-alice",
  genres: ["Alternative Rock", "Shoegaze", "Indie Rock"],
  origin: "London, England",
  tagline:
    "A terrifyingly beautiful, blistering collision of heavy shoegaze walls and fierce cinematic art-rock.",
  socials: { spotify: "https://open.spotify.com/artist/3btzEQD6sugImIHPMRgkwV" },
  whySee: [
    "A massive, highly anticipated mainstage return from a Mercury Prize-winning powerhouse operating at the peak of their live authority",
    "Ellie Rowsell's extraordinary, flexible vocal delivery shifting effortlessly from delicate dream-pop whispers to ferocious rock snarls",
    "Experience an elite multi-instrumental ensemble delivering a towering wall of fuzzed-out guitar distortion and complex rhythms",
    "An absolute masterclass in traditional analog band chemistry that handles giant festival fields with profound emotional power",
  ],
  whatToExpect: [
    "Guitar-Driven Sound",
    "Choreography",
    "Crowd Atmosphere",
    "Production Style Approach",
  ],
  bestFor: ["Storytelling Lovers"],
  similarArtists: [
    { name: "The Bends", slug: "the-bends" },
    {
      name: "The Creekers",
      slug: "the-creekers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783bd55f87a9e1be1eb5b1c1e1",
    },
    { name: "Cruz Beckham and the Breakers", slug: "cruz-beckham-and-the-breakers" },
    {
      name: "Wunderhorse",
      slug: "wunderhorse",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1780e05e549428cb38b2f3e7a60",
    },
  ],
  tracks: [
    { name: "Don't Delete the Kisses", album: "Visions of a Life", duration: "" },
    { name: "The Last Man on Earth", album: "Blue Weekend", duration: "" },
    {
      spotifyId: "0wQKKPy050lguUxlKvHIi5",
      name: "Smile",
      album: "Blue Weekend",
      duration: "3:16",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02ae6b2ae9241c11cb170a2bc5",
    },
  ],
  about:
    "Wolf Alice is the London-born alternative rock outfit led by singer-songwriter Ellie Rowsell alongside Joff Oddie, Theo Ellis, and Joel Amey, whose uncompromising independent path and pristine studio records have established them as essential vanguards of modern rock. Seamlessly fusing the cold textures of late-80s shoegaze, gritty grunge riffs, and glossy art-pop melodies, the band anchors a monumental sonic landscape that addresses trauma, identity, and intimacy with staggering honesty. Moving onto a major sub-headlining mainstage slot, their live performance scales bedroom vulnerability into sweeping arena-sized anthems.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Bud Light",
    day: "Saturday",
    date: "Aug 1",
    startTime: "3:15 PM",
    endTime: "4:15 PM",
  },
};

const whethan: Artist = {
  name: "Whethan",
  slug: "whethan",
  genres: ["Future Bass", "Dance Pop", "Electronic"],
  origin: "Chicago, Illinois",
  tagline:
    "Hometown electronic wunderkind delivering glossy, high-energy future bass and synth-pop heaters.",
  socials: { spotify: "https://open.spotify.com/artist/0vqJkZ0RpLZixt3lTmD8vP" },
  whySee: [
    "A massive, highly anticipated hometown showcase performance from a multi-platinum electronic mastermind under the Perry's tent",
    "Experience a non-stop, high-velocity dance party packed back-to-back with a decade of global crossover festival weapons",
    "An absolute masterclass in party curation, blending heavy future bass drops with incredibly bright, infectious vocal loops",
    "The ultimate early-evening crowd catalyst designed purely to get massive groups of friends dancing together as the skyline shifts",
  ],
  whatToExpect: ["Bass & Groove", "High-Production Visuals", "High-Energy Pacing"],
  bestFor: ["Hometown & Local Supporters", "Dance Floor Seekers"],
  similarArtists: [
    {
      name: "The Chainsmokers",
      slug: "the-chainsmokers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1784567279fac84a0375c3d819b",
    },
    {
      name: "Major Lazer",
      slug: "major-lazer",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178ab312009266614f4d3185229",
    },
    {
      name: "Know Good",
      slug: "know-good",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1785358de71801fad4a13adc2f2",
    },
    { name: "Zack Martino", slug: "zack-martino" },
  ],
  tracks: [
    { name: "High (with Dua Lipa)", album: "Fifty Shades Freed", duration: "" },
    { name: "Savage", album: "Life of a Wallflower Vol. 1", duration: "" },
    { name: "MONEY ON THE DASH", album: "Life of a Wallflower Vol. 2", duration: "" },
  ],
  about:
    "Ethan Snoreck, performing under the iconic moniker Whethan, is a Chicago-born electronic producer and DJ who completely re-engineered the crossover dance music landscape as a teenage phenom. Characterized by his unique formula of minimalist, high-tempo synth pop loops, heavy future bass steps, and pristine alternative vocal choices, his production has anchored some of global pop's biggest radio hits. Earning a highly coveted evening slot on Perry's stage, his hometown performance serves as an explosive celebration of modern electronic music history.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Saturday",
    date: "Aug 1",
    startTime: "4:15 PM",
    endTime: "5:15 PM",
  },
};

const cortis: Artist = {
  name: "CORTIS",
  slug: "cortis",
  genres: ["K-Pop", "Hip-Hop", "Korean Hip-Hop"],
  origin: "Seoul, South Korea",
  tagline:
    "Bold, boundary-pushing K-pop hip-hop delivering high-fashion intensity and massive global streams.",
  socials: { spotify: "https://open.spotify.com/artist/1ebt9HnXdyYA6KgLXr1n4P" },
  whySee: [
    "A massive, highly anticipated mainstage festival appearance bringing world-class Korean hip-hop choreography directly to Grant Park",
    "Hear the thunderous live festival execution of 'REDRED'—the smash title track that dominated charts for 11 straight weeks",
    "Experience their viral, 100-million stream breakout anthem 'GO!' live as an absolute high-velocity afternoon catalyst",
    "Witness the high-fashion performance swagger of 'FaSHioN', fresh off its massive live showcase at the NBA Crossover concert",
  ],
  whatToExpect: ["Choreography", "Bass & Groove", "Cinematic Visuals", "Intense Fan Connection"],
  bestFor: ["Dance Floor Seekers", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Jennie",
      slug: "jennie",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a8e3627e392a1d8f539cb575",
    },
    {
      name: "Little Simz",
      slug: "little-simz",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a22264dfbad2d96ffc6ee2e0",
    },
    {
      name: "bbno$",
      slug: "bbno-dollar",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178e7c585e9ecd65c76b7bf91ac",
    },
    {
      name: "Nettspend",
      slug: "nettspend",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786bc255a221b2d2db4c1de21f",
    },
  ],
  tracks: [
    {
      spotifyId: "4BnDAG8QyfWirLFdGuV99x",
      name: "REDRED",
      album: "GREENGREEN",
      duration: "2:43",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e027a702a4c3a18c1439fdc29ff",
    },
    {
      spotifyId: "6OWWZtNQORY1McaZmOrwhc",
      name: "GO!",
      album: "Color Outside the Lines",
      duration: "2:50",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e024b56a34b0c2b3798fd46f855",
    },
    {
      spotifyId: "4ecdsGz3Hg6TKPwQ0ZOdJz",
      name: "FaSHioN",
      album: "Color Outside the Lines",
      duration: "2:54",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e024b56a34b0c2b3798fd46f855",
    },
  ],
  about:
    "CORTIS is a global K-pop and hip-hop phenomenon whose unique fusion of heavy, bounce-driven rap structures, high-fashion styling, and hyper-synchronized dance precision has shattered streaming records worldwide. Breaking out internationally with their debut studio album 'Color Outside the Lines', the group cemented their status as dominant mainstream forces when their second mini-album title track 'REDRED' spent 11 consecutive weeks at number one on the charts. Commandeering a rapid-fire, high-visibility mid-afternoon slot on the mainstage, their live performance delivers an undeniable masterclass in pure pop velocity.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "T-Mobile",
    day: "Saturday",
    date: "Aug 1",
    startTime: "2:55 PM",
    endTime: "3:15 PM",
  },
};

const cameronWhitcomb: Artist = {
  name: "Cameron Whitcomb",
  slug: "cameron-whitcomb",
  genres: ["Country", "Alternative Folk", "Americana"],
  origin: "Kamloops, Canada",
  tagline: "Raw, gravel-voiced country grit delivered with explosive, unhinged live energy.",
  socials: { spotify: "https://open.spotify.com/artist/6dhXvR5MsnlwYguRuqoapR" },
  whySee: [
    "An absolute force of nature delivering one of the most high-octane, visually unpredictable acoustic rock sets of the afternoon",
    "Whitcomb's extraordinary, deeply textured vocal rasp effortlessly filling the open air with staggering emotional power",
    "A masterclass in traditional analog live energy, performing backflips across the stage while maintaining perfect mic command",
    "Experience razor-sharp country lyrics that trade on absolute emotional honesty, modern wit, and incredible acoustic hooks",
  ],
  whatToExpect: ["Choreography", "Guitar-Driven Sound", "Conversational Delivery"],
  bestFor: ["Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Waylon Wyatt",
      slug: "waylon-wyatt",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17851e191838dca7d4729b268a2",
    },
    {
      name: "Nat Myers",
      slug: "nat-myers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782f32ced200ebf7a8f6047377",
    },
    {
      name: "Calder Allen",
      slug: "calder-allen",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c4a45f0e840b74b85c5e87d9",
    },
    {
      name: "Elizabeth Nichols",
      slug: "elizabeth-nichols",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786a6686aacc775a0807c37cd8",
    },
  ],
  tracks: [
    { name: "The Road", album: "The Road", duration: "" },
    { name: "Quitting Time", album: "Quitting Time", duration: "" },
    { name: "Rock Bottom", album: "Rock Bottom", duration: "" },
  ],
  about:
    "Cameron Whitcomb is a Canadian-born country singer-songwriter whose brilliant combination of rugged americana roots, modern storytelling wit, and jaw-dropping vocal rasp has sparked widespread critical acclaim. Forging a distinctively high-octane lyrical universe that dissects labor, recovery, and romance, Whitcomb commands the stage with the effortless confidence of a seasoned road warrior. Known for his chaotic stage acrobatics and intense physical vocabulary, his early afternoon set provides a refreshing, beautifully raw antidote to standard festival pop noise.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Saturday",
    date: "Aug 1",
    startTime: "7:45 PM",
    endTime: "8:30 PM",
  },
};

const ayybo: Artist = {
  name: "AYYBO",
  slug: "ayybo",
  genres: ["Tech House", "G-House", "Electronic"],
  origin: "Orange County, California",
  tagline: "Dark, low-slung house grooves packed with heavy, hip-hop-infused club attitude.",
  socials: { spotify: "https://open.spotify.com/artist/0YVquC9RaJLYFNmlJFzkTV" },
  whySee: [
    "One of the tech-house underground's absolute finest modern technicians commanding an intense, high-energy dance session",
    "Experience a relentless display of syncopated swing rhythms, heavy bassline rollers, and infectious classic vocal chops",
    "Catch a pioneer of the current international electronic groove resurgence during a prime, highly anticipated slot under the tent",
    "An absolute, non-stop dance accelerator designed perfectly to turn a festival crowd into a boiling warehouse rave",
  ],
  whatToExpect: [
    "Cinematic Visuals",
    "Bass & Groove",
    "High-Energy Pacing",
    "Intense Fan Connection",
  ],
  bestFor: ["Tent & Club Venue Seekers", "Dance Floor Seekers", "Bass & Groove Lovers"],
  similarArtists: [
    {
      name: "INJI",
      slug: "inji",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bb9b2f1ed4018b6bd506516b",
    },
    {
      name: "John Summit",
      slug: "john-summit",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17820662b32f3dbabad755dfb53",
    },
    {
      name: "Omnom",
      slug: "omnom",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a9b9e8e9f12e78d2eb637a6a",
    },
    {
      name: "RØZ",
      slug: "roz",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1780744913e8d8f59576784147b",
    },
  ],
  tracks: [
    { name: "HYPNOTIC", album: "HYPNOTIC", duration: "" },
    { name: "MOVE", album: "MOVE", duration: "" },
    { name: "RIGHT NOW", album: "RIGHT NOW", duration: "" },
  ],
  about:
    "Aaronis Jackson, performing under the singular moniker AYYBO, is an Orange County-born DJ and electronic producer who has rapidly solidified his position as one of the modern era's most prolific and essential tech-house forces. Blending the nostalgic, soulful swing of underground hip-hop with the crushing, heavy bassline weight of contemporary dance networks, his landmark projects have earned widespread institutional praise. Behind the decks, AYYBO delivers a technically flawless, high-tempo masterclass in rhythm manipulation that sets the exact standard for modern club music.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Saturday",
    date: "Aug 1",
    startTime: "3:00 PM",
    endTime: "4:00 PM",
  },
};

const khamari: Artist = {
  name: "Khamari",
  slug: "khamari",
  genres: ["Alternative R&B", "Soul", "Neo-Soul"],
  origin: "Boston, Massachusetts",
  tagline: "Stunning, whisper-close confessional R&B built on timeless multi-instrumental poetry.",
  socials: { spotify: "https://open.spotify.com/artist/6kmDosYCYjFQtywDq0DLPZ" },
  whySee: [
    "Catch an exceptional alternative R&B lyricist executing a deeply atmospheric, storyteller-style performance on the alternative stage",
    "Songwriting that lands like an intense, unguarded voice memo tracking the complex, messy textures of young identity",
    "A beautiful, early afternoon oasis that pairs delicate vocal textures with unexpectedly heavy baseline drops",
    "The official premier festival tour run showcasing his highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: ["Bass & Groove", "Intimate Performance", "Dark Mood Visuals", "Crowd Atmosphere"],
  bestFor: ["Tent & Club Venue Seekers", "Dance Floor Seekers", "Bass & Groove Lovers"],
  similarArtists: [
    {
      name: "Destin Conrad",
      slug: "destin-conrad",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786be69fc54978eb83fa10167c",
    },
    {
      name: "Chezile",
      slug: "chezile",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b1593dbc8b1c5ee3c62b55a1",
    },
    {
      name: "Leon Thomas",
      slug: "leon-thomas",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c6c4f4aaf40ebee92b8a8228",
    },
    { name: "KWN", slug: "kwn" },
  ],
  tracks: [
    {
      spotifyId: "4ZgXDDRSS4lVx1g3WkRon0",
      name: "Doctor, My Eyes",
      album: "A Brief Nirvana",
      duration: "3:14",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0206e4905884a56d60f27ebfdf",
    },
    { name: "Cherry On Top", album: "A Brief Nirvana", duration: "" },
    { name: "TheseฤซDays", album: "A Brief Nirvana", duration: "" },
  ],
  about:
    "Khamari is a Boston-born singer, songwriter, and multi-instrumentalist who built an intensely passionate global community through his hyper-specific, beautifully haunting brand of contemporary alternative R&B. Rooted in the emotional intimacy of bedroom pop recordings but elevated by deep, heavy urban rhythm pockets and sharp vocal deliveries, his tracks dissect young adulthood with profound precision. Handpicked for an extensive global tour cycle, his early afternoon live set transforms a sprawling festival field into an immersive listening experience.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Saturday",
    date: "Aug 1",
    startTime: "3:45 PM",
    endTime: "4:30 PM",
  },
};

const quadeca: Artist = {
  name: "Quadeca",
  slug: "quadeca",
  genres: ["Folktronica", "Alternative Hip-Hop", "Neo-Psychedelia"],
  origin: "Los Angeles, California",
  tagline: "A beautifully haunting, glitchy collision of ambient folk glow and avant-garde rap.",
  socials: { spotify: "https://open.spotify.com/artist/3zz52ViyCBcplK0ftEVPSS" },
  whySee: [
    "One of alternative music's absolute finest contemporary innovators delivering a high-octane audio-visual sermon to the alternative stage",
    "Benjamin Lasky's flexible vocal command shifting effortlessly from brutal rap flows to gorgeous dream-pop runs",
    "Experience the live, towering execution of tracks from his genre-shattering masterpiece, I Didn't Mean to Haunt You",
    "A blistering live rock engine that transforms traditional festival crowds into deeply emotional performance art spaces",
  ],
  whatToExpect: ["Cinematic Visuals", "Lush Sound", "Rhythm Complexity", "Crowd Atmosphere"],
  bestFor: ["Sound Design & Production Nerds", "Lyric & Narrative Obsessives"],
  similarArtists: [
    { name: "After", slug: "after" },
    {
      name: "Love Spells",
      slug: "love-spells",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b33be717b74e15b9f5c235f2",
    },
    {
      name: "Evening Elephants",
      slug: "evening-elephants",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b0270b39611e7152aa4832f9",
    },
    { name: "Easy Honey", slug: "easy-honey" },
  ],
  tracks: [
    { name: "Born Yesterday", album: "I Didn't Mean to Haunt You", duration: "" },
    { name: "Tell Me A Joke", album: "I Didn't Mean to Haunt You", duration: "" },
    {
      spotifyId: "5jxJX7R3q0Wum8BLlqprdq",
      name: "Sisyphus",
      album: "From Me To You",
      duration: "4:32",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02901b1a9b8054f02142079fc5",
    },
  ],
  about:
    "Benjamin Lasky, performing under the moniker Quadeca, has spent the modern creative era standing at the absolute vanguard of contemporary music, single-handedly transforming from an internet rap prodigy into a revered avant-garde auteur. Characterized by his unique choice of hazy, tape-warped production layers, folk-glow arrangements, and deeply moving narrative poetry, his records explore grief and memory with profound honesty. Backed by intense live musicianship and a fierce performance ethos, his early evening set stands as a thrilling masterclass in pure sonic tension.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Saturday",
    date: "Aug 1",
    startTime: "4:00 PM",
    endTime: "4:45 PM",
  },
};

const momma: Artist = {
  name: "Momma",
  slug: "momma",
  genres: ["Indie Rock", "90s Alternative", "Grunge"],
  origin: "Los Angeles, California",
  tagline: "Fuzzed-out, heavy 90s alternative rock hooks packed with sharp melodic grit.",
  socials: { spotify: "https://open.spotify.com/artist/5Wj0an60VgRckYV9zlDe1e" },
  whySee: [
    "Catch an exceptional songwriting collective executing a beautifully warm, sun-drenched indie rock performance on the Allianz stage",
    "Etta Friedman and Allegra Weingarten's perfectly synchronized vocal harmonies gliding over heavy, chorus-heavy dream pop guitar lines",
    "A masterclass in traditional analog power band energy, delivering jagged dual-guitar riffs and complex progressive rhythmic patterns",
    "The official festival tour run highlighting their highly celebrated independent studio catalog to a massive live audience",
  ],
  whatToExpect: ["Guitar-Driven Sound", "Conversational Delivery", "Energetic Mosh Pits"],
  bestFor: ["Mosh Pit Lovers", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "The Braymores",
      slug: "the-braymores",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178e72ca0c70ab4f5bb3da261dc",
    },
    {
      name: "Spacey Jane",
      slug: "spacey-jane",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f5864abfed7a8d4b9334a7a0",
    },
    {
      name: "Water From Your Eyes",
      slug: "water-from-your-eyes",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b34bc1624b682463e153834a",
    },
    {
      name: "Mother Mother",
      slug: "mother-mother",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fdfbc01d2597633aae65f6b7",
    },
  ],
  tracks: [
    {
      spotifyId: "2QYmaiPbbXxXMBrvWj34m0",
      name: "Speeding 72",
      album: "Household Name",
      duration: "3:58",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02088d81927483865772a923cd",
    },
    {
      spotifyId: "0nh29E71VEHJD8HxMyckVf",
      name: "Rockstar",
      album: "Household Name",
      duration: "3:09",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02088d81927483865772a923cd",
    },
    { name: "Medicine", album: "Medicine", duration: "" },
  ],
  about:
    "Momma is the Los Angeles-born alternative rock project led by singer-songwriters Etta Friedman and Allegra Weingarten, whose meticulous blend of fuzzed-out garage indie grit, 90s grunge tropes, and heavy dual-guitar songwriting has earned them widespread critical adoration. Drawing sharp atmospheric blueprints from classic alternative legends like Smashing Pumpkins and Nirvana, the group writes sweeping tales of youth, ambition, and modern isolation. Backed by exceptionally tight live chemistry, their afternoon performance provides a high-energy masterclass in pure guitar-driven rock.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Saturday",
    date: "Aug 1",
    startTime: "4:15 PM",
    endTime: "5:15 PM",
  },
};

const frostChildren: Artist = {
  name: "Frost Children",
  slug: "frost-children",
  genres: ["Hyperpop", "Digital Hardcore", "Electronic"],
  origin: "New York, New York",
  tagline: "Blistering, hyper-chaotic internet pop and unhinged digital hardcore perfection.",
  socials: { spotify: "https://open.spotify.com/artist/6R1kfr0GIWnwxY4zW11Vag" },
  whySee: [
    "The absolute polarising flashpoint of modern underground internet pop making an explosive, completely unhinged club statement",
    "Lulu and Angel Prost's magnetic stage command delivering sharp hardware manipulation alongside high-fashion electronic production",
    "Experience a cult-favorite internet pioneer running through a stacked, multi-million stream catalog of futuristic pop anthems",
    "An absolute wildfire crowd environment packed with chaotic, high-energy teenage mosh pits early in the day",
  ],
  whatToExpect: ["Retro-Futuristic Aesthetic", "Intense Fan Connection"],
  bestFor: ["Dance Floor Seekers"],
  similarArtists: [
    {
      name: "Ninajirachi",
      slug: "ninajirachi",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1789ab4772c0bd3455137b1d02e",
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
    {
      name: "John Summit",
      slug: "john-summit",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17820662b32f3dbabad755dfb53",
    },
  ],
  tracks: [
    {
      spotifyId: "4FjpNddm5GtoIS81GxoQz1",
      name: "FLATLINE",
      album: "SPEED RUN",
      duration: "3:45",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e021b118cbb5309ce2f685cfb39",
    },
    { name: "FOXGLOVE", album: "SPEED RUN", duration: "" },
    { name: "Strobe", album: "Hearth Room", duration: "" },
  ],
  about:
    "Frost Children is the New York-based avant-garde electronic project of siblings Lulu and Angel Prost, who rapidly vaulted from Soundcloud isolation into global pop attention, commanding an intensely passionate internet-cult following. Seamlessly fusing the glossy, maximalist electronic textures of early-2000s Eurodance with aggressive digital hardcore instrumentation and postmodern subversion, the duo crafts an intensely joyful sonic universe. Live, their project strips away traditional indie rock solemnity for a world-class masterclass in high-fashion pop showmanship and pure crowd chaos.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Saturday",
    date: "Aug 1",
    startTime: "2:15 PM",
    endTime: "3:30 PM",
  },
};

const goldieBoutilier: Artist = {
  name: "Goldie Boutilier",
  slug: "goldie-boutilier",
  genres: ["Alt-Pop", "Art Pop", "Americana-Pop"],
  origin: "Cape Breton, Canada",
  tagline: "Glittering, vintage Hollywood-hued pop tragedy wrapped in lush, cinematic spaces.",
  socials: { spotify: "https://open.spotify.com/artist/392WuM1Yb4QRI0GG4epyn5" },
  whySee: [
    "Experience a breathtaking, retro-fueled performance that translates 1970s cinematic style into a modern festival landscape",
    "Goldie's soaring, multi-octave vocal control flawlessly commanding an emotionally massive early afternoon crowd",
    "Hear the live execution of fresh, beautifully theatrical alt-pop masterpieces from her highly acclaimed recent studio era",
    "A gorgeous, sun-drenched sonic oasis designed perfectly to completely escape standard commercial pop noise",
  ],
  whatToExpect: [
    "Cinematic Visuals",
    "Technical Vocal Range",
    "Theatrical Staging",
    "Afternoon Vibes",
  ],
  bestFor: [
    "Sound Design & Production Nerds",
    "Lyric & Narrative Obsessives",
    "Early Afternoon Discovery",
  ],
  similarArtists: [
    {
      name: "Claire Rosinkranz",
      slug: "claire-rosinkranz",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1789fd59f9fc4a311da6437b6a5",
    },
    {
      name: "Julia Wolf",
      slug: "julia-wolf",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178464afc83fc7ddaf9292bb9a8",
    },
    {
      name: "Emi Grace",
      slug: "emi-grace",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781d8d8c934c382100d033bb41",
    },
    {
      name: "Spacey Jane",
      slug: "spacey-jane",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f5864abfed7a8d4b9334a7a0",
    },
  ],
  tracks: [
    { name: "The Gold", album: "Emerald Year", duration: "" },
    { name: "Cowboy", album: "The Gold EP", duration: "" },
    { name: "Kryptonite", album: "Emerald Year", duration: "" },
  ],
  about:
    "Goldie Boutilier is a Canadian-born singer, songwriter, and multi-instrumentalist whose meticulous combination of hazy 1970s americana melodies, driving synth-pop hooks, and smoky, melancholic storytelling has earned her widespread critical adoration. Dissecting themes of Hollywood glamour, transient fame, and personal identity with profound lyrical wit, her independent records have established her as a premier alternative pop auteur. Moving onto the Allianz stage for a high-profile opening slot, her live performance elevates raw bedroom vulnerability into an exceptionally stylish, widescreen cinematic diary entry.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Saturday",
    date: "Aug 1",
    startTime: "2:15 PM",
    endTime: "3:15 PM",
  },
};

const dieSpitz: Artist = {
  name: "Die Spitz",
  slug: "die-spitz",
  genres: ["Grunge", "Punk Rock", "Garage Rock"],
  origin: "Austin, Texas",
  tagline: "Ferocious, fuzzed-out Texas punk and untamed garage grit built to shred stages.",
  socials: { spotify: "https://open.spotify.com/artist/0zfZmpHTu0MlkkNr5KHeXE" },
  whySee: [
    "An absolute lightning-strike afternoon set from Austin's favorite punk quartet executing an intensely aggressive live rock engine",
    "Blistering, rapid-fire dual-guitar distortion and raw vocal snarls that completely bypass processed backing tracks",
    "Experience a cult-favorite underground phenomenon renowned for transforming standard festival fields into pure mosh-pit chaos",
    "A non-stop, high-octane alternative catalyst built around raw analog band chemistry and severe sub-cultural authority",
  ],
  whatToExpect: ["Raw Vocal Delivery", "Energetic Mosh Pits", "High-Energy Pacing"],
  bestFor: ["Mosh Pit Lovers"],
  similarArtists: [
    {
      name: "Bad Nerves",
      slug: "bad-nerves",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178ca8c5f607e5e4d7c70c4da79",
    },
    {
      name: "Kim Theory",
      slug: "kim-theory",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178aeb5f081b1d106a80f4a67a6",
    },
    { name: "Cruz Beckham and the Breakers", slug: "cruz-beckham-and-the-breakers" },
    {
      name: "Momma",
      slug: "momma",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781079525c9132bc6a8bd1e833",
    },
  ],
  tracks: [
    { name: "Hair of the Dog", album: "Teeth", duration: "" },
    { name: "Monkey Brains", album: "Teeth", duration: "" },
    { name: "Grip", album: "Grip", duration: "" },
  ],
  about:
    "Die Spitz is the Austin-born punk rock powerhouse consisting of Ava Fine, Chloe Inendino, Ellie Livingston, and Kate Halter, who rapidly revitalized the Texas underground through ferocious live sets and raw audacity. Referencing the structural blueprints of classic 90s grunge and abrasive garage rock, the quartet writes blistering, uncompromising statements tracking interpersonal chaos and counter-culture rebellion. Coming off a series of widely discussed international support tours, their high-energy afternoon performance delivers a thrilling masterclass in pure analog rock adrenaline.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Saturday",
    date: "Aug 1",
    startTime: "1:50 PM",
    endTime: "2:30 PM",
  },
};

const lucyBedroque: Artist = {
  name: "Lucy Bedroque",
  slug: "lucy-bedroque",
  genres: ["Indie Pop", "Alt-Pop", "Bedroom Pop"],
  origin: "New York, New York",
  tagline: "Conversational, shadow-drenched bedroom alt-pop for nocturnal overthinkers.",
  socials: { spotify: "https://open.spotify.com/artist/2I8H267eH5va9da4vGt38O" },
  whySee: [
    "Catch a hyper-gifted independent lyricist executing a deeply atmospheric, confessional performance on the alternative stage",
    "Songwriting that lands like an intense, unguarded voice memo tracking the complex, messy textures of young romance",
    "A beautiful early afternoon oasis that pairs delicate vocal patterns with unexpectedly heavy electronic bass drops",
    "The official premier festival tour run showcasing her highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: [
    "Lyrical Storytelling",
    "Dark Mood Visuals",
    "Conversational Delivery",
    "Dreamy Atmosphere",
  ],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Emi Grace",
      slug: "emi-grace",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781d8d8c934c382100d033bb41",
    },
    {
      name: "sombr",
      slug: "sombr",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17878edaa6468cae153565c2c97",
    },
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
  ],
  tracks: [
    { name: "Overdriven", album: "Bedroque", duration: "" },
    { name: "Vampire", album: "Bedroque", duration: "" },
    { name: "Blue", album: "Blue", duration: "" },
  ],
  about:
    "Lucy Bedroque is a New York-born singer-songwriter who built an intensely passionate internet community through her hyper-vivid, beautifully conversational brand of contemporary alt-pop. Rooted in the emotional intimacy of close-mic'd bedroom recordings but elevated by deep, brooding alternative electronic arrangements and sharp synth loops, her tracks explore young adulthood with profound precision. Handpicked for an extensive global breakout tour cycle, her early afternoon live set transforms a sprawling festival lawn into an intimate listening experience.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "T-Mobile",
    day: "Saturday",
    date: "Aug 1",
    startTime: "1:10 PM",
    endTime: "1:55 PM",
  },
};

const omnom: Artist = {
  name: "Omnom",
  slug: "omnom",
  genres: ["Tech House", "House", "Electronic"],
  origin: "Los Angeles, California",
  tagline: "Bouncy, low-slung tech-house grooves packed with heavy, hip-hop-infused club attitude.",
  socials: { spotify: "https://open.spotify.com/artist/3PYRXP25JcbqhvNaJYcnWy" },
  whySee: [
    "One of the tech-house underground's absolute finest modern technicians commanding an intense, high-energy dance session",
    "Experience a relentless display of syncopated swing rhythms, heavy bassline rollers, and infectious classic vocal chops",
    "Catch a pioneer of the current international electronic groove resurgence during a prime, highly anticipated slot under the tent",
    "An absolute, non-stop dance accelerator designed perfectly to turn a festival crowd into a boiling warehouse rave",
  ],
  whatToExpect: [
    "Cinematic Visuals",
    "Bass & Groove",
    "High-Energy Pacing",
    "Intense Fan Connection",
  ],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery", "Chill Summer Vibes"],
  similarArtists: [
    {
      name: "Westend",
      slug: "westend",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bc781a35d287a09940ae6046",
    },
    {
      name: "John Summit",
      slug: "john-summit",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17820662b32f3dbabad755dfb53",
    },
    {
      name: "SIDEPIECE",
      slug: "sidepiece",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17821705221c7f192d4a7963910",
    },
    {
      name: "AYYBO",
      slug: "ayybo",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f8c3472c2555b482981daecf",
    },
  ],
  tracks: [
    { name: "Number One", album: "Number One", duration: "" },
    {
      spotifyId: "1rlPXuxUk4t8xVS05Uab4G",
      name: "Losing Control",
      album: "Losing Control",
      duration: "2:45",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02382792749a81b76678ab1af1",
    },
    { name: "Mind Doctor", album: "Mind Doctor", duration: "" },
  ],
  about:
    "Cody Cunningham, performing under the singular moniker Omnom, is a Los Angeles-born DJ and electronic producer who has rapidly solidified his position as one of the modern era's most prolific and essential tech-house forces. Blending the nostalgic, soulful swing of underground hip-hop with the crushing, heavy bassline weight of contemporary dance networks, his landmark collaborative projects have earned widespread institutional praise. Behind the decks, Omnom delivers a technically flawless, high-tempo masterclass in rhythm manipulation that sets the exact standard for modern club music.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Saturday",
    date: "Aug 1",
    startTime: "1:45 PM",
    endTime: "2:45 PM",
  },
};

const jimLegxacy: Artist = {
  name: "Jim Legxacy",
  slug: "jim-legacy",
  genres: ["Afroswing", "Alternative R&B", "Emo-Rap"],
  origin: "London, England",
  tagline:
    "A breathtaking, glitchy collision of traditional Afrobeats rhythms and emo-rap intimacy.",
  socials: { spotify: "https://open.spotify.com/artist/7IrBqZo6diq3hV3GpUhrs2" },
  whySee: [
    "One of alternative music's absolute finest contemporary innovators executing a deeply atmospheric, highly anticipated festival debut",
    "Experience a spectacular live rendering of his unique 'Afro-glow' production style, blending crisp loops with acoustic guitars",
    "A beautifully intimate, storytelling sonic oasis designed perfectly to completely escape standard commercial pop noise",
    "Hear the live execution of fresh, boundary-pushing narrative epics that explore identity and young romance with profound honesty",
  ],
  whatToExpect: ["Cinematic Visuals", "Guitar-Driven Sound", "Melodic Vocal Hooks"],
  bestFor: [
    "Sound Design & Production Nerds",
    "Lyric & Narrative Obsessives",
    "Early Afternoon Discovery",
  ],
  similarArtists: [
    {
      name: "Oklou",
      slug: "oklou",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f8b90fcffca3c4e28564f0e3",
    },
    {
      name: "Destin Conrad",
      slug: "destin-conrad",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786be69fc54978eb83fa10167c",
    },
    { name: "KWN", slug: "kwn" },
    {
      name: "Leon Thomas",
      slug: "leon-thomas",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c6c4f4aaf40ebee92b8a8228",
    },
  ],
  tracks: [
    { name: "Hitlight", album: "Homeless", duration: "" },
    { name: "Eye Wish", album: "Homeless", duration: "" },
    { name: "Candy", album: "Candy", duration: "" },
  ],
  about:
    "Jim Legxacy is a London-born singer, songwriter, and electronic engineer who built an intensely passionate global community through his hyper-specific, beautifully haunting brand of contemporary alternative R&B and 'Afro-glow'. Rooted in the emotional intimacy of bedroom pop recordings but elevated by deep, heavy Afrobeats rhythm structures, emo-rap cadences, and warm acoustic guitar strums, his tracks dissect young adulthood with profound precision. Handpicked for an extensive international tour cycle, his live performance transforms giant fields into an immersive, cinematic listening session.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Saturday",
    date: "Aug 1",
    startTime: "1:55 PM",
    endTime: "2:55 PM",
  },
};

const chezile: Artist = {
  name: "Chezile",
  slug: "chezile",
  genres: ["Alternative R&B", "Soul", "Neo-Soul"],
  origin: "Atlanta, Georgia",
  tagline: "Sultry, low-slung alternative R&B tracking the raw, intimate vulnerabilities of youth.",
  socials: { spotify: "https://open.spotify.com/artist/1EmdfupUQDpXOcb4Nj2mBH" },
  whySee: [
    "Catch an exceptional independent lyricist executing a deeply atmospheric, confessional performance on the Tito's stage",
    "Songwriting that lands like an intense, unguarded voice memo tracking the complex, messy textures of young romance",
    "A beautiful, sun-drenched early afternoon oasis that pairs delicate vocal textures with unexpectedly heavy baseline drops",
    "The official premier festival tour run showcasing a highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: ["Bass & Groove", "Intimate Performance", "Dark Mood Visuals", "Crowd Atmosphere"],
  bestFor: ["Early Afternoon Discovery", "Lyric & Narrative Obsessives"],
  similarArtists: [
    {
      name: "Destin Conrad",
      slug: "destin-conrad",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786be69fc54978eb83fa10167c",
    },
    {
      name: "Leon Thomas",
      slug: "leon-thomas",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c6c4f4aaf40ebee92b8a8228",
    },
    {
      name: "Khamari",
      slug: "khamari",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786921bdf2ddc6e84970fd172e",
    },
    { name: "KWN", slug: "kwn" },
  ],
  tracks: [
    { name: "No Choices", album: "Chezile", duration: "" },
    { name: "Tension", album: "Chezile", duration: "" },
    { name: "Breathe", album: "Breathe", duration: "" },
  ],
  about:
    "Chezile is an Atlanta-born singer, songwriter, and producer who built an intensely passionate global community through his hyper-specific, beautifully haunting brand of contemporary alternative R&B. Rooted in the emotional intimacy of close-mic'd storytelling but elevated by deep, heavy urban rhythm pockets and fuzzed-out basslines, his tracks dissect young adulthood with profound precision. Handpicked for an extensive global breakout tour cycle, his early afternoon live set transforms a sprawling festival lawn into an immersive listening experience.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Saturday",
    date: "Aug 1",
    startTime: "12:45 PM",
    endTime: "1:30 PM",
  },
};

const jaeStephens: Artist = {
  name: "Jae Stephens",
  slug: "jae-stephens",
  genres: ["Soul", "R&B", "Dance Pop"],
  origin: "Los Angeles, California",
  tagline: "Sleek, high-gloss electronic R&B and contemporary soul built for the open air.",
  socials: { spotify: "https://open.spotify.com/artist/4HiLipaDjOwRkhJlk5s1uT" },
  whySee: [
    "The absolute definition of modern electronic R&B polish making a high-visibility crossover statement on the Allianz stage",
    "A perfectly synchronized live performance that balances deep, driving baseline grooves with incredibly infectious vocal hooks",
    "Experience a chic, hyper-stylized dance floor environment that translates underground club ethos onto an enormous scale",
    "The ultimate high-energy afternoon catalyst designed perfectly to unify a massive, moving festival crowd under the sun",
  ],
  whatToExpect: ["Production Style Approach", "Synth & Atmospheric", "Intimate Performance"],
  bestFor: ["Dance Floor Seekers", "Bass & Groove Lovers"],
  similarArtists: [
    {
      name: "Jade",
      slug: "jade",
      imageUrl: "https://i.scdn.co/image/a0e0fd64fd74b658761ea717e2126b1bad974f4a",
    },
    {
      name: "Blood Orange",
      slug: "blood-orange",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17882a833d61eafc09c05c24882",
    },
    {
      name: "Olivia Dean",
      slug: "olivia-dean",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1785c7577ad44daeb7ce4b941a1",
    },
    {
      name: "Valencia Grace",
      slug: "valencia-grace",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17825599b11aff6d045b573a13f",
    },
  ],
  tracks: [
    { name: "24K", album: "High Class", duration: "" },
    { name: "What You Need", album: "High Class", duration: "" },
    { name: "Wet Hair", album: "Wet Hair", duration: "" },
  ],
  about:
    "Jae Stephens is a Los Angeles-born singer-songwriter whose extraordinary vocal range, rich electronic R&B arrangements, and sleek pop anthems have earned her widespread critical adoration. Fusing traditional soul vocal ornamentation with heavy, contemporary club-ready instrumentation and sharp house loops, she writes sweeping tales of resilience, loss, and emotional autonomy. Commanding the stage with profound, modern authority, her early afternoon set stands as an undeniable showcase of pristine musical power.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Saturday",
    date: "Aug 1",
    startTime: "5:40 PM",
    endTime: "6:20 PM",
  },
};

const ryman: Artist = {
  name: "Ryman",
  slug: "ryman",
  genres: ["Indie Pop", "Alt-Pop", "Bedroom Pop"],
  origin: "Nashville, Tennessee",
  tagline: "Sun-drenched, conversational bedroom pop that plays out like real diary entries.",
  socials: { spotify: "https://open.spotify.com/artist/1ZUNE7b5nNiN31AnJ0Smqj" },
  whySee: [
    "Catch a hyper-gifted young multi-instrumentalist executing a beautifully warm, sun-drenched indie pop performance",
    "Songwriting that lands like an intense, playful voice memo tracking the carefree textures of youth and modern romance",
    "A stunning early afternoon oasis that pairs delicate vocal patterns with incredibly catchy, jazz-infused indie guitar lines",
    "The official festival tour run highlighting his highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: ["Conversational Delivery", "Guitar-Driven Sound", "Crowd Atmosphere"],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery", "Chill Summer Vibes"],
  similarArtists: [
    {
      name: "Emi Grace",
      slug: "emi-grace",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781d8d8c934c382100d033bb41",
    },
    {
      name: "sombr",
      slug: "sombr",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17878edaa6468cae153565c2c97",
    },
    {
      name: "Claire Rosinkranz",
      slug: "claire-rosinkranz",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1789fd59f9fc4a311da6437b6a5",
    },
    {
      name: "Lucy Bedroque",
      slug: "lucy-bedroque",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178100cfd4653979ed518fbf28f",
    },
  ],
  tracks: [
    { name: "Rewind", album: "Ryman", duration: "" },
    { name: "Complicated", album: "Ryman", duration: "" },
    { name: "Daydream", album: "Daydream", duration: "" },
  ],
  about:
    "Ryman is a Nashville-born singer, songwriter, and multi-instrumentalist who built an intensely passionate global community through his hyper-vivid, beautifully conversational brand of contemporary alt-pop. Rooted in the emotional intimacy of bedroom pop recordings but elevated by incredibly bright, jazz-infused guitar lines and snappy rhythm structures, his tracks dissect young adulthood with profound precision. Backed by widely acclaimed independent singles, his early afternoon live set transforms a sprawling festival field into a vibrant outdoor listening party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Saturday",
    date: "Aug 1",
    startTime: "6:50 PM",
    endTime: "7:30 PM",
  },
};

const villanelle: Artist = {
  name: "Villanelle",
  slug: "villanelle",
  genres: ["Indie Rock", "Alternative Rock", "Post-Punk"],
  origin: "London, England",
  tagline: "Jagged, unpredictable post-punk chaos and thrillingly unhinged live rock energy.",
  socials: { spotify: "https://open.spotify.com/artist/3J9QwmRJDdn9Oq1fB6mfcF" },
  whySee: [
    "One of the absolute sharpest, most restlessly creative rock outfits of the modern underground executing an intense performance",
    "A masterclass in traditional analog power band energy, delivering jagged dual-guitar riffs and complex progressive rhythmic patterns",
    "A blistering, high-octane early afternoon rock catalyst designed to leave music traditionalists completely floored by the live talent",
    "Experience an exceptionally raw, fuzzed-out guitar infrastructure that completely bypasses processed backing tracks",
  ],
  whatToExpect: ["Guitar-Driven Sound", "Rhythm Complexity", "Energetic Mosh Pits"],
  bestFor: ["Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Wunderhorse",
      slug: "wunderhorse",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1780e05e549428cb38b2f3e7a60",
    },
    {
      name: "Day We Ran",
      slug: "day-we-ran",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17896aa0ad1b8badab28252f80b",
    },
    {
      name: "Ink",
      slug: "ink",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b3df8a3980032366a3a040bc",
    },
    {
      name: "The Creekers",
      slug: "the-creekers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783bd55f87a9e1be1eb5b1c1e1",
    },
  ],
  tracks: [
    { name: "Blue", album: "Villanelle", duration: "" },
    { name: "Static", album: "Villanelle", duration: "" },
    { name: "Fade", album: "Fade", duration: "" },
  ],
  about:
    "Villanelle is the London-born alternative rock quartet whose hyper-vivid blend of distorted post-punk instrumentation, jangly alternative guitars, and avant-garde theatrical rock tropes has earned them a reputation as one of the most exciting young live bands in the UK underground. Writing music that operates with the urgent, unpredictable pacing of a fever dream, the band relies on incredibly crisp dual-guitar layers and raw narrative lyricism. Coming off their highly acclaimed independent support cycles, their early afternoon performance provides a thrilling, beautifully raw antidote to overprocessed pop.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Saturday",
    date: "Aug 1",
    startTime: "12:50 PM",
    endTime: "1:30 PM",
  },
};

const sunday1994: Artist = {
  name: "Sunday (1994)",
  slug: "sunday-1994",
  genres: ["Dream Pop", "Shoegaze", "Indie Rock"],
  origin: "Los Angeles, California",
  tagline: "Lush, tape-warped 90s shoegaze walls and cinematic bedroom dream-pop melancholia.",
  socials: { spotify: "https://open.spotify.com/artist/1vTFaCiaR50b2IXELHW52U" },
  whySee: [
    "Catch an exceptional songwriting collective executing a beautifully warm, sun-drenched indie pop performance on the Allianz stage",
    "Perfectly synchronized, warm vocal harmonies gliding effortlessly over heavy, chorus-heavy dream pop guitar lines",
    "A masterclass in traditional analog power band energy, delivering jagged dual-guitar riffs and complex progressive rhythmic patterns",
    "The official festival tour run highlighting their highly celebrated independent studio catalog to a massive live audience",
  ],
  whatToExpect: ["Lush Sound", "Dreamy Atmosphere", "Conversational Delivery", "Crowd Atmosphere"],
  bestFor: ["Hometown & Local Supporters", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Wolf Alice",
      slug: "wolf-alice",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178517744f1b17b914a3ac923b7",
    },
    {
      name: "The Army, The Navy",
      slug: "the-army-the-navy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a80252ae3d399fc49014502d",
    },
    {
      name: "Day We Ran",
      slug: "day-we-ran",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17896aa0ad1b8badab28252f80b",
    },
    { name: "The Bends", slug: "the-bends" },
  ],
  tracks: [
    { name: "Tired Eyes", album: "Sunday (1994)", duration: "" },
    { name: "Stained Glass", album: "Sunday (1994)", duration: "" },
    { name: "Softcore", album: "Softcore", duration: "" },
  ],
  about:
    "Sunday (1994) is the Los Angeles-born alternative rock project whose meticulous blend of fuzzed-out garage indie grit, 90s shoegaze tropes, and heavy dual-guitar songwriting has earned them widespread critical adoration. Drawing sharp atmospheric blueprints from classic alternative legends, the group writes sweeping tales of youth, ambition, and modern isolation. Backed by exceptionally tight live chemistry, their early afternoon performance provides an immersive, high-energy masterclass in pure guitar-driven rock.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Saturday",
    date: "Aug 1",
    startTime: "12:25 PM",
    endTime: "1:10 PM",
  },
};

const mc4d: Artist = {
  name: "MC4D",
  slug: "mc4d",
  genres: ["Melodic House", "Dance Pop", "Electronic"],
  origin: "Chicago, Illinois",
  tagline:
    "Hometown electronic brothers delivering sun-drenched, euphoric mainstage house anthems.",
  socials: { spotify: "https://open.spotify.com/artist/2MbY32LPINIi9P6PCkrOJI" },
  whySee: [
    "A massive hometown showcase performance from twin brothers Matt and Chris DiBari bringing pure festival energy to Grant Park",
    "Experience their signature, hyper-infectious remixes and original melodic house weapons that have dominated viral charts",
    "An absolute wildfire crowd environment packed with high-energy singalongs and uplifting, stadium-scale vocal drops",
    "The perfect high-visibility afternoon catalyst designed purely to get massive groups of friends dancing under the sun",
  ],
  whatToExpect: ["Melodic Vocal Hooks", "High-Production Visuals", "High-Energy Pacing"],
  bestFor: [
    "Hometown & Local Supporters",
    "Groups & Social Experience",
    "Tent & Club Venue Seekers",
  ],
  similarArtists: [
    { name: "Zack Martino", slug: "zack-martino" },
    { name: "DJ Trixie Mattel", slug: "dj-trixie-mattel" },
    {
      name: "Whethan",
      slug: "whethan",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782717c8959d00aa37044bbb74",
    },
    {
      name: "haute & freddy",
      slug: "haute-and-freddy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f24b273d9959e097972d5992",
    },
  ],
  tracks: [
    { name: "Sinking", album: "Sinking", duration: "" },
    { name: "Coming Home", album: "Coming Home", duration: "" },
    { name: "Feels Like This", album: "Feels Like This", duration: "" },
  ],
  about:
    "MC4D is the breakout electronic project of Chicago-born twin brothers Matt and Chris DiBari, whose meticulous combination of sun-drenched melodic house infrastructure, pristine dance-pop hooks, and massive crossover festival appeal has earned them global acclaim. Dominating streaming circuits through exceptionally polished production skills, the duo crafts a hyper-kinetic soundscape built entirely around euphoric groove loops and emotional vocal layers. Earning a highly coveted afternoon homecoming slot, their live set transforms the park into an unadulterated, celebratory dance party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Saturday",
    date: "Aug 1",
    startTime: "12:55 PM",
    endTime: "1:40 PM",
  },
};

const chace: Artist = {
  name: "Chace",
  slug: "chace",
  genres: ["House", "UK Garage", "Electronic"],
  origin: "Shanghai, China",
  tagline: "Sleek, avant-garde house grooves and hyper-precise electronic sound design.",
  socials: { spotify: "https://open.spotify.com/artist/5kPhAZL6iV8iDywUmIPC3g" },
  whySee: [
    "Catch an international electronic auteur making a rare, highly anticipated appearance on the American festival circuit",
    "An elite display of modular hardware manipulation, syncopated garage rhythms, and flawlessly mixed independent club tracks",
    "Experience a chic, hyper-stylized dancefloor environment that values raw analog swing over commercial EDM clichés",
    "A relentless masterclass in dance floor tension and release, delivered by one of Asia's most prominent electronic vanguards",
  ],
  whatToExpect: ["Production Style Approach", "Synth & Atmospheric", "Cinematic Visuals"],
  bestFor: ["Tent & Club Venue Seekers", "Dance Floor Seekers", "Sound Design & Production Nerds"],
  similarArtists: [
    {
      name: "Duke Dumont",
      slug: "duke-dumont",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c0791f9c2d17dfd58e301c91",
    },
    {
      name: "John Summit",
      slug: "john-summit",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17820662b32f3dbabad755dfb53",
    },
    {
      name: "Omnom",
      slug: "omnom",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a9b9e8e9f12e78d2eb637a6a",
    },
    {
      name: "haute & freddy",
      slug: "haute-and-freddy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f24b273d9959e097972d5992",
    },
  ],
  tracks: [
    { name: "Never", album: "Belong", duration: "" },
    { name: "In My Head", album: "Belong", duration: "" },
    { name: "Mantra", album: "Mantra", duration: "" },
  ],
  about:
    "Zhu Yihan, performing under the moniker Chace, has spent the modern electronic era operating at the vanguard of the international underground, breaking barriers as a fiercely creative producer, vocalist, and label director. Seamlessly fusing the soulful swing of late-90s UK garage with the crushing baseline weight of contemporary house infrastructure, his meticulously engineered tracks possess a distinct narrative tension. Highly sought after for his live multi-instrumental approach, his festival environment functions as an exceptionally polished, high-velocity journey into dance music.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Saturday",
    date: "Aug 1",
    startTime: "1:50 PM",
    endTime: "2:35 PM",
  },
};

const calderAllen: Artist = {
  name: "Calder Allen",
  slug: "calder-allen",
  genres: ["Americana", "Alternative Folk", "Indie Rock"],
  origin: "Austin, Texas",
  tagline:
    "Gravel-voiced Texas americana and driving alternative folk built on raw generational songwriting.",
  socials: { spotify: "https://open.spotify.com/artist/1XlVbGlQaBoESaJ43y2sCD" },
  whySee: [
    "A stunning afternoon oasis that pairs traditional acoustic instrumentation with a truly monumental, raw singing voice",
    "Experience razor-sharp alternative folk lyrics that trade on absolute emotional honesty and incredible guitar hooks",
    "The official festival tour run highlighting his highly celebrated, Charlie Sexton-produced independent studio catalog",
    "A loose, remarkably charismatic live performance that treats giant open festival fields like an intimate Austin listening room",
  ],
  whatToExpect: ["Guitar-Driven Sound", "Conversational Delivery", "Lyrical Storytelling"],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery"],
  similarArtists: [
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
      name: "Waylon Wyatt",
      slug: "waylon-wyatt",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17851e191838dca7d4729b268a2",
    },
    {
      name: "Finn Wolfhard",
      slug: "finn-wolfhard",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178926418bb71d5a111e6fbb9eb",
    },
  ],
  tracks: [
    {
      spotifyId: "276ZfAgAGiqQqF1Iub8adH",
      name: "Good Times",
      album: "The Game",
      duration: "4:58",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e022a8aac15571e141a49c90c4f",
    },
    { name: "Bend", album: "The Game", duration: "" },
    { name: "Ripple", album: "Ripple", duration: "" },
  ],
  about:
    "Calder Allen is an Austin-born singer-songwriter whose brilliant combination of rugged americana roots, modern storytelling wit, and a jaw-dropping vocal rasp has sparked widespread critical acclaim across the indie landscape. Sourcing structural templates from a deep family legacy of Texas artists, he crafts a high-tension lyrical universe that dissects personal history, identity, and modern isolation with profound precision. Backed by an exceptionally tight live setup, his early afternoon set provides a refreshing, beautifully raw antidote to standard festival pop noise.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Saturday",
    date: "Aug 1",
    startTime: "12:15 PM",
    endTime: "1:00 PM",
  },
};

const natMyers: Artist = {
  name: "Nat Myers",
  slug: "nat-myers",
  genres: ["Country Blues", "Alternative Folk", "Americana"],
  origin: "Kenton County, Kentucky",
  tagline:
    "Stark, lightning-fast pre-war country blues delivered with raw, poetic street authority.",
  socials: { spotify: "https://open.spotify.com/artist/2QMlNryks9wyxBCsBGciTS" },
  whySee: [
    "A masterclass in traditional analog blues showmanship from a highly gifted poet handpicked by Dan Auerbach for Easy Eye Sound",
    "Blistering, hyper-precise acoustic fingerpicking and slide guitar loops that feel completely untamed and electrifying live",
    "Experience deeply evocative, historical narrative poetry tracking the raw vulnerabilities of modern labor and traveling life",
    "A gorgeous, stripped-back early afternoon oasis that commands absolute, pin-drop silence from a festival crowd",
  ],
  whatToExpect: ["Guitar-Driven Sound", "Intimate Performance"],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Cameron Whitcomb",
      slug: "cameron-whitcomb",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178712f78798ce31073c16673c8",
    },
    {
      name: "Waylon Wyatt",
      slug: "waylon-wyatt",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17851e191838dca7d4729b268a2",
    },
    {
      name: "Calder Allen",
      slug: "calder-allen",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c4a45f0e840b74b85c5e87d9",
    },
    {
      name: "Elizabeth Nichols",
      slug: "elizabeth-nichols",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786a6686aacc775a0807c37cd8",
    },
  ],
  tracks: [
    { name: "Yellowhorse", album: "Yellowhorse", duration: "" },
    { name: "Ramble", album: "Yellowhorse", duration: "" },
    { name: "Pray for Rain", album: "Yellowhorse", duration: "" },
  ],
  about:
    "Nat Myers is a Korean-American singer-songwriter and poet whose brilliant blend of pre-war country blues, traditional delta roots, and visceral narrative storytelling has earned him widespread critical adoration. Drawing sharp thematic blueprints from old-time blues legends and classical poetry, he writes sweeping, emotionally honest tales of systemic isolation and transient hustle with profound precision. Commanding the stage with absolute, raw acoustic authority, his early afternoon set stands as a thrilling showcase of historical musical power.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Saturday",
    date: "Aug 1",
    startTime: "1:15 PM",
    endTime: "2:00 PM",
  },
};

const ink: Artist = {
  name: "Ink",
  slug: "ink",
  genres: ["Alternative Rock", "Post-Punk", "Indie Rock"],
  origin: "Chicago, Illinois",
  tagline: "A fuzzed-out, blistering hometown alternative rock engine built on pure garage grit.",
  socials: { spotify: "https://open.spotify.com/artist/4ZhFCxPekpmV12n2xMeF2z" },
  whySee: [
    "A massive, highly anticipated hometown showcase performance on the alternative stage celebrating a rapid local scene ascent",
    "Experience a blistering display of dual-guitar distortion, heavy punk tempos, and raw, confrontational vocal delivery",
    "An intense live rock performance that completely bypasses processed backing tracks for pure analog adrenaline",
    "The absolute perfect early afternoon catalyst designed to leave rock traditionalists completely floored by the talent",
  ],
  whatToExpect: ["Guitar-Driven Sound"],
  bestFor: ["Hometown & Local Supporters", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Villanelle",
      slug: "villanelle",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781ece1eae58afddb4d3238501",
    },
    {
      name: "Day We Ran",
      slug: "day-we-ran",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17896aa0ad1b8badab28252f80b",
    },
    {
      name: "Wunderhorse",
      slug: "wunderhorse",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1780e05e549428cb38b2f3e7a60",
    },
    { name: "Cruz Beckham and the Breakers", slug: "cruz-beckham-and-the-breakers" },
  ],
  tracks: [
    { name: "Static", album: "Ink", duration: "" },
    { name: "Fallen", album: "Ink", duration: "" },
    { name: "Chamber", album: "Chamber", duration: "" },
  ],
  about:
    "Ink is the Chicago-born alternative rock quartet whose meticulous combination of fuzzed-out garage indie grit, driving rhythms, and emotionally honest lyricism has earned them a reputation as one of the city's most essential live rock vanguards. Writing sweeping tales of industrial midwestern isolation, identity, and personal history, the group relies entirely on raw analog band energy. Coming off a series of highly discussed local support slots, their early afternoon performance brings an absolute guitar clinic to Grant Park.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Saturday",
    date: "Aug 1",
    startTime: "12:15 PM",
    endTime: "1:00 PM",
  },
};

const peaceControl: Artist = {
  name: "Peace Control",
  slug: "peace-control",
  genres: ["Tech House", "Dark Techno", "Electronic"],
  origin: "Chicago, Illinois",
  tagline: "Dark, hypnotic hometown tech-house grooves built for early afternoon warehouse raves.",
  socials: { spotify: "https://open.spotify.com/artist/3rzbheJbLKamFWE8v9fPRh" },
  whySee: [
    "A premier hometown electronic opener firing up the Perry's stage at high noon with punishing underground energy",
    "Experience a relentless display of syncopated swing rhythms, heavy bassline rollers, and infectious classic vocal chops",
    "Catch a pioneer of the current international electronic groove resurgence during a highly coveted home field slot",
    "The absolute perfect early-day adrenaline booster for ravers looking for heavy bass muscle from the very first minute",
  ],
  whatToExpect: [
    "Cinematic Visuals",
    "Bass & Groove",
    "High-Production Visuals",
    "High-Energy Pacing",
  ],
  bestFor: ["Hometown & Local Supporters", "Dance Floor Seekers", "Tent & Club Venue Seekers"],
  similarArtists: [
    {
      name: "Eli Brown",
      slug: "eli-brown",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178264c8c3a982604908c6cf188",
    },
    {
      name: "Max Styler",
      slug: "max-styler",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178ded53da461b13994a9ef8347",
    },
    {
      name: "Devault",
      slug: "devault",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178669860fe69ee33857a3bdeb6",
    },
    {
      name: "Riordan",
      slug: "riordan",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17844deba7abbd6473132e75682",
    },
  ],
  tracks: [
    { name: "Control", album: "Peace Control", duration: "" },
    { name: "Vandal", album: "Peace Control", duration: "" },
    { name: "Static", album: "Static", duration: "" },
  ],
  about:
    "Peace Control is a Chicago-born electronic producer and DJ whose raw brand of underground tech-house grooves, dark techno loops, and aggressive percussive sound design has rapidly turned heads across the alternative dance scene. Rooted deeply in the localized club production culture, his engineering shifts away from standard commercial templates toward deep, structural low-frequency weights. Earning a highly coveted hometown opening slot on Perry's stage, his performance serves as a blistering, high-tempo celebration of modern dance infrastructure.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Saturday",
    date: "Aug 1",
    startTime: "12:00 PM",
    endTime: "12:45 PM",
  },
};

const theCreekers: Artist = {
  name: "The Creekers",
  slug: "the-creekers",
  genres: ["Alternative Rock", "Folk Rock", "Indie Rock"],
  origin: "Chicago, Illinois",
  tagline:
    "Hometown indie-rock anthems fusing driving alternative grit with timeless folk-rock storytelling.",
  socials: { spotify: "https://open.spotify.com/artist/2Ee2dvrxHJvnpWgaqC5T0i" },
  whySee: [
    "A massive, highly anticipated hometown showcase performance on the alternative stage celebrating a rapid local ascent",
    "Experience a brilliant, traditional analog band chemistry that treats giant festival fields like intimate local clubs",
    "A loose, remarkably fun and high-energy live performance built specifically to celebrate carefree youth culture",
    "The absolute perfect midday catalyst designed to unify a massive, supportive hometown crowd under the sun",
  ],
  whatToExpect: ["Guitar-Driven Sound", "Lyrical Storytelling"],
  bestFor: ["Hometown & Local Supporters", "Dance Floor Seekers"],
  similarArtists: [
    { name: "Whatmore", slug: "whatmore" },
    {
      name: "The Braymores",
      slug: "the-braymores",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178e72ca0c70ab4f5bb3da261dc",
    },
    { name: "Case Oats", slug: "case-oats" },
    { name: "Cruz Beckham and the Breakers", slug: "cruz-beckham-and-the-breakers" },
  ],
  tracks: [
    { name: "Creek", album: "The Creekers", duration: "" },
    { name: "Under the Skyline", album: "The Creekers", duration: "" },
    { name: "Closer Now", album: "Closer Now", duration: "" },
  ],
  about:
    "The Creekers are the Chicago-born alternative rock collective whose meticulous combination of fuzzed-out garage indie rock grit, driving rhythms, and carefree storytelling has fostered a deeply dedicated regional community. Forging a distinctively laid-back, sun-drenched sonic universe, the outfit crafts tracks that track personal history, identity, and midwestern isolation. Performing a prime midday slot on the alternative stage, their live execution transforms the sprawling perimeter of Grant Park into a vibrant outdoor block party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Saturday",
    date: "Aug 1",
    startTime: "1:15 PM",
    endTime: "1:55 PM",
  },
};

const nextOfKin: Artist = {
  name: "Next of Kin",
  slug: "next-of-kin",
  genres: ["Indie Pop", "Singer-Songwriter", "Chamber Pop"],
  origin: "Los Angeles, California",
  tagline: "Witty, wordy stream-of-consciousness pop music that plays out like real voice memos.",
  socials: { spotify: "https://open.spotify.com/artist/668OF7yLpmsPIL10HHKPFC" },
  whySee: [
    "Catch an exceptional independent pop writer executing a beautifully warm, storyteller performance on the alternative stage",
    "Razor-sharp lyricism that lands like an intense, unguarded diary entry tracking the complex textures of youth and romance",
    "A stunning afternoon oasis that pairs delicate, close-mic'd vocal patterns with unexpectedly catchy acoustic and electronic hooks",
    "The official premier festival tour run showcasing a highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: ["Lyrical Storytelling", "Conversational Delivery", "Crowd Atmosphere"],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Ella Boh",
      slug: "ella-boh",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f3ca12f1b323dbb7027d78dc",
    },
    { name: "Porch Light", slug: "porch-light" },
    { name: "Stella Lefty", slug: "stella-lefty" },
    {
      name: "Whitney Whitney",
      slug: "whitney-whitney",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b9b32a1845c72390fc48c28c",
    },
  ],
  tracks: [
    { name: "Voice Memos", album: "Next of Kin", duration: "" },
    { name: "Overthinking", album: "Next of Kin", duration: "" },
    { name: "Seventeen", album: "Seventeen", duration: "" },
  ],
  about:
    "Next of Kin is a Los Angeles-based singer-songwriter who built an intensely passionate internet community through a hyper-specific, beautifully conversational brand of contemporary indie pop. Rooted in the emotional intimacy of bedroom pop recordings but elevated by bright, modern pop production, rich chamber strings, and witty lyrical choices, the tracks explore young adulthood with profound precision. Handpicked for an extensive global tour cycle, the early afternoon live execution transforms the tree-lined perimeter of Grant Park into a vibrant outdoor listening party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Saturday",
    date: "Aug 1",
    startTime: "1:05 PM",
    endTime: "1:45 PM",
  },
};

const cyso: Artist = {
  name: "Chicago Youth Symphony Orchestra",
  slug: "cyso",
  genres: ["Classical", "Symphonic Rock", "Cinematic Orchestral"],
  origin: "Chicago, Illinois",
  tagline:
    "A monumental, high-visibility symphonic powerhouse re-engineering modern festival soundscapes.",
  socials: { spotify: "https://open.spotify.com/artist/38F4eptEGZAvPhZEjWS46W" },
  whySee: [
    "A historic, deeply emotional hometown performance highlighting over a hundred of the city's finest young virtuoso musicians",
    "Experience a breathtaking, widescreen sonic universe that trades effortlessly between classical masterworks and massive rock covers",
    "A stunning, monumental afternoon oasis that commands absolute, pin-drop silence and deep crowd catharsis across the main field",
    "Witness world-class orchestral precision executed with a rare, fiery youthful energy unmatched anywhere else on the bill",
  ],
  whatToExpect: ["Live Band Performance", "Cinematic Visuals", "Crowd Atmosphere"],
  bestFor: ["Hometown & Local Supporters", "Storytelling Lovers", "Early Afternoon Discovery"],
  similarArtists: [],
  tracks: [
    { name: "Symphony No. 5", album: "CYSO Live", duration: "" },
    { name: "Rhapsody in Blue", album: "CYSO Live", duration: "" },
    { name: "Alternative Anthems", album: "CYSO Live", duration: "" },
  ],
  about:
    "The Chicago Youth Symphony Orchestra (CYSO) stands out as an exceptional, world-class musical institution that has spent decades training the absolute finest young instrumental virtuosos in America. Pairs flawless, conservatory-grade symphonic precision with a fiercely innovative performance approach that frequently bridges classical infrastructure with contemporary rock and cinematic arrangements. Making a highly visible, monumental debut on the Bud Light stage, their early afternoon performance scales symphonic vulnerability into an unmissable field spectacle.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Bud Light",
    day: "Saturday",
    date: "Aug 1",
    startTime: "12:00 PM",
    endTime: "12:45 PM",
  },
};

export const saturdayArtists: Artist[] = [
  oliviaDean,
  jennie,
  theNeighbourhood,
  ethelCain,
  discoLines,
  leonThomas,
  clipse,
  geese,
  alisonWonderland,
  djTrixieMattel,
  bbno_dollar,
  kwn,
  siennaSpiro,
  maxStyler,
  spaceyJane,
  wolfAlice,
  whethan,
  cortis,
  cameronWhitcomb,
  ayybo,
  khamari,
  quadeca,
  momma,
  frostChildren,
  goldieBoutilier,
  dieSpitz,
  lucyBedroque,
  omnom,
  jimLegxacy,
  chezile,
  jaeStephens,
  ryman,
  villanelle,
  sunday1994,
  mc4d,
  chace,
  calderAllen,
  natMyers,
  ink,
  peaceControl,
  theCreekers,
  nextOfKin,
  cyso,
];
