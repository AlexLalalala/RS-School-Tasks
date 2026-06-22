'use client';

import type { FunctionComponent } from 'react';
import ErrorButton from './ErrorButton';
import ThemeToggler from './ThemeToggler';
import CacheInvalidator from './CacheInvalidator';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NavigationBar: FunctionComponent = () => {
  const pathname = usePathname();

  const navLinkClass = (href: string) =>
    `nav-link ${pathname?.startsWith(href) ? 'active' : ''}`;
  return (
    <nav className="navbar navbar-expand px-3 rounded bg-body-tertiary border">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={navLinkClass('/')} href="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className={navLinkClass('/about')} href="/about">
            About
          </Link>
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
