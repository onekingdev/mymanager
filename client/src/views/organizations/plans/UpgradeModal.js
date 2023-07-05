import React from 'react'
import { Button, Card, CardBody, CardHeader, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

export default function UpgradeModal({open,toggle}) {
  return (
    <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Upgrade Your plan</ModalHeader>
        <ModalBody>
            <h6>Upgrade your plan for more flexability</h6>
            <h5>For 297 $/Month</h5>
            <div>
                <h4 className='text-center'>Select Payment Type</h4>
                <Card className='border'>
                    <CardHeader>Paypal</CardHeader>
                </Card>
                <Card className='border'>
                    <CardHeader>Credit Card</CardHeader>
                </Card>
            </div>
            <ModalFooter>
                <div className='d-flex justify-content-end'>
                    <Button color='primary'>
                        Upgrade
                    </Button>
                </div>
            </ModalFooter>
        </ModalBody>
    </Modal>
  )
}
