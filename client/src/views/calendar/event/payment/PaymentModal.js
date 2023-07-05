import React, { useEffect, useState } from 'react';

import {
  Button,
  NavLink,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  TabContent,
  TabPane
} from 'reactstrap';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CardCheckout from './CardCheckout';
import {
  createStripePaymentIntentAction,
  getStripeConfigAction
} from '../../../finance/invoice/store/action';
import { getEventInfo, replyToEvent } from '../store';
import { addClientProgressionAction } from '../../../contacts/store/actions';
import { toast } from 'react-toastify';
import { updateBulkPayment, updatePaymentAction } from '../store/actions';

export default function PaymentModal({
  open,
  toggle,
  dispatch,
  selectedRow,
  event,
  rows,
  isBulk,
  setEditableRows,
  setToggleClearRows,
  toggledClearRows
}) {
  const [tab, setTab] = useState('cash');
  const [checkNo, setCheckNo] = useState(null);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const handleCashPayment = () => {
    if (isBulk && isBulk === true) {
      if (rows && rows.length > 0) {
        let tmpIdArr = rows.map((row, index) => {
          return row.contactId ? row.contactId : row.contact._id;
        });
        const payload = {
          contacts: tmpIdArr,
          payment: {
            amount: event.ticketPrice * rows.length,
            currency: 'usd',
            status: 'paid',
            paymentMethod: tab,
            date: new Date(),
            checkNo: checkNo
          }
        };
        dispatch(updateBulkPayment(event._id, payload));
        if (event?.eventCategory === 'promotion') {
          handleSetBulkProgression(tmpIdArr);
        }
      }
    } else {
      
      const payload = {
        contactId: selectedRow?.contactId ? selectedRow.contactId : selectedRow.contact._id,
        email: selectedRow.email ? selectedRow.email : selectedRow.contact.email,
        payment: {
          amount: event.ticketPrice,
          currency: 'usd',
          status: 'paid',
          paymentMethod: tab,
          date: new Date(),
          checkNo: checkNo
        }
      };
      dispatch(updatePaymentAction(event._id, payload));
      if (event?.eventCategory === 'promotion') {
        handleSetProgression();
      }
    }

    toggle();
  };

  const handleSetProgression = () => {
    if (selectedRow?.nextRankName && selectedRow?.nextRankOrder != 0) {
      dispatch(
        replyToEvent({
          contactIdArr: [selectedRow?.contactId ? selectedRow.contactId : selectedRow.contact._id],
          paid: 'paid',
          eventId: event._id
        })
      );
      //let contactIds = data?.payload?.contactIds;
      dispatch(getEventInfo(event._id));
      toast.success('Successfully Updated');
    } else if (selectedRow?.currentRankName) {
      toast.error('There is no ranks available');
    } else {
      toast.error('Please select progression');
    }
  };

  const handleSetBulkProgression = (tmpIdArr) => {
    if (rows.length > 0) {
      dispatch(
        replyToEvent({
          contactIdArr: tmpIdArr,
          paid: 'paid',
          eventId: event._id
        })
      );
      dispatch(getEventInfo(event._id));
      toast.success('Successfully Updated');
      setToggleClearRows(!toggledClearRows);
      setEditableRows([]);
    } else {
      return;
    }
  };

  useEffect(() => {
    let payload = { amount: event.ticketPrice, currency: 'usd' };
    dispatch(getStripeConfigAction({ type: 'event', id: event._id })).then((res) => {
      if (res.accountId) {
        setStripePromise(loadStripe(res.pk, { stripeAccount: res.accountId }));
        payload = { ...payload, accountId: res.accountId };
      } else {
        setStripePromise(loadStripe(res.pk));
      }
    });
    dispatch(createStripePaymentIntentAction(payload)).then((res) => {
      setClientSecret(res);
    });
  }, [event, selectedRow]);

  return (
    <>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Pay Now</ModalHeader>
        <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink active={tab === 'cash'} onClick={() => setTab('cash')}>
                Cash
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={tab === 'check'} onClick={() => setTab('check')}>
                Check
              </NavLink>
            </NavItem>
            {!isBulk && (
              <NavItem>
                <NavLink active={tab === 'card'} onClick={() => setTab('card')}>
                  Card
                </NavLink>
              </NavItem>
            )}
          </Nav>
          <TabContent activeTab={tab}>
            <TabPane tabId="cash">
              <div>
                <Button block color="primary" className="my-1 w-100" onClick={handleCashPayment}>
                  Paid By Cash
                </Button>
              </div>
            </TabPane>
            <TabPane tabId="check">
              <div>
                <div>
                  <Label>Check No.</Label>
                  <Input type="text" name="checkNo" onChange={(e) => setCheckNo(e.target.value)} />
                </div>
                <Button block color="primary" className="my-1 w-100" onClick={handleCashPayment}>
                  Place Order
                </Button>
              </div>
            </TabPane>
            <TabPane tabId="card">
              <div>
                {!isBulk && stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CardCheckout
                      dispatch={dispatch}
                      buyer={selectedRow}
                      handleSetProgression={handleSetProgression}
                      event={event}
                    />
                  </Elements>
                )}
              </div>
            </TabPane>
          </TabContent>
        </ModalBody>
      </Modal>
    </>
  );
}
