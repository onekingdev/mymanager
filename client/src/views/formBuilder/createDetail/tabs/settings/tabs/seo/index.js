import {React, Fragment, useState, useEffect} from 'react';
import { Card, CardTitle, CardText, CardBody, Row, Button, FormGroup, Col, Label, Input, CardContent, CardHeader,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupText, Container  } from 'reactstrap';

import PerfectScrollbar from 'react-perfect-scrollbar'
import { FiImage } from 'react-icons/fi';
import { updateFormAction } from '../../../../../store/action';
import { useParams } from 'react-router-dom';
import { useUploadSignature } from '../../../../../../../requests/documents/recipient-doc';


function Seo({dispatch,store}) {
  const [seoData,setSeoData] = useState()
  const [logo,setLogo] = useState()
  const {id} = useParams();

  const handleOnChange = (e)=>{
    if(e.target.name==='socialImage'){
      setLogo(e.target.files[0])
    }
    else{
      setSeoData({...seoData,[e.target.name]:e.target.value})
    }
    
  }
  const handleSave = () =>{
    if(logo){
      //upload logo 
      let formData = new FormData()
      formData.append('file',logo)
      useUploadSignature(formData).then(res=>{
        if(res.success===true){
          let payload = {...seoData,socialImage:res.url}
          dispatch(updateFormAction(id,{seoDetails:payload}))
        }
      })
    }
    
  }
  useEffect(()=>{
    if (store && store.form) {
      setSeoData(store?.form?.seoDetails);
    }
  },[store])
  return (
    <>
    <div className="p-1">
      
    <Container>
      <Row>
        <Col md={6}>
          <h2>
            ADD SEO SETTINGS TO YOUR FORM
          </h2>
        </Col>
        <Col md={6} className="d-flex justify-content-end">
          <Button color="primary" onClick={handleSave}>
          Save & UPDATE
          </Button>
        </Col>
      </Row>
      <Row>
          <Col lg={6} md={6} sm={12}>
              <FormGroup>
                  <Label for="seoMetaData">
                      Title
                  </Label>
                  <Input
                      value={seoData?.title}
                      name='title'
                      onChange={handleOnChange}
                      placeholder="A title for your page to show in top bar"
                      type="text"
                      required
                    />
              </FormGroup>
          </Col>
      </Row>
      <Row>
        <Col md={12} sm={12} lg={12}>
          <FormGroup>
            <Label>
              Description
            </Label>
            <Input
            value={seoData?.description}
              name="description"
              placeholder='A bit of description about your page'
              type="textarea"
              onChange={handleOnChange}
             />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={8} sm={12} lg={8}>
          <FormGroup>
            <Label for="keywords">
              Keywords
            </Label>
            <Input
              value={seoData?.keywords}
              name="keywords"
              placeholder='Separate with comma , '
              type="text"
              onChange={handleOnChange}
              
             />
          </FormGroup>
        </Col>
        
        <Col md={4} sm={12} lg={4}>
          <FormGroup>
            <Label for="socialImage">
              Social Logo
            </Label>
            <InputGroup>
              <Input
              
              onChange={handleOnChange}
                name="socialImage"
                placeholder='Your logo'
                type="file"
                accept="image/png, image/gif, image/jpeg"
              />
              
            </InputGroup>     
          </FormGroup>
        </Col>
      </Row>
      <Row>
      <Col md={6} sm={12} lg={6}>
          <FormGroup>
            <Label for="author">
              Author
            </Label>
            <Input
            value={seoData?.author}
              name="author"
              placeholder='Your name or social name'
              type="text"
              onChange={handleOnChange}
             />
          </FormGroup>
        </Col>
        <Col md={6} sm={12} lg={6}>
          <FormGroup>
            <Label for="twitter">
              Twitter Handler
            </Label>
            <Input
            value={seoData?.twitter}
              name="twitter"
              placeholder='Your twitter handle start with @'
              type="text"
              onChange={handleOnChange}
             />
          </FormGroup>
        </Col>
      </Row>
      <Row>
      <Col md={12} sm={12} lg={12}>
          <FormGroup>
            <Label for="headCode">
              Head Tracking Code (To track your form on search consoles)
            </Label>
            <Input
              onChange={handleOnChange}
              name="headCode"
              type="textarea"
              value={seoData?.headCode}
             />
          </FormGroup>
        </Col>
      </Row>
      <Row>
      <Col md={12} sm={12} lg={12}>
          <FormGroup>
            <Label for="bodyCode">
              Body Tracking Code (To track your form on search consoles)
            </Label>
            <Input
              onChange={handleOnChange}
              name="bodyCode"
              type="textarea"
              value={seoData?.bodyCode}
             />
          </FormGroup>
        </Col>
      </Row>
    </Container>
    </div>
  </>
  );
}

export default Seo;
