import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, FormFeedback, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import { updateOrgAction } from '../../../../store/action';

export default function SettingsTab({ selectedOrg, dispatch, store }) {
  const [form, setForm] = useState(selectedOrg);
  const [isValid,setIsValid] = useState(true)
  const { id } = useParams();

  const handleInputChanged = (e) => {
    if(e.target.name === 'path'){
      const exists = store.myOrgs.filter(x=>x.path===e.target.value )
      if(exists.length > 0){
        if(exists[0]._id===form._id){
          setIsValid(true)
        }
        else{
          setIsValid(false)
        }
      }
      else{
        setIsValid(true)
      }
     
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  
  const handleSubmit = () => {
    dispatch(updateOrgAction(id, form));
  };

  return (
    <Fragment>
     <Card>
      
      <CardBody>
      <CardTitle>Organization Details</CardTitle>
      <div>
        <Label>Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Enter Org Name"
          value={form.name}
          onChange={handleInputChanged}
        />
      </div>
      <div>
        <Label>Email</Label>
        <Input
          type="text"
          name="email"
          placeholder="Enter Org Email"
          value={form.email}
          onChange={handleInputChanged}
        />
      </div>
      <div>
        <Label>Contact</Label>
        <Input
          type="number"
          name="contact"
          placeholder="Enter Org Contact Number"
          value={form.contact}
          onChange={handleInputChanged}
        />
      </div>
      <div>
        <Label>Full Address</Label>
        <Input
          type="text"
          name="address"
          placeholder="Enter Org Full Address"
          value={form.address}
          onChange={handleInputChanged}
        />
      </div>
      <div>
        <Label>Location Signup Link</Label>
        <InputGroup>
          <InputGroupText>www.</InputGroupText>
          <Input
            type="text"
            placeholder="Org Name"
            name="path"
            invalid={!isValid}
            valid={isValid}
            onChange={handleInputChanged}
            value={form.path}
          />
          <InputGroupText>.mymanager.com/register</InputGroupText>
        
          <FormFeedback valid = {isValid}>{isValid?'Sweet! Name is available':'Oh no! Name is taken'}</FormFeedback>
     
        </InputGroup>
      </div>
      <div className="d-flex justify-content-end mt-50">
        <Button color="primary" onClick={handleSubmit}>
          Update
        </Button>
      </div>
      </CardBody>
     </Card>
     <Card>
     
      <CardBody>
      <CardTitle>Admin of Organization</CardTitle>
      </CardBody>
     </Card>
    </Fragment>
  );
}
