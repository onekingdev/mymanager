import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// ** Custom Components
import OrderComponent from '../checkout/OrderComponent';
import TicketComponent from '../checkout/TicketComponent';
// ** Action
import {
  createStripePaymentIntentAction,
  getStripeConfigAction
} from '../../../../../finance/invoice/store/action';
// ** Util
import { formatFullDate, formatDateToMonthShort } from '../../../../../../utility/Utils';
import CardCheckout from '../../../payment/CardCheckout';

const GetTicket = ({ eventInfo, customerId, setReplyModal }) => {
  const tickets = [
    {
      id: 1,
      ticketName: eventInfo.ticketName,
      price: eventInfo.ticketPrice,
      end: eventInfo.end
    }
  ];
  const dispatch = useDispatch();

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [orders, setOrders] = useState(
    tickets.map((ticket) => {
      return { ...ticket, count: 0 };
    })
  );

  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, []);

  useEffect(() => {
    let payload = { amount: eventInfo.ticketPrice, currency: 'usd' };
    dispatch(getStripeConfigAction({ type: 'event', id: eventInfo._id })).then((res) => {
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
  }, [eventInfo, customerId]);
  const totalPrice = useMemo(() => {
    let sum = 0;
    orders.forEach((order) => {
      sum += order.price * order.count;
    });

    return sum == 0 ? orders[0].price : sum;
  }, [orders]);

  const handleCheckout = () => {
    if (step === 0) {
      setStep(1);
      return;
    }
  };

  return (
    <div className="get-ticket-step d-flex">
      <div className="modal-ticket-view d-flex flex-column">
        <div className="modal-ticket-view-header">
          <h2>{eventInfo.title}</h2>
          <p>
            {eventInfo.start && formatFullDate(eventInfo.start)}-
            {eventInfo.end && formatFullDate(eventInfo.end)}
          </p>
        </div>
        <div className="ticket-view-container">
          <PerfectScrollbar
            className="ticket-view-container-scroll"
            options={{ wheelPropagation: false }}
          >
            {step === 0 &&
              tickets.map((ticket, index) => (
                <TicketComponent
                  ticket={ticket}
                  key={index}
                  orders={orders}
                  setOrders={setOrders}
                />
              ))}
            {step === 1 && (
              <div className="w-100">
                {/* <CheckoutComponent />
                <PaymentSelection /> */}
                <div>
                  {stripePromise && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <CardCheckout dispatch={dispatch} customerId={customerId} event={eventInfo} />
                    </Elements>
                  )}
                </div>
              </div>
            )}
          </PerfectScrollbar>
        </div>
        {step === 0 && (
          <div className="modal-ticket-view-footer">
            <Button color="danger" onClick={() => handleCheckout()}>
              Check out
            </Button>
          </div>
        )}
      </div>
      <div className="modal-ticket-order flex-1">
        <div className="banner-image">
          <img
            alt="banner-image"
            src="https://me.mymanager.com/assets/images/events/default.jpg"
            height="180"
            className="w-100"
          />
        </div>
        <div className="order-container">
          <PerfectScrollbar
            className="order-container-scroll"
            options={{ wheelPropagation: false }}
          >
            <h5>Order summary</h5>
            {orders &&
              orders.length &&
              orders.map((order, index) => {
                if (order.count) return <OrderComponent order={order} key={index} />;
              })}

            <hr />
            <Row className="mt-2 p-1">
              <Col md="7">
                <strong>Total</strong>
              </Col>
              <Col md="5" style={{ textAlign: 'end' }}>
                ${totalPrice}
              </Col>
            </Row>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};
export default GetTicket;
