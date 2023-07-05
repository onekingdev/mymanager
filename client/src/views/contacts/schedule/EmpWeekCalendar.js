import { Fragment, useEffect, useState, useRef } from 'react';
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png';
import EmpCheckinSidebar from './EmpCheckinSidebar';
import classnames from 'classnames';
import { Card, Button } from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import { User, Check, Edit2, Clock, MoreVertical, Award } from 'react-feather';
import moment from 'moment';
import AddEmpolye from './AddEmpolye';
import { data } from './data';
import { useGetEmployeePosition } from '../../../requests/contacts/employee-contacts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployeeShiftAction, getBudgetAction } from './store/actions';
import { useHistory } from 'react-router-dom';
import { formatAmPmTime, celToFaConverter } from '../../../utility/Utils';
import EditLocationModal from './EditLocationModal';
import { toast } from 'react-toastify';
import { getEmployeeAttendanceAction } from '../store/actions';
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

// ** Main Render Part
const EmpWeekCalender = (props) => {
  const dispatch = useDispatch();
  const timers = useRef(null);

  // ** Props
  const { arrToMap, setArrToMap, toggleSidebar, setSidebarOpen, sidebarOpen } = props;
  const history = useHistory();
  // ** Current User
  const { userData } = useSelector((state) => state.auth);
  // ** All Employee List
  const { employeeList } = useSelector((state) => state.employeeContact);
  const { employeeAttance } = useSelector((state) => state.employeeContact);
  // ** Employee Category List
  const employeeCategoryList = useSelector(
    (state) => state.employeeContact?.employeeCategory?.data
  );
  const employeeScheduleState = useSelector((state) => state?.employeeSchedule);
  const options = employeeScheduleState?.budgets?.salesProjected[0];
  // ** States
  const [currentDate, setCurrentDate] = useState(moment());
  const [days, setDays] = useState([]);
  const [empShowArrToMap, setEmpShowArrToMap] = useState([]);
  const [empNoPositionArrToMap, setEmpNoPositionArrToMap] = useState([]);
  const [allShifts, setAllShifts] = useState([]);

  const [curEmpId, setCurEmpId] = useState(0);
  const [curEmp, setCurEmp] = useState({});
  // *** Zip code
  const [openEditZip, setOpenEditZip] = useState(false);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  // *** Employee Position
  const [employeePosition, setEmployeePostion] = useState([]);

  // *** Zip Code
  let lastZipCode = localStorage.getItem('location');
  const [zipCode, setZipCode] = useState(lastZipCode ? parseInt(lastZipCode) : 94040);
  // ** Open Create Schedule Modal
  const [selectableShifts, setSelectableShifts] = useState([]);
  // ** Get current place weather
  const [weatherResult, setWeatherResult] = useState({});

  // ** isProgressShift */
  const [isProgressShift, setIsProgressShift] = useState(false);

  // ** Effects
  // *** Component Will Mount
  useEffect(() => {
    dispatch(getAllEmployeeShiftAction());
    dispatch(getEmployeeAttendanceAction());
  }, []);
  // *** Get Budget and check options
  useEffect(() => {
    dispatch(getBudgetAction());
  }, []);
  useEffect(() => {
    setCurEmpId(userData.id);
  }, [userData]);

  useEffect(() => {
    employeeAttance.data.map((item, index) => {
      if (item.employeeId[0]._id == userData.id && item.employeeId[0].punchState) {
        setIsProgressShift(true);
      } else return;
    });
  }, [employeeAttance.data]);
  // *** Fetch Data
  useEffect(() => {
    setAllShifts(employeeScheduleState?.shifts?.shiftList);
  }, [employeeScheduleState]);
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
  // *** Current Employee
  useEffect(() => {
    if (userData.empContactId) {
      let tmp = [];
      employeeList.data &&
        employeeList.data.list &&
        employeeList.data.list.forEach((employee, index) => {
          if (employee._id == userData.empContactId) {
            tmp.push(employee);
          } else return;
        });
      setCurEmp(tmp);
    }
  }, [userData, employeeList.data]);

  // *** Employee List To Display
  useEffect(() => {
    setArrToMap(employeeCategoryList);
  }, [employeeCategoryList, employeeList?.data]);
  // *** No Position Employees
  useEffect(() => {
    if (
      curEmp[0] &&
      curEmp[0].position &&
      employeePosition &&
      employeePosition.find((item) => item._id == curEmp[0].position[0]._id) &&
      curEmp[0] &&
      curEmp[0].position &&
      employeePosition &&
      employeePosition.find((item) => item._id == curEmp[0].position[0]._id).category
    ) {
      setEmpShowArrToMap(curEmp);
      setEmpNoPositionArrToMap([]);
    } else {
      setEmpNoPositionArrToMap(curEmp);
      setEmpShowArrToMap([]);
    }
  }, [curEmp, employeeCategoryList]);

  // *** Merge same shifs
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
  const {
    data: employeesPositionArr,
    refetch,
    isLoading: positionLoading
  } = useGetEmployeePosition();
  // *** Position
  useEffect(() => {
    let tmp = [];
    if (employeesPositionArr !== undefined && employeesPositionArr.length > 0) {
      tmp = employeesPositionArr.map((item, index) => {
        return {
          _id: item._id,
          category: item?.category?.category,
          position: item?.position,
          color: item.color ? item.color : '#888'
        };
      });
      setEmployeePostion(tmp);
    } else {
      return;
    }
  }, [employeesPositionArr]);

  useEffect(() => {
    const daysInWeek = [];
    for (let i = 0; i < 7; i++) {
      daysInWeek.push(moment().add(i, 'days'));
    }
    setDays(daysInWeek);
  }, [currentDate]);

  // ** Handlers
  const zipEditHandler = (e) => {
    setOpenEditZip(!openEditZip);
  };

  // ** Out function components
  // ** Shift Sticky
  const ShiftSticky = (props) => {
    const { stickyInfo, toggleSidebar, isActive } = props;
    const stickyStart = stickyInfo.start;
    const stickyEnd = stickyInfo.end;
    let today = new Date(),
      day = today.getDay();
    const shiftClickHandler = (e) => {
      if (today.getDay() == stickyInfo.weekDay) {
        let start = stickyInfo.start.split(':'),
          curHour = today.getHours(),
          curMin = today.getMinutes();
        let startHour = parseInt(start[0]),
          startMin = parseInt(start[1]);

        if (curHour < startHour) {
          toast.error(`You came too early. We accept from ${options.limitMins}minutes before`);
          return;
        } else if (curHour == startHour && startMin > curMin + options.limitMins) {
          toast.error(`You came a little early, We accept from ${options.limitMins}minutes before`);
          return;
        } else if (curHour == startHour && startMin < curMin + options.limitMins) {
          if (userData.workType == 'remote') {
            history.push('/contacts/employee/info');
          } else {
            toggleSidebar();
          }
        } else if (
          curHour > startHour &&
          employeeAttance.data &&
          employeeAttance.data.length > 0 &&
          employeeAttance.data.find((item) => item.employeeId[0].fullName == userData.fullName) &&
          employeeAttance.data.find((item) => item.employeeId[0].fullName == userData.fullName)
            .employeeId[0].punchState
        ) {
          toast.error('You already punch in');
          return;
        } else if (
          (curHour > startHour &&
            employeeAttance.data &&
            employeeAttance.data.length > 0 &&
            employeeAttance.data.find((item) => item.employeeId[0].fullName == userData.fullName) &&
            employeeAttance.data.find((item) => item.employeeId[0].fullName == userData.fullName)
              .employeeId[0].punchState == false) ||
          (curHour > startHour &&
            employeeAttance.data &&
            !employeeAttance.data.find((item) => item.employeeId[0].fullName == userData.fullName))
        ) {
          if (userData.workType == 'remote') {
            history.push('/contacts/employee/info');
          } else {
            toast.error('You are late');
            toggleSidebar();
          }
        } else {
          return;
        }
      } else {
        toast.error('Today is not your work day.');
      }
    };
    return (
      <div
        className="d-flex justify-content-between align-items-center position-relative sticky-shift cursor-pointer"
        style={{
          background: '#ffeec9',
          height: '28px'
        }}
        onClick={(e) => shiftClickHandler(e)}
      >
        <div
          className="h-100 d-flex justify-content-center align-items-center text-white px-25"
          style={{
            width: '20px',
            background: isActive ? 'red' : '#174ae7 '
          }}
        >
          <Clock size={15} className="" />
        </div>
        <div className="d-flex">
          <span className="font-small-2 d-block lh-lg">
            {stickyStart == '' ? '09:00 AM' : formatAmPmTime(stickyStart)} -{' '}
            {stickyEnd == '' ? '05:00 PM' : formatAmPmTime(stickyEnd)}
          </span>
        </div>
      </div>
    );
  };

  // ** Component Did Mount
  useEffect(() => {
    return () => {
      clearTimeout(timers.current);
    };
  }, []);
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
                    <div className="m-1"></div>
                  </div>
                </th>
                {days.map((day, index) => (
                  <th className="border" key={day.format('MMM DD')}>
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
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <th className="border p-1">Events</th>
                <th className="border text-center addScheduler-wrapper">
                  <div className="d-flex justify-content-center align-items-center"></div>
                </th>
                <th className="border text-center addScheduler-wrapper">
                  <div className="d-flex justify-content-center align-items-center"></div>
                </th>
                <th className="border text-center addScheduler-wrapper">
                  <div className="d-flex justify-content-center align-items-center"></div>
                </th>
                <th className="border text-center addScheduler-wrapper">
                  <div className="d-flex justify-content-center align-items-center"></div>
                </th>
                <th className="border text-center addScheduler-wrapper">
                  <div className="d-flex justify-content-center align-items-center"></div>
                </th>
                <th className="border text-center addScheduler-wrapper">
                  <div className="d-flex justify-content-center align-items-center"></div>
                </th>
                <th className="border text-center addScheduler-wrapper">
                  <div className="d-flex justify-content-center align-items-center"></div>
                </th>
              </tr>
            </tbody>
            <tbody>
              <tr className="border" style={{ backgroundColor: '#d5d5d5' }}>
                <th className="border p-1">Open Shifts</th>
                <th className="border text-center addScheduler-wrapper">
                  {allShifts &&
                    allShifts.map((item, index) => {
                      if (item.isOpen === true && item.weekDay == 0) {
                        return (
                          <ShiftSticky
                            stickyInfo={item}
                            stickyIndex={0}
                            toggleSidebar={toggleSidebar}
                            key={index + 'ShiftSticky'}
                          />
                        );
                      } else return <></>;
                    })}
                  <div
                    className="d-flex justify-content-center align-items-center"
                    onClick={(e) => openShiftModalHandler(0)}
                  ></div>
                </th>
                <th className="border text-center addScheduler-wrapper">
                  {allShifts &&
                    allShifts.map((item, index) => {
                      if (item.isOpen === true && item.weekDay == 1) {
                        return (
                          <ShiftSticky
                            stickyInfo={item}
                            stickyIndex={1}
                            toggleSidebar={toggleSidebar}
                            key={index + 'ShiftSticky'}
                          />
                        );
                      } else return <></>;
                    })}
                  <div
                    className="d-flex justify-content-center align-items-center"
                    onClick={(e) => openShiftModalHandler(1)}
                  ></div>
                </th>
                <th className="border text-center addScheduler-wrapper">
                  {allShifts &&
                    allShifts.map((item, index) => {
                      if (item.isOpen === true && item.weekDay == 2) {
                        return (
                          <ShiftSticky
                            stickyInfo={item}
                            stickyIndex={2}
                            toggleSidebar={toggleSidebar}
                            key={index + 'ShiftSticky'}
                          />
                        );
                      } else return <></>;
                    })}
                  <div
                    className="d-flex justify-content-center align-items-center"
                    onClick={(e) => openShiftModalHandler(2)}
                  ></div>
                </th>
                <th className="border text-center addScheduler-wrapper">
                  {allShifts &&
                    allShifts.map((item, index) => {
                      if (item.isOpen === true && item.weekDay == 3) {
                        return (
                          <ShiftSticky
                            stickyInfo={item}
                            stickyIndex={3}
                            toggleSidebar={toggleSidebar}
                            key={index + 'ShiftSticky'}
                          />
                        );
                      } else return <></>;
                    })}
                  <div
                    className="d-flex justify-content-center align-items-center"
                    onClick={(e) => openShiftModalHandler(3)}
                  ></div>
                </th>
                <th className="border text-center addScheduler-wrapper">
                  {allShifts &&
                    allShifts.map((item, index) => {
                      if (item.isOpen === true && item.weekDay == 4) {
                        return (
                          <ShiftSticky
                            stickyInfo={item}
                            stickyIndex={4}
                            toggleSidebar={toggleSidebar}
                            key={index + 'ShiftSticky'}
                          />
                        );
                      } else return <></>;
                    })}
                  <div
                    className="d-flex justify-content-center align-items-center"
                    onClick={(e) => openShiftModalHandler(4)}
                  ></div>
                </th>
                <th className="border text-center addScheduler-wrapper">
                  {allShifts &&
                    allShifts.map((item, index) => {
                      if (item.isOpen === true && item.weekDay == 5) {
                        return (
                          <ShiftSticky
                            stickyInfo={item}
                            key={index + 'ShiftSticky'}
                            toggleSidebar={toggleSidebar}
                          />
                        );
                      } else return <></>;
                    })}
                  <div
                    className="d-flex justify-content-center align-items-center"
                    onClick={(e) => openShiftModalHandler(5)}
                  ></div>
                </th>
                <th className="border text-center addScheduler-wrapper">
                  {allShifts &&
                    allShifts.map((item, index) => {
                      if (item.isOpen === true && item.weekDay == 6) {
                        return (
                          <ShiftSticky
                            stickyInfo={item}
                            key={index + 'ShiftSticky'}
                            toggleSidebar={toggleSidebar}
                          />
                        );
                      } else return <></>;
                    })}
                  <div
                    className="d-flex justify-content-center align-items-center"
                    onClick={(e) => openShiftModalHandler(6)}
                  ></div>
                </th>
              </tr>
            </tbody>
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

            {empNoPositionArrToMap.length > 0 &&
              empNoPositionArrToMap.map((item, index) => {
                return (
                  <tbody
                    style={{ background: item.fullName == userData.fullName ? 'aliceblue' : '' }}
                  >
                    <tr
                      key={item.id}
                      id={item.id}
                      className={classnames('border', {
                        active: item.fullName == userData.fullName
                      })}
                      style={{ width: '200px' }}
                    >
                      <th>
                        <div className="d-flex" style={{ padding: '10px' }}>
                          {item.fullName == userData.fullName ? (
                            <Check size={16} color="red" />
                          ) : (
                            <MoreVertical size={16} />
                          )}
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
                      <th className="border text-center addScheduler-wrapper" id={0}>
                        {item.shift.map((item1, index1) => {
                          if (item1.isOpen === false && item1.weekDay == 0) {
                            return (
                              <ShiftSticky
                                stickyInfo={item1}
                                toggleSidebar={toggleSidebar}
                                isActive={
                                  isProgressShift &&
                                  item._id == userData.id &&
                                  item1.weekDay == new Date().getDay()
                                }
                                key={index + ' ' + index1 + 'ShiftSticky'}
                              />
                            );
                          } else return <></>;
                        })}
                      </th>
                      <th
                        className="border text-center addScheduler-wrapper"
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
                                stickyIndex={1}
                                isActive={
                                  isProgressShift &&
                                  item._id == userData.id &&
                                  item1.weekDay == new Date().getDay()
                                }
                                toggleSidebar={toggleSidebar}
                                key={index + ' ' + index1 + 'ShiftSticky'}
                              />
                            );
                          } else return <></>;
                        })}
                      </th>
                      <th className="border text-center addScheduler-wrapper" id={2}>
                        {item.shift.map((item1, index1) => {
                          if (item1.isOpen === false && item1.weekDay == 2) {
                            return (
                              <ShiftSticky
                                stickyInfo={item1}
                                stickyIndex={2}
                                isActive={
                                  isProgressShift &&
                                  item._id == userData.id &&
                                  item1.weekDay == new Date().getDay()
                                }
                                toggleSidebar={toggleSidebar}
                                key={index + ' ' + index1 + 'ShiftSticky'}
                              />
                            );
                          } else return <></>;
                        })}
                      </th>
                      <th className="border text-center addScheduler-wrapper" id={3}>
                        {item.shift.map((item1, index1) => {
                          if (item1.isOpen === false && item1.weekDay == 3) {
                            return (
                              <ShiftSticky
                                stickyInfo={item1}
                                stickyIndex={3}
                                isActive={
                                  isProgressShift &&
                                  item._id == userData.id &&
                                  item1.weekDay == new Date().getDay()
                                }
                                toggleSidebar={toggleSidebar}
                                key={index + ' ' + index1 + 'ShiftSticky'}
                              />
                            );
                          } else return <></>;
                        })}
                        <div
                          className="d-flex justify-content-center align-items-center"
                          onClick={(e) => openShiftModalHandler(3)}
                        ></div>
                      </th>
                      <th className="border text-center addScheduler-wrapper" id={4}>
                        {item.shift.map((item1, index1) => {
                          if (item1.isOpen === false && item1.weekDay == 4) {
                            return (
                              <ShiftSticky
                                stickyInfo={item1}
                                stickyIndex={4}
                                isActive={
                                  isProgressShift &&
                                  item._id == userData.id &&
                                  item1.weekDay == new Date().getDay()
                                }
                                toggleSidebar={toggleSidebar}
                                key={index + ' ' + index1 + 'ShiftSticky'}
                              />
                            );
                          } else return <></>;
                        })}
                      </th>
                      <th className="border text-center addScheduler-wrapper" id={5}>
                        {item.shift.map((item1, index1) => {
                          if (item1.isOpen === false && item1.weekDay == 5) {
                            return (
                              <ShiftSticky
                                stickyInfo={item1}
                                stickyIndex={5}
                                isActive={
                                  isProgressShift &&
                                  item._id == userData.id &&
                                  item1.weekDay == new Date().getDay()
                                }
                                toggleSidebar={toggleSidebar}
                                key={index + ' ' + index1 + 'ShiftSticky'}
                              />
                            );
                          } else return <></>;
                        })}
                      </th>
                      <th className="border text-center addScheduler-wrapper" id={6}>
                        {item.shift.map((item1, index1) => {
                          if (item1.isOpen === false && item1.weekDay == 6) {
                            return (
                              <ShiftSticky
                                stickyInfo={item1}
                                stickyIndex={6}
                                isActive={
                                  isProgressShift &&
                                  item._id == userData.id &&
                                  item1.weekDay == new Date().getDay()
                                }
                                toggleSidebar={toggleSidebar}
                                key={index + ' ' + index1 + 'ShiftSticky'}
                              />
                            );
                          } else return <></>;
                        })}
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
                        <tbody key={positionIndex + '_employee'}>
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
                              .filter((item) => item.position[0]._id === positionItem._id)
                              .map((item, index) => {
                                return (
                                  <tr
                                    key={item.id}
                                    id={item.id}
                                    className={classnames('border', {
                                      active: item.fullName == userData.fullName
                                    })}
                                    style={{ width: '200px' }}
                                  >
                                    <th>
                                      <div className="d-flex" style={{ padding: '10px' }}>
                                        <MoreVertical size={16} />
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
                                    <th className="border text-center addScheduler-wrapper" id={0}>
                                      {item.shift.map((item1, index1) => {
                                        if (item1.isOpen === false && item1.weekDay == 0) {
                                          return (
                                            <ShiftSticky
                                              stickyInfo={item1}
                                              stickyIndex={0}
                                              isActive={
                                                isProgressShift &&
                                                item._id == userData.empContactId &&
                                                item1.weekDay == new Date().getDay()
                                              }
                                              toggleSidebar={toggleSidebar}
                                              key={index + ' ' + index1 + 'ShiftSticky'}
                                            />
                                          );
                                        } else return <></>;
                                      })}
                                    </th>
                                    <th className="border text-center addScheduler-wrapper" id={1}>
                                      {item.shift.map((item1, index1) => {
                                        if (item1.isOpen === false && item1.weekDay == 1) {
                                          return (
                                            <ShiftSticky
                                              stickyInfo={item1}
                                              stickyIndex={1}
                                              isActive={
                                                isProgressShift &&
                                                item._id == userData.empContactId &&
                                                item1.weekDay == new Date().getDay()
                                              }
                                              toggleSidebar={toggleSidebar}
                                              key={index + ' ' + index1 + 'ShiftSticky'}
                                            />
                                          );
                                        } else return <></>;
                                      })}
                                      <div
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={(e) => openShiftModalHandler(1)}
                                      ></div>
                                    </th>
                                    <th className="border text-center addScheduler-wrapper" id={2}>
                                      {item.shift.map((item1, index1) => {
                                        if (item1.isOpen === false && item1.weekDay == 2) {
                                          return (
                                            <ShiftSticky
                                              stickyInfo={item1}
                                              stickyIndex={2}
                                              isActive={
                                                isProgressShift &&
                                                item._id == userData.empContactId &&
                                                item1.weekDay == new Date().getDay()
                                              }
                                              toggleSidebar={toggleSidebar}
                                              key={index + ' ' + index1 + 'ShiftSticky'}
                                            />
                                          );
                                        } else return <></>;
                                      })}
                                      <div
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={(e) => openShiftModalHandler(2)}
                                      ></div>
                                    </th>
                                    <th className="border text-center addScheduler-wrapper" id={3}>
                                      {item.shift.map((item1, index1) => {
                                        if (item1.isOpen === false && item1.weekDay == 3) {
                                          return (
                                            <ShiftSticky
                                              stickyInfo={item1}
                                              stickyIndex={3}
                                              isActive={
                                                isProgressShift &&
                                                item._id == userData.empContactId &&
                                                item1.weekDay == new Date().getDay()
                                              }
                                              toggleSidebar={toggleSidebar}
                                              key={index + ' ' + index1 + 'ShiftSticky'}
                                            />
                                          );
                                        } else return <></>;
                                      })}
                                      <div
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={(e) => openShiftModalHandler(3)}
                                      ></div>
                                    </th>
                                    <th className="border text-center addScheduler-wrapper" id={4}>
                                      {item.shift.map((item1, index1) => {
                                        if (item1.isOpen === false && item1.weekDay == 4) {
                                          return (
                                            <ShiftSticky
                                              stickyInfo={item1}
                                              stickyIndex={4}
                                              isActive={
                                                isProgressShift &&
                                                item._id == userData.empContactId &&
                                                item1.weekDay == new Date().getDay()
                                              }
                                              toggleSidebar={toggleSidebar}
                                              key={index + ' ' + index1 + 'ShiftSticky'}
                                            />
                                          );
                                        } else return <></>;
                                      })}
                                      <div
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={(e) => openShiftModalHandler(4)}
                                      ></div>
                                    </th>
                                    <th className="border text-center addScheduler-wrapper" id={5}>
                                      {item.shift.map((item1, index1) => {
                                        if (item1.isOpen === false && item1.weekDay == 5) {
                                          return (
                                            <ShiftSticky
                                              stickyInfo={item1}
                                              stickyIndex={5}
                                              isActive={
                                                isProgressShift &&
                                                item._id == userData.empContactId &&
                                                item1.weekDay == new Date().getDay()
                                              }
                                              toggleSidebar={toggleSidebar}
                                              key={index + ' ' + index1 + 'ShiftSticky'}
                                            />
                                          );
                                        } else return <></>;
                                      })}
                                      <div
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={(e) => openShiftModalHandler(5)}
                                      ></div>
                                    </th>
                                    <th className="border text-center addScheduler-wrapper" id={6}>
                                      {item.shift.map((item1, index1) => {
                                        if (item1.isOpen === false && item1.weekDay == 6) {
                                          return (
                                            <ShiftSticky
                                              stickyInfo={item1}
                                              stickyIndex={6}
                                              toggleSidebar={toggleSidebar}
                                              isActive={
                                                isProgressShift &&
                                                item._id == userData.empContactId &&
                                                item1.weekDay == new Date().getDay()
                                              }
                                              key={index + ' ' + index1 + 'ShiftSticky'}
                                            />
                                          );
                                        } else return <></>;
                                      })}
                                      <div
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={(e) => openShiftModalHandler(6)}
                                      ></div>
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
        </div>
      </Card>
      <EditLocationModal
        openEditZip={openEditZip}
        setOpenEditZip={setOpenEditZip}
        zipCode={zipCode}
        setZipCode={setZipCode}
        zipEditHandler={zipEditHandler}
      />
      <EmpCheckinSidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setSidebarOpen={setSidebarOpen}
      />
    </Fragment>
  );
};

export default EmpWeekCalender;
