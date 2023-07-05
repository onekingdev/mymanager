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
// Todo: move tab folders to tabs folder
import Invoice from '@src/views/finance/invoice/list';
import Income from '@src/views/finance/income';
import Expense from '@src/views/finance/expense';
import ProfitAndLoss from '@src/views/finance/pnl';

import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaceApi, getSelectedWorkspaceData, addWorkspace } from '../apps/workspace/store';
import { fetchLabelsApi } from '../tasks/label-management/store';
import Breadcrumbs from '@components/breadcrumbs';
// ** Styles
import '@src/assets/styles/tasks.scss';
import '@src/assets/styles/dark-layout.scss';
import CalendarComponent from '../calendar';
import { IncomeFetchAction, getFinanceCategories } from './store/actions';
import { AbilityContext } from '../../utility/context/Can';

const Finanace = () => {
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('Invoice');

  const ability = useContext(AbilityContext);

  const dispatch = useDispatch();

  useEffect(() => {
    if (ability.can('read', 'finance/invoice')) {
      setActive('1');
      setTitle('Invoice');
    } else if (ability.can('read', 'finance/income')) {
      setActive('2');
      setTitle('Income');
    } else if (ability.can('read', 'finance/expenses')) {
      setActive('3');
      setTitle('Expenses');
    } else if (ability.can('read', 'finance/profitloss')) {
      setActive('4');
      setTitle('Profit & Loss');
    }
  }, []);

  useEffect(() => {
    dispatch(getFinanceCategories());
    dispatch(IncomeFetchAction());
  }, [dispatch]);

  return (
    <>
      <Row>
        <Breadcrumbs
          breadCrumbTitle={'Finance'}
          breadCrumbParent="Finance"
          breadCrumbActive={title}
        />{' '}
        <Col xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          {/* <Col xl="12"> */}
          <Fragment>
            <Nav pills className="mb-2 tab-header">
              {ability.can('read', 'finance/invoice') && (
                <NavItem>
                  <NavLink
                    active={active === '1'}
                    onClick={() => {
                      setActive('1');
                      setTitle('Invoice');
                    }}
                  >
                    <FiSettings className="font-medium-1 me-50 " />
                    <span className="fs-6">Invoice</span>
                  </NavLink>
                </NavItem>
              )}

              {ability.can('read', 'finance/income') && (
                <NavItem>
                  <NavLink
                    active={active === '2'}
                    onClick={() => {
                      setActive('2');
                      setTitle('Income');
                    }}
                  >
                    <GiRank2 className="font-medium-1 me-50" />
                    <span className="fs-6">Income</span>
                  </NavLink>
                </NavItem>
              )}

              {ability.can('read', 'finance/expenses') && (
                <NavItem>
                  <NavLink
                    active={active === '3'}
                    onClick={() => {
                      setActive('3');
                      setTitle('Expense');
                    }}
                  >
                    <BsListCheck className="font-medium-1 me-50" />
                    <span className="fs-6">Expense</span>
                  </NavLink>
                </NavItem>
              )}
              {ability.can('read', 'finance/profitloss') && (
                <NavItem>
                  <NavLink
                    active={active === '4'}
                    onClick={() => {
                      setActive('4');
                      setTitle('Profit & Loss');
                    }}
                  >
                    <BsListCheck className="font-medium-1 me-50" />
                    <span className="fs-6">Profit & Loss</span>
                  </NavLink>
                </NavItem>
              )}
            </Nav>

            <TabContent className="w-100" activeTab={active}>
              {ability.can('read', 'finance/invoice') && (
                <TabPane tabId="1">
                  <Invoice />
                </TabPane>
              )}
              {ability.can('read', 'finance/income') && (
                <TabPane tabId="2">
                  <Income />
                </TabPane>
              )}
              {ability.can('read', 'finance/expenses') && (
                <TabPane tabId="3">
                  <Expense />
                </TabPane>
              )}
              {ability.can('read', 'finance/profitloss') && (
                <TabPane tabId="4">
                  <ProfitAndLoss />
                </TabPane>
              )}
            </TabContent>
          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default Finanace;
