import {
  CHEAPSHARK_BASE_URL,
  CHEAPSHARK_PATH,
  LAST_PAGE_NUMBER_HEADER,
  PAGE_SIZE,
} from '../constant';
import type { Deal, RawDeal } from '../types/Deal';

interface fetchGamesResult {
  deals: Deal[];
  lastPageNumber: number;
}

function toDeal({
  steamAppID,
  salePrice,
  normalPrice,
  ...rest
}: RawDeal): Deal {
  return {
    ...rest,
    normalPrice: parseFloat(normalPrice),
    salePrice: parseFloat(salePrice),
    steamId: steamAppID,
  };
}

function getLastPageNumber(response: Response) {
  const lastPage = response.headers.get(LAST_PAGE_NUMBER_HEADER);
  if (!lastPage) {
    throw new Error('Can not find lastPageNumber in the response');
  }
  return Number(lastPage);
}

async function fetchGames(
  query: string,
  pageNumber: number
): Promise<fetchGamesResult> {
  const url = new URL(CHEAPSHARK_PATH, CHEAPSHARK_BASE_URL);
  if (query) {
    url.searchParams.set('title', query);
  }
  url.searchParams.set('pageSize', String(PAGE_SIZE));
  url.searchParams.set('pageNumber', String(pageNumber - 1));
  url.searchParams.set('storeID', '1');

  const response = await fetch(url);

  if (response.status === 401) throw new Error('Authorization error.');
  if (response.status === 404) throw new Error('Page not found.');
  if (response.status >= 500)
    throw new Error('The server is having issues. Try again in a moment.');
  if (!response.ok)
    throw new Error(`Something went wrong (${response.status}).`);

  const lastPageNumber = getLastPageNumber(response);
  const deals = (await response.json())
    .map((raw: unknown) => raw as RawDeal)
    .map(toDeal);
  return { deals, lastPageNumber };
}

export default fetchGames;
