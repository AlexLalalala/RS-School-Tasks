import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NavigationBar from './NavigationBar';

vi.mock('./ErrorButton', () => ({
  default: () => <div data-testid="error-button"></div>,
}));

vi.mock('./ThemeToggler', () => ({
  default: () => <div data-testid="theme-toggler"></div>,
}));

const renderNavigationBar = (initialEntry = '/') =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <NavigationBar />
    </MemoryRouter>
  );

describe('Navigation', () => {
  it('renders', () => {
    renderNavigationBar();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('applies active class to Home link on "/"', () => {
    renderNavigationBar('/');
    expect(screen.getByRole('link', { name: 'Home' })).toHaveClass('active');
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveClass(
      'active'
    );
  });

  it('applies active class to About link on "/about"', () => {
    renderNavigationBar('/about');
    expect(screen.getByRole('link', { name: 'About' })).toHaveClass('active');
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveClass(
      'active'
    );
  });
});
