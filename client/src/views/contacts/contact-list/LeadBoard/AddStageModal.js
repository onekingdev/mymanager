import { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
  ListGroup,
  FormFeedback,
  Badge
} from 'reactstrap';
import Select, { components } from 'react-select';
import { selectThemeColors } from '@utils';
import { Check, Dribbble, Trash } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';

const colorData = [
  { color: 'primary' },
  { color: 'secondary' },
  { color: 'success' },
  { color: 'danger' },
  { color: 'warning' },
  { color: 'info' },
  { color: 'light-primary' },
  { color: 'light-secondary' },
  { color: 'light-success' },
  { color: 'light-danger' },
  { color: 'light-warning' },
  { color: 'light-info' }
];
function AddStageSidebar({ isOpen, setIsOpen, handleLeadOpen }) {
  const [leadSource, setLeadSource] = useState();
  const [titleValidation, setTitleValidation] = useState(true);
  const [newTitle, setNewTitle] = useState('');

  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your submit logic here
    setIsOpen(false);
    handleLeadOpen();
  };
  const handleResetFields = () => {
    setLeadSource(null);
  };
  const handleTagClick = (t) => {
    setLeadSource(t);
  };

  const handleInputTitle = (e) => {
    const inputTxt = e.target.value;
    setNewTitle(inputTxt);
  };

  const cancleBtnClicked = () => {
    setModalType(0);
  };

  useEffect(() => {
    setLeadSource(null);
  }, [open]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => setIsOpen(false)}
      className="modal-dialog-centered"
      style={{ width: '90%' }}
    >
      <ModalHeader toggle={() => setIsOpen(false)}>Add New Stage</ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <p>{leadSource?._id !== '' ? 'Add New Stage' : 'Update Stage'}</p>
            <PerfectScrollbar options={{ wheelPropagation: false }}>
              <div className="mb-1">
                <Label className="form-label" for="label-title">
                  Title <span className="text-danger">*</span>
                </Label>
                <Input
                  id="labelTitle"
                  name="labelTitle"
                  placeholder="Title"
                  className="new-todo-item-title"
                  value={leadSource?.title}
                  onChange={handleInputTitle}
                  valid={titleValidation && leadSource?.title}
                  invalid={!titleValidation || !leadSource?.title}
                />
                <FormFeedback valid={titleValidation && leadSource?.title}>
                  {!titleValidation
                    ? 'Oh no! That name is already taken.'
                    : !leadSource?.title
                    ? 'Please, Enter the name.'
                    : 'Sweet! That name is available.'}
                </FormFeedback>
              </div>
              <div className="mb-1 ">
                <Label className="form-label" for="label-color">
                  Label Color
                </Label>
                <Row style={{ width: '95%' }} className="text-center">
                  {colorData.map((item, index) => {
                    return (
                      <Col xs="2">
                        <h3>
                          <Badge
                            style={{ cursor: 'pointer' }}
                            // onClick={() => handlePickerColor(item)}
                            color={item.color}
                            pill
                          >
                            {leadSource?.color === item.color ? (
                              <Check
                                size={14}
                                style={{
                                  point: 'handler',
                                  float: 'center',
                                  margin: '2px 1px 0px 1px'
                                }}
                              />
                            ) : (
                              <Dribbble
                                size={14}
                                style={{
                                  point: 'handler',
                                  float: 'center',
                                  margin: '2px 1px 0px 1px'
                                }}
                              />
                            )}
                          </Badge>
                        </h3>
                      </Col>
                    );
                  })}
                </Row>
              </div>
              {leadSource?._id === '' ? (
                <div>
                  <Button
                    style={{ float: 'left', width: '45%' }}
                    color="primary"
                    size="sm"
                    type="submit"
                    className="me-75"
                  >
                    Ok
                  </Button>
                  <Button
                    style={{ float: 'right', width: '45%' }}
                    outline
                    size="sm"
                    color="primary"
                    onClick={handleResetFields}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    style={{ float: 'left', width: '45%' }}
                    outline
                    size="sm"
                    color="primary"
                    onClick={handleResetFields}
                    disabled
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ float: 'right', width: '45%' }}
                    color="primary"
                    size="sm"
                    type="submit"
                    className="me-75"
                    disabled={!leadSource?.title || !leadSource?.color}
                  >
                    Create
                  </Button>
                </div>
              )}
            </PerfectScrollbar>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

export default AddStageSidebar;
