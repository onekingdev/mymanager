// ** React Imports
import { useState, useMemo, useEffect, useContext } from 'react';

// ** Custom Components
import Sidebar from '@components/sidebar';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  ButtonGroup,
  InputGroup,
  InputGroupText,
  Badge,
  Collapse
} from 'reactstrap';

import Select, { components } from 'react-select'; //eslint-disable-line

// ** Third Party Components
import Flatpickr from 'react-flatpickr';

// ** Custom Components
import Avatar from '@components/avatar';

import useMessage from '../../../../lib/useMessage';

// ** Icons Imports
import { CheckCircle, Calendar, Star, Inbox } from 'react-feather';

// ** actions
import { addTaskAction } from '../store/action';
import { contactListRequest } from '../../../contacts/store/actions';

// ** Utils
import { selectThemeColors } from '@utils';

import { useDispatch, useSelector } from 'react-redux';

// reducer
import { addTaskReset } from '../store/reducer';
import moment from 'moment';

import { SocketContext } from '../../../../utility/context/Socket';

const AddTaskSidebar = (props) => {
  const { open, toggleSidebar, selectedTask, addTaskSiderState, setAddTaskSiderState } = props;

  // ** State
  const [picker, setPicker] = useState(null);
  const [repeatId, setRepeatId] = useState(null);
  const [cSelected, setCSelected] = useState([]);
  const [repeatMonthSelected, setRepeatMonthSelected] = useState([]);
  const [assignedTo, setAssignedTo] = useState(null);

  const { error, success } = useMessage();
  // ** Hooks
  const dispatch = useDispatch();
  const { contactList } = useSelector((state) => state.totalContacts);
  const { userData } = useSelector((state) => state.auth);
  console.log(contactList);

  const socket = useContext(SocketContext);

  const onCheckboxBtnClick = (selected) => {
    let selectedDays = [...cSelected];
    const index = selectedDays.indexOf(selected);

    if (index < 0) {
      selectedDays.push(selected);
    } else {
      selectedDays.splice(index, 1);
    }
    setCSelected([...selectedDays]);
  };

  const initialTask = {
    _id: '',
    taskName: '',
    startDate: '',
    endDate: '',
    points: 0,
    repeatType: '',
    repeat: [],
    allowAsNa: false,
    isActive: true,
    assignee: {},
    emailNotification: false,
    email: ''
  };

  const repeatLabels = [
    { id: 1, title: 'Day' },
    { id: 2, title: 'Week' },
    { id: 3, title: 'Month' },
    { id: 4, title: 'Year' },
    { id: 5, title: 'Never' }
  ];

  const [task, setTask] = useState(initialTask);
  function changeHandler(event) {
    const { name, value } = event.target;
    setTask((p) => ({ ...p, [name]: value }));
  }

  function changeAssigneeHandler(data) {
    setTask((p) => ({ ...p, assignee: data }));
  }

  function changeRepeatTypeHandler(data) {
    setTask((p) => ({ ...p, repeatType: data.label }));
  }

  // Add redux state
  const { addTask } = useSelector((state) => state.tasks);

  const { loading, success: addSuccess, error: addError } = addTask;

  useMemo(() => {
    if (addSuccess) {
      // if add success
      success('New Task Added');

      // Reset Value
      setCSelected([]);
      setPicker([]);
      setRepeatId(null);
      setRepeatMonthSelected([]);
      setAssignedTo(null);
      setTask(initialTask);

      setAddTaskSiderState(false);
      dispatch(addTaskReset());
      // Close Sidebar
      toggleSidebar();
    }
  }, [addSuccess]);

  useEffect(() => {
    dispatch(
      contactListRequest({
        page: 1,
        pageSize: 100,
        text: ''
      })
    );
  }, [dispatch]);

  useEffect(() => {
    addTaskSiderState
      ? (setTask(initialTask),
        setPicker([]),
        setCSelected([]),
        setAssignedTo(null),
        setRepeatMonthSelected([]))
      : setTask(selectedTask);
  }, [addTaskSiderState]);

  function addTaskHandler() {
    const { taskName, startDate, endDate, points, repeatType, repeat, emailNotification, email } =
      task;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // validation
    if (taskName === '') {
      error('Task name must not empty !');
      return;
    }
    if (emailNotification && (email === undefined || email === '' || !email.match(validRegex))) {
      error('enter a valid email');
      return;
    }

    if (picker.length === 0) {
      error('The Task Date is not recommend!');
      return;
    }

    if (picker.length === 1) {
      error('The Task End Date is not recommend!');
      return;
    }

    if (!assignedTo) {
      error('Please select assignee for this task.');
      return;
    }
    // submit / Dispatch with date and repeat array
    const selectRepeatTypeArray = repeatLabels.filter((x) => x.id === repeatId.value);
    const monthArray = [];
    repeatMonthSelected.forEach((element) => {
      monthArray.push(element.value);
    });

    const startDateDay = moment(picker[0]).format('DD');
    const startDateMonth = moment(picker[0]).format('MM');
    const startDateYear = moment(picker[0]).format('YYYY');
    const startDateStr =
      startDateYear.toString() + startDateMonth.toString() + startDateDay.toString();
    const startDateMDStr = '2000' + startDateMonth.toString() + startDateDay.toString();

    const endDateDay = moment(picker[1]).format('DD');
    const endDateMonth = moment(picker[1]).format('MM');
    const endDateYear = moment(picker[1]).format('YYYY');
    const endDateStr = endDateYear.toString() + endDateMonth.toString() + endDateDay.toString();
    const endDateMDStr = '2000' + endDateMonth.toString() + endDateDay.toString();

    const dailyRepeatArr = [];
    for (let i = parseInt(startDateStr); i <= parseInt(endDateStr); i++)
      dailyRepeatArr.push(i.toString());
    const yearlyRepeatArr = [];
    for (let i = parseInt(startDateMDStr); i <= parseInt(endDateMDStr); i++)
      yearlyRepeatArr.push(i.toString());

    dispatch(
      addTaskAction({
        ...task,
        assignee: assignedTo,
        repeatType: selectRepeatTypeArray[0].title,
        repeat:
          repeatId.value === 1
            ? dailyRepeatArr
            : repeatId.value === 2
            ? cSelected
            : repeatId.value === 3
            ? monthArray
            : repeatId.value === 4
            ? yearlyRepeatArr
            : [startDateStr],
        startDate: picker[0],
        endDate: picker[1]
      })
    );
    socket.emit('newTaskForYou', {
      ...task,
      assignedTo,
      startDate,
      endDate,
      employerInfo: {
        fullName: userData?.fullName,
        email: userData?.email
      }
    });
  }

  const setSiderForm = (selectedTask) => {
    if (selectedTask?._id !== task?._id) {
      setTask(selectedTask);
      const repeatType = selectedTask?.repeatType;
      const selectRepeatId = repeatLabels.filter((x) => x.title === repeatType);
      setRepeatId({ value: selectRepeatId[0].id, label: selectRepeatId[0].title });
      switch (selectRepeatId[0].title) {
        case 'Week':
          setCSelected(selectedTask?.repeat);
          break;
        case 'Month':
          const repeatArr = selectedTask?.repeat.map((i) => {
            return { value: i, label: i.toString() };
          });
          setRepeatMonthSelected(repeatArr);
          break;
        default:
          break;
      }
      setPicker(selectedTask ? [selectedTask.startDate, selectedTask.endDate] : ['', '']);
      setAssignedTo(selectedTask ? selectedTask.assignee : null);
    }
  };

  useMemo(() => {
    if (selectedTask) setSiderForm(selectedTask);
  }, [selectedTask]);

  const assigneeOptions = contactList.list
    ? contactList.list.map((contact) => {
        return { value: contact._id, label: contact.fullName, img: contact.photo };
      })
    : null;

  const AssigneeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          {renderClient(data)}
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  const renderClient = (row) => {
    let tmpValue = 0;
    Array.from(row?.value).forEach((x, index) => {
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

    if (row?.img) {
      return <Avatar className="me-1" img={row.img} width="32" height="32" />;
    } else {
      return (
        <Avatar
          color={color || 'primary'}
          className="me-1"
          content={row.label || 'John Doe'}
          initials
        />
      );
    }
  };

  const RepeatComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  const repeatOptions = repeatLabels.map((x) => {
    return { value: x.id, label: x.title };
  });

  const RepeatMonthComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };
  const Arr = [];
  for (let i = 1; i <= 31; i++) Arr.push({ value: i, label: i.toString() });
  const repeatMonthOptions = Arr;

  return (
    <Sidebar
      size="lg"
      open={open}
      title={addTaskSiderState ? 'Add New Task' : 'Edit Task'}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={() => {
        toggleSidebar();
        if (selectedTask) {
          setSiderForm(selectedTask);
        }
        setAddTaskSiderState(false);
      }}
      // onClosed={handleSidebarClosed}
    >
      <Form>
        <Row>
          <Col sm="12">
            <Label className="form-label" for="nameVerticalIcons">
              Task Name
            </Label>
            <InputGroup className="input-group-merge mb-2">
              <InputGroupText>
                <CheckCircle size={15} />
              </InputGroupText>
              <Input
                type="text"
                name="taskName"
                onChange={changeHandler}
                id="nameVerticalIcons"
                placeholder="Task Name"
                value={task?.taskName}
              />
            </InputGroup>
          </Col>
          <Col sm="12">
            <Label className="form-label" for="date-time">
              Select Start Date/Time & End Date/Time
            </Label>
            <InputGroup className="input-group-merge mb-2">
              <InputGroupText className="border-end-0">
                <Calendar size={15} />
              </InputGroupText>
              <Flatpickr
                value={picker}
                data-enable-time
                id="date-time-picker"
                className="form-control"
                onChange={(date) => setPicker(date)}
                options={{
                  mode: 'range',
                  dateFormat: 'm-d-Y h:i K'
                  // minDate: 'today'
                }}
              />
            </InputGroup>
          </Col>
          {/* <Col sm="12">
            <Label className="form-label" for="points">
              Points
            </Label>
            <InputGroup className="input-group-merge mb-2">
              <InputGroupText>
                <Star size={15} />
              </InputGroupText>
              <Input
                onFocus={(e) => e.target.select()}
                type="number"
                name="points"
                onChange={changeHandler}
                id="point"
                placeholder="Employee get points for completion"
                value={task?.points}
              />
            </InputGroup>
          </Col> */}

          <Col sm="12">
            <Label className="form-label" for="repeat">
              Repeat
            </Label>
            <Select
              // id="board-title"
              value={
                task
                  ? task.repeatType === ''
                    ? null
                    : {
                        value: repeatLabels.filter((x) => x.title === task.repeatType)[0].id,
                        label: task.repeatType
                      }
                  : null
              }
              isClearable={false}
              className="react-select mb-2"
              classNamePrefix="select"
              options={repeatOptions}
              theme={selectThemeColors}
              onChange={(data) => {
                setRepeatId(data);
                changeRepeatTypeHandler(data);
              }}
              components={{ Option: RepeatComponent }}
            />
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
              {task ? (
                task.repeatType !== '' && repeatId ? (
                  repeatId.value === 1 ? (
                    <center>You have Select Every day</center>
                  ) : repeatId.value === 2 ? (
                    <ButtonGroup className="mb-2">
                      <Button
                        color="primary"
                        onClick={() => onCheckboxBtnClick('sunday')}
                        outline={!cSelected.includes('sunday')}
                      >
                        S
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => onCheckboxBtnClick('monday')}
                        outline={!cSelected.includes('monday')}
                      >
                        M
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => onCheckboxBtnClick('tuesday')}
                        outline={!cSelected.includes('tuesday')}
                      >
                        T
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => onCheckboxBtnClick('wednesday')}
                        outline={!cSelected.includes('wednesday')}
                      >
                        w
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => onCheckboxBtnClick('thursday')}
                        outline={!cSelected.includes('thursday')}
                      >
                        T
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => onCheckboxBtnClick('friday')}
                        outline={!cSelected.includes('friday')}
                      >
                        F
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => onCheckboxBtnClick('saturday')}
                        outline={!cSelected.includes('saturday')}
                      >
                        S
                      </Button>
                    </ButtonGroup>
                  ) : repeatId.value === 3 ? (
                    <>
                      <Select
                        isMulti
                        id="repeat-month-title"
                        value={repeatMonthSelected}
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        options={repeatMonthOptions}
                        theme={selectThemeColors}
                        onChange={(data) => setRepeatMonthSelected(data)}
                        components={{ Option: RepeatMonthComponent }}
                      />
                    </>
                  ) : repeatId.value === 4 ? (
                    <center>You have Select a day Every year.</center>
                  ) : (
                    <></>
                  )
                ) : null
              ) : null}
            </div>
          </Col>
          <Col sm="12">
            <Label className="form-label" for="assignee">
              Assignee
            </Label>
            <Select
              id="assignee"
              name="assignee"
              value={task?.assignee}
              isClearable={false}
              className="react-select mb-2"
              classNamePrefix="select"
              options={assigneeOptions}
              theme={selectThemeColors}
              onChange={(data) => {
                setAssignedTo(data);
                changeAssigneeHandler(data);
              }}
              components={{ Option: AssigneeComponent }}
            />
          </Col>
          <Col sm="12" className="mt-1 mb-2">
            <Label className="form-label" for="assignee">
              Email Notification
            </Label>
            <div className="form-switch">
              <Input
                type="switch"
                name="customSwitch"
                id="exampleCustomSwitch"
                defaultChecked={task?.emailNotification || false}
                onClick={(e) => {
                  setTask((p) => ({
                    ...p,
                    emailNotification: !p.emailNotification
                  }));
                }}
              />
              <Label
                for="exampleCustomSwitch"
                className="form-check-label-active"
                style={{ fontSize: '14px', marginTop: ' 0.2rem', marginLeft: '1rem' }}
              >
                {task?.emailNotification
                  ? 'You will receive e-mail for this task'
                  : 'You will not receive any e-mail'}
              </Label>
            </div>
          </Col>
          <Collapse isOpen={task?.emailNotification}>
            <Col sm="12">
              <Label className="form-label" for="reportTo">
                Send Report to
              </Label>
              <InputGroup className="input-group-merge mb-3" disabled={!task?.emailNotification}>
                <InputGroupText>
                  <Inbox size={15} />
                </InputGroupText>
                <Input
                  onFocus={(e) => e.target.select()}
                  type="text"
                  name="email"
                  onChange={changeHandler}
                  id="email"
                  placeholder="Email: john.doe@example"
                  value={task?.email}
                />
              </InputGroup>
            </Col>
          </Collapse>
          {/* <Col sm="12" className="mb-2">
            <div className="form-check">
              <Input
                type="checkbox"
                id="remember-me-vertical-icons"
                defaultChecked={task?.allowAsNa || false}
                onClick={(e) => {
                  setTask((p) => ({
                    ...p,
                    allowAsNa: !p.allowAsNa
                  }));
                }}
              />
              <Label className="form-check-label" for="remember-me-vertical-icons">
                Allow user to mark as N/A
              </Label>
            </div>
          </Col>
          <Col sm="12" className="mb-3">
            <div className="form-switch">
              <Input
                type="switch"
                name="customSwitch"
                id="exampleCustomSwitch"
                defaultChecked={task?.isActive || false}
                onClick={(e) => {
                  setTask((p) => ({
                    ...p,
                    isActive: !p.isActive
                  }));
                }}
              />
              <Label for="exampleCustomSwitch" className="form-check-label-active">
                {task?.isActive ? 'Active' : 'Inactive'}
              </Label>
            </div>
          </Col> */}
          <Col sm="12">
            <div className="d-flex">
              <Button
                className="me-1"
                color="primary"
                type="button"
                onClick={addTaskHandler}
                disabled={loading}
              >
                {loading ? 'loading...' : addTaskSiderState ? ' Create' : ' Update'}
              </Button>
              <Button outline color="secondary" type="reset" onClick={toggleSidebar}>
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Sidebar>
  );
};

export default AddTaskSidebar;
