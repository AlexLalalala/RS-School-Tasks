import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number(import.meta.env.VITE_CASH_TTL_MS) || 5 * 60 * 1000,
      gcTime: Number(import.meta.env.VITE_CASH_GC_MS) || 15 * 60 * 1000,
      retry: 1,
    },
  },
});
