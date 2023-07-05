import React, { useState } from 'react';
import { Button, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';

import { searchDomainAvailableAction } from '../../../../../store/action';


export default function ConnectDomainTab({dispatch,store}) {
const [domain,setDomain] = useState()
  const handleSearchDomain =()=>{
    dispatch(searchDomainAvailableAction(domain)).then(res=>{

      if(res?.success===true){
        if(res?.data?._pendingData.startsWith('DOMAIN')){
          //console.log('available to connect')
        }
      }
    })
  }
  return (
    <div className="p-1">
      <Container>
        <h2>Add a custom domain to your form</h2>

        <Row>
          <Col lg={6} md={6} sm={12}>
            <FormGroup>
              <Label>Custom Domain</Label>
              <Input
                
                placeholder="Enter a custom Domain"
                type="text"
                required
                onChange={(e)=>setDomain(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <div>
          <Button color='primary' onClick={handleSearchDomain}>Verify</Button>
          <p>This domain is registered. If you registered this domain name through a different registrar, select Add domain to add it to your form. You can configure MyManager DNS for this domain later.</p>
          </div>
      </Container>
    </div>
  );
}
