import { render, screen, waitFor } from '@testing-library/react';
import fetchDetailedDeal from '../api/fetchDetailedDeal';
import DealPanel from './DealPanel';
import { MemoryRouter } from 'react-router';
import { createMockDetailedDeal } from '../__tests__/factories';

vi.mock('../api/fetchDetailedDeal');
const mockedFetchedDetailedDeal = vi.mocked(fetchDetailedDeal);

const renderDealPanel = (initialPath = '111a111') => {
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <DealPanel />
    </MemoryRouter>
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

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
