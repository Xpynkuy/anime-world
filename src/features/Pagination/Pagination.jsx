import {React} from "react";

import { usePagination } from "../../app/providers/PaginationProvider";
import styles from "../Pagination/Pagination.module.scss";


const Pagination = ({ totalPage }) => {
  const { currentPage, setCurrentPage } = usePagination();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPages = () => {
    const pages = [];

    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= 4) {
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPage - 3) {
        for (let i = totalPage - 4; i <= totalPage - 1; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
      }

      pages.push(totalPage);
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button onClick={() => handlePageChange(currentPage - 1)}>Назад</button>
      )}
      {getPages().map((page) => (
        <button
          key={page}
          disabled={page === currentPage}
          onClick={() => handlePageChange(page)}
          className={page === currentPage ? styles.active : ""}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPage && (
        <button onClick={() => handlePageChange(currentPage + 1)}>Вперед</button>
      )}
    </div>
  );
};

export default Pagination;