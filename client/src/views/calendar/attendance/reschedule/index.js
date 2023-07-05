// ** React Imports
import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Label,
  Input,
  Collapse,
  ButtonGroup,
  ListGroup,
  ListGroupItem,
  Card,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
import { Trash2, Calendar, CheckCircle, X } from 'react-feather';
import Flatpickr from 'react-flatpickr';

// ** Third Party Components
import moment from 'moment';
// ** Utils
import { selectThemeColors } from '@utils';
import Select, { components } from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import ReScheduleCalender from './ReScheduleCalender';
import { oneTimeSchedule, ongoingTimeSchedule, updateBookClass } from '../../store';
import { isObjEmpty } from '../../../../utility/Utils';
import { formatDate } from '../constants';
import { MdDoubleArrow } from 'react-icons/md';
import { getUserData } from '../../../../auth/utils';

const Reschedule = (props) => {
  const { bookingRow, setBookRescheduleModal } = props;
  const dispatch = useDispatch();
  const { selectedClass } = useSelector((state) => state?.calendar);
  const [rescheduleClass, setReScheduleClass] = useState({});
  const [currentRange, setCurrentRange] = useState({
    value: 0,
    label: '0'
  });
  const [classStartTime, setClassStartTime] = useState(moment().format('HH:mm'));
  const [classEndTime, setClassEndTime] = useState(moment().format('HH:mm'));
  const [isClassStartTimeChange, setIsClassStartTimeChange] = useState(false);
  const [classTitle, setClassTitle] = useState('');
  const [scheduleDays, setScheduleDays] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    if (rescheduleClass?._id) {
      setClassTitle(rescheduleClass.classTitle);
      setClassEndTime(rescheduleClass.classEndTime);
      setClassStartTime(rescheduleClass?.classStartTime);

      const startDateTime = moment(
        `${rescheduleClass?.startDate} ${rescheduleClass?.classStartTime}`
      ).format('YYYY-MM-DD HH:mm');
      const endDateTime = moment(
        `${rescheduleClass?.endDate} ${rescheduleClass?.classEndTime}`
      ).format('YYYY-MM-DD HH:mm');
      const diffInMinutes = moment(endDateTime).diff(startDateTime, 'minutes');
      setCurrentRange({
        value: diffInMinutes,
        label: `${diffInMinutes}`
      });
    } else {
      setClassTitle('');
      setClassStartTime(moment().format('HH:mm'));
      setClassEndTime(moment().format('HH:mm'));
      setCurrentRange({
        value: 0,
        label: '0'
      });
    }
    const filteredSchedule = rescheduleClass?.schedule?.filter(
      (x) =>
        x.classStartTime == rescheduleClass?.classStartTime &&
        x.classEndTime == rescheduleClass?.classEndTime
    );

    if (filteredSchedule?.length) {
      setScheduleDays(filteredSchedule[0].classDays);
    }
    setSelectedDays([]);
  }, [rescheduleClass]);

  useEffect(() => {
    if (currentRange.value != 0) {
      setClassEndTime(
        moment(classStartTime, 'HH:mm').add(currentRange.value, 'minutes').format('HH:mm')
      );
    } else {
      setClassEndTime(moment(classStartTime, 'HH:mm').format('HH:mm'));
    }
  }, [currentRange, isClassStartTimeChange]);

  const handleTimeSchedule = (bookingType) => {
    const payloadData = {
      _id: bookingRow?._id,
      image: bookingRow?.image,
      rankImg: bookingRow?.rankImg,
      fullName: bookingRow?.fullName,
      email: bookingRow?.email,
      //rankName: contact?.ranks,
      bookingType,
      status: '',
      rankName: '',
      progression: 10,
      className: rescheduleClass?.classTitle,
      userId: getUserData().id,
      classId: rescheduleClass?._id,
      seriesId: rescheduleClass?.seriesId,
      contactId: bookingRow?.contactId,
      days: selectedDays.filter((x) => x.days?.length !== 0)
    };
    dispatch(updateBookClass(payloadData));
    setBookRescheduleModal(false);
  };

  const dayClicked = (dayName, index) => {
    setSelectedDays(
      selectedDays.filter((x) => x.index == index)?.length > 0
        ? selectedDays.map((x) => {
            if (x?.index == index) {
              return {
                ...x,
                days: x.days.includes(dayName)
                  ? x.days.filter((day) => day !== dayName)
                  : [...x.days, dayName]
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
    <div>
      <Row>
        <Col style={{ height: '560px' }} className="text-center mb-1" xs={12}>
          <ReScheduleCalender setReScheduleClass={setReScheduleClass} />
        </Col>
        <Collapse isOpen={!isObjEmpty(rescheduleClass)}>
          <Row>
            <Col className="pe-2" xs={6}>
              <Card body className="mt-0 mb-0">
                <CardTitle tag="h5">
                  <div className="d-flex justify-content-between">
                    <>Current Booking</>
                    <Badge
                      color={
                        bookingRow?.bookingType == 'Ongoing' ? 'light-success' : 'light-danger'
                      }
                    >
                      {bookingRow?.bookingType}
                    </Badge>
                  </div>
                </CardTitle>
                <CardSubtitle className="mb-0 text-muted" tag="h6">
                  Class Name: {bookingRow?.className}
                </CardSubtitle>
                <ListGroup className="list-group-flush">
                  {selectedClass?.schedule?.map((schedule, index) => (
                    <ListGroupItem className="d-flex">
                      <Col md={3}>{formatDate(schedule.classStartTime)}</Col>
                      <Col md={3}>{formatDate(schedule.classEndTime)}</Col>
                      <Col md={6}>
                        {schedule?.classDays?.map((x) => (
                          <Badge
                            className="cursor-default"
                            color={
                              bookingRow?.days
                                ?.filter((ar) => ar.index == schedule.index)[0]
                                ?.days?.includes(x)
                                ? x == 'Sunday'
                                  ? 'light-danger'
                                  : 'light-primary'
                                : 'light-secondary'
                            }
                            style={{ marginRight: '0.2rem' }}
                          >
                            {x.slice(0, 3)}
                          </Badge>
                        ))}
                      </Col>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Card>
            </Col>
            <Col className="ps-2" xs={6}>
              <Card body className="mt-0 mb-0">
                <CardTitle tag="h5">New Booking</CardTitle>
                <CardSubtitle className="mb-0 text-muted" tag="h6">
                  Class Name: {classTitle}
                </CardSubtitle>
                <ListGroup className="list-group-flush">
                  {rescheduleClass?.schedule?.map((schedule, index) => (
                    <ListGroupItem className="d-flex">
                      <Col md={3}>{formatDate(schedule.classStartTime)}</Col>
                      <Col md={3}>{formatDate(schedule.classEndTime)}</Col>
                      <Col md={6}>
                        {schedule?.classDays?.map((x) => (
                          <Badge
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
            </Col>
          </Row>
        </Collapse>
        <Col className="text-center mt-1" xs={12}>
          <Button
            className="mt-1 me-4"
            outline
            onClick={() => handleTimeSchedule('One Time')}
            disabled={
              rescheduleClass?._id || rescheduleClass?.type === 'newSchedule' ? false : true
            }
            style={{ minWidth: '200px' }}
          >
            One Time
          </Button>
          <Button
            className="mt-1"
            color="primary"
            onClick={() => {
              handleTimeSchedule('Ongoing');
            }}
            disabled={!rescheduleClass?.seriesId}
            style={{ minWidth: '200px' }}
          >
            Ongoing
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Reschedule;
