import React from 'react'
import { Col, Row } from 'reactstrap'
import MembershipCard from './components/MembershipCard'

export default function ShopMembership({memberships,store,dispatch}) {
  return (
    <>
    <Row className='ecommerce-application'>
      {memberships?.map((x,idx) =>{
        return (
          <Col md="4" key={idx}>
            <MembershipCard item={x} store={store} dispatch={dispatch}/>
          </Col>
        )
      })}
    </Row>
    </>
  )
}
