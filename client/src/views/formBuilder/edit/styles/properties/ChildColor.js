import React from 'react';
import { Col, Input, Label } from 'reactstrap';

export default function ChildColor({ getSelectedHtmlElement }) {
  const handlestyle = (e, name) => {
    const element = getSelectedHtmlElement();
    let childModels = element.attributes.components.models;
    for (var i = 0; i < childModels.length; i++) {
      let subChildModels = childModels[i].attributes.components.models;
      for (var j = 0; j < subChildModels.length; j++) {
        if (name == 'bold-color') {
          if (subChildModels[j].attributes.tagName == 'b') {
            subChildModels[j].addStyle({ color: e.target.value });
          }
        } else {
          if (subChildModels[j].attributes.tagName == 'i') {
            subChildModels[j].addStyle({ color: e.target.value });
          }
        }
      }
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Icon Color</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            className="p-0"
            style={{
              
              height: '40px'
            }}
            onChange={(e) => {
              handlestyle(e, 'icon-color');
            }}
            size="small"
            type="color"
          />
        </Col>
      </div>
    </>
  );
}
