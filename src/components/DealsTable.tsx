import { Component } from 'react';
import type { Deal } from '../types/Deal';
import GameCard from './GameCard';
import SkeletonCard from './SkeletonCard';
import { PAGE_SIZE } from '../constant';

interface DealsTableProps {
  deals: Deal[] | null;
  loading: boolean;
}

class DealsTable extends Component<DealsTableProps, object> {
  state = {};

  render = () => {
    const { deals, loading } = this.props;

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
                  <GameCard {...deal} />
                </div>
              ))}
        </div>
      </div>
    );
  };
}

export default DealsTable;
