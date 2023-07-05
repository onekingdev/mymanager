import React, { useState } from 'react';
import { Col, Input, Label } from 'reactstrap';

export default function WidthPx({ getSelectedHtmlElement }) {
  const [imgWidth, setImgWidth] = useState(getSelectedHtmlElement().getStyle('width'));

  const handleSizeChange = (event) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ width: event.target.value + 'px' });
    setImgWidth(event.target.value);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Width</Label>
        </Col>
        <Col xl="6" xs="6">
          <div className="d-flex justify-content-between">
            <Input type="text" onChange={handleSizeChange} name='width' />
            <span className="my-auto ms-50">px</span>
          </div>
        </Col>
      </div>
    </>
  );
}
