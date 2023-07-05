import React, { Fragment, useEffect, useState } from 'react';
import { Info, Users } from 'react-feather';
import { Card, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import MembershipList from './tabs/memberships/MembershipList';
import MembershipTypes from './tabs/types/MembershipTypes';
import Customers from './tabs/customers/Customers';
import Orders from './tabs/orders/Orders';
import { getMembershipSalesAction } from '../../../store/action';

export default function Memberships({dispatch,store}) {
  const [activeTab, setActiveTab] = useState('1');
  useEffect(()=>{
   
    dispatch(getMembershipSalesAction(store.shop._id))
  },[])
  return (
    <Fragment>
      <div id="user-profile">
        <Row>
          <Col sm="12">
            <Card className="profile-header mb-2">
              <div className="profile-header-nav">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className="fw-bold"
                      active={activeTab === '1'}
                      onClick={() => setActiveTab('1')}
                    >
                      <span className="d-none d-md-block">Memberships</span>
                      <Info className="d-block d-md-none" size={14} />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="fw-bold"
                      active={activeTab === '2'}
                      onClick={() => setActiveTab('2')}
                    >
                      <span className="d-none d-md-block">Membership Types</span>
                      <Info className="d-block d-md-none" size={14} />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="fw-bold"
                      active={activeTab === '3'}
                      onClick={() => setActiveTab('3')}
                    >
                      <span className="d-none d-md-block">Customers</span>
                      <Users className="d-block d-md-none" size={14} />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="fw-bold"
                      active={activeTab === '4'}
                      onClick={() => setActiveTab('4')}
                    >
                      <span className="d-none d-md-block">Orders</span>
                      <Users className="d-block d-md-none" size={14} />
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Card>
          </Col>
        </Row>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <MembershipList dispatch={dispatch} store={store}/>
          </TabPane>
          <TabPane tabId="2">
            <MembershipTypes dispatch={dispatch} store={store}/>
          </TabPane>
          <TabPane tabId="3">
            <Customers dispatch={dispatch} store={store}/>
          </TabPane>
          <TabPane tabId="4">
            <Orders dispatch={dispatch} store={store}/>
          </TabPane>
        </TabContent>
      </div>
    </Fragment>
  );
}
