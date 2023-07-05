// ** React Imports
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

// ** Custom Components
import classnames from 'classnames';

// ** Icons Import
import { MdOutlineEventAvailable, MdOutlineMeetingRoom, MdRemoveRedEye } from 'react-icons/md';

// ** Reactstrap Imports
import {
  CardBody,
  Button,
  Input,
  Label,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap';

import { Edit, Eye, MessageCircle } from 'react-feather';
import { FaPlus } from 'react-icons/fa';
import { AiFillCaretDown } from 'react-icons/ai';

// ** illustration import
import illustration from '@src/assets/images/pages/calendar-illustration.png';
import AddAppointment from './appointment/AddAppSidebar';
import ViewAttendance from './attendance/ViewAttendance';
import AddClass from './attendance/AddClass';
import ViewAppointment from './appointment/ViewAppointment';
import { selectClass } from './attendance/store';

// ** Style
import '@src/assets/styles/calendar/sidebar-left.scss';
import SelectEventType from './appointment/SelectEventType';

// ** Filters Checkbox Array
const filters = [
  { label: 'Events', color: 'danger', className: 'form-check-info mb-1' },
  {
    label: 'Appointments',
    color: 'success',
    className: 'form-check-success mb-1'
  },
  {
    label: 'Bookings',
    color: 'danger',
    className: 'form-check-danger mb-1'
  },
  {
    label: 'Classes',
    color: 'warning',
    className: 'form-check-warning mb-1'
  }
];

const SidebarLeft = (props) => {
  // ** Props
  const {
    setCalendarEventType,
    addAppointmentSidebarOpen,
    setAddAppointmentSidebarOpen,
    openAddClass,
    setOpenAddClass,
    viewAttendanceOpen,
    setViewAttendanceOpen,
    openViewAppointment,
    setOpenViewAppointment,
    handleAddEventSidebar
  } = props;

  const {
    setActiveFilter,
    activeFilter,
    handleSidebarOpen,
    toggleSidebar,
    updateFilter,
    updateAllFilters,
    store,
    dispatch
  } = props;

  const [selEvTypeModalOpen, setSelEvTypeModalOpen] = useState(false);

  // ** Function to handle Add Event Click
  const handleAddEventClick = () => {
    toggleSidebar(false);
    handleSidebarOpen();
  };

  // ** Function to handle Add Appointment Click
  const handleAddAppointmentClick = () => {
    toggleSidebar(false);
  };

  return (
    <Fragment>
      <div className="sidebar-wrapper">
        {activeFilter === '2' ? ( // Events
          <CardBody className="card-body">
            <Link to="/add-event">
              <Button color="primary" outline block className="mb-1">
                <span className="align-middle">+ Add Event</span>
              </Button>
            </Link>
            <Link to="/events">
              <Button color="primary" outline block onClick={handleAddAppointmentClick}>
                <span className="align-middle">View Events</span>
              </Button>
            </Link>
          </CardBody>
        ) : activeFilter === '1' ? ( // Appointments
          <CardBody style={{ padding: '1.5rem 1rem 1.5rem 2rem' }}>
            <Button
              className="align-items-center mb-1"
              color="primary"
              block
              onClick={() => setSelEvTypeModalOpen(true)}
              style={{ height: '44px' }}
            >
              Create New
            </Button>

            <Button
              className="align-items-center"
              color="primary"
              outline
              block
              onClick={() => setViewAttendanceOpen(true)}
              style={{ height: '44px' }}
            >
              Booking Details
            </Button>
          </CardBody>
        ) : activeFilter === '3' ? ( // Bookings
          <CardBody className="card-body">
            <Link to="/book/booking-type">
              <Button color="primary" outline block className="mb-1">
                <span className="align-middle">Create Booking</span>
              </Button>
            </Link>

            <Link to="/book/">
              <Button
                color="primary"
                outline
                block
                // onClick={handleAddAppointmentClick}
              >
                <span className="align-middle">View Bookings</span>
              </Button>
            </Link>
          </CardBody>
        ) : (
          <CardBody className="card-body">
            <Button
              color="primary"
              outline
              block
              className="mb-1"
              onClick={() => {
                setOpenAddClass(true);
                dispatch(selectClass({}));
              }}
            >
              <span className="align-middle">Setting</span>
            </Button>
            <Button color="primary" outline block onClick={() => setViewAttendanceOpen(true)}>
              <span className="align-middle">View Attendance</span>
            </Button>
          </CardBody>
        )}
        <CardBody>
          <h5 className="section-label mb-1 mt-2">
            <span className="align-middle">Filter</span>
          </h5>
          <div className="form-check mb-1">
            <Input
              id="view-all"
              type="checkbox"
              label="View All"
              className="select-all"
              checked={store.selectedFilters.length === filters.length}
              onChange={(e) => dispatch(updateAllFilters(e.target.checked))}
              style={{ borderRadius: '3px' }}
            />
            <Label className="form-check-label" for="view-all">
              View All
            </Label>
          </div>
          <div className="calendar-events-filter">
            {filters.length &&
              filters.map((filter) => {
                return (
                  <div
                    key={`${filter.label}-key`}
                    className={classnames('form-check', {
                      [filter.className]: filter.className
                    })}
                  >
                    <Input
                      type="checkbox"
                      key={filter.label}
                      label={filter.label}
                      className="input-filter"
                      id={`${filter.label}-event`}
                      checked={store.selectedFilters.includes(filter.label)}
                      onChange={() => {
                        dispatch(updateFilter(filter.label));
                      }}
                      style={{ borderRadius: '3px' }}
                    />
                    <Label className="form-check-label" for={`${filter.label}-event`}>
                      {filter.label}
                    </Label>
                  </div>
                );
              })}
          </div>
        </CardBody>
      </div>
      <div className="mt-auto">
        <img className="img-fluid" src={illustration} alt="illustration" />
      </div>
      <ViewAppointment
        setOpenViewAppointment={setOpenViewAppointment}
        openViewAppointment={openViewAppointment}
      />
      <AddAppointment
        addAppointmentSidebarOpen={addAppointmentSidebarOpen}
        setAddAppointmentSidebarOpen={setAddAppointmentSidebarOpen}
      />
      <ViewAttendance
        viewAttendanceOpen={viewAttendanceOpen}
        setViewAttendanceOpen={setViewAttendanceOpen}
      />
      {<AddClass openAddClass={openAddClass} setOpenAddClass={setOpenAddClass} />}
      <SelectEventType
        isOpen={selEvTypeModalOpen}
        setIsOpen={setSelEvTypeModalOpen}
        setCalendarEventType={setCalendarEventType}
        setAddAppointmentSidebarOpen={setAddAppointmentSidebarOpen}
        handleAddEventSidebar={handleAddEventSidebar}
      />
    </Fragment>
  );
};

export default SidebarLeft;
