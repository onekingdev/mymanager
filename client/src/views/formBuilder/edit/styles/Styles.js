import React, { useEffect, useState } from 'react';
import { Settings, Tool } from 'react-feather'

import { Button, Nav, NavItem, TabContent, TabPane, NavLink } from 'reactstrap';
import AdvanceTab from './AdvanceTab';
import SettingsTab from './SettingsTab';
import ThemeTab from './ThemeTab'

import '@src/assets/styles/task-list.scss';

export default function Styles({ editor }) {
  const [tab, setTab] = useState('settings');

  const handleTabChange = (val) => {
    setTab(val);
  };
  return (
    <div>
      <Nav
        className='bg-dark flex-nowrap'
        // className='bg-dark'

        fill
        pills >
        <NavItem >
          <NavLink onClick={() => handleTabChange('settings')} active={tab === 'settings'}
            style={{ color: 'white', borderRadius:"0" }}
            >
            <Settings size={12} />
            Settings
          </NavLink>
        </NavItem>
        <NavItem style={{width:"33.3%", borderRadius:"0"}}>
          <NavLink onClick={() => handleTabChange('theme')} active={tab === 'theme'}
            style={{ color: 'white' ,borderRadius:"0"}}>
            <Settings size={12} />
            Theme
          </NavLink>
        </NavItem>
        <NavItem style={{width:"33.3%", borderRadius:"0"}}>
          <NavLink onClick={() => handleTabChange('advanced')} active={tab === 'advanced'}
            style={{ color: 'white' ,borderRadius:"0"}}>
            <Tool size={12} />
            Advanced
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={tab} className="px-1">
        <TabPane tabId="settings">
          <SettingsTab editor={editor} />
        </TabPane>
        <TabPane tabId="theme">
          <ThemeTab editor={editor} />
        </TabPane>
        <TabPane tabId="advanced">
          <AdvanceTab editor={editor} />
        </TabPane>
      </TabContent>
    </div>
  );
}
