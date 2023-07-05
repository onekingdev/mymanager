import React, { useState } from 'react';
import { Button, Card, CardBody, Form, Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';

import { Link } from 'react-router-dom';
import { activateMembershipAction, productBuySuccessAction } from './../../../../../../store/action';
import moment from 'moment';

export default function Checkout({ cart, dispatch, buyer, store,membership }) {
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
        let prodTemp = [];
        if(cart?.items){
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
              
              dispatch(productBuySuccessAction(payload));
        }
        //save payment, save document
        payload = {
          payment: {
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount / 100,
            status: paymentIntent.status,
            currency: paymentIntent.currency,
            paymentMethod: paymentIntent.payment_method,
            date: new Date(),
            currency: paymentIntent.currency,
            customerId:membership.stripe.customerId
          },
          buyer: buyer,
          status: 'paid',
          shopId: store.shop._id,
          membershipId:membership._id,
          stripeDetails:{...membership.stripe},
          startPaymentDate:moment(membership.nextPayment).format("X"),
          userId:membership.userId,
          membership:membership,
          currentPath: /:\/\/([^\/]+)/.exec(window.location.href)[1].split('.')[0]

        };
        //save membership payment 
        dispatch(activateMembershipAction(payload))
        //save document sign 

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
