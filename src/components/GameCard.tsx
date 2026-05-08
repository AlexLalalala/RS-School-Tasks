import { Component } from 'react';
import { buildMetacriticURL } from '../utils';

interface GameCardProps {
  title: string;
  normalPrice: number;
  salePrice: number;
  thumb: string;
  metacriticLink: string;
}

class GameCard extends Component<GameCardProps, object> {
  render() {
    return (
      <>
        <div className="card h-100" style={{ width: '18rem' }}>
          <img
            src={this.props.thumb}
            className="card-img-top"
            alt={`Thumbnail of ${this.props.title}`}
          />
          <div className="card-body">
            <h5 className="card-title">{this.props.title}</h5>
            <p className="card-text">
              <span className="text-body-secondary text-decoration-line-through">
                {this.props.normalPrice}
              </span>{' '}
              <span className="fw-bold fs-5">{this.props.salePrice}</span>
            </p>
            <a
              href={buildMetacriticURL(this.props.metacriticLink)}
              className="btn btn-primary"
            >
              See Reviews
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default GameCard;
