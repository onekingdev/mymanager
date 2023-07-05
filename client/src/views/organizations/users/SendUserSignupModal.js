import React, { useState } from 'react';
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { sendOrgBulkEmailAction } from '../store/action';
import UsersRepeatingForm from './UsersRepeatingForm';

export default function SendUserSignupModal({ open, toggle,orgId,dispatch }) {
  // ** State
  const [recipients, setRecipients] = useState([]);
  const [message,setMessage] = useState({});

  const handleSendMessage = () => {
    const payload ={
      recipients,
      message,
      organizationId:orgId
    }
    dispatch(sendOrgBulkEmailAction(payload))
  };
  const handleInputChanged = (e) => {
    setMessage({...message,[e.target.name]:[e.target.value]})
  };
    const handleAddMore=()=>{
        setRecipients([...recipients,{
            id: crypto.randomUUID(),
            name: '',
            email: '',
          
            active: true,
          
          }])
    }
  return (
    <Modal toggle={toggle} isOpen={open} size="xl">
      <ModalHeader toggle={toggle}>Send Activation to users</ModalHeader>
      <ModalBody>
        <Row>
          <Col>
          <Button color='primary' onClick={handleAddMore}>Add More</Button>
            <div>
              <UsersRepeatingForm recipients={recipients} setRecipients={setRecipients} />
            </div>
          </Col>
          <Col>
            <div>
              <Label className="form-label" for="basicInput">
                Subject
              </Label>
              <Input
                type="text"
                placeholder="Enter Subject"
                name="subject"
                onChange={handleInputChanged}
              />
            </div>
            <div>
              <Label className="form-label" for="basicInput">
                Email Message
              </Label>
              <Input
                type="textarea"
                placeholder="Enter Message"
                name="message"
                onChange={handleInputChanged}
              />
            </div>
            <div className="d-flex justify-content-end mt-50">
              <Button color="primary" onClick={handleSendMessage}>
                Send
              </Button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}
