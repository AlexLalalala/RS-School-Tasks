import type { Deal } from '../types/Deal';

export const createMockDeal = (overrides?: Partial<Deal>): Deal => ({
  steamId: '1',
  title: 'Hades',
  normalPrice: 24.99,
  salePrice: 12.49,
  thumb: 'https://example.com/hades.jpg',
  metacriticLink: '/game/pc/hades',
  ...overrides,
});
