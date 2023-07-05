// ** React Imports
import { Fragment, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, FormText } from 'reactstrap';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';

import Select from 'react-select';

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form';

import { createEvent, setErrors } from '../../store';
import { getUserData } from '../../../../../auth/utils';
import defaultImg from '@src/assets/images/goals/g1.png';
import useMessage from '@src/lib/useMessage';
// ** Utils
import { selectThemeColors } from '@utils';
import '@styles/base/pages/app-ecommerce.scss';

const Tickets = ({ stepper, type, eventForm, eventInfo }) => {
  const { error, success } = useMessage();
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
    { value: 'buynow', label: 'Buy Now', type: 'paid' },
    { value: 'gettickets', label: 'Get Tickets', type: 'paid' },
    { value: 'rsvp', label: 'RSVP Now', type: 'unpaid' }
  ];

  // ** Register Inputs to React Hook Form
  const {
    reset,
    register,
    control,
    setError,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues });

  // ** State
  const [productUrl, setProductUrl] = useState({});
  const [ticketAvailableQuantity, setTicketAvailableQuantity] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [productId, setProductId] = useState(null);
  const [checkoutType, setCheckoutType] = useState('Product');
  const [checkoutItem, setCheckoutItem] = useState({});
  const [checkoutButtonType, setCheckoutButtonType] = useState({});
  const [checkoutButtonOptions, setCheckoutButtonOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [items, setItems] = useState([]);

  // ** Store Vars

  const products = useSelector((state) => state.shops.products);

  // ** Set values with defined values
  useEffect(() => {
    setValue('ticketName', eventInfo?.ticketName);
    setTicketAvailableQuantity(eventInfo.ticketAvailableQuantity);
    setTicketPrice(eventInfo.ticketPrice);
    eventInfo.checkoutType &&
      setCheckoutType(itemTypeOption.find((item, index) => item.value == eventInfo.checkoutType));
    eventInfo.checkoutButtonType &&
      setCheckoutButtonType(
        checkoutButtonOptions.find((item, index) => item.value == eventInfo.checkoutButtonType)
      );
  }, [eventInfo]);

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
        { value: 'two', label: 'Going, Not going' },
        { value: 'three', label: 'Going, Not going, Maybe' }
      ]);
      setCheckoutItem({ value: 'three', label: 'Going, Not going, Maybe' });
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
        desc: item.description,
        url: item.imgUrl
      });
    }
    setProductOptions(list);
  }, [products]);

  useEffect(() => {
    if (checkoutType.value == 'product' && checkoutItem && products.length) {
      products.map((product, index) => {
        if (product.name == checkoutItem.name) {
          setProductUrl(product.imgUrl);
          setTicketPrice(product.price);
          setTicketAvailableQuantity(product.quantity);
          setProductId(product._id)
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
      if (type === 'Price') {
        setTicketPrice(parseFloat(value));
      } else if (type === 'Quantity') {
        setTicketAvailableQuantity(parseInt(value));
      }
    }
  };

  
  const handleCreateClickHandler = (data) => {
    if (checkoutButtonType?.value && checkoutType?.value) {
      eventForm.set('ticketName', data.ticketName);
      eventForm.set('ticketAvailableQuantity', ticketAvailableQuantity);
      eventForm.set('ticketPrice', ticketPrice);
      eventForm.set('checkoutType', checkoutType.value);
      eventForm.set('checkoutButtonType', checkoutButtonType.value);
      if(checkoutType.value === 'product'){
        eventForm.set('productId',checkoutItem.value)
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
                onChange={(e) => handleNumberChange(e.target.value, 'Quantity')}
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
                onChange={(e) => setCheckoutItem(e)}
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
              onChange={(data) => setCheckoutButtonType(data)}
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
                <Label className="form-label" >
                  Price
                </Label>
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
                  onChange={(e) => handleNumberChange(e.target.value, 'ticketAvailableQuantity')}
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
