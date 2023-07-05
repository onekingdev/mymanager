
import { useState } from 'react';
import { Row, Col, Card, CardBody, Input, Button } from 'reactstrap';
import SpeechSynthesis from './voice/SpeechSynthesis';
import SpeechRecognition from './voice/SpeechRecognition';
import MediaNavigation from './voice/MediaNavigation';
import { ArrowLeft, ArrowRight } from 'react-feather';

const CreateVoice = ({ stepper, type, eventForm, eventInfo }) => {

  const handleSubmit = (e) => {
    stepper.next();
  }

  return (
    <div>
      <Row>
        <Col>
          <SpeechSynthesis />
        </Col>
        <Col>
          <SpeechRecognition />
        </Col>
        <Col>
          <MediaNavigation />
        </Col>
      </Row> 
      <div className="d-flex justify-content-between">
        <Button
          color="primary"
          className="btn-prev"
          onClick={() => stepper.previous()}
        >
          <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
          ></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">
              Previous
          </span>
        </Button>
        <Button
            color="primary"
            className="btn-next"
            onClick={(e) => handleSubmit()}                        
        >
          <span className="align-middle d-sm-inline-block d-none">
              Next
          </span>
          <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
          ></ArrowRight>
        </Button>
      </div>
    </div>
  );
};

export default CreateVoice;