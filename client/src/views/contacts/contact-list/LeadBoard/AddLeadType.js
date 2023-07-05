import { Fragment } from 'react';

import {
  Card,
  CardTitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Button
} from 'reactstrap';
import { selectContactAction } from '../../store/actions';
import { useDispatch } from 'react-redux';
const SelectEventType = (props) => {
  const { isOpen, setIsOpen, setIsStageManagementOpen, toggleSidebar } = props;

  const dispatch = useDispatch();

  const cancelBtnClicked = () => {
    setIsOpen(false);
  };

  const openStageSidebar = () => {
    setIsOpen(false);
    setIsStageManagementOpen(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={cancelBtnClicked} size="md" centered>
        <ModalHeader className="text-center bg-transparent d-flex" toggle={cancelBtnClicked}>
          <h5>Create</h5>
        </ModalHeader>
        <ModalBody className="mt-0">
          <Fragment>
            <Row>
              <Col xs={6}>
                <Card body outline color="primary">
                  <CardTitle tag="h5">New Lead</CardTitle>
                  <CardText>Add your lead, any one-time or ongoing reminder here.</CardText>
                  <Button
                    className="mt-0"
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(selectContactAction({}));
                      toggleSidebar();
                      cancelBtnClicked();
                    }}
                  >
                    New Lead
                  </Button>
                </Card>
              </Col>
              <Col xs={6}>
                <Card body outline color="primary">
                  <CardTitle tag="h5">New Stage</CardTitle>
                  <CardText>Add any one-time or class event here that requires.</CardText>
                  <Button
                    className="mt-0"
                    color="primary"
                    onClick={(e) => {
                      openStageSidebar();
                    }}
                  >
                    New Stage
                  </Button>
                </Card>
              </Col>
            </Row>
          </Fragment>
        </ModalBody>
      </Modal>
    </>
  );
};

export default SelectEventType;
