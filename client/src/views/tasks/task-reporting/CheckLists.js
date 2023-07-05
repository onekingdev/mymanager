// ** React Imports
import { useState, Fragment, useMemo, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@components/avatar';
import { UploadCloud } from 'react-feather';
import { getUserData } from '../../../utility/Utils';

// ** Reactstrap Imports
import {
  Badge,
  Input,
  ListGroup,
  ListGroupItem,
  Progress,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';

import { workingTaskListAction, workingTaskListPastDueAction } from './store/action';
import { fetchTaskListAction } from './store/action';
import PerfectScrollbar from 'react-perfect-scrollbar';

import moment from 'moment';

// ** Icons Import
import { Search, MoreVertical } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';

import { SocketContext } from '../../../utility/context/Socket';
import { toast, Slide } from 'react-toastify';

const NewTaskCreated = ({ taskName, startDate, endDate, employerInfo }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<UploadCloud size={16} />} />
        <h6 className="toast-title fw-bold">Welcome, {getUserData().fullName}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        <b>{employerInfo.fullName}</b> created task <strong>{taskName}</strong>
        .
        <br />
        Please check the task.
      </span>
    </div>
  </Fragment>
);

const CheckLists = (props) => {
  // const [active, setActive] = useState(false);
  const [selectedWorkingTask, setSelectedWorkingTask] = useState(null);
  const { selectedWorkingCheckList, setSelectedWorkingCheckList, activeTab, selectDate } = props;

  const socket = useContext(SocketContext);

  const [tasks, setTasks] = useState([]);
  const { workingTaskList, workingTaskListPastDue } = useSelector((state) => state.tasks);

  const taskClickHandler = (task) => {
    setSelectedWorkingCheckList(task);
    setSelectedWorkingTask(task);
  };
  const dispatch = useDispatch();

  const initialOptions = {
    sort: 1,
    sortByDate: false,
    selectDate: selectDate
  };

  const [options, setOptions] = useState(initialOptions);

  useEffect(() => {
    socket.on('refreshTask', (data) => {
      dispatch(workingTaskListAction({ ...options, selectDate: selectDate }));
      if (selectedWorkingTask) {
        setSelectedWorkingCheckList((p) => {
          return {
            ...p,
            completedEditor: false,
            schedule: [
              {
                ...p?.schedule[0],
                checkList: data
              }
            ]
          };
        });
      }
    });

    return () => {
      socket.off('refreshTask');
    };
  });

  // Search Text
  const [text, setText] = useState('');
  const [sort, setSort] = useState('');

  function formatData(data, searchText, sortVal) {
    let list = [];
    for (let task of data) {
      const checkListLength = task?.checkList?.length;
      const completedTodosLen = task?.schedule[0]?.checkList?.length;
      if (activeTab === 'completed') {
        // const checkListLength = task?.checkList?.length;
        // const completedTodosLen = task?.schedule[0]?.checkList?.length;
        if (completedTodosLen >= checkListLength) {
          list.push(task);
        }
      } else if (activeTab === 'today') {
        // Push All todays Task
        // list = list.filter((x) => x?.checkList?.length !== x?.schedule[0]?.checkList?.length);

        // list.push(task);

        if (completedTodosLen < checkListLength) {
          list.push(task);
        }
      }
    }

    if (searchText !== '') {
      list = list.filter(
        (x) => String(x.taskName).toLowerCase().indexOf(String(searchText).toLowerCase()) > -1
      );
    }

    // If Sort has value then sort data

    if (sortVal !== '') {
      if (sortVal === 'asc') {
        // accending sort
        list = list.sort((a, b) => String(a.taskName).localeCompare(b.taskName));
      }

      if (sortVal === 'desc') {
        // descending sort
        list = list.sort((a, b) => String(b.taskName).localeCompare(a.taskName));
      }

      if (sortVal === 'time') {
        // Date time sort
        list = list.sort((a, b) => {
          var c = new Date(a?.startDate);
          var d = new Date(b?.startDate);
          return c - d;
        });
      }
    }

    list = list.filter((x) => x?.checkList?.length > 0);

    setTasks(list);
  }

  function genBadgeColor(str) {
    let tmpValue = 0;
    Array.from(str).forEach((x, index) => {
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
      ];
    return states[stateNum];
  }

  function renderStafPhoto(data) {
    const { img, value, label } = data;
    if (img === '') {
      return (
        <Avatar
          content={label}
          color={genBadgeColor(label)}
          imgHeight="38"
          imgWidth="38"
          initials
        />
      );
    } else {
      return <Avatar img={img} imgHeight="38" imgWidth="38" initials />;
    }
    // }
  }

  useEffect(() => setSelectedWorkingTask(null), [selectDate, activeTab]);

  useMemo(() => {
    if (workingTaskList && workingTaskList?.list?.length > 0) {
      if (activeTab !== 'past-due') {
        formatData(workingTaskList?.list, text, sort);
      }
    } else formatData([], text, sort);
  }, [workingTaskList, selectDate, activeTab, text, sort]);

  useMemo(() => {
    dispatch(workingTaskListAction({ ...options, selectDate: selectDate }));
  }, [dispatch, selectDate, selectedWorkingCheckList]);

  // useMemo(() => {
  //   if (activeTab === 'past-due') {
  //     dispatch(workingTaskListPastDueAction({ ...options, selectDate: selectDate }));
  //   }
  // }, [activeTab, selectDate]);

  const getDiffTime = (fromDateTime, toDateTime) => {
    const first = moment({ h: fromDateTime.hours(), m: fromDateTime.minutes() }),
      second = moment({ h: toDateTime.hours(), m: toDateTime.minutes() });
    const diffTime = parseInt(second.diff(first, 'minutes'));
    const mHours = Math.floor(diffTime / 60);
    const mMins = diffTime % 60;

    if (diffTime > 0) {
      return `In ${mHours} hour ${mMins} min`;
    } else {
      return `Pass ${-mHours} hour ${-mMins} min`;
    }
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <div style={{ width: '100%' }}>
          <div className="d-flex align-content-center justify-content-between w-100">
            <InputGroup className="input-group-merge border-0 shadow-none">
              <InputGroupText className="input-group-merge border-1 shadow-none">
                <Search className="text-muted" size={14} />
              </InputGroupText>
              <Input
                className="border-1"
                placeholder="Search task"
                onChange={(e) => setText(e.target.value)}
                // value={query}
                // onChange={handleFilter}
              />
              <InputGroupText className="input-group-merge border-1 shadow-none">
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="hide-arrow"
                    tag="a"
                    href="/"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MoreVertical className="text-body" size={16} />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem
                      tag={Link}
                      to="/"
                      onClick={(e) => {
                        e.preventDefault();
                        setSort('asc');
                      }}
                    >
                      Sort A-Z
                    </DropdownItem>
                    <DropdownItem
                      tag={Link}
                      to="/"
                      onClick={(e) => {
                        e.preventDefault();
                        setSort('desc');
                      }}
                    >
                      Sort Z-A
                    </DropdownItem>
                    <DropdownItem
                      tag={Link}
                      to="/"
                      onClick={(e) => {
                        e.preventDefault();
                        setSort('time');
                      }}
                    >
                      Short By Time
                    </DropdownItem>
                    <DropdownItem
                      tag={Link}
                      to="/"
                      onClick={(e) => {
                        e.preventDefault();
                        setSort('');
                      }}
                    >
                      Reset Sort
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </InputGroupText>
            </InputGroup>
          </div>
        </div>
        <div></div>
      </div>
      {tasks.length === 0 ? (
        <ListGroup>
          <ListGroupItem
            key={'empty-list'}
            action
            // className="bg-primary"
            className="bg-white"
            style={{
              textAlign: 'center',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div className="task-name empty-list">
              <img style={{ width: '100px', height: '100px' }} src="/empty.svg" alt="" />
              <br />
              <span style={{ paddingLeft: 15 }}> Task is empty </span>
            </div>
          </ListGroupItem>
        </ListGroup>
      ) : (
        <ListGroup tag="div">
          {/* {activeTab !== 'past-due' && */}
          <PerfectScrollbar
            className="checklist-scroll"
            // options={{ wheelPropagation: false }}
            containerRef={(ref) => {
              if (ref) {
                ref._getBoundingClientRect = ref.getBoundingClientRect;

                ref.getBoundingClientRect = () => {
                  const original = ref._getBoundingClientRect();

                  return {
                    ...original,
                    height: Math.floor(original.height)
                  };
                };
              }
            }}
          >
            {tasks.map((task) => (
              <ListGroupItem
                key={task._id}
                action
                onClick={() => taskClickHandler(task)}
                active={task._id == selectedWorkingTask?._id}
                // className={active ? 'bg-primary' : 'bg-white'}
              >
                <div className="d-flex justify-content-between align-items-center w-100 mb-1">
                  <div style={{ fontWeight: 800 }}>{task?.taskName}</div>
                  <div className="d-flex align-items-center">
                    {/* <div style={{ marginRight: '0.5rem' }}>
                      <Badge
                        key={`badge_${Math.floor(Math.random() * 1000 + Math.random() * 1000)}`}
                        pill
                        color="light-warning"
                        style={{ fontSize: '12px', fontWeight: 800 }}
                      >
                        {task?.freeze[0]?.status ? 'Freezed' : ''}
                      </Badge>
                    </div> */}
                    <div className="assignee_avatar">
                      {task?.assignee && renderStafPhoto(task?.assignee)}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <small className="text-secondary">
                      {activeTab === 'past-due' && moment(task?.schedule[0]?._date).format('L')}
                    </small>
                  </div>
                  <div className="mb-1">
                    {/* <span className={active ? 'text-white' : 'text-black'}> */}
                    {moment(task?.startDate).format('h:mm A')} (
                    {getDiffTime(moment(new Date()), moment(task?.startDate))})
                  </div>
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        {task?.schedule[0]?.checkList?.length}/{task?.checkList?.length}
                      </div>
                      <div>
                        {isNaN(
                          parseFloat(
                            (task?.schedule[0]?.checkList?.length / task?.checkList?.length) * 100
                          ).toFixed(2)
                        )
                          ? '0.00'
                          : parseFloat(
                              (task?.schedule[0]?.checkList?.length / task?.checkList?.length) * 100
                            ).toFixed(2)}
                        %
                      </div>
                    </div>
                  </div>
                  <Progress
                    // className="progress-bar-success"
                    value={parseFloat(
                      (task?.schedule[0]?.checkList?.length / task?.checkList?.length) * 100
                    ).toFixed(2)}
                  />
                </div>
              </ListGroupItem>
            ))}
          </PerfectScrollbar>
        </ListGroup>
      )}
    </Fragment>
  );
};
export default CheckLists;
