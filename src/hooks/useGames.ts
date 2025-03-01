import { GameQuery } from "../App";
import useData from "./useData";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

const useGames = (gameQuery: GameQuery) => {
  return useData<Game>(
    "/games",
    {
      params: {
        genres: gameQuery.genre?.id || undefined,  // Ensure valid query params
        platforms: gameQuery.platform?.id || undefined,
        ordering: gameQuery.sortOrder || undefined,
        search: gameQuery.searchText || undefined,
      },
    },
    [gameQuery.genre?.id, gameQuery.platform?.id, gameQuery.sortOrder, gameQuery.searchText] // Optimized dependencies
  );
};

export default useGames;
