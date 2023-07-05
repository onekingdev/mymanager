import React, { useState } from 'react';
import { Col, Input, Label } from 'reactstrap';

export default function FontWeight({ getSelectedHtmlElement }) {
  const [fontWeight, setFontWeight] = useState(
    getSelectedHtmlElement().getStyle('font-weight')
  );

  const handleFontWeightChange = (e) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ 'font-weight': e.target.value });
    setFontWeight(e.target.value)
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Font Weight</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input type="select" value={fontWeight} onChange={handleFontWeightChange}>
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="bolder">Bolder</option>
            <option value="lighter">Lighter</option>
          </Input>
        </Col>
      </div>
    </>
  );
}
