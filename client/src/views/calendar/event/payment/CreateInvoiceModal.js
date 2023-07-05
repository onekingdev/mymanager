import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardText, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import Flatpickr from 'react-flatpickr';

export default function CreateInvoiceModal({ toggle, open, row, event }) {
  const [invoice, setInvoice] = useState();
  const organization = localStorage.getItem('organization');
 
  useEffect(() => {
    let temp = {};
    let org;
    if (organization && organization !== null) {
      org = JSON.parse(organization);
      temp = {
        ...temp,
        companyAddress: { street: org.address },
        phone: org.phone,
        companyName: org.name,
        logoUrl: org.logoLink
      };
    }
    temp = {
      ...temp,
      itemType: 'event',
      customerId: row?.contactId ? row?.contactId : row?.contact?._id,
      internalPaymentNote: 'Invoice for event',
      date: moment().format('MM/DD/yyyy'),
      dueDate: moment().add(1, 'day').format('MM/DD/yyyy'),
      items: [],
      totalAmount: 0,
      discount: 0,
      tax: 0,
      paidAmount: 0,
      status: 'DUE',
      currency: 'USD',
      bank: {},
      salesperson: '',
      note: '',
      payNow: 0,
      acceptedPaymentMethods:[]
    };
    setInvoice(temp);
  }, [organization, row, event]);
  return (
    <Modal isOpen={open} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>Create Invoice</ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            <div>
              <div className="d-flex justify-content-between">
                <div>
                  {invoice?.logoUrl ? (
                    <img src={invoice?.logoUrl} style={{ width: '45px' }} />
                  ) : (
                    <svg viewBox="0 0 139 95" version="1.1" height="24">
                      <defs>
                        <linearGradient
                          id="invoice-linearGradient-1"
                          x1="100%"
                          y1="10.5120544%"
                          x2="50%"
                          y2="89.4879456%"
                        >
                          <stop stopColor="#000000" offset="0%"></stop>
                          <stop stopColor="#FFFFFF" offset="100%"></stop>
                        </linearGradient>
                        <linearGradient
                          id="invoice-linearGradient-2"
                          x1="64.0437835%"
                          y1="46.3276743%"
                          x2="37.373316%"
                          y2="100%"
                        >
                          <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                          <stop stopColor="#FFFFFF" offset="100%"></stop>
                        </linearGradient>
                      </defs>
                      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g transform="translate(-400.000000, -178.000000)">
                          <g transform="translate(400.000000, 178.000000)">
                            <path
                              className="text-primary"
                              d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                              style={{
                                fill: 'currentColor'
                              }}
                            ></path>
                            <path
                              d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                              fill="url(#invoice-linearGradient-1)"
                              opacity="0.2"
                            ></path>
                            <polygon
                              fill="#000000"
                              opacity="0.049999997"
                              points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                            ></polygon>
                            <polygon
                              fill="#000000"
                              opacity="0.099999994"
                              points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                            ></polygon>
                            <polygon
                              fill="url(#invoice-linearGradient-2)"
                              opacity="0.099999994"
                              points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                            ></polygon>
                          </g>
                        </g>
                      </g>
                    </svg>
                  )}
                  <h3 className="text-primary">{invoice?.companyName || 'My Manager'}</h3>
                  <p>
                    <span className="me-50">{invoice?.companyAddress?.street}</span>
                    <span className="me-50">{invoice?.companyAddress?.city}</span>
                    <span className="me-50">{invoice?.companyAddress?.state}</span>
                    <span className="me-50">{invoice?.companyAddress?.country}</span>
                    <span className="me-50">{invoice?.companyAddress?.zipCode}</span>
                  </p>
                  <p>
                    {invoice?.phone} {invoice?.alternatePhone}
                  </p>
                </div>
                <div>
                  <div>
                    <span className="title">Date:</span>
                    <Flatpickr
                      value={invoice?.date}
                      onChange={(date) =>
                        setInvoice({
                          ...invoice,
                          date: date
                        })
                      }
                      options={{
                        dateFormat: 'm-d-Y'
                      }}
                      className="form-control invoice-edit-input date-picker"
                    />
                  </div>
                  <span className="title">Due Date:</span>
                  <Flatpickr
                    value={invoice?.dueDate}
                    onChange={(date) =>
                      setInvoice({
                        ...invoice,
                        dueDate: date
                      })
                    }
                    className="form-control invoice-edit-input due-date-picker"
                    options={{
                      dateFormat: 'm-d-Y'
                    }}
                  />
                </div>
              </div>
              <hr />
              <Row>
                <Col md="8">
                <h6>Invoice To:</h6>
              <p className="mb-25">{row?.contact?.fullName}</p>
              <p className="mb-25">{row?.contact?.address?.country}</p>
              <p className="mb-0">{row?.contact?.contact}</p>
              <p className="mb-0">{row?.contact?.email}</p>
                </Col>
                <Col md="4">
                    <div className='d-flex'>
                        <p>Pay Now: </p>
                        <Input type='text' value={invoice?.payNow}/>
                    </div>
                    <h5>
                        Payments Accepted: 
                        {invoice?.acceptedPaymentMethods?.map(x=> <span className='me-50'>{x}</span>)}
                    </h5>
                    <table>
                    <tr>
                          <td className="pe-1">Bank name:</td>
                          <td>
                            <Input
                              type="text"
                            
                              name="name"
                              placeholder="Bank Name"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pe-1">IBAN:</td>
                          <td>
                            <Input
                              type="text"
                              
                              name="iban"
                              placeholder="IBAN"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pe-1">Routing #:</td>
                          <td>
                            <Input
                              type="text"
                              
                              name="routing"
                              placeholder="Routing"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pe-1">Account # :</td>
                          <td>
                            <Input
                              type="text"
                           
                              name="accountNo"
                              placeholder="Acount number"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pe-1">SWIFT code:</td>
                          <td>
                            <Input
                              type="text"
                              
                              name="swift"
                              placeholder="SWIFT code"
                            />
                          </td>
                        </tr>
                    </table>

                </Col>
              </Row>
              <hr/>
              <h6>Product Details</h6>
              {invoice?.items?.map((item,idx)=>{
                return (
                    <Row key={idx}>
                        <Col md="5">
                            <Label>Item</Label>
                            <Input type="text" name='name' value={item?.name} disabled/>
                            <Label>Description</Label>
                            <Input type="textArea" name='description' value={item?.description} />
                        </Col>
                        <Col md="3">
                        <Label>Rate</Label>
                            <Input type="text" name='rate' value={item?.rate} />
                        </Col>
                        <Col md="2">
                        <Label>QTY</Label>
                            <Input type="text" name='quantity' value={item?.quantity} />
                        </Col>
                        <Col md="2">
                        <Label>Price</Label>
                        <CardText className="mb-0 align-items-center">
                          ${item?.rate * item?.quantity}
                        </CardText>
                        </Col>
                    </Row>
                )
              })}
              <div>
                <Row>
                    <Col md="8">
                    <div>
                        <Label>Sales Person</Label>
                        <Input type='text' value={invoice?.salesperson}/>
                        <Label>Discount</Label>
                        <Input type='text' value={invoice?.discount}/> %
                        <Label>Tax</Label>
                        <Input type='text' value={invoice?.tax}/> %
                    </div>
                    </Col>
                    <Col md="4">
                        <p>Subtotal: ${invoice?.totalAmount}</p>
                        <p>Discount: ${invoice?.discount}</p>
                        <p>Tax: ${invoice?.tax}</p>
                        <hr/>
                        <p>Total:  ${invoice?.totalAmount - invoice?.discount + invoice?.tax}</p>
                    </Col>
                </Row>
              </div>
            </div>

          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  );
}
