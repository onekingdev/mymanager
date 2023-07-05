// ** React Imports
import { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

// ** Third Party Component
import { ChevronDown, Edit, Eye, MoreVertical, Search } from 'react-feather';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { FiEdit, FiPhone } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { MdAddIcCall } from 'react-icons/md';
import { toast } from 'react-toastify';
import Avatar from '@components/avatar';
import { selectThemeColors } from '@utils';

// ** Reactstrap Imports
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Modal,
  Row,
  Col,
  Card,
  Label,
  Form,
  FormGroup,
  Input,
  ModalFooter,
  ModalHeader,
  ModalBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  InputGroup,
  InputGroupText,
  Badge,
  UncontrolledTooltip,
  FormFeedback
} from 'reactstrap';

// ** Note Actions
import {
  contactNoteAddAction,
  contactNoteDeleteAction,
  contactNoteEditAction
} from './store/actions';

import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import AddAppointment from '../calendar/appointment/AddAppSidebar';
import classnames from 'classnames';
import { cvtColor, noteResponseColor } from './contact-list/constants';
import '@src/assets/styles/contact/note.scss';
import Flatpickr from 'react-flatpickr';
import { Link } from 'react-router-dom';
import { getUser } from './store';
import { fetchAppointments } from '../calendar/store';
import { fetchTaskListAction } from '../tasks/task-reporting/store/action';
import { formatDateTime } from '../../utility/Utils';
import { useSelector } from 'react-redux';
import tasks from '../../navigation/vertical/tasks';
import { fetchLabelsApi } from '../tasks/label-management/store';
import { fetchWorkspaceApi, getSelectedWorkspaceData } from '../apps/workspace/store';
import { addTask, fetchBoardsApi, fetchTasksApi } from '../apps/kanban/store';
import { stat } from 'fs';
import Select, { components } from 'react-select'; //eslint-disable-line

const NoteModal = ({ row, toggle, isOpen, notes, dispatch, orderContactType }) => {
  const [modal2, setModal2] = useState(false);

  const [editModalData, setEditModalData] = useState({});
  const [activeTab, setActiveTab] = useState('note');
  const [addNote, setAddNote] = useState(null);
  const [selMonth, setSelMonth] = useState(new Date());
  const [labelColorData, setLabelColorData] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [addAppointmentSidebarOpen, setAddAppointmentSidebarOpen] = useState(false);
  // State for Task
  const [taskModal, setTaskModal] = useState(false);
  const [workspaceId, setWorkspaceId] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [taskTitle, setTaskTitle] = useState(null);
  const [createNewValidation, setCreateNewValidation] = useState(false);

  const appointmentStore = useSelector((state) => state?.calendar?.events);
  const taskStore = useSelector((state) => state?.kanban?.tasks);
  const boardStore = useSelector((state) => state?.kanban?.boards);
  const labelStore = useSelector((state) => state?.label?.labels);
  const workspaceStore = useSelector((state) => state?.workspace);

  const toggle2 = () => setModal2(!modal2);
  const toggleAddTaskModal = () => setTaskModal(!taskModal);

  // ** Effects
  useEffect(() => {
    dispatch(fetchWorkspaceApi());
    dispatch(fetchAppointments());
    dispatch(fetchTasksApi());
    dispatch(fetchBoardsApi());
    dispatch(fetchLabelsApi());
  }, [row?._id]);

  useEffect(() => {
    setFilteredAppointments(appointmentStore?.filter((x) => x?.invitedUser == row?._id));
  }, [appointmentStore]);

  useEffect(() => {
    setFilteredTasks(
      taskStore?.filter((x) => x.assignedTo?.map((y) => y.contactId).includes(row?._id))
    );
  }, [taskStore]);

  useEffect(() => {
    if (labelStore) {
      const tmpData = {};
      for (let i = 0; i < labelStore?.length; i++) {
        const { title, color } = labelStore[i];
        tmpData[title] = color;
      }
      setLabelColorData(tmpData);
    }
  }, [labelStore]);

  useEffect(() => {
    dispatch(getSelectedWorkspaceData(workspaceId?.value));
  }, [workspaceId]);
  // ** Select Options
  const workspaceOptions = workspaceStore?.workspace?.map((x) => {
    return { value: x._id, label: x.title };
  });

  const statusOptions = workspaceStore?.boards?.map((x) => {
    return { value: x._id, label: x.title };
  });

  // ** Select Components
  const WorkspaceComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  const BoardComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  const createTaskBtnClicked = () => {
    const newTaskData = {
      title: taskTitle,
      boardId: statusId,
      workspaceId
    };
    dispatch(
      addTask({
        title: taskTitle,
        boardId: statusId?.value,
        workspaceId: workspaceId?.value,
        assignedTo: [
          {
            contactId: row?._id,
            title: row?.fullName,
            img: row?.photo
          }
        ]
      })
    );
  };
  const handleEditModal = (e) => {
    setEditModalData({ ...editModalData, [e.target.name]: e.target.value });
  };

  const handleNoteSave = (e) => {
    e.preventDefault();
    if (
      editModalData.followUpType != '' &&
      editModalData.response != '' &&
      editModalData.note != ''
    ) {
      dispatch(contactNoteAddAction({ ...editModalData, date: new Date() }, row._id));

      toast.success('Note Added Successfully');
      e.target.reset();
      setEditModalData({ note: '', followUpType: '', response: '' });
      toggle2();
    } else {
      toast.error('Please enter data in all fields');
    }
  };

  const handleNoteUpdate = (e) => {
    e.preventDefault();
    dispatch(contactNoteEditAction({ ...editModalData, date: new Date() }, row._id));
    toggle2();
    toast.success('Note Updated successfully');
  };

  const MySwal = withReactContent(Swal);
  const handleDeleteModal = async (data, type) => {
    const res = await MySwal.fire({
      title: 'Delete?',
      text: 'Are you sure to delete this note?' + type,
      showCancelButton: true,

      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (res.value) {
      dispatch(contactNoteDeleteAction(data?._id, row._id));
      toast.success('Note deleted successfully');
    }
  };

  const renderUserImg = (row) => {
    let tmpValue = 0;
    row?._id &&
      Array.from(row?._id).forEach((x, index) => {
        tmpValue += x.codePointAt(0) * (index + 1);
      });
    const stateNum = tmpValue % 6,
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
      return (
        <Link
          to={`/contacts/view/${row._id}/${orderContactType}`}
          onClick={() => {
            dispatch(getUser(row.id));
            // fetchNotes(row._id);
          }}
        >
          <Avatar className="me-1" img={row?.photo} width="150" height="150" />
        </Link>
      );
    } else {
      return (
        <Link
          to={`/contacts/view/${row._id}/${orderContactType}`}
          onClick={() => {
            dispatch(getUser(row.id));
            // fetchNotes(row._id);
          }}
        >
          <Avatar
            initials
            color={color}
            className="rounded "
            content={row.fullName}
            contentStyles={{
              borderRadius: 0,
              fontSize: 'calc(48px)',
              width: '100%',
              height: '100%'
            }}
            style={{
              height: '150px',
              width: '150px'
            }}
          />
        </Link>
      );
    }
  };

  // ** Renders Avatar
  const renderAvatar = (obj) => {
    const item = obj.assignedTo;

    return item.length ? (
      <div className="w-100">{renderAssignees(item)}</div>
    ) : (
      <Avatar img={blankAvatar} imgHeight="32" imgWidth="32" />
    );
  };

  const renderAssignee = (row) => {
    let target = `t${row.title
      .replace(/[^\w ]/g, '')
      .split(' ')
      .join('-')}`;
    let tmpValue = 0;
    Array.from(row?.title).forEach((x, index) => {
      tmpValue += x.codePointAt(0) * (index + 1);
    });
    const stateNum = tmpValue % 6,
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];

    return (
      <div className="own-avatar">
        {row.title ? (
          <UncontrolledTooltip placement={row.placement} target={target}>
            {row.title}
          </UncontrolledTooltip>
        ) : null}
        {row?.img ? (
          <Avatar
            // className={classnames('pull-up', {
            //   [row.className]: row.className
            // })}
            img={row.img}
            width="32"
            height="32"
            {...(row.title
              ? {
                  id: target
                }
              : {})}
          />
        ) : (
          <Avatar
            color={color || 'primary'}
            // className={classnames('pull-up', {
            //   [row.className]: row.className
            // })}
            content={row.title || 'John Doe'}
            {...(row.title
              ? {
                  id: target
                }
              : {})}
            width="32"
            height="32"
            initials
          />
        )}
      </div>
    );
  };

  const renderAssignees = (data) => {
    return <div className="own-avatar-group d-flex">{data.map((row) => renderAssignee(row))}</div>;
  };

  const noteColumnsData = [
    {
      name: 'DATE',
      width: '120px',
      selector: (row) => row.date,
      cell: (row) => (
        <div className="d-flex flex-column">
          <span>{new Date(row.date).toLocaleDateString()}</span>
          <span>{new Date(row.date).toLocaleTimeString()}</span>
        </div>
      )
    },
    {
      name: 'TYPE',
      width: '130px',
      selector: (row) => row.followUpType
    },
    {
      name: 'RESPONSE',
      width: '120px',
      selector: (row) => row.response,
      cell: (row) => (
        <>
          <Badge color={noteResponseColor[row.response]}>{row.response}</Badge>
        </>
      )
    },
    {
      name: 'NOTE',
      maxWidth: '250px',
      selector: (row) => row.note,
      cell: (row) => <div className="multiline">{row.note}</div>
    },
    {
      name: 'ACTION',
      width: '90px',
      selector: (row) => row.mode,
      cell: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag="span"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                setEditModalData(row);
                setAddNote(false);
                toggle2();
              }}
            >
              <FiEdit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              tag="span"
              // href="/"
              className="w-100"
              onClick={() => handleDeleteModal(row)}
            >
              <AiOutlineDelete size={14} className="me-50" />
              <span className="align-middle">Remove</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ];
  const apptColumnsData = [
    {
      name: 'TITLE',
      width: '160px',
      selector: (row) => row.date,
      cell: (row) => (
        <div className="d-flex flex-column">
          <span>{row?.title}</span>
          <span>{formatDateTime(row?.start)}</span>
        </div>
      )
    },
    // {
    //   name: 'All day',
    //   width: '80px',
    //   selector: (row) => row.allDay.toString()
    // },
    {
      name: 'DURATION',
      width: '110px',
      selector: (row) => row.interval + ' mins'
    },
    {
      name: 'REMIND TO',
      width: '200px',
      selector: (row) => row.remindTo
      // cell: (row) => (
      //   <>
      //     <Badge color={noteResponseColor[row.response]}>{row.response}</Badge>
      //   </>
      // )
    }
    // {
    //   name: 'Repeat',
    //   maxWidth: '250px',
    //   selector: (row) => row.note,
    //   cell: (row) => <div className="multiline">{row.repeat}</div>
    // },
    // {
    //   name: 'Action',
    //   width: '80px',
    //   selector: (row) => row.mode,
    //   cell: (row) => (
    //     <UncontrolledDropdown>
    //       <DropdownToggle tag="div" className="btn btn-sm">
    //         <MoreVertical size={14} className="cursor-pointer" />
    //       </DropdownToggle>
    //       <DropdownMenu>
    //         <DropdownItem
    //           tag="span"
    //           className="w-100"
    //           onClick={(e) => {
    //             e.preventDefault();
    //             setEditModalData(row);
    //             setAddNote(false);
    //             toggle2();
    //           }}
    //         >
    //           <FiEdit size={14} className="me-50" />
    //           <span className="align-middle">Edit</span>
    //         </DropdownItem>
    //         <DropdownItem
    //           tag="span"
    //           // href="/"
    //           className="w-100"
    //           onClick={() => handleDeleteModal({ ...row, type: 2 })}
    //         >
    //           <AiOutlineDelete size={14} className="me-50" />
    //           <span className="align-middle">Remove</span>
    //         </DropdownItem>
    //       </DropdownMenu>
    //     </UncontrolledDropdown>
    //   )
    // }
  ];
  const taskColumnsData = [
    {
      name: 'TASK NAME',
      sortable: true,
      minWidth: '260px',
      selector: (row) => row.title,
      cell: (row) => {
        let startDate = row.createdAt ? formatDateTime(row.createdAt) : 'Not Selected';
        let endDate = row.dueDate ? formatDateTime(row.dueDate) : 'Not Selected';

        return (
          <div
            className="d-flex align-items-center"
            style={{ cursor: 'pointer', position: 'absolute', left: 0 }}
          >
            <div
            // onClick={() => handleTaskClick(row)}
            >
              <div style={{ fontWeight: 'bold' }}>{row.title}</div>
              {`${startDate} - ${endDate}`}
            </div>
          </div>
        );
      }
    },
    {
      name: 'WORKSPACE',
      maxWidth: '20%',
      cell: (row) => {
        console.log(workspaceStore?.workspace?.find((x) => x?.boards.includes(row?.boardId?._id)));
        return (
          <>
            {workspaceStore?.workspace?.find((x) => x?.boards.includes(row?.boardId?._id))?.title}
          </>
        );
      }
    },
    // {
    //   name: 'LABELS',
    //   cell: (row) => {
    //     return (
    //       <div>
    //         {row.labels.map((label, index) => {
    //           const isLastChip = row.labels[row.labels.length - 1] === label;

    //           return (
    //             <Badge
    //               pill
    //               key={index}
    //               label={label}
    //               color={labelColorData[label]}
    //               className={classnames({ 'me-75': !isLastChip })}
    //               style={{ margin: '2px 0' }}
    //             >
    //               {label}
    //             </Badge>
    //           );
    //         })}
    //       </div>
    //     );
    //   }
    // },
    {
      name: 'STATUS',
      maxWidth: '20%',
      minWidth: '150px',
      cell: (row) => {
        return (
          <div
            style={{
              backgroundColor: cvtColor[row?.boardId?.color || 'secondary'],
              color: row?.boardId?.color.includes('light')
                ? cvtColor[row?.boardId?.color?.slice(6)]
                : '#fff',
              padding: '8px',
              borderRadius: '5px',
              textAlign: 'center',
              fontWeight: 500
            }}
          >
            {row?.boardId?.title}
          </div>
        );
      }
    },
    {
      name: 'ASSIGNEES',
      // width: '105px',
      width: '185px',
      cell: (row) => (row.assignedTo ? renderAvatar(row) : null)
    }

    // {
    //   name: 'LAST ACTIVITY',
    //   maxWidth: '15%',
    //   minWidth: '130px',
    //   selector: (row) => row?.lastActivity
    // },
    // {
    //   name: 'ACTION',
    //   maxWidth: '5%',
    //   cell: (row) => {
    //     return (
    //       <div className="column-action" style={{ marginLeft: '1.2rem' }}>
    //         <UncontrolledDropdown>
    //           <DropdownToggle
    //             className="btn btn-sm"
    //             tag="div"
    //             href="/"
    //             onClick={(e) => e.preventDefault()}
    //           >
    //             <MoreVertical className="text-body" size={16} />
    //           </DropdownToggle>
    //           <DropdownMenu end>
    //             <DropdownItem
    //               tag={'span'}
    //               className="w-100"
    //               onClick={(e) => {
    //                 e.preventDefault();
    //                 handleTaskClick(row);
    //               }}
    //             >
    //               <Edit size={'14px'} style={{ marginRight: '10px' }} />
    //               Edit
    //             </DropdownItem>
    //             {/* <DropdownItem
    //               tag={Link}
    //               to="/"
    //               onClick={(e) => {
    //                 e.preventDefault();
    //                 setModalType(3);
    //               }}
    //             >
    //               <Trash2 size={'14px'} style={{ marginRight: '10px' }} />
    //               Delete
    //             </DropdownItem> */}
    //           </DropdownMenu>
    //         </UncontrolledDropdown>
    //       </div>
    //     );
    //   }
    // }
  ];
  const addAppointmentBtnClicked = (e) => {
    e.preventDefault();
    setAddAppointmentSidebarOpen(true);
  };

  // ** Effects
  useEffect(() => {
    const startDate = new Date(selMonth);
    const endDate = new Date(selMonth);

    startDate.setDate(1);
    endDate.setDate(1);
    endDate.setMonth(endDate.getMonth() > 11 ? 1 : endDate.getMonth() + 1);

    setFilteredNotes(
      notes.filter((x) => {
        const noteDate = new Date(x.date);
        return noteDate.getTime() >= startDate.getTime() && noteDate.getTime() < endDate.getTime();
      })
    );
  }, [notes, selMonth]);

  return (
    <>
      <Modal
        fullscreen="lg"
        size="lg"
        centered="true"
        scrollable="false"
        isOpen={isOpen}
        toggle={toggle}
        style={{ minWidth: '900px' }}
      >
        <ModalHeader toggle={toggle}>Notes for {row?.fullName}</ModalHeader>
        <ModalBody>
          <Row>
            <Col xl="12" lg="12" md="12">
              <Row>
                <Col xl="3">
                  <Card body>
                    <Row>
                      <Col xl="12" md="12">
                        {row?._id && renderUserImg(row)}
                      </Col>
                      {/* <Col xl="12">
                        <div className="d-flex mt-1 mb-1">
                          <h2>{row?.fullName}</h2>
                        </div>
                      </Col> */}

                      <Col xl="12" md="12">
                        <div className="d-flex mt-2 mb-1">
                          <FiPhone size={20} className="" />
                          <Label className="px-1">{row?.phone}</Label>
                        </div>
                      </Col>
                      <Col xl="12" md="12">
                        <div className="d-flex mb-1">
                          <AiOutlineMail size={28} />
                          <Label
                            className="px-1"
                            style={{ wordWrap: 'break-word', overflow: 'hidden' }}
                          >
                            {row?.email}
                          </Label>
                        </div>
                      </Col>
                      <Col xl="12" md="12">
                        <div className="d-flex mb-1">
                          <GoLocation size={20} />
                          <Label className="px-1">
                            {row?.address?.street} <br />
                            {row?.address?.city} - {row?.address?.state}
                            <br />
                            {row?.address?.country} - {row?.address?.zipCode}
                          </Label>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col xl="9" lg="9" md="9">
                  <Card body>
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === 'note'
                          })}
                          onClick={() => {
                            setActiveTab('note');
                          }}
                        >
                          Note
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === 'appointment'
                          })}
                          onClick={() => {
                            setActiveTab('appointment');
                          }}
                        >
                          Appointment
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === 'task'
                          })}
                          onClick={() => {
                            setActiveTab('task');
                          }}
                        >
                          Tasks
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="note">
                        <div className="d-flex align-content-center justify-content-between w-100 mb-1">
                          <InputGroup className="input-group-merge border-0 shadow-none me-1">
                            <InputGroupText className="input-group-merge border-1 shadow-none">
                              <Search className="text-muted" size={14} />
                            </InputGroupText>
                            <Input
                              id="search-invoice"
                              className="border-1"
                              type="text"
                              placeholder="Search..."
                            />
                          </InputGroup>
                          <div>
                            <Flatpickr
                              id="due-date"
                              name="due-date"
                              // value={dueDate}
                              mindate={'today'}
                              className="form-control"
                              options={{ dateFormat: 'M Y', altFormat: 'M Y' }}
                              placeholder="Select M/Y"
                              onChange={(date) => {
                                setSelMonth(new Date(date[0]));
                              }}
                            />
                          </div>
                          <div className="d-flex justify-content-end">
                            <Button
                              className="ms-1 color-primary"
                              color="primary"
                              onClick={() => {
                                setAddNote(true);
                                toggle2();
                              }}
                              style={{ width: 'max-content' }}
                            >
                              Add Note
                            </Button>
                          </div>
                        </div>
                        <DataTable
                          className="react-dataTable"
                          noHeader
                          // subHeader
                          data={filteredNotes}
                          pagination
                          responsive
                          sortIcon={<ChevronDown />}
                          columns={noteColumnsData}
                        />
                      </TabPane>
                      <TabPane tabId="appointment">
                        <div className="d-flex align-content-center justify-content-between w-100 mb-1">
                          <InputGroup className="input-group-merge border-0 shadow-none">
                            <InputGroupText className="input-group-merge border-1 shadow-none">
                              <Search className="text-muted" size={14} />
                            </InputGroupText>
                            <Input
                              id="search-invoice"
                              className="border-1"
                              type="text"
                              placeholder="Search..."
                            />
                          </InputGroup>
                          <div className="d-flex justify-content-end">
                            <Button
                              className="ms-1 color-primary"
                              color="primary"
                              onClick={addAppointmentBtnClicked}
                              style={{ width: 'max-content' }}
                            >
                              Add Appointment
                            </Button>
                          </div>
                        </div>
                        <DataTable
                          className="react-dataTable"
                          noHeader
                          // subHeader
                          data={filteredAppointments}
                          pagination
                          responsive
                          sortIcon={<ChevronDown />}
                          columns={apptColumnsData}
                        />
                      </TabPane>
                      <TabPane tabId="task">
                        <div className="d-flex align-content-center justify-content-between w-100 mb-1">
                          <InputGroup className="input-group-merge border-0 shadow-none">
                            <InputGroupText className="input-group-merge border-1 shadow-none">
                              <Search className="text-muted" size={14} />
                            </InputGroupText>
                            <Input
                              id="search-invoice"
                              className="border-1"
                              type="text"
                              placeholder="Search..."
                            />
                          </InputGroup>
                          <div className="d-flex justify-content-end">
                            <Button
                              className="ms-1 color-primary"
                              color="primary"
                              onClick={toggleAddTaskModal}
                              style={{ width: 'max-content' }}
                            >
                              Add Task
                            </Button>
                          </div>
                        </div>
                        <DataTable
                          className="react-dataTable"
                          noHeader
                          // subHeader
                          data={filteredTasks}
                          pagination
                          responsive
                          sortIcon={<ChevronDown />}
                          columns={taskColumnsData}
                        />
                      </TabPane>
                    </TabContent>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <AddAppointment
        addAppointmentSidebarOpen={addAppointmentSidebarOpen}
        setAddAppointmentSidebarOpen={setAddAppointmentSidebarOpen}
        calendarEventType="Appointment"
        invitedUserId={row?._id}
      />

      {/* Add Task Modal */}
      <Modal
        fullscreen="md"
        size="sm"
        centered="true"
        scrollable="false"
        isOpen={taskModal}
        toggle={toggleAddTaskModal}
        // style={{ minHeight: '400px' }}
      >
        <ModalHeader toggle={toggleAddTaskModal}>Add Task</ModalHeader>
        <ModalBody style={{ minHeight: '300px' }}>
          <div className="mt-1">
            <Label className="form-label" for="validState">
              Select Workspace <span className="text-danger">*</span>
            </Label>
            <Select
              id="workspace-title"
              value={workspaceId}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={workspaceOptions}
              theme={selectThemeColors}
              onChange={(data) => setWorkspaceId(data)}
              components={{ Option: WorkspaceComponent }}
              maxMenuHeight={150}
            />
          </div>
          <div>
            <Label className="form-label mt-1" for="validState">
              Select Status <span className="text-danger">*</span>
            </Label>
            <Select
              id="status-title"
              value={statusId}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={statusOptions}
              theme={selectThemeColors}
              onChange={(data) => setStatusId(data)}
              components={{ Option: BoardComponent }}
              maxMenuHeight={120}
            />
          </div>
          <div>
            <Label className="form-label mt-1" for="validState">
              Select Task <span className="text-danger">*</span>
            </Label>
            <Input
              type="text"
              id={'task-title'}
              name={'task-title'}
              placeholder="Input task title"
              value={taskTitle}
              onChange={(e) => {
                e.preventDefault();
                setTaskTitle(e.target.value);
                setCreateNewValidation(
                  !workspaceStore?.tasks?.map((x) => x.title)?.includes(e.target.value)
                );
              }}
              valid={createNewValidation && taskTitle}
              invalid={!createNewValidation && taskTitle}
            />
            {taskTitle && (
              <FormFeedback valid={createNewValidation}>
                {createNewValidation
                  ? 'Sweet! That name is available.'
                  : 'Oh no! That name is already taken.'}
              </FormFeedback>
            )}
          </div>
          <div className="mt-2 d-flex align-items-center justify-content-end">
            <Button
              color="primary"
              onClick={createTaskBtnClicked}
              disabled={!workspaceId || !statusId || !taskTitle || !createNewValidation}
            >
              Create
            </Button>
            <Button className="ms-1" color="secondary" onClick={toggleAddTaskModal}>
              Cancel
            </Button>
          </div>
        </ModalBody>
      </Modal>
      {/* Add Note Modal */}
      <Modal
        fullscreen="md"
        size="sm"
        centered="true"
        scrollable="false"
        isOpen={modal2}
        toggle={toggle2}
      >
        <ModalHeader toggle={toggle2}>{addNote ? 'Add' : 'Edit'} Note</ModalHeader>
        <ModalBody>
          <Col lg="12">
            <Form onSubmit={addNote ? handleNoteSave : handleNoteUpdate} row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelect" sm={2}></Label>
                    <Col sm={12}>
                      <Label for="exampleText">
                        <b>Follow Up Type</b>
                      </Label>
                      <Input
                        id="exampleSelect"
                        name="followUpType"
                        type="select"
                        placeholder="Select Notes"
                        onChange={handleEditModal}
                        defalutValue={editModalData.followUpType}
                      >
                        <option
                          selected={editModalData?.followUpType === '' ? true : false}
                          value=""
                        >
                          Select Type
                        </option>
                        <option
                          selected={editModalData?.followUpType === 'General' ? true : false}
                          value="General"
                        >
                          General
                        </option>
                        <option
                          selected={editModalData?.followUpType === 'Birthday' ? true : false}
                          value="Birthday"
                        >
                          Birthday
                        </option>
                        <option
                          selected={editModalData?.followUpType === 'Miss You' ? true : false}
                          value="Miss You"
                        >
                          Miss You
                        </option>
                        <option
                          selected={editModalData?.followUpType === 'Renewal' ? true : false}
                          value="Renewal"
                        >
                          Renewal
                        </option>
                        <option
                          selected={editModalData?.followUpType === 'Other' ? true : false}
                          value="Other"
                        >
                          Other
                        </option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelect" sm={2}></Label>
                    <Col sm={12}>
                      <Label for="exampleText">
                        <b>Response*</b>
                      </Label>
                      <Input
                        id="exampleSelect"
                        name="response"
                        type="select"
                        onChange={(e) =>
                          setEditModalData({ ...editModalData, [e.target.name]: e.target.value })
                        }
                      >
                        <option selected={editModalData?.response === '' ? true : false} value="">
                          Select Response
                        </option>
                        <option
                          selected={editModalData?.response === 'Left Message' ? true : false}
                          value="Left Message"
                        >
                          Left Message
                        </option>
                        <option
                          selected={editModalData?.response === 'No Answer' ? true : false}
                          value="No Answer"
                        >
                          No Answer
                        </option>
                        <option
                          selected={editModalData?.response === 'Answer' ? true : false}
                          value="Answer"
                        >
                          Answer
                        </option>
                        <option
                          selected={editModalData?.response === 'Other' ? true : false}
                          value="Other"
                        >
                          Other
                        </option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
                <Col xl="12">
                  <FormGroup>
                    <Label for="exampleText">
                      <b>Notes*</b>
                    </Label>
                    <Input
                      id="exampleText"
                      value={editModalData.note}
                      onChange={(e) =>
                        setEditModalData({ ...editModalData, [e.target.name]: e.target.value })
                      }
                      name="note"
                      type="textarea"
                      style={{ minHeight: '160px' }}
                    />
                  </FormGroup>
                </Col>
                <Col xl="12">
                  <div className="d-flex mt-0 justify-content-end">
                    <button type="submit" class="btn btn-primary">
                      Save Notes
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </ModalBody>
      </Modal>
    </>
  );
};
export default NoteModal;
