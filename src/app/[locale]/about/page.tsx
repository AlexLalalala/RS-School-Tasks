import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function AboutPage({ params }: AboutPageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('AboutPage');

  return (
    <>
      <h5 className="mt-5">{t('title')}</h5>
      <p className="mt-2">
        <span className="text-muted">{t('createdBy')}: </span> {t('name')}
      </p>
      <p className="mt-2">
        <span className="text-muted">{t('usesApi')}: </span>
        <a href="https://www.cheapshark.com">Cheapshark</a>
      </p>
      <p className="mt-2">
        <span className="text-muted">{t('createdFor')}: </span>
        <a href="https://rs.school"> RS School </a>
      </p>
    </>
  );
}
