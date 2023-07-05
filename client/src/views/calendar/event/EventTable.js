import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import DataTable from 'react-data-table-component';
import { ChevronDown, File, Plus, Share } from 'react-feather';
import { AiOutlineDelete } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import useColumns from './useColumns';

const CustomHeader = () => {
  // ** State
  const [searchTerm, setSearchTerm] = useState('');

  /** Handlers */
  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
  };

  // temp value store
  const [tempValue, setTempValue] = useState('');
  let typingTimer; //timer identifier
  let doneTypingInterval = 500; //time in ms (500 ms)
  function doneTyping(val) {
    handleFilter(val);
  }

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col
          xl="12"
          className="d-flex align-items-sm-center justify-content-xl-start justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              Search:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              // value={tempValue}
              onChange={(e) => {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => doneTyping(e.target.value), doneTypingInterval);
              }}
            />
          </div>
          <div className="d-flex text-center">
            <div>
              <Button
                className="btn-icon me-1"
                outline
                color="primary"
                // onClick={() => toggle ((p) => !p)}
              >
                <AiOutlineDelete size={16} />
              </Button>
            </div>
          </div>
          <div className="d-flex align-items-center table-header-actions">
            <UncontrolledDropdown className="me-1">
              <DropdownToggle color="secondary" caret outline>
                <Share className="font-small-4 me-50" />
                <span className="align-middle">Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="w-100">
                  <File className="font-small-4 me-50" />
                  <span className="align-middle">CSV</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <File className="font-small-4 me-50" />
                  <span className="align-middle">PDF</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Link to="/add-event">
              <Button style={{ fontSize: '12px' }} className="add-new-user" color="primary">
                <Plus size={16} />
                Add New Event
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const EventTable = () => {
  // ** Store vars
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);

  // ** States
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { columns } = useColumns();

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  // ** Function in get data on page change
  const handlePagination = async (page) => {
    setCurrentPage(page.selected + 1);
  };

  // ** Table data to render
  const dataToRender = () => {
    return events || [];
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(events?.length / rowsPerPage);
    return (
      <>
        <Row>
          <Col md="11" className="my-auto">
            <div className="d-flex align-items-center justify-content-end">
              {/* <label htmlFor="rows-per-page">Show</label> */}
              <Input
                className="mx-50"
                type="select"
                id="rows-per-page"
                value={rowsPerPage}
                onChange={handlePerPage}
                style={{ width: '5rem' }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Input>
              <label htmlFor="rows-per-page">Per Page</label>
            </div>
          </Col>
          <Col md="1">
            <ReactPaginate
              previousLabel={''}
              nextLabel={''}
              pageCount={count || 1}
              activeClassName="active"
              forcePage={currentPage !== 0 ? currentPage - 1 : 0}
              onPageChange={(page) => handlePagination(page)}
              pageClassName={'page-item'}
              nextLinkClassName={'page-link'}
              nextClassName={'page-item next'}
              previousClassName={'page-item prev'}
              previousLinkClassName={'page-link'}
              pageLinkClassName={'page-link'}
              containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
            />
          </Col>
        </Row>
      </>
    );
  };

  return (
    <Card className="overflow-hidden mb-0">
     <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
        <DataTable
          noHeader
          subHeader
          sortServer
          pagination
          responsive
          paginationServer
          columns={columns}
          // onSort={handleSort}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={dataToRender()}
          subHeaderComponent={<CustomHeader />}
          // onSelectedRowsChange={handleRowSelected}
          selectableRows
        />
      </div>
    </Card>
  );
};

export default EventTable;
