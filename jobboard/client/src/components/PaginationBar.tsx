interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (currentPage: number) => void;
}

function PaginationBar({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationBarProps) {
  const pages = getVisiblePages(currentPage, totalPages);
  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <button
        onClick={() => {
          onPageChange(Math.max(1, currentPage - 1));
        }}
        className="pagination-previous"
        aria-label="Previous Page"
      >
        &#x25C0;
      </button>
      <button
        onClick={() => {
          onPageChange(Math.min(totalPages, currentPage + 1));
        }}
        className="pagination-next"
        aria-label="Next Page"
      >
        &#x25B6;
      </button>
      <ul className="pagination-list">
        {pages.map((page) => (
          <li key={page}>
            <PageButton
              page={page}
              currentPage={currentPage}
              onClick={
                typeof page === 'number' ? () => onPageChange(page) : () => {}
              }
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface PageButtonProps {
  page: number | string;
  currentPage: number;
  onClick: () => void;
}
function PageButton({ page, currentPage, onClick }: PageButtonProps) {
  if (currentPage === page) {
    return (
      <button
        className="pagination-link is-current"
        aria-label={`Page ${page}`}
        aria-current="page"
      >
        {page}
      </button>
    );
  }
  if (page === '<' || page === '>') {
    return <span className="pagination-ellipsis">&hellip;</span>;
  }
  return (
    <button
      onClick={onClick}
      className="pagination-link"
      aria-label={`Go to Page ${page}`}
    >
      {page}
    </button>
  );
}

function getVisiblePages(current: number, total: number) {
  if (total <= 7) {
    return range(total);
  }
  if (current < 5) {
    return [...range(5), '>', total];
  }
  if (current > total - 4) {
    return [1, '<', ...range(5, total - 4)];
  }
  return [1, '<', current - 1, current, current + 1, '>', total];
}

function range(count: number, start: number = 1) {
  return Array.from({ length: count }, (_, i) => i + start);
}

export default PaginationBar;
