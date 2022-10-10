import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);

  return (
    <nav className="pagination__navbar">
      <ul className="pagination__list">
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === currentPage
                ? "pagination__item pagination--active"
                : "pagination__item"
            }
          >
            <a
              className={
                page === currentPage
                  ? "pagination__anchor anchor--active"
                  : "pagination__anchor"
              }
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
