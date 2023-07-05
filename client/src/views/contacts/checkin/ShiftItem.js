import React, { useEffect, useState } from 'react';
import Avatar from '@components/avatar';
import { User } from 'react-feather';
import { CardText } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { formatAmPmTime, getWorkingHours } from '../../../utility/Utils';

const ShiftItem = (props) => {
  const { shift } = props;
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const employeeStore = useSelector((state) => state.employeeContact);
  useEffect(() => {
    let count = 0,
      today = new Date();
    employeeStore?.employeeList?.data?.list.map((employee, index1) => {
      if (employee.punchState == true) {
        employee.shift.map((eachShift, index2) => {
          if (eachShift.name == shift.name && eachShift.weekDay == today.getDay) {
            count++;
          } else return;
        });
      } else return;
    });
    setCount(count);
  }, [employeeStore.employeeList]);
  return (
    <div>
      <div className="d-flex flex-row justify-content-between mb-2 mt-2">
        <div>
          <h4>
            {formatAmPmTime(shift.start)} - {formatAmPmTime(shift.end)}
          </h4>
          <h5>{shift.name ? shift.name : 'Unknown'}</h5>
          <span>{getWorkingHours(shift.start, shift.end)} hour(s), General Shift</span>
        </div>
        <div>
          <div className="d-flex align-items-center">
            <Avatar color="light-primary" icon={<User size={24} />} className="me-1" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">{count}</h4>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ShiftItem;
