// ** React Imports
import { Fragment, useState } from 'react';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Modal,
  Badge,
  Label,
  Input,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  CardHeader,
  InputGroup,
  ModalHeader,
  FormFeedback,
  InputGroupText
} from 'reactstrap';

// ** Third Party Components
import classnames from 'classnames';
import Cleave from 'cleave.js/react';
import { Check, X } from 'react-feather';
import { useForm, Controller } from 'react-hook-form';

// ** Card Images
import jcbCC from '@src/assets/images/icons/payments/jcb-cc.png';
import amexCC from '@src/assets/images/icons/payments/amex-cc.png';
import uatpCC from '@src/assets/images/icons/payments/uatp-cc.png';
import visaCC from '@src/assets/images/icons/payments/visa-cc.png';
import dinersCC from '@src/assets/images/icons/payments/diners-cc.png';
import maestroCC from '@src/assets/images/icons/payments/maestro-cc.png';
import discoverCC from '@src/assets/images/icons/payments/discover-cc.png';
import mastercardCC from '@src/assets/images/icons/payments/mastercard-cc.png';

const cardsObj = {
  jcb: jcbCC,
  uatp: uatpCC,
  visa: visaCC,
  amex: amexCC,
  diners: dinersCC,
  maestro: maestroCC,
  discover: discoverCC,
  mastercard: mastercardCC
};

const data = [
  {
    cardCvc: '587',
    name: 'Tom McBride',
    expiryDate: '12/24',
    imgAlt: 'Mastercard',
    badgeColor: 'primary',
    cardStatus: 'Primary',
    cardNumber: '5577 0000 5577 9865',
    imgSrc: require('@src/assets/images/icons/payments/mastercard.png').default
  },
  {
    cardCvc: '681',
    imgAlt: 'Visa card',
    expiryDate: '02/24',
    name: 'Mildred Wagner',
    cardNumber: '4532 3616 2070 5678',
    imgSrc: require('@src/assets/images/icons/payments/visa.png').default
  }
];

const PaymentSelection = () => {
  // ** States
  const [show, setShow] = useState(false);
  const [cardType, setCardType] = useState('');
  const [selected, setSelected] = useState(null);
  const [modalCardType, setModalCardType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { cardInput: '' } });

  const onSubmit = (data) => {
    if (data.cardInput.length <= 0) {
      setError('cardInput', {
        type: 'manual',
        message: 'Please Enter Valid Card Number'
      });
    }
  };

  const selectedCondition = selected !== null;

  const openEditModal = (card) => {
    setSelected(card);
    setShow(true);
  };
  return (
    <div className="mb-3">
      <h3 className="mb-2">Payment Selection</h3>
      <Row className="gx-4 w-100">
        <Col lg="12">
          <Row tag={Form} className="gx-2 gy-1" onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12}>
              <div className="form-check mb-1">
                <Input
                  type="radio"
                  value="card"
                  id="card-radio"
                  name="payment-method-radio"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <Label className="form-check-label" for="card-radio">
                  Credit/Debit/ATM Card
                </Label>
              </div>
              <div className="form-check mb-1">
                <Input
                  type="radio"
                  value="paypal"
                  id="paypal-radio"
                  name="payment-method-radio"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                />
                <Label className="form-check-label" for="paypal-radio">
                  PayPal account
                </Label>
              </div>
            </Col>
            {paymentMethod === 'card' && (
              <Fragment>
                <Col xs={12}>
                  <Label className="form-label" for="credit-card">
                    Card Number
                  </Label>
                  <InputGroup>
                    <Controller
                      id="credit-card"
                      name="cardInput"
                      control={control}
                      placeholder="1356 3215 6548 7898"
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          name="cardInput"
                          className={classnames('form-control', { 'is-invalid': errors.cardInput })}
                          options={{
                            creditCard: true,
                            onCreditCardTypeChanged: (type) => setCardType(type)
                          }}
                        />
                      )}
                    />
                    {cardType !== '' && cardType !== 'unknown' ? (
                      <InputGroupText>
                        <img height="24" alt="card-type" src={cardsObj[cardType]} />
                      </InputGroupText>
                    ) : null}
                  </InputGroup>
                  {errors.cardInput ? (
                    <FormFeedback className="d-block">{errors.cardInput.message}</FormFeedback>
                  ) : null}
                </Col>
                <Col md={6}>
                  <Label className="form-label" for="card-name">
                    Name On Card
                  </Label>
                  <Input id="card-name" placeholder="John Doe" />
                </Col>
                <Col xs={6} md={3}>
                  <Label className="form-label" for="exp-date">
                    Exp. Date
                  </Label>
                  <Cleave
                    id="exp-date"
                    placeholder="MM/YY"
                    className="form-control"
                    options={{ delimiter: '/', blocks: [2, 2] }}
                  />
                </Col>
                <Col xs={6} md={3}>
                  <Label className="form-label" for="cvv">
                    CVV
                  </Label>
                  <Cleave
                    id="cvv"
                    placeholder="654"
                    className="form-control"
                    options={{ blocks: [3] }}
                  />
                </Col>
              </Fragment>
            )}
            {paymentMethod === 'paypal' && (
              <Fragment>
                <Col xs={12}>
                  Proceed below with your PayPal account and complete your purchase.
                </Col>
              </Fragment>
            )}
            <Row className="mb-1 mt-3 w-100">
              <Col sm={{ size: 14 }}>
                <div className="form-check mb-1">
                  <Input type="checkbox" id="terms" />
                  <Label className="form-check-label" for="terms">
                    I agree to
                    <a className="ms-25" href="/" onClick={(e) => e.preventDefault()}>
                      privacy policy & terms
                    </a>
                  </Label>
                </div>
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentSelection;
