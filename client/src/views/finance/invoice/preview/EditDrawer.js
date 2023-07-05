import React, { Fragment, useEffect, useState } from 'react';
import Sidebar from '@components/sidebar';
import { selectThemeColors } from '@utils';
import Select from 'react-select';
import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import { editinvoiceres } from '../../../../requests/invoice/invoice';
import { useUploadSignature } from '../../../../requests/documents/recipient-doc';

const EditDrawer = ({ openEditSidebar, setOpenEditSidebar, data, setData }) => {
  const [AddressObject, setAddressObject] = useState({});
  const [country, setCountry] = useState({ value: 'USA', label: 'USA' });
  const [bank, setBank] = useState({});
  const [payNowErr, setPayNowErr] = useState(false);

  useEffect(() => {
    if (data) {
      if (data?.alteratePhone === 'undefined') {
        data.alteratePhone = '';
      }
    }
  }, [data]);
  const countryOptions = [
    { value: 'australia', label: 'Australia' },
    { value: 'canada', label: 'Canada' },
    { value: 'russia', label: 'Russia' },
    { value: 'saudi-arabia', label: 'Saudi Arabia' },
    { value: 'singapore', label: 'Singapore' },
    { value: 'sweden', label: 'Sweden' },
    { value: 'switzerland', label: 'Switzerland' },
    { value: 'united-kingdom', label: 'United Kingdom' },
    { value: 'united-arab-emirates', label: 'United Arab Emirates' },
    { value: 'united-states-of-america', label: 'United States of America' }
  ];
  const { mutate } = editinvoiceres();
  const handleSave = () => {
    let payload = data;
    if (data?.file) {
      const formData = new FormData();
      formData.append('file', data?.file);
      useUploadSignature(formData).then((res) => {
        payload = { ...payload, logoUrl: res.url };
        mutate(payload);
      });
    } else {
      mutate(payload);
    }
  };
  const setBankDetails = (e) => {
    let { name, value } = e.target;
    setBank({ ...bank, [name]: value });
    setData({
      ...data,
      bank: { ...bank, [name]: value }
    });
  };
  const handleChangeAddress = (e) => {
    let { name, value } = e.target;
    setAddressObject({ ...AddressObject, [name]: value });
    setData({
      ...data,
      companyAddress: { ...AddressObject, [name]: value }
    });
  };
  const handleSelectLogo = (e) => {
    setData({
      ...data,
      file: e.target.files[0]
    });
  };
  const handleCountryChange = (e) => {
    setCountry(e);
    setAddressObject({ ...AddressObject, country: e?.label });
    setData({
      ...data,
      companyAddress: { ...AddressObject, country: e?.label }
    });
  };
  return (
    <Fragment>
      <Sidebar
        size="lg"
        open={openEditSidebar}
        title="Edit"
        headerClassName="mb-1"
        contentClassName="p-0"
        toggleSidebar={() => setOpenEditSidebar(!openEditSidebar)}
        width="600"
      >
        <Form
        // onSubmit={handleSubmit}
        >
          <div className="border-bottom my-1">
            <h5>Edit Company Details</h5>
          </div>
          <div className="mb-1">
            <Label for="payment-note">My Company Name</Label>
            <Input
              type="text"
              id="payment-note"
              name="companyName"
              onChange={(e) => {
                setData({
                  ...data,
                  [e.target.name]: e.target.value
                });
              }}
              value={data?.companyName}
              placeholder="Company Name"
            />
          </div>
          <Row>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label>Change logo</Label>
                <Input
                  // onChange={handleSelectLogo}
                  onChange={handleSelectLogo}
                  placeholder="image"
                  name="file"
                  type="file"
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label>Street</Label>
                <Input
                  onChange={handleChangeAddress}
                  name="street"
                  placeholder="Street"
                  type="text"
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label>City</Label>
                <Input onChange={handleChangeAddress} name="city" placeholder="City" type="text" />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label>State</Label>
                <Input
                  onChange={handleChangeAddress}
                  name="state"
                  placeholder="State"
                  type="text"
                />
              </div>
            </Col>

            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label>Zip Code</Label>
                <Input
                  onChange={handleChangeAddress}
                  name="zipCode"
                  placeholder="Enter Zip Code"
                  type="number"
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label for="country">Country</Label>
                <Select
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
                <Label>Phone</Label>
                <Input
                  onChange={(e) => {
                    setData({
                      ...data,
                      [e.target.name]: e.target.value
                    });
                  }}
                  name="phone"
                  placeholder="Number"
                  type="phone"
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label>Alternate Phone</Label>
                <Input
                  onChange={(e) => {
                    setData({
                      ...data,
                      [e.target.name]: e.target.value
                    });
                  }}
                  name="alternatePhone"
                  placeholder="Number"
                  type="phone"
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
                <Label for="amount">Invoice Balance</Label>
                <Input
                  id="balance"
                  name="invoiceBalance"
                  defaultValue={`Invoice Balance: $ ${
                    parseFloat(data?.totalAmount) +
                    parseFloat(data?.tax || 0) -
                    parseFloat(data?.discount || 0) -
                    parseFloat(data?.paidAmount || 0)
                  }`}
                  onChange={(e) => {
                    setData({
                      ...data,
                      [e.target.name]: e.target.value
                    });
                  }}
                  disabled
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label for="amount">Pay Now</Label>
                <Input
                  type="number"
                  id="amount"
                  name="payNow"
                  placeholder="1000"
                  value={data?.payNow}
                  invalid={payNowErr}
                  onChange={(e) => {
                    if (
                      e.target.value >
                      parseFloat(data?.totalAmount) +
                        parseFloat(data?.tax) -
                        parseFloat(data?.discount) -
                        parseFloat(data?.paidAmount)
                    ) {
                      setPayNowErr(true);
                    } else {
                      setPayNowErr(false);
                      setData({
                        ...data,
                        [e.target.name]: parseInt(e.target.value)
                      });
                    }
                  }}
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label for="payment-amount">Payment Due</Label>
                <Flatpickr
                  id="payment-amount"
                  className="form-control"
                  value={data?.dueDate}
                  onChange={(date) => {
                    setData({
                      ...data,
                      dueDate: new Date(date)
                    });
                  }}
                  options={{
                    dateFormat: 'm/d/Y'
                  }}
                />
              </div>
            </Col>
            <Col sm={12} md={12} lg={12}>
              <div className="mb-1">
                <Label for="payment-note">Internal Payment Note</Label>
                <Input
                  type="textarea"
                  rows="2"
                  name="internalPaymentNote"
                  id="internalPaymentNote"
                  placeholder="Internal Payment Note"
                  value={data?.internalPaymentNote === 'undefined' ? '' : data?.internalPaymentNote}
                  onChange={(e) => {
                    setData({
                      ...data,
                      [e.target.name]: e.target.value
                    });
                  }}
                />
              </div>
            </Col>
          </Row>
          <div className="border-bottom my-1">
            <h5>Bank Details</h5>
          </div>
          <Row>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label>Bank Name</Label>
                <Input onChange={setBankDetails} name="name" placeholder="Bank Name" type="text" value={data?.bank?.name} />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label>Country</Label>
                <Input
                  onChange={setBankDetails}
                  name="country"
                  placeholder="Bank Country"
                  type="text"
                  value={data?.bank?.country}
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label>Routing # </Label>
                <Input onChange={setBankDetails} value={data?.bank?.routing} name="routing" placeholder="Routing" type="text" />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label>Account #</Label>
                <Input
                  onChange={setBankDetails}
                  name="accountNo"
                  placeholder="Account No."
                  type="text"
                  value={data?.bank?.accountNo}
                />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label>IBAN</Label>
                <Input onChange={setBankDetails} value={data?.bank?.iban} name="iban" placeholder="IBAN" type="text" />
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <div className="mb-1">
                <Label>SWIFT</Label>
                <Input onChange={setBankDetails} name="swift" value={data?.bank?.swift} placeholder="SWIFT" type="text" />
              </div>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <Button className="m-1" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button className="m-1" onClick={() => setOpenEditSidebar(false)} outline>
              Cancel
            </Button>
          </div>
        </Form>
      </Sidebar>
    </Fragment>
  );
};
export default EditDrawer;
