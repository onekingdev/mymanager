// ** React Imports
import { useState, useEffect } from 'react';

// ** Third Party Components
import Flatpickr from 'react-flatpickr';
import { CheckCircle, X } from 'react-feather';
import Select, { components } from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Form,
  Row,
  Col,
  ModalFooter
} from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import moment from 'moment';
import { GiConsoleController } from 'react-icons/gi';

// ** Store Actions
import { updateAppointment } from '../store';
import { useDispatch, useSelector } from 'react-redux';

import useMessage from '../../../lib/useMessage';
import { ca } from 'date-fns/locale';

// ** Select Options

const durations = [
  '5 mins',
  '10 mins',
  '15 mins',
  '30 mins',
  '45 mins',
  '1 hr',
  '1.5 hrs',
  '2 hrs',
  '2.5 hrs',
  '3 hrs',
  '3.5 hrs',
  '4 hrs',
  '4.5 hrs',
  '5 hrs',
  '5.5 hrs',
  '6 hrs',
  '6.5 hrs',
  '7 hrs',
  '7.5 hrs',
  '8 hrs',
  '8.5 hrs',
  '9 hrs',
  '8.5 hrs',
  '10 hrs',
  '10.5 hrs',
  '11 hrs',
  '11.5 hrs',
  '12 hrs',
  '12.5 hrs',
  '13 hrs',
  '13.5 hrs',
  '14 hrs',
  '14.5 hrs',
  '15 hrs',
  '15.5 hrs',
  '16 hrs',
  '16.5 hrs',
  '17 hrs',
  '17.5 hrs',
  '18 hrs',
  '18.5 hrs',
  '19 hrs',
  '18.5 hrs',
  '20 hrs',
  '20.5 hrs',
  '21 hrs',
  '21.5 hrs',
  '22 hrs',
  '22.5 hrs',
  '23 hrs',
  '23.5 hrs'
];
const durationOptions = durations.map((x) => {
  return {
    value: x.indexOf('min') > 0 ? parseInt(x.split(' ')[0]) : parseFloat(x.split(' ')[0]) * 60,
    label: x
  };
});
const repeatOn = [
  { value: 'No Repeat', label: 'No Repeat' },
  { value: 'Day', label: 'Day' },
  { value: 'Week', label: 'Week' },
  { value: 'Month', label: 'Month' },
  { value: 'Year', label: 'Year' }
];

const notificationOptions = [
  { value: 5, label: '5 minutes before' },
  { value: 10, label: '10 minutes before' },
  { value: 15, label: '15 minutes before' },
  { value: 30, label: '30 minutes before' },
  { value: 60, label: '1 hour before' },
  { value: 1440, label: '1 day before' }
];

const UpdateAppointment = (props) => {
  // ** Props
  const { updateAppointmentSidebarOpen, setUpdateAppointmentSidebarOpen } = props;

  const contactsList = useSelector((state) => state.totalContacts?.contactList?.list);

  const [inviteOptions, setInviteOptions] = useState(
    contactsList?.map((x) => {
      return {
        value: x._id,
        label: x.fullName
      };
    })
  );

  // ** States
  const [calendarEventType, setCalendarEventType] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [title, setTitle] = useState('');
  //   const [datePicker, setDatePicker] = useState(new Date());
  const [startPicker, setStartPicker] = useState(new Date());
  const [endPicker, setEndPicker] = useState(new Date(new Date().getTime() + 30 * 60 * 1000));
  const [selectedRepeatType, setSelectedRepeatType] = useState(repeatOn[0]);
  const [daysSelected, setDaysSelected] = useState([]);
  const [duration, setDuration] = useState(durationOptions[3]);
  const [invitedList, setInvitedList] = useState(null);
  // const [invitedList, setInvitedList] = useState(inviteOptions?.length ? inviteOptions[0] : {});

  const [notification, setNotification] = useState(notificationOptions[3]);
  const [remindTo, setRemindTo] = useState('');

  const dispatch = useDispatch();
  const store = useSelector((state) => state.calendar);
  const { selectedEvent } = store;

  const { success, error } = useMessage();

  // ** Effects
  useEffect(() => {
    setCalendarEventType(
      selectedEvent.extendedProps?.calendar == 'Appointments' ? 'Appointment' : 'Class'
    );
    setTitle(selectedEvent.title);
    setRemindTo(selectedEvent.extendedProps?.remindTo);
    setInvitedList(
      inviteOptions
        ? inviteOptions.filter((x) => x.value == selectedEvent.extendedProps?.invitedUser)[0]
        : []
    );
    setAllDay(selectedEvent.allDay);
    setSelectedRepeatType(
      repeatOn.filter((x) => x.value == selectedEvent.extendedProps?.repeat)[0]
    );
    setStartPicker(new Date(selectedEvent.start));
    selectedEvent.allDay
      ? setEndPicker(new Date(selectedEvent.start))
      : setEndPicker(
          new Date(
            new Date(selectedEvent.start).getTime() +
              parseInt(selectedEvent.extendedProps?.interval) * 60 * 1000
          )
        );

    setDuration(durationOptions.filter((x) => x.value == selectedEvent.extendedProps?.interval)[0]);
    setNotification(
      notificationOptions.filter((x) => x.value == selectedEvent.extendedProps?.notification)[0]
    );
    // console.log(store.events.)
    // const currentDateTime = selectedEvent?.start ? new Date(selectedEvent.start) : new Date();
    // setStartPicker(currentDateTime);
    // setEndPicker(new Date(currentDateTime.getTime() + duration.value * 60 * 1000));
  }, [selectedEvent]);

  useEffect(() => {
    setInviteOptions(
      contactsList?.map((x) => {
        return {
          value: x._id,
          label: x.fullName
        };
      })
    );
  }, [contactsList]);

  // ** Custom select components
  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <span className={`bullet bullet-${data.color} bullet-sm me-50`}></span>
        {data.label}
      </components.Option>
    );
  };
  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };
  const handleSelectedDays = async (item) => {
    let index = daysSelected.indexOf(item);
    if (index > -1) {
      daysSelected.splice(index, 1);
      setDaysSelected([...daysSelected]);
    } else {
      setDaysSelected([...daysSelected, item]);
    }
  };

  const initState = () => {
    setAllDay(false);
    setTitle('');
    setSelectedRepeatType(repeatOn[0]);
    setDuration(durationOptions[3]);
    setInvitedList(inviteOptions?.length ? inviteOptions[0] : {});
    setRemindTo('');
  };

  const handleAllDay = (e) => {
    setAllDay(e.target.checked);
  };

  const updateAppointmentBtnClicked = (e) => {
    e.preventDefault();
    // console.log('title', title);
    // console.log('start time', startPicker);
    // console.log('end time', endPicker);
    // console.log('repeat', selectedRepeatType);
    // console.log('invitedList', invitedList);
    // console.log('remindTo', remindTo);
    const data = {
      _id: selectedEvent.extendedProps?._id,
      title,
      start: startPicker,
      end: endPicker,
      allDay,
      interval: duration.value.toString(),
      repeat: selectedRepeatType.value,
      invitedUser: invitedList.value,
      remindTo,
      notification: notification.value.toString()
    };
    dispatch(updateAppointment(data))
      .then((res) => {
        console.log(res);
        if (res.payload.status == 200) {
          success('Updated successfully');
          initState();
          setUpdateAppointmentSidebarOpen(false);
        } else {
          error('Update failed');
        }
      })
      .catch((err) => {
        console.log(err);
        error('Network Error');
      });
  };

  const durationHandle = (data) => {
    let dt1 = new Date(startPicker);
    dt1 = new Date(dt1.getTime() + data.value * 60 * 1000);
    setEndPicker(dt1);
  };

  // ** Close BTN
  const CloseBtn = (
    <X
      className="cursor-pointer"
      size={15}
      onClick={() => setUpdateAppointmentSidebarOpen(false)}
    />
  );

  return (
    <Modal
      isOpen={updateAppointmentSidebarOpen}
      style={{ width: '500px' }}
      toggle={() => setUpdateAppointmentSidebarOpen(false)}
      contentClassName="p-0 overflow-hidden"
      className="modal-dialog-centered"
      modalClassName="modal-slide-in event-sidebar"
    >
      <ModalHeader
        className="mb-1"
        toggle={() => setUpdateAppointmentSidebarOpen(false)}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Update {calendarEventType}</h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
          <Form>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <div className="mb-1">
                  <Label className="form-label" for="title">
                    Title <span className="text-danger">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Add Title"
                    value={title}
                    onChange={(e) => {
                      e.preventDefault();
                      setTitle(e.target.value);
                    }}
                  />
                </div>
              </Col>
              {/* <Col sm={3} md={3} lg={3}>
                <div className="mb-1">
                  <Label className="form-label" for="color">
                    color <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="color"
                    name="color"
                    id="color"
                    style={{ height: 40 }}
                    value={selectedColor}
                    onChange={handleColorChange}
                  />
                </div>
              </Col> */}
              {/* <Col sm={7}>
                <div className="mb-2">
                  <Label className="form-label" for="startDate">
                    Date
                  </Label>
                  <Flatpickr
                    id="startDate"
                    name="startDate"
                    className="form-control"
                    onChange={(date) => setDatePicker(date[0])}
                    value={datePicker}
                    options={{
                      dateFormat: 'm-d-Y'
                    }}
                  />
                </div>
              </Col> */}

              <Col sm={6} md={6} lg={6}>
                <div className="mb-2">
                  <Label className="form-label" for="startTime">
                    Start Time
                  </Label>
                  <Flatpickr
                    required
                    id="startTime"
                    name="startTime"
                    className="form-control"
                    onChange={(date) => setStartPicker(date[0])}
                    value={startPicker}
                    options={{
                      dateFormat: allDay ? 'm/d/Y' : 'm/d/Y h:i K',
                      enableTime: true
                    }}
                  />
                </div>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <div className="mb-2">
                  <Label className="form-label" for="endTime">
                    End Time
                  </Label>
                  <Flatpickr
                    required
                    id="endTime"
                    name="endTime"
                    className="form-control"
                    onChange={(date) => setEndPicker(date[0])}
                    value={endPicker}
                    options={{
                      dateFormat: allDay ? 'm/d/Y' : 'm/d/Y h:i K',
                      enableTime: true,
                      noCalendar: true
                    }}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <div className="mb-1">
                  <Label className="form-label">Set all day</Label>
                  <div className="form-check mb-1">
                    <Input
                      id="all-day-check-appointment"
                      type="checkbox"
                      onChange={handleAllDay}
                      checked={allDay}
                      style={{ borderRadius: '3px' }}
                    />
                    <Label className="form-check-label" for="all-day-check-appointment">
                      All day
                    </Label>
                  </div>
                </div>
              </Col>
              <Col sm={6}>
                <div className="mb-1">
                  <Label className="form-label" for="duration">
                    Duration
                  </Label>
                  <Select
                    id="duration"
                    value={duration}
                    options={durationOptions}
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    // maxMenuHeight={170}
                    onChange={(data) => {
                      durationHandle(data);
                      setDuration(data);
                    }}
                    isDisabled={allDay}
                    // components={{
                    //     Option: OptionInviteComponent
                    // }}
                  />
                </div>
              </Col>
              <Col sm={12}>
                <div className="mb-1">
                  <Label className="form-label" for="description">
                    Repeat
                  </Label>
                  <Select
                    id="invite"
                    value={selectedRepeatType}
                    options={repeatOn}
                    theme={selectThemeColors}
                    // className="react-select"
                    classNamePrefix="select"
                    isClearable={false}
                    onChange={(data) => setSelectedRepeatType(data)}
                    // components={{
                    //     Option: OptionInviteComponent
                    // }}
                  />
                </div>
              </Col>
              <Col sm={12}>
                <div className="mb-1">
                  <Label className="form-label" for="invite">
                    Invite
                  </Label>
                  <Select
                    id="invite"
                    value={invitedList}
                    options={inviteOptions}
                    theme={selectThemeColors}
                    // className="react-select"
                    classNamePrefix="select"
                    isClearable={false}
                    onChange={(data) => setInvitedList(data)}
                    // isMulti
                    // components={{
                    //     Option: OptionInviteComponent
                    // }}
                  />
                </div>
              </Col>
              <Col sm={12} md={12} lg={12}>
                <div className="mb-1">
                  <Label className="form-label" for="title">
                    Remind to <span className="text-danger">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Email Address"
                    value={remindTo}
                    onChange={(e) => {
                      e.preventDefault();
                      setRemindTo(e.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col sm={12} md={12} lg={12}>
                <div className="mb-1">
                  <Label className="form-label" for="title">
                    Notification
                  </Label>
                  <Select
                    id="invite"
                    value={notification}
                    options={notificationOptions}
                    theme={selectThemeColors}
                    // className="react-select"
                    classNamePrefix="select"
                    isClearable={false}
                    onChange={(data) => setNotification(data)}
                    // isMulti
                    // components={{
                    //     Option: OptionInviteComponent
                    // }}
                  />
                </div>
              </Col>
              {/* <Col sm={12} md={12} lg={12}>
                <div
                  style={{ border: '1px solid #82868b', borderRadius: '8px' }}
                  className="mb-1 p-1"
                >
                  <Label>
                    {selectedRepeatType[0].value === 'Do not Repeat' ? (
                      'Never Repeat This Event.'
                    ) : selectedRepeatType[0].value === 'Day' ? (
                      `Repeats every Day from ${moment(startPicker).format(
                        'DD MMM YYYY'
                      )} ending on ${moment(endPicker).format('DD MMM YYYY')}`
                    ) : selectedRepeatType[0].value === 'Week' ? (
                      <>
                        {days.map((item, i) => {
                          return (
                            <Button
                              key={i}
                              outline={daysSelected.includes(item) ? false : true}
                              size="sm"
                              color={daysSelected.includes(item) ? 'primary' : 'secondary'}
                              style={{
                                borderRadius: '40px',
                                marginLeft: '10px',
                                marginBottom: '5px',
                                padding: '5px'
                              }}
                              onClick={() => handleSelectedDays(item, i)}
                            >
                              <CheckCircle /> {item}
                            </Button>
                          );
                        })}
                      </>
                    ) : selectedRepeatType[0].value === 'Month' ? (
                      `Repeats every Month on the ${moment(startPicker).format(
                        'DD MMM YYYY'
                      )} ending on ${moment(endPicker).format('DD MMM YYYY')}`
                    ) : (
                      `Repeats every Year on the ${moment(startPicker).format(
                        'DD MMM YYYY'
                      )} ending on ${moment(endPicker).format('DD MMM YYYY')}`
                    )}
                  </Label>
                </div>
              </Col> */}
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            className="me-1"
            type="submit"
            color="primary"
            onClick={updateAppointmentBtnClicked}
          >
            Update
          </Button>
          <Button
            color="secondary"
            type="reset"
            onClick={() => setUpdateAppointmentSidebarOpen(false)}
            outline
          >
            Cancel
          </Button>
        </ModalFooter>
      </PerfectScrollbar>
    </Modal>
  );
};

export default UpdateAppointment;
