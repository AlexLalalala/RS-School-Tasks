import fetchGames from '../api/fetchGames';
import SearchBar from '../components/SearchBar';
import DealsTable from '../components/DealsTable';
import Paginator from '../components/Paginator';
import { Outlet, useNavigate, useParams } from 'react-router';
import useFetchFun from '../hooks/useFetchFun';
import useLocalStorage from '../hooks/useLocalStorage';
import { useCallback } from 'react';

function HomePage() {
  const [query, setQuery] = useLocalStorage('lastSearchQuery', '');

  const navigate = useNavigate();

  const { pageNumber, dealId } = useParams();
  const currentPage = Number(pageNumber) || 1;

  const isPanelOpen = !!dealId;

  const fetchFun = useCallback(
    () => fetchGames(query, currentPage),
    [query, currentPage]
  );
  const { data, loading, errorMessage } = useFetchFun(fetchFun);
  const { deals = [], lastPageNumber = 1 } = data ?? {};

  const handleSearch = (query: string) => {
    setQuery(query);
    if (currentPage !== 1 || dealId) {
      navigate('/page/1');
    }
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
                loading={loading}
              />
              <DealsTable deals={deals} loading={loading} />
              <Paginator
                currentPage={currentPage}
                lastPageNumber={lastPageNumber}
                basePath=""
                loading={loading}
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
