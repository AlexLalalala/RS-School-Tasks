import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { queryClient } from './queryClient';
import ThemeContextProvider from './components/ThemeContextProvider';
import App from './App';

export default function Providers() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <BrowserRouter basename={process.env.NEXT_PUBLIC_BASE_PATH}>
          <App />
        </BrowserRouter>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}
