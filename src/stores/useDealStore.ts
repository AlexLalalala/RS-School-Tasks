import { create } from 'zustand';
import type { Deal } from '../types/Deal';

interface DealState {
  selectedDeals: Deal[];
  selectDeal: (deal: Deal) => void;
  unselectDeal: (id: string) => void;
  unselectAll: () => void;
}

const useDealStore = create<DealState>((set) => ({
  selectedDeals: [],
  selectDeal: (deal) =>
    set((state) => ({ selectedDeals: [...state.selectedDeals, deal] })),
  unselectDeal: (dealId) =>
    set((state) => ({
      selectedDeals: state.selectedDeals.filter((d) => d.dealId !== dealId),
    })),
  unselectAll: () => set(() => ({ selectedDeals: [] })),
}));

export default useDealStore;
