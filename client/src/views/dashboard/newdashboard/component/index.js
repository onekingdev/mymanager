import React from 'react';
import { Col, Row } from 'reactstrap';
import Schedule from './Schedule';
import Notification from './Notification';
import OverDue from './OverDue';
import AnalyticsEarningReports from './EarningReport';
import NotificationCard from './NotificationCard';
import MyGoal from './MyGoal';
import UpComingEvent from './UpComingEvent';
import MyTask from './MyTask';


function index() {
  return (
    <div>
      <Row style={{ position: 'relative', top: '-100px', margin: '10px' }}>
        <Col md={4}>
          <Schedule />
        </Col>
        <Col md={8}>
          {/* <Notification /> */}
          <AnalyticsEarningReports />
          {/* <OverDue /> */}
        </Col>
        <Row>
          <Col md={4}>
            <NotificationCard />
          </Col>
          <Col md={4}>
            <OverDue />
          </Col>
          <Col md={4}>
            <MyGoal />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <UpComingEvent />
          </Col>
          <Col md={8}>
            <MyTask />
          </Col>
        </Row>
      </Row>
    </div>
  );
}

export default index;
