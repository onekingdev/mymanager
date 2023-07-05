import React, { Fragment, useEffect, useRef, useState } from 'react';

import Wizard from '@components/wizard';
import BreadCrumbs from '@components/breadcrumbs';

import { RiContactsBookLine } from 'react-icons/ri';
import ContactStep from './steps/contact/ContactStep';
import { Users } from 'react-feather';
import MembershipStep from './steps/membership/MembershipStep';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getShopByPathAction } from '../../../store/action';
import { Button, Col, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function UserCheckout() {
  const [stepper, setStepper] = useState(null);
  const [cart, setCart] = useState();
  const [buyer, setBuyer] = useState();
  const [payment, setPayment] = useState();
  const [selectedFamily, setSelectedFamily] = useState([]);

  const { shopPath, membershipPath } = useParams();
  const { cartId } = useParams();

  const ref = useRef();

  const store = useSelector((state) => state.shops);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopByPathAction(shopPath));
  }, []);

  const steps = [
    {
      id: 'contact',
      title: 'Contact',
      subTitle: 'Add Contact Details',
      icon: <RiContactsBookLine size={18} />,
      content: (
        <ContactStep
          stepper={stepper}
          buyer={buyer}
          setBuyer={setBuyer}
          cart={cart}
          setCart={setCart}
          selectedFamily={selectedFamily}
          setSelectedFamily={setSelectedFamily}
        />
      )
    },
    {
      id: 'membership',
      title: 'Membership',
      subTitle: 'Edit Membership Details',
      icon: <Users />,
      content: (
        <MembershipStep
          stepper={stepper}
          cart={cart}
          buyer={buyer}
          setBuyer={setBuyer}
          payment={payment}
          setPayment={setPayment}
          setCart={setCart}
          store={store}
          dispatch={dispatch}
          selectedFamily={selectedFamily}
          setSelectedFamily={setSelectedFamily}
        />
      )
    }
  ];

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
            breadCrumbActive="Membership Checkout"
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
        instance={(el) => {
          setStepper(el);
        }}
        options={{
          linear: false
        }}
      />
    </Fragment>
  );
}
