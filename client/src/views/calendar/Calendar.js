// ** React Import
import { useEffect, useRef, memo, Fragment, useState } from 'react';

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import { toast } from 'react-toastify';
import { Button, ButtonGroup, Card, CardBody } from 'reactstrap';
import { Menu, Check } from 'react-feather';

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchEvents,
  fetchAppointments,
  selectEvent,
  updateEvent,
  fetchClasses,
  selectClass
} from './store';

import SelectEventType from './appointment/SelectEventType';

import '@src/assets/styles/calendar/calendar.scss';
import { useHistory } from 'react-router-dom';
import { getMonthlyData } from './book/store';

// **   Toast Component
const ToastComponent = ({ title, icon, color }) => (
  <Fragment>
    <div className="toastify-header pb-0">
      <div className="title-wrapper">
        <Avatar size="sm" color={color} icon={icon} />
        <h6 className="toast-title">{title}</h6>
      </div>
    </div>
  </Fragment>
);

// // needed for the style wrapper
// import styled from '@emotion/styled';

// // add styles as css
// export const StyleWrapper = styled.div`
//   .fc-button.fc-prev-button,
//   .fc-button.fc-next-button,
//   .fc-button.fc-button-primary {
//     background: red;
//     background-image: none;
//   }
// `;

const Calendar = (props) => {
  // ** State
  const [selEvTypeModalOpen, setSelEvTypeModalOpen] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState([]);
  // ** Refs
  const history = useHistory();
  const calendarRef = useRef(null);
  // ** Variables
  const dispatch = useDispatch();
  const store = useSelector((state) => state.calendar);
  const bookStore = useSelector((state) => state.book);
  const eventStore = useSelector((state) => state.event);

  // ** Props
  const {
    isRtl,
    calendarsColor,
    calendarApi,
    setCalendarApi,
    handleAddEventSidebar,
    toggleSidebar,
    addAppointmentSidebarOpen,
    setCalendarEventType,
    setAddAppointmentSidebarOpen,
    setUpdateAppointmentSidebarOpen,
    openAddClass,
    setOpenAddClass,
    viewAttendanceOpen,
    setViewAttendanceOpen,
    openViewAppointment,
    setOpenViewAppointment
  } = props;

  // ** Blank Event Object
  const blankEvent = {
    title: '',
    start: '',
    end: '',
    allDay: false,
    url: '',
    extendedProps: {
      calendar: '',
      guests: [],
      location: '',
      description: ''
    }
  };

  // ** UseEffect checks for CalendarAPI Update
  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current.getApi());
    }
  }, [calendarApi]);

  // ** Fetch Events On Mount
  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchAppointments());
    dispatch(fetchClasses());
    dispatch(
      getMonthlyData({
        date: new Date()
      })
    );
  }, []);

  useEffect(() => {
    const events = eventStore?.events;
    const bookings = [];
    if (bookStore?.books) {
      bookStore.books.forEach((bookingData) => {
        bookings.push({
          ...bookingData,
          start: bookingData.startDate,
          title: bookingData.name,
          type: 'booking',
          id: bookingData._id
        });
      });
    }
    const classes = store?.classes?.classes?.length ? store?.classes?.classes : [];
    const appointments = store?.events;
    let allEvents = [];
    if (store.selectedFilters?.includes('Events')) {
      allEvents = allEvents.concat(events);
    }
    if (store.selectedFilters?.includes('Bookings')) {
      allEvents = allEvents.concat(bookings);
    }
    if (store.selectedFilters?.includes('Classes')) {
      allEvents = allEvents.concat(classes);
    }
    if (store.selectedFilters?.includes('Appointments')) {
      allEvents = allEvents.concat(appointments);
    }
    setCalendarEvents(allEvents);
  }, [store?.selectedFilters]);

  const events = () => {
    const events = eventStore?.events;
    const bookings = [];
    if (bookStore.books) {
      bookStore.books.forEach((bookingData) => {
        bookings.push({
          ...bookingData,
          start: bookingData.startDate,
          title: bookingData.name,
          type: 'booking',
          id: bookingData._id
        });
      });
    }
    const classes = store?.classes?.classes?.length ? store?.classes?.classes : [];
    const appointments = store?.events;
    return events.concat(classes, bookings, appointments);
  };

  // ** calendarOptions(Props)
  const calendarOptions = {
    events: calendarEvents?.length
      ? calendarEvents
      : store.selectedFilters?.length == 4
      ? events()
      : [],
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    // views: {
    //   dayGridMonth: {
    //     // name of view
    //     titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }
    //     // other view-specific options here
    //   }
    // },

    headerToolbar: {
      start: 'today, prev, next, title',
      // center: 'title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    contentHeight: 650,
    // dayMaxEventRows: true,
    /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
    editable: false,

    eventTimeFormat: {
      // like '14:30:00'
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    },

    displayEventEnd: true,

    stickyHeaderDates: true,
    /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
    eventResizableFromStart: true,

    /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
    dragScroll: true,

    /*
      Max number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
    dayMaxEvents: 2,

    /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
    navLinks: true,

    eventClassNames({ event: calendarEvent }) {
      // eslint-disable-next-line no-underscore-dangle
      const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar];
      return [
        // Background Color
        `bg-light-${colorName}`
      ];
    },

    eventClick({ event: clickedEvent }) {
      switch (clickedEvent?._def?.extendedProps?.calendar) {
        case 'Appointments':
          dispatch(selectEvent(clickedEvent));
          setUpdateAppointmentSidebarOpen(true);
          break;
        case 'Classes':
          dispatch(selectClass(clickedEvent.extendedProps));
          handleAddEventSidebar();
          break;
        case 'Bookings':
          let bookingUrl = '/book/update/' + clickedEvent._def.publicId;
          if (bookingUrl) history.push(bookingUrl);
          break;
        case 'Events':
          let eventUrl = '/event-view-list/' + clickedEvent._def?.extendedProps?._id;
          if (eventUrl) history.push(eventUrl);
          break;
        default:
          break;
      }

      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      // event.value = grabEventDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      // isAddNewEventSidebarActive.value = true
    },

    // customElements: {
    //   newBtn: {
    //     text: 'new',
    //     // text: <Menu className="d-xl-none d-block" />,
    //     click() {
    //       toggleSidebar(true);
    //     }
    //   }
    // },
    customButtons: {
      newBtn: {
        text: 'new',
        icon: 'list',
        click() {
          toggleSidebar(false);
          alert('clicked the custom button!');
        }
      }
    },

    dateClick(info) {
      const ev = blankEvent;
      ev.start = info.date;
      ev.end = info.date;
      dispatch(selectEvent(ev));
      // handleAddEventSidebar();
      calendarDateClicked();
    },

    /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
    eventDrop({ event: droppedEvent }) {
      dispatch(updateEvent(droppedEvent));
      toast.success(<ToastComponent title="Event Updated" color="success" icon={<Check />} />, {
        icon: false,
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false
      });
    },

    /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
    eventResize({ event: resizedEvent }) {
      dispatch(updateEvent(resizedEvent));
      toast.success(<ToastComponent title="Event Updated" color="success" icon={<Check />} />, {
        icon: false,
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false
      });
    },

    ref: calendarRef,

    // Get direction from app state (store)
    direction: isRtl ? 'rtl' : 'ltr'
  };

  const calendarDateClicked = () => {
    setSelEvTypeModalOpen(true);
    // setAddAppointmentSidebarOpen(true);
  };

  return (
    <Card className="shadow-none border-0 mb-0 rounded-0">
      <CardBody className="pb-0">
        <FullCalendar {...calendarOptions} />
        {/* <div>
          <ButtonGroup className="add-element">
            <Button>Setting</Button>
          </ButtonGroup>
        </div> */}
        <SelectEventType
          isOpen={selEvTypeModalOpen}
          setIsOpen={setSelEvTypeModalOpen}
          setCalendarEventType={setCalendarEventType}
          setAddAppointmentSidebarOpen={setAddAppointmentSidebarOpen}
          handleAddEventSidebar={handleAddEventSidebar}
        />
      </CardBody>
    </Card>
  );
};

export default memo(Calendar);
