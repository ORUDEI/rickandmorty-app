import { Pagination } from './paginationInterface';

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export interface CharactersResponse {
  characters: {
    info: Pagination;
    results: Character[];
  };
}
