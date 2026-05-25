import { createMockDeal } from '../__tests__/factories';
import { renderHook, act } from '@testing-library/react';
import useDealStore from './useDealStore';

beforeEach(() => {
  useDealStore.setState({ selectedDeals: [] });
});

const mockDeal1 = createMockDeal({
  dealId: '1',
  title: 'Hades II',
});
const mockDeal2 = createMockDeal({
  dealId: '2',
  title: 'Shovel Knight',
});

const setup = () => {
  const { result } = renderHook(() => useDealStore());

  act(() => result.current.selectDeal(mockDeal1));
  act(() => result.current.selectDeal(mockDeal2));

  return { result };
};

describe('useDealStore', () => {
  it('selects multiple deals and stores them', () => {
    const { result } = setup();

    expect(result.current.selectedDeals).toEqual([mockDeal1, mockDeal2]);
  });
  it('unselects deal', () => {
    const { result } = setup();

    act(() => result.current.unselectDeal(mockDeal1.dealId));

    expect(result.current.selectedDeals).toEqual([mockDeal2]);
  });
  it('unselects all', () => {
    const { result } = setup();

    act(() => result.current.unselectAll());

    expect(result.current.selectedDeals).toEqual([]);
  });
});
