export interface RawDeal {
  title: string;
  normalPrice: string;
  salePrice: string;
  thumb: string;
  metacriticLink: string;
}

export interface Deal {
  title: string;
  normalPrice: number;
  salePrice: number;
  thumb: string;
  metacriticLink: string;
}
