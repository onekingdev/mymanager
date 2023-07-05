import React, { useEffect, useState } from 'react';
import Sidebar from '@components/sidebar';
import { Button, ButtonGroup, Input, Label } from 'reactstrap';
import Select, { components } from 'react-select';
import classnames from 'classnames';
import AddMembershipType from '../types/AddMembershipType';
import { addMembershipAction, updateMembershipAction } from '../../../../../store/action';

export default function EditMembershipSidebar({ open, toggle, dispatch, store, membership }) {
  const [form, setForm] = useState({ isRecuring: true });
  const [activeView, setActiveView] = useState('Recurring');
  const [paymentTypes, setPaymentTypes] = useState();
  const [membershipTypesOptions, setMembershipTypeOptions] = useState([]);
  const [openAddType, setOpenAddType] = useState(false);
  const [invalidPath, setInvalidPath] = useState(false);

  const types = ['Select Type', 'Months', 'Weeks'];
  const permissionOptions = [
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
    const payload = { ...form, shopId: store.shop._id };
    dispatch(updateMembershipAction(membership._id, payload));
  };
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
    if (membership) {
      setForm(membership);
    }
  }, [membership]);
  return (
    <>
      <Sidebar
        size="lg"
        open={open}
        toggleSidebar={toggle}
        title="Edit Membership"
        headerClassName="mb-1"
        contentClassName="pt-0"
        style={{ width: '37%' }}
      >
        <div>
          <Label className="form-label" >
            Name <span className="text-danger">*</span>
          </Label>

          <Input
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
     
            placeholder="Membership Name"
            value={form?.name}
          />
        </div>
        <div>
          <Label className="form-label" for="name">
            Path <span className="text-danger">*</span>
          </Label>

          <Input
            onChange={(e) => {
              const exists = store.memberships.filter(
                (x) => x.path === `${store.shopPath}/${e.target.value.replaceAll(' ', '-')}`
              );
              if (exists.length === 0) {
                setInvalidPath(false);
                setForm({
                  ...form,
                  path: `${store.shopPath}/${e.target.value.replaceAll(' ', '-')}`
                });
              } else {
                setInvalidPath(true);
              }
            }}
  
            placeholder="Membership Path"
            invalid={invalidPath}
            value={form?.path}
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
                defaultValue={membershipTypesOptions.find(x=>x.value===form?.type)}
                onChange={(data) => {
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
              value={form?.duration}
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
                    value={form?.durationType}
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
              value={form?.total}
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
              value={form?.downPayment}
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
              value={form?.noOfPayments}
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
                    id="payment-type"
                    name="payment-type"
                    value={form?.frequency}
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
            value={form?.description}
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
              defaultValue={permissionOptions.find(x=>x.value===form.permission)}
              options={permissionOptions}
              isClearable={false}
              onChange={(data) => setForm({ ...form, permission: data.value })}
            />
          </div>
        </div>
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
    </>
  );
}
