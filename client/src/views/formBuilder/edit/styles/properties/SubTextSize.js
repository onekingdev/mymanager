import React, { useState } from 'react';

import { Input, Label, Col } from 'reactstrap'

export default function SubTextSize({ getSelectedHtmlElement }) {
  const [fontSize, setFontSize] = useState(16);
  const minFontSize = 8;
  const maxFontSize = 72;

  const handleStyle = (e) => {
    const element = getSelectedHtmlElement();
    // element.addStyle({ 'font-size': e.target.value });
    element.addStyle({ 'font-size': e.target.value + 'px' });
    setFontSize(e.target.value);

  };

 
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Sub Text Size</Label>
        </Col>
        <Col xl="4" >
          <Input type="range" onChange={handleStyle} />
        </Col>
        <Col xl="1" xs="1">
          <Input className="countinput p-0" value={fontSize} onChange={handleStyle} />
        </Col>
      </div>
    </>
  )
}
