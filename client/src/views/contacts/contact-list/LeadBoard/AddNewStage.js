import { useEffect, useState } from 'react';

import {
  Button,
  FormFeedback,
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
  Row
} from 'reactstrap';
import Select, { components } from 'react-select'; //eslint-disable-line
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Check, Dribbble, Trash } from 'react-feather';
import { selectThemeColors } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import { check } from 'prettier';
import { createStageAction, updateStageAction, deleteStageAction } from '../../store/actions';

import '@src/assets/styles/contact/lead-stage-setting.scss';

const headerTxt = ['', 'Create A New Board'];

const bodyTxt = ['', 'Board Name'];

const confirmBtnTxt = ['', 'Create'];

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

const NewModal = (props) => {
  const { modalType, setModalType, leadStore } = props;

  const { tasks, boards } = useSelector((state) => state.workspace);
  const [createNewValidation, setCreateNewValidation] = useState(true);
  const [modalOpen, setModalOpen] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [boardId, setBoardId] = useState(null);
  const [currentStage, setCurrentStage] = useState();
  const [titleValidation, setTitleValidation] = useState(true);

  const [selectedTag, setSelectedTag] = useState(null);

  const dispatch = useDispatch();

  const handlePickerColor = (item) => {
    setCurrentStage({ ...currentStage, color: item.color });
  };
  const handleResetFields = () => {
    setCurrentStage(null);
  };
  const handleStageClick = (t) => {
    setCurrentStage(t);
  };

  const handleInputTitle = (e) => {
    const inputTxt = e.target.value;
    setCurrentStage((prev) => ({
      ...prev,
      value: inputTxt
    }));
    const checkDuplication = leadStore?.stages
      ?.map((x) => x.value.toLowerCase())
      ?.includes(inputTxt.toLowerCase());
    setTitleValidation(!checkDuplication);
  };

  const cancelBtnClicked = () => {
    setModalType(false);
  };

  const saveStageClick = () => {
    if (currentStage._id) {
      //update
      let payload = { value: currentStage.value, color: currentStage.color };
      dispatch(updateStageAction(currentStage._id, payload));
    } else {
      //add
      dispatch(createStageAction(currentStage));
    }
  };

  const handleDeleteStage = (stage) => {
    dispatch(deleteStageAction(stage._id)).then(() => {
      handleResetFields();
    });
  };

  useEffect(() => {
    setCurrentStage(null);
  }, [open]);

  return (
    <Modal
      isOpen={modalType}
      toggle={() => cancelBtnClicked()}
      className="lead-stage-setting modal-dialog-centered"
      style={{ minWidth: '600px' }}
    >
      <ModalHeader toggle={() => cancelBtnClicked()}>Stage Management</ModalHeader>
      <ModalBody className="p-0">
        <Row style={{ padding: '0rem 0.5rem' }}>
          <Col xs="5" style={{ borderRight: '1px solid #ddd' }}>
            <div className="d-flex flex-column" style={{ margin: '10px 0' }}>
              <PerfectScrollbar style={{ height: '230px' }} options={{ wheelPropagation: false }}>
                <ListGroup>
                  {leadStore?.stages?.map((x, index) => {
                    if (x.value == 'WIN' || x.value == 'LOST') {
                      return null;
                    } else {
                      return (
                        <ListGroupItem
                          key={x?._id}
                          active={x?._id === currentStage?._id ? true : false}
                          onClick={() => handleStageClick(x)}
                        >
                          {/* style={{ backgroundColor: 'blue !important' }} */}
                          <Badge color={x?.color} pill>
                            {x?.value}
                          </Badge>
                          <Trash
                            size={14}
                            style={{ float: 'right', cursor: 'pointer' }}
                            onClick={() => handleDeleteStage(x)}
                            className="me-25 text-danger"
                          />
                        </ListGroupItem>
                      );
                    }
                  })}
                </ListGroup>
              </PerfectScrollbar>
              <div className="d-flex flex-column align-items-center">
                <Button className="mt-1" outline color="primary" onClick={handleResetFields}>
                  Create New Stage
                </Button>
              </div>
            </div>
          </Col>
          <Col xs="7">
            <div className="d-flex flex-column" style={{ margin: '10px' }}>
              <p>{!currentStage?._id ? 'Add New Stage' : 'Update Stage'}</p>
              <div className="mb-1">
                <Label className="form-label" for="label-title">
                  Title <span className="text-danger">*</span>
                </Label>
                <Input
                  id="labelTitle"
                  name="labelTitle"
                  placeholder="Title"
                  className="new-todo-item-title"
                  value={currentStage?.value || ''}
                  onChange={handleInputTitle}
                  valid={titleValidation && currentStage?.value}
                  invalid={!titleValidation || !currentStage?.value}
                />
                <FormFeedback valid={titleValidation && currentStage?.value}>
                  {!titleValidation
                    ? 'Oh no! That name is already taken.'
                    : !currentStage?.value
                    ? 'Please, Enter the name.'
                    : 'Sweet! That name is available.'}
                </FormFeedback>
              </div>
              <div className="mb-1">
                <Label className="form-label" for="label-color">
                  Label Color
                </Label>
                <Row style={{ width: '90%' }}>
                  {colorData.map((item, index) => {
                    return (
                      <Col xs="2">
                        <h3>
                          <Badge
                            style={{ cursor: 'pointer' }}
                            onClick={() => handlePickerColor(item)}
                            color={item.color}
                            pill
                          >
                            {currentStage?.color === item.color ? (
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
              {!currentStage?._id ? (
                <div className="mb-1">
                  <Button
                    style={{ float: 'left', width: '45%' }}
                    color="primary"
                    type="submit"
                    className="me-75"
                    disabled={!currentStage?.value || !currentStage?.color || !titleValidation}
                    onClick={saveStageClick}
                  >
                    Create
                  </Button>
                  <Button
                    style={{ float: 'right', width: '45%' }}
                    outline
                    color="primary"
                    onClick={handleResetFields}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="mb-1">
                  <Button
                    style={{ float: 'left', width: '45%' }}
                    color="primary"
                    type="submit"
                    className="me-75"
                    disabled={!currentStage?.value || !currentStage?.color || !titleValidation}
                    onClick={saveStageClick}
                  >
                    Save
                  </Button>
                  <Button
                    style={{ float: 'right', width: '45%' }}
                    outline
                    color="primary"
                    onClick={handleResetFields}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </ModalBody>
      {/* <ModalFooter>
        <Button
          color="danger"
          className="btn btn-sm"
          outline
          style={{ float: 'right' }}
          onClick={() => cancelBtnClicked()}
        >
          Close
        </Button>
      </ModalFooter> */}
    </Modal>
  );
};

export default NewModal;
