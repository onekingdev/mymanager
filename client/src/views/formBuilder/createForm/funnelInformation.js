/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Card, Button, Alert, CardBody, FormText } from 'reactstrap';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';

import '@styles/react/libs/formBuilder/funnel.scss';
import { isEmpty } from '@firebase/util';
import { setFormAndDataDefaultReducer } from '../store/reducer';
import { AlignLeft, Filter, TrendingUp, Users, Mail } from 'react-feather';
import { getFormCategories } from '../../../requests/formCategory/formCategory';

const FunnelInformation = ({ stepper, form, setForm }) => {
  // ** STATES
  const [activeType, setActiveType] = useState('leads');
  const [categoryData, setCategoryData] = useState([]);
  const [originCategoryData, setOriginCategoryData] = useState([]);
  const defaultValues = { name: '', memberType: {value: 'leads', label: 'Leads'} };

  const memberTypes = [
    {
      value: 'Active Member',
      label: 'Client'
    },
    {
      value: 'employees',
      label: 'Employee'
    },
    {
      value: 'leads',
      label: 'Leads'
    },
    {
      value: 'relationships',
      label: 'Relationships'
    },
    {
      value: 'vendors',
      label: 'Vendor'
    },
    {
      value: 'members',
      label: 'Member'
    }
  ];

  const fetchOriginData = async () => {
    const response = await getFormCategories();
    const categoryList = response.data;
    setOriginCategoryData(categoryList);
    const categoryData = categoryList.filter(item=>item.type === 'leads').map(item=>{
      item.value = item._id;
      item.label = item.name;
      return item;
    })
    setCategoryData(categoryData);
  };

  const fetchData = async (type) => {
    const categoryList = Array.from(originCategoryData);
    const categoryData = categoryList.filter(item=>item.type === type).map(item=>{
      item.value = item._id;
      item.label = item.name;
      return item;
    })
    setCategoryData(categoryData);
  };

  useEffect(() => {
    fetchOriginData();
  }, [])

  // ** FUNCTIONS
  const handleSetForm = (e) => {
    if(e.target.name==='automateEntry'){
      setForm({ ...form, automateEntry: e.target.checked });
    }
    else{
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSetFormType = (val) => {
    setForm({ ...form, formType: val });
    fetchData(val);
    setActiveType(val);
  };

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const handleCreateCategoryClick = async (data) => {
    try {
      const name = data?.name;
      const subCategory = data?.category.value;
      const categoryName = data?.category.name;
      const memberType = data?.memberType?.value;
      setForm({ ...form, name, subCategory, memberType });
      stepper.next();
    } catch (error) {
      console.log(error)
      toast.error('Error creating email template category!');
    }
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Add Funnel Details</h5>
        <small>Fill details about your funnel</small>
      </div>
      <Form onSubmit={handleSubmit(handleCreateCategoryClick)}>
        <div className="h-100">
          <Row>
            <Col md="12" className="mb-1">
              <Row className=''>
                <Col md="3">
                  <Label>Title</Label>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Input
                          autoFocus
                          placeholder='Type the name...'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                    {errors.name && errors.name.type == 'required' && (
                      <FormText color="danger" id="validation-add-board">
                        Category name is required
                      </FormText>
                    )}
                </Col>
                <Col md="3" className='d-flex flex-column'>
                  <Label className="">Select Category</Label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        options={categoryData}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  {errors.category && errors.category.type == 'required' && (
                    <FormText color="danger" id="validation-add-board">
                      Category type is required
                    </FormText>
                  )}
                </Col>
                {/* {form?.automateEntry && 
                  <Col md="3">
                    <Label for="memberType">Contact Type</Label>
                    <Controller
                      name="memberType"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          isClearable={false}
                          className="react-select"
                          classNamePrefix="select"
                          options={memberTypes}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Col>
                }
                <Col className="" style={{marginTop: "30px"}} md="2">
                  <Input id="automateEntry" type="checkbox" name="automateEntry" onChange={handleSetForm}/>
                  <Label htmlFor='automateEntry' className="ps-50">Automate Entry</Label>
                </Col> */}
              </Row>
             
              <div className="my-2">
                <Row>
                  <Col>
                    <Card
                      onClick={() => handleSetFormType('sales')}
                      className={activeType === 'sales' ? 'border-primary' : ''}
                      style={{cursor:'pointer'}}
                    >
                      <CardBody className="text-primary text-center">
                        <Filter size={35} />
                        <h6 className="pt-2 text-black">Get Sales</h6>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      onClick={() => handleSetFormType('email')}
                      className={activeType === 'email' ? 'border-primary' : ''}
                      style={{cursor:'pointer'}}
                    >
                      <CardBody className="text-primary text-center">
                        <Mail size={35} />
                        <h6 className="pt-2 text-black">Design Email</h6>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      onClick={() => handleSetFormType('leads')}
                      className={activeType === 'leads' ? 'border-primary' : ''}
                      style={{cursor:'pointer'}}
                    >
                      <CardBody className="text-primary text-center">
                        <TrendingUp size={35} />
                        <h6 className="pt-2 text-black">Get Leads</h6>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      onClick={() => handleSetFormType('forms')}
                      className={activeType === 'forms' ? 'border-primary' : ''}
                      style={{cursor:'pointer'}}
                    >
                      <CardBody className="text-primary text-center">
                        <Users size={35} />
                        <h6 className="pt-2 text-black">Create Forms</h6>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      onClick={() => handleSetFormType('website')}
                      className={activeType === 'website' ? 'border-primary' : ''}
                      style={{cursor:'pointer'}}
                    >
                      <CardBody className="text-primary text-center">
                        <AlignLeft size={35} />
                        <h6 className="pt-2 text-black">Create Website</h6>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col className="d-flex flex-row-reverse">
                  <Button color="primary" type="submit">
                    NEXT
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Form>
    </Fragment>
  );
};

export default FunnelInformation;
