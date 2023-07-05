import React, { useState } from 'react';
import { Input, Label, Col } from 'reactstrap';

export default function Width({ getSelectedHtmlElement }) {
  const [widthType, setWidthType] = useState(getSelectedHtmlElement().getStyle('width') === '100%'? 'fill width': 'fluid')


  const handlestylewidth = (e) => {
    if (e.target.value === 'fill width') {
      const element = getSelectedHtmlElement();
      element.addStyle({ width: '100%' });
    } else {
      const element = getSelectedHtmlElement();
      element.addStyle({ width: '200px' });
    }
    setWidthType(e.target.value)
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Width</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input type="select" value={widthType} onChange={handlestylewidth}>
            <option value="fuild">Fuild</option>
            <option value="fill width">Fill width</option>
          </Input>
        </Col>
      </div>
    </>
  );
}
