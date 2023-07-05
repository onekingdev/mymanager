import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
import {  useCreateCustomer, useCreateSubscription, useGetStripeConfig } from '../../../../requests/payment/stripePayment';
import Checkout from './Checkout';
import PriceCard from './PriceCard';


export default function PaymentModal({toggle,open,org, dispatch, plan,planDetails}) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [subscriptionId,setSubscriptionId] = useState(null);
  const [customerId,setCustomerId] = useState()
  const [isYearly,setIsYearly] = useState(false)

  const {data:stripeConfig} = useGetStripeConfig()
  const {mutateAsync:createCustomer} = useCreateCustomer()
  const {mutateAsync:createSubscription} = useCreateSubscription()

  useEffect(async()=>{
    console.log("stripeConfig",stripeConfig)
    if(stripeConfig){
      setStripePromise(loadStripe(stripeConfig.data.pk))
      if(plan.stripeSubscription){
        setCustomerId(plan.stripeSubscription.customerId)
      }
      else{
        const customer = await createCustomer()
        setCustomerId(customer.data.data.customerId)
      }
    }
  },[stripeConfig])
  const handleCreateSubscription = async(isYearly)=>{
    let priceId=''
    if(isYearly === true){
      setIsYearly(true)
      priceId = org?.planDetails[org?.planDetails.length - 1]?.stripe?.pricePerYear
    }
    else{
      setIsYearly(false)
      priceId = org?.planDetails[org?.planDetails.length - 1]?.stripe?.pricePerMonth
    }
    const subscription = await createSubscription({customerId:customerId,priceId:priceId})
    setClientSecret(subscription.data.data.clientSecret)
    setSubscriptionId(subscription.data.data.subscriptionId)
  }
  return (
    <Modal toggle={toggle} isOpen={open}>
        <ModalHeader toggle={toggle}>Your subscription has been over!</ModalHeader>
        <ModalBody>
          {
            subscriptionId === null && <Row>
            <PriceCard item={planDetails} isYearly={false} CreateSubscription={handleCreateSubscription}/>
            <PriceCard item={planDetails} isYearly={true} CreateSubscription={handleCreateSubscription}/>
            </Row>
          }
        {stripePromise && clientSecret && subscriptionId && 
     
     ( <Elements stripe={stripePromise} options={{ clientSecret }}>
        <Checkout customerId={customerId} subscriptionId={subscriptionId} subId={plan._id} toggle={toggle} dispatch={dispatch} isYearly={isYearly}/>
      </Elements>)
    
    }
        </ModalBody>
    </Modal>
  )
}
