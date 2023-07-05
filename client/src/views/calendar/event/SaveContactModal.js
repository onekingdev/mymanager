import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import useMessage from '../../../lib/useMessage';
import { selectThemeColors } from '../../../utility/Utils';
import { useAddAndUpdateContactsBulkAction } from './store/actions';

const SaveContactModal = ({
  contactModal,
  toggle,
  guests,
  eventId,
  setToggleClearRows,
  toggledClearRows
}) => {
  const { error, success } = useMessage();
  const dispatch = useDispatch();

  const contactOptions = [
    { value: 'Employee', label: 'Employee' },
    { value: 'Relationship', label: 'Relationship' },
    { value: 'Client', label: 'Client' },
    { value: 'Vendor', label: 'Vendor' },
    { value: 'Lead', label: 'Lead' }
  ];

  // ** States
  const [selectedTypeArr, setSelectedTypeArr] = useState([]);

  // ** Handlers
  const handleContactSelect = (data, index) => {
    let tmp = [...selectedTypeArr];
    tmp[index] = data;
    setSelectedTypeArr(tmp);
  };

  const handleSaveClick = () => {
    if (guests.length > 0 && selectedTypeArr?.length > 0) {
      let tmp = [];
      guests.map((guest, index) => {
        let updatedContact = { id: guest.contact._id };
        updatedContact = { ...updatedContact, type: selectedTypeArr[index].value };
        tmp.push(updatedContact);
      });
      dispatch(useAddAndUpdateContactsBulkAction({ eventId: eventId, payload: tmp }));
    } else {
      error('Failed to add contacts');
    }
    setToggleClearRows(!toggledClearRows);
    setSelectedTypeArr([]);
    toggle();
  };

  return (
    <form>
      <Modal isOpen={contactModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Save these members to selected contact</ModalHeader>
        <ModalBody>
          <div>
            {guests.map((guest, index) => {
              return (
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <div className="d-flex flex-column">
                    <Link className="user_name text-truncate text-body">
                      <span className="fw-bolder">{guest?.contact.fullName}</span>
                    </Link>
                    <small className="text-truncate text-muted mb-0">{guest?.contact.email}</small>
                  </div>
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                    options={contactOptions}
                    value={selectedTypeArr[index]}
                    onChange={(data) => {
                      handleContactSelect(data, index);
                    }}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: '150px'
                      })
                    }}
                  />
                </div>
              );
            })}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="me-1" onClick={() => handleSaveClick()}>
            Save
          </Button>
          <Button color="primary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </form>
  );
};

export default SaveContactModal;
