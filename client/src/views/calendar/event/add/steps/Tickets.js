// ** React Imports
import { Fragment, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, FormText } from 'reactstrap';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, setErrors } from '../../store';
import { getUserData } from '../../../../../auth/utils';
import defaultImg from '@src/assets/images/goals/g1.png';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Message Imports
import useMessage from '@src/lib/useMessage';
import Select from 'react-select';

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form';

const Tickets = ({ stepper, type, eventForm }) => {
  // ** Default Form Values
  const defaultValues = {
    ticketName: ''
  };

  const itemTypeOption = [
    { value: 'product', label: 'Sell Product' },
    { value: 'ticket', label: 'Ticket' },
    { value: 'none', label: 'RSVP' }
  ];
  const buttonOptions = [
    { value: 'buynow', label: 'Buy Now' },
    { value: 'gettickets', label: 'Get Tickets' },
    { value: 'rsvp', label: 'RSVP Now' }
  ];

  // ** Register Inputs to React Hook Form
  const {
    reset,
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  // ** State
  const [productUrl, setProductUrl] = useState({});
  const [productId, setProductId] = useState(null);

  const [ticketAvailableQuantity, setTicketAvailableQuantity] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [checkoutType, setCheckoutType] = useState('Product');
  const [checkoutItem, setCheckoutItem] = useState({});
  const [checkoutButtonType, setCheckoutButtonType] = useState({});
  const [checkoutButtonOptions, setCheckoutButtonOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [items, setItems] = useState([]);
  // ** History var
  const { error, success } = useMessage();

  // ** Store Vars

  const products = useSelector((state) => state.shops.products);

  useEffect(() => {
    if (productOptions.length > 0 && checkoutType.value === 'product') {
      setCheckoutItem(productOptions[0]);
      setItems(productOptions);
      setCheckoutButtonType(buttonOptions[0]);
    }
  }, [checkoutType, items]);

  useEffect(() => {
    if (checkoutType.value === 'none') {
      setItems([
        { value: 'two', label: 'Going, Not Going' },
        { value: 'three', label: 'Going, Not Going, Maybe' }
      ]);
      setCheckoutItem({ value: 'going', label: 'Going, Not Going' });
      setCheckoutButtonOptions([{ value: 'rsvp', label: 'RSVP Now' }]);
    } else {
      let list = [];
      for (const item of products) {
        list.push({
          value: item._id,
          label: item.name,
          name: item.name,
          price: item.price,
          desc: item.description,
          url: item.imgUrl
        });
      }
      setProductOptions(list);
      setCheckoutItem(list[0]);
      if (checkoutType.value == 'ticket') {
        setCheckoutButtonOptions([buttonOptions[2]]);
      } else if (checkoutType.value == 'product') {
        setCheckoutButtonOptions([buttonOptions[0], buttonOptions[1]]);
      } else {
        setCheckoutButtonOptions([buttonOptions[0]]);
      }
    }
  }, [checkoutType]);

  useEffect(() => {
    let list = [];
    for (const item of products) {
      list.push({
        value: item._id,
        label: item.name,
        name: item.name,
        price: item.price,
        desc: item.description
      });
    }
    setProductOptions(list);
  }, [products]);

  useEffect(() => {
    if (checkoutType.value === 'product' && checkoutItem && products.length) {
      products.map((product, index) => {
        if (product.name === checkoutItem.name) {
          setProductUrl(product.imgUrl);
          setTicketPrice(product.price);
          setProductId(product._id);
        }
      });
    }
  }, [checkoutType, checkoutItem, products]);

  // ** Event handlers
  const isNumeric = (str) => {
    if (typeof str != 'string') return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  };

  const handleNumberChange = (value, type) => {
    if (isNumeric(value)) {
      if (type === 'ticketPrice') {
        setTicketPrice(parseFloat(value));
      } else if (type === 'productPrice') {
        setTicketPrice(parseFloat(value));
      } else if (type === 'ticketQuantity') {
        setTicketAvailableQuantity(parseInt(value));
      } else if (type === 'productQuantity') {
        setTicketAvailableQuantity(parseInt(value));
      }
    }
  };

  const handleCreateClickHandler = (data) => {
    if (checkoutType?.value && checkoutButtonType?.value) {
      eventForm.set('ticketName', data.ticketName);
      eventForm.set('ticketAvailableQuantity', ticketAvailableQuantity);
      eventForm.set('ticketPrice', ticketPrice);
      eventForm.set('checkoutType', checkoutType.value);
      eventForm.set('checkoutButtonType', checkoutButtonType.value);
      if (checkoutType.value === 'product') {
        eventForm.set('productId', checkoutItem.value);
      }
      stepper.next();
    } else {
      error('Please select required fields');
    }
  };

  const handleCheckoutMethodChange = (value) => {
    setCheckoutType(value);
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Checkout</h5>
        <small>Select what is being sold</small>
      </div>
      <Form onSubmit={handleSubmit(handleCreateClickHandler)}>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="basicInput">
              Goal of Event
            </Label>
            <Controller
              name="checkoutType"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  isClearable={false}
                  options={itemTypeOption}
                  className="react-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  value={checkoutType}
                  onChange={(value) => handleCheckoutMethodChange(value)}
                />
              )}
            />
            {/* 
            {errors.ticketName && (
              <FormText color="danger" id="validation-add-board">
                Please Enter Ticket Name
              </FormText>
            )} */}
          </Col>

          {checkoutType.value === 'ticket' && (
            <Col md="4" className="mb-1">
              <Label className="form-label" for="basicInput">
                Available Quantity
              </Label>
              <Input
                type="quantity"
                id="basicInput"
                placeholder="How many tickets are available?"
                value={ticketAvailableQuantity}
                onChange={(e) => handleNumberChange(e.target.value, 'ticketQuantity')}
              />
            </Col>
          )}
          {!['ticket'].includes(checkoutType.value) && (
            <Col md="4" className="mb-1">
              <Label className="form-label" for="basicInput">
                Select One
              </Label>
              <Select
                isClearable={false}
                options={items}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                value={checkoutItem}
                onChange={(data) => setCheckoutItem(data)}
              />
            </Col>
          )}
          <Col md="4" className="mb-1">
            <Label className="form-label" for="basicInput">
              Checkout Button
            </Label>
            <Select
              isClearable={false}
              options={checkoutButtonOptions}
              className="react-select"
              classNamePrefix="select"
              theme={selectThemeColors}
              value={checkoutButtonType}
              onChange={(e) => setCheckoutButtonType(e)}
            />
          </Col>
        </Row>
        {checkoutType.value === 'ticket' && (
          <Row>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="basicInput">
                Ticket Name
              </Label>
              <Controller
                name="ticketName"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    autoFocus
                    placeholder="Enter Ticket Name"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.ticketName && (
                <FormText color="danger" id="validation-add-board">
                  Please enter a valid Ticket Name
                </FormText>
              )}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="basicInput">
                Price
              </Label>
              <Input
                type="number"
                step="any"
                id="basicInput"
                placeholder="Price per ticket"
                value={ticketPrice}
                disabled={checkoutType === 'none'}
                {...register('ticketPrice')}
                onChange={(e) => handleNumberChange(e.target.value, 'ticketPrice')}
              />
              {/* {errors.ticketPrice && (
                <FormText color="danger" id="validation-add-board">
                  {errors.ticketPrice.message}
                </FormText>
              )} */}
            </Col>
          </Row>
        )}

        {checkoutType.value === 'product' && (
          <Row>
            <Col md="6" className="mb-1">
              <img src={productUrl ? productUrl : defaultImg} width={350} height={160} />
            </Col>
            <Col md="6" className="mb-1">
              <div className="mb-1">
                <Label className="form-label">Price</Label>
                <Input
                  type="number"
                  placeholder="price of product"
                  value={ticketPrice}
                  {...register('ticketPrice')}
                  onChange={(e) => handleNumberChange(e.target.value, 'ticketPrice')}
                />
              </div>
              <div>
                <Label className="form-label" for="basicInput">
                  Quantity
                </Label>
                <Input
                  type="number"
                  step="any"
                  id="basicInput"
                  placeholder="Quantity of products"
                  value={ticketAvailableQuantity}
                  {...register('ticketAvailableQuantity')}
                  onChange={(e) => handleNumberChange(e.target.value, 'ticketQuantity')}
                />
              </div>
            </Col>
          </Row>
        )}

        <div className="d-flex justify-content-between">
          <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" type="submit">
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
      {/* {errors.previous && (
        <FormText color="danger" id="validation-add-board">
          You did not enter the required values in the{' '}
          <Link onClick={handlePastStepHandler} style={{ textDecoration: 'underline' }}>
            past steps
          </Link>
          .
        </FormText>
      )} */}
    </Fragment>
  );
};

export default Tickets;
