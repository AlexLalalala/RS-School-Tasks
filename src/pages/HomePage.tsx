import fetchGames from '../api/fetchGames';
import SearchBar from '../components/SearchBar';
import DealsTable from '../components/DealsTable';
import Paginator from '../components/Paginator';
import { Outlet, useNavigate, useParams } from 'react-router';
import useLocalStorage from '../hooks/useLocalStorage';
import { useQuery } from '@tanstack/react-query';

function HomePage() {
  const [query, setQuery] = useLocalStorage('lastSearchQuery', '');

  const navigate = useNavigate();

  const { pageNumber, dealId } = useParams();
  const currentPage = Number(pageNumber) || 1;

  const isPanelOpen = !!dealId;

  const handleSearch = (query: string) => {
    setQuery(query);
    if (currentPage !== 1 || dealId) {
      navigate('/page/1');
    }
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['games', query, currentPage],
    queryFn: () => fetchGames(query, currentPage),
  });
  const { deals = [], lastPageNumber = 1 } = data ?? {};

  return (
    <>
      <div className="d-flex gap-3">
        <section className="flex-grow-1 min-width-0">
          <h1>Steam Deals Searcher</h1>
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
                Try again
              </button>
            </div>
          ) : (
            <>
              <Paginator
                currentPage={currentPage}
                lastPageNumber={lastPageNumber}
                basePath=""
                loading={isPending}
              />
              <DealsTable deals={deals} loading={isPending} />
              <Paginator
                currentPage={currentPage}
                lastPageNumber={lastPageNumber}
                basePath=""
                loading={isPending}
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
