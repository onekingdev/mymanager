import React, { useState } from 'react';
import { Button, Card, CardBody, Form } from 'reactstrap';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { updateOrganizationSubscriptionAction } from '../../../../store/action';


export default function Checkout({
  customerId,
  subscriptionId,
  dispatch,
  subId,
  toggle,
  isYearly
}) {
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
        return_url: `${window.location.origin}`
      },
      redirect: 'if_required'
    });
    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage(`Payment ${paymentIntent.status} 🎉`);
      //update subscription bought
      let paymentInfo = {
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        status: paymentIntent.status,
        currency: paymentIntent.currency,
        paymentMethod: paymentIntent.payment_method
      };
      let stripeSubscription = {
        customerId: customerId,
        subscriptionId: subscriptionId
      };
      const startDate = new Date();
      const todayDate = new Date();
      let payload = {
        paymentInfo: paymentInfo,
        stripeSubscription,
        stripeSubscription,
        status: 'active',
        startDate: startDate,
        expireDate:
          isYearly === true
            ? todayDate.setFullYear(todayDate.getFullYear() + 1)
            : todayDate.setMonth(todayDate.getMonth() + 1)
      };

      //update bought
      dispatch(updateOrganizationSubscriptionAction(subId, payload));
      toggle();

      setIsPrcessing(false);
      //setTimeout(()=>{toggle()},1000)
    } else {
      switch (paymentIntent.status) {
        case 'processing':
          setMessage("Payment processing. We'll update you when payment is received.");
          setIsPrcessing(false);
          break;

        case 'requires_payment_method':
          setMessage('Payment failed. Please try another payment method.');
          setIsPrcessing(false);
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          break;

        default:
          setMessage('Something went wrong.');
          setIsPrcessing(false);
          break;
      }
    }
  };
  return (
    <Form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement />
      <Button color="primary" className="mt-1">
        <span>{isProcessing ? 'Processing...' : 'Pay Now'}</span>
      </Button>
      <p> {message}</p>
    </Form>
  );
}
