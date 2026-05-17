import { useEffect, useState } from 'react';
import type { Deal } from '../types/Deal';
import fetchGames from '../api/cheapshark';
import SearchBar from '../components/SearchBar';
import DealsTable from '../components/DealsTable';

function HomePage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [query, setQuery] = useState(
    localStorage.getItem('lastSearchQuery') || ''
  );

  useEffect(() => {
    const loadDeals = async () => {
      setLoading(true);
      setErrorMessage(null);
      localStorage.setItem('lastSearchQuery', query);
      try {
        const deals = await fetchGames(query, 1);
        setDeals(deals);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Unknown error!'
        );
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, [query]);

  const handleSearch = (query: string) => {
    localStorage.setItem('lastSearchQuery', query);
    setQuery(query);
  };

  return (
    <>
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
        <DealsTable deals={deals} loading={loading} />
      )}
    </>
  );
}

export default HomePage;
