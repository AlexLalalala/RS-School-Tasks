import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

const Bomb = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div data-testid="bomb">Save child</div>;
};

const Fallback = () => <div data-testid="fallback">Fallback</div>;

const renderErrorBoundary = (shouldThrow = false) => {
  render(
    <ErrorBoundary fallback={<Fallback />}>
      <Bomb shouldThrow={shouldThrow} />
    </ErrorBoundary>
  );
};

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('ErrorBoundary', () => {
  it('renders child if child does not throw', () => {
    renderErrorBoundary();

    expect(screen.getByTestId('bomb')).toBeInTheDocument();
  });
  it('do not renders fallback if child does not throw', () => {
    renderErrorBoundary();

    expect(screen.queryByTestId('fallback')).not.toBeInTheDocument();
  });
  it('renders fallback if child throws', () => {
    renderErrorBoundary(true);

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
  });
  it('do not renders child if it throws', () => {
    renderErrorBoundary(true);

    expect(screen.queryByTestId('bomb')).not.toBeInTheDocument();
  });
});
