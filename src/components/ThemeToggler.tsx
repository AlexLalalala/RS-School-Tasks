import { useTheme } from '../contexts/ThemeContext';

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="form-check form-switch form-check-inline">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id="theme-toggle"
        checked={theme == 'light'}
        onChange={toggleTheme}
      />
      <label className="form-check-label" htmlFor="theme-toggle"></label>
    </div>
  );
};

export default ThemeToggler;
