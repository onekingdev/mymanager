import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Col, FormFeedback, Input, Label, Row, Button } from 'reactstrap';
import Select, { components } from 'react-select';
import { useDispatch } from 'react-redux';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { toast } from 'react-toastify';
import Flatpickr from 'react-flatpickr';
import '@styles/react/libs/flatpickr/flatpickr.scss';

import { selectThemeColors } from '@utils';
import { saveContact } from '../../../store';

const Register = (props) => {
  const dispatch = useDispatch();
  const { stepper, eventInfo, replyContact, setReplyContact } = props;

  const defaultValues = {
    firstName: 'Bob',
    lastName: 'Barton',
    username: 'bob.dev'
  };

  // ** Date Picker Options
  const options = {
    dateFormat: 'D M y h:i K', //change format also
    enableTime: true,
    weekNumbers: true,
    altInput: true,
    altFormat: 'F j, Y - h:i K',
    time_24hr: false
  };

  // ** States
  const [dob, setDob] = useState(new Date());
  const [path, setPath] = useState('');
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  useEffect(() => {
    setPath(/:\/\/([^\/]+)/.exec(window.location.href)[1].split('.')[0]);
  }, []);

  // ** Handlers
  const handleRegister = async (data) => {
    const res = await dispatch(
      saveContact({
        userId: eventInfo.userId,
        fullName: data.name,
        email: data.email,
        phone: data.phone,
        orgPath: path,
        dob: dob
      })
    );
    if (res?.payload?.contact) setReplyContact(res.payload.contact);
    stepper.next();
  };

  return (
    <>
      <div className="mb-3">
        <h3>{eventInfo.title}</h3>
        <h6>Fill out the form below to reply for this event</h6>
        <Row tag="form" className="gy-1 pt-75" onSubmit={handleSubmit(handleRegister)}>
          <Col md={6} xs={12}>
            <Label className="form-label" for="name">
              Name
            </Label>
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Please Enter Your Full Name'
              }}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    id="name"
                    placeholder="John"
                    value={field.value}
                    invalid={errors.name}
                  />
                );
              }}
            />
            {errors.name && <FormFeedback>Please enter a valid Full Name</FormFeedback>}
          </Col>
          <Col md={6} xs={6}>
            <Label className="form-label" for="email">
              Email
            </Label>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Please Enter Your Email'
              }}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    id="email"
                    placeholder="John@gmail.com"
                    value={field.value}
                    invalid={errors.email}
                  />
                );
              }}
            />
            {errors.email && <FormFeedback>Please enter a valid email</FormFeedback>}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              Birthday
            </Label>
            <Flatpickr
              value={dob}
              data-enable-time
              id="date-time-picker"
              className="form-control"
              options={options}
              onChange={(date) => setDob(date)}
            />
          </Col>
          <Col md={6} xs={6}>
            <Label className="form-label" for="phone">
              Phone Number
            </Label>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    id="phone"
                    placeholder="12345"
                    value={field.value}
                    invalid={errors.phone}
                  />
                );
              }}
            />
            {errors.phone && <FormFeedback>Please enter a valid email</FormFeedback>}
          </Col>
          <Col md={12}>
            <div className="d-flex justify-content-between">
              <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
                <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
                <span className="align-middle d-sm-inline-block d-none">Previous</span>
              </Button>
              <Button color="primary" className="btn-next" type="submit">
                <span className="align-middle d-sm-inline-block d-none">Register</span>
                <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Register;
