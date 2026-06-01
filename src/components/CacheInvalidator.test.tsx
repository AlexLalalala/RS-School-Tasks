import { render, screen } from '@testing-library/react';
import { createTestQueryClient } from '../__tests__/factories';
import { QueryClientProvider } from '@tanstack/react-query';
import CacheInvalidator from './CacheInvalidator';
import userEvent from '@testing-library/user-event';

const renderCacheInvalidator = () => {
  const queryClient = createTestQueryClient();
  const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
  render(
    <QueryClientProvider client={queryClient}>
      <CacheInvalidator />
    </QueryClientProvider>
  );

  return { invalidateSpy };
};

describe('CacheInvalidator', () => {
  it('renders the button', () => {
    renderCacheInvalidator();

    expect(
      screen.getByRole('button', { name: /refresh/i })
    ).toBeInTheDocument();
  });
  it('invalidates game cache on click', async () => {
    const user = userEvent.setup();
    const { invalidateSpy } = renderCacheInvalidator();

    await user.click(screen.getByRole('button', { name: /refresh/i }));

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['games'] });
  });
  it('invalidates dealDetails cache on click', async () => {
    const user = userEvent.setup();
    const { invalidateSpy } = renderCacheInvalidator();

    await user.click(screen.getByRole('button', { name: /refresh/i }));

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['dealDetails'] });
  });
});
