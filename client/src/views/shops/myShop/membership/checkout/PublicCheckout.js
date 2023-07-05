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
import NewContactForm from './steps/contact/NewContactForm';
import { Container } from 'reactstrap';
import ShopNavbar from '../../navbar';

export default function PublicCheckout() {
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
        <NewContactForm
          stepper={stepper}
          buyer={buyer}
          setBuyer={setBuyer}
          cart={cart}
          setCart={setCart}
          selectedFamily={selectedFamily}
          setSelectedFamily={setSelectedFamily}
          dispatch={dispatch}
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

  return (
    <Fragment>
      {/* <BreadCrumbs
        breadCrumbTitle="Checkout"
        breadCrumbParent="eCommerce"
        breadCrumbActive="Membership Checkout"
      /> */}
      <Container className='my-1' fluid>
        <ShopNavbar/>
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
      </Container>
    </Fragment>
  );
}
