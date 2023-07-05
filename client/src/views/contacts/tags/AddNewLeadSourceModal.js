import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Col,
  FormFeedback,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Check, Dribbble, Trash } from 'react-feather';
import {
  createLeadsSourceAction,
  deleteLeadsSourceAction,
  updateLeadsSourceAction
} from '../store/actions';

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

export default function AddNewLeadSourceModal({ open, toggle, store, dispatch }) {
  const [leadSource, setLeadSource] = useState();
  const [titleValidation, setTitleValidation] = useState(true);
  const handleDeleteLeadSource = (lead) => {
    dispatch(deleteLeadsSourceAction(lead._id));
  };

  const handleSubmit = () => {
    if (leadSource._id) {
      //update
      let payload = { title: leadSource.title, color: leadSource.color };
      dispatch(updateLeadsSourceAction(leadSource._id, payload));
    } else {
      //add
      dispatch(createLeadsSourceAction(leadSource));
    }
  };

  const handleResetFields = () => {
    setLeadSource(null);
  };
  const handleTagClick = (t) => {
    setLeadSource(t);
  };
  const handlePickerColor = (item) => {
    setLeadSource({ ...leadSource, color: item.color });
  };

  const handleInputTitle = (e) => {
    setLeadSource({ ...leadSource, title: e.target.value });
    setTitleValidation(store?.leadSource?.filter((x) => x.title === e.target.value).length === 0);
  };

  useEffect(() => {
    setLeadSource(null);
  }, [open]);
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Lead Source Management</ModalHeader>
      <ModalBody>
        <Row>
          <Col xs="5">
            <PerfectScrollbar style={{ height: '230px' }} options={{ wheelPropagation: false }}>
              <ListGroup>
                {store ? (
                  store.leadSource?.map((x, index) => {
                    return (
                      <ListGroupItem
                        key={x?._id}
                        active={x?._id === leadSource?._id ? true : false}
                        onClick={() => handleTagClick(x)}
                      >
                        {/* style={{ backgroundColor: 'blue !important' }} */}
                        <Badge color={x?.color} pill>
                          {x?.title}
                        </Badge>
                        <Trash
                          size={14}
                          style={{ float: 'right', cursor: 'pointer' }}
                          onClick={() => handleDeleteLeadSource(x)}
                          className="me-25 text-danger"
                        />
                      </ListGroupItem>
                    );
                  })
                ) : (
                  <ListGroupItem>No items</ListGroupItem>
                )}
              </ListGroup>
            </PerfectScrollbar>
          </Col>
          <Col xs="7">
            <p>{leadSource?._id === '' ? 'Add New Label' : 'Update Label'}</p>
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
                    onClick={handleSubmit}
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
                    color="primary"
                    size="sm"
                    type="submit"
                    className="me-75"
                    onClick={handleSubmit}
                    disabled={!leadSource?.title || !leadSource?.color}
                  >
                    Save
                  </Button>
                  <Button
                    style={{ float: 'right', width: '45%' }}
                    outline
                    size="sm"
                    color="primary"
                    onClick={handleResetFields}
                    disabled
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </PerfectScrollbar>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" style={{ float: 'right' }} onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
