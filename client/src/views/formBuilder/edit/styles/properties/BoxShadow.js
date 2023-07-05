import React, { useState } from 'react';
import { Input, Label, Col } from 'reactstrap';

export default function BoxShadow({ getSelectedHtmlElement }) {
  const [boxShadow, setBoxShadow] = useState(getBoxShadow(getSelectedHtmlElement().getStyle('box-shadow')));

  const handleBoxShadow = (e) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ 'box-shadow': boxShadowStyles[e.target.value] });
    setBoxShadow(e.target.value);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Box Shadow</Label>
        </Col>
        <Col xl="6">
          <Input
            type="select"
            value={boxShadow}
            onChange={handleBoxShadow}
          >
            {Object.values(boxShadows).map((key) => (
              <option value={key}>{boxShadowOptions[key]}</option>
            ))}
          </Input>
        </Col>
      </div>
    </>
  );
}
const getBoxShadow = (value) => {
  return (
    Object.keys(boxShadowStyles).find((key) => boxShadowStyles[key] === value) ||
    boxShadows.noShadow
  );
};
const boxShadows = {
  noShadow: 'noShadow',
  shoftShadow: 'shoftShadow',
  midShadow: 'midShadow',
  hardShadow: 'hardShadow',
  farShadow: 'farShadow',
  blurryShadow: 'blurryShadow',
  darkHighlight: 'darkHighlight',
  sharpInsetLight: 'sharpInsetLight',
  sharpOneInnerBorder: 'sharpOneInnerBorder',
  sharpTwoInnerBorder: 'sharpTwoInnerBorder',
  // hoverHighlight: 'hoverHighlight'
};

const boxShadowStyles = {
  [boxShadows.noShadow]: 'none',
  [boxShadows.shoftShadow]: '0.2px 0.2px 10px 0.5px #999',
  [boxShadows.midShadow]: ' 0.2px 0.2px 10px 1px #999',
  [boxShadows.hardShadow]: '0.2px 0.2px 10px 2px #999',
  [boxShadows.farShadow]: '0.5px 0.5px 10px 2px #999',
  [boxShadows.blurryShadow]: '1px 1px 15px 5px #999',
  [boxShadows.darkHighlight]: '2px 2px 10px 5px #999',
  [boxShadows.sharpInsetLight]: '0.2px 0.2px 1px 1px #999 inset',
  [boxShadows.sharpOneInnerBorder]: '0px 0px 1px 1px #999 inset',
  [boxShadows.sharpTwoInnerBorder]: '0px 0px 1px 2px #999 inset',
  // [boxShadows.hoverHighlight]: '0.2px 0.2px 2px',
};

const boxShadowOptions = {
  [boxShadows.noShadow]: 'No Shadow',
  [boxShadows.shoftShadow]: 'Soft Shadow',
  [boxShadows.midShadow]: 'Mid Shadow',
  [boxShadows.hardShadow]: 'Hard Shadow',
  [boxShadows.farShadow]: 'Far Shadow',
  [boxShadows.blurryShadow]: 'Blurry Shadow',
  [boxShadows.darkHighlight]: 'Dark with Highlight',
  [boxShadows.sharpInsetLight]: 'Sharp 1px Inset Light',
  [boxShadows.sharpOneInnerBorder]: 'Sharp 1px Inner Border',
  [boxShadows.sharpTwoInnerBorder]: 'Sharp 2px Inner Border',
  // [boxShadows.hoverHighlight]: 'Hightlight On Hover Only'
};
