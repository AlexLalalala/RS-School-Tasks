'use client';

import type { FunctionComponent } from 'react';
import ErrorButton from './ErrorButton';
import ThemeToggler from './ThemeToggler';
import CacheInvalidator from './CacheInvalidator';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LocaleSwitcher } from './LocaleSwitcher';

const NavigationBar: FunctionComponent = () => {
  const t = useTranslations('NavigationBar');
  const pathname = usePathname();

  const navLinkClass = (href: string) =>
    `nav-link ${pathname?.startsWith(href) ? 'active' : ''}`;
  return (
    <nav className="navbar navbar-expand px-3 rounded bg-body-tertiary border">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={navLinkClass('/')} href="/">
            {t('home')}
          </Link>
        </li>
        <li className="nav-item">
          <Link className={navLinkClass('/about')} href="/about">
            {t('about')}
          </Link>
        </li>
      </ul>
      <div className="ms-auto d-flex align-items-center">
        <ThemeToggler />
        <LocaleSwitcher />
        <CacheInvalidator />
        <ErrorButton />
      </div>
    </nav>
  );
};

export default NavigationBar;
