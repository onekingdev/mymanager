import React from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

export default function AddUserModal({open,toggle,selectedOrg}) {
  return (
    <Modal toggle={toggle} isOpen={open}>
      <ModalHeader toggle={toggle}>Add a New User</ModalHeader>
      <ModalBody>
        <div>
          <Label> Full Name</Label>
          <Input type="text" name='fullName' />
        </div>
        <div>
          <Label> Email</Label>
          <Input type="email" />
        </div>
        <div>
          <Label> Contact</Label>
          <Input type="number" />
        </div>
        <div>
          <Label> Address</Label>
          <Input type="text" />
        </div>
        <div className="d-flex justify-content-between">
          <div >
            <Label> City</Label>
            <Input type="text" />
          </div>
          <div className='mx-50'>
            <Label> State</Label>
            <Input type="text" />
          </div>
          <div>
            <Label> Zip</Label>
            <Input type="text" />
          </div>
        </div>
        <h5>Access</h5>
        <div>
          <Label> Username</Label>
          <Input type="text" />
        </div>
        <div>
          <Label> Password</Label>
          <Input type="password" />
        </div>
        <div>
          <Label> Send Invite</Label><br/>
          <Input type="checkbox" />{' '}
          <Label>Send email invitation to activate employee account</Label>
        </div>
        <div className="d-flex justify-content-end">
          <Button color="primary" className='me-50'>Save</Button>
          <Button color="outline-secondary" onClick={toggle}>Cancel</Button>
        </div>
      </ModalBody>
    </Modal>
  );
}
