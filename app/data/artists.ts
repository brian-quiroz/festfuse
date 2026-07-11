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
  whatToExpect: ["High-energy choreography", "Large crowd", "Visual production", "Crowd singalongs", "Fashion moments"],
  bestFor: ["K-pop fans", "Pop lovers", "First-time festival goers", "Dancing crowds"],
  similarArtists: [
    { name: "CL", imageUrl: "/artists/avatars/cl.jpg" },
    { name: "Doja Cat", imageUrl: "/artists/avatars/doja-cat.jpg" },
    { name: "Cardi B", imageUrl: "/artists/avatars/cardi-b.png" },
    { name: "BLACKPINK", imageUrl: "/artists/avatars/blackpink.png" }
  ],
  tracks: [
    { name: "Mantra", album: "Ruby", duration: "2:27", artworkUrl: "/albums/jennie/ruby.png" },
    { name: "like JENNIE", album: "Ruby (The Complete Collection)", duration: "2:54", artworkUrl: "/albums/jennie/ruby-collection.jpg" },
    { name: "Dracula - JENNIE Remix", album: "Dracula (Remix)", duration: "3:10", artworkUrl: "/albums/jennie/dracula-remix.jpg" },
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
  whatToExpect: ["Intimate and emotional", "Guitar-driven set", "Heartfelt singalongs", "Smaller crowd", "Afternoon chill"],
  bestFor: ["Indie music fans", "Discovering new artists", "Guitar pop lovers", "Emotional catharsis", "Quiet afternoon crowd"],
  similarArtists: [
    { name: "Mitski", imageUrl: "/artists/avatars/mitski.jpg" },
    { name: "Phoebe Bridgers", imageUrl: "/artists/avatars/phoebe-bridgers.jpg" },
    { name: "Soccer Mommy", imageUrl: "/artists/avatars/soccer-mommy.jpg" },
    { name: "Japanese Breakfast", imageUrl: "/artists/avatars/japanese-breakfast.jpg" }
  ],
  tracks: [
    { name: "the perfect pair", album: "Beatopia", duration: "2:57", artworkUrl: "/albums/beabadoobee/beatopia.png" },
    { name: "All I Did Was Dream of You (feat. The Marías)", album: "Pylon", duration: "3:12", artworkUrl: "/albums/beabadoobee/pylon.jpg" },
    { name: "Beaches", album: "This Is How Tomorrow Moves", duration: "3:42", artworkUrl: "/albums/beabadoobee/this-is-how-tomorrow-moves.jpg" },
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
  whatToExpect: ["Party atmosphere", "Confetti and pyrotechnics", "Massive crowd", "Bass-heavy sound", "Nonstop dancing"],
  bestFor: ["Late-night ravers", "Dance music lovers", "Groups of friends", "Party-first festival goers"],
  similarArtists: [
    { name: "DJ Snake", imageUrl: "/artists/avatars/dj-snake.jpg" },
    { name: "J Balvin", imageUrl: "/artists/avatars/j-balvin.jpg" },
    { name: "Skrillex", imageUrl: "/artists/avatars/skrillex.jpg" },
    { name: "Diplo", imageUrl: "/artists/avatars/diplo.jpg" }
  ],
  tracks: [
    { name: "Lean On", album: "Peace Is The Mission", duration: "2:58", artworkUrl: "/albums/major-lazer/peace-is-the-mission.png" },
    { name: "pAPi wiTH tOKisCha", album: "pAPi wiTH tOKisCha", duration: "2:41", artworkUrl: "/albums/major-lazer/papi.jpg" },
    { name: "Que Calor (feat. J Balvin & El Alfa)", album: "Music Is The Weapon", duration: "2:49", artworkUrl: "/albums/major-lazer/music-is-the-weapon.jpeg" },
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
  whatToExpect: ["Minimalist staging", "Emotional singalongs", "Stripped-back production", "Intense atmosphere", "Career-spanning setlist"],
  bestFor: ["Indie pop fans", "Lyric obsessives", "Melodrama stans", "Emotional catharsis"],
  similarArtists: [
    { name: "Billie Eilish", imageUrl: "/artists/avatars/billie-eilish.jpg" },
    { name: "Lana Del Rey", imageUrl: "/artists/avatars/lana-del-rey.jpg" },
    { name: "Halsey", imageUrl: "/artists/avatars/halsey.avif" },
    { name: "Grimes", imageUrl: "/artists/avatars/grimes.png" },
  ],
  tracks: [
    { name: "Green Light", album: "Melodrama", duration: "3:54", artworkUrl: "/albums/lorde/melodrama.png" },
    { name: "Man Of The Year", album: "Virgin", duration: "3:22", artworkUrl: "/albums/lorde/virgin.jpg" },
    { name: "Ribs", album: "Pure Heroine", duration: "4:18", artworkUrl: "/albums/lorde/pure-heroine.png" },
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
  whatToExpect: ["High-energy J-Pop anthems", "Full live band — not a DJ set", "Massive crowd singalongs", "Cross-cultural discovery", "Viral moments live"],
  bestFor: ["Anime fans", "J-Pop curious listeners", "Pop music lovers", "Discovery seekers"],
  similarArtists: [
    { name: "Yorushika", imageUrl: "/artists/avatars/yorushika.jpg" },
    { name: "Eve", imageUrl: "/artists/avatars/eve.jpg" },
    { name: "Fujii Kaze", imageUrl: "/artists/avatars/fujii-kaze.jpg" },
    { name: "Ado", imageUrl: "/artists/avatars/ado.avif" },
  ],
  tracks: [
    { name: "アイドル", album: "THE BOOK 3", duration: "3:32", artworkUrl: "/albums/yoasobi/the-book-3.png" },
    { name: "夜に駆ける", album: "THE BOOK", duration: "4:21", artworkUrl: "/albums/yoasobi/the-book.jpg" },
    { name: "群青", album: "THE BOOK", duration: "4:08", artworkUrl: "/albums/yoasobi/the-book.jpg" },
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
  whatToExpect: ["Intimate and understated", "Guitar-led bedroom pop", "Small devoted crowd", "Emotional specificity", "Perfect afternoon set"],
  bestFor: ["Bedroom pop fans", "Early adopters", "Quiet intensity lovers", "Emotional afternoon vibe"],
  similarArtists: [
    { name: "Beabadoobee", imageUrl: "/artists/avatars/beabadoobee.jpg" },
    { name: "Gracie Abrams", imageUrl: "/artists/avatars/gracie-abrams.jpg" },
    { name: "Alexander 23", imageUrl: "/artists/avatars/alexander-23.jpg" },
    { name: "Role Model", imageUrl: "/artists/avatars/role-model.jpg" },
  ],
  tracks: [
    { name: "back to friends", album: "back to friends", duration: "2:48", artworkUrl: "/albums/sombr/back-to-friends.jpg" },
    { name: "My Body Isn't Ready", album: "My Body Isn't Ready", duration: "3:10", artworkUrl: "/albums/sombr/my-body-isnt-ready.jpg" },
    { name: "Homewrecker", album: "Homewrecker", duration: "2:52", artworkUrl: "/albums/sombr/homewrecker.jpg" },
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
  whatToExpect: ["Soulful live vocals", "Warm R&B atmosphere", "Intimate crowd energy", "Rich layered sound", "Industry-insider charisma"],
  bestFor: ["R&B fans", "Soul lovers", "Late-night crowd", "Music nerds who follow production credits"],
  similarArtists: [
    { name: "Giveon", imageUrl: "/artists/avatars/giveon.jpg" },
    { name: "Daniel Caesar", imageUrl: "/artists/avatars/daniel-caesar.jpg" },
    { name: "Brent Faiyaz", imageUrl: "/artists/avatars/brent-faiyaz.jpg" },
    { name: "Lucky Daye", imageUrl: "/artists/avatars/lucky-daye.jpg" },
  ],
  tracks: [
    { name: "YES IT IS", album: "YES IT IS", duration: "3:14", artworkUrl: "/albums/leon-thomas/yes-it-is.png" },
    { name: "MUTT", album: "MUTT", duration: "3:32", artworkUrl: "/albums/leon-thomas/mutt.png" },
    { name: "Treasure In The Hills", album: "PHOLKS", duration: "2:54", artworkUrl: "/albums/leon-thomas/pholks.png" },
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
  }
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
  whatToExpect: ["Driving house music", "Extended DJ set", "Massive late-night energy", "Relentless build and release", "Club-to-festival scale sound"],
  bestFor: ["House music fans", "Late-night ravers", "Electronic music lovers", "Groups who want to dance all night"],
  similarArtists: [
    { name: "Fisher", imageUrl: "/artists/avatars/fisher.avif" },
    { name: "Chris Lake", imageUrl: "/artists/avatars/chris-lake.jpg" },
    { name: "Eric Prydz", imageUrl: "/artists/avatars/eric-prydz.jpg" },
    { name: "Skrillex", imageUrl: "/artists/avatars/skrillex.jpg" },
  ],
  tracks: [
    { name: "Where You Are", album: "Comfort In Chaos", duration: "3:52", artworkUrl: "/albums/john-summit/comfort-in-chaos.jpg" },
    { name: "ALL THE TIME", album: "CTRL ESCAPE", duration: "3:08", artworkUrl: "/albums/john-summit/ctrl-escape.jpg" },
    { name: "Shiver", album: "Comfort In Chaos", duration: "3:58", artworkUrl: "/albums/john-summit/comfort-in-chaos.jpg" },
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
  whatToExpect: ["High-energy pop chaos", "Fashion-forward production", "Massive crowd singalongs", "Hyperpop and classic cuts", "Irreverent and electrifying atmosphere"],
  bestFor: ["Pop fans", "Hyperpop heads", "Fashion-forward crowd", "Anyone who had a brat summer"],
  similarArtists: [
    { name: "Caroline Polachek", imageUrl: "/artists/avatars/caroline-polachek.jpg" },
    { name: "Kim Petras", imageUrl: "/artists/avatars/kim-petras.jpg" },
    { name: "Arca", imageUrl: "/artists/avatars/arca.jpg" },
    { name: "Troye Sivan", imageUrl: "/artists/avatars/troye-sivan.jpg" },
  ],
  tracks: [
    { name: "360", album: "BRAT", duration: "2:13", artworkUrl: "/albums/charli-xcx/brat.jpg" },
    { name: "Wink Wink", album: "Music, Fashion, Film", duration: "3:17", artworkUrl: "/albums/charli-xcx/brat.jpg" },
    { name: "Guess featuring billie eilish", album: "Brat and it's completely different but also still brat", duration: "3:00", artworkUrl: "/albums/charli-xcx/sucker.png" },
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
  whatToExpect: ["Massive alternative rock", "Career-spanning setlist", "Extended guitar builds", "High volume and intensity", "90s nostalgia at festival scale"],
  bestFor: ["Alternative rock fans", "90s music lovers", "Guitar devotees", "Festival veterans"],
  similarArtists: [
    { name: "Radiohead", imageUrl: "/artists/avatars/radiohead.jpg" },
    { name: "Soundgarden", imageUrl: "/artists/avatars/soundgarden.jpg" },
    { name: "Nine Inch Nails", imageUrl: "/artists/avatars/nine-inch-nails.jpg" },
    { name: "My Chemical Romance", imageUrl: "/artists/avatars/my-chemical-romance.jpg" },
  ],
  tracks: [
    { name: "Bullet with Butterfly Wings", album: "Mellon Collie and the Infinite Sadness", duration: "4:18", artworkUrl: "/albums/the-smashing-pumpkins/mellon-collie-and-the-infinite-sadness.jpg" },
    { name: "1979", album: "Mellon Collie and the Infinite Sadness", duration: "4:26", artworkUrl: "/albums/the-smashing-pumpkins/mellon-collie-and-the-infinite-sadness.jpg" },
    { name: "Tonight, Tonight", album: "Mellon Collie and the Infinite Sadness", duration: "4:14", artworkUrl: "/albums/the-smashing-pumpkins/mellon-collie-and-the-infinite-sadness.jpg" },
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
  whatToExpect: ["Soul and R&B warmth", "Exceptional live vocals", "Full live soul band with horns", "Joyful crowd atmosphere", "Intimate connection on a big stage"],
  bestFor: ["Soul and R&B fans", "Fans of British pop", "Anyone who loves great singing", "Afternoon crowd"],
  similarArtists: [
    { name: "Lianne La Havas", imageUrl: "/artists/avatars/lianne-la-havas.jpg" },
    { name: "Jorja Smith", imageUrl: "/artists/avatars/jorja-smith.jpg" },
    { name: "Joy Crookes", imageUrl: "/artists/avatars/joy-crookes.jpg" },
    { name: "Celeste", imageUrl: "/artists/avatars/celeste.png" },
  ],
  tracks: [
    { name: "Man I Need", album: "The Art of Loving", duration: "3:02", artworkUrl: "/albums/olivia-dean/messy.png" },
    { name: "So Easy (To Fall In Love)", album: "The Art of Loving", duration: "3:14", artworkUrl: "/albums/olivia-dean/messy.png" },
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
  whatToExpect: ["High-energy dance pop", "Stunning choreography", "Live vocals through full choreography — no safety net", "Massive crowd singalongs", "Polished production"],
  bestFor: ["Pop fans", "Dance lovers", "Anyone who needs to feel something", "Fans of precision performance"],
  similarArtists: [
    { name: "Olivia Rodrigo", imageUrl: "/artists/avatars/olivia-rodrigo.jpg" },
    { name: "Sabrina Carpenter", imageUrl: "/artists/avatars/sabrina-carpenter.jpg" },
    { name: "Dua Lipa", imageUrl: "/artists/avatars/dua-lipa.jpg" },
    { name: "Ariana Grande", imageUrl: "/artists/avatars/ariana-grande.jpg" },
  ],
  tracks: [
    { name: "greedy", album: "THINK LATER.", duration: "2:11", artworkUrl: "/albums/tate-mcrae/think-later.png" },
    { name: "Sports car", album: "So Close To What", duration: "2:37", artworkUrl: "/albums/tate-mcrae/think-later.png" },
    { name: "Revolving door", album: "So Close To What", duration: "3:06", artworkUrl: "/albums/tate-mcrae/all-the-things-i-never-said.jpg" },
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
  whatToExpect: ["Intimate and atmospheric", "Dramatic lighting", "Deeply emotional crowd", "Sparse, gorgeous arrangements", "Headliner scale with chamber music feeling"],
  bestFor: ["Indie music lovers", "Late-night reflective crowd", "Atmospheric music fans", "Anyone who needs to feel things quietly"],
  similarArtists: [
    { name: "Beach House", imageUrl: "/artists/avatars/beach-house.jpg" },
    { name: "James Blake", imageUrl: "/artists/avatars/james-blake.jpg" },
    { name: "Bon Iver", imageUrl: "/artists/avatars/bon-iver.jpg" },
    { name: "London Grammar", imageUrl: "/artists/avatars/london-grammar.avif" },
  ],
  tracks: [
    { name: "Intro", album: "xx", duration: "2:07", artworkUrl: "/albums/the-xx/xx.jpg" },
    { name: "Crystalised", album: "xx", duration: "3:31", artworkUrl: "/albums/the-xx/xx.jpg" },
    { name: "On Hold", album: "I See You", duration: "3:40", artworkUrl: "/albums/the-xx/i-see-you.jpg" },
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
  whatToExpect: ["Synchronized choreography", "High-production visuals", "Bilingual performance (Korean/English)", "Intense fan energy", "Short but stacked set"],
  bestFor: ["K-pop fans", "Pop music lovers", "Fans of concept-driven acts", "Anyone who wants to be converted"],
  similarArtists: [
    { name: "BLACKPINK", imageUrl: "/artists/avatars/blackpink.png" },
    { name: "NewJeans", imageUrl: "/artists/avatars/newjeans.jpg" },
    { name: "TWICE", imageUrl: "/artists/avatars/twice.jpg" },
    { name: "IVE", imageUrl: "/artists/avatars/ive.png" },
  ],
  tracks: [
    { name: "LEMONADE", album: "LEMONADE", duration: "3:37", artworkUrl: "/albums/aespa/lemonade.jpg" },
    { name: "Supernova", album: "Armageddon", duration: "3:01", artworkUrl: "/albums/aespa/supernova.png" },
    { name: "Whiplash", album: "Whiplash", duration: "3:05", artworkUrl: "/albums/aespa/whiplash.png" },
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
    "An pure shot of celebratory, outdoor festival escapism that unifies tens of thousands of fans into one dancing crowd"
  ],
  whatToExpect: ["Theatrical stage costumes", "Massive electronic singalongs", "Surreal cinematic visual loops", "High-energy festival energy"],
  bestFor: ["Electronic pop fans", "Visual theater lovers", "Sunset golden hour dancers", "Legacy anthem hunters", "High-octane crowds"],
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
  }
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
    "Unrivaled crowd momentum fueled by explosive, viral indie staples like 'Chaise Longue' and 'Wet Dream'"
  ],
  whatToExpect: ["Deadpan vocal delivery", "Heavy roaring guitar riffs", "Infectious indie dance floors", "Witty tongue-in-cheek lyrics"],
  bestFor: ["Indie rock traditionalists", "Post-punk revival stans", "Fans of dry lyrical wit", "Afternoon mainstage music fans", "Guitar music lovers"],
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
  }
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
    "An absolute adrenaline-fueled masterclass in hyper-precise electronic sound design, tension, and massive structural bass releases"
  ],
  whatToExpect: ["Relentless four-way mixing", "Heavy underground dancefloor bass", "Massive laser field arrays", "Nonstop peak-time velocity"],
  bestFor: ["Drum and bass purists", "Late-night warehouse ravers", "High-velocity dance seekers", "Electronic music lovers", "Sound design nerds"],
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
  }
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
    "Deeply cinematic, soulful indie arrangements that act as a gorgeous, intimate emotional oasis amid festival chaos"
  ],
  whatToExpect: ["Lush alternative R&B grooves", "Cinematic instrumental setups", "Intimate vulnerable vocal runs", "Sophisticated avant-garde jazz"],
  bestFor: ["Alternative R&B purists", "Lovers of deep songwriting", "Vibe-focused afternoon loungers", "Indie music fans", "Production credit followers"],
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
  }
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
    "High-energy pop-punk grit seamlessly married to exceptionally tight, polished modern rock musicianship"
  ],
  whatToExpect: ["Massive stadium pop singalongs", "High-octane pop-punk energy", "Polished arena production scale", "Tight multi-part vocal harmonies"],
  bestFor: ["Pop-punk nostalgia lovers", "Mainstream rock devotees", "Massive group singalong seekers", "High-visibility mainstage crowds", "Pop music lovers"],
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
  }
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
    "Endorsed by heavy hitters globally, it stands as an elite option for absolute, raw electronic dancefloor momentum"
  ],
  whatToExpect: ["Driving speed garage loops", "Gritty UK club basslines", "High-velocity house grooves", "Raw unadulterated tent energy"],
  bestFor: ["Speed garage house purists", "Underground club devotees", "Ravers hunting heavy bass", "Early afternoon tent starters", "Electronic music lovers"],
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
  }
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
    "A blistering, saxophone-fueled rock engine that transforms traditional mosh pits into performance art spectacles"
  ],
  whatToExpect: ["Feral post-punk instrumentation", "Biting dark satirical delivery", "Blistering fast saxophone riffs", "Completely unpredictable stage antics"],
  bestFor: ["Post-punk garage rock heads", "Devotees of chaotic performance", "Mosh pit veterans", "Fans of dark humor", "Alternative rock fans"],
  similarArtists: [],
  tracks: [
    { name: "Sports", album: "Street Worms", duration: "3:58", artworkUrl: "/albums/viagra-boys/street-worms.jpg" },
    { name: "Man Made of Meat", album: "viagr aboys", duration: "3:14", artworkUrl: "/albums/viagra-boys/viagr-aboys.jpg" },
    { name: "Uno II", album: "viagr aboys", duration: "3:02", artworkUrl: "/albums/viagra-boys/viagr-aboys.jpg" },
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
  }
};

const audreyHobert: Artist = {
  name: "Audrey Hobert",
  slug: "audrey-hobert",
  genres: ["Indie Pop", "Singer-Songwriter"],
  origin: "Los Angeles, California",
  tagline: "Witty, wordy stream-of-consciousness pop music that plays out like voice memos from your funniest friend.",
  socials: {},
  whySee: [
    "Catch a hyper-gifted pop writer making her highly anticipated festival debut after co-writing Gracie Abrams' biggest hits",
    "Hear the live execution of her brilliant, critically beloved 2025 RCA Records solo debut, Who's the Clown?",
    "The rare songwriter who can make a lyric feel like a voice memo you sent at 2am — instantly relatable, painfully specific",
    "Sharp, self-aware stage banter that makes a big outdoor crowd feel like a small living room show"
  ],
  whatToExpect: ["Intimate confessional lyricism", "Wordy hyper-specific indie pop", "Charming self-aware stage banter", "Warm emotional afternoon crowd"],
  bestFor: ["Lyric songwriting obsessives", "Fans of contemporary bedroom pop", "Early breakout talent seekers", "Intimate storyteller set lovers", "Indie pop music fans"],
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
  }
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
    "A blistering, unapologetic wall of fuzzed-out industrial energy that makes standard club sets look soft by comparison"
  ],
  whatToExpect: ["Blown-out industrial bass", "Hypnotic detached vocals", "Aggressive strobe lighting", "Frenetic cyberpunk energy"],
  bestFor: ["Electroclash club traditionalists", "Underground witch house purists", "Cyberpunk aesthetic obsessives", "Late-night warehouse ravers", "High-velocity dance seekers"],
  similarArtists: [],
  tracks: [
    { name: "Under Your Spell", album: "April Mixtape 3", duration: "" },
    { name: "In My Head", album: "Night Killaz Vol. 1", duration: "" },
    { name: "Almost A Year", album: "Night Killaz Vol. 2", duration: "" }
  ],
   about: "Snow Strippers is the Detroit-based electronic duo of Tatiana Schwaninger and Graham Perez, who ignited a global internet underground revival by fusing the gritty textures of early 2010s witch house with the maximalist velocity of electroclash. Operating out of the Surf Gang rap collective orbit alongside producers like evilgiane, their raw, distortion-heavy sound has earned them high-profile collaborations with Lil Uzi Vert. Live, they completely strip away the typical EDM polish, transforming the stage into a chaotic, adrenaline-fueled new rave paradise.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Thursday",
    date: "Jul 30",
    startTime: "7:45 PM",
    endTime: "8:30 PM"
  }
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
    "Experience incredibly patient, complex minimal techno infrastructure that delivers massive, earth-shaking low-end bass pay-offs"
  ],
  whatToExpect: ["Hypnotic minimalist techno structures", "Theatrical Venetian mask showmanship", "Intricate melodic progression arcs", "Deeply sub-heavy bass drops"],
  bestFor: ["High-tech minimal traditionalists", "European techno purists", "Late-night electronic club veterans", "Sound design infrastructure nerds", "Hypnotic repetition seekers"],
  similarArtists: [],
  tracks: [
    { name: "Gravity", album: "Space Diver", duration: "" },
    { name: "Purple Noise", album: "Feuerfalter Part02", duration: "" },
    { name: "Spacewalker", album: "Space Diver", duration: "" }
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
    endTime: "6:45 PM"
  }
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
    "The official festival tour run introducing her highly anticipated, deeply personal debut studio statement, Cacophony"
  ],
  whatToExpect: ["Haunting operatic vocal ranges", "Poetic dark-folk arrangements", "Intense communal crowd catharsis", "Gothic mythological visual cues"],
  bestFor: ["Gothic alternative folk enthusiasts", "Lyric and narrative obsessives", "Chamber pop music lovers", "Breakout songwriter talent seekers", "Intimate emotional story devotees"],
  similarArtists: [],
  tracks: [
    { name: "labor", album: "Cacophony", duration: "" },
    { name: "yours", album: "Cacophony", duration: "" },
    { name: "as good a reason", album: "Cacophony", duration: "" }
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
    endTime: "4:45 PM"
  }
};

export const allArtists: Artist[] = [
  jennie, beabadoobee, majorLazer,
  lorde, yoasobi, sombr, leonThomas,
  johnSummit, charliXcx, smashingPumpkins, oliviaDean, tateMcRae, theXx,
  aespa, empireOfTheSun, wetLeg, worship,
  bloodOrange, fiveSecondsOfSummer, kettama, viagraBoys, audreyHobert,
  snowStrippers, borisBrejcha, parisPaloma,
];

export const artistsBySlug: Record<string, Artist> = Object.fromEntries(
  allArtists.map((a) => [a.slug, a])
);
