import { Fragment, useEffect, useState, useRef } from 'react';
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png';
import EmpCheckinSidebar from './EmpCheckinSidebar';
import classnames from 'classnames';
import {
  Col,
  NavLink,
  Card,
  Nav,
  Row,
  TabContent,
  TabPane,
  FormGroup,
  Label,
  Input,
  InputGroup,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ButtonGroup
} from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import BudetTool from './BudgetTool';
import LaborTool from './LaborTool';
import {
  User,
  ChevronDown,
  ChevronUp,
  Edit2,
  Plus,
  Clock,
  MoreVertical,
  Move,
  Award
} from 'react-feather';
import moment from 'moment';
import AddEmpolye from './AddEmpolye';
import { data } from './data';
import { useGetEmployeePosition } from '../../../requests/contacts/employee-contacts';
import { shiftAddAction, shiftUpdateAction } from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployeeShiftAction } from './store/actions';
import { contactUpdateByIdAction, employeeListRequest } from '../store/actions';
import { formatAmPmTime, celToFaConverter } from '../../../utility/Utils';
import EditLocationModal from './EditLocationModal';
import { toast } from 'react-toastify';
// Draggable
//import Draggable, { DraggableCore } from 'react-draggable';
// ** const weather = [Sun]
const weekDay = [
  {
    id: 0,
    name: 'Sun'
  },
  {
    id: 1,
    name: 'Mon'
  },
  {
    id: 2,
    name: 'Tue'
  },
  {
    id: 3,
    name: 'Wed'
  },
  {
    id: 4,
    name: 'Thu'
  },
  {
    id: 5,
    name: 'Fri'
  },
  {
    id: 6,
    name: 'Sat'
  }
];

// ** Shift Sticky
const ShiftSticky = (props) => {
  const {
    stickyInfo,
    stickyIndex,
    employeeId,
    openUpdateShiftModalHandler,
    setIsSelect,
    handleShiftDragStart,
    setExistedShift
  } = props;
  const stickyId = stickyInfo._id;
  const stickyNote = stickyInfo.note;
  const stickyStart = stickyInfo.start;
  const stickyEnd = stickyInfo.end;
  const stickyWeekDay = stickyInfo.weekDay;
  const shiftClickHandler = (e) => {
    openUpdateShiftModalHandler({
      stickyStart,
      stickyEnd,
      stickyWeekDay,
      stickyNote,
      stickyIndex,
      stickyId
    });
    setIsSelect(true);
    setExistedShift(stickyInfo);
  };
  return (
    <div
      className="d-flex justify-content-between align-items-center position-relative cursor-pointer"
      style={{
        background: '#ffeec9',
        height: '28px'
      }}
      draggable="true"
      onClick={(e) => shiftClickHandler(e)}
      onDragStart={(e) => handleShiftDragStart(e, stickyId, employeeId)}
    >
      <div
        className="bg-primary h-100 d-flex justify-content-center align-items-center text-white"
        style={{ width: '20px' }}
      >
        <MoreVertical size={15} className="" />
      </div>
      <div className="d-flex">
        <span className="font-small-2 d-block lh-lg">
          {stickyStart == '' ? '09:00 AM' : formatAmPmTime(stickyStart)} -{' '}
          {stickyEnd == '' ? '05:00 PM' : formatAmPmTime(stickyEnd)}
        </span>
      </div>
      <Edit2 size={16} className="position-relative" />
    </div>
  );
};

// ** Main Render Part
const WeekCalender = (props) => {
  // ** Initials
  const dispatch = useDispatch();

  const { arrToMap, setArrToMap, sidebarOpen, setSidebarOpen, toggleSidebar } = props;
  // ** States
  const [empArrToMap, setEmpArrToMap] = useState([]);
  const [empShowArrToMap, setEmpShowArrToMap] = useState([]);
  const [empNoPositionArrToMap, setEmpNoPositionArrToMap] = useState([]);
  const [allShifts, setAllShifts] = useState([]);
  const [hasShiftNum, setHasShiftNum] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [shiftUpdateId, setShiftUpdateId] = useState(0);
  // *** Zip code
  const [openEditZip, setOpenEditZip] = useState(false);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  let lastZipCode = localStorage.getItem('location');
  const [zipCode, setZipCode] = useState(lastZipCode ? parseInt(lastZipCode) : 94040);
  const [postsPerPage] = useState(5);
  const [currentDate, setCurrentDate] = useState(moment());
  const [days, setDays] = useState([]);
  const [active, setActive] = useState('1');
  const [openfooter, setopenfooter] = useState(false);

  // ** Open Create Schedule Modal
  const [isSelect, setIsSelect] = useState(true);
  const [shiftName, setShiftName] = useState('');
  const [openShiftModal, setOpenShiftModal] = useState(false);
  const [shiftStartTime, setShiftStartTime] = useState('09:00');
  const [shiftEndTime, setShiftEndTime] = useState('05:00');
  const [shiftWeekDay, setShiftWeekDay] = useState([]);
  const [shiftNote, setShiftNote] = useState('');
  const [shiftCurIndex, setShiftCurIndex] = useState(0);
  const [selectableShifts, setSelectableShifts] = useState([]);
  const [existedShift, setExistedShift] = useState({});
  const [shiftNumber, setShiftNumber] = useState(0);

  const [deadline, setDeadline] = useState('');
  // *** Open Update Schedule Modal
  const [openUpdateShiftModal, setOpenUpdateShiftModal] = useState(false);

  const [tableData, setTableData] = useState([]);

  // *** Employee Position
  const [employeePosition, setEmployeePostion] = useState([]);
  const [isActive, setIsActive] = useState(false);

  // *** Get current place weather
  const [weatherResult, setWeatherResult] = useState({});

  const [dragData, setDragData] = useState({});
  const [shiftDragData, setShiftDragData] = useState({});
  // ** Redux Store
  const employeeScheduleState = useSelector((state) => state?.employeeSchedule);
  // *** Employee List To Display
  const employeeList = useSelector((state) => state.totalContacts?.employeeList);
  // *** Employee Category List
  const employeeCategoryList = useSelector(
    (state) => state.employeeContact?.employeeCategory?.data
  );
  // ** Fetch Data
  const {
    data: employeesPositionArr,
    refetch,
    isLoading: positionLoading
  } = useGetEmployeePosition();

  // ** Effects
  useEffect(() => {
    dispatch(employeeListRequest());
    setIsActive(false);
  }, []);

  useEffect(() => {
    dispatch(getAllEmployeeShiftAction());
  }, []);

  useEffect(() => {
    const daysInWeek = [];
    for (let i = 0; i < 7; i++) {
      daysInWeek.push(moment().add(i, 'days'));
    }
    setDays(daysInWeek);
  }, [currentDate]);
  useEffect(() => {
    const fetchData = async () => {
      if (zipCode > 9999) {
        await fetch(
          `${process.env.REACT_APP_API_WEATHER_URL}/forecast?zip=${zipCode}&cnt=7&units=metric&APPID=${process.env.REACT_APP_API_WEATHER_KEY}`
        )
          .then((res) => res.json())
          .then((result) => {
            if (result.cod == '200') {
              setWeatherResult(result);
            } else {
              toast.error('Invalid Zip Code');
              return;
            }
          });
      } else {
        return;
      }
    };
    fetchData();
  }, [zipCode]);
  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_ZIP_URL}${process.env.REACT_APP_API_ZIP_KEY}/info.json/` +
          `${zipCode}` +
          '/degrees',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        }
      )
        .then((res) => res.json())
        .then((result) => {
          setCountry(result.state);
          setCity(result.city);
        });
    };
    fetchData();
  }, [zipCode]);

  // ***  Number of each day
  useEffect(() => {
    setAllShifts(employeeScheduleState?.shifts?.shiftList);
    let monLen = 0,
      tueLen = 0,
      wedLen = 0,
      thuLen = 0,
      friLen = 0,
      satLen = 0,
      sunLen = 0;
    employeeScheduleState?.shifts?.shiftList.map((shift, index) => {
      if (shift.isOpen == false) {
        if (shift.weekDay == 0) {
          monLen++;
        } else if (shift.weekDay == 1) {
          tueLen++;
        } else if (shift.weekDay == 2) {
          wedLen++;
        } else if (shift.weekDay == 3) {
          thuLen++;
        } else if (shift.weekDay == 4) {
          friLen++;
        } else if (shift.weekDay == 5) {
          satLen++;
        } else if (shift.weekDay == 6) {
          sunLen++;
        }
      }
    });

    setHasShiftNum([monLen, tueLen, wedLen, thuLen, friLen, satLen, sunLen]);
  }, [employeeScheduleState]);

  // *** Add employee to the calendar
  useEffect(() => {
    let tmp = [];
    employeeList &&
      employeeList.data &&
      employeeList.data.list &&
      employeeList.data.list.map((employee, index) => {
        if (employee.isAddCalendar === true) {
          tmp.push(employee._id);
        } else return;
      });
    setEmpArrToMap(tmp);
  }, [employeeList]);

  useEffect(() => {
    let tmp = [];
    employeeList.data &&
      employeeList.data.list &&
      employeeList?.data?.list.forEach((employee, index) => {
        if (empArrToMap.indexOf(employee._id) > -1) {
          tmp.push(employee);
        } else return;
      });
    setEmpShowArrToMap(tmp);
    setArrToMap(employeeCategoryList);
  }, [empArrToMap, employeeCategoryList, employeeList?.data]);

  // *** No Position Employees
  useEffect(() => {
    let tmpNoPositionIdArr = [],
      tmpNoPosition = [];
    empShowArrToMap.map((employee, index1) => {
      let flag = 0;
      employeePosition.map((position, index2) => {
        if (employee?.position?.length && employee.position[0]?.position == position.position) {
          flag = 1;
        } else {
          return;
        }
      });

      if (flag == 0) {
        tmpNoPositionIdArr.push(employee._id);
      } else return;
    });
    employeeList.data &&
      employeeList.data.list &&
      employeeList?.data?.list.forEach((employee, index) => {
        if (tmpNoPositionIdArr.indexOf(employee._id) > -1) {
          tmpNoPosition.push(employee);
        } else return;
      });
    setEmpNoPositionArrToMap(tmpNoPosition);
  }, [empShowArrToMap, employeeList?.data?.list]);

  // ** Component Unmount
  useEffect(() => {
    let tmp = [];
    if (employeesPositionArr !== undefined && employeesPositionArr.length > 0) {
      tmp = employeesPositionArr.map((item, index) => {
        return {
          category: item?.category?.category,
          position: item?.position,
          color: item.color ? item.color : '#888',
          _id: item._id
        };
      });
      setEmployeePostion(tmp);
    } else {
      return;
    }
  }, [employeesPositionArr]);

  useEffect(() => {
    let tmp = [];
    allShifts.map((shift, index1) => {
      let flag = 0;
      tmp.map((subShift, index2) => {
        if (
          shift.name == subShift.name &&
          shift.start == subShift.start &&
          shift.end == subShift.end
        ) {
          flag = 1;
        }
      });
      if (flag == 0 && shift.isOpen == true) {
        tmp.push(shift);
      }
      setSelectableShifts(tmp);
    });
  }, [allShifts]);

  // ** Handlers
  const zipEditHandler = (e) => {
    setOpenEditZip(!openEditZip);
  };
  const groupButtonClickHandler = (e, index) => {
    e.target.closest('.btn-group').childNodes.forEach((btn, index) => {
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
      }
    });
    if (index == 0) {
      setIsSelect(false);
    } else if (index == 1) {
      setIsSelect(true);
    }
    e.target.closest('button').classList.add('active');
  };
  const shiftSelectHandler = (e, id) => {
    selectableShifts.map((item, index) => {
      if (item._id == id) {
        setExistedShift(item);
      } else {
        return;
      }
    });
  };

  const scheduleWeekdayClick = (e, index) => {
    e.target.closest('.schedule-weekday').classList.toggle('active');
  };

  // *** Drag Employee
  const handleDragStart = (e, id, employeePosition) => {
    setDragData({ id: id, initialGroup: employeePosition });
  };
  // *** Drag Shift From Open to Table
  const handleShiftDragStart = (e, id, employeeId) => {
    setDragData({});
    if (employeeId) {
      setShiftDragData({ shiftId: id, employeeId: employeeId });
      dispatch(
        contactUpdateByIdAction({
          shiftId: id,
          _id: employeeId,
          isShiftRemove: true
        })
      );
    } else {
      setShiftDragData({ shiftId: id, employeeId: null });
    }
  };
  const handleShiftDragOver = (e) => {
    e.preventDefault();
    e.target.closest('th').classList.add('drag-over');
  };
  const handleShiftDragEnter = (e, employeeId) => {
    if (employeeId) {
      setShiftDragData({ ...shiftDragData, employeeId: employeeId });
    } else {
      setShiftDragData({ ...shiftDragData, employeeId: null });
    }
    e.preventDefault();
  };
  // ** Drag & Drop Employee Row
  const handleDragEnter = (e, employeePosition) => {
    setDragData({ ...dragData, dropTarget: employeePosition });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.target.closest('th').classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.target.closest('th').classList.remove('drag-over');
    // setNoDrop('');
  };

  // ** Table To Open Shifts
  const handleShiftToOpenDragEnter = (e) => {
    e.preventDefault();
  };
  const handleShiftToOpenDrop = (e, index) => {
    e.target.closest('th').classList.remove('drag-over');
    dispatch(
      shiftUpdateAction({
        id: shiftDragData.shiftId,
        weekDay: [index],
        isOpen: true
      })
    );
    dispatch(
      contactUpdateByIdAction({
        shiftId: shiftDragData.shiftId,
        _id: shiftDragData.employeeId,
        isShiftRemove: true
      })
    ).then((res) => {
      dispatch(employeeListRequest({}));
    });
  };

  const handleDrop = (e, employeePosition, item) => {
    if (e.target.closest('th') && e.target.closest('th').getAttribute('id')) {
      e.target.closest('th').classList.remove('drag-over');
    }

    if (shiftDragData.shiftId) {
      // ** Shift Move
      let tmpWeekDay = e.target.closest('th').getAttribute('id');
      setShiftDragData({ ...shiftDragData, weekDay: tmpWeekDay });
      dispatch(
        shiftUpdateAction({
          id: shiftDragData.shiftId,
          weekDay: [tmpWeekDay],
          isOpen: false
        })
      );
      dispatch(
        contactUpdateByIdAction({
          shiftId: shiftDragData.shiftId,
          _id: shiftDragData.employeeId
        })
      ).then((res) => {
        dispatch(employeeListRequest({}));
      });

      setShiftDragData({});
      setDragData({});
    } else {
      // ** Position Move
      let tmp = [];
      tmp = empShowArrToMap.map((employee, index) => {
        if (employee._id == dragData.id) {
          return { ...employee, position: dragData.dropTarget };
        } else return employee;
      });
      dispatch(
        contactUpdateByIdAction({
          position: dragData.dropTarget,
          _id: dragData.id
        })
      ).then((res) => {
        dispatch(employeeListRequest({}));
      });
      setEmpShowArrToMap(tmp);
      setShiftDragData({});
      setDragData({});
    }
  };
  const toggle = (tab) => {
    setActive(tab);
    setopenfooter(true);
  };

  const handleClickOpen = () => {
    setopenfooter(!openfooter);
  };
  const handlePageChange = (event) => {
    setSelectedPage(parseInt(event.target.value));
  };

  // const indexOfLastPost = selectedPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const displayData = data && data.slice(indexOfFirstPost, indexOfLastPost);

  // useEffect(() => {
  //   setTableData(displayData);
  // }, []);

  // ** Open Create Modal
  const openShiftModalHandler = (index) => {
    setOpenShiftModal(!openShiftModal);
    setShiftStartTime('');
    setShiftEndTime('');
    setShiftCurIndex(index);
    dispatch(getAllEmployeeShiftAction());
  };
  // ** Open Update Modal
  const openUpdateShiftModalHandler = ({
    stickyStart,
    stickyEnd,
    stickyWeekDay,
    stickyNote,
    stickyIndex,
    stickyId
  }) => {
    setOpenUpdateShiftModal(!openUpdateShiftModal);
    setShiftStartTime(stickyStart);
    setShiftEndTime(stickyEnd);
    setShiftWeekDay(stickyWeekDay);
    setShiftNote(stickyNote);
    setShiftCurIndex(stickyIndex);
    setShiftUpdateId(stickyId);
  };
  const openEventModalHandler = () => {};
  const saveShiftClickHandler = () => {
    let tmp = [];
    document.querySelectorAll('.schedule-weekday').forEach((el, elIndex) => {
      if (el.classList.contains('active')) {
        tmp.push(elIndex);
      } else {
        return;
      }
    });
    if (deadline == '') {
      toast.error('Expired Date is required');
      return;
    }
    if (isSelect) {
      dispatch(
        shiftAddAction({
          name: existedShift.name,
          start: existedShift.start,
          end: existedShift.end,
          weekDay: tmp,
          number: shiftNumber,
          note: existedShift.note
        })
      );
    } else {
      if (shiftName == '') {
        toast.error('Shift name is required');
        return;
      }
      if (shiftStartTime == '') {
        toast.error('Shift start time is required');
        return;
      }
      if (shiftEndTime == '') {
        toast.error('Shift end time is required');
        return;
      }

      dispatch(
        shiftAddAction({
          name: shiftName,
          start: shiftStartTime,
          end: shiftEndTime,
          weekDay: tmp,
          note: shiftNote
        })
      );
    }
    setOpenShiftModal(false);
  };
  const updateShiftClickHandler = () => {
    let tmp = [];
    document.querySelectorAll('.schedule-weekday').forEach((el, elIndex) => {
      if (el.classList.contains('active')) {
        tmp.push(elIndex);
      } else {
        return;
      }
    });
    if (deadline == '') {
      toast.error('Expired Date is required');
      return;
    }
    dispatch(
      shiftUpdateAction({
        id: shiftUpdateId,
        start: shiftStartTime,
        end: shiftEndTime,
        weekDay: tmp,
        note: shiftNote,
        isOpen: true
      })
    );
    setOpenUpdateShiftModal(false);
  };

  return (
    <Fragment>
      <Card className="p-1">
        <div className="w-100 rounded" style={{ overflowX: 'scroll', overflowY: 'hidden' }}>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h5 className="mb-0">Week Calendar</h5>
            <div className="d-flex align-items-center justify-content-end">
              {/* <h5 className="mb-0 me-75 text-nowrap">
                {zipCode} {city} {country}
              </h5> */}
              <Button
                color="primary"
                onClick={(e) => zipEditHandler(e)}
                className="d-flex align-items-center"
              >
                <span className="me-1">
                  {city ? city : 'Unknown'}, {country ? country : 'Unknown'}
                </span>
                <Edit2 size="15" />
              </Button>
            </div>
          </div>
          <table className="w-100 ">
            <thead>
              <tr>
                <th className="border cursor-pointer">
                  <div className="d-flex">
                    <div className="m-1">
                      <AddEmpolye />
                    </div>
                  </div>
                </th>
                {days.map((day, index) => (
                  <th className="border cursor-pointer" key={day.format('MMM DD')}>
                    <div className="text-center d-flex justify-content-between align-items-center p-25">
                      <div className="d-flex align-items-center justify-content-center flex-column font-medium-2">
                        <span> {day.format('MMM DD')}</span>
                        <h3 className="mb-0 font-small-2">{day.format('ddd')}</h3>
                      </div>
                      <div className="text-secondary ms-25 ">
                        <img
                          src={
                            process.env.REACT_APP_WEATHER_ICON_URL +
                            `${
                              weatherResult.list
                                ? weatherResult?.list[index]?.weather[0]?.icon
                                : '03n'
                            }.png`
                          }
                          alt="weather icon"
                          width="50"
                          height="50"
                        />
                        <span className="font-medium-2 ms-50">
                          {weatherResult.list
                            ? celToFaConverter(weatherResult?.list[index]?.main?.temp)
                            : 'XX'}
                          &deg;
                        </span>
                        <div className="d-flex align-items-center justify-content-end font-small-2">
                          <User size={9} />
                          <span>{hasShiftNum[index]}</span>
                        </div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <th className="border cursor-pointer p-1">Events</th>
                <th className="border cursor-pointer text-center addScheduler-wrapper">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    onClick={openEventModalHandler}
                  >
                    <Plus className="plus_icons m-0" />
                  </div>
                </th>
                <th className="border cursor-pointer text-center addScheduler-wrapper">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    onClick={openEventModalHandler}
                  >
                    <Plus className="plus_icons m-0" />
                  </div>
                </th>
                <th className="border cursor-pointer text-center addScheduler-wrapper">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    onClick={openEventModalHandler}
                  >
                    <Plus className="plus_icons m-0" />
                  </div>
                </th>
                <th className="border cursor-pointer text-center addScheduler-wrapper">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    onClick={openEventModalHandler}
                  >
                    <Plus className="plus_icons m-0" />
                  </div>
                </th>
                <th className="border cursor-pointer text-center addScheduler-wrapper">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    onClick={openEventModalHandler}
                  >
                    <Plus className="plus_icons m-0" />
                  </div>
                </th>
                <th className="border cursor-pointer text-center addScheduler-wrapper">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    onClick={openEventModalHandler}
                  >
                    <Plus className="plus_icons m-0" />
                  </div>
                </th>
                <th className="border cursor-pointer text-center addScheduler-wrapper">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    onClick={openEventModalHandler}
                  >
                    <Plus className="plus_icons m-0" />
                  </div>
                </th>
              </tr>
            </tbody>
            <tbody>
              <tr className="border" style={{ backgroundColor: '#d5d5d5' }}>
                <th className="border p-1">Open Shifts</th>
                <th
                  className="border text-center addScheduler-wrapper"
                  onDragEnter={(e) => handleShiftToOpenDragEnter(e)}
                  onDragOver={(e) => handleShiftDragOver(e)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  onDrop={(e) => handleShiftToOpenDrop(e, 0)}
                >
                  {allShifts &&
                    allShifts.map((item, index) => {
                      if (item.isOpen === true && item.weekDay == 0) {
                        return (
                          <ShiftSticky
                            stickyInfo={item}
                            setExistedShift={setExistedShift}
                            stickyIndex={0}
                            setIsSelect={setIsSelect}
                            openUpdateShiftModalHandler={openUpdateShiftModalHandler}
                            handleShiftDragStart={handleShiftDragStart}
                            key={index + 'ShiftSticky'}
                          />
                        );
                      } else return <></>;
                    })}
                  <div
                    className="d-flex justify-content-center align-items-center cursor-pointer"
                    onClick={(e) => openShiftModalHandler(0)}
                  >
                    <Plus className="plus_icons m-0" />
                  </div>
                </th>
                <th
                  className="border cursor-pointer text-center addScheduler-wrapper"
                  onDragEnter={(e) => handleShiftToOpenDragEnter(e)}
                  onDragOver={(e) => handleShiftDragOver(e)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  onDrop={(e) => handleShiftToOpenDrop(e, 1)}
                >
                  {allShifts &&
                    allShifts.map((item, index) => {
                      if (item.isOpen === true && item.weekDay == 1) {
                        return (
                          <ShiftSticky
                            stickyInfo={item}
                            setExistedShift={setExistedShift}
                            stickyIndex={1}
                            setIsSelect={setIsSelect}
                            openUpdateShiftModalHandler={openUpdateShiftModalHandler}
                            handleShiftDragStart={handleShiftDragStart}
                            key={index + 'ShiftSticky'}
                          />
                        );
                      } else return <></>;
                    })}
                  <div
                    className="d-flex justify-content-center align-items-center cursor-pointer"
                    onClick={(e) => openShiftModalHandler(1)}
                  >
                    <Plus className="plus_icons m-0" />
                  </div>
                </th>
                <th
                  className="border cursor-pointer text-center addScheduler-wrapper"
                  onDragEnter={(e) => handleShiftToOpenDragEnter(e)}
                  onDragOver={(e) => handleShiftDragOver(e)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  onDrop={(e) => handleShiftToOpenDrop(e, 2)}
                >
                  {allShifts &&
                    allShifts.map((item, index) => {
                      if (item.isOpen === true && item.weekDay == 2) {
                        return (
                          <ShiftSticky
                            stickyInfo={item}
                            setExistedShift={setExistedShift}
                            stickyIndex={2}
                            setIsSelect={setIsSelect}
                            openUpdateShiftModalHandler={openUpdateShiftModalHandler}
                            handleShiftDragStart={handleShiftDragStart}
                            key={index + 'ShiftSticky'}
                          />
                        );
                      } else return <></>;
                    })}
                  <div
                    className="d-flex justify-content-center align-items-center cursor-pointer"
                    onClick={(e) => openShiftModalHandler(2)}
                  >
                    <Plus className="plus_icons m-0" />
                  </div>
                </th>
                <th
                  className="border cursor-pointer text-center addScheduler-wrapper"
                  onDragEnter={(e) => handleShiftToOpenDragEnter(e)}
                  onDragOver={(e) => handleShiftDragOver(e)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  onDrop={(e) => handleShiftToOpenDrop(e, 3)}
                >
                  {allShifts &&
                    allShifts.map((item, index) => {
                      if (item.isOpen === true && item.weekDay == 3) {
                        return (
                          <ShiftSticky
                            stickyInfo={item}
                            setExistedShift={setExistedShift}
                            stickyIndex={3}
                            setIsSelect={setIsSelect}
                            openUpdateShiftModalHandler={openUpdateShiftModalHandler}
                            handleShiftDragStart={handleShiftDragStart}
                            key={index + 'ShiftSticky'}
                          />
                        );
                      } else return <></>;
                    })}
                  <div
                    className="d-flex justify-content-center align-items-center cursor-pointer"
                    onClick={(e) => openShiftModalHandler(3)}
                  >
                    <Plus className="plus_icons m-0" />
                  </div>
                </th>
                <th
                  className="border cursor-pointer text-center addScheduler-wrapper"
                  onDragEnter={(e) => handleShiftToOpenDragEnter(e)}
                  onDragOver={(e) => handleShiftDragOver(e)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  onDrop={(e) => handleShiftToOpenDrop(e, 4)}
                >
                  {allShifts &&
                    allShifts.map((item, index) => {
                      if (item.isOpen === true && item.weekDay == 4) {
                        return (
                          <ShiftSticky
                            stickyInfo={item}
                            setExistedShift={setExistedShift}
                            stickyIndex={4}
                            setIsSelect={setIsSelect}
                            openUpdateShiftModalHandler={openUpdateShiftModalHandler}
                            handleShiftDragStart={handleShiftDragStart}
                            key={index + 'ShiftSticky'}
                          />
                        );
                      } else return <></>;
                    })}
                  <div
                    className="d-flex justify-content-center align-items-center cursor-pointer"
                    onClick={(e) => openShiftModalHandler(4)}
                  >
                    <Plus className="plus_icons m-0" />
                  </div>
                </th>
                <th
                  className="border cursor-pointer text-center addScheduler-wrapper"
                  onDragEnter={(e) => handleShiftToOpenDragEnter(e)}
                  onDragOver={(e) => handleShiftDragOver(e)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  onDrop={(e) => handleShiftToOpenDrop(e, 5)}
                >
                  {allShifts &&
                    allShifts.map((item, index) => {
                      if (item.isOpen === true && item.weekDay == 5) {
                        return (
                          <ShiftSticky
                            stickyInfo={item}
                            setExistedShift={setExistedShift}
                            stickyIndex={5}
                            setIsSelect={setIsSelect}
                            openUpdateShiftModalHandler={openUpdateShiftModalHandler}
                            handleShiftDragStart={handleShiftDragStart}
                            key={index + 'ShiftSticky'}
                          />
                        );
                      } else return <></>;
                    })}
                  <div
                    className="d-flex justify-content-center align-items-center cursor-pointer"
                    onClick={(e) => openShiftModalHandler(5)}
                  >
                    <Plus className="plus_icons m-0" />
                  </div>
                </th>
                <th
                  className="border cursor-pointer text-center addScheduler-wrapper"
                  onDragEnter={(e) => handleShiftToOpenDragEnter(e)}
                  onDragOver={(e) => handleShiftDragOver(e)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  onDrop={(e) => handleShiftToOpenDrop(e, 6)}
                >
                  {allShifts &&
                    allShifts.map((item, index) => {
                      if (item.isOpen === true && item.weekDay == 6) {
                        return (
                          <ShiftSticky
                            stickyInfo={item}
                            setExistedShift={setExistedShift}
                            stickyIndex={6}
                            setIsSelect={setIsSelect}
                            openUpdateShiftModalHandler={openUpdateShiftModalHandler}
                            handleShiftDragStart={handleShiftDragStart}
                            key={index + 'ShiftSticky'}
                          />
                        );
                      } else return <></>;
                    })}
                  <div
                    className="d-flex justify-content-center align-items-center cursor-pointer"
                    onClick={(e) => openShiftModalHandler(6)}
                  >
                    <Plus className="plus_icons m-0" />
                  </div>
                </th>
              </tr>
            </tbody>
            <tbody
              onDragEnter={(e) => handleDragEnter(e, 'unassigned')}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'unassigned')}
            >
              <tr
                style={{
                  paddingLeft: '20px',
                  height: '30px',
                  background: '#555',
                  color: '#fff'
                }}
              >
                <th
                  className="text-uppercase"
                  style={{
                    paddingLeft: '10px',
                    height: '30px',
                    background: '#555',
                    color: '#fff'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Award size={15} className="me-50" />
                    No Position
                  </div>
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </tbody>

            {empNoPositionArrToMap.map((item, index) => {
              return (
                <tbody>
                  <tr
                    key={item.id}
                    id={item.id}
                    className="border cursor-pointer"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item._id, item.position)}
                    style={{ width: '200px' }}
                  >
                    <th>
                      <div className="d-flex" style={{ padding: '10px' }}>
                        <MoreVertical size={16} />
                        {/* <div
                                  className={`status-indicator ${isActive ? 'inactive' : 'active'}`}
                                ></div> */}
                        <img
                          src={defaultAvatar}
                          className="rounded-circle me-1"
                          alt="Generic placeholder image"
                          height="40"
                          width="40"
                        />

                        <div className="d-flex align-items-center">
                          <h5 className="font-weight-bold">{item?.fullName}</h5>
                        </div>
                      </div>
                    </th>
                    <th
                      className="border cursor-pointer text-center addScheduler-wrapper"
                      onDragEnter={(e) => handleShiftDragEnter(e, item._id)}
                      onDragOver={(e) => handleShiftDragOver(e)}
                      onDragLeave={(e) => handleDragLeave(e)}
                      onDrop={(e) => handleDrop(e, 0, item)}
                      id={0}
                    >
                      {item.shift.map((item1, index1) => {
                        if (item1.isOpen === false && item1.weekDay == 0) {
                          return (
                            <ShiftSticky
                              stickyInfo={item1}
                              setExistedShift={setExistedShift}
                              stickyIndex={0}
                              employeeId={item._id}
                              setIsSelect={setIsSelect}
                              openUpdateShiftModalHandler={openUpdateShiftModalHandler}
                              handleShiftDragStart={handleShiftDragStart}
                              key={index + ' ' + index1 + 'ShiftSticky'}
                            />
                          );
                        } else return <></>;
                      })}
                      <div
                        className="d-flex justify-content-center align-items-center"
                        onClick={(e) => openShiftModalHandler(0)}
                      >
                        <Plus className="plus_icons m-0" />
                      </div>
                    </th>
                    <th
                      className="border cursor-pointer text-center addScheduler-wrapper"
                      onDragEnter={(e) => handleShiftDragEnter(e, item._id)}
                      onDragOver={(e) => handleShiftDragOver(e)}
                      onDragLeave={(e) => handleDragLeave(e)}
                      onDrop={(e) => handleDrop(e, 1)}
                      id={1}
                    >
                      {item.shift.map((item1, index1) => {
                        if (item1.isOpen === false && item1.weekDay == 1) {
                          return (
                            <ShiftSticky
                              stickyInfo={item1}
                              setExistedShift={setExistedShift}
                              stickyIndex={1}
                              employeeId={item._id}
                              setIsSelect={setIsSelect}
                              openUpdateShiftModalHandler={openUpdateShiftModalHandler}
                              handleShiftDragStart={handleShiftDragStart}
                              key={index + ' ' + index1 + 'ShiftSticky'}
                            />
                          );
                        } else return <></>;
                      })}
                      <div
                        className="d-flex justify-content-center align-items-center"
                        onClick={(e) => openShiftModalHandler(1)}
                      >
                        <Plus className="plus_icons m-0" />
                      </div>
                    </th>
                    <th
                      className="border cursor-pointer text-center addScheduler-wrapper"
                      onDragEnter={(e) => handleShiftDragEnter(e, item._id)}
                      onDragOver={(e) => handleShiftDragOver(e)}
                      onDragLeave={(e) => handleDragLeave(e)}
                      onDrop={(e) => handleDrop(e, 2)}
                      id={2}
                    >
                      {item.shift.map((item1, index1) => {
                        if (item1.isOpen === false && item1.weekDay == 2) {
                          return (
                            <ShiftSticky
                              stickyInfo={item1}
                              setExistedShift={setExistedShift}
                              stickyIndex={2}
                              employeeId={item._id}
                              setIsSelect={setIsSelect}
                              openUpdateShiftModalHandler={openUpdateShiftModalHandler}
                              handleShiftDragStart={handleShiftDragStart}
                              key={index + ' ' + index1 + 'ShiftSticky'}
                            />
                          );
                        } else return <></>;
                      })}
                      <div
                        className="d-flex justify-content-center align-items-center"
                        onClick={(e) => openShiftModalHandler(2)}
                      >
                        <Plus className="plus_icons m-0" />
                      </div>
                    </th>
                    <th
                      className="border cursor-pointer text-center addScheduler-wrapper"
                      onDragEnter={(e) => handleShiftDragEnter(e, item._id)}
                      onDragOver={(e) => handleShiftDragOver(e)}
                      onDragLeave={(e) => handleDragLeave(e)}
                      onDrop={(e) => handleDrop(e, 3)}
                      id={3}
                    >
                      {item.shift.map((item1, index1) => {
                        if (item1.isOpen === false && item1.weekDay == 3) {
                          return (
                            <ShiftSticky
                              stickyInfo={item1}
                              setExistedShift={setExistedShift}
                              stickyIndex={3}
                              employeeId={item._id}
                              setIsSelect={setIsSelect}
                              openUpdateShiftModalHandler={openUpdateShiftModalHandler}
                              handleShiftDragStart={handleShiftDragStart}
                              key={index + ' ' + index1 + 'ShiftSticky'}
                            />
                          );
                        } else return <></>;
                      })}
                      <div
                        className="d-flex justify-content-center align-items-center"
                        onClick={(e) => openShiftModalHandler(3)}
                      >
                        <Plus className="plus_icons m-0" />
                      </div>
                    </th>
                    <th
                      className="border cursor-pointer text-center addScheduler-wrapper"
                      onDragEnter={(e) => handleShiftDragEnter(e, item._id)}
                      onDragOver={(e) => handleShiftDragOver(e)}
                      onDragLeave={(e) => handleDragLeave(e)}
                      onDrop={(e) => handleDrop(e, 4)}
                      id={4}
                    >
                      {item.shift.map((item1, index1) => {
                        if (item1.isOpen === false && item1.weekDay == 4) {
                          return (
                            <ShiftSticky
                              stickyInfo={item1}
                              setExistedShift={setExistedShift}
                              stickyIndex={4}
                              employeeId={item._id}
                              setIsSelect={setIsSelect}
                              openUpdateShiftModalHandler={openUpdateShiftModalHandler}
                              handleShiftDragStart={handleShiftDragStart}
                              key={index + ' ' + index1 + 'ShiftSticky'}
                            />
                          );
                        } else return <></>;
                      })}
                      <div
                        className="d-flex justify-content-center align-items-center"
                        onClick={(e) => openShiftModalHandler(4)}
                      >
                        <Plus className="plus_icons m-0" />
                      </div>
                    </th>
                    <th
                      className="border cursor-pointer text-center addScheduler-wrapper"
                      onDragEnter={(e) => handleShiftDragEnter(e, item._id)}
                      onDragOver={(e) => handleShiftDragOver(e)}
                      onDragLeave={(e) => handleDragLeave(e)}
                      onDrop={(e) => handleDrop(e, 5)}
                      id={5}
                    >
                      {item.shift.map((item1, index1) => {
                        if (item1.isOpen === false && item1.weekDay == 5) {
                          return (
                            <ShiftSticky
                              stickyInfo={item1}
                              setExistedShift={setExistedShift}
                              stickyIndex={5}
                              employeeId={item._id}
                              setIsSelect={setIsSelect}
                              openUpdateShiftModalHandler={openUpdateShiftModalHandler}
                              handleShiftDragStart={handleShiftDragStart}
                              key={index + ' ' + index1 + 'ShiftSticky'}
                            />
                          );
                        } else return <></>;
                      })}
                      <div
                        className="d-flex justify-content-center align-items-center"
                        onClick={(e) => openShiftModalHandler(5)}
                      >
                        <Plus className="plus_icons m-0" />
                      </div>
                    </th>
                    <th
                      className="border cursor-pointer text-center addScheduler-wrapper"
                      onDragEnter={(e) => handleShiftDragEnter(e, item._id)}
                      onDragOver={(e) => handleShiftDragOver(e)}
                      onDragLeave={(e) => handleDragLeave(e)}
                      onDrop={(e) => handleDrop(e, 6)}
                      id={6}
                    >
                      {item.shift.map((item1, index1) => {
                        if (item1.isOpen === false && item1.weekDay == 6) {
                          return (
                            <ShiftSticky
                              stickyInfo={item1}
                              setExistedShift={setExistedShift}
                              stickyIndex={6}
                              employeeId={item._id}
                              setIsSelect={setIsSelect}
                              openUpdateShiftModalHandler={openUpdateShiftModalHandler}
                              handleShiftDragStart={handleShiftDragStart}
                              key={index + ' ' + index1 + 'ShiftSticky'}
                            />
                          );
                        } else return <></>;
                      })}
                      <div
                        className="d-flex justify-content-center align-items-center"
                        onClick={(e) => openShiftModalHandler(6)}
                      >
                        <Plus className="plus_icons m-0" />
                      </div>
                    </th>
                  </tr>
                </tbody>
              );
            })}
            {arrToMap?.map((categoryItem, categoryIndex) => {
              return (
                <>
                  <tbody>
                    <tr
                      style={{
                        paddingLeft: '20px',
                        height: '30px',
                        background: '#555',
                        color: '#fff'
                      }}
                    >
                      <th
                        className="text-uppercase"
                        style={{
                          paddingLeft: '10px',
                          height: '30px',
                          background: '#555',
                          color: '#fff'
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <Award size={15} className="me-50" />
                          {categoryItem.category}
                        </div>
                      </th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </tbody>
                  {employeePosition.map((positionItem, positionIndex) => {
                    if (positionItem.category == categoryItem.category) {
                      return (
                        <tbody
                          onDragEnter={(e) => handleDragEnter(e, positionItem._id)}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, positionItem.position)}
                          key={positionIndex + '_employee'}
                        >
                          <tr
                            style={{
                              paddingLeft: '40px',
                              height: '30px',
                              background: positionItem.color,
                              color: '#fff'
                            }}
                          >
                            <th
                              className="text-uppercase"
                              style={{
                                paddingLeft: '30px',
                                height: '30px',
                                background: positionItem.color,
                                color: '#fff'
                              }}
                            >
                              <div className="d-flex align-items-center">
                                <User size={15} className="me-50" />
                                {positionItem.position}
                              </div>
                            </th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                          </tr>

                          {empShowArrToMap !== undefined &&
                            empShowArrToMap
                              .filter(
                                (item) =>
                                  item?.position?.length &&
                                  item.position[0]?.position === positionItem.position
                              )
                              .map((item, index) => {
                                return (
                                  <tr
                                    key={item.id}
                                    id={item.id}
                                    className="border cursor-pointer"
                                    draggable
                                    onDragStart={(e) =>
                                      handleDragStart(e, item._id, item?.position[0]?.position)
                                    }
                                    style={{ width: '200px' }}
                                  >
                                    <th>
                                      <div className="d-flex" style={{ padding: '10px' }}>
                                        <MoreVertical size={16} />
                                        {/* <div
                                  className={`status-indicator ${isActive ? 'inactive' : 'active'}`}
                                ></div> */}
                                        <img
                                          src={defaultAvatar}
                                          className="rounded-circle me-1"
                                          alt="Generic placeholder image"
                                          height="40"
                                          width="40"
                                        />

                                        <div className="d-flex align-items-center">
                                          <h5 className="font-weight-bold">{item?.fullName}</h5>
                                        </div>
                                      </div>
                                    </th>
                                    <th
                                      className="border cursor-pointer text-center addScheduler-wrapper"
                                      onDragEnter={(e) => handleShiftDragEnter(e, item._id)}
                                      onDragOver={(e) => handleShiftDragOver(e)}
                                      onDragLeave={(e) => handleDragLeave(e)}
                                      onDragDrop={(e) => handleDrop(e, 0, item)}
                                      id={0}
                                    >
                                      {item.shift.map((item1, index1) => {
                                        if (item1.isOpen === false && item1.weekDay == 0) {
                                          return (
                                            <ShiftSticky
                                              stickyInfo={item1}
                                              setExistedShift={setExistedShift}
                                              stickyIndex={0}
                                              employeeId={item._id}
                                              setIsSelect={setIsSelect}
                                              openUpdateShiftModalHandler={
                                                openUpdateShiftModalHandler
                                              }
                                              handleShiftDragStart={handleShiftDragStart}
                                              key={index + ' ' + index1 + 'ShiftSticky'}
                                            />
                                          );
                                        } else return <></>;
                                      })}
                                      <div
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={(e) => openShiftModalHandler(0)}
                                      >
                                        <Plus className="plus_icons m-0" />
                                      </div>
                                    </th>
                                    <th
                                      className="border cursor-pointer text-center addScheduler-wrapper"
                                      onDragEnter={(e) => handleShiftDragEnter(e, item._id)}
                                      onDragOver={(e) => handleShiftDragOver(e)}
                                      onDragLeave={(e) => handleDragLeave(e)}
                                      onDragDrop={(e) => handleDrop(e, 1)}
                                      id={1}
                                    >
                                      {item.shift.map((item1, index1) => {
                                        if (item1.isOpen === false && item1.weekDay == 1) {
                                          return (
                                            <ShiftSticky
                                              stickyInfo={item1}
                                              setExistedShift={setExistedShift}
                                              stickyIndex={1}
                                              employeeId={item._id}
                                              setIsSelect={setIsSelect}
                                              openUpdateShiftModalHandler={
                                                openUpdateShiftModalHandler
                                              }
                                              handleShiftDragStart={handleShiftDragStart}
                                              key={index + ' ' + index1 + 'ShiftSticky'}
                                            />
                                          );
                                        } else return <></>;
                                      })}
                                      <div
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={(e) => openShiftModalHandler(1)}
                                      >
                                        <Plus className="plus_icons m-0" />
                                      </div>
                                    </th>
                                    <th
                                      className="border cursor-pointer text-center addScheduler-wrapper"
                                      onDragEnter={(e) => handleShiftDragEnter(e, item._id)}
                                      onDragOver={(e) => handleShiftDragOver(e)}
                                      onDragLeave={(e) => handleDragLeave(e)}
                                      onDragDrop={(e) => handleDrop(e, 2)}
                                      id={2}
                                    >
                                      {item.shift.map((item1, index1) => {
                                        if (item1.isOpen === false && item1.weekDay == 2) {
                                          return (
                                            <ShiftSticky
                                              stickyInfo={item1}
                                              setExistedShift={setExistedShift}
                                              stickyIndex={2}
                                              employeeId={item._id}
                                              setIsSelect={setIsSelect}
                                              openUpdateShiftModalHandler={
                                                openUpdateShiftModalHandler
                                              }
                                              handleShiftDragStart={handleShiftDragStart}
                                              key={index + ' ' + index1 + 'ShiftSticky'}
                                            />
                                          );
                                        } else return <></>;
                                      })}
                                      <div
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={(e) => openShiftModalHandler(2)}
                                      >
                                        <Plus className="plus_icons m-0" />
                                      </div>
                                    </th>
                                    <th
                                      className="border cursor-pointer text-center addScheduler-wrapper"
                                      onDragEnter={(e) => handleShiftDragEnter(e, item._id)}
                                      onDragOver={(e) => handleShiftDragOver(e)}
                                      onDragLeave={(e) => handleDragLeave(e)}
                                      onDragDrop={(e) => handleDrop(e, 3)}
                                      id={3}
                                    >
                                      {item.shift.map((item1, index1) => {
                                        if (item1.isOpen === false && item1.weekDay == 3) {
                                          return (
                                            <ShiftSticky
                                              stickyInfo={item1}
                                              setExistedShift={setExistedShift}
                                              stickyIndex={3}
                                              employeeId={item._id}
                                              setIsSelect={setIsSelect}
                                              openUpdateShiftModalHandler={
                                                openUpdateShiftModalHandler
                                              }
                                              handleShiftDragStart={handleShiftDragStart}
                                              key={index + ' ' + index1 + 'ShiftSticky'}
                                            />
                                          );
                                        } else return <></>;
                                      })}
                                      <div
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={(e) => openShiftModalHandler(3)}
                                      >
                                        <Plus className="plus_icons m-0" />
                                      </div>
                                    </th>
                                    <th
                                      className="border cursor-pointer text-center addScheduler-wrapper"
                                      onDragEnter={(e) => handleShiftDragEnter(e, item._id)}
                                      onDragOver={(e) => handleShiftDragOver(e)}
                                      onDragLeave={(e) => handleDragLeave(e)}
                                      onDragDrop={(e) => handleDrop(e, 4)}
                                      id={4}
                                    >
                                      {item.shift.map((item1, index1) => {
                                        if (item1.isOpen === false && item1.weekDay == 4) {
                                          return (
                                            <ShiftSticky
                                              stickyInfo={item1}
                                              setExistedShift={setExistedShift}
                                              stickyIndex={4}
                                              employeeId={item._id}
                                              setIsSelect={setIsSelect}
                                              openUpdateShiftModalHandler={
                                                openUpdateShiftModalHandler
                                              }
                                              handleShiftDragStart={handleShiftDragStart}
                                              key={index + ' ' + index1 + 'ShiftSticky'}
                                            />
                                          );
                                        } else return <></>;
                                      })}
                                      <div
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={(e) => openShiftModalHandler(4)}
                                      >
                                        <Plus className="plus_icons m-0" />
                                      </div>
                                    </th>
                                    <th
                                      className="border cursor-pointer text-center addScheduler-wrapper"
                                      onDragEnter={(e) => handleShiftDragEnter(e, item._id)}
                                      onDragOver={(e) => handleShiftDragOver(e)}
                                      onDragLeave={(e) => handleDragLeave(e)}
                                      onDragDrop={(e) => handleDrop(e, 5)}
                                      id={5}
                                    >
                                      {item.shift.map((item1, index1) => {
                                        if (item1.isOpen === false && item1.weekDay == 5) {
                                          return (
                                            <ShiftSticky
                                              stickyInfo={item1}
                                              setExistedShift={setExistedShift}
                                              stickyIndex={5}
                                              employeeId={item._id}
                                              setIsSelect={setIsSelect}
                                              openUpdateShiftModalHandler={
                                                openUpdateShiftModalHandler
                                              }
                                              handleShiftDragStart={handleShiftDragStart}
                                              key={index + ' ' + index1 + 'ShiftSticky'}
                                            />
                                          );
                                        } else return <></>;
                                      })}
                                      <div
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={(e) => openShiftModalHandler(5)}
                                      >
                                        <Plus className="plus_icons m-0" />
                                      </div>
                                    </th>
                                    <th
                                      className="border cursor-pointer text-center addScheduler-wrapper"
                                      onDragEnter={(e) => handleShiftDragEnter(e, item._id)}
                                      onDragOver={(e) => handleShiftDragOver(e)}
                                      onDragLeave={(e) => handleDragLeave(e)}
                                      onDragDrop={(e) => handleDrop(e, 6)}
                                      id={6}
                                    >
                                      {item.shift.map((item1, index1) => {
                                        if (item1.isOpen === false && item1.weekDay == 6) {
                                          return (
                                            <ShiftSticky
                                              stickyInfo={item1}
                                              setExistedShift={setExistedShift}
                                              stickyIndex={6}
                                              employeeId={item._id}
                                              setIsSelect={setIsSelect}
                                              openUpdateShiftModalHandler={
                                                openUpdateShiftModalHandler
                                              }
                                              handleShiftDragStart={handleShiftDragStart}
                                              key={index + ' ' + index1 + 'ShiftSticky'}
                                            />
                                          );
                                        } else return <></>;
                                      })}
                                      <div
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={(e) => openShiftModalHandler(6)}
                                      >
                                        <Plus className="plus_icons m-0" />
                                      </div>
                                    </th>
                                  </tr>
                                );
                              })}
                        </tbody>
                      );
                    } else return;
                  })}
                </>
              );
            })}
          </table>
          <FormGroup
            className="d-flex align-items-center"
            style={{
              width: '100px',
              marginTop: '10px',
              justifyContent: 'flex-end'
            }}
          >
            <Label for="pageSelect" className="me-1 mb-0">
              Page:
            </Label>
            <Input
              type="select"
              name="pageSelect"
              id="pageSelect"
              value={selectedPage}
              onChange={handlePageChange}
              style={{ width: '100px' }}
            >
              {Array.from({ length: Math.ceil(data.length / postsPerPage) }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Input>
          </FormGroup>
        </div>
      </Card>
      <div>
        <div className="d-flex justify-content-between">
          <div className="cursor-pointer">
            <Nav tabs>
              <NavLink
                active={active === '1'}
                className="rounded"
                onClick={() => {
                  toggle('1');
                }}
              >
                Budget Tool
              </NavLink>
              <NavLink
                active={active === '2'}
                className="rounded"
                onClick={() => {
                  toggle('2');
                }}
              >
                Setting
              </NavLink>
            </Nav>
          </div>
          <div
            onClick={handleClickOpen}
            className="shadow bg-white cursor-pointer align-items-center d-flex"
            style={{ width: '30px', height: '30px', marginTop: '20px' }}
          >
            {openfooter ? <ChevronDown /> : <ChevronUp />}
          </div>
        </div>
        <div className="w-100 shadow bg-white h-100 schedule-tabs">
          <TabContent activeTab={active}>
            <TabPane tabId="1" className="p-1">
              <div
                className="w-100 shadow bg-white rounded overflow-x-scroll"
                style={{ overflowY: 'hidden' }}
              >
                <BudetTool handleClickOpen={handleClickOpen} openfooter={openfooter} />
              </div>
            </TabPane>
            <TabPane tabId="2" className="p-1">
              <div
                className="w-100 shadow bg-white rounded overflow-x-scroll"
                style={{ overflowY: 'hidden' }}
              >
                <LaborTool handleClickOpen={handleClickOpen} openfooter={openfooter} />
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>

      <Modal
        isOpen={openShiftModal}
        toggle={openShiftModalHandler}
        centered
        style={{ maxWidth: '45%' }}
      >
        <ModalHeader toggle={openShiftModalHandler}>
          <h3 className="mb-0">Add Shift</h3>
        </ModalHeader>
        <ModalBody>
          <div>
            <div>
              <ButtonGroup className="mb-1 add-shift-btn-group">
                <Button
                  outline
                  color="primary not p-50 active"
                  onClick={(e) => groupButtonClickHandler(e, 1)}
                >
                  Select One
                </Button>
                <Button
                  outline
                  color="primary came p-50"
                  onClick={(e) => groupButtonClickHandler(e, 0)}
                >
                  Create New
                </Button>
              </ButtonGroup>
              <div
                className={classnames('add-shift-modal', {
                  show: isSelect
                })}
              >
                <div className="d-flex mb-1">
                  <div className="me-1 flex-grow-1">
                    <Label>Shift Name</Label>
                    <Input
                      type="select"
                      id="user-role"
                      name="nameShift"
                      // defaultValue={state.position}
                      onChange={(e) => {
                        shiftSelectHandler(e, e.target.value);
                      }}
                    >
                      <option key={0} value="">
                        Select one...
                      </option>
                      {selectableShifts?.map((shift, index) => {
                        return (
                          <option key={index} value={shift._id}>
                            {shift.name}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                  <div className="flex-grow-1">
                    <Label>Quantity of Shifts</Label>
                    <Input
                      type="number"
                      name="numberShift"
                      defaultValue="0"
                      onChange={(e) => {
                        setShiftNumber(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="d-flex">
                  <div className="me-1 flex-grow-1">
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={existedShift.start}
                      onChange={(e) => {
                        setShiftStartTime(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={existedShift.end}
                      onChange={(e) => {
                        setShiftEndTime(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                className={classnames('add-shift-modal', {
                  show: !isSelect
                })}
              >
                <div className="d-flex">
                  <div className="me-1">
                    <Label>Shift Name</Label>
                    <Input
                      type="text"
                      name="shiftName"
                      onChange={(e) => {
                        setShiftName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="me-1">
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      onChange={(e) => {
                        setShiftStartTime(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      onChange={(e) => {
                        setShiftEndTime(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <Label>Apply To</Label>
              <div className="d-flex justify-content-between mt-1">
                {weekDay.map((day, index) => {
                  return (
                    <div
                      key={'day-' + index}
                      className={classnames(
                        'schedule-weekday cursor-pointer d-flex align-items-center justify-content-center',
                        {
                          active: shiftCurIndex == index
                        }
                      )}
                      onClick={(e) => scheduleWeekdayClick(e, index)}
                    >
                      <h4 className="mb-0 font-small-4">{day.name}</h4>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-3">
              <Label>Expired Date</Label>
              <Input
                type="date"
                name="deadline"
                defaultValue=""
                onChange={(e) => {
                  setDeadline(e.target.value);
                }}
              />
            </div>
            <FormGroup className="mt-3">
              <Label for="exampleText" className="font-weight-bold">
                <Label>Shift notes</Label>
              </Label>
              <Input name="text" type="textarea" onChange={(e) => setShiftNote(e.target.value)} />
              <p className="mt-1">Let the employee know any important details about this shift.</p>
            </FormGroup>
          </div>
          <div className="d-flex justify-content-end">
            <Button color="danger" onClick={openShiftModalHandler}>
              Cancel
            </Button>
            <Button color="primary" className="ms-1" onClick={saveShiftClickHandler}>
              Save
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={openUpdateShiftModal}
        toggle={openUpdateShiftModalHandler}
        centered
        style={{ maxWidth: '45%' }}
      >
        <ModalHeader toggle={openUpdateShiftModalHandler}>
          <h3 className="mb-0">Update Shift</h3>
        </ModalHeader>
        <ModalBody>
          <div>
            <ButtonGroup className="mb-1">
              <Button
                outline
                color="primary not p-50 active"
                onClick={(e) => groupButtonClickHandler(e, 1)}
              >
                Select One
              </Button>
              <Button
                outline
                color="primary came p-50"
                onClick={(e) => groupButtonClickHandler(e, 0)}
              >
                Create New
              </Button>
            </ButtonGroup>
            <div
              className={classnames('add-shift-modal', {
                show: isSelect
              })}
            >
              <div className="d-flex mb-1">
                <div className="me-1 flex-grow-1">
                  <Label>Shift Name</Label>
                  <Input
                    type="select"
                    id="user-role"
                    name="nameShift"
                    onChange={(e) => {
                      shiftSelectHandler(e, e.target.value);
                    }}
                  >
                    <option key={0} value="">
                      Select one...
                    </option>
                    {selectableShifts?.map((shift, index) => {
                      return (
                        <option
                          key={index}
                          value={shift._id}
                          selected={shift.name == existedShift.name}
                        >
                          {shift.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
                <div className="flex-grow-1">
                  <Label>Quantity of Shifts</Label>
                  <Input
                    type="number"
                    name="numberShift"
                    defaultValue="0"
                    onChange={(e) => {
                      setShiftNumber(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="d-flex">
                <div className="me-1 flex-grow-1">
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    value={existedShift.start}
                    onChange={(e) => {
                      setShiftStartTime(e.target.value);
                    }}
                  />
                </div>
                <div className="flex-grow-1">
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={existedShift.end}
                    onChange={(e) => {
                      setShiftEndTime(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className={classnames('add-shift-modal', {
                show: !isSelect
              })}
            >
              <div className="d-flex">
                <div className="me-1">
                  <Label>Shift Name</Label>
                  <Input
                    type="text"
                    name="shiftName"
                    onChange={(e) => {
                      setShiftName(e.target.value);
                    }}
                  />
                </div>
                <div className="me-1">
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    onChange={(e) => {
                      setShiftStartTime(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    onChange={(e) => {
                      setShiftEndTime(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <Label>Apply To</Label>
            <div className="d-flex justify-content-between mt-1">
              {weekDay.map((day, index) => {
                return (
                  <div
                    key={'day-' + index}
                    className={classnames(
                      'schedule-weekday cursor-pointer d-flex align-items-center justify-content-center',
                      {
                        active: shiftCurIndex == index
                      }
                    )}
                    onClick={(e) => scheduleWeekdayClick(e, index)}
                  >
                    <h4 className="mb-0 font-small-4">{day.name}</h4>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3">
            <Label>Expired Date</Label>
            <Input
              type="Date"
              name="deadline"
              dateformat="yyyy-mm-dd"
              defaultValue=""
              onChange={(e) => {
                setDeadline(e.target.value);
              }}
            />
          </div>
          <FormGroup className="mt-3">
            <Label for="exampleText" className="font-weight-bold">
              <Label>Shift notes</Label>
            </Label>
            <Input
              name="text"
              type="textarea"
              defaultValue={existedShift.note}
              onChange={(e) => setShiftNote(e.target.value)}
            />
            <p className="mt-1">Let the employee know any important details about this shift.</p>
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button color="danger" onClick={openUpdateShiftModalHandler}>
              Cancel
            </Button>
            <Button color="primary" className="ms-1" onClick={updateShiftClickHandler}>
              Update
            </Button>
          </div>
        </ModalBody>
      </Modal>

      <EmpCheckinSidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setSidebarOpen={setSidebarOpen}
      />
      <EditLocationModal
        openEditZip={openEditZip}
        setOpenEditZip={setOpenEditZip}
        zipCode={zipCode}
        setZipCode={setZipCode}
        zipEditHandler={zipEditHandler}
      />
    </Fragment>
  );
};

export default WeekCalender;
