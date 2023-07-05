import React, { useState } from 'react';
import { Col, Input, Label } from 'reactstrap';

export default function Opacity({ getSelectedHtmlElement }) {
  const [opacity, setOpacity] = useState(
    getSelectedHtmlElement().getStyle('opacity')
  );


  const handleOpacityChange = (e, value) => {
    const element = getSelectedHtmlElement();
    let opacity = 1 / 0;
    switch (value) {
      case 'none':
        opacity = 1.0;
        break;
      case 'light_fade':
        opacity = 0.75;
        break;
      case 'half_fade':
        opacity = 0.5;
        break;
      case 'heavy_fade':
        opacity = 0.25;
        break;
    }
    element.addStyle({ opacity: e.target.value });
    setOpacity(e.target.value)
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Opacity</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            type="select"
            value={opacity}
            onChange={handleOpacityChange}
          >
            <option value="none">None</option>
            <option value="light_fade">Light Fade</option>
            <option value="half_fade">Half Fade</option>
            <option value="heavy_fade">Heavy Fade</option>
          </Input>
        </Col>
      </div>
    </>
  );
}
