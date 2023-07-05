import React, { useState, useEffect } from 'react';
import Sidebar from '@components/sidebar';
import InputNumber from 'rc-input-number';
import { Row, Col, Button, Card, CardBody, Label } from 'reactstrap';
import { Plus, Minus } from 'react-feather';
import Select, { components } from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import makeAnimated from 'react-select/animated';
import { setSmartList } from '../../store/reducer';
import { setContactInfo } from '../../store/actions';

// import { ChevronDown, ChevronUp } from 'react-feather';

const EditContactSideBar = ({ open, toggleSidebar }) => {
  // ** States
  const automation = useSelector((state) => state.automation);
  const automationData = automation.selectedAutomation;

  const [contactType, setContactType] = useState(null);
  const [activateTime, setActivateTime] = useState(null);
  const [selectedContact, setSelectedContact] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLeadSource, setSelectedLeadSource] = useState([]);
  const [smartListOption, setSmartListOption] = useState([]);
  const [selectedSmartList, setSelectedSmartList] = useState([]);
  const [activationUpon, setActivationUpon] = useState({ value: "Upon Entry", label: "Upon Entry" });
  const [customActivationDays, setCustomActivationDays] = useState(0);
  const [intervalType, setIntervalType] = useState(null);

  const [criteriaTimeCondition, setCriteriaTimeCondition] = useState(null);
  const [criteriaType, setCriteriaType] = useState(null);
  const [criteriaRetention, setCriteriaRetention] = useState(null)

  const [errors, setErrors] = useState(true)
  const dispatch = useDispatch();
  // console.log('this is edit automation', automation);
  const _tags = useSelector(state => state.totalContacts.tags);
  const _leadSource = useSelector(state => state.totalContacts.leadSource);

  let tagsOption = [];
  let leadSourceOption = [];

  _tags.map(item => tagsOption.push({ value: item.value, label: item.value }))
  _leadSource.map(item => leadSourceOption.push({ value: item.title, label: item.title }))

  useEffect(() => {
    const selectedAutomationContact = automation.selectedAutomation.contactInfo;

    if (automationData.contactInfo != {}) {

      const activateTime = automation.selectedAutomation.activateTime;
      setContactType(automation.selectedAutomation.contactInfo.contactType)
      if (automation.selectedAutomation.contactInfo.contactType == 'Contacts') {
        let initContacts = [];
        automation.selectedAutomation.contactInfo.contacts.map(item => {
          initContacts.push({ value: item, label: item })
        });
        setSelectedContact(initContacts);
        let initTags = [];
        automation.selectedAutomation.contactInfo.tags.map(item => {
          initTags.push({ value: item, label: item })
        });
        setSelectedTags(initTags);
        let initLeadSources = [];
        automation.selectedAutomation.contactInfo.leadSources.map(item => {
          initLeadSources.push({ value: item, label: item })
        });
        setSelectedLeadSource(initLeadSources)
      } else if (selectedAutomationContact.contactType == 'SmartList') {
        let initSmartList = [];
        selectedAutomationContact.smartList.map(item => {
          const currentSmartList = automation.smartlist.find(e => e._id == item);
          initSmartList.push({ value: item, label: currentSmartList.name })
        })
        setSelectedSmartList(initSmartList)
      }
      setActivationUpon({ value: automation.selectedAutomation.activationUpon.uponType, label: automation.selectedAutomation.activationUpon.uponType })
      if (activateTime.isImmediately) {
        setActivateTime({ value: "Immediately", label: "Immediately" })
      } else {
        setActivateTime({ value: "Custom Time Delay", label: "Custom Time Delay" });
        setCustomActivationDays(activateTime.time);
        setIntervalType({ value: activateTime.unit, label: activateTime.unit });

      }

      if (automation.selectedAutomation.activationUpon.uponType == "Criteria Met") {
        setCriteriaType({ value: automation.selectedAutomation.activationUpon.criteria.criteriaType, label: automation.selectedAutomation.activationUpon.criteria.criteriaType })
        setCriteriaTimeCondition({ value: activateTime.type, label: activateTime.type })
      }
    }


  }, []);
  const animatedComponents = makeAnimated();
  // console.log('this is automation smartlist data', automation.smartlist);
  useEffect(() => {
    let smartlist = [];
    let listItem;
    if (automation.smartlist.length > 0) {
      automation.smartlist.map((item) => {
        listItem = { value: item._id, label: item.name };
        smartlist.push(listItem);
      });
    }
    setSmartListOption(smartlist);
  }, []);
  const contactTypes = [
    { value: 'Contacts', label: 'Contacts' },
    { value: 'SmartList', label: 'SmartList' }
  ];
  const ContactList = [
    { value: 'Clients', label: 'Clients' },
    { value: 'Employee', label: 'Employee' },
    { value: 'Leads', label: 'Leads' },
    { value: 'Relationships', label: 'Relationships' },
    { value: 'Vender', label: 'Vender' },
    { value: 'Members', label: 'Members' }
  ];
  const dateOptions = [
    { value: 'Immediately', label: 'Immediately' },
    { value: 'Custom Time Delay', label: 'Custom Time Delay' }
  ];

  const activationListOption = [
    { value: 'Upon Entry', label: 'Upon Entry' },
    { value: 'Criteria Met', label: 'Criteria Met' }
  ];
  const intervalTypeOptions = [
    { value: 'minutes', label: 'minutes' },
    { value: 'hours', label: 'hours' },
    { value: 'days', label: 'days' }
  ]

  const intervalTypeOptionsForCriteria = [
    { value: 'days', label: 'days' },
    { value: 'weeks', label: 'weeks' },
    { value: 'months', label: 'months' },
    { value: 'years', label: 'years' },
  ]

  const criteriaTimeConditionOptions = [
    { value: 'Before', label: 'Before' },
    { value: 'After', label: 'After' },
    { value: 'On', label: 'On' },
  ]

  const criteriaTypeOptions = [
    { value: 'Date of Birth', label: 'Date of Birth' },
    { value: 'Anniversary', label: 'Anniversary' },
    { value: 'CC Expiration', label: 'CC Expiration' },
    { value: 'Contract Expire', label: 'Contract Expire' },
    { value: 'Retention Rating', label: 'Retention Rating' },
  ]

  const retentionOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
  ]
  const onSetContactType = (e) => {
    setContactType(e.value);
    if (e.value == 'SmartList') {
      setSelectedContact([]);
      setSelectedTags([]);
      setSelectedLeadSource([]);
      setActivationUpon(null);
      setActivateTime(null);
      setIntervalType(null);
    }
    if (e.value == 'Contacts') {
      setSelectedSmartList([]);
      setSelectedContact([]);
      setSelectedTags([]);
      setSelectedLeadSource([]);
      setActivationUpon(null);
      setActivateTime(null);
      setIntervalType(null);
    }
  };
  const onSetActivateTime = (e) => {
    if (e.value == 'Immediately') {
      setCustomActivationDays(0);

    }
    setActivateTime(e);
  };

  const onSelectedSmartList = (e) => {
    setSelectedSmartList(e);
  };
  const handleSidebarClosed = () => {
    //
  };

  const onSetContact = () => {
    setErrors(false)
    let contactInfo = {
      contactType: '',
      contacts: [],
      tags: [],
      leadSources: [],
      smartList: []
    };
    let activationupon = {
      uponType: '',
      criteria: {
        criteriaType: '',
        rentingRate: 0
      }
    }
    let activatetime = {
      isImmediately: true,
      time: 0,
      type: 'After',
      unit: 'minutes'
    }
    if (contactType == null) {
      setErrors(true)
      toast.error("Please Select Contact Type")

    } else {

      contactInfo.contactType = contactType;

      if (contactType == 'Contacts') {

        if (selectedContact.length == 0) {
          setErrors(true)
          toast.error("Please Select Contacts")
        } else {
          selectedContact.map((item) => contactInfo.contacts.push(item.value));
        }

        if (selectedTags.length == 0) {
          setErrors(true)
          toast.error("Please Select Tags")
        } else {
          selectedTags.map((item) => contactInfo.tags.push(item.value))
        }

        if (selectedLeadSource.length == 0) {
          setErrors(true)
          toast.error('Please select LeadSource')
        } else {
          selectedLeadSource.map((item) => contactInfo.leadSources.push(item.value))
        }
      } else if (contactType == "SmartList") {
        if (selectedSmartList.length == 0) {
          setErrors(true)
          toast.error("Please select SmartList");
        } else {
          selectedSmartList.map((item) => contactInfo.smartList.push(item.value))
        }
      }
    }

    if (activationUpon == null) {
      setErrors(true)
      toast.error("Please select activation Upon")
    } else {
      activationupon.uponType = activationUpon.value;
      if (activationUpon.value == 'Criteria Met') {
        if (criteriaType == null) {
          setErrors(true)
          toast.error("Please select Criteria")
        } else {
          activationupon.criteria.criteriaType = criteriaType.value;

          if (criteriaType.value == "Retention Rating") {
            if (criteriaRetention == null) {
              setErrors(true)
              toast.error("Please select Retention Rating")
            } else {
              activationupon.criteria.rentingRate = criteriaRetention.value
            }
          }
        }

        if (activateTime == null) {
          setErrors(true)
          toast.error("Select activate Time")
        } else {
          if (activateTime.value == "Immediately") {
            activatetime.isImmediately = true
            activatetime.time = 0
          } else if (activateTime.value == "Custom Time Delay") {
            activatetime.isImmediately = false;

            if (criteriaTimeCondition == null) {
              setErrors(true)
              toast.error("Please select Time Unit")
            } else {
              activatetime.type = criteriaTimeCondition.value;
            }

            activatetime.time = customActivationDays;

            if (intervalType == null) {
              setErrors(true)
              toast.error("Please select Time Interval")
            } else {
              activatetime.unit = intervalType.value;
            }

          }
        }
      } else if (activationUpon.value == 'Upon Entry') {
        if (activateTime == null) {
          setErrors(true)
          toast.error("Select activate Time")
        } else {
          if (activateTime.value == "Immediately") {
            activatetime.isImmediately = true;
            activatetime.time = 0;
          } else if (activateTime.value == "Custom Time Delay") {
            activatetime.isImmediately = false;
            activatetime.type = "After";
            activatetime.time = customActivationDays;
            if (intervalType == null) {
              setErrors(true)
              toast.error("Please select Time Interval")
            } else {
              activatetime.unit = intervalType.value;
            }
          }
        }
      }
    }


    dispatch(setContactInfo({ contactInfo: contactInfo, activatetime: activatetime, activationupon: activationupon }))
    toggleSidebar()

    // let contacts = [],
    //   smartlists = [],
    //   tags = [],
    //   leadsources = [];
    // if (selectedContact.length > 0) selectedContact.map((item) => contacts.push(item.value));
    // if (selectedSmartList.length > 0) selectedSmartList.map((item) => smartlists.push(item.value));
    // if (selectedTags.length > 0) selectedTags.map(item => tags.push(item.value))
    // if (selectedLeadSource.length > 0) selectedLeadSource.map(item => leadsources.push(item.value))
    // const contactInfo = {
    //   contactType: contactType,
    //   contactList: contacts,
    //   smartlist: smartlists,
    //   tags: tags,
    //   leadSources: leadsources,
    //   activationUpon: activationUpon.value,
    //   activateTime: activateTime,
    //   hours: customActivationHours,
    //   days: customActivationDays,
    //   mins: customActivationMins
    // };

    // dispatch(setContactInfo(contactInfo));
    // // console.log(contactInfo);
    // setContactType(null);
    // setActivateTime(null);
    // setSelectedContact([]);
    // setSelectedTags([]);
    // setSelectedLeadSource([]);
    // setSmartListOption([]);
    // setSelectedSmartList([]);
    // setActivationUpon(null);
    // setCustomActivationHours(0);
    // setCustomActivationDays(0);
    // setCustomActivationMins(0)
    // toggleSidebar()
  };

  const onCancel = () => {
    setContactType(null);
    setActivateTime(null);
    setSelectedContact([]);
    setSelectedTags([]);
    setSelectedLeadSource([]);
    setSmartListOption([]);
    setSelectedSmartList([]);
    setActivationUpon(null);
    setCustomActivationDays(0);
    toggleSidebar()
  }

  const customStyles = {
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#174ae7',
    }),
  }
  const customStyleForInterval = {
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#174ae7',
    }),
    control: (base) => ({
      ...base,
      height: 34,
      minHeight: 34,
      minWidth: 130,
      fontSize: 14,
      padding: "0 8px 0 3px",
      boxShadow: "none"
    })
  }

  const _customStyleForInterval = {
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#174ae7',
    }),
    control: (base) => ({
      ...base,
      height: 34,
      minHeight: 34,
      width: 130,
      fontSize: 14,
      padding: "0 8px 0 3px",
      boxShadow: "none"
    })
  }
  return (
    <Sidebar
      open={open}
      // title={`Edit ${showData.content_type}`}
      title="Edit Contact"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
      style={{ width: '500px' }}
    >
      <Card className="post">
        <CardBody>
          <Label>Contact Type</Label>
          <Row>
            <Col sm="12" className="mb-1" style={{ zIndex: '3' }}>
              <Select
                id="task-tags"
                className="react-select"
                classNamePrefix="select"
                isClearable={false}
                options={contactTypes}
                // theme={selectThemeColors}
                styles={customStyles}
                defaultValue={{ value: contactType, label: contactType }}
                onChange={(e) => {
                  onSetContactType(e);
                }}
              />
            </Col>
            {contactType == 'Contacts' && (
              <>
                {' '}
                <Col sm="12" className="mb-1">
                  <Label>Contacts</Label>
                  <Select
                    isClearable={false}
                    // theme={selectThemeColors}
                    styles={customStyles}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={selectedContact}
                    isMulti
                    options={ContactList}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      setSelectedContact(e);
                    }}
                  />
                </Col>
                <Col sm="12" className="mb-1">
                  <Label>Add tags</Label>
                  <Select
                    className="react-select"
                    classNamePrefix="select"
                    isMulti
                    isClearable={false}
                    options={tagsOption}
                    styles={customStyles}
                    defaultValue={selectedTags}
                    onChange={(e) => {
                      setSelectedTags(e);
                    }}
                  />
                </Col>
                <Col sm="12" className="mb-1">
                  <Label>Lead source</Label>
                  <Select
                    className="react-select"
                    classNamePrefix="select"
                    isClearable={false}
                    isMulti
                    options={leadSourceOption}
                    styles={customStyles}
                    defaultValue={selectedLeadSource}
                    onChange={(e) => {
                      setSelectedLeadSource(e);
                    }}
                  />
                </Col>
              </>
            )}
            {contactType == 'SmartList' && (
              <Col sm="12" className="mb-1">
                <Label>SmartLists</Label>

                <Select
                  isClearable={false}
                  // theme={selectThemeColors}
                  styles={customStyles}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={selectedSmartList}
                  isMulti
                  options={smartListOption}
                  className="react-select"
                  classNamePrefix="select"
                  onChange={(e) => {
                    setSelectedSmartList(e);
                  }}
                />
              </Col>
            )}
            <Col sm="12" className="mb-1">
              <Label>Acitvation Upon</Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                isClearable={false}
                options={activationListOption}
                placeholder="Select..."
                // theme={selectThemeColors}
                styles={customStyles}
                defaultValue={activationUpon}
                onChange={(e) => {
                  setActivationUpon(e);
                }}
              />
            </Col>

            {activationUpon != null && activationUpon.value == "Criteria Met" &&
              <Col>
                <Label>Criteria</Label>
                <Select
                  isClearable={false}
                  bsSize='sm'
                  // theme={selectThemeColors}
                  styles={customStyles}
                  // closeMenuOnSelect={false}
                  defaultValue={criteriaType}
                  options={criteriaTypeOptions}
                  className="react-select"
                  classNamePrefix="select"
                  onChange={(e) =>
                    setCriteriaType(e)
                  }
                />
                {activationUpon != null && activationUpon.value == "Criteria Met" && criteriaType != null && criteriaType.value == "Retention Rating" &&
                  <div className='mt-1'>
                    <Label>Retention Rating</Label>
                    <Select
                      isClearable={false}
                      bsSize='sm'
                      // theme={selectThemeColors}
                      styles={customStyles}
                      closeMenuOnSelect={false}
                      defaultValue={criteriaRetention}
                      options={retentionOptions}
                      className="react-select"
                      classNamePrefix="select"
                      onChange={(e) => {
                        setCriteriaRetention(e);
                      }}
                    />
                  </div>
                }

              </Col>
            }
            <Col className="mb-1 mt-1" sm="12">
              <Label className="form-label">Activate</Label>
              <Select
                styles={customStyles}
                className="react-select"
                classNamePrefix="select"
                defaultValue={activateTime}
                options={dateOptions}
                isClearable={false}
                onChange={(e) => onSetActivateTime(e)}
              />
            </Col>
            {activationUpon != null && activationUpon.value == "Upon Entry" && activateTime != null && activateTime.value == 'Custom Time Delay' && (
              <div style={{ zIndex: '0' }}>
                <Col
                  className="compose-mail-form-field d-flex mt-1 justify-content-between center"
                  style={{ zIndex: '0' }}
                  sm="12"
                >
                  <div className='form-group'>
                    <input type="number" value={customActivationDays} min='0'
                      onChange={(e) => setCustomActivationDays(e.target.value)} className='form-control input-sm' style={{ height: '34px', width: '100px' }} />
                  </div>
                  <Select
                    isClearable={false}
                    bsSize='sm'
                    // theme={selectThemeColors}
                    styles={customStyleForInterval}
                    closeMenuOnSelect={false}
                    defaultValue={intervalType}
                    options={intervalTypeOptions}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      setIntervalType(e);
                    }}
                  />
                  <p style={{ fontSize: '16px', marginTop: '5px' }}>After</p>
                  <div style={{ width: '50px' }}></div>
                </Col>

              </div>
            )}
            {activationUpon != null && activationUpon.value == "Criteria Met" && activateTime != null && activateTime.value == 'Custom Time Delay' && (
              <div style={{ zIndex: '0' }}>
                <Col
                  className="compose-mail-form-field d-flex mt-1 justify-content-between center"
                  style={{ zIndex: '0' }}
                  sm="12"
                >
                  <div className='form-group'>
                    <input type="number" value={customActivationDays} min='0'
                      onChange={(e) => setCustomActivationDays(e.target.value)} className='form-control input-sm' style={{ height: '34px', width: '100px' }} />
                  </div>
                  <Select
                    isClearable={false}
                    bsSize='sm'
                    // theme={selectThemeColors}
                    styles={_customStyleForInterval}
                    closeMenuOnSelect={false}
                    defaultValue={intervalType}
                    options={intervalTypeOptionsForCriteria}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      setIntervalType(e);
                    }}
                  />

                  <Select
                    isClearable={false}
                    bsSize='sm'
                    // theme={selectThemeColors}
                    styles={_customStyleForInterval}
                    closeMenuOnSelect={false}
                    defaultValue={criteriaTimeCondition}
                    options={criteriaTimeConditionOptions}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      setCriteriaTimeCondition(e);
                    }}
                  />
                  <div style={{ width: '30px' }}></div>
                </Col>

              </div>
            )}
          </Row>
          <Row className="mt-2">
            <Col sm="6" lg="6" md="6">
              <Button color="primary" block outline onClick={() => onCancel()}>
                Cancel
              </Button>
            </Col>
            <Col sm="6" lg="6" md="6">
              <Button color="success" block outline onClick={() => onSetContact()}>
                Set
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Sidebar>
  );
};

export default EditContactSideBar;
