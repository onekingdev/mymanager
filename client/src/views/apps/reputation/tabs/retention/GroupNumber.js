import React, { useState } from 'react';
import { AiOutlineCloseCircle, AiOutlineSend } from 'react-icons/ai';
import { Button, Col, Input, FormGroup, Label } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function GroupNumber({ groupNumber }) {
  const [modal, setModal] = useState(false);
  const [modalOne, setModalOne] = useState(false);
  const toggleOne = () => setModalOne(!modalOne);

  const closeBtn = (
    <Button onClick={toggleOne} color="link">
      <AiOutlineCloseCircle size="30" />
    </Button>
  );

  const toggle = () => setModal(!modal);
  return (
    <div className="d-flex">
      <div className="flex-grow-1" style={{ marginTop: '30px', marginLeft: '15px' }}>
        <h5>
          <b>{groupNumber}</b>
        </h5>
      </div>
      <div style={{ marginRight: '14px' }} className="p-2">
        <Button outline>Email Report</Button>
      </div>
      <div className="p-2">
        <Button onClick={toggle} className="ml-2" color="primary">
          Send Review Request
        </Button>
      </div>
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          <div className="d-flex">
            <h3 className="">Client Check In</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="exampleAction">Customer Name</Label>
            <Input
              id="exampleAction"
              name="action"
              placeholder="Customer Name"
              type="text"
              autocomplete="off"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleAction">Customer email or phone</Label>
            <Col sm={12}>
              <Input id="exampleSelect" name="select" type="select">
                <option>Email</option>
                <option className="p-1">Phone</option>
              </Input>
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            <span className="align-middle d-sm-inline-block d-none mr-1">Send</span>
            <AiOutlineSend size={14} className="align-middle ms-sm-25 ms-0"></AiOutlineSend>
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default GroupNumber;
