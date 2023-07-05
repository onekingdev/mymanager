import React, { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { addPaymentToInvoiceAction } from '../store/action';
import { Button, Form } from 'reactstrap';
export default function CheckoutModal({ invoice, dispatch }) {
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
        return_url: `${window.location.origin}/payment-confirm/invoice/${invoice._id}`
      },
      redirect: 'if_required'
    });
    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage(`Payment ${paymentIntent.status} 🎉`);
      //update invoice with payment
      let payments = [];
      if (invoice.payments) {
        payments = [...invoice.payments];
      }
      let payload = {};

      if (paymentIntent.status === 'succeeded') {
        payload = {
          payments: [
            ...payments,
            {
              paymentIntentId: paymentIntent.id,
              amount: paymentIntent.amount / 100,
              status: paymentIntent.status,
              currency: paymentIntent.currency,
              paymentMethod: paymentIntent.payment_method,
              date: new Date()
            }
          ],
          paidAmount: (invoice?.paidAmount || 0) + paymentIntent.amount / 100,
          payNow:
            invoice.totalAmount -
            invoice.discount +
            invoice.tax -
            (invoice?.paidAmount || 0) -
            paymentIntent.amount / 100
        };
        if (payload.payNow === 0) {
          payload = { ...payload, status: 'PAID' };
        }
        dispatch(addPaymentToInvoiceAction(invoice._id, payload));
      }
    }
    setIsPrcessing(false);
  };
  return (
    <div>
      <Form onSubmit={handleSubmit} id="payment-form">
        <PaymentElement />
        <Button color="primary" className="mt-1">
          <span>{isProcessing ? 'Processing...' : 'Pay Now'}</span>
        </Button>
        <p> {message}</p>
      </Form>
    </div>
  );
}
