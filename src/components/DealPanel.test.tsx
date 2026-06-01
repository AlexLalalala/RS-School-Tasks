import { render, screen, waitFor } from '@testing-library/react';
import fetchDetailedDeal from '../api/fetchDetailedDeal';
import DealPanel from './DealPanel';
import { MemoryRouter, Route, Routes } from 'react-router';
import {
  createMockDetailedDeal,
  createTestQueryClient,
} from '../__tests__/factories';
import { QueryClientProvider } from '@tanstack/react-query';

vi.mock('../api/fetchDetailedDeal');
const mockedFetchedDetailedDeal = vi.mocked(fetchDetailedDeal);

const renderDealPanel = (initialPath = '/page/1/111a111') => {
  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/page/:pageNumber/:dealId" element={<DealPanel />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const mockedResponse = createMockDetailedDeal({ title: 'Hades II' });

beforeEach(() => {
  mockedFetchedDetailedDeal.mockClear();
  mockedFetchedDetailedDeal.mockResolvedValue(mockedResponse);
});

describe('DealPanel', () => {
  it('on loading shows spinner', () => {
    mockedFetchedDetailedDeal.mockImplementation(() => new Promise(() => {}));
    renderDealPanel();

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
  it('on success shows game information', async () => {
    renderDealPanel();
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Hades II' })
      ).toBeInTheDocument()
    );
  });
  it('fetches with correct id', () => {
    renderDealPanel('/page/1/test_id100');

    expect(mockedFetchedDetailedDeal).toHaveBeenCalledExactlyOnceWith(
      'test_id100'
    );
  });
  it('on error shows alert', async () => {
    mockedFetchedDetailedDeal.mockRejectedValueOnce(
      new Error('Specific Test Name Error')
    );
    renderDealPanel();

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
  it('on error shows error message', async () => {
    mockedFetchedDetailedDeal.mockRejectedValueOnce(
      new Error('Specific Test Name Error')
    );
    renderDealPanel();

    await waitFor(() => {
      expect(screen.getByText(/specific test name error/i)).toBeInTheDocument();
    });
  });
});
