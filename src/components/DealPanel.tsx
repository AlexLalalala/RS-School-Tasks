'use client';

import fetchDetailedDeal from '../api/fetchDetailedDeal';
import { buildMetacriticURL } from '../utils/metacritic';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { THUMB_HEIGHT, THUMB_WIDTH } from '@/constant';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const DealPanel = () => {
  const t = useTranslations('DealPanel');
  const { dealId = '', pageNumber } =
    useParams<{ dealId: string; pageNumber: string }>() ?? {};
  const currentPage = Number(pageNumber) || 1;

  const {
    isPending,
    isFetching,
    isError,
    data: deal,
    error,
  } = useQuery({
    queryKey: ['dealDetails', dealId],
    queryFn: () => fetchDetailedDeal(dealId),
  });

  return (
    <div
      className={`card shadow-sm h-100 fetch-fade ${isFetching && !isPending ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="card-body d-flex flex-column align-items-center text-center">
        {isPending ? (
          <div className="spinner-border text-primary mt-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : isError ? (
          <div className="alert alert-danger w-100" role="alert">
            ⚠️ {error.message}
          </div>
        ) : (
          <>
            <h5 className="card-title">{deal?.title}</h5>
            {deal?.thumb && (
              <Image
                src={deal.thumb}
                alt={deal.title}
                width={THUMB_WIDTH}
                height={THUMB_HEIGHT}
                className="img-fluid rounded mb-3"
              />
            )}
            <hr className="w-100" />
            <p className="text-muted mb-1">
              {t('steamRating')}:{' '}
              <span className="text-body">
                {deal?.steamRatingText} ({deal?.steamRatingPercent}%)
              </span>
            </p>
            <p className="text-muted mb-1">
              Metacritic:{' '}
              <span className="text-body">{deal?.metacriticScore}</span>
            </p>
            <p className="text-muted mb-1">
              {t('priceNow')}:{' '}
              <span className="text-success fw-bold">${deal?.salePrice}</span>
            </p>
            <p className="text-muted mb-1">
              {t('cheapestEver')}:{' '}
              <span className="text-body">
                {deal?.cheapestPrice.price !== null
                  ? `$${deal.cheapestPrice.price}`
                  : t('noData')}
              </span>
            </p>
            {deal?.metacriticLink ? (
              <a
                href={buildMetacriticURL(deal?.metacriticLink)}
                className="btn btn-outline-success"
              >
                {t('metacriticButton')}
              </a>
            ) : (
              <button className="btn disabled" disabled>
                {t('noMetacritic')}
              </button>
            )}
            <Link
              href={`/page/${currentPage}`}
              className="btn btn-outline-secondary mt-2"
            >
              {t('closeButton')}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default DealPanel;
