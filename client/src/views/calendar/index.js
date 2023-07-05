// ** React Imports
import React, { Fragment, useState, useEffect, useContext } from 'react';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane, Card } from 'reactstrap';
// ** Icons Imports
import { MdManageHistory } from 'react-icons/md';
import { IoBookmarksOutline, IoCalendar, IoCalendarOutline } from 'react-icons/io5';
import { Button, Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';

// ** User Components
// Todo: move tab folders to tabs folder
import { useRTL } from '@hooks/useRTL';
import SidebarLeft from './SidebarLeft';
import MyCalendar from './Calendar';
import AttendanceCalendar from './attendance/Calender';
import AddEventSidebar from './event/AddEventSidebar';
import AddClass from './attendance/AddClass';
import BookTable from './book/list/bookTable';
import BookingType from './book/booking-type/index';
import BookingSideLeft from './book/SidebarLeft';
import EventManager from './event';
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaceApi, getSelectedWorkspaceData, addWorkspace } from '../apps/workspace/store';
import { fetchLabelsApi } from '../tasks/label-management/store';
import Breadcrumbs from '@components/breadcrumbs';
// ** Components
import AddAppointment from './appointment/AddAppSidebar';
import UpdateAppointment from './appointment/UpdateAppSidebar';
import ViewAttendance from './attendance/ViewAttendance';
import ViewAppointment from './appointment/ViewAppointment';

// ** Styles
import '@src/assets/styles/tasks.scss';
import '@src/assets/styles/dark-layout.scss';
import '@styles/react/apps/app-calendar.scss';
import '@styles/react/apps/app-email.scss';
import classnames from 'classnames';

import {
  selectEvent,
  updateEvent,
  updateFilter,
  updateAllFilters,
  addEvent,
  removeEvent
} from './store';
import { AbilityContext } from '../../utility/context/Can';

// ** CalendarColors
const calendarsColor = {
  Events: 'info',
  Appointments: 'success',
  Bookings: 'danger',
  Classes: 'warning'
};
const Calendar = () => {
  const dispatch = useDispatch();

  const ability = useContext(AbilityContext);
  // ** states
  const [active, setActive] = useState('1');
  const [viewBooing, setViewBooking] = useState(false);

  const [calendarEventType, setCalendarEventType] = useState('');
  const [addAppointmentSidebarOpen, setAddAppointmentSidebarOpen] = useState(false);
  const [updateAppointmentSidebarOpen, setUpdateAppointmentSidebarOpen] = useState(false);
  const [openAddClass, setOpenAddClass] = useState(false);
  const [viewAttendanceOpen, setViewAttendanceOpen] = useState(false);
  const [openViewAppointment, setOpenViewAppointment] = useState(false);

  const [calendarApi, setCalendarApi] = useState(null);
  const [addSidebarOpen, setAddSidebarOpen] = useState(false);

  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [title, setTitle] = useState('My Calendar');

  const store = useSelector((state) => state.calendar);

  // ** Hooks
  const [isRtl] = useRTL();

  // ** AddEventSidebar Toggle Function
  const handleSidebarOpen = () => setAddSidebarOpen(!addSidebarOpen);

  // ** LeftSidebar Toggle Function
  const toggleSidebar = (val) => setLeftSidebarOpen(val);

  // ** refetchEvents
  const refetchEvents = () => {
    if (calendarApi !== null) {
      calendarApi.refetchEvents();
    }
  };

  useEffect(() => {
    if (ability.can('read', 'calendar/appointment')) {
      setActive('1');
      setTitle('My Calendar');
    } else if (ability.can('read', 'calendar/event')) {
      setActive('2');
      setTitle('Events');
    } else if (ability.can('read', 'calendar/booking')) {
      setActive('3');
      setTitle('Bookings');
    }
  }, []);

  return (
    <>
      <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <Breadcrumbs
          breadCrumbTitle={'Calendar'}
          breadCrumbParent="Calendar"
          breadCrumbActive={title}
        />
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <Fragment>
            <Nav pills className="mb-2 ">
              {ability.can('read', 'calendar/appointment') && (
                <NavItem>
                  <NavLink
                    active={active === '1'}
                    onClick={() => {
                      setActive('1');
                      setTitle('My Calendar');
                    }}
                  >
                    <IoCalendarOutline className="font-medium-1 me-50" />
                    <span className="fs-6">My Calendar</span>
                  </NavLink>
                </NavItem>
              )}
              {ability.can('read', 'calendar/event') && (
                <NavItem>
                  <NavLink
                    active={active === '2'}
                    onClick={() => {
                      setActive('2');
                      setTitle('Event Manager');
                    }}
                  >
                    <MdManageHistory className="font-medium-1 me-50" />
                    <span className="fs-6">Event Manager</span>
                  </NavLink>
                </NavItem>
              )}
              {ability.can('read', 'calendar/booking') && (
                <NavItem>
                  <NavLink
                    active={active === '3'}
                    onClick={() => {
                      setActive('3');
                      setTitle('Booking Manager');
                    }}
                  >
                    <IoBookmarksOutline className="font-medium-1 me-50" />
                    <span className="fs-6">Booking Manager</span>
                  </NavLink>
                </NavItem>
              )}
            </Nav>

            <div
              className="app-calendar overflow-hidden border email-application"
              style={{ marginBottom: 0 }}
            >
              <div className="" style={{ marginBottom: 0, background: '#fff' }}>
                <Row className=" overflow-auto">
                  {(ability.can('read', 'calendar/appointment') || ability.can('read', 'calendar/booking')) && active !== '2' ?(
                    <Col
                      id="app-calendar-sidebar"
                      className={classnames(
                        'col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column',
                        {
                          show: leftSidebarOpen
                        }
                      )}
                      onWheel={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {active === '3' ? (
                        <BookingSideLeft
                          dispatch={dispatch}
                          updateFilter={updateFilter}
                          activeFilter={active}
                          toggleSidebar={toggleSidebar}
                          updateAllFilters={updateAllFilters}
                          handleSidebarOpen={handleSidebarOpen}
                          viewBooking={viewBooing}
                          setViewBooking={setViewBooking}
                        />
                      ) : (
                        <SidebarLeft // Appointment or Attendance
                          store={store}
                          dispatch={dispatch}
                          updateFilter={updateFilter}
                          activeFilter={active}
                          toggleSidebar={toggleSidebar}
                          updateAllFilters={updateAllFilters}
                          handleSidebarOpen={handleSidebarOpen}
                          setOpenViewAppointment={setOpenViewAppointment}
                          openViewAppointment={openViewAppointment}
                          addAppointmentSidebarOpen={addAppointmentSidebarOpen}
                          setCalendarEventType={setCalendarEventType}
                          setAddAppointmentSidebarOpen={setAddAppointmentSidebarOpen}
                          viewAttendanceOpen={viewAttendanceOpen}
                          setViewAttendanceOpen={setViewAttendanceOpen}
                          openAddClass={openAddClass}
                          setOpenAddClass={setOpenAddClass}
                          handleAddEventSidebar={handleSidebarOpen}
                        />
                      )}
                    </Col>
                  ) : null}
            

                  <Col className="position-relative ">
                    <TabContent className="w-100" activeTab={active}>
                     {ability.can('read', 'calendar/appointment') && 
                     <TabPane tabId="1">
                       
                     <MyCalendar
                       isRtl={isRtl}
                       calendarApi={calendarApi}
                       toggleSidebar={toggleSidebar}
                       calendarsColor={calendarsColor}
                       setCalendarApi={setCalendarApi}
                       handleAddEventSidebar={handleSidebarOpen}
                       setOpenViewAppointment={setOpenViewAppointment}
                       openViewAppointment={openViewAppointment}
                       addAppointmentSidebarOpen={addAppointmentSidebarOpen}
                       setCalendarEventType={setCalendarEventType}
                       setAddAppointmentSidebarOpen={setAddAppointmentSidebarOpen}
                       setUpdateAppointmentSidebarOpen={setUpdateAppointmentSidebarOpen}
                       viewAttendanceOpen={viewAttendanceOpen}
                       setViewAttendanceOpen={setViewAttendanceOpen}
                       openAddClass={openAddClass}
                       setOpenAddClass={setOpenAddClass}
                     />
                   </TabPane>
                     }
                      {
                        ability.can('read', 'calendar/event') && 
                        <TabPane tabId="2">
                        <EventManager />
                      </TabPane>
                      }
                     {
                      ability.can('read', 'calendar/booking') && <TabPane tabId="3">{viewBooing ? <BookingType /> : <BookTable />}</TabPane>
                     }
                      
                    </TabContent>
                  </Col>
                </Row>
              </div>
            </div>
            <ViewAppointment
              setOpenViewAppointment={setOpenViewAppointment}
              openViewAppointment={openViewAppointment}
            />
            <AddAppointment
              calendarEventType={calendarEventType}
              addAppointmentSidebarOpen={addAppointmentSidebarOpen}
              setAddAppointmentSidebarOpen={setAddAppointmentSidebarOpen}
            />
            <UpdateAppointment
              updateAppointmentSidebarOpen={updateAppointmentSidebarOpen}
              setUpdateAppointmentSidebarOpen={setUpdateAppointmentSidebarOpen}
            />
            <ViewAttendance
              viewAttendanceOpen={viewAttendanceOpen}
              setViewAttendanceOpen={setViewAttendanceOpen}
            />
            <AddClass openAddClass={openAddClass} setOpenAddClass={setOpenAddClass} />
            {active === '2' && (
              <AddEventSidebar
                store={store}
                dispatch={dispatch}
                addEvent={addEvent}
                open={addSidebarOpen}
                selectEvent={selectEvent}
                updateEvent={updateEvent}
                removeEvent={removeEvent}
                calendarApi={calendarApi}
                refetchEvents={refetchEvents}
                calendarsColor={calendarsColor}
                handleAddEventSidebar={handleSidebarOpen}
              />
            )}

            {active === '1' && (
              <AddClass openAddClass={addSidebarOpen} setOpenAddClass={handleSidebarOpen} />
            )}
          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default Calendar;
