import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import NewProgressionWizard from './NewProgressionWizard';
import { useDispatch, useSelector } from 'react-redux';
import {removeProgAction} from '../.././../../../src/views/contacts/store/actions'
// src/views/contacts/store/actions.js

const AddProgression = (props) => {
  const { openAddProgression, setOpenAddProgression, selectedRowDataProg, contactTypeTitle } =
    props;
    const clientIdRem = useSelector((state) => state.totalContacts?.removeIdDataPro);
    const dispatch = useDispatch()

  return (
    <Modal
      isOpen={openAddProgression}
      toggle={() => setOpenAddProgression(false)}
      className="modal-dialog-centered"
      size="lg"
      style={{ maxWidth: '1230px', width: '100%' }}
    >
      <ModalHeader toggle={() => {
        setOpenAddProgression(false)
        dispatch(removeProgAction(clientIdRem))
        
      }
    }>Add Event</ModalHeader>
      <ModalBody>
        <NewProgressionWizard
          selectedRowDataProg={selectedRowDataProg}
          contactTypeTitle={contactTypeTitle}
        />
      </ModalBody>
    </Modal>
  );
};
export default AddProgression;
