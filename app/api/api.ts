import { APIURL, KEY } from "@/app/constants";

interface Filter {
  filterName: string;
  option: string;
}

interface GameData {
  id: number;
  name: string;
  background_image?: string;
  released?: string;
  rating?: number;
  // أضف أي حقول أخرى تحتاجها
}

interface GameResponse {
  count: number;
  results: GameData[];
}

// استخدام unknown بدل any
interface GameDetails {
  data: GameData;
  screenshots: unknown; // يمكن لاحقاً تحديد النوع الصحيح
  similar: unknown;     // يمكن لاحقاً تحديد النوع الصحيح
}

const fetchFn = (url: string, cache?: number) =>
  fetch(url, { next: { revalidate: cache || 3600 } }).then((res) => res.json());

export const searchGames = async function (
  query?: string,
  page = 1,
  filters?: Filter[],
  page_size = 20,
  cache: number = 0
): Promise<{ data: GameResponse; count: number }> {
  const filtersQuery = filters
    ?.map((filter: Filter) => `${filter.filterName}=${filter.option}&`)
    .join("") || "";

  const url = `${APIURL}games?search=${query}&page_size=${page_size}&page=${page}&${filtersQuery}key=${KEY}`;
  
  const data: GameResponse = await fetchFn(url, cache);
  const count = data.count;

  return { data, count };
};

export const getGame = async function (id: string): Promise<GameDetails> {
  try {
    const data: GameData = await fetchFn(`${APIURL}games/${id}?key=${KEY}`); // details
    const screenshots: unknown = await fetchFn(`${APIURL}games/${id}/screenshots?&key=${KEY}`); // screenshots
    const similar: unknown = await fetchFn(`${APIURL}games/${id}/game-series?key=${KEY}`); // similar
    
    return { data, screenshots, similar };
  } catch (err) {
    throw err;
  }
};

export const getGameFromgenres = async function (genre = "51"): Promise<GameResponse> {
  const data: GameResponse = await fetchFn(`${APIURL}games?genres=${genre}&page_size=15&key=${KEY}`);
  return data;
};

export const gamebyplatforms = async function (id: string, page = 1, page_size = 20): Promise<GameResponse> {
  const data: GameResponse = await fetchFn(`${APIURL}games?platforms=${id}&page_size=${page_size || 40}&page=${page}&key=${KEY}`);
  return data;
};

export const getGamesByIds = async function (ids: string[]): Promise<GameDetails[]> {
  const data = await Promise.all(ids.map((id) => getGame(id)));
  return data;
};
