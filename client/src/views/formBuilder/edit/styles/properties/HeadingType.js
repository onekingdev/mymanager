import React, { useEffect, useState } from 'react';
import { Col, Input, Label } from 'reactstrap';
const htypes = "h1, h2, h3, h4. h5, h6";

export default function HeadingType({ getSelectedHtmlElement }) {
  const getHType = () => {
    const selectedHtmlElement = getSelectedHtmlElement();
    const classes = selectedHtmlElement?.getClasses();
    const tag = classes?.length ? classes.find(cls => htypes.includes(cls)): 'h3';

    if (tag === 'h1') {
      return 'h1';
    } else if (tag === 'h2') {
      return 'h2';
    } else if (tag === 'h3') {
      return 'h3';
    } else if (tag === 'h4') {
      return 'h4';
    } else if (tag === 'h5') {
      return 'h5';
    } else {
      return 'h6';
    }
  }
  const [headLineType, setHeadLineType] = useState(getHType());
  useEffect(() => {
    setHeadLineType(getHType())
  }, [getSelectedHtmlElement])
  
  const handleSelectItemChange = (e) => {
    getSelectedHtmlElement().removeClass('h1 h2 h3 h4 h5 h6');
    let classes = getSelectedHtmlElement().getClasses();
    getSelectedHtmlElement().setClass([...classes, e.target.value]);
    let attributes = getSelectedHtmlElement().getAttributes() || {};
    attributes.htype = e.target.value;
    getSelectedHtmlElement().setAttributes(attributes.attributes);
    setHeadLineType(e.target.value);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-1">
      <Col xl="6" xs="6">
        <Label>Type</Label>
      </Col>
      <Col xl="6">
        <Input type="select" value={headLineType} onChange={handleSelectItemChange}>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="h4">H4</option>
          <option value="h5">H5</option>
          <option value="h6">H6</option>
        </Input>
      </Col>
    </div>
  );
}
