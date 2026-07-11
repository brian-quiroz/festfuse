import type { Artist } from "@/app/types/artist";

const jennie: Artist = {
  name: "Jennie",
  slug: "jennie",
  mbid: "779351de-0da5-4943-928b-495a3c40e8c0",
  imageUrl: "/artists/heroes/jennie.jpg",
  objectPosition: "center 15%",
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
    "High-energy choreography",
    "Large crowd",
    "Visual production",
    "Crowd singalongs",
    "Fashion moments",
  ],
  bestFor: ["K-pop fans", "Pop lovers", "First-time festival goers", "Dancing crowds"],
  similarArtists: [
    { name: "CL", imageUrl: "/artists/avatars/cl.jpg" },
    { name: "Doja Cat", imageUrl: "/artists/avatars/doja-cat.jpg" },
    { name: "Cardi B", imageUrl: "/artists/avatars/cardi-b.png" },
    { name: "BLACKPINK", imageUrl: "/artists/avatars/blackpink.png" },
  ],
  tracks: [
    { name: "Mantra", album: "Ruby", duration: "2:27", artworkUrl: "/albums/jennie/ruby.png" },
    {
      name: "like JENNIE",
      album: "Ruby (The Complete Collection)",
      duration: "2:54",
      artworkUrl: "/albums/jennie/ruby-collection.jpg",
    },
    {
      name: "Dracula - JENNIE Remix",
      album: "Dracula (Remix)",
      duration: "3:10",
      artworkUrl: "/albums/jennie/dracula-remix.jpg",
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
    { name: "Mitski", imageUrl: "/artists/avatars/mitski.jpg" },
    { name: "Phoebe Bridgers", imageUrl: "/artists/avatars/phoebe-bridgers.jpg" },
    { name: "Soccer Mommy", imageUrl: "/artists/avatars/soccer-mommy.jpg" },
    { name: "Japanese Breakfast", imageUrl: "/artists/avatars/japanese-breakfast.jpg" },
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

const majorLazer: Artist = {
  name: "Major Lazer",
  slug: "major-lazer",
  mbid: "75be165a-ad83-4d12-bd28-f589a15c479f",
  imageUrl: "/artists/heroes/major-lazer.jpg",
  objectPosition: "center 26%",
  genres: ["Electronic", "Dancehall", "Dance Pop"],
  origin: "Miami, Florida",
  tagline: "Global soundclash energy built to detonate festival mainstages.",
  socials: {
    spotify: "https://open.spotify.com/artist/738wLrAtLtCtFOLvQBXOXp",
    youtube: "https://www.youtube.com/@majorlazer",
    tiktok: "https://www.tiktok.com/@majorlazer",
  },
  whySee: [
    "Lean On live — one of the most-streamed songs ever, in a field with 50,000 people singing every word",
    "A full-blown spectacle: confetti cannons, pyrotechnics, and crowd surfers from minute one",
    "Legendary late-night party set with a decade of festival-proven bangers",
    "You will not stop dancing. This is not a threat.",
  ],
  whatToExpect: [
    "Party atmosphere",
    "Confetti and pyrotechnics",
    "Massive crowd",
    "Bass-heavy sound",
    "Nonstop dancing",
  ],
  bestFor: [
    "Late-night ravers",
    "Dance music lovers",
    "Groups of friends",
    "Party-first festival goers",
  ],
  similarArtists: [
    { name: "DJ Snake", imageUrl: "/artists/avatars/dj-snake.jpg" },
    { name: "J Balvin", imageUrl: "/artists/avatars/j-balvin.jpg" },
    { name: "Skrillex", imageUrl: "/artists/avatars/skrillex.jpg" },
    { name: "Diplo", imageUrl: "/artists/avatars/diplo.jpg" },
  ],
  tracks: [
    {
      name: "Lean On",
      album: "Peace Is The Mission",
      duration: "2:58",
      artworkUrl: "/albums/major-lazer/peace-is-the-mission.png",
    },
    {
      name: "pAPi wiTH tOKisCha",
      album: "pAPi wiTH tOKisCha",
      duration: "2:41",
      artworkUrl: "/albums/major-lazer/papi.jpg",
    },
    {
      name: "Que Calor (feat. J Balvin & El Alfa)",
      album: "Music Is The Weapon",
      duration: "2:49",
      artworkUrl: "/albums/major-lazer/music-is-the-weapon.jpeg",
    },
  ],
  about:
    "Major Lazer is the legendary, genre-blurring electronic music project led by Diplo alongside Walshy Fire and Ape Drums. Born from a deep reverence for Jamaican dancehall and global bass music, the trio has spent nearly two decades bridging cultures and redefining crossover electronic music with chart-topping mega-hits like 'Lean On'. Following their 2025 full-length album 'GYALGEBRA' and explosive 2026 single drops like 'pAPi wiTH tOKisCha', their live performances remain a chaotic, maximalist spectacle—deploying massive pyrotechnics, elite dancers, and a historic catalog of global dance anthems.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "Perry's",
    day: "Friday",
    date: "Jul 31",
    startTime: "8:30 PM",
    endTime: "9:45 PM",
  },
};

const lorde: Artist = {
  name: "Lorde",
  slug: "lorde",
  mbid: "8e494408-8620-4c6a-82c2-c2ca4a1e4f12",
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
  whatToExpect: [
    "Minimalist staging",
    "Emotional singalongs",
    "Stripped-back production",
    "Intense atmosphere",
    "Career-spanning setlist",
  ],
  bestFor: ["Indie pop fans", "Lyric obsessives", "Melodrama stans", "Emotional catharsis"],
  similarArtists: [
    { name: "Billie Eilish", imageUrl: "/artists/avatars/billie-eilish.jpg" },
    { name: "Lana Del Rey", imageUrl: "/artists/avatars/lana-del-rey.jpg" },
    { name: "Halsey", imageUrl: "/artists/avatars/halsey.avif" },
    { name: "Grimes", imageUrl: "/artists/avatars/grimes.png" },
  ],
  tracks: [
    {
      name: "Green Light",
      album: "Melodrama",
      duration: "3:54",
      artworkUrl: "/albums/lorde/melodrama.png",
    },
    {
      name: "Man Of The Year",
      album: "Virgin",
      duration: "3:22",
      artworkUrl: "/albums/lorde/virgin.jpg",
    },
    {
      name: "Ribs",
      album: "Pure Heroine",
      duration: "4:18",
      artworkUrl: "/albums/lorde/pure-heroine.png",
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
    { name: "Yorushika", imageUrl: "/artists/avatars/yorushika.jpg" },
    { name: "Eve", imageUrl: "/artists/avatars/eve.jpg" },
    { name: "Fujii Kaze", imageUrl: "/artists/avatars/fujii-kaze.jpg" },
    { name: "Ado", imageUrl: "/artists/avatars/ado.avif" },
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
    "Intimate and understated",
    "Guitar-led bedroom pop",
    "Small devoted crowd",
    "Emotional specificity",
    "Perfect afternoon set",
  ],
  bestFor: [
    "Bedroom pop fans",
    "Early adopters",
    "Quiet intensity lovers",
    "Emotional afternoon vibe",
  ],
  similarArtists: [
    { name: "Beabadoobee", imageUrl: "/artists/avatars/beabadoobee.jpg" },
    { name: "Gracie Abrams", imageUrl: "/artists/avatars/gracie-abrams.jpg" },
    { name: "Alexander 23", imageUrl: "/artists/avatars/alexander-23.jpg" },
    { name: "Role Model", imageUrl: "/artists/avatars/role-model.jpg" },
  ],
  tracks: [
    {
      name: "back to friends",
      album: "back to friends",
      duration: "2:48",
      artworkUrl: "/albums/sombr/back-to-friends.jpg",
    },
    {
      name: "My Body Isn't Ready",
      album: "My Body Isn't Ready",
      duration: "3:10",
      artworkUrl: "/albums/sombr/my-body-isnt-ready.jpg",
    },
    {
      name: "Homewrecker",
      album: "Homewrecker",
      duration: "2:52",
      artworkUrl: "/albums/sombr/homewrecker.jpg",
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
    spotify: "https://open.spotify.com/artist/3qBi3oNsvDhVfE5VBvfDMR",
    youtube: "https://www.youtube.com/channel/@leonthomas",
    tiktok: "https://www.tiktok.com/@leonthomas",
  },
  whySee: [
    "One of the most naturally gifted vocalists performing anywhere this weekend",
    "MUTT landed as one of 2023's most acclaimed R&B albums — hear it live before it becomes legacy material",
    "An industry insider finally in the spotlight: he's written for Ariana Grande, Ty Dolla $ign, and more",
    "The rare artist who sounds better live — raw, unhurried, completely at ease",
  ],
  whatToExpect: [
    "Soulful live vocals",
    "Warm R&B atmosphere",
    "Intimate crowd energy",
    "Rich layered sound",
    "Industry-insider charisma",
  ],
  bestFor: [
    "R&B fans",
    "Soul lovers",
    "Late-night crowd",
    "Music nerds who follow production credits",
  ],
  similarArtists: [
    { name: "Giveon", imageUrl: "/artists/avatars/giveon.jpg" },
    { name: "Daniel Caesar", imageUrl: "/artists/avatars/daniel-caesar.jpg" },
    { name: "Brent Faiyaz", imageUrl: "/artists/avatars/brent-faiyaz.jpg" },
    { name: "Lucky Daye", imageUrl: "/artists/avatars/lucky-daye.jpg" },
  ],
  tracks: [
    {
      name: "YES IT IS",
      album: "YES IT IS",
      duration: "3:14",
      artworkUrl: "/albums/leon-thomas/yes-it-is.png",
    },
    { name: "MUTT", album: "MUTT", duration: "3:32", artworkUrl: "/albums/leon-thomas/mutt.png" },
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

const johnSummit: Artist = {
  name: "John Summit",
  slug: "john-summit",
  mbid: "2547c5e3-314c-4332-981d-f18c902a4086",
  imageUrl: "/artists/heroes/john-summit.jpg",
  objectPosition: "center 20%",
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
    "Driving house music",
    "Extended DJ set",
    "Massive late-night energy",
    "Relentless build and release",
    "Club-to-festival scale sound",
  ],
  bestFor: [
    "House music fans",
    "Late-night ravers",
    "Electronic music lovers",
    "Groups who want to dance all night",
  ],
  similarArtists: [
    { name: "Fisher", imageUrl: "/artists/avatars/fisher.avif" },
    { name: "Chris Lake", imageUrl: "/artists/avatars/chris-lake.jpg" },
    { name: "Eric Prydz", imageUrl: "/artists/avatars/eric-prydz.jpg" },
    { name: "Skrillex", imageUrl: "/artists/avatars/skrillex.jpg" },
  ],
  tracks: [
    {
      name: "Where You Are",
      album: "Comfort In Chaos",
      duration: "3:52",
      artworkUrl: "/albums/john-summit/comfort-in-chaos.jpg",
    },
    {
      name: "ALL THE TIME",
      album: "CTRL ESCAPE",
      duration: "3:08",
      artworkUrl: "/albums/john-summit/ctrl-escape.jpg",
    },
    {
      name: "Shiver",
      album: "Comfort In Chaos",
      duration: "3:58",
      artworkUrl: "/albums/john-summit/comfort-in-chaos.jpg",
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

const charliXcx: Artist = {
  name: "Charli XCX",
  slug: "charli-xcx",
  mbid: "260b6184-8828-48eb-945c-bc4cb6fc34ca",
  imageUrl: "/artists/heroes/charli-xcx.jpg",
  objectPosition: "center 20%",
  genres: ["Pop", "Hyperpop", "Electropop"],
  origin: "Cambridge, England",
  tagline: "The avant-pop icon rewriting the rules of music, fashion, and film.",
  socials: {
    spotify: "https://open.spotify.com/artist/25uiPmTg16RbhZWAqwLBy5",
    youtube: "https://www.youtube.com/@charlixcx",
    tiktok: "https://www.tiktok.com/@charlixcx",
  },
  whySee: [
    "brat was the defining album of its summer — see it become a live phenomenon",
    "One of the most boundary-pushing pop performers working today, with a genuinely iconoclastic vision",
    "A live show that's equal parts chaotic, gorgeous, and completely unhinged — in the best way",
    "She's been ahead of the curve for a decade. The rest of the world finally caught up.",
  ],
  whatToExpect: [
    "High-energy pop chaos",
    "Fashion-forward production",
    "Massive crowd singalongs",
    "Hyperpop and classic cuts",
    "Irreverent and electrifying atmosphere",
  ],
  bestFor: ["Pop fans", "Hyperpop heads", "Fashion-forward crowd", "Anyone who had a brat summer"],
  similarArtists: [
    { name: "Caroline Polachek", imageUrl: "/artists/avatars/caroline-polachek.jpg" },
    { name: "Kim Petras", imageUrl: "/artists/avatars/kim-petras.jpg" },
    { name: "Arca", imageUrl: "/artists/avatars/arca.jpg" },
    { name: "Troye Sivan", imageUrl: "/artists/avatars/troye-sivan.jpg" },
  ],
  tracks: [
    { name: "360", album: "BRAT", duration: "2:13", artworkUrl: "/albums/charli-xcx/brat.jpg" },
    {
      name: "Wink Wink",
      album: "Music, Fashion, Film",
      duration: "3:17",
      artworkUrl: "/albums/charli-xcx/brat.jpg",
    },
    {
      name: "Guess featuring billie eilish",
      album: "Brat and it's completely different but also still brat",
      duration: "3:00",
      artworkUrl: "/albums/charli-xcx/sucker.png",
    },
  ],
  about:
    "Charli XCX has spent a decade operating at the bleeding edge of pop, writing massive hits for others while building one of the most adventurous solo catalogues in the genre. Her 2024 album 'BRAT' arrived as a cultural watershed—a neon-green, uncompromising collection that defined a global aesthetic and earned universal critical acclaim. Now, with the launch of her highly anticipated 2026 multimedia studio album 'Music, Fashion, Film', she performs like a true vanguard who continues to stay miles ahead of the pop curve.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Headliner",
    stage: "T-Mobile",
    day: "Friday",
    date: "Jul 31",
    startTime: "8:40 PM",
    endTime: "10:00 PM",
  },
};

const smashingPumpkins: Artist = {
  name: "The Smashing Pumpkins",
  slug: "smashing-pumpkins",
  mbid: "ba0d6274-db14-4ef5-b28d-657ebde1a396",
  imageUrl: "/artists/heroes/the-smashing-pumpkins.jpg",
  objectPosition: "center 20%",
  genres: ["Alternative Rock", "Grunge", "Shoegaze"],
  origin: "Chicago, Illinois",
  tagline: "Despite all my rage.",
  socials: {
    spotify: "https://open.spotify.com/artist/40Yq4vzPs9VNUrIBG5Jr2i",
    youtube: "https://www.youtube.com/@smashingpumpkins",
    tiktok: "https://www.tiktok.com/@thesmashingpumpkins",
  },
  whySee: [
    "One of the greatest rock catalogues of the 1990s, performed by the band that built it",
    "Billy Corgan's guitar sound is singular — there is nothing else like it on any stage this weekend",
    "Siamese Dream and Mellon Collie live: the songs that shaped a generation of alternative music fans",
    "Epic, marathon sets — they have nothing to prove and everything to perform",
  ],
  whatToExpect: [
    "Massive alternative rock",
    "Career-spanning setlist",
    "Extended guitar builds",
    "High volume and intensity",
    "90s nostalgia at festival scale",
  ],
  bestFor: ["Alternative rock fans", "90s music lovers", "Guitar devotees", "Festival veterans"],
  similarArtists: [
    { name: "Radiohead", imageUrl: "/artists/avatars/radiohead.jpg" },
    { name: "Soundgarden", imageUrl: "/artists/avatars/soundgarden.jpg" },
    { name: "Nine Inch Nails", imageUrl: "/artists/avatars/nine-inch-nails.jpg" },
    { name: "My Chemical Romance", imageUrl: "/artists/avatars/my-chemical-romance.jpg" },
  ],
  tracks: [
    {
      name: "Bullet with Butterfly Wings",
      album: "Mellon Collie and the Infinite Sadness",
      duration: "4:18",
      artworkUrl: "/albums/the-smashing-pumpkins/mellon-collie-and-the-infinite-sadness.jpg",
    },
    {
      name: "1979",
      album: "Mellon Collie and the Infinite Sadness",
      duration: "4:26",
      artworkUrl: "/albums/the-smashing-pumpkins/mellon-collie-and-the-infinite-sadness.jpg",
    },
    {
      name: "Tonight, Tonight",
      album: "Mellon Collie and the Infinite Sadness",
      duration: "4:14",
      artworkUrl: "/albums/the-smashing-pumpkins/mellon-collie-and-the-infinite-sadness.jpg",
    },
  ],
  about:
    "The Smashing Pumpkins are one of the definitive rock bands of the 1990s. Formed in Chicago by Billy Corgan, the band built a sound that combined massively layered, distorted guitars with introspective lyricism and unexpected melodic beauty. Albums like Siamese Dream and Mellon Collie and the Infinite Sadness stand as milestones of alternative rock — dense, ambitious, and emotionally enormous. Their live shows are events: loud, long, and performed with the urgency of musicians who have spent decades earning their stage.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Headliner",
    stage: "Bud Light",
    day: "Friday",
    date: "Jul 31",
    startTime: "8:30 PM",
    endTime: "10:00 PM",
  },
};

const oliviaDean: Artist = {
  name: "Olivia Dean",
  slug: "olivia-dean",
  mbid: "15e0d608-0869-429b-898d-3d8db3ecedd5",
  imageUrl: "/artists/heroes/olivia-dean.jpg",
  objectPosition: "center 20%",
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
  whatToExpect: [
    "Soul and R&B warmth",
    "Exceptional live vocals",
    "Full live soul band with horns",
    "Joyful crowd atmosphere",
    "Intimate connection on a big stage",
  ],
  bestFor: [
    "Soul and R&B fans",
    "Fans of British pop",
    "Anyone who loves great singing",
    "Afternoon crowd",
  ],
  similarArtists: [
    { name: "Lianne La Havas", imageUrl: "/artists/avatars/lianne-la-havas.jpg" },
    { name: "Jorja Smith", imageUrl: "/artists/avatars/jorja-smith.jpg" },
    { name: "Joy Crookes", imageUrl: "/artists/avatars/joy-crookes.jpg" },
    { name: "Celeste", imageUrl: "/artists/avatars/celeste.png" },
  ],
  tracks: [
    {
      name: "Man I Need",
      album: "The Art of Loving",
      duration: "3:02",
      artworkUrl: "/albums/olivia-dean/messy.png",
    },
    {
      name: "So Easy (To Fall In Love)",
      album: "The Art of Loving",
      duration: "3:14",
      artworkUrl: "/albums/olivia-dean/messy.png",
    },
    { name: "Dive", album: "Messy", duration: "3:28", artworkUrl: "/albums/olivia-dean/messy.png" },
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
    { name: "Olivia Rodrigo", imageUrl: "/artists/avatars/olivia-rodrigo.jpg" },
    { name: "Sabrina Carpenter", imageUrl: "/artists/avatars/sabrina-carpenter.jpg" },
    { name: "Dua Lipa", imageUrl: "/artists/avatars/dua-lipa.jpg" },
    { name: "Ariana Grande", imageUrl: "/artists/avatars/ariana-grande.jpg" },
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
    { name: "Beach House", imageUrl: "/artists/avatars/beach-house.jpg" },
    { name: "James Blake", imageUrl: "/artists/avatars/james-blake.jpg" },
    { name: "Bon Iver", imageUrl: "/artists/avatars/bon-iver.jpg" },
    { name: "London Grammar", imageUrl: "/artists/avatars/london-grammar.avif" },
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
    { name: "BLACKPINK", imageUrl: "/artists/avatars/blackpink.png" },
    { name: "NewJeans", imageUrl: "/artists/avatars/newjeans.jpg" },
    { name: "TWICE", imageUrl: "/artists/avatars/twice.jpg" },
    { name: "IVE", imageUrl: "/artists/avatars/ive.png" },
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

const empireOfTheSun: Artist = {
  name: "Empire of the Sun",
  slug: "empire-of-the-sun",
  genres: ["Electronic", "Synth-Pop", "Indie Pop"],
  origin: "Sydney, Australia",
  tagline: "Theatrical cosmic pop that turns every festival into a spectacle.",
  socials: {},
  whySee: [
    "A multi-sensory visual odyssey featuring high-concept choreography, legendary cinematic costumes, and otherworldly lighting architecture",
    "The grand festival return of one of electronic pop's most legendary live acts, armed with multi-platinum legacy stadium anthems",
    "Hear the soaring, transformative live debuts of their highly anticipated 2024 studio return, Ask That God, under the sunset skyline",
    "An pure shot of celebratory, outdoor festival escapism that unifies tens of thousands of fans into one dancing crowd",
  ],
  whatToExpect: [
    "Theatrical stage costumes",
    "Massive electronic singalongs",
    "Surreal cinematic visual loops",
    "High-energy festival energy",
  ],
  bestFor: [
    "Electronic pop fans",
    "Visual theater lovers",
    "Sunset golden hour dancers",
    "Legacy anthem hunters",
    "High-octane crowds",
  ],
  similarArtists: [],
  tracks: [
    { name: "Walking on a Dream", album: "Walking on a Dream", duration: "" },
    { name: "We Are the People", album: "Walking on a Dream", duration: "" },
    { name: "Changes", album: "Ask That God", duration: "" },
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
  genres: ["Indie Rock", "Post-Punk"],
  origin: "Isle of Wight, UK",
  tagline: "Dry wit, big riffs, and the best debut in recent memory.",
  socials: {},
  whySee: [
    "Witness the sharp, live evolution of a two-time Grammy-winning powerhouse expanding their signature indie sound on the mainstage",
    "The global festival premiere of their razor-sharp, critically acclaimed 2025 sophomore studio triumph, Moisturizer",
    "A masterclass in dry, sarcastic British wit matched with massive, fuzzed-out indie rock guitar riffs",
    "Unrivaled crowd momentum fueled by explosive, viral indie staples like 'Chaise Longue' and 'Wet Dream'",
  ],
  whatToExpect: [
    "Deadpan vocal delivery",
    "Heavy roaring guitar riffs",
    "Infectious indie dance floors",
    "Witty tongue-in-cheek lyrics",
  ],
  bestFor: [
    "Indie rock traditionalists",
    "Post-punk revival stans",
    "Fans of dry lyrical wit",
    "Afternoon mainstage music fans",
    "Guitar music lovers",
  ],
  similarArtists: [],
  tracks: [
    { name: "Chaise Longue", album: "Wet Leg", duration: "" },
    { name: "Wet Dream", album: "Wet Leg", duration: "" },
    { name: "CPR", album: "Moisturizer", duration: "" },
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
  genres: ["Drum and Bass"],
  origin: "United Kingdom",
  tagline: "Drum and bass' biggest names, B2B, all night.",
  socials: {},
  whySee: [
    "Four of drum and bass' absolute elite titans sharing one single stage in a fluid, relentless four-way B2B performance",
    "The standard-bearers of modern UK dancefloor culture delivering the heaviest bass-heavy set of the entire weekend",
    "Sub Focus, Dimension, Culture Shock, and 1991 are individually festival headliners — together they're something else entirely",
    "An absolute adrenaline-fueled masterclass in hyper-precise electronic sound design, tension, and massive structural bass releases",
  ],
  whatToExpect: [
    "Relentless four-way mixing",
    "Heavy underground dancefloor bass",
    "Massive laser field arrays",
    "Nonstop peak-time velocity",
  ],
  bestFor: [
    "Drum and bass purists",
    "Late-night warehouse ravers",
    "High-velocity dance seekers",
    "Electronic music lovers",
    "Sound design nerds",
  ],
  similarArtists: [],
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
  genres: ["R&B", "Soul", "Art-Pop"],
  origin: "London, UK",
  tagline: "Genre-fluid R&B from New York's most restlessly creative artist.",
  socials: {},
  whySee: [
    "Dev Hynes' first extensive live festival outing in over six years, bringing an elite alternative collective to Grant Park",
    "A live rendering of his gorgeous, star-studded 2025 masterpiece Essex Honey, blending despondent bliss with lush instrumentation",
    "Experience the genre-fluid genius of an avant-garde mastermind who has written and produced for pop's top tier royalty",
    "Deeply cinematic, soulful indie arrangements that act as a gorgeous, intimate emotional oasis amid festival chaos",
  ],
  whatToExpect: [
    "Lush alternative R&B grooves",
    "Cinematic instrumental setups",
    "Intimate vulnerable vocal runs",
    "Sophisticated avant-garde jazz",
  ],
  bestFor: [
    "Alternative R&B purists",
    "Lovers of deep songwriting",
    "Vibe-focused afternoon loungers",
    "Indie music fans",
    "Production credit followers",
  ],
  similarArtists: [],
  tracks: [
    { name: "Champagne Coast", album: "Coastal Grooves", duration: "" },
    { name: "You're Not Good Enough", album: "Cupid Deluxe", duration: "" },
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
  genres: ["Pop Punk", "Pop Rock"],
  origin: "Sydney, Australia",
  tagline: "Four friends from Sydney who've grown up on stage.",
  socials: {},
  whySee: [
    "A seasoned, stadium-proven live outfit celebrating fifteen years of explosive anthems on a massive mainstage scale",
    "Hear the live premiere of their clever, self-aware 2025 sixth studio effort, Everyone's a Star!",
    "Unrivaled crowd singalongs driven by massive global generation-defining radio chart-toppers like 'Youngblood'",
    "High-energy pop-punk grit seamlessly married to exceptionally tight, polished modern rock musicianship",
  ],
  whatToExpect: [
    "Massive stadium pop singalongs",
    "High-octane pop-punk energy",
    "Polished arena production scale",
    "Tight multi-part vocal harmonies",
  ],
  bestFor: [
    "Pop-punk nostalgia lovers",
    "Mainstream rock devotees",
    "Massive group singalong seekers",
    "High-visibility mainstage crowds",
    "Pop music lovers",
  ],
  similarArtists: [],
  tracks: [
    { name: "She Looks So Perfect", album: "5 Seconds of Summer", duration: "" },
    { name: "Youngblood", album: "Youngblood", duration: "" },
    { name: "Teeth", album: "CALM", duration: "" },
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
  genres: ["House", "Speed Garage"],
  origin: "Galway, Ireland",
  tagline: "Big-hearted house anthems built for the floor.",
  socials: {},
  whySee: [
    "Ireland's premier electronic export brings a raw, high-tempo speed garage assault straight to the Perry's tent",
    "The official tour run of his heavy, critically acclaimed late-2025 debut studio album statement, Archangel",
    "Furious, fast-paced rhythm blocks designed purely to push underground club culture into massive festival crowds",
    "Endorsed by heavy hitters globally, it stands as an elite option for absolute, raw electronic dancefloor momentum",
  ],
  whatToExpect: [
    "Driving speed garage loops",
    "Gritty UK club basslines",
    "High-velocity house grooves",
    "Raw unadulterated tent energy",
  ],
  bestFor: [
    "Speed garage house purists",
    "Underground club devotees",
    "Ravers hunting heavy bass",
    "Early afternoon tent starters",
    "Electronic music lovers",
  ],
  similarArtists: [],
  tracks: [
    { name: "B. O. D. Y.", album: "Bucklyn Bridge", duration: "" },
    { name: "Archangel", album: "Archangel", duration: "" },
    { name: "If U Want My Heart", album: "Archangel", duration: "" },
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
  genres: ["Post-Punk", "Garage Rock"],
  origin: "Stockholm, Sweden",
  tagline: "Controlled post-punk chaos, weaponized humor, and raw underground energy.",
  socials: {},
  whySee: [
    "Stockholm's most feral post-punk outfit delivering a chaotic, satirical live show unmatched anywhere else on the bill",
    "The premier festival showcase of their independent, punk-infused 2025 studio record, viagr aboys",
    "Frontman Sebastian Murphy's unmatched, completely unhinged deadpan swagger and theatrical crowd command",
    "A blistering, saxophone-fueled rock engine that transforms traditional mosh pits into performance art spectacles",
  ],
  whatToExpect: [
    "Feral post-punk instrumentation",
    "Biting dark satirical delivery",
    "Blistering fast saxophone riffs",
    "Completely unpredictable stage antics",
  ],
  bestFor: [
    "Post-punk garage rock heads",
    "Devotees of chaotic performance",
    "Mosh pit veterans",
    "Fans of dark humor",
    "Alternative rock fans",
  ],
  similarArtists: [],
  tracks: [
    {
      name: "Sports",
      album: "Street Worms",
      duration: "3:58",
      artworkUrl: "/albums/viagra-boys/street-worms.jpg",
    },
    {
      name: "Man Made of Meat",
      album: "viagr aboys",
      duration: "3:14",
      artworkUrl: "/albums/viagra-boys/viagr-aboys.jpg",
    },
    {
      name: "Uno II",
      album: "viagr aboys",
      duration: "3:02",
      artworkUrl: "/albums/viagra-boys/viagr-aboys.jpg",
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
  genres: ["Indie Pop", "Singer-Songwriter"],
  origin: "Los Angeles, California",
  tagline:
    "Witty, wordy stream-of-consciousness pop music that plays out like voice memos from your funniest friend.",
  socials: {},
  whySee: [
    "Catch a hyper-gifted pop writer making her highly anticipated festival debut after co-writing Gracie Abrams' biggest hits",
    "Hear the live execution of her brilliant, critically beloved 2025 RCA Records solo debut, Who's the Clown?",
    "The rare songwriter who can make a lyric feel like a voice memo you sent at 2am — instantly relatable, painfully specific",
    "Sharp, self-aware stage banter that makes a big outdoor crowd feel like a small living room show",
  ],
  whatToExpect: [
    "Intimate confessional lyricism",
    "Wordy hyper-specific indie pop",
    "Charming self-aware stage banter",
    "Warm emotional afternoon crowd",
  ],
  bestFor: [
    "Lyric songwriting obsessives",
    "Fans of contemporary bedroom pop",
    "Early breakout talent seekers",
    "Intimate storyteller set lovers",
    "Indie pop music fans",
  ],
  similarArtists: [],
  tracks: [
    { name: "Sue Me", album: "Who's the Clown?", duration: "" },
    { name: "Bowling Alley", album: "Who's the Clown?", duration: "" },
    { name: "Wet Hair", album: "Who's the Clown?", duration: "" },
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
  genres: ["Witch House", "Electroclash", "Electronic"],
  origin: "Detroit, Michigan",
  tagline: "Frenetic, blown-out electroclash born in the internet underground.",
  socials: {},
  whySee: [
    "The absolute peak of the modern electronic underground crossing over into an explosive, boundary-pushing tent environment",
    "Tatiana Schwaninger's completely detached, hypnotic vocals riding underneath Graham Perez's brutally heavy, corrupted electronic production",
    "Experience a cult-favorite internet phenomenon that has rapidly grown into one of the most talked-about live underground projects",
    "A blistering, unapologetic wall of fuzzed-out industrial energy that makes standard club sets look soft by comparison",
  ],
  whatToExpect: [
    "Blown-out industrial bass",
    "Hypnotic detached vocals",
    "Aggressive strobe lighting",
    "Frenetic cyberpunk energy",
  ],
  bestFor: [
    "Electroclash club traditionalists",
    "Underground witch house purists",
    "Cyberpunk aesthetic obsessives",
    "Late-night warehouse ravers",
    "High-velocity dance seekers",
  ],
  similarArtists: [],
  tracks: [
    { name: "Under Your Spell", album: "April Mixtape 3", duration: "" },
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
  genres: ["High-Tech Minimal", "Techno"],
  origin: "Ludwigshafen, Germany",
  tagline: "The masked maestro of hypnotic, stadium-scale high-tech minimal.",
  socials: {},
  whySee: [
    "The absolute pioneer of 'High-Tech Minimal' delivering a hyper-precise, calculated club sermon directly to Grant Park",
    "His iconic, theatrical Venetian Joker mask performance framing a deeply hypnotic audio-visual stage landscape",
    "A rare festival appearance from a global techno titan renowned for playing massive, multi-hour headline arena sets across Europe",
    "Experience incredibly patient, complex minimal techno infrastructure that delivers massive, earth-shaking low-end bass pay-offs",
  ],
  whatToExpect: [
    "Hypnotic minimalist techno structures",
    "Theatrical Venetian mask showmanship",
    "Intricate melodic progression arcs",
    "Deeply sub-heavy bass drops",
  ],
  bestFor: [
    "High-tech minimal traditionalists",
    "European techno purists",
    "Late-night electronic club veterans",
    "Sound design infrastructure nerds",
    "Hypnotic repetition seekers",
  ],
  similarArtists: [],
  tracks: [
    { name: "Gravity", album: "Space Diver", duration: "" },
    { name: "Purple Noise", album: "Feuerfalter Part02", duration: "" },
    { name: "Spacewalker", album: "Space Diver", duration: "" },
  ],
  about:
    "Boris Brejcha is a legendary German DJ and producer who has spent two decades operating at the vanguard of electronic music, single-handedly conceptualizing the 'High-Tech Minimal' sub-genre. Characterized by intricate percussive architecture, soaring cinematic synth melodies, and an unyielding techno pulse, Brejcha commands stages across the globe wearing his signature carnival mask. Backed by an extensive catalog of dark masterpiece albums like 'Space Diver', his live performances are masterfully calculated, high-production journeys tailored for massive electronic crowds.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
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
  genres: ["Dark Folk", "Indie Pop", "Chamber Pop"],
  origin: "Derbyshire, England",
  tagline: "Visceral, mythological dark folk built on fierce emotional catharsis.",
  socials: {},
  whySee: [
    "A deeply theatrical, folklore-inspired performance that acts as a beautifully dark, haunting oasis on the line-up",
    "Experience the raw, bone-chilling crowd energy during her massive, viral feminist anthem 'labor' live in a festival setting",
    "Stunning, rich chamber-pop arrangements tracking complex themes of grief, bodily autonomy, and mythological fury",
    "The official festival tour run introducing her highly anticipated, deeply personal debut studio statement, Cacophony",
  ],
  whatToExpect: [
    "Haunting operatic vocal ranges",
    "Poetic dark-folk arrangements",
    "Intense communal crowd catharsis",
    "Gothic mythological visual cues",
  ],
  bestFor: [
    "Gothic alternative folk enthusiasts",
    "Lyric and narrative obsessives",
    "Chamber pop music lovers",
    "Breakout songwriter talent seekers",
    "Intimate emotional story devotees",
  ],
  similarArtists: [],
  tracks: [
    { name: "labor", album: "Cacophony", duration: "" },
    { name: "yours", album: "Cacophony", duration: "" },
    { name: "as good a reason", album: "Cacophony", duration: "" },
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
  genres: ["Hip-Hop", "Conscious Rap", "Neo-Soul"],
  origin: "London, England",
  tagline: "One of the absolute greatest lyricists alive delivering pure live mastery.",
  socials: {},
  whySee: [
    "A blistering, career-defining masterclass in pure structural lyricism backed by an elite live multi-instrumental ensemble",
    "Hear the sweeping, cinematic live cuts from her critically acclaimed 2024 full-length masterpiece, Drop 7",
    "Unmatched theatrical stage command that shifts effortlessly from aggressive, rapid-fire flows to introspective soul grooves",
    "A legendary performer operating at the absolute absolute peak of her powers, commanding mainstage festival authority",
  ],
  whatToExpect: [
    "Razor-sharp live flows",
    "Elite live instrumentation",
    "Cinematic orchestral backdrops",
    "Intense poetic command",
  ],
  bestFor: [
    "Hip-hop traditionalists",
    "Lyric and narrative obsessives",
    "Live music purists",
    "Fans of alternative soul",
    "Mainstage festival crowds",
  ],
  similarArtists: [],
  tracks: [
    { name: "Gorilla", album: "No Thank You", duration: "" },
    { name: "Introvert", album: "Sometimes I Might Be Introvert", duration: "" },
    { name: "Mood Swings", album: "Drop 7", duration: "" },
  ],
  about:
    "Little Simz is the moniker of Simbiatu Ajikawo, a London-born rapper, songwriter, and actress whose uncompromising independent path has established her as one of hip-hop's most revered modern vanguards. Following the widespread critical masterpiece of 'Sometimes I Might Be Introvert'—which secured her a Mercury Prize—her evolution into 2024's club-ready electronic textures on 'Drop 7' showcased a restlessly creative artist who refuses to sit in one lane. Backed by a full live jazz-soul band, her live set is a deeply emotional, monumental tour de force of narrative performance.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
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
  genres: ["Indie Pop", "Country Pop", "Alternative Folk"],
  origin: "Dublin, Ireland",
  tagline: "High-camp pop anthems matched with devastating, razor-sharp heartbreak storytelling.",
  socials: {},
  whySee: [
    "The undisputed pop-country princess of Ireland delivering the funniest, most emotionally raw camp spectacle of the weekend",
    "Ciara Mary-Alice Thompson's jaw-dropping, operatic vocal range that completely commands giant festival fields",
    "Brilliant, tragi-comic anthem layouts that feel simultaneously like a massive Dolly Parton show and a chaotic indie pop party",
    "A deeply passionate live environment fueled by elite storytelling, line dancing, and collective crowd catharsis",
  ],
  whatToExpect: [
    "High-camp pop choreography",
    "Devastating heartbreak country ballads",
    "Hilarious theatrical stage banter",
    "Massive group singalongs",
  ],
  bestFor: [
    "Alternative country enthusiasts",
    "Fans of witty pop camp",
    "Lyric and narrative obsessives",
    "Indie pop music lovers",
    "Early afternoon discovery seekers",
  ],
  similarArtists: [],
  tracks: [
    { name: "I Don't Really Care For You", album: "If My Wife New I Was Dead", duration: "" },
    { name: "Stay For Something", album: "Crazymad, For Me", duration: "" },
    { name: "California", album: "Crazymad, For Me", duration: "" },
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
  genres: ["Electro House", "Techno", "Industrial Electronic"],
  origin: "Berlin, Germany",
  tagline:
    "Industrial Berlin techno and distorted punk energy designed to shatter warehouse dance floors.",
  socials: {},
  whySee: [
    "A legendary titan of underground electronic music delivering a blistering, high-velocity audio-visual assault to the Perry's tent",
    "Experience his historic, heavy-hitting club staples alongside brand-new, unreleased electronic studio cut collaborations",
    "A relentless masterclass in modular hardware manipulation, metallic techno grooves, and distorted punk rock pacing",
    "The absolute ultimate alternative electronic set for ravers looking for raw industrial muscle over commercial pop EDM",
  ],
  whatToExpect: [
    "Distorted warehouse techno loops",
    "Frenetic industrial laser arrays",
    "Heavy modular hardware transitions",
    "Nonstop maximum velocity momentum",
  ],
  bestFor: [
    "Industrial techno traditionalists",
    "Berlin club culture purists",
    "Late-night hard dance ravers",
    "Electronic production gear nerds",
    "High-velocity energy seekers",
  ],
  similarArtists: [],
  tracks: [
    { name: "XTC", album: "Out of the Black", duration: "" },
    { name: "Fine Baseline", album: "Mayday", duration: "" },
    { name: "Chamber", album: "Strictly Raw Vol. 2", duration: "" },
  ],
  about:
    "Alex Ridha, performing under the iconic moniker Boys Noize, has spent two decades standing as one of global electronic music's most influential and restlessly creative underground forces. Emerging from the anarchic Berlin club network, his raw, distortion-heavy brand of electro house and techno completely rewrote the rules of crossover electronic music. From running his legendary Boysnoize Records label to producing for avant-garde heavyweights like Arca, Frank Ocean, and Skrillex, his live festival environments remain chaotic, blindingly strobe-lit masterclasses in pure analog club energy.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
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
  genres: ["Indie Pop", "Bedroom Pop", "Neo-Psychedelia"],
  origin: "Los Angeles, California",
  tagline: "Glitchy, neon-drenched notebook bedroom pop for late-night drives under palm trees.",
  socials: {},
  whySee: [
    "The absolute internet-favorite sibling duo bringing their hyper-aesthetic, nostalgic indie pop directly to a massive festival setting",
    "Savannah and Brandon Hudson's perfectly synchronized, dreamy vocal lines gliding over lush lo-fi synth instrumentation",
    "Hear the live execution of their gorgeous, genre-fluid 2024 concept EP string, mapping a distinct modern pop landscape",
    "A perfectly curated afternoon vibe check that translates internet aesthetic culture into a beautiful, communal live experience",
  ],
  whatToExpect: [
    "Glitchy retro-futuristic visuals",
    "Dreamy nostalgic pop layers",
    "Lush laptop-pop synth pads",
    "Effortless cool sibling chemistry",
  ],
  bestFor: [
    "Contemporary bedroom pop fans",
    "Lo-fi internet aesthetic lovers",
    "Chill afternoon groove hunters",
    "Indie pop music collectors",
    "Fans of alternative pop melodies",
  ],
  similarArtists: [],
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
  socials: {},
  whySee: [
    "One of the UK garage underground's absolute finest modern technicians commanding an intense, high-energy dance session",
    "Experience a relentless display of syncopated swing rhythms, heavy bassline rollers, and infectious classic vocal chops",
    "Catch a pioneer of the current international electronic groove resurgence during a prime, highly anticipated tent slot",
    "An absolute, non-stop dance accelerator designed perfectly to turn a festival crowd into a boiling warehouse rave",
  ],
  whatToExpect: [
    "Hyper-fast UK garage swing",
    "Heavy rolling bassline steps",
    "Infectious chopped vocal hooks",
    "Nonstop high-velocity club grooves",
  ],
  bestFor: [
    "UK garage and bassline purists",
    "Underground club music devotees",
    "High-velocity electronic dancers",
    "Tent starters hunting bass loops",
    "Electronic music culture lovers",
  ],
  similarArtists: [],
  tracks: [
    { name: "One0Two", album: "Refraction", duration: "" },
    { name: "Ghost", album: "Refraction", duration: "" },
    { name: "Rush", album: "Rush", duration: "" },
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
  socials: {},
  whySee: [
    "Ireland's fastest-rising contemporary folk phenomena bringing an intimate, breathtakingly acoustic experience to Grant Park",
    "Three-part vocal harmonies of jaw-dropping precision singing gorgeous, poetic modern hymns of ordinary Irish life",
    "A stunningly quiet, emotionally enormous oasis on the bill that commands absolute, pin-drop silence from a crowd",
    "The premier festival tour run showcasing the rich, stark instrumentation of their highly celebrated studio catalog",
  ],
  whatToExpect: [
    "Stripped acoustic instrumentation",
    "Flawless three-part harmonies",
    "Deeply poetic narrative stories",
    "Intimate communal crowd atmosphere",
  ],
  bestFor: [
    "Traditional alternative folk fans",
    "Lyric and storytelling obsessives",
    "Acoustic music purists",
    "Intimate emotional set hunters",
    "Afternoon chill seekers",
  ],
  similarArtists: [],
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
  socials: {},
  whySee: [
    "The absolute vanguard of the current Irish acoustic movement making an immensely anticipated debut on the American festival circuit",
    "Eddie Keogh's deeply resonant, earth-shaking baritone vocals cutting right through the open afternoon air of Grant Park",
    "Experience a rapidly escalating independent phenomenon that has built a fierce cult reputation for emotionally overwhelming live sets",
    "A gorgeous, towering wall of acoustic guitar and masterfully layered banjo hooks that makes standard folk acts feel quiet by comparison",
  ],
  whatToExpect: [
    "Resonant baritone vocals",
    "Epic acoustic structures",
    "Cinematic banjo progressions",
    "Intense poetic imagery",
  ],
  bestFor: [
    "Indie folk purists",
    "Lyric and narrative obsessives",
    "Acoustic music traditionalists",
    "Early afternoon discovery seekers",
    "Alternative rock enthusiasts",
  ],
  similarArtists: [],
  tracks: [
    { name: "Eyes Don't Lie", album: "Live From Dublin", duration: "" },
    { name: "Anyway", album: "Anyway", duration: "" },
    { name: "Shadow", album: "Shadow", duration: "" },
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
  genres: ["Hyperpop", "Club", "Electronic"],
  origin: "Central Coast, Australia",
  tagline: "Glitchy, hyper-futuristic club music delivered at terminal velocity.",
  socials: {},
  whySee: [
    "Australia's premier electronic auteur bringing a boundary-pushing, hyper-glossy club sermon directly to the mid-afternoon crowd",
    "Experience an elite display of syncopated percussion blocks, metallic baseline steps, and brilliantly pitch-shifted vocal arrays",
    "A masterclass in avant-garde sound design that bridges left-field bedroom hyperpop with heavy, warehouse-ready techno infrastructure",
    "The absolute blueprint for where electronic pop culture is heading next, delivered by an intensely innovative pioneer",
  ],
  whatToExpect: [
    "Glitchy retro-futuristic loops",
    "Brutal metallic basslines",
    "High-velocity hyperpop swing",
    "Blinding aesthetic visuals",
  ],
  bestFor: [
    "Left-field club traditionalists",
    "Hyperpop culture purists",
    "Electronic production gear nerds",
    "High-velocity energy seekers",
    "Underground electronic collectors",
  ],
  similarArtists: [],
  tracks: [
    { name: "Start Small", album: "Second Nature", duration: "" },
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
  genres: ["Dance Pop", "House", "Electronic"],
  origin: "Paris, France",
  tagline: "Sleek, runway-ready French electronic pop built for the open air.",
  socials: {},
  whySee: [
    "The absolute definition of modern French electronic polish making a high-visibility crossover statement on the mainstage",
    "A perfectly synchronized live-electronic set that balances deep, driving baseline grooves with incredibly infectious vocal hooks",
    "Experience a chic, hyper-stylized dance floor environment that translates European underground club ethos onto an enormous scale",
    "The ultimate high-energy afternoon catalyst designed perfectly to unify a massive, moving festival crowd under the sun",
  ],
  whatToExpect: [
    "Sleek house rhythms",
    "Runway-ready visual loops",
    "Infectious dance-pop choruses",
    "Pristine electronic soundscapes",
  ],
  bestFor: [
    "Dance pop enthusiasts",
    "French house purists",
    "High-visibility mainstage crowds",
    "Afternoon groove hunters",
    "Electronic music culture lovers",
  ],
  similarArtists: [],
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
  socials: {},
  whySee: [
    "Catch a hyper-gifted independent lyricist executing a deeply atmospheric, confessional performance on the BMI stage",
    "Songwriting that lands like an intense, unguarded voice memo tracking the complex textures of young romance and identity",
    "A stunning afternoon oasis that pairs delicate, close-mic'd vocal textures with unexpectedly heavy electronic drops",
    "The official festival tour run introducing her highly celebrated independent studio catalog to a massive live audience",
  ],
  whatToExpect: [
    "Vulnerable vocal runs",
    "Shadow-drenched synth pads",
    "Intimate storyteller banter",
    "Deeply personal lyricism",
  ],
  bestFor: [
    "Contemporary bedroom pop fans",
    "Lyric and narrative obsessives",
    "Intimate emotional set hunters",
    "Chill afternoon groove seekers",
    "Fans of alternative pop",
  ],
  similarArtists: [],
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
  socials: {},
  whySee: [
    "An absolute masterclass in raw, traditional showmanship driven by a generation-defining young guitar virtuoso",
    "Blistering, extended psychedelic blues solos that recall classic rock legends but delivered with a modern indie snarl",
    "Experience an intensely passionate, high-energy live rock engine that completely bypasses processed backing tracks",
    "A rare, guitar-driven underground discovery set that will leave music traditionalists completely floored by the talent",
  ],
  whatToExpect: [
    "Blistering guitar solos",
    "Raw fuzzed-out rock riffs",
    "Soulful bluesy vocals",
    "High-energy power trio pacing",
  ],
  bestFor: [
    "Guitar music purists",
    "Indie rock traditionalists",
    "Surf and psych rock heads",
    "Live instrument devotees",
    "Early afternoon moshers",
  ],
  similarArtists: [],
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
  genres: ["Industrial House", "Dark Techno", "Electronic"],
  origin: "Orange County, California",
  tagline: "Dark, cinematic industrial techno that turns early evenings into warehouse raves.",
  socials: {},
  whySee: [
    "A hyper-dark, cinematic electronic sermon that injects intense, late-night warehouse energy straight into the evening lineup",
    "Sage DeVault's flawless engineering style delivering the most calculated, punishing baseline grooves of the day on Tito's",
    "Experience a masterclass in gothic electronic ambiance, metallic midtempo techno structures, and dark vocal samples",
    "The absolute premier alternative option for electronic fans hunting heavy, stylized atmospheric warehouse tension",
  ],
  whatToExpect: [
    "Punishing industrial bass",
    "Gothic midtempo techno steps",
    "Cinematic dark visual backdrops",
    "Hypnotic electronic pacing",
  ],
  bestFor: [
    "Dark techno purists",
    "Industrial electronic enthusiasts",
    "Ravers hunting heavy bass",
    "Late evening club veterans",
    "Sound design infrastructure nerds",
  ],
  similarArtists: [],
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
  socials: {},
  whySee: [
    "A historic milestone performance as the first-ever Filipino act to grace the Lollapalooza stage, making live music history",
    "Mind-blowing, world-class choreography executed with flawless, military-grade precision across an entirely high-energy set",
    "Pablo, Stell, Ken, Justin, and Josh bringing their legendary multi-octave vocal harmonies live to an intense, dedicated fanbase",
    "An absolute stadium-proven spectacle packed with explosive charisma, seamless dance breakdowns, and soaring pop hooks",
  ],
  whatToExpect: [
    "Hyper-synchronized group choreography",
    "Exceptional live multi-octave vocals",
    "High-fashion cinematic performance staging",
    "Intense, roaring fan-base energy",
  ],
  bestFor: [
    "P-pop and K-pop devotees",
    "Precision dance performance lovers",
    "Mainstream global pop enthusiasts",
    "Monumental historical milestone seekers",
    "High-octane choreography fans",
  ],
  similarArtists: [],
  tracks: [
    { name: "GENTO", album: "PAGTATAG!", duration: "" },
    { name: "MAPA", album: "Pagsibol", duration: "" },
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
  socials: {},
  whySee: [
    "The absolute ultimate alternative live wildcard of the afternoon, delivering an intensely aggressive sonic collision of punk and rap",
    "Ecca Vandal's magnetic, completely untamed stage presence that commands absolute mosh-pit chaos from a crowd",
    "Experience a brilliant, boundary-pushing soundscape that channels the raw energy of Beastie Boys and the heavy distortion of electronic rock",
    "Blistering live vocal delivery backed by razor-sharp instrumentation designed purely to shock and awaken the senses",
  ],
  whatToExpect: [
    "Aggressive heavy guitar distortion",
    "Ferocious rap-rock vocal delivery",
    "Explosive main-field mosh pits",
    "High-octane alternative electronic beats",
  ],
  bestFor: [
    "Riot-grrrl punk purists",
    "Alternative hip-hop enthusiasts",
    "Devotees of chaotic stage performance",
    "Mosh pit traditionalists",
    "High-velocity rock seekers",
  ],
  similarArtists: [],
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
  socials: {},
  whySee: [
    "London's premier garage-punk sensation bringing a relentless, hyper-fast guitar assault straight to the Allianz stage",
    "Experience incredibly infectious, melody-heavy punk anthems played at an absolute terminal, breathtaking velocity",
    "A masterclass in traditional analog band energy that channels the rapid-fire hooks of The Ramones with a sharp, modern indie rock snarl",
    "A non-stop, high-octane rock catalyst built around sharp distortion, massive group choruses, and pure adrenaline",
  ],
  whatToExpect: [
    "Hyper-speed punk tempos",
    "Massive melodic garage hooks",
    "Blistering dual-guitar riffs",
    "Relentless nonstop rock pacing",
  ],
  bestFor: [
    "Garage rock traditionalists",
    "Power pop hook fanatics",
    "Punk and indie rock stans",
    "High-energy afternoon moshers",
    "Guitar music purists",
  ],
  similarArtists: [],
  tracks: [
    { name: "Can't Be Happy", album: "Bad Nerves", duration: "" },
    { name: "Baby Drummer", album: "Bad Nerves", duration: "" },
    { name: "Antidote", album: "Still Nervous", duration: "" },
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
  socials: {},
  whySee: [
    "Catch an exceptional independent lyricist executing a deeply atmospheric, storyteller-style performance on the mainstage",
    "Songwriting that lands like an intense, unguarded voice memo tracking the complex vulnerabilities of modern romance",
    "A beautiful, sun-drenched early afternoon oasis that pairs delicate vocal textures with soaring indie pop melodies",
    "The official premier festival tour run showcasing her highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: [
    "Intimate confessional lyricism",
    "Warm organic guitar strums",
    "Charming self-aware stage banter",
    "Lush dreamy vocal arrangements",
  ],
  bestFor: [
    "Lyric and songwriting obsessives",
    "Fans of contemporary bedroom pop",
    "Early afternoon discovery seekers",
    "Intimate emotional story devotees",
    "Indie pop music collectors",
  ],
  similarArtists: [],
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
  socials: {},
  whySee: [
    "Witness one of the most technically gifted, jaw-dropping vocalists performing anywhere across the entire weekend",
    "Faouzia's operatic, powerhouse vocal delivery effortlessly filling the open air with staggering emotional power",
    "A beautifully dramatic, orchestrally layered sonic experience that seamlessly fuses contemporary pop with traditional Moroccan modal textures",
    "Experience the raw, bone-chilling crowd energy driven by intense, massive dark-pop stadium singalongs",
  ],
  whatToExpect: [
    "Stunning three-octave vocal runs",
    "Cinematic dark-pop melodies",
    "Dramatic theatrical stage presence",
    "Richly layered orchestral backdrops",
  ],
  bestFor: [
    "Pop vocal purists",
    "Fans of dramatic dark pop",
    "Chamber pop music lovers",
    "Early afternoon mainstage seekers",
    "Devotees of cinematic storytelling",
  ],
  similarArtists: [],
  tracks: [
    { name: "Tears of Gold", album: "CITIZEN", duration: "" },
    { name: "RIP, Love", album: "CITIZEN", duration: "" },
    { name: "Minefields", album: "Minefields", duration: "" },
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
  socials: {},
  whySee: [
    "The absolute perfect early evening vibe catalyst bringing a hyper-catchy, genre-fluid party directly to the BMI stage",
    "Dreamy, shimmering indie guitar lines gliding effortlessly over crisp, low-slung alternative hip-hop rhythm sections",
    "A loose, remarkably fun and charismatic live performance built specifically to celebrate carefree youth culture",
    "The ultimate sunset groove opportunity designed to get groups of friends dancing as the skyline begins to light up",
  ],
  whatToExpect: [
    "Shimmering indie rock guitar loops",
    "Crisp alternative hip-hop beats",
    "Infectious casual vocal melodies",
    "Upbeat sunset party energy",
  ],
  bestFor: [
    "Indie pop music fans",
    "Alternative hip-hop lovers",
    "Vibe-focused evening dancers",
    "Groups of friends partying",
    "Chill summer melody seekers",
  ],
  similarArtists: [],
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
  socials: {},
  whySee: [
    "The premier live American festival showcase of Sandra Tervonen and Juuso Malin's surreal, feverish bedroom pop universe",
    "Haunting, pitch-perfect vocal textures floating effortlessly over cold, meticulously layered analog synthesizers",
    "Experience a cult-favorite Nordic synth-pop phenomenon hot off the heels of their highly praised studio statement, The Voices Are Coming Back",
    "A gorgeous, intensely atmospheric midday set that transforms the open air into an intimate, dream-like club haven",
  ],
  whatToExpect: [
    "Dreamlike synth soundscapes",
    "Ethereal vocal loops",
    "Surreal cinematic visual backing",
    "Intimate avant-garde club energy",
  ],
  bestFor: [
    "Left-field dream pop fans",
    "Nordic electronic enthusiasts",
    "Lyric and narrative obsessives",
    "Early afternoon discovery seekers",
    "Lo-fi synth-pop collectors",
  ],
  similarArtists: [],
  tracks: [
    { name: "Delusional On Sunset Blvd", album: "The Voices Are Coming Back", duration: "" },
    { name: "Ratgirl", album: "The Voices Are Coming Back", duration: "" },
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
  socials: {},
  whySee: [
    "Catch one of the fastest-rising visionaries of the alternative pop sphere executing a hyper-kinetic, high-energy live band set",
    "Experience the thrilling live execution of his massive 2026 international headline run, The Marvel of The Century! Showtour",
    "A seamless vocal display trading between soulful, low-slung R&B runs and explosive, fuzzed-out indie rock guitar choruses",
    "An absolute catalyst of youthful energy, complete with intense, localized crowd mosh pits on the Bud Light lawn",
  ],
  whatToExpect: [
    "Glitchy retro-futuristic visuals",
    "Explosive guitar-pop hooks",
    "Sultry R&B vocal melodies",
    "High-octane energetic crowd pits",
  ],
  bestFor: [
    "Contemporary bedroom pop fans",
    "Alternative R&B enthusiasts",
    "High-energy afternoon moshers",
    "Internet indie culture purists",
    "Guitar music lovers",
  ],
  similarArtists: [],
  tracks: [
    { name: "desire", album: "desire", duration: "" },
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
  socials: {},
  whySee: [
    "A staggering, beautifully raw live folk-rock engine making an immensely anticipated debut on the Lollapalooza bill",
    "Sweeping, cinematic instrumental arrangements that trade effortlessly between quiet acoustic guitar lines and roaring rock crescendos",
    "Experience deeply poetic storytelling that functions like a stark, emotional essay on the complex vulnerabilities of youth",
    "The official festival tour run highlighting their widely discussed new studio material under the Nettwerk Music banner",
  ],
  whatToExpect: [
    "Rich multi-instrumental layers",
    "Towering emotional rock drops",
    "Intimate confessional vocals",
    "Lush acoustic-folk infrastructure",
  ],
  bestFor: [
    "Indie folk traditionalists",
    "Lyric and narrative obsessives",
    "Alternative rock enthusiasts",
    "Acoustic music purists",
    "Early afternoon discovery seekers",
  ],
  similarArtists: [],
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
  socials: {},
  whySee: [
    "A blistering, high-velocity bass assault bringing intense warehouse electronic energy straight to the mid-day Perry's tent",
    "The product of cousins Tanner and Sylas Morgan executing a flawless live blend of heavy electronic production and sharp verses",
    "Experience a genre-defying performance that pulses with rolling low frequencies woven through alternative rock and hip-hop samples",
    "An absolute, non-stop dance accelerator designed purely to push underground trap culture into massive festival spaces",
  ],
  whatToExpect: [
    "Punishing low-frequency bass",
    "Hyper-precise trap rhythms",
    "Frenetic electronic sound design",
    "Nonstop high-velocity pacing",
  ],
  bestFor: [
    "Trap and future bass purists",
    "Underground club music devotees",
    "High-velocity dance seekers",
    "Tent starters hunting bass loops",
    "Electronic sound design nerds",
  ],
  similarArtists: [],
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
  socials: {},
  whySee: [
    "A rising country standout bringing her highly celebrated Grand Ole Opry debut charisma straight to Grant Park",
    "The official festival tour preview showcasing her debut headlining trek, the I Don't Kiss and Tell, I Kiss and Tour Tour",
    "Razor-sharp country lyrics that trade on absolute emotional honesty, modern wit, and incredible acoustic guitar hooks",
    "A stunning afternoon oasis that pairs traditional acoustic instrumentation with a truly monumental, timeless singing voice",
  ],
  whatToExpect: [
    "Grounded country vocals",
    "Witty tongue-in-cheek lyricism",
    "Charming Southern stage banter",
    "Tight acoustic multi-part layers",
  ],
  bestFor: [
    "Traditional country music purists",
    "Lyric and storytelling obsessives",
    "Fans of alternative folk songwriting",
    "Early afternoon discovery seekers",
    "Intimate emotional set hunters",
  ],
  similarArtists: [],
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
  whatToExpect: [
    "Punishing industrial basslines",
    "Hyper-fast hometown trap flips",
    "Blinding early strobe effects",
    "Nonstop high-velocity mixing",
  ],
  bestFor: [
    "Trap and dubstep traditionalists",
    "Hometown electronic music devotees",
    "High-velocity ravers hunting bass",
    "Early afternoon tent starters",
    "Sound design infrastructure nerds",
  ],
  similarArtists: [],
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
  socials: {},
  whySee: [
    "A massive, highly anticipated hometown showcase performance on the BMI stage celebrating their rapid ascent in the indie world",
    "Vocalist Matt Tilles' raw, soaring vocal delivery cutting through a wall of masterfully layered dual-guitar melodies",
    "Experience the live, energetic debuts of new music from their highly anticipated upcoming studio project, When The Lights Went Out",
    "An absolute masterclass in traditional analog band chemistry that treats giant festival fields like intimate local basement clubs",
  ],
  whatToExpect: [
    "Driving dual-guitar hooks",
    "Soaring alt-rock vocals",
    "Rich folk-rock storytelling",
    "High-energy hometown camaraderie",
  ],
  bestFor: [
    "Indie rock traditionalists",
    "Folk rock enthusiasts",
    "Hometown scene supporters",
    "Guitar music purists",
    "Midday festival field dancers",
  ],
  similarArtists: [],
  tracks: [
    { name: "Talking to Trees", album: "Talking to Trees EP", duration: "" },
    { name: "Who You'd Have Been", album: "Who You'd Have Been", duration: "" },
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
  socials: {},
  whySee: [
    "An absolute dark live wildcard of the evening lineup, delivering an intensely aggressive sonic assault unlike anything else on the bill",
    "Ross Cullen's feral, spoken-word poetic delivery racing over Benedict Goddard's brutally heavy, industrial noise foundations",
    "The official premier American showcase run introducing the towering sonic weight of their debut album statement, Crystalpunk",
    "A blistering, blindingly intense live landscape that completely transforms a festival mosh pit into performance art theater",
  ],
  whatToExpect: [
    "Distorted electronic basslines",
    "Jagged post-punk riffs",
    "Feral spoken-word delivery",
    "Blinding industrial strobe fields",
  ],
  bestFor: [
    "Industrial techno traditionalists",
    "Gothic post-punk heads",
    "Mosh pit veterans",
    "Devotees of chaotic stage performance",
    "Left-field electronic collectors",
  ],
  similarArtists: [],
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
  socials: {},
  whySee: [
    "Catch an exceptional bilingual lyricist bringing a beautifully warm, beach-side indie pop oasis directly to the afternoon lineup",
    "Grossmann's distinctively raspy, soulful vocal delivery wrapping seamlessly around rich, close-mic'd acoustic arrangements",
    "Experience a cult-favorite singer-songwriter celebrated for crafting laid-back, deeply nostalgic anthems that connect across borders",
    "A gorgeously breezy, rhythmic afternoon set designed perfectly to get a crowd moving smoothly under the open sun",
  ],
  whatToExpect: [
    "Raspy soulful vocals",
    "Warm acoustic-folk strums",
    "Low-slung tropical rhythms",
    "Charming bilingual stage banter",
  ],
  bestFor: [
    "Latin indie folk enthusiasts",
    "Lyric and narrative obsessives",
    "Chill afternoon groove hunters",
    "Acoustic music purists",
    "Bilingual song collectors",
  ],
  similarArtists: [],
  tracks: [
    { name: "Ciclo", album: "Ciclo", duration: "" },
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
  socials: {},
  whySee: [
    "An absolute lightning-strike opening set from LA's favorite teen punk quartet executing their massive festival debut",
    "Experience the blisteringly raw, live execution of tracks from their brand-new, ferocious sophomore statement, Trophy Wife",
    "A glorious display of untamed, garage-rock distortion that echoes underground legends like Kim Gordon and Bratmobile",
    "Catch a meteoric, fast-rising live force running on pure analog adrenaline before they completely explode globally",
  ],
  whatToExpect: [
    "Ferocious garage-punk tempos",
    "Abrasive raw vocal snarls",
    "High-energy early mosh mosh",
    "Relentless dual-guitar noise",
  ],
  bestFor: [
    "Riot-grrrl punk purists",
    "Garage rock traditionalists",
    "Underground scene trend spotters",
    "High-energy festival openers",
    "Guitar music devotees",
  ],
  similarArtists: [],
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

export const allArtists: Artist[] = [
  jennie,
  beabadoobee,
  majorLazer,
  lorde,
  yoasobi,
  sombr,
  leonThomas,
  johnSummit,
  charliXcx,
  smashingPumpkins,
  oliviaDean,
  tateMcRae,
  theXx,
  aespa,
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

export const artistsBySlug: Record<string, Artist> = Object.fromEntries(
  allArtists.map((a) => [a.slug, a])
);
