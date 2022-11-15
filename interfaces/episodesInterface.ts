import {Character} from './charactersInterface'
import { Pagination } from './paginationInterface'

export interface Episode {
  id: string
  name: string
  air_date: string
  characters: Character[]
}

export interface EpisodesResponse {
  episodes: {
    info: Pagination
    results: Episode[]
  }
}

export interface EpisodeResponse {
  episode: Episode
}