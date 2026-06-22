import { THUMB_HEIGHT, THUMB_WIDTH } from '@/constant';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

function ErrorCard() {
  const t = useTranslations('ErrorCard');

  return (
    <>
      <div className="card h-100" style={{ width: '18rem' }}>
        <Image
          height={THUMB_HEIGHT}
          width={THUMB_WIDTH}
          src={`https://placehold.co/${THUMB_WIDTH}x${THUMB_HEIGHT}/png/2f2d2d/ff3333?text=${t('imageText')}`}
          className="card-img-top"
          alt={`Error Placeholder Image`}
        />
        <div className="card-body">
          <h5 className="card-title">Error loading the game.</h5>
          <p className="card-text">
            <span className="fw-bold fs-5">Try again later</span>
          </p>
          <a href="" className="btn btn-danger disabled">
            Error
          </a>
        </div>
      </div>
    </>
  );
}

export default ErrorCard;
