import React from 'react';
import { Input, Label,Col } from 'reactstrap';

export default function IconPicker({ getSelectedHtmlElement }) {
  return (
    <>

      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
        <Label>Icon Picker</Label>
        </Col>
        <Col xl="6">

        <Input defaultValue="None" type="icon" />
        </Col>
      </div>





      
    
    </>
  );
}
