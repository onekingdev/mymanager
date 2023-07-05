import React, { useState } from 'react';
import { Input, Label, Col } from 'reactstrap';

export default function Effects({ getSelectedHtmlElement }) {
  const [effect, setEffect] = useState(
    getSelectedHtmlElement()
  )
  
  const handleStyle = (e) => {
    const element = getSelectedHtmlElement();
    if (e.target.value === 'no-effect') {
      element.addStyle({
        position: 'relative'
      });
    } else if (e.target.value === 'pulseGlow') {
      element.addStyle({
        animation: 'pulseGlow 2s infinite',
        'animation-timing-function': 'ease-in-out'
      });
    } else if (e.target.value === 'rocking') {
      element.addStyle({
        animation: 'rocking 2s infinite',
        'animation-timing-function': 'cubic-bezier(0, 0, 0.58, 1)',
        transition: '.2s'
      });
    } else if (e.target.value === 'bounce') {
      element.addStyle({
        animation: 'bounce 1.5s infinite',
        'animation-timing-function': 'ease-in',
        transition: '.2s'
      });
    } else if (e.target.value === 'wobble') {
      element.addStyle({
        transition: '.3s'
      });
    } else {
      element.addStyle({
        transition: '.2s',
        ' box-shadow': '0px 0px 0px 0px rgb(0 0 0 / 0%)'
      });
    }
    setEffect(e.target.value)
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Effect</Label>
        </Col>
        <Col xl="6">
          <Input
            type="select"
            value={effect}
            onChange={handleStyle}
            // getPopupContainer={() => document.getElementById('buttoninput')}
          >
            <option value="no-effect">No Effect</option>
            <option value="pulseGlow">Pluse Glow </option>
            <option value="rocking">Rocking (loop)</option>
            <option value="bounce">Bounce (loop)</option>
            <option value="wobble">Wobble (loop)</option>
          </Input>
        </Col>
      </div>
    </>
  );
}
