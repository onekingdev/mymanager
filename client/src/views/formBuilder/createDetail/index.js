/* eslint-disable no-unused-vars */
// ** React Imports
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//import Sidebar from './Sidebar';
import { Col, Nav, NavItem, Row, TabContent, TabPane, NavLink, Button } from 'reactstrap';
import { FiSettings } from 'react-icons/fi';
import { GiRank2 } from 'react-icons/gi';
import { BsListCheck, BsUiChecks } from 'react-icons/bs';
import { MdOutlineNotifications } from 'react-icons/md';
import Breadcrumbs from '@components/breadcrumbs';

// ** CUSTOME Components
import FormStep from './tabs/step';
import Contact from './tabs/contact';
import Sales from './tabs/sales';
import Automation from './tabs/automation';
import Settings from './tabs/settings';

// ** STYLES
import '@src/assets/styles/tasks.scss';
import '@src/assets/styles/dark-layout.scss';

// ** DATA ACTIONS
import { getFormDataAction, getFormsEntryAction } from '../store/action';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getUserData } from '../../../auth/utils';

const FunnelSettings = () => {
  // ** STATES
  const { id } = useParams();
  //const [data, setData] = useState(null);
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('Step');
  const history = useHistory();

  const user = getUserData();

  // ** DATA VARIABLES
  const store = useSelector((state) => {
    return {
      ...state.formEditor
    };
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (store.form._id === '') {
      dispatch(getFormDataAction(id));

      dispatch(getFormsEntryAction(id));
    }
  }, [dispatch]);

  const handleBackButtonClick = () => {
    history.goBack(); // Go back to the previous page
  };

  return (
    <>
      <Row style={{ width: '100%', margin: '0px', padding: '0px', height: 0 }}>
        <Col md={11} className="invoice-child-header-wrapper">
          <Breadcrumbs
            breadCrumbTitle="Business Tools"
            breadCrumbParent="Forms & Funnels"
            breadCrumbActive={title}
          />
        </Col>
        <Col md={1} style={{paddingRight: 0, textAlign:'end'}}>
          <Button onClick={handleBackButtonClick} className="btn-sm" outline color="primary">
            Back
          </Button>
        </Col>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <Nav pills className="mb-2">
            <NavItem>
              <NavLink
                active={active === '1'}
                onClick={() => {
                  setActive('1');
                  setTitle('Step');
                }}
              >
                <FiSettings className="font-medium-1 me-50" />
                <span className="fs-6">STEP</span>
              </NavLink>
            </NavItem>
              {store?.form?.isTemplate===true ? null : <>
                <NavItem>
              <NavLink
                active={active === '2'}
                onClick={() => {
                  setActive('2');
                  setTitle('Contact');
                }}
              >
                <GiRank2 className="font-medium-1 me-50" />
                <span className="fs-6">CONTACT</span>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                active={active === '3'}
                onClick={() => {
                  setActive('3');
                  setTitle('Sales');
                }}
              >
                <BsUiChecks className="font-medium-1 me-50" />
                <span className="fs-6">SALES</span>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                active={active === '4'}
                onClick={() => {
                  setActive('4');
                  setTitle('Automations');
                }}
              >
                <BsListCheck className="font-medium-1 me-50" />
                <span className="fs-6">AUTOMATIONS</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '5'}
                onClick={() => {
                  setActive('5');
                  setTitle('Settings');
                }}
              >
                <MdOutlineNotifications className="font-medium-1 me-50" />
                <span className="fs-6">SETTINGS</span>
              </NavLink>
            </NavItem>
              </>}
           
          </Nav>
          {store?.form?.id !== '' && (
            <TabContent activeTab={active}>
              <TabPane tabId="1">
                <FormStep dispatch={dispatch} store={store} />
              </TabPane>
              <TabPane tabId="2">
                <Contact dispatch={dispatch} store={store} />
              </TabPane>
              <TabPane tabId="3">
                <Sales dispatch={dispatch} store={store} />
              </TabPane>
              <TabPane tabId="4">
                <Automation />
              </TabPane>
              <TabPane tabId="5">
                <Settings store={store} dispatch={dispatch} />
              </TabPane>
            </TabContent>
          )}
        </Col>
      </Row>
    </>
  );
};
export default FunnelSettings;
