import { render, screen } from '@testing-library/react';
import Flyout from './Flyout';
import useDealStore from '../stores/useDealStore';
import { createMockDeal } from '../__tests__/factories';
import userEvent from '@testing-library/user-event';

const mockedDeal = createMockDeal();

describe('Flyout', () => {
  it('empty if nothing selected', () => {
    render(<Flyout />);

    expect(screen.queryByText(/select/i)).not.toBeInTheDocument();
  });
  it('visible if at least one Deal selected', () => {
    useDealStore.setState({ selectedDeals: [mockedDeal] });
    render(<Flyout />);

    expect(screen.queryAllByText(/select/i).length).toBeGreaterThan(0);
  });
  it('shows proper number of selected Deals', () => {
    useDealStore.setState({
      selectedDeals: [mockedDeal, mockedDeal, mockedDeal],
    });
    render(<Flyout />);

    expect(screen.getByText(/3/)).toBeInTheDocument();
  });
  it('unselects all deals on click on Unselect', async () => {
    const user = userEvent.setup();
    useDealStore.setState({ selectedDeals: [mockedDeal] });
    render(<Flyout />);

    await user.click(screen.getByRole('button', { name: /unselect/i }));

    expect(useDealStore.getState().selectedDeals).toEqual([]);
  });
});
