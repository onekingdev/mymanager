// ** Third Party Components
import classnames from 'classnames';
import { TrendingUp, Box, Camera, FileText, User, Lock, Key } from 'react-feather';
import { useEffect } from 'react';
import useMessage from '@src/lib/useMessage';
// import { contactRegisterAction, contactRegisterSendAction } from '../../store/actions';
import { contactRegisterAction, contactRegisterSendAction } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
// ** Custom ComponentscontactUpdateByIdAction
import Avatar from '@components/avatar';

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  Button,
  InputGroup,
  Row,
  Col,
  InputGroupText,
  Badge,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import { useState } from 'react';
import { useGetAllEmployees } from '@src/requests/contacts/employee-contacts';
import { useParams } from 'react-router-dom';
import { getUser } from '../../store';
import { useBarcode } from '@createnextapp/react-barcode';

const statusColors = {
  active: 'light-success',
  deactive: 'light-danger'
};

const Others = ({ contactState, setContactState, roleList, selectedEmployee }) => {
  // Get selected employee
  // ** Store Vars
  const dispatch = useDispatch();
  // Third Party
  const { error, success } = useMessage();

  const { id } = useParams();
  const [active, setActive] = useState('1');
  const [isEditable, setIsEditable] = useState(false);
  const [isSaveAll, setIsSaveAll] = useState(false);
  const [barcodeInfo, setBarcodeInfo] = useState('123 45678');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  // Get all emails from db for checking
  const [existingEmails, setExistingEmails] = useState([]);

  const { data: employees, refetch: fetchEmployees } = useGetAllEmployees();

  const { inputRef } = useBarcode({
    value: barcodeInfo.length ? barcodeInfo : 'No Data',
    options: {
      // background: backColor,
      // lineColor: foreColor,
      // width: barcodeImgWidth,
      // height: barcodeImgHeight
    }
  });

  const allEmployeeemail = () => {
    const empEmail = [];
    employees?.map((employee) => {
      empEmail.push(employee.email);
    });
    setExistingEmails(empEmail);
  };

  useEffect(allEmployeeemail, [employees]);

  // ** State
  const [show, setShow] = useState(false);

  // const { isSuccess: deleteIsSuccess, isLoading: isLoading } =
  //   useSelector((state) => state?.clientContact?.fleUplaodDelete)
  const editClickHandler = () => {
    setIsEditable(true);
  };
  const saveClickHandler = () => {
    const { email, password, roleId, assignedProject, sendType, confirmPassword, punchId } =
      contactState;

    dispatch(
      contactRegisterAction({
        id,
        email,
        password,
        roleId,
        assignedProject,
        sendType,
        punchId
      })
    );
  };
  const sendClickHandler = () => {
    const { email, password, roleId, assignedProject, sendType, confirmPassword } = contactState;
    setContactState((p) => ({
      ...p,
      sendType: document.querySelector('input[name="sendType"]:checked').value
    }));

    if (email === '' || email.length < 11) {
      error('Enter a valid email');
      return;
    }
    if (email !== '' && email !== selectedEmployee.email && existingEmails.includes(email)) {
      error('email already exists!');
      return;
    }
    if (password != confirmPassword) {
      error('Those passwords didn’t match. Try again.');
      return;
    }
    setIsSaveAll(true);
    dispatch(
      contactRegisterSendAction({
        id,
        sendType
      })
    );
  };

  const handleRegister = async () => {
    try {
      let response = await faceio.enroll({
        locale: 'auto'
      });

      console.log(` Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="card-statistics pb-1">
      <CardHeader>
        <CardTitle tag="h4">Employee Access</CardTitle>
        <CardText className="card-text font-small-2 me-25">
          {selectedEmployee?.status === 'active' ? (
            <Badge color={statusColors.active} className="text-capitalize me-1">
              Active
            </Badge>
          ) : (
            <Badge className="text-capitalize" color={statusColors.deactive}>
              De-Active
            </Badge>
          )}
        </CardText>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm="6">
            <Label className="form-label" for="username">
              Email
            </Label>
            <InputGroup className="input-group-merge mb-2">
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
              <Input
                autoComplete="off"
                type="text"
                name="email"
                id="email"
                defaultValue={selectedEmployee?.email}
                placeholder="Email Address"
                onChange={(e) => {
                  setContactState((p) => ({
                    ...p,
                    email: e?.target?.value
                  }));
                }}
              />
            </InputGroup>
          </Col>
          <Col sm="6">
            <Label className="form-label" for="roles">
              Roles
            </Label>
            <InputGroup className="input-group-merge mb-2">
              <Input
                type="select"
                id="role"
                name="role"
                disabled={isEditable ? false : true}
                defaultValue={contactState.roleId ? contactState.roleId : 'guest'}
                onChange={(e) => {
                  setContactState((p) => ({
                    ...p,
                    roleId: e.target.value
                  }));
                }}
              >
                <option value="">Selecting role...</option>
                {roleList?.map((p, i) => {
                  return (
                    <option
                      key={i}
                      value={p._id}
                      selected={p._id == contactState.roleId ? true : false}
                    >
                      {p.roleName}
                    </option>
                  );
                })}
              </Input>
            </InputGroup>
          </Col>
          <Col sm="6">
            <Label className="form-label" for="username">
              Password
            </Label>
            <InputGroup
              className={classnames('input-group-merge mb-2', {
                disabled: !isEditable
              })}
            >
              <InputGroupText>
                <Lock size={15} />
              </InputGroupText>
              <Input
                autoComplete="off"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                disabled={isEditable ? false : true}
                onChange={(e) => {
                  setContactState((p) => ({
                    ...p,
                    password: e?.target?.value
                  }));
                }}
              />
            </InputGroup>
          </Col>
          <Col sm="6">
            <Label className="form-label" for="username">
              Confirm Password
            </Label>
            <InputGroup
              className={classnames('input-group-merge mb-2', {
                disabled: !isEditable
              })}
            >
              <InputGroupText>
                <Lock size={15} />
              </InputGroupText>

              <Input
                autoComplete="off"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="ReEnter Password..."
                disabled={isEditable ? false : true}
                onChange={(e) => {
                  setContactState((p) => ({
                    ...p,
                    confirmPassword: e?.target?.value
                  }));
                }}
              />
            </InputGroup>
          </Col>
          <Col sm="6">
            <Label className="form-label" for="punchId">
              Punch Id
            </Label>
            <InputGroup
              className={classnames('input-group-merge mb-2', {
                disabled: !isEditable
              })}
            >
              <InputGroupText>
                <Key size={15} />
              </InputGroupText>
              <Input
                autoComplete="off"
                type="text"
                name="punchId"
                id="punchId"
                placeholder="Punch Id"
                disabled={isEditable ? false : true}
                onChange={(e) => {
                  setBarcodeInfo(e.target.value ? e.target.value : '123456789');
                  setContactState((p) => ({
                    ...p,
                    punchId: e?.target?.value
                  }));
                }}
              />
            </InputGroup>
          </Col>
          <Col sm="6">
            <Label className="form-label d-block" for="punchId">
              Face Recognition
            </Label>
            <Button color="primary" onClick={(e) => handleRegister()}>
              <Camera size={15} className="me-50" /> Register
            </Button>
          </Col>
          <Col lg="6" md="12" sm="12" className="barcode-image-part">
            {barcodeInfo.length ? <canvas id="mybarcode" ref={inputRef} /> : <p>No Content</p>}
          </Col>
          <Col sm="12">
            <div className="d-flex">
              <input
                type="radio"
                className="me-1"
                name="sendType"
                color="primary"
                value="sms"
                onChange={(e) => {
                  setContactState((p) => ({
                    ...p,
                    sendType: e?.target?.value
                  }));
                }}
              />
              <label className="me-2">SMS</label>
              <input
                type="radio"
                className="mx-1"
                name="sendType"
                color="secondary"
                value="email"
                onChange={(e) => {
                  setContactState((p) => ({
                    ...p,
                    sendType: e?.target?.value
                  }));
                }}
                checked
              />
              <label>Email</label>
            </div>
          </Col>
          <Col sm="12" className="mt-1">
            <div className="d-flex">
              <Button
                type="button"
                onClick={editClickHandler}
                className="me-1"
                color="primary"
                // disabled={isLoading}
              >
                {/* {isLoading ? 'Loading...' : 'Send'} */}
                Edit
              </Button>
              {isEditable ? (
                <>
                  <Button type="button" onClick={sendClickHandler} className="me-1" color="primary">
                    Send
                  </Button>
                  <Button
                    type="button"
                    onClick={saveClickHandler}
                    className="me-1"
                    color="primary"
                    disabled={isSaveAll ? false : true}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>
          </Col>
        </Row>
      </CardBody>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-md">
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}>
          Edit Employee Access
        </ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <Row>
            <Col sm="12">
              <Label className="form-label" for="username">
                Username
              </Label>
              <InputGroup className="input-group-merge mb-2">
                <InputGroupText>
                  <User size={15} />
                </InputGroupText>
                <Input type="text" name="username" id="username" placeholder="User Name" />
              </InputGroup>
            </Col>
            <Col sm="12">
              <Label className="form-label" for="password">
                Password
              </Label>
              <InputGroup className={classnames('input-group-merge mb-2')}>
                <InputGroupText>
                  <Lock size={15} />
                </InputGroupText>
                <Input
                  autoComplete="false"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </InputGroup>
            </Col>
            <Col sm="12">
              <Label className="form-label" for="status">
                Status
              </Label>
              <InputGroup className="input-group-merge mb-2">
                <Input id="exampleSelect" name="select" type="select">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </Input>
              </InputGroup>
            </Col>
            <Col sm="12">
              <Label className="form-label" for="roles">
                Roles
              </Label>
              <InputGroup className="input-group-merge mb-2">
                <Input id="exampleSelect" name="select" type="select">
                  <option>Ranjan Kumar</option>
                  <option>Siri</option>
                </Input>
              </InputGroup>
            </Col>
            <Col sm="12">
              <div className="d-flex">
                <Button className="me-1" color="primary" size="sm" type="button">
                  Save
                </Button>
                <Button outline color="secondary" size="sm" type="reset">
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Card>
  );
};

export default Others;
