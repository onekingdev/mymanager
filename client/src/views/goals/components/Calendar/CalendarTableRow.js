import React from 'react';
import DateCell from './DateCell';

const CalendarTableRow = ({ data, startDate, firstDayOfMonth,toggleHabitRecord,task }) => {
  return (
    <div className="d-flex justify-content-around my-2">
      {[...Array(7)].map((_, index) => {
        let status = '';
        var nextDay = new Date(startDate);
        nextDay.setDate(nextDay.getDate() + index);
        const matchedData = data.find(x=>{
          const d = new Date(x.date)
          if(`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`===`${nextDay.getDate()}/${nextDay.getMonth()}/${nextDay.getFullYear()}`){
            return x
          }
        })
        let isCurrentMonth = false;
        if (nextDay.getMonth() === firstDayOfMonth.getMonth()) isCurrentMonth = true;
        return (
          <DateCell fullDate={nextDay}  isCurrentMonth={isCurrentMonth} date={nextDay.getDate()} status={matchedData?matchedData.status:nextDay > new Date() ? '' : 'prevDone'} toggleHabitRecord={toggleHabitRecord} task={task}/>
        );
      })}
    </div>
  );
};

export default CalendarTableRow;
