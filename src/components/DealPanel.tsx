import { useEffect, useState, type FunctionComponent } from 'react';
import { Link, useParams } from 'react-router';
import fetchDetailedDeal from '../api/fetchDetailedDeal';
import type { DetailedDeal } from '../types/DetailedDeal';
import { buildMetacriticURL } from '../utils';

const DealPanel: FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deal, setDeal] = useState<DetailedDeal | null>(null);
  const dealId = useParams().dealId || '';

  useEffect(() => {
    const loadDealDetails = async () => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const fetchedDeal = await fetchDetailedDeal(dealId);
        setDeal(fetchedDeal);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Unknown error!'
        );
      } finally {
        setLoading(false);
      }
    };

    loadDealDetails();
  }, [dealId]);
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column align-items-center text-center">
        {loading ? (
          <div className="spinner-border text-primary mt-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : errorMessage ? (
          <div className="alert alert-danger w-100" role="alert">
            ⚠️ {errorMessage}
          </div>
        ) : (
          <>
            <h5 className="card-title">{deal?.title}</h5>
            {deal?.thumb && (
              <img
                src={deal.thumb}
                alt={deal.title}
                className="img-fluid rounded mb-3"
              />
            )}
            <hr className="w-100" />
            <p className="text-muted mb-1">
              Steam rating:{' '}
              <span className="text-body">
                {deal?.steamRatingText} ({deal?.steamRatingPercent}%)
              </span>
            </p>
            <p className="text-muted mb-1">
              Metacritic:{' '}
              <span className="text-body">{deal?.metacriticScore}</span>
            </p>
            <p className="text-muted mb-1">
              Price now:{' '}
              <span className="text-success fw-bold">{deal?.salePrice}</span>
            </p>
            <p className="text-muted mb-1">
              Cheapest ever:{' '}
              <span className="text-body">{deal?.cheapestPrice.price}</span>
            </p>
            {deal?.metacriticLink ? (
              <a
                href={buildMetacriticURL(deal?.metacriticLink)}
                className="btn btn btn-outline-success"
              >
                See Metacritic
              </a>
            ) : (
              <button className="btn disabled" disabled>
                No Metacritic
              </button>
            )}
            <Link to="../" className="btn btn-outline-secondary mt-2">
              Close
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default DealPanel;
