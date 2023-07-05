import React, { useState, useEffect } from 'react';
import Sidebar from '@components/sidebar';
import InputNumber from 'rc-input-number';
import { Plus, Minus } from 'react-feather';
import { Form, FormGroup, Row, Col, Button, Input, Card, CardBody, Label } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import Select, { components } from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedAutomationAction, setActions } from '../../../store/actions';
import './style.css'
const AddAutomation = ({ open, toggleSidebar }) => {
  const handleSidebarClosed = () => {
    //
  };

  const automation = useSelector((state) => state.automation);
  const addNewType = automation.addNewType;
  const selectedAutomation = automation.selectedAutomation;
  const parent = automation.addedParent;

  const isEditAction = automation.isEditModal;
  const editActionId = automation.editActionId;
  const [isUsingUserTimezone, setIsUsingUserTimezone] = useState(false)

  const handleTimezoneChange = (e) => {
    // console.log(e)
    setIsUsingUserTimezone(e.target.checked)
  }
  const [activateTime, setActivateTime] = useState(null);
  const [content, setContent] = useState('');
  const [currentAutomation, setCurrentAutomation] = useState(selectedAutomation);

  const [customActivationDays, setCustomActivationDays] = useState(0);


  const [intervalType, setIntervalType] = useState(null);

  const [customTime, setCustomTime] = useState(false);
  const [showEdit, setShowEdit] = useState(false)

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

  const dateOptions = [
    { value: 'immediately', label: 'Immediately' },
    { value: 'Custom Time Delay', label: 'Custom Time Delay' }
  ];
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

  const [addedAutomation, setAddedAutomation] = useState(null);

  let existingAutomaions = [];
  if (automation.allAutomations.length > 0) {
    automation.allAutomations.map(item => {
      const existAutomation = { value: item.automationName, label: item.automationName };
      existingAutomaions.push(existAutomation)
    })
  }



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
  const dispatch = useDispatch();
  const onInsert = () => {

    let emailAction = {
      id: uuidv4(),
      actionType: 'automation',
      duration: {
        time: customActivationDays,
        unit: intervalType == null ? 'days' : intervalType.value
      },
      parentId: parent.id,
      setCustomTime: customTime,
      useSubscriberTimeZone: isUsingUserTimezone,
      customTime: {
        days: [],
        time: 0,
      },
      subject: '',
      content: content,
      attachments: [],
      condition: '',
      confirmProgress: {
        isPercentConfirm: false,
        percentage: 0
      },
      to: {
        type: '',
        contact: []
      },
      method: '',
      isStart: false,
      isLast: true,
      isCondition: false,
      automationName: addedAutomation
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
      setCustomTime: customTime,
      automationName: addedAutomation,
      useSubscriberTimeZone: isUsingUserTimezone,
    }
    let newActions = [
      ...selectedActions.slice(0, selectedActionIndex),
      selectedAction,
      ...selectedActions.slice(selectedActionIndex + 1),
    ];
    // selectedActions[selectedActionIndex] = selectedAction;
    dispatch(setActions(newActions))
    toggleSidebar();
  };

  useEffect(() => {
    if (isEditAction) {
      const editaction = selectedAutomation.actions.find(item => item.id == editActionId);
      setAddedAutomation(editaction.automationName)
      setCustomActivationDays(editaction.duration.time);
      setIntervalType({ value: editaction.duration.unit, label: editaction.duration.unit });
      setCustomTime(editaction.setCustomTime);
      setIsUsingUserTimezone(editaction.useSubscriberTimeZone);
      const currentTime = timesOptions.find(item => item.value == editaction.customTime.time)
      setSelectedTime(currentTime);


    }
  }, [isEditAction, selectedAutomation]);

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
  function handleWheel(event) {
    event.stopPropagation();
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
  return (
    <Sidebar
      open={open}
      title={isEditAction ? "Edit Automation" : "New Automation"}
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
      style={{ width: '500px' }}

    >
      <Card className="post" onWheel={handleWheel}>
        <CardBody>
          <Row>
            <div>
              <h4>Add Existing Automation</h4>
              <p>Choose which automation sequence you want to add</p>
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
            <div id="message-editor" className='mt-2'>
              <Label><h4>Automations</h4></Label>
              <Select
                isClearable={false}
                bsSize='sm'
                // theme={selectThemeColors}
                closeMenuOnSelect={false}
                defaultValue={addedAutomation}
                options={existingAutomaions}
                className="react-select"
                classNamePrefix="select"
                onChange={(e) => {
                  setAddedAutomation(e);
                }}
              />
            </div>
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

export default AddAutomation;
