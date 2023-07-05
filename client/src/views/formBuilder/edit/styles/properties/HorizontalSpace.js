import React, { useState } from 'react';
import { Input, Label, Col } from 'reactstrap';

const spaces = ['inherit', '5px', '10px', '15px', '20px', '25px', '30px', '35px', '40px', '0px'];

export default function HorizontalSpace({ getSelectedHtmlElement }) {
  const [horizantalPadding, setHorizantalSpace] = useState(
    getSelectedHtmlElement().getStyle('padding-left')
  );

  const handlestyle = (e) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ 'padding-left': e.target.value, 'padding-right': e.target.value });
    setHorizantalSpace(e.target.value);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-1">
      <Col xl="6" xs="6">
        <Label>Horizontal Space</Label>
      </Col>
      <Col xl="6" xs="6">
        <Input type="select" value={horizantalPadding} onChange={handlestyle}>
          {spaces.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </Input>
      </Col>
    </div>
  );
}
