import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Nav, NavItem, TabContent, TabPane, NavLink } from 'reactstrap';
import BreadCrumbs from '../../@core/components/breadcrumbs';

import SocialConnectMain from '../marketing/SocialConnect';
import SocialProof from './../SocialProof';
import Reputation from './../apps/reputation';
import { AbilityContext } from '../../utility/context/Can';

export default function index() {
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('Social Connect');

  const ability = useContext(AbilityContext);

  useEffect(() => {
    if (ability.can('read', 'mysocial/socialContact')) {
      setActive('1');
      setTitle('Social Connect');
    } else if (ability.can('read', 'mysocial/socialProof')) {
      setActive('2');
      setTitle('Social Proof');
    } else if (ability.can('read', 'mysocial/reputation')) {
      setActive('3');
      setTitle('Reputation');
    }
  }, []);
  return (
    <Fragment>
      <div
        className="social"
        style={{ display: 'inline', width: '100%', overflow: 'auto', padding: '0px 20px 0px 0px' }}
      >
        <BreadCrumbs
          breadCrumbTitle="My Social"
          breadCrumbParent="My Social"
          breadCrumbActive={title}
        />
        <Nav pills>
          {ability.can('read', 'mysocial/socialContact') && (
            <NavItem>
              <NavLink
                active={active === '1'}
                onClick={() => {
                  setActive('1');
                  setTitle('Social Connect');
                }}
              >
                Social Connect
              </NavLink>
            </NavItem>
          )}
          {ability.can('read', 'mysocial/socialProof') && (
            <NavItem>
              <NavLink
                active={active === '2'}
                onClick={() => {
                  setActive('2');
                  setTitle('Social Proof');
                }}
              >
                Social Proof
              </NavLink>
            </NavItem>
          )}
          {ability.can('read', 'mysocial/reputation') && (
            <NavItem>
              <NavLink
                active={active === '3'}
                onClick={() => {
                  setActive('3');
                  setTitle('Reputation');
                }}
              >
                Reputation
              </NavLink>
            </NavItem>
          )}
        </Nav>
        <TabContent activeTab={active}>
          {ability.can('read', 'mysocial/socialContact') && (
            <TabPane tabId="1">
              <SocialConnectMain />
            </TabPane>
          )}
          {ability.can('read', 'mysocial/socialProof') && (
            <TabPane tabId="2">
              <SocialProof />
            </TabPane>
          )}
          {ability.can('read', 'mysocial/reputation') && (
             <TabPane tabId="3">
             <Reputation />
           </TabPane>
          )}

        
        
        </TabContent>
      </div>
    </Fragment>
  );
}
