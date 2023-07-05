import React, { useState } from 'react';
import { Input, Label } from 'reactstrap';

export default function TextAreaWithSubmit({ getSelectedHtmlElement }) {
  const [submitOnEnter, setSubmitOnEnter] = useState(false);
  const [selectValue, setSelectValue] = useState('off');

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
    setSubmitOnEnter(event.target.value === 'on');
  };

  const handleSubmit = (event) => {
    const element = getSelectedHtmlElement();
    element.set({ content: event.target.value });
  };

  return (
    <>
      {submitOnEnter ? (
        <>
          <Label>Text Area</Label>
          <Input type="textarea" onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)} />
        </>
      ) : (
        ''
      )}
      <Label>Submit on Enter</Label>
      <Input type="select" value={selectValue} onChange={handleSelectChange}>
        <option value="off">Off</option>
        <option value="on">On</option>
      </Input>
    </>
  );
}
