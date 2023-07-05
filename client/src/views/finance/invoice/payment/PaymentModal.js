import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';

import CheckoutModal from './CheckoutModal';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { addPaymentToInvoiceAction, createStripePaymentIntentAction, getStripeConfigAction } from '../store/action';

export default function PaymentModal({ open, toggle, invoice, dispatch }) {
  const [activeTab, setActiveTab] = useState('cash');
  const [checkNo, setCheckNo] = useState();
  const [stripePromise, setStripePromise] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const handleCashPayment = () => {
    let payload;
    if (activeTab === 'cash') {
      payload = {
        payments: [
          ...invoice.payments,
          {
            amount: invoice.payNow,
            status: 'paid',
            currency: 'usd',
            paymentMethod: 'cash',
            date: new Date()
          }
        ],
        paidAmount: (invoice?.paidAmount || 0) + invoice.payNow,
        payNow:
          invoice.totalAmount -
          invoice.discount +
          invoice.tax -
          (invoice?.paidAmount || 0) -
          invoice.payNow
      };
      if (payload.payNow === 0) {
        payload = { ...payload, status: 'PAID' };
      }
      dispatch(addPaymentToInvoiceAction(invoice._id, payload));
    } else {
      payload = {
        payments: [
          ...invoice.payments,
          {
            amount: invoice.payNow,
            status: 'paid',
            currency: 'usd',
            paymentMethod: 'check',
            date: new Date(),
            checkNo: checkNo
          }
        ],
        paidAmount: (invoice?.paidAmount || 0) + invoice.payNow,
        payNow:
          invoice.totalAmount -
          invoice.discount +
          invoice.tax -
          (invoice?.paidAmount || 0) -
          invoice.payNow
      };
      if (payload.payNow === 0) {
        payload = { ...payload, status: 'PAID' };
      }
      dispatch(addPaymentToInvoiceAction(invoice._id, payload));
    }
    toggle()
  };

  useEffect(() => {
    if (invoice) {
      let payload = { amount: invoice.payNow, currency: invoice.currency };
      dispatch(getStripeConfigAction({ type: 'invoice', id: invoice._id })).then((res) => {
        if (res.accountId) {
          setStripePromise(loadStripe(res.pk, { stripeAccount: res.accountId }));
          setAccountId(res.accountId);
          payload = { ...payload, accountId: res.accountId };
        } else {
          setStripePromise(loadStripe(res.pk));
        }
      });
      dispatch(createStripePaymentIntentAction(payload)).then((res) => {
        setClientSecret(res);
      });
    }
  }, [dispatch, invoice]);

  return (
    <Modal toggle={toggle} isOpen={open}>
      <ModalHeader toggle={toggle}>Pay Invoice</ModalHeader>
      <ModalBody>
        <Nav tabs>
          <NavItem>
            <NavLink active={activeTab === 'cash'} onClick={() => setActiveTab('cash')}>
              Cash
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={activeTab === 'check'} onClick={() => setActiveTab('check')}>
              Check
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={activeTab === 'card'} onClick={() => setActiveTab('card')}>
              Card
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="cash">
            <p>Paid by Cash</p>
            <Button color="primary" onClick={handleCashPayment}>
              Mark as paid
            </Button>
          </TabPane>
          <TabPane tabId="check">
            <Input
              type="text"
              placeholder="Check No."
              onChange={(e) => setCheckNo(e.target.value)}
            />
            <Button color="primary" onClick={handleCashPayment} className='mt-1'>
              Mark as paid
            </Button>
          </TabPane>
          <TabPane tabId="card">
            <div>
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutModal invoice={invoice} dispatch={dispatch} />
                </Elements>
              )}
            </div>
          </TabPane>
        </TabContent>
      </ModalBody>
    </Modal>
  );
}
