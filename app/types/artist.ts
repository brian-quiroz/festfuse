export type Artist = {
  name: string
  slug: string
  imageUrl?: string
  objectPosition?: string
  festivalStatus?: string
  genres: string[]
  origin: string
  tagline: string
  socials: {
    spotify?: string
    instagram?: string
    twitter?: string
  }
  metrics: {
    monthlyListeners: string
    topTrack: string
    latestRelease: string
  }
  whySee: string[]
  whatToExpect: string[]
  bestFor: string[]
  similarArtists: Array<{ name: string; imageUrl?: string }>
  tracks: Array<{ name: string; album: string; duration: string; artworkUrl?: string }>
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
