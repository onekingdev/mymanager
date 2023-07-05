import React, { useState } from 'react';
import { Button, Form } from 'reactstrap';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { updatePaymentAction } from '../store/actions';
import { replyToEvent } from '../store';

export default function CardCheckout({ dispatch, buyer, handleSetProgression, event, customerId }) {
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsPrcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsPrcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-confirm/invoice`
      },
      redirect: 'if_required'
    });
    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage(`Payment ${paymentIntent.status} 🎉`);

      let payload = {};
      if (paymentIntent.status === 'succeeded') {
        console.log(event)
        payload = {
          payment: {
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount / 100,
            status: paymentIntent.status,
            currency: paymentIntent.currency,
            paymentMethod: paymentIntent.payment_method,
            date: new Date(),
            currency: paymentIntent.currency
          },
          email: buyer.email,
          contactId: buyer._id
        };

        dispatch(updatePaymentAction(event._id, payload));
        if (event?.eventCategory === 'promotion') {
          if (customerId) {
            dispatch(
              replyToEvent({
                contactIdArr: [customerId],
                paid: 'paid',
                eventId: event._id
              })
            );
          } else {
            handleSetProgression();
          }
        }
      }
    }
    setIsPrcessing(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} id="payment-form">
        <PaymentElement />
        <Button color="primary" className="mt-1 w-100">
          <span>{isProcessing ? 'Processing...' : 'Place Order'}</span>
        </Button>
        <p> {message}</p>
      </Form>
    </>
  );
}
