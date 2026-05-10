import { Component } from 'react';

class ErrorCard extends Component {
  render() {
    return (
      <>
        <div className="card h-100" style={{ width: '18rem' }}>
          <img
            src="https://placehold.co/400x600/2f2d2d/ff3333?text=Error Loading\n the Game!"
            className="card-img-top"
            alt={`Error Placeholder Image`}
          />
          <div className="card-body">
            <h5 className="card-title">Error loading the game.</h5>
            <p className="card-text">
              <span className="fw-bold fs-5">Try again later</span>
            </p>
            <a
              href=""
              className="btn btn-danger disabled"
            >
              Error
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default ErrorCard;
