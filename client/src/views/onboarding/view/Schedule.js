import React, { Fragment } from 'react';
import { FaTicketAlt } from 'react-icons/fa';
import { Badge, Button, Card, Col, Row } from 'reactstrap';
import { getOnboardingStatus } from '../../../utility/Utils';
import {
  Share2,
  MessageSquare,
  PhoneCall,
  PenTool,
  User,
  FileText,
  MapPin,
  ShoppingBag,
  Server
} from 'react-feather';

export const basicData = [
  {
    customContent: (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4>{'Step 1'}</h4>
            <p>{'Fill in your account and business information'}</p>
          </div>
          <Button  color="primary" id="reportToggler" outline disabled>
            Done
          </Button>
        </div>
        <hr />
      </Fragment>
    )
  },
  {
    color: 'secondary',
    customContent: (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4>{'Step 2'}</h4>
            <p>{'Add your first contacts'}</p>
          </div>
          <Button
            
            color="primary"
            outline
            disabled={getOnboardingStatus()?.contactCreated}
            onClick={() => {
              window.location = '/contacts/clients/list';
            }}
          >
            {getOnboardingStatus()?.contactCreated ? 'Done' : 'Start'}
          </Button>
        </div>
        <hr />
      </Fragment>
    )
  },
  {
    color: 'success',
    customContent: (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ width: '220px' }}>
            <h4>{'Step 3'}</h4>
            <p>{'Organise your life with tasks goals'}</p>
          </div>
          <Button
            
            color="primary"
            id="reportToggler"
            outline
            disabled={getOnboardingStatus()?.goalCreated}
            onClick={() => {
              window.location = '/tasksAndGoals';
            }}
          >
            {getOnboardingStatus()?.goalCreated ? 'Done' : 'Start'}
          </Button>
        </div>
        <hr />
      </Fragment>
    )
  },
  {
    color: 'warning',
    customContent: (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ width: '220px' }}>
            <h4>{'Step 4'}</h4>
            <p>{'Automate your marketing with powerful marketing tools'}</p>
          </div>
          <Button
            
            color="primary"
            outline
            disabled={getOnboardingStatus()?.automationCreated}
            onClick={() => {
              window.location = '/marketing';
            }}
          >
            {getOnboardingStatus()?.automationCreated ? 'Done' : 'Start'}
          </Button>
        </div>
        <hr />
      </Fragment>
    )
  },
  {
    color: 'danger',
    customContent: (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ width: '220px' }}>
            <h4>{'Step 5'}</h4>
            <p>{'Go to MySocial section and connect your workspace.'}</p>
          </div>
          <Button
            
            color="primary"
            outline
            disabled={getOnboardingStatus()?.socialCreated}
            onClick={() => {
              window.location = '/mysocial';
            }}
          >
            {getOnboardingStatus()?.socialCreated ? 'Done' : 'Start'}
          </Button>
        </div>
        <hr />
      </Fragment>
    )
  },
  {
    color: 'success',
    customContent: (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ width: '220px' }}>
            <h4>{'Step 6'}</h4>
            <p>{'A powerful shop and storefront at your convenience'}</p>
          </div>
          <Button  color="primary" id="reportToggler" outline>
            Start
          </Button>
        </div>
        <hr />
      </Fragment>
    )
  },
  {
    color: 'info',
    customContent: (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ width: '220px' }}>
            <h4>{'Step 7'}</h4>
            <p>{'Knowing your numbers are the key to success'}</p>
          </div>
          <Button  color="primary" id="reportToggler" outline>
            Start
          </Button>
        </div>
        <hr />
      </Fragment>
    )
  },
  {
    color: 'success',
    customContent: (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ width: '220px' }}>
            <h4>{'Step 8'}</h4>
            <p>{'Other powerful unique tools your manager can do'}</p>
          </div>
          <Button  color="primary" id="reportToggler" outline>
            Start
          </Button>
        </div>
        <hr />
      </Fragment>
    )
  }
];

function Schedule() {
  return (
    <Card>
      {/* <div className="p-1">
        <h4>Welcome to Mymanager</h4>
        <h5 style={{ marginTop: '10px' }}>
          Complete the following steps to learn how to activate your manager
        </h5>
      </div>
      <div className="mt-2 p-1">
        <Row style={{ height: '60px' }}>
          <Col md={9}>
            <h4>Fill in your account and business information</h4>
          </Col>
          <Col md={3}>
            <Button className="btn btn-sm" color="primary" outline>
              Done
            </Button>
          </Col>
        </Row>
        <hr />
        <Row style={{ height: '60px' }}>
          <Col md={9}>
            <h4>Add your first contacts</h4>
          </Col>
          <Col md={3}>
            <Button className="btn btn-sm" color="primary" outline>
              Done
            </Button>
          </Col>
        </Row>
        <hr />
        <Row style={{ height: '60px' }}>
          <Col md={9}>
            <h4>Organise your life with tasks goals</h4>
          </Col>
          <Col md={3}>
            <Button className="btn btn-sm" color="primary" outline>
              Done
            </Button>
          </Col>
        </Row>
        <hr />
        <Row style={{ height: '60px' }}>
          <Col md={9}>
            <h4>Automate your marketing with powerful marketing tools</h4>
          </Col>
          <Col md={3}>
            <Button className="btn btn-sm" color="primary" outline>
              Done
            </Button>
          </Col>
        </Row>
        <hr />
        <Row style={{ height: '60px' }}>
          <Col md={9}>
            <h4>A powerful shop and storefront at your convenience</h4>
          </Col>
          <Col md={3}>
            <Button className="btn btn-sm" color="primary" outline>
              Done
            </Button>
          </Col>
        </Row>
        <hr />
        <Row style={{ height: '60px' }}>
          <Col md={9}>
            <h4>Knowing your numbers are the key to success</h4>
          </Col>
          <Col md={3}>
            <Button className="btn btn-sm" color="primary" outline>
              Done
            </Button>
          </Col>
        </Row>
        <hr />
        <Row style={{ height: '60px' }}>
          <Col md={9}>
            <h4>Other powerful unique tools your manager can do</h4>
          </Col>
          <Col md={3}>
            <Button className="btn btn-sm" color="primary" outline>
              Done
            </Button>
          </Col>
        </Row>
      </div> */}
    </Card>
  );
}

export default Schedule;
