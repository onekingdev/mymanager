// ** THIS IS A CONNECTOR OF BUSSINESS & FORMS & FUNNELS

import React, { Fragment, useContext, useEffect, useState } from 'react';

import { Nav, NavItem, TabContent, TabPane, NavLink } from 'reactstrap';
import BreadCrumbs from '../../@core/components/breadcrumbs';

import FormBuilder from '../formBuilder';
import ProjectManager from '../business/projects';
import QRBarcode from '../tasks/setting';

import '@src/assets/styles/business/business-tab.scss';
import { AiFillProject, AiOutlineAudit, AiOutlineBarcode } from 'react-icons/ai';
import { AbilityContext } from '../../utility/context/Can';

export default function index() {
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('Project Manager');

  const ability = useContext(AbilityContext);

  useEffect(() => {
    if (ability.can('read', 'business/projectManager')) {
      setActive('1');
      setTitle('Project Manager');
    } else if (ability.can('read', 'business/formsFunnels')) {
      setActive('2');
      setTitle('Forms & Funnels');
    } else if (ability.can('read', 'business/qrBarcode')) {
      setActive('3');
      setTitle('QR & Barcode');
    }
  }, []);

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Business Tools"
        breadCrumbParent="Business Tools"
        breadCrumbActive={title}
      />
      <Nav pills>
        {ability.can('read', 'business/projectManager') && (
          <NavItem>
            <NavLink
              active={active === '1'}
              onClick={() => {
                setActive('1');
                setTitle('Project Manager');
              }}
            >
              <AiFillProject size={20} className="mb-30" />
              <span className="fs-6">Project Manager</span>
            </NavLink>
          </NavItem>
        )}
        {ability.can('read', 'business/formsFunnels') && (
          <NavItem>
            <NavLink
              active={active === '2'}
              onClick={() => {
                setActive('2');
                setTitle('Forms & Funnels');
              }}
            >
              <AiOutlineAudit size={20} className="mb-30" />
              <span className="fs-6">Forms & Funnels</span>
            </NavLink>
          </NavItem>
        )}
        {ability.can('read', 'business/qrBarcode') && (
          <NavItem>
            <NavLink
              active={active === '3'}
              onClick={() => {
                setActive('3');
                setTitle('QR & Barcode');
              }}
            >
              <AiOutlineBarcode size={20} className="mb-30" />
              <span className="fs-6">QR & Barcode</span>
            </NavLink>
          </NavItem>
        )}
      </Nav>
      <TabContent activeTab={active}>
        {ability.can('read', 'business/projectManager') && (
          <TabPane tabId="1">
            <div>
              <ProjectManager />
            </div>
          </TabPane>
        )}
        {ability.can('read', 'business/formsFunnels') && (
          <TabPane tabId="2">
            <FormBuilder />
          </TabPane>
        )}
        {ability.can('read', 'business/qrBarcode') && (
          <TabPane tabId="3">
            <QRBarcode />
          </TabPane>
        )}
      </TabContent>
    </Fragment>
  );
}
