import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getsinsgleinvoice } from '../../../../requests/invoice/invoice';
import { createStripePaymentIntentAction, getStripeConfigAction } from '../store/action';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from './Checkout';

export default function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const dispatch = useDispatch();

  const { id } = useParams();
  
  const getData = async () => {
    const data = await getsinsgleinvoice(id);
    setInvoice(data);
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  useEffect(() => {
    console.log(invoice)

    if (invoice) {
      let payload = { amount: invoice.payNow, currency: invoice.currency };
      dispatch(getStripeConfigAction({ type: 'invoice', id: invoice._id })).then((res) => {
        console.log(res)
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
    <div>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Checkout invoice={invoice} dispatch={dispatch} />
        </Elements>
      )}
    </div>
  );
}
