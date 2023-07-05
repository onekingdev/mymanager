import React, { useEffect, useState } from 'react';
import { Button, Input, Label, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Checkout from './Checkout';
import {
  activateMembershipAction,
  getShopByPathAction,
  productBuySuccessAction
} from './../../../../../../store/action';
import { useParams } from 'react-router-dom';
import {
  createStripePaymentIntentAction,
  getStripeConfigAction
} from '../../../../../../../finance/invoice/store/action';
import moment from 'moment';

export default function Payment({
  payment,
  setPayment,
  cart,
  dispatch,
  store,
  buyer,
  type,
  membership
}) {
  const location = window.location.href.split(window.location.origin)[1].split('/')[1];
  const [tab, setTab] = useState(location === 'ecommerce' ? 'cash' : 'card');
  const [paymentType, setPaymentType] = useState(location === 'ecommerce' ? 'cash' : 'card');
  const [totalProducts, setTotalProducts] = useState(0);
  const { shopPath } = useParams();

  //stripe
  const [stripePromise, setStripePromise] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const handleChequeNo = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value
    });
  };

  const handleTabChange = (value) => {
    setTab(value);
    setPayment({
      ...payment,
      paymentMethod: value
    });
  };
  const handleCashPayment = () => {
    //place order in buy product
    //currentPath: /:\/\/([^\/]+)/.exec(window.location.href)[1].split('.')[0]
    let payload;
    if (cart?.items) {
      let prodTemp = [];
      let total = 0;
      for (const p of cart.items) {
        let x = {
          product: p.itemId._id,
          count: p.count,
          price: p.itemId.price,
          type: type || 'membership'
        };
        total = total + x.price;
        prodTemp.push(x);
      }

      let payload = {
        payment: {
          ...payment,
          amount: total,
          paymentMethod: paymentType,
          currency: 'usd',
          date: new Date()
        },
        products: prodTemp,
        buyer: buyer,
        status: 'paid',
        total: payment.amount,
        shopId: store.shop._id,
        currentPath: /:\/\/([^\/]+)/.exec(window.location.href)[1].split('.')[0]
      };
      dispatch(productBuySuccessAction(payload));
    }
    payload = {
      payment: {
        ...payment,
        amount: membership.downPayment + membership.regFee,
        currency: 'usd',
        paymentMethod: paymentType,

        date: new Date()
      },
      buyer: buyer,
      status: 'paid',
      shopId: store.shop._id,
      membershipId: membership._id,
      stripeDetails: { ...membership.stripe },
      startPaymentDate: moment(membership.nextPayment).format('X'),
      userId: membership.userId,
      membership: membership,
      currentPath: /:\/\/([^\/]+)/.exec(window.location.href)[1].split('.')[0]
    };
    dispatch(activateMembershipAction(payload));
  };

  useEffect(() => {
    if (membership && membership !== null) {
      if (cart?.items) {
        //if they add products too
        let total = 0;
        cart.items.map((item) => {
          total += item.count * item.itemId.price;
        });

        setPayment({
          ...payment,
          amount: total + membership?.downPayment + membership?.regFee,
          currency: 'usd'
        });
        let payload = {
          amount: total + membership?.downPayment + membership?.regFee,
          currency: 'usd'
        };
        dispatch(getStripeConfigAction({ type: 'shop', id: store.shop._id })).then((res) => {
          if (res.accountId) {
            setStripePromise(loadStripe(res.pk, { stripeAccount: res.accountId }));
            setAccountId(res.accountId);
            payload = { ...payload, accountId: res.accountId };
          } else {
            setStripePromise(loadStripe(res.pk));
          }
        });
        dispatch(
          createStripePaymentIntentAction({ ...payload, customer: membership.stripe.customerId })
        ).then((res) => {
          console.log(res);
          setClientSecret(res);
        });
      } else {
        setPayment({
          ...payment,
          amount: membership?.downPayment + membership?.regFee,
          currency: 'usd'
        });
        let payload = { amount: membership?.downPayment + membership?.regFee, currency: 'usd' };
        dispatch(getStripeConfigAction({ type: 'shop', id: store.shop._id })).then((res) => {
          if (res.accountId) {
            setStripePromise(loadStripe(res.pk, { stripeAccount: res.accountId }));
            setAccountId(res.accountId);
            payload = { ...payload, accountId: res.accountId };
          } else {
            setStripePromise(loadStripe(res.pk));
          }
          dispatch(
            createStripePaymentIntentAction({ ...payload, customer: membership.stripe.customerId })
          ).then((res) => {
            setClientSecret(res);
          });
        });
      }
    }
  }, [dispatch, cart, type, membership]);
  useEffect(() => {
    if (store?.shop?._id === undefined) {
      dispatch(getShopByPathAction(shopPath));
    }
  }, []);

  useEffect(() => {
    console.log(cart?.items);
    if (cart?.items?.length > 0) {
      let total = 0;
      cart.items.map((item) => {
        total += item.count * item.itemId.price;
      });
      setTotalProducts(total);
    }
  }, [cart?.items]);

  return (
    <>
      <div>
        <h6>Total: {membership.regFee + membership.downPayment + totalProducts}</h6>
      </div>
      <hr />
      <h6>Method of Payment</h6>
      <Nav tabs>
        {location === 'ecommerce' && (
          <NavItem>
            <NavLink active={tab === 'cash'} onClick={() => handleTabChange('cash')}>
              Cash
            </NavLink>
          </NavItem>
        )}
        <NavItem>
          <NavLink active={tab === 'cheque'} onClick={() => handleTabChange('cheque')}>
            Check
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={tab === 'card'} onClick={() => handleTabChange('card')}>
            Card
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={tab}>
        <TabPane tabId="cash">
          <div>
            <Button
              block
              color="primary"
              // onClick={onNext}
              className="my-1 w-100"
              onClick={handleCashPayment}
            >
              Place Order
            </Button>
          </div>
        </TabPane>
        <TabPane tabId="cheque">
          <div>
            <Label>Check No.</Label>
            <Input type="text" name="chequeNo" onChange={handleChequeNo} />
            <Button
              block
              color="primary"
              // onClick={onNext}
              className="my-1 w-100"
              onClick={handleCashPayment}
            >
              Place Order
            </Button>
          </div>
        </TabPane>
        <TabPane tabId="card">
          <div>
            {stripePromise && clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <Checkout
                  cart={cart}
                  dispatch={dispatch}
                  buyer={buyer}
                  store={store}
                  membership={membership}
                />
              </Elements>
            )}
          </div>
        </TabPane>
      </TabContent>
    </>
  );
}
