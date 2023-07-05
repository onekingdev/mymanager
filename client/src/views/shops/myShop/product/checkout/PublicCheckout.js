import React, { Fragment, useEffect, useRef, useState } from 'react';

import Wizard from '@components/wizard';

import '@styles/base/pages/app-ecommerce.scss';


import { Home, ShoppingCart } from 'react-feather';
import CartDetails from './components/steps/CartDetails';
import BuyerDetails from './components/steps/BuyerDetails';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartAction, getProductAction } from '../../../store/action';
import ShopNavbar from '../../navbar';
import { Container } from 'reactstrap';
import { getUserData } from '../../../../../auth/utils';

export default function PublicCheckout() {
  const [stepper, setStepper] = useState(null);
  const [cart, setCart] = useState();
  const [buyer, setBuyer] = useState();
  const [payment, setPayment] = useState();

  const { shopPath, productPath } = useParams();
  const { cartId } = useParams();
  //is seller || customer
  //is product || cart

  const ref = useRef();

  const store = useSelector((state) => state.shops);
  const dispatch = useDispatch();

  //cart items
  //address details
  //payment
  const steps = [
    {
      id: 'address',
      title: 'Address',
      subtitle: 'Add Address For Delivery',
      icon: <Home size={18} />,
      content: <BuyerDetails stepper={stepper} buyer={buyer} setBuyer={setBuyer} isPublic={true} />
    },
    {
      id: 'cart',
      title: 'Cart',
      subtitle: 'Your Cart Items',
      icon: <ShoppingCart size={18} />,
      content: (
        <CartDetails
          stepper={stepper}
          cart={cart}
          buyer={buyer}
          setBuyer={setBuyer}
          payment={payment}
          setPayment={setPayment}
          setCart={setCart}
          store={store}
          dispatch={dispatch}
          isPublic={true}
        />
      )
    }
  ];

  useEffect(() => {
   
    if (productPath) {
      //product checkout
      
      dispatch(getProductAction(shopPath, productPath)).then((res) => {
        let p = {
          items: [{ itemId: { ...res.data }, count: 1 }],
          userId: '',
          userType: ''
        };
        setCart(p);
      });
    } else {
      //cart checkout
      const user = getUserData();
      console.log(user)
      if (user !== null) {
        dispatch(getCartAction(user.id));
      } else {
        const guestId = localStorage.getItem('guestId');
        if (guestId !== null) {
          dispatch(getCartAction(guestId));
        } else {
          setCart({});
        }
      }
    }
  }, [shopPath, productPath,cartId]);
  useEffect(() => {
    if (store.cart) {
      setCart(store.cart);
    }
  }, [store.cart]);
  return (
    <Fragment>
      <Container className="my-1" fluid>
        <ShopNavbar />
        <Wizard
          ref={ref}
          steps={steps}
          className="checkout-tab-steps"
          instance={(el) => setStepper(el)}
          options={{
            linear: false
          }}
        />
      </Container>
    </Fragment>
  );
}
