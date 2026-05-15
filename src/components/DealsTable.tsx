import { Component } from 'react';
import type { Deal } from '../types/Deal';
import GameCard from './GameCard';
import SkeletonCard from './SkeletonCard';
import { PAGE_SIZE } from '../constant';
import ErrorCard from './ErrorCard';
import ErrorBoundary from './ErrorBoundary';

interface DealsTableProps {
  deals: Deal[] | null;
  loading: boolean;
}

function DealsTable ({deals, loading}:DealsTableProps){
  if (!loading && deals?.length === 0) {
    return <p>No deals found.</p>;
  }

  return (
    <div className="container justify-content-center">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {loading
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div className="col" key={`skeleton-card-${i}`}>
                <SkeletonCard />
              </div>
            ))
          : deals?.map((deal: Deal) => (
              <div className="col" key={`card-for-${deal.steamId}`}>
                <ErrorBoundary fallback={<ErrorCard />}>
                  <GameCard {...deal} />
                </ErrorBoundary>
              </div>
            ))}
      </div>
    </div>
  );
};


export default DealsTable;
