// ** React Imports
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Component
import { ArrowDownRight, ArrowUpRight, Eye, X } from 'react-feather';
import Chart from 'react-apexcharts';
import DataTable from 'react-data-table-component';

// ** Store & Actions
import { store } from '@store/store';
// import { getUser, deleteUser } from '../store';
import { getUser, deleteUser } from '../contacts/employee/store';

// ** Icons Imports
import { MoreVertical, FileText, Trash2, Archive } from 'react-feather';

// ** Note Import
import Note from '../contacts/employee/list/asdfsd';
// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Button,
  Table
} from 'reactstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTaskReducer } from '../settings/tabs/rolesandper/store/employee/reducer';
import ViewTask from '../../views/contacts/employee/view/tabs/viewTask/ViewTask';
import {
  updateTaskByUserAction,
  updateTaskStatusUserAction
} from '../settings/tabs/rolesandper/store/employee/action';
export const useColumns = ({ setDeleteModal }) => {
  const options = {
    chart: {
      sparkline: {
        enabled: false
      }
    },

    widht: 800,
    colors: ['#FF0000'],
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: -120,
        endAngle: 200,
        hollow: {
          size: '40%'
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            show: true,
            color: 'red',
            fontFamily: 'Montserrat',
            fontSize: '1em',
            fontWeight: '600',
            offsetY: 4
          }
        }
      }
    },
    stroke: {
      lineCap: 'round'
    }
  };
  //series = [83];

  // ** Renders Client Columns
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

    if (row?.photo) {
      return <Avatar className="me-1" img={row.photo} width="32" height="32" />;
    } else {
      return (
        <Avatar
          color={color || 'primary'}
          className="me-1"
          content={row.fullName || 'John Doe'}
          initials
        />
      );
    }
  };

  const statusObj = {
    pending: 'light-warning',
    active: 'light-success',
    inactive: 'light-secondary'
  };

  const columns = [
    {
      name: 'Campaign Name',
      sortable: true,
      minWidth: '240px',
      sortField: 'fullName',
      center: true,
      selector: (row) => row?.fullName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <span className="fw-bolder">{row?.fullName}</span>
            {/* <Link
              to={`/contacts/employee/view/${row._id}`}
              className="user_name text-truncate text-body"
              onClick={() => store.dispatch(getUser(row._id))}
            >
              <span className="fw-bolder">{row?.fullName}</span>
            </Link> */}
            <small className="text-truncate text-muted mb-0">{row?.email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Status',
      width: '120px',
      sortable: true,
      sortField: 'status',
      center: true,
      selector: (row) => row.status,
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row.status]} pill>
          {row.status}
        </Badge>
      )
    },
    {
      name: 'Position',
      sortable: true,
      width: '130px',
      sortField: 'role',
      center: true,
      selector: (row) => row?.position,
      cell: (row) => <span>{row?.position}</span>
    },

    {
      name: 'Phone',
      width: '150px',
      center: true,
      selector: (row) => row.phone,
      cell: (row) => <span>{row?.phone}</span>
    },

    {
      name: 'Onboard',
      width: '130px',
      selector: (row) => row?.salary,
      center: true,
      cell: (row) => (
        <div className="p-1">
          <Chart options={options} series={row.series} type="radialBar" height={100} />
        </div>
      )
    },
    {
      name: 'Rating',
      width: '150px',
      center: true,
      selector: (row) => row.billing,
      cell: () => (
        <div className="table-rating">
          <span>0</span>
        </div>
      )
    },
    {
      name: 'Note',
      width: '150px',
      center: true,
      selector: (row) => row.billing,
      cell: (row) => <Note note={row?.note} id={row._id} />
      // <Eye />
    },
    {
      name: 'Tag',
      width: '80px',
      center: true,
      selector: (row) => row.billing,
      cell: () => (
        <Badge pill color="light-primary">
          -
        </Badge>
      )
    },
    {
      name: 'Actions',
      minWidth: '100px',
      center: true,
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag={Link}
                className="w-100"
                to={`/contacts/employee/view/${row._id}`}
                // onClick={() => store.dispatch(getUser(row._id))}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">Details</span>
              </DropdownItem>

              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  // store.dispatch(deleteUser(row._id))
                  setDeleteModal({
                    id: row._id,
                    show: true
                  });
                }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];

  return {
    columns
  };
};

const badgeColor = {
  1: { color: 'light-primary' },
  2: { color: 'light-success' },
  3: { color: 'light-danger' }
};
const status = {
  pending: { title: 'Pending', color: 'light-info' },
  declined: { title: 'Denied', color: 'light-danger' },
  remind: { title: 'Remind', color: 'light-primary' },
  approved: { title: 'Completed', color: 'light-success' }
};
const ExpandableTable = ({ data }) => {
  const taskStore = useSelector((state) => state.employeeTasks);
  let empTasks = taskStore?.taskList?.data?.employeeTasks?.find((x) => x._id === data._id)?.tasks;

  const [selectedTask, setSelectedTask] = useState({});
  const dispatch = useDispatch();
  const [openViewModal, setOpenViewModal] = useState(false);
  const toggleViewModal = (item) => {
    setSelectedTask(item);
    dispatch(setSelectedTaskReducer(item));
    setOpenViewModal(!openViewModal);
  };

  //const employeeId =
  const [tooltipColors, setTooltipColors] = useState({
    deny: 'red',
    remind: 'blue',
    complete: 'green'
  });
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipOpens, setTooltipOpens] = useState(false);
  const [tooltipOpens1, setTooltipOpens1] = useState(false);
  const [modal, setModal] = useState(false);

  const [isReminded, setIsReminded] = useState(false);
  const [isCompleted, setIsCompleted] = useState(null);
  const [isDenied, setIsDenied] = useState(false);

  const [note, setNote] = useState('');

  const toggle = () => setTooltipOpen(!tooltipOpen);
  const toggle1 = () => setTooltipOpens(!tooltipOpens);
  const toggle2 = () => setTooltipOpens1(!tooltipOpens1);

  const handleNotes = () => setModal(!modal);

  const handleNoteChanged = (e) => {
    setNote(e.target.value);
  };
  // const [status, setStatus] = useState('Active');

  // function handleStatusClick() {
  //   setStatus(status === 'Active' ? 'Inactive' : 'Active');
  // }

  function handleRemindClick(item) {
    setIsReminded(true);
    //handle status remind
    dispatch(updateTaskStatusUserAction(item._id, { status: 'remind', empId: item.empId }));
  }

  function handleDenyClick(item) {
    setIsDenied(true);
    //set status declined

    dispatch(
      updateTaskStatusUserAction(item._id, { status: 'declined', empId: item.empId, note: note })
    );
  }

  function handleCheckboxChange(item) {
    setIsCompleted(item._id);
    //set status completed

    dispatch(updateTaskStatusUserAction(item._id, { status: 'approved', empId: item.empId }));
  }
  return (
    <div className="expandable-content" style={{ marginLeft: '5%', marginRight: '10%' }}>
      <Table className="employee-sub-menu-table">
        <thead>
          <tr style={{ height: '10px !important' }}>
            <th>Task Name</th>
            <th>Type</th>
            <th>Task</th>
            <th>Description</th>
            <th>Note</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {empTasks &&
            empTasks?.map((item) => {
              return (
                <tr>
                  <th>
                    <p style={{ fontSize: '13px', fontWeight: '600' }}>
                      {item.originTask[0].title}
                    </p>
                  </th>
                  <th style={{ fontSize: '13px', fontWeight: '400' }}>
                    {item.originTask[0].type ? item.originTask[0].type : 'Sign'}
                  </th>
                  <th>
                    <Button
                      color="primary"
                      outline
                      className="btn btn-sm"
                      style={{ marginLeft: '-10px' }}
                      onClick={() => toggleViewModal(item)}
                    >
                      View
                    </Button>
                  </th>
                  <th>
                    <p className="desEmpText">{item.originTask[0].description}</p>
                  </th>
                  <th style={{ fontSize: '13px', fontWeight: '400' }}>
                    {item?.history[item.history.length - 1].note}
                  </th>
                  <th>
                    <div className="column-action emp-column-action">
                      <ArrowUpRight
                        size={22}
                        className="arrow-up-right-icon"
                        id="remind"
                        onClick={() => handleRemindClick(item)}
                      />
                      <Tooltip
                        isOpen={tooltipOpen}
                        target="remind"
                        toggle={toggle}
                        className={`tooltip-${tooltipColors.remind}`}
                      >
                        <div>Remind</div>
                      </Tooltip>

                      <Input
                        type="checkbox"
                        style={{ fontSize: '14px', marginLeft: '10px', marginRight: '10px' }}
                        id="complete"
                        checked={isCompleted === item._id}
                        onChange={() => handleCheckboxChange(item)}
                      />
                      <Tooltip
                        isOpen={tooltipOpens}
                        target="complete"
                        toggle={toggle1}
                        className={`tooltip-${tooltipColors.complete}`}
                      >
                        Completed
                      </Tooltip>

                      <X className="x-icon" size={22} onClick={handleNotes} id="deny" />
                      <Tooltip
                        isOpen={tooltipOpens1}
                        target="deny"
                        toggle={toggle2}
                        className={`tooltip-${tooltipColors.deny}`}
                      >
                        Deny
                      </Tooltip>

                      <Modal isOpen={modal} toggle={handleNotes} centered>
                        <ModalHeader toggle={handleNotes}>Reason</ModalHeader>
                        <ModalBody>
                          <FormGroup>
                            <Label for="exampleText">Reason</Label>
                            <Input
                              id="exampleText"
                              name="text"
                              type="textarea"
                              onChange={handleNoteChanged}
                            />
                          </FormGroup>
                        </ModalBody>
                        <div className="d-flex justify-content-end p-1">
                          <Button color="primary" onClick={() => handleDenyClick(item)}>
                            Submit
                          </Button>
                        </div>
                      </Modal>
                    </div>
                  </th>
                  <th>
                    <Badge color={`${status[item.status].color}`} pill>
                      {status[item.status].title}
                    </Badge>
                  </th>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <ViewTask toggle={toggleViewModal} open={openViewModal} empTask={selectedTask} />
    </div>
  );
};

export default ExpandableTable;
