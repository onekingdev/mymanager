/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Custom Components
import Sidebar from '@components/sidebar';

// ** Third Party Components
import Flatpickr from 'react-flatpickr';
import { X, Plus, Hash, Edit } from 'react-feather';
import Select, { components } from 'react-select';

// ** Reactstrap Imports
import { selectThemeColors } from '@utils';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  InputGroup,
  InputGroupText
} from 'reactstrap';

// ** Styles
import 'react-slidedown/lib/slidedown.css';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/base/pages/app-invoice.scss';

import { getUserData } from '../../../../auth/utils';
import { getProductListAction } from '../../../shops/store/action';
import SidebarNewUsers from '../../../contacts/contact-list/Sidebar';
import { selectContactReducer } from '../../../contacts/store/reducer';

const AddCard = ({ invoicedata, setinvoice, payUsing, store,dispatch }) => {
  
  // ** States
 
  const [value, setValue] = useState({});
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [addcustomerdata, setaddcustomerdata] = useState({});
  const [logo, setLogo] = useState(null);
  
  const [bankDetails, setBankDetails] = useState({
    iban: '',
    swift: '',
    name: ''
  });
  const [options, setOptions] = useState([
  ]);
  const handlechnageitems = (e, i) => {
    if(e.target.value!=='selectItem'){
      const { name, value } = e.target;
      let data = [...invoicedata.items];
      data[i][name] = value;
 
      let totalAmount = 0;
      for (const item of data) {
        totalAmount = totalAmount + item.rate * item.quantity;
      }
      
      setinvoice({
        ...invoicedata,
        items: data,
        totalAmount: totalAmount
      });
    }
    
  };
  
  useEffect(() => {
    // ** Get Contacts
    const arr = [{
      value: 'add-new',
      label: 'Add New Customer',
      type: 'button',
      color: 'flat-success'
    }];
    store?.contactList?.list?.map((item) => arr.push({ value: item._id, label: item.fullName }));
    setOptions([...arr]);
    dispatch(selectContactReducer({}))
  }, [store?.contactList]);

  // ** Deletes form
  const deleteForm = (i) => {
    const data = [...invoicedata.items];
    data.splice(i, 1);
    setinvoice({
      ...invoicedata,
      items: data
    });
  };

  
  

  // ** Function to toggle sidebar
  const toggleSidebar = () => setOpen(!open);

  // ** Vars
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

  // ** Custom Options Component
  const OptionComponent = ({ data, ...props }) => {
    if (data.type === 'button') {
      return (
        <Button
          className="text-start rounded-0 px-50"
          color={data.color}
          block
          onClick={() => setOpen(true)}
        >
          <Plus className="font-medium-1 me-50" />
          <span className="align-middle">{data.label}</span>
        </Button>
      );
    } else {
      return <components.Option {...props}> {data.label} </components.Option>;
    }
  };

  // ** Invoice To OnChange
  const handleInvoiceToChange = (value) => {
    
    setValue(value);
    setinvoice({
      ...invoicedata,
      customerId: value?.value
    });
    setSelected(store?.contactList?.list?.filter((i) => i._id === value?.value)[0]);
  };
  // add customer
  const handlesubmit = (e) => {
    e.preventDefault();
    //mutate(addcustomerdata);
    setOpen(false);
  };
  const handleBankInfo = (e) => {
    let { name, value } = e.target;
    setBankDetails({
      ...bankDetails,
      [name]: value
    });
    setinvoice({
      ...invoicedata,
      bank: bankDetails
    });
  };

  const handleadditems = () => {
    const data = [...invoicedata.items];
    data.push({
      //itemId: '',
      name:'',
      description: '',
      rate: 0,
      quantity: 1
    });

    setinvoice({
      ...invoicedata,
      items: data
    });
  };
  const handlescustomerdatachange = (e) => {
    const { name, value } = e.target;
    setaddcustomerdata({
      ...addcustomerdata,
      [name]: value
    });
  };

  const handleCountry = (value) => {
    setaddcustomerdata({
      ...addcustomerdata,
      country: value?.value
    });
  };

  useEffect(() => {
    if (invoicedata.file) {
      let reader = new FileReader();
      reader.readAsDataURL(invoicedata.file);
      reader.onloadend = function (e) {
        setLogo([reader.result]);
      }.bind(this);
    }
  }, [invoicedata?.file]);

  return (
    <Fragment>
      <Card className="invoice-preview-card">
        {/* Header */}
        <Form>
          <CardBody className="invoice-padding pb-0">
            <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
              <div>
                <div className="logo-wrapper">
                  {logo !== null ? (
                    <img src={logo} style={{ width: '45px' }} />
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
                  <h3 className="text-primary invoice-logo">
                    {invoicedata?.companyName || 'My Manager'}
                  </h3>
                </div>
                <>
                  <p className="card-text mb-25">
                    {invoicedata?.companyAddress?.street  &&
                      (invoicedata?.companyAddress?.street ) ||
                      'Street address, '}
                  </p>
                  <p className="card-text mb-25">
                    {(invoicedata?.companyAddress?.city  &&
                      invoicedata?.companyAddress?.city + ',') ||
                      'city, '}
                    {' '}
                    {(invoicedata?.companyAddress?.state  &&
                      invoicedata?.companyAddress?.state + ',') ||
                      'state, '}{' '}
                    {(invoicedata?.companyAddress?.zipCode  &&
                      invoicedata?.companyAddress?.zipCode + ',') ||
                      'zip code, '}
                     {invoicedata?.companyAddress?.country || ''}
                  </p>
                  <p className="card-text mb-0">
                    {(invoicedata?.phone  && invoicedata?.phone + ',') || 'phone number, '}
                    {(invoicedata?.alternatePhone  && invoicedata?.alternatePhone) ||
                      'alternative phone number'}
                  </p>
                </>
              </div>
              <div className="invoice-number-date mt-md-0 mt-2">
                <div className="d-flex align-items-center justify-content-md-end mb-1">
                  <h4 className="invoice-title">Invoice</h4>
                  {/* <InputGroup className="input-group-merge invoice-edit-input-group disabled">
                    <InputGroupText>
                      <Hash size={15} />
                    </InputGroupText>
                    <Input
                      type="number"
                      className="invoice-edit-input"
                      value={parseInt(store?.invoiceList[store?.invoiceList?.length - 1]?.no) + 1 || 53634}
                      placeholder="53634"
                      disabled
                    />
                  </InputGroup> */}
                </div>
                <div className="d-flex align-items-center mb-1">
                  <span className="title">Date:</span>
                  <Flatpickr
                    value={invoicedata?.date}
                    onChange={(date) =>
                      setinvoice({
                        ...invoicedata,
                        date: date
                      })
                    }
                    options={{
                      dateFormat: 'm-d-Y'
                    }}
                    className="form-control invoice-edit-input date-picker"
                  />
                </div>
                <div className="d-flex align-items-center">
                  <span className="title">Due Date:</span>
                  <Flatpickr
                    value={invoicedata?.dueDate}
                    onChange={(date) =>
                      setinvoice({
                        ...invoicedata,
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
            </div>
          </CardBody>
          {/* /Header */}
          <hr className="invoice-spacing" />
          {/* Address and Contact */}
          <CardBody className="invoice-padding pt-0">
            <Row className="row-bill-to invoice-spacing">
              <Col className="col-bill-to ps-0" xl="8">
                <h6 className="invoice-to-title">Invoice To:</h6>
                <div className="invoice-customer">
                <Select
                        className="react-select"
                        classNamePrefix="select"
                        id="label"
                        value={value}
                        options={options}
                        theme={selectThemeColors}
                        components={{
                          Option: OptionComponent
                        }}
                        onChange={handleInvoiceToChange}
                      />
                      {selected !== null ? (
                        <div className="customer-details mt-1">
                          <p className="mb-25">{selected?.fullName}</p>
                          <p className="mb-25">{selected?.address?.country}</p>
                          <p className="mb-0">{selected?.contact}</p>
                          <p className="mb-0">{selected?.email}</p>
                        </div>
                      ) : null}
                </div>
              </Col>
              <Col className="pe-0 mt-xl-0 mt-2" xl="4">
                <div className="invoice-total-item d-flex justify-content-start">
                  <p className="invoice-total-title my-0 py-0 me-50">PAY NOW:</p>
                  <p className="invoice-total-amount">
                    $
                    {invoicedata?.payNow ||
                      invoicedata?.totalAmount - invoicedata?.discount + invoicedata?.tax}
                  </p>
                </div>
                <h5>
                  Payments Accepted :{payUsing[0] ? ` ${payUsing[0]?.value}` : ''}
                  {payUsing[1] ? `, ${payUsing[1]?.value}` : ''}
                  {payUsing[2] ? `, ${payUsing[2]?.value}` : ''}
                  {payUsing[3] ? `, ${payUsing[3]?.value}` : ''}
                </h5>

                <table>
                  <tbody>
                    {/* <tr>
                        <td className="pe-1"></td>
                        <td>
                          <span className="fw-bolder"></span>
                        </td>
                      </tr> */}
                    {payUsing.some((e) => e.value === 'Wire Transfer') ? (
                      <>
                        <tr>
                          <td className="pe-1">Bank name:</td>
                          <td>
                            <Input
                              type="text"
                              onChange={handleBankInfo}
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
                              onChange={handleBankInfo}
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
                              onChange={handleBankInfo}
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
                              onChange={handleBankInfo}
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
                              onChange={handleBankInfo}
                              name="swift"
                              placeholder="SWIFT code"
                            />
                          </td>
                        </tr>
                      </>
                    ) : (
                      ''
                    )}
                  </tbody>
                </table>
              </Col>
            </Row>
          </CardBody>
         

          {/* Product Details */}
          <CardBody className="invoice-padding invoice-product-details">
          {/* <Col sm="12" className='mb-1'>
                        <div className="col-lg-5 col-sm-12">
                          <Label>Item Type</Label>
                          <Input
                            type="select"
                            className="item-details"
                            
                            onChange={(e) => {
                              //handlechnageitems(e);
                              handleTypeChanged(e);
                            }}
                            name="item"
                          >
                            <option value="products">Products</option>
                            <option value="courses">Courses</option>
                            <option value="memberships">Memberships</option>
                            <option value="events">Events</option>
                          </Input>
                        </div>
                      </Col> */}
            {invoicedata?.items.map((item, i) => {
              return (
                <Row key={i} className="mb-1">
                  <Col className="d-flex product-details-border position-relative pe-0" sm="12">
                    <Row className="w-100 pe-lg-0 pe-1 py-2">
                      
                      <Col className="mb-lg-0 mb-2 mt-lg-0 mt-2" lg="5" sm="12">
                        {/* <CardText className="col-title mb-md-50 mb-0">Item</CardText> */}
                        <Label>Item</Label>
                        <Input type="text" name='name' value={item?.name} onChange={(e) => {
                            handlechnageitems(e, i);
                          }} placeholder='product or service name'/>
                        {/* <Input
                          type="select"
                          className="item-details"
                          defaultValue={item?.item}
                          onChange={(e) => {
                            handlechnageitems(e, i);
                          }}
                          name="itemId"
                        >
                          <option value="selectItem">Select...</option>
                          {items && items?.map((x,idx)=>{
                            return <option value={x.value} key={idx}>{x.name}</option>
                          })}
                        </Input> */}
                        {/* <Input
                          className="mt-2"
                          type="textarea"
                          rows="1"
                          defaultValue={item?.description}
                          onChange={(e) => {
                            handlechnageitems(e, i);
                          }}
                          name="description"
                        /> */}
                      </Col>
                      <Col className="my-lg-0 my-2" lg="3" sm="12">
                        {/* <CardText className="col-title mb-md-2 mb-0">Cost</CardText> */}
                        <Label>Cost</Label>
                        <Input
                          type="number"
                          placeholder="24"
                          value={item?.rate}
                          onChange={(e) => {
                            handlechnageitems(e, i);
                          }}
                          name="rate"
                        />
                      </Col>
                      <Col className="my-lg-0 my-2" lg="2" sm="12">
                        {/* <CardText className="col-title mb-md-2 mb-0">Qty</CardText> */}
                        <Label>Qty</Label>
                        <Input
                          type="number"
                          value={item?.quantity}
                          placeholder="1"
                          onChange={(e) => {
                            handlechnageitems(e, i);
                          }}
                          name="quantity"
                        />
                      </Col>
                      <Col className="my-lg-0 mt-2" lg="2" sm="12">
                        {/* <CardText className="col-title mb-md-50 mb-0">Price</CardText> */}
                        <Label>Price</Label>
                        <CardText className="mb-0 align-items-center">
                          ${item.rate * item.quantity}
                        </CardText>
                      </Col>
                      <Col className="mb-lg-0 mb-2 mt-lg-0 mt-2" lg="5" sm="12">
                        {/* <CardText className="col-title mb-md-50 mb-0">Price</CardText> */}
                        <Label>Description</Label>
                        <Input
                          // className="mt-2"
                          type="textarea"
                          rows="1"
                          defaultValue={item?.description}
                          onChange={(e) => {
                            handlechnageitems(e, i);
                          }}
                          name="description"
                        />
                      </Col>
                      {/* <Col className="my-lg-0 my-2" lg="3" sm="12">
                       
                        <div className="mt-2">
                          <span>Discount:</span> <span>0%</span>
                        </div>
                      </Col> */}
                    </Row>
                    <div className="d-flex justify-content-center border-start invoice-product-actions py-50 px-25">
                      <X
                        size={18}
                        className="cursor-pointer"
                        onClick={() => {
                          deleteForm(i);
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              );
            })}
            <Row className="mt-1">
              <Col sm="12" className="px-0">
                <Button color="primary" size="sm" className="btn-add-new" onClick={handleadditems}>
                  <Plus size={14} className="me-25" />{' '}
                  <span className="align-middle">Add Item</span>
                </Button>
              </Col>
            </Row>
          </CardBody>

          {/* /Product Details */}

          {/* Invoice Total */}
          <CardBody className="invoice-padding">
            <Row className="invoice-sales-total-wrapper">
              <Col
                className="mt-md-0 mt-3"
                md={{ size: '6', order: 1 }}
                xs={{ size: 12, order: 2 }}
              >
                <Row>
                  <Col md="3" className="my-auto">
                    <Label for="salesperson" className="form-label">
                      Salesperson:
                    </Label>
                  </Col>
                  <Col md="9">
                    <Input
                      type="text"
                      className="ms-50"
                      id="salesperson"
                      placeholder={getUserData()?.fullName || 'Your name'}
                      onChange={(e) =>
                        setinvoice({
                          ...invoicedata,
                          salesperson: e.target.value
                        })
                      }
                      defaultValue={getUserData()?.fullName}
                    />
                  </Col>
                </Row>
                <Row className="mt-50">
                  <Col md="3" className="my-auto">
                    <Label for="salesperson" className="form-label">
                      Discount:
                    </Label>
                  </Col>
                  <Col md="9">
                    <div className="d-flex justify-content-between w-100">
                      <Input
                        type="text"
                        className="ms-50 w-100"
                        id="salesperson"
                        placeholder={'Discount Percentage'}
                        onChange={(e) =>
                          setinvoice({
                            ...invoicedata,
                            discount:
                              invoicedata.totalAmount * (parseFloat(e.target.value) / 100) || 0
                          })
                        }
                        defaultValue={0}
                      />{' '}
                      <h5 className="my-auto ms-50" style={{ width: '20px' }}>
                        {' '}
                        %
                      </h5>
                    </div>
                  </Col>
                </Row>
                <Row className="mt-50">
                  <Col md="3" className="my-auto">
                    <Label for="salesperson" className="form-label">
                      Tax:
                    </Label>
                  </Col>
                  <Col md="9">
                    <div className="d-flex justify-content-between w-100">
                      <Input
                        type="text"
                        className="ms-50 w-100"
                        id="salesperson"
                        placeholder={'Discount Percentage'}
                        onChange={(e) =>
                          setinvoice({
                            ...invoicedata,
                            tax: invoicedata.totalAmount * (parseFloat(e.target.value) / 100) || 0
                          })
                        }
                        defaultValue={0}
                      />{' '}
                      <h5 className="my-auto ms-50" style={{ width: '20px' }}>
                        {' '}
                        %
                      </h5>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col
                className="d-flex justify-content-end"
                md={{ size: '6', order: 2 }}
                xs={{ size: 12, order: 1 }}
              >
                <div className="invoice-total-wrapper">
                  <div className="invoice-total-item">
                    <p className="invoice-total-title">Subtotal:</p>
                    <p className="invoice-total-amount">${invoicedata?.totalAmount}</p>
                  </div>
                  <div className="invoice-total-item">
                    <p className="invoice-total-title">Discount:</p>
                    <p className="invoice-total-amount">- ${invoicedata?.discount}</p>
                  </div>
                  <div className="invoice-total-item">
                    <p className="invoice-total-title">Tax:</p>
                    <p className="invoice-total-amount">+ ${invoicedata?.tax}</p>
                  </div>
                  <hr className="my-50" />
                  <div className="invoice-total-item">
                    <p className="invoice-total-title">Total:</p>
                    <p className="invoice-total-amount">
                      ${invoicedata?.totalAmount - invoicedata?.discount + invoicedata?.tax}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
          {/* /Invoice Total */}

          <hr className="invoice-spacing mt-0" />

          {/* Invoice Note */}
          <CardBody className="invoice-padding py-0">
            <Row>
              <Col>
                <div className="mb-2">
                  <Label for="note" className="form-label fw-bold">
                    Note:
                  </Label>
                  <Input
                    type="textarea"
                    rows="2"
                    name="note"
                    id="note"
                    defaultValue={invoicedata?.note}
                    onChange={(e) =>
                      setinvoice({
                        ...invoicedata,
                        note: e.target.value
                      })
                    }
                    required
                  />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Form>
        {/* /Invoice Note */}
      </Card>
     <SidebarNewUsers store={store} open={open} toggleSidebar={toggleSidebar}  contactTypeTitle="Contact"  orderContactType={0}/>
    </Fragment>
  );
};

export default AddCard;
