import { useEffect, useState } from 'react';

function useFetchFun<T>(fetchFun: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const fetchedData = await fetchFun();
        if (!cancelled) setData(fetchedData);
      } catch (error) {
        if (!cancelled)
          setErrorMessage(
            error instanceof Error ? error.message : 'Unknown error!'
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [fetchFun]);

  return { data, loading, errorMessage };
}

export default useFetchFun;
