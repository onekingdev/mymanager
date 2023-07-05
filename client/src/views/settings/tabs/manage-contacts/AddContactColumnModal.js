import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, Label, Modal, ModalBody, ModalHeader, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import Select from 'react-select';
import {
  addContactFieldAction,
  getContactFieldByTypeAction,
  updateContactFieldAction
} from '../../../contacts/store/actions';
import { selectThemeColors } from '@utils';
export default function AddContactColumnModal({
  isNew,
  open,
  toggle,
  contactType,
  selectedColumn,
  activeTypeFields
}) {
  const dispatch = useDispatch();
  const types = [
    { value: 'String', label: 'String' },
    { value: 'Boolean', label: 'Boolean' },
    { value: 'Number', label: 'Number' },
    { value: 'Date', label: 'Date' },
    { value: 'Array', label: 'Array' }
  ];

  const [title, setTitle] = useState('');
  const [type, setType] = useState(null);
  const [order, setOrder] = useState(0);
  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    if (selectedColumn) {
      setTitle(selectedColumn.title);
      setType(types.find((item) => item.value == selectedColumn.type));
      setOrder(selectedColumn.order);
      setIsShown(selectedColumn.isShown);
    }
  }, [selectedColumn]);

  const handleSave = () => {
    if (!contactType || !title || !type) {
      toast.error('All fields are required');
      return;
    }
    if (activeTypeFields.find((field) => field.title === title.replace(/\s/g, '').toLowerCase())) {
      toast.error('That field is already existed');
      return;
    }
    let payload = {
      contactType: contactType,
      title: title.replace(/\s/g, '').toLowerCase(),
      order: order,
      type: type.value,
      isShown: isShown
    };
    if (isNew) {
      //save
      dispatch(addContactFieldAction(payload)).then((res) => {
        if (res?.status && res.status === true) {
          dispatch(getContactFieldByTypeAction(contactType));
          toggle();
        } else {
          toast.error('Adding new contact type failed');
        }
      });
    } else {
      //edit
      payload = { ...payload, fieldId: selectedColumn._id };
      dispatch(updateContactFieldAction(payload)).then((res) => {
        if (res?.status && res.status === true) {
          dispatch(getContactFieldByTypeAction(contactType));
          toggle();
        }
      });
    }
  };

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>{isNew ? 'New Contact Type' : 'Edit Contact Type'}</ModalHeader>
      <ModalBody>
        <div>
          <Label>Field Name</Label>
          <Input
            type="text"
            placeholder="Contact Type Name"
            value={title}
            name="name"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label className="mt-1">Order</Label>
          <Input
            type="number"
            placeholder="Contact Order"
            value={order}
            name="order"
            onChange={(e) => setOrder(e.target.value)}
          />
          <div className="d-flex align-items-center mt-1">
            <Label className="me-2 mb-0">Hide/Show</Label>
            <FormGroup switch>
              <Input
                type="switch"
                name="isShown"
                role="switch"
                value={isShown}
                defaultChecked={true}
                onClick={(e) => {
                  setIsShown(!isShown);
                }}
              />
            </FormGroup>
          </div>

          <Label className="mt-1">Field Type</Label>
          <Select
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            defaultValue={types[0]}
            value={type}
            options={types}
            isClearable={false}
            onChange={(value) => setType(value)}
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
