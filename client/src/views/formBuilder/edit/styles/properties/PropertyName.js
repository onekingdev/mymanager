import React from 'react';
import { Col, Input, Label } from 'reactstrap';

export default function PropertyName({ getSelectedHtmlElement }) {
  const [textName, setTextName] = React.useState(() => {
    return getSelectedHtmlElement().attributes.attributes.name;
  });

  const handleAddAtribute = (e) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes = { ...attributes, name: e.target.value };
    getSelectedHtmlElement().setAttributes(attributes);
    setTextName(e.target.value);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Name</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input type="text" value={textName} onChange={handleAddAtribute} />
        </Col>
      </div>
    </>
  );
}
