import { Link } from 'react-router';
import { PAGINATOR_SPREAD } from '../constant';

interface PaginatorProps {
  currentPage: number;
  lastPageNumber: number;
  basePath: string;
}

const navLinkClass = (currentPage: number, n: number) =>
  `page-item ${currentPage === n ? 'active' : ''}`;

function Paginator({ currentPage, lastPageNumber, basePath }: PaginatorProps) {
  const urlFactory = (n: number) => {
    return `${basePath}/page/${n}`;
  };
  function pageNumberArray(currentPage: number, spread: number): number[] {
    if (spread < 1) {
      throw new Error('Spread needs to be more than 0');
    }
    const [st_n, end_n] = [
      Math.max(currentPage - spread, 1),
      Math.min(currentPage + spread, lastPageNumber),
    ];
    return Array.from({ length: end_n - st_n + 1 }, (_, i) => st_n + i);
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <Link className="page-link" to={urlFactory(1)} aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>
        {pageNumberArray(currentPage, PAGINATOR_SPREAD).map((n) => (
          <li className={navLinkClass(currentPage, n)} key={n}>
            <Link className="page-link" to={urlFactory(n)}>
              {n}
            </Link>
          </li>
        ))}
        <li className="page-item">
          <Link
            className="page-link"
            to={urlFactory(lastPageNumber)}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Paginator;
