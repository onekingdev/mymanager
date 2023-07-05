import React, { useEffect, useState } from 'react';

import {
  NavLink,
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import Checkout from './Checkout';
import { updateOrganizationSubscriptionAction } from '../../../../store/action';
import {
  useCreateCustomer,
  useCreateSubscription,
  useGetStripeConfig
} from '../../../../../../requests/payment/stripePayment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

export default function PaymentModal({ toggle, open, selectedOrg, dispatch, plan, planDetails }) {
  const [tab, setTab] = useState('1');
  const [payDuration, setPayDeuration] = useState();
  const [selectedPlan, setSelectedPlan] = useState(
    selectedOrg?.planDetails[selectedOrg?.planDetails.length - 1]
  );

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [customerId, setCustomerId] = useState();

  const [paymentType, setPaymentType] = useState('cash');
  const [chequeNo, setChequeNo] = useState('');

  const { data: stripeConfig } = useGetStripeConfig();
  const { mutateAsync: createCustomer } = useCreateCustomer();
  const { mutateAsync: createSubscription } = useCreateSubscription();
 
  const handleSetInputType = (e) => {
    setPaymentType(e.target.value);
  };
  const handleCashPay = () => {
    const startDate = new Date();
    const todayDate = new Date();
    const payload = {
      paymentInfo: {
        amount: payDuration === 'yearly' ? planDetails.payPerYear : planDetails.payPerMonth,
        status: 'succeeded',
        currency: 'usd',
        paymentMethod: paymentType,
        chequeNo: chequeNo
      },
      status: 'active',
      startDate: startDate,
      expireDate:
        payDuration === 'yearly'
          ? todayDate.setFullYear(todayDate.getFullYear() + 1)
          : todayDate.setMonth(todayDate.getMonth() + 1)
    };
    dispatch(updateOrganizationSubscriptionAction(plan._id, payload));
  };
  const handleCardPay = async () => {
    setTab('2');
    let priceId = '';
    if (payDuration === 'yearly') {
      priceId = planDetails.stripe?.pricePerYear;
    } else {
      priceId = planDetails.stripe?.pricePerMonth;
    }
    const subscription = await createSubscription({customerId:customerId,priceId:priceId})
    setClientSecret(subscription.data.data.clientSecret)
    setSubscriptionId(subscription.data.data.subscriptionId)
  };
  useEffect(async () => {
    
    if (stripeConfig) {
      setStripePromise(loadStripe(stripeConfig.data.pk));
      if (plan.stripeSubscription) {
        setCustomerId(plan.stripeSubscription.customerId);
      } else {
        const customer = await createCustomer();
        setCustomerId(customer.data.data.customerId);
      }
    }
  }, [stripeConfig]);

  return (
    <Modal toggle={toggle} isOpen={open}>
      <ModalHeader>Pay Subscription</ModalHeader>
      <ModalBody>
        {payDuration ? (
          <>
            <Nav tabs>
              <NavItem>
                <NavLink active={tab === '1'} onClick={() => {setTab('1');setPaymentType('cash');}}>
                  Cash
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={tab === '2'} onClick={() => {setTab('2');setPaymentType('cheque');}}>
                  Check
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={tab === '3'} onClick={handleCardPay}>
                  Card
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={tab}>
              <TabPane tabId="1">
                
                
                <Button color="primary" className="my-1" onClick={handleCashPay}>
                  Pay
                </Button>
              </TabPane>
              <TabPane tabId="2">
                
                {paymentType === 'cheque' && (
                  <div>
                    <Label>Check No.</Label>
                    <Input
                      type="text"
                      name="chequeNo"
                      onChange={(e) => setChequeNo(e.target.value)}
                    />
                  </div>
                )}
                <Button color="primary" className="my-1" onClick={handleCashPay}>
                  Pay
                </Button>
              </TabPane>
              <TabPane tabId="3">
                {stripePromise && clientSecret && subscriptionId && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <Checkout
                      customerId={customerId}
                      subscriptionId={subscriptionId}
                      subId={plan._id}
                      toggle={toggle}
                      dispatch={dispatch}
                      isYearly={payDuration === 'yearly' ? true : false}
                    />
                  </Elements>
                )}
              </TabPane>
            </TabContent>
          </>
        ) : (
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h3>{selectedPlan.name}</h3>
                  <CardText>{selectedPlan.description}</CardText>
                  <ListGroup tag="ul" className="list-group-circle text-start mb-2">
                    {selectedPlan.benefits.map((benefit, i) => (
                      <ListGroupItem key={i} tag="li">
                        {benefit}
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                  <small className="text-muted">
                    USD {`${selectedPlan.pricePerMonth} /Month`}{' '}
                  </small>
                  <Button block outline color="primary" onClick={() => setPayDeuration('monthly')}>
                    Select
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardBody>
                  <h3>{selectedPlan.name}</h3>
                  <CardText>{selectedPlan.description}</CardText>
                  <ListGroup tag="ul" className="list-group-circle text-start mb-2">
                    {selectedPlan.benefits.map((benefit, i) => (
                      <ListGroupItem key={i} tag="li">
                        {benefit}
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                  <small className="text-muted">{`USD ${selectedPlan.pricePerYear} /Year`}</small>
                  <Button block outline color="primary" onClick={() => setPayDeuration('yearly')}>
                    Select
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </ModalBody>
    </Modal>
  );
}
