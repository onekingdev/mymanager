import React, { useEffect, useState } from 'react';
import { CheckCircle, Delete } from 'react-feather';
import { Button, Col, Input, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import NumPadCell from '../../contacts/checkin/NumPadCell';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { checkMemberAction } from '../../contacts/store/actions';

const NumPad = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFullScreen, setSidebarOpen } = props;

  const [attendanceList, setAttendanceList] = useState([]);
  const [contactsArr, setContactsArr] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const { userData } = useSelector((state) => state.auth);
  const contactsList = useSelector((state) => state.totalContacts?.employeeList?.data?.list);

  const handleCheckInClick = (e) => {
    if (contactsList.length > 0) {
      contactsList.map((contact, index) => {
        if (contact.punchId == parseInt(inputValue)) {
          dispatch(checkMemberAction(contact._id));
        }
      });
    }
    setSidebarOpen(false);
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
