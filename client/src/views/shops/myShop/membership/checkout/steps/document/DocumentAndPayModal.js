import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledButtonDropdown,
  UncontrolledDropdown
} from 'reactstrap';

import DocumentPreview from '../../../../../../documents/preview/DocumentPreview';
import { Circle } from 'react-feather';
import Payment from './payment/Payment';
import DocumentPreviewModule from '../../../../../../documents/recipientPreview/DocumentPreviewModule';
import { addinvoicedata } from '../../../../../../../requests/invoice/invoice';

export default function DocumentAndPayModal({
  open,
  toggle,
  dispatch,
  store,
  buyer,
  membership,
  document,
  cart
}) {
  const [payment, setPayment] = useState();
  const { mutate } = addinvoicedata();
  //  const [cart, setCart] = useState();
  const [recipient, setRecipient] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = window.location.href.split(window.location.origin)[1].split('/')[1];
  const handleOpenDropDown = () => setDropdownOpen((prevState) => !prevState);
  const handleChange = (item) => {
    setRecipient(item);
  };
  const handleSendInvoice = () => {
    let payload = {
      customerId:buyer._id,
      date:new Date(),
      dueDate:new Date().setDate(new Date().getDate() + 1),
      discount:0,
      tax:0,
      note:'Generate automatically on activation of your membership',
      items:[{ rate: membership.total, quantity: 1, itemId: membership._id, name:membership.name }],
      bank:{},
      companyName:store.shop.name,
      totalAmount:membership.total,
      payNow:membership.regFee + membership.downPayment,
      itemType:'membership',
      sendInvoice:true,
      recipient:buyer.email,
      isMembership:true
    }
    mutate(payload);
    if(cart?.items?.length > 0){
      console.log(cart)
      let prodTemp = [];
      let total = 0;
      for (const p of cart.items) {
        let x = {
          itemId: p.itemId._id,
          quantity: p.count,
          rate: p.itemId.price,
          name: p.itemId.name
        };
        total = total + (x.rate*x.quantity);
        prodTemp.push(x);
      }
      payload = {
        customerId:buyer._id,
        date:new Date(),
        dueDate:new Date().setDate(new Date().getDate() + 1),
        discount:0,
        tax:0,
        note:'Generate automatically on purchase of products',
        items:prodTemp,
        bank:{},
        companyName:store.shop.name,
        totalAmount:total,
        payNow:total,
        itemType:'product',
        sendInvoice:true,
        recipient:buyer.email,
        isMembership:false
      }
      mutate(payload);
    }
  };

  useEffect(() => {
    if (document) {
      setRecipient(document.recipients[0]);
    }
  }, [document]);

  return (
    <Modal toggle={toggle} isOpen={open} fullscreen>
      <ModalHeader toggle={toggle}>Sign & Pay</ModalHeader>
      <ModalBody>
        <div>
          <div className="d-flex justify-content-end">
            {document?.recipients && (
              <UncontrolledButtonDropdown
                size="sm"
                isOpen={dropdownOpen}
                toggle={handleOpenDropDown}
              >
                <DropdownToggle
                  outline
                  color="primary"
                  caret
                  className="w-100"
                  style={{ borderRadius: 'none' }}
                >
                  {recipient && (
                    <>
                      <Circle color={recipient.color} />
                      <span className="px-2"> {recipient.email}</span>
                    </>
                  )}
                </DropdownToggle>
                <DropdownMenu>
                  {document?.recipients && (
                    <>
                      {location === 'ecommerce' ? (
                        document?.recipients.map((item, idx) => (
                          <DropdownItem
                            key={idx}
                            className="w-100"
                            onClick={() => handleChange(item)}
                          >
                            <Circle color={item.color} /> <span className="px-2">{item.email}</span>
                          </DropdownItem>
                        ))
                      ) : (
                        <DropdownItem
                        
                          className="w-100"
                          onClick={() => handleChange(document.recipients[0])}
                        >
                          <Circle color={document.recipients[0].color} />{' '}
                          <span className="px-2">{document.recipients[0].email}</span>
                        </DropdownItem>
                      )}
                    </>
                  )}
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            )}
          </div>
        </div>
        <Row>
          <Col md="8">
            {/* load contract */}
            {/* contract for  */}
            <DocumentPreviewModule recipient={recipient} userMembership={membership} />
          </Col>
          <Col md="4">
            {/* load payment for the first payment */}
            <Payment
              dispatch={dispatch}
              store={store}
              buyer={buyer}
              cart={cart}
              payment={payment}
              setPayment={setPayment}
              type="membership"
              membership={membership}
            />
            {location === 'ecommerce' && (
              <div>
                <p>You can send invoice for the buyer to pay </p>
                <Button color="primary" onClick={handleSendInvoice}>
                  Send Invoice to pay
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}
