import React, { Fragment } from 'react';
import { Col, Input, Label, Row } from 'reactstrap';

export default function AddressType({ getSelectedHtmlElement }) {
  const handleAddressTypeChange = (e) => {
    let attributes = getSelectedHtmlElement().getAttributes();
    attributes = { ...attributes, addressType: e.target.value };
    getSelectedHtmlElement().setAttributes(attributes);
    switch (e.target.value) {
      case 'contact':
        getSelectedHtmlElement().getChildAt(0).components('Enter your Address');
        break;
      case 'billing':
        getSelectedHtmlElement().getChildAt(0).components('Billing Address');
        break;
      case 'shipping':
        getSelectedHtmlElement().getChildAt(0).components('Shipping Address');
        break;

      default:
        getSelectedHtmlElement().getChildAt(0).components('Enter your Address');
        break;
    }
  };
  return (
    <Fragment>
      <Row>
        <Col xl="6" xs="6">
          <Label>Address Type</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input type="select" onChange={handleAddressTypeChange}>
            <option value="contact">Contact</option>
            <option value="billing">Billing</option>
            <option value="shipping">Shipping</option>
          </Input>
        </Col>
      </Row>
    </Fragment>
  );
}
