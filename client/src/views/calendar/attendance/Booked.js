// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Button,
  Label,
  CardHeader,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Badge
} from 'reactstrap';
import AsyncSelect from 'react-select/async';
//** third party imports */
import Flatpickr from 'react-flatpickr';
// ** Custom Components

// ** Utils
import { selectThemeColors } from '@utils';
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

// ** Events Actions Import
import BookList from './BookList/StudentList';
import { bookClass } from '../store';

import { getUserData } from '../../../auth/utils';
import { isObjEmpty, sortDays, weekDays } from '../../../utility/Utils';
import { SiHandshake } from 'react-icons/si';
import { GiCheckMark } from 'react-icons/gi';
import { formatDate } from './constants';
import { FiCheckCircle, FiCircle } from 'react-icons/fi';
import TimeScheduleList from './BookList/TimeScheduleList';
import { error } from '../../ui-elements/response-popup';
import StudentList from './BookList/StudentList';

const Booked = (props) => {
  const { contacts, classBookingsList } = props;

  // ** Store  vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state?.calendar);

  const selectedClass = store?.selectedClass;

  const selectedClassScheduleIndex =
    selectedClass?.schedule?.filter(
      (x) =>
        x?.classStartTime == selectedClass?.classStartTime &&
        x?.classEndTime == selectedClass?.classEndTime
    )[0].index || 0;

  //**Fake data */
  // const selectedClass =
  // const store = useSelector((state) => state.event)
  const [contact, setContact] = useState({});
  const [modal, setModal] = useState(false);
  const [selectedBookingType, setSelectedBookingType] = useState(null);
  const [selectedDays, setSelectedDays] = useState(
    []
    // selectedClass?.schedule.map((schedule) => {
    //   return {
    //     scheduleId: schedule._id,
    //     days: []
    //   };
    // })
  );

  const toggle = () => setModal(!modal);

  const promiseOptions = (inputValue) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterContacts(inputValue));
      }, 200);
    });
  };

  const filterContacts = (inputValue) => {
    const filterData = contacts?.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    return filterData;
  };

  const handleInputChange = (newValue) => {
    const val = newValue.replace(/\W/g, '');
    return val;
  };

  const handleContactChange = (contact) => {
    setContact(contact);
  };

  const classStartTime = selectedClass?.classStartTime;
  const classEndTime = selectedClass?.classEndTime;

  //  Start Time to 12-hour time string with AM/PM
  const dateObjStart = new Date(`${selectedClass?.startDate} ${classStartTime}`);
  const startTime12h = dateObjStart.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  // End Time to 12-hour time string with AM/PM
  const dateObjEnd = new Date(`${selectedClass?.endDate} ${classEndTime}`);
  const endTime12h = dateObjEnd.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  const countClass = classBookingsList?.filter(
    (x) =>
      (x.bookingType == 'Ongoing' &&
      x?.days?.filter((day) => day?.index == selectedClassScheduleIndex)?.length > 0
        ? x?.days
            ?.filter((day) => day?.index == selectedClassScheduleIndex)[0]
            ?.days.includes(weekDays[new Date(selectedClass.startDate).getDay()])
        : false) ||
      (x.bookingType == 'One Time' &&
        selectedClass.startDate == x.bookingDate &&
        x?.days?.map((day) => day.index).includes(selectedClassScheduleIndex))
  ).length;

  const bookingConfirmClicked = () => {
    // Send request to add booking
    if (selectedBookingType == 2) {
      if (selectedDays.find((x) => x.index == selectedClassScheduleIndex)?.days?.length) {
        if (
          !selectedDays
            .find((x) => x.index == selectedClassScheduleIndex)
            ?.days?.includes(weekDays[new Date(selectedClass.startDate).getDay()])
        ) {
          error('Please select day(s) for choosed class');
          return;
        }
      } else {
        error('Please select day(s)');
        return;
      }
    }

    const payloadData = {
      image: contact?.photo,
      rankImg: contact?.photo,
      fullName: contact?.fullName,
      email: contact?.email,
      //rankName: contact?.ranks,
      bookingType: selectedBookingType == 1 ? 'One Time' : 'Ongoing',
      bookingDate: selectedClass?.startDate,
      status: true,
      rankName: '',
      progression: 10,
      className: selectedClass?.classTitle,
      userId: getUserData().id,
      classId: selectedClass?._id,
      seriesId: selectedClass?.seriesId,
      contactId: contact?._id,
      days:
        selectedBookingType == 2
          ? selectedDays
          : [
              {
                index: selectedClassScheduleIndex
              }
            ]
    };
    dispatch(bookClass(payloadData));

    // Init selectedBookingType and close modal
    setSelectedBookingType(null);
    setSelectedDays([]);
    toggle();
  };

  const bookingCancelClicked = () => {
    // Init selectedBookingType and close modal

    setSelectedBookingType(null);
    setSelectedDays([]);
    toggle();
  };

  const dayClicked = (dayName, index) => {
    // console.log(
    //   selectedDays.includes(dayName)
    //     ? selectedDays.splice(selectedDays.indexOf(dayName), 1)
    //     : [...selectedDays, dayName]
    // );
    setSelectedDays(
      selectedDays.filter((x) => x.index == index)?.length > 0
        ? selectedDays.map((x) => {
            if (x?.index == index) {
              return {
                ...x,
                days: x.days.includes(dayName)
                  ? x.days.filter((day) => day !== dayName)
                  : sortDays([...x.days, dayName])
              };
            } else return x;
          })
        : [
            ...selectedDays,
            {
              index,
              days: [dayName]
            }
          ]
    );
  };

  return (
    <Fragment>
      <Row>
        <Col md="12" sm="12">
          <Row>
            <Col>
              <Card>
                <CardHeader className="border-bottom py-1 d-flex justify-content-between">
                  <CardTitle className="d-flex align-items-center">
                    {selectedClass?.classTitle}
                    <div className="table-rating" style={{ marginLeft: '10px' }}>
                      <span>{countClass}</span>
                    </div>
                  </CardTitle>
                  <CardTitle>
                    {startTime12h} - {endTime12h}
                  </CardTitle>
                </CardHeader>

                <CardBody>
                  <div className="d-flex justify-content-around pt-2 gap-1 align-items-center">
                    <div className="w-100">
                      <Label className="form-label" for="studentId">
                        Search Contact
                      </Label>
                      <AsyncSelect
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        loadOptions={promiseOptions}
                        onChange={handleContactChange}
                        onInputChange={handleInputChange}
                        theme={selectThemeColors}
                        cacheOptions
                        defaultOptions={contacts}
                        placeholder="Type name here"
                      />
                    </div>
                    {/* <div className="mt-2">
                      <Button onClick={() => handleSubmit()} color="primary">
                        Add Book
                      </Button>
                    </div> */}
                    <div className="mt-2">
                      <Button
                        className="d-flex"
                        size="md"
                        onClick={toggle}
                        color="primary"
                        disabled={isObjEmpty(contact)}
                        outline={isObjEmpty(contact)}
                      >
                        <SiHandshake className="me-1" size={16} />
                        Book
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* {<TimeScheduleList classId={selectedClass?._id} />} */}
          {<StudentList index={selectedClassScheduleIndex} />}
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={bookingCancelClicked} centered style={{ minWidth: '700px' }}>
        <ModalHeader className="text-center bg-transparent d-flex" toggle={bookingCancelClicked}>
          <h3>
            Book <b>{contact?.fullName}</b> into <b>{selectedClass?.classTitle}</b>
            {selectedClass?.seriesId ? ' (SERIES)' : null}
          </h3>
        </ModalHeader>
        <ModalBody className="mt-1">
          <Card body>
            <ListGroup className="list-group-flush">
              {selectedClass?.schedule?.map((schedule, index) => (
                <ListGroupItem key={`schedule_${index}`} className="d-flex">
                  <Col md={4}>{selectedClass.classTitle}</Col>
                  <Col md={2}>{formatDate(schedule.classStartTime)}</Col>
                  <Col md={2}>{formatDate(schedule.classEndTime)}</Col>
                  <Col md={4}>
                    {schedule?.classDays?.map((x, index2) => (
                      <Badge
                        key={`class_schedule_day_badge_${index2}`}
                        className="cursor-pointer"
                        color={
                          selectedDays
                            ?.filter((ar) => ar.index == schedule.index)[0]
                            ?.days?.includes(x)
                            ? x == 'Sunday'
                              ? 'light-danger'
                              : 'light-primary'
                            : 'light-secondary'
                        }
                        style={{ marginRight: '0.2rem' }}
                        onClick={(e) => {
                          e.preventDefault();
                          dayClicked(x, schedule?.index);
                        }}
                      >
                        {x.slice(0, 3)}
                      </Badge>
                    ))}
                  </Col>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Card>
          <Row className="pb-1">
            <Col xs={6}>
              <Card body className="h-100 justify-content-between">
                <CardTitle tag="h5">One Time</CardTitle>
                <CardText>
                  This option will add contact into the scheduled time one time only.
                </CardText>
                <Button
                  className="mt-0"
                  outline
                  color={selectedBookingType == 1 ? 'primary' : 'secondary'}
                  onClick={() => setSelectedBookingType(1)}
                >
                  One Time
                </Button>
              </Card>
            </Col>
            <Col xs={6}>
              <Card body className="h-100 justify-content-between">
                <CardTitle tag="h5">Ongoing</CardTitle>
                <CardText>
                  This option will add contact into the schedule time throughout the whole series.
                </CardText>

                <Button
                  className="mt-0"
                  outline
                  color={selectedBookingType == 2 ? 'primary' : 'secondary'}
                  onClick={() => setSelectedBookingType(2)}
                >
                  Ongoing
                </Button>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className="d-flex flex-column align-items-center">
          <div className="d-flex align-items-center">
            <Button
              className="mt-0 me-3"
              color={selectedBookingType ? 'success' : 'secondary'}
              outline={!selectedBookingType}
              onClick={bookingConfirmClicked}
              disabled={!selectedBookingType}
            >
              Comfirm
            </Button>
            <Button className="mt-0" color="danger" outline onClick={bookingCancelClicked}>
              Cancel
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};
export default Booked;
