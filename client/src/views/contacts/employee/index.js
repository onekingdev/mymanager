// ** React Imports
import { Fragment, useState } from 'react';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
// ** Icons Imports
import { Calendar, File, Plus, Settings, Users } from 'react-feather';

import Breadcrumbs from '@components/breadcrumbs';

// ** User Components
import MyEmployee from './list';
import Myforms from '../../myforms/MyFormlist';
import Schedule from './../schedule/scheduleboard';
import WorkHistory from '../workHistory';
import Setting from '../settings';
import CheckIn from '../checkin';

import { Col, Row } from 'reactstrap';

const UserTabs = () => {
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('My Employee');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <>
      <Row>
        <Breadcrumbs
          breadCrumbTitle="Contact"
          breadCrumbParent="Employee"
          breadCrumbActive={title}
        />
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          <Fragment>
            <Nav pills className="mb-2">
              <NavItem>
                <NavLink
                  active={active === '1'}
                  onClick={() => {
                    setActive('1');
                    setTitle('My Employee');
                  }}
                >
                  <Users className="font-medium-1 me-50" />
                  <span className="fs-6">My Employee</span>
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                  <Plus className="font-medium-1 me-50" />
              
                  <span className="fs-6">Employee Tasks</span>
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink
                  active={active === '3'}
                  onClick={() => {
                    setActive('3');
                    setTitle('Schedule');
                  }}
                >
                  <Calendar className="font-medium-1 me-50" />
                  <span className="fs-6">Schedule</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === '4'}
                  onClick={() => {
                    setActive('4');
                    setTitle('Work History');
                  }}
                >
                  <File className="font-medium-1 me-50" />
                  <span className="fs-6">Work History</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === '6'}
                  onClick={() => {
                    setActive('6');
                    setTitle('Check In');
                  }}
                >
                  <Settings className="font-medium-1 me-50" />
                  <span className="fs-6">Check In</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === '5'}
                  onClick={() => {
                    setActive('5');
                    setTitle('Setting');
                  }}
                >
                  <Settings className="font-medium-1 me-50" />
                  <span className="fs-6">Setting</span>
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={active}>
              <TabPane tabId="1">
                <MyEmployee />
              </TabPane>
              {/* <TabPane tabId="2">
                <Myforms />
              </TabPane> */}
              <TabPane tabId="3">
                <Schedule />
              </TabPane>
              <TabPane tabId="4">
                <WorkHistory />
              </TabPane>
              <TabPane tabId="6">
                <CheckIn />
              </TabPane>
              <TabPane tabId="5">
                <Setting />
              </TabPane>
            </TabContent>
          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default UserTabs;
