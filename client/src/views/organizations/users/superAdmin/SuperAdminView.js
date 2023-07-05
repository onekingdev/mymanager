import React, { Fragment, useEffect, useState } from 'react';

import { Nav, NavItem, NavLink, TabContent, TabPane, Col, Row } from 'reactstrap';
import { Calendar, File, Plus, Settings, Users } from 'react-feather';

// ** STYLES
import '@styles/react/apps/app-users.scss';
import Breadcrumbs from '@components/breadcrumbs';
import Organizations from '../../tabs/orgs/Organizations';
import { useDispatch, useSelector } from 'react-redux';
import Plans from '../../plans/Plans';
import { getOrgsAction, getPlansAction } from '../../store/action';
import Elements from '../../elements/Elements';

const SuperAdminView = () => {
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('Organizations');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  //STORE
  const store = useSelector((state) => state.organizations);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrgsAction());
    dispatch(getPlansAction());
  }, [dispatch]);
  return (
    <Fragment>
      <Row className="w-100 invoice-child-header-wrapper">
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} className="w-100 invoice-child-header-wrapper">
          <Breadcrumbs
            breadCrumbTitle={'Organizations'}
            breadCrumbParent="Super Admin View"
            breadCrumbActive={title}
          />
          <Nav pills className="mb-2">
            <NavItem>
              <NavLink
                active={active === '1'}
                onClick={() => {
                  setActive('1');
                  setTitle('Organizations');
                }}
              >
                <Plus className="font-medium-1 me-50" />
                {/* <span className="fs-6">My Forms</span> */}
                <span className="fs-6">Organizations</span>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                active={active === '2'}
                onClick={() => {
                  setActive('2');
                  setTitle('Plans');
                }}
              >
                <File className="font-medium-1 me-50" />
                <span className="fs-6">Plans</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '3'}
                onClick={() => {
                  setActive('3');
                  setTitle('Manage Elements');
                }}
              >
                <File className="font-medium-1 me-50" />
                <span className="fs-6">Manage Elements</span>
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={active}>
            <TabPane tabId="1">
              <Organizations store={store} dispatch={dispatch} />
            </TabPane>

            <TabPane tabId="2">
              <Plans dispatch={dispatch} store={store} />
            </TabPane>
            <TabPane tabId="3">
              <Elements dispatch={dispatch} store={store} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SuperAdminView;
