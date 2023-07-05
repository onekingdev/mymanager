import React, { useEffect, useState } from 'react';
import { Input, Label, Col } from 'reactstrap';



export default function TextShadow({ getSelectedHtmlElement }) {
  const [textShadow, setTextShadow] = useState(getTextShadow(getSelectedHtmlElement().getStyle('text-shadow')));

  const handleTextShadow = (e) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ 'text-shadow': textShadowStyles[e.target.value] });
    setTextShadow(e.target.value);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Text Shadow</Label>
        </Col>
        <Col xl="6">
          <Input type="select" value={textShadow} onChange={handleTextShadow}>
            {Object.values(textShadows).map((key) => (
              <option value={key}>{textShadowOptions[key]}</option>
            ))}
          </Input>
        </Col>
      </div>
    </>
  );
}
const getTextShadow = (value) => {
  return Object.keys(textShadowStyles).find(key => textShadowStyles[key] === value) || textShadows.noShadow
}
const textShadows = {
  noShadow: 'noShadow',
  subtleShadow: 'subtleShadow',
  midShadow: 'midShadow',
  strongShadow: 'strongShadow'
};

const textShadowStyles = {
  [textShadows.noShadow]: 'none',
  [textShadows.subtleShadow]: '0.2px 0.2px 1px',
  [textShadows.midShadow]: '0.2px 0.2px 1.5px',
  [textShadows.strongShadow]: '0.2px 0.2px 2px'
};

const textShadowOptions = {
  [textShadows.noShadow]: 'No Shadow',
  [textShadows.subtleShadow]: 'Subtle Shadow',
  [textShadows.midShadow]: 'Mid Shadow',
  [textShadows.strongShadow]: 'Strong Shadow'
};