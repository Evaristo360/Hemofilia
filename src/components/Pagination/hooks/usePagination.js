import { useEffect, useState } from 'react';

export const usePagination = ({
  initialPage = 1,
  initialRowsPerPage = 9,
  scrollToTopAfterChangingPage
}) => {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  useEffect(() => {
    scrollToTopAfterChangingPage &&
      document.body.scrollIntoView({ behavior: 'smooth', top: 0 });
  }, [page, rowsPerPage]);

  const onPageChange = (_, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  return {
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange
  };
};
