'use client';

import { useState } from 'react';

function ErrorButton() {
  const [error, setError] = useState(false);

  if (error) throw new Error('Manual error!');
  const handleClick = () => {
    setError(true);
  };
  return (
    <>
      <button className="btn btn-outline-danger" onClick={handleClick}>
        {' '}
        Throw Error{' '}
      </button>
    </>
  );
}

export default ErrorButton;
