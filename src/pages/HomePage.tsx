import { useEffect, useState } from 'react';
import type { Deal } from '../types/Deal';
import fetchGames from '../api/fetchGames';
import SearchBar from '../components/SearchBar';
import DealsTable from '../components/DealsTable';
import Paginator from '../components/Paginator';
import { Outlet, useParams } from 'react-router';

function HomePage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [query, setQuery] = useState(
    localStorage.getItem('lastSearchQuery') || ''
  );
  const [lastPageNumber, setLastPageNumber] = useState(1);
  const currentPage = Number(useParams().pageNumber) || 1;
  const dealId = useParams().dealId;
  const isPanelOpen = !!dealId;

  useEffect(() => {
    const loadDeals = async () => {
      setLoading(true);
      setErrorMessage(null);
      localStorage.setItem('lastSearchQuery', query);
      try {
        const { deals: fetchedDeals, lastPageNumber: fetchedLastPage } =
          await fetchGames(query, currentPage);
        setDeals(fetchedDeals);
        setLastPageNumber(fetchedLastPage);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Unknown error!'
        );
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, [query, currentPage]);

  const handleSearch = (query: string) => {
    localStorage.setItem('lastSearchQuery', query);
    setQuery(query);
  };

  return (
    <>
      <div className="d-flex gap-3">
        <section className="flex-grow-1 min-width-0">
          <h1>Steam Deals Searcher</h1>
          <SearchBar onSearch={handleSearch} initialQuery={query} />
          {errorMessage ? (
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <span>⚠️ {errorMessage}</span>
              <button
                className="btn btn-sm btn-outline-danger ms-auto"
                onClick={() => handleSearch(query)}
              >
                Try again
              </button>
            </div>
          ) : (
            <>
              <Paginator
                currentPage={currentPage}
                lastPageNumber={lastPageNumber}
                basePath=""
              />
              <DealsTable deals={deals} loading={loading} />
              <Paginator
                currentPage={currentPage}
                lastPageNumber={lastPageNumber}
                basePath=""
              />
            </>
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
            <Outlet />
          </section>
        )}
      </div>
    </>
  );
}

export default HomePage;
