import React, { Fragment, useEffect, useRef, useState } from 'react';

import Wizard from '@components/wizard';
import BreadCrumbs from '@components/breadcrumbs';

import '@styles/base/pages/app-ecommerce.scss';
import { Home, ShoppingCart } from 'react-feather';
import CartDetails from './components/steps/CartDetails';
import BuyerDetails from './components/steps/BuyerDetails';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartAction, getProductAction } from '../../../store/action';
import { getUserData } from '../../../../../auth/utils';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Col, Row } from 'reactstrap';

export default function UserCheckout() {
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
      content: <BuyerDetails stepper={stepper} buyer={buyer} setBuyer={setBuyer} />
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
        />
      )
    }
  ];

  useEffect(() => {
    if (productPath && shopPath) {
      //product checkout
      dispatch(getProductAction(shopPath, productPath)).then((res) => {
        console.log(res);

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
      dispatch(getCartAction(user.id));
    }
  }, [shopPath, productPath, cartId]);

  useEffect(() => {
    if (store.cart) {
      setCart(store.cart);
    }
  }, [store.cart]);

  const history = useHistory();
  const handleBackButtonClick = () => {
    history.goBack(); // Go back to the previous page
  };
  return (
    <Fragment>
      <Row>
        <Col md={11} className="invoice-child-header-wrapper">
          <BreadCrumbs
            breadCrumbTitle="Checkout"
            breadCrumbParent="eCommerce"
            breadCrumbActive="Products Checkout"
          />
        </Col>
        <Col md={1}>
          <Button onClick={handleBackButtonClick} className="btn-sm" outline color="primary">
            Back
          </Button>
        </Col>
      </Row>

      <Wizard
        ref={ref}
        steps={steps}
        className="checkout-tab-steps"
        instance={(el) => setStepper(el)}
        options={{
          linear: false
        }}
      />
    </Fragment>
  );
}
