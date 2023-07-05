import React, { useState, useEffect } from 'react';
import Sidebar from '@components/sidebar';
import InputNumber from 'rc-input-number';
import { Plus, Minus } from 'react-feather';
import { Row, Col, Button, Input, Card, CardBody, Label } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import Select, { components } from 'react-select';
import { selectThemeColors } from '../../../../../../utility/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
// import { convertToRaw } from 'draft-js';

import { stateFromHTML } from 'draft-js-import-html';
import { EditorState, ContentState, convertToRaw } from 'draft-js';

import { setSelectedAutomationAction, setActions } from '../../../store/actions';

const AddNotification = ({ open, toggleSidebar }) => {
  const handleSidebarClosed = () => {
    //
  };

  const automation = useSelector((state) => state.automation);
  const addNewType = automation.addNewType;
  const isEditAction = automation.isEditModal;
  const editActionId = automation.editActionId;
  const selectedAutomation = automation.selectedAutomation;
  const parent = automation.addedParent;
  const [toType, setToType] = useState({ value: 'ME', label: 'ME' });
  const [method, setMethod] = useState({ value: 'TOOLBAR', label: "TOOLBAR" });
  const [toContact, setToContact] = useState([])
  const [activateTime, setActivateTime] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  // const [template, setContent] = useState('');
  const [content, setContent] = useState('');
  const [currentAutomation, setCurrentAutomation] = useState(selectedAutomation);

  const [isUsingUserTimezone, setIsUsingUserTimezone] = useState(false)

  const handleTimezoneChange = (e) => {
    // console.log(e)
    setIsUsingUserTimezone(e.target.checked)
  }
  const [customActivationHours, setCustomActivationHours] = useState(0);
  const [customActivationDays, setCustomActivationDays] = useState(0);
  const [customActivationMins, setCustomActivationMins] = useState(0);

  const [selectedTime, setSelectedTime] = useState({ value: 9, label: '9:00 AM' });
  const [selectedDays, setSelectedDays] = useState([
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },

  ]);

  const [intervalType, setIntervalType] = useState(null);

  const [customTime, setCustomTime] = useState(false);
  const [showEdit, setShowEdit] = useState(false)
  const dateOptions = [
    { value: 'Immediately', label: 'Immediately' },
    { value: 'Custom Time Delay', label: 'Custom Time Delay' }
  ];

  const methodOptions = [
    { value: 'TOOLBAR', label: "TOOLBAR" },
    { value: 'EMAIL', label: "EMAIL" },
    { value: 'TEXT', label: "TEXT" }
  ]

  const toOptions = [
    { value: 'ME', label: 'ME' },
    { value: 'CONTACT', label: 'CONTACT' },
  ]

  const contactOptions = [
    { value: 'Clients', label: 'Clients' },
    { value: 'Employee', label: 'Employee' },
    { value: 'Leads', label: 'Leads' },
    { value: 'Relationships', label: 'Relationships' },
    { value: 'Vender', label: 'Vender' },
    { value: 'Members', label: 'Members' }
  ]
  const onSetActivateTime = (e) => {
    if (e.value == 'Immediately') {
      setCustomActivationDays(0);
      setCustomActivationHours(0);
      setCustomActivationMins(0);
    }
    setActivateTime(e.value);
  };


  const intervalTypeOptions = [
    { value: 'days', label: 'days' },
    { value: 'weeks', label: 'weeks' },
    { value: 'months', label: 'months' },
  ]

  const timesOptions = [
    { value: 0, label: '0:00 AM' },
    { value: 1, label: '1:00 AM' },
    { value: 2, label: '2:00 AM' },
    { value: 3, label: '3:00 AM' },
    { value: 4, label: '4:00 AM' },
    { value: 5, label: '5:00 AM' },
    { value: 6, label: '6:00 AM' },
    { value: 7, label: '7:00 AM' },
    { value: 8, label: '8:00 AM' },
    { value: 9, label: '9:00 AM' },
    { value: 10, label: '10:00 AM' },
    { value: 11, label: '11:00 AM' },
    { value: 12, label: '12:00 AM' },
    { value: 13, label: '1:00 PM' },
    { value: 14, label: '2:00 PM' },
    { value: 15, label: '3:00 PM' },
    { value: 16, label: '4:00 PM' },
    { value: 17, label: '5:00 PM' },
    { value: 18, label: '6:00 PM' },
    { value: 19, label: '7:00 PM' },
    { value: 20, label: '8:00 PM' },
    { value: 21, label: '9:00 PM' },
    { value: 22, label: '10:00 PM' },
    { value: 23, label: '11:00 PM' },
  ]

  const DaysOptions = [
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },

  ]

  const removeCustomeTime = () => {
    setCustomTime(false)
  }

  const onEditCancel = () => {
    setShowEdit(false)
  }

  const onSetSubject = (e) => {
    setSubject(e.target.value);
  };
  const onSetMessage = (data) => {
    setMessage(data);
    if (method == "EMAIL") {
      const html = draftToHtml(convertToRaw(data.getCurrentContent()));
      const newtemplate = draftToHtml(convertToRaw(data.getCurrentContent()));
      setContent(newtemplate);
    }
    setContent(data)

  };

  const dispatch = useDispatch();
  const onInsert = () => {

    let contacts = []
    if (toType.value == "CONTACT") {
      if (toContact.length == 0) {
        setErrors(true)
        toast.error("Please Select Contacts")
      } else {
        toContact.map((item) => contacts.push(item.value));
      }
    }

    let emailAction = {
      id: uuidv4(),
      actionType: 'notification',
      duration: {
        time: customActivationDays,
        unit: intervalType == null ? 'days' : intervalType.value
      },
      parentId: parent.id,
      setCustomTime: customTime,
      useSubscriberTimeZone: isUsingUserTimezone,
      customTime: {
        days: [],
        time: selectedTime.value
      },
      subject: subject,
      content: content,
      attachments: [],
      condition: '',
      confirmProgress: {
        isPercentConfirm: false,
        percentage: 0
      },
      to: {
        type: toType.value,
        contact: contacts
      },
      method: method.value,
      isStart: false,
      isLast: true,
      isCondition: false,
    }

    if (parent.isLast) {
      emailAction.isLast = true
    } else {
      emailAction.isLast = false
    }

    let updatedata = selectedAutomation;
    let updatedObject;
    let newActions;
    if (parent.id == '0') {
      if (parent.isLast) {
        newActions = [
          ...updatedata.actions,
          emailAction
        ];
      } else {
        const childIndex = selectedAutomation.actions.findIndex(item => item.parentId == parent.id);
        let child = selectedAutomation.actions[childIndex];
        const updateChild = { ...child, parentId: emailAction.id }
        newActions = [
          emailAction,
          updateChild,
          ...updatedata.actions.slice(1),
        ];
      }
    } else {
      if (parent.isLast) {
        const parentIndex = selectedAutomation.actions.findIndex(item => item.id == parent.id);
        const _parent = selectedAutomation.actions[parentIndex];
        const updatedParent = { ..._parent, isLast: false }
        newActions = [
          ...updatedata.actions.slice(0, parentIndex),
          updatedParent,
          emailAction,
          ...updatedata.actions.slice(parentIndex + 1),
        ];
      } else {
        const childIndex = selectedAutomation.actions.findIndex(item => item.parentId == parent.id);
        const child = selectedAutomation.actions[childIndex];
        const updatedChild = { ...child, parentId: emailAction.id }
        newActions = [
          ...updatedata.actions.slice(0, childIndex),
          updatedChild,
          emailAction,
          ...updatedata.actions.slice(childIndex + 1),
        ];
      }
    }


    // create a new object with the updated actions array:
    updatedObject = { ...updatedata, actions: newActions };
    dispatch(setSelectedAutomationAction(updatedObject))
    toggleSidebar()

  }

  const onUpdate = () => {
    let contacts = []
    if (toType.value == "CONTACT") {
      if (toContact.length == 0) {
        setErrors(true)
        toast.error("Please Select Contacts")
      } else {
        toContact.map((item) => contacts.push(item.value));
      }
    };

    let selectedActionIndex = selectedAutomation.actions.findIndex(item => item.id == editActionId);
    let selectedActions = selectedAutomation.actions;
    let selectedAction = selectedActions[selectedActionIndex];
    selectedAction = {
      ...selectedAction,
      duration: { time: customActivationDays, unit: intervalType == null ? 'days' : intervalType.value },
      customTime: {
        days: [],
        time: selectedTime.value,
      },
      useSubscriberTimeZone: isUsingUserTimezone,
      setCustomTime: customTime,
      content: content,
      to: {
        type: toType.value,
        contact: contacts
      },
      method: method.value,
      subject: subject,
    }
    let newActions = [
      ...selectedActions.slice(0, selectedActionIndex),
      selectedAction,
      ...selectedActions.slice(selectedActionIndex + 1),
    ];
    // selectedActions[selectedActionIndex] = selectedAction;
    dispatch(setActions(newActions))
    toggleSidebar();
  }

  const _customStyles = {
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: '200px',
      overflowY: 'auto',
    }),
  }
  const customStyles = {
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#174ae7',
    })
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
      fontSize: 14,
      padding: "0 8px 0 3px",
      boxShadow: "none"
    })
  }

  const CustomDays = () => {
    return (
      <>
        {selectedDays.map(day => {
          return day.value + ',' + ' '
        })}
      </>
    )
  }

  useEffect(() => {
    if (isEditAction) {
      const editaction = selectedAutomation.actions.find(item => item.id == editActionId);
      const contentState = stateFromHTML(editaction.content);
      const editorState = EditorState.createWithContent(contentState);
      setMessage(editorState);
      if (editaction.method != "EMAIL") {
        setContent(editaction.content);
      }

      setSubject(editaction.subject);
      setCustomActivationDays(editaction.duration.time);
      setIntervalType({ value: editaction.duration.unit, label: editaction.duration.unit });
      setCustomTime(editaction.setCustomTime);
      setIsUsingUserTimezone(editaction.useSubscriberTimeZone);
      const currentTime = timesOptions.find(item => item.value == editaction.customTime.time)
      setSelectedTime(currentTime);
      setToType({ value: editaction.to.type, label: editaction.to.type })
      let contactTo = [];
      editaction.to.contact.map(item => {
        contactTo.push({ value: item, label: item })
      })
      setToContact(contactTo);
      setMethod({ value: editaction.method, label: editaction.method })
      // if (editaction.attachments.length > 0) {
      //   setFile({
      //     data: editaction.attachments[0].url,
      //     type: editaction.attachments[0].type
      //   })
      // }

    }
  }, [isEditAction, selectedAutomation]);

  function handleWheel(event) {
    event.stopPropagation();
  }
  return (
    <Sidebar
      open={open}
      title={isEditAction ? "Edit Notification" : "New Notification"}
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
      style={{ width: '500px' }}
    >
      <Card className="post" onWheel={handleWheel}>
        <CardBody>
          <Row>
            <div>
              <h4>Wait</h4>
              <p>Choose how long to wait before your next action</p>
              <hr style={{ color: '#d8d6de' }} />
              <Col className="mb-1 mt-1" sm="12">

                <h5>Set Interval</h5>
              </Col>
              <div style={{ zIndex: '0' }}>

                <Col
                  className=""
                  style={{ zIndex: '0' }}
                  sm="12"
                >
                  <span>Perform the next action</span>
                  {/* <InputNumber
                    min={0}
                    id="basic-number-input ml-2"
                    className="input-sm"
                    defaultValue={customActivationDays}
                    onChange={(e) => setCustomActivationDays(e)}
                   
                  /> */}
                  <div className='compose-mail-form-field d-flex justify-content-between center'>
                    <div className='form-group'>
                      <input type="number" value={customActivationDays} min='0'
                        onChange={(e) => setCustomActivationDays(e.target.value)} className='form-control input-sm' style={{ height: '34px', width: '70px' }} />
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

                    <span style={{ marginTop: '5px' }}>after the previous action.</span>
                    <span style={{ width: '30px' }}></span>
                  </div>


                </Col>

                <div className='mt-1'>
                  <h5>Set Custom Time</h5>
                  {!customTime && <h5 style={{ color: "#174ae7", cursor: 'pointer', marginTop: '14px' }} onClick={() => setCustomTime(!customTime)}>+Add New Send Window</h5>}
                </div>
                {customTime &&
                  <div >
                    <div className="form-check form-check mt-1">
                      <Input
                        type="checkbox"
                        defaultChecked={isUsingUserTimezone}
                        onChange={(e) => handleTimezoneChange(e)}
                      />
                      <Label className="form-check-label">Use the subscriber's timezone</Label>
                    </div>
                    <div style={{ marginTop: '25px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#d8d6de', backgroundColor: '#f0f0f5', padding: '0.5rem' }}>
                      <div >
                        <div className='d-flex d-flex justify-content-between' style={{ marginTop: '8px', marginLeft: '5px' }} >
                          <h5>Custom time</h5>
                          {!showEdit && <div>
                            <span style={{ marginLeft: '100px', color: '#174ae7', cursor: 'pointer' }} onClick={() => setShowEdit(!showEdit)}>Edit</span> |
                            <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => removeCustomeTime()}>Remove</span>
                          </div>}
                          {showEdit && <div>
                            <span style={{ marginLeft: '100px', color: '#174ae0', cursor: 'pointer' }} onClick={() => setShowEdit(!showEdit)}>Apply</span> |
                            <span style={{ cursor: 'pointer' }} onClick={() => onEditCancel()}>Cancel</span>
                          </div>}

                        </div>
                        <hr style={{ color: '#d8d6de' }} />
                        {!showEdit && <div style={{ marginLeft: '6px', paddingBottom: '11px' }}>Wait until at <b>{selectedTime.label}</b></div>}
                      </div>

                      {showEdit && <div>

                        <h5>Time</h5>
                        <Col sm="12" className="mb-1">
                          <Select
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={_customStyles}
                            closeMenuOnSelect={false}
                            defaultValue={selectedTime}
                            options={timesOptions}
                            className="react-select"
                            classNamePrefix="select"
                            isSearchable={false}
                            maxMenuHeight={200}
                            menuPlacement="auto"
                            onChange={(e) => {
                              setSelectedTime(e);
                            }}
                          />
                        </Col>
                      </div>}
                    </div>
                  </div>}
              </div>
            </div>
            <hr style={{ color: '#d8d6de', marginTop: '30px' }} />

            <Col className="mb-1 mt-2" sm="12">
              <Label className="form-label"><h5>TO</h5></Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                defaultValue={toType}
                options={toOptions}
                isClearable={false}
                onChange={(e) => setToType(e)}
              />
            </Col>
            {toType != null && toType.value == 'CONTACT' && <Col className="mb-1" sm="12">
              <Label className="form-label"><h5>CONTACT</h5></Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                styles={customStyles}
                isMulti
                defaultValue={toContact}
                options={contactOptions}
                isClearable={false}
                onChange={(e) => setToContact(e)}
              />
            </Col>}

            <Col className="mb-1" sm="12">
              <Label className="form-label"><h5>NOTIFICATION METHOD</h5></Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                defaultValue={method}
                options={methodOptions}
                isClearable={false}
                onChange={(e) => setMethod(e)}
              />
            </Col>
            {method != null && method.value == "EMAIL" ? (<div>
              <div className="compose-mail-form-field mt-2">
                <Label for="subject" className="form-label">
                  <h5>SUBJECT</h5>
                </Label>
                <Input
                  id="subject"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => onSetSubject(e)}
                />
              </div>
              <Col className="mt-1" sm="12">
                <div id="message-editor">
                  <Label for="subject" className="form-label">
                    <h5>CONTENT</h5>
                  </Label>
                  <Editor
                    editorStyle={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#d8d6de' }}
                    placeholder="Enter email content..."
                    // toolbarClassName="rounded-0"
                    wrapperClassName="toolbar-bottom"
                    // editorClassName="rounded-0 border-0"
                    toolbar={{
                      options: ['inline', 'textAlign'],
                      inline: {
                        inDropdown: false,
                        options: ['bold', 'italic', 'underline', 'strikethrough']
                      }
                    }}
                    onEditorStateChange={(data) => onSetMessage(data)}
                    editorState={message}
                  />
                </div>
              </Col>
              <Col sm="3" lg="3" md="3" className="mt-1">

              </Col>
            </div>) : (<div id="message-editor">
              <Label><h5>{method != null && method.value} TO NOTIFICATION</h5></Label>
              <Input
                type="textarea"
                name="text"
                defaultValue={content}
                onChange={(e) => setContent(e.target.value)}
                rows="7"
                placeholder="Type notification please."
              />
            </div>)}

          </Row>

          <Row className="mt-2">
            <Col sm="6" lg="6" md="6">
              <Button color="primary" block outline onClick={() => toggleSidebar()}>
                Cancel
              </Button>
            </Col>
            {isEditAction ? <Col sm="6" lg="6" md="6">
              <Button color="success" block outline onClick={() => onUpdate()}>
                Update
              </Button>
            </Col> : <Col sm="6" lg="6" md="6">
              <Button color="success" block outline onClick={() => onInsert()}>
                Insert
              </Button>
            </Col>}
          </Row>
        </CardBody>
      </Card>
    </Sidebar>
  );
};

export default AddNotification;
