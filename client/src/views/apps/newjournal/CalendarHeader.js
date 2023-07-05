import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

const CalendarHeader = ({ date, setDate }) => {

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  return (
    <div className="journal-calendar-header mt-1">
      <div className="cursor-pointer" onClick={() => handlePrevMonth()}>
        <ChevronLeft size={18} />
      </div>
      <div className="cursor-pointer" onClick={() => handleNextMonth()}>
        <ChevronRight size={18} />
      </div>
      <h2 className="ms-1 my-50">{`${date.toLocaleString('default', {
        month: 'long'
      })} ${date.getFullYear()}`}</h2>
    </div>
  );
};

export default CalendarHeader;
