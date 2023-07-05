import React, { useState, useEffect } from 'react';
import { Button, Input, Label, Form, FormGroup, Row, Col } from 'reactstrap';
import moment from "moment";
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { connect, useDispatch, useSelector } from "react-redux";

const Membership = (props) => {
  const {
    GET_MEMBERSHIP_LIST,
    studentList,
    membershipList,
    getSelectedHtmlElement
  } = props;
  const [studentData, setStudentData] = useState(undefined)
  const [memberData, setMemberData] = useState(undefined)
  const [mActivateDate, setMActivateDate] = useState(new Date())
  const [expireDate, setExpireDate] = useState(new Date())
  const [registerFee, setRegisterFee] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [dPayment, setDPayment] = useState(0)
  const [balance, setBalance] = useState(0)
  const [paymentTime, setPaymentTime] = useState(0)
  const [paymentType, setPaymentType] = useState('monthly');
  const [paymentMoney, setPaymentMoney] = useState(0)
  const [due, setDue] = useState("0")
  const [startPaymentDate, setStartPaymentDate] = useState(new Date())
  const [payInout, setPayInout] = useState('In house')

  const handleSelectStudent = (e, newValue, keyName) =>{
    setStudentData(newValue);
    let selectElement = getSelectedHtmlElement();
    let attributes = selectElement.getAttributes();
    attributes.studentData = newValue._id;
    selectElement.setAttributes(attributes);
  }

  const handleSelectMember = (e, newValue, keyName) =>{
    setMemberData(newValue);
    let selectElement = getSelectedHtmlElement();
    let attributes = selectElement.getAttributes();
    attributes.memberData = newValue._id;
    selectElement.setAttributes(attributes);
  }

  const changeDateHandler = (value, name) => {
    value = new Date(value);
    let selectElement = getSelectedHtmlElement();
    let attributes = selectElement.getAttributes();
    switch (name) {
      case 'mactive_date':
        attributes.mActivateDate = value;
        setMActivateDate(value);
        break;
      case 'expiry_date':
        attributes.expireDate = value;
        setExpireDate(value);
        break;
      case 'start_payment_Date':
        attributes.startPaymentDate = value;
        setStartPaymentDate(value);
        break;
    }
  }
  const changeHandler = (e) => {
    let selectElement = getSelectedHtmlElement();
    let attributes = selectElement.getAttributes();
    const { value, name } = e.target;
    switch (name) {
      case 'totalp':
        attributes.totalPrice = value;
        setTotalPrice(value);
        break;
      case 'register_fees':
        attributes.registerFee = value;
        setRegisterFee(value);
        break;
      case 'dpayment':
        attributes.dPayment = value;
        setDPayment(value);
        break;
      case 'balance':
        attributes.balance = value;
        setBalance(value);
        break;
      case 'payment_time':
        attributes.paymentTime = value;
        setPaymentTime(value);
        break;
      case 'payment_type':
        attributes.paymentType = value;
        setPaymentType(value);
        break;
      case 'payment_money':
        attributes.paymentMoney = value;
        setPaymentMoney(value);
        break;
      case 'due_every':
        attributes.due = value;
        setDue(value);
        break;
      case 'pay_inout':
        attributes.payInout = value;
        setPayInout(value);
        break;
    }
    selectElement.setAttributes(attributes);
  }

  // useEffect(() => {
  //
  //   GET_MEMBERSHIP_LIST();
  // }, [GET_MEMBERSHIP_LIST]);
  useEffect(() => {
    let selectElement = getSelectedHtmlElement();
    let attributes = selectElement.getAttributes();
    if(attributes.studentData) {
      if(studentList && studentList.active_std) {
        for(let student of studentList.active_std) {
          if(student._id == attributes.studentData) {
            setStudentData(student)
          }
        }
      }
    }

    if(attributes.memberData) {
      if(membershipList && membershipList.data) {
        for(let membership of membershipList.data) {
          if(membership._id == attributes.memberData) {
            setMemberData(membership)
          }
        }
      }
    }
    //console.log(attributes)
    setMActivateDate(attributes.mActivateDate ?? new Date())
    setExpireDate(attributes.expireDate ?? new Date())
    setTotalPrice(attributes.totalPrice);
    setRegisterFee(attributes.registerFee);
    setDPayment(attributes.dPayment);
    setBalance(attributes.balance);
    setPaymentTime(attributes.paymentTime);
    setPaymentType(attributes.paymentType);
    setPaymentMoney(attributes.paymentMoney);
    setDue(attributes.due);
    setStartPaymentDate(attributes.startPaymentDate ?? new Date());
    setPayInout(attributes.payInout);
  }, [studentList, membershipList]);

  return (
    <>
      <div style={{ width: "100%" }}>
        <form className="p-1">
          <Row>
            <Col sm="12" md="12" lg="12">
              <Label
                  style={{ color: "#393939", fontSize: "1.5rem" }}
                  className="mt-1"
              >
                Membership Info
              </Label>
            </Col>

            <Col sm="12" md="6" className="mb-1">
              <div>
                <Label for="EmailVertical">Start Date</Label>
              </div>
              <Flatpickr
                  value={mActivateDate}
                  onChange={(date) => {
                    changeDateHandler(date[0], "mactive_date");
                  }}
                  className="form-control invoice-edit-input due-date-picker"
              />
            </Col>
            <Col sm="12" md="6" className="mb-1">
              <div>
                <Label for="expiryVertical">Expiry Date:</Label>
              </div>
              <Flatpickr
                  value={expireDate}
                  onChange={(date) => {
                    changeDateHandler(date[0], "expiry_date");
                  }}
                  className="form-control invoice-edit-input due-date-picker"
              />
            </Col>
            <Col sm={"12"} md={"12"} className="mb-1">
              {" "}
              <Label style={{ fontSize: "1.5rem" }}>
                Payment Information
              </Label>
            </Col>
            <Col sm="12" md="6" className="mb-1">
              <div>
                <Label for="totalpriceVertical">Total Price:</Label>
              </div>
              <Input
                  required
                  type="number"
                  name="totalp"
                  value={totalPrice}
                  onChange={changeHandler}
                  id="totalpriceVertical"
                  placeholder="$"
              />
            </Col>
            <Col sm="12" md="6" className="mb-1">
              <div>
                <Label for="registrationVertical">Registration Fee:</Label>
              </div>
              <Input
                  required
                  type="number"
                  name="register_fees"
                  value={registerFee}
                  onChange={changeHandler}
                  id="registrationVertical"
                  placeholder="$"
              />
            </Col>
            <Col sm="12" md="6" className="mb-1">
              <div>
                <Label for="totalpriceVertical">Down Payment:</Label>
              </div>
              <Input
                  required
                  type="number"
                  name="dpayment"
                  value={dPayment}
                  onChange={changeHandler}
                  id="downPaymentVertical"
                  placeholder="$"
              />
            </Col>
            <Col sm="12" md="6" className="mb-1">
              <div>
                <Label for="totalpriceVertical"> Balance:</Label>
              </div>
              <Input
                  required
                  disabled={paymentType === "pif" ? true : false}
                  type="number"
                  name="balance"
                  value={balance}
                  onChange={changeHandler}
                  id="balanceVertical"
                  placeholder="$"
              />
            </Col>
            <Col sm="12" md="6" className="mb-1">
              <div className="form-label-group">
                <div>
                  <Label for="PaymentsFloating"># of Payments</Label>
                </div>
                <Input
                    required
                    disabled={paymentType === "pif" ? true : false}
                    type="number"
                    name="payment_time"
                    value={paymentTime}
                    onChange={changeHandler}
                    id="paymentsFloating"
                    placeholder="Payments"
                />
              </div>
            </Col>
            <Col sm="12" md="6" className="mb-1">
              <div>
                <Label> Frequency</Label>
              </div>
              <Input
                  required
                  type="select"
                  name="payment_type"
                  value={paymentType}
                  onChange={changeHandler}
                  id="paymentType"
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="pif">PIF</option>
              </Input>
            </Col>
            <Col sm="12" md="6" className="mb-1">
              <div>
                <Label for="dollerFloating">Amount</Label>
              </div>
              <Input
                  required
                  disabled={paymentType === "pif" ? true : false}
                  type="text"
                  name="payment_money"
                  value={paymentMoney}
                  onChange={changeHandler}
                  id="dollerFloating"
                  placeholder="$"
              />
            </Col>
            <Col sm="12" md="6" className="mb-1">
              <div>
                <Label>Due</Label>
              </div>
              <Input
                  required
                  type="select"
                  name="due_every"
                  value={due}
                  onChange={changeHandler}
                  disabled={paymentType === "pif" ? true : false}
                  id="Due"
              >
                <option value="0">No due</option>
                <option value="1">1st</option>
                <option value="5">5th</option>
                <option value="10">10th</option>
                <option value="15">15th</option>
                <option value="20">20th</option>
                <option value="25">25th</option>
                <option value="30">30th</option>
              </Input>
            </Col>
            <Col sm="12" md="6" className="mb-1">
              <div>
                <Label for="expiryVertical">Next payment</Label>
              </div>
              <Flatpickr
                  value={startPaymentDate}
                  onChange={(date) => {
                    changeDateHandler(date[0], "start_payment_Date");
                  }}
                  className="form-control invoice-edit-input due-date-picker"
              />
            </Col>
            <Col sm="12" md="6" className="mb-1">
              <div>
                <Label>Payment Type </Label>
              </div>
              <Input
                  required
                  type="select"
                  name="pay_inout"
                  defaultValue={payInout}
                  onChange={changeHandler}
                  id="Due"
              >
                <option value="In house">In house</option>
                <option value="auto pay">Auto pay</option>
              </Input>
            </Col>
          </Row>
        </form>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    // studentList: state.shop.studentList,
    // membershipList: state.shop.membershipList
  };
};

export default connect(mapStateToProps, {
})(Membership);