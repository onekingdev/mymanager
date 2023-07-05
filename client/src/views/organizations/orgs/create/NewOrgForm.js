import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  UncontrolledDropdown
} from 'reactstrap';

import { addNewOrgAction, getPlansAction } from '../../store/action';
import { useUploadSignature } from '../../../../requests/documents/recipient-doc';
import { toast } from 'react-toastify';

export default function NewOrgForm({ dispatch, org, setOrg, stepper }) {
  // ** STATE
  const [form, setForm] = useState({});
  const [planTitle, setPlanTitle] = useState('Select...');
  const [logo, setLogo] = useState();
  const [isValid,setIsValid] = useState(true)
  // ** Store
  const store = useSelector((state) => state.organizations);

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
      else if(e.target.value==='' || e.target.value==='me'){
        setIsValid(false)
      }
      else{
        setIsValid(true)
      }
    }
    if (e.target.name === 'logoLink') {
      setLogo(e.target.files[0]);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value, isVerified: false });
    }
  };
  const handleSubmit = () => {
    if (form?.planId) {
      if (logo) {
        const formData = new FormData();
        formData.append('file', logo);
        useUploadSignature(formData).then((res) => {
          if (res.success) {
            let f = { ...form, logoLink: res.url };
            dispatch(addNewOrgAction({ ...f })).then((res) => {
              setOrg({ ...res });
            });
          }
        });
      } else {
        dispatch(addNewOrgAction({ ...form })).then((res) => {
          setOrg({ ...res });
        });
      }
    } else {
      toast.error('Please select plan!');
    }
  };

  const handleChangePlan = (selected) => {
    setForm({ ...form, planId: selected._id });
    setPlanTitle(selected.name);
  };
  // ** init
  useEffect(() => {
    if (store?.plans?.length === 0) {
      dispatch(getPlansAction());
    }
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="w-75">
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            className="w-100"
            placeholder="Enter Org Name"
            onChange={handleInputChanged}
          />
        </div>
        <div className="w-25">
          <Label>Select Plan</Label>
          <UncontrolledDropdown className="w-100">
            <DropdownToggle caret color="outline-primary" className="w-100 ms-25">
              {planTitle}
            </DropdownToggle>
            <DropdownMenu className="w-100">
              {store?.plans
                ?.filter((x) => x.type === 'business')
                .map((x, idx) => {
                  return (
                    <DropdownItem key={idx} className="w-100" onClick={() => handleChangePlan(x)}>
                      {x.name}
                    </DropdownItem>
                  );
                })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      {form?.planId && (
        <Card>
          <CardBody>
            <Row>
              <Col>
                <p>{store?.plans?.find((x) => x._id === form.planId).description}</p>
                <ul>
                  {store?.plans
                    .find((x) => x._id === form.planId)
                    .benefits.map((x, idx) => {
                      return <li key={idx}>{x}</li>;
                    })}
                </ul>
                <p>
                  {' '}
                  Price Per Month: {store?.plans.find((x) => x._id === form.planId).pricePerMonth}
                </p>
                <p>
                  {' '}
                  Price Per Year: {store?.plans.find((x) => x._id === form.planId).pricePerYear}
                </p>
              </Col>
              <Col>
                <p>Benefits</p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      )}
      <div>
        <Label>Email</Label>
        <Input
          type="text"
          name="email"
          placeholder="Enter Org Email"
          onChange={handleInputChanged}
        />
      </div>
      <div>
        <Label>Contact</Label>
        <Input
          type="number"
          name="contact"
          placeholder="Enter Org Contact Number"
          onChange={handleInputChanged}
        />
      </div>
      <div>
        <Label>Full Address</Label>
        <Input
          type="text"
          name="address"
          placeholder="Enter Org Full Address"
          onChange={handleInputChanged}
        />
      </div>
      <div>
        <Label>Theme Color</Label>
        <Input
          type="color"
          name="themeColor"
          placeholder="themeColor"
          onChange={handleInputChanged}
        />
      </div>
      <div>
        <Label>Logo</Label>
        <Input
          type="file"
          name="logoLink"
          placeholder="Upload Logo"
          onChange={handleInputChanged}
        />
      </div>
      <div>
        <Label>Signup Link</Label>
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
        
        <FormFeedback valid={isValid}>
          {isValid ? 'Sweet! Name is available' : 'Oh no! Name is taken'}
        </FormFeedback>
        </InputGroup>
      </div>

      <div className="d-flex justify-content-end mt-50">
        <Button color="primary" onClick={handleSubmit}>
          Create
        </Button>
      </div>
    </>
  );
}
