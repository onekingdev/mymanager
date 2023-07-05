import React from 'react';
import { Col, Input, Label } from 'reactstrap';

export default function PlaceHolder({ getSelectedHtmlElement }) {
  const [placeHolder, setPlaceHolder] = React.useState(() => {
    return getSelectedHtmlElement().attributes.attributes.placeholder;
  });


  const handlePlaceHolder = (e) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes = {...attributes,placeholder:e.target.value}
    getSelectedHtmlElement().setAttributes(attributes)
    setPlaceHolder(e.target.value)
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Place Holder</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input value={placeHolder} type="text" onChange={handlePlaceHolder} />
        </Col>
      </div>
    </>
  );
}
