// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, Button, Label, CardHeader, CardTitle } from 'reactstrap';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';

//** third party imports */
import Flatpickr from 'react-flatpickr';
// ** Custom Components

// ** Utils
import { selectThemeColors } from '@utils';
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

// ** Events Actions Import
import AttendanceList from './AttendanceList';
import { markAttendance, getAttendance, updateBookClass, bookClass } from '../store';

import { getUserData } from '../../../auth/utils';

import EmpCheckinModal from './EmpCheckinModal';

import { toast } from 'react-toastify';
import { GiCheckMark } from 'react-icons/gi';
import { error, success } from '../../ui-elements/response-popup';
import { isObjEmpty } from '../../../utility/Utils';
import { fetchContactsRQ } from '../../../requests/contacts/contacts';
import { contactsAction } from '../../contacts/store/actions';

const MarkAttendance = (props) => {
  //** props */
  const { bookingData, classBookingsList } = props;

  // ** Store  vars
  const dispatch = useDispatch();

  const store = useSelector((state) => state?.calendar);

  const userData = useSelector((state) => state.auth.userData);
  // const contactsList = useSelector((state) => state.employeeContact?.employeeList?.data?.list);
  // const contactsList = useSelector((state) => state.totalContacts?.contactList?.list);
  const contactsList = classBookingsList;
  const { contactTypeList } = useSelector((state) => state?.totalContacts);
  // const classAttendees = store?.classAttendees;
  const classAttendees = classBookingsList?.filter((x) => x.status == true);
  const countClass = classAttendees?.length;

  const selectedClass = store?.selectedClass;

  // ** States
  const [markDate, setMarkDate] = useState(new Date());

  const [bookingContact, setBookingContact] = useState({});

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnceClick, setIsOnceClick] = useState(false);
  const [markStatus, setMarkStatus] = useState(false);
  const [contactOptions, setContactOptions] = useState([]);
  // ** Effects
  useEffect(() => {
    if (selectedClass?._id !== undefined && selectedClass?._id !== '') {
      dispatch(
        getAttendance({
          classId: selectedClass?._id,
          startDate: markDate.toLocaleDateString()
        })
      );
    }
  }, [selectedClass?._id, markDate.toLocaleDateString()]);

  useEffect(() => {
    if (
      bookingContact.status == false &&
      isOnceClick &&
      contactsList.find((item) => item._id == bookingContact.contactId)?.punchState == true
    ) {
      handleAttendanceStatusSubmit();
    }
  }, [contactsList]);

  useEffect(() => {
    setContactOptions(
      bookingData.map((x) => ({
        value: x,
        label: x.fullName
      }))
    );
  }, [bookingData]);

  // ** Handlers
  const promiseOptions = (inputValue) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterBookings(inputValue));
      }, 200);
    });
  };

  const filterBookings = (inputValue) => {
    const filterData = bookingData?.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    return filterData;
  };

  const handleInputChange = (newValue) => {
    const val = newValue.replace(/\W/g, '');
    return val;
  };

  const handleContactChange = (contact) => {
    let selectedBookingContact = classBookingsList.find((x) => x.contactId == contact._id);
    if (!selectedBookingContact) {
      selectedBookingContact = {
        image: contact?.photo,
        rankImg: contact?.photo,
        fullName: contact?.fullName,
        email: contact?.email,
        attendedDateTime: markDate,
        status: true,
        rankName: '',
        progression: 10,
        className: selectedClass?.classTitle,
        userId: getUserData().id,
        classId: selectedClass?._id,
        seriesId: selectedClass?.seriesId,
        contactId: contact?._id
      };
    }
    setBookingContact(selectedBookingContact);
  };

  const handleAttendanceStatusSubmit = async () => {
    const payloadData = {
      ...bookingContact,
      attendedDateTime: markDate,
      status: true,
      classId: selectedClass?._id,
      userId: getUserData()?.id
      // bookingId: bookingContact?._id
    };

    const response = dispatch(updateBookClass(payloadData));
    if (response?.payload?.success) {
      success('Contact marked successfully');
    } else {
      error('Mark Failed');
    }
  };

  const handleNewAttendanceSubmit = async () => {
    const response = await dispatch(
      markAttendance({
        ...bookingContact,
        classId: selectedClass?._id,
        attendedDateTime: markDate
      })
    );
    if (response?.payload?.success) {
      success('Contact marked successfully');
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMarkClick = () => {
    if (bookingContact._id || bookingContact?.fullName) {
      handleNewAttendanceSubmit();
    } else {
      toast.error('You should select contact');
    }
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

  return (
    <Fragment>
      <Row>
        <Col md="12" sm="12">
          <Row>
            <Col>
              <Card>
                <CardHeader className="border-bottom py-1 d-flex justify-content-between">
                  <CardTitle className="d-flex">{selectedClass?.classTitle}</CardTitle>
                  <CardTitle>
                    {startTime12h} - {endTime12h}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={10}>
                      <div className="d-flex justify-content-around pt-2 gap-1">
                        <div className="mb-1 width-65-per">
                          <Label className="form-label" for="studentId">
                            Search Contact
                          </Label>
                          {/* <div
                            onWheel={(e) => {
                              e.stopPropagation();
                            }}
                          > */}
                          <AsyncSelect
                            isClearable={false}
                            className="react-select"
                            classNamePrefix="select"
                            loadOptions={promiseOptions}
                            onChange={handleContactChange}
                            onInputChange={handleInputChange}
                            theme={selectThemeColors}
                            cacheOptions
                            defaultOptions={bookingData}
                            placeholder="Type name here"
                          />
                          {/* <Select
                            isClearable={false}
                            value={bookingContact}
                            options={contactOptions}
                            className="react-select"
                            classNamePrefix="select"
                            theme={selectThemeColors}
                            onChange={(data) => handleContactChange(data.value)}
                          /> */}
                          {/* </div> */}
                        </div>

                        <div className="mb-1 width-35-per">
                          <Label className="form-label" for="markDate">
                            Date & Time
                          </Label>
                          <Flatpickr
                            required
                            id="markDate"
                            name="markDate"
                            className="form-control"
                            onChange={(date) => setMarkDate(date[0])}
                            value={markDate}
                            options={{
                              enableTime: true,
                              dateFormat: 'm/d/Y G:i K'
                            }}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div className="d-flex mt-3 justify-content-center">
                        <Button
                          className="d-flex"
                          onClick={handleMarkClick}
                          color="primary"
                          outline={isObjEmpty(bookingContact)}
                          disabled={isObjEmpty(bookingContact)}
                        >
                          <GiCheckMark className="me-1" size={16} />
                          Mark
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <AttendanceList classId={selectedClass?._id} markDate={markDate} />
        </Col>
      </Row>
      <EmpCheckinModal
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </Fragment>
  );
};
export default MarkAttendance;
