import React from 'react';
import { Col, Row } from 'reactstrap';

const OrderComponent = ({ order }) => {
  return (
    <>
      <Row className='mt-2 p-1'>
        <Col md="7">
          {order.count} x {order.ticketName}
        </Col>
        <Col md="5" style={{ textAlign: 'end' }}>
          ${order.count * order.price}
        </Col>
      </Row>
    </>
  );
};

export default OrderComponent;
