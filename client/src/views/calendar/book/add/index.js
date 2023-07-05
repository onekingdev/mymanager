// ** React Imports
import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, Input, Button, Label, NavLink } from 'reactstrap';

// ** Third Party Components
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import moment from 'moment';
import { SelectTimezone } from 'reactjs-timezone-select';
// ** Component Imports

// ** Icons Imports
import { AiOutlineClockCircle, AiOutlineCalendar } from 'react-icons/ai';
import { TbWorld } from 'react-icons/tb';

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors';

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/apps/app-calendar.scss';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';

// ** Events Actions Import
import { getBookingDetail, getBookingType, getBookingTypeDetail } from '../store';
import { Check, Copy, X } from 'react-feather';
import { getEventInfo } from '../../event/store';
import Calendar from 'react-calendar';
import ModalData from './Modal';

const MySwal = withReactContent(Swal);

const AddBooking = () => {
  const { typeLink, updateLink } = useParams();
  const { colors } = useContext(ThemeColors);
  const [startDate, setStartDate] = useState(null);
  const [status, setStatus] = useState(true);
  const [timezone, setTimeZone] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const history = useHistory();

  const [selectTime, setSelectTime] = useState(null);

  const [picker, setPicker] = useState(null);
  const [showTime, setShowTime] = useState(false);
  const [timeList, setTimeList] = useState([]);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  // ** Store vars
  const dispatch = useDispatch();

  const formatTime = (time) => {
    let hour = parseInt(time / 60);
    let minutes = time % 60;
    if (minutes < 10) minutes = '0' + minutes;
    let prefix = 'am';
    if (hour >= 12) {
      prefix = 'pm';
    }
    if (hour > 12) hour = hour - 12;
    return hour + ':' + minutes + ' ' + prefix;
  };

  const formatLocaleTime = (date, timezone) => {
    date = new Date(date);
    var diff = 0;
    if (timezone) {
      let originDate = new Date(
        date.toLocaleString('en-US', {
          timeZone: timezone
        })
      );
      diff = originDate.getTime() - date.getTime();
    }
    let originDate = new Date(date.getTime() + diff);
    return moment(originDate).format('LL') + ' at ' + moment(originDate).format('LT');
  };
  const { userData } = useSelector((state) => state.auth);

  const infiniteDate = () => {
    var MAX_TIMESTAMP = 8640000000000000;

    return new Date(MAX_TIMESTAMP);
  };

  const checkFinished = (date, timezone, duration) => {
    var diff = 0;
    if (timezone) {
      let originDate = new Date(
        date.toLocaleString('en-US', {
          timeZone: timezone
        })
      );
      diff = originDate.getTime() - date.getTime();
    }
    let originDate = new Date(date.getTime() + diff);
    let endDate = new Date(originDate.getTime() + duration * 60 * 1000);
    return new Date().getTime() >= endDate;
  };

  const setBookingInfo = (data) => {
    let date = new Date(data.startDate);
    let hour = moment(date).hours();
    let minutes = moment(date).minutes();
    date = moment(date).format('LL');
    let time = hour * 60 + minutes;
    // setSelectTime(time)
    date = new Date(date);
    setStatus(!checkFinished(date, data.timezone, data.duration));
    if (data.timezone) {
      setTimeZone(data.timezone);
      var diff = 0;
      if (timezone) {
        let originDate = new Date(
          date.toLocaleString('en-US', {
            timeZone: data.timezone
          })
        );
        diff = originDate.getTime() - date.getTime();
      }
      let originDate = new Date(date.getTime() + diff);
      setPicker(originDate);
    } else {
      setPicker(date);
    }

    setShowTime(true);
  };

  const setWholeTimeList = (duration) => {
    var timeList = [];
    for (var i = 60 * 8; i <= 60 * 22 + duration; i += duration) {
      timeList.push(i);
    }
    setTimeList(timeList);
  };
  const store = useSelector((state) => {
    //setBookingInfo(state.book)
    return state.book;
  });
  useEffect(async () => {
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(timezone);
    if (typeLink) {
      let data = await dispatch(getBookingTypeDetail(typeLink));
      setWholeTimeList(data.payload.data.duration);
    } else if (updateLink) {
      let data = await dispatch(getBookingDetail(updateLink));
      setBookingInfo(data.payload.data);
      let bookingTypeData = await dispatch(
        getBookingTypeDetail(data.payload.data.bookingType.link)
      );
      setWholeTimeList(bookingTypeData.payload.data.duration);
      // dispatch(getBookingDetail(updateLink))
    }
  }, [dispatch]);

  return (
    <Fragment>
      <div className="app-booking-container">
        <div className={showTime ? 'app-booking' : 'app-booking-small'}>
          <Row>
            <Col md={showTime ? 3 : 5} sm="12" className="p-2 border-end">
              <div className="mt-1">
                <small>{userData && userData?.fullName}</small>
              </div>
              <div className="mt-1">
                <h1 className="form-check-label fw-bolder">
                  {store.detailBookingType && store.detailBookingType.title}
                </h1>
              </div>
              <div className="mt-1">
                <AiOutlineClockCircle className="font-medium-3 me-50" />
                <span className="fw-bold">
                  {store.detailBookingType && store.detailBookingType.duration} minutes
                </span>
              </div>
              {store.detailBooking && store.detailBooking._id ? (
                <div>
                  <div className="mt-1">
                    <AiOutlineCalendar className="font-medium-3 me-50" />
                    <span className="fw-bold">
                      {formatLocaleTime(
                        new Date(store.detailBooking.startDate),
                        store.detailBooking.timezone
                      )}
                    </span>
                  </div>

                  <h4 className="form-check-label fw-bolder mt-1">{store.detailBooking.name}</h4>
                  {status ? (
                    <Button
                      className="mt-1"
                      type="reset"
                      color="secondary"
                      outline
                      onClick={() => {
                        history.goBack();
                      }}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <h6 className="form-check-label fw-bolder mt-1">Completed</h6>
                  )}
                </div>
              ) : null}
            </Col>
            <Col md={showTime ? 6 : 7} sm="12" className="p-2">
              <h4 className="form-check-label fw-bolder px-1">Select a Date & Time</h4>

              <div className="d-flex justify-content-center align-items-center mt-1">
                <div>
                  <Calendar
                    minDate={new Date()}
                    calendarType={'US'}
                    value={picker}
                    className="form-control invoice-edit-input due-date-picker"
                    onChange={(date) => {
                      if (status && store.detailBookingType.status) {
                        setPicker(date);
                        setShowTime(true);
                      }
                    }}
                    showNeighboringMonth={true}
                  />
                </div>
              </div>
              <h6 className="form-check-label fw-bolder px-1 mt-2">Timezone</h6>
              <div className="ms-1 mt-1 timezone-container d-flex align-items-center">
                <TbWorld className="font-medium-3 me-50 me-1" />
                <SelectTimezone
                  id="custom_timezone"
                  name={'Custom timezone'}
                  label=""
                  value={timezone}
                  onChange={({ label, value }) => {
                    setTimeZone(value);
                  }}
                  containerStyles={{ width: 300 }}
                  optionLabelFormat={(timzone) => `${timzone.name} (${timzone.abbreviation})`}
                />
              </div>
            </Col>
            {showTime && status ? (
              <Col
                md="3"
                sm="12"
                className="react-slidedown"
                style={{ maxHeight: '500px', overflow: 'auto' }}
              >
                <div className="mt-4">
                  <h6>{picker && moment(picker).format('LL')}</h6>
                </div>
                {timeList.map((time) => {
                  if (selectTime != time) {
                    return (
                      <Button
                        onClick={(e) => {
                          // toggleSidebar()
                          // setStartDate(new Date(new Date(picker[0]).getTime() + time*60000))
                          setSelectTime(time);
                        }}
                        outline
                        className="w-100 mt-1"
                        color="primary"
                      >
                        {formatTime(time)}
                      </Button>
                    );
                  } else {
                    return (
                      <Row>
                        <Col sm="6">
                          <Button
                            onClick={(e) => {
                              // toggleSidebar()
                              // setStartDate(new Date(new Date(picker[0]).getTime() + time*60000))
                              setSelectTime(time);
                            }}
                            className="w-100 mt-1 px-0"
                            color="secondary"
                          >
                            {formatTime(time)}
                          </Button>
                        </Col>

                        <Col sm="6">
                          <Button
                            onClick={(e) => {
                              var invdate = new Date(
                                picker.toLocaleString('en-US', {
                                  timeZone: timezone
                                })
                              );

                              // then invdate will be 07:00 in Toronto
                              // and the diff is 5 hours
                              var diff = picker.getTime() - invdate.getTime();
                              let startDate = new Date(picker.getTime() + time * 60000 + diff);

                              toggleSidebar();
                              setStartDate(startDate);
                            }}
                            className="w-100 mt-1 px-0"
                            color="primary"
                          >
                            Confirm
                          </Button>
                        </Col>
                      </Row>
                    );
                  }
                })}
              </Col>
            ) : null}
          </Row>
        </div>

        <ModalData
          open={sidebarOpen}
          toggleSidebar={toggleSidebar}
          timezone={timezone}
          detailBooking={store.detailBooking}
          duration={store.detailBookingType && store.detailBookingType.duration}
          startDate={startDate}
        />
      </div>
    </Fragment>
  );
};
export default AddBooking;
