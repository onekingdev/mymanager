import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { monthAsString } from '../../../../utility/Utils';

const CalendarHeader = ({monthDate, setMonthDate}) => {

  return (
    <div className="d-flex justify-content-between mb-1">
      <div className="d-flex align-items-center">
        <ChevronLeft size={20} onClick={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1))} />
        <p className="ms-1 my-auto">{monthAsString(monthDate.getMonth())}</p>
        <p className="ms-1 me-1 my-auto">{monthDate.getFullYear()}</p>
        <ChevronRight size={20} onClick={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1))} />
      </div>
      <div>
        <h6 className="me-1 my-auto">Today</h6>
      </div>
    </div>
  );
};

export default CalendarHeader;