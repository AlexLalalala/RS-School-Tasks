'use client';

import { useTransition } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    startTransition(() => {
      router.replace(pathname, { locale: e.target.value });
    });
  }

  return (
    <select
      value={currentLocale}
      className="form-select form-select-sm"
      aria-label="Language Switcher"
      onChange={handleChange}
      style={{ width: '70px' }}
    >
      {routing.locales.map((locale) => (
        <option value={locale} key={locale} disabled={isPending ? true : false}>
          {locale}
        </option>
      ))}
    </select>
  );
}
