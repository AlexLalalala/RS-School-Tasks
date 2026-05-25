import useDealStore from '../stores/useDealStore';

const Flyout = () => {
  const selectedCount = useDealStore((state) => state.selectedDeals.length);
  const unselectAll = useDealStore((state) => state.unselectAll);

  if (!selectedCount) return <> </>;

  return (
    <div
      className="card position-fixed shadow bottom-0 end-0 m-3"
      style={{ width: '18rem', backdropFilter: 'blur(8px)' }}
    >
      <div className="card-header bg-dark text-white fw-semibold">
        🛒 Selection
      </div>
      <div className="card-body">
        <div className="d-flex align-items-center gap-1 ">
          <span className="badge bg-primary rounded-pill fs-5">
            {selectedCount}
          </span>
          <button
            className="btn btn-outline-warning flex-grow-1"
            onClick={unselectAll}
          >
            Unselect <i className="bi bi-check2-square"></i>
          </button>
          <button className="btn btn-outline-secondary">
            <i className="bi bi-download"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flyout;
