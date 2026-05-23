const ErrorPage = () => {
  return (
    <>
      <h1 className="alert">Critical Error</h1>
      <div>
        <a href="/" className="btn btn-outline-danger">
          Reload
        </a>
      </div>
    </>
  );
};

export default ErrorPage;
