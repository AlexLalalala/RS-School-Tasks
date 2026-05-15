import { render, screen, waitFor } from '@testing-library/react';
import fetchGames from './api/cheapshark';
import type { Deal } from './types/Deal';
import App from './App';
import userEvent from '@testing-library/user-event';

vi.mock('./api/cheapshark');

const SEARCH_BAR_RETURN = 'Fear and Hunger';
vi.mock('./components/SearchBar', () => ({
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

vi.mock('./component/DealsTable', () => ({
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

const mockFetchGames = vi.mocked(fetchGames);

beforeEach(() => {
  localStorage.clear();
  mockFetchGames.mockClear();
});

describe('App', () => {
  describe('on mount', () => {
    it('fetches deals with empty query when localStorage is empty', () => {
      render(<App />);

      expect(mockFetchGames).toHaveBeenCalledExactlyOnceWith('', 1);
    });
    it('fetches deals with lastSearchQuery from localStorage', () => {
      localStorage.setItem('lastSearchQuery', 'Hades II');
      render(<App />);

      expect(mockFetchGames).toHaveBeenCalledExactlyOnceWith('Hades II', 1);
    });
  });
  describe('on search', () => {
    it('fetches deals after submit in SearchBar', async () => {
      const user = userEvent.setup();
      render(<App />);

      await waitFor(() => expect(mockFetchGames).toHaveBeenCalledTimes(1));
      await user.click(screen.getByTestId('search-button'));

      await waitFor(() => {
        expect(mockFetchGames).toHaveBeenCalledWith(SEARCH_BAR_RETURN, 1);
      });
    });
    it('saves the query into local storage', async () => {
      const user = userEvent.setup();
      render(<App />);

      await waitFor(() => expect(mockFetchGames).toHaveBeenCalledTimes(1));
      await user.click(screen.getByTestId('search-button'));

      await waitFor(() => expect(mockFetchGames).toHaveBeenCalledTimes(2));

      expect(localStorage.getItem('lastSearchQuery')).toBe(SEARCH_BAR_RETURN);
    });})
    describe('error state', () => {
      it('shows error alert when fetch fails', async () => {
        mockFetchGames.mockRejectedValueOnce(new Error('Internal error'));
        render(<App />);

        await waitFor(() => {
          expect(screen.getByRole('alert')).toBeInTheDocument();
        });
      });
      it('shows error text when fetch fails', async () => {
        mockFetchGames.mockRejectedValueOnce(new Error('Internal error'));
        render(<App />);

        await waitFor(() => {
          expect(screen.getByText(/Internal error/)).toBeInTheDocument();
        });
      });
      it('hides error message after successful retry', async () => {
        const user = userEvent.setup();
        mockFetchGames.mockRejectedValueOnce(new Error('Internal error'));
        render(<App />);

        user.click(screen.getByTestId('search-button'));

        await waitFor(() => {
          expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        });
    });
  });
});
