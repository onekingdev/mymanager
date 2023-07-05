import React, { useState } from 'react';
import Sidebar from '../../../../@core/components/sidebar';
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from 'reactstrap';
import SelectTemplateSidebar from './SelectTemplateSidebar';

export default function SelectCreateModal({ open, toggle , setModalType }) {

  const [openTemplate,setOpenTemplate] = useState(false);
  const toggleTemplate = ()=>setOpenTemplate(!openTemplate)
  const handleCreateNew = ()=>{
    setModalType('2')
    toggle()
  }
  const handleOpenTemplate = () =>{
    toggleTemplate()
  }
  return (
   <>
    <Modal toggle={toggle} isOpen={open} centered>
      <ModalHeader toggle={toggle}>Select the Task</ModalHeader>
      <ModalBody>
        <Row>
          <Col md="6">
            <Card className="border border-primary">
              <div className="p-1 ">
                <CardText>Create Stand alone task</CardText>
                <div className="d-flex justify-content-center">
                  <Button color="primary" outline className="w-100" onClick={handleCreateNew}>
                    Select
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="6">
            <Card className="border border-primary">
              <div className="p-1 ">
                <CardText>Select from templates</CardText>
                <div className="d-flex justify-content-center">
                  <Button color="primary" outline className="w-100" onClick={handleOpenTemplate}>
                    Select
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
    <SelectTemplateSidebar toggle={toggleTemplate} open={openTemplate}/>
   </>
  );
}
