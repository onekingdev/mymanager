import React, { useState } from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addElementAction } from '../../store/action';

export default function AddElementModal({ open, toggle,dispatch,store }) {
  const [element, setElement] = useState();

  const handleOnChange = (e) => {
    setElement({ ...element, [e.target.name]: e.target.value });
  };
  const handleAddElement = () => {
    if(element){
        dispatch(addElementAction(element))
    }
  };
  return (
    <Modal toggle={toggle} isOpen={open}>
      <ModalHeader toggle={toggle}>Add new element</ModalHeader>
      <ModalBody>
        <div>
          <Label>Resource Name</Label>
          <Input
            type="text"
            name="id"
            placeholder="Enter a unique resource name to identify element"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <Label>Element Title</Label>
          <Input
            type="text"
            name="elementTitle"
            placeholder="Title that should show for the element"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <Label>Parent element (optional)</Label>
          <Input type="select" name="elementParent" onChange={handleOnChange} >
          <option value={null} >Select...</option>
           {
            store &&  store?.elements.map((x,idx)=>{
                return <option value={x.id} key={idx}>{x.elementTitle}</option>
            })
           }
          </Input>
        </div>
        <div>
          <Label>Navigation Link</Label>
          <Input
            type="text"
            name="navLink"
            onChange={handleOnChange}
            placeholder="navigation link to resource"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleAddElement}>
          Add Element
        </Button>
      </ModalFooter>
    </Modal>
  );
}
