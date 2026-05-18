import type { Deal, RawDeal } from './Deal';

interface gameInfo extends RawDeal {
  name: string;
  steamRatingPercent: string;
  steamRatingText: string;
  metacriticScore: string;
  dealID: string;
}

export interface RawDetailedDeal {
  gameInfo: gameInfo;
  cheapestPrice: { price: string; date: string };
}

export interface DetailedDeal extends Deal {
  title: string;
  steamRatingPercent: number;
  steamRatingText: string;
  metacriticScore: number;
  cheapestPrice: { price: number; date: Date };
}
