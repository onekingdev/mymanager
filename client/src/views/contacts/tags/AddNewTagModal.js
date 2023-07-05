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
import { createTagsAction, deleteTagsAction, updateTagsAction } from '../store/actions';

const colorData = [
  {  color: 'primary' },
  { color: 'secondary' },
  {  color: 'success' },
  { color: 'danger' },
  {  color: 'warning' },
  {  color: 'info' },
  { color: 'light-primary' },
  {  color: 'light-secondary' },
  {  color: 'light-success' },
  {  color: 'light-danger' },
  {  color: 'light-warning' },
  {  color: 'light-info' }
];

export default function AddNewTagModal({ open, toggle, store, dispatch }) {
  const [tag, setTag] = useState();
  const [titleValidation, setTitleValidation] = useState(true);
  const handleDeleteTag = (tag) => {
    dispatch(deleteTagsAction(tag._id))
  };

  const handleSubmit = () => {
    if(tag._id){
      //update
      let payload = {value:tag.value,color:tag.color}
      dispatch(updateTagsAction(tag._id,payload))
    }
    else{
      //add
      dispatch(createTagsAction(tag))
    }
  };

  const handleResetFields = () => {
    setTag(null);
  };
  const handleTagClick = (t) => {
    setTag(t);
  };
  const handlePickerColor = (item) =>{
    setTag({...tag,color:item.color})
  }

  const handleInputTitle = (e) => {
    setTag({...tag,value:e.target.value})
    setTitleValidation(store.tags?.filter((x) => x.value === e.target.value).length === 0);
  };
  
  useEffect(()=>{
    setTag(null)
  },[open])

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Tag Management</ModalHeader>
      <ModalBody>
        <Row>
          <Col xs="5">
            <PerfectScrollbar style={{ height: '230px' }} options={{ wheelPropagation: false }}>
              <ListGroup>
                {store && Array.isArray(store.tags)  ? (
                  store.tags?.map((x, index) => {
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
                  })
                ) : (
                  <ListGroupItem>No items</ListGroupItem>
                )}
              </ListGroup>
            </PerfectScrollbar>
          </Col>
          <Col xs="7">
            <p>{tag?._id === '' ? 'Add New Label' : 'Update Label'}</p>
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
                  value={tag?.value}
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
                      <Col xs="2">
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