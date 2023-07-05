import React, { useState } from 'react';
import EventView from './EventView';
import EventFilter from './EventFilter';
import EventTableView from './EventTableView';
import { useSelector } from 'react-redux';

function index() {
  const eventData = useSelector((state) => state.event.events);

  const [searchTermEvent, setSearchTermEvent] = useState('');
  const [isOpen, setIsOpen] = useState(new Array(eventData.length).fill(false));


  const serchEventName = async (e) => {
    if (e.key === 'Enter') {
      // Perform some action
      await dispatch(eventByNameAction(searchTermEvent));
    }
  };
  const toggle = (index) => {
    setIsOpen((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };

  return (
    <div>
      <EventFilter
        setSearchTermEvent={setSearchTermEvent}
        searchTermEvent={searchTermEvent}
        serchEventName={serchEventName}
      />
      <EventView toggle={toggle} eventData={eventData} isOpen={isOpen} />
      {/* <EventTableView eventData={eventData} /> */}
    </div>
  );
}

export default index;
