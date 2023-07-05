import React, { useEffect, useState } from 'react';
import { Image } from 'react-feather';
import { Button, Col, Input, InputGroup, InputGroupText, Label, Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import FileUploaderSingle from './imageSource/FileUploaderSingle';

export default function BgImage({ getSelectedHtmlElement }) {
  const [openSelectImage,setOpenSelectImage] = useState(false)
  const toggleSelectImage = ()=>setOpenSelectImage(!openSelectImage)
  const [activeTab,setActiveTab] = useState('1')
  const [imgUrl,setImgUrl] = useState('')

    const handleBackgroundImageChange = (event) => {
        const element = getSelectedHtmlElement();
        //element.style.backgroundImage =  "url('" + event.target.value + "')";
        element.addStyle({ 'background-image': "url('" + event.target.value + "')" })
      }
      useEffect(()=>{
        if(imgUrl && imgUrl!==''){
          getSelectedHtmlElement().addStyle({ 'background-image': "url('" + imgUrl + "')" });
        }
      },[imgUrl])
  return (
    <>
      <Label>Background Image</Label>
      <InputGroup>
      <Input type='text' value={imgUrl}/>
      <InputGroupText>
      <Image style={{cursor:"pointer"}} onClick={toggleSelectImage}/>
      </InputGroupText>
      </InputGroup>
      <Modal toggle={toggleSelectImage} isOpen={openSelectImage} size="lg">
        <ModalHeader toggle={toggleSelectImage}>Select or upload new one</ModalHeader>
        <ModalBody>
          <Nav tabs>
          <NavItem>
              <NavLink active={activeTab==='1'} onClick={()=>setActiveTab('1')}>Upload Image</NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab==='2'} onClick={()=>setActiveTab('2')}>My Images</NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab==='3'} onClick={()=>setActiveTab('3')}>Background</NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab==='4'} onClick={()=>setActiveTab('4')}>Stock</NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
            <>
            <div className="content-header">
                <h5 className="mb-0">Upload Image</h5>
                <small className="text-muted">
                    Upload New or Choose from Library.
                </small>
            </div>
            <Row>
                    <Col sm="12">
                        <FileUploaderSingle setImgUrl={setImgUrl}/>
                    </Col>
                </Row>
            </>
            </TabPane>
            <TabPane tabId="2">2</TabPane>
            <TabPane tabId="3">3</TabPane>
            <TabPane tabId="4">3</TabPane>
          </TabContent>
        </ModalBody>
      </Modal>
    </>
  );
}
