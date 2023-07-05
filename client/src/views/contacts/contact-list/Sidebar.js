// ** React Import
import { useState, useEffect, useRef } from 'react';

// ** Custom Components
import Sidebar from '@components/sidebar';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Third Party Components
import Select, { components } from 'react-select';
import classnames from 'classnames';
import { useForm } from 'react-hook-form';

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Row, Col, FormGroup } from 'reactstrap';
import { ChevronDown, ChevronUp } from 'react-feather';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { addContactAction, updateContactAction } from '../store/actions';

import useMessage from '../../../lib/useMessage';
import AddPositionModal from './AddPositionModal';
import { toast } from 'react-toastify';
import { selectContactLead } from '../store/reducer';

import { useAddContacts, useUpdateContacts } from '@src/requests/contacts/contacts';
import AddNewLeadSourceModal from '../tags/AddNewLeadSourceModal';
import AddNewTagModal from '../tags/AddNewTagModal';
import InputPasswordToggle from '@components/input-password-toggle';
import AddNewStage from './LeadBoard/AddNewStage';

// ** Constants
import {
  defaultValues,
  stageOptions,
  countryOptions,
  newPositions,
  positionOptions,
  statusOptions,
  relationType
} from './constants';
import { isObjEmpty } from '../../../utility/Utils';
import { FiSettings } from 'react-icons/fi';

const SidebarNewUsers = ({
  store,
  open,
  toggleSidebar,
  contactTypeTitle,
  orderContactType
  // leadRefetch
}) => {
  // ** States
  const selectContact = useSelector((state) => state?.totalContacts?.selectedContact);
  // get lead position data from db
  const { contactTypeList } = useSelector((state) => state?.totalContacts);
  const contactList = useSelector((state) => state?.totalContacts?.contactList?.list);

  const [state, setState] = useState(selectContact);

  const contactTypeOptions = contactTypeList
    ? contactTypeList?.map((contactType) => {
        return { value: contactType._id, label: contactType.name, img: contactType.icon };
      })
    : null;

  const [data] = useState(null);
  const [plan, setPlan] = useState('basic');
  const [role, setRole] = useState('subscriber');
  const [contactTypes, setContactTypes] = useState(
    contactTypeOptions.find((option) => {
      return state?.contactType?.indexOf(option.value) > -1;
    })
  );
  const [leadOptions, setLeadOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [rolesArray, setRolesArray] = useState([]);
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState('0px');

  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const [selectedLeadSource, setSelectedLeadSource] = useState(null);

  const content = useRef(null);
  const { mutate: createNewContact } = useAddContacts();
  const { mutate: updateContact } = useUpdateContacts();

  // add lead position modal state
  const [modal, setModal] = useState(false);

  // add lead position modal toggler
  const toggle = () => setModal(!modal);

  const { error } = useMessage();

  // ** Store Vars
  const dispatch = useDispatch();

  useEffect(() => {
    if (store?.leadSource && store?.leadSource?.length > 0) {
      let options = [];
      for (const lead of store.leadSource) {
        options.push({ value: lead.title, label: lead.title });
      }
      setLeadOptions(options);
    }
    if (Array.isArray(store?.tags)) {
      let options = store.tags.map((tag) => ({
        value: tag.value,
        label: tag.value
      }));
      setTagOptions(options);
    }
  }, [store?.leadSource]);

  useEffect(() => {
    setState(selectContact);
  }, [selectContact]);

  // ** Vars
  const {
    control,
    setValue,
    setError,
    formState: { errors }
  } = useForm({ defaultValues });

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '');
    }
    setRole('subscriber');
    setPlan('basic');
  };

  // ===============
  // const {
  //   addLead: { loading: AddLoading }
  // } = useSelector((state) => state?.leadContact);

  function handleSubmit() {
    const { contactType, fullName, email, phone } = state;
    console.log('contactType', contactType);
    if (!contactType || !contactType?.length) {
      error('Please select contact type');
      return;
    }
    if (fullName === '' || !fullName) {
      error('Full Name must not be empty');
      return;
    }
    if (email === '' || !email) {
      error('Full Name must not be empty !');
      return;
    }
    if (phone === '' || !phone) {
      error('Full Name must not be empty !');
      return;
    }

    // Email and Phone Validation
    const isEmailExist = contactList?.find(
      (p) =>
        p?.email === state?.email ||
        p?.email.toLowerCase() === state?.email.toLowerCase() ||
        /^(?=.*[A-Z])/.test(state?.email)
    );

    if (state?.phone?.startsWith('-')) {
      return toast.error('Please Provide a valid phone Number');
    }

    // if (/^(?=.*[A-Z])/.test(state?.phone) || /^(?=.*[a-z])/.test(state?.phone) || /^(?=.*[!@#$&*~`"'?()])/.test(state?.phone)) {
    //     return toast.error("RegEx Please Provide a valid phone Number")
    // }

    const isPhoneExist = contactList?.find((p) => p?.phone === state?.phone);

    if (isObjEmpty(selectContact)) {
      if (isEmailExist) {
        return toast.error('Please Provide a valid email');
      } else if (isPhoneExist) {
        return toast.error('Please Provide a valid phone Number');
      } else {
        //if (setCurrentPage) setCurrentPage(1);
        console.log('state', state);
        dispatch(addContactAction(state));
        toggleSidebar();
      }
    } else {
      //if (setCurrentPage) setCurrentPage(1);
      dispatch(updateContactAction(state));
      toggleSidebar();
    }
  }

  const [toggleStage, setToggleStage] = useState(false);
  const handleToggle = () => {
    setToggleStage(true);
  };
  const toggleTags = () => setIsTagOpen(!isTagOpen);
  const toggleLeads = () => setIsLeadOpen(!isLeadOpen);

  const toggleAccordion = () => {
    setActive(!active);
    setHeight(active ? '0px' : `40vh`);
  };
  const blockInvalidChar = (e) => ['+', '-'].includes(e.key) && e.preventDefault();

  const ContactTypeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  const leadStore = useSelector((state) => {
    return {
      tags: state.totalContacts?.tags,
      stages: state.totalContacts?.stages,
      leadSources: state.totalContacts?.leadSource
    };
  });

  const leadStageOptions = leadStore.stages.map((leadStage) => ({
    value: leadStage._id,
    label: leadStage.value
  }));

  const phoneTemp = (
    <div className="mb-1">
      <Label className="form-label" for="phone">
        Phone <span className="text-danger">*</span>
      </Label>
      <Input
        type="number"
        name="phone"
        id="phone"
        placeholder="(397) 294-5153"
        value={state?.phone}
        onChange={(e) => {
          setState((p) => ({
            ...p,
            phone: e?.target?.value
          }));
        }}
        required
      />
    </div>
  );
  const countryTemp = (
    <div className="mb-1">
      <Label className="form-label" for="country">
        Country <span className="text-danger">*</span>
      </Label>

      <Select
        isClearable={false}
        classNamePrefix="select"
        options={countryOptions}
        theme={selectThemeColors}
        className={classnames('react-select', {
          'is-invalid': data !== null && data.country === null
        })}
        onChange={(e) => {
          setState((p) => ({
            ...p,
            country: e.value
          }));
        }}
      />
    </div>
  );
  const leadSourceTemp = (
    <div className="mb-1">
      <Label className="form-label" for="user-role">
        Source
      </Label>
      <Row>
        <Col md={10}>
          <Select
            isMulti
            className="flex-fill lead-source-option"
            isClearable={false}
            classNamePrefix="select"
            options={leadOptions}
            value={state?.leadSource}
            onChange={(e) => {
              console.log(e);
              setState((p) => ({
                ...p,
                leadSource: e
              }));
            }}
          />
        </Col>
        <Col md={2}>
          <button
            className="btn-icon me-1 btn"
            style={{
              cursor: 'pointer',
              float: 'end',
              border: 'none !important',
              background: 'transparent !important'
            }}
            onClick={toggleLeads}
          >
            <FiSettings color="secondary" size={18} />
          </button>
        </Col>
      </Row>
    </div>
  );
  const leadStageTemp = (
    <div className="mb-1">
      <Label className="form-label" for="user-role">
        Stage
      </Label>
      <Row>
        <Col md={10}>
          <Select
            className="flex-fill"
            isClearable={false}
            classNamePrefix="select"
            options={leadStageOptions}
            theme={selectThemeColors}
            value={leadStageOptions.find((x) => x.label == state?.stage)}
            onChange={(e) => {
              console.log(e);
              setState((p) => ({
                ...p,
                stage: e.label
              }));
            }}
          />
        </Col>
        <Col md={2}>
          <button
            className="btn-icon me-1 btn"
            style={{
              cursor: 'pointer',
              float: 'end',
              border: 'none !important',
              background: 'transparent !important'
            }}
            onClick={handleToggle}
          >
            <FiSettings color="secondary" size={18} />
          </button>
        </Col>
      </Row>
      <AddNewStage modalType={toggleStage} leadStore={leadStore} setModalType={setToggleStage} />
    </div>
  );
  const tagTemp = (
    <div className="mb-1">
      <Label className="form-label" for="country">
        Tag <span className="text-danger">*</span>
      </Label>
      <Row>
        <Col md={10}>
          <Select
            isMulti
            isClearable={false}
            classNamePrefix="select"
            options={stageOptions}
            className={
              (classnames('react-select', {
                'is-invalid': data !== null && data.stage === null
              }),
              'lead-tag-option')
            }
            value={state?.tags}
            onChange={(e) => {
              setState((p) => ({
                ...p,
                tags: e
              }));
            }}
            style={{ width: '90%' }}
          />
        </Col>
        <Col md={1}>
          <button
            className="btn-icon me-1 btn"
            style={{
              float: 'end',
              cursor: 'pointer',
              border: 'none !important',
              background: 'transparent !important'
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <FiSettings color="secondary" size={18} />
          </button>
        </Col>
      </Row>
    </div>
  );
  const companyTemp = (
    <div className={'mb-1'}>
      <Label className="form-label" for="company">
        Company <span className="text-danger">*</span>
      </Label>

      <Input
        id="company"
        value={state?.company}
        placeholder="Company Pvt Ltd"
        onChange={(e) => {
          setState((p) => ({
            ...p,
            company: e?.target?.value
          }));
        }}
      />
    </div>
  );
  const positionTemp = (
    <div className={'mb-1'}>
      <Label className="form-label" for="user-role">
        Position
      </Label>

      <div className={'d-flex justify-content-between gap-2'}>
        <Select
          className="flex-fill"
          isClearable={false}
          value={positionOptions.find((option) => {
            return option.value === state?.position;
          })}
          classNamePrefix="select"
          options={positionOptions}
          theme={selectThemeColors}
          onChange={(e) => {
            setState((p) => ({
              ...p,
              position: e.value
            }));
          }}
        />
        <Button onClick={toggle}>Add</Button>
      </div>
    </div>
  );
  const sourceTemp = (
    <div className="mb-1">
      <Label className="form-label" for="user-role">
        Source
      </Label>

      <Row>
        <Col md={10}>
          <Select
            isMulti
            classNamePrefix="select"
            className={
              (classnames('react-select', {
                'is-invalid': data !== null && data.stage === null
              }),
              'lead-source-option')
            }
            isClearable={false}
            options={leadOptions}
            theme={selectThemeColors}
            value={state?.leadSource}
            onChange={(e) => {
              setState((p) => ({
                ...p,
                leadSource: e
              }));
            }}
          />
        </Col>
        <Col md={2}>
          <button
            className="btn-icon btn"
            style={{
              cursor: 'pointer',
              float: 'end',
              border: 'none !important',
              background: 'transparent !important'
            }}
            onClick={(e) => {
              e.preventDefault();
              toggleLeads();
            }}
          >
            <FiSettings color="secondary" size={18} />
          </button>
        </Col>
      </Row>
    </div>
  );
  const typeTemp = (
    <div className="mb-1" value={plan} onChange={(e) => setPlan(e.target.value)}>
      <Label className="form-label" for="select-plan">
        Select {contactTypeTitle} Type
      </Label>

      <Input
        value={state?.type}
        onChange={(e) => {
          setState((p) => ({
            ...p,
            type: e?.target?.value
          }));
        }}
        type="select"
        id="select-plan"
        name="select-plan"
      >
        <option value="individual">Individual</option>
        <option value="company">Company</option>
      </Input>
    </div>
  );
  const relationTypeTemp = (
    <div className="mb-1" value={plan} onChange={(e) => setPlan(e.target.value)}>
      <Label className="form-label" for="select-plan">
        Select Relation Type
      </Label>

      <Input
        onChange={(e) => {
          setState((p) => ({
            ...p,
            type: e?.target?.value
          }));
        }}
        type="select"
        id="select-plan"
        name="select-plan"
      >
        {relationType.map((item, key) => (
          <option value={item.value} key={key}>
            {item.label}
          </option>
        ))}
      </Input>
    </div>
  );
  const addressTemp = (
    <>
      <div className="mb-1">
        <Label className="form-label" for="address">
          Address <span className="text-danger">*</span>
        </Label>
        <Input
          type="text"
          id="contact"
          placeholder="Address"
          onKeyDown={blockInvalidChar}
          onChange={(e) => {
            setState((p) => ({
              ...p,
              address: e?.target?.value
            }));
          }}
        />
      </div>
      <Row>
        <Col md={5}>
          <div className="mb-1">
            <Label className="form-label" for="city">
              City<span className="text-danger">*</span>
            </Label>
            <Input
              type="text"
              id="city"
              placeholder="city"
              onKeyDown={blockInvalidChar}
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  city: e?.target?.value
                }));
              }}
            />
          </div>
        </Col>
        <Col md={4} style={{ paddingLeft: '0px' }}>
          <div className="mb-1">
            <Label className="form-label" for="state">
              State<span className="text-danger">*</span>
            </Label>
            <Input
              type="text"
              id="state"
              placeholder="state"
              onKeyDown={blockInvalidChar}
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  state: e?.target?.value
                }));
              }}
            />
          </div>
        </Col>
        <Col md={3} style={{ paddingLeft: '0px' }}>
          <div className="mb-1">
            <Label className="form-label" for="zip">
              Zip <span className="text-danger">*</span>
            </Label>
            <Input
              type="number"
              id="zip"
              placeholder="zip"
              onKeyDown={blockInvalidChar}
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  zip: e?.target?.value
                }));
              }}
            />
          </div>
        </Col>
      </Row>
    </>
  );
  const workTypeTemp = (
    <div className="mb-1">
      <Label className="form-label" for="contact">
        WorkType <span className="text-danger">*</span>
      </Label>
      <Select
        theme={selectThemeColors}
        isClearable={false}
        className="react-select"
        classNamePrefix="select"
        options={statusOptions}
        // value={admin.adminType}
        value={statusOptions.find((option) => {
          return option.value == state?.type;
        })}
        onChange={(e) => {
          setState((p) => ({
            ...p,
            type: e.value
          }));
        }}
      />
    </div>
  );
  const roleTemp = (
    <div className="mb-1">
      <Label className="form-label" for="contact">
        Role <span className="text-danger">*</span>
      </Label>
      <Input
        type="select"
        id="role"
        name="role"
        onChange={(e) => {
          setState((p) => ({
            ...p,
            role: e.target.value
          }));
        }}
      >
        <option value="">Selecting...</option>
        {rolesArray?.map((r, i) => {
          return (
            <option key={i} value={r._id}>
              {r.roleName}
            </option>
          );
        })}
      </Input>
    </div>
  );
  const accessTemp = (
    <div className="custom_accordion__section">
      <div
        className={`custom_accordion ${
          active ? 'custom_active' : ''
        } d-flex justify-content-between`}
        onClick={toggleAccordion}
      >
        <p className="custom_accordion__title">Create Access (Optional)</p>
        <span>{active ? <ChevronDown /> : <ChevronUp />}</span>
      </div>
      <div ref={content} style={{ maxHeight: `${height}` }} className="custom_accordion__content">
        <div className="mb-1">
          <Label className="form-label" for="contact">
            User Name
          </Label>
          <Input
            type="text"
            id="contact"
            placeholder="username"
            onKeyDown={blockInvalidChar}
            onChange={(e) => {
              setState((p) => ({
                ...p,
                username: e?.target?.value
              }));
            }}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="contact">
            Password
          </Label>
          <InputPasswordToggle
            className="input-group-merge"
            id="login-password"
            name="password"
            value={state?.password}
            onChange={(e) => {
              setState((p) => ({
                ...p,
                password: e?.target?.value
              }));
            }}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="contact">
            Send Invite <span className="text-danger">*</span>
          </Label>
          <FormGroup check>
            <Input
              type="checkbox"
              name="willSendEmail"
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  willSendEmail: e.target.checked
                }));
              }}
            />
            <Label check>Send email invitation to activate employee account</Label>
          </FormGroup>
        </div>
      </div>
    </div>
  );

  const renderTemps = () => {
    switch (orderContactType) {
      case 0:
        return (
          <>
            {phoneTemp}
            {typeTemp}
            {state?.type == 'company' && (
              <>
                {companyTemp}
                {positionTemp}
              </>
            )}
            {sourceTemp}
            {tagTemp}
          </>
        );
      case 1:
        return (
          <>
            {phoneTemp}
            {addressTemp}
            {workTypeTemp}
            {positionTemp}
            {tagTemp}
            {roleTemp}
            {accessTemp}
          </>
        );
      case 2:
        return (
          <>
            {phoneTemp}
            {typeTemp}
            {state?.type === 'company' && (
              <>
                {companyTemp}
                {positionTemp}
              </>
            )}
            {leadSourceTemp}
            {tagTemp}
            {leadStageTemp}
            {countryTemp}
          </>
        );
        break;
      case 3:
        return (
          <>
            {phoneTemp}
            {relationTypeTemp}
            {state?.type == 'Business' && (
              <>
                {companyTemp}
                {positionTemp}
              </>
            )}
            {tagTemp}
            {countryTemp}
          </>
        );
      default:
        return (
          <>
            {phoneTemp}
            {typeTemp}
            {state?.type === 'company' && (
              <>
                {companyTemp}
                {positionTemp}
              </>
            )}
            {tagTemp}
          </>
        );
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={isObjEmpty(selectContact) ? `New ${contactTypeTitle}` : `Update ${contactTypeTitle}`}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit}>
        <div className="mb-1" value={plan} onChange={(e) => setPlan(e.target.value)}>
          <Label className="form-label" for="select-plan">
            Select Contact Type
          </Label>
          <Select
            isMulti
            id="contactType"
            value={contactTypeOptions.filter((option) => {
              return state?.contactType?.indexOf(option.value) > -1;
            })}
            isClearable={false}
            className="react-select lead-source-option"
            classNamePrefix="select"
            options={contactTypeOptions}
            theme={selectThemeColors}
            onChange={(data) => {
              setState((prev) => ({ ...prev, contactType: data.map((x) => x.value) }));
              setContactTypes(data);
            }}
            components={{ Option: ContactTypeComponent }}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="fullName">
            Full Name <span className="text-danger">*</span>
          </Label>

          <Input
            id="fullName"
            placeholder="John Doe"
            value={state?.fullName}
            onChange={(e) => {
              setState((p) => ({
                ...p,
                fullName: e?.target?.value
              }));
            }}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="userEmail">
            Email <span className="text-danger">*</span>
          </Label>

          <Input
            type="email"
            id="userEmail"
            placeholder="john.doe@example.com"
            value={state?.email}
            onChange={(e) => {
              setState((p) => ({
                ...p,
                email: e?.target?.value
              }));
            }}
          />

          <FormText color="muted">You can use letters, numbers & periods</FormText>
        </div>
        {renderTemps()}
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="me-1"
          color="primary"
          // disabled={AddLoading}
        >
          {/* {AddLoading ? 'Adding...' : 'Submit'} */}
          Submit
        </Button>

        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
      <AddPositionModal modal={modal} toggle={toggle} newPositions={newPositions} />
      <AddNewLeadSourceModal
        open={isLeadOpen}
        store={store}
        dispatch={dispatch}
        toggle={toggleLeads}
      />
      <AddNewTagModal open={isTagOpen} store={store} dispatch={dispatch} toggle={toggleTags} />
    </Sidebar>
  );
};

export default SidebarNewUsers;
