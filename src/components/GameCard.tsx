import { buildMetacriticURL } from '../utils';

interface GameCardProps {
  title: string;
  normalPrice: number;
  salePrice: number;
  thumb: string;
  metacriticLink: string;
}

function GameCard({
  title,
  normalPrice,
  salePrice,
  thumb,
  metacriticLink,
}: GameCardProps) {
  return (
    <>
      <div className="card h-100" style={{ width: '18rem' }}>
        <img
          src={thumb}
          className="card-img-top"
          alt={`Thumbnail of ${title}`}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            <span className="text-body-secondary text-decoration-line-through">
              {normalPrice}
            </span>{' '}
            <span className="fw-bold fs-5">{salePrice}</span>
          </p>
          <a
            href={buildMetacriticURL(metacriticLink)}
            className="btn btn-primary"
          >
            See Reviews
          </a>
        </div>
      </div>
    </>
  );
}

export default GameCard;
