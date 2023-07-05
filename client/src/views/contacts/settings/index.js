import React, { useState } from 'react';
import { Mail, MessageCircle, User, Users, Award } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  ListGroup,
  ListGroupItem,
  TabContent,
  TabPane,
  NavLink,
  Row,
  Col,
  InputGroup,
  Input
} from 'reactstrap';
import classnames from 'classnames';
import EmployeeTable from './view/EmployeeTable';
import ShiftTable from './view/ShiftTable';
import PositionTable from './view/PositionTable';
import CategoryTable from './view/CategoryTable';
import PayrollTable from './view/PayrollTable';
import { BsShift } from 'react-icons/bs';
import { BiMoney } from 'react-icons/bi';

const carddata = [
  {
    title: 'Role Type 1',
    date: '01/01/23',
    time: '03:09',
    totalrank: '12',
    type: 'By Stripe',
    rank: '21'
  },
  {
    title: 'Role Type 2',
    date: '01/01/23',
    time: '03:09',
    totalrank: '12',
    type: 'By Stripe',
    rank: '21'
  },
  {
    title: 'Role Type 3',
    date: '01/01/23',
    time: '03:09',
    totalrank: '12',
    type: 'By Stripe',
    rank: '21'
  }
];

function Setting() {
  const [active, setActive] = useState('1');
  const [activecard, setActivecard] = useState('');
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="overflow-hidden email-application">
      <div className="content-area-wrapper p-0 animate__animated animate__fadeIn">
        <div
          className={classnames('sidebar-left', {
            show: sidebarOpen
          })}
        >
          <div className="sidebar">
            <div className="sidebar-content email-app-sidebar">
              <div className="email-app-menu">
                {/* <div className="form-group-compose text-center compose-btn">
                  <Addmyforms />
                </div> */}
                <PerfectScrollbar
                  className="sidebar-menu-list pt-2"
                  options={{ wheelPropagation: false }}
                >
                  <ListGroup tag="div" className="list-group-messages">
                    <ListGroupItem
                      tag={NavLink}
                      onClick={() => toggleTab('1')}
                      active={active === '1'}
                      action
                    >
                      <Award size={18} className="me-75" />
                      <span className="align-middle">Category</span>
                    </ListGroupItem>
                    <ListGroupItem
                      tag={NavLink}
                      onClick={() => toggleTab('2')}
                      active={active === '2'}
                      action
                    >
                      <User size={18} className="me-75" />
                      <span className="align-middle">Position</span>
                    </ListGroupItem>
                    <ListGroupItem
                      tag={NavLink}
                      onClick={() => toggleTab('3')}
                      active={active === '3'}
                    >
                      <BsShift size={18} className="me-75" />
                      <span className="align-middle">Shift</span>
                    </ListGroupItem>
                    <ListGroupItem
                      tag={NavLink}
                      onClick={() => toggleTab('4')}
                      active={active === '4'}
                    >
                      <Users size={18} className="me-75" />
                      <span className="align-middle">Employee Type</span>
                    </ListGroupItem>
                    <ListGroupItem
                      tag={NavLink}
                      onClick={() => toggleTab('5')}
                      active={active === '5'}
                    >
                      <BiMoney size={18} className="me-75" />
                      <span className="align-middle">Payroll</span>
                    </ListGroupItem>
                  </ListGroup>
                </PerfectScrollbar>
              </div>
            </div>
          </div>
        </div>
        <div className="content-right">
          <div className="content-body">
            <PerfectScrollbar>
              <TabContent activeTab={active}>
                <TabPane tabId="1">
                  <div className="email-user-list">
                    <Card className="overflow-hidden">
                      <CategoryTable />
                    </Card>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div className="email-user-list">
                    <Card className="overflow-hidden">
                      <PositionTable />
                    </Card>
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <div className="email-user-list">
                    <Card className="overflow-hidden">
                      <ShiftTable />
                    </Card>
                  </div>
                </TabPane>
                <TabPane tabId="4">
                  <div className="email-user-list">
                    <Card className="overflow-hidden">
                      <EmployeeTable />
                    </Card>
                  </div>
                </TabPane>
                <TabPane tabId="5">
                  <div className="email-user-list">
                    <Card className="overflow-hidden">
                      <PayrollTable />
                    </Card>
                  </div>
                </TabPane>
              </TabContent>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
