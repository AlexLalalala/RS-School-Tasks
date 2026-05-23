import { CHEAPSHARK_BASE_URL, CHEAPSHARK_PATH } from '../constant';
import type { DetailedDeal, RawDetailedDeal } from '../types/DetailedDeal';
import { toDeal } from './fetchGames';

const toDetailedDeal = ({
  gameInfo: {
    name,
    steamRatingPercent,
    metacriticScore,
    steamRatingText,
    ...rawDeal
  },
  cheapestPrice,
}: RawDetailedDeal): DetailedDeal => {
  return {
    ...toDeal(rawDeal),
    steamRatingPercent: parseInt(steamRatingPercent),
    metacriticScore: parseInt(metacriticScore),
    cheapestPrice: {
      price: parseFloat(cheapestPrice.price),
      date: new Date(Number(cheapestPrice.date) * 1000),
    },
    steamRatingText,
    title: name,
  };
};

const fetchDetailedDeal = async (dealId: string): Promise<DetailedDeal> => {
  const url = new URL(CHEAPSHARK_PATH, CHEAPSHARK_BASE_URL);
  url.searchParams.set('id', dealId);

  const response = await fetch(url);

  if (response.status === 401) throw new Error('Authorization error.');
  if (response.status === 404) throw new Error('Page not found.');
  if (response.status >= 500)
    throw new Error('The server is having issues. Try again in a moment.');
  if (!response.ok)
    throw new Error(`Something went wrong (${response.status}).`);

  const res = await response.json();

  return toDetailedDeal(res);
};

export default fetchDetailedDeal;
