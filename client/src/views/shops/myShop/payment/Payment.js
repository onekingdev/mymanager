import React, { useEffect, useState } from 'react';
import { Button, Input, Label, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { getStripeConfigAction } from '../../../finance/invoice/store/action';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createStripePaymentIntentAction } from '../../../finance/invoice/store/action';
import Checkout from './Checkout';
import { getCartAction, getShopByPathAction, productBuySuccessAction } from '../../store/action';
import { useParams } from 'react-router-dom';
import { getUserData } from '../../../../auth/utils';

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
  const [tab, setTab] = useState('cash');
  const [paymentType, setPaymentType] = useState('cash');
  const { shopPath } = useParams();

  //stripe
  const [stripePromise, setStripePromise] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const handleSetInputType = (e) => {
    setPaymentType(e.target.value);
    setPayment({
      ...payment,
      [e.target.name]: e.target.value
    });
  };
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
    let prodTemp = [];
    for (const p of cart.items) {
      let x = {
        product: p.itemId._id,
        count: p.count,
        price: p.itemId.price,
        type: type || 'product'
      };
      prodTemp.push(x);
    }

    let payload = {
      payment: { ...payment, date: new Date() },
      products: prodTemp,
      buyer: buyer,
      status: 'paid',
      total: payment.amount,
      shopId: store.shop._id
    };
    if (buyer._id === undefined) {
      payload = {
        ...payload,
        buyer: { ...payload.buyer, guestId: localStorage.getItem('guestId') }
      };
    }
    dispatch(productBuySuccessAction(payload));
    const user = getUserData();

    if (user !== null) {
      dispatch(getCartAction(user.id));
    } else {
      const guestId = localStorage.getItem('guestId');
      dispatch(getCartAction(guestId));
    }
  };

  useEffect(() => {
    if (cart) {
      let total = 0;
      cart.items.map((item) => {
        total += item.count * item.itemId.price;
      });
      setPayment({ ...payment, amount: total, currency: 'usd' });
      let payload = { amount: total, currency: 'usd' };
      dispatch(getStripeConfigAction({ type: 'shop', id: store.shop._id })).then((res) => {
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
  }, [dispatch, cart, type]);

  useEffect(() => {
    dispatch(getShopByPathAction(shopPath));
  }, []);

  return (
    <>
      <hr />
      <h6>Mode of Payment</h6>
      <Nav tabs>
        <NavItem>
          <NavLink active={tab === 'cash'} onClick={() => handleTabChange('cash')}>
            Cash
          </NavLink>
        </NavItem>
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
              disabled={!cart?.items?.length}
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
            <div>
              <Label>Check No.</Label>
              <Input type="text" name="chequeNo" onChange={handleChequeNo} />
            </div>
            <Button
              block
              color="primary"
              disabled={!cart?.items?.length}
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
                <Checkout cart={cart} dispatch={dispatch} buyer={buyer} store={store} />
              </Elements>
            )}
          </div>
        </TabPane>
      </TabContent>
    </>
  );
}
