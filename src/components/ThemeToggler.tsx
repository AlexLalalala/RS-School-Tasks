'use client';

import { useTheme } from '../contexts/ThemeContext';

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="form-check form-switch form-check-inline m-2 d-flex align-items-center">
      <label
        className="form-check-label me-2 text-secondary"
        htmlFor="theme-toggle"
      >
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </label>
      <input
        className="form-check-input m-0"
        type="checkbox"
        value=""
        id="theme-toggle"
        checked={theme == 'light'}
        onChange={toggleTheme}
      />
    </div>
  );
};

export default ThemeToggler;
