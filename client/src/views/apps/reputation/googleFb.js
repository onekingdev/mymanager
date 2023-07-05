import React, { useState } from 'react';
import { Card, Col, Nav, NavItem, NavLink, Row } from 'reactstrap';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

function index() {
  const [active, setActive] = useState('today');
  const toggle = (tab) => {
    setActive(tab);
  };

  return (
    <>
      <Card className="p-1">
        <Row>
          <Col sm={2} md={2} lg={2}></Col>
          <Col sm={8} md={8} lg={8}>
            <Nav className="justify-content-center mb-0" tabs>
              <NavItem>
                <NavLink
                  active={active === 'today'}
                  onClick={() => {
                    toggle('today');
                  }}
                >
                  <FaFacebook size={38} color="blue" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === 'completed'}
                  onClick={() => {
                    toggle('completed');
                  }}
                >
                  <FcGoogle size={38} />
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col sm={2} md={2} lg={2} className="d-flex justify-content-end"></Col>
        </Row>
      </Card>
    </>
  );
}
export default index;
