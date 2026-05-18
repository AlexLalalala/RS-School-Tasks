import type { RawDeal } from '../types/Deal';
import fetchGames from './fetchGames';
import {
  CHEAPSHARK_BASE_URL,
  CHEAPSHARK_PATH,
  LAST_PAGE_NUMBER_HEADER,
  PAGE_SIZE,
} from '../constant';

const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockClear();
  vi.stubGlobal('fetch', mockFetch);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const headers = new Headers();
headers.set(LAST_PAGE_NUMBER_HEADER, '10');

const mockResponse = (data: unknown, status = 200) => {
  mockFetch.mockResolvedValueOnce({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
    headers,
  });
};

const createRawDeal = (overrides?: Partial<RawDeal>): RawDeal => ({
  steamAppID: '1',
  title: 'Hades',
  normalPrice: '24.99',
  salePrice: '12.49',
  thumb: 'https://example.com/hades.jpg',
  metacriticLink: '/game/pc/hades',
  ...overrides,
});

describe('fetchGames', () => {
  describe('URL construction', () => {
    it('calls fetch with the correct base URL and path', async () => {
      mockResponse([]);
      await fetchGames('', 1);

      const calledURL = mockFetch.mock.calls[0][0] as URL;
      expect(calledURL.href).toContain(
        new URL(CHEAPSHARK_PATH, CHEAPSHARK_BASE_URL).href
      );
    });

    it('includes pageSize in the URL', async () => {
      mockResponse([]);
      await fetchGames('', 1);

      const calledURL = mockFetch.mock.calls[0][0] as URL;
      expect(calledURL.searchParams.get('pageSize')).toBe(String(PAGE_SIZE));
    });

    it('includes pageNumber in the URL (one less than argument)', async () => {
      mockResponse([]);
      await fetchGames('', 2);

      const calledURL = mockFetch.mock.calls[0][0] as URL;
      expect(calledURL.searchParams.get('pageNumber')).toBe('1');
    });

    it('includes storeId in the URL', async () => {
      mockResponse([]);
      await fetchGames('', 1);

      const calledURL = mockFetch.mock.calls[0][0] as URL;
      expect(calledURL.searchParams.get('storeID')).toBe('1');
    });

    it('includes title param when query is provided', async () => {
      mockResponse([]);
      await fetchGames('Hades II', 1);

      const calledURL = mockFetch.mock.calls[0][0] as URL;
      expect(calledURL.searchParams.get('title')).toBe('Hades II');
    });

    it('does not include title param when query is empty', async () => {
      mockResponse([]);
      await fetchGames('', 1);

      const calledURL = mockFetch.mock.calls[0][0] as URL;
      expect(calledURL.searchParams.has('title')).toBe(false);
    });
  });
  describe('happy path', () => {
    it('returns an empty array when no deals are found', async () => {
      mockResponse([]);
      const { deals } = await fetchGames('', 1);

      expect(deals).toEqual([]);
    });

    it('returns transformed deals on success', async () => {
      mockResponse([createRawDeal()]);
      const { deals } = await fetchGames('', 1);

      expect(deals[0]).toEqual({
        steamId: '1',
        title: 'Hades',
        normalPrice: 24.99,
        salePrice: 12.49,
        thumb: 'https://example.com/hades.jpg',
        metacriticLink: '/game/pc/hades',
      });
    });
  });
  describe('error handling', () => {
    it('throws authorization error on 401', async () => {
      mockResponse([], 401);

      await expect(fetchGames('', 1)).rejects.toThrow(/authorization/i);
    });
    it('throws not found error on 404', async () => {
      mockResponse([], 404);

      await expect(fetchGames('', 1)).rejects.toThrow(/not found/i);
    });
    it('throws server error on 5xx', async () => {
      mockResponse([], 502);

      await expect(fetchGames('', 1)).rejects.toThrow(/server/i);
    });
    it('throws generic error on other non ok responses', async () => {
      mockResponse([], 400);

      await expect(fetchGames('', 1)).rejects.toThrow(/something/i);
    });
  });
});
