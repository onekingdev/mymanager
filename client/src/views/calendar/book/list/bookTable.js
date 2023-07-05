// ** React Imports
import { useState, useEffect, useMemo } from 'react';

// ** Table Columns
import useBooksColumns from './useColumns';

// ** Third Party Components
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Label,
  Input
} from 'reactstrap';

// ** Store & Actions
import { getData, deleteBook } from '../store';
import { useDispatch, useSelector } from 'react-redux';

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss';
import useMessage from '../../../components/message/useMessage';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';

const CustomHeader = ({
  handleFilter,
  value,
  handlePerPage,
  rowsPerPage,
  handleMonthChange,
  handleDateChange,
  handleYearChange,
  selectedMonth,
  selectedDate,
  selectedYear
}) => {
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col md={4} className="d-flex align-items-center px-0 px-lg-1">
          <div className="d-flex align-items-center me-2">
            <label htmlFor="rows-per-page">Show</label>
            <Input
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              className="form-control ms-50 pe-3"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
          </div>
        </Col>
        <Col
          md={8}
          className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
        >
          <Row>
            <Col md={5}>
              <div className="d-flex align-items-center">
                <label htmlFor="search-invoice">Search</label>
                <Input
                  id="search-invoice"
                  // className="ms-50 me-2 w-100"
                  type="text"
                  value={value}
                  onChange={(e) => handleFilter(e.target.value)}
                  placeholder="Search Book"
                />
              </div>
            </Col>
            <Col md={3}>
              <Input type="select" value={selectedMonth} onChange={handleMonthChange}>
                <option value="">All Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </Input>
            </Col>
            <Col md={2}>
              <Input type="select" value={selectedDate} onChange={handleDateChange}>
                <option value="">All Date</option>
                {[...Array(31)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </Input>
            </Col>
            <Col md={2}>
              <Input type="select" value={selectedYear} onChange={handleYearChange}>
                <option value="">All Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
const BookingTab = ({}) => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.book);

  const { isSuccess: deleteIsSuccess, isLoading: isDeleteLoading } = useSelector(
    (state) => state?.clientContact?.fleUplaodDelete
  );

  const { success, error } = useMessage();

  // ** States
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusValue, setStatusValue] = useState('');
  const [sort, setSort] = useState('desc');
  const [sortColumn, setSortColumn] = useState('id');

  const dataToRender = () => {
    return store.books;
  };

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const filteredItems = store.books.filter((item) => {
    const itemDate = moment(item.date);
    const monthMatches = !selectedMonth || itemDate.month() + 1 === parseInt(selectedMonth);
    const dateMatches = !selectedDate || itemDate.date() === parseInt(selectedDate);
    const yearMatches = !selectedYear || itemDate.year() === parseInt(selectedYear);
    return monthMatches && dateMatches && yearMatches;
  });

  const handleFilter = (val) => {
    setSearchTerm(val);
    dispatch(
      getData({
        q: val,
        page: currentPage,
        sort: sort,
        status: statusValue,
        perPage: rowsPerPage,
        sortColumn: sortColumn.sortField
      })
    );
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        q: searchTerm,
        page: currentPage,
        status: statusValue,
        sort: sortDirection,
        perPage: rowsPerPage,
        sortColumn: column.sortField
      })
    );
  };

  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    dispatch(
      getData({
        q: searchTerm,
        page: currentPage,
        sort: sort,
        status: statusValue,
        perPage: parseInt(e.target.value),
        sortColumn: sortColumn.sortField
      })
    );
  };

  useEffect(() => {
    dispatch(
      getData({
        q: searchTerm,
        page: currentPage,
        sort: sort,
        status: statusValue,
        perPage: rowsPerPage,
        sortColumn: sortColumn.sortField
      })
    );
  }, [dispatch]);
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
    dispatch(
      getData({
        q: searchTerm,
        page: page.selected + 1,
        sort: sort,
        status: statusValue,
        perPage: parseInt(e.target.value),
        sortColumn: sortColumn.sortField
      })
    );
  };

  const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage).toFixed(0));

    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        pageCount={count || 1}
        activeClassName="active"
        breakClassName="page-item"
        pageClassName={'page-item'}
        breakLinkClassName="page-link"
        nextLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousLinkClassName={'page-link'}
        previousClassName={'page-item prev'}
        onPageChange={(page) => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    );
  };

  // Delete
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleBookDelete = () => {
    Swal.fire({
      title: 'Delete?',
      text: `Are you sure you want to delete this booking data?`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBook(deleteId));
        success('Book Deleted Successfully');
      }
    });

  };

  // ** book Delete Success
  useMemo(() => {
    if (deleteIsSuccess) {
      // show Success Mesage
      success('Book Deleted Successfully');

      // hide modal
      setDeleteModal(false);
    }
  }, [deleteIsSuccess]);

  const { bookColumns } = useBooksColumns({ setDeleteModal, setDeleteId, handleBookDelete });

  return (
    <div className="book-list-wrapper">
      <div className="book-list-dataTable react-dataTable" style={{ height: '73.5' }}>
        <DataTable
          noHeader
          subHeader
          sortServer
          pagination
          responsive
          paginationServer
          columns={bookColumns}
          onSort={handleSort}
          data={filteredItems}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationDefaultPage={currentPage}
          paginationComponent={CustomPagination}
          subHeaderComponent={
            <CustomHeader
              value={searchTerm}
              rowsPerPage={rowsPerPage}
              handleFilter={handleFilter}
              handlePerPage={handlePerPage}
              handleMonthChange={handleMonthChange}
              handleDateChange={handleDateChange}
              handleYearChange={handleYearChange}
              selectedMonth={selectedMonth}
              selectedDate={selectedDate}
              selectedYear={selectedYear}
            />
          }
        />
      </div>

      <Modal
        isOpen={deleteModal}
        toggle={() => setDeleteModal((p) => !p)}
        className="modal-dialog-centered"
        // onClosed={onModalClosed}
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setDeleteModal((p) => !p)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <h3 className="text-center mb-1">Are you sure to Delete ?</h3>

          <Row>
            <Col className="text-center mt-1" xs={12}>
              <Button className="mt-1 me-1" color="secondary" outline>
                Cancel
              </Button>
              <Button
                onClick={handleBookDelete}
                className="mt-1 "
                color="primary"
                disabled={isDeleteLoading}
              >
                {isDeleteLoading ? 'Deleting...' : 'confirm'}
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default BookingTab;
const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];
