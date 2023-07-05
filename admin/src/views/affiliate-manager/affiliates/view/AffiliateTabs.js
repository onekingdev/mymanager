import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { TbAffiliate, TbFileDollar } from "react-icons/tb";

import { Fragment } from "react";
import OverviewTab from "./tabs/OverviewTab/index";
import ReferencesTab from "./tabs/ReferencesTab/index";
import TransactionsTab from "./tabs/TransactionsTab/index";
import { User } from "react-feather";

const AffiliateTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Overview</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <TbAffiliate className="font-medium-3 me-50" />
            <span className="fw-bold">References</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <TbFileDollar className="font-medium-3 me-50" />
            <span className="fw-bold">Transaction</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <OverviewTab />
        </TabPane>
        <TabPane tabId="2">
          <ReferencesTab />
        </TabPane>
        <TabPane tabId="3">
          <TransactionsTab />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};

export default AffiliateTabs;
