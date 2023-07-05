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
// import { createProgramAction, deleteProgramAction, updateProgramAction } from '../store/actions';
import { createProgram, updateProgram, deleteProgram } from '../store';
import { colorData } from './constants';
import { FaCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function AddProgram({ open, dispatch, toggle, programs }) {
  const [tag, setTag] = useState();
  // const [programs, setPrograms] = useState([]);
  const [titleValidation, setTitleValidation] = useState(true);
  const handleDeleteTag = (tag) => {
    Swal.fire({
      title: 'Delete?',
      text: `Are you sure you want to delete this program data?`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProgram(tag));
      }
    });
  };

  const handleSubmit = () => {
    if (tag._id) {
      //update
      let payload = { _id: tag._id, title: tag.value, color: tag.color };
      dispatch(updateProgram(payload));
    } else {
      //add
      dispatch(createProgram({ title: tag.value, color: tag.color }));
    }
  };

  const handleResetFields = () => {
    setTag(null);
  };
  const handleTagClick = (t) => {
    setTag(t);
  };
  const handlePickerColor = (item) => {
    setTag({ ...tag, color: item.color });
  };

  const handleInputTitle = (e) => {
    setTag({ ...tag, value: e.target.value });
    setTitleValidation(programs?.filter((x) => x.value === e.target.value).length === 0);
  };

  useEffect(() => {
    setTag(null);
  }, [open]);

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Program Management</ModalHeader>
      <ModalBody>
        <Row>
          <Col xs="5">
            <PerfectScrollbar style={{ height: '280px' }} options={{ wheelPropagation: false }}>
              <ListGroup>
                {programs?.map((x, index) => {
                  return (
                    <ListGroupItem
                      key={x?._id}
                      active={x?._id === tag?._id ? true : false}
                      onClick={() => handleTagClick(x)}
                    >
                      {/* style={{ backgroundColor: 'blue !important' }} */}
                      <Badge color={x?.color} pill>
                        {x?.value}
                      </Badge>
                      <Trash
                        size={14}
                        style={{ float: 'right', cursor: 'pointer' }}
                        onClick={() => handleDeleteTag(x)}
                        className="me-25 text-danger"
                      />
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </PerfectScrollbar>
          </Col>
          <Col xs="7">
            <p>{tag?._id ? 'Update Program' : 'Add New Program'}</p>
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
                  value={tag?.value || ''}
                  onChange={handleInputTitle}
                  valid={titleValidation && tag?.value}
                  invalid={!titleValidation || !tag?.value}
                />
                <FormFeedback valid={titleValidation && tag?.value}>
                  {!titleValidation
                    ? 'Oh no! That name is already taken.'
                    : !tag?.value
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
                      <Col key={`color_col_${index}`} xs="2">
                        <h3>
                          <Badge
                            style={{ cursor: 'pointer' }}
                            onClick={() => handlePickerColor(item)}
                            color={item.color}
                            pill
                          >
                            {tag?.color === item.color ? (
                              <Check
                                size={14}
                                style={{
                                  point: 'handler',
                                  float: 'center',
                                  margin: '2px 1px 0px 1px'
                                }}
                              />
                            ) : (
                              <FaCircle
                                size={14}
                                style={{
                                  point: 'handler',
                                  float: 'center',
                                  margin: '3px 1px 0px 1px'
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
              {tag?._id === '' ? (
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
                    disabled={!tag?.value || !tag?.color}
                  >
                    Save
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
