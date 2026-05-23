import { render, screen } from '@testing-library/react';
import ErrorButton from './ErrorButton';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorButton', () => {
  it('renders', () => {
    render(<ErrorButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('throws error on click', async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary fallback={<div data-testid="fallback"></div>}>
        <ErrorButton />
      </ErrorBoundary>
    );
    await user.click(screen.getByRole('button'));

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
  });
});
