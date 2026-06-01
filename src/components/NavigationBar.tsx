import type { FunctionComponent } from 'react';
import { NavLink, type NavLinkRenderProps } from 'react-router';
import ErrorButton from './ErrorButton';
import ThemeToggler from './ThemeToggler';
import CacheInvalidator from './CacheInvalidator';

const NavigationBar: FunctionComponent = () => {
  const navLinkClass = ({ isActive }: NavLinkRenderProps) =>
    `nav-link ${isActive ? 'active' : ''}`;
  return (
    <nav className="navbar navbar-expand px-3 rounded bg-body-tertiary border">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className={navLinkClass} to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={navLinkClass} to="/about">
            About
          </NavLink>
        </li>
      </ul>
      <div className="ms-auto d-flex align-items-center">
        <ThemeToggler />
        <CacheInvalidator />
        <ErrorButton />
      </div>
    </nav>
  );
};

export default NavigationBar;
