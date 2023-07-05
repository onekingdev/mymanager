// ** React Imports
import { Fragment, useState, useEffect, useMemo, useCallback } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiBorderRadius, BiUser } from 'react-icons/bi';
import { BiCalendarEvent } from 'react-icons/bi';
import { BsPrinter } from 'react-icons/bs';
import { MdAddIcCall } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { AiFillCaretDown } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';

// ** import from react-feather
import { MoreVertical, Trash2 } from 'react-feather';

// ** Table Columns
import useColumns from './useColumn';

// ** Store & Actions
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

// ** Third Party Components
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { ChevronDown, Share, FileText, File, Upload, TrendingUp, Download } from 'react-feather';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  FormGroup,
  FormText
} from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { Link } from 'react-router-dom';

const UsersList = (props) => {
  const { eventData } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  // ** Store Vars
  const dispatch = useDispatch();

  // table columns
  const { eventColumn } = useColumns({ eventData });

  // ** States
  const [sort, setSort] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  // Contact import modal
  const [contactImportModal, setContactImportModal] = useState(false);
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [showdelete, setShowdelete] = useState(false);

  // ** Function in get data on page change
  const handlePagination = async (page) => {
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change

  const handleFilter = (val) => {
    setSearchTerm(val);
  };

  // ** Custom Pagination
  const CustomPagination = ({eventData}) => {
    const count = Math.ceil(eventData?.length / rowsPerPage);
    return (
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
    );
  };
  // ** Table data to render
  const dataToRender = () => eventData;
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  // ** Table Header
  const CustomHeader = ({
    toggleSidebar,
    handlePerPage,
    showdelete,
    rowsPerPage,
    handleFilter,
    setContactImportModal
  }) => {
    // Hover on CSV

    const [isHover, setIsHover] = useState(false);
    const [openAddProgression, setOpenAddProgression] = useState(false);
    const handleMouseEnter = () => {
      setIsHover(true);
    };
    const handleMouseLeave = () => {
      setIsHover(false);
    };

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
            className="d-flex justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
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
              {showdelete ? (
                <div>
                  <Button
                    className="btn-icon me-1"
                    outline
                    color="primary"
                    onClick={() => toggle((p) => !p)}
                  >
                    <AiOutlineDelete size={16} />
                  </Button>
                </div>
              ) : (
                ''
              )}
            </div>

            <div className="d-flex align-items-center table-header-actions">
              <UncontrolledDropdown className="me-1">
                <DropdownToggle color="secondary" caret outline>
                  <Share className="font-small-4 me-50" />
                  <span className="align-middle">Export</span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className="w-100"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {}}
                  >
                    <FileText className="font-small-4 me-50" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Link to="/add-event">
                <Button
                  style={{ fontSize: '12px' }}
                  className="add-new-user"
                  color="primary"
                  onClick={toggleSidebar}
                >
                  Add New Event
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <Fragment>
      <Card className="overflow-hidden">
      <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={eventColumn}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                setContactImportModal={setContactImportModal}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
                showdelete={showdelete}
              />
            }
            selectableRows
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default UsersList;
