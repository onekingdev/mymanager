// React Imports
import classNames from 'classnames';
import { Fragment, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form } from 'reactstrap';
import { createEvent } from '../../../../../../calendar/event/store';
import PreviewCard from './PreviewCard';

import useMessage from '@src/lib/useMessage';

const PreviewTemplate = ({ eventForm, stepper, activeView, setAddBooking }) => {
  // ** Store variable
  const dispatch = useDispatch();

  // ** Message variable
  const { error, success } = useMessage();

  // ** history vairable
  const history = useHistory();

  // ** State Variable
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const templates = [
    {
      name: 'Conference: Software Developer Meeting',
      rating: 5,
      price: 20,
      description: 'Template for software dveloper all standup conferenece.....',
      imageUrl: '/assets/images/events/PreviewTemplate1.jpg'
    },
    {
      name: 'Tournament: Taekwondo Challenge',
      rating: 3,
      price: 10,
      description: 'Template for Taekwondo tournament.....',
      imageUrl: '/assets/images/events/PreviewTemplate2.jpg'
    }
  ];

  const handleChoose = (templateIndex) => {
    setSelectedTemplate(templateIndex);
  };

  const renderTemplates = () => {
    if (templates.length) {
      return templates.map((item, index) => {
        return (
          <PreviewCard
            isSelected={index === selectedTemplate}
            handleChoose={() => handleChoose(index)}
            item={item}
            key={index}
          />
        );
      });
    }
  };

  const handleCreate = () => {
    eventForm.set('checkoutType', 'none');
    eventForm.set('checkoutButtonType', 'rsvp');
    eventForm.set('templateIndex', selectedTemplate);
    const response = dispatch(createEvent(eventForm));
    if (response) success('New event created');
    setAddBooking(false);
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Choose Template</h5>
        <small>Choose the template for event page</small>
      </div>
      <div
        className={classNames({
          'grid-view': activeView === 'grid',
          'list-view': activeView === 'list'
        })}
      >
        {renderTemplates()}
      </div>
      <Form>
        <div className="d-flex justify-content-between">
          <Button color="primary" className="btn-prev" onClick={(e) => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button
            color="primary"
            disabled={selectedTemplate === -1}
            className="btn-next"
            onClick={() => handleCreate()}
          >
            <span className="align-middle d-sm-inline-block d-none">Create</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default PreviewTemplate;
