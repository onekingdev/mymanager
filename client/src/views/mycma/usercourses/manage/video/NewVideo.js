// ** React Imports
import { Fragment, useState } from 'react';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
// ** Components

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss';

const NewVideo = ({ stepper, type, eventForm, eventInfo }) => {
  const handleVideoTitleFormSubmit = (data) => {
    eventForm.set('title', data.videoTitle);
    eventForm.set('description', data.videoDescription);
    eventForm.set('text', data.videoText);
    stepper.next();
  };

  const defaultValues = {
    videoTitle: '',
    videoDescription: '',
    videoText: '',
  };

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  return (
    <div>
      <Form onSubmit={handleSubmit(handleVideoTitleFormSubmit)}>
        <Label className="mb-0" for="basicInput">
          Video Title:
        </Label>
        <Controller
          name="videoTitle"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              autoFocus
              placeholder="Enter video title here"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Label className="mb-0" for="basicInput">
          Video Description:
        </Label>
        <Controller
          name="videoDescription"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              autoFocus
              type="textarea"
              placeholder="Enter video description here"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Label className="mb-0" for="basicInput">
          Video Text:
        </Label>
        <Controller
          name="videoText"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              autoFocus
              type="textarea"
              placeholder="Enter video Text here"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <div className="d-flex justify-content-between">
          <Button
            color="secondary"
            className="btn-prev"
            outline
            disabled
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
          <Button
            color="primary"
            className="btn-next"
            type="submit"                       
          >
            <span className="align-middle d-sm-inline-block d-none">
              Next
            </span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewVideo;
