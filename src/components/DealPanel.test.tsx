import { render, screen, waitFor } from '@testing-library/react';
import fetchDetailedDeal from '../api/fetchDetailedDeal';
import DealPanel from './DealPanel';
import { MemoryRouter } from 'react-router';
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
        <DealPanel />
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
  it('on loading shows loading', () => {
    renderDealPanel();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('on success', async () => {
    renderDealPanel();
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Hades II' })
      ).toBeInTheDocument()
    );
  });
  it('on error', async () => {
    mockedFetchedDetailedDeal.mockThrowOnce(new Error('Error'));
    renderDealPanel();

    waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  });
});
