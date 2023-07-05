import React from 'react';
import { Col, Input, Label } from 'reactstrap';

export default function LinkUrl({ getSelectedHtmlElement }) {
  const handleLinkChange = (e) => {
    const element = getSelectedHtmlElement();
    let attributes = element.getAttributes();
    attributes = { ...attributes, [e.target.name]: e.target.value };
    getSelectedHtmlElement.setAttributes(attributes);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Link URL</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            type="select"
            name="link_url"
            onChange={(e) => {
              handleLinkChange(e);
            }}
          >
            <option value="open_popup">Open PopUp</option>
            <option value="submit_form">Submit Form</option>
            <option value="next_url">Next URL</option>
            <option value="close_popup">Close PopUp</option>
            <option value="yes_link">Yes Link</option>
            <option value="no_link">No Link</option>
          </Input>
        </Col>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Link URL Target</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            type="select"
            name="link_target"
            onChange={(e) => {
              handleLinkChange(e);
            }}
          >
            <option value="open_popup">Normal</option>
            <option value="submit_form">New Tab/Window</option>
          </Input>
        </Col>
      </div>
    </>
  );
}
