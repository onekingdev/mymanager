import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Button,
  Card,
  CardBody,
  InputGroup,
  InputGroupText,
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
import { sendFreezeTaskRQ } from './store/action';

const FreezeTask = (props) => {
  const { isOpen, setIsOpen, data, setSendFTRQ } = props;
  const today = new Date().toLocaleDateString();

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const dispatch = useDispatch();

  const cancleBtnClicked = () => {
    setSendFTRQ(false);
    setIsOpen(false);
  };

  const confirmBtnClicked = () => {
    // Call Freezing task api
    console.log(startDate, endDate, data);
    dispatch(sendFreezeTaskRQ({ taskId: data._id, startDate, endDate }));
    // Close Dialog
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} toggle={() => cancleBtnClicked()} className="modal-dialog-centered">
      <ModalHeader toggle={() => cancleBtnClicked()}>
        <RiAlarmWarningFill size={16} style={{ marginTop: '-4px', marginRight: '5px' }} />
        Task Freeze Request
      </ModalHeader>
      <ModalBody style={{ padding: 0 }}>
        <Fragment>
          <Row style={{ margin: '1rem 0' }}>
            <div>
              To freeze the task select the start date and end date for this task. Then your client
              show this and apply or discard this request.
            </div>
            <Col md="6" sm="12" className="mt-1">
              Start Date
              <InputGroup
                className="d-flex input-group-merge select-day-checklist"
                style={{ float: 'right', minWidth: '145px' }}
              >
                <Flatpickr
                  value={startDate}
                  data-enable-time
                  id="start-freeze-date-time-picker"
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
                  <Calendar size={16} />
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
                  id="end-freeze-date-time-picker"
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
                  <Calendar size={16} />
                </InputGroupText>
              </InputGroup>
            </Col>
          </Row>
        </Fragment>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={confirmBtnClicked}
          style={{ width: '120px' }}
          // disabled={}
        >
          Send
        </Button>
        <Button color="secondary" onClick={cancleBtnClicked} style={{ width: '120px' }}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FreezeTask;
