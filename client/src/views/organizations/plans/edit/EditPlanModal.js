import React, { useState } from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

import WizardModernHorizontal from './WizardModernHorizontal';

export default function EditPlanModal({ open, toggle, dispatch,store ,plan,setPlan}) {
  return (
    <Modal toggle={toggle} isOpen={open} size="lg">
      <ModalHeader toggle={toggle}>Edit Plan</ModalHeader>
      <ModalBody>
        <WizardModernHorizontal toggle={toggle} dispatch={dispatch} store={store} plan={plan} setPlan={setPlan}/>
      </ModalBody>
    </Modal>
  );
}
