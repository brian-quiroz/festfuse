export type Artist = {
  name: string
  slug: string
  imageUrl?: string
  objectPosition?: string
  genres: string[]
  origin: string
  tagline: string
  socials: {
    spotify?: string
    instagram?: string
    twitter?: string
  }
  stats: {
    stagePresence: number
    crowdEnergy: number
    vocals: number
    discoverability: number
    fanFamiliarity: number
  }
  metrics: {
    monthlyListeners: string
    popularityScore: string
    topTrack: string
    latestRelease: string
  }
  whySee: string[]
  whatToExpect: string[]
  bestFor: string[]
  similarArtists: string[]
  tracks: Array<{ name: string; album: string; duration: string }>
  about: string
  trivia: Array<{ emoji: string; fact: string }>
  schedule: {
    festival: string
    stage: string
    day: string
    date: string
    startTime: string
    endTime: string
  }
}
