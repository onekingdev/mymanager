import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { connectStripeAction, getStripeAccountAction } from '../../../../../store/action';

export default function StripeConnect({ dispatch }) {
  const [title, setTitle] = useState('Create your Stripe account to accept payments.');
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    dispatch(getStripeAccountAction()).then((res) => {
      console.log(res);
      if (res.success === true) {
        if (res.account) {
          if (res.account.details_submitted === true) {
            setTitle('You successfully connected your account');
            setDisable(true);
          } else {
            setTitle('You need to submit details to activate card payment with Stripe');
            setDisable(false);
          }
        } else {
          setTitle('Create your Stripe account to accept payments.');
          setDisable(false);
        }
      }
    });
  }, []);
  const handleStripeConnect = () => {
    dispatch(connectStripeAction()).then((res) => {
      window.location.href = res.account.url;
    });
  };
  return (
    <div className="d-flex justify-content-center">
      <Button color="primary" onClick={handleStripeConnect} disabled={disable}>
        {title}
      </Button>
    </div>
  );
}
