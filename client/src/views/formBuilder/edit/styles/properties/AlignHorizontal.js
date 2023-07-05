import React, { useState } from 'react';
import { Input, Label, Col } from 'reactstrap';

export default function AlignHorizontal({ getSelectedHtmlElement }) {
  const [buttonAlign, setButtonAlign] = useState(
    getSelectedHtmlElement().getStyle('justify-content')
  );

  const handlestyle = (e) => {
    const element = getSelectedHtmlElement();
    element?.parent()?.addStyle({ dispaly: 'flex', 'justify-content': e.target.value });
    setButtonAlign(e.target.value);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-1">
      <Col xl="6" xs="6">
        <Label>Button Align</Label>
      </Col>
      <Col xl="6" xs="6">
        <Input type="select" value={buttonAlign} onChange={handlestyle}>
          <option value="center">Center</option>
          <option value="flex-start">Left</option>
          <option value="flex-end">Right</option>
        </Input>
      </Col>
    </div>
  );
}
