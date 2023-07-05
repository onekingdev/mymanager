// ** React Imports
import { Fragment, useState, useEffect, useContext } from 'react';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane, Card } from 'reactstrap';
// ** Icons Imports
import { ArrowRightCircle, ChevronLeft, ChevronRight, Share, UserPlus } from 'react-feather';
import { GiRank2 } from 'react-icons/gi';
import { FiSettings } from 'react-icons/fi';
import { BsUiChecks } from 'react-icons/bs';
import { BsListCheck } from 'react-icons/bs';
import { MdOutlineNotifications } from 'react-icons/md';
import { RiFilePaperLine } from 'react-icons/ri';
import { Code } from 'react-feather';
import { CiCircleList } from 'react-icons/ci';
import { Button, Col, Collapse, Row } from 'reactstrap';

// ** User Components
import Breadcrumbs from '@components/breadcrumbs';
// Todo: move tab folders to tabs folder
import Dashboard from '@src/views/business/statistics';
import Retention from '@src/views/business/retention';
import Birthday from '@src/views/business/birthday';
import Expired from '@src/views/business/expired';
import Progression from '@src/views/business/progression';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaceApi, getSelectedWorkspaceData, addWorkspace } from '../apps/workspace/store';
import { fetchLabelsApi } from '../tasks/label-management/store';

// ** Styles
import '@src/assets/styles/tasks.scss';
import '@src/assets/styles/dark-layout.scss';
import { AbilityContext } from '../../utility/context/Can';

const Statistics = () => {
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('Dashboard');

  const ability = useContext(AbilityContext);

  useEffect(() => {
    if (ability.can('read', 'statistics/dashboard')) {
      setActive('1');
      setTitle('Dashboard');
    } else if (ability.can('read', 'statistics/retention')) {
      setActive('2');
      setTitle('Retention');
    } else if (ability.can('read', 'statistics/birthday')) {
      setActive('3');
      setTitle('Birthday');
    } else if (ability.can('read', 'statistics/expired')) {
      setActive('4');
      setTitle('Expired');
    } else if (ability.can('read', 'statistics/progression')) {
      setActive('5');
      setTitle('Progression');
    }
  }, []);

  return (
    <>
      <Row>
        <Breadcrumbs
          breadCrumbTitle={'Business Statistics'}
          breadCrumbParent="Business Statistics"
          breadCrumbActive={title}
        />
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          {/* <Col xl="12"> */}
          <Fragment>
            <Nav pills className="mb-2 tab-header">
              {ability.can('read', 'statistics/dashboard') && (
                <NavItem>
                  <NavLink
                    active={active === '1'}
                    onClick={() => {
                      setActive('1');
                      setTitle('Dashboard');
                    }}
                  >
                    <FiSettings className="font-medium-1 me-50" />
                    <span className="fs-6">Dashboard</span>
                  </NavLink>
                </NavItem>
              )}

              {ability.can('read', 'statistics/retention') && (
                <NavItem>
                  <NavLink
                    active={active === '2'}
                    onClick={() => {
                      setActive('2');
                      setTitle('Retention');
                    }}
                  >
                    <GiRank2 className="font-medium-1 me-50 " />
                    <span className="fs-6">Retention</span>
                  </NavLink>
                </NavItem>
              )}
              {ability.can('read', 'statistics/birthday') && (
                <NavItem>
                  <NavLink
                    active={active === '3'}
                    onClick={() => {
                      setActive('3');
                      setTitle('Birthday');
                    }}
                  >
                    <BsListCheck className="font-medium-1 me-50" />
                    <span className="fs-6">Birthday</span>
                  </NavLink>
                </NavItem>
              )}
              {ability.can('read', 'statistics/expired') && (
                <NavItem>
                  <NavLink
                    active={active === '4'}
                    onClick={() => {
                      setActive('4');
                      setTitle('Expired');
                    }}
                  >
                    <BsListCheck className="font-medium-1 me-50" />
                    <span className="fs-6">Expired</span>
                  </NavLink>
                </NavItem>
              )}
              {ability.can('read', 'statistics/progression') && (
                <NavItem>
                  <NavLink
                    active={active === '5'}
                    onClick={() => {
                      setActive('5');
                      setTitle('Progression');
                    }}
                  >
                    <BsListCheck className="font-medium-1 me-50" />
                    <span className="fs-6">Progression</span>
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            <div className="tasks-border">
              <TabContent className="w-100" activeTab={active}>
                {ability.can('read', 'statistics/dashboard') && (
                  <TabPane tabId="1">
                    <div className="overflow-hidden email-application">
                      <div className="content-overlay"></div>
                      <div
                        className="content-area-wrapper animate__animated animate__fadeIn"
                        style={{ height: '77vh' }}
                      >
                        <Dashboard />
                      </div>
                    </div>
                  </TabPane>
                )}
                {ability.can('read', 'statistics/retention') && (
                  <TabPane tabId="2">
                    <div className="overflow-hidden email-application card">
                      <div className="content-overlay"></div>
                      <div className="content-area-wrapper animate__animated animate__fadeIn">
                        <Retention />
                      </div>
                    </div>
                  </TabPane>
                )}

                {ability.can('read', 'statistics/birthday') && (
                  <TabPane tabId="3">
                    <div className="overflow-hidden email-application card">
                      <div className="content-overlay"></div>
                      <div className="content-area-wrapper animate__animated animate__fadeIn">
                        <Birthday />
                      </div>
                    </div>
                  </TabPane>
                )}
                {ability.can('read', 'statistics/expired') && (
                  <TabPane tabId="4">
                    <div className="overflow-hidden email-application card">
                      <div className="content-overlay"></div>
                      <div className="content-area-wrapper animate__animated animate__fadeIn">
                        <Expired />
                      </div>
                    </div>
                  </TabPane>
                )}
                {ability.can('read', 'statistics/progression') && (
                  <TabPane tabId="5">
                    <div className="overflow-hidden email-application card">
                      <Progression />
                    </div>
                  </TabPane>
                )}
              </TabContent>
            </div>
          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default Statistics;
