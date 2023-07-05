import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, FormText } from 'reactstrap';
import { ArrowLeft, ArrowRight } from 'react-feather';
// ** Third Party Imports
import { selectThemeColors } from '@utils';
import { getProgressionDatas } from '../../../../settings/tabs/advancesettings/store';

const Title = ({ stepper, type, eventForm, eventInfo }) => {
  const dispatch = useDispatch();
  // ** Default Form Values
  const defaultValues = {
    eventTitle: '',
    note: ''
  };
  const EventTypeOptions = [
    { value: 'general', label: 'General' },
    { value: 'birthday', label: 'Birthday' },
    { value: 'promotion', label: 'Progression' }
  ];

  // ** Event Type
  const [eventType, setEventType] = useState('Public');
  const [selectedProgression, setSelectedProgression] = useState({});
  const [progressions, setProgressions] = useState([]);
  const [eventCategory, setEventCategory] = useState(EventTypeOptions[0]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  // ** Register Inputs to React Hook Form
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({ defaultValues });

  // ** Get progressions
  useEffect(() => {
    (async () => {
      const response = await dispatch(getProgressionDatas());
      if (response?.payload?.status === 200) {
        const data = response.payload.data.data.map((item) => {
          return {
            ...item,
            label: item.progressionName,
            value: item._id
          };
        });
        setProgressions(data);
        setSelectedProgression(data[0]);
      }
    })();
    return () => {
      setProgressions([]);
    };
  }, [setEventCategory]);
  // ** Set values with defined values
  useEffect(() => {
    setValue('eventTitle', eventInfo.title ? eventInfo.title : '');
    setValue('note', eventInfo.note ? eventInfo.note : '');
    setEventType(eventInfo.type);
    eventInfo?.eventCategory &&
      setEventCategory(EventTypeOptions.find((item) => item.value == eventInfo.eventCategory));
  }, [eventInfo]);
  useEffect(() => {
    eventInfo?.eventCategory == 'promotion' &&
      eventInfo?.progression &&
      progressions &&
      setSelectedProgression(progressions.find((item) => item.value == eventInfo.progression));
  }, [eventInfo, progressions]);

  useEffect(() => {
    let tmp = [];
    selectedProgression?.categoryId?.length > 0 &&
      selectedProgression.categoryId.map((item) => {
        tmp.push({
          ...item,
          label: item.categoryName,
          value: item._id
        });
      });
    setCategories(tmp);
    setSelectedCategory(tmp[0]);
  }, [progressions, selectedProgression]);

  // ** Next Button Click Handler
  const handleEventTitleFormSubmit = (data) => {
    eventForm.set('title', data.eventTitle);
    eventForm.set('type', eventType);
    eventForm.set('note', data.note);
    eventForm.set('eventCategory', eventCategory.value);
    eventCategory == 'promotion' && eventForm.set('progression', selectedProgression.value);
    if (eventCategory.value == 'promotion' && selectedProgression) {
      eventForm.set('progression', selectedProgression.value);
      let tmp = [];
      if (selectedCategory?.length > 0) {
        tmp = selectedCategory.map((item) => item._id);
      } else {
        tmp = [selectedCategory._id];
      }
      eventForm.set('progressionCategory', tmp?.length > 0 ? tmp : [categories[0]._id]);
    }
    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Event Title & Type</h5>
        <small className="text-muted">Enter Event Title & Type.</small>
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
                value={eventCategory}
                onChange={(e) => setEventCategory(e)}
              />
            </Col>
            {eventCategory.value === 'promotion' && progressions.length > 0 && (
              <>
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
                <Col md="4">
                  <Label className="form-label" for="basicInput">
                    Select Category
                  </Label>
                  <Select
                    isClearable={false}
                    isMulti
                    options={categories}
                    className="react-select"
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    value={selectedCategory}
                    onChange={(data) => setSelectedCategory(data)}
                  />
                </Col>
              </>
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
