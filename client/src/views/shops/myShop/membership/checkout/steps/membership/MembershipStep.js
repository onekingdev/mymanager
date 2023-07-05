// ** React Imports
import { useContext, useEffect, useState } from 'react';

import Flatpickr from 'react-flatpickr';

// ** Reactstrap Imports
import {
  Form,
  Card,
  Label,
  Input,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Row,
  Col,
  FormFeedback
} from 'reactstrap';

import '@styles/react/libs/flatpickr/flatpickr.scss';
import {
  addMembershipBuyAction,
  getMembershipDetailsAction,
  getProductListAction
} from '../../../../../store/action';
import { useParams } from 'react-router-dom';
import {
  createCustomer,
  useGetStripeConfig
} from '../../../../../../../requests/payment/stripePayment';
import { getStripeConfigAction } from '../../../../../../finance/invoice/store/action';
import DocumentAndPayModal from '../document/DocumentAndPayModal';
import { DocumentContext } from '../../../../../../../utility/context/Document';
import moment from 'moment';

export default function MembershipStep({
  stepper,
  cart,
  buyer,
  setBuyer,
  payment,
  setPayment,
  setCart,
  store,
  dispatch,
  selectedFamily,
  setSelectedFamily
}) {
  // ** States

  const [status, setStatus] = useState(false);
  const [types, setTypes] = useState(['Select...', 'Monthly', 'Weekly', 'PIF']);
  const [days, setDays] = useState([1, 5, 10, 15, 20, 25]);
  const [paytypes, setPayTypes] = useState(['Select...', 'In house', 'Auto pay']);
  const [openDocument, setOpenDocument] = useState(false);
  const [userMembership, setUserMembership] = useState(null);
  const [userDocument, setUserDocument] = useState(null);

  const { shopPath, membershipPath } = useParams();
  const { setBoard, setUrl, setHashcode, setRecipients } = useContext(DocumentContext);
  const [noOfPayments, setNoOfPayments] = useState(cart?.membership?.noOfPayments || '');
  const [totalPrice, setTotalPrice] = useState(cart?.membership?.total || '');
  const [regFee, setRegFee] = useState(cart?.membership?.regFee || '');
  const [downPayment, setDownPayment] = useState(cart?.membership?.downPayment || '');
  const [frequency, setFrequency] = useState(cart?.membership?.frequency || '');
  const [frequencyError, setFrequencyError] = useState('');
  const [startDateError, setStartDateError] = useState('');

  const toggleOpenDocument = () => setOpenDocument(!openDocument);

  const location = window.location.href.split(window.location.origin)[1].split('/')[1];

  const handleBuyMembership = () => {
    if (noOfPayments === '') {
      return;
    }
    if (totalPrice === '') {
      return;
    }
    if (regFee === '') {
      return;
    }
    if (downPayment === '') {
      return;
    }
    if (frequency === types[0]) {
      return;
    }

    let payload = {
      startDate: cart.startDate,
      endDate: cart.endDate,
      membership: cart.membership,
      buyer: buyer,
      contractType: cart.contractMethod,
      members: [...selectedFamily, buyer?._id],
      document: location === 'ecommerce' ? cart.template : cart.membership.template,
      currentPath: /:\/\/([^\/]+)/.exec(window.location.href)[1].split('.')[0]
    };
    dispatch(getStripeConfigAction({ type: 'shop', id: cart.membership.shopId })).then(
      async (res) => {
        if (res.accountId) {
          payload = { ...payload, stripeAccountId: res.accountId };
          if (buyer?.stripe && buyer?.stripe?.customerId) {
            payload = { ...payload, stripeCustomerId: buyer?.stripe?.customerId };
            dispatch(addMembershipBuyAction(payload)).then((res) => {
              setUserMembership({ ...res.membership, member: { ...res.buyer } });
              setUserDocument(res.contract);
              setPayment({
                ...payment,
                total: res.downPayment + res.regFee,
                currency: 'usd'
              });
            });
          } else {
            await createCustomer({
              name: buyer.name,
              email: buyer.email,
              stripeAccountId: res.accountId
            }).then((data) => {
              payload = { ...payload, stripeCustomerId: data.data.data.customerId };
              dispatch(addMembershipBuyAction(payload)).then((res) => {
                setUserMembership({ ...res.membership, member: { ...res.buyer } });
                setUserDocument(res.contract);
                setPayment({
                  ...payment,
                  total: res.downPayment + res.regFee,
                  currency: 'usd'
                });
              });
            });
          }
        } else {
          if (buyer?.stripe && buyer?.stripe?.customerId) {
            payload = { ...payload, stripeCustomerId: buyer?.stripe?.customerId };
            dispatch(addMembershipBuyAction(payload)).then((res) => {
              setUserMembership({ ...res?.membership, member: { ...res?.buyer } });
              setUserDocument(res?.contract);

              setPayment({
                ...payment,
                total: res?.downPayment + res?.regFee,
                currency: 'usd'
              });
            });
          } else {
            await createCustomer({
              name: buyer?.name,
              email: buyer?.email
            }).then((data) => {
              payload = { ...payload, stripeCustomerId: data.data.data.customerId };

              dispatch(addMembershipBuyAction(payload)).then((res) => {
                setUserMembership({ ...res?.membership, member: { ...res?.buyer } });
                setUserDocument(res?.contract);

                setPayment({
                  ...payment,
                  total: res?.downPayment + res?.regFee,
                  currency: 'usd'
                });
              });
            });
          }
        }
      }
    );
  };
  const calculateEndDate = () => {
    if (cart.membership.durationType) {
      if (cart.membership.durationType === 'Months') {
        let start = new Date(cart.startDate);
        let end = moment(start).add(cart.membership.duration, 'months'); //start.setMonth(start.getMonth() + form.duration)
        setCart({ ...cart, endDate: moment(end).format('yyyy-MM-DD') });
      } else {
        let start = new Date(cart.startDate);
        let end = moment(start).add(cart.membership.duration, 'weeks');
        setCart({ ...cart, endDate: moment(end).format('yyyy-MM-DD') });
      }
    }
  };
  const calculateNextPayment = () => {
    //startDate - frequency - dueDate
    let p = cart;
    console.log(cart?.membership?.frequency);
    if (cart?.membership?.frequency && cart.membership.frequency === 'Monthly') {
      if (cart?.membership?.dueDate) {
        let nextMonth = moment(cart.startDate).add(1, 'month');
        let nextPaymentDate = nextMonth.date();
        if (nextPaymentDate > cart.membership.dueDate) {
          nextMonth = nextMonth.add(1, 'month');
          nextMonth = nextMonth.date(cart.membership.dueDate).format('yyyy-MM-DD');
        } else {
          nextMonth = nextMonth.date(cart.membership.dueDate).format('yyyy-MM-DD');
        }
        let m = p.membership;
        m = { ...m, nextPayment: nextMonth };
        setCart({ ...cart, membership: m });
      } else {
        let p = cart;
        p = {
          ...cart,
          membership: {
            ...p.membership,
            nextPayment: moment(cart.startDate).add(1, 'month').format('yyyy-MM-DD')
          }
        };
        setCart(p);
      }
    } else if (cart.membership.frequency === 'Weekly') {
      let p = cart;
      p = {
        ...cart,
        membership: {
          ...p.membership,
          nextPayment: moment(cart.startDate).add(1, 'week').format('yyyy-MM-DD')
        }
      };
      setCart(p);
    }
  };

  const handleSelectProduct = (e) => {
    let c = cart;
    const product = store.products.find((x) => x._id === e.target.value);
    if (c.items) {
      setCart({ ...cart, items: [...c?.items, { itemId: { ...product }, count: 1 }] });
    } else {
      setCart({ ...cart, items: [{ itemId: { ...product }, count: 1 }] });
    }
  };
  const handleChangeCount = (e, x) => {
    let c = cart;
    c.items = c.items.map((i) => {
      let t = i;
      if (i.itemId._id === x.itemId._id) {
        t = { ...t, count: e.target.value };
      }
      return t;
    });
    setCart({ ...cart, items: c.items });
  };
  useEffect(() => {
    if (cart?.startDate && cart?.membership?.frequency) {
      calculateNextPayment();
    }
  }, [cart?.startDate, cart?.membership?.dueDate, cart?.membership?.frequency]);
  useEffect(() => {
    if (cart?.membership?.duration && cart?.membership?.durationType) {
      calculateEndDate();
    }
  }, [cart?.membership?.durationType, cart?.membership?.duration, cart?.startDate]);
  useEffect(() => {
    if (store.products.length === 0) {
      dispatch(getProductListAction({ permission: 'public', shopId: store.shop._id }));
    }
  }, [store.shop]);
  useEffect(() => {
    //calculate amount, balance
    if (cart?.membership) {
      let p = cart;

      setCart(p);
      setCart({
        ...cart,
        membership: {
          ...p.membership,
          balance: p.membership.total - p.membership.downPayment,
          amount: p.membership.balance / p.membership.noOfPayments
          // balance: Number(e.target.value - p.downPayment),
          // amount: Number((e.target.value - p.downPayment) / p.noOfPayments)
        }
      });
    }
  }, [
    cart?.membership?.regFee,
    cart?.membership?.total,
    cart?.membership?.downPayment,
    cart?.membership?.noOfPayments
  ]);
  useEffect(() => {
    dispatch(
      getMembershipDetailsAction({ shopPath: shopPath, membershipPath: membershipPath })
    ).then((res) => {
      if (res?.startDate) {
        setCart({ ...cart, membership: { ...res }, startDate: res.startDate });
      } else {
        setCart({ ...cart, membership: { ...res }, startDate: moment().format('yyyy-MM-DD') });
      }
    });
  }, []);
  useEffect(() => {
    if (userDocument && userDocument !== null) {
      setUrl({
        url: userDocument.documentUrl,
        documentId: userDocument._id
      });
      setBoard([...userDocument.properties]);
      setHashcode(userDocument.recipients[0].hashCode);
      setRecipients(userDocument.recipients);
      toggleOpenDocument();
    }
  }, [userDocument]);


  return (
    <>
      <Row>
        <Col md="8">
          <Card>
            <CardHeader className="flex-column align-items-start">
              <CardTitle tag="h4">Membership Detail</CardTitle>
              <CardText className="text-muted mt-25">Edit membership details</CardText>
            </CardHeader>
            <CardBody>
              {cart?.membership && (
                <div>
                  <Row>
                    <Col md="3" sm="12">
                      <div className="mb-2">
                        <Label className="form-label" for="name">
                          Name <span className="text-danger">*</span>
                        </Label>
                        <></>
                        <Input
                          id="name"
                          placeholder="Membership Name"
                          value={cart?.membership?.name}
                          disabled={true}
                        />
                      </div>
                    </Col>
                    <Col md="3" sm="12">
                      <Label className="form-label">Start Date</Label>
                      <Input
                        type="date"
                        name="startDate"
                        value={cart?.startDate}
                        defaultValue={cart?.startDate}
                        onChange={(e) => {
                          const enteredDate = e.target.value;
                          if (enteredDate === '' || enteredDate === '01/01/0001') {
                            setStartDateError('This field is required.');
                          } else {
                            setStartDateError('');
                          }
                          setCart({ ...cart, startDate: enteredDate });
                        }}
                        disabled={location === 'ecommerce' ? false : true}
                        invalid={startDateError !== ''}
                      />
                      {startDateError !== '' && (
                        <FormFeedback invalid>{startDateError}</FormFeedback>
                      )}
                    </Col>
                    <Col md="3" sm="12">
                      <Label className="form-label" for="startDate">
                        Expiry Date
                      </Label>

                      <Input
                        type="date"
                        name="endDate"
                        disabled
                        value={cart?.endDate}
                        onChange={(e) => {
                          setCart({ ...cart, endDate: e.target.value });
                        }}
                        required
                      />
                    </Col>
                    <Col md="3">
                      <Label>Duration</Label>
                      <Input
                        type="text"
                        disabled
                        value={`${cart?.membership?.duration} ${cart?.membership?.durationType}`}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3" sm="12">
                      <div className="mb-2">
                        <Label className="form-label" for="name">
                          Total Price <span>($)*</span>
                        </Label>
                       
                        <Input
                          type="number"
                          id="totalPrice"
                          placeholder="Total Price"
                          required
                          value={totalPrice}
                          disabled={location === 'ecommerce' ? false : true}
                          onChange={(e) => {
                            let p = cart;

                            if (e.target.value === '0') {
                              setTotalPrice('');
                              setCart({
                                ...cart,
                                membership: {
                                  ...p.membership,
                                  total: '',
                                  balance: '',
                                  amount: ''
                                }
                              });
                            } else {
                              setTotalPrice(e.target.value);
                              setCart({
                                ...cart,
                                membership: {
                                  ...p.membership,
                                  total: Number(e.target.value)
                                }
                              });
                            }
                          }}
                          // invalid={totalPrice === ''}
                        />
                        {/* {totalPrice === '' && (
                          <FormFeedback invalid>This field is required.</FormFeedback>
                        )} */}
                      </div>
                    </Col>
                    <Col md="3" sm="12">
                      <div className="mb-2">
                        <Label className="form-label" for="register">
                          Registeration Fee <span>($)*</span>
                        </Label>
                        {/* <Input
                          type="number"
                          placeholder="Register Fee"
                          disabled={location === 'ecommerce' ? false : true}
                          value={cart?.membership.regFee}
                          required
                          onChange={(e) => {
                            let p = cart;
                            setCart({
                              ...cart,
                              membership: { ...p.membership, regFee: Number(e?.target?.value) }
                            });
                          }}
                        /> */}
                        <Input
                          type="number"
                          id="regFee"
                          placeholder="Registration Fee"
                          required
                          disabled={location === 'ecommerce' ? false : true}
                          value={regFee}
                          onChange={(e) => {
                            let p = cart;
                            setRegFee(e.target.value);
                            setCart({
                              ...cart,
                              membership: { ...p.membership, regFee: Number(e.target.value) }
                            });
                          }}
                          // invalid={regFee === ''}
                        />
                        {/* {regFee === '' && (
                          <FormFeedback invalid>This field is required.</FormFeedback>
                        )} */}
                      </div>
                    </Col>
                    <Col md="3" sm="12">
                      <div className="mb-2">
                        <Label className="form-label" for="name">
                          Down Payment <span>($)*</span>
                        </Label>
                        {/* <Input
                          type="number"
                          id="down_payment"
                          placeholder="Down Payment"
                          disabled={location === 'ecommerce' ? false : true}
                          value={cart?.membership?.downPayment}
                          onChange={(e) => {
                            let p = cart;
                            setCart({
                              ...cart,
                              membership: {
                                ...p.membership,
                                downPayment: Number(e.target.value)
                              }
                            });
                          }}
                        /> */}
                        <Input
                          type="number"
                          id="downPayment"
                          placeholder="Down Payment"
                          disabled={location === 'ecommerce' ? false : true}
                          value={downPayment}
                          onChange={(e) => {
                            let p = cart;
                            setDownPayment(e.target.value);
                            setCart({
                              ...cart,
                              membership: { ...p.membership, downPayment: Number(e.target.value) }
                            });
                          }}
                          // invalid={downPayment === ''}
                        />
                        {/* {downPayment === '' && (
                          <FormFeedback invalid>This field is required.</FormFeedback>
                        )} */}
                      </div>
                    </Col>
                    <Col md="3" sm="12">
                      <div className="mb-2">
                        <Label className="form-label" for="balance">
                          Balance <span>($)</span>
                        </Label>
                        <Input
                          type="number"
                          id="balance"
                          disabled={true}
                          placeholder="Balance"
                          value={cart?.membership?.balance}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    {cart?.membership?.frequency !== 'PIF' && (
                      <Col md="3" sm="12">
                        <div className="mb-2">
                          <Label className="form-label" for="name">
                            # of Payments <span>*</span>
                          </Label>
                          {/* <Input
                        type="number"
                        id="payments"
                        placeholder="Payments"
                        disabled={location === 'ecommerce' ? status : true}
                        value={cart?.membership?.noOfPayments}
                        required
                        min="1" 
                        onChange={(e) => {
                          let p = cart;
                          setCart({
                            ...cart,
                            membership: {
                              ...p.membership,
                              noOfPayments: parseInt(e.target.value) 
                            }
                          });
                        }}
                      /> */}
                          <Input
                            type="number"
                            id="payments"
                            placeholder="Payments"
                            disabled={location === 'ecommerce' ? status : true}
                            value={noOfPayments}
                            required
                            min="1"
                            onChange={(e) => setNoOfPayments(e.target.value)}
                            // invalid={noOfPayments === ''}
                          />
                          {/* {noOfPayments === '' && (
                            <FormFeedback invalid>This field is required.</FormFeedback>
                          )} */}
                        </div>
                      </Col>
                    )}
                    <Col md="3" sm="12">
                      <div className="mb-2">
                        <Label className="form-label" for="name">
                          Frequency<span>*</span>
                        </Label>
                        <Input
                          type="select"
                          id="type"
                          name="type"
                          disabled={location === 'ecommerce' ? false : true}
                          required
                          value={cart?.membership?.frequency}
                          onChange={(e) => {
                            setFrequency(e.target.value);
                            if (e.target.value === 'PIF') {
                              setStatus(true);
                            } else {
                              setStatus(false);
                            }
                            if (e.target.value === 'Select...') {
                              setFrequencyError('Please select a frequency');
                            } else {
                              setFrequencyError('');
                            }
                            let p = cart;
                            setCart({
                              ...cart,
                              membership: {
                                ...p.membership,

                                frequency: e.target.value
                              }
                            });
                          }}
                          // invalid={frequency === 'Select...'}
                        >
                          {types?.map((p, i) => {
                            return (
                              <option key={i} value={p}>
                                {p}
                              </option>
                            );
                          })}
                        </Input>
                        {/* {frequencyError !== '' && (
                          <FormFeedback invalid>{frequencyError}</FormFeedback>
                        )} */}
                      </div>
                    </Col>

                    {cart?.membership?.frequency !== 'PIF' && (
                      <Col md="3" sm="12">
                        <div className="mb-2">
                          <Label className="form-label" for="amount">
                            Amount<span>($)</span>
                          </Label>
                          <Input
                            type="number"
                            id="amount"
                            placeholder="Amount"
                            disabled={location === 'ecommerce' ? status : true}
                            value={cart?.membership?.amount}
                          />
                        </div>
                      </Col>
                    )}

                    {cart?.membership?.frequency === 'Monthly' && (
                      <Col md="3" sm="12">
                        <div className="mb-2">
                          <Label className="form-label" for="name">
                            Due<span>*</span>
                          </Label>
                          <Input
                            type="select"
                            id="due"
                            name="due"
                            disabled={location === 'ecommerce' ? status : true}
                            value={cart?.membership?.dueDate}
                            onChange={(e) => {
                              let p = cart;
                              setCart({
                                ...cart,
                                membership: { ...p.membership, dueDate: e?.target?.value }
                              });
                            }}
                          >
                            {days?.map((p, i) => {
                              return (
                                <option key={i} value={p}>
                                  {p}
                                  {p === 1 ? 'st' : 'th'}
                                </option>
                              );
                            })}
                          </Input>
                        </div>
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <Col md="3" sm="12">
                      <Label className="form-label" for="startDate">
                        Next payment
                      </Label>

                      <Input
                        type="date"
                        name="nextPayment"
                        //disabled
                        value={cart?.membership?.nextPayment}
                      />
                    </Col>
                    {cart?.membership?.frequency !== 'PIF' && (
                      <Col md="3" sm="12">
                        <Label className="form-label" for="name">
                          Payment Type<span>*</span>
                        </Label>
                        <Input
                          type="select"
                          value={cart?.membership?.payInOut}
                          disabled={location === 'ecommerce' ? false : true}
                          onChange={(e) => {
                            let p = cart;
                            setCart({
                              ...cart,
                              membership: { ...p.membership, payInOut: e.target.value }
                            });
                          }}
                          required
                        >
                          {paytypes?.map((p, i) => {
                            return (
                              <option key={i} value={p}>
                                {p}
                              </option>
                            );
                          })}
                        </Input>
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <div className="d-flex justify-content-between px-5 py-3">
                      <Button
                        type="reset"
                        color="secondary"
                        outline
                        onClick={() => stepper.previous()}
                      >
                        Back
                      </Button>
                      <Button className="me-1" color="primary" onClick={handleBuyMembership}>
                        Next
                      </Button>
                    </div>
                  </Row>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <CardBody>
              <div>
                <h6>Add Products to your payment</h6>
                <div>
                  <Label>Products</Label>
                  <Input type="select" onChange={handleSelectProduct}>
                    <option>Select...</option>
                    {store.products &&
                      store?.products?.map((x, idx) => {
                        return (
                          <option value={x._id} key={idx}>
                            {x?.name}
                          </option>
                        );
                      })}
                  </Input>
                </div>
                <table className="table my-1">
                  <tr>
                    <td>Product</td>
                    <td>Count</td>
                    <td>Total</td>
                  </tr>
                  {cart?.items &&
                    cart?.items?.map((x, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{x.itemId.name}</td>
                          <td>
                            <Input
                              type="number"
                              onChange={(e) => handleChangeCount(e, x)}
                              style={{ width: '100px' }}
                            />
                          </td>
                          <td>
                            <span>{Number(x?.itemId?.price * x?.count)}</span>
                          </td>
                        </tr>
                      );
                    })}
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {userMembership !== null && userDocument !== null && (
        <DocumentAndPayModal
          open={openDocument}
          toggle={toggleOpenDocument}
          dispatch={dispatch}
          store={store}
          buyer={buyer}
          membership={userMembership}
          document={userDocument}
          cart={cart}
        />
      )}
    </>
  );
}
