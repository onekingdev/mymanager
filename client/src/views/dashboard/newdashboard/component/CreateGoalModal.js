import {
  Button,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  UncontrolledTooltip
} from 'reactstrap';
import { Trash } from 'react-feather';

const CreateGoalModal = ({ isOpen, toggle }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="task-status-setting modal-dialog-centered"
      style={{ minWidth: '600px' }}
    >
      <ModalHeader toggle={toggle}>Create New Goal</ModalHeader>
      <ModalBody className="p-0">
        <Row style={{ padding: '0rem 0.5rem' }}>
          <Col xs="5" style={{ borderRight: '1px solid #ddd' }}>
            <div className="d-flex flex-column" style={{ margin: '10px 0' }}>
              <ListGroup style={{ borderRadius: 0 }}>
                <ListGroupItem>
                  <div className="d-flex align-items-center justify-content-between cursor-pointer">
                    <Badge pill>title</Badge>
                    <>
                      <Trash
                        size={14}
                        style={{ float: 'right', cursor: 'pointer' }}
                        className="me-25 text-danger"
                      />
                    </>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col xs="7">
            <div className="d-flex flex-column" style={{ margin: '10px' }}>
              <div className="mb-1">
                <Label className="form-label" for="label-title">
                  Title <span className="text-danger">*</span>
                </Label>
                <Input
                  id="labelTitle"
                  name="labelTitle"
                  placeholder="Title"
                  className="new-todo-item-title"
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="label-color">
                  Label Color
                </Label>
                {/* <Row style={{ width: '90%' }}>
                  <Badge>0</Badge>
                </Row> */}
              </div>
              <div className="mb-1">
                <Button
                  style={{ float: 'left', width: '45%' }}
                  color="primary"
                  type="submit"
                  className="me-75"
                >
                  Save
                </Button>
                <Button style={{ float: 'right', width: '45%' }} outline color="primary">
                  Cancel
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default CreateGoalModal;
