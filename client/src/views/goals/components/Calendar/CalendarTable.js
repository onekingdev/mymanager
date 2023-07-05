import React from 'react';
import CalendarTableHeader from './CalendarTableHeader';
import CalendarTableRow from './CalendarTableRow';
import DateCell from './DateCell';

const CalendarTable = ({ year, month, data, toggleHabitRecord,task}) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const startDateOfCalendar = new Date(year, month, 1 - firstDayOfMonth.getDay());
    const calcNextDay = (date, diff) => {
        var nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + diff);
        return nextDay
    }

    return (
        <>
            <CalendarTableHeader />
            <CalendarTableRow data={data} firstDayOfMonth={firstDayOfMonth} startDate={calcNextDay(startDateOfCalendar, 0)} toggleHabitRecord={toggleHabitRecord} task={task}/>
            <CalendarTableRow data={data} firstDayOfMonth={firstDayOfMonth} startDate={calcNextDay(startDateOfCalendar, 7)} toggleHabitRecord={toggleHabitRecord} task={task}/>
            <CalendarTableRow data={data} firstDayOfMonth={firstDayOfMonth} startDate={calcNextDay(startDateOfCalendar, 14)} toggleHabitRecord={toggleHabitRecord} task={task}/>
            <CalendarTableRow data={data} firstDayOfMonth={firstDayOfMonth} startDate={calcNextDay(startDateOfCalendar, 21)} toggleHabitRecord={toggleHabitRecord} task={task}/>
            <CalendarTableRow data={data} firstDayOfMonth={firstDayOfMonth} startDate={calcNextDay(startDateOfCalendar, 28)} toggleHabitRecord={toggleHabitRecord} task={task}/>
            <CalendarTableRow data={data} firstDayOfMonth={firstDayOfMonth} startDate={calcNextDay(startDateOfCalendar, 35)} toggleHabitRecord={toggleHabitRecord} task={task}/>
        </>
    )
}

export default CalendarTable;