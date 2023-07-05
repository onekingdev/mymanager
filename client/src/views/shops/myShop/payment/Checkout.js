import React, { useState } from 'react';
import { Button, Card, CardBody, Form, Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';

import { productBuySuccessAction } from '../../store/action';

export default function Checkout({ cart, dispatch, buyer, store }) {
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
      console.log(paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        let prodTemp = [];
        for (const p of cart.items) {
          let x = {
            product: p.itemId._id,
            count: p.count,
            price: p.itemId.price,
            type: 'product'
          };
          prodTemp.push(x);
        }
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
          products: prodTemp,
          buyer: buyer,
          status: 'paid',
          total: paymentIntent.amount / 100,
          shopId: store.shop._id
        };
        if (buyer._id===undefined) {
          payload = {...payload,buyer:{...payload.buyer,guestId:localStorage.getItem('guestId')}}
        }

        dispatch(productBuySuccessAction(payload));
        const user = getUserData();
        if (user!==null) {
          dispatch(getCartAction(user.id));
        } else {
          const guestId = localStorage.getItem('guestId');
          dispatch(getCartAction(guestId));
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
