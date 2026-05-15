function SkeletonCard() {
  return (
    <div className="card h-100" style={{ width: '18rem' }}>
      <img
        src="https://placehold.co/400x600?text=Loading..."
        className="card-img-top"
        alt="Placeholder image"
      />
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <p className="card-text placeholder-glow mb-1">
          <span className="placeholder placeholder-glow col-4"></span>{' '}
          <span className="placeholder col-6 fs-5"></span>
        </p>
        <a
          className="btn btn-primary disabled placeholder col-6"
          aria-disabled="true"
        ></a>
      </div>
    </div>
  );
}

export default SkeletonCard;
