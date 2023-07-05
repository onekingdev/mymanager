import { Fragment, useState } from 'react';

import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  ButtonGroup,
  Button
} from 'reactstrap';

const SelectEventType = (props) => {
  const {
    isOpen,
    setIsOpen,
    setCalendarEventType,
    setAddAppointmentSidebarOpen,
    handleAddEventSidebar
  } = props;
  const [rSelected, setrSeleted] = useState(0);

  const cancelBtnClicked = () => {
    setIsOpen(false);
  };

  const onRadioBtnClick = (rSelected) => {
    setCalendarEventType(rSelected == 1 ? 'Appointment' : 'Class');
    setIsOpen(false);
    if (rSelected == 1) {
      setAddAppointmentSidebarOpen(true);
    } else {
      handleAddEventSidebar();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => cancelBtnClicked()}
      className="modal-dialog-centered"
      size="md"
    >
      <ModalHeader className="text-center bg-transparent d-flex" toggle={cancelBtnClicked}>
        <div>
          <h5>Create New</h5>
        </div>
      </ModalHeader>
      <ModalBody className="mt-0">
        <Fragment>
          <Row>
            <Col xs={6}>
              <Card body outline color="primary">
                <CardTitle tag="h5">Appointment</CardTitle>
                <CardText>
                  Add your appointment, birthday or any one time or ongoing reminder here.
                </CardText>
                <Button className="mt-0" color="primary" onClick={() => onRadioBtnClick(1)}>
                  Appointment
                </Button>
              </Card>
            </Col>
            <Col xs={6}>
              <Card body outline color="primary">
                <CardTitle tag="h5">Class</CardTitle>
                <CardText>
                  Add any one time or recurring event here that requires recording attendance.
                </CardText>

                <Button className="mt-0" color="primary" onClick={() => onRadioBtnClick(2)}>
                  Class
                </Button>
              </Card>
            </Col>
          </Row>
        </Fragment>
      </ModalBody>
    </Modal>
  );
};

export default SelectEventType;
