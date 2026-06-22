import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <>
      <h4 className="mt-5">{t('title')}</h4>
      <p className="mt-2">{t('description')}</p>
      <Link href="/" className="mt-2 btn btn-outline-warning">
        {t('returnButton')}
      </Link>
    </>
  );
}
