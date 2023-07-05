
import { ArrowLeft, ArrowRight } from 'react-feather';
import { GiAntibody } from 'react-icons/gi';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import { Fragment, useState, useEffect } from 'react';
import Select from 'react-select';
import { selectThemeColors } from '@utils';
import data from './character/avatar.json';
const Personality = ({ stepper, type, eventForm, eventInfo }) => {

  const voiceData = [];
  const [model, setModel] = useState({
    label: 'Select Model',
    value: '',
  });
  const [mainType, setMainType] = useState ('Male');
  const backgroundData = [
    {
      label: "off_white", 
      value: "off_white"
    },
    {
      label: "warm_white", 
      value: "warm_white"
    },
    {
      label: "light_pink", 
      value: "light_pink"
    },
    {
      label: "soft_pink", 
      value: "soft_pink"
    },
    {
      label: "light_blue", 
      value: "light_blue"
    },
    {
      label: "dark_blue",
      value: "dark_blue" 
    },
    {
      label: "soft_cyan",
      value: "soft_cyan" 
    },
    {
      label: "strong_cyan",
      value: "strong_cyan" 
    },
    {
      label: "light_orange",
      value: "light_orange" 
    },
    {
      label: "soft_orange",
      value: "soft_orange"
    },
    {
      label: "white_studio",
      value: "white_studio"
    },
    {
      label: "white_cafe",
      value: "white_cafe"
    },
    {
      label: "luxury_lobby",
      value: "luxury_lobby"
    },
    {
      label: "large_window",
      value: "large_window"
    },
    {
      label: "white_meeting_room",
      value: "white_meeting_room"
    },
    {
      label: "open_office",
      value: "open_office"
    }
  ];
  const [background, setBackGround] = useState({
    label: 'Select Background',
    value: ''
  })
  const [voice, setVoice] = useState({
    label: 'Select Voice',
    MF: "Male",
    value: '',
  })

  const generateVoice = (mainType) => {
    data.voice[0].English.forEach((item) => {
      if(item.MF == mainType)
        voiceData.push(item);
    })
    return voiceData;
  }

  const handleSubmit = (model, voice) => {
    console.log("modelData", model);
    console.log("voiceData", voice);
    eventForm.set('modelType', model.value);
    eventForm.set('voiceType', voice.value);
    eventForm.set('backgroundType', background.value);
    stepper.next();
  }

  const handleTypeChange = (value) => {
    setMainType(value);
  }

  return (
    <div>
      <Form>
        <Label className="mb-0" for="basicInput">
          Select Model:
        </Label>
        <Select
          theme={selectThemeColors}
          isClearable={false}
          className="react-select"
          classNamePrefix="select"
          options={data.avatar}
          value={model}
          onChange={(model) => setModel(model)}
        />
        <Label className="mb-0" for="basicInput">
          Select Voice:
        </Label>
        <div className="d-flex" onChange={(e) => handleTypeChange(e.target.value)}>
          <div className="form-check me-2">
            <Input type="radio" id="ex1-active" name="ex1" value="Male" defaultChecked />
            <Label className="form-check-label" for="ex1-active">
              Male
            </Label>
          </div>
          <div className="form-check">
            <Input type="radio" name="ex1" id="ex1-inactive" value="Female" />
            <Label className="form-check-label" for="ex1-inactive">
              Female
            </Label>
          </div>
        </div>
        <Select 
          theme={selectThemeColors}
          isClearable={false}
          className="react-select"
          classNamePrefix="select"
          options={generateVoice(mainType)}
          value={voice}
          onChange={(voice) => setVoice(voice)}
        />
        <Label className="mb-0" for="basicInput">
          Select Background:
        </Label>
        <Select 
          theme={selectThemeColors}
          isClearable={false}
          className="react-select"
          classNamePrefix="select"
          options={backgroundData}
          value={background}
          onChange={(background) => setBackGround(background)}
        />
        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
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
            onClick={(e) => handleSubmit(model,voice)}                     
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

export default Personality;