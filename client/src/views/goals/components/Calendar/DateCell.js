import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import{ toast} from "react-toastify";

const DateCell = ({ fullDate, date, status, isCurrentMonth, toggleHabitRecord, task }) => {
  const relation = {
    background: {
      done: '#279631',
      missing: '#CF0505',
      coming: 'none',
      prevDone: '#9bd19f',
      prevMissed: '#f47676',
      completed: '#0096FF',
    },
    text: {
      coming: 'black',
      done: 'white',
      missing: 'white',
      completed: '#',
      prevDone: 'white',
    },
    border: {
      within: '2px solid gray',
      today: '2px solid red',
      ['']: '2px solid #f0efe9'
    }
  };

  return (
    <>
      <div
        className="rounded-circle d-flex justify-content-center align-items-center"
        style={{
          background: isCurrentMonth
            ? relation.background[status]
            : status === 'missing'
              ? relation.background['prevMissed']
              : status === 'done'
                ? relation.background['prevDone']
                : 'none',
          width: '48px',
          height: '48px',
          border: isCurrentMonth ? relation.border[status] : "none",
          cursor: "pointer",
          color:  !isCurrentMonth ? '#b9b9c3' : relation.text[status]
        }}
        onClick={() => { (status === "missing" || status === "today") ? toggleHabitRecord(task, fullDate):toast.error("Habit can only be recorded for Today and missed Dates") }}
      >
        <p className='my-0 py-0'>{date}</p>
      </div>
    </>
  );
};

export default DateCell;
