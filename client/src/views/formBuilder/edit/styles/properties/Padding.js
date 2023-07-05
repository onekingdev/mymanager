import React, { useState } from 'react';
import { Col, Input, Label, Row } from 'reactstrap';

const paddingArray = [0, 5, 10, 15, 20, 25, 50, 75, 150];
export default function Padding({ getSelectedHtmlElement }) {
  const [padding, setPadding] = useState(
    getSelectedHtmlElement().getStyle('padding')
  )

  const handlestyle = (e) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ 'padding': e.target.value });
    setPadding(e.target.value)
  };

  return (
    <>
       <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="3">
          <Label>Padding</Label>
        </Col>
        <Col xl="6" xs="3">
          <Input
            type="select"
            className='w-100'
            value={padding}
            onChange={handlestyle}
          >
            {paddingArray?.map((padding) => {
              return (
                <option value={padding + 'px'} key={padding}>
                  {padding} px
                </option>
              );
            })}
          </Input>
        </Col>
      </div>
    </>
  );
}
