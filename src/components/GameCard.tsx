import { Link, useNavigate, useParams } from 'react-router';
import useDealStore from '../stores/useDealStore';
import type { Deal } from '../types/Deal';

function GameCard({ deal }: { deal: Deal }) {
  const { title, normalPrice, salePrice, thumb, dealId } = deal;
  const { pageNumber } = useParams();
  const currentPage = Number(pageNumber) || 1;
  const detailPanelUrl = `/page/${currentPage}/${dealId}`;

  const selectDeal = useDealStore((state) => state.selectDeal);
  const unselectDeal = useDealStore((state) => state.unselectDeal);

  const isSelected = useDealStore((state) =>
    state.selectedDeals.some((d) => d.dealId === dealId)
  );

  const handleCheckboxChange = () => {
    if (isSelected) unselectDeal(dealId);
    else selectDeal(deal);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(detailPanelUrl);
  };

  return (
    <>
      <div
        className="card h-100"
        style={{ width: '18rem' }}
        onClick={handleClick}
      >
        <img
          src={thumb}
          className="card-img-top"
          alt={`Thumbnail of ${title}`}
          loading="lazy"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            <span className="text-body-secondary text-decoration-line-through">
              {normalPrice}
            </span>{' '}
            <span className="fw-bold fs-5">{salePrice}</span>
          </p>
          <div className="mt-auto d-flex align-items-center">
            <Link
              to={detailPanelUrl}
              className="btn btn-outline-primary flex-grow-1"
            >
              See Details
            </Link>
            <input
              type="checkbox"
              className="form-check-input fs-4 m-2 me-0"
              checked={isSelected}
              onChange={handleCheckboxChange}
              onClick={handleCheckboxClick}
              aria-label={`checkbox-${title}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default GameCard;
