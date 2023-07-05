import React, { useEffect, useState } from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { toast } from 'react-toastify';
import {
  addContactTypeAction,
  contactsAction,
  updateContactTypeByIdAction
} from '../../../contacts/store/actions';

export default function AddContactTypeModal({
  isNew,
  open,
  toggle,
  contactType,
  dispatch,
  setContactType
}) {
  const [form, setForm] = useState();

  useEffect(() => {
    if (contactType !== null) {
      setForm(contactType);
    }
  }, [contactType]);

  const handleSave = () => {
    if (contactType !== null) {
      //edit
      let payload = {
        name: form.name,
        order: form.order
      };
      dispatch(updateContactTypeByIdAction(contactType._id, payload)).then((res) => {
        if (res.status && res.status === true) {
          dispatch(contactsAction()).then((res) => {
            if (res?.length > 0) {
              setContactType(null);
              setForm();
              toggle();
            }
          });
        }
      });
    } else {
      //save
      let payload = { ...form, type: 'custom' };
      dispatch(addContactTypeAction(payload)).then((res) => {
        if (res.status && res.status === true) {
          dispatch(contactsAction());
          toggle();
        } else {
          toast.error('Adding new contact type failed');
        }
      });
    }
  };
  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>{isNew ? 'New Contact Type' : 'Edit Contact Type'}</ModalHeader>
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
