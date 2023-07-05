// ** React Imports
import { useState, useEffect } from 'react';
// ** Third Party Components
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import { CheckCircle, X } from 'react-feather';
import Select, { components } from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';
import Swal from 'sweetalert2';

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Form,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  ButtonGroup,
  Row,
  Col,
  Card
} from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  createClass,
  updateClass,
  updateWholeSeries,
  getClassbookingBySeries,
  selectClass,
  fetchPrograms
} from '../store';
import { getUserData } from '../../../auth/utils';

//** Component imports */
import MarkAttendance from './MarkAttendance';
import Booked from './Booked';
import AttendanceAction from './AttendanceAction';
import { initialTimeScheduleTemplate, rangeOptions } from './constants';
import { update } from 'firebase/database';
import AddProgram from './AddProgram';
import { IoSettingsOutline } from 'react-icons/io5';
import { sortDays } from '../../../utility/Utils';

const AddClass = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state?.calendar);

  const contactsList = useSelector((state) => state.totalContacts?.contactList?.list);
  const classBookingsList = useSelector((state) => state.calendar?.classBookings);
  const classList = useSelector((state) => state.calendar?.classes?.classes);
  const programList = useSelector((state) => state.calendar?.programs);

  const selectedClass = store?.selectedClass;

  // ** Props
  const { openAddClass, setOpenAddClass } = props;

  // ** States
  const [allDay, setAllDay] = useState(selectedClass?.allDay ? selectedClass?.allDay : false);
  const [activeTab, setActiveTab] = useState('markAttendance');
  const [bookingRequired, setBookingRequired] = useState(false);
  const [contacts, setContactsData] = useState([]);
  const [totalContacts, setTotalContactsData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [wholeSeriesStartDate, setWholeSeriesStartDate] = useState(new Date());
  const [wholeSeriesEndDate, setWholeSeriesEndDate] = useState(new Date());
  const [isDateTimeChange, setIsDateTimeChange] = useState(false);
  const [isClassStartTimeChange, setIsClassStartTimeChange] = useState(false);
  const [range, setCurrentRange] = useState({
    value: 0,
    label: '0'
  });

  // ** Program Setting Modal Open State
  const [programSettingOpen, setProgramSettingOpen] = useState(false);

  //-------schedule------------------------------------------

  const [classStartTime, setClassStartTime] = useState(moment().format('HH:mm'));
  const [classEndTime, setClassEndTime] = useState(moment().format('HH:mm'));
  const [classDays, setClassDays] = useState(
    selectedClass?.classDays ? selectedClass?.classDays : []
  );
  //-----------------------

  const [classTimeAndWeekSchedule, setClassTimeAndWeekSchedule] = useState([
    initialTimeScheduleTemplate
  ]);

  //---------------------------------------------------------

  const [intialClassDays, setIntialClassDays] = useState(
    selectedClass?.classDays ? selectedClass?.classDays : []
  );
  const [classTitle, setClassTitle] = useState('');
  const [programName, setProgramName] = useState([
    {
      value: 'Little Tiger',
      label: 'Little Tiger',
      color: 'primary'
    }
  ]);
  const [onlyUpdateSchedule, setOnlyUpdateSchedule] = useState(true);
  const [type, setType] = useState('');

  // ** Select Options
  const options = programList?.map((x) => ({
    ...x,
    value: x.title,
    label: x.title,
    color: x.color
  }));

  useEffect(() => {
    if (selectedClass?._id) {
      setClassTitle(selectedClass?.classTitle);
      setClassDays(selectedClass?.classDays);
      setIntialClassDays(selectedClass?.classDays);
      setProgramName(selectedClass?.programName);
      setClassEndTime(selectedClass.classEndTime);
      setClassStartTime(selectedClass?.classStartTime);
      setClassTimeAndWeekSchedule(selectedClass?.schedule);
      setStartDate(new Date(selectedClass?.startDate));
      setEndDate(new Date(selectedClass?.endDate));
      setWholeSeriesStartDate(selectedClass?.wholeSeriesStartDate);
      setWholeSeriesEndDate(selectedClass?.wholeSeriesEndDate);
      const startDateTime = moment(
        `${selectedClass?.startDate} ${selectedClass?.classStartTime}`
      ).format('YYYY-MM-DD HH:mm');
      const endDateTime = moment(`${selectedClass?.endDate} ${selectedClass?.classEndTime}`).format(
        'YYYY-MM-DD HH:mm'
      );
      const diffInMinutes = moment(endDateTime).diff(startDateTime, 'minutes');
      setCurrentRange({
        value: diffInMinutes,
        label: `${diffInMinutes}`
      });

      setBookingRequired(selectedClass?.bookingRequired);
    } else {
      setClassTitle('');
      setBookingRequired(false);
      setClassDays([]);
      setIntialClassDays([]);
      setStartDate(new Date());
      setEndDate(new Date());
      setClassStartTime(moment().format('HH:mm'));
      setClassEndTime(moment().format('HH:mm'));
      setCurrentRange({
        value: 0,
        label: '0'
      });
      setProgramName([
        {
          value: 'Little Tiger',
          label: 'Little Tiger',
          color: 'primary'
        }
      ]);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (range.value != 0) {
      setClassEndTime(moment(classStartTime, 'HH:mm').add(range.value, 'minutes').format('HH:mm'));
    } else {
      setClassEndTime(moment(classStartTime, 'HH:mm').format('HH:mm'));
    }
  }, [range, isClassStartTimeChange]);

  useEffect(() => {
    // going to update again
    if (classBookingsList?.length > 0) {
      const cnt = classBookingsList.map((contact) => {
        return {
          ...contact,
          value: contact._id,
          label: contact.fullName
        };
      });
      setContactsData(cnt, 'cnt');
    }
  }, [classBookingsList]);

  useEffect(() => {
    // going to update again
    if (contactsList?.length > 0) {
      const cnt = contactsList.map((contact) => {
        return {
          ...contact,
          value: contact._id,
          label: contact.fullName
        };
      });
      setTotalContactsData(cnt, 'cnt');
    }
  }, [contactsList]);

  useEffect(() => {
    if (selectedClass?._id !== undefined && selectedClass?._id !== '') {
      dispatch(getClassbookingBySeries(selectedClass?.seriesId));
    }
  }, [selectedClass]);

  useEffect(() => {
    if (classBookingsList !== undefined && classBookingsList.length > 0) {
      const bookingDatalist = classBookingsList
        ?.filter((booking) => booking?.status !== true)
        .map((booking) => {
          return {
            ...booking,
            _id: booking?.contactId,
            value: booking?._id,
            label: booking?.fullName
          };
        });
      setBookingData(bookingDatalist);
    }
  }, [classBookingsList]);

  useEffect(() => {
    if (JSON.stringify(intialClassDays) !== JSON.stringify(classDays)) {
      setIsDateTimeChange(true);
    }
  }, [classDays]);

  const initState = () => {
    setClassTitle('');
    setOnlyUpdateSchedule(true);
    setProgramName([
      {
        value: 'Little Tiger',
        label: 'Little Tiger',
        color: 'primary'
      }
    ]);
    setStartDate(new Date());
    setEndDate(new Date());
    setClassTimeAndWeekSchedule([initialTimeScheduleTemplate]);
    setBookingRequired(false);
    dispatch(selectClass({}));
    setActiveTab('markAttendance');
  };
  // ** Custom select components
  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <span
          className={`bullet bullet-${data.color.replace('light-', '')} bullet-sm me-50`}
          style={{ opacity: data.color.includes('light') ? 0.2 : 1 }}
        ></span>
        {data.label}
      </components.Option>
    );
  };

  // ** Close BTN
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={() => setOpenAddClass(!openAddClass)} />
  );

  const handleAddClass = async () => {
    const payload = {
      userId: getUserData().id,
      classTitle,
      programName,
      startDate,
      endDate,
      // classStartTime,
      // classEndTime,
      // classDays,
      schedule: classTimeAndWeekSchedule,
      allDay,
      bookingRequired
    };

    if (selectedClass?._id && !selectedClass?.seriesId) {
      payload._id = selectedClass?._id;
      dispatch(updateClass(payload));
    } else if (!selectedClass?._id) {
      dispatch(createClass(payload));
    }
    setOpenAddClass(!openAddClass);
    initState();
  };

  useEffect(() => {
    if (type !== '' && type !== undefined) {
      const wholeSeriesPayload = {
        userId: getUserData().id,
        classId: selectedClass?._id,
        seriesId: selectedClass?.seriesId,
        classTitle,
        programName,
        wholeSeriesStartDate: selectedClass?.seriesId ? wholeSeriesStartDate : startDate,
        wholeSeriesEndDate: selectedClass?.seriesId ? wholeSeriesEndDate : endDate,
        schedule: classTimeAndWeekSchedule,
        allDay,
        isDateTimeChange,
        type: type,
        bookingRequired
      };
      dispatch(updateWholeSeries(wholeSeriesPayload));
      setClassEndTime(selectedClass.classEndTime);
      setCurrentRange({
        value: 0,
        label: '0'
      });
      setType('');
    }
  }, [type]);

  useEffect(() => {
    dispatch(fetchPrograms());
  }, [openAddClass]);

  const onCheckboxBtnClick = (timeScheduleIndex, selected) => {
    let selectedDays = [...classTimeAndWeekSchedule[timeScheduleIndex]?.classDays];
    const id = selectedDays.indexOf(selected);

    if (id < 0) {
      selectedDays.push(selected);
    } else {
      selectedDays.splice(id, 1);
    }
    setClassTimeAndWeekSchedule(
      classTimeAndWeekSchedule.map((x, index) =>
        index == timeScheduleIndex
          ? {
              ...x,
              classDays: sortDays(selectedDays)
            }
          : x
      )
    );
  };

  const rendertimeAndWeekSet = () => {
    return classTimeAndWeekSchedule.map((schedule, index) => (
      <Card body className="mb-1" key={index}>
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between w-100">
            <Label className="form-label">Repeat Weekly on</Label>
            <Button
              color="flat-secondary"
              style={{
                marginTop: '-1rem',
                marginRight: '-1rem',
                padding: '0.5rem',
                width: '32px',
                height: '32px'
              }}
              onClick={(e) => {
                e.preventDefault();
                closetimeAndWeekSchedule(index);
              }}
            >
              <X size={16} />
            </Button>
          </div>
          <ButtonGroup className="mb-1">
            <Button
              color="primary"
              onClick={() => onCheckboxBtnClick(index, 'Sunday')}
              outline={!schedule?.classDays.includes('Sunday')}
            >
              S
            </Button>
            <Button
              color="primary"
              onClick={() => onCheckboxBtnClick(index, 'Monday')}
              outline={!schedule?.classDays.includes('Monday')}
            >
              M
            </Button>
            <Button
              color="primary"
              onClick={() => onCheckboxBtnClick(index, 'Tuesday')}
              outline={!schedule?.classDays.includes('Tuesday')}
            >
              T
            </Button>
            <Button
              color="primary"
              onClick={() => onCheckboxBtnClick(index, 'Wednesday')}
              outline={!schedule?.classDays.includes('Wednesday')}
            >
              w
            </Button>
            <Button
              color="primary"
              onClick={() => onCheckboxBtnClick(index, 'Thursday')}
              outline={!schedule?.classDays.includes('Thursday')}
            >
              T
            </Button>
            <Button
              color="primary"
              onClick={() => onCheckboxBtnClick(index, 'Friday')}
              outline={!schedule?.classDays.includes('Friday')}
            >
              F
            </Button>
            <Button
              color="primary"
              onClick={() => onCheckboxBtnClick(index, 'Saturday')}
              outline={!schedule?.classDays.includes('Saturday')}
            >
              S
            </Button>
          </ButtonGroup>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-0">
              <Label className="form-label" for="classStartTime" required>
                Start Time
              </Label>
              <Flatpickr
                required
                id={`classStartTime${index}`}
                name="classStartTime"
                className="form-control"
                onChange={(time) => {
                  setClassTimeAndWeekSchedule(
                    classTimeAndWeekSchedule.map((x, id) =>
                      id == index
                        ? {
                            ...x,
                            classStartTime: moment(time[0]).format('HH:mm'),
                            classEndTime: moment(time[0], 'HH:mm')
                              .add(x.range, 'minutes')
                              .format('HH:mm')
                          }
                        : x
                    )
                  );
                }}
                value={schedule?.classStartTime}
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: 'G:i K'
                }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-0">
              <Label className="form-label" for="classEndTime">
                End Time
              </Label>
              <Flatpickr
                required
                id={`classEndTime${index}`}
                name="classEndTime"
                className="form-control"
                value={schedule?.classEndTime}
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: 'G:i K'
                }}
                disabled
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-0">
              <Label className="form-label" for="SelectMinutes">
                Select Minutes
              </Label>
              <Select
                id={`SelectMinutes${index}`}
                name="SelectMinutes"
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={rangeOptions}
                value={rangeOptions.filter((x) => x?.value == schedule?.range)}
                style={{ menuPortal: (base) => ({ ...base, zIndex: 0 }) }}
                // menuContainerStyle={{ zIndex: 999 }}
                onChange={(data) => {
                  setClassTimeAndWeekSchedule(
                    classTimeAndWeekSchedule.map((x, id) =>
                      id == index
                        ? {
                            ...x,
                            classEndTime: moment(x.classStartTime, 'HH:mm')
                              .add(data.value, 'minutes')
                              .format('HH:mm'),
                            range: data.value
                          }
                        : x
                    )
                  );
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    ));
  };

  const renderAddTimeScheduleButton = () => {
    return (
      <Button
        className="w-100"
        color="primary"
        onClick={() => {
          setClassTimeAndWeekSchedule([
            ...classTimeAndWeekSchedule,
            {
              ...initialTimeScheduleTemplate,
              index: classTimeAndWeekSchedule.length + 1
            }
          ]);
        }}
      >
        Add new schedule
      </Button>
    );
  };

  const closetimeAndWeekSchedule = (timeScheduleIndex) => {
    setClassTimeAndWeekSchedule(
      classTimeAndWeekSchedule.filter((x, index) => {
        if (index !== timeScheduleIndex) return x;
      })
    );
  };

  const programSettingClicked = () => {
    setProgramSettingOpen(true);
  };

  const toggleProgramModal = () => {
    setProgramSettingOpen(false);
  };

  // submit form with react Query
  return (
    <Modal
      isOpen={openAddClass}
      // className="sidebar-lg"
      style={{ width: selectedClass?._id ? '850px' : '500px' }}
      toggle={() => {
        setOpenAddClass(!openAddClass);
        initState();
      }}
      contentClassName="p-0 overflow-hidden"
      modalClassName="modal-slide-in event-sidebar"
    >
      <ModalHeader
        className="mb-1"
        toggle={() => {
          setOpenAddClass(!openAddClass);
          initState();
        }}
        close={CloseBtn}
        tag="div"
      >
        {selectedClass?._id ? (
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'markAttendance'
                })}
                onClick={() => {
                  setActiveTab('markAttendance');
                }}
              >
                <h5 className="modal-title">Mark Attendance</h5>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'booked'
                })}
                onClick={() => {
                  setActiveTab('booked');
                }}
              >
                <h5 className="modal-title">Booked</h5>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'updateClass'
                })}
                onClick={() => {
                  setActiveTab('updateClass');
                }}
              >
                <h5 className="modal-title">Update Class</h5>
              </NavLink>
            </NavItem>
          </Nav>
        ) : (
          'Create Class'
        )}
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
          <TabContent activeTab={selectedClass?._id ? activeTab : 'updateClass'}>
            <TabPane tabId="updateClass">
              <Form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="mb-1 mt-1">
                  <Label className="form-label" for="label">
                    Program Name
                  </Label>
                  <div className="d-flex align-items-center w-100">
                    <Select
                      id="label"
                      value={programName}
                      options={options}
                      theme={selectThemeColors}
                      className="react-select me-1 w-100"
                      classNamePrefix="select"
                      isClearable={false}
                      onChange={(data) => setProgramName([data])}
                      components={{
                        Option: OptionComponent
                      }}
                    />
                    <Button color="flat-secondary" className="p-0" onClick={programSettingClicked}>
                      <IoSettingsOutline size={24} />
                    </Button>
                  </div>
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="title">
                    Class Name <span className="text-danger">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={classTitle}
                    placeholder="Class Name"
                    onChange={(event) => {
                      setClassTitle(event.target.value);
                      setOnlyUpdateSchedule(false);
                    }}
                  />
                </div>
                {/*------- date----*/}
                {!selectedClass?.seriesId && (
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-1">
                        <Label className="form-label" for="startDate">
                          Start Date
                        </Label>
                        <Flatpickr
                          required
                          id="startDate"
                          name="startDate"
                          className="form-control"
                          onChange={(date) => {
                            setStartDate(new Date(date[0]));
                            setOnlyUpdateSchedule(false);
                          }}
                          value={startDate}
                          options={{
                            enableTime: false,
                            dateFormat: 'm/d/Y'
                            //  minDate: 'today'
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-1">
                        <Label className="form-label" for="endDate">
                          End Date
                        </Label>

                        <Flatpickr
                          required
                          id="endDate"
                          name="endDate"
                          className="form-control"
                          onChange={(date) => {
                            setEndDate(date[0]);
                            setOnlyUpdateSchedule(false);
                          }}
                          value={endDate}
                          options={{
                            enableTime: false,
                            dateFormat: 'm/d/Y',
                            minDate: startDate
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/*---------end date ---------------*/}
                {selectedClass?.seriesId && (
                  <div className="row ">
                    <div className="col-md-6">
                      <div className="mb-1">
                        <Label className="form-label" for="startDate">
                          Start Date
                        </Label>
                        <Flatpickr
                          required
                          id="wholeSeriesStartDate"
                          name="wholeSeriesStartDate"
                          className="form-control"
                          onChange={(date) => {
                            setWholeSeriesStartDate(date[0]);
                            setIsDateTimeChange(true);
                            setOnlyUpdateSchedule(false);
                          }}
                          value={
                            selectedClass?.wholeSeriesStartDate
                              ? selectedClass?.wholeSeriesStartDate
                              : wholeSeriesStartDate
                          }
                          options={{
                            enableTime: false,
                            dateFormat: 'm/d/Y'
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-1">
                        <Label className="form-label" for="endDate">
                          End Date
                        </Label>
                        <Flatpickr
                          required
                          id="wholeSeriesEndDate"
                          name="wholeSeriesEndDate"
                          className="form-control"
                          onChange={(date) => {
                            setWholeSeriesEndDate(date[0]);
                            setIsDateTimeChange(true);
                            setOnlyUpdateSchedule(false);
                          }}
                          value={
                            selectedClass?.wholeSeriesEndDate
                              ? selectedClass?.wholeSeriesEndDate
                              : wholeSeriesEndDate
                          }
                          options={{
                            enableTime: false,
                            dateFormat: 'm/d/Y',
                            minDate: wholeSeriesStartDate
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {rendertimeAndWeekSet()}
                {renderAddTimeScheduleButton()}

                <div className="col-md-12 mt-1">
                  <div className="form-switch mb-2">
                    <Input
                      id="bookingRequired"
                      type="switch"
                      className="me-1"
                      checked={bookingRequired}
                      name="bookingRequired"
                      style={{ borderRadius: '1rem' }}
                      onChange={(e) => {
                        setBookingRequired(e.target.checked);
                        setOnlyUpdateSchedule(false);
                      }}
                    />
                    <Label className="form-label" for="bookingRequired">
                      Booking required to attend ?
                    </Label>
                  </div>
                </div>
                <div className="d-flex mb-1">
                  {selectedClass?._id ? (
                    <Button
                      className="me-1 d-flex"
                      type="submit"
                      color="primary"
                      onClick={() => {
                        if (selectedClass?.seriesId) {
                          onlyUpdateSchedule
                            ? Swal.fire({
                                title: 'Update Class',
                                text: `Do you want to update this class?`,
                                icon: 'question',
                                confirmButtonText: 'Update',
                                confirmButtonColor: '#d33',

                                showCancelButton: true,
                                cancelButtonText: 'Cancel',
                                cancelButtonColor: '#3085d6',

                                customClass: {
                                  confirmButton: 'btn btn-danger',
                                  cancelButton: 'btn btn-outline-danger ms-1'
                                },
                                buttonsStyling: false
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  setType('all');
                                  setOpenAddClass(!openAddClass);
                                }
                              })
                            : Swal.fire({
                                title: 'Update Class',
                                text: `Do you want to update this class?`,
                                icon: 'question',
                                confirmButtonText: 'Whole Series',
                                confirmButtonColor: '#d33',

                                showDenyButton: true,
                                denyButtonColor: '#3d3',
                                denyButtonText: 'Single Class',

                                showCancelButton: true,
                                cancelButtonText: 'Cancel',
                                cancelButtonColor: '#3085d6',

                                customClass: {
                                  confirmButton: 'btn btn-danger',
                                  denyButton: 'btn btn-success ms-1',
                                  cancelButton: 'btn btn-outline-danger ms-1'
                                },
                                buttonsStyling: false
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  setType('all');
                                  setOpenAddClass(!openAddClass);
                                } else if (result.isDenied) {
                                  setType('single');
                                  setOpenAddClass(!openAddClass);
                                }
                              });
                        } else {
                          setType('single');
                          setOpenAddClass(!openAddClass);
                        }
                      }}
                    >
                      Update Class
                    </Button>
                  ) : (
                    <Button
                      className="me-1 d-flex"
                      type="submit"
                      color="primary"
                      onClick={() => {
                        handleAddClass();
                      }}
                    >
                      Create Class
                    </Button>
                  )}

                  {selectedClass?._id && (
                    <AttendanceAction
                      classRow={selectedClass}
                      actionFrom="classModel"
                      setOpenAddClass={setOpenAddClass}
                      initState={initState}
                    />
                  )}
                  <Button
                    className="d-flex"
                    color="secondary"
                    type="reset"
                    onClick={() => setOpenAddClass(!openAddClass)}
                    outline
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </TabPane>
            <TabPane tabId="markAttendance">
              <MarkAttendance
                bookingRequired={bookingRequired}
                bookingData={bookingRequired ? bookingData : totalContacts}
                classBookingsList={classBookingsList}
              />
            </TabPane>
            <TabPane tabId="booked">
              <Booked contacts={totalContacts} classBookingsList={classBookingsList} />
            </TabPane>
          </TabContent>
          <AddProgram
            open={programSettingOpen}
            dispatch={dispatch}
            programs={options}
            toggle={toggleProgramModal}
          />
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  );
};

export default AddClass;
