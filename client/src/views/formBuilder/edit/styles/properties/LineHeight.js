import React, { useState } from 'react';
import { Col, Input, Label } from 'reactstrap';

export default function LineHeight({ getSelectedHtmlElement }) {
  const [lineHeight, setLineHeight] = useState(
    getSelectedHtmlElement().getStyle('line-height')
  );

  const handleLineHeight = (e) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ 'line-height': e.target.value });
    setLineHeight(e.target.value)
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Line Height</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input type="select" value={lineHeight} onChange={handleLineHeight}>
            <option value="auto">Auto</option>
            <option value="0.7em">0.7em</option>
            <option value="1em">1em</option>
            <option value="1.3em">1.3em</option>
            <option value="1.4em">1.4em</option>
            <option value="1.5em">1.5em</option>
            <option value="1.7em">1.7em</option>
            <option value="2em">2em</option>
            <option value="3em">3em</option>
            <option value="5em">5em</option>
          </Input>
        </Col>
      </div>
    </>
  );
}
