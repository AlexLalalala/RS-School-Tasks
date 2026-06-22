'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

function ErrorButton() {
  const t = useTranslations('ErrorButton');

  const [error, setError] = useState(false);

  if (error) throw new Error('Manual error!');
  const handleClick = () => {
    setError(true);
  };
  return (
    <>
      <button className="btn btn-outline-danger" onClick={handleClick}>
        {t('errorButton')}
      </button>
    </>
  );
}

export default ErrorButton;
