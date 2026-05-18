import { describe, it, expect, vi, beforeEach } from 'vitest';
import fetchDetailedDeal from './fetchDetailedDeal';

const mockRawDeal = {
  gameInfo: {
    name: 'Hades II',
    steamRatingPercent: '95',
    metacriticScore: '96',
    steamRatingText: 'Overwhelmingly Positive',
    thumb: 'http://example.com/thumb.jpg',
    salePrice: '1.99',
    metacriticLink: '/game/pc/hades-ii',
  },
  cheapestPrice: {
    price: '0.99',
    date: 1609459200,
  },
};

const mockFetch = (status: number, body: object) =>
  vi.fn().mockResolvedValue({
    status,
    ok: status >= 200 && status < 300,
    json: () => Promise.resolve(body),
  });

beforeEach(() => vi.restoreAllMocks());

describe('fetchDetailedDeal', () => {
  it('returns a correctly shaped deal on success', async () => {
    vi.stubGlobal('fetch', mockFetch(200, mockRawDeal));

    const deal = await fetchDetailedDeal('123');

    expect(deal.title).toBe('Hades II');
    expect(deal.steamRatingText).toBe('Overwhelmingly Positive');
  });

  it('parses steamRatingPercent and metacriticScore as numbers', async () => {
    vi.stubGlobal('fetch', mockFetch(200, mockRawDeal));

    const deal = await fetchDetailedDeal('123');

    expect(deal.steamRatingPercent).toBe(95);
    expect(deal.metacriticScore).toBe(96);
    expect(typeof deal.steamRatingPercent).toBe('number');
    expect(typeof deal.metacriticScore).toBe('number');
  });

  it('parses cheapestPrice.price as a float', async () => {
    vi.stubGlobal('fetch', mockFetch(200, mockRawDeal));

    const deal = await fetchDetailedDeal('123');

    expect(deal.cheapestPrice.price).toBe(0.99);
  });

  it('parses cheapestPrice.date as a Date', async () => {
    vi.stubGlobal('fetch', mockFetch(200, mockRawDeal));

    const deal = await fetchDetailedDeal('123');

    expect(deal.cheapestPrice.date).toBeInstanceOf(Date);
  });

  it('converts cheapestPrice.date to the correct Date value', async () => {
    vi.stubGlobal('fetch', mockFetch(200, mockRawDeal));

    const deal = await fetchDetailedDeal('123');

    expect(deal.cheapestPrice.date.getTime()).toBe(Date.UTC(2021, 0, 1));
  });

  it('throws on 401', async () => {
    vi.stubGlobal('fetch', mockFetch(401, {}));

    await expect(fetchDetailedDeal('123')).rejects.toThrow(
      'Authorization error.'
    );
  });

  it('throws on 404', async () => {
    vi.stubGlobal('fetch', mockFetch(404, {}));

    await expect(fetchDetailedDeal('123')).rejects.toThrow('Page not found.');
  });

  it('throws on 500', async () => {
    vi.stubGlobal('fetch', mockFetch(500, {}));

    await expect(fetchDetailedDeal('123')).rejects.toThrow(
      'The server is having issues.'
    );
  });

  it('throws a generic error on other non-ok status', async () => {
    vi.stubGlobal('fetch', mockFetch(418, {}));

    await expect(fetchDetailedDeal('123')).rejects.toThrow(
      'Something went wrong (418).'
    );
  });
});
