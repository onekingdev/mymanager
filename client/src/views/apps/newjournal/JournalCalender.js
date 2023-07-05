import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import { Button, Card, CardBody, Col, Input, InputGroup, InputGroupText, Row } from 'reactstrap';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@styles/react/apps/app-calendar.scss';
import '../../../../src/assets/styles/jaornal.scss';
import {
  getDateJournalData,
  getJournalCalenderList
} from '../../../requests/myJournal/getMyJournal';
import { getOneJournalListById } from '../../../requests/myJournal/getMyJournal';

const JournalCalender = ({
  viewDetailsId,
  setViewType,
  setViewDetailsId,
  setStatusOpen,
  setActive
}) => {
  const [calenderList, setCalenderList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  function handleDateSelect(info) {
    async function fetchData() {
      // console.log('Selected date:', info.startStr);

      const response = await getDateJournalData(info.startStr);
      // console.log('Journal data for selected date:', response);

      setViewType('List View');
      setJournalData(response);

      if (response.length > 0) {
        const firstJournalId = response[0]._id;

        setViewDetailsId(firstJournalId);
        setStatusOpen('open');
        setActive(0);
      }
    }
    fetchData();
  }

  function handleDateClick(info) {
    const index = calenderList.findIndex((item) => item.date === info.dateStr);
    setActive(index);
    const journalData = calenderList.filter((item) => item.date === info.dateStr);
    setJournalData(journalData);
    if (journalData.length > 0) {
      setViewDetailsId(journalData[0]._id);
      setStatusOpen('open');
    }
    setSelectedDate(info.dateStr);
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.event._def.title}</b>
      </>
    );
  }

  useEffect(() => {
    if (viewDetailsId) {
      async function fetchData() {
        const response = await getOneJournalListById(viewDetailsId);

        setStatusOpen('open');
      }
      fetchData();
    }
  }, [viewDetailsId]);

  useEffect(async () => {
    await getJournalCalenderList().then((response) => {
      setCalenderList(response);
    });
  }, []);
  return (
    <div className="calendar my-2">
      <FullCalendar
        height="auto"
        initialView="dayGridMonth"
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
        headerToolbar={{
          start: 'sidebarToggle, prev,next, title',
          end: ''
        }}
        popover={{
          width: '100px',
          height: 'auto'
        }}
        dayMaxEvents={1}
        eventLimit={true}
        events={calenderList.map((value) => ({
          title: value.title?.slice(0, 8),
          date: value?.date,
          id: value?._id,
          labelColor: value?.journal_category?.labelColor
            ? value?.journal_category?.labelColor
            : '#28c76f'
        }))}
        eventClick={(info) => {
          setViewDetailsId(info.event.id);
          setStatusOpen('open');
          setActive(info.event._id);
        }}
        selectable={true}
        select={handleDateSelect}
        dateClick={handleDateClick}
        eventContent={renderEventContent}
      />
    </div>
  );
};

export default JournalCalender;
