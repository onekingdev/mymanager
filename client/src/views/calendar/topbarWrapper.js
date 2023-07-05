// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane, Card } from 'reactstrap';
// ** Icons Imports


import { BsListCheck } from 'react-icons/bs';

import { Col, Row } from 'reactstrap';
import { Radio,Facebook,MessageCircle,MessageSquare,Mail } from 'react-feather';
// ** User Components
// Todo: move tab folders to tabs folder
import EventManager from './event';
import Calendar from './index';



// ** Store & Actions
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchWorkspaceApi, getSelectedWorkspaceData, addWorkspace } from '../apps/workspace/store';
// import { fetchLabelsApi } from '../tasks/label-management/store';

// ** Styles
import '@src/assets/styles/tasks.scss';
import '@src/assets/styles/dark-layout.scss';
import CalendarComponent from '../calendar';

const TobbarWrapper = () => {
  const [active, setActive] = useState('1');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <>
      <Row >
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} >
          <Fragment>
            <Nav pills className="mb-2 ">
              <NavItem>
                <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                  <Mail className="font-medium-1 me-50" />
                  <span className="fs-6">Event</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                  <MessageCircle className="font-medium-1 me-50" />
                  <span className="fs-6">Appointments</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                  <MessageSquare className="font-medium-1 me-50" />
                  <span className="fs-6">Booking</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                  <MessageCircle className="font-medium-1 me-50" />
                  <span className="fs-6">Attendance</span>
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={active}>
              <TabPane tabId="1">
                <EventManager />
              </TabPane>
              <TabPane tabId="2">
                <Calendar />
              </TabPane>
              <TabPane tabId="3">
                <Calendar />
              </TabPane>
              <TabPane tabId="4">
                <Calendar />
              </TabPane>
            </TabContent>

          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default TobbarWrapper;
