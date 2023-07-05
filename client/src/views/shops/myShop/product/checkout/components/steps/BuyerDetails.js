import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
  UncontrolledDropdown
} from 'reactstrap';

import Select from 'react-select'

export default function BuyerDetails({stepper,buyer,setBuyer,isPublic}) {
  const[buyerOptions,setBuyerOptions] = useState([])

  const storeContacts = useSelector((state) => state.totalContacts);

  const handleSelectContact = (contact) => {
    
    setBuyer(contact);
  };
  const handleInputChange = (e)=>{
    setBuyer({...buyer,[e.target.name]:e.target.value})
  }
  const handleAddressChange = (e)=>{
    let temp = buyer;
    setBuyer({...buyer,address:{...temp.address,[e.target.name]:e.target.value}})
  }
  useEffect(()=>{
    if(storeContacts){
      const options = storeContacts?.contactList?.list?.map(x=>{
        let y = {contact:x,value:x._id,label:x.fullName}
        return y
      })
      setBuyerOptions(options)
    }
  },[storeContacts])
  return (
    <>
      <Row>
        <Col md="8">
          {isPublic?(<></>):(<Card>
            <CardBody>
              <h4>Select a buyer </h4>
              <p>Select a buyer from the list</p>
              <Select
              
              options={buyerOptions}
              onChange={(option)=>{ handleSelectContact(option.contact)}}
              />
            </CardBody>
          </Card>)}
          <Card>
            <CardBody>
              <h4>Delivery Details</h4>
              <div>
                <Label>Name</Label>
                <Input type='text' name='fullName' value={buyer?.fullName} onChange={handleInputChange}/>
              </div>
              <div>
                <Label>email</Label>
                <Input type='text' name='email' value={buyer?.email} onChange={handleInputChange}/>
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input type='text' name='phone' value={buyer?.phone} onChange={handleInputChange}/>
              </div>
              <div>
                <Label>Street</Label>
                <Input type='text' name='street' value={buyer?.address?.street} onChange={handleAddressChange}/>
              </div>
              <div>
                <Label>City</Label>
                <Input type='text' name='city' value={buyer?.address?.city} onChange={handleAddressChange}/>
              </div>
              <div>
                <Label>State</Label>
                <Input type='text' name='state' value={buyer?.address?.state} onChange={handleAddressChange}/>
              </div>
              <div>
                <Label>Country</Label>
                <Input type='text' name='country' value={buyer?.address?.country} onChange={handleAddressChange}/>
              </div>
              <div>
                <Label>Zip Code</Label>
                <Input type='text' name='zipCode' value={buyer?.address?.zipCode} onChange={handleAddressChange}/>
              </div>
              
             
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <CardBody>
              <h4>Buyer Info</h4>
              {buyer && (<>
                <h6>{buyer?.fullName}</h6>
              <p>Email: {buyer?.email}</p>
              <p>Phone number: {buyer?.phone}</p>
              <p>{`Address: ${buyer?.address?.street} ${buyer?.address?.city} ${buyer?.address?.state} ${buyer?.address?.country} ${buyer?.address?.zipCode}`}</p>
              </>)}
              <Button color='primary' onClick={()=>stepper.next()}>Next</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
