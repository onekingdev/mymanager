import React, { useState } from 'react';
import { ArrowRight,  Globe, Mail } from 'react-feather';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Row
} from 'reactstrap';

export default function AddAction({ getSelectedHtmlElement }) {
  // ** STATES
  const [openAction, setOpenAction] = useState(false);
  const [active, setActive] = useState('1');
  const [title,setTitle] = useState(`Set what to do when I'm clicked`)
  const [btnTitle,setBtnTitle] = useState('SET ACTION')

  const toggleAction = () => setOpenAction(!openAction);

  const handleSetTarget = (e)=>{
    const element = getSelectedHtmlElement();
    let attributes = element.getAttributes();
    //attributes.target = e.target.value;
    attributes ={...attributes,target :e.target.value}
    getSelectedHtmlElement().setAttributes(attributes);
  }
  const handleAddUrl = (e)=>{
    const element = getSelectedHtmlElement();
    let attributes = element.getAttributes();
    //attributes.target = e.target.value;
    attributes ={...attributes,url :e.target.value}
    getSelectedHtmlElement().setAttributes(attributes);
  }
  const handleNavClicked = () => {
    const element = getSelectedHtmlElement();
        let attributes = element.getAttributes();
    switch (active) {
      case '1':
        
        attributes.selectedOption = 'submit';
        getSelectedHtmlElement().setAttributes(attributes);
        setBtnTitle('Change Action')
        setTitle('Submit the form on Click')
        break;
      
      case '3':
        
        attributes.selectedOption = 'open-website';
        getSelectedHtmlElement().setAttributes(attributes);
        setBtnTitle('Change Action')
        setTitle('Open Website on Click')
        break;
      case '4':
        attributes.selectedOption = 'next-step';
        getSelectedHtmlElement().setAttributes(attributes);
        setBtnTitle('Change Action')
        setTitle('Go to Next Step on Click')
        break;

      default:
        attributes.selectedOption = 'submit';
        getSelectedHtmlElement().setAttributes(attributes);
        setBtnTitle('Change Action')
        setTitle('Submit the form on Click')
        break;
    }
    toggleAction()
  };

  return (
    <>
      <Label>{title}</Label>
      <Button color="primary" size="sm" className="inputstyle w-100" onClick={toggleAction}>
       {btnTitle}
      </Button>
      <Modal isOpen={openAction} toggle={toggleAction} size="lg" style={{marginTop:"10%"}}>
        <ModalHeader toggle={toggleAction}>Select Button Action</ModalHeader>
        <ModalBody>
          <p>Select what should the button do if it is clicked</p>
         
          <Row>
            <Col md="4">
            <Card onClick={() => setActive('1')} className={active === '1' ? 'border-primary' : ''}>
              <CardBody >
              
                <h5 className='mx-auto'><Mail className='text-primary me-50'/>SUBMIT FORM</h5>
                <p className='text-center'>Submit form information & save to Contact</p>
              </CardBody>
            </Card>
            </Col>
            <Col md="4">
            <Card onClick={() => setActive('3')} className={active === '3' ? 'border-primary' : ''}>
              <CardBody >
              
              <h5 className='mx-auto'><Globe className='text-primary me-50'/>GO TO A WEBSITE</h5>
                <p className='text-center'>Redirect your audience to your website! or social media</p>
              </CardBody>
            </Card>
            </Col>
            <Col md="4">
            <Card  onClick={() => setActive('4')} className={active === '4' ? 'border-primary' : ''}>
              <CardBody>
                
              <h5 className='mx-auto'><ArrowRight className='text-primary me-50'/>GO TO NEXT STEP</h5>
                <p className='text-center'>Gather information from your audience in multiple steps!</p>
              </CardBody>
            </Card>
            </Col>
            
          </Row>
          {active==='3' && <div>
          <Input type="url" placeholder="Enter a Website URL" onChange={handleAddUrl} className='my-50'/>
                  <Input type="select" onChange={handleSetTarget}>
                    <option value="same">Open in the same window</option>
                    <option value="_blank">Open in new tab/window</option>
                  </Input>
          </div>}
          
        </ModalBody>
        <ModalFooter>
        <Button onClick={handleNavClicked} color="primary">SET ACTION</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
