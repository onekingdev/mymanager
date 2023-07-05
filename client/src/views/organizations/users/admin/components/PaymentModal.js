import React, { useState } from 'react'

import { Card, CardBody, Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

export default function PaymentModal({open,toggle,plan}) {
    const [active,setActive] = useState('monthly')

  return (
    <Modal isOpen={open} toggle={toggle}>
        <ModalHeader>Pay to use plan</ModalHeader>
        <ModalBody>
            <Nav pills>
                <NavItem active={active==='monthly'}>
                    <NavLink onClick={()=>setActive('monthly')} active={active==='monthly'}>{plan.pricePerMonth} $/Month</NavLink>
                </NavItem>
                <NavItem active={active==='yearly'}>
                    <NavLink onClick={()=>setActive('yearly')} active={active==='yearly'}>{plan.pricePerYear} $/Year</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={active}>
                <TabPane tabId='monthly'>
                    <Card>
                        <CardBody>
                            Pay per month
                        </CardBody>
                    </Card>
                </TabPane>
                <TabPane tabId='yearly'>
                    <Card>
                        <CardBody>
                            Pay per year
                        </CardBody>
                    </Card>
                </TabPane>
            </TabContent>
        </ModalBody>
    </Modal>
  )
}
