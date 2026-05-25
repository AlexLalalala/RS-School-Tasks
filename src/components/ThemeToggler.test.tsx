import { render, screen } from '@testing-library/react';
import ThemeContextProvider from './ThemeContextProvider';
import ThemeToggler from './ThemeToggler';
import userEvent from '@testing-library/user-event';

const renderThemeToggler = () => {
  render(
    <ThemeContextProvider>
      <ThemeToggler />
    </ThemeContextProvider>
  );
};

describe('ThemeToggler', () => {
  it('is checked by default on light theme', () => {
    renderThemeToggler();

    expect(screen.getByRole('checkbox')).toBeChecked();
  });
  it('switches to dark theme when clicked', async () => {
    const user = userEvent.setup();
    renderThemeToggler();

    await user.click(screen.getByRole('checkbox'));

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(document.documentElement).toHaveAttribute('data-bs-theme', 'dark'); // ← real proof
  });

  it('toggles back to light on second click', async () => {
    const user = userEvent.setup();
    renderThemeToggler();

    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('checkbox'));

    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(document.documentElement).toHaveAttribute('data-bs-theme', 'light');
  });
});
