import React, { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Edit, Eye, FileText, MoreVertical, Trash, Trash2 } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import {
  Badge,
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import AvatarGroup from '../../../../../../@core/components/avatar-group';
import Roles from './roles';
import AddTask from './addTask/AddTask';
import { getTasksByUserAction } from '../../store/employee/action';

import EditTask from './editTask/EditTask';
import { contactListRequest } from '../../../../../contacts/store/actions';

import { getUserData } from '../../../../../../auth/utils';
import ReactPaginate from 'react-paginate';

export default function Employees() {
  // ** States
  const [openAddTask, setOpenAddTask] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const dispatch = useDispatch();
  const store = useSelector((state) => state.employeeTasks);
  const storeRoles = useSelector((state) => state.roles);
  const storeEmployees = useSelector((state) => state.employeeContact);
  const taskList = store?.taskList;
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const toggleEditModal = () => setIsEditOpen(!isEditOpen);
  const toggleViewModal = () => setIsViewOpen(!isViewOpen);

  const handleViewModal = (data) => {
    dispatch(setViewPdfReducer(data));
    toggleViewModal();
  };

  const handleToggleEdit = (data) => {
    dispatch(setViewPdfReducer(data));
    toggleEditModal();
  };

  useEffect(() => {
    const userData = getUserData();
    const email = userData.email;
    //dispatch(getSignatureInitialStampAction(email));

    dispatch(getTasksByUserAction('task'));
  }, []);

  const toggleAddTask = () => {
    setOpenAddTask(!openAddTask);
  };

  const columns = [
    {
      name: 'Task',
      selector: (row) => row.title,
      sortable: true,
      minWidth: '300px',
      cell: (row) => (
        <div>
          <span>
            <b>{row.title}</b>
          </span>
          <span className="d-block text-secondary">{row.description}</span>
        </div>
      )
    },
    {
      name: 'Type',
      selector: (row) => row.type,
      minWidth: '50px',
      sortable: true
    },
    {
      name: 'Assigned to',
      selector: (row) => row.empRoleId,
      cell: (row) => (
        <Label>{storeRoles?.rolesList?.find((r) => r._id === row?.empRoleId)?.roleName}</Label>
      ),
      minWidth: '50px',
      sortable: true
    },
    {
      name: 'Last Updated',
      selector: (row) => row.updatedAt,
      sortable: true,
      minWidth: '150px',
      cell: (row) => <span>{row.updatedAt?.split('T')[0] || ''}</span>
    }
  ];

  useEffect(() => {
    if (storeEmployees.employeeList.data === null) {
      dispatch(contactListRequest());
    }
  }, []);


  const CustomPagination = () => {
    const count = Math.ceil(taskList.length / rowsPerPage);

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
      </div>
    );
  };

  return (
    <div>
      <Roles />
      <div className="card m-0 rounded-0">
        <div className="d-flex justify-content-between p-1">
          <div>Your Employee Tasks</div>
          <Button color="primary" onClick={toggleAddTask}>
            Add Task
          </Button>
          {/* <input type="file" hidden ref={hiddenFileInput}></input> */}
        </div>
        <div className="react-dataTable" style={{ height: '30vh', maxHeight: "100%", overflow: "scroll"}}>
          <DataTable
            noHeader
            responsive
            selectableRows
            columns={columns}
            data={taskList}
            className="react-dataTable"
            paginationPerPage={5}
            pagination
            paginationComponent={CustomPagination}          />
        </div>
      </div>

      <AddTask toggle={toggleAddTask} open={openAddTask} />
    </div>
  );
}
