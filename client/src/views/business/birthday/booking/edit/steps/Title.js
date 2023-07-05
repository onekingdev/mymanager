// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

import { useSelector } from 'react-redux';
// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, FormText } from 'reactstrap';

import { selectThemeColors } from '@utils';
import Select from 'react-select';
// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form';

const Title = ({ stepper, eventForm, eventInfo }) => {
  // ** Default Form Values
  const defaultValues = {
    eventTitle: '',
    note: ''
  };
  const EventTypeOptions = [{ value: 'birthday', label: 'Birthday' }];
  // ** Event Type
  const [eventType, setEventType] = useState('Public');
  const [selectedProgression, setSelectedProgression] = useState(EventTypeOptions[0]);
  const [progressions, setProgressions] = useState([]);
  const [eventCategory, setEventCategory] = useState({});

  // ** Register Inputs to React Hook Form
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({ defaultValues });

  // ** Set values with defined values
  useEffect(() => {
    setValue('eventTitle', eventInfo.title ? eventInfo.title : '');
    setValue('note', eventInfo.note ? eventInfo.note : '');
    setEventType(eventInfo.type);
    eventInfo?.eventCategory &&
      setEventCategory(EventTypeOptions.find((item) => item.value == eventInfo.eventCategory));
  }, [eventInfo]);

  // ** Next Button Click Handler
  const handleEventTitleFormSubmit = (data) => {
    eventForm.set('title', data.eventTitle);
    eventForm.set('type', eventType);
    eventForm.set('note', data.note);
    eventForm.set('eventCategory', 'birthday');
    eventForm.set('progression', selectedProgression.value);
    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Event Title</h5>
        <small className="text-muted">Enter Your Event Title.</small>
      </div>
      <Form onSubmit={handleSubmit(handleEventTitleFormSubmit)}>
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label" for="basicInput">
              Event Title
            </Label>
            <Controller
              name="eventTitle"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  placeholder="Enter Event Title"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            {errors.eventTitle && (
              <FormText color="danger" id="validation-add-board">
                Please Enter a Valid Event Title
              </FormText>
            )}
          </Col>
          <Col md="12" className="mb-3">
            <Label className="form-label mb-1" for="eventType">
              Event Type
            </Label>
            <div className="d-flex" onChange={(e) => setEventType(e.target.value)}>
              <div className="form-check me-2">
                <Input
                  type="radio"
                  id="ex1-active"
                  name="type1"
                  value="Public"
                  defaultChecked
                  checked={eventType == 'Public'}
                />
                <Label className="form-check-label" for="ex1-active">
                  Public
                </Label>
              </div>
              <div className="form-check">
                <Input
                  type="radio"
                  name="type2"
                  value="Private"
                  id="ex1-inactive"
                  checked={eventType == 'Private'}
                />
                <Label className="form-check-label" for="ex1-inactive">
                  Private
                </Label>
              </div>
            </div>
          </Col>
          <Row className="mb-2">
            <Col md="4">
              <Label className="form-label" for="basicInput">
                Select Event Category
              </Label>
              <Select
                isClearable={false}
                options={EventTypeOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                value={EventTypeOptions[0]}
                isDisabled={true}
              />
            </Col>
            {eventCategory.value === 'promotion' && progressions.length > 0 && (
              <Col md="4">
                <Label className="form-label" for="basicInput">
                  Select Progression
                </Label>
                <Select
                  isClearable={false}
                  options={progressions}
                  className="react-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  value={selectedProgression}
                  onChange={(e) => setSelectedProgression(e)}
                />
              </Col>
            )}
          </Row>
          <Col md="12" className="mb-3">
            <Label className="form-label" for="basicInput">
              Event Description
            </Label>
            <Controller
              name="note"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="textarea"
                  height={100}
                  placeholder="Enter event description here"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" type="submit">
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Title;
