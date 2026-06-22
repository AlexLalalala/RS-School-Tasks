'use client';

import fetchGames from '@/api/fetchGames';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import Paginator from './Paginator';
import DealsTable from './DealsTable';
import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

function DealsList({ panel }: { panel?: ReactNode }) {
  const t = useTranslations('DealsList');
  const [query, setQuery] = useLocalStorage('lastSearchQuery', '');

  const router = useRouter();

  const { pageNumber = '', dealId = '' } =
    useParams<{ pageNumber?: string; dealId?: string }>() ?? {};
  const currentPage = Number(pageNumber) || 1;
  const isPanelOpen = !!dealId;

  const handleSearch = (query: string) => {
    setQuery(query);
    if (currentPage !== 1 || dealId) {
      router.push('/page/1');
    }
  };

  const { isPending, isFetching, isError, data, error } = useQuery({
    queryKey: ['games', query, currentPage],
    queryFn: () => fetchGames(query, currentPage),
  });
  const { deals = [], lastPageNumber = 1 } = data ?? {};

  return (
    <>
      <div className="d-flex gap-3">
        <section className="flex-grow-1 min-width-0">
          <h1>{t('title')}</h1>
          <SearchBar onSearch={handleSearch} initialQuery={query} />
          {isError ? (
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <span>⚠️ {error.message}</span>
              <button
                className="btn btn-sm btn-outline-danger ms-auto"
                onClick={() => handleSearch(query)}
              >
                {t('tryAgainButton')}
              </button>
            </div>
          ) : (
            <div
              className={
                isFetching && !isPending ? 'opacity-50' : 'opacity-100'
              }
            >
              <Paginator
                currentPage={currentPage}
                lastPageNumber={lastPageNumber}
                basePath=""
                loading={isPending}
              />
              <DealsTable deals={deals} loading={isPending} />
              <div className="mt-3">
                <Paginator
                  currentPage={currentPage}
                  lastPageNumber={lastPageNumber}
                  basePath=""
                  loading={isPending}
                />
              </div>
            </div>
          )}
        </section>
        {isPanelOpen && (
          <section
            style={{
              flex: '0 0 25%',
              position: 'sticky',
              top: '0',
              height: '100vh',
            }}
          >
            {panel}
          </section>
        )}
      </div>
    </>
  );
}

export default DealsList;
