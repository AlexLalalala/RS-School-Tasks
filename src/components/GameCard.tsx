import { Link, useParams } from 'react-router';

interface GameCardProps {
  title: string;
  normalPrice: number;
  salePrice: number;
  thumb: string;
  metacriticLink: string;
  dealId: string;
}

function GameCard({
  title,
  normalPrice,
  salePrice,
  thumb,
  dealId,
}: GameCardProps) {
  const { pageNumber } = useParams();
  const currentPage = Number(pageNumber) || 1;

  return (
    <>
      <div className="card h-100" style={{ width: '18rem' }}>
        <img
          src={thumb}
          className="card-img-top"
          alt={`Thumbnail of ${title}`}
          loading="lazy"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            <span className="text-body-secondary text-decoration-line-through">
              {normalPrice}
            </span>{' '}
            <span className="fw-bold fs-5">{salePrice}</span>
          </p>
          <Link
            to={`/page/${currentPage}/${dealId}`}
            className="btn btn-outline-primary"
          >
            See Details
          </Link>
        </div>
      </div>
    </>
  );
}

export default GameCard;
