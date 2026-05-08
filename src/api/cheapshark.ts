import { CHEAPSHARK_BASE_URL, CHEAPSHARK_PATH, PAGE_SIZE } from '../constant';
import type { Deal, RawDeal } from '../types/Deal';

function toDeal(raw: RawDeal): Deal {
  return {
    ...raw,
    normalPrice: parseFloat(raw.normalPrice),
    salePrice: parseFloat(raw.salePrice),
  };
}

async function fetchGames(query: string, pageNumber: number): Promise<Deal[]> {
  const url = new URL(CHEAPSHARK_PATH, CHEAPSHARK_BASE_URL);
  if (query) {
    url.searchParams.set('title', query);
  }
  url.searchParams.set('pageSize', String(PAGE_SIZE));
  url.searchParams.set('pageNumber', String(pageNumber));

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }

  // const respJson = await response.json();
  // console.log(respJson);
  return (await response.json())
    .map((raw: unknown) => raw as RawDeal)
    .map(toDeal);
}

export default fetchGames;
