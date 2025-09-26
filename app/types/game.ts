// types/game.ts
export interface Screenshot {
  id: number
  image: string
}

export interface Game {
  id: number
  name: string
  background_image?: string
  released?: string
  rating?: number
  ratings_count?: number
  metacritic?: number
  genres?: Array<{
    id: number
    name: string
  }>
  platforms?: Array<{
    platform: {
      id: number
      name: string
    }
  }>
  short_screenshots?: Screenshot[]
}

export interface GameApiResponse {
  data?: Game
  id?: number
  screenshots?: {
    results: Screenshot[]
  }
}