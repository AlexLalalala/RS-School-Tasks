import type { FunctionComponent } from 'react';
import { Link } from 'react-router';

const NotFoundPage: FunctionComponent = () => {
  return (
    <>
      <h4 className="mt-5">404. Not found</h4>
      <p className="mt-2">Page you looking for do not exist</p>
      <Link to="/" className="mt-2 btn btn-outline-warning">
        Return to Home Page
      </Link>
    </>
  );
};

export default NotFoundPage;
