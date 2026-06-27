export type Artist = {
  name: string
  slug: string
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
  vibes: string[]
  fansOf: string[]
  tracks: Array<{ name: string; album: string; duration: string }>
  about: string
  trivia: Array<{ emoji: string; fact: string }>
  schedule: {
    stage: string
    day: string
    time: string
    duration: string
  }
}
