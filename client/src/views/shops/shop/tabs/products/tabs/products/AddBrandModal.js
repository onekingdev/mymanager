import React, { useState } from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { createProductBrandAction } from '../../../../../store/action';

export default function AddBrandModal({ open, toggle, dispatch,store }) {
  const [form, setForm] = useState();
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSaveBrand = () => {
    let payload = {...form,shopId:store.shop._id}
    dispatch(createProductBrandAction(payload))
    toggle()
  };
  return (
    <Modal toggle={toggle} isOpen={open}>
      <ModalHeader toggle={toggle}>Add New Brand</ModalHeader>
      <ModalBody>
        <div>
          <Label className="form-label">
            Brand Name <span className="text-danger">*</span>
          </Label>
          <Input onChange={handleInputChange} name="name" placeholder="Brand Name" />
        </div>
        <div className="d-flex justify-content-end mt-1">
          <Button color="primary" onClick={handleSaveBrand}>
            Add Brand
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}
