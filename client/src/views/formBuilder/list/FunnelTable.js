import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Edit, Lock, MoreVertical, Trash, ChevronRight } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useHistory } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs';
import {
  Badge,
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Input,
  UncontrolledDropdown
} from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { convertDate } from '../../goals/helpers/converters';
import { deleteFormAction } from '../store/action';
import '../../../assets/scss/style.css';
import ReactPaginate from 'react-paginate';
import { getUserData } from '../../../auth/utils';

const label = {
  clients: 'light-primary',
  employees: 'light-danger',
  leads: 'light-warning',
  relationships: 'light-success',
  vendors: 'light-muted',
  members: 'light-muted'
};
export default function FunnelTable({ tableData, active, dispatch, collapse, handleCategoryCollapse }) {

  // ** STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };
  const handlePagination = async (page) => {
    setCurrentPage(page.selected + 1);
  };

  const history = useHistory();
  const user = getUserData();

  // ** FUNCTIONS
  const handleSetData = (e) => {};

  const handleDetails = (row) => {
    history.push('/form-funnel/form-setting/' + row._id);
  };

  const CustomPagination = () => {
    const count = Math.ceil(tableData / rowsPerPage);
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
          <Col md="1" className="formBuilder-pagination">
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

  const MySwal = withReactContent(Swal);
  const handleRemove = async (row) => {
    const res = await MySwal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete this form?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (res.value) {
      //delete form
      dispatch(deleteFormAction(row._id));
    }
  };

  const columns = [
    {
      name: 'Name',
      sortable: 'true',
      selector: (row) => row.name,
      cell: (row) => <span onClick={() => handleDetails(row)}>{row.name}</span>
    },
    {
      name: 'Type',
      sortable: 'true',
      selector: (row) => row.formType,
      cell: (row) => <span onClick={() => handleDetails(row)}>{row.formType}</span>
    },
    {
      name: 'Last Updated',
      sortable: 'true',
      selector: (row) => row.updatedAt,
      cell: (row) => <span onClick={() => handleDetails(row)}>{convertDate(row.updatedAt)}</span>
    },
    {
      name: 'Smartlist',
      selector: (row) => (
        <span>
          {row.smartlist && row.smartlist !== '' && `${row.smartList} > ${row.subCategory}`}
        </span>
      )
    },
    {
      name: 'Automated',
      selector: (row) => row.automateEntry,
      cell: (row) =>
        row.automateEntry ? (
          <Badge color="light-primary">Yes</Badge>
        ) : (
          <Badge color="light-secondary">No</Badge>
        )
    },
    {
      name: 'Contact Type',
      selector: (row) => row.memberType,
      cell: (row) => <Badge color={label[row.memberType]}>{row.memberType}</Badge>
    },

    {
      name: 'Action',
      selector: (row) => row._id,
      cell: (row) => (
        <>
        {row.userId === user.id ? (<div className="column-action">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <MoreVertical size={14} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag="span" className="w-100" onClick={() => handleDetails(row)}>
                  <Edit size={14} className="me-50" />
                  <span className="align-middle">Edit</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100" onClick={() => handleRemove(row)}>
                  <Trash size={14} className="me-50" />
                  <span className="align-middle">Remove</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>):<Lock className='text-muted' size={14}/>}
          
        </>
      )
    }
  ];
  return (
    <div className="formBuilder-table flex-1 d-flex flex-row">
      {collapse && active === '2' && (
        <div className="btn-collapse-wrapper">
          <Button
            className="btn-icon btn btn-flat-dark btn-sm btn-toggle-sidebar m-1"
            color="flat-dark"
            onClick={handleCategoryCollapse}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      )}
      <div className='flex-1'>
        {tableData && tableData?.length ? (
          <DataTable
            header
            sortServer
            pagination
            responsive
            paginationServer
            selectableRows
            className="react-dataTable"
            data={ tableData }
            style={{ cursor: 'pointer' }}
            sortIcon={<ChevronDown size={14} />}
            columns={columns}
            onRowClicked={handleDetails}
            pointerOnHover="cursor"
            paginationComponent={CustomPagination}
          />
        ) : (
          <div className="no-results show mx-auto">
            <h5>No Items Found</h5>
          </div>
        )}
      </div>
    </div>
  );
}
