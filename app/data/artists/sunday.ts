// Storage only — do not import this file directly in product code.
// To filter by day, import allArtists from index.ts and filter by appearance.day === "Sunday".
import type { Artist } from "@/app/types/artist";

const tateMcRae: Artist = {
  name: "Tate McRae",
  slug: "tate-mcrae",
  mbid: "f9133869-f87c-459c-9aa7-2f176cda7e06",
  imageUrl: "/artists/heroes/tate-mcrae.avif",
  objectPosition: "center 20%",
  genres: ["Pop", "Dance Pop", "Electropop"],
  origin: "Calgary, Canada",
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
  whatToExpect: [
    "High-energy dance pop",
    "Stunning choreography",
    "Live vocals through full choreography — no safety net",
    "Massive crowd singalongs",
    "Polished production",
  ],
  bestFor: [
    "Pop fans",
    "Dance lovers",
    "Anyone who needs to feel something",
    "Fans of precision performance",
  ],
  similarArtists: [
    { name: "SB19" },
    { name: "aespa" },
    { name: "Zara Larsson" },
    { name: "Charli XCX" },
  ],
  tracks: [
    {
      name: "greedy",
      album: "THINK LATER.",
      duration: "2:11",
      artworkUrl: "/albums/tate-mcrae/think-later.png",
    },
    {
      name: "Sports car",
      album: "So Close To What",
      duration: "2:37",
      artworkUrl: "/albums/tate-mcrae/think-later.png",
    },
    {
      name: "Revolving door",
      album: "So Close To What",
      duration: "3:06",
      artworkUrl: "/albums/tate-mcrae/all-the-things-i-never-said.jpg",
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
  genres: ["Indie Pop", "Dream Pop", "Electronic"],
  origin: "London, England",
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
    "Intimate and atmospheric",
    "Dramatic lighting",
    "Deeply emotional crowd",
    "Sparse, gorgeous arrangements",
    "Headliner scale with chamber music feeling",
  ],
  bestFor: [
    "Indie music lovers",
    "Late-night reflective crowd",
    "Atmospheric music fans",
    "Anyone who needs to feel things quietly",
  ],
  similarArtists: [
    { name: "Empire of the Sun" },
    { name: "New Constellations" },
    { name: "Sunshine" },
    { name: "YOASOBI" },
  ],
  tracks: [
    { name: "Intro", album: "xx", duration: "2:07", artworkUrl: "/albums/the-xx/xx.jpg" },
    { name: "Crystalised", album: "xx", duration: "3:31", artworkUrl: "/albums/the-xx/xx.jpg" },
    {
      name: "On Hold",
      album: "I See You",
      duration: "3:40",
      artworkUrl: "/albums/the-xx/i-see-you.jpg",
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
  origin: "Baltimore, Maryland",
  tagline: "Explosive, groove-laden alternative hardcore that redefines modern rock energy.",
  socials: {},
  whySee: [
    "A legendary live unit executing a masterclass in relentless rhythm, boundary-pushing punk grooves, and unmatched mainstage command",
    "Brendan Yates' hyper-kinetic, magnetic stage presence driving tens of thousands into massive, park-wide mosh pits",
    "Experience the raw, community-driven catharsis of tracks from Glow On, where heavy riffs meet dream-pop textures seamlessly",
    "The absolute pinnacle of contemporary heavy music crossing over into an essential, unifying festival experience",
  ],
  whatToExpect: [
    "Hyper-kinetic stage acrobatics",
    "Explosive main-field mosh pits",
    "Massive melodic punk singalongs",
    "Relentless groove-driven rock tempos",
  ],
  bestFor: [
    "Hardcore punk traditionalists",
    "Alternative rock enthusiasts",
    "Mosh pit veterans",
    "High-visibility mainstage crowds",
    "Adrenaline-fueled music seekers",
  ],
  similarArtists: [
    { name: "54 Ultra" },
    { name: "Ink" },
    { name: "Penelope Road" },
    { name: "The Smashing Pumpkins" },
  ],
  tracks: [
    { name: "BLACKOUT", album: "GLOW ON", duration: "" },
    { name: "MYSTERY", album: "GLOW ON", duration: "" },
    { name: "HOLIDAY", album: "GLOW ON", duration: "" },
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
  origin: "London, England",
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
    "Intimate and emotional",
    "Guitar-driven set",
    "Heartfelt singalongs",
    "Smaller crowd",
    "Afternoon chill",
  ],
  bestFor: [
    "Indie music fans",
    "Discovering new artists",
    "Guitar pop lovers",
    "Emotional catharsis",
    "Quiet afternoon crowd",
  ],
  similarArtists: [
    { name: "sombr" },
    { name: "Lucy Bedroque" },
    { name: "Emi Grace" },
    { name: "Love Spells" },
  ],
  tracks: [
    {
      name: "the perfect pair",
      album: "Beatopia",
      duration: "2:57",
      artworkUrl: "/albums/beabadoobee/beatopia.png",
    },
    {
      name: "All I Did Was Dream of You (feat. The Marías)",
      album: "Pylon",
      duration: "3:12",
      artworkUrl: "/albums/beabadoobee/pylon.jpg",
    },
    {
      name: "Beaches",
      album: "This Is How Tomorrow Moves",
      duration: "3:42",
      artworkUrl: "/albums/beabadoobee/this-is-how-tomorrow-moves.jpg",
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
  origin: "Seoul, South Korea",
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
    "Synchronized choreography",
    "High-production visuals",
    "Bilingual performance (Korean/English)",
    "Intense fan energy",
    "Short but stacked set",
  ],
  bestFor: [
    "K-pop fans",
    "Pop music lovers",
    "Fans of concept-driven acts",
    "Anyone who wants to be converted",
  ],
  similarArtists: [
    { name: "Major Lazer" },
    { name: "I-DLE" },
    { name: "Zack Martino" },
    { name: "DJ Trixie Mattel" },
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
  origin: "New York, New York",
  tagline: "Multi-platinum electronic giants delivering a massive, stadium-scale pop spectacle.",
  socials: {},
  whySee: [
    "A non-stop, high-energy headline performance packed back-to-back with a decade of global, generation-defining pop radio anthems",
    "Alex Pall and Drew Taggart executing a hybrid live set that pairs hyper-precise deck manipulation with live vocals and drumming",
    "An absolute stadium-scale visual layout deploying massive pyrotechnics, elite lighting architecture, and blinding laser fields",
    "The ultimate high-visibility Sunday evening crowd catalyst designed purely to close out the weekend at terminal velocity",
  ],
  whatToExpect: [
    "Massive stadium-scale singalongs",
    "Blinding high-production lasers",
    "Hybrid live electronic instrumentation",
    "Peak-time high-energy festival pacing",
  ],
  bestFor: [
    "Mainstream global pop enthusiasts",
    "Future bass and electronic lovers",
    "Groups of friends partying",
    "High-visibility mainstage crowds",
    "Legacy anthem hunters",
  ],
  similarArtists: [
    { name: "Whethan" },
    { name: "Know Good" },
    { name: "MC4D" },
    { name: "Alison Wonderland" },
  ],
  tracks: [
    { name: "Closer", album: "Collage", duration: "" },
    { name: "Don't Let Me Down", album: "Collage", duration: "" },
    { name: "Something Just Like This", album: "Memories...Do Not Open", duration: "" },
  ],
  about:
    "The Chainsmokers is the Grammy-winning electronic pop duo of Alex Pall and Drew Taggart, whose sharp combination of multi-platinum future bass production, sleek indie-pop hooks, and commanding stage showmanship earned them billions of streams worldwide. Moving rapidly from the club underground to absolute global chart dominance, they crafted the literal sonic blueprint for crossover electronic radio anthems throughout the late 2010s. Backed by an exceptionally polished live visual infrastructure, their headlining mainstage closer provides a massive, high-velocity celebration of pop history.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Headliner",
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
  origin: "Los Angeles, California",
  tagline: "Sleek, euphoric queer synth-pop anthems built on raw, joyful emotional catharsis.",
  socials: {},
  whySee: [
    "One of indie music's absolute finest contemporary live forces delivering a deeply moving, celebratory pop sermon on the mainstage",
    "Katie Gavin's magnetic, completely commanding vocals leading a passionate crowd of thousands singing every specific lyric",
    "Experience a stunning combination of sparkling retro-futuristic synth lines and driving, fuzzed-out alternative rock guitar Hooks",
    "A deeply emotional, park-wide safe-haven environment fueled by collective crowd catharsis and irresistible dance-pop energy",
  ],
  whatToExpect: [
    "Glittering synth-pop choruses",
    "High-energy group choreography",
    "Intense communal crowd singalongs",
    "Pristine electronic soundscapes",
  ],
  bestFor: [
    "Indie pop music lovers",
    "Synth-pop and electropop fans",
    "Lyric and narrative obsessives",
    "High-visibility mainstage crowds",
    "Vibe-focused afternoon dancers",
  ],
  similarArtists: [
    { name: "Empire of the Sun" },
    { name: "Lorde" },
    { name: "Slayyyter" },
    { name: "The xx" },
  ],
  tracks: [
    { name: "Silk Chiffon", album: "MUNA", duration: "" },
    { name: "What I Want", album: "MUNA", duration: "" },
    { name: "Stayaway", album: "Saves the World", duration: "" },
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
  origin: "Lansing, Michigan",
  tagline:
    "Blistering, hyper-vivid midwestern emo anthems delivered like an absolute lightning strike.",
  socials: {},
  whySee: [
    "A ferocious live alternative rock engine executing an intense, raw performance that completely bypasses processed backing tracks",
    "Tades Sanville's exceptionally raw, screaming vocal delivery commanding massive, park-wide mosh pits and emotional singalongs",
    "Hear the live premiere of massive, fuzzed-out dual-guitar riffs from their highly celebrated recent studio milestones",
    "A deeply therapeutic live environment built on sharp midwestern isolation, weaponized humor, and collective crowd catharsis",
  ],
  whatToExpect: [
    "Hyper-speed punk tempos",
    "Raw screaming vocal leads",
    "Explosive main-field mosh pits",
    "Massive group-scale singalongs",
  ],
  bestFor: [
    "Emo and pop-punk traditionalists",
    "Mosh pit veterans",
    "Guitar music purists",
    "Devotees of chaotic stage performance",
    "High-energy afternoon crowds",
  ],
  similarArtists: [
    { name: "YUNGBLUD" },
    { name: "Turnstile" },
    { name: "The Story So Far" },
  ],
  tracks: [
    { name: "BCKYRD", album: "you'll be fine", duration: "" },
    { name: "Drink Milk and Run", album: "Why Would I Watch", duration: "" },
    { name: "Shhh! Golf is on", album: "Why Would I Watch", duration: "" },
  ],
  about:
    "Hot Mulligan is the Michigan-born five-piece rock outfit whose hyper-vivid blend of distorted garage emo grit and glittering, pop-punk melodic hooks has earned them a reputation as the definitive leaders of the modern emo resurgence. Writing music that operates with the urgent, unpredictable pacing of a panic attack, the band relies on incredibly crisp dual-guitar layers and deeply conversational lyricism. Coming off massive global headline arena runs, their late-afternoon performance provides a thrilling, beautifully raw antidote to overprocessed pop.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
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
  origin: "Tokyo, Japan",
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
  whatToExpect: [
    "High-energy J-Pop anthems",
    "Full live band — not a DJ set",
    "Massive crowd singalongs",
    "Cross-cultural discovery",
    "Viral moments live",
  ],
  bestFor: ["Anime fans", "J-Pop curious listeners", "Pop music lovers", "Discovery seekers"],
  similarArtists: [
    { name: "Empire of the Sun" },
    { name: "The xx" },
    { name: "Ado" },
    { name: "Paris Paloma" },
  ],
  tracks: [
    {
      name: "アイドル",
      album: "THE BOOK 3",
      duration: "3:32",
      artworkUrl: "/albums/yoasobi/the-book-3.png",
    },
    {
      name: "夜に駆ける",
      album: "THE BOOK",
      duration: "4:21",
      artworkUrl: "/albums/yoasobi/the-book.jpg",
    },
    {
      name: "群青",
      album: "THE BOOK",
      duration: "4:08",
      artworkUrl: "/albums/yoasobi/the-book.jpg",
    },
  ],
  about:
    "YOASOBI is a Japanese music project formed in 2019 by producer Ayase and vocalist ikura with a singular concept: creating 'music from novels'. Each track serves as a direct musical adaptation of a short story, yielding pop music with unique narrative depth and intricate vocal delivery. Following the historic global crossover success of their smash hit 'アイドル' (Idol), the duo has continued to scale new heights with their 2026 studio album 'THE BOOK for,', cementing their status as premier international festival headliners.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
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
  origin: "Tokyo, Japan",
  tagline:
    "A monumental, completely anonymous J-pop powerhouse commanding jaw-dropping vocal fury.",
  socials: {},
  whySee: [
    "A historic, highly anticipated American festival debut from a completely anonymous global J-pop phenomenon hiding behind silhouettes",
    "Witness one of the most technically gifted, breathtakingly unique vocalists alive shifting from operatic control to savage rock screams",
    "An absolute masterclass in live theatrical performance backed by high-production cinematic visuals and a fierce rock ensemble",
    "A deeply passionate, high-energy evening crowd environment driven by intense stadium-scale fan chants and soaring hooks",
  ],
  whatToExpect: [
    "Stunning multi-octave vocal runs",
    "Silhouette-only theatrical staging",
    "Cinematic high-production visual loops",
    "Intense localized fan energy",
  ],
  bestFor: [
    "J-pop and rock purists",
    "Anime culture enthusiasts",
    "Vocal power purists",
    "Devotees of theatrical stage performance",
    "International milestone seekers",
  ],
  similarArtists: [
    { name: "YOASOBI" },
    { name: "SIDEPIECE" },
    { name: "Ninajirachi" },
    { name: "Snow Strippers" },
  ],
  tracks: [
    { name: "Usseewa", album: "K狂言", duration: "" },
    { name: "New Genesis", album: "Uta's Songs: One Piece Film Red", duration: "" },
    { name: "Show", album: "Show", duration: "" },
  ],
  about:
    "Ado is the completely anonymous Japanese vocal powerhouse whose extraordinary three-octave range and fierce independent path transformed her from a bedroom utaite into an essential global vanguard of J-pop. Completely obscuring her physical identity behind dark silhouettes and striking anime avatars, she pairs bold social commentary with genre-fluid alternative rock textures. Shattering international streaming benchmarks with blockbusters like 'Usseewa', her highly visible evening mainstage performance stands as an undeniable showcase of pristine musical power.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
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
  origin: "London, England",
  tagline:
    "Sleek, high-gloss British pop-R&B and contemporary soul built on flawless vocal authority.",
  socials: {},
  whySee: [
    "The highly anticipated solo festival debut from a world-class pop icon stepping completely into her own R&B identity",
    "Jade Thirlwall's phenomenal, soaring vocal range executed flawlessly through complex, high-energy live band arrangements",
    "A masterclass in world-class pop execution, delivering massive global hooks mixed with deep, low-slung soul grooves",
    "An absolute stadium-scale celebration packed with massive group singalongs and blinding, exceptionally stylish choreography",
  ],
  whatToExpect: [
    "Polished group-scale choreography",
    "Exceptional live vocal dynamics",
    "High-fashion cinematic visuals",
    "Lush contemporary R&B grooves",
  ],
  bestFor: [
    "Mainstream pop music lovers",
    "Alternative R&B purists",
    "Precision dance performance fans",
    "Vocal power purists",
    "Early afternoon mainstage seekers",
  ],
  similarArtists: [
    { name: "Justine Skye" },
    { name: "Blood Orange" },
    { name: "Sienna Spiro" },
    { name: "Olivia Dean" },
  ],
  tracks: [
    { name: "Angel Of My Dreams", album: "Angel Of My Dreams", duration: "" },
    { name: "Fantasy", album: "Fantasy", duration: "" },
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
  origin: "Bristol, England",
  tagline:
    "Punishing, sinister dark techno designed to turn giant festival tents into industrial warehouses.",
  socials: {},
  whySee: [
    "One of global techno's absolute finest modern technicians commanding an intense, high-velocity late-night dance session",
    "Experience a calculated masterclass in modular hardware manipulation, metallic techno grooves, and distorted vocal samples",
    "The absolute premier alternative option for electronic fans hunting heavy, stylized atmospheric warehouse tension over commercial EDM",
    "An absolute, non-stop dance accelerator designed perfectly to turn a festival crowd into a boiling rave paradise",
  ],
  whatToExpect: [
    "Punishing industrial basslines",
    "Gothic midtempo techno steps",
    "Frenetic electronic visual loops",
    "Nonstop high-velocity club grooves",
  ],
  bestFor: [
    "Dark techno purists",
    "Industrial electronic enthusiasts",
    "Ravers hunting heavy bass",
    "Late-night club music veterans",
    "Sound design infrastructure nerds",
  ],
  similarArtists: [
    { name: "Max Styler" },
    { name: "Peace Control" },
    { name: "bradeazy" },
    { name: "Devault" },
  ],
  tracks: [
    { name: "Be the One", album: "Be the One", duration: "" },
    { name: "Believe", album: "Believe", duration: "" },
    { name: "Diamonds on My Mind", album: "Diamonds on My Mind", duration: "" },
  ],
  about:
    "Eli Brown is a Bristol-born DJ and electronic producer who has rapidly solidified his position as one of the modern era's most prolific and essential dark techno forces. Blending the heavy, metallic weight of industrial techno with the nostalgic, cold textures of late-80s warehouse networks, his meticulously engineered tracks possess a distinct narrative tension. Highly sought after for his uncompromising approach on his own Arcane imprint, his late-night festival environment functions as a blindingly intense, strobe-lit audio-visual spectacle.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
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
  origin: "London, England",
  tagline: "The multi-platinum architect of pristine, stadium-scale deep house anthems.",
  socials: {},
  whySee: [
    "A legendary titan of underground house music crossover culture delivering a masterclass closing set under the Perry's tent",
    "Experience a non-stop, high-velocity dance party packed back-to-back with a decade of global multi-platinum hits like 'Ocean Drive'",
    "An absolute masterclass in club curation, pairing deep soulful vocal melodies with heavy, rolling bassline hooks",
    "A premier late-night crowd catalyst deployed with blinding, high-production audio-visual loops and laser field arrays",
  ],
  whatToExpect: [
    "Uplifting deep house drops",
    "Massive electronic singalongs",
    "Heavy rolling bassline steps",
    "Nonstop high-energy club pacing",
  ],
  bestFor: [
    "House and deep house purists",
    "Late-night club music veterans",
    "Groups of friends partying",
    "High-visibility dance tent seekers",
    "Legacy anthem hunters",
  ],
  similarArtists: [
    { name: "SIDEPIECE" },
    { name: "Chace" },
    { name: "Westend" },
    { name: "John Summit" },
  ],
  tracks: [
    { name: "Ocean Drive", album: "Duality", duration: "" },
    { name: "Need U (100%)", album: "Need U (100%)", duration: "" },
    { name: "I Got U", album: "Duality", duration: "" },
  ],
  about:
    "Adam Dyment, performing under the iconic moniker Duke Dumont, is a Grammy-nominated multi-platinum producer and DJ who completely re-engineered the crossover house music landscape over the past decade. Characterized by his unique formula of minimalist, high-tempo deep house loops, heavy rolling bass steps, and pristine alternative vocal choices, his production has anchored massive radio hits globally. Closing down the late-night slot, his performance serves as an explosive celebration of modern electronic music history.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
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
  origin: "Chicago, Illinois",
  tagline:
    "Glitchy, high-velocity internet rap and bounce-driven trap from a hometown breakout project.",
  socials: {},
  whySee: [
    "A massive hometown showcase performance on the alternative stage celebrating a rapid ascent in the local independent scene",
    "Experience an intense, rapid-fire vocal workout gliding effortlessly over incredibly crisp, low-slung alternative electronic bass pockets",
    "An absolute wildfire crowd environment packed with chaotic, high-energy teenage mosh pits early in the day",
    "Catch a lightning-fast underground trendsetter running on pure digital clout before they completely alter pop infrastructure",
  ],
  whatToExpect: [
    "Glitchy atmospheric loop beats",
    "High-energy early mosh pits",
    "Rapid-fire syncopated vocal runs",
    "Lush laptop-pop synth elements",
  ],
  bestFor: [
    "Underground plugg rap purists",
    "Internet rap scene trend spotters",
    "Hometown scene supporters",
    "Adrenaline-fueled dance seekers",
    "Gen-Z culture collectors",
  ],
  similarArtists: [
    { name: "After" },
    { name: "partyof2" },
    { name: "Quadeca" },
    { name: "KLO" },
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
  origin: "Montpellier, France",
  tagline: "Infectious, soul-sampled French house loops built purely for celebratory day parties.",
  socials: {},
  whySee: [
    "Quentin Dombres bringing his hyper-infectious, cheerful brand of modern French house straight to a boiling festival tent",
    "A non-stop, high-velocity dance party packed back-to-back with iconic global club hits and multi-platinum single drops",
    "An absolute masterclass in club curation, blending heavy tech-house rolling basslines with exceptionally bright disco vocal chops",
    "The ultimate mid-afternoon crowd catalyst under the Perry's tent designed purely to get massive groups of friends dancing together",
  ],
  whatToExpect: [
    "Bouncy tech-house rhythms",
    "Bright infectious disco hooks",
    "Blinding daytime laser arrays",
    "Nonstop high-energy party pacing",
  ],
  bestFor: [
    "House and tech house purists",
    "High-visibility dance tent seekers",
    "Groups of friends partying",
    "Midday electronic ravers",
    "High-velocity energy hunters",
  ],
  similarArtists: [
    { name: "Westend" },
    { name: "Omnom" },
    { name: "John Summit" },
    { name: "SIDEPIECE" },
  ],
  tracks: [
    { name: "Soulr", album: "Soulr", duration: "" },
    { name: "Utopia", album: "Uuality", duration: "" },
    { name: "Down Low", album: "Down Low", duration: "" },
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
  origin: "Houston, Texas",
  tagline:
    "Ferocious, rapid-fire Southern trap delivery and unapologetic, aggressive mic dominance.",
  socials: {},
  whySee: [
    "An absolute force of nature delivering one of the most high-octane, lyrically aggressive sets of the afternoon lineup",
    "Monaleo's legendary, razor-sharp double-time flows delivered with absolute precision and unyielding mic command",
    "Experience a wildfire crowd environment packed with chaotic, high-energy mosh pits and massive group-scale singalongs",
    "Hear the live execution of massive global breakout independent anthems like 'Beating Down Yo Block' at monumental scale",
  ],
  whatToExpect: [
    "Razor-sharp double-time flows",
    "Heavy rolling sub-bass steps",
    "Explosive main-field mosh pits",
    "Intense unadulterated street rap energy",
  ],
  bestFor: [
    "Southern hip-hop purists",
    "Lyric and narrative obsessives",
    "Mosh pit veterans",
    "Adrenaline-fueled music seekers",
    "High-visibility alternative crowds",
  ],
  similarArtists: [
    { name: "Lil Uzi Vert" },
    { name: "Beno" },
    { name: "Mustard" },
    { name: "After" },
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
  origin: "Slovakia",
  tagline: "Sleek, atmospheric European pop melodies driven by stunning vocal clarity.",
  socials: {},
  whySee: [
    "Witness an exceptional international pop vocalist executing a highly anticipated debut performance on the undercard",
    "Adéla's crystalline, commanding vocal delivery effortlessly carrying soaring hooks across the open afternoon lawn",
    "Experience a beautifully vibrant, upbeat afternoon sonic escape that brings fresh European pop sensibilities to Chicago",
    "Hear the live execution of incredibly infectious, independent pop singles delivered with effortless live confidence",
  ],
  whatToExpect: [
    "Pristine vocal dynamics",
    "Bright dance-pop hooks",
    "Sleek minimalist electronic backing",
    "High-energy afternoon pacing",
  ],
  bestFor: [
    "Mainstream pop music lovers",
    "Pop vocal purists",
    "International milestone seekers",
    "Early afternoon discovery hunters",
    "Upbeat melody enthusiasts",
  ],
  similarArtists: [
    { name: "SB19" },
    { name: "Tate McRae" },
    { name: "bbno$" },
    { name: "aespa" },
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
  origin: "Brighton, England",
  tagline: "High-octane, bass-heavy minimal tech house crafted to fuel relentless dance floors.",
  socials: {},
  whySee: [
    "One of the UK house scene's most viral and fiercely watched technical selectors commanding an intense midday session",
    "An elite display of hyper-precise percussive architecture, rolling low-frequency baselines, and addictive vocal chops",
    "Experience a non-stop daytime adrenaline accelerator that completely transforms the Perry's tent into a boiling rave floor",
    "The absolute perfect early-day groove engine designed to get large groups of friends dancing together under the sun",
  ],
  whatToExpect: [
    "Driving tech-house loops",
    "Gritty minimal basslines",
    "Blinding daytime strobe fields",
    "Nonstop high-velocity mixing",
  ],
  bestFor: [
    "Tech house purists",
    "Underground club devotees",
    "Midday electronic ravers",
    "Tent starters hunting grooves",
    "High-velocity dance seekers",
  ],
  similarArtists: [
    { name: "Eli Brown" },
    { name: "Westend" },
    { name: "Disco Lines" },
    { name: "John Summit" },
  ],
  tracks: [
    { name: "Needle On The Record", album: "Needle On The Record", duration: "" },
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
  origin: "London, England",
  tagline: "Visceral, raw guitar rock and poetic, fuzzed-out alternative storytelling.",
  socials: {},
  whySee: [
    "One of the UK's absolute finest contemporary live forces delivering a deeply moving rock sermon on the Allianz stage",
    "Jacob Slater's ferociously raw, working-class lyrical delivery commanding an intensely emotional crowd singalong",
    "A masterclass in traditional analog power band energy, delivering jagged dual-guitar riffs and complex progressive rhythmic patterns",
    "Experience a stunning combination of crushing alternative guitar grit and soaring, 1990s-styled indie rock melodic hooks",
  ],
  whatToExpect: [
    "Towering alternative guitar walls",
    "Ferocious raw vocal leads",
    "Intense communal crowd singalongs",
    "Explosive afternoon mosh pits",
  ],
  bestFor: [
    "Indie rock traditionalists",
    "Post-punk revival stans",
    "Guitar music purists",
    "Lyric and narrative obsessives",
    "High-energy afternoon moshers",
  ],
  similarArtists: [
    { name: "Day We Ran" },
    { name: "Villanelle" },
    { name: "Ink" },
    { name: "The Braymores" },
  ],
  tracks: [
    { name: "Purple", album: "Cub", duration: "" },
    { name: "Leader of the Pack", album: "Cub", duration: "" },
    { name: "Midas", album: "Midas", duration: "" },
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
  origin: "New York, New York",
  tagline:
    "Lush, sun-drenched global R&B and house-infused soul built on magnificent vocal richness.",
  socials: {},
  whySee: [
    "A masterclass in contemporary R&B polish making a high-visibility crossover statement on the T-Mobile stage",
    "Amber Mark's phenomenal, soaring vocal range executed flawlessly through deep, low-slung soul grooves",
    "Experience a chic, hyper-stylized dance floor environment that seamlessly fuses electronic house beats with traditional neo-soul",
    "The ultimate high-energy afternoon catalyst designed perfectly to unify a massive, moving festival crowd under the sun",
  ],
  whatToExpect: [
    "Lush alternative R&B grooves",
    "Pristine electronic soundscapes",
    "Infectious dance-house choruses",
    "Exceptional live vocal dynamics",
  ],
  bestFor: [
    "Alternative R&B purists",
    "Soul and house music lovers",
    "High-visibility mainstage crowds",
    "Vocal power purists",
    "Afternoon groove hunters",
  ],
  similarArtists: [
    { name: "Blood Orange" },
    { name: "Justine Skye" },
    { name: "Sienna Spiro" },
    { name: "Valencia Grace" },
  ],
  tracks: [
    { name: "Worth It", album: "Three Dimensions Deep", duration: "" },
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
  origin: "New York, New York",
  tagline: "Driving, tech-house rollers packed with heavy, crisp warehouse grooves.",
  socials: {},
  whySee: [
    "Tyler Morris bringing his hyper-infectious, powerful brand of modern New York tech-house straight to a boiling festival tent",
    "An elite display of syncopated swing rhythms, heavy bassline rollers, and flawlessly mixed independent club tracks",
    "The ultimate mid-afternoon crowd catalyst under the Perry's tent designed purely to get thousands of people moving together",
    "A non-stop, high-velocity dance party packed back-to-back with iconic global club hits and multi-platinum single drops",
  ],
  whatToExpect: [
    "Heavy tech-house rhythms",
    "Infectious vocal club chops",
    "Blinding daytime laser arrays",
    "Nonstop house party pacing",
  ],
  bestFor: [
    "Tech house purists",
    "Late-night club music veterans",
    "Ravers hunting rolling basslines",
    "Groups of friends partying",
    "High-velocity dance tent seekers",
  ],
  similarArtists: [
    { name: "John Summit" },
    { name: "SIDEPIECE" },
    { name: "Omnom" },
    { name: "bradeazy" },
  ],
  tracks: [
    { name: "Get This Party Started", album: "Get This Party Started", duration: "" },
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
  origin: "Tampa, Florida",
  tagline: "Sultry, whisper-close confessional alternative R&B for late-night overthinkers.",
  socials: {},
  whySee: [
    "Catch an exceptional independent lyricist executing a deeply atmospheric, confessional performance on the Tito's stage",
    "Songwriting that lands like an intense, unguarded voice memo tracking the complex, messy textures of young romance",
    "A beautiful, sun-drenched early afternoon oasis that pairs delicate vocal textures with unexpectedly heavy baseline drops",
    "An industry insider finally in the spotlight, renowned for writing hits for Kehlani before launching a revered solo path",
  ],
  whatToExpect: [
    "Lush alternative R&B grooves",
    "Intimate close-mic'd vocal runs",
    "Shadow-drenched synth textures",
    "Warm emotional afternoon crowd",
  ],
  bestFor: [
    "Alternative R&B purists",
    "Fans of contemporary bedroom pop",
    "Lyric and narrative obsessives",
    "Early afternoon discovery seekers",
    "Intimate emotional story devotees",
  ],
  similarArtists: [
    { name: "Chezile" },
    { name: "Khamari" },
    { name: "Leon Thomas" },
    { name: "KWN" },
  ],
  tracks: [
    { name: "IN THE AIR", album: "COLORWAY", duration: "" },
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
  origin: "Istanbul, Turkey",
  tagline:
    "Irreverent, high-velocity tech-house pop built purely for chaotic festival day parties.",
  socials: {},
  whySee: [
    "The undisputed high-energy internet pop breakout princess bringing an explosive, completely unhinged club party directly to the park",
    "Inci Gurun's magnetic, larger-than-life stage command delivering sharp, witty vocal lines alongside massive tech-house drops",
    "Experience a beautifully curated afternoon dance floor environment packed back-to-back with viral, multi-million stream anthems",
    "The ultimate high-energy afternoon catalyst designed purely to get massive groups of friends dancing together under the sun",
  ],
  whatToExpect: [
    "Bouncy tech-house rhythms",
    "Witty tongue-in-cheek lyrics",
    "Blinding daytime visual loops",
    "Nonstop high-energy party pacing",
  ],
  bestFor: [
    "Fans of witty pop camp",
    "Mainstream global pop enthusiasts",
    "Groups of friends partying",
    "High-energy afternoon dancers",
    "Internet scene trend spotters",
  ],
  similarArtists: [
    { name: "Disco Lines" },
    { name: "SIDEPIECE" },
    { name: "Omnom" },
    { name: "Zack Martino" },
  ],
  tracks: [
    { name: "GASLIGHT", album: "LFG", duration: "" },
    { name: "MADELINE", album: "LFG", duration: "" },
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
  origin: "Hackleburg, Alabama",
  tagline: "Grounded, gravel-voiced Alabama folk storytelling built on timeless acoustic hooks.",
  socials: {},
  whySee: [
    "A rising country standout bringing his highly celebrated, raw Southern songwriting charisma straight to Grant Park",
    "Razor-sharp country lyrics that trade on absolute emotional honesty, working-class grit, and incredible acoustic guitar loops",
    "A stunning afternoon oasis that pairs traditional acoustic instrumentation with a truly monumental, timeless singing voice",
    "The official festival tour run highlighting his highly talked-away independent studio catalog to a massive live audience",
  ],
  whatToExpect: [
    "Grounded country vocals",
    "Raw alternative folk riffs",
    "Charming Southern stage banter",
    "Tight acoustic instrument layers",
  ],
  bestFor: [
    "Traditional country music purists",
    "Fans of alternative folk songwriting",
    "Lyric and narrative obsessives",
    "Early afternoon discovery seekers",
    "Intimate emotional set hunters",
  ],
  similarArtists: [
    { name: "Cameron Whitcomb" },
    { name: "Elizabeth Nichols" },
    { name: "Calder Allen" },
    { name: "Nat Myers" },
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
  origin: "Brooklyn, New York",
  tagline:
    "A terrifyingly brilliant, blistering collision of jagged art-punk guitars and dance loops.",
  socials: {},
  whySee: [
    "One of the absolute sharpest, most restlessly creative rock outfits of the modern underground executing an intense performance",
    "Rachel Brown's completely deadpan, acrobatic vocal deliveries shifting effortlessly underneath Nate Amos's brutal industrial noise foundations",
    "The official premier festival tour run showcasing the towering sonic weight of their highly celebrated Matador Records catalog",
    "A blistering, blindingly intense live landscape that completely transforms a traditional festival crowd into performance art theater",
  ],
  whatToExpect: [
    "Jagged post-punk guitar hooks",
    "Distorted electronic basslines",
    "Deadpan spoken-word vocals",
    "Complex progressive rhythm shifts",
  ],
  bestFor: [
    "Post-punk revival stans",
    "Fans of avant-garde production",
    "Lyric and narrative obsessives",
    "Devotees of chaotic stage performance",
    "Underground indie music collectors",
  ],
  similarArtists: [
    { name: "Wet Leg" },
    { name: "Geese" },
    { name: "Wunderhorse" },
    { name: "Villanelle" },
  ],
  tracks: [
    { name: "Barley", album: "Everyone's Crushed", duration: "" },
    { name: "True Love", album: "Everyone's Crushed", duration: "" },
    { name: "When You're Around", album: "Structure", duration: "" },
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
  origin: "Oxnard, California",
  tagline: "Sun-drenched, vintage-hued Chicano soul and hazy lo-fi bedroom pop melodies.",
  socials: {},
  whySee: [
    "Catch Maurilio Suarez's mesmerizing, vintage-hued alternative soul collective bringing pure backyard warmth to the evening",
    "Experience a lush collection of reflective, psychedelic ballads infused with gorgeous retro textures under the sun",
    "A beautifully intimate, atmospheric sonic oasis designed perfectly to completely escape standard commercial pop noise",
    "Hear the live execution of fresh, highly anticipated independent studio cuts making an exclusive festival debut",
  ],
  whatToExpect: [
    "Vintage-hued guitar loops",
    "Sultry smooth vocal melodies",
    "Low-slung tropical rhythms",
    "Warm organic instrumentation layers",
  ],
  bestFor: [
    "Lovers of vintage production",
    "Contemporary bedroom pop fans",
    "Chill afternoon groove hunters",
    "Indie pop music collectors",
    "Alternative R&B purists",
  ],
  similarArtists: [
    { name: "Empire of the Sun" },
    { name: "Bixby" },
    { name: "The Neighbourhood" },
    { name: "Julia Wolf" },
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
  origin: "Vancouver, Canada",
  tagline: "Sleek, cinematic indie electronica and driving deep house built for the open air.",
  socials: {},
  whySee: [
    "The absolute definition of modern electronic R&B polish making a high-visibility crossover statement under the Perry's tent",
    "A perfectly synchronized live-electronic set that balances deep, driving baseline grooves with incredibly infectious vocal hooks",
    "Experience a chic, hyper-stylized dance floor environment that translates European underground club ethos onto an enormous scale",
    "The ultimate high-energy afternoon catalyst designed perfectly to unify a massive, moving festival crowd under the sun",
  ],
  whatToExpect: [
    "Sleek house rhythms",
    "Pristine electronic soundscapes",
    "Infectious dance-pop choruses",
    "Intimate vulnerable vocal runs",
  ],
  bestFor: [
    "Dance pop enthusiasts",
    "French house purists",
    "High-visibility mainstage crowds",
    "Afternoon groove hunters",
    "Electronic music culture lovers",
  ],
  similarArtists: [
    { name: "Jackie Hollander" },
    { name: "Duke Dumont" },
    { name: "Empire of the Sun" },
    { name: "MUNA" },
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
  origin: "Portland, Oregon",
  tagline:
    "Shimmering, cosmic dream pop built on soaring vocal lines and rich psychedelic grooves.",
  socials: {},
  whySee: [
    "Catch an exceptional songwriting collective executing a beautifully warm, sun-drenched indie pop performance on the BMI stage",
    "Perfectly synchronized, warm vocal harmonies gliding effortlessly over heavy, chorus-heavy dream pop guitar lines",
    "A gorgeous, sun-drenched early afternoon oasis designed perfectly to completely escape standard commercial pop noise",
    "The official festival tour run highlighting their highly celebrated independent studio catalog to a massive live audience",
  ],
  whatToExpect: [
    "Dreamy ambient synth pads",
    "Shimmering dream-pop synths",
    "Charming self-aware stage banter",
    "Warm emotional afternoon crowd",
  ],
  bestFor: [
    "Left-field dream pop fans",
    "Lyric and narrative obsessives",
    "Early afternoon discovery seekers",
    "Indie pop music collectors",
    "Chill summer melody seekers",
  ],
  similarArtists: [
    { name: "Sunshine" },
    { name: "Suki Waterhouse" },
    { name: "The xx" },
    { name: "Lorde" },
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
  origin: "London, England",
  tagline: "Scrappy, distortion-soaked garage rock revivalism with a classic British edge.",
  socials: {},
  whySee: [
    "A high-visibility festival debut capturing one of rock's most talked-about new frontmen breaking into the live circuit",
    "Blistering, fast-paced dual-guitar riffs that completely bypass overprocessed electronic backing tracks for raw analog grit",
    "Experience a reckless, youth-driven energy that channels the timeless guitar audacities of early 2000s indie rock",
    "An absolute lightning-strike afternoon catalyst built around melodic distortion and raw, unadulterated power-trio chemistry",
  ],
  whatToExpect: [
    "Fuzzed-out dual guitars",
    "Scrappy garage rock tempos",
    "Energetic mid-field mosh pits",
    "Raw unadulterated band chemistry",
  ],
  bestFor: [
    "Indie rock traditionalists",
    "Garage punk revival fans",
    "Guitar music purists",
    "Early afternoon mainstage crowds",
    "Scene trend-spotting collectors",
  ],
  similarArtists: [
    { name: "Whatmore" },
    { name: "Finn Wolfhard" },
    { name: "Villanelle" },
    { name: "Day We Ran" },
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
  origin: "Chicago, Illinois",
  tagline: "A fuzzed-out hometown alternative rock engine built on towering shoegaze walls.",
  socials: {},
  whySee: [
    "A massive, highly anticipated hometown showcase performance on the alternative stage celebrating a rapid local scene ascent",
    "Experience a blistering display of dual-guitar distortion, heavy post-punk tempos, and raw, confrontational vocal delivery",
    "An intense live rock performance that completely bypasses processed backing tracks for pure analog adrenaline",
    "The absolute perfect early afternoon catalyst designed to leave rock traditionalists completely floored by the talent",
  ],
  whatToExpect: [
    "Towering shoegaze guitar walls",
    "Raw fuzzed-out rock riffs",
    "Ferocious alternative vocal leads",
    "High-energy hometown mosh pits",
  ],
  bestFor: [
    "Post-punk revival stans",
    "Shoegaze and grunge devotees",
    "Hometown scene supporters",
    "Guitar music purists",
    "Early afternoon moshers",
  ],
  similarArtists: [
    { name: "Villanelle" },
    { name: "Day We Ran" },
    { name: "The Smashing Pumpkins" },
    { name: "High Vis" },
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
  origin: "Chicago, Illinois",
  tagline:
    "Glitchy, high-velocity internet rap and bounce-driven trap from a hometown breakout project.",
  socials: {},
  whySee: [
    "A massive hometown showcase performance on the alternative stage celebrating a rapid ascent in the local independent scene",
    "Experience an intense, rapid-fire vocal workout gliding effortlessly over incredibly crisp, low-slung alternative electronic bass pockets",
    "An absolute wildfire crowd environment packed with chaotic, high-energy teenage mosh pits early in the day",
    "Catch a lightning-fast underground trendsetter running on pure digital clout before they completely alter pop infrastructure",
  ],
  whatToExpect: [
    "Glitchy atmospheric loop beats",
    "High-energy early mosh pits",
    "Rapid-fire syncopated vocal runs",
    "Lush laptop-pop synth elements",
  ],
  bestFor: [
    "Underground plugg rap purists",
    "Internet rap scene trend spotters",
    "Hometown scene supporters",
    "Adrenaline-fueled dance seekers",
    "Gen-Z culture collectors",
  ],
  similarArtists: [
    { name: "partyof2" },
    { name: "Fakemink" },
    { name: "Ivri" },
    { name: "KLO" },
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
  origin: "Chicago, Illinois",
  tagline:
    "Hometown indie-rock anthems fusing driving alternative grit with timeless folk-rock storytelling.",
  socials: {},
  whySee: [
    "A massive, highly anticipated hometown showcase performance on the alternative stage celebrating a rapid local ascent",
    "Experience a brilliant, traditional analog band chemistry that treats giant festival fields like intimate local clubs",
    "A loose, remarkably fun and high-energy live performance built specifically to celebrate carefree youth culture",
    "The absolute perfect midday catalyst designed to unify a massive, supportive hometown crowd under the sun",
  ],
  whatToExpect: [
    "Driving dual-guitar hooks",
    "Raw soulful vocal delivery",
    "Rich folk-rock storytelling",
    "High-energy hometown camaraderie",
  ],
  bestFor: [
    "Hometown scene supporters",
    "Indie rock traditionalists",
    "Folk rock enthusiasts",
    "Guitar music purists",
    "Midday festival field dancers",
  ],
  similarArtists: [
    { name: "The Creekers" },
    { name: "Case Oats" },
    { name: "The Braymores" },
    { name: "Mother Mother" },
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
  origin: "Los Angeles, California",
  tagline: "Witty, wordy stream-of-consciousness pop music that plays out like real voice memos.",
  socials: {},
  whySee: [
    "Catch an exceptional independent pop writer executing a beautifully warm, storyteller performance on the alternative stage",
    "Razor-sharp lyricism that lands like an intense, unguarded diary entry tracking the complex textures of youth and romance",
    "A stunning afternoon oasis that pairs delicate, close-mic'd vocal patterns with unexpectedly catchy acoustic and electronic hooks",
    "The official premier festival tour run showcasing a highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: [
    "Intimate confessional lyricism",
    "Wordy hyper-specific indie pop tracks",
    "Charming self-aware stage banter",
    "Warm emotional afternoon crowd",
  ],
  bestFor: [
    "Lyric and songwriting obsessives",
    "Fans of contemporary bedroom pop",
    "Early afternoon discovery seekers",
    "Intimate storyteller set lovers",
    "Indie pop music collectors",
  ],
  similarArtists: [
    { name: "Whitney Whitney" },
    { name: "Ella Boh" },
    { name: "Stella Lefty" },
    { name: "Next of Kin" },
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
  origin: "Charleston, South Carolina",
  tagline: "Sun-drenched, witty surf rock and fuzzed-out psych grooves built for festival fields.",
  socials: {},
  whySee: [
    "A perfectly curated afternoon vibe catalyst bringing their hyper-catchy brand of surf rock distortion straight to the BMI stage",
    "Experience an exceptional dual-guitar workout, low-slung bass rhythm pockets, and flawless analog band chemistry",
    "A loose, remarkably fun and high-energy live performance built specifically to celebrate carefree youth culture under the sun",
    "The ultimate high-visibility afternoon groove engine designed to get large groups of friends dancing together",
  ],
  whatToExpect: [
    "Shimmering surf rock guitar loops",
    "Fuzzed-out psych arrangements",
    "Charming casual stage presence",
    "Upbeat afternoon party energy",
  ],
  bestFor: [
    "Indie rock traditionalists",
    "Surf and psych rock heads",
    "Groups of friends partying",
    "Afternoon groove hunters",
    "Live instrument devotees",
  ],
  similarArtists: [
    { name: "Surfing for Daisy" },
    { name: "Marlon Funaki" },
    { name: "Spacey Jane" },
    { name: "The Army, The Navy" },
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
  origin: "San Francisco, California",
  tagline: "Sleek, low-slung deep tech house grooves packed with heavy underground attitude.",
  socials: {},
  whySee: [
    "Catch one of the electronic underground's most fiercely watched tech-house selectors commanding a prime mid-afternoon tent session",
    "An elite display of rolling sub-bass steps, crisp percussion accents, and flawlessly mixed independent club tracks",
    "Experience a dark, hyper-stylized dancefloor environment that brings a distinct West Coast warehouse energy to the park",
    "The absolute perfect afternoon groove engine designed specifically to get thousands of people moving early under the tent",
  ],
  whatToExpect: [
    "Rolling tech-house rhythms",
    "Crisp underground basslines",
    "Blinding daytime strobe fields",
    "Nonstop driving tent momentum",
  ],
  bestFor: [
    "Tech house purists",
    "Underground club devotees",
    "Midday electronic dancers",
    "Tent starters hunting grooves",
    "Electronic music culture lovers",
  ],
  similarArtists: [
    { name: "SIDEPIECE" },
    { name: "Max Styler" },
    { name: "INJI" },
    { name: "AYYBO" },
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
  origin: "Los Angeles, California",
  tagline: "Witty, wordy stream-of-consciousness pop music that plays out like real voice memos.",
  socials: {},
  whySee: [
    "Catch an exceptional independent pop writer executing a beautifully warm, storyteller performance on the alternative stage",
    "Razor-sharp lyricism that lands like an intense, unguarded diary entry tracking the complex textures of youth and romance",
    "A stunning afternoon oasis that pairs delicate, close-mic'd vocal patterns with unexpectedly catchy acoustic and electronic hooks",
    "The official premier festival tour run showcasing her highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: [
    "Intimate confessional lyricism",
    "Wordy hyper-specific indie pop tracks",
    "Charming self-aware stage banter",
    "Warm emotional afternoon crowd",
  ],
  bestFor: [
    "Lyric and songwriting obsessives",
    "Fans of contemporary bedroom pop",
    "Early afternoon discovery seekers",
    "Intimate storyteller set lovers",
    "Indie pop music collectors",
  ],
  similarArtists: [
    { name: "Porch Light" },
    { name: "Whitney Whitney" },
    { name: "Ella Boh" },
    { name: "Next of Kin" },
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
  origin: "Brooklyn, New York",
  tagline: "Sleek, high-gloss contemporary R&B driven by multi-platinum vocal confidence.",
  socials: {},
  whySee: [
    "A world-class pop and R&B stylist bringing an exceptionally polished, high-visibility vocal showcase to the mainstage",
    "Experience a massive, stadium-scale performance packed with deep, low-slung electronic baseline grooves and glittering hooks",
    "Justine Skye's phenomenal, soaring multi-octave vocal range executed flawlessly through complex live arrangements",
    "An absolute evening crowd catalyst designed purely to get massive groups of fans dancing together under the sunset",
  ],
  whatToExpect: [
    "Sleek contemporary R&B grooves",
    "Exceptional live vocal dynamics",
    "High-fashion cinematic visuals",
    "Massive global pop choruses",
  ],
  bestFor: [
    "Alternative R&B purists",
    "Mainstream pop music lovers",
    "High-visibility mainstage crowds",
    "Vocal power purists",
    "Sunset golden hour dancers",
  ],
  similarArtists: [
    { name: "Jade" },
    { name: "Jae Stephens" },
    { name: "Blood Orange" },
    { name: "Valencia Grace" },
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
    billingTier: "Sub-headliner",
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
  origin: "Auckland, New Zealand",
  tagline:
    "Gravel-voiced, cinematic indie pop tracking the raw, intimate vulnerabilities of youth.",
  socials: {},
  whySee: [
    "Catch an exceptional international songwriting talent making a highly anticipated debut on the American festival circuit",
    "Swinton's distinctly raspy, gravel-voiced vocal delivery wrapping seamlessly around rich, close-mic'd acoustic arrangements",
    "Experience deeply honest, confessional lyricism that tracks the complex, messy textures of modern romance with profound wit",
    "A beautifully warm, sun-drenched early afternoon oasis designed perfectly to completely escape standard commercial pop noise",
  ],
  whatToExpect: [
    "Gravel-voiced soulful vocals",
    "Warm acoustic-folk strums",
    "Charming conversational stage banter",
    "Lush dreamy vocal arrangements",
  ],
  bestFor: [
    "Lyric and songwriting obsessives",
    "Fans of contemporary bedroom pop",
    "Early afternoon discovery seekers",
    "Intimate emotional story devotees",
    "Acoustic music purists",
  ],
  similarArtists: [
    { name: "Audrey Hobert" },
    { name: "Stella Lefty" },
    { name: "Next of Kin" },
    { name: "Whitney Whitney" },
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
  origin: "Los Angeles, California",
  tagline:
    "Shimmering, cosmic dream pop built on soaring vocal lines and rich psychedelic grooves.",
  socials: {},
  whySee: [
    "Catch an exceptional songwriting collective executing a beautifully warm, sun-drenched indie pop performance on the BMI stage",
    "Perfectly synchronized, warm vocal harmonies gliding effortlessly over heavy, chorus-heavy dream pop guitar lines",
    "A gorgeous, sun-drenched early afternoon oasis designed perfectly to completely escape standard commercial pop noise",
    "The official festival tour run highlighting their highly celebrated independent studio catalog to a massive live audience",
  ],
  whatToExpect: [
    "Dreamy ambient synth pads",
    "Shimmering dream-pop synths",
    "Charming self-aware stage banter",
    "Warm emotional afternoon crowd",
  ],
  bestFor: [
    "Left-field dream pop fans",
    "Lyric and narrative obsessives",
    "Early afternoon discovery seekers",
    "Indie pop music collectors",
    "Chill summer melody seekers",
  ],
  similarArtists: [
    { name: "New Constellations" },
    { name: "Suki Waterhouse" },
    { name: "The xx" },
    { name: "Will Swinton" },
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
  origin: "Chicago, Illinois",
  tagline:
    "Hometown indie-rock anthems fusing driving alternative grit with timeless folk-rock storytelling.",
  socials: {},
  whySee: [
    "A massive, highly anticipated hometown showcase performance on the alternative stage celebrating a rapid local ascent",
    "Experience a brilliant, traditional analog band chemistry that treats giant festival fields like intimate local clubs",
    "A loose, remarkably fun and high-energy live performance built specifically to celebrate carefree youth culture",
    "The absolute perfect midday catalyst designed to unify a massive, supportive hometown crowd under the sun",
  ],
  whatToExpect: [
    "Driving dual-guitar hooks",
    "Raw soulful vocal delivery",
    "Rich folk-rock storytelling",
    "High-energy hometown camaraderie",
  ],
  bestFor: [
    "Hometown scene supporters",
    "Indie rock traditionalists",
    "Folk rock enthusiasts",
    "Guitar music purists",
    "Midday festival field dancers",
  ],
  similarArtists: [
    { name: "Whatmore" },
    { name: "The Braymores" },
    { name: "The Creekers" },
    { name: "Day We Ran" },
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
  origin: "Charleston, South Carolina",
  tagline: "Sun-drenched, witty surf rock and fuzzed-out psych grooves built for festival fields.",
  socials: {},
  whySee: [
    "A perfectly curated afternoon vibe catalyst bringing their hyper-catchy brand of surf rock distortion straight to the BMI stage",
    "Experience an exceptional dual-guitar workout, low-slung bass rhythm pockets, and flawless analog band chemistry",
    "A loose, remarkably fun and high-energy live performance built specifically to celebrate carefree youth culture under the sun",
    "The ultimate high-visibility afternoon groove engine designed to get large groups of friends dancing together",
  ],
  whatToExpect: [
    "Shimmering surf rock guitar loops",
    "Fuzzed-out psych arrangements",
    "Charming casual stage presence",
    "Upbeat afternoon party energy",
  ],
  bestFor: [
    "Indie rock traditionalists",
    "Surf and psych rock heads",
    "Groups of friends partying",
    "Afternoon groove hunters",
    "Live instrument devotees",
  ],
  similarArtists: [
    { name: "Easy Honey" },
    { name: "Spacey Jane" },
    { name: "Marlon Funaki" },
    { name: "Love Spells" },
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
  origin: "Philadelphia, Pennsylvania",
  tagline: "High-octane, intense brass-heavy funk and soul built purely for outdoor block parties.",
  socials: {},
  whySee: [
    "The absolute ultimate raw live wildcard of the afternoon lineup, delivering an unadulterated brass-heavy funk explosion",
    "An exceptional multi-instrumental ensemble executing hyper-precise syncopated rhythms and soaring horn lines completely live",
    "Experience a loose, remarkably celebratory and high-energy party atmosphere built specifically to get crowds dancing wildly",
    "A premier midday crowd catalyst deployed on the Tito's stage designed to turn open fields into high-tempo block parties",
  ],
  whatToExpect: [
    "Blistering live horn sections",
    "Hyper-precise funk percussion",
    "Infectious soulful vocal hooks",
    "Nonstop high-energy dance grooves",
  ],
  bestFor: [
    "Funk and soul traditionalists",
    "Live instrument purists",
    "Groups of friends partying",
    "Midday festival field dancers",
    "High-velocity groove seekers",
  ],
  similarArtists: [
    { name: "Khamari" },
    { name: "Sienna Spiro" },
    { name: "Olivia Dean" },
    { name: "Destin Conrad" },
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
  origin: "New York, New York",
  tagline: "Sleek, high-gloss electronic dance pop and euphoric, stadium-scale house anthems.",
  socials: {},
  whySee: [
    "A premier high-visibility afternoon tent session highlighting one of the electronic circuit's finest crossover selectors",
    "An exceptionally polished live blend of soaring melodic house structures, multi-platinum radio hooks, and pristine drops",
    "Experience a wildfire crowd environment packed with carefree, high-energy dance floors under the Perry's tent",
    "The absolute perfect early-day adrenaline booster designed to get large groups of friends moving together under the sun",
  ],
  whatToExpect: [
    "Uplifting house rhythms",
    "Pristine electronic soundscapes",
    "Infectious dance-pop hooks",
    "Nonstop daytime party pacing",
  ],
  bestFor: [
    "Melodic house enthusiasts",
    "Mainstream dance pop fans",
    "Groups of friends partying",
    "Early afternoon tent starters",
    "High-octane dance seekers",
  ],
  similarArtists: [
    { name: "MC4D" },
    { name: "Major Lazer" },
    { name: "aespa" },
    { name: "Disco Lines" },
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
