import React from 'react';
import { Fragment, useState, useContext } from 'react';
// ** Reactstrap Imports
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
// ** Icons Imports
import { GiRank2 } from 'react-icons/gi';
import { FiSettings } from 'react-icons/fi';
import { BsUiChecks } from 'react-icons/bs';
import { BsListCheck } from 'react-icons/bs';
import EventViewList from './EventOverView';

function EventViewListTab() {
  const [active, setActive] = useState('1');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
      window.location.hash = `#${tab}`;
    }
  };

  return (
    <>
      <Row>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          <Fragment>
            <Nav pills className="mb-2">
              <NavItem>
                <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                  <FiSettings className="font-medium-1 me-50" />
                  <span className="fs-6">Event Overview </span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                  <GiRank2 className="font-medium-1 me-50" />
                  <span className="fs-6">Athletes </span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                  <BsUiChecks className="font-medium-1 me-50" />
                  <span className="fs-6">Coach Entries </span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                  <BsListCheck className="font-medium-1 me-50" />
                  <span className="fs-6">Referee Entries </span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={active}>
              <TabPane tabId="1">
                <EventViewList />
              </TabPane>
              <TabPane tabId="2">
                <EventViewList />
              </TabPane>
              <TabPane tabId="3">
                <EventViewList />
              </TabPane>
              <TabPane tabId="4">
                <EventViewList />
              </TabPane>
            </TabContent>
          </Fragment>
        </Col>
      </Row>
    </>
  );
}

export default EventViewListTab;
