'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

const CacheInvalidator = () => {
  const t = useTranslations('CacheInvalidator');
  const queryClient = useQueryClient();

  const handleClick = () => {
    queryClient.invalidateQueries({ queryKey: ['games'] });
    queryClient.invalidateQueries({ queryKey: ['dealDetails'] });
  };

  return (
    <div className="m-2">
      <button className="btn btn-outline-warning" onClick={handleClick}>
        {t('refreshButton')}
      </button>
    </div>
  );
};

export default CacheInvalidator;
