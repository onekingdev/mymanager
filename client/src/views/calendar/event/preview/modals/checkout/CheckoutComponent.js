import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Col, FormFeedback, Input, Label, Row } from 'reactstrap';

const CheckoutComponent = () => {
  const defaultValues = {
    firstName: 'Bob',
    lastName: 'Barton',
    username: 'bob.dev'
  };
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  return (
    <div className='mb-3'>
      <h3 className='mb-2'>Billing Information</h3>
      <Row tag="form" className="gy-1 pt-75" onSubmit={handleSubmit}>
        <Col md={6} xs={12}>
          <Label className="form-label" for="firstName">
            First Name
          </Label>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  id="firstName"
                  placeholder="John"
                  value={field.value}
                  invalid={errors.firstName && true}
                />
              );
            }}
          />
          {errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
        </Col>
        <Col md={6} xs={12}>
          <Label className="form-label" for="lastName">
            Last Name
          </Label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input {...field} id="lastName" placeholder="Doe" invalid={errors.lastName && true} />
            )}
          />
          {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
        </Col>
        <Col md={12} xs={12}>
          <Label className="form-label" for="email">
            Email
          </Label>
          <Input type="email" id="email" placeholder="example@domain.com" />
        </Col>
        <Col md={12} xs={12}>
          <Label className="form-label" for="email">
            Phone
          </Label>
          <Input type="phone" id="phone" placeholder="(123) 456-7890" />
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutComponent;
