import ReactPaginate from "react-paginate";

const Pagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage,
  currentPage,
}) => {
  const count = Math.ceil(rowCount / rowsPerPage);

  return (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
      pageCount={count || 1}
      activeClassName="active"
      forcePage={currentPage !== 0 ? currentPage - 1 : 0}
      pageClassName={"page-item"}
      nextLinkClassName={"page-link"}
      nextClassName={"page-item next"}
      previousClassName={"page-item prev"}
      previousLinkClassName={"page-link"}
      pageLinkClassName={"page-link"}
      containerClassName={
        "pagination react-paginate justify-content-end my-2 pe-1"
      }
      onPageChange={(data) => onChangePage(data.selected + 1)}
    />
  );
};

export default Pagination;
