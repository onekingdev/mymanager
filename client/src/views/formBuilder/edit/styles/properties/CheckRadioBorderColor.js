import React from 'react';
import { Col, Input, Label } from 'reactstrap';

export default function CheckRadioBorderColor({ getSelectedHtmlElement }) {
  const handlestyle = (e) => {
    const element = getSelectedHtmlElement().getChildAt(0);
    //GET_BORDER_COLOR_FOR_CHECKBOX(e)
    element.addStyle({ border: `1px solid ${e.target.value}` });
 
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Checkbox Border</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            className="p-0"
            style={{
        
              height: '40px'
            }}
            size="small"
            type="color"
            onChange={(e) => {
              handlestyle(e);
            }}
          />
        </Col>
      </div>
    </>
  );
}
