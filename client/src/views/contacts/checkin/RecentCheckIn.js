import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecentCheckInItem from './RecentCheckInItem';
import { getEmployeeAttendanceAction } from '../store/actions';
const RecentCheckIn = (props) => {
  const { isViewAll } = props;
  const dispatch = useDispatch();
  const attendanceStore = useSelector((state) => state.totalContacts.employeeAttance);
  const [attendanceList, setAttendanceList] = useState([]);
  useEffect(() => {
    if (isViewAll) {
      setAttendanceList(attendanceStore?.data);
    } else {
      setAttendanceList(attendanceStore?.data.slice(0, 5));
    }
  }, [attendanceStore?.data]);
  useEffect(() => {
    dispatch(getEmployeeAttendanceAction());
  }, []);

  return (
    <div>
      {attendanceList && attendanceList.length > 0 ? (
        attendanceList.map((attendance, index) => {
          if (attendance?.contact?.length && attendance?.shift?.length) {
            return (
              <RecentCheckInItem
                employeeId={attendance.contact[0]._id}
                employeeName={attendance.contact[0].fullName}
                start={attendance.shift[0].start}
                end={attendance.shift[0].end}
                actualStart={attendance?.actualStart}
                shiftName={attendance?.shift[0].name ? attendance.shift[0].name : 'Day Shift'}
                key={'employee-' + index}
              />
            );
          }
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default RecentCheckIn;
