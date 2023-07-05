// ** React Imports
import { Fragment, useState, forwardRef } from 'react';

// ** Table Data & Columns

// ** Third Party Components
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { ChevronDown, Plus } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import {
  setEditAutomation,
  setNewAutomation,
  changeStatusAction,
  getAllAutomations,
  deleteAutomationAction
} from './store/actions';
import { Check, X, MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather';
// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardTitle,
  CardHeader
} from 'reactstrap';
import Swal from 'sweetalert2';
// ** Reactstrap Imports

// ** Bootstrap Checkbox Component
// const BootstrapCheckbox = forwardRef((props, ref) => (
//   <div className="form-check">
//     <Input type="checkbox" ref={ref} {...props} />
//   </div>
// ));
const CustomLabel = ({ htmlFor }) => {
  return (
    <Label className="form-check-label">
      <span className="switch-icon-left">
        <Check size={14} />
      </span>
      <span className="switch-icon-right">
        <X size={14} />
      </span>
    </Label>
  );
};
const Table = (props) => {
  // ** States

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    const status = {
      1: { title: 'Done', color: 'light-primary' },
      2: { title: 'Todo', color: 'light-success' },
      3: { title: 'Start', color: 'light-danger' }
    };

    if (value.length) {
      updatedData = props.allData.filter((item) => {
        const startsWith = item.automationName.toLowerCase().startsWith(value.toLowerCase());

        const includes = item.automationName.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  // ** Function to handle Pagination
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(
      (searchValue.length ? filteredData.length : props.allData.length) / rowsPerPage
    );

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
          pageCount={
            searchValue.length
              ? Math.ceil(filteredData.length / 7)
              : Math.ceil(props.allData.length / 7) || 1
          }
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
      </div>
    );
  };

  const dispatch = useDispatch();
  const onSetEditAutomatoin = async (id) => {
    await dispatch(setEditAutomation(id));
    props.showGraph();
  };

  const newAutomation = () => {
    dispatch(setNewAutomation());
    props.showGraph();
  };

  const changeStatus = (id) => {
    dispatch(changeStatusAction(id));
    // dispatch(getAllAutomations());
  };

  // const deleteAutomation = async (id) => {
  //   try {
  //     const automationId = id;
  //     await dispatch(deleteAutomationAction(automationId));

  //     // dispatch(getAllAutomations());
  //   } catch (error) {}
  // };

  const deleteAutomation = async (id) => {
    try {
      const automationId = id;

      Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete the automation.',
        // icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete anyway',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(deleteAutomationAction(automationId));
        }
      });
    } catch (error) {
      Swal.fire('Error!', 'An error occurred while deleting the automation.', 'error');
    }
  };

  const columns = [
    {
      name: 'NAME',
      sortable: true,
      minWidth: '20%',
      cell: (row) => {
        return (
          <div
            id={row._id}
            style={{ cursor: 'pointer', width: '100%', padding: 'auto' }}
            onClick={(e) => onSetEditAutomatoin(e.target.id)}
          >
            {row.automationName}
          </div>
        );
      }
    },
    {
      name: 'ACTIVATION',
      sortable: true,
      minWidth: '15%',
      cell: (row) => {
        return (
          <div
            id={row._id}
            style={{ cursor: 'pointer', width: '100%', padding: 'auto' }}
            onClick={(e) => onSetEditAutomatoin(e.target.id)}
          >
            {row.activationUpon?.uponType}
          </div>
        );
      }
    },

    {
      name: 'CONTACT INFO',
      minWidth: '10%',
      cell: (row) => {
        return (
          <div
            id={row._id}
            style={{ cursor: 'pointer', width: '100%', padding: 'auto' }}
            onClick={(e) => onSetEditAutomatoin(e.target.id)}
          >
            {row.contactInfo.contactType}
          </div>
        );
      }
      // selector: (row) => row.smartlist
    },
    {
      name: 'STATUS',
      sortable: true,
      minWidth: '15%',
      cell: (row) => {
        return (
          <div
            id={row._id}
            style={{ cursor: 'pointer', width: '100%', padding: 'auto' }}
            // onClick={(e) => onSetEditAutomatoin(e.target.id)}
          >
            {/* {row.status} */}
            <div className="form-switch form-check-danger">
              <Input
                type="switch"
                id={row._id}
                onChange={(e) => changeStatus(e.target.id)}
                defaultChecked={row.isActive}
                name="icon-danger"
              />
              <CustomLabel htmlFor={row._id} />
            </div>
          </div>
        );
      }
    },

    {
      name: 'ACTION',
      sortable: true,
      minWidth: '15%',
      cell: (row) => {
        return (
          <div
            id={row._id}
            style={{ cursor: 'pointer', padding: 'auto' }}
            // onClick={(e) => onSetEditAutomatoin(e.target.id)}
          >
            <span className="switch-icon-left">
              <Trash size={18} style={{ marginBottom: '4px' }} />
            </span>
            <span
              id={row._id}
              onClick={(e) => deleteAutomation(e.target.id)}
              className="switch-icon-right ms-1"
              style={{ fontSize: '16px', marginTop: '1px' }}
            >
              Delete
            </span>
          </div>
        );
      }
    }
  ];

  return (
    <Fragment>
      <Card className="mb-0" style={{ width: '100%', boxShadow: 'none' }}>
        <Row className="justify-content-end mx-0">
          <Col className="d-flex align-items-center justify-content-end mt-1" md="6" sm="12">
            <Label className="me-1" for="search-input">
              Search
            </Label>
            <Input
              className="dataTable-filter mb-50"
              type="text"
              bsSize="sm"
              id="search-input"
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div className="react-dataTable align-items-center react-dataTable-selectable-rows">
          <DataTable
            noHeader
            pagination
            selectableRows
            columns={columns}
            paginationPerPage={7}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
            // selectableRowsComponent={BootstrapCheckbox}
            data={searchValue.length ? filteredData : props.allData}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default Table;
