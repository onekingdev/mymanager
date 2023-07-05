import React, { useEffect, useState } from 'react';
import Sidebar from '@components/sidebar';
import { Button, ButtonGroup, Col, Input, Label, Row } from 'reactstrap';
import Select, { components } from 'react-select';
import classnames from 'classnames';
import AddMembershipType from '../types/AddMembershipType';
import { addMembershipAction } from '../../../../../store/action';
import ContractsModal from './ContractsModal';
import { convertDate } from '../../../../../../goals/helpers/converters';
import moment from 'moment';
import { getUserData } from '../../../../../../../auth/utils';

export default function AddMembershipSidebar({ open, toggle, dispatch, store }) {
  //'2023-05-29'
  const [form, setForm] = useState({ isRecuring: true });
  const [activeView, setActiveView] = useState('Recurring');
  const [paymentTypes, setPaymentTypes] = useState();
  const [membershipTypesOptions, setMembershipTypeOptions] = useState([]);
  const [openAddType, setOpenAddType] = useState(false);
  const [invalidPath, setInvalidPath] = useState(false);
  const [openContracts, setOpenContracts] = useState(false);

  const toggleContracts = () => setOpenContracts(!openContracts);

  const types = ['Select Type', 'Months', 'Weeks'];
  const permissionOptions = [
    { value: 'Select...', label: 'Select' },
    { value: 'private', label: 'Private' },
    { value: 'public', label: 'Public' }
  ];

  const toggleAddType = () => setOpenAddType(!openAddType);
  const MembershipTypeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center z-3">
          <p className={`mb-0 rounded-3 px-1 text-white`} style={{ backgroundColor: data.color }}>
            {data.label}
          </p>
        </div>
      </components.Option>
    );
  };

  const handleAddMembership = () => {
    let payload = { ...form, shopId: store.shop._id, creatorType: getUserData().userType };
    if (localStorage.getItem('organization') !== null) {
      let organization = JSON.parse(localStorage.getItem('organization'));
      payload = {
        ...payload,
        organizationId: organization._id,
        creatorType: getUserData().userType
      };
    }

    dispatch(addMembershipAction(payload));
  };
  const calculateEndDate = () => {
    if (form.durationType) {
      if (form.durationType === 'Months') {
        let start = new Date(form.startDate);
        let end = moment(start).add(form.duration, 'months'); //start.setMonth(start.getMonth() + form.duration)
        setForm({ ...form, endDate: moment(end).format('yyyy-MM-DD') });
      } else {
        let start = new Date(form.startDate);
        let end = moment(start).add(form.duration, 'weeks');
        setForm({ ...form, endDate: moment(end).format('yyyy-MM-DD') });
      }
    }
  };
  //['Select Type', 'PIF']
  useEffect(() => {
    if (activeView === 'Recurring') {
      setPaymentTypes(['Select Type', 'Monthly', 'Weekly']);
    } else {
      setPaymentTypes(['Select Type', 'PIF']);
    }
  }, [activeView]);

  useEffect(() => {
    if (store.membershipTypes) {
      let temp = [];
      store.membershipTypes.map((x) => {
        let t = { value: x._id, label: x.type, color: x.color };
        temp.push(t);
      });
      setMembershipTypeOptions(temp);
    }
  }, [store.membershipTypes]);

  useEffect(() => {
    if (form.duration && form.durationType) {
      calculateEndDate();
    }
  }, [form.durationType, form.duration, form.startDate]);

  useEffect(() => {
    setForm({ ...form, startDate: moment().format('yyyy-MM-DD') });
  }, []);

  return (
    <>
      <Sidebar
        size="lg"
        open={open}
        toggleSidebar={toggle}
        title="New Membership"
        headerClassName="mb-1"
        contentClassName="pt-0"
        style={{ width: '37%' }}
      >
        <div>
          <Label className="form-label" for="name">
            Name <span className="text-danger">*</span>
          </Label>
          <></>
          <Input
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
            id="name"
            placeholder="Membership Name"
          />
        </div>
        <div>
          <Label className="form-label" for="name">
            Path <span className="text-danger">*</span>
          </Label>
          <></>
          <Input
            onChange={(e) => {
              const exists = store.memberships.filter(
                (x) => x.path === `${store.shop.shopPath}/${e.target.value.replaceAll(' ', '-')}`
              );
              if (exists.length === 0) {
                setInvalidPath(false);
                setForm({
                  ...form,
                  path: `${store.shop.shopPath}/${e.target.value.replaceAll(' ', '-')}`
                });
              } else {
                setInvalidPath(true);
              }
            }}
            id="name"
            placeholder="Membership Name"
            invalid={invalidPath}
          />
        </div>
        <div>
          <Label className="form-label" for="membership-type">
            Membership Type<span className="text-danger">*</span>
          </Label>
          <div className="col-12 p-0 d-flex justify-content-between">
            <div className="col-8">
              <Select
                id="membership_type"
                className="react-select"
                classNamePrefix="select"
                isClearable={false}
                options={membershipTypesOptions}
                // theme={selectThemeColors}
                onChange={(data) => {
                  //setMembershipType({ ...data });
                  setForm({ ...form, type: data.value });
                }}
                components={{ Option: MembershipTypeComponent }}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />
            </div>
            <div className="col-3">
              <Button onClick={toggleAddType} className="me-1" color="primary">
                {'Add'}
              </Button>
            </div>
          </div>
        </div>
        <div className="col-12 mb-1 d-flex justify-content-between">
          <div className="col-5">
            <Label className="form-label" for="duration">
              Duration<span className="text-danger">*</span>
            </Label>
            <Input
              type="number"
              id="duration"
              placeholder="Enter time"
              onChange={(e) => {
                setForm({ ...form, duration: e.target.value });
              }}
            />
          </div>
          <div className="col-5">
            <Label className="form-label" for="payment-type">
              Duration Type<span className="text-danger">*</span>
            </Label>
            <div className="container">
              <div className="row d-flex justify-content-between">
                <div className="col-12 p-0">
                  <Input
                    type="select"
                    id="type"
                    name="type"
                    onChange={(e) => {
                      setForm({ ...form, durationType: e.target.value });
                    }}
                  >
                    {types?.map((p, i) => {
                      return (
                        <option key={i} value={p}>
                          {p}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="pricing">
            Pricing<span className="text-danger">*</span>
          </Label>
          <div>
            <ButtonGroup>
              <Button
                tag="label"
                className={classnames('btn-icon view-btn grid-view-btn', {
                  active: activeView === 'Recurring'
                })}
                color="primary"
                outline
                onClick={() => {
                  setForm({ ...form, isRecuring: true });
                  setActiveView('Recurring');
                }}
              >
                Recurring<span className="text-danger">*</span>
              </Button>
              <Button
                tag="label"
                className={classnames('btn-icon view-btn list-view-btn', {
                  active: activeView === 'One Time'
                })}
                color="primary"
                outline
                onClick={() => {
                  setForm({ ...form, isRecuring: false });
                  setActiveView('One Time');
                }}
              >
                One Time
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="col-12 mb-1 d-flex justify-content-between">
          <div className="col-3">
            <Label className="form-label" for="balance">
              Total Price <span className="text-danger">*</span>
            </Label>
            <Input
              type="number"
              id="total_price"
              placeholder="$"
              onChange={(e) => {
                setForm({ ...form, total: e.target.value });
              }}
            />
          </div>
          <div className="col-3">
            <Label className="form-label" for="down_payment">
              Down Payment <span className="text-danger">*</span>
            </Label>
            <Input
              type="number"
              id="down_payment"
              placeholder="$"
              onChange={(e) => {
                setForm({
                  ...form,
                  downPayment: Number(e.target.value),
                  balance: Number(form.total) - Number(e.target.value),
                  amount: (Number(form.total) - Number(e.target.value)) / Number(form.noOfPayments)
                });
              }}
            />
          </div>
          <div className="col-3">
            <Label className="form-label" for="balance">
              Balance<span className="text-danger">*</span>
            </Label>
            <Input type="number" id="down_payment" placeholder="$" value={form?.balance} disabled />
          </div>
        </div>
        <div className="col-12 mb-1 d-flex justify-content-between">
          <div className="col-3">
            <Label className="form-label" for="payments">
              # of Payments<span className="text-danger">*</span>
            </Label>
            <Input
              type="number"
              id="payment"
              placeholder="Payments"
              onChange={(e) => {
                setForm({
                  ...form,
                  noOfPayments: e.target.value,
                  amount: form.balance / e.target.value
                });
              }}
            />
          </div>
          <div className="col-3">
            <Label className="form-label" for="payment-type">
              Frequency<span className="text-danger">*</span>
            </Label>
            <div className="container">
              <div className="row d-flex justify-content-between">
                <div className="col-12 p-0">
                  <Input
                    type="select"
                    onChange={(e) => {
                      setForm({ ...form, frequency: e.target.value });
                    }}
                  >
                    {paymentTypes?.map((p, i) => {
                      return (
                        <option key={i} value={p}>
                          {p}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <Label className="form-label" for="amount">
              Amount <span className="text-danger">*</span>
            </Label>
            <Input type="number" id="amount" placeholder="$" value={form?.amount} disabled />
          </div>
        </div>
        <div className="col-12 mb-1 d-flex justify-content-between">
          <div className="col-12">
            <Label className="form-label" for="duration">
              Description<span className="text-danger">*</span>
            </Label>
            <Input
              type="textarea"
              rows="5"
              id="description"
              placeholder=""
              onChange={(e) => {
                setForm({ ...form, description: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="col-12 mb-1 d-flex justify-content-between">
          <div className="col-12">
            <Label className="form-label" for="permission">
              Select Permission
            </Label>
            <Select
              className="react-select"
              classNamePrefix="select"
              defaultValue={permissionOptions[0]}
              options={permissionOptions}
              isClearable={false}
              onChange={(data) => {
                if (data.value === 'public') {
                  setForm({ ...form, permission: data.value, paymentType: 'Auto pay' });
                } else {
                  setForm({ ...form, permission: data.value });
                }
              }}
            />
          </div>
        </div>
        {form?.permission === 'public' && (
          <>
            <Row>
              <Col md="6">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  defaultValue={form?.startDate}
                  onChange={(e) => {
                    setForm({ ...form, startDate: e.target.value });
                  }}
                />
              </Col>
              <Col md="6">
                <Label>End Date </Label>
                <Input
                  type="date"
                  name="endDate"
                  disabled
                  value={form?.endDate}
                  onChange={(e) => {
                    setForm({ ...form, endDate: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Label>Registration Fee</Label>
                <Input
                  type="number"
                  name="regFee"
                  onChange={(e) => {
                    setForm({ ...form, regFee: e.target.value });
                  }}
                />
              </Col>
              {/* <Col md="6">
            <Label>Payment Type</Label>
            <Input type='select' name='paymentType' onChange={(e) => {
                setForm({ ...form, paymentType: e.target.value });
              }}>
              <option>In house</option>
              <option>Auto pay</option>
            </Input>
            </Col> */}
            </Row>
            <div>
              <Button color="primary" outline className="w-100 mt-1" onClick={toggleContracts}>
                Select default contract
              </Button>
            </div>
          </>
        )}
        <div className="d-flex justify-content-between px-5 py-3">
          <Button type="reset" color="secondary" outline onClick={toggle}>
            Cancel
          </Button>
          <Button onClick={handleAddMembership} className="me-1" color="primary">
            {'Add'}
          </Button>
        </div>
      </Sidebar>
      <AddMembershipType
        toggle={toggleAddType}
        open={openAddType}
        store={store}
        dispatch={dispatch}
      />
      <ContractsModal open={openContracts} toggle={toggleContracts} form={form} setForm={setForm} />
    </>
  );
}
