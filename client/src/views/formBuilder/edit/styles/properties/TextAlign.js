import React, { useState } from 'react';
import { Col, Input, Label } from 'reactstrap';

export default function TextAlign({ getSelectedHtmlElement }) {
  const [textAlign, setTextAlign] = useState(
    getSelectedHtmlElement().getStyle('text-align')
  );


  const handlestyle = (e) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ 'text-align': e.target.value });
    setTextAlign(e.target.value)
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Text Aignment</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            type="select"
            value={textAlign}
            onChange={handlestyle}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </Input>
        </Col>
      </div>
    </>
  );
}
