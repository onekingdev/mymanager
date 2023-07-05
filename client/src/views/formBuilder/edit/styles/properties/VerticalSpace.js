import React, { useState } from 'react';
import { Input, Label, Col } from 'reactstrap';

const spaces = ['inherit', '5px', '10px', '15px', '20px', '25px', '30px', '35px', '40px', '0px'];

export default function VerticalSpace({ getSelectedHtmlElement }) {
  const [verticalPadding, setVerticalPadding] = useState(
    getSelectedHtmlElement().getStyle('padding-top')
  );

  const handlestyle = (e) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ 'padding-top': e.target.value, 'padding-bottom': e.target.value });
    setVerticalPadding(e.target.value);
  };
  
  return (
    <div className="d-flex justify-content-between align-items-center mt-1">
      <Col xl="6" xs="6">
        <Label>Vertical Space</Label>
      </Col>
      <Col xl="6" xs="6">
        <Input type="select" value={verticalPadding} onChange={handlestyle}>
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
