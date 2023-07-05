import React, { useEffect, useState } from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { updateFormDataAction } from '../../../store/action';

export default function NewStepModal({ open, toggle, store, dispatch }) {
  // ** STATES
  const [step, setStep] = useState({ show: 'true' });

  const handleCreateStep = () => {
    let temp = store.form;
    if(!step.path){
      temp = [...temp.formData, {id:crypto.randomUUID(), step: temp.length, css: '', html: '', path:step.name.replace(' ','-'), ...step }];
    }
    else{
      temp = [...temp.formData, {id:crypto.randomUUID(), step: temp.length, css: '', html: '', ...step }];
    }
    dispatch(updateFormDataAction(store.form._id, temp));
    toggle()
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'show') {
      setStep({ ...step, [e.target.name]: e.target.checked });
    } else if (e.target.name === 'path') {
      setStep({ ...step, [e.target.name]: e.target.value.replace(' ','-') });
    } else {
      setStep({ ...step, [e.target.name]: e.target.value });
    }
  };

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Step to Funnel</ModalHeader>
      <ModalBody>
        <div>
          <div className="d-flex justify-content-between">
            <div className="w-100 me-1">
              <Label>Name of funnel step</Label>
              <Input
                type="text"
                className="w-100"
                name="name"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-auto me-0" style={{ minWidth: '125px' }}>
              <Input type="checkbox" name="show" onChange={handleInputChange} defaultChecked />{' '}
              <Label>Show in Funnel</Label>
            </div>
          </div>

          <Label className="mt-50">
            Path for funnel step
            <span className="d-block text-muted">Define the path for this step </span>
          </Label>
          <Input type="text" name="path" required />

          <Button color="primary" className="mt-50" onClick={handleCreateStep}>
            Create Funnel Step
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}
