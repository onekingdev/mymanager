// ** React Imports
import { Fragment, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Modal,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  CardHeader,
  ModalHeader,
  FormFeedback
} from 'reactstrap';

// ** Third Party Components
import Select from 'react-select';
import { Home, Check, X, Briefcase } from 'react-feather';
import { useForm, Controller } from 'react-hook-form';

// ** Utils
import { selectThemeColors } from '@utils';
import { useSelector, useDispatch } from 'react-redux';
import { updateBillingAddressAction } from '../../store/actions';
import { useUpdateContacts } from '../../../../requests/contacts/contacts';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';

const countryOptions = [
  { value: 'uk', label: 'UK' },
  { value: 'usa', label: 'USA' },
  { value: 'france', label: 'France' },
  { value: 'russia', label: 'Russia' },
  { value: 'canada', label: 'Canada' }
];

const defaultValues = {
  lastName: '',
  firstName: ''
};

const BillingAddress = ({ selectedUser }) => {
  const ToastContent = ({ message }) => (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toast-title fw-bold">{message}</h6>
        </div>
      </div>
    </Fragment>
  );

  // ** States
  const [show, setShow] = useState(false);

  const { mutate } = useUpdateContacts();

  // const {
  //   contact: { _id }
  // } = useSelector((state) => state.totalContacts?.selectedContact);

  const contact = useSelector((state) => state.totalContacts?.selectedContact);
  const billingAddress = selectedUser?.billingAddress;
  const dispatch = useDispatch();

  const initialState = {
    country: billingAddress?.country ? billingAddress?.country : countryOptions[0].label,
    town: billingAddress?.town ? billingAddress?.town : '',
    street: billingAddress?.street ? billingAddress?.street : '',
    state: billingAddress?.state ? billingAddress?.state : '',
    zipCode: billingAddress?.zipCode ? billingAddress?.zipCode : '',
    clientId: selectedUser?._id
  };
  const [state, setState] = useState(initialState);

  useMemo(() => {
    setState(initialState);
  }, [selectedUser]);

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ** Hooks
  const {
    reset,
    clearErrors,
    formState: { errors }
  } = useForm({ defaultValues });

  const onDiscard = () => {
    clearErrors();
    setShow(false);
    reset();
  };

  const handleSubmit = (e) => {
    const tmpContact = {
      ...selectedUser,
      billingAddress: state
    };

    mutate(tmpContact);
    // dispatch(updateBillingAddressAction(state));
    setShow(!show);
    toast.success(<ToastContent message="Billing address updated successfully" />);
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Billing Address</CardTitle>
          <Button color="primary" size="sm" onClick={() => setShow(true)}>
            Edit Address
          </Button>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xl="7" xs="12">
              <Row tag="dl" className="mb-0">
                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  Company Name:
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  {selectedUser?.company}
                </Col>

                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  Billing Email:
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  {selectedUser?.email}
                </Col>

                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  Tax ID:
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  TAX-357378
                </Col>

                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  VAT Number:
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  SDF754K77
                </Col>

                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  Billing Address:
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  {state.addressLineOne}
                </Col>
              </Row>
            </Col>
            <Col xl="5" xs="12">
              <Row tag="dl" className="mb-0">
                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  Contact:
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  {selectedUser?.phone}
                </Col>

                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  Country:
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  {state.country}
                </Col>

                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  State:
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  {state.state}
                </Col>

                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  Zipcode:
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  {state.zipCode}
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Modal
        isOpen={show}
        onClosed={onDiscard}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className="pb-5 px-sm-4 mx-50">
          <h1 className="address-title text-center mb-1">Add New Address</h1>
          <p className="address-subtitle text-center mb-2 pb-75">Add address for billing address</p>
          <Row tag="form" className="gy-1 gx-2">
            <Col xs={12}>
              <Label className="form-label" for="country">
                Country
              </Label>
              <Select
                id="country"
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={countryOptions}
                theme={selectThemeColors}
                defaultValue={
                  billingAddress?.country
                    ? {
                        value: billingAddress?.country,
                        label: billingAddress?.country
                      }
                    : countryOptions[0]
                }
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    country: e.label
                  }))
                }
              />
            </Col>
            <Col xs={12} md={6}>
              <Label className="form-label" for="town">
                Town
              </Label>
              <Input
                type="text"
                placeholder="Los Angeles"
                id="town"
                name="town"
                value={state.town}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={6}>
              <Label className="form-label" for="street">
                Street
              </Label>
              <Input
                type="text"
                placeholder="172nd St E"
                id="street"
                name="street"
                value={state.street}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={6}>
              <Label className="form-label" for="state-province">
                State / Province
              </Label>
              <Input
                type="text"
                placeholder="California"
                id="state"
                name="state"
                value={state.state}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={6}>
              <Label className="form-label" for="zip-code">
                Zip Code
              </Label>
              <Input
                type="text"
                placeholder="99950"
                id="zipCode"
                name="zipCode"
                value={state.zipCode}
                onChange={handleChange}
              />
            </Col>

            <Col className="text-center" xs={12}>
              <Button type="button" className="me-1 mt-2" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
              <Button type="reset" className="mt-2" color="secondary" outline onClick={onDiscard}>
                Discard
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default BillingAddress;
