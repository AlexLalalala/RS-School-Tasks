'use client';

import useDealStore from '../stores/useDealStore';
import { downloadCsv, generateCsv } from '../utils/csv';

const Flyout = () => {
  const selectedDeals = useDealStore((state) => state.selectedDeals);
  const selectedCount = useDealStore((state) => state.selectedDeals.length);
  const unselectAll = useDealStore((state) => state.unselectAll);

  if (!selectedCount) return <> </>;

  const handleDownloadClick = () => {
    const csv = generateCsv(selectedDeals);
    downloadCsv(csv, `${selectedCount}_deals.csv`);
  };

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
            aria-label="Unselect all"
          >
            Unselect <i className="bi bi-check2-square"></i>
          </button>
          <button
            className="btn btn-outline-secondary"
            aria-label="Download CSV"
            onClick={handleDownloadClick}
          >
            <i className="bi bi-download"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flyout;
