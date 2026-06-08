import { render, screen } from '@testing-library/react';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

const renderIndicator = (password: string) =>
  render(<PasswordStrengthIndicator password={password} />);

describe('PasswordStrengthIndicator', () => {
  it('shows all criteria as failed for an empty password', () => {
    renderIndicator('');

    expect(screen.getByText(/one number/i).className).toContain('text-danger');
    expect(screen.getByText(/one lowercase/i).className).toContain(
      'text-danger'
    );
    expect(screen.getByText(/one uppercase/i).className).toContain(
      'text-danger'
    );
    expect(screen.getByText(/one special/i).className).toContain('text-danger');
  });

  it('marks only satisfied criteria as success', () => {
    renderIndicator('abc123');

    expect(screen.getByText(/one lowercase/i).className).toContain(
      'text-success'
    );
    expect(screen.getByText(/one uppercase/i).className).toContain(
      'text-danger'
    );
    expect(screen.getByText(/one number/i).className).toContain('text-success');
    expect(screen.getByText(/one special/i).className).toContain('text-danger');
  });

  it('shows "Strong" label for a fully qualifying password', () => {
    renderIndicator('Abc1!');

    expect(screen.getByText('Strong')).toBeInTheDocument();
  });

  it('shows "Weak" label for a single-criterion password', () => {
    renderIndicator('abc');

    expect(screen.getByText('Weak')).toBeInTheDocument();
  });
});
