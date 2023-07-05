import React, { useState } from 'react';
import { Input, Label, Col } from 'reactstrap';

export default function Display({ getSelectedHtmlElement }) {
  const [display, setDisplay] = useState(getSelectedHtmlElement().getStyle('display'))



  const handlestyle = (e) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ 'display': e.target.value });
    setDisplay(e.target.value)
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Inline/Block</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            type="select"
            value={display}
            onChange={handlestyle}
          >
            <option value="block">Display Block</option>
            <option value="inline">Display Inline</option>
          </Input>
        </Col>
      </div>
    </>
  );
}
