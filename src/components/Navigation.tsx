import type { FunctionComponent } from 'react';
import { NavLink, type NavLinkRenderProps } from 'react-router';

const NavigationBar: FunctionComponent = () => {
  const navLinkClass = ({ isActive }: NavLinkRenderProps) =>
    `nav-link ${isActive ? 'active' : ''}`;
  return (
    <nav className="navbar navbar-expand bg-dark navbar-dark px-3">
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
    </nav>
  );
};

export default NavigationBar;
