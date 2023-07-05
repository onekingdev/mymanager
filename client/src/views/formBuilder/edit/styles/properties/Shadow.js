import React, { useState } from 'react';
import { Col, Input, Label } from 'reactstrap';
const dropShadowArray = [5, 10, 20, 30, 40];

export default function Shadow({ getSelectedHtmlElement }) {
  const [boxShadow, setBoxShadow] = useState(
    getShadow(getSelectedHtmlElement().getStyle('box-shadow'))
  );

  const handleBoxShadow = (e) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ 'box-shadow': shadowStyles[e.target.value] });
    setBoxShadow(e.target.value);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Shadow</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input type="select" value={boxShadow} onChange={handleBoxShadow}>
            {Object.values(shadows).map((key) => (
              <option value={key}>{shadowOptions[key]}</option>
            ))}
          </Input>
        </Col>
      </div>
    </>
  );
}
const getShadow = (value) => {
  return Object.keys(shadowStyles).find((key) => shadowStyles[key] === value) || shadows.noShadow;
};
const shadows = {
  noShadow: 'noShadow',
  outset5: 'outset5',
  outset10: 'outset10',
  outset20: 'outset20',
  outset30: 'outset30',
  outset40: 'outset40',
  inset5: 'inset5',
  inset10: 'inset10',
  inset20: 'inset20',
  inset30: 'inset30',
  inset40: 'inset40'
};

const shadowStyles = {
  [shadows.noShadow]: 'none',
  [shadows.outset5]: '0.2px 0.2px 10px 0.5px #666',
  [shadows.outset10]: '0.2px 0.2px 10px 1px #666',
  [shadows.outset20]: '0.2px 0.2px 10px 2px #666',
  [shadows.outset30]: '0.2px 0.2px 10px 3px #666',
  [shadows.outset40]: '0.2px 0.2px 10px 4px #666',
  [shadows.inset5]: '0.2px 0.2px 10px 0.5px #999 inset',
  [shadows.inset10]: '0.2px 0.2px 10px 1px #999 inset',
  [shadows.inse20]: '0.2px 0.2px 10px 2px #999 inset',
  [shadows.inset30]: '0.2px 0.2px 10px 3px #999 inset',
  [shadows.inset40]: '0.2px 0.2px 10px 4px #999 inset'
};

const shadowOptions = {
  [shadows.noShadow]: 'No Shadow',
  [shadows.outset5]: 'Drop Shadow 5%',
  [shadows.outset10]: 'Drop Shadow 10%',
  [shadows.outset20]: 'Drop Shadow 20%',
  [shadows.outset30]: 'Drop Shadow 30%',
  [shadows.outset40]: 'Drop Shadow 40%',
  [shadows.inset5]: 'Inset Shadow 5%',
  [shadows.inset10]: 'Inset Shadow 10%',
  [shadows.inset20]: 'Inset Shadow 20%',
  [shadows.inset30]: 'Inset Shadow 30%',
  [shadows.inset40]: 'Inset Shadow 40%'
};
