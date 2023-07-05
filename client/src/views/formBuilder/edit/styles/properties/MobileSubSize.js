import React, { useState } from 'react';
import { Input, Label, Col } from 'reactstrap';


export default function Text({ getSelectedHtmlElement }) {
  const [buttonText, setButtonText] = useState('Edit Mobile SubSize');

  const handleInput = (event) => {
    const element = getSelectedHtmlElement();
   
  };

  const handleBlur = () => {
    const element = getSelectedHtmlElement();
    if (element) {
      element.innerHTML = buttonText;
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-1">
      <Col xl="6" xs="6">
        <Label>Edit Mobile Sub Size</Label>
      </Col>
      <Col xl="6">
        <Input defaultValue={buttonText} onChange={(event)=>handleInput(event)} onBlur={handleBlur} />
      </Col>
    </div>
  );
}
