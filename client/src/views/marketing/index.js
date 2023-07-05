// ** React Imports
import { Fragment, useState, useEffect, useContext } from 'react';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
// ** Icons Imports

import { BsListCheck } from 'react-icons/bs';

import { Col, Row } from 'reactstrap';
import { Radio, Facebook, MessageCircle, MessageSquare, Mail } from 'react-feather';
// ** User Components
// Todo: move tab folders to tabs folder
import Email from './email';
import Text from './text/Text';
import Chat from './chat';
// import Ticket from '@src/views/apps/ticket';
import Ticket from './ticket';

import Automation from './automation';
import Breadcrumbs from '@components/breadcrumbs';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

// ** Store & Actions

// ** Styles
import '@src/assets/styles/tasks.scss';
import '@src/assets/styles/dark-layout.scss';
import '../../../src/assets/styles/marketing.scss';
import { AbilityContext } from '../../utility/context/Can';

const Marketing = () => {
  const params = useParams();

  const ability = useContext(AbilityContext);
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('Email');
  useEffect(() => {
    if (params.section) {
      if (params.section === 'email' && ability.can('read', 'marketing/email')) {
        setActive('1');
        setTitle('Email');
      }
      if (params.section === 'text' && ability.can('read', 'marketing/text')) {
        setActive('2');
        setTitle('Text');
      }
      if (params.section === 'chat' && ability.can('read', 'marketing/chat')) {
        setActive('3');
        setTitle('Chat');
      }
      if (
        params.section === 'ticket' ||
        (params.section === 'tag' && ability.can('read', 'marketing/ticket'))
      ) {
        setActive('4');
        setTitle('Ticket');
      }
      if (params.section === 'automation' && ability.can('read', 'marketing/automation')) {
        setActive('5');
        setTitle('Automation');
      }
    }
  }, [params]);

  return (
    <>
      <Row>
        <Breadcrumbs
          breadCrumbTitle={'Marketing'}
          breadCrumbParent="Marketing"
          breadCrumbActive={title}
        />
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          <Fragment>
            <Nav pills className="mb-2 ">
              {ability.can('read', 'marketing/email') && (
                <NavItem>
                  <NavLink active={active === '1'} className="marketing-tab">
                    <Link to="/marketing/email">
                      <Mail className="font-medium-1 me-50" />
                      <span className="fs-6">Email</span>
                    </Link>
                  </NavLink>
                </NavItem>
              )}

              {ability.can('read', 'marketing/text') && (
                <NavItem>
                  <NavLink active={active === '2'} className="marketing-tab">
                    <Link to="/marketing/text">
                      <MessageCircle className="font-medium-1 me-50" />
                      <span className="fs-6">Text</span>
                    </Link>
                  </NavLink>
                </NavItem>
              )}
              {ability.can('read', 'marketing/chat') && (
                <NavItem>
                  <NavLink active={active === '3'} className="marketing-tab">
                    <Link to="/marketing/chat">
                      <MessageCircle className="font-medium-1 me-50" />
                      <span className="fs-6">Chat</span>
                    </Link>
                  </NavLink>
                </NavItem>
              )}
              {ability.can('read', 'marketing/ticket') && (
                <NavItem>
                  <NavLink active={active === '4'} className="marketing-tab">
                    <Link to="/marketing/ticket/open">
                      <MessageCircle className="font-medium-1 me-50" />
                      <span className="fs-6">Ticket</span>
                    </Link>
                  </NavLink>
                </NavItem>
              )}

              {ability.can('read', 'marketing/automation') && (
                <NavItem>
                  <NavLink active={active === '5'} className="marketing-tab">
                    <Link to="/marketing/automation">
                      <BsListCheck className="font-medium-1 me-50" />
                      <span className="fs-6">Automation</span>
                    </Link>
                  </NavLink>
                </NavItem>
              )}
            </Nav>

            <TabContent activeTab={active} style={{ height: '77.5vh' }}>
              {ability.can('read', 'marketing/email') && (
                <TabPane tabId="1">
                  <div className="overflow-hidden email-application">
                    <div className="content-overlay"></div>
                    <div
                      className="content-area-wrapper border p-0 animate__animated animate__fadeIn bg-white"
                      style={{ height: '77.5vh' }}
                    >
                      <Email />
                    </div>
                  </div>
                </TabPane>
              )}
              {ability.can('read', 'marketing/text') && (
                <TabPane tabId="2">
                  <Text />
                </TabPane>
              )}
              {ability.can('read', 'marketing/chat') && (
                <TabPane tabId="3">
                  <div className=" overflow-hidden chat-application">
                    <div className="content-overlay"></div>
                    <div
                      className="content-area-wrapper animate__animated animate__fadeIn"
                      style={{ height: '77.5vh' }}
                    >
                      <Chat />
                    </div>
                  </div>
                </TabPane>
              )}
              {ability.can('read', 'marketing/ticket') && (
                <TabPane tabId="4">
                  <div className="content-overlay"></div>
                  <div
                    className="content-area-wrapper animate__animated animate__fadeIn"
                    style={{ height: '77.5vh' }}
                  >
                    <Ticket />
                  </div>
                </TabPane>
              )}
              {ability.can('read', 'marketing/automation') && (
                <TabPane tabId="5">
                  <div className=" overflow-hidden email-application">
                    <div className="content-overlay"></div>

                    <div
                      className="content-area-wrapper animate__animated animate__fadeIn"
                      style={{ height: '77.5vh' }}
                    >
                      <Automation />
                    </div>
                  </div>
                </TabPane>
              )}
            </TabContent>
          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default Marketing;
