/* eslint-disable no-unused-vars */
import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** User List Component

// ** Reactstrap Imports
import { Row, Col, CardHeader, InputGroup } from 'reactstrap';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import {
  User,
  UserPlus,
  UserCheck,
  UserX,
  Send,
  Info,
  CheckCircle,
  PieChart,
  Save,
  Eye,
  Trash
} from 'react-feather';

// ** Styles
import { useSelector } from 'react-redux';
import InvoiceSidebar from './InvoiceSidebar';
import { useState } from 'react';

import ReactPaginate from 'react-paginate';
import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';
import { Input, Card, CardTitle } from 'reactstrap';
import { getData } from '../store';
import { useDispatch } from 'react-redux';
import '@styles/react/apps/app-invoice.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import {
  fetchinvoicedata,
  sendInvoiceEmail,
  useDeleteInvoice
} from '../../../../requests/invoice/invoice';
import '@styles/react/apps/app-email.scss';
import { getInvoiceListAction } from '../store/action';
import { setInvoiceListReducer } from '../store/reducer';
import moment from 'moment';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Avatar from '@components/avatar';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap';
import { toast } from 'react-toastify';

const invoiceStatusObj = {
  SENT: { color: 'light-secondary', icon: Send },
  PAID: { color: 'light-success', icon: CheckCircle },
  DRAFT: { color: 'light-primary', icon: Save },
  DUE: { color: 'light-danger', icon: Info },
  'PARTIAL PAYMENT': { color: 'light-warning', icon: PieChart }
};

const InvoiceList = () => {
  const { mutate } = useDeleteInvoice();
  // ** Store vars
  const dispatch = useDispatch();
  //const store = useSelector((state) => state.invoice);
  const { data } = fetchinvoicedata();
  // ** States
  const [value, setValue] = useState('');
  const [sort, setSort] = useState('desc');
  const [sortColumn, setSortColumn] = useState('id');
  const [currentPage, setCurrentPage] = useState(0);
  const [statusValue, setStatusValue] = useState('Pending');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [invoices, setInvoices] = useState([]);
  const store = useSelector((state) => state.userInvoice);

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(setInvoiceListReducer(data));

      const offset = 0;
      const currentPageData = data.slice(offset, offset + rowsPerPage);
      setInvoices(currentPageData);
      setCurrentPage(0);
    }
  }, [data, rowsPerPage]);

  const handleFilter = (val) => {
    setValue(val);
    setInvoices(
      store?.invoiceList?.filter(
        (x) =>
          x.customerId?.fullName.toLowerCase().includes(val.toLowerCase()) || x.no.includes(val)
      )
    );
  };

  const handlePagination = (selectedPage) => {
    const offset = selectedPage * rowsPerPage;
    const currentPageData = store.invoiceList.slice(offset, offset + rowsPerPage);
    setInvoices(currentPageData);
    setCurrentPage(selectedPage);
  };

  const handlePerPage = (e) => {
    const perPage = parseInt(e.target.value);
    setRowsPerPage(perPage);
    setCurrentPage(0);

    const currentPageData = store.invoiceList.slice(0, perPage);
    setInvoices(currentPageData);
  };

  const CustomPagination = () => {
    const pageCount = Math.ceil(store.invoiceList.length / rowsPerPage);

    return (
      <div className="d-flex justify-content-end">
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
          <label htmlFor="rows-per-page" style={{ marginRight: '1rem' }}>
            Per Page
          </label>
        </div>
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(selectedPage) => handlePagination(selectedPage.selected)}
          containerClassName={'pagination react-paginate justify-content-end p-1'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item prev'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item next'}
          nextLinkClassName={'page-link'}
          forcePage={currentPage}
        />
      </div>
    );
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        q: value,
        page: currentPage,
        sort: sortDirection,
        status: statusValue,
        perPage: rowsPerPage,
        sortColumn: column.sortField
      })
    );
  };
  const renderClient = (row) => {
    const stateNum = Math.floor(Math.random() * 6),
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];

    if (row?.avatar?.length) {
      return <Avatar className="me-50" img={row?.avatar} width="32" height="32" />;
    } else {
      return (
        <Avatar
          color={color}
          className="me-50"
          content={row?.client ? row.client.name : 'John Doe'}
          initials
        />
      );
    }
  };

  const MySwal = withReactContent(Swal);

  const handleRemove = async (id) => {
    const res = await MySwal.fire({
      title: 'Delete?',
      text: 'Are you sure to delete the invoice?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (res.value) {
      //delete
      mutate(id);
    }
  };

  const handleSendMail = (row) => {
    let payload = {
      title: '',
      message: '',
      invoiceId: row?._id,
      recipient: row?.customerId?.email
    };
    sendInvoiceEmail(payload).then((x) => {
      toast.success('Email sent successfully');
    });
  };

  const columns = [
    {
      name: 'No.',
      sortable: true,
      sortField: 'no',
      //width: '80px',
      width: '8%',
      cell: (row) => (
        <Link
          to={{
            pathname: `/invoice/preview/${row._id}`,
            state: {
              ...row
            }
          }}
        >{`#${row.no}`}</Link>
      )
    },
    {
      name: 'Client',
      sortable: true,
      width: '20%',
      sortField: 'client.name',
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            {renderClient(row)}
            <div className="d-flex flex-column">
              <h6 className="user-name text-truncate mb-0">{name}</h6>
              <Link
                to={{
                  pathname: `/invoice/preview/${row._id}`,
                  state: {
                    ...row
                  }
                }}
              >
                <small className="text-truncate mb-0">{row?.customerId?.fullName}</small>
              </Link>
            </div>
          </div>
        );
      }
    },
    {
      name: 'Total',
      sortable: true,
      // minWidth: '100px',
      width: '10%',
      sortField: 'totalAmount',
      cell: (row) => <span>${row?.totalAmount + (row?.tax || 0) - (row?.discount || 0) || 0}</span>
    },
    {
      name: 'Paid',
      sortable: true,
      // minWidth: '100px',
      width: '10%',
      sortField: 'paidAmount',
      cell: (row) => <span>${row?.paidAmount}</span>
    },
    {
      name: 'Remain',
      sortable: true,
      // minWidth: '100px',
      //sortField: 'paidAmount',
      width: '10%',
      cell: (row) => (
        <span>
          ${row?.totalAmount + (row?.tax || 0) - (row?.discount || 0) - (row?.paidAmount || 0)}
        </span>
      )
    },
    {
      sortable: true,
      // minWidth: '100px',
      name: 'Status',
      sortField: 'status',
      width: '15%',
      cell: (row) => (
        <div>
          <Badge color={invoiceStatusObj[row?.status]?.color}>{row?.status}</Badge>
        </div>
      )
    },
    // {
    //   name: 'Issue Date',
    //   sortable: true,
    //   // minWidth: '100px',
    //   sortField: 'date',
    //   width:"10%",
    //   cell: (row) => <span>{moment(row.date).format('MM/DD/YYYY')}</span>
    // },

    {
      sortable: true,
      name: 'Due',
      // minWidth: '100px',
      sortField: 'dueDate',
      width: '12%',
      cell: (row) => <span>{moment(row.dueDate).format('MM/DD/YYYY')}</span>
    },
    {
      name: 'Action',
      // minWidth: '100px',
      width: '10%',
      cell: (row) => (
        <div className="column-action d-flex align-items-center">
          <Send
            className="cursor-pointer"
            size={17}
            id={`send-tooltip-${row._id}`}
            onClick={() => handleSendMail(row)}
          />
          <UncontrolledTooltip placement="top" target={`send-tooltip-${row._id}`}>
            Send Mail
          </UncontrolledTooltip>
          <Link to={`/invoice-preview/${row._id}`} target="_blank" id={`pw-tooltip-${row._id}`}>
            <Eye size={17} className="mx-1" />
          </Link>
          <UncontrolledTooltip placement="top" target={`pw-tooltip-${row._id}`}>
            Preview Invoice
          </UncontrolledTooltip>
          <Trash
            className="cursor-pointer text-danger"
            size={17}
            id={`remove-tooltip-${row._id}`}
            onClick={() => handleRemove(row._id)}
          />
          <UncontrolledTooltip placement="top" target={`remove-tooltip-${row._id}`}>
            Remove
          </UncontrolledTooltip>
        </div>
      )
    }
  ];
  return (
    <Fragment>
      <div className="app-user-list w-100">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="Total Invoices"
              icon={<User size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{data?.length}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="Partially Paid"
              icon={<UserPlus size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {' '}
                  {data?.filter((x) => x.status === 'PARTIAL PAYMENT').length}
                </h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Paid"
              icon={<UserCheck size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {' '}
                  {data?.filter((x) => x.status === 'PAID').length}
                </h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="Past Due"
              icon={<UserX size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {' '}
                  {data?.filter((x) => x.status === 'DUE').length}
                </h3>
              }
            />
          </Col>
        </Row>
      </div>
      <div className="overflow-hidden email-application">
        <div className="content-overlay"></div>
        <div className="content-area-wrapper animate__animated animate__fadeIn bg-white">
          <div>
            <InvoiceSidebar invoices={invoices} setInvoices={setInvoices} store={store} />
          </div>
          <div className="content-right ">
            <Card className="content-body">
              <CardHeader>
                <div className="w-100">
                  <div className="d-flex justify-content-between w-100">
                    <div className="d-flex ">
                      <CardTitle className="h2 ">Invoice</CardTitle>
                    </div>
                    <div className="d-flex align-items-center ">
                      <label htmlFor="search-invoice">Search</label>
                      <Input
                        id="search-invoice"
                        className="ms-50 me-2 w-100"
                        type="text"
                        value={value}
                        onChange={(e) => handleFilter(e.target.value)}
                        placeholder="Search Invoice"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <div className="ms-1">
                <div className="react-dataTable" style={{ height: 'auto', maxHeight: '100%' }}>
                  <DataTable
                    noHeader
                    sortServer
                    paginationServer
                    subHeader={false}
                    columns={columns}
                    responsive={true}
                    onSort={handleSort}
                    data={invoices}
                    sortIcon={<ChevronDown />}
                    className="react-dataTable"
                    defaultSortField="invoiceId"
                    paginationDefaultPage={currentPage}
                    paginationComponent={CustomPagination}
                    pagination
                    paginationPerPage={rowsPerPage}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InvoiceList;
