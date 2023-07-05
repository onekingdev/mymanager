// ** React Imports
import { Fragment } from 'react';

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

// ** Icons Imports
import { User, Bookmark, Archive } from 'react-feather';
import { VscNotebook } from 'react-icons/vsc';
import { GiRank2 } from 'react-icons/gi';
import { AiOutlineSafetyCertificate, AiOutlineFilePdf, AiOutlineHistory } from 'react-icons/ai';

// ** User Components
import OverviewTab from './tabs/overview';
import InvoiceTab from './tabs/InvoiceTab';
import RankTab from './tabs/RankTab';
import BillingPlanTab from './tabs/BillingTab';
import UserProjectsList from './tabs/UserProjectsList';
import FilesTab from './tabs/FilesTab';
import OtherTab from './tabs/OtherTab';
import { useSelector } from 'react-redux';
import Activity from './tabs/Activity';

// ** Employee Tab Components
import EmployeMent from './tabs/EmployeMent';
import WorkHistoryTab from './tabs/WorkHistoryTab';
import Progression from './tabs/Progression';
// import FilesTab from './tabs/FilesTab';

const UserTabs = ({ active, toggleTab, selectedUser, notes, mode, tasks,dispatch }) => {
  const props = {
    selectedUser
  };
  const renderNavItems = () => {
    switch (mode) {
      case '1':
        return (
          <Nav pills className="mb-2">
            <NavItem>
              <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                <AiOutlineHistory className="font-medium-3 me-50" />
                <span className="fw-bold">Work History</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                <User className="font-medium-3 me-50" />
                <span className="fw-bold">Employment</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                <User className="font-medium-3 me-50" />
                <span className="fw-bold">Progression</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                <AiOutlineFilePdf className="font-medium-3 me-50" />
                <span className="fw-bold">Files</span>
              </NavLink>
            </NavItem>
          </Nav>
        );
      default:
        return (
          <Nav pills className="mb-2">
            <NavItem>
              <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                <User className="font-medium-3 me-50" />
                <span className="fw-bold">Overview</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                <Bookmark className="font-medium-3 me-50" />
                <span className="fw-bold">Contracts</span>
              </NavLink>
            </NavItem>
            {/* <NavItem>
                <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                  <VscPackage className="font-medium-3 me-50" />
                  <span className="fw-bold">Subscription</span>
                </NavLink>
              </NavItem> */}
            <NavItem>
              <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
                <GiRank2 className="font-medium-3 me-50" />
                <span className="fw-bold">Progression</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={active === '6'} onClick={() => toggleTab('6')}>
                <AiOutlineSafetyCertificate className="font-medium-3 me-50" />
                <span className="fw-bold">Billing</span>
              </NavLink>
            </NavItem>
            {/* <NavItem>
                <NavLink active={active === '7'} onClick={() => toggleTab('7')}>
                  <VscNotebook className="font-medium-3 me-50" />
                  <span className="fw-bold">Invoice</span>
                </NavLink>
              </NavItem> */}
            <NavItem>
              <NavLink active={active === '8'} onClick={() => toggleTab('8')}>
                <AiOutlineFilePdf className="font-medium-3 me-50" />
                <span className="fw-bold">Files</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={active === '9'} onClick={() => toggleTab('9')}>
                <Archive className="font-medium-3 me-50" />
                <span className="fw-bold">Activity</span>
              </NavLink>
            </NavItem>
            {/* <NavItem>
                <NavLink active={active === '10'} onClick={() => toggleTab('10')}>
                  <Archive className="font-medium-3 me-50" />
                  <span className="fw-bold">Notes</span>
                </NavLink>
              </NavItem> */}
          </Nav>
        );
    }
  };

  const renderTabContents = () => {
    switch (mode) {
      // case '0':
      //   return (
      //     <TabContent activeTab={active}>
      //       <TabPane tabId="1">
      //         <OverviewTab />
      //       </TabPane>
      //       <TabPane tabId="2">
      //         <UserProjectsList />
      //       </TabPane>
      //       {/* <TabPane tabId="3">
      //     <BillingPlanTab />
      //   </TabPane> */}
      //       <TabPane tabId="5">
      //         <RankTab selectedUser={selectedUser} />
      //       </TabPane>
      //       <TabPane tabId="6">
      //         <BillingPlanTab selectedUser={selectedUser} />
      //       </TabPane>
      //       <TabPane tabId="7">
      //         <InvoiceTab />
      //       </TabPane>
      //       <TabPane tabId="8">
      //         <OtherTab selectedUser={selectedUser} />
      //       </TabPane>
      //       <TabPane tabId="9">
      //         <Activity selectedUser={selectedUser} notes={notes} />
      //       </TabPane>
      //     </TabContent>
      //   );
      case '1':
        return (
          <TabContent activeTab={active}>
            {/* <TabPane tabId="1">
              <OverviewTab />
            </TabPane> */}
            <TabPane tabId="1">
              <WorkHistoryTab {...props} />
            </TabPane>
            <TabPane tabId="2">
              <EmployeMent selectedEmployee={props.selectedEmployee} />
            </TabPane>
            <TabPane tabId="3">
              <Progression {...props}   />
            </TabPane>
            <TabPane tabId="4">
              <FilesTab {...props} tasks={tasks} selectedEmployee={selectedUser} />
            </TabPane>
            {/* <TabPane tabId="5">
          <Notes {...props} />
        </TabPane> */}
          </TabContent>
        );
      default:
        return (
          <TabContent activeTab={active}>
            <TabPane tabId="1">
              <OverviewTab />
            </TabPane>
            <TabPane tabId="2">
              <UserProjectsList dispatch={dispatch}/>
            </TabPane>
            {/* <TabPane tabId="3">
          <BillingPlanTab />
        </TabPane> */}
            <TabPane tabId="5">
              <RankTab selectedUser={selectedUser} />
            </TabPane>
            <TabPane tabId="6">
              <BillingPlanTab selectedUser={selectedUser} />
            </TabPane>
            <TabPane tabId="7">
              <InvoiceTab />
            </TabPane>
            <TabPane tabId="8">
              <OtherTab selectedUser={selectedUser} />
            </TabPane>
            <TabPane tabId="9">
              <Activity selectedUser={selectedUser} notes={notes} />
            </TabPane>
          </TabContent>
        );
    }
  };
  return (
    <Fragment>
      {renderNavItems()}
      {renderTabContents()}
    </Fragment>
  );
};
export default UserTabs;
