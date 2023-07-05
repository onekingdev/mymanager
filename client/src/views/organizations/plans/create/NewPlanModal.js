import React, { useState } from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import PermissionsForm from '../../permissions/PermissionsForm';
import AddPlanForm from './AddPlanForm';
import WizardModernHorizontal from './WizardModernHorizontal';

export default function NewPlanModal({ open, toggle, dispatch,store }) {
  return (
    <Modal toggle={toggle} isOpen={open} size="lg">
      <ModalHeader toggle={toggle}>Add a New Plan</ModalHeader>
      <ModalBody>
        <WizardModernHorizontal toggle={toggle} dispatch={dispatch} store={store}/>
      </ModalBody>
    </Modal>
  );
}
