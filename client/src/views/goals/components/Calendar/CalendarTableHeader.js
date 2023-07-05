import React from 'react';

const CalendarTableHeader = () => {
    return (
        <div className='d-flex justify-content-around my-2' style={{ fontSize: '14px', color: '#0184FF'}}>
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
        </div>
    )
}

export default CalendarTableHeader;