import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Button,
  Card,
  CardBody,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from 'reactstrap';
import Flatpickr from 'react-flatpickr';

import { RiAlarmWarningFill } from 'react-icons/ri';
import { Calendar } from 'react-feather';

// ** Action
import { sendFreezeTaskAccept } from '../store/action';

const FreezeTaskAccept = (props) => {
  const { isOpen, setIsOpen, data } = props;

  const today = new Date(data?.freeze[0]?.startDate);

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(data?.freeze[0]?.endDate);

  const dispatch = useDispatch();

  const cancelBtnClicked = () => {
    setIsOpen(false);
  };

  const confirmBtnClicked = () => {
    // Call Freezing task api
    console.log(startDate, endDate, data);
    dispatch(sendFreezeTaskAccept({ taskId: data._id, startDate, endDate }));
    // Close Dialog
    setIsOpen(false);
  };

  useEffect(() => {
    if (data) {
      setStartDate(data?.freeze[0]?.startDate);
      setEndDate(data?.freeze[0]?.endDate);
    }
  }, [data]);

  return (
    <Modal isOpen={isOpen} toggle={() => cancelBtnClicked()} className="modal-dialog-centered">
      <ModalHeader toggle={() => cancelBtnClicked()}>
        <RiAlarmWarningFill size={16} style={{ marginTop: '-4px', marginRight: '5px' }} />
        Task Freeze Request
      </ModalHeader>
      <ModalBody style={{ padding: 0 }}>
        <Fragment>
          <Row style={{ margin: '1rem 0' }}>
            {data?.freeze[0]?.status ? (
              <>
                <div>Already accepted for the task.</div>
                <div>You can update the start date and end date.</div>
              </>
            ) : (
              <div>Your employee want to freeze this task during this period:</div>
            )}
            <Col md="6" sm="12" className="mt-1">
              Start Date
              <InputGroup
                className="d-flex input-group-merge select-day-checklist"
                style={{ float: 'right', minWidth: '145px' }}
              >
                <Flatpickr
                  value={startDate}
                  data-enable-time
                  id="start-freeze-date-time-accpet"
                  className="form-control"
                  onChange={(date) => {
                    setStartDate(date[0].toLocaleDateString());
                  }}
                  options={{
                    // mode: 'range',
                    dateFormat: 'm-d-Y',
                    minDate: 'today',
                    enableTime: false
                  }}
                />
                <InputGroupText>
                  <Label htmlFor="start-freeze-date-time-accpet">
                    <Calendar size={16} />
                  </Label>
                </InputGroupText>
              </InputGroup>
            </Col>
            <Col md="6" sm="12" className="mt-1">
              End Date
              <InputGroup
                className="d-flex input-group-merge select-day-checklist"
                style={{ float: 'right', minWidth: '145px' }}
              >
                <Flatpickr
                  value={endDate}
                  data-enable-time
                  id="end-freeze-date-time-accpet"
                  className="form-control"
                  onChange={(date) => {
                    setEndDate(date[0].toLocaleDateString());
                  }}
                  options={{
                    // mode: 'range',
                    dateFormat: 'm-d-Y',
                    minDate: 'today',
                    enableTime: false
                  }}
                />
                <InputGroupText>
                  <Label htmlFor="end-freeze-date-time-accpet">
                    <Calendar size={16} />
                  </Label>
                </InputGroupText>
              </InputGroup>
            </Col>
          </Row>
        </Fragment>
      </ModalBody>
      <ModalFooter>
        <Button
          color="success"
          onClick={(e) => {
            e.preventDefault();
            confirmBtnClicked();
          }}
          style={{ width: '120px' }}
          // disabled={}
        >
          Accept
        </Button>
        {/* <Button
          color="danger"
          style={{ width: '120px' }}
          // disabled={}
        >
          Decline
        </Button> */}
        <Button
          color="secondary"
          onClick={(e) => {
            e.preventDefault();
            cancelBtnClicked();
          }}
          style={{ width: '120px' }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FreezeTaskAccept;
