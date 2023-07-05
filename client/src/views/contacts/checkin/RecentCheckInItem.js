import React, { useState, useEffect } from 'react';
import Avatar from '@components/avatar';
import { User, LogOut } from 'react-feather';
import { Button } from 'reactstrap';
import { formatAmPmTime } from '../../../utility/Utils';
import { useDispatch } from 'react-redux';
import { checkOutEmployeeAction } from '../store/actions';
import { toast } from 'react-toastify';

const RecentCheckInItem = (props) => {
  const { employeeId, employeeName, start, end, shiftName, actualStart } = props;
  const dispatch = useDispatch();

  let today = 0;
  today = new Date().getDay();
  const handleCheckOutClick = () => {
    dispatch(checkOutEmployeeAction(employeeId));
    toast.success('Successfully check out');
  };
  return (
    <div>
      <div className="d-flex flex-row mb-2 mt-2 align-items-center position-relative">
        <div>
          <Avatar color="light-primary" icon={<User size={32} />} className="me-1 p-1 " />
        </div>
        <div>
          <Button
            color="primary"
            onClick={(e) => handleCheckOutClick()}
            outline
            className="position-absolute right-0 p-25"
          >
            <LogOut size={25} />
          </Button>
          <h4>{employeeName ? employeeName : 'Unknown'}</h4>
          <h5>{shiftName ? shiftName : 'Unknown'}</h5>
          <span className="d-block">
            Shift:{' '}
            {start ? formatAmPmTime(start) + ' - ' + formatAmPmTime(end) : '09:00 AM - 05:00 PM'}
          </span>
          <span>PunchIn: {actualStart ? formatAmPmTime(actualStart) : '09:00 AM'}</span>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default RecentCheckInItem;
