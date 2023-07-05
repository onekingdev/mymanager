import React, { useState } from 'react';
import { Col, Input, Label } from 'reactstrap';

export default function Height({ getSelectedHtmlElement }) {
  const [height, setHeight] = useState(getSelectedHtmlElement().getStyle('height'));

  const handleSizeChange = (e) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ height: e.target.value + 'px' });
    setHeight(e.target.value);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Height</Label>
        </Col>
        <Col xl="6" xs="6">
          <div className="d-flex justify-content-between">
            <Input type="text" onChange={handleSizeChange} name="height" />
            <span className="my-auto ms-50" value={height}>px</span>
          </div>
        </Col>
      </div>
    </>
  );
}
