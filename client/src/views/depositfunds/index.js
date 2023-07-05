import React, { memo, lazy, Fragment, useState, useEffect } from 'react';
// ** Reactstrap Imports
// ** Third Party Components
import classnames from 'classnames';

import { Row, Col } from 'reactstrap';
// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';
// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
const BuyNum = lazy(() => import('./BuyNum'));
const Sms = lazy(() => import('./Sms'));
const Subscription = lazy(() => import('./Subscription'));
const Deposit = lazy(() => import('./Deposit'));
const DepositFundsInv = lazy(() => import('./deposit/invoice/list'));

const VoiceCallHistory = lazy(() => import('./ShowVoiceCallHistory'));
const History = lazy(() => import('./History'));
import Sidebar from './Sidebar';

import { GetBalanceInfo } from './store';

// ** Styles
import '@styles/react/apps/app-email.scss';

function DepositFunds() {
  const dispatch = useDispatch();
  let { userData } = useSelector((state) => state.auth);
  let { balanceInfo } = useSelector((state) => state.deposit);

  // ** States
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [selectedNum, setSelectedNum] = useState('');
  // ** Toggle Compose Function
  const toggleCompose = () => setComposeOpen(!composeOpen);

  // ** Store Variables

  const store = useSelector((state) => state.email);

  useEffect(() => {
    dispatch(GetBalanceInfo(userData?.id));
  }, []);
  // active items
  const [activeItem, setActiveItem] = useState('buy_number');
  return (
    <Fragment>
     

      <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="My Number"
              icon={<User size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{selectedNum ? selectedNum : 'N/A'}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="Voice Minutes Remaining"
              icon={<UserPlus size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {balanceInfo?.data?.voiceMinutes ? balanceInfo?.data?.voiceMinutes : 0}
                </h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="SMS Credits Remaining"
              icon={<UserCheck size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {balanceInfo?.data?.smsCredits ? balanceInfo?.data?.smsCredits : 0}
                </h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="Wallet Funds Remaining"
              icon={<UserX size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  $ {balanceInfo?.data?.wallet ? balanceInfo?.data?.wallet.toFixed(2) : 0}
                </h3>
              }
            />
          </Col>
        </Row>
        {/* <Table /> */}
      </div>
      <div className="email-application">
        <div className="content-area-wrapper">
          <Sidebar
            store={store}
            dispatch={dispatch}
            // getMails={getMails}
            sidebarOpen={sidebarOpen}
            toggleCompose={toggleCompose}
            setSidebarOpen={setSidebarOpen}
            // resetSelectedMail={resetSelectedMail}
            setActiveItem={setActiveItem}
            activeItem={activeItem}
          />
          <div className="content-right">
            <div className="content-body">
              {activeItem === 'sms' ? (
                <Sms />
              ) : activeItem === 'wallet' ? (
                <Deposit />
              ) : activeItem === 'buy_number' ? (
                <BuyNum selectedNum={selectedNum} setSelectedNum={setSelectedNum} />
              ) : activeItem === 'deposit' ? (
                <Subscription />
              ) : activeItem === 'voice' ? (
                <VoiceCallHistory />
              ) : activeItem === 'history' ? (
                <History />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default memo(DepositFunds);
{
  /* <DepositFundsInv /> */
}
{
  /* <Row>
                <Col sm="12" md="3">
                    <Deposit />
                </Col>
                <Col sm="12" md="3">
                    <Subscription />
                </Col>
                <Col sm="12" md="3">
                    <Sms />
                </Col>
                <Col sm="12" md="3">
                    <BuyNum />
                </Col>
            </Row> */
}
