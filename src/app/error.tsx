'use client';

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest: string };
  reset: () => void;
}) => {
  return (
    <>
      <h1 className="alert">{error.name}</h1>
      <p>{error.message}</p>
      <div>
        <button onClick={reset} className="btn btn-outline-danger">
          Reload
        </button>
      </div>
    </>
  );
};

export default ErrorPage;
