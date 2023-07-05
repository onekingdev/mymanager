import React, { useEffect, useState } from 'react';
import { Input, Label } from 'reactstrap';
import CustomOptions from './CustomOptions';

export default function ListSetting({ getSelectedHtmlElement }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const handleInputData = (e) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes = { ...attributes, selectedType: selectedOption };
    getSelectedHtmlElement().setAttributes(attributes);
    switch (selectedOption) {
      case 'countries':
        //get all countries
        fetch('https://restcountries.com/v2/all?fields=name,alpha2Code')
          .then((res) => res.json())
          .then((data) => {
            for (const d of data) {
              getSelectedHtmlElement().append(`<option value=${d.name}>${d.name}</option>`);
            }
          });
        
        break;
      case 'us':
        //get us states
        
        break;
      case 'canada-province':
        // get canada province
        break;
      case 'us-ca':
        //get us & canada province
        break;

      default:
        break;
    }
  };
  const handleSaveOptions = () => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes = { ...attributes, selectedType: 'custom' };
    getSelectedHtmlElement().setAttributes(attributes);
    if (options.length > 0) {
      for (const option of options) {
        getSelectedHtmlElement().append(`<option value=${option.value}>${option.name}</option>`);
      }
    }
  };

  return (
    <>
      <Label>List Data</Label>
      <Input
        type="select"
        onChange={(e) => setSelectedOption(e.target.value)}
        onBlur={handleInputData}
        value={selectedOption}
      >
        <option value="Not set">Not set</option>
        <option value="countries">All Countries</option>
        <option value="us">All United State</option>
        <option value="canada-province">All Canadian Provinces</option>
        <option value="us-ca">Us & Canada</option>
        <option value="custom">Custom Option</option>
      </Input>
      {selectedOption === 'custom' && (
        <CustomOptions
          options={options}
          setOptions={setOptions}
          handleSaveOptions={handleSaveOptions}
        />
      )}
    </>
  );
}
