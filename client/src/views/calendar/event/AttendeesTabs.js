// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Icons Imports
import { CheckCircle, CheckSquare } from 'react-feather';

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { useSelector } from 'react-redux';
// ** Components
import GuestTable from './guests/GuestTable';
import Attendance from './attendance';
import PromotionGuestTable from './guests/PromotionGuestTable';
import PromotionAttendanceTable from './attendance/PromotionAttendanceTable';

const AttendeesTabs = (props) => {
  const { eventInfo } = props;
  // ** State
  const [active, setActive] = useState('1');
  // ** Promotion events
  const [inviteeList, setInviteeList] = useState([]);
  // ** current progression for this event
  const [curProgression, setCurProgression] = useState({});
  const [promoteSingle, setPromoteSingle] = useState({});
  // ** Redux Store
  const contactRankList = useSelector((state) => state?.totalContacts?.contactRankList);

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              toggle('1');
            }}
          >
            <CheckCircle size={14} />
            <span className="align-middle">Invited</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              toggle('2');
            }}
          >
            <CheckSquare size={14} />
            <span className="align-middle">Attended</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        {eventInfo.eventCategory == 'promotion' ? (
          <>
            {' '}
            <TabPane tabId="1">
              <PromotionGuestTable
                eventInfo={eventInfo}
                active={active}
                inviteeList={inviteeList}
                setInviteeList={setInviteeList}
                contactRankList={contactRankList}
                curProgression={curProgression}
                setCurProgression={setCurProgression}
                promoteSingle={promoteSingle}
                setPromoteSingle={setPromoteSingle}
              />
            </TabPane>
            <TabPane tabId="2">
              <PromotionAttendanceTable
                eventInfo={eventInfo}
                active={active}
                inviteeList={inviteeList}
                setInviteeList={setInviteeList}
                contactRankList={contactRankList}
                promoteSingle={promoteSingle}
                curProgression={curProgression}
              />
            </TabPane>
          </>
        ) : (
          <>
            {' '}
            <TabPane tabId="1">
              <GuestTable eventInfo={eventInfo} active={active} />
            </TabPane>
            <TabPane tabId="2">
              <Attendance eventInfo={eventInfo} active={active} />
            </TabPane>
          </>
        )}
      </TabContent>
    </Fragment>
  );
};
export default AttendeesTabs;
