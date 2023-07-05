// ** React Imports
import { useState, Fragment, useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// improt moment
import moment from 'moment';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader
} from 'reactstrap';

// ** I

import { FiEdit2, FiEye } from 'react-icons/fi';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
import { toast } from 'react-toastify';
// ** Third Party Components
import Swal from 'sweetalert2';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import { Check, Briefcase, X } from 'react-feather';
import { useForm, Controller } from 'react-hook-form';
import withReactContent from 'sweetalert2-react-content';
import classnames from 'classnames';
import { useUpdateContacts } from '@src/requests/contacts/contacts';
import { selectContactAction, updateContactAction } from '../store/actions';
// ** Custom Components
import Avatar from '@components/avatar';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import AddNewTagModal from '../tags/AddNewTagModal';
import AddNewLeadSourceModal from '../tags/AddNewLeadSourceModal';
import NoteModal from '../Note';
import { IoSettingsOutline } from 'react-icons/io5';
import { countryOptions } from '../contact-list/constants';

const roleColors = {
  editor: 'light-info',
  admin: 'light-danger',
  author: 'light-warning',
  maintainer: 'light-success',
  subscriber: 'light-primary'
};

const statusColors = {
  active: 'light-success',
  // pending: 'light-warning',
  former: 'light-secondary'
};

const statusOptions = [
  { value: false, label: 'Active' },
  { value: true, label: 'Former' }
  // { value: 'pending', label: 'Pending' }
];

const genderoptions = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'transgender', label: 'Transgender' }
];

const clientTypeptions = [
  { value: 'individual', label: 'Individual' },
  { value: 'company', label: 'Company' }
];

const clientPosition = [
  { value: 'owner', label: 'Owner' },
  { value: 'assitant', label: 'Assistant' },
  { value: 'billing', label: 'Billing' }
];

// const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser, store, notes, mode }) => {
  // ** Top level contact update method
  const { mutate } = useUpdateContacts();

  // ** State
  const [show, setShow] = useState(false);
  const [centeredModal, setCenteredModal] = useState(false);
  const [picker, setPicker] = useState(new Date());

  const [openNote, setOpenNote] = useState(false);

  //tags & leads
  const [openNewTag, setOpenNewTag] = useState(false);
  const [openLeadSource, setOpenLeadSource] = useState(false);
  const toggleNewTag = () => setOpenNewTag(!openNewTag);
  const toggleNewLeadSource = () => setOpenLeadSource(!openLeadSource);
  const toggleNotes = () => setOpenNote(!openNote);

  // const [tags, setTags] = useState([])
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setData(getValues());
  }, []);

  // const initialData = {
  //   fullName: selectedUser?.fullName || '',
  //   email: selectedUser?.email || '',
  //   companyEmail: selectedUser?.companyEmail || '',
  //   companyPhone: selectedUser?.companyPhone || '',
  //   gender: selectedUser?.gender || '',
  //   dob: selectedUser?.dob || null,
  //   type: selectedUser?.type || 'individual',
  //   zipCode: selectedUser?.address?.zipCode || '',
  //   street: selectedUser?.address?.street || '',
  //   state: selectedUser?.address?.state || '',
  //   city: selectedUser?.address?.city || '',
  //   country: selectedUser?.address?.country || '',
  //   phone: selectedUser?.phone || '',
  //   company: selectedUser?.company || '',
  //   position: selectedUser?.position || 'owner',
  //   stage: selectedUser?.stage || 'cold',
  //   leadSource: selectedUser?.leadSource || 'Facebook Ad',
  //   cZipCode: selectedUser?.companyAddress?.zipCode || '',
  //   cStreet: selectedUser?.companyAddress?.street || '',
  //   cState: selectedUser?.companyAddress?.state || '',
  //   cCity: selectedUser?.companyAddress?.city || '',
  //   cCountry: selectedUser?.companyAddress?.country || '',
  //   status: selectedUser?.status || 'inactive',
  //   isFormer: selectedUser?.isFormer || 'false',
  //   note: selectedUser?.note || '',
  //   date: picker || null,
  //   tags: selectedUser?.tags || [],
  //   leadSource: selectedUser?.leadSource || ''
  // };

  const [data, setData] = useState(selectedUser);

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    defaultValues: data
  });

  const [tagOptions, setTagOptions] = useState([]);
  const [leadSourceOptions, setLeadSourceOptions] = useState([]);

  const photoRef = useRef();

  function onChoosePhoto() {
    photoRef?.current?.click();
  }

  function uploadPhoto({ file, id }) {
    const form = new FormData();
    form.append('file', file);
    form.append('id', id);
  }

  const ToastContent = ({ message }) => (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toast-title fw-bold">{message}</h6>
        </div>
      </div>
    </Fragment>
  );

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser?.photo?.length) {
      return (
        <div onClick={onChoosePhoto} className="cic-dp">
          <img
            height="110"
            width="110"
            alt="user-avatar"
            src={selectedUser.photo}
            className="img-fluid rounded mt-3 mb-2"
          />
          <div className="cic-photo-edit">
            <FiEdit2 className="cic-photo-edit-icon" />
          </div>
        </div>
      );
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = [
          'light-success',
          'light-danger',
          'light-warning',
          'light-info',
          'light-primary',
          'light-secondary'
        ],
        color = states[stateNum];
      return (
        <>
          <Avatar
            onClick={onChoosePhoto}
            initials
            color={color}
            className="rounded mt-3 mb-2"
            content={selectedUser.fullName}
            contentStyles={{
              borderRadius: 0,
              fontSize: 'calc(48px)',
              width: '100%',
              height: '100%'
            }}
            style={{
              height: '110px',
              width: '110px'
            }}
          />
        </>
      );
    }
  };

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      setShow(false);
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          });
        }
      }
    }
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = () => {
    // return
    const preparedData = {
      _id: id,
      fullName: data.fullName,
      gender: data.gender,
      dob: data.dob,
      type: data.type,
      address: {
        zipCode: data.zipCode,
        street: data.street,
        state: data.state,
        city: data.city,
        country: data.country
      },
      phone: data.phone,
      email: data.email,
      company: data.company,
      position: data.position,
      leadSource: data.leadSource,
      stage: data.stage,
      companyEmail: data.companyEmail,
      companyPhone: data.companyPhone,
      companyAddress: {
        zipCode: data.cZipCode,
        street: data.cStreet,
        state: data.cState,
        city: data.cCity,
        country: data.cCountry
      },
      status: data.status,
      note: data.note,
      dob: new Date(picker[0].toString()),
      tags: data.tags,
      isFormer: data.isFormer
    };

    console.log('dafweasdf', preparedData);
    // dispatch(editClientAction(id, preparedData));
    dispatch(updateContactAction(preparedData));
  };

  useEffect(() => {
    if (store && store?.tags) {
      let options = [];

      for (const tag of store?.tags) {
        options.push({ value: tag.value, label: tag.value });
      }
      let source = [];

      for (const src of store?.leadSource) {
        source.push({ value: src.title, label: src.title });
      }
      setTagOptions(options);
      setLeadSourceOptions(source);
    }
  }, [store]);

  useEffect(() => {
    setData(selectedUser);
  }, [selectedUser]);

  return (
    <Fragment>
      {/* upload photo */}

      <input
        type="file"
        onChange={(e) => {
          uploadPhoto({ file: e.target.files[0], id });
        }}
        hidden
        ref={photoRef}
      />

      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4 className="d-flex justify-content-center">
                    {selectedUser !== null ? selectedUser.fullName : 'Eleanor Aguilar'}
                    <div className="ms-1">
                      <FiEye className="cic-eye-icon" onClick={toggleNotes} />
                    </div>
                  </h4>
                  <p>{selectedUser.note}</p>
                  {selectedUser !== null ? (
                    <>
                      <Badge color={roleColors[selectedUser.role]} className="text-capitalize me-1">
                        {selectedUser.role}
                      </Badge>
                      <Badge
                        className="text-capitalize"
                        color={
                          selectedUser.isFormer === true ? statusColors.former : statusColors.active
                        }
                      >
                        {selectedUser.isFormer === true ? 'Former' : 'Active'}
                      </Badge>
                      {selectedUser?.leadSource?.map((src) => (
                        <Badge
                          className="text-capitalize ms-50"
                          color={store?.leadSource?.find((x) => x.title === src.value)?.color}
                        >
                          {src.value}
                        </Badge>
                      ))}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {mode == '0' && (
            <div className="d-flex justify-content-around my-2 pt-75">
              <div className="d-flex align-items-start me-2">
                <Badge color="light-primary" className="rounded p-75">
                  <Check className="font-medium-2" />
                </Badge>
                <div className="ms-75">
                  <h4 className="mb-0">0</h4>
                  <small>Tasks Done</small>
                </div>
              </div>
              <div className="d-flex align-items-start">
                <Badge color="light-primary" className="rounded p-75">
                  <Briefcase className="font-medium-2" />
                </Badge>
                <div className="ms-75">
                  <h4 className="mb-0">0</h4>
                  <small>Projects Done</small>
                </div>
              </div>
            </div>
          )}
          <h4 className="fw-bolder border-bottom pb-50 mt-1 mb-1">User Info</h4>
          <div className="info-container mb-3">
            {selectedUser !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Contact:</span>
                  <span>{selectedUser?.phone}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Email:</span>
                  <span>{selectedUser.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Address:</span>
                  <span>
                    {selectedUser?.address?.street && `${selectedUser?.address?.street},`}

                    {selectedUser?.address?.city && `${selectedUser?.address?.city},`}

                    {selectedUser?.address?.zipCode && `${selectedUser?.address?.zipCode},`}
                    {selectedUser?.address?.state && `${selectedUser?.address?.state},`}

                    {selectedUser?.address?.country && `${selectedUser?.address?.country}`}
                  </span>
                </li>
              </ul>
            ) : null}
          </div>
          {selectedUser.company && (
            <>
              <h4 className="fw-bolder border-bottom pb-50 mb-1">Company Info</h4>
              <div className="info-container">
                {selectedUser !== null ? (
                  <ul className="list-unstyled">
                    <li className="mb-75">
                      <span className="fw-bolder me-25">Name:</span>
                      <span>{selectedUser.company}</span>
                    </li>
                    {/* <li className="mb-75">
                                    <span className="fw-bolder me-25">
                                        Contact:
                                    </span>
                                    <span>{selectedUser.contact}</span>
                                </li> */}
                    <li className="mb-75">
                      <span className="fw-bolder me-25">Email:</span>
                      <span>{selectedUser.companyEmail}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">Address:</span>
                      <span>
                        {selectedUser?.companyAddress?.street} {selectedUser?.companyAddress?.city}{' '}
                        {selectedUser?.companyAddress?.zipCode}{' '}
                        {selectedUser?.companyAddress?.state}{' '}
                        {selectedUser?.companyAddress?.country}{' '}
                      </span>
                    </li>
                  </ul>
                ) : null}
              </div>
            </>
          )}
          <div className="d-flex justify-content-center pt-2">
            <Button
              color="primary"
              onClick={() => {
                let updatebleState = {
                  fullName: selectedUser?.fullName,
                  email: selectedUser?.email,
                  gender: selectedUser?.gender,
                  dob: selectedUser?.dob,
                  type: selectedUser?.type,
                  zipCode: selectedUser?.address?.zipCode,
                  street: selectedUser?.address?.street,
                  state: selectedUser?.address?.state,
                  city: selectedUser?.address?.city,
                  country: selectedUser?.address?.country,
                  phone: selectedUser?.phone,
                  company: selectedUser?.company,
                  position: selectedUser?.position,
                  cZipCode: selectedUser?.companyAddress?.zipCode,
                  cStreet: selectedUser?.companyAddress?.street,
                  cState: selectedUser?.companyAddress?.state,
                  cCity: selectedUser?.companyAddress?.city,
                  cCountry: selectedUser?.companyAddress?.country,
                  status: selectedUser?.status,
                  note: selectedUser?.note,
                  tags: selectedUser?.tags,
                  stage: selectedUser?.stage,
                  leadSource: selectedUser?.leadSource,
                  companyEmail: selectedUser?.companyEmail,
                  companyPhone: selectedUser?.companyPhone,
                  isFormer: selectedUser?.isFormer
                };

                setData(updatebleState);
                setPicker([new Date(selectedUser?.dob)]);

                setShow(true);
              }}
            >
              Edit
            </Button>
            <Button
              className="ms-1"
              color="primary"
              outline
              onClick={() => setCenteredModal(!centeredModal)}
            >
              Details
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* User Edit Modal */}
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg">
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center">
            <h1 className="mb-1">Edit Contact Information</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1">
              <h4 className="fw-bolder border-bottom pb-50 mb-1">User Info</h4>
              <Col md={6} xs={12}>
                <Label className="form-label" for="fullname">
                  Full Name
                </Label>
                <Input
                  id="fullname"
                  name="fullName"
                  placeholder="Karena Courtliff"
                  value={data.fullName}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="gender">
                  Gender
                </Label>
                <Select
                  id="gender"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={genderoptions}
                  theme={selectThemeColors}
                  onChange={(e) => handleSelectChange('gender', e.value)}
                  defaultValue={{
                    value: data?.gender,
                    label: data?.gender?.charAt(0)?.toUpperCase() + data?.gender?.substring(1)
                  }}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="firstName">
                  DOB
                </Label>
                <Flatpickr
                  className="form-control"
                  value={picker}
                  onChange={(date) => {
                    setPicker(date);
                  }}
                  id="default-picker"
                  options={{ dateFormat: 'm/d/Y' }}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="firstName">
                  {store?.contactTypeList[parseInt(mode)].name} Type
                </Label>
                <Select
                  id="clientType"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={clientTypeptions}
                  theme={selectThemeColors}
                  onChange={(e) => handleSelectChange('type', e.value)}
                  defaultValue={{
                    value: data?.type,
                    label: data?.type?.charAt(0)?.toUpperCase() + data?.type?.substring(1)
                  }}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="city">
                  City
                </Label>

                <Input
                  id="city"
                  name="city"
                  placeholder="Houston"
                  value={data.city}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="street">
                  Street
                </Label>

                <Input
                  id="street"
                  name="street"
                  placeholder="2193 Poe Road, Houston"
                  value={data.street}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="state">
                  State
                </Label>

                <Input
                  id="state"
                  name="state"
                  placeholder="2193 Poe Road, Houston"
                  value={data.state}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="zip">
                  Zip Code
                </Label>

                <Input
                  id="zipCode"
                  name="zipCode"
                  placeholder="77032"
                  value={data.zipCode}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="country">
                  Country
                </Label>

                {/* <Input
                  id="country"
                  name="country"
                  placeholder="USA"
                  value={data.country}
                  onChange={handleChange}
                /> */}
                <Select
                  id="country"
                  name="country"
                  isClearable={false}
                  classNamePrefix="select"
                  options={countryOptions}
                  theme={selectThemeColors}
                  value={countryOptions?.find((x) => x.value == data.country)}
                  className={classnames('react-select', {
                    'is-invalid': data !== null && data.country === null
                  })}
                  onChange={(e) => {
                    console.log(e);
                    setData((p) => ({
                      ...p,
                      country: e.value
                    }));
                  }}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="contact">
                  Phone
                </Label>

                <Input
                  id="phone"
                  name="phone"
                  placeholder="+1 609 933 4422"
                  value={data.phone}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="billing-email">
                  Email
                </Label>

                <Input
                  id="email"
                  name="email"
                  placeholder="example@domain.com"
                  value={data.email}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="status">
                  Status:
                </Label>
                <Select
                  id="status"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={statusOptions}
                  theme={selectThemeColors}
                  name="isFormer"
                  onChange={(e) => handleSelectChange('isFormer', e.value)}
                  defaultValue={{
                    value: data?.isFormer,
                    label: data?.isFormer === true ? 'Former' : 'Active'
                    //label: contact?.status?.charAt(0)?.toUpperCase() + contact?.status?.substring(1)
                  }}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label">Tags:</Label>
                <div className="d-flex justify-content-between">
                  <Select
                    className="react-select w-100"
                    classNamePrefix="select"
                    isMulti
                    // closeMenuOnSelect={false}
                    isClearable={false}
                    theme={selectThemeColors}
                    components={animatedComponents}
                    options={tagOptions}
                    // defaultValue={(() =>
                    //   data?.tags?.map((t) => {
                    //     return {
                    //       value: t,
                    //       label: t.charAt(0).toUpperCase() + t.substring(1)
                    //     };
                    //   }))()}
                    // onKeyDown={(e) => {
                    //   let val = e.target.value;
                    //   if (e.key === 'Enter') {
                    //     setTagOptions((p) => {
                    //       return [...p, { value: val, label: val }];
                    //     });
                    //     setData((p) => ({
                    //       ...p,
                    //       tags: [...p.tags, val]
                    //     }));
                    //     //reset value
                    //     e.target.value = '';
                    //   }
                    // }}
                    value={data?.tags}
                    onChange={(e) => {
                      console.log(e);
                      setData((p) => ({
                        ...p,
                        tags: e
                      }));
                    }}
                    // onChange={(e) => {
                    //   let tags = e.map((x) => x.value);
                    //   setData((p) => ({ ...p, tags }));
                    // }}
                  />
                  {/* <Button color="outline-primary" onClick={toggleNewTag} className="ms-50">
                    Add
                  </Button> */}
                  <Button color="flat-secondary ms-1" className="p-0" onClick={toggleNewTag}>
                    <IoSettingsOutline size={24} />
                  </Button>
                </div>
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label">Lead Source:</Label>
                <div className="d-flex justify-content-between">
                  <Select
                    className="react-select w-100"
                    classNamePrefix="select"
                    isMulti
                    isClearable={false}
                    theme={selectThemeColors}
                    components={animatedComponents}
                    options={leadSourceOptions}
                    value={data?.leadSource}
                    onChange={(e) => {
                      setData((p) => ({ ...p, leadSource: e }));
                    }}
                  />
                  {/* <Button color="outline-primary" onClick={toggleNewLeadSource} className="ms-50">
                    Add
                  </Button> */}
                  <Button color="flat-secondary ms-1" className="p-0" onClick={toggleNewLeadSource}>
                    <IoSettingsOutline size={24} />
                  </Button>
                </div>
              </Col>
              <Col md={12} xs={12}>
                <Label className="form-label" for="billing-email">
                  Note
                </Label>

                <Input
                  id="note"
                  name="note"
                  placeholder="A one liner note"
                  value={data.note}
                  onChange={handleChange}
                />
              </Col>

              {data?.type === 'company' && (
                <>
                  <h4 className="fw-bolder border-bottom pb-50 mb-1 mt-3">Company Info</h4>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="company">
                      Company Name
                    </Label>

                    <Input
                      id="company"
                      name="company"
                      placeholder="Binary Bunon"
                      value={data.company}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="firstName">
                      Position
                    </Label>
                    <Select
                      id="clientPosition"
                      isClearable={false}
                      className="react-select"
                      classNamePrefix="select"
                      options={clientPosition}
                      theme={selectThemeColors}
                      onChange={(e) => handleSelectChange('position', e.value)}
                      defaultValue={{
                        value: data?.position,
                        label:
                          data?.position?.charAt(0)?.toUpperCase() + data?.position?.substring(1)
                      }}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="street">
                      Street
                    </Label>

                    <Input
                      id="cStreet"
                      name="cStreet"
                      placeholder="2193 Poe Road, Houston"
                      value={data.cStreet}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="city">
                      City
                    </Label>

                    <Input
                      id="cCity"
                      name="cCity"
                      placeholder="Houston"
                      value={data.cCity}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="state">
                      State
                    </Label>

                    <Input
                      id="cState"
                      name="cState"
                      placeholder="Texas"
                      value={data.cState}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="zip">
                      Zip Code
                    </Label>

                    <Input
                      id="cZipCode"
                      name="cZipCode"
                      placeholder="78459"
                      value={data.cZipCode}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="country">
                      Country
                    </Label>

                    <Input
                      id="cCountry"
                      name="cCountry"
                      placeholder="USA"
                      value={data.cCountry}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="contact">
                      Phone
                    </Label>
                    <Input
                      id="companyPhone"
                      name="companyPhone"
                      placeholder="+1 XXX-XXX-XXXX"
                      value={data.companyPhone}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="billing-email">
                      Email
                    </Label>
                    {/* companyPhone companyEmail */}
                    <Input
                      id="email"
                      name="companyEmail"
                      placeholder="example@domain.com"
                      value={data.companyEmail}
                      onChange={handleChange}
                    />
                  </Col>
                </>
              )}

              <Col xs={12}>
                <div className="d-flex align-items-center mt-1">
                  <div className="form-switch">
                    <Input type="switch" defaultChecked id="billing-switch" name="billing-switch" />
                    <Label className="form-check-label" htmlFor="billing-switch">
                      <span className="switch-icon-left">
                        <Check size={14} />
                      </span>
                      <span className="switch-icon-right">
                        <X size={14} />
                      </span>
                    </Label>
                  </div>
                  <Label className="form-check-label fw-bolder" for="billing-switch">
                    Use as a billing address?
                  </Label>
                </div>
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="button" className="me-1" color="primary" onClick={handleEditSubmit}>
                  Save
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    // handleReset()
                    setShow(false);
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>

      {/* TAG MODAL */}
      {store && store.tags && (
        <AddNewTagModal open={openNewTag} store={store} dispatch={dispatch} toggle={toggleNewTag} />
      )}
      {store && store?.leadSource && (
        <AddNewLeadSourceModal
          open={openLeadSource}
          store={store}
          dispatch={dispatch}
          toggle={toggleNewLeadSource}
        />
      )}

      {/* User Details Modal */}
      <div className="vertically-centered-modal">
        <Modal
          isOpen={centeredModal}
          toggle={() => setCenteredModal(!centeredModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
            Client Information
          </ModalHeader>
          <ModalBody>
            <div>
              <Row>
                <h4 className="fw-bolder border-bottom pb-50 mb-1">User Info</h4>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    Full Name
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {data?.fullName}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    Status
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {data?.status}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    Gender
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {data?.gender}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    DOB
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {moment(selectedUser?.dob).format('L')}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    Client Type
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {data?.type}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    Phone
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {data?.phone}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    Email
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {data?.email}
                  </p>
                </Col>{' '}
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    Street
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {selectedUser?.address?.street}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    City
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {selectedUser?.address?.city}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    State
                  </Label>

                  <p className="form-control-static" id="StaticInput">
                    {selectedUser?.address?.state}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    ZIP Code
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {selectedUser?.address?.zipCode}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    Country
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {selectedUser?.address?.country}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    Note
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {data.note}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    Tags
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {data?.tags?.join(',')}
                  </p>
                </Col>
                <h4 className="fw-bolder border-bottom pb-50 mb-1">Company Info</h4>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    Company Name
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {data?.company}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    Position
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {data?.position}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    Phone
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {data?.companyPhone}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    Email
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {data?.companyEmail}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    Street
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {selectedUser?.companyAddress?.street}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    City
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {selectedUser?.companyAddress?.city}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    State
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {selectedUser?.companyAddress?.state}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    ZIP Code
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {selectedUser?.companyAddress?.zipCode}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="StaticInput">
                    Country
                  </Label>
                  <p className="form-control-static" id="StaticInput">
                    {selectedUser?.companyAddress?.country}
                  </p>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </div>
      {selectedUser !== null && (
        <NoteModal
          toggle={toggleNotes}
          isOpen={openNote}
          row={selectedUser}
          notes={notes || []}
          dispatch={dispatch}
        />
      )}
    </Fragment>
  );
};

export default UserInfoCard;
