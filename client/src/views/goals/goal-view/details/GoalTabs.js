import React, { Fragment, useState } from 'react';

import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import StatsCard from './StatsCard';
import ActionPlanTab from './tabs/ActionPlanTab';
import DescriptionTab from './tabs/DescriptionTab';
import DocumentsTab from './tabs/DocumentsTab';
import HabitsTab from './tabs/HabitsTab';

export default function GoalTabs() {
  const [active,setActive] = useState('1')

  const toggleTab = (val)=>setActive(val)
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <span className="fw-bold">Description</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <span className="fw-bold">Action Plan</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <span className="fw-bold">Habits</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
            <span className="fw-bold">Document</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
        <StatsCard cols={{ md: '3', sm: '6', xs: '12' }}/>
          <DescriptionTab/>
        </TabPane>
        <TabPane tabId="2">
          <ActionPlanTab task={{}}/>
        </TabPane>
        <TabPane tabId="3">
          <HabitsTab/>
        </TabPane>
        <TabPane tabId="4">
          <DocumentsTab/>
        </TabPane>
      </TabContent>
    </Fragment>
  );
}
