import { THUMB_HEIGHT, THUMB_WIDTH } from '@/constant';
import Image from 'next/image';

function SkeletonCard() {
  return (
    <div className="card h-100" style={{ width: '18rem' }}>
      <Image
        height={THUMB_HEIGHT}
        width={THUMB_WIDTH}
        src={`https://placehold.co/${THUMB_WIDTH}x${THUMB_HEIGHT}/png?text=Loading...`}
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
