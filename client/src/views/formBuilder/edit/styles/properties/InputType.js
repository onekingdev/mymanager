import React, { useState } from 'react';
import { Col, Input, Label } from 'reactstrap';

const inputTypeArray = [
  // {
  //   key: 'text',
  //   label: 'Not Set'
  // },
  {
    key: 'fullname',
    label: 'Full Name'
  },
  {
    key: 'email',
    label: 'Email Address'
  },
  {
    key: 'phone',
    label: 'Phone Number'
  },
  {
    key: 'birthday',
    label: 'BirthDay'
  },
  {
    key: 'street',
    label: 'Street'
  },
  {
    key: 'city',
    label: 'City'
  },
  {
    key: 'state',
    label: 'State'
  },
  {
    key: 'country',
    label: 'Country'
  },
  {
    key: 'zip',
    label: 'Zip'
  }
];

export default function InputType({ getSelectedHtmlElement }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChangeType = () => {
    let attributes = getSelectedHtmlElement().getAttributes();
    if (selectedOption === 'birthday') {
      attributes = { ...attributes, type: 'date', placeholder: 'Birthday' };
    } else if (selectedOption === 'fullname') {
      attributes = { ...attributes, type: 'text', placeholder: 'FullName' };
    } else if (selectedOption === 'email') {
      attributes = { ...attributes, type: 'email', placeholder: 'Email' };
    } else if (selectedOption === 'phone') {
      attributes = { ...attributes, type: 'number', placeholder: 'Phone' };
    } else if (selectedOption === 'street') {
      attributes = { ...attributes, type: 'text', placeholder: 'Street' };
    } else if (selectedOption === 'state') {
      attributes = { ...attributes, type: 'text', placeholder: 'State' };
    } else if (selectedOption === 'city') {
      attributes = { ...attributes, type: 'text', placeholder: 'City' };
    } else if (selectedOption === 'country') {
      attributes = { ...attributes, type: 'text', placeholder: 'Country' };
    } else if (selectedOption === 'zip') {
      attributes = { ...attributes, type: 'text', placeholder: '000000' };
    }
    attributes = { ...attributes, selectedType: selectedOption };
    getSelectedHtmlElement().setAttributes(attributes);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Input Type</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            type="select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            onBlur={handleChangeType}
          >
            {inputTypeArray?.map((inputType) => {
              return (
                <option value={inputType.key} key={inputType.key}>
                  {inputType.label}
                </option>
              );
            })}
          </Input>
        </Col>
      </div>
    </>
  );
}
