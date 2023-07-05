import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Col, Row } from 'reactstrap'
import OrgInfoCard from '../admin/components/OrgInfoCard';
import SendUserSignupModal from '../SendUserSignupModal'





export default function UserView({organization}) {
  // ** STATES
  const [active, setActive] = useState('1');
  const [openSendUsers,setOpenSendUsers] = useState(false)


  const toggleTabs = (tab)=>setActive(tab);
  const toggleSendRecipients =()=>{setOpenSendUsers(!openSendUsers)}
  // ** DATA FETCHING
  const dispatch = useDispatch()


  return (
    <div className="app-user-view w-100">
      <Row>
        {organization && organization !== null && (
          <>
            <Col xl="4" lg="5">
              <OrgInfoCard selectedOrg={organization} toggleSendRecipients={toggleSendRecipients}/>
              {/* <OrgStatus cols={{ md: '6', sm: '6', xs: '12' }} /> */}
            </Col>
            <Col xl="8" lg="7">
              
            </Col>
          </>
        )}
      </Row>
      <SendUserSignupModal open={openSendUsers} toggle={toggleSendRecipients}/>
    </div>
  )
}
