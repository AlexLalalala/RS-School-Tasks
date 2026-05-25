import { MemoryRouter } from 'react-router';
import GameCard from './GameCard';
import { render, screen } from '@testing-library/react';
import { createMockDeal } from '../__tests__/factories';
import type { Deal } from '../types/Deal';
import userEvent from '@testing-library/user-event';
import useDealStore from '../stores/useDealStore';

const mockDeal = createMockDeal({
  dealId: '1',
  title: 'Hades II',
  normalPrice: 79.99,
  salePrice: 11.99,
});

const renderGameCard = (deal: Deal, path = '/') => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <GameCard deal={deal} />
    </MemoryRouter>
  );
};

beforeEach(() => {
  useDealStore.setState({ selectedDeals: [] });
});

describe('GameCard', () => {
  it('GameCard should render title', () => {
    renderGameCard(mockDeal);

    expect(screen.getByText('Hades II')).toBeInTheDocument();
  });

  it('GameCard should render normal price', () => {
    renderGameCard(mockDeal);

    expect(screen.getByText('79.99')).toBeInTheDocument();
  });

  it('GameCard should render sale price', () => {
    renderGameCard(mockDeal);

    expect(screen.getByText('11.99')).toBeInTheDocument();
  });

  it('GameCard should render image with proper alt and src', () => {
    renderGameCard(mockDeal);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockDeal.thumb);
    expect(image.getAttribute('alt')).toMatch(/Hades II/);
  });

  it('GameCard should render a link to the DealPanel', () => {
    renderGameCard(mockDeal);

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/page/1/${mockDeal.dealId}`
    );
  });

  it('saves deal into useDealStore on checking the box', async () => {
    const user = userEvent.setup();
    renderGameCard(mockDeal);

    await user.click(screen.getByRole('checkbox'));

    expect(useDealStore.getState().selectedDeals).toEqual([mockDeal]);
  });

  it('deletes deal from useDealStore after unchecking', async () => {
    const user = userEvent.setup();
    renderGameCard(mockDeal);

    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('checkbox'));

    expect(useDealStore.getState().selectedDeals).toEqual([]);
  });
});
