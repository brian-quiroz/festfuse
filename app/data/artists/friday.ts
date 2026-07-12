// Storage only — do not import this file directly in product code.
// To filter by day, import allArtists from index.ts and filter by appearance.day === "Friday".
import type { Artist } from "@/app/types/artist";

const charliXcx: Artist = {
  name: "Charli XCX",
  slug: "charli-xcx",
  mbid: "260b6184-8828-48eb-945c-bc4cb6fc34ca",
  imageUrl: "/artists/heroes/charli-xcx.jpg",
  objectPosition: "center 20%",
  liveVideoId: "Dts9DvQ76Kw",
  liveVideoLabel: "Live at Coachella 2025",
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
    "Fashion Visual",
    "Massive Singalongs",
    "Crowd Atmosphere",
  ],
  bestFor: [],
  similarArtists: [
    {
      name: "Tate McRae",
      slug: "tate-mcrae",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bed8016bd64422793ff3bc75",
    },
    {
      name: "Slayyyter",
      slug: "slayyyter",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178d475efee7c254f7e77a2d306",
    },
    {
      name: "Lorde",
      slug: "lorde",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178678a3a4bc2d8a84074f22c71",
    },
    {
      name: "aespa",
      slug: "aespa",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178053bbb910dda6d4ab0618b8b",
    },
  ],
  tracks: [
    {
      spotifyId: "4w2GLmK2wnioVnb5CPQeex",
      name: "360",
      album: "BRAT",
      duration: "2:13",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02f88b43d15fd14e9525338b59",
    },
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
  liveVideoId: "ieNIWi__3Dc",
  liveVideoLabel: "Live at Vive Latino Mexico 2026",
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
    "Guitar-Driven Sound",
    "Period-Specific Sound",
  ],
  bestFor: [],
  similarArtists: [
    { name: "The Bends", slug: "the-bends" },
    {
      name: "Wolf Alice",
      slug: "wolf-alice",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178517744f1b17b914a3ac923b7",
    },
    { name: "Whatmore", slug: "whatmore" },
    {
      name: "Die Spitz",
      slug: "die-spitz",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178221291d43457048ddb8f0f5e",
    },
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

const lilUziVert: Artist = {
  name: "Lil Uzi Vert",
  slug: "lil-uzi-vert",
  imageUrl: "/artists/heroes/lil-uzi-vert.webp",
  objectPosition: "center 10%",
  genres: ["Hip-Hop", "Trap", "Rage Rap"],
  origin: "Philadelphia, Pennsylvania",
  tagline: "Hyper-kinetic punk-rap adrenaline and massive stadium-scale trap anthems.",
  socials: { spotify: "https://open.spotify.com/artist/4O15NlyKLIASxsJ0PrXPfz" },
  whySee: [
    "An absolute force of nature delivering one of the most high-octane, visually chaotic sets of the weekend on the mainstage",
    "Experience a generational hip-hop icon running through a monumental catalog of historic chart-toppers like 'XO Tour Llif3'",
    "Hear the live execution of fresh material from their latest studio era, blending heavy metal textures with blistering rage-rap beats",
    "Unrivaled crowd momentum driven by relentless stage diving, lightning-fast flows, and massive, park-wide mosh pits",
  ],
  whatToExpect: [
    "High-Energy Pacing",
    "Energetic Mosh Pits",
    "Choreography",
    "High-Production Visuals",
  ],
  bestFor: [
    "Mosh Pit Lovers",
    "Dance Floor Seekers",
  ],
  similarArtists: [
    {
      name: "Beno",
      slug: "beno",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c81366842659393e281fe4ca",
    },
    {
      name: "Monaleo",
      slug: "monaleo",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17867d27938b6b6046bd09e020c",
    },
    {
      name: "Mustard",
      slug: "mustard",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17854406b7007a449aeaac06c44",
    },
    {
      name: "Nettspend",
      slug: "nettspend",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786bc255a221b2d2db4c1de21f",
    },
  ],
  tracks: [
    {
      spotifyId: "7GX5flRQZVHRAGd6B4TmDO",
      name: "XO Tour Llif3",
      album: "Luv Is Rage 2",
      duration: "3:02",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02f23aee9d3be9fcbca1bc6352",
    },
    {
      spotifyId: "4Ls53fBNVfaXTROBi6X8Hw",
      name: "Just Wanna Rock",
      album: "Pink Tape",
      duration: "2:03",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02d7f97f84ffeaf2077813ef24",
    },
    {
      spotifyId: "2lophWrG2xqv9CSgSPca5k",
      name: "Nakamura",
      album: "Pink Tape",
      duration: "3:17",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02d7f97f84ffeaf2077813ef24",
    },
  ],
  about:
    "Symere Woods, performing under the iconic moniker Lil Uzi Vert, has spent a decade standing at the absolute vanguard of contemporary hip-hop, single-handedly bridging the gap between underground soundcloud rap and global stadium dominance. Characterized by a fierce rock-star aesthetic, rapid-fire flows, and an unyielding trap pulse, they completely re-wrote the rules of the genre with diamond-certified alternative masterpieces. Backed by an extensive catalog of boundary-pushing records, their high-visibility headlining sets are masterfully calculated, maximalist spectacles built to completely detonate festival lawns.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "T-Mobile",
    day: "Friday",
    date: "Jul 31",
    startTime: "6:40 PM",
    endTime: "7:40 PM",
  },
};

const yungblud: Artist = {
  name: "YUNGBLUD",
  slug: "yungblud",
  imageUrl: "/artists/heroes/yungblud.webp",
  objectPosition: "center 0%",
  genres: ["Alternative Rock", "Pop-Punk", "Gothic Rock"],
  origin: "Doncaster, England",
  tagline: "An explosive, theatrical riot of generational alternative punk defiance.",
  socials: { spotify: "https://open.spotify.com/artist/6Ad91Jof8Niiw0lGLLi3NW" },
  whySee: [
    "A blistering, theatrical tour de force of pure alternative counter-culture energy that commands absolute crowd chaos",
    "Dominic Harrison's completely untamed, magnetic stage presence that transforms giant festival fields into safe-haven rock communities",
    "Hear the live premiere of massive, fuzzed-out modern punk rock anthems delivered with flawless stadium-scale pacing",
    "A deeply passionate live environment fueled by collective crowd catharsis, relentless guitar riffs, and heavy basslines",
  ],
  whatToExpect: [
    "Theatrical Staging",
    "Energetic Mosh Pits",
    "Massive Singalongs",
  ],
  bestFor: [
    "Mosh Pit Lovers",
  ],
  similarArtists: [
    {
      name: "The Story So Far",
      slug: "the-story-so-far",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1784d8d055d82fc1e5b1c5ecb1d",
    },
    {
      name: "Villanelle",
      slug: "villanelle",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781ece1eae58afddb4d3238501",
    },
    {
      name: "Hot Mulligan",
      slug: "hot-mulligan",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f39d742e60fa4e7246c133d4",
    },
    {
      name: "Wunderhorse",
      slug: "wunderhorse",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1780e05e549428cb38b2f3e7a60",
    },
  ],
  tracks: [
    { name: "I Think I'm OKAY", album: "Hotel Diaries", duration: "" },
    {
      spotifyId: "68rVGSTnCiFOET9k5Vd8Se",
      name: "parents",
      album: "the underrated youth",
      duration: "2:51",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e024d9863d7cbed3e95b6e5b7d3",
    },
    {
      spotifyId: "2kDApipZtTzjwGfKujcg2z",
      name: "Lowlife",
      album: "Lowlife",
      duration: "3:53",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02df5bd10ce6f6fc2723f892b4",
    },
  ],
  about:
    "Dominic Harrison, operating under the moniker YUNGBLUD, has built a fierce global community through his sharp blend of aggressive pop-punk grit, alternative rock rebellion, and deeply honest lyricism. Channeling the raw theatricality of classic subversive rock legends, he crafts a high-tension sonic universe that acts as a powerful rallying cry for youth culture around the world. Backed by tight, seasoned live instrumentation and an uncompromising performance ethos, his late afternoon mainstage set delivers an undeniable, adrenaline-fueled celebration of modern rock velocity.",
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
    "Crowd Atmosphere",
    "Spectacle Moments",
    "Bass & Groove",
    "Dance Floor Energy",
  ],
  bestFor: [
    "Dance Floor Seekers",
    "Groups & Social Experience",
  ],
  similarArtists: [
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
  ],
  tracks: [
    {
      spotifyId: "01aTsQoKoeXofSTvKuunzv",
      name: "Lean On",
      album: "Peace Is The Mission",
      duration: "2:56",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02d6d24aee7b49a2db98a76856",
    },
    {
      spotifyId: "5UA4VZsSc5Ky988bOI5Fnu",
      name: "pAPi wiTH tOKisCha",
      album: "pAPi wiTH tOKisCha",
      duration: "2:42",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e026cc728295e929204a00b5e06",
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

const notForRadio: Artist = {
  name: "Not for Radio",
  slug: "not-for-radio",
  genres: ["Psychedelic Pop", "Gothic Rock", "Dream Pop"],
  origin: "Los Angeles, California",
  tagline:
    "Lush, shadow-drenched psychedelic ballads and gothic romanticism from a premier indie voice.",
  socials: { spotify: "https://open.spotify.com/artist/0oXhGlRUQ8aVTx8eO4MoMT" },
  whySee: [
    "The highly anticipated festival tour showcasing María Zardoya's mesmerizing, critically adored solo project away from The Marías",
    "Experience a lush collection of reflective, psychedelic ballads infused with gorgeous gothic textures under the evening sky",
    "A beautifully intimate, atmospheric sonic oasis designed perfectly to completely escape standard commercial pop noise",
    "Hear the live execution of tracks from her landmark debut album Melt and the brilliant 2026 expansion EP, Bloom",
  ],
  whatToExpect: [
    "Intimate Performance",
    "Dark Mood Visuals",
    "Dreamy Atmosphere",
    "Synth & Atmospheric",
  ],
  bestFor: [
    "Lyric & Narrative Obsessives",
    "Bass & Groove Lovers",
  ],
  similarArtists: [
    {
      name: "Ethel Cain",
      slug: "ethel-cain",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783bbecf739fb7198dffd61795",
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
    {
      name: "YUNGBLUD",
      slug: "yungblud",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1787c9287712c4355e54c94e0d0",
    },
  ],
  tracks: [
    {
      spotifyId: "47rCs1JJXC6AG20WKbyOUR",
      name: "Back To You",
      album: "Melt",
      duration: "4:35",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02b031f864e75e48cf3ee1c949",
    },
    {
      spotifyId: "0cqrg8N4D0260NkHGUoS0z",
      name: "Puddles",
      album: "Melt",
      duration: "5:24",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02b031f864e75e48cf3ee1c949",
    },
    { name: "Ache", album: "Melt", duration: "" },
  ],
  about:
    "Not for Radio is the solo avant-garde project of María Zardoya, the lead vocalist and songwriter of the Grammy-nominated indie-pop band The Marías. Written in isolation amid the snowy hills of Upstate New York, the project steps completely out of pop comfort zones to craft intimate, tape-warped psychedelic ballads imbued with gothic romanticism. Following her chart-topping 2025 debut album 'Melt' and 2026's 'Bloom' EP, her live festival layout translates raw, close-mic'd emotional vulnerability into a beautifully rich, cinematic live performance.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "Allianz",
    day: "Friday",
    date: "Jul 31",
    startTime: "7:40 PM",
    endTime: "8:40 PM",
  },
};

const zaraLarsson: Artist = {
  name: "Zara Larsson",
  slug: "zara-larsson",
  genres: ["Pop", "Dance Pop", "R&B"],
  origin: "Stockholm, Sweden",
  tagline:
    "Pristine, multi-platinum Scandinavian pop brilliance backed by high-fashion choreography.",
  socials: { spotify: "https://open.spotify.com/artist/1Xylc3o4UrD53lo9CvFvVg" },
  whySee: [
    "A masterclass in world-class, polished pop execution delivering massive global chart-toppers straight to the mainstage",
    "Zara Larsson's phenomenal, soaring vocal range executed flawlessly through complex, high-energy dance structures",
    "Experience the thrilling live debuts of fresh, trendsetting R&B-infused tracks from her current 2026 studio era",
    "An absolute stadium-scale pop celebration packed with massive group singalongs and blinding, high-production staging",
  ],
  whatToExpect: [
    "Choreography",
    "Cinematic Visuals",
  ],
  bestFor: [
    "Dance Floor Seekers",
  ],
  similarArtists: [
    {
      name: "Tate McRae",
      slug: "tate-mcrae",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bed8016bd64422793ff3bc75",
    },
    {
      name: "Jade",
      slug: "jade",
      imageUrl: "https://i.scdn.co/image/a0e0fd64fd74b658761ea717e2126b1bad974f4a",
    },
    {
      name: "aespa",
      slug: "aespa",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178053bbb910dda6d4ab0618b8b",
    },
    { name: "Justine Skye", slug: "justine-skye" },
  ],
  tracks: [
    { name: "Symphony", album: "So Good", duration: "" },
    {
      spotifyId: "1rIKgCH4H52lrvDcz50hS8",
      name: "Lush Life",
      album: "So Good",
      duration: "3:20",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02401bf6103d4b7f5230a21582",
    },
    {
      spotifyId: "1G1kKHczSz6Xqv5dCmtkL4",
      name: "Can't Tame Her",
      album: "Venus",
      duration: "3:16",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0249fc03f707bd427965a63798",
    },
  ],
  about:
    "Zara Larsson is a Stockholm-born global pop powerhouse whose sharp combination of multi-platinum vocal authority, sleek electronic production, and commanding choreography has earned her billions of streams worldwide. Breaking onto international charts as a teenage phenom, she has spent over a decade refining a sound that bridges Scandinavian pop precision with contemporary club-ready R&B grooves. Backed by an exceptionally polished live band and elite dancers, her late afternoon performance provides a high-energy masterclass in pure, unadulterated mainstage pop dominance.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "T-Mobile",
    day: "Friday",
    date: "Jul 31",
    startTime: "4:40 PM",
    endTime: "5:40 PM",
  },
};

const freddieGibbs: Artist = {
  name: "Freddie Gibbs",
  slug: "freddie-gibbs",
  genres: ["Hip-Hop", "Gangsta Rap", "Underground Rap"],
  origin: "Gary, Indiana",
  tagline: "Unrivaled, rapid-fire technical lyricism and raw underground rap royalty.",
  socials: { spotify: "https://open.spotify.com/artist/0Y4inQK6OespitzD6ijMwb" },
  whySee: [
    "A masterclass in technical rap execution from one of the absolute finest pure lyricists of the modern era",
    "Gibbs' legendary, razor-sharp double-time flows delivered with absolute precision completely acapella without a backing track",
    "Experience the gritty, soul-sampled cinematic textures of underground milestones like Piñata performed live at scale",
    "The ultimate late-night underground option for hip-hop purists looking for raw lyrical muscle over commercial pop trap",
  ],
  whatToExpect: [
    "Cinematic Visuals",
    "Intense Fan Connection",
  ],
  bestFor: [
    "Lyric & Narrative Obsessives",
    "Tent & Club Venue Seekers",
    "Sound Design & Production Nerds",
  ],
  similarArtists: [
    {
      name: "Clipse",
      slug: "clipse",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1787d6973a4df776665c9852f26",
    },
    {
      name: "Jennie",
      slug: "jennie",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a8e3627e392a1d8f539cb575",
    },
    {
      name: "CORTIS",
      slug: "cortis",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178267afab76836557af2bd37c8",
    },
    {
      name: "Little Simz",
      slug: "little-simz",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a22264dfbad2d96ffc6ee2e0",
    },
  ],
  tracks: [
    {
      spotifyId: "4w5m4X0OZ2IslxNOgtntTN",
      name: "Crime Pays",
      album: "Bandana",
      duration: "3:02",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e028d479573710dcbce5414d548",
    },
    { name: "Thuggin'", album: "Piñata", duration: "" },
    {
      spotifyId: "15NQ3x1f2GUhqs8oBXhTqp",
      name: "Scottie Beam",
      album: "Alfredo",
      duration: "4:04",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0252c24049a16d59e98a638651",
    },
  ],
  about:
    "Freddie Gibbs is a Gary, Indiana-born rapper whose uncompromising independent path and pristine, machine-gun lyrical delivery have established him as an essential vanguard of contemporary hip-hop. Celebrated for his uncanny ability to float effortlessly over complex, avant-garde production landscapes—most notably his classic collaborative records with Madlib and Alchemist—Gibbs writes stark, cinematic street journals with profound precision. Closing down the late-night slot, his live performance is a masterclass in pure, unadulterated mic control and underground authority.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Sub-headliner",
    stage: "Airbnb",
    day: "Friday",
    date: "Jul 31",
    startTime: "9:15 PM",
    endTime: "10:00 PM",
  },
};

const sukiWaterhouse: Artist = {
  name: "Suki Waterhouse",
  slug: "suki-waterhouse",
  genres: ["Indie Pop", "Dream Pop", "Subversive Pop"],
  origin: "London, England",
  tagline: "Cinematic, vintage-hued dream pop and smoky, melancholic indie storytelling.",
  socials: { spotify: "https://open.spotify.com/artist/5GGJosGMs08YEmKTZJe1fL" },
  whySee: [
    "The premier festival tour showcasing her highly celebrated, beautifully brooding 2024 studio masterwork, Memoir of a Sparklemuffin",
    "Suki Waterhouse's distinctly smoky, low-slung vocal textures wrapping around rich, vintage-hued alternative arrangements",
    "A gorgeously cinematic, late-afternoon sunset oasis that plays out like a classic 1970s Hollywood noir movie soundtrack",
    "Experience an elite independent pop darling whose project masterfully balances raw emotional intimacy with massive stage style",
  ],
  whatToExpect: [
    "Guitar-Driven Sound",
    "Cinematic Visuals",
    "Afternoon Vibes",
  ],
  bestFor: [
    "Sound Design & Production Nerds",
    "Lyric & Narrative Obsessives",
    "Dance Floor Seekers",
  ],
  similarArtists: [
    {
      name: "The xx",
      slug: "the-xx",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783a96db4736ef035e1fcb2516",
    },
    {
      name: "New Constellations",
      slug: "new-constellations",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786a3aa969f4f79f38b0c16c91",
    },
    { name: "Sunshine", slug: "sunshine" },
    {
      name: "The Army, The Navy",
      slug: "the-army-the-navy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a80252ae3d399fc49014502d",
    },
  ],
  tracks: [
    { name: "Good Looking", album: "I Can't Let Go", duration: "" },
    {
      spotifyId: "4pteEcX2rHSJXK8XSOtWP8",
      name: "To Love",
      album: "Memoir of a Sparklemuffin",
      duration: "3:56",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02a9b6153a531deea48b17b26b",
    },
    {
      spotifyId: "5vYjTN8d0DZ2SosbKSx5Nj",
      name: "OMG",
      album: "Memoir of a Sparklemuffin",
      duration: "2:58",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02a9b6153a531deea48b17b26b",
    },
  ],
  about:
    "Suki Waterhouse is a London-born singer-songwriter and actress whose meticulous combination of hazy 1960s girl-group pop melodies, driving indie rock, and smoky, melancholic storytelling has fostered a deeply passionate global community. Dissecting themes of public scrutiny, intense romance, and transient fame with profound lyrical wit, her Sub Pop-backed records have solidified her as a premier alternative auteur. Moving onto the Allianz stage for a high-profile slot, her live performance elevates raw bedroom vulnerability into an exceptionally stylish, widescreen cinematic diary entry.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Friday",
    date: "Jul 31",
    startTime: "5:40 PM",
    endTime: "6:40 PM",
  },
};

const i_dle: Artist = {
  name: "I-DLE",
  slug: "i-dle",
  imageUrl: "/artists/heroes/i-dle.jpg",
  genres: ["K-Pop", "Pop", "Electronic Rock"],
  origin: "Seoul, South Korea",
  tagline: "Fiercely self-produced K-pop icons delivering bold, genre-fluid theatrical dominance.",
  socials: { spotify: "https://open.spotify.com/artist/2AfmfGFbe0A0WsTYm0SDTx" },
  whySee: [
    "A rare, high-visibility American festival appearance from one of K-pop's most fiercely independent, self-produced female groups",
    "Soyeon, Miyeon, Minnie, Yuqi, and Shuhua executing a bold, theatrical performance locked in absolute synchronization",
    "Experience an exceptional blend of heavy hip-hop rhythm blocks, alternative rock guitars, and massive global pop hooks",
    "A deeply passionate, high-energy afternoon crowd environment fueled by intense stadium-scale fan chants and choreography",
  ],
  whatToExpect: [
    "Choreography",
    "Cinematic Visuals",
    "Intense Fan Connection",
  ],
  bestFor: [
    "Dance Floor Seekers",
  ],
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
      name: "Charli XCX",
      slug: "charli-xcx",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786fa76436a2bba83b9f1d6fd1",
    },
    {
      name: "Faouzia",
      slug: "faouzia",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786310c4d3dcfe99b0a9da2a30",
    },
  ],
  tracks: [
    {
      spotifyId: "5L7MoCA875qqRJoKnGCxkE",
      name: "TOMBOY",
      album: "I NEVER DIE",
      duration: "2:54",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02b62f52ff9fa548d7b797e3cc",
    },
    {
      spotifyId: "3xtPQCHJQ3o70PeVAaZSG2",
      name: "Queencard",
      album: "I feel",
      duration: "2:41",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0236de7dd078a0fc1de60848e3",
    },
    {
      spotifyId: "0uLcuydgTo4ErT6aQQayuw",
      name: "Super Lady",
      album: "2",
      duration: "2:32",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e025bab7b7d85bfe446e172e4e1",
    },
  ],
  about:
    "Formed in Seoul, I-DLE stands out as an exceptional anomaly in the global K-pop landscape, widely celebrated for directly writing, arranging, and producing their own boundary-pushing material led by leader Soyeon. Shattering structural industry norms with multi-platinum conceptual masterpieces like 'TOMBOY' and 'Queencard', the group pairs bold, empowering feminist commentary with genre-fluid alternative textures. Making their highly anticipated debut on the T-Mobile stage, their mid-afternoon performance brings an absolute masterclass in live theatrical command and unbroken pop velocity.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "T-Mobile",
    day: "Friday",
    date: "Jul 31",
    startTime: "2:40 PM",
    endTime: "3:40 PM",
  },
};

const mustard: Artist = {
  name: "Mustard",
  slug: "mustard",
  genres: ["Hip-Hop", "West Coast Rap", "Trap"],
  origin: "Los Angeles, California",
  tagline: "The multi-platinum architect of the modern West Coast rap soundscape.",
  socials: { spotify: "https://open.spotify.com/artist/0YinUQ50QDB7ZxSCLyQ40k" },
  whySee: [
    "A non-stop, high-energy festival party packed back-to-back with a decade of global, multi-platinum rap radio anthems",
    "Experience the live celebration of his massive 2026 studio era following his generation-defining work on Kendrick Lamar's records",
    "An absolute masterclass in West Coast party curation, blending heavy, bounce-driven synth lines with crisp sub-bass loops",
    "A premier evening crowd catalyst on Perry's stage designed purely to get tens of thousands of friends dancing together",
  ],
  whatToExpect: [
    "Synth & Atmospheric",
    "Massive Singalongs",
    "Bass & Groove",
    "High-Energy Pacing",
  ],
  bestFor: [
    "West Coast hip-hop purists",
    "Late-night club music veterans",
    "Groups of friends partying",
    "High-visibility dance tent seekers",
    "Legacy anthem hunters",
  ],
  similarArtists: [
    {
      name: "Monaleo",
      slug: "monaleo",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17867d27938b6b6046bd09e020c",
    },
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
      name: "LYNY",
      slug: "lyny",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178ec6b5f8aa6b2ee962d3de80f",
    },
  ],
  tracks: [
    {
      spotifyId: "3j84U36KvLeXNDPv4t5pI8",
      name: "Pure Water (with Migos)",
      album: "Perfect Ten",
      duration: "3:12",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0293b1e96fad758869d0974162",
    },
    {
      spotifyId: "3QzAOrNlsabgbMwlZt7TAY",
      name: "Ballin' (with Roddy Ricch)",
      album: "Perfect Ten",
      duration: "3:00",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0293b1e96fad758869d0974162",
    },
    { name: "Not Like Us", album: "GNX", duration: "" },
  ],
  about:
    "Dijon McFarlane, performing under the iconic moniker Mustard, is a Grammy-winning multi-platinum producer and DJ who completely re-engineered the sonic blueprint of contemporary hip-hop with his signature 'ratchet' sound. Characterized by minimalist, high-tempo club synth loops and crisp, infectious clap-percussion, his production has anchored some of the largest radio hits of the past decade. Coming off a historic run cementing cultural anthems globally, his prime evening performance under the Perry's tent serves as a massive, high-velocity celebration of modern rap history.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Friday",
    date: "Jul 31",
    startTime: "7:00 PM",
    endTime: "8:00 PM",
  },
};

const oklou: Artist = {
  name: "Oklou",
  slug: "oklou",
  genres: ["Ambient Pop", "Alternative R&B", "Electronic"],
  origin: "Paris, France",
  tagline: "Hazy, introspective ambient pop that feels like a late-night digital sanctuary.",
  socials: { spotify: "https://open.spotify.com/artist/6fFcUOFcbjeIuEomuUthkw" },
  whySee: [
    "Experience Marylou Mayniel's mesmerizing, cloud-like electronic dreamscapes live under the open afternoon sky",
    "Hear the live execution of fresh, breathtaking material from her highly anticipated 2025/2026 sophomore studio era",
    "A beautifully intimate, atmospheric sonic oasis designed perfectly to completely escape standard commercial festival noise",
    "Pristine, close-mic'd vocal layers wrapped in lush, modern electronic production that makes giant crowds feel small",
  ],
  whatToExpect: [
    "Dreamy Atmosphere",
    "Intimate Performance",
    "Retro-Futuristic Aesthetic",
    "Afternoon Vibes",
  ],
  bestFor: [
    "Lyric & Narrative Obsessives",
  ],
  similarArtists: [
    {
      name: "AYYBO",
      slug: "ayybo",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f8c3472c2555b482981daecf",
    },
    {
      name: "John Summit",
      slug: "john-summit",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17820662b32f3dbabad755dfb53",
    },
    {
      name: "Snow Strippers",
      slug: "snow-strippers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782949c67f381d533010389d6a",
    },
    {
      name: "Devault",
      slug: "devault",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178669860fe69ee33857a3bdeb6",
    },
  ],
  tracks: [
    { name: "Galore", album: "Galore", duration: "" },
    { name: "Shed Light", album: "Galore", duration: "" },
    { name: "family_and_friends", album: "family_and_friends", duration: "" },
  ],
  about:
    "Oklou is the moniker of French producer, singer, and multi-instrumentalist Marylou Mayniel, whose meticulous blend of hazy ambient pop, low-slung alternative R&B, and digital world-building has earned her widespread critical adoration. Originally breaking out of the European avant-garde club networks, she redefined the boundaries of bedroom electronica with her landmark mixtape 'Galore'. Commandingly delicate, her early afternoon live set translates raw, internet-age emotional vulnerability into an exceptionally stylish, widescreen cinematic diary entry.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Friday",
    date: "Jul 31",
    startTime: "5:30 PM",
    endTime: "6:15 PM",
  },
};

const horsegiirL: Artist = {
  name: "horsegiirL",
  slug: "horsegiirl",
  genres: ["Happy Hardcore", "Eurodance", "Electronic"],
  origin: "Berlin, Germany",
  tagline: "High-velocity, hyper-stylized Eurodance energy and farmyard techno chaos.",
  socials: { spotify: "https://open.spotify.com/artist/0auP293abZeTWwMUi3fZw2" },
  whySee: [
    "The undisputed internet-cult phenomenon bringing a rapid-fire, blindingly fast happy hardcore assault to the Perry's tent",
    "Her iconic, theatrical equine mask performance framing a deeply chaotic and joyous audio-visual rave landscape",
    "Experience a non-stop, terminal velocity electronic dance party built purely around viral 160 BPM club weapons",
    "The ultimate high-energy Friday catalyst designed to unify tens of thousands of ravers into one massive dancing crowd",
  ],
  whatToExpect: [
    "Cinematic Visuals",
    "Bass & Groove",
    "High-Production Visuals",
    "High-Energy Pacing",
  ],
  bestFor: [
    "Tent & Club Venue Seekers",
    "Dance Floor Seekers",
  ],
  similarArtists: [
    {
      name: "MC4D",
      slug: "mc4d",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178042776271fc2c09e905c93e6",
    },
    {
      name: "Eli Brown",
      slug: "eli-brown",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178264c8c3a982604908c6cf188",
    },
    {
      name: "aespa",
      slug: "aespa",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178053bbb910dda6d4ab0618b8b",
    },
    {
      name: "Snow Strippers",
      slug: "snow-strippers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782949c67f381d533010389d6a",
    },
  ],
  tracks: [
    {
      spotifyId: "1bXW9UIZWmXtoSGXJvyyAm",
      name: "My Barn My Rules",
      album: "My Barn My Rules",
      duration: "4:26",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02359150676224da56cd04af22",
    },
    { name: "Farmyard Disco", album: "Farmyard Disco", duration: "" },
    { name: "Eat, Sleep, Barn, Repeat", album: "Eat, Sleep, Barn, Repeat", duration: "" },
  ],
  about:
    "the line-up outlier horsegiirL is the enigmatic, masked Berlin-based producer and DJ who completely re-engineered the contemporary electronic underground landscape with her hyper-stylized brand of Eurodance and happy hardcore. Defying strict club seriousness while maintaining flawless technical mixing skills, she weaponizes addictive vocal hooks and blistering, 160-plus BPM farmyard-themed parodies into genuine global rave anthems. Ready to detonate her evening slot, her live festival layout completely transforms the park into an uncompromising, high-velocity new rave paradise.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Friday",
    date: "Jul 31",
    startTime: "8:00 PM",
    endTime: "8:45 PM",
  },
};

const theStorySoFar: Artist = {
  name: "The Story So Far",
  slug: "the-story-so-far",
  genres: ["Pop-Punk", "Alternative Rock"],
  origin: "Walnut Creek, California",
  tagline:
    "Blistering, emotionally raw pop-punk grit backed by seasoned stadium rock musicianship.",
  socials: { spotify: "https://open.spotify.com/artist/6meTcQ79DrfkIuSLPZkpBg" },
  whySee: [
    "A seasoned, sub-cultural live powerhouse celebrating over a decade of explosive, guitar-driven anthems on the mainstage",
    "Hear the heavy, deeply introspective live cuts from their critically adored studio milestone, I Want to Disappear",
    "Parker Cannon's uniquely intense vocal delivery commanding massive, park-wide crowd singalongs and explosive mosh pits",
    "A masterclass in traditional analog band energy that balances raw, aggressive punk speed with pristine melodic hooks",
  ],
  whatToExpect: [
    "Massive Singalongs",
    "Energetic Mosh Pits",
    "Guitar-Driven Sound",
  ],
  bestFor: [
    "Pop-punk nostalgia lovers",
    "Alternative rock traditionalists",
    "Mosh pit veterans",
    "Guitar music purists",
    "High-visibility mainstage crowds",
  ],
  similarArtists: [
    {
      name: "YUNGBLUD",
      slug: "yungblud",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1787c9287712c4355e54c94e0d0",
    },
    {
      name: "Wolf Alice",
      slug: "wolf-alice",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178517744f1b17b914a3ac923b7",
    },
    {
      name: "The Smashing Pumpkins",
      slug: "smashing-pumpkins",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782897dd777bbd8e3f23e49c99",
    },
    { name: "The Bends", slug: "the-bends" },
  ],
  tracks: [
    {
      spotifyId: "0gbOxjbPp3uhHvd6NwyjsS",
      name: "Quicksand",
      album: "Under Soil and Dirt",
      duration: "2:38",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02401613392636f849af65b8f8",
    },
    {
      spotifyId: "3bMJ6xtg036GkiBJS1guYX",
      name: "Big Blind",
      album: "I Want to Disappear",
      duration: "2:27",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0277d1d9c81ea5e1d54055d51b",
    },
    {
      spotifyId: "20IiJcm7Kur78VPm53uO87",
      name: "Letterman",
      album: "I Want to Disappear",
      duration: "3:01",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0277d1d9c81ea5e1d54055d51b",
    },
  ],
  about:
    "The Story So Far is the Walnut Creek-born five-piece rock outfit whose hyper-aggressive blend of distorted pop-punk grit and raw, therapeutic lyricism has established them as foundational modern titans of the alternative scene. Writing with the heavy structural weight of classic post-hardcore but injected with exceptional melodic pacing, the band maps an intense sonic universe built around grief and forward momentum. Hot off their widely acclaimed studio return 'I Want to Disappear', their late afternoon performance brings a beautifully raw rock clinic to Grant Park.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Bud Light",
    day: "Friday",
    date: "Jul 31",
    startTime: "4:30 PM",
    endTime: "5:30 PM",
  },
};

const loathe: Artist = {
  name: "Loathe",
  slug: "loathe",
  genres: ["Deftones-Core", "Metalcore", "Shoegaze"],
  origin: "Liverpool, England",
  tagline:
    "A terrifyingly beautiful, blistering collision of heavy metalcore brutality and lush shoegaze textures.",
  socials: { spotify: "https://open.spotify.com/artist/4G9wSdX0klmoHfjm9i6DLd" },
  whySee: [
    "One of metal's absolute finest contemporary innovators delivering a high-octane audio-visual sermon to the alternative stage",
    "Kadeem France's feral, soaring vocal command shifting effortlessly from brutal screams to gorgeous dream-pop runs",
    "Experience the live, towering execution of tracks from their genre-shattering masterpiece, I Let It In and It Took Everything",
    "A blistering live rock engine that transforms traditional festival mosh pits into deeply emotional performance art",
  ],
  whatToExpect: [
    "Guitar-Driven Sound",
    "Lush Sound",
    "Raw Vocal Delivery",
    "Energetic Mosh Pits",
  ],
  bestFor: [
    "Mosh Pit Lovers",
    "Sound Design & Production Nerds",
  ],
  similarArtists: [
    {
      name: "Sunday (1994)",
      slug: "sunday-1994",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b7e25151a004217ba46eb173",
    },
    {
      name: "Wolf Alice",
      slug: "wolf-alice",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178517744f1b17b914a3ac923b7",
    },
    {
      name: "The Smashing Pumpkins",
      slug: "smashing-pumpkins",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782897dd777bbd8e3f23e49c99",
    },
    { name: "The Bends", slug: "the-bends" },
  ],
  tracks: [
    {
      spotifyId: "0b4TKuvZ4eJ8eHgJgXaCnN",
      name: "Two-Way Mirror",
      album: "I Let It In and It Took Everything",
      duration: "5:00",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02101232ffd5af0e3c37e2c528",
    },
    {
      spotifyId: "4OmlsAT8r4q9vPFBvfYgyZ",
      name: "Is It Really You?",
      album: "I Let It In and It Took Everything",
      duration: "4:47",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02101232ffd5af0e3c37e2c528",
    },
    { name: "Gown", album: "The Cold Sun", duration: "" },
  ],
  about:
    "Loathe is the award-winning Liverpool-born rock quartet whose uncompromising fusion of crushing metalcore architecture, cold industrial noise, and warm, cinematic dream-pop textures has sent massive shockwaves through the global underground. Commonly celebrated at the vanguard of the modern 'Deftones-core' movement, the group pairs raw interpersonal grief with profound, layered sound design. Backed by intense live musicianship and a fierce performance ethos, their early evening set stands as a thrilling masterclass in pure sonic tension.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Friday",
    date: "Jul 31",
    startTime: "5:30 PM",
    endTime: "6:30 PM",
  },
};

const nettspend: Artist = {
  name: "Nettspend",
  slug: "nettspend",
  genres: ["Plugg", "Hip-Hop", "Rage Rap"],
  origin: "Richmond, Virginia",
  tagline: "The controversial teen king of glitchy, underground internet plugg-rap velocity.",
  socials: { spotify: "https://open.spotify.com/artist/2jl4qd6UbzeCmImT4nWbtA" },
  whySee: [
    "The absolute polarising flashpoint of modern underground internet rap making a high-visibility festival statement",
    "Experience an intense display of glitchy, ambient plugg beats mixed with reckless, youthful micro-rap flows",
    "An absolute wildfire crowd environment packed with chaotic, high-energy teenage mosh pits on the Tito's stage",
    "Catch a lightning-fast underground trendsetter running on pure digital clout before he completely alters pop infrastructure",
  ],
  whatToExpect: [
    "Cinematic Visuals",
    "Energetic Mosh Pits",
    "Intense Fan Connection",
  ],
  bestFor: [
    "Underground plugg rap purists",
    "Internet rap scene trend spotters",
    "Mosh pit traditionalists",
    "Adrenaline-fueled dance seekers",
    "Gen-Z culture collectors",
  ],
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
      name: "Little Simz",
      slug: "little-simz",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a22264dfbad2d96ffc6ee2e0",
    },
    {
      name: "Clipse",
      slug: "clipse",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1787d6973a4df776665c9852f26",
    },
  ],
  tracks: [
    {
      spotifyId: "0825Ia6TYZl2BY13fyO6rJ",
      name: "shine n peace",
      album: "shine n peace",
      duration: "1:31",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02097c62711ebc71e4136040de",
    },
    { name: "bad dont quit", album: "bad dont quit", duration: "" },
    { name: "nothing like u", album: "nothing like u", duration: "" },
  ],
  about:
    "Nettspend is the Virginia-born teenage rap phenom who rapidly vaulted from Soundcloud isolation into global pop attention, commanding an intensely passionate internet-cult following. Characterized by his unique choice of hazy, loop-heavy underground production and unstructured, stream-of-consciousness flows, he embodies the post-rage aesthetic of modern youth culture. Operating at the raw center of internet hip-hop debates, his early evening live execution completely flips traditional festival pacing for pure, energetic crowd chaos.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Friday",
    date: "Jul 31",
    startTime: "7:30 PM",
    endTime: "8:30 PM",
  },
};

const sidepiece: Artist = {
  name: "SIDEPIECE",
  slug: "sidepiece",
  genres: ["Tech House", "House", "Electronic"],
  origin: "Miami, Florida / Los Angeles, California",
  tagline: "Grammy-nominated tech-house masterminds delivering heavy, multi-platinum club anthems.",
  socials: { spotify: "https://open.spotify.com/artist/5czbzNZZfWpyFgZyfT3Mkk" },
  whySee: [
    "The combined forces of dance music heavyweights Party Favor and Nitti Gritti delivering a premier tech-house sermon",
    "A non-stop, high-energy tent party packed back-to-back with iconic global club hits like 'On My Mind'",
    "An absolute masterclass in party curation, blending heavy, rolling basslines with incredibly infectious vocal chops",
    "The ultimate mid-afternoon crowd catalyst under the Perry's tent designed purely to get thousands of people moving",
  ],
  whatToExpect: [
    "Afternoon Vibes",
    "High-Energy Pacing",
  ],
  bestFor: [
    "Tent & Club Venue Seekers",
    "Bass & Groove Lovers",
    "Groups & Social Experience",
    "Dance Floor Seekers",
  ],
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
      name: "haute & freddy",
      slug: "haute-and-freddy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f24b273d9959e097972d5992",
    },
  ],
  tracks: [
    { name: "On My Mind (with Diplo)", album: "On My Mind", duration: "" },
    {
      spotifyId: "3jIFcrHrnLgBio9z8mkMBo",
      name: "Acrobatic",
      album: "Acrobatic",
      duration: "2:56",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02a390e66882d481f6d07c7079",
    },
    { name: "1, 2 Step - SIDEPIECE Remix", album: "1, 2 Step", duration: "" },
  ],
  about:
    "SIDEPIECE is the Grammy-nominated electronic collaboration of highly respected producers Party Favor and Nitti Gritti, whose meticulous combination of classic house grooves, heavy tech-house rolling basslines, and massive crossover pop appeal has earned them multi-platinum acclaim worldwide. Dominating mainstages globally, the duo has spent over half a decade refining a sound that pairs infectious underground club sensibilities with pristine radio hooks. Backed by a flawless touring setup, their high-velocity afternoon performance provides a definitive dancefloor clinic.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Friday",
    date: "Jul 31",
    startTime: "5:45 PM",
    endTime: "6:45 PM",
  },
};

const skyeNewman: Artist = {
  name: "Skye Newman",
  slug: "skye-newman",
  genres: ["Indie Pop", "Singer-Songwriter"],
  origin: "New York, New York",
  tagline:
    "Stunning, whisper-close confessional bedroom pop tracking the modern vulnerabilities of youth.",
  socials: { spotify: "https://open.spotify.com/artist/4UoEzpWZrFWvlGYOzTEn1M" },
  whySee: [
    "Catch an exceptional independent lyricist executing a deeply atmospheric, storyteller-style performance on the mainstage",
    "Songwriting that lands like an intense, unguarded voice memo tracking the complex textures of young romance and identity",
    "A beautiful, sun-drenched early afternoon oasis that pairs delicate vocal textures with soaring indie pop melodies",
    "The official festival tour run highlighting her highly celebrated independent studio catalog to a massive live audience",
  ],
  whatToExpect: [
    "Lyrical Storytelling",
    "Guitar-Driven Sound",
    "Conversational Delivery",
    "Dreamy Atmosphere",
  ],
  bestFor: [
    "Lyric & Narrative Obsessives",
    "Early Afternoon Discovery",
  ],
  similarArtists: [
    { name: "Stella Lefty", slug: "stella-lefty" },
    {
      name: "Ella Boh",
      slug: "ella-boh",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f3ca12f1b323dbb7027d78dc",
    },
    {
      name: "Audrey Hobert",
      slug: "audrey-hobert",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1784fc78e354b19324810f1e933",
    },
    { name: "Porch Light", slug: "porch-light" },
  ],
  tracks: [
    { name: "Daydream", album: "Skye Newman", duration: "" },
    { name: "Complicated", album: "Skye Newman", duration: "" },
    { name: "Paper Planes", album: "Skye Newman", duration: "" },
  ],
  about:
    "Skye Newman is a New York-born singer-songwriter who built an intensely passionate global community through her hyper-specific, beautifully diaristic brand of contemporary indie pop. Rooted in the emotional intimacy of close-mic'd acoustic infrastructure but elevated by bright, modern pop production, her tracks dissect the anxieties and shifting dynamics of young adulthood with profound precision. Handpicked for a massive global breakout tour cycle, her early mainstage set transforms a sprawling festival lawn into an intimate, shared bedroom listening session.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Friday",
    date: "Jul 31",
    startTime: "3:40 PM",
    endTime: "4:40 PM",
  },
};

const notion: Artist = {
  name: "Notion",
  slug: "notion",
  genres: ["UK Garage", "Bassline", "House"],
  origin: "Bristol, England",
  tagline:
    "High-octane, hyper-precise UK garage driving the modern electronic underground dance revival.",
  socials: { spotify: "https://open.spotify.com/artist/1uRVM0wBdtyEuU582EeKJM" },
  whySee: [
    "One of Bristol's finest bass technicians commanding an intense, high-energy UK garage session in the Perry's tent",
    "Experience a relentless display of syncopated swing rhythms, heavy bassline rollers, and infectious classic vocal chops",
    "Catch a pioneer of the current international electronic groove resurgence during a prime, highly anticipated Friday slot",
    "An absolute, non-stop dance accelerator designed perfectly to turn a festival crowd into a boiling warehouse rave",
  ],
  whatToExpect: [
    "Bass & Groove",
    "Melodic Vocal Hooks",
    "High-Energy Pacing",
  ],
  bestFor: [
    "Bass & Groove Lovers",
    "Tent & Club Venue Seekers",
    "Dance Floor Seekers",
  ],
  similarArtists: [
    {
      name: "MPH",
      slug: "mph",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1787e64c67ba432f9223f1acf9f",
    },
    {
      name: "Chace",
      slug: "chace",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f75bb8d64c3d43282ad006f7",
    },
    {
      name: "Duke Dumont",
      slug: "duke-dumont",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c0791f9c2d17dfd58e301c91",
    },
    {
      name: "SIDEPIECE",
      slug: "sidepiece",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17821705221c7f192d4a7963910",
    },
  ],
  tracks: [
    { name: "Found MNE", album: "Forwards", duration: "" },
    {
      spotifyId: "4v7kKFlEDmpVToHOICsXaM",
      name: "Hooked",
      album: "Hooked",
      duration: "3:26",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02669e196874273595fb78bb1b",
    },
    { name: "Wasn't Ready", album: "Forwards", duration: "" },
  ],
  about:
    "Notion is the artistic project of Bristol-born DJ and electronic producer who has rapidly solidified his position as one of the modern era's most prolific and essential UK Garage forces. Blending the nostalgic, soulful swing of late-90s garage with the crushing, heavy bassline weight of contemporary underground club culture, his landmark full-length project 'Forwards' earned widespread institutional praise. Behind the decks, Notion delivers a technically flawless, high-tempo masterclass in rhythm manipulation that sets the exact standard for modern club music.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Friday",
    date: "Jul 31",
    startTime: "4:15 PM",
    endTime: "5:15 PM",
  },
};

const roz: Artist = {
  name: "RØZ",
  slug: "roz",
  genres: ["Tech House", "Bass House", "Electronic"],
  origin: "Los Angeles, California",
  tagline: "Sultry, low-slung house grooves packed with heavy underground attitude.",
  socials: { spotify: "https://open.spotify.com/artist/0aULg7LximLNhI6lLzxcXI" },
  whySee: [
    "Catch one of the electronic underground's most fiercely watched tech-house selectors commanding a prime mid-afternoon tent session",
    "An elite display of rolling sub-bass steps, crisp percussion accents, and flawlessly mixed independent club tracks",
    "Experience a dark, hyper-stylized dancefloor environment that brings a distinct West Coast warehouse energy to the park",
    "The absolute perfect afternoon groove engine designed specifically to get thousands of people moving early under the tent",
  ],
  whatToExpect: [
    "Bass & Groove",
    "Afternoon Vibes",
    "High-Energy Pacing",
  ],
  bestFor: [
    "Tent & Club Venue Seekers",
    "Dance Floor Seekers",
    "Bass & Groove Lovers",
  ],
  similarArtists: [
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
      name: "Eli Brown",
      slug: "eli-brown",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178264c8c3a982604908c6cf188",
    },
    {
      name: "SIDEPIECE",
      slug: "sidepiece",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17821705221c7f192d4a7963910",
    },
  ],
  tracks: [
    { name: "Talk To Me", album: "Talk To Me", duration: "" },
    { name: "Backroom", album: "Strictly Rhythm", duration: "" },
    {
      spotifyId: "1gWaDtgA6daqLr3QsV3qrq",
      name: "Grounded",
      album: "Grounded",
      duration: "2:43",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e028a51329d85038ffda2047038",
    },
  ],
  about:
    "RØZ is the artistic project of Los Angeles-born producer and DJ whose meticulous blend of moody tech-house infrastructure, deep bass rollers, and high-fashion aesthetics has captured intense dancefloor focus worldwide. Originally breaking out of the Southern California underground rave circuits, she has spent the modern era carving out a lane that values raw analog swing over commercial EDM clichés. Backed by a relentless touring calendar and heavy support from global dance titans, her live performance delivers a beautifully polished, high-velocity lesson in modern club mechanics.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Friday",
    date: "Jul 31",
    startTime: "3:00 PM",
    endTime: "4:00 PM",
  },
};

const baluBrigada: Artist = {
  name: "Balu Brigada",
  slug: "balu-brigada",
  genres: ["Indie Pop", "Alt-Pop", "Groove Pop"],
  origin: "Auckland, New Zealand",
  tagline: "Glitchy, neon-drenched groove pop built around seamless brotherly vocal harmonies.",
  socials: { spotify: "https://open.spotify.com/artist/6O9vGMmTwzihULICPCsNf2" },
  whySee: [
    "The internet-favorite sibling duo bringing their hyper-aesthetic, groove-laden brand of alt-pop directly to the Bud Light stage",
    "Henry and Pierre Beasley's perfectly synchronized vocal lines gliding over incredibly infectious, low-slung bass pockets",
    "Hear the live execution of fresh, chart-climbing material from their critically adored Atlantic Records studio era",
    "A beautifully curated afternoon vibe check that translates modern indie internet culture into a colorful live experience",
  ],
  whatToExpect: [
    "Bass & Groove",
    "Dreamy Atmosphere",
    "Ensemble Format",
    "Production Style Approach",
  ],
  bestFor: [
    "Bass & Groove Lovers",
  ],
  similarArtists: [
    {
      name: "Ryman",
      slug: "ryman",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783b319d5a8ef036ba5e7fed10",
    },
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
      name: "sombr",
      slug: "sombr",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17878edaa6468cae153565c2c97",
    },
  ],
  tracks: [
    { name: "Preview", album: "Find A Way EP", duration: "" },
    { name: "Designer", album: "I'm Not From London", duration: "" },
    { name: "SOBER", album: "SOBER", duration: "" },
  ],
  about:
    "Balu Brigada is the self-described 'groove-pop' project of Auckland-born brothers Henry and Pierre Beasley, whose sharp fusion of classic hip-hop rhythm blocks, vintage synths, and glossy pop hooks has earned them global critical acclaim. Forging an intensely playful sonic universe centered around modern relationship anxieties and transient youth culture, the duo crafts tracks that are simultaneously introspective and entirely danceable. Live, their project strips away traditional indie-pop solemnity, delivering an exceptionally stylish, high-energy clinic in modern pop songwriting.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Bud Light",
    day: "Friday",
    date: "Jul 31",
    startTime: "2:30 PM",
    endTime: "3:30 PM",
  },
};

const lyny: Artist = {
  name: "LYNY",
  slug: "lyny",
  genres: ["Trap", "Future Bass", "Electronic"],
  origin: "Chicago, Illinois",
  tagline: "Hometown underground bass royalty delivering hyper-precise, skeletal trap anthems.",
  socials: { spotify: "https://open.spotify.com/artist/7xqIp1044Z2vd9v9ZphjLa" },
  whySee: [
    "A massive, highly anticipated hometown showcase performance from a visionary turning modern trap culture on its head",
    "Experience the earth-shaking live execution of underground anthems like 'Noxious' in a boiling festival tent setting",
    "A masterclass in technical deck manipulation, fusing deep hip-hop vocal samples with punishing, minimalist bass weight",
    "An absolute early-day adrenaline accelerator built purely to push soundcloud underground design to massive scales",
  ],
  whatToExpect: [
    "Minimal Production",
    "Bass & Groove",
    "Energetic Mosh Pits",
  ],
  bestFor: [
    "Lyric & Narrative Obsessives",
    "Early Afternoon Discovery",
  ],
  similarArtists: [
    {
      name: "Know Good",
      slug: "know-good",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1785358de71801fad4a13adc2f2",
    },
    {
      name: "Alison Wonderland",
      slug: "alison-wonderland",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b7e4c34bfa9cf5b54afadb14",
    },
    {
      name: "Whethan",
      slug: "whethan",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1782717c8959d00aa37044bbb74",
    },
    { name: "KLO", slug: "klo" },
  ],
  tracks: [
    {
      spotifyId: "49ngxNljkJchygKTBrN78X",
      name: "Noxious",
      album: "Noxious",
      duration: "2:58",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0272e0587ebace81ff5942d67c",
    },
    { name: "Feint", album: "Feint", duration: "" },
    {
      spotifyId: "4kjcxM0235YwitnxBIcHL4",
      name: "Dash",
      album: "Dash",
      duration: "2:59",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0270b9ff72b529af0460ba1ac6",
    },
  ],
  about:
    "Alec Lyney, operating under the singular moniker LYNY, is a Chicago-born electronic producer and DJ who has rapidly solidified his position as one of the modern bass landscape's most fiercely creative forces. Blending the heavy, rolling low-end infrastructure of classic trap with a remarkably clean, skeletal approach to sound design, his tracks possess an immediate physical weight that bypasses traditional EDM clutter. Backed by institutional praise from the electronic elite, his early afternoon Perry's homecoming set serves as an explosive celebration of underground bass architecture.",
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

const motherMother: Artist = {
  name: "Mother Mother",
  slug: "mother-mother",
  genres: ["Indie Rock", "Alternative Rock", "Art Pop"],
  origin: "Quadra Island, Canada",
  tagline:
    "An eccentric, theatrical indie-rock force built around sharp multi-part vocal harmonies.",
  socials: { spotify: "https://open.spotify.com/artist/0e86yPdC41PGRkLp2Q1Bph" },
  whySee: [
    "A seasoned, stadium-proven live alternative outfit executing a brilliant, career-spanning performance on the Tito's stage",
    "Ryan Guldemond's distinctively sharp, eccentric vocal delivery locked in flawless sync with complex three-part backing harmonies",
    "Experience a massive, multi-generational cult favorite renowned for turning festival fields into roaring indie rock choirs",
    "Hear the live premiere of towering, theatrical rock cuts from their highly celebrated recent studio masterpieces",
  ],
  whatToExpect: [
    "Guitar-Driven Sound",
    "Massive Singalongs",
    "Crowd Atmosphere",
  ],
  bestFor: [
    "Lyric & Narrative Obsessives",
  ],
  similarArtists: [
    {
      name: "The Braymores",
      slug: "the-braymores",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178e72ca0c70ab4f5bb3da261dc",
    },
    {
      name: "Ink",
      slug: "ink",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b3df8a3980032366a3a040bc",
    },
    {
      name: "Villanelle",
      slug: "villanelle",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781ece1eae58afddb4d3238501",
    },
    { name: "Cruz Beckham and the Breakers", slug: "cruz-beckham-and-the-breakers" },
  ],
  tracks: [
    {
      spotifyId: "2kKkl59fY6Cic1CmhvSEZK",
      name: "Hayloft",
      album: "O My Heart",
      duration: "3:01",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02bf77ec4fe60aa3163d91e767",
    },
    {
      spotifyId: "4IA6pgGRmqfxWGAfyZ8cgR",
      name: "Verbatim",
      album: "Touch Up",
      duration: "2:48",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e029334fc21964be25ec3179f0f",
    },
    {
      spotifyId: "1ROCJzbhjpP7uYRrse4fzf",
      name: "Explode!",
      album: "Grief Chapter",
      duration: "2:31",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02415623894d507d8f0dfc6b56",
    },
  ],
  about:
    "Mother Mother is the Canadian alternative rock powerhouse led by singer-songwriter Ryan Guldemond alongside Jasmin Parkin and Molly Guldemond, whose meticulous blend of jagged indie rock riffs, pop theatricality, and intricate multi-part harmonies has fostered a massive global community. Originally breaking out of the Pacific Northwest underground before exploding into a multi-billion stream generational phenomenon, the band writes sweeping tales of mortality, alienation, and modern identity. Backed by exceptionally tight live chemistry, their late afternoon performance provides a high-energy masterclass in alternative performance.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Friday",
    date: "Jul 31",
    startTime: "3:30 PM",
    endTime: "4:30 PM",
  },
};

const juliaWolf: Artist = {
  name: "Julia Wolf",
  slug: "julia-wolf",
  genres: ["Alt-Pop", "Indie Pop", "Hip-Hop-Pop"],
  origin: "Queens, New York",
  tagline: "Sharp, self-aware indie alt-pop floating over heavy, low-slung hip-hop pockets.",
  socials: { spotify: "https://open.spotify.com/artist/5yvGiZLSWJTPBlZpVbPnEZ" },
  whySee: [
    "Catch an exceptional, fiercely independent lyricist executing a deeply atmospheric, confessional performance on the Tito's stage",
    "Songwriting that lands like an unguarded voice memo tracking the complex, messy textures of young romance and identity",
    "A beautiful, early afternoon oasis that pairs delicate, close-mic'd vocal layers with unexpectedly heavy baseline drops",
    "The official premier festival tour run showcasing her highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: [
    "Lyrical Storytelling",
    "Conversational Delivery",
  ],
  bestFor: [
    "Contemporary bedroom pop fans",
    "Lyric and narrative obsessives",
    "Early afternoon discovery seekers",
    "Intimate emotional story devotees",
    "Indie pop music collectors",
  ],
  similarArtists: [
    {
      name: "Ryman",
      slug: "ryman",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783b319d5a8ef036ba5e7fed10",
    },
    {
      name: "Bixby",
      slug: "bixby",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f91b9382299af20b9130c80c",
    },
    {
      name: "Lucy Bedroque",
      slug: "lucy-bedroque",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178100cfd4653979ed518fbf28f",
    },
    {
      name: "Claire Rosinkranz",
      slug: "claire-rosinkranz",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1789fd59f9fc4a311da6437b6a5",
    },
  ],
  tracks: [
    { name: "Hot Sauce", album: "Good For You", duration: "" },
    { name: "Gothic BB", album: "Good For You", duration: "" },
    { name: "Get Off My Mind", album: "Get Off My Mind", duration: "" },
  ],
  about:
    "Julia Wolf is a Queens-born, indie alt-pop singer and songwriter who built an intensely passionate global community through her hyper-specific, beautifully blunt brand of hip-hop-infused pop storytelling. Rooted in the emotional intimacy of bedroom pop but elevated by deep, heavy urban rhythm pockets and sharp vocal deliveries, her tracks explore self-reliance and the modern anxieties of youth culture with profound precision. Handpicked for massive global breakout tour blocks, her early afternoon live set transforms a sprawling festival field into an intimate listening experience.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Friday",
    date: "Jul 31",
    startTime: "1:45 PM",
    endTime: "2:30 PM",
  },
};

const slayyyter: Artist = {
  name: "Slayyyter",
  slug: "slayyyter",
  genres: ["Hyperpop", "Dance Pop", "Electropop"],
  origin: "St. Louis, Missouri",
  tagline: "High-camp pop chaos and provocative, Y2K-drenched electronic pop perfection.",
  socials: { spotify: "https://open.spotify.com/artist/4QM5QCHicznALtX885CnZC" },
  whySee: [
    "The undisputed hyperpop high princess bringing an explosive, completely unhinged club party directly to the Airbnb stage",
    "Catherine Slater's magnetic stage command delivering sharp choreography alongside high-fashion electronic production",
    "Experience a cult-favorite internet pioneer running through a stacked, multi-million stream catalog of futuristic pop anthems",
    "The ultimate early-evening catalyst designed purely to get groups of friends dancing wildly as the skyline shifts",
  ],
  whatToExpect: [
    "Choreography",
    "Retro-Futuristic Aesthetic",
    "Massive Singalongs",
    "Crowd Atmosphere",
  ],
  bestFor: [
    "Hyperpop culture purists",
    "Fans of witty pop camp",
    "High-velocity dance seekers",
    "Fashion-forward festival crowds",
    "Sleek commercial pop collectors",
  ],
  similarArtists: [
    {
      name: "Charli XCX",
      slug: "charli-xcx",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786fa76436a2bba83b9f1d6fd1",
    },
    {
      name: "Tate McRae",
      slug: "tate-mcrae",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178bed8016bd64422793ff3bc75",
    },
    {
      name: "ADÉLA",
      slug: "adela",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fa24d9eab0a75b1ab0f9013b",
    },
    {
      name: "Disco Lines",
      slug: "disco-lines",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178965c9bf81cfe9ca329b8a5c7",
    },
  ],
  tracks: [
    {
      spotifyId: "0HMco7zpjdsloHqToLjiLK",
      name: "Mine",
      album: "Slayyyter",
      duration: "2:39",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02c33c08b84a81b72d0e6bbd81",
    },
    {
      spotifyId: "62XyMREfDUd7LxEJhjjdO0",
      name: "Miss Belladonna",
      album: "STARFUCKER",
      duration: "3:04",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e021e687287bd7a3bbcde924c78",
    },
    {
      spotifyId: "0FVFtallahAXMsmMdy7LqW",
      name: "Erotic Electronic",
      album: "STARFUCKER",
      duration: "2:23",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e021e687287bd7a3bbcde924c78",
    },
  ],
  about:
    "Catherine Slater, performing under the iconic moniker Slayyyter, has spent the modern pop era operating at the bleeding edge of the electronic underground, rewriting the blueprints of mainstream pop through an unapologetic independent filter. Seamlessly fusing the glossy, maximalist electronic textures of late-90s Eurodance with hyper-modern internet subversion, her landmark records like 'STARFUCKER' earned widespread critical adoration. Backed by an intensely passionate fanbase, her live performance strips away traditional indie rock solemnity for a world-class masterclass in high-fashion staging and pure pop dominance.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Friday",
    date: "Jul 31",
    startTime: "6:45 PM",
    endTime: "7:30 PM",
  },
};

const claireRosinkranz: Artist = {
  name: "Claire Rosinkranz",
  slug: "claire-rosinkranz",
  genres: ["Indie Pop", "Alt-Pop", "Bedroom Pop"],
  origin: "Southern California",
  tagline: "Sun-drenched, conversational bedroom pop that plays out like real diary entries.",
  socials: { spotify: "https://open.spotify.com/artist/3V0ZQW0dNuVaFtbVYgSI24" },
  whySee: [
    "Catch a hyper-gifted multi-instrumentalist executing a beautifully warm, sun-drenched indie pop performance on the Allianz stage",
    "Songwriting that lands like an intense, playful voice memo tracking the carefree textures of youth and modern romance",
    "A stunning early afternoon oasis that pairs delicate vocal patterns with incredibly catchy, jazz-infused indie guitar lines",
    "The official festival tour run highlighting her highly celebrated Republic Records studio catalog to an international crowd",
  ],
  whatToExpect: [
    "Conversational Delivery",
    "Guitar-Driven Sound",
    "Crowd Atmosphere",
  ],
  bestFor: [
    "Lyric and songwriting obsessives",
    "Fans of contemporary bedroom pop",
    "Early afternoon discovery seekers",
    "Indie pop music collectors",
    "Chill summer melody seekers",
  ],
  similarArtists: [
    {
      name: "Lucy Bedroque",
      slug: "lucy-bedroque",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178100cfd4653979ed518fbf28f",
    },
    {
      name: "Ryman",
      slug: "ryman",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783b319d5a8ef036ba5e7fed10",
    },
    {
      name: "sombr",
      slug: "sombr",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17878edaa6468cae153565c2c97",
    },
    {
      name: "Emi Grace",
      slug: "emi-grace",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781d8d8c934c382100d033bb41",
    },
  ],
  tracks: [
    { name: "Backyard Boy", album: "Beverly Hills Boyfriend EP", duration: "" },
    { name: "Frankenstein", album: "Just Because", duration: "" },
    { name: "Pools", album: "Just Because", duration: "" },
  ],
  about:
    "Claire Rosinkranz is a Southern California-born singer, songwriter, and multi-instrumentalist who built an intensely passionate global community through her hyper-vivid, beautifully conversational brand of contemporary alt-pop. Rooted in the emotional intimacy of bedroom pop recordings but elevated by incredibly bright, jazz-infused guitar lines and snappy rhythm structures, her tracks dissect young adulthood with profound precision. Backed by widely acclaimed full-length records like 'Just Because', her early afternoon live set transforms a sprawling festival field into a vibrant outdoor listening party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Friday",
    date: "Jul 31",
    startTime: "1:40 PM",
    endTime: "2:40 PM",
  },
};

const fiftyFourUltra: Artist = {
  name: "54 Ultra",
  slug: "54-ultra",
  genres: ["Hardcore Punk", "Industrial Rock", "Alternative Rock"],
  origin: "London, England",
  tagline: "A ferocious, blistering wall of industrial punk noise designed to clear out mosh pits.",
  socials: { spotify: "https://open.spotify.com/artist/6X5L6rmyvrWWu60Gx6exiZ" },
  whySee: [
    "The absolute ultimate alternative live wildcard of the afternoon lineup, delivering an intensely aggressive rock assault",
    "A blistering display of dual-guitar distortion, heavy metallic baselinesteps, and ferocious, confrontational vocal delivery",
    "Experience a cult-favorite UK punk phenomenon renowned for transforming standard festival fields into pure mosh-pit chaos",
    "An absolute, non-stop adrenaline catalyst built around raw analog band chemistry and severe underground authority",
  ],
  whatToExpect: [
    "Guitar-Driven Sound",
    "Raw Vocal Delivery",
    "Energetic Mosh Pits",
    "High-Energy Pacing",
  ],
  bestFor: [
    "Mosh Pit Lovers",
  ],
  similarArtists: [
    {
      name: "Turnstile",
      slug: "turnstile",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a4c3fd0017b42344516dc16c",
    },
    {
      name: "The Creekers",
      slug: "the-creekers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783bd55f87a9e1be1eb5b1c1e1",
    },
    {
      name: "Villanelle",
      slug: "villanelle",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781ece1eae58afddb4d3238501",
    },
    {
      name: "Wolf Alice",
      slug: "wolf-alice",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178517744f1b17b914a3ac923b7",
    },
  ],
  tracks: [
    { name: "Vandal", album: "54 Ultra", duration: "" },
    { name: "Static", album: "54 Ultra", duration: "" },
    { name: "Chamber", album: "Chamber", duration: "" },
  ],
  about:
    "54 Ultra is the London-born punk powerhouse whose uncompromising fusion of aggressive hardcore instrumentation, abrasive industrial noise layers, and visceral lyrical delivery has earned them critical acclaim from underground purists globally. Defying modern indie-rock templates, the outfit crafts a high-tension sonic universe built entirely around raw confrontation and deeply personal subtext. Coming off a series of widely discussed international support tours, their early afternoon performance stands as a fierce masterclass in pure counter-culture urgency.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Friday",
    date: "Jul 31",
    startTime: "2:50 PM",
    endTime: "3:30 PM",
  },
};

const highVis: Artist = {
  name: "High Vis",
  slug: "high-vis",
  genres: ["Post-Punk", "Alternative Rock", "Madchester"],
  origin: "London, England",
  tagline: "Towering, emotionally massive post-punk anthems fueled by raw working-class grit.",
  socials: { spotify: "https://open.spotify.com/artist/4Gmrt82h2vjGjnp67SG5Nw" },
  whySee: [
    "One of alternative rock's absolute finest contemporary live forces delivering a deeply moving rock sermon early in the day",
    "Vocalist Sayle's ferociously raw, working-class lyrical delivery commanding an intensely emotional crowd singalong",
    "Experience a stunning combination of crushing post-punk guitar grit and soaring, 1990s-styled Madchester melodic hooks",
    "A blistering live band performance that transforms aggressive mosh pits into powerful moments of communal unity",
  ],
  whatToExpect: [
    "Guitar-Driven Sound",
    "Massive Singalongs",
    "Energetic Mosh Pits",
  ],
  bestFor: [
    "Lyric & Narrative Obsessives",
    "Mosh Pit Lovers",
    "Early Afternoon Discovery",
  ],
  similarArtists: [
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
    { name: "The Bends", slug: "the-bends" },
    {
      name: "Wunderhorse",
      slug: "wunderhorse",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1780e05e549428cb38b2f3e7a60",
    },
  ],
  tracks: [
    {
      spotifyId: "03PjveqFmnkDdYNWXrujZb",
      name: "Talk For Hours",
      album: "Blending",
      duration: "4:59",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0204c09764b48fd165dae5559d",
    },
    {
      spotifyId: "1wT90Y3nYuDhTjytAfO6Cx",
      name: "Trauma Bonds",
      album: "Blending",
      duration: "4:38",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0204c09764b48fd165dae5559d",
    },
    {
      spotifyId: "5BypykbT4N0dRhjTbXwxBE",
      name: "Mind's a Lie",
      album: "Guided Tour",
      duration: "4:46",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e0261e203453dd703eb6299d3d7",
    },
  ],
  about:
    "High Vis is the London-born alternative rock outfit whose hyper-vivid blend of heavy post-punk instrumentation, jangly alternative guitars, and raw working-class narrative poetry has established them as essential vanguards of the global scene. Emerging from the ashes of the UK hardcore punk underground, the band anchors an emotionally massive sonic landscape that addresses trauma, identity, and class solidarity with staggering honesty. Backed by their highly acclaimed studio milestone 'Guided Tour', their early afternoon mainstage performance scales bedroom vulnerability into monumental field anthems.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Bud Light",
    day: "Friday",
    date: "Jul 31",
    startTime: "1:00 PM",
    endTime: "1:45 PM",
  },
};

const finnWolfhard: Artist = {
  name: "Finn Wolfhard",
  slug: "finn-wolfhard",
  genres: ["Indie Rock", "Garage Rock", "Lo-Fi Indie"],
  origin: "Vancouver, Canada",
  tagline: "Scrappy, energetic garage rock and driving lo-fi indie with raw basement passion.",
  socials: { spotify: "https://open.spotify.com/artist/2nmWcAqQtfgNp8Kpixa2CG" },
  whySee: [
    "Catch the multi-talented alternative multi-hyphenate delivering an incredibly high-octane guitar workout early on the mainstage",
    "Experience a brilliant, fuzzy indie-rock set that favors raw, analog garage band energy over sterile pop backing tracks",
    "A masterclass in unadulterated live fun from a natural performer who treats massive festival fields like a local house party",
    "Hear the live premiere of fresh, highly anticipated guitar-driven solo project cuts making an exclusive festival debut",
  ],
  whatToExpect: [
    "Guitar-Driven Sound",
    "Conversational Delivery",
    "Crowd Atmosphere",
  ],
  bestFor: [
    "Early Afternoon Discovery",
  ],
  similarArtists: [
    { name: "Cruz Beckham and the Breakers", slug: "cruz-beckham-and-the-breakers" },
    {
      name: "Wolf Alice",
      slug: "wolf-alice",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178517744f1b17b914a3ac923b7",
    },
    {
      name: "Spacey Jane",
      slug: "spacey-jane",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f5864abfed7a8d4b9334a7a0",
    },
    {
      name: "Ella Red",
      slug: "ella-red",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17839b0de9171e1e5ff2d8a39cb",
    },
  ],
  tracks: [
    { name: "Getting Better (Otherwise)", album: "Calpurnia EP", duration: "" },
    { name: "Cell", album: "The Aubreys", duration: "" },
    { name: "Loved One", album: "Loved One", duration: "" },
  ],
  about:
    "Finn Wolfhard has spent his modern creative career effortlessly toggling between global screen acclaim and a deeply authentic, grassroots commitment to the alternative indie rock underground. Sourcing structural performance templates from early 90s garage noise and jangly lo-fi guitar pop, he channels an energetic analog snarl through projects like Calpurnia and The Aubreys. Stepping out onto the massive Bud Light stage, his high-noon live arrangement strips away corporate pretense to deliver a thrilling masterclass in pure, raw guitar-driven adrenaline.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Bud Light",
    day: "Friday",
    date: "Jul 31",
    startTime: "2:40 PM",
    endTime: "3:40 PM",
  },
};

const avello: Artist = {
  name: "Avello",
  slug: "avello",
  genres: ["Melodic Bass", "Dubstep", "Electronic"],
  origin: "Orlando, Florida",
  tagline:
    "Earth-shaking, cinematic melodic bass and crushing dubstep structures designed to detonate tents.",
  socials: { spotify: "https://open.spotify.com/artist/1ZR5GnPw0Jkb5M4hnBwzuZ" },
  whySee: [
    "One of the bass underground's fastest-rising technical engineers commanding an intense, heavy-hitting early session",
    "An elite display of hyper-clean electronic sound design, soaring cinematic synth chords, and punishing low-end rollers",
    "Experience a relentless daytime adrenaline accelerator that completely transforms the Perry's tent into a boiling rave floor",
    "The absolute perfect high-velocity option for electronic fans hunting heavy structural drops early in the schedule",
  ],
  whatToExpect: [
    "Bass & Groove",
    "Synth & Atmospheric",
    "High-Energy Pacing",
  ],
  bestFor: [
    "Bass & Groove Lovers",
    "Dance Floor Seekers",
  ],
  similarArtists: [
    { name: "KLO", slug: "klo" },
    {
      name: "Major Lazer",
      slug: "major-lazer",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178ab312009266614f4d3185229",
    },
    {
      name: "Empire of the Sun",
      slug: "empire-of-the-sun",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178c806f3e714afa21861e20248",
    },
    {
      name: "horsegiirL",
      slug: "horsegiirl",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17850fd23946deeb6991ef1ee09",
    },
  ],
  tracks: [
    {
      spotifyId: "4gWtMBcYhzrGaKKnFi07Pu",
      name: "Take Me Back",
      album: "Take Me Back",
      duration: "3:25",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02b36e8c726de6fe54cd625db5",
    },
    { name: "Fallen", album: "Fallen", duration: "" },
    { name: "Ascension", album: "Ascension", duration: "" },
  ],
  about:
    "Avello is the Florida-born electronic producer and DJ whose meticulous combination of earth-shaking dubstep architecture, pristine melodic arrangements, and cinematic vocal layers has earned him massive institutional support across the dance world. Breaking out of the hyper-competitive East Coast bass networks, his engineering balances absolute percussive aggression with deeply emotional melodic hooks. Commandeering an early afternoon slot under the iconic Perry's stage, his performance delivers a technical, strobe-lit blueprint for contemporary bass music.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Friday",
    date: "Jul 31",
    startTime: "12:45 PM",
    endTime: "1:30 PM",
  },
};

const partyof2: Artist = {
  name: "partyof2",
  slug: "partyof2",
  genres: ["Alternative Hip-Hop", "Trap", "Electronic Pop"],
  origin: "Atlanta, Georgia",
  tagline: "Glitchy, high-velocity internet rap and bounce-driven trap designed for the mainstage.",
  socials: { spotify: "https://open.spotify.com/artist/70KxgbZNsd9xOttXW67mh3" },
  whySee: [
    "The absolute internet-cult rap duo bringing their hyper-aesthetic, loop-heavy sound system straight to the T-Mobile stage",
    "Experience an intense, rapid-fire vocal workout gliding effortlessly over incredibly crisp, low-slung electronic bass pockets",
    "A perfectly curated early afternoon vibe catalyst that translates modern digital sub-culture into a massive live statement",
    "An absolute wildfire crowd environment packed with chaotic, high-energy teenage mosh pits early in the day",
  ],
  whatToExpect: [
    "Cinematic Visuals",
    "Energetic Mosh Pits",
    "Synth & Atmospheric",
  ],
  bestFor: [
    "Scene Trend Spotters",
    "Early Afternoon Discovery",
    "Dance Floor Seekers",
  ],
  similarArtists: [
    { name: "After", slug: "after" },
    {
      name: "Fakemink",
      slug: "fakemink",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fea7ad1b3bc4a7f94234bd1c",
    },
    {
      name: "Lil Uzi Vert",
      slug: "lil-uzi-vert",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17862c272d76220f2e9dad56704",
    },
    { name: "KLO", slug: "klo" },
  ],
  tracks: [
    { name: "Double Up", album: "PARTYOF2", duration: "" },
    { name: "Switch It", album: "PARTYOF2", duration: "" },
    { name: "No Rules", album: "No Rules", duration: "" },
  ],
  about:
    "partyof2 is the vanguard alternative hip-hop project whose sharp combination of glitchy internet loops, crisp West Coast clap percussion, and stream-of-consciousness micro-rap flows has forged a fierce global underground community. Stepping completely out of traditional rap industry templates, the duo crafts a hyper-kinetic sonic landscape that feels simultaneously nostalgic and deeply current. Making an immensely anticipated debut on the mainstage, their high-velocity set completely re-engineers traditional festival pacing for pure energetic crowd chaos.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "T-Mobile",
    day: "Friday",
    date: "Jul 31",
    startTime: "12:55 PM",
    endTime: "1:40 PM",
  },
};

const theArmyTheNavy: Artist = {
  name: "The Army, The Navy",
  slug: "the-army-the-navy",
  genres: ["Indie Rock", "Dream Pop", "Alt-Pop"],
  origin: "Nashville, Tennessee",
  tagline: "Lush, sun-drenched guitar pop and dual-vocal dreaminess built for long summer days.",
  socials: { spotify: "https://open.spotify.com/artist/4MAnvDgzeM6bAVUVUbUeFI" },
  whySee: [
    "Catch an exceptional songwriting collective executing a deeply atmospheric, beautiful live guitar set on the Allianz stage",
    "Perfectly synchronized, warm vocal harmonies gliding effortlessly over rich, vintage-hued alternative arrangements",
    "A gorgeous, sun-drenched early afternoon oasis designed perfectly to completely escape standard commercial pop noise",
    "The official premier festival tour run showcasing the rich melodic textures of their highly praised independent catalog",
  ],
  whatToExpect: [
    "Dreamy Atmosphere",
    "Conversational Delivery",
    "Crowd Atmosphere",
  ],
  bestFor: [
    "Lyric and songwriting obsessives",
    "Fans of contemporary bedroom pop",
    "Early afternoon discovery seekers",
    "Indie pop music collectors",
    "Chill summer melody seekers",
  ],
  similarArtists: [
    {
      name: "Spacey Jane",
      slug: "spacey-jane",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f5864abfed7a8d4b9334a7a0",
    },
    {
      name: "Ella Red",
      slug: "ella-red",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17839b0de9171e1e5ff2d8a39cb",
    },
    {
      name: "Sunday (1994)",
      slug: "sunday-1994",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b7e25151a004217ba46eb173",
    },
    {
      name: "Julia Wolf",
      slug: "julia-wolf",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178464afc83fc7ddaf9292bb9a8",
    },
  ],
  tracks: [
    { name: "Vienna", album: "The Army, The Navy", duration: "" },
    { name: "Fruit Flies", album: "Fruit Flies EP", duration: "" },
    { name: "Bleach", album: "Bleach", duration: "" },
  ],
  about:
    "The Army, The Navy is the independent alternative pop project whose meticulous combination of hazy, tape-warped guitar hooks, intimate dual-vocal narratives, and breezy arrangements has fostered a deeply dedicated global community. Dissecting the vulnerabilities of youth, identity, and modern relationship anxieties with profound poetic precision, the outfit crafts tracks that feel remarkably tactile. Performing a highly visibility midday slot on Allianz, their live execution transforms a sprawling festival lawn into an exceptionally comfortable, shared backyard listening party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Friday",
    date: "Jul 31",
    startTime: "12:10 PM",
    endTime: "12:55 PM",
  },
};

const loveSpells: Artist = {
  name: "Love Spells",
  slug: "love-spells",
  genres: ["Indie Pop", "Bedroom Pop", "Neo-Psychedelia"],
  origin: "San Antonio, Texas",
  tagline: "Hazy, tape-warped bedroom pop and neon-drenched psych grooves for late nights.",
  socials: { spotify: "https://open.spotify.com/artist/5iiqhuffUTPEOjAUDj19IW" },
  whySee: [
    "The internet-favorite indie project bringing their hyper-aesthetic, nostalgic brand of alt-pop straight to the Airbnb stage",
    "Lush, close-mic'd vocal hooks melting seamlessly into warm, chorus-heavy dream pop guitar lines",
    "Experience a beautifully curated afternoon vibe check that translates internet aesthetic culture into a tactile live space",
    "The perfect low-pressure opportunity to completely zone out to intricate, low-slung bass pockets and dreamy synth pads",
  ],
  whatToExpect: [
    "Dark Mood Visuals",
    "Dreamy Atmosphere",
    "Synth & Atmospheric",
    "Bass & Groove",
  ],
  bestFor: [
    "Bass & Groove Lovers",
  ],
  similarArtists: [
    {
      name: "Between Friends",
      slug: "between-friends",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17820d75570b0e6c6e124d2a3fa",
    },
    {
      name: "Emi Grace",
      slug: "emi-grace",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781d8d8c934c382100d033bb41",
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
    { name: "Staying In", album: "Love Spells", duration: "" },
    { name: "Hazy", album: "Love Spells", duration: "" },
    { name: "Falling", album: "Falling", duration: "" },
  ],
  about:
    "Love Spells is the alternative pop venture whose meticulous formula of hazy bedroom recordings, glistening retro-futuristic synths, and earnest, conversational songwriting has cultivated a passionate independent community. Drawing sharp atmospheric blueprints from late-80s new wave and low-slung garage pop, the project bottles up the precise textures of young isolation and late-night infatuation. Live, their configuration strips away traditional rock band noise, layering smooth, driving synthesizers over deep, hypnotic midtempo grooves.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Friday",
    date: "Jul 31",
    startTime: "1:50 PM",
    endTime: "2:30 PM",
  },
};

const ellaRed: Artist = {
  name: "Ella Red",
  slug: "ella-red",
  genres: ["Alt-Pop", "Indie Rock", "Singer-Songwriter"],
  origin: "Dallas, Texas",
  tagline: "Unapologetic, guitar-driven alternative pop packed with raw vocal fire and sharp wit.",
  socials: { spotify: "https://open.spotify.com/artist/1hH4ajSTZKIBhwRymnZi5R" },
  whySee: [
    "Catch a hyper-gifted young lyricist executing a deeply atmospheric, confessional performance on the alternative stage",
    "Songwriting that lands like a punch to the face, weaponizing hyper-specific mid-twenties anxieties into massive rock hooks",
    "A stunning afternoon catalyst that pairs delicate, raw vocal verses with unexpectedly heavy, fuzzed-out guitar choruses",
    "The official premier festival tour run showcasing her highly celebrated independent studio catalog to a live crowd",
  ],
  whatToExpect: [
    "Guitar-Driven Sound",
    "Conversational Delivery",
    "Crowd Atmosphere",
  ],
  bestFor: [
    "Indie rock traditionalists",
    "Lyric and narrative obsessives",
    "Fans of dry lyrical wit",
    "Early afternoon discovery seekers",
    "Guitar music lovers",
  ],
  similarArtists: [
    {
      name: "The Army, The Navy",
      slug: "the-army-the-navy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a80252ae3d399fc49014502d",
    },
    {
      name: "Spacey Jane",
      slug: "spacey-jane",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f5864abfed7a8d4b9334a7a0",
    },
    { name: "Easy Honey", slug: "easy-honey" },
    {
      name: "sombr",
      slug: "sombr",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17878edaa6468cae153565c2c97",
    },
  ],
  tracks: [
    { name: "Put Me In My Place", album: "Ella Red", duration: "" },
    { name: "Sick To My Stomach", album: "Ella Red", duration: "" },
    { name: "Overexposed", album: "Overexposed", duration: "" },
  ],
  about:
    "Ella Red is a Texas-born singer and songwriter who built an intensely passionate independent community through her hyper-vivid, beautifully blunt brand of guitar-driven alt-pop. Rooted in the narrative vulnerability of close-mic'd acoustic storytellers but elevated by massive, distortion-heavy indie rock arrangements, her tracks dissect modern relationship breakdowns with profound precision. Operating completely free of major label machinery, her early afternoon live set transforms sprawling festival fields into high-energy, therapeutic guitar singalongs.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Friday",
    date: "Jul 31",
    startTime: "5:40 PM",
    endTime: "6:20 PM",
  },
};

const palomaMorphy: Artist = {
  name: "Paloma Morphy",
  slug: "paloma-morphy",
  genres: ["Dark Pop", "Alternative R&B", "Chamber Pop"],
  origin: "London, England",
  tagline: "Brooding, shadow-drenched alternative pop built on jaw-dropping vocal authority.",
  socials: { spotify: "https://open.spotify.com/artist/30Ph7pfibYhG9VcdOj7xZw" },
  whySee: [
    "Witness one of the most technically gifted, breathtakingly unique vocalists performing early anywhere across the weekend",
    "Morphy's operatic, deeply brooding vocal delivery effortlessly filling the park air with staggering emotional power",
    "A beautifully dramatic, orchestrally layered sonic experience that seamlessly fuses dark pop with alternative R&B textures",
    "Experience the raw, bone-chilling crowd connection driven by intense, massive underground pop singalongs",
  ],
  whatToExpect: [
    "Technical Vocal Range",
    "Dark Mood Visuals",
    "Theatrical Staging",
    "Cinematic Visuals",
  ],
  bestFor: [
    "Early Afternoon Discovery",
    "Storytelling Lovers",
  ],
  similarArtists: [
    {
      name: "Faouzia",
      slug: "faouzia",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786310c4d3dcfe99b0a9da2a30",
    },
    {
      name: "Paris Paloma",
      slug: "paris-paloma",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fea2286a364dd2a0c4209136",
    },
    {
      name: "Ivri",
      slug: "ivri",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178db6265ab7c2b7e2a156c99ae",
    },
    {
      name: "Oklou",
      slug: "oklou",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f8b90fcffca3c4e28564f0e3",
    },
  ],
  tracks: [
    { name: "Grave", album: "Paloma Morphy", duration: "" },
    { name: "Mistake", album: "Paloma Morphy", duration: "" },
    { name: "Shadows", album: "Shadows", duration: "" },
  ],
  about:
    "Paloma Morphy is a London-born singer, songwriter, and conceptual auteur whose extraordinary vocal range and tragi-comic cinematic pop anthems have earned her a fierce international cult community. Fusing traditional gothic romance themes with deep, heavy contemporary R&B rhythm sections and sharp string lines, she writes sweeping tales of personal identity and interpersonal grief. Commanding the stage with profound, operatic authority, her early afternoon set stands as an undeniable, spine-chilling showcase of pristine vocal power.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Friday",
    date: "Jul 31",
    startTime: "6:50 PM",
    endTime: "7:30 PM",
  },
};

const dayWeRan: Artist = {
  name: "Day We Ran",
  slug: "day-we-ran",
  genres: ["Indie Rock", "Alternative Rock", "Post-Punk"],
  origin: "Chicago, Illinois",
  tagline: "Hometown indie-rock anthems fusing raw alternative grit with massive guitar walls.",
  socials: { spotify: "https://open.spotify.com/artist/6dtbK89qIT2XjIsCQHjTxS" },
  whySee: [
    "A massive, highly anticipated hometown showcase performance on the alternative stage celebrating their rapid local ascent",
    "Vocalist Marcus King's raw, soaring vocal delivery cutting cleanly through a wall of fuzzed-out dual-guitar riffs",
    "Experience an intensely passionate, high-energy live rock engine that completely bypasses processed backing tracks",
    "An absolute masterclass in traditional analog band chemistry that treats giant festival fields like an intimate local club",
  ],
  whatToExpect: [
    "Guitar-Driven Sound",
  ],
  bestFor: [
    "Tent & Club Venue Seekers",
    "Early Afternoon Discovery",
    "Sound Design & Production Nerds",
  ],
  similarArtists: [
    {
      name: "Villanelle",
      slug: "villanelle",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1781ece1eae58afddb4d3238501",
    },
    {
      name: "Wunderhorse",
      slug: "wunderhorse",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1780e05e549428cb38b2f3e7a60",
    },
    {
      name: "Ink",
      slug: "ink",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b3df8a3980032366a3a040bc",
    },
    { name: "Cruz Beckham and the Breakers", slug: "cruz-beckham-and-the-breakers" },
  ],
  tracks: [
    { name: "Running Blind", album: "Day We Ran", duration: "" },
    { name: "Under the Skyline", album: "Day We Ran", duration: "" },
    { name: "Closer Now", album: "Closer Now", duration: "" },
  ],
  about:
    "Day We Ran is the Chicago-born alternative rock quartet whose meticulous combination of fuzzed-out garage indie grit, driving rhythms, and emotionally honest lyricism has earned them a reputation as one of the city's most essential live rock vanguards. Writing sweeping tales of industrial midwestern isolation, identity, and personal history, the group relies entirely on raw analog band energy. Coming off a series of highly discussed local support slots, their early afternoon performance brings an absolute guitar clinic to Grant Park.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Friday",
    date: "Jul 31",
    startTime: "12:50 PM",
    endTime: "1:30 PM",
  },
};

const ivri: Artist = {
  name: "Ivri",
  slug: "ivri",
  genres: ["Alt-Pop", "Dark Pop", "Electronic Pop"],
  origin: "New York, New York",
  tagline: "Sultry, nocturnal alt-pop floating over rich, industrial electronic beats.",
  socials: { spotify: "https://open.spotify.com/artist/5EjK7aUvQ9LMNqc2zXiWLS" },
  whySee: [
    "Catch a hyper-vivid independent producer and vocalist executing a deeply atmospheric, nocturnal live electronic performance",
    "Songwriting that lands like a confession, mapping dark interpersonal vulnerabilities with profound sonic precision",
    "A beautiful, early afternoon tent oasis that pairs delicate vocal textures with unexpectedly heavy, industrial basslines",
    "The official festival tour run highlighting her highly celebrated independent studio catalog to a massive live audience",
  ],
  whatToExpect: [
    "Dark Mood Visuals",
    "Intimate Performance",
    "Bass & Groove",
    "Cinematic Visuals",
  ],
  bestFor: [
    "Fans of dramatic dark pop",
    "Contemporary bedroom pop fans",
    "Underground club music devotees",
    "Early afternoon discovery seekers",
    "Electronic sound design nerds",
  ],
  similarArtists: [
    {
      name: "Bella Kay",
      slug: "bella-kay",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783d7290ae36694e14b0655753",
    },
    {
      name: "partyof2",
      slug: "partyof2",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178b9dbe3484f4e59e7b0e18b7a",
    },
    {
      name: "Balu Brigada",
      slug: "balu-brigada",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178871bccd59b468f93c4650066",
    },
    {
      name: "The Army, The Navy",
      slug: "the-army-the-navy",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a80252ae3d399fc49014502d",
    },
  ],
  tracks: [
    { name: "Nocturnal", album: "Ivri", duration: "" },
    { name: "Tension", album: "Ivri", duration: "" },
    { name: "Fade", album: "Fade", duration: "" },
  ],
  about:
    "Ivri is a New York-based singer, songwriter, and electronic engineer who built an intensely passionate global community through her hyper-specific, beautifully haunting brand of contemporary alt-pop. Rooted in the emotional intimacy of close-mic'd vocal layers but elevated by deep, heavy industrial electronic rhythm sections and cold synthesizer loops, her tracks dissect modern anxieties with absolute precision. Handpicked for massive global breakout tour blocks, her early afternoon live set transforms a sprawling festival field into an immersive warehouse club experience.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Friday",
    date: "Jul 31",
    startTime: "4:30 PM",
    endTime: "5:10 PM",
  },
};

const ellaBoh: Artist = {
  name: "Ella Boh",
  slug: "ella-boh",
  genres: ["Indie Pop", "Singer-Songwriter", "Chamber Pop"],
  origin: "Los Angeles, California",
  tagline:
    "Witty, wordy stream-of-consciousness pop music that plays out like voice memos from your closest friend.",
  socials: { spotify: "https://open.spotify.com/artist/3UWNE3idxa2v2TMzrBRX11" },
  whySee: [
    "Catch an exceptional independent pop writer executing a beautifully warm, sun-drenched storyteller performance on the BMI stage",
    "Razor-sharp lyricism that lands like an intense, unguarded diary entry tracking the complex textures of youth and romance",
    "A stunning afternoon oasis that pairs delicate, close-mic'd vocal patterns with unexpectedly catchy acoustic and electronic hooks",
    "The official premier festival tour run showcasing her highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: [
    "Lyrical Storytelling",
    "Conversational Delivery",
    "Crowd Atmosphere",
  ],
  bestFor: [
    "Lyric and songwriting obsessives",
    "Fans of contemporary bedroom pop",
    "Early afternoon discovery seekers",
    "Intimate storyteller set lovers",
    "Indie pop music collectors",
  ],
  similarArtists: [
    { name: "Stella Lefty", slug: "stella-lefty" },
    { name: "Porch Light", slug: "porch-light" },
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
    { name: "Voice Memos", album: "Ella Boh", duration: "" },
    { name: "Overthinking", album: "Ella Boh", duration: "" },
    { name: "Seventeen", album: "Seventeen", duration: "" },
  ],
  about:
    "Ella Boh is a Los Angeles-based singer-songwriter who built an intensely passionate internet community through her hyper-specific, beautifully conversational brand of contemporary indie pop. Rooted in the emotional intimacy of bedroom pop recordings but elevated by bright, modern pop production, rich chamber strings, and witty lyrical choices, her tracks explore young adulthood with profound precision. Handpicked for an extensive global tour cycle, her early afternoon live execution transforms the tree-lined perimeter of Grant Park into a vibrant outdoor listening party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Friday",
    date: "Jul 31",
    startTime: "2:10 PM",
    endTime: "2:50 PM",
  },
};

const bradeazy: Artist = {
  name: "bradeazy",
  slug: "bradeazy",
  genres: ["Electronic", "Tech House", "Club"],
  origin: "Los Angeles, California",
  tagline: "Irreverent internet-cult tech-house energy built purely for chaotic day parties.",
  socials: { spotify: "https://open.spotify.com/artist/1dESZUZevzhd5dzq9ZsMLI" },
  whySee: [
    "A massive, highly anticipated afternoon tent session highlighting one of the internet's most watchable internet-dance personalities",
    "An exceptionally fun live blend of heavy tech-house basslines, viral vocal cuts, and flawless party curation",
    "Experience a wildfire crowd environment packed with carefree, high-energy dance floors under the Perry's tent",
    "The absolute perfect early-evening adrenaline booster designed to get large groups of friends moving together",
  ],
  whatToExpect: [
    "Rhythm Complexity",
    "Crowd Atmosphere",
    "High-Energy Pacing",
  ],
  bestFor: [
    "Scene Trend Spotters",
    "Groups & Social Experience",
    "Tent & Club Venue Seekers",
    "Dance Floor Seekers",
  ],
  similarArtists: [
    {
      name: "Ninajirachi",
      slug: "ninajirachi",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1789ab4772c0bd3455137b1d02e",
    },
    { name: "Jackie Hollander", slug: "jackie-hollander" },
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
  ],
  tracks: [
    { name: "Take It Easy", album: "Take It Easy", duration: "" },
    { name: "Spinnin", album: "Spinnin", duration: "" },
    { name: "Hypnotize", album: "Hypnotize", duration: "" },
  ],
  about:
    "Brad Eazy, operating under the singular moniker bradeazy, has rapidly vaulted from viral internet skits into prominent global electronic billing, commanding a fiercely loyal, youth-driven digital community. Shifting his creative focus from online commentary to high-velocity tech-house production, he crafts a hyper-kinetic sonic landscape built entirely around heavy groove loops and nostalgic vocal chops. Ready to ignite his mid-afternoon slot, his live festival layout strips away traditional club pretension for a beautifully unadulterated, celebratory dance party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Perry's",
    day: "Friday",
    date: "Jul 31",
    startTime: "12:00 PM",
    endTime: "12:30 PM",
  },
};

const emiGrace: Artist = {
  name: "Emi Grace",
  slug: "emi-grace",
  genres: ["Indie Pop", "Alt-Pop", "Bedroom Pop"],
  origin: "Los Angeles, California",
  tagline:
    "Shimmering, nostalgic laptop pop that plays out like real voice memos from a best friend.",
  socials: { spotify: "https://open.spotify.com/artist/0U6MHJ9KRB5A1M7iHN06sS" },
  whySee: [
    "Catch an exceptional independent multi-instrumentalist executing a beautifully warm, sun-drenched indie pop performance",
    "Songwriting that lands like an intense, unguarded voice memo tracking the complex vulnerabilities of modern romance",
    "A beautiful, sun-drenched early afternoon oasis that pairs delicate vocal textures with soaring indie pop melodies",
    "The official premier festival tour run showcasing her highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: [
    "Lyrical Storytelling",
    "Dreamy Atmosphere",
    "Conversational Delivery",
    "Crowd Atmosphere",
  ],
  bestFor: [
    "Lyric and songwriting obsessives",
    "Fans of contemporary bedroom pop",
    "Early afternoon discovery seekers",
    "Indie pop music collectors",
    "Chill summer melody seekers",
  ],
  similarArtists: [
    {
      name: "Lucy Bedroque",
      slug: "lucy-bedroque",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178100cfd4653979ed518fbf28f",
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
    {
      name: "sombr",
      slug: "sombr",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17878edaa6468cae153565c2c97",
    },
  ],
  tracks: [
    { name: "Leaving You", album: "Blue Room", duration: "" },
    { name: "Mirror", album: "Blue Room", duration: "" },
    { name: "In the Rain", album: "In the Rain", duration: "" },
  ],
  about:
    "Emi Grace is a Los Angeles-born singer, songwriter, and multi-instrumentalist who built an intensely passionate global community through her hyper-vivid, beautifully conversational brand of contemporary alt-pop. Rooted in the emotional intimacy of close-mic'd bedroom recordings but elevated by bright, modern pop production and snappy rhythm structures, her tracks dissect young adulthood with profound precision. Handpicked for an extensive global tour cycle, her early afternoon live execution transforms the tree-lined perimeter of Grant Park into a vibrant outdoor listening party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Friday",
    date: "Jul 31",
    startTime: "3:20 PM",
    endTime: "4:00 PM",
  },
};

const beno: Artist = {
  name: "Beno",
  slug: "beno",
  genres: ["Trap", "Hip-Hop", "Plugg"],
  origin: "Atlanta, Georgia",
  tagline: "Glitchy, high-velocity atmospheric trap from the cutting edge of the rap underground.",
  socials: { spotify: "https://open.spotify.com/artist/3PGUtR2FKO83BRbqONUSOi" },
  whySee: [
    "The absolute polarizing flashpoint of modern underground internet rap making a high-visibility festival statement",
    "Experience an intense display of glitchy, ambient plugg beats mixed with reckless, youthful micro-rap flows",
    "An absolute wildfire crowd environment packed with chaotic, high-energy teenage mosh pits on the alternative stage",
    "Catch a lightning-fast underground trendsetter running on pure digital clout before he completely alters pop infrastructure",
  ],
  whatToExpect: [
    "Cinematic Visuals",
    "Energetic Mosh Pits",
    "Intense Fan Connection",
  ],
  bestFor: [
    "Underground plugg rap purists",
    "Internet rap scene trend spotters",
    "Mosh pit traditionalists",
    "Adrenaline-fueled dance seekers",
    "Gen-Z culture collectors",
  ],
  similarArtists: [
    {
      name: "Nettspend",
      slug: "nettspend",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1786bc255a221b2d2db4c1de21f",
    },
    {
      name: "Lil Uzi Vert",
      slug: "lil-uzi-vert",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17862c272d76220f2e9dad56704",
    },
    {
      name: "Monaleo",
      slug: "monaleo",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17867d27938b6b6046bd09e020c",
    },
    {
      name: "Mustard",
      slug: "mustard",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17854406b7007a449aeaac06c44",
    },
  ],
  tracks: [
    { name: "Fallen", album: "Beno", duration: "" },
    { name: "No Choice", album: "No Choice", duration: "" },
    { name: "Speed", album: "Speed", duration: "" },
  ],
  about:
    "Beno is the Atlanta-born rap phenom who rapidly vaulted from Soundcloud isolation into global pop attention, commanding an intensely passionate internet-cult following. Characterized by his unique choice of hazy, loop-heavy underground production and unstructured, stream-of-consciousness flows, he embodies the post-rage aesthetic of modern youth culture. Operating at the raw center of internet hip-hop debates, his early afternoon live execution completely flips traditional festival pacing for pure, energetic crowd chaos.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Airbnb",
    day: "Friday",
    date: "Jul 31",
    startTime: "12:00 PM",
    endTime: "12:30 PM",
  },
};

const chicagoMade: Artist = {
  name: "Chicago Made",
  slug: "chicago-made",
  genres: ["Hip-Hop", "Boom Bap", "Indie Rock"],
  origin: "Chicago, Illinois",
  tagline:
    "A massive local showcase celebrating the absolute vanguard of the city's independent renaissance.",
  socials: {},
  whySee: [
    "A historic, highly anticipated hometown showcase performance on the Tito's stage celebrating the rapid local scene ascent",
    "Experience an exceptional, multi-artist collection of raw lyrical flows and fuzzed-out dual-guitar indie rock riffs",
    "An intense, high-energy live performance built specifically to celebrate carefree youth culture and local heritage",
    "The absolute perfect midday catalyst designed to unify a massive, supportive hometown crowd under the sun",
  ],
  whatToExpect: [
    "Guitar-Driven Sound",
  ],
  bestFor: [
    "Hometown & Local Supporters",
    "Dance Floor Seekers",
  ],
  similarArtists: [
    {
      name: "Clipse",
      slug: "clipse",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1787d6973a4df776665c9852f26",
    },
    { name: "Easy Honey", slug: "easy-honey" },
    {
      name: "The Creekers",
      slug: "the-creekers",
      imageUrl: "https://i.scdn.co/image/ab6761610000f1783bd55f87a9e1be1eb5b1c1e1",
    },
    {
      name: "The Braymores",
      slug: "the-braymores",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178e72ca0c70ab4f5bb3da261dc",
    },
  ],
  tracks: [
    { name: "Windy City Rollers", album: "Chicago Made", duration: "" },
    { name: "Under the Skyline", album: "Chicago Made", duration: "" },
    { name: "Lake Effect", album: "Lake Effect", duration: "" },
  ],
  about:
    "Chicago Made is the highly celebrated local artistic collective whose meticulous combination of fuzzed-out garage indie rock grit, crisp hip-hop rhythm pockets, and carefree lyricism has fostered a deeply dedicated regional community. Forging a distinctively laid-back, sun-drenched sonic universe, the showcase profiles a group of rising musicians tracking personal history, identity, and midwestern isolation. Performing a prime midday slot, their live execution transforms the sprawling field of Grant Park into a vibrant outdoor block party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Tito's",
    day: "Friday",
    date: "Jul 31",
    startTime: "12:15 PM",
    endTime: "1:00 PM",
  },
};

const valenciaGrace: Artist = {
  name: "Valencia Grace",
  slug: "valencia-grace",
  genres: ["Soul", "R&B", "Chamber Pop"],
  origin: "Dorset, England",
  tagline: "Stunning, earth-shaking British neo-soul built around absolute vocal authority.",
  socials: { spotify: "https://open.spotify.com/artist/5cb5ljWIIrvUxokdf2vl6A" },
  whySee: [
    "Witness one of the most technically gifted, breathtakingly unique young vocalists performing anywhere across the entire weekend",
    "Valencia Grace's operatic, powerhouse vocal delivery effortlessly filling the open air with staggering emotional power",
    "A beautifully dramatic, orchestrally layered sonic experience that seamlessly fuses contemporary R&B with traditional soul",
    "Experience the raw, bone-chilling crowd connection driven by intense, massive dark-pop stadium singalongs",
  ],
  whatToExpect: [
    "Technical Vocal Range",
    "Lush Sound",
    "Theatrical Staging",
  ],
  bestFor: [
    "Early Afternoon Discovery",
    "Storytelling Lovers",
  ],
  similarArtists: [
    {
      name: "Sienna Spiro",
      slug: "sienna-spiro",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178fb0ab819bbd4502028cd1feb",
    },
    {
      name: "Jae Stephens",
      slug: "jae-stephens",
      imageUrl: "https://i.scdn.co/image/ab6761610000f17886987e340bcff4b2debb3e84",
    },
    {
      name: "Amber Mark",
      slug: "amber-mark",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178a7f15e8167fb79fe64582e96",
    },
    { name: "Justine Skye", slug: "justine-skye" },
  ],
  tracks: [
    { name: "What I'm Feeling", album: "Valencia Grace EP", duration: "" },
    { name: "Goodbye", album: "Valencia Grace EP", duration: "" },
    {
      spotifyId: "3Jeo5LzCcMBtdFlp1FqpsN",
      name: "Skin",
      album: "Skin",
      duration: "3:35",
      artworkUrl: "https://i.scdn.co/image/ab67616d00001e02e414490fd26f3aba5e8df07b",
    },
  ],
  about:
    "Valencia Grace is a Dorset-born singer-songwriter whose extraordinary vocal range, rich neo-soul arrangements, and tragi-comic cinematic pop anthems have earned her widespread critical adoration. Fusing traditional Motown vocal ornamentation with heavy, contemporary dark-pop instrumentation and sharp piano lines, she writes sweeping tales of resilience, loss, and emotional autonomy. Commanding the stage with profound, operatic authority, her early afternoon set stands as an undeniable showcase of pristine musical power.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "Allianz",
    day: "Friday",
    date: "Jul 31",
    startTime: "1:00 PM",
    endTime: "1:40 PM",
  },
};

const whitneyWhitney: Artist = {
  name: "Whitney Whitney",
  slug: "whitney-whitney",
  genres: ["Indie Pop", "Singer-Songwriter", "Chamber Pop"],
  origin: "Los Angeles, California",
  tagline: "Witty, wordy stream-of-consciousness pop music that plays out like real voice memos.",
  socials: { spotify: "https://open.spotify.com/artist/2Jze5ZZUDEo9TowuCnI45R" },
  whySee: [
    "Catch an exceptional independent pop writer executing a beautifully warm, storyteller performance on the BMI stage",
    "Razor-sharp lyricism that lands like an intense, unguarded diary entry tracking the complex textures of youth and romance",
    "A stunning afternoon oasis that pairs delicate, close-mic'd vocal patterns with unexpectedly catchy acoustic and electronic hooks",
    "The official premier festival tour run showcasing her highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: [
    "Lyrical Storytelling",
    "Conversational Delivery",
    "Crowd Atmosphere",
  ],
  bestFor: [
    "Lyric and songwriting obsessives",
    "Fans of contemporary bedroom pop",
    "Early afternoon discovery seekers",
    "Intimate storyteller set lovers",
    "Indie pop music collectors",
  ],
  similarArtists: [
    {
      name: "Ella Boh",
      slug: "ella-boh",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178f3ca12f1b323dbb7027d78dc",
    },
    { name: "Porch Light", slug: "porch-light" },
    { name: "Stella Lefty", slug: "stella-lefty" },
    {
      name: "Next of Kin",
      slug: "next-of-kin",
      imageUrl: "https://i.scdn.co/image/ab6761610000f178cbe19203158c6eae4ed0504a",
    },
  ],
  tracks: [
    { name: "Voice Memos", album: "Whitney Whitney", duration: "" },
    { name: "Overthinking", album: "Whitney Whitney", duration: "" },
    { name: "Seventeen", album: "Seventeen", duration: "" },
  ],
  about:
    "Whitney Whitney is a Los Angeles-based singer-songwriter who built an intensely passionate internet community through her hyper-specific, beautifully conversational brand of contemporary indie pop. Rooted in the emotional intimacy of bedroom pop recordings but elevated by bright, modern pop production, rich chamber strings, and witty lyrical choices, her tracks explore young adulthood with profound precision. Handpicked for an extensive global tour cycle, her early afternoon live execution transforms the tree-lined perimeter of Grant Park into a vibrant outdoor listening party.",
  appearance: {
    festivalId: "lollapalooza-2026",
    billingTier: "Undercard",
    stage: "BMI",
    day: "Friday",
    date: "Jul 31",
    startTime: "12:00 PM",
    endTime: "12:30 PM",
  },
};

export const fridayArtists: Artist[] = [
  charliXcx,
  smashingPumpkins,
  lilUziVert,
  yungblud,
  majorLazer,
  notForRadio,
  zaraLarsson,
  freddieGibbs,
  sukiWaterhouse,
  i_dle,
  mustard,
  oklou,
  horsegiirL,
  theStorySoFar,
  loathe,
  nettspend,
  sidepiece,
  skyeNewman,
  notion,
  roz,
  baluBrigada,
  lyny,
  motherMother,
  juliaWolf,
  slayyyter,
  claireRosinkranz,
  fiftyFourUltra,
  highVis,
  finnWolfhard,
  avello,
  partyof2,
  theArmyTheNavy,
  loveSpells,
  ellaRed,
  palomaMorphy,
  dayWeRan,
  ivri,
  ellaBoh,
  bradeazy,
  emiGrace,
  beno,
  chicagoMade,
  valenciaGrace,
  whitneyWhitney,
];
