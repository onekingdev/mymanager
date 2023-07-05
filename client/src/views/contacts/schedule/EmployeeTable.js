// ** React Imports
import { Fragment, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Third Party Components
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import {
  ChevronDown,
  Share,
  // Printer,
  FileText,
  File,
  // Grid,
  // Copy,
  Upload
} from 'react-feather';
import { FaUserAlt } from 'react-icons/fa';

// ** Reactstrap Imports
import { Row, Col, Card } from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import useMessage from '../../../lib/useMessage';
// ** Table Columns
import useColumns from './useColumns';
import { contactImportAction } from './store/actions';
import { importProcessingReset } from './store/reducer';
import { getData } from './store';

import 'jspdf-autotable';
import { useGetEmployeePosition } from '../../../requests/contacts/employee-contacts';

const EmployeeList = (props) => {
  // ** Store Vars
  const { unassignedEmployeeArr, setUnassignedEmployeeArr } = props;
  const dispatch = useDispatch();
  const { success } = useMessage();

  // Delete Contact Modal
  const [deleteModal, setDeleteModal] = useState({
    id: '',
    show: false
  });

  const [tableData, setTableData] = useState([]);

  // ** States
  const [sort, setSort] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: '',
    label: 'Select Position'
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Outlet'
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: '',
    label: 'Select Status',
    number: 0
  });

  // Contact import modal
  const [contactImportModal, setContactImportModal] = useState(false);
  const [contactImportCsvFile, setContactImportCsvFile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [contactImportStep, setContactImportStep] = useState('first');
  const [roleOptions, setRoleOptions] = useState([
    { value: '', label: 'Select Position' },
    { value: 'owner', label: 'owner' }
  ]);

  const {
    contactUpload: { importing, uploadState }
  } = useSelector((state) => state.employeeContact);
  // ** Redux Store
  const store = useSelector((state) => state.users);
  const totalContacts = useSelector((state) => state.totalContacts.contactList.list);
  const contactTypes = useSelector((state) => state.totalContacts.contactTypeList);

  // table columns
  const {
    deleteEmployee: { success: deleteSuccess, loading: deleteLoading }
  } = useSelector((state) => state.employeeContact);
  // table columns
  const { columns } = useColumns({ setDeleteModal });

  // ** Effects & Memo
  useEffect(() => {
    const employeeType = contactTypes.find((x) => x?.name === 'Employee');
    totalContacts?.length > 0 &&
      setTableData(totalContacts.filter((x) => x.contactType.indexOf(employeeType._id) > -1));
  }, [totalContacts, contactTypes]);

  // contactUpload
  useMemo(() => {
    if (uploadState === 'success') {
      // Reset state
      dispatch(importProcessingReset());

      // fetch list with empy option

      // hide modal
      setContactImportModal(false);
      setContacts([]);
      setContactImportCsvFile(null);
      setContactImportStep('first');
      // show message
      success('contact import successfull');
    }
  }, [uploadState]);

  useMemo(() => {
    if (deleteSuccess) {
      // Reset Store

      // refetch all data again

      dispatch(deleteEmployeeReset());
      // show Message
      success('contact Deleted Successfully');
      // Hide modal
      setDeleteModal({
        id: '',
        show: false
      });
    }
  }, [deleteSuccess]);

  // ** Handlers
  const handleRowSelected = (rows) => {
    let selectedRowsIds = [];
    selectedRowsIds = rows.selectedRows.map((selectedRow, index) => {
      return selectedRow._id;
    });
    setUnassignedEmployeeArr(selectedRowsIds);
  };
  // ** User filter options

  // get position data from db
  const { data: positions, refetch, isLoading: positionLoading } = useGetEmployeePosition();

  // ** Sort by role
  const newRoleOptions = [
    { value: '', label: 'Select Position' },
    { value: 'owner', label: 'owner' }
  ];

  //positions array function
  const getPositions = () => {
    try {
      //loading handler
      if (positionLoading) {
        return <h2>Loading</h2>;
      }
      if (positions) {
        positions?.map((position) => {
          if (newRoleOptions.includes(position?.position.toLowerCase())) {
            return;
          }
          newRoleOptions.push({
            value: `${position.position.toLowerCase()}`,
            label: `${position.position.toLowerCase()}`
          });
        });
      }
    } catch (err) {
      toast.error(err.message);
    }
    setRoleOptions(newRoleOptions);
  };
  //calling the function
  useEffect(getPositions, [positions]);

  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    // const count = Number(Math.ceil(store.total / rowsPerPage));
    const count = Math.ceil(tableData?.length / rowsPerPage);

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

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value
      })
    );
  };

  return (
    <Fragment>
      <Card className="overflow-hidden">
        <div className="d-flex py-2">
          <FaUserAlt size="18" />
          <h3 className="font-medium-1 mb-0 ms-75">
            {unassignedEmployeeArr && unassignedEmployeeArr.length > 0
              ? unassignedEmployeeArr.length + ' employee selected'
              : 'No employee selected'}
          </h3>
        </div>
        <div className="react-dataTable employee-list-table">
          <DataTable
            noHeader
            sortServer
            pagination
            responsive
            paginationServer
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={tableData}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default EmployeeList;
