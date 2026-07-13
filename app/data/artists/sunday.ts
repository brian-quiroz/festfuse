// Storage only — do not import this file directly in product code.
// To filter by day, import allArtists from index.ts and filter by appearance.day === "Sunday".
import type { Artist } from "@/app/types/artist";

const tateMcRae: Artist = {
  name: "Tate McRae",
  slug: "tate-mcrae",
  mbid: "f9133869-f87c-459c-9aa7-2f176cda7e06",
  imageUrl: "/artists/heroes/tate-mcrae.avif",
  objectPosition: "center 20%",
  liveVideoId: "yyoXdNoRTqg",
  liveVideoLabel: "Live in Boston - Miss Possessive World Tour 2025",
  genres: ["Pop", "Dance Pop", "Electropop"],
  location: "Calgary, Canada",
  tagline: "Dance like you mean it. Sing like you mean it more.",
  socials: {
    spotify: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
    youtube: "https://www.youtube.com/@tatemcrae",
    tiktok: "https://www.tiktok.com/@tatemcrae",
  },
  whySee: [
    "A trained dancer performing her own choreography — pop excellence that's athletic and total",
    "'greedy' live with a crowd that knows every word is one of the best moments a pop set can deliver",
    "One of the fastest-rising pop acts of her generation — this is peak Tate McRae",
    "Polished, high-production pop with genuine emotional depth underneath the hooks",
  ],
  whatToExpect: ["Choreography", "Massive Singalongs", "Production Style Approach"],
  bestFor: ["Dance Floor Seekers"],
  similarArtists: [
    {
      name: "SB19",
      slug: "sb19",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17856dea7970c54f7ce5688a688",
    },
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
      name: "Charli XCX",
      slug: "charli-xcx",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786fa76436a2bba83b9f1d6fd1",
    },
  ],
  tracks: [
    {
      name: "greedy",
      album: "THINK LATER.",
      duration: "2:11",
      artworkUrl: "/albums/tate-mcrae/think-later.png",
    },
    {
      spotifyId: "5UJbgR4XF4y1DvbkxEqe8S",
      name: "Sports car",
      album: "So Close To What",
      duration: "2:45",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e026c691022744f42565f6b546e",
    },
    {
      spotifyId: "541sN2qNfIlllGn9nGOQoC",
      name: "Revolving door",
      album: "So Close To What",
      duration: "3:00",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0230420759f1a2cd4923c5c65b",
    },
  ],
  about:
    "Tate McRae is a Calgary-born singer, songwriter, and dancer who has built one of pop music's most devoted fanbases through relentless work and a rare combination of talents. A competitive dancer before becoming a recording artist, McRae brings a physical vocabulary to her performances that most pop acts simply can't match. Her 2023 album think later. — anchored by the massive hit 'greedy' — established her as a genuine pop force, trading on emotional honesty and irresistible hooks in equal measure.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Headliner",
    stage: "T-Mobile",
    day: "Sunday",
    date: "Aug 2",
    startTime: "8:45 PM",
    endTime: "10:00 PM",
  },
};

const theXx: Artist = {
  name: "The xx",
  slug: "the-xx",
  mbid: "c5c2ea1c-4bde-4f4d-bd0b-47b200bf99d6",
  imageUrl: "/artists/heroes/the-xx.avif",
  objectPosition: "center 20%",
  liveVideoId: "Q_RCrC7KzSc",
  liveVideoLabel: "Live at Primavera Sound 2026",
  genres: ["Indie Pop", "Dream Pop", "Electronic"],
  location: "London, England",
  tagline: "Space between the notes. Feeling in the silence.",
  socials: {
    spotify: "https://open.spotify.com/artist/3iOvXCl6edW5Um0fXEBRXy",
    youtube: "https://www.youtube.com/@thexx",
  },
  whySee: [
    "'Intro' live is a transformative experience — few pieces of music do more with less",
    "One of the most atmospheric live shows in existence: minimal staging, maximal feeling",
    "Romy and Oliver's vocals intertwine in a way that feels genuinely irreplaceable",
    "The rare headliner that leaves you feeling quieter and more yourself by the end",
  ],
  whatToExpect: [
    "Intimate Performance",
    "Crowd Atmosphere",
    "Minimal Production",
    "Large-Scale Production",
  ],
  bestFor: [],
  similarArtists: [
    {
      name: "Empire of the Sun",
      slug: "empire-of-the-sun",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c806f3e714afa21861e20248",
    },
    {
      name: "New Constellations",
      slug: "new-constellations",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786a3aa969f4f79f38b0c16c91",
    },
    { name: "Sunshine", slug: "sunshine" },
    {
      name: "YOASOBI",
      slug: "yoasobi",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178964812dece6096f894a1fe85",
    },
  ],
  tracks: [
    {
      spotifyId: "2usrT8QIbIk9y0NEtQwS4j",
      name: "Intro",
      album: "xx",
      duration: "2:07",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02a46d603701aa0342e8cca64e",
    },
    {
      spotifyId: "5UBBJnFxsfjFxfrtvErQoH",
      name: "Crystalised",
      album: "xx",
      duration: "3:21",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02a46d603701aa0342e8cca64e",
    },
    {
      spotifyId: "5w3CRkbTWXfbYepIdFpGUN",
      name: "On Hold",
      album: "I See You",
      duration: "3:44",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02fa132d6237850ac3f29e3af3",
    },
  ],
  about:
    "The xx formed in London and released one of the most quietly influential debut albums in modern pop history — xx (2009) — a record built on restraint, space, and the particular intimacy of two voices circling each other. Jamie xx's production frames Romy Madley Croft and Oliver Sim's vocals with minimalist electronic arrangements that feel simultaneously delicate and enormous. Their live shows are events: atmospheric, deliberate, and emotionally overwhelming in a way that has nothing to do with volume.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Headliner",
    stage: "Bud Light",
    day: "Sunday",
    date: "Aug 2",
    startTime: "8:45 PM",
    endTime: "10:00 PM",
  },
};

const turnstile: Artist = {
  name: "Turnstile",
  slug: "turnstile",
  genres: ["Hardcore Punk", "Alternative Rock", "Post-Hardcore"],
  location: "Baltimore, Maryland",
  tagline: "Explosive, groove-laden alternative hardcore that redefines modern rock energy.",
  socials: { spotify: "https://open.spotify.com/artist/2qnpHrOzdmOo1S4ox3j17x" },
  whySee: [
    "A legendary live unit executing a masterclass in relentless rhythm, boundary-pushing punk grooves, and unmatched mainstage command",
    "Brendan Yates' hyper-kinetic, magnetic stage presence driving tens of thousands into massive, park-wide mosh pits",
    "Experience the raw, community-driven catharsis of tracks from Glow On, where heavy riffs meet dream-pop textures seamlessly",
    "The absolute pinnacle of contemporary heavy music crossing over into an essential, unifying festival experience",
  ],
  whatToExpect: ["Choreography", "Energetic Mosh Pits", "Massive Singalongs", "High-Energy Pacing"],
  bestFor: ["Mosh Pit Lovers"],
  similarArtists: [
    {
      name: "54 Ultra",
      slug: "54-ultra",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1788fdf273bf26657879cccdc74",
    },
    {
      name: "Ink",
      slug: "ink",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b3df8a3980032366a3a040bc",
    },
    {
      name: "Penelope Road",
      slug: "penelope-road",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17852fea332b35d65cd61fa5d39",
    },
    {
      name: "The Smashing Pumpkins",
      slug: "smashing-pumpkins",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782897dd777bbd8e3f23e49c99",
    },
  ],
  tracks: [
    {
      spotifyId: "0bGImSqDB2ebdeoCidUC8o",
      name: "BLACKOUT",
      album: "GLOW ON",
      duration: "2:53",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02c11ba539d58741bbd1332c92",
    },
    {
      spotifyId: "5iXnD2VizcAbErpkcuNQ6I",
      name: "MYSTERY",
      album: "GLOW ON",
      duration: "2:35",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02c11ba539d58741bbd1332c92",
    },
    {
      spotifyId: "1dB0NylVkpjdOe8DiekIs7",
      name: "HOLIDAY",
      album: "GLOW ON",
      duration: "2:52",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02c11ba539d58741bbd1332c92",
    },
  ],
  about:
    "Turnstile is the Baltimore-formed rock powerhouse whose uncompromising independent path and fiercely innovative sonics completely rewrote the rules of contemporary punk rock. Fusing the gritty, physical weight of 90s post-hardcore with infectious pop sensibilities and danceable rhythmic basslines, the band commands an intensely passionate global community. Backed by three Grammy nominations for their landmark masterpiece 'GLOW ON', their late-afternoon sub-headlining performance delivers a beautifully raw, adrenaline-fueled masterclass in live counter-culture showmanship.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "T-Mobile",
    day: "Sunday",
    date: "Aug 2",
    startTime: "6:30 PM",
    endTime: "7:30 PM",
  },
};

const beabadoobee: Artist = {
  name: "Beabadoobee",
  slug: "beabadoobee",
  mbid: "88d17133-abbc-42db-9526-4e2c1db60336",
  imageUrl: "/artists/heroes/beabadoobee.jpg",
  objectPosition: "center 20%",
  genres: ["Indie Pop", "Shoegaze", "Bedroom Pop"],
  location: "London, England",
  tagline: "Nostalgic 90s alt-rock and dreamy bedroom pop, blown up to mainstage scale.",
  socials: {
    spotify: "https://open.spotify.com/artist/35l9BRT7MXmM8bv2WDQiyB",
    youtube: "https://www.youtube.com/@Beabadoobee",
    tiktok: "https://www.tiktok.com/@beabadoobeehq",
  },
  whySee: [
    "Catch her before she's headlining — Beabadoobee is on the cusp of breaking through",
    "Raw, emotionally honest songwriting that cuts through festival noise",
    "Intimate atmosphere even on a large stage — feels like a private show",
    "Perfect afternoon set to decompress between the big headliners",
  ],
  whatToExpect: [
    "Intimate Performance",
    "Guitar-Driven Sound",
    "Massive Singalongs",
    "Crowd Atmosphere",
    "Afternoon Vibes",
  ],
  bestFor: [],
  similarArtists: [
    {
      name: "sombr",
      slug: "sombr",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17878edaa6468cae153565c2c97",
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
    {
      name: "Love Spells",
      slug: "love-spells",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b33be717b74e15b9f5c235f2",
    },
  ],
  tracks: [
    {
      spotifyId: "41P6Tnd8KIHqON0QIydx6a",
      name: "the perfect pair",
      album: "Beatopia",
      duration: "2:57",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02384d10f967c2b914de7e2713",
    },
    {
      name: "All I Did Was Dream of You (feat. The Marías)",
      album: "Pylon",
      duration: "3:12",
      artworkUrl: "/albums/beabadoobee/pylon.jpg",
    },
    {
      spotifyId: "1a19jsjG2DvbN1fVJonKUU",
      name: "Beaches",
      album: "This Is How Tomorrow Moves",
      duration: "3:50",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e027d9a2e7835a178df7b0153aa",
    },
  ],
  about:
    "Bea Kristi, performing as beabadoobee, evolved from a lo-fi bedroom recording pioneer into one of alternative rock's most prominent global forces. Born in the Philippines and raised in London, her signature sound seamlessly fuses 90s shoegaze guitar hooks with sharp, diaristic indie-pop lyricism. Following the widespread critical acclaim of her Rick Rubin-produced 2024 masterpiece 'This Is How Tomorrow Moves', her massive 2026 stadium tours and highly anticipated album 'Pylon' have further elevated her status, cementing her as an unmissable, mainstage festival powerhouse.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "T-Mobile",
    day: "Sunday",
    date: "Aug 2",
    startTime: "6:45 PM",
    endTime: "7:45 PM",
  },
};

const aespa: Artist = {
  name: "aespa",
  slug: "aespa",
  mbid: "b51c672b-85e0-48fe-8648-470a2422229f",
  imageUrl: "/artists/heroes/aespa.jpg",
  objectPosition: "center 10%",
  genres: ["K-Pop", "Pop", "Electronic", "Dance Pop"],
  location: "Seoul, South Korea",
  tagline: "Four members. Four avatars. One universe.",
  socials: {
    spotify: "https://open.spotify.com/artist/6YVMFz59CuY7ngCxTxjpxE",
    youtube: "https://www.youtube.com/@aespa",
    tiktok: "https://www.tiktok.com/@aespa_official",
  },
  whySee: [
    "The most conceptually ambitious K-pop act on the circuit — an AI-meets-reality universe unlike anything else in pop",
    "'Supernova' is one of the most technically demanding performances in K-pop, executed flawlessly live",
    "Karina, Giselle, Winter, and Ningning are four distinct personalities locked in total sync",
    "A gateway set for anyone who has never experienced K-pop at festival scale",
  ],
  whatToExpect: [
    "Choreography",
    "Cinematic Visuals",
    "Multilingual Performance",
    "Intense Fan Connection",
  ],
  bestFor: [],
  similarArtists: [
    {
      name: "Major Lazer",
      slug: "major-lazer",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178ab312009266614f4d3185229",
    },
    {
      name: "I-DLE",
      slug: "i-dle",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a6d269fc34884864c3f0f914",
    },
    { name: "Zack Martino", slug: "zack-martino" },
    { name: "DJ Trixie Mattel", slug: "dj-trixie-mattel" },
  ],
  tracks: [
    {
      name: "LEMONADE",
      album: "LEMONADE",
      duration: "3:37",
      artworkUrl: "/albums/aespa/lemonade.jpg",
    },
    {
      name: "Supernova",
      album: "Armageddon",
      duration: "3:01",
      artworkUrl: "/albums/aespa/supernova.png",
    },
    {
      name: "Whiplash",
      album: "Whiplash",
      duration: "3:05",
      artworkUrl: "/albums/aespa/whiplash.png",
    },
  ],
  about:
    "aespa debuted in 2020 under SM Entertainment with one of the most distinctive concepts in K-pop history: each of the four members — Karina, Giselle, Winter, and Ningning — has a digital AI counterpart called an æ. Their debut single 'Black Mamba' broke the SM Entertainment YouTube record and set the tone for a group that would never take the conventional path. Following the massive success of 2024's 'Supernova' and 'Whiplash', their 2026 sophomore album 'LEMONADE' pushed their sound into ambitious electronic territory, cementing their status as global festival sub-headliners.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "Allianz",
    day: "Sunday",
    date: "Aug 2",
    startTime: "7:45 PM",
    endTime: "8:45 PM",
  },
};

const theChainsmokers: Artist = {
  name: "The Chainsmokers",
  slug: "the-chainsmokers",
  genres: ["Dance Pop", "Future Bass", "Electronic"],
  location: "Los Angeles, California",
  tagline: "Multi-platinum electronic giants delivering a massive, stadium-scale pop spectacle.",
  socials: { spotify: "https://open.spotify.com/artist/69GGBxA162lTqCwzJG5jLp" },
  whySee: [
    "A non-stop, high-energy headline performance packed back-to-back with a decade of global, generation-defining pop radio anthems",
    "Alex Pall and Drew Taggart executing a hybrid live set that pairs hyper-precise deck manipulation with live vocals and drumming",
    "An absolute stadium-scale visual layout deploying massive pyrotechnics, elite lighting architecture, and blinding laser fields",
    "The ultimate high-visibility Sunday evening crowd catalyst designed purely to close out the weekend at terminal velocity",
  ],
  whatToExpect: [
    "Massive Singalongs",
    "High-Production Visuals",
    "Live Band Performance",
    "High-Energy Pacing",
  ],
  bestFor: ["Bass & Groove Lovers", "Legacy & Milestone Hunters"],
  similarArtists: [
    {
      name: "Whethan",
      slug: "whethan",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782717c8959d00aa37044bbb74",
    },
    {
      name: "Know Good",
      slug: "know-good",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1785358de71801fad4a13adc2f2",
    },
    {
      name: "MC4D",
      slug: "mc4d",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178042776271fc2c09e905c93e6",
    },
    {
      name: "Alison Wonderland",
      slug: "alison-wonderland",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b7e4c34bfa9cf5b54afadb14",
    },
  ],
  tracks: [
    { name: "Closer", album: "Collage", duration: "" },
    { name: "Don't Let Me Down", album: "Collage", duration: "" },
    {
      spotifyId: "6RUKPb4LETWmmr3iAEQktW",
      name: "Something Just Like This",
      album: "Memories...Do Not Open",
      duration: "4:07",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e020c13d3d5a503c84fcc60ae94",
    },
  ],
  about:
    "The Chainsmokers is the Grammy-winning electronic pop duo of Alex Pall and Drew Taggart, whose sharp combination of multi-platinum future bass production, sleek indie-pop hooks, and commanding stage showmanship earned them billions of streams worldwide. Moving rapidly from the club underground to absolute global chart dominance, they crafted the literal sonic blueprint for crossover electronic radio anthems throughout the late 2010s. Backed by an exceptionally polished live visual infrastructure, their headlining mainstage closer provides a massive, high-velocity celebration of pop history.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "Bud Light",
    day: "Sunday",
    date: "Aug 2",
    startTime: "8:30 PM",
    endTime: "10:00 PM",
  },
};

const muna: Artist = {
  name: "MUNA",
  slug: "muna",
  genres: ["Indie Pop", "Synth-Pop", "Electropop"],
  location: "Los Angeles, California",
  tagline: "Sleek, euphoric queer synth-pop anthems built on raw, joyful emotional catharsis.",
  socials: { spotify: "https://open.spotify.com/artist/6xdRb2GypJ7DqnWAI2mHGn" },
  whySee: [
    "One of indie music's absolute finest contemporary live forces delivering a deeply moving, celebratory pop sermon on the mainstage",
    "Katie Gavin's magnetic, completely commanding vocals leading a passionate crowd of thousands singing every specific lyric",
    "Experience a stunning combination of sparkling retro-futuristic synth lines and driving, fuzzed-out alternative rock guitar Hooks",
    "A deeply emotional, park-wide safe-haven environment fueled by collective crowd catharsis and irresistible dance-pop energy",
  ],
  whatToExpect: ["Synth & Atmospheric", "Choreography", "Massive Singalongs"],
  bestFor: ["Lyric & Narrative Obsessives", "Dance Floor Seekers"],
  similarArtists: [
    {
      name: "Empire of the Sun",
      slug: "empire-of-the-sun",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c806f3e714afa21861e20248",
    },
    {
      name: "Lorde",
      slug: "lorde",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178678a3a4bc2d8a84074f22c71",
    },
    {
      name: "Slayyyter",
      slug: "slayyyter",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178d475efee7c254f7e77a2d306",
    },
    {
      name: "The xx",
      slug: "the-xx",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783a96db4736ef035e1fcb2516",
    },
  ],
  tracks: [
    {
      spotifyId: "5ECxiK4Vigo1yRRmAoZc1f",
      name: "Silk Chiffon",
      album: "MUNA",
      duration: "3:26",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02bb5a3de97d548a649cfafe67",
    },
    {
      spotifyId: "7uvxkcv7FWVh4wE91I8Bi2",
      name: "What I Want",
      album: "MUNA",
      duration: "4:03",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02bb5a3de97d548a649cfafe67",
    },
    {
      spotifyId: "3vnyzhfVRh3agMjP6nABJw",
      name: "Stayaway",
      album: "Saves the World",
      duration: "3:31",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02c989e140055797ed6bc81314",
    },
  ],
  about:
    "MUNA is the Los Angeles-born alternative pop trio comprising Katie Gavin, Naomi McPherson, and Josette Maskin, whose meticulous blend of sparkling synth-pop grooves, crisp electronic rhythm sections, and deeply honest lyricism has fostered a massive global community. Originally breaking out of the West Coast underground before signing with Saddest Factory Records, the outfit writes sweeping tales of queer joy, identity, and interpersonal grief. Backed by exceptionally tight live chemistry, their high-visibility late-afternoon set scales bedroom vulnerability into monumental field anthems.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "Bud Light",
    day: "Sunday",
    date: "Aug 2",
    startTime: "6:15 PM",
    endTime: "7:15 PM",
  },
};

const hotMulligan: Artist = {
  name: "Hot Mulligan",
  slug: "hot-mulligan",
  genres: ["Emo", "Pop-Punk", "Post-Hardcore"],
  location: "Lansing, Michigan",
  tagline:
    "Blistering, hyper-vivid midwestern emo anthems delivered like an absolute lightning strike.",
  socials: { spotify: "https://open.spotify.com/artist/1lKZzN2d4IqiEYxyECIEHI" },
  whySee: [
    "A ferocious live alternative rock engine executing an intense, raw performance that completely bypasses processed backing tracks",
    "Tades Sanville's exceptionally raw, screaming vocal delivery commanding massive, park-wide mosh pits and emotional singalongs",
    "Hear the live premiere of massive, fuzzed-out dual-guitar riffs from their highly celebrated recent studio milestones",
    "A deeply therapeutic live environment built on sharp midwestern isolation, weaponized humor, and collective crowd catharsis",
  ],
  whatToExpect: ["Raw Vocal Delivery", "Energetic Mosh Pits", "Massive Singalongs"],
  bestFor: ["Mosh Pit Lovers"],
  similarArtists: [
    {
      name: "YUNGBLUD",
      slug: "yungblud",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1787c9287712c4355e54c94e0d0",
    },
    {
      name: "Turnstile",
      slug: "turnstile",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a4c3fd0017b42344516dc16c",
    },
    {
      name: "The Story So Far",
      slug: "the-story-so-far",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1784d8d055d82fc1e5b1c5ecb1d",
    },
  ],
  tracks: [
    {
      spotifyId: "2eTDSkAeUtMkp9fb5KbTJV",
      name: "BCKYRD",
      album: "you'll be fine",
      duration: "3:23",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02fec2691d20750b512ba92483",
    },
    { name: "Drink Milk and Run", album: "Why Would I Watch", duration: "" },
    { name: "Shhh! Golf is on", album: "Why Would I Watch", duration: "" },
  ],
  about:
    "Hot Mulligan is the Michigan-born five-piece rock outfit whose hyper-vivid blend of distorted garage emo grit and glittering, pop-punk melodic hooks has earned them a reputation as the definitive leaders of the modern emo resurgence. Writing music that operates with the urgent, unpredictable pacing of a panic attack, the band relies on incredibly crisp dual-guitar layers and deeply conversational lyricism. Coming off massive global headline arena runs, their late-afternoon performance provides a thrilling, beautifully raw antidote to overprocessed pop.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "Tito's",
    day: "Sunday",
    date: "Aug 2",
    startTime: "5:15 PM",
    endTime: "6:15 PM",
  },
};

const yoasobi: Artist = {
  name: "YOASOBI",
  slug: "yoasobi",
  mbid: "df6c619f-4334-43e2-8b6a-4a32af1e4f85",
  imageUrl: "/artists/heroes/yoasobi.jpg",
  objectPosition: "center 20%",
  genres: ["J-Pop", "Electronic", "Indie Pop"],
  location: "Tokyo, Japan",
  tagline: "Bridging Japanese storytelling and explosive J-pop anthems on a global scale.",
  socials: {
    spotify: "https://open.spotify.com/artist/64tJ2EAv1R6UaZqc4iOCyj",
    youtube: "https://www.youtube.com/@YOASOBI_Official",
    tiktok: "https://www.tiktok.com/@yoasobi_",
  },
  whySee: [
    "Idol — one of the biggest songs on the planet — performed live by the duo who made it",
    "Their concept is unlike anyone else at the festival: every song adapts a Japanese short story into music",
    "Producer Ayase's electronic arrangements hit completely differently at festival volume",
    "A global phenomenon that most Western audiences are only beginning to discover",
  ],
  whatToExpect: ["Live Band Performance", "Massive Singalongs", "Spectacle Moments"],
  bestFor: [],
  similarArtists: [
    {
      name: "Empire of the Sun",
      slug: "empire-of-the-sun",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c806f3e714afa21861e20248",
    },
    {
      name: "The xx",
      slug: "the-xx",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783a96db4736ef035e1fcb2516",
    },
    {
      name: "Ado",
      slug: "ado",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bcb1c184c322688f10cdce7a",
    },
    {
      name: "Paris Paloma",
      slug: "paris-paloma",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fea2286a364dd2a0c4209136",
    },
  ],
  tracks: [
    {
      spotifyId: "1hAloWiinXLPQUJxrJReb1",
      name: "アイドル",
      album: "THE BOOK 3",
      duration: "3:31",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02f3527c2e1ffc2e99bb6a072e",
    },
    {
      spotifyId: "6MCjmGYlw6mQVWRFVgBRvB",
      name: "夜に駆ける",
      album: "THE BOOK",
      duration: "4:18",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0239917845c74c9e64320fbed9",
    },
    {
      spotifyId: "1zd35Y44Blc1CwwVbW3Qnk",
      name: "群青",
      album: "THE BOOK",
      duration: "4:08",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0239917845c74c9e64320fbed9",
    },
  ],
  about:
    "YOASOBI is a Japanese music project formed in 2019 by producer Ayase and vocalist ikura with a singular concept: creating 'music from novels'. Each track serves as a direct musical adaptation of a short story, yielding pop music with unique narrative depth and intricate vocal delivery. Following the historic global crossover success of their smash hit 'アイドル' (Idol), the duo has continued to scale new heights with their 2026 studio album 'THE BOOK for,', cementing their status as premier international festival headliners.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Bud Light",
    day: "Sunday",
    date: "Aug 2",
    startTime: "5:00 PM",
    endTime: "6:00 PM",
  },
};

const ado: Artist = {
  name: "Ado",
  slug: "ado",
  genres: ["J-Pop", "Rock", "Electronic"],
  location: "Tokyo, Japan",
  tagline:
    "A monumental, completely anonymous J-pop powerhouse commanding jaw-dropping vocal fury.",
  socials: { spotify: "https://open.spotify.com/artist/6mEQK9m2krja6X1cfsAjfl" },
  whySee: [
    "A historic, highly anticipated American festival debut from a completely anonymous global J-pop phenomenon hiding behind silhouettes",
    "Witness one of the most technically gifted, breathtakingly unique vocalists alive shifting from operatic control to savage rock screams",
    "An absolute masterclass in live theatrical performance backed by high-production cinematic visuals and a fierce rock ensemble",
    "A deeply passionate, high-energy evening crowd environment driven by intense stadium-scale fan chants and soaring hooks",
  ],
  whatToExpect: [
    "Technical Vocal Range",
    "Theatrical Staging",
    "Cinematic Visuals",
    "Intense Fan Connection",
  ],
  bestFor: ["Legacy & Milestone Hunters"],
  similarArtists: [
    {
      name: "YOASOBI",
      slug: "yoasobi",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178964812dece6096f894a1fe85",
    },
    {
      name: "SIDEPIECE",
      slug: "sidepiece",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17821705221c7f192d4a7963910",
    },
    {
      name: "Ninajirachi",
      slug: "ninajirachi",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1789ab4772c0bd3455137b1d02e",
    },
    {
      name: "Snow Strippers",
      slug: "snow-strippers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782949c67f381d533010389d6a",
    },
  ],
  tracks: [
    { name: "Usseewa", album: "K狂言", duration: "" },
    { name: "New Genesis", album: "Uta's Songs: One Piece Film Red", duration: "" },
    {
      spotifyId: "1rDgAHDX95RmylxjgVW9tN",
      name: "Show",
      album: "Show",
      duration: "3:09",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02e204aafb5c393179c77c5253",
    },
  ],
  about:
    "Ado is the completely anonymous Japanese vocal powerhouse whose extraordinary three-octave range and fierce independent path transformed her from a bedroom utaite into an essential global vanguard of J-pop. Completely obscuring her physical identity behind dark silhouettes and striking anime avatars, she pairs bold social commentary with genre-fluid alternative rock textures. Shattering international streaming benchmarks with blockbusters like 'Usseewa', her highly visible evening mainstage performance stands as an undeniable showcase of pristine musical power.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Bud Light",
    day: "Sunday",
    date: "Aug 2",
    startTime: "4:45 PM",
    endTime: "5:45 PM",
  },
};

const jade: Artist = {
  name: "Jade",
  slug: "jade",
  genres: ["R&B", "Pop", "Soul"],
  location: "London, England",
  tagline:
    "Sleek, high-gloss British pop-R&B and contemporary soul built on flawless vocal authority.",
  socials: { spotify: "https://open.spotify.com/artist/7ypgj95aGInvJMJbMv78wB" },
  whySee: [
    "The highly anticipated solo festival debut from a world-class pop icon stepping completely into her own R&B identity",
    "Jade Thirlwall's phenomenal, soaring vocal range executed flawlessly through complex, high-energy live band arrangements",
    "A masterclass in world-class pop execution, delivering massive global hooks mixed with deep, low-slung soul grooves",
    "An absolute stadium-scale celebration packed with massive group singalongs and blinding, exceptionally stylish choreography",
  ],
  whatToExpect: ["Choreography", "Cinematic Visuals", "Bass & Groove"],
  bestFor: ["Dance Floor Seekers", "Early Afternoon Discovery"],
  similarArtists: [
    { name: "Justine Skye", slug: "justine-skye" },
    {
      name: "Blood Orange",
      slug: "blood-orange",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17882a833d61eafc09c05c24882",
    },
    {
      name: "Sienna Spiro",
      slug: "sienna-spiro",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fb0ab819bbd4502028cd1feb",
    },
    {
      name: "Olivia Dean",
      slug: "olivia-dean",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1785c7577ad44daeb7ce4b941a1",
    },
  ],
  tracks: [
    {
      spotifyId: "46cW6zufU9Woo11TLs2i6X",
      name: "Angel Of My Dreams",
      album: "Angel Of My Dreams",
      duration: "3:17",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02394b8e50027ffc403d33532a",
    },
    {
      spotifyId: "6dpPD92UT5ETTb56EI57yI",
      name: "Fantasy",
      album: "Fantasy",
      duration: "3:36",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e025b38cb94becaa7a1bb1050da",
    },
    { name: "Midnight", album: "Midnight", duration: "" },
  ],
  about:
    "Jade Thirlwall, performing under the singular moniker Jade, debuted in 2011 as a core member of global multi-platinum phenomenon Little Mix before launching an equally historic solo career. Known for her fierce vocal flows, sultry contemporary R&B hooks, and trendsetting fashion authority, she shattered international charts with her independent material. Backed by an exceptionally polished live band and elite dancers, her late afternoon mainstage performance provides a high-energy masterclass in pure, unadulterated pop dominance.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "T-Mobile",
    day: "Sunday",
    date: "Aug 2",
    startTime: "4:45 PM",
    endTime: "5:45 PM",
  },
};

const eliBrown: Artist = {
  name: "Eli Brown",
  slug: "eli-brown",
  genres: ["Dark Techno", "Tech House", "Electronic"],
  location: "Bristol, England",
  tagline:
    "Punishing, sinister dark techno designed to turn giant festival tents into industrial warehouses.",
  socials: { spotify: "https://open.spotify.com/artist/5lVNSw2GPci8kebrAQpZqU" },
  whySee: [
    "One of global techno's absolute finest modern technicians commanding an intense, high-velocity late-night dance session",
    "Experience a calculated masterclass in modular hardware manipulation, metallic techno grooves, and distorted vocal samples",
    "The absolute premier alternative option for electronic fans hunting heavy, stylized atmospheric warehouse tension over commercial EDM",
    "An absolute, non-stop dance accelerator designed perfectly to turn a festival crowd into a boiling rave paradise",
  ],
  whatToExpect: ["Bass & Groove", "Dark Mood Visuals", "Cinematic Visuals", "High-Energy Pacing"],
  bestFor: ["Bass & Groove Lovers", "Tent & Club Venue Seekers", "Sound Design & Production Nerds"],
  similarArtists: [
    {
      name: "Max Styler",
      slug: "max-styler",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178ded53da461b13994a9ef8347",
    },
    {
      name: "Peace Control",
      slug: "peace-control",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17817b940b1cfc87546d75925c0",
    },
    {
      name: "bradeazy",
      slug: "bradeazy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781c9da6b48887663d291b8df4",
    },
    {
      name: "Devault",
      slug: "devault",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178669860fe69ee33857a3bdeb6",
    },
  ],
  tracks: [
    { name: "Be the One", album: "Be the One", duration: "" },
    {
      spotifyId: "40up5wCfwQXTDXyE18hJbJ",
      name: "Believe",
      album: "Believe",
      duration: "6:48",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02ab748dd2eba98fcd3fae5f76",
    },
    { name: "Diamonds on My Mind", album: "Diamonds on My Mind", duration: "" },
  ],
  about:
    "Eli Brown is a Bristol-born DJ and electronic producer who has rapidly solidified his position as one of the modern era's most prolific and essential dark techno forces. Blending the heavy, metallic weight of industrial techno with the nostalgic, cold textures of late-80s warehouse networks, his meticulously engineered tracks possess a distinct narrative tension. Highly sought after for his uncompromising approach on his own Arcane imprint, his late-night festival environment functions as a blindingly intense, strobe-lit audio-visual spectacle.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Sunday",
    date: "Aug 2",
    startTime: "7:15 PM",
    endTime: "8:15 PM",
  },
};

const dukeDumont: Artist = {
  name: "Duke Dumont",
  slug: "duke-dumont",
  genres: ["House", "Deep House", "Electronic"],
  location: "London, England",
  tagline: "The multi-platinum architect of pristine, stadium-scale deep house anthems.",
  socials: { spotify: "https://open.spotify.com/artist/61lyPtntblHJvA7FMMhi7E" },
  whySee: [
    "A legendary titan of underground house music crossover culture delivering a masterclass closing set under the Perry's tent",
    "Experience a non-stop, high-velocity dance party packed back-to-back with a decade of global multi-platinum hits like 'Ocean Drive'",
    "An absolute masterclass in club curation, pairing deep soulful vocal melodies with heavy, rolling bassline hooks",
    "A premier late-night crowd catalyst deployed with blinding, high-production audio-visual loops and laser field arrays",
  ],
  whatToExpect: ["Massive Singalongs", "Bass & Groove", "High-Energy Pacing"],
  bestFor: ["Tent & Club Venue Seekers", "Dance Floor Seekers", "Legacy & Milestone Hunters"],
  similarArtists: [
    {
      name: "SIDEPIECE",
      slug: "sidepiece",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17821705221c7f192d4a7963910",
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
      name: "John Summit",
      slug: "john-summit",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17820662b32f3dbabad755dfb53",
    },
  ],
  tracks: [
    {
      spotifyId: "4b93D55xv3YCH5mT4p6HPn",
      name: "Ocean Drive",
      album: "Duality",
      duration: "3:26",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e023ce84b2c05a3bac3d48c8217",
    },
    { name: "Need U (100%)", album: "Need U (100%)", duration: "" },
    { name: "I Got U", album: "Duality", duration: "" },
  ],
  about:
    "Adam Dyment, performing under the iconic moniker Duke Dumont, is a Grammy-nominated multi-platinum producer and DJ who completely re-engineered the crossover house music landscape over the past decade. Characterized by his unique formula of minimalist, high-tempo deep house loops, heavy rolling bass steps, and pristine alternative vocal choices, his production has anchored massive radio hits globally. Closing down the late-night slot, his performance serves as an explosive celebration of modern electronic music history.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Sunday",
    date: "Aug 2",
    startTime: "8:30 PM",
    endTime: "9:45 PM",
  },
};

const fakemink: Artist = {
  name: "Fakemink",
  slug: "fakemink",
  genres: ["Alternative Hip-Hop", "Trap", "Electronic Pop"],
  location: "Chicago, Illinois",
  tagline:
    "Glitchy, high-velocity internet rap and bounce-driven trap from a hometown breakout project.",
  socials: { spotify: "https://open.spotify.com/artist/0qc4BFxcwRFZfevTck4fOi" },
  whySee: [
    "A massive hometown showcase performance on the alternative stage celebrating a rapid ascent in the local independent scene",
    "Experience an intense, rapid-fire vocal workout gliding effortlessly over incredibly crisp, low-slung alternative electronic bass pockets",
    "An absolute wildfire crowd environment packed with chaotic, high-energy teenage mosh pits early in the day",
    "Catch a lightning-fast underground trendsetter running on pure digital clout before they completely alter pop infrastructure",
  ],
  whatToExpect: ["Cinematic Visuals", "Energetic Mosh Pits", "Synth & Atmospheric"],
  bestFor: ["Scene Trend Spotters", "Hometown & Local Supporters", "Dance Floor Seekers"],
  similarArtists: [
    { name: "After", slug: "after" },
    {
      name: "partyof2",
      slug: "partyof2",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b9dbe3484f4e59e7b0e18b7a",
    },
    {
      name: "Quadeca",
      slug: "quadeca",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781eee118b4a489ddd3de9f47b",
    },
    { name: "KLO", slug: "klo" },
  ],
  tracks: [
    { name: "Mink", album: "Fakemink", duration: "" },
    { name: "Static", album: "Fakemink", duration: "" },
    { name: "Fade", album: "Fade", duration: "" },
  ],
  about:
    "Fakemink is a Chicago-born alternative hip-hop producer, singer, and songwriter who rapidly vaulted from Soundcloud isolation into local independent prominence, commanding an intensely passionate regional community. Characterized by a unique choice of hazy, loop-heavy underground production and unstructured, stream-of-consciousness flows, the project embodies the post-rage aesthetic of modern youth culture. Performing a prime midday slot, the live execution completely flips traditional festival pacing for pure, energetic crowd chaos.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Sunday",
    date: "Aug 2",
    startTime: "1:15 PM",
    endTime: "1:55 PM",
  },
};

const dombresky: Artist = {
  name: "Dombresky",
  slug: "dombresky",
  genres: ["House", "Tech House", "Disco House"],
  location: "Montpellier, France",
  tagline: "Infectious, soul-sampled French house loops built purely for celebratory day parties.",
  socials: { spotify: "https://open.spotify.com/artist/2GVtgxcx7jg5xVCZsIHSGN" },
  whySee: [
    "Quentin Dombres bringing his hyper-infectious, cheerful brand of modern French house straight to a boiling festival tent",
    "A non-stop, high-velocity dance party packed back-to-back with iconic global club hits and multi-platinum single drops",
    "An absolute masterclass in club curation, blending heavy tech-house rolling basslines with exceptionally bright disco vocal chops",
    "The ultimate mid-afternoon crowd catalyst under the Perry's tent designed purely to get massive groups of friends dancing together",
  ],
  whatToExpect: ["Rhythm Complexity", "Afternoon Vibes", "High-Energy Pacing"],
  bestFor: ["Dance Floor Seekers"],
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
      name: "John Summit",
      slug: "john-summit",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17820662b32f3dbabad755dfb53",
    },
    {
      name: "SIDEPIECE",
      slug: "sidepiece",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17821705221c7f192d4a7963910",
    },
  ],
  tracks: [
    { name: "Soulr", album: "Soulr", duration: "" },
    { name: "Utopia", album: "Uuality", duration: "" },
    {
      spotifyId: "5jbz9ONajDOe1AW5c3ob5U",
      name: "Down Low",
      album: "Down Low",
      duration: "2:41",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0226fe8c26e94de4afaecdf688",
    },
  ],
  about:
    "Quentin Dombres, operating under the singular moniker Dombresky, is a French-born electronic producer and DJ whose meticulous formula of upbeat house tempos, deep tech-house rolling baselines, and massive crossover pop appeal has earned him global multi-platinum acclaim. Dominating festival circuits through an intensely playful digital presence and pristine production skills, he crafts a hyper-kinetic soundscape built around heavy groove loops. Ready to ignite his high-visibility afternoon slot, his live performance strips away club pretension for a beautifully unadulterated, celebratory dance party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Sunday",
    date: "Aug 2",
    startTime: "2:30 PM",
    endTime: "3:30 PM",
  },
};

const monaleo: Artist = {
  name: "Monaleo",
  slug: "monaleo",
  genres: ["Hip-Hop", "Southern Rap", "Trap"],
  location: "Houston, Texas",
  tagline:
    "Ferocious, rapid-fire Southern trap delivery and unapologetic, aggressive mic dominance.",
  socials: { spotify: "https://open.spotify.com/artist/2sflbTtCirog5VxD6jPAfb" },
  whySee: [
    "An absolute force of nature delivering one of the most high-octane, lyrically aggressive sets of the afternoon lineup",
    "Monaleo's legendary, razor-sharp double-time flows delivered with absolute precision and unyielding mic command",
    "Experience a wildfire crowd environment packed with chaotic, high-energy mosh pits and massive group-scale singalongs",
    "Hear the live execution of massive global breakout independent anthems like 'Beating Down Yo Block' at monumental scale",
  ],
  whatToExpect: ["Bass & Groove", "Energetic Mosh Pits", "Intense Fan Connection"],
  bestFor: ["Lyric & Narrative Obsessives", "Mosh Pit Lovers"],
  similarArtists: [
    {
      name: "Lil Uzi Vert",
      slug: "lil-uzi-vert",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17862c272d76220f2e9dad56704",
    },
    {
      name: "Beno",
      slug: "beno",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c81366842659393e281fe4ca",
    },
    {
      name: "Mustard",
      slug: "mustard",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17854406b7007a449aeaac06c44",
    },
    { name: "After", slug: "after" },
  ],
  tracks: [
    { name: "Beating Down Yo Block", album: "Where the Wild Things Are", duration: "" },
    { name: "We Not Humping", album: "Where the Wild Things Are", duration: "" },
    { name: "Ass Kickin", album: "Where the Wild Things Are", duration: "" },
  ],
  about:
    "Leondra Gay, performing under the iconic moniker Monaleo, is a Houston-born rapper and songwriter whose uncompromising independent path, machine-gun lyrical delivery, and raw emotional audacity established her as an essential vanguard of contemporary southern hip-hop. Fusing the gritty, physical weight of classic Texas trap percussion with fierce, empowering anthems and sharp vocal deliveries, she dissects systemic isolation and relationship breakdowns with profound precision. Her afternoon set stands as an undeniable, adrenaline-fueled masterclass in pure street rap control.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Sunday",
    date: "Aug 2",
    startTime: "4:00 PM",
    endTime: "5:00 PM",
  },
};

const adela: Artist = {
  name: "ADÉLA",
  slug: "adela",
  genres: ["Pop", "Indie Pop", "Dance Pop"],
  location: "Bratislava, Slovakia",
  tagline: "Sleek, atmospheric European pop melodies driven by stunning vocal clarity.",
  socials: { spotify: "https://open.spotify.com/artist/2qanRMyA5bNuTvz1dK45OP" },
  whySee: [
    "Witness an exceptional international pop vocalist executing a highly anticipated debut performance on the undercard",
    "Adéla's crystalline, commanding vocal delivery effortlessly carrying soaring hooks across the open afternoon lawn",
    "Experience a beautifully vibrant, upbeat afternoon sonic escape that brings fresh European pop sensibilities to Chicago",
    "Hear the live execution of incredibly infectious, independent pop singles delivered with effortless live confidence",
  ],
  whatToExpect: ["Production Style Approach", "Minimal Production", "Afternoon Vibes"],
  bestFor: ["Legacy & Milestone Hunters", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "SB19",
      slug: "sb19",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17856dea7970c54f7ce5688a688",
    },
    {
      name: "Tate McRae",
      slug: "tate-mcrae",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bed8016bd64422793ff3bc75",
    },
    {
      name: "bbno$",
      slug: "bbno-dollar",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178e7c585e9ecd65c76b7bf91ac",
    },
    {
      name: "aespa",
      slug: "aespa",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178053bbb910dda6d4ab0618b8b",
    },
  ],
  tracks: [
    { name: "Sám", album: "Sám", duration: "" },
    { name: "Let Me Go", album: "Let Me Go", duration: "" },
    { name: "True", album: "True", duration: "" },
  ],
  about:
    "Adéla Jergová, known as ADÉLA, is a rising European singer and songwriter whose extraordinary vocal range, pristine contemporary pop production, and hyper-infectious indie-pop hooks have captured intense listener focus across digital platforms. Fusing traditional vocal power with bright, radio-ready electronic syncopation, she writes sweeping, emotionally direct tales of youth, self-reliance, and modern romance. Commanding the stage with effortless authority, her early afternoon live set transforms the Allianz stage into a vibrant, celebratory outdoor listening party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Sunday",
    date: "Aug 2",
    startTime: "12:00 PM",
    endTime: "12:45 PM",
  },
};

const riordan: Artist = {
  name: "Riordan",
  slug: "riordan",
  genres: ["Tech House", "Minimal Tech", "Electronic"],
  location: "Brighton, England",
  tagline: "High-octane, bass-heavy minimal tech house crafted to fuel relentless dance floors.",
  socials: { spotify: "https://open.spotify.com/artist/68rU1sdZ0HjxjEC5YnSmao" },
  whySee: [
    "One of the UK house scene's most viral and fiercely watched technical selectors commanding an intense midday session",
    "An elite display of hyper-precise percussive architecture, rolling low-frequency baselines, and addictive vocal chops",
    "Experience a non-stop daytime adrenaline accelerator that completely transforms the Perry's tent into a boiling rave floor",
    "The absolute perfect early-day groove engine designed to get large groups of friends dancing together under the sun",
  ],
  whatToExpect: ["Cinematic Visuals", "Bass & Groove", "Afternoon Vibes", "High-Energy Pacing"],
  bestFor: ["Tent & Club Venue Seekers", "Bass & Groove Lovers", "Dance Floor Seekers"],
  similarArtists: [
    {
      name: "Eli Brown",
      slug: "eli-brown",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178264c8c3a982604908c6cf188",
    },
    {
      name: "Westend",
      slug: "westend",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bc781a35d287a09940ae6046",
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
      spotifyId: "5qKuF0NtvWVn5UarAgyli3",
      name: "Needle On The Record",
      album: "Needle On The Record",
      duration: "3:06",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e023c999b602df80f331a7415e5",
    },
    { name: "Pompeii", album: "Pompeii", duration: "" },
    { name: "While The City Sleeps", album: "While The City Sleeps", duration: "" },
  ],
  about:
    "Dan Riordan, performing under the singular moniker Riordan, is a Brighton-born electronic producer and DJ whose meticulous formula of upbeat house tempos, deep tech-house rolling baselines, and massive crossover pop appeal has earned him global multi-platinum acclaim. Dominating festival circuits through an intensely playful digital presence and pristine production skills, he crafts a hyper-kinetic soundscape built around heavy groove loops. Ready to ignite his high-visibility afternoon slot, his live performance strips away club pretension for a beautifully unadulterated, celebratory dance party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Sunday",
    date: "Aug 2",
    startTime: "1:45 PM",
    endTime: "2:30 PM",
  },
};

const wunderhorse: Artist = {
  name: "Wunderhorse",
  slug: "wunderhorse",
  genres: ["Indie Rock", "Alternative Rock", "Post-Punk"],
  location: "London, England",
  tagline: "Visceral, raw guitar rock and poetic, fuzzed-out alternative storytelling.",
  socials: { spotify: "https://open.spotify.com/artist/41pd7r1XBRsvdxY3vHEgib" },
  whySee: [
    "One of the UK's absolute finest contemporary live forces delivering a deeply moving rock sermon on the Allianz stage",
    "Jacob Slater's ferociously raw, working-class lyrical delivery commanding an intensely emotional crowd singalong",
    "A masterclass in traditional analog power band energy, delivering jagged dual-guitar riffs and complex progressive rhythmic patterns",
    "Experience a stunning combination of crushing alternative guitar grit and soaring, 1990s-styled indie rock melodic hooks",
  ],
  whatToExpect: [
    "Guitar-Driven Sound",
    "Raw Vocal Delivery",
    "Massive Singalongs",
    "Energetic Mosh Pits",
  ],
  bestFor: ["Lyric & Narrative Obsessives"],
  similarArtists: [
    {
      name: "Day We Ran",
      slug: "day-we-ran",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17896aa0ad1b8badab28252f80b",
    },
    {
      name: "Villanelle",
      slug: "villanelle",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781ece1eae58afddb4d3238501",
    },
    {
      name: "Ink",
      slug: "ink",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b3df8a3980032366a3a040bc",
    },
    {
      name: "The Braymores",
      slug: "the-braymores",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178e72ca0c70ab4f5bb3da261dc",
    },
  ],
  tracks: [
    {
      spotifyId: "01WnKRbZWhZaiF5YfOVJoz",
      name: "Purple",
      album: "Cub",
      duration: "3:22",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02be8e67d6db7bb17c437092fa",
    },
    {
      spotifyId: "1YYK8zYkBKxVaANQ7CkgYu",
      name: "Leader of the Pack",
      album: "Cub",
      duration: "3:03",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02be8e67d6db7bb17c437092fa",
    },
    {
      spotifyId: "2FhyTzw49NtYw29JEFvdu2",
      name: "Midas",
      album: "Midas",
      duration: "2:18",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e020f2cfbe7b40aa3669f6f89ad",
    },
  ],
  about:
    "Wunderhorse is the artistic venture of British singer-songwriter Jacob Slater, whose hyper-vivid blend of distorted alternative rock instrumentation, jangly guitars, and raw narrative poetry has established his project as an essential modern vanguard of the global scene. Emerging from the ashes of the UK underground punk movements, the band anchors an emotionally massive sonic landscape that addresses trauma, identity, and isolation with staggering honesty. Backed by their highly acclaimed studio milestones like 'Midas', their live performance scales bedroom vulnerability into monumental field anthems.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Sunday",
    date: "Aug 2",
    startTime: "4:15 PM",
    endTime: "5:15 PM",
  },
};

const amberMark: Artist = {
  name: "Amber Mark",
  slug: "amber-mark",
  genres: ["R&B", "Soul", "House-Pop"],
  location: "New York City, New York",
  tagline:
    "Lush, sun-drenched global R&B and house-infused soul built on magnificent vocal richness.",
  socials: { spotify: "https://open.spotify.com/artist/0tbeZu9lv8YEKSQ9tZSslu" },
  whySee: [
    "A masterclass in contemporary R&B polish making a high-visibility crossover statement on the T-Mobile stage",
    "Amber Mark's phenomenal, soaring vocal range executed flawlessly through deep, low-slung soul grooves",
    "Experience a chic, hyper-stylized dance floor environment that seamlessly fuses electronic house beats with traditional neo-soul",
    "The ultimate high-energy afternoon catalyst designed perfectly to unify a massive, moving festival crowd under the sun",
  ],
  whatToExpect: ["Bass & Groove", "Synth & Atmospheric"],
  bestFor: ["Bass & Groove Lovers"],
  similarArtists: [
    {
      name: "Blood Orange",
      slug: "blood-orange",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17882a833d61eafc09c05c24882",
    },
    { name: "Justine Skye", slug: "justine-skye" },
    {
      name: "Sienna Spiro",
      slug: "sienna-spiro",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fb0ab819bbd4502028cd1feb",
    },
    {
      name: "Valencia Grace",
      slug: "valencia-grace",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17825599b11aff6d045b573a13f",
    },
  ],
  tracks: [
    {
      spotifyId: "7AQRpyFBYQqtWfkmlqkw4l",
      name: "Worth It",
      album: "Three Dimensions Deep",
      duration: "4:18",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02e22dbd4ab26afe8fc3901d70",
    },
    { name: "What If", album: "Three Dimensions Deep", duration: "" },
    { name: "Space & Time", album: "Lovers", duration: "" },
  ],
  about:
    "Amber Mark is a New York-born global pop-R&B powerhouse whose sharp combination of multi-platinum vocal authority, sleek house-infused electronic production, and commanding stage showmanship has earned her deep critical adoration worldwide. Breaking onto international circuits as an independent auteur, she has spent over a decade refining a sound that pairs traditional global soul structures with contemporary club-ready syncopation. Backed by an exceptionally polished live band, her late afternoon performance provides a high-energy masterclass in pure, unadulterated mainstage musical dominance.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "T-Mobile",
    day: "Sunday",
    date: "Aug 2",
    startTime: "2:45 PM",
    endTime: "3:45 PM",
  },
};

const westend: Artist = {
  name: "Westend",
  slug: "westend",
  genres: ["Tech House", "House", "Electronic"],
  location: "New York City, New York",
  tagline: "Driving, tech-house rollers packed with heavy, crisp warehouse grooves.",
  socials: { spotify: "https://open.spotify.com/artist/4epc3Bd0DOBA0kDywkRAsu" },
  whySee: [
    "Tyler Morris bringing his hyper-infectious, powerful brand of modern New York tech-house straight to a boiling festival tent",
    "An elite display of syncopated swing rhythms, heavy bassline rollers, and flawlessly mixed independent club tracks",
    "The ultimate mid-afternoon crowd catalyst under the Perry's tent designed purely to get thousands of people moving together",
    "A non-stop, high-velocity dance party packed back-to-back with iconic global club hits and multi-platinum single drops",
  ],
  whatToExpect: ["Afternoon Vibes", "High-Energy Pacing"],
  bestFor: [
    "Tent & Club Venue Seekers",
    "Bass & Groove Lovers",
    "Groups & Social Experience",
    "Dance Floor Seekers",
  ],
  similarArtists: [
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
      name: "Omnom",
      slug: "omnom",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a9b9e8e9f12e78d2eb637a6a",
    },
    {
      name: "bradeazy",
      slug: "bradeazy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781c9da6b48887663d291b8df4",
    },
  ],
  tracks: [
    {
      spotifyId: "3aBNMuz8S7wZguV8xuwLem",
      name: "Get This Party Started",
      album: "Get This Party Started",
      duration: "2:40",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e027ccac4c4ee05c33604d015bc",
    },
    { name: "Moderation", album: "Moderation", duration: "" },
    { name: "Feel", album: "Feel", duration: "" },
  ],
  about:
    "Tyler Morris, performing under the singular moniker Westend, is a New York-born electronic producer and DJ whose meticulous combination of classic house grooves, heavy tech-house rolling basslines, and massive crossover pop appeal has earned him multi-platinum acclaim worldwide. Dominating mainstages globally through an intensely playful presence and pristine production skills, he crafts a hyper-kinetic soundscape built around heavy groove loops. Backed by a flawless touring setup, his high-velocity afternoon performance provides a definitive dancefloor clinic under the Perry's tent.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Sunday",
    date: "Aug 2",
    startTime: "3:45 PM",
    endTime: "4:45 PM",
  },
};

const destinConrad: Artist = {
  name: "Destin Conrad",
  slug: "destin-conrad",
  genres: ["Alternative R&B", "Soul", "Neo-Soul"],
  location: "Tampa, Florida",
  tagline: "Sultry, whisper-close confessional alternative R&B for late-night overthinkers.",
  socials: { spotify: "https://open.spotify.com/artist/4jwROPSUkTkohLCRiyjiZZ" },
  whySee: [
    "Catch an exceptional independent lyricist executing a deeply atmospheric, confessional performance on the Tito's stage",
    "Songwriting that lands like an intense, unguarded voice memo tracking the complex, messy textures of young romance",
    "A beautiful, sun-drenched early afternoon oasis that pairs delicate vocal textures with unexpectedly heavy baseline drops",
    "An industry insider finally in the spotlight, renowned for writing hits for Kehlani before launching a revered solo path",
  ],
  whatToExpect: ["Bass & Groove", "Intimate Performance", "Dark Mood Visuals", "Crowd Atmosphere"],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Chezile",
      slug: "chezile",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b1593dbc8b1c5ee3c62b55a1",
    },
    {
      name: "Khamari",
      slug: "khamari",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786921bdf2ddc6e84970fd172e",
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
      spotifyId: "4TLJNON6mZLpfZX3g4Oh8B",
      name: "IN THE AIR",
      album: "COLORWAY",
      duration: "2:16",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02c5626e40ff7ec9f2a9405bf3",
    },
    { name: "BILLBOARD", album: "SATIN", duration: "" },
    { name: "OUT", album: "SUBMISSIVE", duration: "" },
  ],
  about:
    "Destin Conrad is a Florida-born singer-songwriter who built an intensely passionate global community through his hyper-specific, beautifully haunting brand of contemporary alternative R&B. Rooted in the emotional intimacy of close-mic'd storytelling but elevated by deep, heavy urban rhythm pockets and fuzzed-out basslines, his tracks dissect young adulthood with profound precision. Handpicked for an extensive global breakout tour cycle following major writing credits, his early afternoon live set transforms a sprawling festival lawn into an immersive listening experience.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Sunday",
    date: "Aug 2",
    startTime: "2:30 PM",
    endTime: "3:30 PM",
  },
};

const inji: Artist = {
  name: "INJI",
  slug: "inji",
  genres: ["Dance Pop", "Tech House", "Electronic"],
  location: "Istanbul, Turkey",
  tagline:
    "Irreverent, high-velocity tech-house pop built purely for chaotic festival day parties.",
  socials: { spotify: "https://open.spotify.com/artist/0Z4Ir8usNVcAdCSQl0fQki" },
  whySee: [
    "The undisputed high-energy internet pop breakout princess bringing an explosive, completely unhinged club party directly to the park",
    "Inci Gurun's magnetic, larger-than-life stage command delivering sharp, witty vocal lines alongside massive tech-house drops",
    "Experience a beautifully curated afternoon dance floor environment packed back-to-back with viral, multi-million stream anthems",
    "The ultimate high-energy afternoon catalyst designed purely to get massive groups of friends dancing together under the sun",
  ],
  whatToExpect: ["Rhythm Complexity", "Afternoon Vibes", "High-Energy Pacing"],
  bestFor: ["Dance Floor Seekers", "Scene Trend Spotters"],
  similarArtists: [
    {
      name: "Disco Lines",
      slug: "disco-lines",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178965c9bf81cfe9ca329b8a5c7",
    },
    {
      name: "SIDEPIECE",
      slug: "sidepiece",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17821705221c7f192d4a7963910",
    },
    {
      name: "Omnom",
      slug: "omnom",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a9b9e8e9f12e78d2eb637a6a",
    },
    { name: "Zack Martino", slug: "zack-martino" },
  ],
  tracks: [
    {
      spotifyId: "22XXXQKzifAvefSTIm1vRL",
      name: "GASLIGHT",
      album: "LFG",
      duration: "3:17",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02d27855582cdd21b083e08edb",
    },
    {
      spotifyId: "5QwCvIazJBddob7pY7KYwf",
      name: "MADELINE",
      album: "LFG",
      duration: "3:24",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02d27855582cdd21b083e08edb",
    },
    { name: "BELLYDANCE", album: "BELLYDANCE", duration: "" },
  ],
  about:
    "Inci Gurun, performing under the globally iconic moniker INJI, is a Turkish-born, jazz-trained singer and songwriter who seamlessly bridged the gap between internet counter-culture and global live music billing. Fusing the glossy, maximalist electronic textures of tech-house loops with vintage swing patterns and postmodern comedic humor, the project crafts an intensely joyful sonic universe. Live, her performance strips away traditional rock solemnity, deploying an exceptionally stylish masterclass in high-fashion pop showmanship.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Sunday",
    date: "Aug 2",
    startTime: "12:55 PM",
    endTime: "1:40 PM",
  },
};

const waylonWyatt: Artist = {
  name: "Waylon Wyatt",
  slug: "waylon-wyatt",
  genres: ["Country", "Alternative Folk", "Americana"],
  location: "Hackleburg, Alabama",
  tagline: "Grounded, gravel-voiced Alabama folk storytelling built on timeless acoustic hooks.",
  socials: { spotify: "https://open.spotify.com/artist/6Ff2omMMZOd8FWNqb980Ol" },
  whySee: [
    "A rising country standout bringing his highly celebrated, raw Southern songwriting charisma straight to Grant Park",
    "Razor-sharp country lyrics that trade on absolute emotional honesty, working-class grit, and incredible acoustic guitar loops",
    "A stunning afternoon oasis that pairs traditional acoustic instrumentation with a truly monumental, timeless singing voice",
    "The official festival tour run highlighting his highly talked-away independent studio catalog to a massive live audience",
  ],
  whatToExpect: ["Guitar-Driven Sound", "Conversational Delivery"],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Cameron Whitcomb",
      slug: "cameron-whitcomb",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178712f78798ce31073c16673c8",
    },
    {
      name: "Elizabeth Nichols",
      slug: "elizabeth-nichols",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786a6686aacc775a0807c37cd8",
    },
    {
      name: "Calder Allen",
      slug: "calder-allen",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c4a45f0e840b74b85c5e87d9",
    },
    {
      name: "Nat Myers",
      slug: "nat-myers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782f32ced200ebf7a8f6047377",
    },
  ],
  tracks: [
    { name: "Arkansas", album: "Waylon Wyatt", duration: "" },
    { name: "Back To Alabama", album: "Waylon Wyatt", duration: "" },
    { name: "The Grass True", album: "The Grass True", duration: "" },
  ],
  about:
    "Waylon Wyatt is an Alabama-born country singer-songwriter whose brilliant combination of traditional roots, modern storytelling wit, and jaw-dropping vocal authority has sparked widespread critical acclaim across the independent scene. Forging a distinctively high-octane lyrical universe that dissects labor, ancestry, and romance, Wyatt commands the stage with the effortless confidence of a seasoned road warrior. Backed by highly celebrated independent single profiles, his early afternoon set provides a refreshing, beautifully raw antidote to standard festival pop noise.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Sunday",
    date: "Aug 2",
    startTime: "12:50 PM",
    endTime: "1:35 PM",
  },
};

const waterFromYourEyes: Artist = {
  name: "Water From Your Eyes",
  slug: "water-from-your-eyes",
  genres: ["Experimental Pop", "Indie Rock", "Post-Punk"],
  location: "Brooklyn, New York",
  tagline:
    "A terrifyingly brilliant, blistering collision of jagged art-punk guitars and dance loops.",
  socials: { spotify: "https://open.spotify.com/artist/6hYlNLoZJg74dVhA8FHIc0" },
  whySee: [
    "One of the absolute sharpest, most restlessly creative rock outfits of the modern underground executing an intense performance",
    "Rachel Brown's completely deadpan, acrobatic vocal deliveries shifting effortlessly underneath Nate Amos's brutal industrial noise foundations",
    "The official premier festival tour run showcasing the towering sonic weight of their highly celebrated Matador Records catalog",
    "A blistering, blindingly intense live landscape that completely transforms a traditional festival crowd into performance art theater",
  ],
  whatToExpect: [
    "Guitar-Driven Sound",
    "Bass & Groove",
    "Conversational Delivery",
    "Rhythm Complexity",
  ],
  bestFor: ["Sound Design & Production Nerds", "Lyric & Narrative Obsessives"],
  similarArtists: [
    {
      name: "Wet Leg",
      slug: "wet-leg",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a4e6cf8b3d6ea5a6b4b5fb8f",
    },
    {
      name: "Geese",
      slug: "geese",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bc9546a945c7563a9eb21f3d",
    },
    {
      name: "Wunderhorse",
      slug: "wunderhorse",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1780e05e549428cb38b2f3e7a60",
    },
    {
      name: "Villanelle",
      slug: "villanelle",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781ece1eae58afddb4d3238501",
    },
  ],
  tracks: [
    {
      spotifyId: "1kccKNibPNlyCVqhdg8NYE",
      name: "Barley",
      album: "Everyone's Crushed",
      duration: "3:29",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e023456a000dc303a94002cae6b",
    },
    { name: "True Love", album: "Everyone's Crushed", duration: "" },
    {
      spotifyId: "4oeqIfrxhWGVGKTabm8v6P",
      name: "When You're Around",
      album: "Structure",
      duration: "3:34",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0263263510b04abc943105c974",
    },
  ],
  about:
    "Water From Your Eyes is the Brooklyn-born avant-garde pop project consisting of Rachel Brown and Nate Amos, whose uncompromising fusion of gritty experimental techno infrastructure, post-punk poetry, and jagged noise guitars has sent shockwaves through the global scene. Drawing intense atmospheric parallels between dark warehouse rave culture and confrontational art rock showmanship, their critically adored concept records earned them multi-platinum institutional praise. Behind the instruments, their live environment strips away all pop pretense for an adrenaline-fueled industrial punk sermon.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Sunday",
    date: "Aug 2",
    startTime: "1:40 PM",
    endTime: "2:40 PM",
  },
};

const losRetros: Artist = {
  name: "Los Retros",
  slug: "los-retros",
  genres: ["Chicano Soul", "Indie Pop", "Lo-Fi Indie"],
  location: "Oxnard, California",
  tagline: "Sun-drenched, vintage-hued Chicano soul and hazy lo-fi bedroom pop melodies.",
  socials: { spotify: "https://open.spotify.com/artist/0qraFJK6boYSp4ZMMX4PzG" },
  whySee: [
    "Catch Maurilio Suarez's mesmerizing, vintage-hued alternative soul collective bringing pure backyard warmth to the evening",
    "Experience a lush collection of reflective, psychedelic ballads infused with gorgeous retro textures under the sun",
    "A beautifully intimate, atmospheric sonic oasis designed perfectly to completely escape standard commercial pop noise",
    "Hear the live execution of fresh, highly anticipated independent studio cuts making an exclusive festival debut",
  ],
  whatToExpect: ["Guitar-Driven Sound", "Live Band Performance"],
  bestFor: ["Sound Design & Production Nerds", "Bass & Groove Lovers"],
  similarArtists: [
    {
      name: "Empire of the Sun",
      slug: "empire-of-the-sun",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c806f3e714afa21861e20248",
    },
    {
      name: "Bixby",
      slug: "bixby",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f91b9382299af20b9130c80c",
    },
    {
      name: "The Neighbourhood",
      slug: "the-neighbourhood",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178df0b5ac84376a0a4b2166816",
    },
    {
      name: "Julia Wolf",
      slug: "julia-wolf",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178464afc83fc7ddaf9292bb9a8",
    },
  ],
  tracks: [
    { name: "Someone To Spend Time With", album: "Retrospect EP", duration: "" },
    { name: "Friends", album: "Everlasting EP", duration: "" },
    { name: "The Moon True", album: "The Moon True", duration: "" },
  ],
  about:
    "Maurilio Suarez, performing under the moniker Los Retros, is a Southern California-born singer, songwriter, and multi-instrumentalist who built an intensely passionate global community through his hyper-vivid, beautifully nostalgic brand of Chicano soul. Sourcing structural templates from late-60s vintage pop records and smooth alternative R&B rhythm sections, he crafts a laid-back, sun-drenched sonic universe with profound precision. Sourced into the esteemed Stones Throw Records roster, his live performance elevates raw bedroom vulnerability into an exceptionally stylish outdoor block party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Sunday",
    date: "Aug 2",
    startTime: "1:45 PM",
    endTime: "2:30 PM",
  },
};

const vandelux: Artist = {
  name: "Vandelux",
  slug: "vandelux",
  genres: ["Indie Electronica", "Deep House", "Synth-Pop"],
  location: "Vancouver, Canada",
  tagline: "Sleek, cinematic indie electronica and driving deep house built for the open air.",
  socials: { spotify: "https://open.spotify.com/artist/2rdSCmWgrIWA8pmwhS1T2k" },
  whySee: [
    "The absolute definition of modern electronic R&B polish making a high-visibility crossover statement under the Perry's tent",
    "A perfectly synchronized live-electronic set that balances deep, driving baseline grooves with incredibly infectious vocal hooks",
    "Experience a chic, hyper-stylized dance floor environment that translates European underground club ethos onto an enormous scale",
    "The ultimate high-energy afternoon catalyst designed perfectly to unify a massive, moving festival crowd under the sun",
  ],
  whatToExpect: ["Production Style Approach", "Synth & Atmospheric", "Intimate Performance"],
  bestFor: ["Dance Floor Seekers", "Bass & Groove Lovers"],
  similarArtists: [
    { name: "Jackie Hollander", slug: "jackie-hollander" },
    {
      name: "Duke Dumont",
      slug: "duke-dumont",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c0791f9c2d17dfd58e301c91",
    },
    {
      name: "Empire of the Sun",
      slug: "empire-of-the-sun",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c806f3e714afa21861e20248",
    },
    {
      name: "MUNA",
      slug: "muna",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a454d2d193b70d07b91a9345",
    },
  ],
  tracks: [
    { name: "Matter of Time", album: "Foreplay", duration: "" },
    { name: "All I Need", album: "Foreplay", duration: "" },
    { name: "To Love", album: "To Love", duration: "" },
  ],
  about:
    "Evan Higgins, performing under the singular moniker Vandelux, is a Canadian-born multi-instrumentalist, singer, and electronic engineer whose meticulous combination of sun-drenched deep house, sleek tech-house grooves, and high-fashion aesthetics has captured global dance floor attention. Breaking out of the independent streaming circuits before completely scaling his project into a major recording statement, he pairs timeless analog synthesizers with modern pop precision. Live, his project strips away unnecessary club pretension, delivering a beautifully crisp, high-tempo celebration of modern electronic design.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Sunday",
    date: "Aug 2",
    startTime: "2:45 PM",
    endTime: "3:45 PM",
  },
};

const newConstellations: Artist = {
  name: "New Constellations",
  slug: "new-constellations",
  genres: ["Dream Pop", "Indie Pop", "Electronic Rock"],
  location: "Portland, Oregon",
  tagline:
    "Shimmering, cosmic dream pop built on soaring vocal lines and rich psychedelic grooves.",
  socials: { spotify: "https://open.spotify.com/artist/5WF5jtgP0H31QTl5g4WxW9" },
  whySee: [
    "Catch an exceptional songwriting collective executing a beautifully warm, sun-drenched indie pop performance on the BMI stage",
    "Perfectly synchronized, warm vocal harmonies gliding effortlessly over heavy, chorus-heavy dream pop guitar lines",
    "A gorgeous, sun-drenched early afternoon oasis designed perfectly to completely escape standard commercial pop noise",
    "The official festival tour run highlighting their highly celebrated independent studio catalog to a massive live audience",
  ],
  whatToExpect: ["Dreamy Atmosphere", "Conversational Delivery", "Crowd Atmosphere"],
  bestFor: ["Tent & Club Venue Seekers", "Dance Floor Seekers", "Bass & Groove Lovers"],
  similarArtists: [
    { name: "Sunshine", slug: "sunshine" },
    {
      name: "Suki Waterhouse",
      slug: "suki-waterhouse",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781696da72cfcb968be92b84d4",
    },
    {
      name: "The xx",
      slug: "the-xx",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783a96db4736ef035e1fcb2516",
    },
    {
      name: "Lorde",
      slug: "lorde",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178678a3a4bc2d8a84074f22c71",
    },
  ],
  tracks: [
    { name: "Hot Days", album: "New Constellations", duration: "" },
    { name: "Caught in the Rain", album: "New Constellations", duration: "" },
    { name: "Fade", album: "Fade", duration: "" },
  ],
  about:
    "New Constellations is the Portland-born alternative project whose meticulous combination of hazy indie rock guitar hooks, crisp hip-hop rhythm pockets, and carefree lyricism has fostered a deeply dedicated independent community. Forging a distinctively laid-back, sun-drenched sonic universe, the outfit crafts tracks that feel simultaneously nostalgic and deeply current. Performing a prime midday slot, their live execution transforms the tree-lined perimeter of Grant Park into a vibrant, high-energy outdoor block party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Sunday",
    date: "Aug 2",
    startTime: "12:00 PM",
    endTime: "12:40 PM",
  },
};

const cruzBeckhamAndTheBreakers: Artist = {
  name: "Cruz Beckham and the Breakers",
  slug: "cruz-beckham-and-the-breakers",
  genres: ["Alternative Rock", "Indie Rock", "Garage Rock"],
  location: "London, England",
  tagline: "Scrappy, distortion-soaked garage rock revivalism with a classic British edge.",
  socials: {},
  whySee: [
    "A high-visibility festival debut capturing one of rock's most talked-about new frontmen breaking into the live circuit",
    "Blistering, fast-paced dual-guitar riffs that completely bypass overprocessed electronic backing tracks for raw analog grit",
    "Experience a reckless, youth-driven energy that channels the timeless guitar audacities of early 2000s indie rock",
    "An absolute lightning-strike afternoon catalyst built around melodic distortion and raw, unadulterated power-trio chemistry",
  ],
  whatToExpect: ["Guitar-Driven Sound", "Energetic Mosh Pits", "Ensemble Format"],
  bestFor: ["Early Afternoon Discovery"],
  similarArtists: [
    { name: "Whatmore", slug: "whatmore" },
    {
      name: "Finn Wolfhard",
      slug: "finn-wolfhard",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178926418bb71d5a111e6fbb9eb",
    },
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
  ],
  tracks: [
    { name: "The Breakers", album: "The Breakers", duration: "" },
    { name: "Running", album: "Running", duration: "" },
    { name: "Chamber", album: "Chamber", duration: "" },
  ],
  about:
    "Cruz Beckham and the Breakers is the London-born alternative rock outfit spearheaded by Cruz Beckham, who stepped away from a prominent family spotlight to forge a fiercely authentic path in the independent guitar underground. Fusing the gritty textures of classic 90s grunge with the fast-paced, melodic hooks of early 2000s British garage rock, the group writes raw tales of adolescent chaos and interpersonal grit. Commanding the stage with absolute analog focus, their late afternoon live set transforms sprawling mainstage fields into high-energy, therapeutic guitar singalongs.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Bud Light",
    day: "Sunday",
    date: "Aug 2",
    startTime: "1:45 PM",
    endTime: "2:30 PM",
  },
};

const theBends: Artist = {
  name: "The Bends",
  slug: "the-bends",
  genres: ["Post-Punk", "Shoegaze", "Alternative Rock"],
  location: "Chicago, Illinois",
  tagline: "A fuzzed-out hometown alternative rock engine built on towering shoegaze walls.",
  socials: {},
  whySee: [
    "A massive, highly anticipated hometown showcase performance on the alternative stage celebrating a rapid local scene ascent",
    "Experience a blistering display of dual-guitar distortion, heavy post-punk tempos, and raw, confrontational vocal delivery",
    "An intense live rock performance that completely bypasses processed backing tracks for pure analog adrenaline",
    "The absolute perfect early afternoon catalyst designed to leave rock traditionalists completely floored by the talent",
  ],
  whatToExpect: ["Guitar-Driven Sound", "Energetic Mosh Pits"],
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
      name: "The Smashing Pumpkins",
      slug: "smashing-pumpkins",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782897dd777bbd8e3f23e49c99",
    },
    {
      name: "High Vis",
      slug: "high-vis",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782c3b07616f77f8bca1ab8179",
    },
  ],
  tracks: [
    { name: "Static", album: "The Bends", duration: "" },
    { name: "Fallen", album: "The Bends", duration: "" },
    { name: "Chamber", album: "Chamber", duration: "" },
  ],
  about:
    "The Bends is the Chicago-born alternative rock quartet whose meticulous combination of fuzzed-out garage indie grit, driving rhythms, and emotionally honest lyricism has earned them a reputation as one of the city's most essential live rock vanguards. Writing sweeping tales of industrial midwestern isolation, identity, and personal history, the group relies entirely on raw analog band energy. Coming off a series of highly discussed local support slots, their early afternoon performance brings an absolute guitar clinic to Grant Park.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Sunday",
    date: "Aug 2",
    startTime: "12:50 PM",
    endTime: "1:30 PM",
  },
};

const after: Artist = {
  name: "After",
  slug: "after",
  genres: ["Alternative Hip-Hop", "Trap", "Electronic Pop"],
  location: "Chicago, Illinois",
  tagline:
    "Glitchy, high-velocity internet rap and bounce-driven trap from a hometown breakout project.",
  socials: {},
  whySee: [
    "A massive hometown showcase performance on the alternative stage celebrating a rapid ascent in the local independent scene",
    "Experience an intense, rapid-fire vocal workout gliding effortlessly over incredibly crisp, low-slung alternative electronic bass pockets",
    "An absolute wildfire crowd environment packed with chaotic, high-energy teenage mosh pits early in the day",
    "Catch a lightning-fast underground trendsetter running on pure digital clout before they completely alter pop infrastructure",
  ],
  whatToExpect: ["Cinematic Visuals", "Energetic Mosh Pits", "Synth & Atmospheric"],
  bestFor: ["Scene Trend Spotters", "Hometown & Local Supporters", "Dance Floor Seekers"],
  similarArtists: [
    {
      name: "partyof2",
      slug: "partyof2",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b9dbe3484f4e59e7b0e18b7a",
    },
    {
      name: "Fakemink",
      slug: "fakemink",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fea7ad1b3bc4a7f94234bd1c",
    },
    {
      name: "Ivri",
      slug: "ivri",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178db6265ab7c2b7e2a156c99ae",
    },
    { name: "KLO", slug: "klo" },
  ],
  tracks: [
    { name: "After", album: "After", duration: "" },
    { name: "Static", album: "After", duration: "" },
    { name: "Fade", album: "Fade", duration: "" },
  ],
  about:
    "After is a Chicago-born alternative hip-hop producer, singer, and songwriter who rapidly vaulted from Soundcloud isolation into local independent prominence, commanding an intensely passionate regional community. Characterized by a unique choice of hazy, loop-heavy underground production and unstructured, stream-of-consciousness flows, the project embodies the post-rage aesthetic of modern youth culture. Performing a prime midday slot, the live execution completely flips traditional festival pacing for pure, energetic crowd chaos.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Sunday",
    date: "Aug 2",
    startTime: "1:55 PM",
    endTime: "2:35 PM",
  },
};

const whatmore: Artist = {
  name: "Whatmore",
  slug: "whatmore",
  genres: ["Alternative Rock", "Folk Rock", "Indie Rock"],
  location: "Chicago, Illinois",
  tagline:
    "Hometown indie-rock anthems fusing driving alternative grit with timeless folk-rock storytelling.",
  socials: {},
  whySee: [
    "A massive, highly anticipated hometown showcase performance on the alternative stage celebrating a rapid local ascent",
    "Experience a brilliant, traditional analog band chemistry that treats giant festival fields like intimate local clubs",
    "A loose, remarkably fun and high-energy live performance built specifically to celebrate carefree youth culture",
    "The absolute perfect midday catalyst designed to unify a massive, supportive hometown crowd under the sun",
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
    {
      name: "The Braymores",
      slug: "the-braymores",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178e72ca0c70ab4f5bb3da261dc",
    },
    {
      name: "Mother Mother",
      slug: "mother-mother",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fdfbc01d2597633aae65f6b7",
    },
  ],
  tracks: [
    { name: "Whatmore", album: "Whatmore", duration: "" },
    { name: "Under the Skyline", album: "Whatmore", duration: "" },
    { name: "Closer Now", album: "Closer Now", duration: "" },
  ],
  about:
    "Whatmore are the Chicago-born alternative rock collective whose meticulous combination of fuzzed-out garage indie rock grit, driving rhythms, and carefree storytelling has fostered a deeply dedicated regional community. Forging a distinctively laid-back, sun-drenched sonic universe, the outfit crafts tracks that track personal history, identity, and midwestern isolation. Performing a prime midday slot on the alternative stage, their live execution transforms the sprawling perimeter of Grant Park into a vibrant outdoor block party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Sunday",
    date: "Aug 2",
    startTime: "12:00 PM",
    endTime: "12:35 PM",
  },
};

const porchLight: Artist = {
  name: "Porch Light",
  slug: "porch-light",
  genres: ["Indie Pop", "Singer-Songwriter", "Chamber Pop"],
  location: "Los Angeles, California",
  tagline: "Witty, wordy stream-of-consciousness pop music that plays out like real voice memos.",
  socials: {},
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
      name: "Whitney Whitney",
      slug: "whitney-whitney",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b9b32a1845c72390fc48c28c",
    },
    {
      name: "Ella Boh",
      slug: "ella-boh",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f3ca12f1b323dbb7027d78dc",
    },
    { name: "Stella Lefty", slug: "stella-lefty" },
    {
      name: "Next of Kin",
      slug: "next-of-kin",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178cbe19203158c6eae4ed0504a",
    },
  ],
  tracks: [
    { name: "Voice Memos", album: "Porch Light", duration: "" },
    { name: "Overthinking", album: "Porch Light", duration: "" },
    { name: "Seventeen", album: "Seventeen", duration: "" },
  ],
  about:
    "Porch Light is a Los Angeles-based singer-songwriter who built an intensely passionate internet community through a hyper-specific, beautifully conversational brand of contemporary indie pop. Rooted in the emotional intimacy of bedroom pop recordings but elevated by bright, modern pop production, rich chamber strings, and witty lyrical choices, the tracks explore young adulthood with profound precision. Handpicked for an extensive global tour cycle, the early afternoon live execution transforms the tree-lined perimeter of Grant Park into a vibrant outdoor listening party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Sunday",
    date: "Aug 2",
    startTime: "1:05 PM",
    endTime: "1:45 PM",
  },
};

const easyHoney: Artist = {
  name: "Easy Honey",
  slug: "easy-honey",
  genres: ["Indie Rock", "Surf Rock", "Neo-Psychedelia"],
  location: "Charleston, South Carolina",
  tagline: "Sun-drenched, witty surf rock and fuzzed-out psych grooves built for festival fields.",
  socials: {},
  whySee: [
    "A perfectly curated afternoon vibe catalyst bringing their hyper-catchy brand of surf rock distortion straight to the BMI stage",
    "Experience an exceptional dual-guitar workout, low-slung bass rhythm pockets, and flawless analog band chemistry",
    "A loose, remarkably fun and high-energy live performance built specifically to celebrate carefree youth culture under the sun",
    "The ultimate high-visibility afternoon groove engine designed to get large groups of friends dancing together",
  ],
  whatToExpect: ["Dreamy Atmosphere", "Guitar-Driven Sound", "Afternoon Vibes"],
  bestFor: ["Bass & Groove Lovers"],
  similarArtists: [
    { name: "Surfing for Daisy", slug: "surfing-for-daisy" },
    {
      name: "Marlon Funaki",
      slug: "marlon-funaki",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178712c7cd98ae745930f1e86a6",
    },
    {
      name: "Spacey Jane",
      slug: "spacey-jane",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f5864abfed7a8d4b9334a7a0",
    },
    {
      name: "The Army, The Navy",
      slug: "the-army-the-navy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a80252ae3d399fc49014502d",
    },
  ],
  tracks: [
    { name: "Steady", album: "Peach State", duration: "" },
    { name: "Spells", album: "Peach State", duration: "" },
    { name: "Gotta Tree", album: "Gotta Tree", duration: "" },
  ],
  about:
    "Easy Honey is the Charleston-based alternative rock outfit whose meticulous combination of hazy surf rock guitar hooks, crisp indie grooves, and carefree songwriting has earned them a fiercely loyal independent community. Drawing sharp atmospheric blueprints from nostalgic garage indie and low-slung neo-psychedelia, the group crafts tracks that feel simultaneously introspective and entirely danceable. Backed by an exceptionally tight live performance history, their early afternoon set transforms a sprawling festival lawn into a vibrant outdoor block party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Sunday",
    date: "Aug 2",
    startTime: "2:10 PM",
    endTime: "2:50 PM",
  },
};
const jackieHollander: Artist = {
  name: "Jackie Hollander",
  slug: "jackie-hollander",
  genres: ["Tech House", "Deep House", "Electronic"],
  location: "San Francisco, California",
  tagline: "Sleek, low-slung deep tech house grooves packed with heavy underground attitude.",
  socials: {},
  whySee: [
    "Catch one of the electronic underground's most fiercely watched tech-house selectors commanding a prime mid-afternoon tent session",
    "An elite display of rolling sub-bass steps, crisp percussion accents, and flawlessly mixed independent club tracks",
    "Experience a dark, hyper-stylized dancefloor environment that brings a distinct West Coast warehouse energy to the park",
    "The absolute perfect afternoon groove engine designed specifically to get thousands of people moving early under the tent",
  ],
  whatToExpect: ["Bass & Groove", "Afternoon Vibes", "High-Energy Pacing"],
  bestFor: ["Bass & Groove Lovers"],
  similarArtists: [
    {
      name: "SIDEPIECE",
      slug: "sidepiece",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17821705221c7f192d4a7963910",
    },
    {
      name: "Max Styler",
      slug: "max-styler",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178ded53da461b13994a9ef8347",
    },
    {
      name: "INJI",
      slug: "inji",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bb9b2f1ed4018b6bd506516b",
    },
    {
      name: "AYYBO",
      slug: "ayybo",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f8c3472c2555b482981daecf",
    },
  ],
  tracks: [
    { name: "Resist", album: "Resist", duration: "" },
    { name: "Distortion", album: "Distortion", duration: "" },
    { name: "Control", album: "Control", duration: "" },
  ],
  about:
    "Jackie Hollander is a San Francisco-born producer and DJ whose meticulous blend of moody tech-house infrastructure, deep bass rollers, and hypnotic electronic loops has captured intense dancefloor focus worldwide. Originally breaking out of the Northern California underground rave circuits, she has spent the modern era carving out a lane that values raw analog swing over commercial EDM clichés. Backed by a relentless touring calendar and heavy support from global dance titans, her live performance delivers a beautifully polished, high-velocity lesson in modern club mechanics.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Sunday",
    date: "Aug 2",
    startTime: "12:00 PM",
    endTime: "12:45 PM",
  },
};
const stellaLefty: Artist = {
  name: "Stella Lefty",
  slug: "stella-lefty",
  genres: ["Indie Pop", "Singer-Songwriter", "Chamber Pop"],
  location: "Los Angeles, California",
  tagline: "Witty, wordy stream-of-consciousness pop music that plays out like real voice memos.",
  socials: {},
  whySee: [
    "Catch an exceptional independent pop writer executing a beautifully warm, storyteller performance on the alternative stage",
    "Razor-sharp lyricism that lands like an intense, unguarded diary entry tracking the complex textures of youth and romance",
    "A stunning afternoon oasis that pairs delicate, close-mic'd vocal patterns with unexpectedly catchy acoustic and electronic hooks",
    "The official premier festival tour run showcasing her highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: ["Lyrical Storytelling", "Conversational Delivery", "Crowd Atmosphere"],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery"],
  similarArtists: [
    { name: "Porch Light", slug: "porch-light" },
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
    {
      name: "Next of Kin",
      slug: "next-of-kin",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178cbe19203158c6eae4ed0504a",
    },
  ],
  tracks: [
    { name: "Voice Memos", album: "Stella Lefty", duration: "" },
    { name: "Overthinking", album: "Stella Lefty", duration: "" },
    { name: "Seventeen", album: "Seventeen", duration: "" },
  ],
  about:
    "Stella Lefty is a Los Angeles-based singer-songwriter who built an intensely passionate internet community through a hyper-specific, beautifully conversational brand of contemporary indie pop. Rooted in the emotional intimacy of bedroom pop recordings but elevated by bright, modern pop production, rich chamber strings, and witty lyrical choices, the tracks explore young adulthood with profound precision. Handpicked for an extensive global tour cycle, the early afternoon live execution transforms the tree-lined perimeter of Grant Park into a vibrant outdoor listening party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Sunday",
    date: "Aug 2",
    startTime: "3:20 PM",
    endTime: "4:00 PM",
  },
};

const justineSkye: Artist = {
  name: "Justine Skye",
  slug: "justine-skye",
  genres: ["R&B", "Pop", "Soul"],
  location: "Brooklyn, New York",
  tagline: "Sleek, high-gloss contemporary R&B driven by multi-platinum vocal confidence.",
  socials: {},
  whySee: [
    "A world-class pop and R&B stylist bringing an exceptionally polished, high-visibility vocal showcase to the mainstage",
    "Experience a massive, stadium-scale performance packed with deep, low-slung electronic baseline grooves and glittering hooks",
    "Justine Skye's phenomenal, soaring multi-octave vocal range executed flawlessly through complex live arrangements",
    "An absolute evening crowd catalyst designed purely to get massive groups of fans dancing together under the sunset",
  ],
  whatToExpect: ["Bass & Groove", "Cinematic Visuals"],
  bestFor: ["Dance Floor Seekers"],
  similarArtists: [
    {
      name: "Jade",
      slug: "jade",
      imageUrl: "https://i.scdn.co/image/a0e0fd64fd74b658761ea717e2126b1bad974f4a",
    },
    {
      name: "Jae Stephens",
      slug: "jae-stephens",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17886987e340bcff4b2debb3e84",
    },
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
  ],
  tracks: [
    { name: "Collide", album: "Bare With Me", duration: "" },
    { name: "Build", album: "Bare With Me", duration: "" },
    { name: "In My Bag", album: "Space & Time", duration: "" },
  ],
  about:
    "Justine Skye is a Brooklyn-born global pop-R&B powerhouse whose sharp combination of multi-platinum vocal authority, trendsetting fashion style, and commanding stage presence has earned her massive international acclaim. Breaking onto charts as an independent internet phenom before collaborating with the genre's top production elite, she has spent over a decade refining a sound that bridges timeless soul structures with contemporary electronic club syncopation. Backed by an exceptionally polished live band, her late afternoon mainstage slot provides an undeniable clinic in world-class pop showmanship.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "T-Mobile",
    day: "Sunday",
    date: "Aug 2",
    startTime: "5:30 PM",
    endTime: "6:30 PM",
  },
};

const willSwinton: Artist = {
  name: "Will Swinton",
  slug: "will-swinton",
  genres: ["Indie Pop", "Singer-Songwriter", "Alternative Folk"],
  location: "Auckland, New Zealand",
  tagline:
    "Gravel-voiced, cinematic indie pop tracking the raw, intimate vulnerabilities of youth.",
  socials: {},
  whySee: [
    "Catch an exceptional international songwriting talent making a highly anticipated debut on the American festival circuit",
    "Swinton's distinctly raspy, gravel-voiced vocal delivery wrapping seamlessly around rich, close-mic'd acoustic arrangements",
    "Experience deeply honest, confessional lyricism that tracks the complex, messy textures of modern romance with profound wit",
    "A beautifully warm, sun-drenched early afternoon oasis designed perfectly to completely escape standard commercial pop noise",
  ],
  whatToExpect: ["Conversational Delivery", "Dreamy Atmosphere"],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery"],
  similarArtists: [
    {
      name: "Audrey Hobert",
      slug: "audrey-hobert",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1784fc78e354b19324810f1e933",
    },
    { name: "Stella Lefty", slug: "stella-lefty" },
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
    { name: "Wasted On You", album: "Will Swinton", duration: "" },
    { name: "Leave Me Dead", album: "Will Swinton", duration: "" },
    { name: "Better Days", album: "Better Days", duration: "" },
  ],
  about:
    "Will Swinton is a New Zealand-born singer-songwriter whose brilliant combination of nostalgic indie pop, breezy acoustic folk, and an intensely raw vocal rasp has garnered a deeply passionate international community. Writing with the specific narrative precision of a classic bedroom diary, he explores the vulnerabilities of youth, modern isolation, and heartbreak with profound emotional honesty. Handpicked for massive global breakout tour blocks, his early afternoon performance transforms a sprawling festival lawn into an intimate, shared backyard listening session.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Sunday",
    date: "Aug 2",
    startTime: "1:00 PM",
    endTime: "1:40 PM",
  },
};

const sunshine: Artist = {
  name: "Sunshine",
  slug: "sunshine",
  genres: ["Indie Pop", "Dream Pop", "Electronic Rock"],
  location: "Los Angeles, California",
  tagline:
    "Shimmering, cosmic dream pop built on soaring vocal lines and rich psychedelic grooves.",
  socials: {},
  whySee: [
    "Catch an exceptional songwriting collective executing a beautifully warm, sun-drenched indie pop performance on the BMI stage",
    "Perfectly synchronized, warm vocal harmonies gliding effortlessly over heavy, chorus-heavy dream pop guitar lines",
    "A gorgeous, sun-drenched early afternoon oasis designed perfectly to completely escape standard commercial pop noise",
    "The official festival tour run highlighting their highly celebrated independent studio catalog to a massive live audience",
  ],
  whatToExpect: ["Dreamy Atmosphere", "Conversational Delivery", "Crowd Atmosphere"],
  bestFor: ["Lyric & Narrative Obsessives", "Early Afternoon Discovery", "Chill Summer Vibes"],
  similarArtists: [
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
      name: "The xx",
      slug: "the-xx",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783a96db4736ef035e1fcb2516",
    },
    { name: "Will Swinton", slug: "will-swinton" },
  ],
  tracks: [
    { name: "Hot Days", album: "Sunshine", duration: "" },
    { name: "Caught in the Rain", album: "Sunshine", duration: "" },
    { name: "Fade", album: "Fade", duration: "" },
  ],
  about:
    "Sunshine is the Los Angeles-born alternative project whose meticulous combination of hazy indie rock guitar hooks, crisp hip-hop rhythm pockets, and carefree lyricism has fostered a deeply dedicated independent community. Forging a distinctively laid-back, sun-drenched sonic universe, the outfit crafts tracks that feel simultaneously nostalgic and deeply current. Performing a prime midday slot, their live execution transforms the tree-lined perimeter of Grant Park into a vibrant, high-energy outdoor block party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Sunday",
    date: "Aug 2",
    startTime: "12:00 PM",
    endTime: "12:40 PM",
  },
};

const caseOats: Artist = {
  name: "Case Oats",
  slug: "case-oats",
  genres: ["Alternative Rock", "Folk Rock", "Indie Rock"],
  location: "Chicago, Illinois",
  tagline:
    "Hometown indie-rock anthems fusing driving alternative grit with timeless folk-rock storytelling.",
  socials: {},
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
    {
      name: "The Creekers",
      slug: "the-creekers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783bd55f87a9e1be1eb5b1c1e1",
    },
    {
      name: "Day We Ran",
      slug: "day-we-ran",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17896aa0ad1b8badab28252f80b",
    },
  ],
  tracks: [
    { name: "Oats", album: "Case Oats", duration: "" },
    { name: "Under the Skyline", album: "Case Oats", duration: "" },
    { name: "Closer Now", album: "Closer Now", duration: "" },
  ],
  about:
    "Case Oats are the Chicago-born alternative rock collective whose meticulous combination of fuzzed-out garage indie rock grit, driving rhythms, and carefree storytelling has fostered a deeply dedicated regional community. Forging a distinctively laid-back, sun-drenched sonic universe, the outfit crafts tracks that track personal history, identity, and midwestern isolation. Performing a prime midday slot on the alternative stage, their live execution transforms the sprawling perimeter of Grant Park into a vibrant outdoor block party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Sunday",
    date: "Aug 2",
    startTime: "12:00 PM",
    endTime: "12:35 PM",
  },
};

const surfingForDaisy: Artist = {
  name: "Surfing for Daisy",
  slug: "surfing-for-daisy",
  genres: ["Indie Rock", "Surf Rock", "Neo-Psychedelia"],
  location: "Charleston, South Carolina",
  tagline: "Sun-drenched, witty surf rock and fuzzed-out psych grooves built for festival fields.",
  socials: {},
  whySee: [
    "A perfectly curated afternoon vibe catalyst bringing their hyper-catchy brand of surf rock distortion straight to the BMI stage",
    "Experience an exceptional dual-guitar workout, low-slung bass rhythm pockets, and flawless analog band chemistry",
    "A loose, remarkably fun and high-energy live performance built specifically to celebrate carefree youth culture under the sun",
    "The ultimate high-visibility afternoon groove engine designed to get large groups of friends dancing together",
  ],
  whatToExpect: ["Dreamy Atmosphere", "Guitar-Driven Sound", "Afternoon Vibes"],
  bestFor: ["Groups & Social Experience", "Bass & Groove Lovers"],
  similarArtists: [
    { name: "Easy Honey", slug: "easy-honey" },
    {
      name: "Spacey Jane",
      slug: "spacey-jane",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f5864abfed7a8d4b9334a7a0",
    },
    {
      name: "Marlon Funaki",
      slug: "marlon-funaki",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178712c7cd98ae745930f1e86a6",
    },
    {
      name: "Love Spells",
      slug: "love-spells",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b33be717b74e15b9f5c235f2",
    },
  ],
  tracks: [
    { name: "Steady", album: "Peach State", duration: "" },
    { name: "Spells", album: "Peach State", duration: "" },
    { name: "Gotta Tree", album: "Gotta Tree", duration: "" },
  ],
  about:
    "Surfing for Daisy is the alternative rock outfit whose meticulous combination of hazy surf rock guitar hooks, crisp indie grooves, and carefree songwriting has earned them a fiercely loyal independent community. Drawing sharp atmospheric blueprints from nostalgic garage indie and low-slung neo-psychedelia, the group crafts tracks that feel simultaneously introspective and entirely danceable. Backed by an exceptionally tight live performance history, their early afternoon set transforms a sprawling festival lawn into a vibrant outdoor block party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Sunday",
    date: "Aug 2",
    startTime: "2:10 PM",
    endTime: "2:50 PM",
  },
};
const snacktime: Artist = {
  name: "SNACKTIME",
  slug: "snacktime",
  genres: ["Funk", "Brass Band", "Soul"],
  location: "Philadelphia, Pennsylvania",
  tagline: "High-octane, intense brass-heavy funk and soul built purely for outdoor block parties.",
  socials: {},
  whySee: [
    "The absolute ultimate raw live wildcard of the afternoon lineup, delivering an unadulterated brass-heavy funk explosion",
    "An exceptional multi-instrumental ensemble executing hyper-precise syncopated rhythms and soaring horn lines completely live",
    "Experience a loose, remarkably celebratory and high-energy party atmosphere built specifically to get crowds dancing wildly",
    "A premier midday crowd catalyst deployed on the Tito's stage designed to turn open fields into high-tempo block parties",
  ],
  whatToExpect: ["Live Band Performance", "Melodic Vocal Hooks", "Dance Floor Energy"],
  bestFor: ["Dance Floor Seekers", "Bass & Groove Lovers"],
  similarArtists: [
    {
      name: "Khamari",
      slug: "khamari",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786921bdf2ddc6e84970fd172e",
    },
    {
      name: "Sienna Spiro",
      slug: "sienna-spiro",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fb0ab819bbd4502028cd1feb",
    },
    {
      name: "Olivia Dean",
      slug: "olivia-dean",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1785c7577ad44daeb7ce4b941a1",
    },
    {
      name: "Destin Conrad",
      slug: "destin-conrad",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786be69fc54978eb83fa10167c",
    },
  ],
  tracks: [
    { name: "Eat That Snack", album: "SNACKTIME", duration: "" },
    { name: "Gumbo", album: "SNACKTIME", duration: "" },
    { name: "Together", album: "Together", duration: "" },
  ],
  about:
    "SNACKTIME is the Philadelphia-born brass-heavy funk and soul collective whose meticulous combination of raw street performance energy, syncopated rhythm loops, and multi-instrumental showmanship has earned them widespread critical acclaim across the festival circuit.pairs flawless, conservatory-grade brass precision with an intensely innovative approach that completely strips away commercial pop backing tracks. Forging an exceptionally high-tempo, celebratory soundscape built entirely around collective crowd movement, their live midday execution transforms Grant Park into an unmissable outdoor celebration.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Sunday",
    date: "Aug 2",
    startTime: "1:00 PM",
    endTime: "1:45 PM",
  },
};
const zackMartino: Artist = {
  name: "Zack Martino",
  slug: "zack-martino",
  genres: ["Melodic House", "Dance Pop", "Electronic"],
  location: "New York City, New York",
  tagline: "Sleek, high-gloss electronic dance pop and euphoric, stadium-scale house anthems.",
  socials: {},
  whySee: [
    "A premier high-visibility afternoon tent session highlighting one of the electronic circuit's finest crossover selectors",
    "An exceptionally polished live blend of soaring melodic house structures, multi-platinum radio hooks, and pristine drops",
    "Experience a wildfire crowd environment packed with carefree, high-energy dance floors under the Perry's tent",
    "The absolute perfect early-day adrenaline booster designed to get large groups of friends moving together under the sun",
  ],
  whatToExpect: ["Synth & Atmospheric", "High-Energy Pacing"],
  bestFor: ["Dance Floor Seekers", "Groups & Social Experience", "Tent & Club Venue Seekers"],
  similarArtists: [
    {
      name: "MC4D",
      slug: "mc4d",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178042776271fc2c09e905c93e6",
    },
    {
      name: "Major Lazer",
      slug: "major-lazer",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178ab312009266614f4d3185229",
    },
    {
      name: "aespa",
      slug: "aespa",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178053bbb910dda6d4ab0618b8b",
    },
    {
      name: "Disco Lines",
      slug: "disco-lines",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178965c9bf81cfe9ca329b8a5c7",
    },
  ],
  tracks: [
    { name: "Hold On To Me", album: "Hold On To Me", duration: "" },
    { name: "Craving", album: "Craving", duration: "" },
    { name: "Do Type", album: "Do Type", duration: "" },
  ],
  about:
    "Zack Martino is a New York-born electronic producer and DJ whose sharp combination of multi-platinum melodic house infrastructure, high-gloss dance-pop hooks, and pristine vocal layerings has earned him billions of streams globally. Dominating streaming networks through an exceptionally polished production skill set, he crafts a hyper-kinetic soundscape built entirely around heavy groove loops. Commandeering an early afternoon slot under the iconic Perry's stage, his performance delivers a technical, high-production masterclass in pure, celebratory dance music.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Sunday",
    date: "Aug 2",
    startTime: "12:55 PM",
    endTime: "1:40 PM",
  },
};

export const sundayArtists: Artist[] = [
  tateMcRae,
  theXx,
  turnstile,
  beabadoobee,
  aespa,
  theChainsmokers,
  muna,
  hotMulligan,
  yoasobi,
  ado,
  jade,
  eliBrown,
  dukeDumont,
  fakemink,
  dombresky,
  monaleo,
  adela,
  riordan,
  wunderhorse,
  amberMark,
  westend,
  destinConrad,
  inji,
  waylonWyatt,
  waterFromYourEyes,
  losRetros,
  vandelux,
  newConstellations,
  cruzBeckhamAndTheBreakers,
  theBends,
  after,
  whatmore,
  porchLight,
  easyHoney,
  jackieHollander,
  stellaLefty,
  justineSkye,
  willSwinton,
  sunshine,
  caseOats,
  surfingForDaisy,
  snacktime,
  zackMartino,
];
