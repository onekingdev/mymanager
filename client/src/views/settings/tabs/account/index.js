// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Third Party Components
import Select from 'react-select';
import Cleave from 'cleave.js/react';
import { useForm, Controller } from 'react-hook-form';
import 'cleave.js/dist/addons/cleave-phone.us';

import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();
// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback,
  Spinner
} from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Demo Components
import DeleteAccount from './DeleteAccount';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { countryOptions, languageOptions, currencyOptions, timeZoneOptions } from '../../constants';
import { fetchUserApi, updateUserInfo } from '../../../../redux/authentication';

const Account = () => {
  // ** States
  const { userData, detailUserInfo } = useSelector((state) => state.auth);
  const [data, setData] = useState({
    id: userData.id,
    email: userData.email,
    fullName: userData.fullName,
    phone: userData.phone
  });
  const [initialData, setInitialData] = useState({
    id: userData.id,
    email: userData.email,
    fullName: userData.fullName,
    avatar: userData.avatar,
    phone: userData.phone
  });

  const [avatarLoading, setAvatarLoading] = useState(false);

  const defaultValues = {
    firstName: data?.fullName.split(' ')[0],
    lastName: data?.fullName.split(' ')[1]
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserApi());
  }, []);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      ...detailUserInfo
    }));
    setInitialData((prev) => ({
      ...prev,
      ...detailUserInfo
    }));
  }, [detailUserInfo]);

  // ** Hooks

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const onChange = (e) => {
    setAvatarLoading(true);
    const files = e.target.files;
    const form = new FormData();
    form.append('file', files[0]);
    API.post('/utill/upload/', form)
      .then((res) => {
        console.log(res.data?.url);
        setData({
          ...data,
          avatar: res.data?.url
        });
        setAvatarLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setAvatarLoading(false);
      });
  };

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      return null;
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

  const handleImgReset = () => {
    setData({
      ...data,
      avatar: ''
    });
  };

  const handleDataChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const saveChange = () => {
    dispatch(updateUserInfo(data));
    setInitialData(data);
  };

  const discard = () => {
    setData(initialData);
  };

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Profile Details</CardTitle>
        </CardHeader>
        <CardBody className="py-2 my-25">
          <div className="d-flex">
            <div
              className="me-25"
              style={{
                width: '102px',
                height: '102px',
                border: '1px solid #f3f3f3',
                borderRadius: '5px'
              }}
            >
              {avatarLoading ? (
                <div className="d-flex align-items-center h-100">
                  <div className="d-flex mt-1 mb-1 flex-column align-items-center w-100 ">
                    <Spinner />
                  </div>
                </div>
              ) : (
                <img
                  className="rounded me-50"
                  src={
                    data?.avatar || require('@src/assets/images/avatars/avatar-blank.png').default
                  }
                  alt="Generic placeholder image"
                  height="100"
                  width="100"
                />
              )}
            </div>
            <div className="d-flex align-items-end mt-75 ms-1">
              <div>
                <Button tag={Label} className="mb-75 me-75" size="sm" color="primary">
                  Upload
                  <Input type="file" onChange={onChange} hidden accept="image/*" />
                </Button>
                <Button
                  className="mb-75"
                  color="secondary"
                  size="sm"
                  outline
                  onClick={handleImgReset}
                >
                  Reset
                </Button>
                <p className="mb-0">Allowed JPG, GIF or PNG. Max size of 800kB</p>
              </div>
            </div>
          </div>
          <Form className="mt-2 pt-50" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="firstName">
                  First Name
                </Label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="firstName"
                      placeholder="John"
                      // invalid={errors.firstName && true}
                      // {...field}
                      value={data?.firstName}
                      onChange={handleDataChange}
                    />
                  )}
                />
                {errors && errors.firstName && (
                  <FormFeedback>Please enter a valid First Name</FormFeedback>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="lastName">
                  Last Name
                </Label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      invalid={errors.lastName && true}
                      {...field}
                      value={data?.lastName}
                      onChange={handleDataChange}
                    />
                  )}
                />
                {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="emailInput">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={data?.email}
                  onChange={handleDataChange}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="company">
                  Company
                </Label>
                <Input
                  value={data?.company}
                  onChange={handleDataChange}
                  id="company"
                  name="company"
                  placeholder="Company Name"
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="phone">
                  Phone Number
                </Label>
                <Cleave
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="1 234 567 8900"
                  options={{ phone: true, phoneRegionCode: 'US' }}
                  value={data?.phone}
                  onChange={handleDataChange}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="address">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="12, Business Park"
                  value={data?.address?.street}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      address: {
                        ...prev?.address,
                        street: e.target.value
                      }
                    }));
                  }}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="accountState">
                  State
                </Label>
                <Input
                  id="accountState"
                  name="state"
                  placeholder="California"
                  value={data?.address?.state}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      address: {
                        ...prev?.address,
                        state: e.target.value
                      }
                    }));
                  }}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="zipCode">
                  Zip Code
                </Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  placeholder="123456"
                  maxLength="6"
                  value={data?.address?.zipCode}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      address: {
                        ...prev?.address,
                        zipCode: e.target.value
                      }
                    }));
                  }}
                />
              </Col>
              <Col sm="6" className="mb-1">
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
                  value={countryOptions.filter((x) => x.value == data?.address?.country)}
                  onChange={(e) => {
                    console.log(e);
                    setData((prev) => ({
                      ...prev,
                      address: {
                        ...prev?.address,
                        country: e.value
                      }
                    }));
                  }}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="language">
                  Language
                </Label>
                <Select
                  id="language"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={languageOptions}
                  theme={selectThemeColors}
                  value={languageOptions.filter((x) => x.value == data?.language)}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      language: e.value
                    }));
                  }}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="timeZone">
                  Timezone
                </Label>
                <Select
                  id="timeZone"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={timeZoneOptions}
                  theme={selectThemeColors}
                  value={timeZoneOptions.filter((x) => x.value == data?.timeZone)}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      timeZone: e.value
                    }));
                  }}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="currency">
                  Currency
                </Label>
                <Select
                  id="currency"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={currencyOptions}
                  theme={selectThemeColors}
                  value={currencyOptions.filter((x) => x.value == data?.currency)}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      currency: e.value
                    }));
                  }}
                />
              </Col>
              <Col className="mt-2" sm="12">
                <Button type="submit" className="me-1" color="primary" onClick={saveChange}>
                  Save changes
                </Button>
                <Button color="secondary" outline onClick={discard}>
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <DeleteAccount />
    </Fragment>
  );
};

export default Account;
