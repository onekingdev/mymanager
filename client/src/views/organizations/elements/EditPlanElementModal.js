import React, { useState } from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { updatePlanElementAction } from '../store/action';

export default function EditPlanElementModal({ open, toggle, element, dispatch }) {
  const [title, setTitle] = useState(element.elementTitle);
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const updateElement = () => {
    dispatch(updatePlanElementAction(element._id, { title: title }));
  };
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>Edit Element</ModalHeader>
      <ModalBody>
        <div>
          <Label>What do you want to show?</Label>
          <Input type="text" defaultValue={title} onChange={handleChange} />
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-between">
          <Button color="primary" onClick={updateElement}>
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
