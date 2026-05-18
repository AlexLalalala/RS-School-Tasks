export interface RawDeal {
  dealID: string;
  steamAppID: string;
  title: string;
  normalPrice: string;
  salePrice: string;
  thumb: string;
  metacriticLink: string;
}

export interface Deal {
  dealId: string;
  steamId: string;
  title: string;
  normalPrice: number;
  salePrice: number;
  thumb: string;
  metacriticLink: string;
}
