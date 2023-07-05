// ** React Imports
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavLink, TabContent, TabPane, ListGroup, ListGroupItem, Button, Nav, NavItem } from 'reactstrap';
import { Briefcase, Menu, Package, Users, TrendingUp, GitMerge, User, Folder, X } from 'react-feather';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';

// custom import
import Relationship from './tabs/relationship';
import { FiSettings } from 'react-icons/fi';
import { GiRank2 } from 'react-icons/gi';
import { BsListCheck, BsUiChecks } from 'react-icons/bs';
import { MdOutlineNotifications } from 'react-icons/md';

import FormStep from './tabs/step';
import Contact from './tabs/contact';
import Sales from './tabs/sales';
import Automation from './tabs/automation';
import Settings from './tabs/settings';

// ** Components imports live chat layout etc

// ** Reactstrap Imports

const Sidebar = (props) => {
  // store
  
  // ** Props
  const { sidebarOpen, setSidebarOpen,dispatch,store} = props;
  const [active, setActive] = useState('1');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <>
      <div
        className={classnames('sidebar-left', {
          show: sidebarOpen
        })}
      >
        <div className="sidebar">
          <div className="sidebar-content email-app-sidebar">
            <div className="email-app-menu">
              <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
                <div className="form-group-compose text-center compose-btn">
                <h2 className='mb-2'>{store?.form?.name}</h2>
                  <Button color="primary" className='d-flex w-100 justify-content-center'>Add Step</Button>
                </div>
                <ListGroup tag="div" className="list-group-labels">
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('7')}
                    active={active === '7'}
                  >
                    {/* <span className="align-middle"></span> */}
                    Form
                    <X size={18} className="float-end" />
                  </ListGroupItem>
                </ListGroup>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
      <div className="content-right">
        <div className="content-body">
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="email-app-list">
            <div className="app-fixed-search d-flex d-lg-none align-items-center">
              <div
                className="sidebar-toggle d-block d-lg-none ms-1"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size="21" />
              </div>
            </div>
            <PerfectScrollbar>
            <Fragment>
            <Nav pills className="mb-2">
              <NavItem>
                <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                  <FiSettings className="font-medium-1 me-50" />
                  <span className="fs-6">STEP</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '2'} onClick={() => toggleTab('2')} >
                  <GiRank2 className="font-medium-1 me-50" />
                  <span className="fs-6">CONTACT</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                  <BsUiChecks className="font-medium-1 me-50" />
                  <span className="fs-6">SALES</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                  <BsListCheck className="font-medium-1 me-50" />
                  <span className="fs-6">AUTOMATIONS</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
                  <MdOutlineNotifications className="font-medium-1 me-50" />
                  <span className="fs-6">SETTINGS</span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={active}>
                <TabPane tabId="1">
                  <FormStep store={store} dispatch={dispatch}/>
                  
                </TabPane>
                <TabPane tabId="2">
                  <Contact />
                </TabPane>
                <TabPane tabId="3">
                  <Sales />
                </TabPane>
                <TabPane tabId="4">
                  <Automation />
                </TabPane>
                <TabPane tabId="5">
                  <Settings />
                </TabPane>
              </TabContent>
          </Fragment>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
