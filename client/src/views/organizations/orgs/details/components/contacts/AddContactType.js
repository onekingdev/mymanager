import React, { useEffect, useState } from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import {
  addContactTypeAction,
  updateContactTypeByIdAction
} from '../../../../../contacts/store/actions';
import { getContactTypeByOrgAction } from '../../../../store/action';

export default function AddContactType({
  open,
  toggle,
  contactType,
  orgId,
  dispatch,
  setContactTypes,
  setContactType
}) {
  const [form, setForm] = useState();

  const handleSave = () => {
    if (contactType !== null) {
      //edit
      let payload = {
        name: form.name,
        order: form.order
      };
      dispatch(updateContactTypeByIdAction(contactType._id, payload)).then((res) => {
        if (res.status && res.status === true) {
          dispatch(getContactTypeByOrgAction(orgId)).then((res) => {
            if (res?.length > 0) {
              setContactTypes(res);
              setContactType(null);
              setForm();
              toggle();
            }
          });
        }
      });
    } else {
      //save
      let payload = { ...form, organizationId: orgId, type: 'custom' };
      dispatch(addContactTypeAction(payload)).then((res) => {
        if (res.status && res.status === true) {
          dispatch(getContactTypeByOrgAction(orgId)).then((res) => {
            if (res?.length > 0) {
              setContactTypes(res);
            }
          });
          toggle();
        }
      });
    }
  };
  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (contactType !== null) {
      setForm(contactType);
    }
  }, [contactType]);
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>New Contact Type</ModalHeader>
      <ModalBody>
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            placeholder="Contact Type Name"
            value={form?.name}
            name="name"
            onChange={handleOnChange}
          />
          <Label>Order</Label>
          <Input
            type="text"
            placeholder="Contact Type Order"
            value={form?.order}
            name="order"
            onChange={handleOnChange}
          />
          {/* <Label>Type</Label>
            <Input type='text' placeholder='Contact Type' name='type' value={form?.type} onChange={handleOnChange} disabled={contactType===null?false:true}/> */}
          <div className="d-flex justify-content-end mt-1">
            <Button color="primary" onClick={() => handleSave()}>
              Save
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
