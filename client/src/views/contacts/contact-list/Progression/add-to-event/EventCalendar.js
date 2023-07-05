// ** React Import
import { useEffect, useRef, memo, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, CardBody, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import { Menu, Check, ArrowLeft, ArrowRight } from 'react-feather';

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import Avatar from '@components/avatar';
import { customInterIceptors } from '../../../../../lib/AxiosProvider';
// ** Custom Components && Third Party Components
import { formatTime, getUserData } from '../../../../../utility/Utils';
import { getEvents, getEventInfo } from '../../../../calendar/event/store';
import { progressionFetchAction } from '../../../../settings/tabs/progressiontab/store/actions';
import { progressionListAction, promotedListAction } from '../../../store/actions';
import { cvtColor } from '../../constants';
import '@src/assets/styles/calendar/calendar.scss';

var prevEl = null,
  prevBackCr,
  prevBorderCr;

// ** Toast Component
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

const EventCalendar = (props) => {
  const dispatch = useDispatch();
  const API = customInterIceptors();
  // ** Refs
  const calendarRef = useRef(null);

  // ** Props
  const {
    updateEvent,
    selectedRows,
    selectedEventId,
    setSelectedEventId,
    isRtl,
    stepper,
    loading,
    setLoading
  } = props;

  // ** State
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [promotionEvents, setPromotionEvents] = useState([]);
  const selectedEventInfo = useSelector((state) =>
    state?.event?.events.find((x) => x._id == selectedEventId)
  );
  const events = useSelector((state) => state.event.events);

  useEffect(() => {
    dispatch(getEvents(getUserData()?.id));
  }, [dispatch]);

  useEffect(() => {
    let tmp = [];
    events.map((event, index) => {
      if (event.eventCategory == 'promotion') {
        tmp.push(event);
      }
    });
    setPromotionEvents(tmp);
  }, [events]);

  useEffect(() => {
    dispatch(promotedListAction());
    dispatch(progressionFetchAction());
    dispatch(progressionListAction());
    dispatch(getEventInfo(selectedEventId));
  }, [selectedEventId]);

  function handleEventClick(info) {
    if (prevEl) {
      prevEl.className = prevEl.className.replace('bg-light-primary', 'bg-light-secondary');
      prevEl.style.borderColor = prevBorderCr;
    }

    prevEl = info.el;
    prevBackCr = info.el.style.backgroundColor;
    prevBorderCr = info.el.style.borderColor;

    info.el.className = prevEl.className.replace('bg-light-secondary', 'bg-light-primary');
    info.el.style.borderColor = cvtColor['primary'];
    info.el.style.borderWidth = '1px';
    // Update selectedEvent state
    setSelectedEvent(info.event);
    try {
      setSelectedEventId(info.event._def.extendedProps._id);
    } catch {
      setSelectedEventId('');
    }
  }

  const renderEventContent = (eventInfo) => {
    return (
      <div className="fw-bolder ps-25">
        <div className="">{eventInfo?.event._def?.title}</div>
        <div>
          {formatTime(eventInfo?.event._instance?.range?.start)}-
          {formatTime(eventInfo?.event._instance?.range?.end)}
        </div>
      </div>
    );
  };
  // ** calendarOptions(Props)
  const calendarOptions = {
    events: promotionEvents?.length ? promotionEvents : [],
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    // headerToolbar: {
    //     start: 'sidebarToggle, prev,next, title',
    //     end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    // },
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

    // contentHeight: 500,
    height: 600,
    dayMaxEventRows: true,
    dayMaxEvents: 2,

    // aspectRation: 3,
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
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
    navLinks: true,

    eventClassNames({ event: calendarEvent }) {
      // eslint-disable-next-line no-underscore-dangle
      // const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar];

      return [`bg-light-secondary`];
    },

    eventClick(info) {
      handleEventClick(info);
      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      // event.value = grabEventDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      // isAddNewEventSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        text: <Menu className="d-xl-none d-block" />,
        click() {
          toggleSidebar(true);
        }
      }
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
    direction: isRtl ? 'rtl' : 'ltr',
    eventContent: (eventInfo) => {
      return renderEventContent(eventInfo);
    }
  };

  const handleNext = async () => {
    if (!selectedEvent) {
      toast.error('Please select a event');
      return;
    } else {
      let payload = [];
      selectedRows.map((item) => {
        payload.push({ ...item, name: item.fullName, clientId: item._id });
      });
      const response = await API.post(`event/add-guests`, {
        data: payload,
        _id: selectedEventInfo._id,
        sendEmailChecked: true
      }).catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });

      if (response.status == 404) {
        toast.error(response.data.msg);
      }

      if (response.status == 200) {
        toast.success('Guests added successfully');
        stepper.next();
      }
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

  return (
    <div>
      <Card className="shadow-none border-0 mb-0 rounded-0">
        <CardBody className="pb-0">
          {loading ? (
            <div className="d-flex align-items-center" style={{ width: '100%', height: '500px' }}>
              <div className="d-flex flex-column align-items-center" style={{ width: '100%' }}>
                <Spinner style={{ width: '4rem', height: '4rem' }} />
                <h3 className="mt-1 fw-bold">Loading . . .</h3>
              </div>
            </div>
          ) : (
            events.length > 0 && (
              <>
                <h5 className="mb-1">
                  Event Selected : <b>{selectedEventInfo?.title || 'None'}</b>
                </h5>
                <FullCalendar {...calendarOptions} />
              </>
            )
          )}
        </CardBody>
      </Card>

      <div className="d-flex justify-content-between mt-2">
        <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button color="primary" className="btn-next" onClick={() => handleNext()}>
          <span className="align-middle d-sm-inline-block d-none">Add To Event</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </div>
  );
};

export default memo(EventCalendar);
