import React, { useState } from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { createProductCategoryAction } from '../../../../../store/action';

export default function AddCategoryModal({ open, toggle, dispatch,store }) {
  const [form, setForm] = useState();
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSaveCategory = () => {
    let payload = {...form,shopId:store.shop._id}
    dispatch(createProductCategoryAction(payload))
    toggle()
  };
  return (
    <Modal toggle={toggle} isOpen={open}>
      <ModalHeader toggle={toggle}>Add New Category</ModalHeader>
      <ModalBody>
        <div>
          <Label className="form-label">
            Category Name <span className="text-danger">*</span>
          </Label>
          <Input onChange={handleInputChange} name="name" placeholder="Category Name" />
        </div>
        <div className="d-flex justify-content-end mt-1">
          <Button color="primary" onClick={handleSaveCategory}>
            Add Category
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}
