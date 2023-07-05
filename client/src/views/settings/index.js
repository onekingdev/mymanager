// ** React Imports
import { Fragment, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
// ** Icons Imports
import { GiRank2 } from 'react-icons/gi';
import { FiSettings, FiCreditCard } from 'react-icons/fi';
import { BsUiChecks } from 'react-icons/bs';
import { BsListCheck } from 'react-icons/bs';
import { MdOutlineNotifications } from 'react-icons/md';
import { RiFilePaperLine } from 'react-icons/ri';
// ** User Components

import Notifications from './tabs/notifications';
import Breadcrumbs from '@components/breadcrumbs';
import Billing from './tabs/billing';
import Account from './tabs/account';
import Rolesandper from './tabs/rolesandper';
import Security from './tabs/security';
import Progressiontab from './tabs/progressiontab';
import Advancesettings from './tabs/advancesettings';
import ManageContacts from './tabs/manage-contacts';

import { Col, Row } from 'reactstrap';
import Depositfunds from '../depositfunds';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailsAction } from './store/action';
import { AbilityContext } from '../../utility/context/Can';

const UserTabs = () => {
  const ability = useContext(AbilityContext);
  const [data, setData] = useState(null);
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('Settings');

  const dispatch = useDispatch();
  const store = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(getUserDetailsAction());
    if (ability.can('read', 'settings/account')) {
      setActive('1');
      setTitle('Account');
    } else if (ability.can('read', 'settings/billing')) {
      setActive('2');
      setTitle('Billing');
    } else if (ability.can('read', 'settings/permissions')) {
      setActive('3');
      setTitle('Permissions and Roles');
    } else if (ability.can('read', 'settings/progression')) {
      setActive('4');
      setTitle('Progression');
    } else if (ability.can('read', 'settings/advance')) {
      setActive('5');
      setTitle('Advance Settings');
    } else if (ability.can('read', 'settings/notifications')) {
      setActive('6');
      setTitle('Notifications');
    } else if (ability.can('read', 'settings/security')) {
      setActive('7');
      setTitle('Security');
    } else if (ability.can('read', 'settings/deposit')) {
      setActive('8');
      setTitle('Deposit');
    }
  }, []);
  useEffect(() => {
    if (store && store.user) {
      setData(store.user);
    }
  }, [store]);

  return (
    <>
      <Row>
        <Breadcrumbs
          breadCrumbTitle={'Settings'}
          breadCrumbParent="Settings"
          breadCrumbActive={title}
        />
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          <Fragment>
            <Nav pills className="mb-2">
              {ability.can('read', 'settings/account') && (
                <NavItem>
                  <NavLink
                    active={active === '1'}
                    onClick={() => {
                      setActive('1');
                      setTitle('Account');
                    }}
                  >
                    <FiSettings className="font-medium-1 me-50" />
                    <span className="fs-6">Account</span>
                  </NavLink>
                </NavItem>
              )}
              {ability.can('read', 'settings/billing') && (
                <NavItem>
                  <NavLink
                    active={active === '2'}
                    onClick={() => {
                      setActive('2');
                      setTitle('Billing');
                    }}
                  >
                    <GiRank2 className="font-medium-1 me-50" />
                    <span className="fs-6">Billing</span>
                  </NavLink>
                </NavItem>
              )}

              {ability.can('read', 'settings/permissions') && (
                <NavItem>
                  <NavLink
                    active={active === '3'}
                    onClick={() => {
                      setActive('3');
                      setTitle('Permissions and Roles');
                    }}
                  >
                    <BsUiChecks className="font-medium-1 me-50" />
                    <span className="fs-6">Permissions and Roles</span>
                  </NavLink>
                </NavItem>
              )}
              {ability.can('read', 'settings/progression') && (
                <NavItem>
                  <NavLink
                    active={active === '4'}
                    onClick={() => {
                      setActive('4');
                      setTitle('Progression');
                    }}
                  >
                    <BsListCheck className="font-medium-1 me-50" />
                    <span className="fs-6">Progression</span>
                  </NavLink>
                </NavItem>
              )}
              {ability.can('read', 'settings/advance') && (
                <NavItem>
                  <NavLink
                    active={active === '5'}
                    onClick={() => {
                      setActive('5');
                      setTitle('Advanced Settings');
                    }}
                  >
                    <RiFilePaperLine className="font-medium-1 me-50" />
                    <span className="fs-6">Advanced Settings</span>
                  </NavLink>
                </NavItem>
              )}
              {ability.can('read', 'settings/notifications') && (
                <NavItem>
                  <NavLink
                    active={active === '6'}
                    onClick={() => {
                      setActive('6');
                      setTitle('Notifications');
                    }}
                  >
                    <MdOutlineNotifications className="font-medium-1 me-50" />
                    <span className="fs-6">Notifications</span>
                  </NavLink>
                </NavItem>
              )}
              {ability.can('read', 'settings/security') && (
                <NavItem>
                  <NavLink
                    active={active === '7'}
                    onClick={() => {
                      setActive('7');
                      setTitle('Security');
                    }}
                  >
                    <MdOutlineNotifications className="font-medium-1 me-50" />
                    <span className="fs-6">Security</span>
                  </NavLink>
                </NavItem>
              )}
              {ability.can('read', 'settings/deposit') && (
                <NavItem>
                  <NavLink
                    active={active === '8'}
                    onClick={() => {
                      setActive('8');
                      setTitle('Deposit');
                    }}
                  >
                    <MdOutlineNotifications className="font-medium-1 me-50" />
                    <span className="fs-6">Deposit</span>
                  </NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink
                  active={active === '9'}
                  onClick={() => {
                    setActive('9');
                    setTitle('Contacts');
                  }}
                >
                  <FiCreditCard className="font-medium-1 me-50" />
                  <span className="fs-6">Contacts</span>
                </NavLink>
              </NavItem>
            </Nav>
            {data !== null ? (
              <TabContent activeTab={active}>
                {ability.can('read', 'settings/account') && (
                  <TabPane tabId="1">
                    <Account data={data.general} />
                  </TabPane>
                )}

                {ability.can('read', 'settings/billing') && (
                  <TabPane tabId="2">
                    <Billing />
                  </TabPane>
                )}

                {ability.can('read', 'settings/permissions') && (
                  <TabPane tabId="3">
                    <Rolesandper />
                  </TabPane>
                )}

                {ability.can('read', 'settings/progression') && (
                  <TabPane tabId="4">
                    <Progressiontab />
                  </TabPane>
                )}

                {ability.can('read', 'settings/advance') && (
                  <TabPane tabId="5">
                    <Advancesettings />
                  </TabPane>
                )}

                {ability.can('read', 'settings/notifications') && (
                  <TabPane tabId="6">
                    <Notifications />
                  </TabPane>
                )}

                {ability.can('read', 'settings/security') && (
                  <TabPane tabId="7">
                    <Security />
                  </TabPane>
                )}

                {ability.can('read', 'settings/deposit') && (
                  <TabPane tabId="8">
                    <Depositfunds />
                  </TabPane>
                )}

                <TabPane tabId="9">
                  <ManageContacts />
                </TabPane>
              </TabContent>
            ) : null}
          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default UserTabs;
