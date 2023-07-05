import React from 'react';
import { AiFillCheckSquare } from 'react-icons/ai';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { Button, Card, Col, Input, Row } from 'reactstrap';
import Avatar from '@components/avatar';

function Notification() {
  return (
    <Card className="p-2">
      <div>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <MdOutlineNotificationsNone size={24} style={{ color: '#174ae7' }} />
            <h3 style={{ marginLeft: '10px', fontWeight: 'bold' }}>Notifications</h3>
          </div>
          <button
            className="btn btn-sm d-flex"
            style={{ height: '40px', background: '#fff !important', border: '1px solid' }}
          >
            <Input type="checkbox" />
            <p style={{ marginLeft: '10px', fontWeight: 'bold' }}>Dismiss All</p>
          </button>
        </div>
        <div>
          <Row className="mt-2">
            <Col md={3}>
              <div className="d-flex">
                <div>
                  <Avatar style={{ height: '50px', width: '50px' }} />
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <h5 style={{ fontSize: '16px', fontWeight: 'bold', color: '#000' }}>
                    Eran Galperin
                  </h5>
                  <p>19/01/2002</p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#000' }}>
                Failed check-in: No sessions left - Trial 10 session
              </p>
            </Col>
            <Col md={3} style={{ display: 'flex', justifyContent: 'end' }}>
              <button
                className="btn btn-sm d-flex"
                style={{ height: '40px', background: '#fff !important', border: '1px solid' }}
              >
                <Input type="checkbox" />
                <p style={{ marginLeft: '10px', fontWeight: 'bold' }}>Dismiss</p>
              </button>
            </Col>
          </Row>
          <hr />
        </div>
        <div>
          <Row className="mt-2">
            <Col md={3}>
              <div className="d-flex">
                <div>
                  <Avatar style={{ height: '50px', width: '50px' }} />
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <h5 style={{ fontSize: '16px', fontWeight: 'bold', color: '#000' }}>
                    Eran Galperin
                  </h5>
                  <p>19/01/2002</p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#000' }}>
                Failed check-in: No sessions left - Trial 10 session
              </p>
            </Col>
            <Col md={3} style={{ display: 'flex', justifyContent: 'end' }}>
              <button
                className="btn btn-sm d-flex"
                style={{ height: '40px', background: '#fff !important', border: '1px solid' }}
              >
                <Input type="checkbox" />
                <p style={{ marginLeft: '10px', fontWeight: 'bold' }}>Dismiss</p>
              </button>
            </Col>
          </Row>
          <hr />
        </div>
        <div>
          <Row className="mt-2">
            <Col md={3}>
              <div className="d-flex">
                <div>
                  <Avatar style={{ height: '50px', width: '50px', color: '#000' }} />
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <h5 style={{ fontSize: '16px', fontWeight: 'bold', color: '#000' }}>Eran Galperin</h5>
                  <p>19/01/2002</p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#000' }}>
                Failed check-in: No sessions left - Trial 10 session
              </p>
            </Col>
            <Col md={3} style={{ display: 'flex', justifyContent: 'end' }}>
              <button
                className="btn btn-sm d-flex"
                style={{ height: '40px', background: '#fff !important', border: '1px solid' }}
              >
                <Input type="checkbox" />
                <p style={{ marginLeft: '10px', fontWeight: 'bold' }}>Dismiss</p>
              </button>
            </Col>
          </Row>
          <hr />
        </div>
      </div>
    </Card>
  );
}

export default Notification;
