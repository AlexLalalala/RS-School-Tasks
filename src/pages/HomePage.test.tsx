import { render, screen, waitFor } from '@testing-library/react';
import fetchGames from '../api/fetchGames';
import type { Deal } from '../types/Deal';
import userEvent from '@testing-library/user-event';
import HomePage from './HomePage';
import { MemoryRouter, Route, Routes } from 'react-router';
import { createMockDeal } from '../__tests__/factories';
import Paginator from '../components/Paginator';

vi.mock('../api/fetchGames');
const mockFetchGames = vi.mocked(fetchGames);
const mockedDeals = {
  deals: [
    createMockDeal({ steamId: '1', title: 'Hades II' }),
    createMockDeal({ steamId: '2', title: 'Shovel Knight' }),
  ],
  lastPageNumber: 10,
};

const SEARCH_BAR_RETURN = 'Fear and Hunger';
vi.mock('../components/SearchBar', () => ({
  default: ({
    onSearch,
    initialQuery,
  }: {
    onSearch: (q: string) => void;
    initialQuery: string;
  }) => (
    <div data-testid="search-bar">
      <input data-testid="search-input" value={initialQuery}></input>
      <button
        data-testid="search-button"
        onClick={() => onSearch(SEARCH_BAR_RETURN)}
      ></button>
    </div>
  ),
}));

vi.mock('../components/DealsTable', () => ({
  default: ({ deals, loading }: { deals: Deal[]; loading: boolean }) => (
    <div data-testid="deals-table">
      {loading && <span data-testid="loading-indicator">Loading...</span>}
      {deals.map((d) => (
        <div key={d.steamId} data-testid="deal-card">
          {d.title}
        </div>
      ))}
    </div>
  ),
}));

vi.mock('../components/Paginator', () => ({
  default: vi.fn(
    ({
      currentPage,
      lastPageNumber,
      basePath,
    }: {
      currentPage: number;
      lastPageNumber: number;
      basePath: string;
    }) => (
      <div data-testid="paginator">
        <span data-testid="current-page">{currentPage}</span>
        <span data-testid="last-page">{lastPageNumber}</span>
        <span data-testid="base-path">{basePath}</span>
      </div>
    )
  ),
}));
const mockedPaginator = vi.mocked(Paginator);

beforeEach(() => {
  localStorage.clear();
  mockFetchGames.mockClear();
  mockFetchGames.mockResolvedValue(mockedDeals);
  mockedPaginator.mockClear();
});

const renderHomePage = (path = '/') => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/page/:pageNumber" element={<HomePage />} />
        <Route index element={<HomePage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('HomePage', () => {
  describe('renders', () => {
    it('title', () => {
      renderHomePage();

      expect(
        screen.getByRole('heading', { name: /steam/i })
      ).toBeInTheDocument();
    });
  });
  describe('on mount', () => {
    it('fetches deals with empty query when localStorage is empty', () => {
      renderHomePage();

      expect(mockFetchGames).toHaveBeenCalledExactlyOnceWith('', 1);
    });
    it('fetches deals with lastSearchQuery from localStorage', () => {
      localStorage.setItem('lastSearchQuery', 'Hades II');
      renderHomePage();

      expect(mockFetchGames).toHaveBeenCalledExactlyOnceWith('Hades II', 1);
    });
  });
  describe('on search', () => {
    it('fetches deals after submit in SearchBar', async () => {
      const user = userEvent.setup();
      renderHomePage();

      await waitFor(() => expect(mockFetchGames).toHaveBeenCalledTimes(1));
      await user.click(screen.getByTestId('search-button'));

      await waitFor(() => {
        expect(mockFetchGames).toHaveBeenCalledWith(SEARCH_BAR_RETURN, 1);
      });
    });
    it('saves the query into local storage', async () => {
      const user = userEvent.setup();
      renderHomePage();

      await waitFor(() => expect(mockFetchGames).toHaveBeenCalledTimes(1));
      await user.click(screen.getByTestId('search-button'));

      await waitFor(() => expect(mockFetchGames).toHaveBeenCalledTimes(2));

      expect(localStorage.getItem('lastSearchQuery')).toBe(SEARCH_BAR_RETURN);
    });
  });
  describe('error state', () => {
    it('shows error alert when fetch fails', async () => {
      mockFetchGames.mockRejectedValueOnce(new Error('Internal error'));
      renderHomePage();

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });
    it('shows error text when fetch fails', async () => {
      mockFetchGames.mockRejectedValueOnce(new Error('Internal error'));
      renderHomePage();

      await waitFor(() => {
        expect(screen.getByText(/Internal error/)).toBeInTheDocument();
      });
    });
    it('hides error message after successful retry', async () => {
      const user = userEvent.setup();
      mockFetchGames.mockRejectedValueOnce(new Error('Internal error'));
      renderHomePage();

      user.click(screen.getByTestId('search-button'));

      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      });
    });
  });
  describe('on successful search', () => {
    it('renders Paginator', async () => {
      renderHomePage();

      await waitFor(() => {
        expect(screen.getAllByTestId('paginator')[0]).toBeInTheDocument();
      });
    });
    it('renders DealsTable', async () => {
      renderHomePage();

      await waitFor(() => {
        expect(screen.getByTestId('deals-table')).toBeInTheDocument();
      });
    });
    it('while on "/" path calls Paginator with correct arguments', async () => {
      renderHomePage();

      await waitFor(() => {
        expect(screen.getAllByTestId('deal-card')[0]).toBeInTheDocument();
      });

      expect(mockedPaginator).toHaveBeenCalledWith(
        expect.objectContaining({ currentPage: 1 }),
        undefined
      );
    });
    it('while on "/page/:pageNumber" path calls Paginator with correct arguments', async () => {
      renderHomePage('/page/4');

      await waitFor(() => {
        expect(screen.getAllByTestId('deal-card')[0]).toBeInTheDocument();
      });

      expect(mockedPaginator).toHaveBeenCalledWith(
        expect.objectContaining({ currentPage: 4 }),
        undefined
      );
    });
  });
});
