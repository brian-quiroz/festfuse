import type { Artist } from "@/app/types/artist";

const tameImpala: Artist = {
  name: "Tame Impala",
  slug: "tame-impala",
  imageUrl: "/artists/heroes/tame-impala.jpg",
  objectPosition: "center 17%",
  genres: ["Psychedelic Rock", "Indie", "Electronic"],
  origin: "Perth, Australia",
  tagline: "Where the mind wanders, the music follows.",
  socials: {
    spotify: "https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb",
    instagram: "#",
    twitter: "#",
  },
  metrics: {
    monthlyListeners: "8.2M",
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
  similarArtists: [
    { name: "Pink Floyd", imageUrl: "/artists/avatars/pink-floyd.jpg" },
    { name: "Beach House", imageUrl: "/artists/avatars/beach-house.jpg" },
    { name: "Alt-J", imageUrl: "/artists/avatars/alt-j.jpg" },
    { name: "MGMT", imageUrl: "/artists/avatars/mgmt.jpg" }
  ],
  tracks: [
    { name: "The Less I Know The Better", album: "Currents", duration: "3:34", artworkUrl: "/albums/tame-impala/currents.png" },
    { name: "Eventually", album: "Currents", duration: "5:18", artworkUrl: "/albums/tame-impala/currents.png" },
    { name: "Let It Happen", album: "Currents", duration: "7:47", artworkUrl: "/albums/tame-impala/currents.png" },
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
    festival: "Lollapalooza 2026",
    stage: "T-Mobile",
    day: "Saturday",
    date: "Jul 31",
    startTime: "10:30 PM",
    endTime: "11:45 PM",
  },
};

const jennie: Artist = {
  name: "Jennie",
  slug: "jennie",
  imageUrl: "/artists/heroes/jennie.jpg",
  objectPosition: "center 15%",
  festivalStatus: "Headliner",
  genres: ["K-Pop", "R&B", "Hip-Hop"],
  origin: "Seoul, South Korea",
  tagline: "The one and only. Style meets swagger.",
  socials: {
    spotify: "https://open.spotify.com/artist/250b0Wlc5Vk0CoUsaCY84M",
    instagram: "#",
    twitter: "#",
  },
  metrics: {
    monthlyListeners: "18.5M",
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
  similarArtists: [
    { name: "CL", imageUrl: "/artists/avatars/cl.jpg" },
    { name: "Doja Cat", imageUrl: "/artists/avatars/doja-cat.jpg" },
    { name: "Cardi B", imageUrl: "/artists/avatars/cardi-b.png" },
    { name: "BLACKPINK", imageUrl: "/artists/avatars/blackpink.png" }
  ],
  tracks: [
    { name: "SOLO", album: "SOLO", duration: "2:58", artworkUrl: "/albums/jennie/solo.png" },
    { name: "You & Me", album: "You & Me", duration: "3:19", artworkUrl: "/albums/jennie/you-and-me.png" },
    { name: "Mantra", album: "Ruby", duration: "2:52", artworkUrl: "/albums/jennie/ruby.png" },
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
    festival: "Lollapalooza 2026",
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
  imageUrl: "/artists/heroes/beabadoobee.jpg",
  objectPosition: "center 20%",
  genres: ["Indie Pop", "Shoegaze", "Bedroom Pop"],
  origin: "London, England",
  tagline: "Fuzzed-out feelings in perfect three minutes.",
  socials: {
    spotify: "https://open.spotify.com/artist/35l9BRT7MXmM8bv2WDQiyB",
    instagram: "#",
    twitter: "#",
  },
  metrics: {
    monthlyListeners: "3.8M",
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
  similarArtists: [
    { name: "Mitski", imageUrl: "/artists/avatars/mitski.jpg" },
    { name: "Phoebe Bridgers", imageUrl: "/artists/avatars/phoebe-bridgers.jpg" },
    { name: "Soccer Mommy", imageUrl: "/artists/avatars/soccer-mommy.jpg" },
    { name: "Japanese Breakfast", imageUrl: "/artists/avatars/japanese-breakfast.jpg" }
  ],
  tracks: [
    { name: "Care", album: "Beatopia", duration: "3:09", artworkUrl: "/albums/beabadoobee/beatopia.png" },
    { name: "The Night Is Dark", album: "Fake It Flowers", duration: "3:20", artworkUrl: "/albums/beabadoobee/fake-it-flowers.jpg" },
    { name: "Last Day On Earth", album: "Beatopia", duration: "3:54", artworkUrl: "/albums/beabadoobee/beatopia.png" },
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
    festival: "Lollapalooza 2026",
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
  imageUrl: "/artists/heroes/major-lazer.jpg",
  objectPosition: "center 26%",
  genres: ["Electronic", "Dancehall", "Dance Pop"],
  origin: "Miami, Florida",
  tagline: "The sound of the planet doing its thing.",
  socials: {
    spotify: "https://open.spotify.com/artist/738wLrAtLtCtFOLvQBXOXp",
    instagram: "#",
    twitter: "#",
  },
  metrics: {
    monthlyListeners: "12.1M",
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
  similarArtists: [
    { name: "DJ Snake", imageUrl: "/artists/avatars/dj-snake.jpg" },
    { name: "J Balvin", imageUrl: "/artists/avatars/j-balvin.jpg" },
    { name: "Skrillex", imageUrl: "/artists/avatars/skrillex.jpg" },
    { name: "Diplo", imageUrl: "/artists/avatars/diplo.jpg" }
  ],
  tracks: [
    { name: "Lean On", album: "Peace Is the Mission", duration: "2:58", artworkUrl: "/albums/major-lazer/peace-is-the-mission.png" },
    { name: "Cold Water", album: "Music Is the Weapon", duration: "3:04", artworkUrl: "/albums/major-lazer/music-is-the-weapon.jpeg" },
    { name: "Run the World", album: "Free the Universe", duration: "3:46", artworkUrl: "/albums/major-lazer/free-the-universe.png" },
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
    festival: "Lollapalooza 2026",
    stage: "Perry's",
    day: "Saturday",
    date: "Jul 31",
    startTime: "8:30 PM",
    endTime: "9:45 PM",
  },
};

const lorde: Artist = {
  name: "Lorde",
  slug: "lorde",
  imageUrl: "/artists/heroes/lorde.jpg",
  objectPosition: "center 20%",
  festivalStatus: "Headliner",
  genres: ["Indie Pop", "Electropop", "Art Pop"],
  origin: "Auckland, New Zealand",
  tagline: "Pure vision. Pure feeling.",
  socials: {
    spotify: "https://open.spotify.com/artist/163tK9Wjr9P9DmM0AVK7lm",
    instagram: "#",
    twitter: "#",
  },
  metrics: {
    monthlyListeners: "6.1M",
    topTrack: "Royals",
    latestRelease: "Solar Power (2021)",
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
    { name: "Royals", album: "Pure Heroine", duration: "3:10", artworkUrl: "/albums/lorde/pure-heroine.png" },
    { name: "Green Light", album: "Melodrama", duration: "3:54", artworkUrl: "/albums/lorde/melodrama.png" },
    { name: "Solar Power", album: "Solar Power", duration: "3:54", artworkUrl: "/albums/lorde/solar-power.jpg" },
  ],
  about:
    "Ella Yelich-O'Connor, performing as Lorde, redefined pop songwriting with Pure Heroine at just 16. Her 2017 follow-up Melodrama — a breakup album of devastating precision — earned near-universal acclaim and cemented her as one of the most important voices of her generation. Lorde writes pop as personal essay: every song carries a specific feeling, a specific place, a specific truth. Live, she strips away excess and gives you the song.",
  trivia: [
    {
      emoji: "📝",
      fact: "'Royals' was written in 30 minutes at age 15 after Lorde flipped through a National Geographic and noticed how remote royalty imagery felt from her suburban Auckland life.",
    },
    {
      emoji: "🎛️",
      fact: "Melodrama was co-produced with Jack Antonoff — widely regarded as one of the most acclaimed pop collaborations of the 2010s.",
    },
    {
      emoji: "🌿",
      fact: "Solar Power was written largely in isolation near the New Zealand coast, influenced by extended time away from cities and screens.",
    },
    {
      emoji: "🏆",
      fact: "'Royals' spent nine weeks at #1 on the Billboard Hot 100, making Lorde one of the youngest artists ever to lead the chart.",
    },
  ],
  schedule: {
    festival: "Lollapalooza 2026",
    stage: "T-Mobile",
    day: "Friday",
    date: "Aug 1",
    startTime: "9:00 PM",
    endTime: "10:15 PM",
  },
};

const yoasobi: Artist = {
  name: "YOASOBI",
  slug: "yoasobi",
  imageUrl: "/artists/heroes/yoasobi.jpg",
  objectPosition: "center 20%",
  genres: ["J-Pop", "Electronic", "Indie Pop"],
  origin: "Tokyo, Japan",
  tagline: "Every song is a story. Every story is a song.",
  socials: {
    spotify: "https://open.spotify.com/artist/64tJ2EAv1R6UaZqc4iOCyj",
    instagram: "#",
    twitter: "#",
  },
  metrics: {
    monthlyListeners: "10.3M",
    topTrack: "Idol",
    latestRelease: "THE BOOK 3 (2024)",
  },
  whySee: [
    "Idol — one of the biggest songs on the planet — performed live by the duo who made it",
    "Their concept is unlike anyone else at the festival: every song adapts a Japanese short story into music",
    "Producer Ayase's electronic arrangements hit completely differently at festival volume",
    "A global phenomenon that most Western audiences are only beginning to discover",
  ],
  whatToExpect: ["High-energy J-Pop anthems", "Dense electronic production", "Massive crowd singalongs", "Cross-cultural discovery", "Viral moments live"],
  bestFor: ["Anime fans", "J-Pop curious listeners", "Pop music lovers", "Discovery seekers"],
  similarArtists: [
    { name: "Yorushika", imageUrl: "/artists/avatars/yorushika.jpg" },
    { name: "Eve", imageUrl: "/artists/avatars/eve.jpg" },
    { name: "Fujii Kaze", imageUrl: "/artists/avatars/fujii-kaze.jpg" },
    { name: "Ado", imageUrl: "/artists/avatars/ado.avif" },
  ],
  tracks: [
    { name: "Idol", album: "THE BOOK 3", duration: "3:32", artworkUrl: "/albums/yoasobi/the-book-3.png" },
    { name: "Into the Night", album: "THE BOOK", duration: "4:10", artworkUrl: "/albums/yoasobi/the-book.jpg" },
    { name: "Gunjou", album: "THE BOOK", duration: "4:17", artworkUrl: "/albums/yoasobi/the-book.jpg" },
  ],
  about:
    "YOASOBI is a Japanese music project formed in 2019 by producer Ayase and vocalist ikura. Their concept is singular: each song is a direct musical adaptation of a Japanese short story, developed in close collaboration with the original authors. The result is pop music with unusual emotional depth and narrative precision. Their debut track 'Into the Night' became a streaming phenomenon, and 'Idol' — written for the anime Oshi no Ko — became one of the most-streamed Japanese songs in Spotify history and a genuine global crossover moment.",
  trivia: [
    {
      emoji: "📖",
      fact: "Every YOASOBI song is a musical adaptation of a Japanese short story — the duo works directly with each story's author to bring it to life.",
    },
    {
      emoji: "🎌",
      fact: "'Idol' debuted at #1 on the Billboard Global Excl. U.S. chart and became one of the highest-charting Japanese songs in Spotify history.",
    },
    {
      emoji: "⚡",
      fact: "Ayase produces entirely from his home studio — the scale of YOASOBI's sound belies how lean the operation actually is.",
    },
    {
      emoji: "🎤",
      fact: "Vocalist ikura was a college student when YOASOBI launched, discovered by Ayase through an online music platform after she posted covers.",
    },
  ],
  schedule: {
    festival: "Lollapalooza 2026",
    stage: "Bud Light",
    day: "Sunday",
    date: "Aug 2",
    startTime: "8:00 PM",
    endTime: "9:15 PM",
  },
};

const sombr: Artist = {
  name: "Sombr",
  slug: "sombr",
  imageUrl: "/artists/heroes/sombr.jpg",
  objectPosition: "center 20%",
  genres: ["Bedroom Pop", "Indie Pop", "Alt-Pop"],
  origin: "New York, USA",
  tagline: "Quiet songs for loud feelings.",
  socials: {
    spotify: "#",
    instagram: "#",
    twitter: "#",
  },
  metrics: {
    monthlyListeners: "1.8M",
    topTrack: "back to friends",
    latestRelease: "I Barely Know Her",
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
    { name: "back to friends", album: "I Barely Know Her", duration: "3:19", artworkUrl: "/albums/sombr/i-barely-know-her.png" },
    { name: "undressed", album: "I Barely Know Her", duration: "3:02", artworkUrl: "/albums/sombr/i-barely-know-her.png" },
    { name: "12 to 12", album: "I Barely Know Her", duration: "4:02", artworkUrl: "/albums/sombr/i-barely-know-her.png" },
  ],
  about:
    "Sombr is the project of singer-songwriter Shane Michael Boose. He makes small, honest songs about the feelings people rarely say out loud — bedroom pop built around close-mic'd guitar, plain lyrics, and arrangements that never oversell the emotion. In a landscape full of maximalism, Sombr's restraint reads as confidence. Shane has built a quietly devoted following on the strength of songs that feel less like performances and more like overheard conversations.",
  trivia: [
    {
      emoji: "🎙️",
      fact: "Shane records most of his music at home, deliberately keeping the production spare to let the lyrics carry the weight.",
    },
    {
      emoji: "📱",
      fact: "Much of his early audience found him through lo-fi playlist placements rather than traditional promotion.",
    },
    {
      emoji: "🎸",
      fact: "His songs sit in the bedroom pop tradition of saying the most with the least — no production excess, just the feeling.",
    },
    {
      emoji: "🤫",
      fact: "He rarely does interviews, letting the songs speak entirely for themselves.",
    },
  ],
  schedule: {
    festival: "Lollapalooza 2026",
    stage: "BMI Stage",
    day: "Saturday",
    date: "Aug 1",
    startTime: "3:30 PM",
    endTime: "4:30 PM",
  },
};

const leonThomas: Artist = {
  name: "Leon Thomas",
  slug: "leon-thomas",
  imageUrl: "/artists/heroes/leon-thomas.jpg",
  objectPosition: "center 20%",
  genres: ["Alternative R&B", "Soul", "Neo-Soul"],
  origin: "Brooklyn, New York",
  tagline: "The songwriter's songwriter, finally in the spotlight.",
  socials: {
    spotify: "https://open.spotify.com/artist/3qBi3oNsvDhVfE5VBvfDMR",
    instagram: "#",
    twitter: "#",
  },
  metrics: {
    monthlyListeners: "8.3M",
    topTrack: "wine & spirits",
    latestRelease: "MUTT (2023)",
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
    { name: "wine & spirits", album: "MUTT", duration: "3:21", artworkUrl: "/albums/leon-thomas/mutt.png" },
    { name: "Super Natural", album: "MUTT", duration: "3:48", artworkUrl: "/albums/leon-thomas/mutt.png" },
    { name: "Blow Up", album: "MUTT", duration: "2:57", artworkUrl: "/albums/leon-thomas/mutt.png" },
  ],
  about:
    "Leon Thomas has been one of music's best-kept secrets for years — a vocalist and songwriter whose fingerprints are on some of the biggest R&B records of the past decade. His 2023 debut album MUTT announced him as a solo force in his own right: warm, unhurried, and deeply soulful. Raised in Brooklyn on a diet of classic soul and hip-hop, Thomas brings an emotional directness to his music that cuts through the noise. His live show is proof that the voice was always the instrument.",
  trivia: [
    {
      emoji: "📺",
      fact: "Leon Thomas started his career as a child actor on Nickelodeon's Victorious, where he also showcased his vocal talent before pivoting to music full-time.",
    },
    {
      emoji: "✍️",
      fact: "He has writing credits on records by Ariana Grande, Ty Dolla $ign, Jhené Aiko, and others — making MUTT a long-overdue spotlight moment.",
    },
    {
      emoji: "🎙️",
      fact: "'wine & spirits' became his breakthrough solo track, accumulating hundreds of millions of streams and introducing his voice to a new generation.",
    },
    {
      emoji: "🎼",
      fact: "Thomas co-writes and produces much of his own music, applying the same craft he brings to other artists' sessions to his personal work.",
    },
  ],
  schedule: {
    festival: "Lollapalooza 2026",
    stage: "Perry's",
    day: "Friday",
    date: "Jul 31",
    startTime: "7:00 PM",
    endTime: "8:00 PM",
  },
};

const johnSummit: Artist = {
  name: "John Summit",
  slug: "john-summit",
  imageUrl: "/artists/heroes/john-summit.jpg",
  objectPosition: "center 20%",
  festivalStatus: "Headliner",
  genres: ["House", "Tech House", "Electronic"],
  origin: "Chicago, Illinois",
  tagline: "Chicago house music, amplified to festival scale.",
  socials: {
    spotify: "#",
    instagram: "#",
    twitter: "#",
  },
  metrics: {
    monthlyListeners: "6.4M",
    topTrack: "La Danza",
    latestRelease: "Comfort (2022)",
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
    { name: "La Danza", album: "La Danza", duration: "5:42", artworkUrl: "/albums/john-summit/la-danza.jpg" },
    { name: "Deep End", album: "Deep End", duration: "4:58", artworkUrl: "/albums/john-summit/deep-end.jpg" },
    { name: "Where You Are", album: "Where You Are", duration: "3:52", artworkUrl: "/albums/john-summit/where-you-are.jpg" },
  ],
  about:
    "John Summit emerged from Chicago — the birthplace of house music — and became one of the genre's most in-demand names in record time. His DJ sets are studies in tension and release: patient, hypnotic builds that pay off with devastating precision. A vocal champion of underground roots in a mainstream landscape, Summit brings authenticity to every set without sacrificing the kind of energy that makes 30,000 people move as one.",
  trivia: [
    {
      emoji: "🏙️",
      fact: "Summit grew up in Chicago and credits the city's house music heritage as the direct foundation of his sound and ethos.",
    },
    {
      emoji: "📈",
      fact: "He rose from relative obscurity to headlining major festivals in under three years — one of the steepest ascents in recent electronic music.",
    },
    {
      emoji: "🎵",
      fact: "'La Danza' became one of the most-Shazamed tracks at festivals across 2022 and 2023, introducing his sound to millions of new listeners.",
    },
    {
      emoji: "🎧",
      fact: "Summit is known for playing noticeably longer sets than his contracts require — when he's locked in, he simply doesn't want to stop.",
    },
  ],
  schedule: {
    festival: "Lollapalooza 2026",
    stage: "Perry's",
    day: "Saturday",
    date: "Aug 1",
    startTime: "10:00 PM",
    endTime: "11:30 PM",
  },
};

const charliXcx: Artist = {
  name: "Charli XCX",
  slug: "charli-xcx",
  imageUrl: "/artists/heroes/charli-xcx.jpg",
  objectPosition: "center 20%",
  festivalStatus: "Headliner",
  genres: ["Pop", "Hyperpop", "Electropop"],
  origin: "Cambridge, England",
  tagline: "Brat. And that's that.",
  socials: {
    spotify: "#",
    instagram: "#",
    twitter: "#",
  },
  metrics: {
    monthlyListeners: "17.2M",
    topTrack: "360",
    latestRelease: "brat (2024)",
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
    { name: "360", album: "brat", duration: "2:13", artworkUrl: "/albums/charli-xcx/brat.jpg" },
    { name: "girl, so confusing", album: "brat", duration: "3:17", artworkUrl: "/albums/charli-xcx/brat.jpg" },
    { name: "Boom Clap", album: "Sucker", duration: "3:00", artworkUrl: "/albums/charli-xcx/sucker.png" },
  ],
  about:
    "Charli XCX has spent a decade operating at the bleeding edge of pop, writing hits for others while building one of the most adventurous solo catalogues in the genre. She wrote Iggy Azalea's 'Fancy' and Icona Pop's 'I Love It' before most people knew her name as a solo artist. Her 2024 album brat arrived as a cultural watershed — a neon-green, uncompromising collection that defined an entire summer's aesthetic and earned universal critical acclaim. Charli performs like someone who has nothing left to prove and everything left to do.",
  trivia: [
    {
      emoji: "💚",
      fact: "brat's lime green album cover became one of 2024's most recognizable images — spawning a cultural movement and even being referenced in a U.S. presidential campaign.",
    },
    {
      emoji: "✍️",
      fact: "She wrote Iggy Azalea's 'Fancy' and Icona Pop's 'I Love It' — two of the defining pop hits of the early 2010s — before most people knew her as a solo artist.",
    },
    {
      emoji: "🎭",
      fact: "'brat summer' became a genuine cultural phenomenon, with the color and attitude adopted far beyond the music world.",
    },
    {
      emoji: "🎵",
      fact: "Charli has collaborated with artists across nearly every pop subgenre — from PC Music's experimental underground to mainstream radio giants.",
    },
  ],
  schedule: {
    festival: "Lollapalooza 2026",
    stage: "T-Mobile",
    day: "Thursday",
    date: "Jul 30",
    startTime: "9:00 PM",
    endTime: "10:15 PM",
  },
};

const smashingPumpkins: Artist = {
  name: "The Smashing Pumpkins",
  slug: "smashing-pumpkins",
  imageUrl: "/artists/heroes/the-smashing-pumpkins.jpg",
  objectPosition: "center 20%",
  festivalStatus: "Headliner",
  genres: ["Alternative Rock", "Grunge", "Shoegaze"],
  origin: "Chicago, Illinois",
  tagline: "Despite all my rage.",
  socials: {
    spotify: "#",
    instagram: "#",
    twitter: "#",
  },
  metrics: {
    monthlyListeners: "5.5M",
    topTrack: "Bullet with Butterfly Wings",
    latestRelease: "ATUM: A Rock Opera in Three Acts (2023)",
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
    { name: "Tonight Tonight", album: "Mellon Collie and the Infinite Sadness", duration: "4:14", artworkUrl: "/albums/the-smashing-pumpkins/mellon-collie-and-the-infinite-sadness.jpg" },
  ],
  about:
    "The Smashing Pumpkins are one of the definitive rock bands of the 1990s. Formed in Chicago by Billy Corgan, the band built a sound that combined massively layered, distorted guitars with introspective lyricism and unexpected melodic beauty. Albums like Siamese Dream and Mellon Collie and the Infinite Sadness stand as milestones of alternative rock — dense, ambitious, and emotionally enormous. Their live shows are events: loud, long, and performed with the urgency of musicians who have spent decades earning their stage.",
  trivia: [
    {
      emoji: "🎸",
      fact: "Siamese Dream's guitar sound was created by overdubbing a single riff over 100 times — the sheer density of layering is part of what makes it so distinctive.",
    },
    {
      emoji: "📀",
      fact: "Mellon Collie and the Infinite Sadness was released as a double album with 28 tracks — an extraordinarily ambitious scope for a mainstream rock release in 1995.",
    },
    {
      emoji: "🏙️",
      fact: "The band formed in Chicago in 1988 and have maintained a fierce connection to the city — they always play it with particular energy.",
    },
    {
      emoji: "📺",
      fact: "'Tonight Tonight' features one of the most celebrated music videos of the MTV era, inspired by Georges Méliès' 1902 silent film A Trip to the Moon.",
    },
  ],
  schedule: {
    festival: "Lollapalooza 2026",
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
  imageUrl: "/artists/heroes/olivia-dean.jpg",
  objectPosition: "center 20%",
  festivalStatus: "Headliner",
  genres: ["Soul", "R&B", "Indie Pop"],
  origin: "London, England",
  tagline: "Soulful, sharp, and completely herself.",
  socials: {
    spotify: "#",
    instagram: "#",
    twitter: "#",
  },
  metrics: {
    monthlyListeners: "4.2M",
    topTrack: "Dive",
    latestRelease: "Messy (2023)",
  },
  whySee: [
    "A voice that stops people mid-stride — genuinely one of the best singers performing this weekend",
    "Messy is a debut album full of career-defining songs — catch it while it still feels new",
    "Warm, joyful stage presence that turns a festival crowd into a community",
    "British soul at its finest: witty, specific, and deeply felt",
  ],
  whatToExpect: ["Soul and R&B warmth", "Exceptional live vocals", "Joyful crowd atmosphere", "Intimate connection on a big stage", "British pop sharpness"],
  bestFor: ["Soul and R&B fans", "Fans of British pop", "Anyone who loves great singing", "Afternoon crowd"],
  similarArtists: [
    { name: "Lianne La Havas", imageUrl: "/artists/avatars/lianne-la-havas.jpg" },
    { name: "Jorja Smith", imageUrl: "/artists/avatars/jorja-smith.jpg" },
    { name: "Joy Crookes", imageUrl: "/artists/avatars/joy-crookes.jpg" },
    { name: "Celeste", imageUrl: "/artists/avatars/celeste.png" },
  ],
  tracks: [
    { name: "Dive", album: "Messy", duration: "3:02", artworkUrl: "/albums/olivia-dean/messy.png" },
    { name: "UFO", album: "Messy", duration: "3:14", artworkUrl: "/albums/olivia-dean/messy.png" },
    { name: "Danger", album: "Messy", duration: "3:28", artworkUrl: "/albums/olivia-dean/messy.png" },
  ],
  about:
    "Olivia Dean is a London-born singer-songwriter whose debut album Messy announced her as one of British music's most exciting new voices. Rooted in soul and R&B but filtered through a distinctly modern pop sensibility, her songs are warm, emotionally precise, and shot through with genuine wit. She writes with specificity — about real feelings in real situations — and performs with a presence that makes every room feel smaller and more intimate. Messy earned widespread critical acclaim and a Mercury Prize nomination, cementing a debut that's only the beginning.",
  trivia: [
    {
      emoji: "🏆",
      fact: "Messy received a Mercury Prize nomination in 2023, cementing Dean as one of the UK's most critically recognized breakthrough artists.",
    },
    {
      emoji: "🎶",
      fact: "Olivia began writing songs as a teenager and has described music as her primary way of processing emotions and translating experience into something shareable.",
    },
    {
      emoji: "😄",
      fact: "She is known for her playful, unfiltered social media presence — her humor and honesty online have made her one of music's most beloved personalities off-stage.",
    },
    {
      emoji: "🤝",
      fact: "Dean has shared stages and collaborated with a wide range of British artists, becoming a central figure in London's thriving soul and indie scene.",
    },
  ],
  schedule: {
    festival: "Lollapalooza 2026",
    stage: "Solana Stage",
    day: "Sunday",
    date: "Aug 2",
    startTime: "4:00 PM",
    endTime: "5:00 PM",
  },
};

const tateMcRae: Artist = {
  name: "Tate McRae",
  slug: "tate-mcrae",
  imageUrl: "/artists/heroes/tate-mcrae.avif",
  objectPosition: "center 20%",
  festivalStatus: "Headliner",
  genres: ["Pop", "Dance Pop", "Electropop"],
  origin: "Calgary, Canada",
  tagline: "Dance like you mean it. Sing like you mean it more.",
  socials: {
    spotify: "#",
    instagram: "#",
    twitter: "#",
  },
  metrics: {
    monthlyListeners: "16.1M",
    topTrack: "greedy",
    latestRelease: "So Close to What (2025)",
  },
  whySee: [
    "A trained dancer performing her own choreography — pop excellence that's athletic and total",
    "'greedy' live with a crowd that knows every word is one of the best moments a pop set can deliver",
    "One of the fastest-rising pop acts of her generation — this is peak Tate McRae",
    "Polished, high-production pop with genuine emotional depth underneath the hooks",
  ],
  whatToExpect: ["High-energy dance pop", "Stunning choreography", "Massive crowd singalongs", "Polished production", "Emotionally charged performance"],
  bestFor: ["Pop fans", "Dance lovers", "Anyone who needs to feel something", "Fans of precision performance"],
  similarArtists: [
    { name: "Olivia Rodrigo", imageUrl: "/artists/avatars/olivia-rodrigo.jpg" },
    { name: "Sabrina Carpenter", imageUrl: "/artists/avatars/sabrina-carpenter.jpg" },
    { name: "Dua Lipa", imageUrl: "/artists/avatars/dua-lipa.jpg" },
    { name: "Ariana Grande", imageUrl: "/artists/avatars/ariana-grande.jpg" },
  ],
  tracks: [
    { name: "greedy", album: "think later.", duration: "2:11", artworkUrl: "/albums/tate-mcrae/think-later.png" },
    { name: "2 hands", album: "think later.", duration: "2:37", artworkUrl: "/albums/tate-mcrae/think-later.png" },
    { name: "you broke me first", album: "all the things i never said", duration: "3:06", artworkUrl: "/albums/tate-mcrae/all-the-things-i-never-said.jpg" },
  ],
  about:
    "Tate McRae is a Calgary-born singer, songwriter, and dancer who has built one of pop music's most devoted fanbases through relentless work and a rare combination of talents. A competitive dancer before becoming a recording artist, McRae brings a physical vocabulary to her performances that most pop acts simply can't match. Her 2023 album think later. — anchored by the massive hit 'greedy' — established her as a genuine pop force, trading on emotional honesty and irresistible hooks in equal measure.",
  trivia: [
    {
      emoji: "💃",
      fact: "Tate trained as a competitive dancer from an early age, finishing third on So You Think You Can Dance: The Next Generation before pivoting to music full-time.",
    },
    {
      emoji: "📝",
      fact: "She wrote her breakthrough track 'you broke me first' at 16, releasing it independently before it became a global streaming phenomenon.",
    },
    {
      emoji: "📈",
      fact: "'greedy' spent multiple weeks in the global Spotify top 10 and became one of the defining pop tracks of 2023.",
    },
    {
      emoji: "🌍",
      fact: "Though Canadian, McRae grew up partly in Abu Dhabi and has cited her international upbringing as a key influence on her ambition and worldview.",
    },
  ],
  schedule: {
    festival: "Lollapalooza 2026",
    stage: "Bud Light",
    day: "Thursday",
    date: "Jul 30",
    startTime: "8:00 PM",
    endTime: "9:00 PM",
  },
};

const theXx: Artist = {
  name: "The xx",
  slug: "the-xx",
  imageUrl: "/artists/heroes/the-xx.avif",
  objectPosition: "center 20%",
  festivalStatus: "Headliner",
  genres: ["Indie Pop", "Dream Pop", "Electronic"],
  origin: "London, England",
  tagline: "Space between the notes. Feeling in the silence.",
  socials: {
    spotify: "#",
    instagram: "#",
    twitter: "#",
  },
  metrics: {
    monthlyListeners: "8.7M",
    topTrack: "Intro",
    latestRelease: "I See You (2017)",
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
  trivia: [
    {
      emoji: "🏫",
      fact: "Romy, Oliver, and Jamie all met at Elliot School in London — the band formed entirely among childhood friends.",
    },
    {
      emoji: "🏆",
      fact: "Their debut album xx won the Mercury Prize in 2010 — one of the youngest and most surprising winners in the award's history.",
    },
    {
      emoji: "🎵",
      fact: "'Intro' became one of the most licensed instrumental tracks of the 2010s, appearing in film trailers, TV shows, and viral moments worldwide.",
    },
    {
      emoji: "🎛️",
      fact: "Jamie xx also has a celebrated solo career — his album In Colour (2015) is considered one of the decade's finest electronic releases.",
    },
  ],
  schedule: {
    festival: "Lollapalooza 2026",
    stage: "T-Mobile",
    day: "Saturday",
    date: "Aug 1",
    startTime: "7:30 PM",
    endTime: "9:00 PM",
  },
};

const aespa: Artist = {
  name: "aespa",
  slug: "aespa",
  imageUrl: "/artists/heroes/aespa.jpg",
  objectPosition: "center 10%",
  genres: ["K-Pop", "Pop", "Electronic", "Dance Pop"],
  origin: "Seoul, South Korea",
  tagline: "Four members. Four avatars. One universe.",
  socials: {
    spotify: "#",
    instagram: "#",
    twitter: "#",
  },
  metrics: {
    monthlyListeners: "9.4M",
    topTrack: "Supernova",
    latestRelease: "Whiplash (2024)",
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
    { name: "Supernova", album: "Supernova", duration: "3:01", artworkUrl: "/albums/aespa/supernova.png" },
    { name: "Whiplash", album: "Whiplash", duration: "3:05", artworkUrl: "/albums/aespa/whiplash.png" },
    { name: "Next Level", album: "savage", duration: "3:37", artworkUrl: "/albums/aespa/savage.jpg" },
  ],
  about:
    "aespa debuted in 2020 under SM Entertainment with one of the most distinctive concepts in K-pop history: each of the four members — Karina, Giselle, Winter, and Ningning — has a digital AI counterpart called an æ. Their debut single 'Black Mamba' broke the SM Entertainment YouTube record and set the tone for a group that would never take the conventional path. Their 2024 single 'Supernova' and its follow-up 'Whiplash' pushed their sound into ambitious, genre-fluid territory that has continued to expand their global fanbase.",
  trivia: [
    {
      emoji: "🤖",
      fact: "The group's concept centers on each member having an AI avatar counterpart — the 'æ' versions exist in a parallel digital world called the 'KWANGYA.'",
    },
    {
      emoji: "📈",
      fact: "'Black Mamba' set a record for the fastest SM Entertainment music video to reach 100 million YouTube views.",
    },
    {
      emoji: "🌍",
      fact: "The group spans four nationalities — Karina and Winter are Korean, Giselle is Japanese-Korean, and Ningning is Chinese.",
    },
    {
      emoji: "🎵",
      fact: "'Next Level' originally appeared in the Fast & Furious: Spy Racers soundtrack and was reimagined by aespa into one of the most memorable K-pop tracks of 2021.",
    },
  ],
  schedule: {
    festival: "Lollapalooza 2026",
    stage: "T-Mobile",
    day: "Friday",
    date: "Jul 31",
    startTime: "6:00 PM",
    endTime: "7:00 PM",
  },
};

export const allArtists: Artist[] = [
  tameImpala, jennie, beabadoobee, majorLazer,
  lorde, yoasobi, sombr, leonThomas,
  johnSummit, charliXcx, smashingPumpkins, oliviaDean, tateMcRae, theXx,
  aespa,
];

export const artistsBySlug: Record<string, Artist> = Object.fromEntries(
  allArtists.map((a) => [a.slug, a])
);
