import React, { Fragment, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader
} from 'reactstrap';
import img1 from '@src/assets/images/goals/g1.png';
import img2 from '@src/assets/images/goals/g2.png';
import img3 from '@src/assets/images/goals/g3.png';


const ProgressionTemplate = (props) => {
  const { stepper, setRSelected, rSelected,setTask ,task} = props;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
const handleSelectType = (type)=>{
  setTask({...task,type:type})
  setRSelected(type)
}
  return (
    <Fragment>
      {/* <Card className="p-2"> */}
      <div className="d-flex mt-2 bg-transparent">
        <div className="m-1">
          <Card className="mb-3">
            <CardImg top src={img1} alt="card-top" />
            <CardBody>
              <CardTitle tag="h4">Form</CardTitle>
              <CardText>
                <small className="text-muted">
                  Add a form that employees will need to fill out with or without signature.
                </small>
              </CardText>
              <Button
                onClick={()=>handleSelectType('form')}
                active={rSelected === 'form'}
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
            <CardImg top src={img2} alt="card-top" />
            <CardBody>
              <CardTitle tag="h4">Task</CardTitle>
              <CardText>
                <small className="text-muted">
                  Collect documents from employees in which they will need to upload themselves
                </small>
              </CardText>
              <Button
                onClick={()=>handleSelectType('task')}
                active={rSelected === 'task'}
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
      {/* </Card > */}

      {/* <Modal
        fullscreen="lg"
        size="lg"
        centered="true"
        scrollable="false"
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Upload</ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-end">
            <Badge style={{ color: 'light-info' }}>Pending</Badge>
          </div>
          <DocUpload />
        </ModalBody>
      </Modal> */}

      <div className="d-flex justify-content-between">
        <Button color="primary" className="btn-prev" disabled>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
          <span className="align-middle d-sm-inline-block d-none">Next</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};
export default ProgressionTemplate;
