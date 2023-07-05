import React, { useEffect, useState } from 'react';
import { CheckCircle, Delete } from 'react-feather';
import { Button, Col, Input, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import NumPadCell from './NumPadCell';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { saveAttendEmployeeAction, getEmployeeAttendanceAction } from '../store/actions';

const NumPad = (props) => {
  const dispatch = useDispatch();

  const { isFullScreen, setSidebarOpen } = props;

  const [attendanceList, setAttendanceList] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const employeeList = useSelector((state) => state.totalContacts?.employeeList?.data?.list);
  const attendanceStore = useSelector((state) => state.totalContacts.employeeAttance);
  const { userData } = useSelector((state) => state.auth);

  // ** Effects
  useEffect(() => {
    setAttendanceList(attendanceStore?.data);
  }, [attendanceStore?.data]);
  // ** Handlers
  const handleCheckInClick = (e) => {
    let today = new Date().getDay();
    let current = new Date();
    if (employeeList?.length) {
      if (employeeList.find((item) => item.punchId === inputValue)) {
        employeeList.map((employee, index) => {
          if (employee.punchId == inputValue) {
            let canAttend = false,
              shiftId = 0;
            employee.shift.map((perShift, index) => {
              if (perShift.weekDay == today) {
                canAttend = true;
                shiftId = perShift._id;
              } else return;
            });
            if (canAttend == true) {
              if (
                attendanceList &&
                attendanceList.find((item) => item?.employeeId[0]._id == employee._id)
              ) {
                toast.error('You already punch in');
                return;
              } else {
                dispatch(
                  saveAttendEmployeeAction({
                    contactId: employee._id,
                    shiftId: shiftId,
                    actualStart: current
                  })
                );
                toast.success('You successfully punch in');
                if (setSidebarOpen && !isFullScreen) {
                  setSidebarOpen(false);
                }
                if (userData.workType == 'inhouse') {
                }
                return;
              }
            } else {
              toast.error('Today is not your work day.');
              return;
            }
          } else return;
        });
      } else {
        toast.error('Invalid Punch ID');
      }
    } else {
      return;
    }
  };

  return (
    <div className="mt-5">
      <Row
        className="d-flex font-large-1 justify-content-center"
        style={{ fontWeight: 'bold', color: 'white' }}
      >
        Check-In
      </Row>
      <Row className="mb-4 mt-4">
        <Input
          value={inputValue}
          className="py-1 rounded-50 w-100"
          style={{ backgroundColor: '#3e475e', color: 'white', maxWidth: '350px' }}
          placeholder="Enter check-in code..."
        />
      </Row>
      <Row className="mb-4">
        <Col className="d-flex justify-content-center">
          <NumPadCell inputValue={inputValue} setInputValue={setInputValue}>
            1
          </NumPadCell>
        </Col>
        <Col className="d-flex justify-content-center">
          <NumPadCell inputValue={inputValue} setInputValue={setInputValue}>
            2
          </NumPadCell>
        </Col>
        <Col className="d-flex justify-content-center">
          <NumPadCell inputValue={inputValue} setInputValue={setInputValue}>
            3
          </NumPadCell>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="d-flex justify-content-center">
          <NumPadCell inputValue={inputValue} setInputValue={setInputValue}>
            4
          </NumPadCell>
        </Col>
        <Col className="d-flex justify-content-center">
          <NumPadCell inputValue={inputValue} setInputValue={setInputValue}>
            5
          </NumPadCell>
        </Col>
        <Col className="d-flex justify-content-center">
          <NumPadCell inputValue={inputValue} setInputValue={setInputValue}>
            6
          </NumPadCell>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="d-flex justify-content-center">
          <NumPadCell inputValue={inputValue} setInputValue={setInputValue}>
            7
          </NumPadCell>
        </Col>
        <Col className="d-flex justify-content-center">
          <NumPadCell inputValue={inputValue} setInputValue={setInputValue}>
            8
          </NumPadCell>
        </Col>
        <Col className="d-flex justify-content-center">
          <NumPadCell inputValue={inputValue} setInputValue={setInputValue}>
            9
          </NumPadCell>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="d-flex justify-content-center">
          <NumPadCell inputValue={inputValue} setInputValue={setInputValue} isDelete>
            <Delete />
          </NumPadCell>
        </Col>
        <Col className="d-flex justify-content-center">
          <NumPadCell inputValue={inputValue} setInputValue={setInputValue}>
            0
          </NumPadCell>
        </Col>
        <Col className="d-flex justify-content-center">
          <NumPadCell setInputValue={setInputValue} isClear>
            CE
          </NumPadCell>
        </Col>
      </Row>
      <Row className="mb-2">
        <Button color="primary" className="rounded-50" onClick={(e) => handleCheckInClick(e)}>
          Check In
        </Button>
      </Row>
    </div>
  );
};

export default NumPad;
