import { QueryClient } from '@tanstack/react-query';
import type { Deal } from '../types/Deal';
import type { DetailedDeal } from '../types/DetailedDeal';

export const createMockDeal = (overrides?: Partial<Deal>): Deal => ({
  dealId: '111a111',
  steamId: '1',
  title: 'Hades',
  normalPrice: 24.99,
  salePrice: 12.49,
  thumb: 'https://example.com/hades.jpg',
  metacriticLink: '/game/pc/hades',
  ...overrides,
});

export const createMockDetailedDeal = (
  overrides?: Partial<DetailedDeal>
): DetailedDeal => ({
  dealId: '111a111',
  steamId: '1',
  title: 'Hades',
  normalPrice: 24.99,
  salePrice: 12.49,
  thumb: 'https://example.com/hades.jpg',
  metacriticLink: '/game/pc/hades',
  steamRatingPercent: 80,
  steamRatingText: 'Very Positive',
  metacriticScore: 78,
  cheapestPrice: { price: 10, date: new Date(2024, 2, 10, 2, 30) },
  ...overrides,
});

export const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: Infinity,
        retry: false,
        staleTime: 0,
      },
    },
  });
};
