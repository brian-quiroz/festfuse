// Storage only — do not import this file directly in product code.
// To filter by day, import allArtists from index.ts and filter by appearance.day === "Friday".
import type { Artist } from "@/app/types/artist";

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
    { name: "Tate McRae" },
    { name: "Slayyyter" },
    { name: "Lorde" },
    { name: "aespa" },
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
    { name: "The Bends" },
    { name: "Wolf Alice" },
    { name: "Whatmore" },
    { name: "Die Spitz" },
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
  genres: ["Hip-Hop", "Trap", "Rage Rap"],
  origin: "Philadelphia, Pennsylvania",
  tagline: "Hyper-kinetic punk-rap adrenaline and massive stadium-scale trap anthems.",
  socials: {},
  whySee: [
    "An absolute force of nature delivering one of the most high-octane, visually chaotic sets of the weekend on the mainstage",
    "Experience a generational hip-hop icon running through a monumental catalog of historic chart-toppers like 'XO Tour Llif3'",
    "Hear the live execution of fresh material from their latest studio era, blending heavy metal textures with blistering rage-rap beats",
    "Unrivaled crowd momentum driven by relentless stage diving, lightning-fast flows, and massive, park-wide mosh pits",
  ],
  whatToExpect: [
    "High-velocity rage beats",
    "Massive main-field mosh pits",
    "Hyper-kinetic stage acrobatics",
    "Blinding avant-garde laser arrays",
  ],
  bestFor: [
    "Trap and rage rap purists",
    "High-visibility mainstage crowds",
    "Mosh pit veterans",
    "Adrenaline-fueled dance seekers",
    "Modern hip-hop collectors",
  ],
  similarArtists: [
    { name: "Beno" },
    { name: "Monaleo" },
    { name: "Mustard" },
    { name: "Nettspend" },
  ],
  tracks: [
    { name: "XO Tour Llif3", album: "Luv Is Rage 2", duration: "" },
    { name: "Just Wanna Rock", album: "Pink Tape", duration: "" },
    { name: "Nakamura", album: "Pink Tape", duration: "" },
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
  genres: ["Alternative Rock", "Pop-Punk", "Gothic Rock"],
  origin: "Doncaster, England",
  tagline: "An explosive, theatrical riot of generational alternative punk defiance.",
  socials: {},
  whySee: [
    "A blistering, theatrical tour de force of pure alternative counter-culture energy that commands absolute crowd chaos",
    "Dominic Harrison's completely untamed, magnetic stage presence that transforms giant festival fields into safe-haven rock communities",
    "Hear the live premiere of massive, fuzzed-out modern punk rock anthems delivered with flawless stadium-scale pacing",
    "A deeply passionate live environment fueled by collective crowd catharsis, relentless guitar riffs, and heavy basslines",
  ],
  whatToExpect: [
    "High-octane pop-punk energy",
    "Theatrical alternative rock showmanship",
    "Explosive main-field mosh pits",
    "Massive group-scale singalongs",
  ],
  bestFor: [
    "Pop-punk nostalgia lovers",
    "Alternative rock traditionalists",
    "Mosh pit veterans",
    "Devotees of chaotic performance",
    "High-visibility mainstage crowds",
  ],
  similarArtists: [
    { name: "The Story So Far" },
    { name: "Villanelle" },
    { name: "Hot Mulligan" },
    { name: "Wunderhorse" },
  ],
  tracks: [
    { name: "I Think I'm OKAY", album: "Hotel Diaries", duration: "" },
    { name: "parents", album: "the underrated youth", duration: "" },
    { name: "Lowlife", album: "Lowlife", duration: "" },
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
    { name: "aespa" },
    { name: "Disco Lines" },
    { name: "Whethan" },
    { name: "INJI" },
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

const notForRadio: Artist = {
  name: "Not for Radio",
  slug: "not-for-radio",
  genres: ["Psychedelic Pop", "Gothic Rock", "Dream Pop"],
  origin: "Los Angeles, California",
  tagline:
    "Lush, shadow-drenched psychedelic ballads and gothic romanticism from a premier indie voice.",
  socials: {},
  whySee: [
    "The highly anticipated festival tour showcasing María Zardoya's mesmerizing, critically adored solo project away from The Marías",
    "Experience a lush collection of reflective, psychedelic ballads infused with gorgeous gothic textures under the evening sky",
    "A beautifully intimate, atmospheric sonic oasis designed perfectly to completely escape standard commercial pop noise",
    "Hear the live execution of tracks from her landmark debut album Melt and the brilliant 2026 expansion EP, Bloom",
  ],
  whatToExpect: [
    "Intimate psychedelic folk ballads",
    "Gothic romantic visual loops",
    "Lush dreamy vocal layers",
    "Atmospheric alternative synth arrangements",
  ],
  bestFor: [
    "Left-field dream pop fans",
    "Psychedelic soul enthusiasts",
    "Lyric and narrative obsessives",
    "Late evening groove hunters",
    "Underground indie music collectors",
  ],
  similarArtists: [
    { name: "Ethel Cain" },
    { name: "Sunday (1994)" },
    { name: "Pearly Drops" },
    { name: "YUNGBLUD" },
  ],
  tracks: [
    { name: "Back To You", album: "Melt", duration: "" },
    { name: "Puddles", album: "Melt", duration: "" },
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
  socials: {},
  whySee: [
    "A masterclass in world-class, polished pop execution delivering massive global chart-toppers straight to the mainstage",
    "Zara Larsson's phenomenal, soaring vocal range executed flawlessly through complex, high-energy dance structures",
    "Experience the thrilling live debuts of fresh, trendsetting R&B-infused tracks from her current 2026 studio era",
    "An absolute stadium-scale pop celebration packed with massive group singalongs and blinding, high-production staging",
  ],
  whatToExpect: [
    "Polished group-scale choreography",
    "Exceptional live vocal dynamics",
    "High-fashion cinematic visuals",
    "Massive mainstream pop choruses",
  ],
  bestFor: [
    "Mainstream dance pop fans",
    "Precision performance lovers",
    "High-visibility mainstage crowds",
    "Vocal power purists",
    "Sleek commercial pop collectors",
  ],
  similarArtists: [
    { name: "Tate McRae" },
    { name: "Jade" },
    { name: "aespa" },
    { name: "Justine Skye" },
  ],
  tracks: [
    { name: "Symphony", album: "So Good", duration: "" },
    { name: "Lush Life", album: "So Good", duration: "" },
    { name: "Can't Tame Her", album: "Venus", duration: "" },
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
  socials: {},
  whySee: [
    "A masterclass in technical rap execution from one of the absolute finest pure lyricists of the modern era",
    "Gibbs' legendary, razor-sharp double-time flows delivered with absolute precision completely acapella without a backing track",
    "Experience the gritty, soul-sampled cinematic textures of underground milestones like Piñata performed live at scale",
    "The ultimate late-night underground option for hip-hop purists looking for raw lyrical muscle over commercial pop trap",
  ],
  whatToExpect: [
    "Razor-sharp double-time flows",
    "Gritty soul-sampled rap loops",
    "Intense underground rap energy",
    "Raw unadulterated mic command",
  ],
  bestFor: [
    "Hip-hop traditionalists",
    "Lyric and narrative obsessives",
    "Underground rap purists",
    "Late-night club music veterans",
    "Production credit followers",
  ],
  similarArtists: [
    { name: "Clipse" },
    { name: "Jennie" },
    { name: "CORTIS" },
    { name: "Little Simz" },
  ],
  tracks: [
    { name: "Crime Pays", album: "Bandana", duration: "" },
    { name: "Thuggin'", album: "Piñata", duration: "" },
    { name: "Scottie Beam", album: "Alfredo", duration: "" },
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
  socials: {},
  whySee: [
    "The premier festival tour showcasing her highly celebrated, beautifully brooding 2024 studio masterwork, Memoir of a Sparklemuffin",
    "Suki Waterhouse's distinctly smoky, low-slung vocal textures wrapping around rich, vintage-hued alternative arrangements",
    "A gorgeously cinematic, late-afternoon sunset oasis that plays out like a classic 1970s Hollywood noir movie soundtrack",
    "Experience an elite independent pop darling whose project masterfully balances raw emotional intimacy with massive stage style",
  ],
  whatToExpect: [
    "Smoky melancholic pop vocals",
    "Vintage-hued guitar strums",
    "Cinematic nostalgic visual filters",
    "Warm sunset field camaraderie",
  ],
  bestFor: [
    "Left-field dream pop fans",
    "Lovers of vintage production",
    "Lyric and narrative obsessives",
    "Sunset golden hour dancers",
    "Indie pop music collectors",
  ],
  similarArtists: [
    { name: "The xx" },
    { name: "New Constellations" },
    { name: "Sunshine" },
    { name: "The Army, The Navy" },
  ],
  tracks: [
    { name: "Good Looking", album: "I Can't Let Go", duration: "" },
    { name: "To Love", album: "Memoir of a Sparklemuffin", duration: "" },
    { name: "OMG", album: "Memoir of a Sparklemuffin", duration: "" },
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
  slug: "g-i-dle",
  genres: ["K-Pop", "Pop", "Electronic Rock"],
  origin: "Seoul, South Korea",
  tagline: "Fiercely self-produced K-pop icons delivering bold, genre-fluid theatrical dominance.",
  socials: {},
  whySee: [
    "A rare, high-visibility American festival appearance from one of K-pop's most fiercely independent, self-produced female groups",
    "Soyeon, Miyeon, Minnie, Yuqi, and Shuhua executing a bold, theatrical performance locked in absolute synchronization",
    "Experience an exceptional blend of heavy hip-hop rhythm blocks, alternative rock guitars, and massive global pop hooks",
    "A deeply passionate, high-energy afternoon crowd environment fueled by intense stadium-scale fan chants and choreography",
  ],
  whatToExpect: [
    "Hyper-synchronized group choreography",
    "Bold multi-lingual rap flows",
    "High-production cinematic visual loops",
    "Intense localized fan energy",
  ],
  bestFor: [
    "K-pop and global pop devotees",
    "Precision dance performance lovers",
    "Fans of self-produced acts",
    "High-visibility mainstage crowds",
    "High-octane choreography fans",
  ],
  similarArtists: [
    { name: "aespa" },
    { name: "SB19" },
    { name: "Zara Larsson" },
    { name: "Jade" },
  ],
  tracks: [
    { name: "TOMBOY", album: "I NEVER DIE", duration: "" },
    { name: "Queencard", album: "I feel", duration: "" },
    { name: "Super Lady", album: "2", duration: "" },
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
  socials: {},
  whySee: [
    "A non-stop, high-energy festival party packed back-to-back with a decade of global, multi-platinum rap radio anthems",
    "Experience the live celebration of his massive 2026 studio era following his generation-defining work on Kendrick Lamar's records",
    "An absolute masterclass in West Coast party curation, blending heavy, bounce-driven synth lines with crisp sub-bass loops",
    "A premier evening crowd catalyst on Perry's stage designed purely to get tens of thousands of friends dancing together",
  ],
  whatToExpect: [
    "Bounce-driven club synth lines",
    "Massive hip-hop singalongs",
    "Heavy rolling sub-bass steps",
    "Nonstop high-energy party pacing",
  ],
  bestFor: [
    "West Coast hip-hop purists",
    "Late-night club music veterans",
    "Groups of friends partying",
    "High-visibility dance tent seekers",
    "Legacy anthem hunters",
  ],
  similarArtists: [
    { name: "Monaleo" },
    { name: "Lil Uzi Vert" },
    { name: "Beno" },
    { name: "LYNY" },
  ],
  tracks: [
    { name: "Pure Water (with Migos)", album: "Perfect Ten", duration: "" },
    { name: "Ballin' (with Roddy Ricch)", album: "Perfect Ten", duration: "" },
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
  socials: {},
  whySee: [
    "Experience Marylou Mayniel's mesmerizing, cloud-like electronic dreamscapes live under the open afternoon sky",
    "Hear the live execution of fresh, breathtaking material from her highly anticipated 2025/2026 sophomore studio era",
    "A beautifully intimate, atmospheric sonic oasis designed perfectly to completely escape standard commercial festival noise",
    "Pristine, close-mic'd vocal layers wrapped in lush, modern electronic production that makes giant crowds feel small",
  ],
  whatToExpect: [
    "Dreamy ambient synth pads",
    "Intimate vulnerable vocal runs",
    "Surreal retro-futuristic visuals",
    "Warm emotional afternoon camaraderie",
  ],
  bestFor: [
    "Left-field pop enthusiasts",
    "Ambient and electronic purists",
    "Lyric and narrative obsessives",
    "Vibe-focused afternoon loungers",
    "Underground indie music collectors",
  ],
  similarArtists: [
    { name: "AYYBO" },
    { name: "John Summit" },
    { name: "Snow Strippers" },
    { name: "Devault" },
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
  socials: {},
  whySee: [
    "The undisputed internet-cult phenomenon bringing a rapid-fire, blindingly fast happy hardcore assault to the Perry's tent",
    "Her iconic, theatrical equine mask performance framing a deeply chaotic and joyous audio-visual rave landscape",
    "Experience a non-stop, terminal velocity electronic dance party built purely around viral 160 BPM club weapons",
    "The ultimate high-energy Friday catalyst designed to unify tens of thousands of ravers into one massive dancing crowd",
  ],
  whatToExpect: [
    "Hyper-speed Eurodance loops",
    "Frenetic farmyard techno sub-bass",
    "Blinding high-production laser arrays",
    "Nonstop maximum velocity momentum",
  ],
  bestFor: [
    "Happy hardcore traditionalists",
    "Berlin club culture purists",
    "High-velocity dance seekers",
    "Late-night hard dance ravers",
    "Devotees of chaotic stage performance",
  ],
  similarArtists: [
    { name: "MC4D" },
    { name: "Eli Brown" },
    { name: "aespa" },
    { name: "Snow Strippers" },
  ],
  tracks: [
    { name: "My Barn My Rules", album: "My Barn My Rules", duration: "" },
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
  socials: {},
  whySee: [
    "A seasoned, sub-cultural live powerhouse celebrating over a decade of explosive, guitar-driven anthems on the mainstage",
    "Hear the heavy, deeply introspective live cuts from their critically adored studio milestone, I Want to Disappear",
    "Parker Cannon's uniquely intense vocal delivery commanding massive, park-wide crowd singalongs and explosive mosh pits",
    "A masterclass in traditional analog band energy that balances raw, aggressive punk speed with pristine melodic hooks",
  ],
  whatToExpect: [
    "Hyper-speed punk tempos",
    "Massive group-scale singalongs",
    "Explosive main-field mosh pits",
    "Blistering dual-guitar riffs",
  ],
  bestFor: [
    "Pop-punk nostalgia lovers",
    "Alternative rock traditionalists",
    "Mosh pit veterans",
    "Guitar music purists",
    "High-visibility mainstage crowds",
  ],
  similarArtists: [
    { name: "YUNGBLUD" },
    { name: "Wolf Alice" },
    { name: "The Smashing Pumpkins" },
    { name: "The Bends" },
  ],
  tracks: [
    { name: "Quicksand", album: "Under Soil and Dirt", duration: "" },
    { name: "Big Blind", album: "I Want to Disappear", duration: "" },
    { name: "Letterman", album: "I Want to Disappear", duration: "" },
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
  socials: {},
  whySee: [
    "One of metal's absolute finest contemporary innovators delivering a high-octane audio-visual sermon to the alternative stage",
    "Kadeem France's feral, soaring vocal command shifting effortlessly from brutal screams to gorgeous dream-pop runs",
    "Experience the live, towering execution of tracks from their genre-shattering masterpiece, I Let It In and It Took Everything",
    "A blistering live rock engine that transforms traditional festival mosh pits into deeply emotional performance art",
  ],
  whatToExpect: [
    "Punishing low-end guitar distortion",
    "Lush ambient shoegaze walls",
    "Ferocious metalcore vocal snarls",
    "Intense localized crowd pits",
  ],
  bestFor: [
    "Metalcore and shoegaze purists",
    "Devotees of chaotic stage performance",
    "Mosh pit traditionalists",
    "Fans of alternative rock design",
    "Heavy music gear nerds",
  ],
  similarArtists: [
    { name: "Sunday (1994)" },
    { name: "Wolf Alice" },
    { name: "The Smashing Pumpkins" },
    { name: "The Bends" },
  ],
  tracks: [
    { name: "Two-Way Mirror", album: "I Let It In and It Took Everything", duration: "" },
    { name: "Is It Really You?", album: "I Let It In and It Took Everything", duration: "" },
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
  socials: {},
  whySee: [
    "The absolute polarising flashpoint of modern underground internet rap making a high-visibility festival statement",
    "Experience an intense display of glitchy, ambient plugg beats mixed with reckless, youthful micro-rap flows",
    "An absolute wildfire crowd environment packed with chaotic, high-energy teenage mosh pits on the Tito's stage",
    "Catch a lightning-fast underground trendsetter running on pure digital clout before he completely alters pop infrastructure",
  ],
  whatToExpect: [
    "Glitchy atmospheric plugg loops",
    "High-energy chaotic youth pits",
    "Micro-rap vocal deliveries",
    "Raw unadulterated internet energy",
  ],
  bestFor: [
    "Underground plugg rap purists",
    "Internet rap scene trend spotters",
    "Mosh pit traditionalists",
    "Adrenaline-fueled dance seekers",
    "Gen-Z culture collectors",
  ],
  similarArtists: [
    { name: "Lil Uzi Vert" },
    { name: "Beno" },
    { name: "Little Simz" },
    { name: "Clipse" },
  ],
  tracks: [
    { name: "shine n peace", album: "shine n peace", duration: "" },
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
  socials: {},
  whySee: [
    "The combined forces of dance music heavyweights Party Favor and Nitti Gritti delivering a premier tech-house sermon",
    "A non-stop, high-energy tent party packed back-to-back with iconic global club hits like 'On My Mind'",
    "An absolute masterclass in party curation, blending heavy, rolling basslines with incredibly infectious vocal chops",
    "The ultimate mid-afternoon crowd catalyst under the Perry's tent designed purely to get thousands of people moving",
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
    { name: "Westend" },
    { name: "Omnom" },
    { name: "John Summit" },
    { name: "haute & freddy" },
  ],
  tracks: [
    { name: "On My Mind (with Diplo)", album: "On My Mind", duration: "" },
    { name: "Acrobatic", album: "Acrobatic", duration: "" },
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
  socials: {},
  whySee: [
    "Catch an exceptional independent lyricist executing a deeply atmospheric, storyteller-style performance on the mainstage",
    "Songwriting that lands like an intense, unguarded voice memo tracking the complex textures of young romance and identity",
    "A beautiful, sun-drenched early afternoon oasis that pairs delicate vocal textures with soaring indie pop melodies",
    "The official festival tour run highlighting her highly celebrated independent studio catalog to a massive live audience",
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
  similarArtists: [
    { name: "Stella Lefty" },
    { name: "Ella Boh" },
    { name: "Audrey Hobert" },
    { name: "Porch Light" },
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
  socials: {},
  whySee: [
    "One of Bristol's finest bass technicians commanding an intense, high-energy UK garage session in the Perry's tent",
    "Experience a relentless display of syncopated swing rhythms, heavy bassline rollers, and infectious classic vocal chops",
    "Catch a pioneer of the current international electronic groove resurgence during a prime, highly anticipated Friday slot",
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
  similarArtists: [
    { name: "MPH" },
    { name: "Chace" },
    { name: "Duke Dumont" },
    { name: "SIDEPIECE" },
  ],
  tracks: [
    { name: "Found MNE", album: "Forwards", duration: "" },
    { name: "Hooked", album: "Hooked", duration: "" },
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
    { name: "Max Styler" },
    { name: "INJI" },
    { name: "Eli Brown" },
    { name: "SIDEPIECE" },
  ],
  tracks: [
    { name: "Talk To Me", album: "Talk To Me", duration: "" },
    { name: "Backroom", album: "Strictly Rhythm", duration: "" },
    { name: "Grounded", album: "Grounded", duration: "" },
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
  socials: {},
  whySee: [
    "The internet-favorite sibling duo bringing their hyper-aesthetic, groove-laden brand of alt-pop directly to the Bud Light stage",
    "Henry and Pierre Beasley's perfectly synchronized vocal lines gliding over incredibly infectious, low-slung bass pockets",
    "Hear the live execution of fresh, chart-climbing material from their critically adored Atlantic Records studio era",
    "A beautifully curated afternoon vibe check that translates modern indie internet culture into a colorful live experience",
  ],
  whatToExpect: [
    "Infectious bass-driven grooves",
    "Dreamy nostalgic pop layers",
    "Effortless sibling stage banter",
    "Polished alt-pop multi-instrumentalism",
  ],
  bestFor: [
    "Contemporary bedroom pop fans",
    "Lo-fi internet aesthetic lovers",
    "Chill afternoon groove hunters",
    "Indie pop music collectors",
    "Fans of alternative pop melodies",
  ],
  similarArtists: [
    { name: "Ryman" },
    { name: "Claire Rosinkranz" },
    { name: "Julia Wolf" },
    { name: "sombr" },
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
  socials: {},
  whySee: [
    "A massive, highly anticipated hometown showcase performance from a visionary turning modern trap culture on its head",
    "Experience the earth-shaking live execution of underground anthems like 'Noxious' in a boiling festival tent setting",
    "A masterclass in technical deck manipulation, fusing deep hip-hop vocal samples with punishing, minimalist bass weight",
    "An absolute early-day adrenaline accelerator built purely to push soundcloud underground design to massive scales",
  ],
  whatToExpect: [
    "Punishing minimalist trap drops",
    "Deep rolling sub-bass steps",
    "Technical hometown deck cutting",
    "Hyper-kinetic tent crowd mosh",
  ],
  bestFor: [
    "Trap and future bass purists",
    "Hometown electronic music devotees",
    "High-velocity dance seekers",
    "Tent starters hunting bass loops",
    "Electronic sound design nerds",
  ],
  similarArtists: [
    { name: "Know Good" },
    { name: "Alison Wonderland" },
    { name: "Whethan" },
    { name: "KLO" },
  ],
  tracks: [
    { name: "Noxious", album: "Noxious", duration: "" },
    { name: "Feint", album: "Feint", duration: "" },
    { name: "Dash", album: "Dash", duration: "" },
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
  socials: {},
  whySee: [
    "A seasoned, stadium-proven live alternative outfit executing a brilliant, career-spanning performance on the Tito's stage",
    "Ryan Guldemond's distinctively sharp, eccentric vocal delivery locked in flawless sync with complex three-part backing harmonies",
    "Experience a massive, multi-generational cult favorite renowned for turning festival fields into roaring indie rock choirs",
    "Hear the live premiere of towering, theatrical rock cuts from their highly celebrated recent studio masterpieces",
  ],
  whatToExpect: [
    "Flawless three-part harmonies",
    "Eccentric alternative rock guitars",
    "Massive group-scale singalongs",
    "Intense communal crowd catharsis",
  ],
  bestFor: [
    "Indie rock traditionalists",
    "Fans of alternative pop melodies",
    "Lyric and narrative obsessives",
    "High-energy afternoon moshers",
    "Guitar music purists",
  ],
  similarArtists: [
    { name: "The Braymores" },
    { name: "Ink" },
    { name: "Villanelle" },
    { name: "Cruz Beckham and the Breakers" },
  ],
  tracks: [
    { name: "Hayloft", album: "O My Heart", duration: "" },
    { name: "Verbatim", album: "Touch Up", duration: "" },
    { name: "Explode!", album: "Grief Chapter", duration: "" },
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
  socials: {},
  whySee: [
    "Catch an exceptional, fiercely independent lyricist executing a deeply atmospheric, confessional performance on the Tito's stage",
    "Songwriting that lands like an unguarded voice memo tracking the complex, messy textures of young romance and identity",
    "A beautiful, early afternoon oasis that pairs delicate, close-mic'd vocal layers with unexpectedly heavy baseline drops",
    "The official premier festival tour run showcasing her highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: [
    "Intimate confessional lyricism",
    "Heavy low-slung beat pockets",
    "Charming self-aware stage banter",
    "Warm emotional field camaraderie",
  ],
  bestFor: [
    "Contemporary bedroom pop fans",
    "Lyric and narrative obsessives",
    "Early afternoon discovery seekers",
    "Intimate emotional story devotees",
    "Indie pop music collectors",
  ],
  similarArtists: [
    { name: "Ryman" },
    { name: "Bixby" },
    { name: "Lucy Bedroque" },
    { name: "Claire Rosinkranz" },
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
  socials: {},
  whySee: [
    "The undisputed hyperpop high princess bringing an explosive, completely unhinged club party directly to the Airbnb stage",
    "Catherine Slater's magnetic stage command delivering sharp choreography alongside high-fashion electronic production",
    "Experience a cult-favorite internet pioneer running through a stacked, multi-million stream catalog of futuristic pop anthems",
    "The ultimate early-evening catalyst designed purely to get groups of friends dancing wildly as the skyline shifts",
  ],
  whatToExpect: [
    "High-energy club choreography",
    "Provocative Y2K visual loops",
    "Massive electronic pop singalongs",
    "Irreverent electrifying stage atmosphere",
  ],
  bestFor: [
    "Hyperpop culture purists",
    "Fans of witty pop camp",
    "High-velocity dance seekers",
    "Fashion-forward festival crowds",
    "Sleek commercial pop collectors",
  ],
  similarArtists: [
    { name: "Charli XCX" },
    { name: "Tate McRae" },
    { name: "ADÉLA" },
    { name: "Disco Lines" },
  ],
  tracks: [
    { name: "Mine", album: "Slayyyter", duration: "" },
    { name: "Miss Belladonna", album: "STARFUCKER", duration: "" },
    { name: "Erotic Electronic", album: "STARFUCKER", duration: "" },
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
  socials: {},
  whySee: [
    "Catch a hyper-gifted multi-instrumentalist executing a beautifully warm, sun-drenched indie pop performance on the Allianz stage",
    "Songwriting that lands like an intense, playful voice memo tracking the carefree textures of youth and modern romance",
    "A stunning early afternoon oasis that pairs delicate vocal patterns with incredibly catchy, jazz-infused indie guitar lines",
    "The official festival tour run highlighting her highly celebrated Republic Records studio catalog to an international crowd",
  ],
  whatToExpect: [
    "Conversational pop vocal leads",
    "Bright jazz-infused guitar loops",
    "Charming self-aware stage banter",
    "Warm emotional early afternoon crowd",
  ],
  bestFor: [
    "Lyric and songwriting obsessives",
    "Fans of contemporary bedroom pop",
    "Early afternoon discovery seekers",
    "Indie pop music collectors",
    "Chill summer melody seekers",
  ],
  similarArtists: [
    { name: "Lucy Bedroque" },
    { name: "Ryman" },
    { name: "sombr" },
    { name: "Emi Grace" },
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
  socials: {},
  whySee: [
    "The absolute ultimate alternative live wildcard of the afternoon lineup, delivering an intensely aggressive rock assault",
    "A blistering display of dual-guitar distortion, heavy metallic baselinesteps, and ferocious, confrontational vocal delivery",
    "Experience a cult-favorite UK punk phenomenon renowned for transforming standard festival fields into pure mosh-pit chaos",
    "An absolute, non-stop adrenaline catalyst built around raw analog band chemistry and severe underground authority",
  ],
  whatToExpect: [
    "Aggressive dual-guitar distortion",
    "Ferocious punk vocal snarls",
    "Explosive early afternoon mosh",
    "Relentless terminal-velocity pacing",
  ],
  bestFor: [
    "Hardcore punk traditionalists",
    "Mosh pit veterans",
    "Devotees of chaotic stage performance",
    "Guitar music purists",
    "High-velocity rock seekers",
  ],
  similarArtists: [
    { name: "Turnstile" },
    { name: "The Creekers" },
    { name: "Villanelle" },
    { name: "Wolf Alice" },
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
  socials: {},
  whySee: [
    "One of alternative rock's absolute finest contemporary live forces delivering a deeply moving rock sermon early in the day",
    "Vocalist Sayle's ferociously raw, working-class lyrical delivery commanding an intensely emotional crowd singalong",
    "Experience a stunning combination of crushing post-punk guitar grit and soaring, 1990s-styled Madchester melodic hooks",
    "A blistering live band performance that transforms aggressive mosh pits into powerful moments of communal unity",
  ],
  whatToExpect: [
    "Towering post-punk guitar walls",
    "Ferocious working-class vocal leads",
    "Intense communal crowd singalongs",
    "Explosive early afternoon mosh",
  ],
  bestFor: [
    "Post-punk and alternative rock fans",
    "Lyric and songwriting obsessives",
    "Mosh pit traditionalists",
    "Guitar music purists",
    "Early afternoon discovery seekers",
  ],
  similarArtists: [
    { name: "Ink" },
    { name: "Day We Ran" },
    { name: "The Bends" },
    { name: "Wunderhorse" },
  ],
  tracks: [
    { name: "Talk For Hours", album: "Blending", duration: "" },
    { name: "Trauma Bonds", album: "Blending", duration: "" },
    { name: "Mind's a Lie", album: "Guided Tour", duration: "" },
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
  socials: {},
  whySee: [
    "Catch the multi-talented alternative multi-hyphenate delivering an incredibly high-octane guitar workout early on the mainstage",
    "Experience a brilliant, fuzzy indie-rock set that favors raw, analog garage band energy over sterile pop backing tracks",
    "A masterclass in unadulterated live fun from a natural performer who treats massive festival fields like a local house party",
    "Hear the live premiere of fresh, highly anticipated guitar-driven solo project cuts making an exclusive festival debut",
  ],
  whatToExpect: [
    "Fuzzed-out guitar hooks",
    "Scrappy garage-punk tempos",
    "Charming conversational stage banter",
    "High-energy early crowd camaraderie",
  ],
  bestFor: [
    "Indie rock traditionalists",
    "Garage punk hook fanatics",
    "Guitar music purists",
    "Early afternoon mainstage music fans",
    "Scene trend-spotting collectors",
  ],
  similarArtists: [
    { name: "Cruz Beckham and the Breakers" },
    { name: "Wolf Alice" },
    { name: "Spacey Jane" },
    { name: "Ella Red" },
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
  socials: {},
  whySee: [
    "One of the bass underground's fastest-rising technical engineers commanding an intense, heavy-hitting early session",
    "An elite display of hyper-clean electronic sound design, soaring cinematic synth chords, and punishing low-end rollers",
    "Experience a relentless daytime adrenaline accelerator that completely transforms the Perry's tent into a boiling rave floor",
    "The absolute perfect high-velocity option for electronic fans hunting heavy structural drops early in the schedule",
  ],
  whatToExpect: [
    "Punishing industrial basslines",
    "Soaring melodic synth cascades",
    "Intricate electronic sound design",
    "Nonstop maximum velocity mixing",
  ],
  bestFor: [
    "Melodic bass purists",
    "Underground dubstep devotees",
    "High-velocity dance seekers",
    "Tent starters hunting bass loops",
    "Electronic music culture lovers",
  ],
  similarArtists: [
    { name: "KLO" },
    { name: "Major Lazer" },
    { name: "Empire of the Sun" },
    { name: "horsegiirL" },
  ],
  tracks: [
    { name: "Take Me Back", album: "Take Me Back", duration: "" },
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
  socials: {},
  whySee: [
    "The absolute internet-cult rap duo bringing their hyper-aesthetic, loop-heavy sound system straight to the T-Mobile stage",
    "Experience an intense, rapid-fire vocal workout gliding effortlessly over incredibly crisp, low-slung electronic bass pockets",
    "A perfectly curated early afternoon vibe catalyst that translates modern digital sub-culture into a massive live statement",
    "An absolute wildfire crowd environment packed with chaotic, high-energy teenage mosh pits early in the day",
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
    "Early afternoon mainstage seekers",
    "Adrenaline-fueled dance fans",
    "Gen-Z culture collectors",
  ],
  similarArtists: [
    { name: "After" },
    { name: "Fakemink" },
    { name: "Lil Uzi Vert" },
    { name: "KLO" },
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
  socials: {},
  whySee: [
    "Catch an exceptional songwriting collective executing a deeply atmospheric, beautiful live guitar set on the Allianz stage",
    "Perfectly synchronized, warm vocal harmonies gliding effortlessly over rich, vintage-hued alternative arrangements",
    "A gorgeous, sun-drenched early afternoon oasis designed perfectly to completely escape standard commercial pop noise",
    "The official premier festival tour run showcasing the rich melodic textures of their highly praised independent catalog",
  ],
  whatToExpect: [
    "Shimmering indie guitar loops",
    "Lush dreamy vocal layers",
    "Charming self-aware stage banter",
    "Warm emotional midday crowd",
  ],
  bestFor: [
    "Lyric and songwriting obsessives",
    "Fans of contemporary bedroom pop",
    "Early afternoon discovery seekers",
    "Indie pop music collectors",
    "Chill summer melody seekers",
  ],
  similarArtists: [
    { name: "Spacey Jane" },
    { name: "Ella Red" },
    { name: "Sunday (1994)" },
    { name: "Julia Wolf" },
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
  socials: {},
  whySee: [
    "The internet-favorite indie project bringing their hyper-aesthetic, nostalgic brand of alt-pop straight to the Airbnb stage",
    "Lush, close-mic'd vocal hooks melting seamlessly into warm, chorus-heavy dream pop guitar lines",
    "Experience a beautifully curated afternoon vibe check that translates internet aesthetic culture into a tactile live space",
    "The perfect low-pressure opportunity to completely zone out to intricate, low-slung bass pockets and dreamy synth pads",
  ],
  whatToExpect: [
    "Hazy psychedelic visual loops",
    "Dreamy nostalgic pop layers",
    "Lush laptop-pop synth pads",
    "Warm smooth bassline grooves",
  ],
  bestFor: [
    "Contemporary bedroom pop fans",
    "Lo-fi internet aesthetic lovers",
    "Chill afternoon groove hunters",
    "Indie pop music collectors",
    "Fans of alternative pop melodies",
  ],
  similarArtists: [
    { name: "Between Friends" },
    { name: "Emi Grace" },
    { name: "Beabadoobee" },
    { name: "Claire Rosinkranz" },
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
  socials: {},
  whySee: [
    "Catch a hyper-gifted young lyricist executing a deeply atmospheric, confessional performance on the alternative stage",
    "Songwriting that lands like a punch to the face, weaponizing hyper-specific mid-twenties anxieties into massive rock hooks",
    "A stunning afternoon catalyst that pairs delicate, raw vocal verses with unexpectedly heavy, fuzzed-out guitar choruses",
    "The official premier festival tour run showcasing her highly celebrated independent studio catalog to a live crowd",
  ],
  whatToExpect: [
    "Fuzzed-out indie rock guitar hooks",
    "Raw powerful vocal leads",
    "Charming self-aware stage banter",
    "High-energy afternoon crowd energy",
  ],
  bestFor: [
    "Indie rock traditionalists",
    "Lyric and narrative obsessives",
    "Fans of dry lyrical wit",
    "Early afternoon discovery seekers",
    "Guitar music lovers",
  ],
  similarArtists: [
    { name: "The Army, The Navy" },
    { name: "Spacey Jane" },
    { name: "Easy Honey" },
    { name: "sombr" },
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
  socials: {},
  whySee: [
    "Witness one of the most technically gifted, breathtakingly unique vocalists performing early anywhere across the weekend",
    "Morphy's operatic, deeply brooding vocal delivery effortlessly filling the park air with staggering emotional power",
    "A beautifully dramatic, orchestrally layered sonic experience that seamlessly fuses dark pop with alternative R&B textures",
    "Experience the raw, bone-chilling crowd connection driven by intense, massive underground pop singalongs",
  ],
  whatToExpect: [
    "Stunning operatic vocal runs",
    "Shadow-drenched synth arrangements",
    "Dramatic theatrical stage presence",
    "Richly layered cinematic loops",
  ],
  bestFor: [
    "Pop vocal purists",
    "Fans of dramatic dark pop",
    "Chamber pop music lovers",
    "Early afternoon discovery seekers",
    "Devotees of cinematic storytelling",
  ],
  similarArtists: [
    { name: "Faouzia" },
    { name: "Paris Paloma" },
    { name: "Ivri" },
    { name: "Oklou" },
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
  socials: {},
  whySee: [
    "A massive, highly anticipated hometown showcase performance on the alternative stage celebrating their rapid local ascent",
    "Vocalist Marcus King's raw, soaring vocal delivery cutting cleanly through a wall of fuzzed-out dual-guitar riffs",
    "Experience an intensely passionate, high-energy live rock engine that completely bypasses processed backing tracks",
    "An absolute masterclass in traditional analog band chemistry that treats giant festival fields like an intimate local club",
  ],
  whatToExpect: [
    "Driving dual-guitar hooks",
    "Soaring alternative rock vocals",
    "Raw fuzzed-out garage riffs",
    "High-energy hometown camaraderie",
  ],
  bestFor: [
    "Indie rock traditionalists",
    "Post-punk revival stans",
    "Hometown scene supporters",
    "Guitar music purists",
    "Early afternoon moshers",
  ],
  similarArtists: [
    { name: "Villanelle" },
    { name: "Wunderhorse" },
    { name: "Ink" },
    { name: "Cruz Beckham and the Breakers" },
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
  socials: {},
  whySee: [
    "Catch a hyper-vivid independent producer and vocalist executing a deeply atmospheric, nocturnal live electronic performance",
    "Songwriting that lands like a confession, mapping dark interpersonal vulnerabilities with profound sonic precision",
    "A beautiful, early afternoon tent oasis that pairs delicate vocal textures with unexpectedly heavy, industrial basslines",
    "The official festival tour run highlighting her highly celebrated independent studio catalog to a massive live audience",
  ],
  whatToExpect: [
    "Shadow-drenched synth pads",
    "Intimate vulnerable vocal runs",
    "Punishing industrial low-end bass",
    "Hypnotic electronic visual elements",
  ],
  bestFor: [
    "Fans of dramatic dark pop",
    "Contemporary bedroom pop fans",
    "Underground club music devotees",
    "Early afternoon discovery seekers",
    "Electronic sound design nerds",
  ],
  similarArtists: [
    { name: "Bella Kay" },
    { name: "partyof2" },
    { name: "Balu Brigada" },
    { name: "The Army, The Navy" },
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
  socials: {},
  whySee: [
    "Catch an exceptional independent pop writer executing a beautifully warm, sun-drenched storyteller performance on the BMI stage",
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
    { name: "Stella Lefty" },
    { name: "Porch Light" },
    { name: "Whitney Whitney" },
    { name: "Next of Kin" },
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
  socials: {},
  whySee: [
    "A massive, highly anticipated afternoon tent session highlighting one of the internet's most watchable internet-dance personalities",
    "An exceptionally fun live blend of heavy tech-house basslines, viral vocal cuts, and flawless party curation",
    "Experience a wildfire crowd environment packed with carefree, high-energy dance floors under the Perry's tent",
    "The absolute perfect early-evening adrenaline booster designed to get large groups of friends moving together",
  ],
  whatToExpect: [
    "Bouncy tech-house rhythms",
    "Infectious vocal club chops",
    "High-energy crowd interaction",
    "Nonstop daytime party pacing",
  ],
  bestFor: [
    "Tech house enthusiasts",
    "Internet scene trend spotters",
    "Groups of friends partying",
    "Early afternoon tent starters",
    "High-octane dance seekers",
  ],
  similarArtists: [
    { name: "Ninajirachi" },
    { name: "Jackie Hollander" },
    { name: "INJI" },
    { name: "John Summit" },
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
  socials: {},
  whySee: [
    "Catch an exceptional independent multi-instrumentalist executing a beautifully warm, sun-drenched indie pop performance",
    "Songwriting that lands like an intense, unguarded voice memo tracking the complex vulnerabilities of modern romance",
    "A beautiful, sun-drenched early afternoon oasis that pairs delicate vocal textures with soaring indie pop melodies",
    "The official premier festival tour run showcasing her highly celebrated independent studio catalog to an international crowd",
  ],
  whatToExpect: [
    "Intimate confessional lyricism",
    "Shimmering dream-pop synths",
    "Charming self-aware stage banter",
    "Warm emotional afternoon crowd",
  ],
  bestFor: [
    "Lyric and songwriting obsessives",
    "Fans of contemporary bedroom pop",
    "Early afternoon discovery seekers",
    "Indie pop music collectors",
    "Chill summer melody seekers",
  ],
  similarArtists: [
    { name: "Lucy Bedroque" },
    { name: "Claire Rosinkranz" },
    { name: "Ryman" },
    { name: "sombr" },
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
  socials: {},
  whySee: [
    "The absolute polarizing flashpoint of modern underground internet rap making a high-visibility festival statement",
    "Experience an intense display of glitchy, ambient plugg beats mixed with reckless, youthful micro-rap flows",
    "An absolute wildfire crowd environment packed with chaotic, high-energy teenage mosh pits on the alternative stage",
    "Catch a lightning-fast underground trendsetter running on pure digital clout before he completely alters pop infrastructure",
  ],
  whatToExpect: [
    "Glitchy atmospheric loop beats",
    "High-energy chaotic youth pits",
    "Micro-rap vocal deliveries",
    "Raw unadulterated internet energy",
  ],
  bestFor: [
    "Underground plugg rap purists",
    "Internet rap scene trend spotters",
    "Mosh pit traditionalists",
    "Adrenaline-fueled dance seekers",
    "Gen-Z culture collectors",
  ],
  similarArtists: [
    { name: "Nettspend" },
    { name: "Lil Uzi Vert" },
    { name: "Monaleo" },
    { name: "Mustard" },
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
    "Driving dual-guitar hooks",
    "Raw soulful vocal delivery",
    "Crisp alternative hip-hop beats",
    "High-energy hometown camaraderie",
  ],
  bestFor: [
    "Hometown scene supporters",
    "Indie rock traditionalists",
    "Alternative hip-hop lovers",
    "Live instrument devotees",
    "Midday festival field dancers",
  ],
  similarArtists: [
    { name: "Clipse" },
    { name: "Easy Honey" },
    { name: "The Creekers" },
    { name: "The Braymores" },
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
  socials: {},
  whySee: [
    "Witness one of the most technically gifted, breathtakingly unique young vocalists performing anywhere across the entire weekend",
    "Valencia Grace's operatic, powerhouse vocal delivery effortlessly filling the open air with staggering emotional power",
    "A beautifully dramatic, orchestrally layered sonic experience that seamlessly fuses contemporary R&B with traditional soul",
    "Experience the raw, bone-chilling crowd connection driven by intense, massive dark-pop stadium singalongs",
  ],
  whatToExpect: [
    "Stunning multi-octave vocal runs",
    "Richly layered orchestral backdrops",
    "Dramatic theatrical stage presence",
    "Lush soulful piano melodies",
  ],
  bestFor: [
    "Pop vocal purists",
    "Fans of dramatic dark pop",
    "Chamber pop music lovers",
    "Early afternoon discovery seekers",
    "Devotees of cinematic storytelling",
  ],
  similarArtists: [
    { name: "Sienna Spiro" },
    { name: "Jae Stephens" },
    { name: "Amber Mark" },
    { name: "Justine Skye" },
  ],
  tracks: [
    { name: "What I'm Feeling", album: "Valencia Grace EP", duration: "" },
    { name: "Goodbye", album: "Valencia Grace EP", duration: "" },
    { name: "Skin", album: "Skin", duration: "" },
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
  socials: {},
  whySee: [
    "Catch an exceptional independent pop writer executing a beautifully warm, storyteller performance on the BMI stage",
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
    { name: "Ella Boh" },
    { name: "Porch Light" },
    { name: "Stella Lefty" },
    { name: "Next of Kin" },
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
