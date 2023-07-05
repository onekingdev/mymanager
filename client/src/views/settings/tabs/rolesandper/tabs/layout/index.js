// ** React Imports
import { Fragment, useState, useRef, useEffect } from 'react';

// ** Custom Components
import AvatarGroup from '@components/avatar-group';
import { toast } from 'react-toastify';
// ** User List Component
import DataTable from 'react-data-table-component';
import { MoreVertical, Edit, Eye, Trash } from 'react-feather';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import EmployeeTaskView from './component/ModalView';
import Avatar from '../../../../../components/avatar';
// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  Row,
  Col,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Form,
  ListGroup,
  ListGroupItem,
  Input
} from 'reactstrap';
// ** Styles
// import '@styles/react/apps/app-users.scss'
import '@styles/react/apps/app-kanban.scss';
import progressionimage from './belt.png';
import { useSelector, useDispatch } from 'react-redux';
import {
  rolesFetchAction,
  rolesEditAction,
  rolesAddAction,
  rolesDeleteAction
} from '../../store/actions';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';

const Layout = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.roles);
  const rolesList = store?.rolesList;
  const [deleteModal, setDeleteModal] = useState({ show: false, id: '' });
  const projectsArr = [
    {
      progress: 'Type A',
      programme: 'Form 1',
      progressColor: 'info',
      totalTasks: '01/01/2023',
      subtitle: 'React Project',
      title: 'BGC eCommerce App',
      img: progressionimage
    }
  ];
  const columns = [
    {
      name: 'Form Name',
      selector: (row) => row.programme,
      cell: (row) => (
        <div style={{ marginLeft: '10px' }}>
          <span className="text-truncate">{row.programme}</span>
        </div>
      )
    },
    {
      name: 'Type',
      selector: (row) => row.progress,
      sortable: true,

      selector: (row) => row.progress
    },
    {
      name: 'Last Updated',
      selector: (row) => row.totalTasks
    },

    {
      name: 'Status',
      selector: (row) => row.totalTasks
    },
    {
      name: 'View',
      selector: (row) => row.totalTasks,
      cell: (row) => <Eye></Eye>
    },
    {
      name: 'Take Action',
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag="span" className="w-100">
                <Edit size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];

  const hiddenFileInput = useRef();
  const [activecard, setActivecard] = useState();
  const [itemmodal, setItemmodal] = useState(false);
  const [open, setopen] = useState(false);
  const toggleitemmodal = () => setItemmodal(!itemmodal);
  const toggle = () => {
    setopen(!open);
  };
  const [permissions, setPermissions] = useState({ dashboard: false });
  const [permissionName, setPermissionName] = useState();
  const [editable, setEditable] = useState({ id: '', status: false });
  const [disabled, setDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePermissionInput = (e) => {
    setPermissions({ ...permissions, [e.target.name]: e.target.checked });
  };
  const handlePermissionInputRoleName = (e) => {
    setPermissionName(e.target.value);
  };
  const handlePermissionSubmit = (e) => {
    e.preventDefault();
    let permissionArray = [];
    let finalPayload = {};
    permissionArray = [permissions];
    finalPayload = { roleName: permissionName, permissions: permissionArray };
    editable.status
      ? dispatch(rolesEditAction(finalPayload, editable?.id))
      : dispatch(rolesAddAction(finalPayload));
    // dispatch(rolesAddAction(finalPayload));
    setPermissions({ dashboard: false });
    setPermissionName();
    toggleitemmodal();
  };
  // const handleDeleteRequest = (e) => {
  //   e.preventDefault();
  //   dispatch(rolesDeleteAction(deleteModal.id));
  //   setDeleteModal({ show: false });
  // };

  const handleDeleteRequest = (id) => {

    Swal.fire({
      title: 'Delete?',
      text: `Are you sure you want to delete this role?`,
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
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(rolesDeleteAction(id));
        // setDeleteModal({ show: false });
      }
    });
  };

  const avatarGroupArr = [
    {
      imgWidth: 25,
      imgHeight: 25,
      title: 'Billy Hopkins',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default
    }
  ];
  useEffect(() => {
    dispatch(rolesFetchAction());
  }, []);
  useEffect(() => {
    if (store?.rolesAddSuccess) {
      toast.success('Role Added Successfully');
    }
    if (store?.rolesDeleteSuccess) {
      toast.success('Role Deleted Successfully');
    }
    if (store?.rolesEditSuccess) {
      toast.success('Role Updated');
    }
  }, [store?.rolesDeleteSuccess, store?.rolesAddSuccess, store?.rolesEditSuccess]);

  const CustomPagination = () => {
    const count = Math.ceil(projectsArr.length / rowsPerPage);

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
    <div className="">
      <div className="">
        
        <Modal isOpen={itemmodal} toggle={toggleitemmodal} size="md">
          <ModalHeader toggle={toggleitemmodal}>Roles</ModalHeader>
          <Form onSubmit={handlePermissionSubmit} className="p-2">
            <ModalBody>
              <FormGroup>
                <Label for="userRole">Role</Label>
                <Input
                  id="userRole"
                  value={permissionName}
                  onChange={handlePermissionInputRoleName}
                  name="roleName"
                  placeholder="Please Enter Role Name"
                  type="text"
                  required
                  disabled={disabled}
                />
              </FormGroup>
              <h3>{editable.status ? 'Edit Role Permission' : 'Role Permission'}</h3>
              <Row>
                <ListGroup flush>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="dashboard"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.dashboard}
                      />
                      <Label check>Dashboard</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="contacts"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.contacts}
                      />
                      <Label check>Contacts</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="tasksAndGoals"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.tasksAndGoals}
                      />
                      <Label check>Task and Goals</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="calendar"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.calendar}
                      />
                      <Label check>Calendar</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="document"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.document}
                      />
                      <Label check>Documents</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="marketing"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.marketing}
                      />
                      <Label check>Marketing</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="shop"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.shop}
                      />
                      <Label check>Shop</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="myBusiness"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.myBusiness}
                      />
                      <Label check>My Business</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="finance"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.finance}
                      />
                      <Label check>Finance</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="fileManager"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.fileManager}
                      />
                      <Label check>File Manager</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="settings"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.settings}
                      />
                      <Label check>Settings</Label>
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup check inline>
                      <Input
                        name="myCMA"
                        onChange={handlePermissionInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={permissions?.myCMA}
                      />
                      <Label check>myCMA</Label>
                    </FormGroup>
                  </ListGroupItem>
                </ListGroup>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
                Cancle
              </Button>{' '}
              <Button color="btn btn-primary" type="submit" disabled={disabled}>
                {editable.status ? 'Save Edit' : 'Save New Role'}
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
      <Fragment>
        <div className="app-user-list">
          <Row>
            {rolesList?.map((item, i) => (
              <>
                <Col lg="4" sm="6">
                  <div
                    className={`card border ${activecard === i ? 'border border-primary' : ''}`}
                    onClick={() => {
                      setActivecard(i);
                      setPermissionName(item?.roleName);
                      setPermissions(item.permissions[0]);
                    }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <AvatarGroup data={avatarGroupArr} size="sm" />
                        <div className="d-flex justify-content-between">
                          <div></div>
                          <div>
                            <h3>{item?.roleName}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between ">
                        <div></div>
                        <div classname="d-flex justify-content-between">
                          <span
                            className="text-primary m-1 cursor-pointer"
                            onClick={() => {
                              toggleitemmodal();
                              setDisabled(true);
                            }}
                          >
                            View
                          </span>
                          <span className="text-danger cursor-pointer">
                            <Trash
                              onClick={() => handleDeleteRequest(item._id, item.roleName)}

                              size={15}
                            ></Trash>
                            <Edit
                              onClick={() => {
                                toggleitemmodal();
                                setDisabled(false);
                                setEditable({ id: item?._id, status: true });
                              }}
                              size={15}
                              className="ms-1"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </>
            ))}
            <Col lg="4">
              <div className="card p-1">
                <Button
                  className="m-1"
                  onClick={() => {
                    toggleitemmodal();
                    setPermissions({ dashboard: false });
                    setPermissionName();
                    setDisabled(false);
                    setEditable({ ...editable, status: false });
                  }}
                  color="primary"
                >
                  Add Role
                </Button>
              </div>
            </Col>
            {/* <Col xl="12" className="d-flex justify-content-end">
              <Button onClick={toggleitemmodal} color="primary " className="mb-1">
                Add New Role
              </Button >
            </Col> */}
          </Row>
        </div>
      </Fragment>
      <Col xl={12}>
        <div className="react-dataTable user-view-account-projects">
          <div className="card m-0 rounded-0 p-2">
            <div className="d-flex justify-content-between">
              {/* <div>Employee Tasks{' > ' + activecard}</div> */}
              <Button color="primary" onClick={toggle}>
                Add Task
              </Button>
              {/* <input type="file" hidden ref={hiddenFileInput}></input> */}
            </div>
          </div>
          <div className="react-dataTable" style={{ height: 'auto', maxHeight: '100%' }}>
            <DataTable
              noHeader
              responsive
              selectableRows
              columns={columns}
              data={projectsArr}
              className="react-dataTable"
              pagination
              paginationComponent={CustomPagination}
            />
          </div>
        </div>
      </Col>
      <Modal
        isOpen={open}
        toggle={() => setopen(!open)}
        fullscreen="lg"
        size="lg"
        centered="true"
        scrollable="false"
      >
        <ModalHeader toggle={() => setopen(!open)}>Add Employee Task</ModalHeader>
        <ModalBody style={{ padding: 0 }}>
          <EmployeeTaskView />
        </ModalBody>
      </Modal>
    </div>
  );
};
export default Layout;
