import React from 'react'
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Modal, ModalBody, ModalHeader } from 'reactstrap'

import img1 from '@src/assets/images/goals/g1.png';
import img2 from '@src/assets/images/goals/g2.png';
import img3 from '@src/assets/images/goals/g3.png';
import { Link } from 'react-router-dom';

export default function SelectTemplateModal({open,toggle}) {

  return (
    <Modal isOpen={open} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Select type of Template you want to create</ModalHeader>
        <ModalBody>
        <div className="d-flex mt-2 bg-transparent">
       
        <div className="m-1">
          <Card className="mb-3 ">
            <CardImg top src={img2} alt="card-top" />
            <CardBody>
              <CardTitle tag="h4">Employee Task</CardTitle>
              <CardText>
                <small className="text-muted">
                  Create Employee Task Template 
                </small>
              </CardText>
              <Button
                style={{marginTop: "38px"}}
                tag={Link}
                to='/document/create/template/task'
                color="primary"
                block
                outline
                
              >
                Select
              </Button>
            </CardBody>
          </Card>
        </div>
        <div className="m-1">
          <Card className="mb-3">
            <CardImg top src={img1} alt="card-top" />
            <CardBody>
              <CardTitle tag="h4">Membership Contract</CardTitle>
              <CardText>
                <small className="text-muted">Create Membership Contract to send out when selling memberships</small>
              </CardText>
              <Button
                tag={Link}
                to='/document/create/template/contract'
                color="primary"
                block
                outline
               
              >
                Select
              </Button>
            </CardBody>
          </Card>
        </div>
        
      </div>
        </ModalBody>
    </Modal>
  )
}
