import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number(process.env.CACHE_TTL_MS) || 5 * 60 * 1000,
      gcTime: Number(process.env.CACHE_GC_MS) || 15 * 60 * 1000,
      retry: 1,
    },
  },
});
