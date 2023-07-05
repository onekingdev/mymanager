// ** React Imports
import { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';
import AvatarGroup from '@components/avatar-group';
import DataTable from 'react-data-table-component';

// ** Blank Avatar Image
import blankAvatar from '@src/assets/images/avatars/avatar-blank.png';

// ** Third Party Components
import classnames from 'classnames';
import { ReactSortable } from 'react-sortablejs';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Menu,
  Search,
  MoreVertical,
  ChevronDown,
  Edit,
  Trash2,
  Star,
  Copy,
  Trash,
  Info,
  Share2,
  Plus,
  Filter,
  Users,
  Columns,
  Calendar,
  List,
  CheckCircle
} from 'react-feather';

// ** Reactstrap Imports
import {
  Input,
  Button,
  Badge,
  InputGroup,
  InputGroupText,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip
} from 'reactstrap';

import Select, { components, StylesConfig } from 'react-select';
import styled from 'styled-components';

// ** Import Components
import NewModal from '../../taskngoals/NewModal';

// ** Styles
import '@styles/react/libs/drag-and-drop/drag-and-drop.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { cvtColor } from '../../contacts/contact-list/constants';
import { FiEdit3, FiSettings } from 'react-icons/fi';
import StatusManage from './StatusManage';
import { deleteTask, getActivity, updateTaskStatus } from '../../apps/kanban/store';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { formatDateTime } from '../../../utility/Utils';
import Confetti from 'react-confetti';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { TbNewSection, TbStatusChange } from 'react-icons/tb';
import { AiOutlineDelete } from 'react-icons/ai';
import { CgRowFirst } from 'react-icons/cg';
import SelectCreateModal from './template/SelectCreateModal';

const ReactSelect = styled(Select)`
  .Select-control {
    height: 26px;
    font-size: small;
    .Select-placeholder {
      line-height: 26px;
      font-size: small;
    }

    .Select-value {
      line-height: 26px;
    }

    .Select-input {
      height: 26px;
      font-size: small;
    }
  }
`;
const badgeColor = ['danger', 'primary', 'success', 'warning', 'info', 'secondary'];

const Tasks = (props) => {
  // ** Props
  const {
    store,
    labelColors,
    dispatch,
    selectedStatus,
    selectTask,
    handleTaskSidebar,
    handleMainSidebar
  } = props;

  const workspaceId = useSelector((state) => state?.workspace?.selectedWorkspace?._id);
  const activity = useSelector((state) => state?.kanban?.activity);
  // ** States
  const [delBtnEnable, setDelBtnEnable] = useState(false);
  const [query, setQuery] = useState('');
  const [taskSearchResult, setTaskSearchResult] = useState(store.tasks);
  const [deleteTaskArr, setDeleteTaskArr] = useState([]);
  const [modalType, setModalType] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [statusRowID, setStatusRowID] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);

  const paramsURL = useParams();

  useEffect(() => {
    dispatch(getActivity());
    setTaskSearchResult(store.tasks);
  }, [store.tasks]);

  var params = {
    filter: paramsURL.filter || '',
    q: '',
    sortBy: '',
    tag: paramsURL.tag || ''
  };

  // ** Function to selectTask on click
  const handleTaskClick = (obj) => {
    dispatch(selectTask(obj));
    handleTaskSidebar();
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
    return <div className="own-avatar-group">{data.map((row) => renderAssignee(row))}</div>;
  };

  const handleRowSelected = (e) => {
    setDelBtnEnable(e.selectedRows.length > 0);
    setDeleteTaskArr(e.selectedRows);
  };

  const toggleCreate = () => setOpenCreate(!openCreate);
  const handleOpenCreate = () => {
    toggleCreate();
    //setModalType(2)
  };

  useEffect(() => {
    let resultData = store.tasks;
    if (selectedStatus?.status?._id) {
      resultData = store.tasks.filter((x) => x.boardId == selectedStatus?.status?._id);
    }
    setTaskSearchResult(resultData);
  }, [selectedStatus, store.tasks]);

  // ** Search Tasks
  const taskSearch = (searchParams) => {
    let resultData = store.tasks;
    if (searchParams.q) {
      resultData = store.tasks.filter((x) => {
        let searchTxt = `${x.title}${x.description}${x.labels}`;
        x.assignedTo.forEach((element) => {
          searchTxt += element.title;
        });
        return searchTxt.toLowerCase().indexOf(searchParams.q) > -1;
      });
    }
    setTaskSearchResult(resultData);
  };

  // ** Renders Avatar
  const renderAvatar = (obj) => {
    const item = obj.assignedTo;

    return item.length ? (
      <div>{renderAssignees(item)}</div>
    ) : (
      <Avatar img={blankAvatar} imgHeight="32" imgWidth="32" />
    );
  };

  const getOptionLabel = (option) => option.label;
  const getOptionValue = (option) => option.value;

  // ** Status Select Option
  const statusOptions = store.boards.map((x) => {
    return {
      value: x._id,
      label: x.title
    };
  });

  const statusObj = {
    done: 'light-success',
    close: 'light-dark'
  };

  store?.boards?.map((x) => {
    statusObj[x.title] = x.color || 'primary';
  });

  const dot = () => ({
    alignItems: 'center',
    minWidth: '140px',
    cursor: 'pointer'
  });

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: `${cvtColor[statusObj[state.data.label]]} !important;`,
      color: statusObj[state.data.label] == 'light' ? '#333 !important;' : '#fff !important;'
    }),

    input: (styles) => ({ ...styles, ...dot() }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.selectProps.value.label === 'done' ? '#fff !important;' : '#fff !important;'
    }),

    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.selectProps.value
        ? `${cvtColor[statusObj[state.selectProps.value.label]]} !important;`
        : '#174ae7 !important;'
    })
  };

  const renderActivity = (activity) => {
    switch (activity) {
      case 'Task Created':
        return (
          <>
            <TbNewSection size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      case 'Task Updated':
        return (
          <>
            <FiEdit3 size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      case 'Task Status':
        return (
          <>
            <TbStatusChange size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      case 'Status Created':
        return (
          <>
            <TbNewSection size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      case 'Status Updated':
        return (
          <>
            <FiEdit3 size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      case 'Status Removed':
        return (
          <>
            <AiOutlineDelete size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      default:
        return (
          <>
            <CgRowFirst size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
    }
  };

  const columns = [
    {
      name: 'TASK NAME',
      sortable: true,
      minWidth: '320px',
      selector: (row) => row.title,
      cell: (row) => {
        let startDate = row.createdAt ? formatDateTime(row.createdAt) : 'Not Selected';
        let endDate = row.dueDate ? formatDateTime(row.dueDate) : 'Not Selected';

        return (
          <div
            className="d-flex align-items-center"
            style={{ cursor: 'pointer', position: 'absolute', left: 0 }}
          >
            <div onClick={() => handleTaskClick(row)}>
              <div style={{ fontWeight: 'bold' }}>{row.title}</div>
              {`${startDate} - ${endDate}`}
            </div>
          </div>
        );
      }
    },
    {
      name: 'LABELS',
      cell: (row) => {
        return (
          <div>
            {row.labels.map((label, index) => {
              const isLastChip = row.labels[row.labels.length - 1] === label;
              return (
                <Badge
                  pill
                  key={`badge-${row?._id}-${index}`}
                  label={label}
                  color={labelColors[label]}
                  className={classnames({ 'me-75': !isLastChip })}
                  style={{ margin: '2px 0' }}
                >
                  {label}
                </Badge>
              );
            })}
          </div>
        );
      }
    },
    {
      name: 'ASSIGNEES',
      maxWidth: '12%',
      selector: (row) => (row.assignedTo ? renderAvatar(row) : null)
    },
    {
      name: 'STATUS',
      sortable: true,
      maxWidth: '20%',
      minWidth: '165px',
      selector: (row) => store.boards.filter((x) => x._id === row.boardId)[0]?.title || '',
      cell: (row) => {
        return (
          <div
            className="project-status-container"
            style={{
              position: 'relative',
              cursor: 'pointer',
              color: '#fff'
            }}
          >
            <ReactSelect
              options={statusOptions}
              value={statusOptions.find((x) => x.value == row?.boardId)}
              onChange={(data) => {
                // Update Status
                dispatch(
                  updateTaskStatus({
                    taskId: row?._id,
                    boardId: row?.boardId,
                    newBoardId: data?.value,
                    workspaceId: workspaceId
                  })
                ).then((res) => {
                  if (res?.payload?.status == 200) {
                    if (data.label == 'DONE') {
                      setShowConfetti(true);
                      setStatusRowID(row._id);
                    }
                  }
                });
                // Activity
              }}
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              isSearchable={true}
              styles={customStyles}
              menuPortalTarget={document.body}
            />
            {showConfetti && statusRowID === row._id ? (
              <Confetti
                width={200}
                height={50}
                recycle={false}
                numberOfPieces={500}
                gravity={0.2}
                initialVelocityX={{ min: -10, max: 10 }}
                initialVelocityY={{ min: -10, max: 10 }}
                onConfettiComplete={() => setShowConfetti(false)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ) : null}
          </div>
        );
      }
    },
    {
      name: 'LAST ACTIVITY',
      maxWidth: '35%',
      minWidth: '320px',
      selector: (row) => row?.lastActivity,
      cell: (row) => {
        const filteredActivity = activity
          .filter((x) => x.kanbanId == row?._id)
          .sort((a, b) => {
            new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime();
          });
        return (
          <>
            {filteredActivity.length ? (
              <>
                <div className="me-1">{renderActivity(filteredActivity[0]?.activity)}</div>
                <div>
                  {filteredActivity[0]?.prev ? (
                    <div className="d-flex align-items-center">
                      <div
                        style={{
                          backgroundColor: cvtColor[filteredActivity[0]?.prevColor || 'secondary'],
                          color: filteredActivity[0]?.prevColor?.includes('light')
                            ? cvtColor[filteredActivity[0]?.prevColor?.slice(6)]
                            : '#fff',
                          padding: '8px',
                          borderRadius: '5px',
                          textAlign: 'center',
                          fontWeight: 500
                        }}
                      >
                        {filteredActivity[0]?.prev}
                      </div>
                      <div style={{ paddingInline: '2px' }}>
                        <MdOutlineKeyboardArrowRight size={18} />
                      </div>
                      <div
                        style={{
                          backgroundColor:
                            cvtColor[filteredActivity[0]?.currentColor || 'secondary'],
                          color: filteredActivity[0]?.currentColor.includes('light')
                            ? cvtColor[filteredActivity[0]?.currentColor?.slice(6)]
                            : '#fff',
                          padding: '8px',
                          borderRadius: '5px',
                          textAlign: 'center',
                          fontWeight: 500
                        }}
                      >
                        {filteredActivity[0]?.current}
                      </div>
                    </div>
                  ) : filteredActivity[0]?.currentColor ? (
                    <div
                      style={{
                        backgroundColor: cvtColor[filteredActivity[0]?.currentColor || 'secondary'],
                        color: filteredActivity[0]?.currentColor.includes('light')
                          ? cvtColor[filteredActivity[0]?.currentColor?.slice(6)]
                          : '#fff',
                        padding: '8px',
                        borderRadius: '5px',
                        textAlign: 'center',
                        fontWeight: 500
                      }}
                    >
                      {filteredActivity[0]?.current}
                    </div>
                  ) : (
                    <b>{filteredActivity[0]?.current}</b>
                  )}
                </div>
              </>
            ) : null}
          </>
        );
      }
    },
    {
      name: 'ACTION',
      maxWidth: '5%',
      cell: (row) => {
        return (
          <div className="column-action" style={{ marginLeft: '1.2rem' }}>
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn btn-sm"
                tag="div"
                href="/"
                onClick={(e) => e.preventDefault()}
              >
                <MoreVertical className="text-body" size={16} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem
                  tag={'span'}
                  className="w-100"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTaskClick(row);
                  }}
                >
                  <Edit size={'14px'} style={{ marginRight: '10px' }} />
                  Edit
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      }
    }
  ];
  // ** Render Goals
  console.log('taskSearchResult', taskSearchResult);
  const renderListTasks = () => {
    return (
      <div className="list-group task-task-list-wrapper">
        {taskSearchResult.length ? (
          // <ReactSortable
          //   tag="ul"
          //   list={taskSearchResult}
          //   handle=".drag-icon"
          //   className="task-task-list media-list"
          //   setList={(newState) => handleSetList(newState)}
          //   overFlowY="auto"
          // >
          <DataTable
            className="react-dataTable"
            noHeader
            responsive
            pagination
            columns={columns}
            data={taskSearchResult}
            onRowClicked={handleTaskClick}
            style={{ cursor: 'pointer' }}
            sortIcon={<ChevronDown size={14} />}
            onSelectedRowsChange={handleRowSelected}
            selectableRows
          />
        ) : (
          // </ReactSortable>
          <div className="no-results show">
            <h5>
              No Items Found.
              {!store.boards.length ? (
                <>
                  <br />
                  <br /> Please create a new board using the top right corner first button.
                  <br />
                  <br /> And then create a new task using the second button.
                </>
              ) : (
                !store.tasks.length && (
                  <>
                    <br />
                    <br /> Please create a new task using the top right corner "+" button.
                  </>
                )
              )}
            </h5>
          </div>
        )}
      </div>
    );
  };

  // ** Function to taskSearch based on search query
  const handleFilter = (e) => {
    setQuery(e.target.value);
    params.q = e.target.value;
    params.sortBy = '';
    taskSearch(params);
  };

  const handleSetList = (e) => {};

  return (
    <div className="task-app-list">
      <div className="app-fixed-search d-flex align-items-center me-1 w-100">
        <div
          className="sidebar-toggle cursor-pointer d-block d-lg-none ms-1"
          onClick={handleMainSidebar}
        >
          <Menu size={21} />
        </div>
        <div className="d-flex align-content-center justify-content-between w-100 me-1">
          <InputGroup>
            <InputGroupText>
              <Search className="text-muted" size={14} />
            </InputGroupText>
            <Input placeholder="Search Task" value={query} onChange={handleFilter} />
          </InputGroup>
        </div>
        <div className="d-flex">
          <Button.Ripple
            className="btn-icon me-1 p-50"
            outline
            color="primary"
            onClick={handleOpenCreate}
            disabled={!store.boards.length}
          >
            <Plus size={18} />
          </Button.Ripple>
          <Button.Ripple
            className="btn-icon p-50"
            outline
            color="primary"
            onClick={() =>
              Swal.fire({
                title: 'Delete?',
                text: 'Are you sure you want to delete the selected task(s)?',
                // icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Delete anyway',
                cancelButtonText: 'Cancel',
                customClass: {
                  confirmButton: 'btn btn-danger',
                  cancelButton: 'btn btn-outline-danger ms-1'
                },
                buttonsStyling: false
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(
                    deleteTask({
                      tasks: deleteTaskArr,
                      workspaceId: store.selectedWorkspace._id
                    })
                  );
                  setDeleteTaskArr([]);
                  setDelBtnEnable(false);
                  setModalType(null);
                  Swal.fire('Deleted!', 'The task(s) have been deleted.', 'success');
                }
              })
            }
            disabled={!delBtnEnable}
          >
            <Trash size={18} />
          </Button.Ripple>
        </div>
        <NewModal
          store={store}
          dispatch={dispatch}
          modalType={modalType}
          deleteTaskArr={deleteTaskArr}
          setDeleteTaskArr={setDeleteTaskArr}
          setModalType={setModalType}
          setDelBtnEnable={setDelBtnEnable}
        />
      </div>
      <SelectCreateModal toggle={toggleCreate} open={openCreate} setModalType={setModalType} />
      <PerfectScrollbar
        className="list-group task-list-wrapper bg-opacity-10"
        options={{ wheelPropagation: false }}
      >
        {renderListTasks()}
      </PerfectScrollbar>
      <StatusManage modalType={toggle} store={store} setModalType={setToggle} />
    </div>
  );
};

export default Tasks;
