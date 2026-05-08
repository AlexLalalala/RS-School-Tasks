export interface RawDeal {
  steamId: string;
  title: string;
  normalPrice: string;
  salePrice: string;
  thumb: string;
  metacriticLink: string;
}

export interface Deal {
  steamId: string;
  title: string;
  normalPrice: number;
  salePrice: number;
  thumb: string;
  metacriticLink: string;
}
