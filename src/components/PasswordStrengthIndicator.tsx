import passwordStrength from '../utils/passwordStrength';

const COLORS = ['danger', 'danger', 'warning', 'info', 'success'];
const LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator = ({
  password,
}: PasswordStrengthIndicatorProps) => {
  const { score, hasLowerCase, hasUpperCase, hasNumber, hasSpecial } =
    passwordStrength(password);

  return (
    <div className="mt-1">
      <div className="progress" style={{ height: '6px' }}>
        <div
          className={`progress-bar bg-${COLORS[score]}`}
          style={{ width: `${(score / 4) * 100}%` }}
        />
      </div>
      <small className={`text-${COLORS[score]}`}>{LABELS[score]}</small>
      <ul className="list-unstyled small mt-1 mb-0">
        <li className={hasNumber ? 'text-success' : 'text-danger'}>
          {hasNumber ? '✓' : '✗'} One number
        </li>
        <li className={hasLowerCase ? 'text-success' : 'text-danger'}>
          {hasLowerCase ? '✓' : '✗'} One lowercase letter
        </li>
        <li className={hasUpperCase ? 'text-success' : 'text-danger'}>
          {hasUpperCase ? '✓' : '✗'} One uppercase letter
        </li>
        <li className={hasSpecial ? 'text-success' : 'text-danger'}>
          {hasSpecial ? '✓' : '✗'} One special character
        </li>
      </ul>
    </div>
  );
};

export default PasswordStrengthIndicator;
