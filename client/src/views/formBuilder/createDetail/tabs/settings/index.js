// ** React Imports
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { Col, Nav, NavItem, Row, NavLink, TabContent, TabPane } from 'reactstrap';
// ** Custom
import Sidebar from './Sidebar';

// ** Styles

import Overview from './tabs/overview';
import Seo from './tabs/seo';
import Facebook from './tabs/facebook';

const Settings = ({store,dispatch}) => {
  // ** States
  const [activeTab, setActiveTab] = useState('1');

  // ** Toggle Compose Function

  // ** Vars
  const params = useParams();

  // ** UseEffect: GET initial data on Mount

  return (
    <>
      <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <div className="tasks-border">
            <Sidebar active={activeTab} setActive={setActiveTab} store={store}/>
            <div className="tasks-area" style={{ maxWidth: '100%', width: '100%' }}>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Overview store={store} dispatch={dispatch}/>
                </TabPane>
                <TabPane tabId="2">
                  <Seo store={store} dispatch={dispatch}/>
                </TabPane>
                {/* <TabPane tabId="3">
                  <Facebook />
                </TabPane> */}
              </TabContent>
            </div>
          </div>
        </Col>
      </Row>
    </>
    // <div className="overflow-hidden email-application">
    //   <div className="content-overlay"></div>
    //   <div className="container-xxl p-0 animate__animated animate__fadeIn">
    //     <Fragment>
    //       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
    //     </Fragment>
    //   </div>
    // </div>

    // <Nav tabs>
    //             <NavItem>
    //               <NavLink active={activeTab === '1'} onClick={() => setActiveTab('1')}>
    //                 <FiSettings className="font-medium-1 me-50" />
    //                 <span className="fs-6">OVERVIEW</span>
    //               </NavLink>
    //             </NavItem>
    //             <NavItem>
    //               <NavLink active={activeTab === '2'} onClick={() => setActiveTab('2')}>
    //                 <GiRank2 className="font-medium-1 me-50" />
    //                 <span className="fs-6">SEO</span>
    //               </NavLink>
    //             </NavItem>
    //             <NavItem>
    //               <NavLink active={activeTab === '3'} onClick={() => setActiveTab('3')}>
    //                 <BsUiChecks className="font-medium-1 me-50" />
    //                 <span className="fs-6">FACEBOOK PIXEL</span>
    //               </NavLink>
    //             </NavItem>
    //           </Nav>
  );
};

export default Settings;
