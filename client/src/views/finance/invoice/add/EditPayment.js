/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FormGroup, Label, Input, Button, Form, Row, Col } from 'reactstrap';
import Sidebar from '@components/sidebar';
import Select from 'react-select';
import { selectThemeColors } from '../../../../utility/Utils';
import Flatpickr from 'react-flatpickr';

const roleOptions = [
  { value: 'Debit Card', label: 'Debit Card' },
  { value: 'Credit Card', label: 'Credit Card' },
  // { value: 'Paypal', label: 'Paypal' },
  { value: 'Wire', label: 'Wire' }
];

// const countryOptions = [
//   { value: 'uk', label: 'UK' },
//   { value: 'usa', label: 'USA' },
//   { value: 'france', label: 'France' },
//   { value: 'russia', label: 'Russia' },
//   { value: 'canada', label: 'Canada' }
// ];

const countryOptions = [
  { value: 'USA', label: 'USA' },
  { value: 'australia', label: 'Australia' },
  { value: 'canada', label: 'Canada' },
  { value: 'russia', label: 'Russia' },
  { value: 'saudi-arabia', label: 'Saudi Arabia' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'sweden', label: 'Sweden' },
  { value: 'switzerland', label: 'Switzerland' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'UAE', label: 'United Arab Emirates' },
];

export const EditPayment = (props) => {
  const { invoicedata, setinvoice } = props
  const [isOpen, setIsOpen] = useState(false);
  const [selectPayment, setselectPayment] = useState('');
  const [country, setCountry] = useState({ value: 'USA', label: 'USA' });
  const [AddressObject, setAddressObject] = useState({});
  const [payNowErr,setPayNowErr] = useState(false)

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleCountryChange = (e) => {
    setCountry(e)
    setAddressObject({ ...AddressObject, country: e?.label })
    setinvoice({
      ...invoicedata,
      companyAddress: { ...AddressObject, country: e?.label }
    })
  }
  const handleChangeAddress = (e) => {
    let { name, value } = e.target
    setAddressObject({ ...AddressObject, [name]: value });
    setinvoice({
      ...invoicedata,
      companyAddress: { ...AddressObject, [name]: value }
    })
  };
  const handleSelectLogo = (e) => {
    setinvoice({
      ...invoicedata,
      file: e.target.files[0]
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen);
  };
  const handleChange = (value) => {
    setselectPayment(value.value);
  };

  return (
    <div>
      <Button className="mb-75" onClick={handleIsOpen} color="primary" block outline>
        Edit settings
      </Button>
      <Sidebar
        size="lg"
        open={isOpen}
        title="Edit settings"
        headerClassName="mb-1"
        contentClassName="p-0"
        toggleSidebar={handleIsOpen}
        width="600"
      >
        <Form onSubmit={handleSubmit}>
          <div className="border-bottom my-1">
            <h5>Edit Company Details</h5>
          </div>
          <div className="mb-1">
            <Label for="payment-note" >
              My Company Name
            </Label>
            <Input
              type="text"
              id="payment-note"
              name='companyName'
              value={invoicedata?.companyName}
              onChange={(e) => {
                setinvoice({
                  ...invoicedata,
                  [e.target.name]: e.target.value
                });
              }}
              placeholder="Company Name" />
          </div>
          <Row>

            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label >Change logo</Label>
                <Input
                  onChange={handleSelectLogo}
                  placeholder="image"
                  name="file"
                  files={[invoicedata?.file]}
                  type="file"
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label >Street</Label>
                <Input
                  onChange={handleChangeAddress}
                  name="street"
                  placeholder="Street"
                  type="text"
                  value={invoicedata?.companyAddress?.street}
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label >City</Label>
                <Input
                  onChange={handleChangeAddress}
                  name="city"
                  placeholder="City"
                  type="text"
                  value={invoicedata?.companyAddress?.city}
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label >State</Label>
                <Input
                  onChange={handleChangeAddress}
                  name="state"
                  placeholder="State"
                  type="text"
                  value={invoicedata?.companyAddress?.state}
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label >Zip Code</Label>
                <Input
                  onChange={handleChangeAddress}
                  name="zipCode"
                  placeholder="Enter Zip Code"
                  type="number"
                  value={invoicedata?.companyAddress?.zipCode}
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label for="country" >
                  Country
                </Label>
                <Select
                  theme={selectThemeColors}
                  value={country}
                  className="react-select"
                  classNamePrefix="select"
                  options={countryOptions}
                  isClearable={false}
                  name="country"
                  placeholder="Select Country"
                  onChange={handleCountryChange}
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label >Phone</Label>
                <Input
                  onChange={(e) => {
                    setinvoice({
                      ...invoicedata,
                      [e.target.name]: e.target.value
                    });
                  }}
                  name="phone"
                  placeholder="Number"
                  type="number"
                  value={invoicedata?.phone}
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label >Alternate Phone</Label>
                <Input
                  onChange={(e) => {
                    setinvoice({
                      ...invoicedata,
                      [e.target.name]: e.target.value
                    });
                  }}
                  name="alternatePhone"
                  placeholder="Number"
                  type="number"
                  value={invoicedata?.alternatePhone}
                />
              </div>
            </Col>
            
          </Row>
          <div className="border-bottom my-1">
            <h5>Edit Payment Details</h5>
          </div>
          <Row>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label for="amount" >
                  Invoice Balance
                </Label>
                <Input
                  id="balance"
                  name='invoiceBalance'
                  defaultValue={`Invoice Balance: $ ${(parseFloat(invoicedata?.totalAmount) + parseFloat(invoicedata?.tax) - parseFloat(invoicedata?.discount)) - (parseFloat(invoicedata?.paidAmount))}`}
                  onChange={(e) => {
                    setinvoice({
                      ...invoicedata,
                      [e.target.name]: e.target.value
                    });
                  }}
                  disabled
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label for="amount" >
                  Pay Now
                </Label>
                <Input
                  type="number"
           
                  name='payNow'
                  placeholder="1000"
                  invalid={payNowErr}
                  value={invoicedata?.payNow}
                  onChange={(e) => {
                  
                    if(e.target.value>(parseFloat(invoicedata?.totalAmount) + parseFloat(invoicedata?.tax) - parseFloat(invoicedata?.discount)) - (parseFloat(invoicedata?.paidAmount))){
                      setPayNowErr(true)
                    }
                    else{
                      setPayNowErr(false)
                      setinvoice({
                        ...invoicedata,
                        [e.target.name]: parseInt(e.target.value)
                      });
                    }
                    
                  }}
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label for="payment-amount" >
                  Payment Due
                </Label>
                <Flatpickr
                  id="payment-amount"
                  className="form-control"
                  value={invoicedata?.dueDate}
                  onChange={(date) =>
                    setinvoice({
                      ...invoicedata,
                      dueDate: date
                    })
                  }
                  options={{
                    dateFormat: 'm/d/Y'
                  }}
                />
              </div>
            </Col>
            <Col sm={12} md={12} lg={12}>
              {/* <div>
                <Label >Select Payment</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={roleOptions}
                  onChange={(data) => handleChange(data)}
                />
              </div> */}
              <div className="mb-1">
                <Label for="payment-note" >
                  Internal Payment Note
                </Label>
                <Input
                  type="textarea"
                  rows="2"
                  name='internalPaymentNote'
                  value={invoicedata?.internalPaymentNote}
                  id="internalPaymentNote"
                  placeholder="Internal Payment Note"
                  onChange={(e) => {
                    setinvoice({
                      ...invoicedata,
                      [e.target.name]: e.target.value
                    });
                  }}
                />
              </div>
            </Col>
          </Row>

          {/* {selectPayment === 'Wire' ? (
            <>
              <div>
                <Label>Bank Name</Label>
                <Input name="phone" placeholder="0" type="number" />
              </div>
              <div>
                <Label>Routing</Label>
                <Input name="phone" placeholder="0" type="number" />
              </div>
              <div>
                <Label>Account Number</Label>
                <Input name="phone" placeholder="0" type="number" />
              </div>
              <div>
                <Label>Country</Label>
                <Select
                  id="country"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions}
                />
              </div>
            </>
          ) : selectPayment === 'Debit Card' || selectPayment === 'Credit Card' ? (
            <>
              <div>
                <Label>Card Number</Label>
                <Input name="phone" placeholder="0" type="number" />
              </div>
              <div>
                <Label>Account Holder Name</Label>
                <Input name="phone" placeholder="Full Name" type="number" />
              </div>
              <div className='d-flex'>
                <div className='m-1'>
                  <Label> Exp. Date</Label>
                  <Input name="phone" placeholder="Full Name" type="number" />
                </div>
                <div className='m-1'>
                  <Label>CVV</Label>
                  <Input name="phone" placeholder="Full Name" type="number" />
                </div>
              </div>
            </>
          ) : ""} */}
          {/* { && (
            <>
              <div>
                <Label className="fw-bold">Card Number</Label>
                <Input name="phone" placeholder="0" type="number" />
              </div>
              <div>
                <Label className="fw-bold">Account Holder Name</Label>
                <Input name="phone" placeholder="Full Name" type="number" />
              </div>
            </>
          )} */}
          {/* <div className="p-1 border m-1">
            <div className="d-flex justify-content-between mb-1">
              <label className="cursor-pointer mb-0" htmlFor="Remind">
                Remind
              </label>
              <div className="form-switch">
                <Input
                  onChange={(e) => {
                    setSelectOption(e.target.value);
                  }}
                  checked={selectOption === 'Remind'}
                  type="switch"
                  id="payment-terms"
                  value={'Remind'}
                />
              </div>
            </div>
          </div> */}
          {/* <div className="d-flex justify-content-end">
            <Button className="m-1" color="primary" onClick={handleUpdateInvoice}>
              Save
            </Button>
            <Button className="m-1" outline>
              Cancel
            </Button>
          </div> */}
        </Form>
      </Sidebar>
    </div>
  );
};
export default EditPayment;
