import React, { useEffect, useState } from 'react';
import { PlusCircle } from 'react-feather';
import SlideDown from 'react-slidedown';
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import Repeater from '../../../../@core/components/repeater';
import { createPlanAction } from '../../store/action';
import { BsFillBuildingFill } from 'react-icons/bs';
import * as Icons from 'react-feather';


export default function AddPlanForm({ dispatch, stepper, plan, setPlan,store }) {
  const [benefits, setbenefits] = useState(plan?.benefits || ['']);
  const [hasTrial, setHasTrial] = useState(false);
  const [hideDefault,setHideDefault] = useState(false)
  const handleInputChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };
  const handleBenefitsChanged = (e, i) => {
    let b = [...benefits];
    if (b[i] !== undefined) {
      b[i] = e.target.value;
    } else {
      b.push(e.target.value);
    }
    setbenefits(b);
  };
  const handleIconChange = (icon) => {
    setPlan({ ...plan, icon: icon });
  };
  useEffect(()=>{
    if(store && store?.plans){
      if(store?.plans?.filter(x=>x.isDefault===true)?.length > 0){
       setHideDefault(true)
      }
      else{
        setHideDefault(false)
      }
    }
  },[store])
  useEffect(()=>{
    plan?.trialTime>0?setHasTrial(true):setHasTrial(false)
  },[])
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <Label> Plan Name</Label>
          <Input type="text" name="name" value={plan?.name} onChange={handleInputChange} className="w-100" />
        </div>
        <div>
          <Label> Plan Icon</Label>
          <UncontrolledDropdown>
            <DropdownToggle caret color="outline-primary">
              {plan?.icon || 'Select Icon'}
            </DropdownToggle>
            <DropdownMenu>
              {Object.keys(Icons).map((icon, idx) => {
                const Icon = Icons[icon];
                return (
                  <DropdownItem key={idx} onClick={() => handleIconChange(icon)} className="w-100">
                    <Icon /> {icon}
                    
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <div>
        <Label> Description</Label>
        <Input type="textarea" name="description" value={plan?.description} onChange={handleInputChange} />
      </div>
      <div className="w-100">
        <div className="d-flex justify-content-between w-100 mt-50">
          <Label className="my-auto"> Benefits</Label>
          <PlusCircle
            className="text-primary"
            style={{ cursor: 'pointer' }}
            onClick={() => setbenefits([...benefits, ''])}
          />
         
        </div>
        <Repeater count={benefits?.length || 0}>
          {(i) => {
            const Tag = i === 0 ? 'div' : SlideDown;
            return (
              <Tag key={i}>
                {/* <Label>Benefit</Label> */}
                <Input
                  type="text"
                  className="my-50"
                  placeholder="Add new benefit to plan"
                  onChange={(e) => handleBenefitsChanged(e, i)}
                  value={benefits[i]}
                />
              </Tag>
            );
          }}
        </Repeater>
      </div>
      <div className="form-switch my-2 ps-0" style={{display:`${hideDefault===true?'none':'block'}`}}>
        <div className="d-flex">
          <p className="fw-bold me-auto mb-0">Default Plan (Default plan is free)</p>
          <Input
            type="switch"
            name="isDefault"
            checked={plan?.isDefault}
            onChange={(e) => {
              setPlan({ ...plan, isDefault: e.target.checked, pricePerYear: 0, pricePerMonth: 0 });
            }}
          />
        </div>
      </div>

      {plan?.isDefault && plan?.isDefault === true ? (
        <></>
      ) : (
        <>
          <div>
            <Label> Price Per Month</Label>
            <div className="d-flex justify-content-between">
              <Input
                type="number"
                name="pricePerMonth"
                className="w-100"
                onChange={handleInputChange}
                value={plan?.pricePerMonth}
              />
              <h5 className="my-auto ms-50"> $/Month</h5>
            </div>
          </div>
          <div>
            <Label> Price Per Year</Label>
            <div className="d-flex justify-content-between">
              <Input
                type="number"
                name="pricePerYear"
                className="w-100"
                onChange={handleInputChange}
                value={plan?.pricePerYear}
              />
              <h5 className="my-auto ms-50"> $/Year</h5>
            </div>
          </div>
        </>
      )}
      {plan?.isDefault && plan?.isDefault === true ? (
        <></>
      ) : (
        <>
          <div className="form-switch my-2 ps-0">
            <div className="d-flex">
              <p className="fw-bold me-auto mb-0">Organization Plan</p>
              <Input
                type="switch"
                onChange={(e) => {
                  e.target.checked === true
                    ? setPlan({ ...plan, type: 'business' })
                    : setPlan({ ...plan, type: 'personal' });
                }}
                checked={plan?.type==='business'?true:false}
              />
            </div>
          </div>
          {plan && plan.type === 'personal' ? (
            <></>
          ) : (
            <>
              <div className="form-switch my-2 ps-0">
                <div className="d-flex">
                  <p className="fw-bold me-auto mb-0">Has Trial</p>
                  <Input
                    type="switch"
                    onChange={(e) => {
                      setHasTrial(e.target.checked);
                    }}
                 checked={hasTrial}
                  />
                </div>
              </div>
              {hasTrial && (
                <div>
                  <div>
                    <Label> Trial Period</Label>
                    <div className="d-flex justify-content-between">
                      <Input
                        type="number"
                        name="trialTime"
                        className="w-100"
                        onChange={handleInputChange}
                        value={plan?.trialTime}
                      />
                      <h5 className="my-auto ms-50"> Days</h5>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {plan?.type==='business' && (<div className="form-switch my-2 ps-0">
            <div className="d-flex justify-content-between">
              <div>
                <p className="fw-bold me-auto mb-0">Pay by Users of organization</p>
                <span className="d-block text-secondary">
                  <small>
                    If on, users under organization will be charged under the amount of plan
                  </small>
                </span>
              </div>
              <Input
                type="switch"
                onChange={(e) => {
                  setPlan({ ...plan, payByUser: e.target.checked });
                }}
                checked={plan?.byPerUser}
              />
            </div>
          </div>)}
        </>
      )}

      <div className="d-flex justify-content-end my-50">
        <Button
          color="primary"
          className="me-50"
          onClick={() => {
            setPlan({ ...plan, benefits: benefits });
            stepper.next();
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
}
