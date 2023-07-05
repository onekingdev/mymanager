import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import SendUserSignupModal from '../SendUserSignupModal';

import OrgInfoCard from './components/OrgInfoCard';
import OrgStatus from './components/OrgStatus';
import OrgTabs from './components/OrgTabs';
import { getOrgByIdAction } from '../../store/action';

export default function AdminView({ organization }) {
  // ** STATES
  const [active, setActive] = useState('1');
  const [openSendUsers, setOpenSendUsers] = useState(false);

  const [org,setOrg] = useState(organization)

  const toggleTabs = (tab) => setActive(tab);
  const toggleSendRecipients = () => {
    setOpenSendUsers(!openSendUsers);
  };
  // ** DATA FETCHING
  const dispatch = useDispatch();

  useEffect(()=>{
    if(organization){
      dispatch(getOrgByIdAction(organization._id)).then(x=>{
        setOrg(x[0])
      })
    }
  },[organization])

  return (
    <div className="app-user-view w-100">
      <Row>
        {org && org !== null && (
          <>
            <Col xl="4" lg="5">
              <OrgInfoCard selectedOrg={org} toggleSendRecipients={toggleSendRecipients} />
              {/* <OrgStatus cols={{ md: '6', sm: '6', xs: '12' }} /> */}
            </Col>
            <Col xl="8" lg="7">
              <OrgTabs
                selectedOrg={org}
                active={active}
                toggleTab={toggleTabs}
                dispatch={dispatch}
              />
            </Col>
          </>
        )}
      </Row>
      <SendUserSignupModal
        open={openSendUsers}
        toggle={toggleSendRecipients}
        orgId={org._id}
        dispatch={dispatch}
      />
    </div>
  );
}
