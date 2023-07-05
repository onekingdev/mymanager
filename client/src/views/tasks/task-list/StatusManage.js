import { useEffect, useRef, useState } from 'react';

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
  Row,
  UncontrolledTooltip
} from 'reactstrap';
import Select, { components } from 'react-select'; //eslint-disable-line
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Check, Dribbble, Trash } from 'react-feather';
import { selectThemeColors } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import { check } from 'prettier';

import { addBoard, updateBoard, deleteBoard } from '../../apps/kanban/store';
import { setToDefaultReducer } from '../../formBuilder/store/reducer';
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

const StatusManage = (props) => {
  const { isOpen, setIsOpen, store, workspaceId } = props;

  const { tasks, boards } = useSelector((state) => state.workspace);
  const [createNewValidation, setCreateNewValidation] = useState(true);
  const [modalOpen, setModalOpen] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [boardId, setBoardId] = useState(null);
  const [currentStatus, setCurrentStatus] = useState();
  const [titleValidation, setTitleValidation] = useState(true);

  const [selectedTag, setSelectedTag] = useState(null);

  // ** Scrollbar Ref
  const [scrollEl, setScrollEl] = useState();

  const dispatch = useDispatch();

  const handlePickerColor = (item) => {
    setCurrentStatus({ ...currentStatus, color: item.color });
  };
  const handleResetFields = () => {
    setCurrentStatus(null);
  };
  const handleStageClick = (t) => {
    setCurrentStatus(t);
  };

  const handleInputTitle = (e) => {
    const inputTxt = e.target.value;
    setCurrentStatus((prev) => ({
      ...prev,
      title: inputTxt.toUpperCase(),
      id: inputTxt
    }));
    const checkDuplication = store?.boards?.map((x) => x.id)?.includes(inputTxt);
    setTitleValidation(!checkDuplication);
  };

  const cancelBtnClicked = () => {
    setIsOpen(false);
  };

  const saveStatusClick = () => {
    if (currentStatus._id) {
      //update
      dispatch(
        updateBoard({
          workspaceId,
          status: currentStatus
        })
      );
    } else {
      //add
      dispatch(
        addBoard({
          ...currentStatus,
          workspaceId
        })
      ).then(() => {
        if (scrollEl) {
          setTimeout(() => {
            scrollEl.scrollTop = scrollEl.scrollHeight;
          }, 500);
        }
      });
    }
  };

  const handleDeleteStage = (status) => {
    dispatch(
      deleteBoard({
        id: status._id,
        workspaceId
      })
    ).then(() => {
      handleResetFields();
    });
  };

  useEffect(() => {
    setCurrentStatus(null);
  }, [open]);

  // useEffect(() => {
  //   if (scrollEl) {
  //     console.log('scrollEl', scrollEl.scrollTop);
  //     scrollEl.scrollTop = 100;
  //   }
  // }, [scrollEl]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => cancelBtnClicked()}
      className="task-status-setting modal-dialog-centered"
      style={{ minWidth: '600px' }}
    >
      <ModalHeader toggle={() => cancelBtnClicked()}>Task Status Management</ModalHeader>
      <ModalBody className="p-0">
        <Row style={{ padding: '0rem 0.5rem' }}>
          <Col xs="5" style={{ borderRight: '1px solid #ddd' }}>
            <div className="d-flex flex-column" style={{ margin: '10px 0' }}>
              <PerfectScrollbar
                style={{ height: '223px' }}
                options={{ wheelPropagation: false }}
                // ref={scrollBarRef}
                containerRef={(ref) => {
                  setScrollEl(ref);
                }}
              >
                <ListGroup style={{ borderRadius: 0 }}>
                  {store?.boards?.map((x, index) => {
                    return (
                      <ListGroupItem
                        key={x?._id}
                        active={x?._id === currentStatus?._id ? true : false}
                        onClick={() => handleStageClick(x)}
                      >
                        <div className="d-flex align-items-center justify-content-between cursor-pointer">
                          <Badge color={x?.color} pill>
                            {x?.title}
                          </Badge>
                          {x?.title !== 'DONE' && (
                            <>
                              <Trash
                                id={`task-status-delete-${x?.id.replace(' ', '-')}-${index}`}
                                size={14}
                                style={{ float: 'right', cursor: 'pointer' }}
                                onClick={() => handleDeleteStage(x)}
                                className="me-25 text-danger"
                              />
                              <UncontrolledTooltip
                                placement={'top'}
                                target={`task-status-delete-${x?.id.replace(' ', '-')}-${index}`}
                              >
                                Delete
                              </UncontrolledTooltip>
                            </>
                          )}
                        </div>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </PerfectScrollbar>
              <div className="d-flex flex-column align-items-center">
                <Button className="mt-1" outline color="primary" onClick={handleResetFields}>
                  Create New Status
                </Button>
              </div>
            </div>
          </Col>
          <Col xs="7">
            <div className="d-flex flex-column" style={{ margin: '10px' }}>
              <p>{!currentStatus?._id ? 'Add New Task Status' : 'Update Task Status'}</p>
              <div className="mb-1">
                <Label className="form-label" for="label-title">
                  Title <span className="text-danger">*</span>
                </Label>
                <Input
                  id="labelTitle"
                  name="labelTitle"
                  placeholder="Title"
                  className="new-todo-item-title"
                  value={currentStatus?.title || ''}
                  onChange={handleInputTitle}
                  valid={titleValidation && currentStatus?.title}
                  invalid={!titleValidation || !currentStatus?.title}
                />
                <FormFeedback valid={titleValidation && currentStatus?.title}>
                  {!titleValidation
                    ? 'Oh no! That name is already taken.'
                    : !currentStatus?.title
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
                            {currentStatus?.color === item.color ? (
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
              {!currentStatus?._id ? (
                <div className="mb-1">
                  <Button
                    style={{ float: 'left', width: '45%' }}
                    color="primary"
                    type="submit"
                    className="me-75"
                    disabled={!currentStatus?.title || !currentStatus?.color}
                    onClick={saveStatusClick}
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
                    disabled={!currentStatus?.title || !currentStatus?.color}
                    onClick={saveStatusClick}
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

export default StatusManage;
