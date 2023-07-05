import { useState, useEffect, useRef } from 'react';
import Sidebar from '@components/sidebar';
import { Row, Col, Button, Input, Card, CardBody, Label } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import Select, { components } from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { setSelectedAutomationAction, uploadFileAction, setActions } from '../../../store/actions';
// import VideoThumbnail from 'react-video-thumbnail';
import { getUserData } from '../../../../../../utility/Utils';
import { toast } from 'react-toastify';
import TemplatesList from '../../../../email/components/TemplatesList';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {FiPlusSquare} from 'react-icons/fi';

import htmlToDraft from 'html-to-draftjs';


const AddEmail = ({ open, toggleSidebar }) => {
  const handleSidebarClosed = () => {

  };

  const automation = useSelector((state) => state.automation);
  const selectedAutomation = automation.selectedAutomation;
  const parent = automation.addedParent;

  const isEditAction = automation.isEditModal;
  const editActionId = automation.editActionId;

  const [editableAction, setEditableAction] = useState(null);




  const [activateTime, setActivateTime] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState('');
  const [customActivationDays, setCustomActivationDays] = useState(0);
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
  const [attachData, setAttachData] = useState([]);
  const [intervalType, setIntervalType] = useState(null);
  const [customTime, setCustomTime] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isUsingUserTimezone, setIsUsingUserTimezone] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [builderModal, setBuilderModal] = useState(false);



  const [file, setFile] = useState(null);

  let timesOptions = [
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

  useEffect(() => {
    if (isEditAction) {
      const editaction = selectedAutomation.actions.find(item => item.id == editActionId);
      const contentState = stateFromHTML(editaction.content);
      const editorState = EditorState.createWithContent(contentState);
      setMessage(editorState);
      setSubject(editaction.subject);
      setCustomActivationDays(editaction.duration.time);
      setIntervalType({ value: editaction.duration.unit, label: editaction.duration.unit });
      setCustomTime(editaction.setCustomTime);
      setIsUsingUserTimezone(editaction.useSubscriberTimeZone);
      const currentTime = timesOptions.find(item => item.value == editaction.customTime.time)
      setSelectedTime(currentTime);
      if (editaction.attachments.length > 0) {
        setFile({
          data: editaction.attachments[0].url,
          type: editaction.attachments[0].type
        })
      }

    }
  }, [isEditAction, selectedAutomation]);
  const handleTimezoneChange = (e) => {
    // console.log(e)
    setIsUsingUserTimezone(e.target.checked)
  }

  const onSetActivateTime = (e) => {
    if (e.value == 'Immediately') {
      setCustomActivationDays(0);
    }
    setActivateTime(e.value);
  };

  const intervalTypeOptions = [
    { value: 'days', label: 'days' },
    { value: 'weeks', label: 'weeks' },
    { value: 'months', label: 'months' },
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


  const onSetSubject = (e) => {
    setSubject(e.target.value);
  };
  const onSetMessage = (data) => {
    setMessage(data);

    const html = draftToHtml(convertToRaw(data.getCurrentContent()));
    const newtemplate = draftToHtml(convertToRaw(data.getCurrentContent()));
    setTemplate(newtemplate);
  };

  const removeCustomeTime = () => {
    setCustomTime(false)
  }

  const onEditCancel = () => {
    setShowEdit(false)
  }
  const onSelectedTemplate = item => {
    setSelectedTemplate(item);
  }
  const handleMergeCode = (code) => {
    const bootstrapClass = '';

    const newCode =bootstrapClass+code.split("<script>")[0];

    const contentState = stateFromHTML(newCode);
    const editorState = EditorState.createWithContent(contentState);
    
    onSetMessage(editorState);
    
  };


  const CustomDays = () => {
    return (
      <>
        {selectedDays.map(day => {
          return day.value + ',' + ' '
        })}
      </>
    )
  }
  const dispatch = useDispatch();
  const onInsert = () => {
    let isAvailable = true;
    let emailAction = {
      id: uuidv4(),
      actionType: 'email',
      duration: {
        time: customActivationDays,
        unit: intervalType == null ? 'days' : intervalType.value
      },
      parentId: parent.id,
      setCustomTime: customTime,
      useSubscriberTimeZone: isUsingUserTimezone,
      customTime: {
        days: [],
        time: selectedTime.value,
      },
      subject: subject,
      content: template,
      attachments: attachData,
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
    }

    if (parent.isLast) {
      emailAction.isLast = true
    } else {
      emailAction.isLast = false
    }


    if (subject == '') {
      toast.error('Please Enter Subject')
      isAvailable == false
    } else {
      emailAction.subject = subject
    }


    let _selectedDays = [];
    if (customTime && selectedDays.length == 0) {
      toast.error('Please Select days')
    } else {
      selectedDays.map(day => _selectedDays.push(day.value))
    }
    emailAction.customTime.days = _selectedDays

    if (file != null) {
      emailAction.attachments.push("file")
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
    toggleSidebar();
  };

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
      subject: subject,
      content: template,
      attachments: attachData,
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
  function handleWheel(event) {
    event.stopPropagation();
  }

  const onChangeFileUpload = () => {
    const fileInput = document.getElementById('inputFileUpload');
    fileInput.click()
  }

  // const [file, setFile] = useState(null);

  const handleFileChange = async (event) => {
    const uploadedFile = event.target.files[0];

    const form = new FormData();

    form.append('file', uploadedFile);
    form.append('userId', getUserData().id);
    form.append('path', 'marketing');
    const response = await dispatch(uploadFileAction(form));
    if (response.data.success == 'OK') {

      toast.success('File uploaded successfully');

      const attachedData = [{
        url: response.data.data,
        type: uploadedFile.type
      }];

      setAttachData(attachedData)

    }
    const reader = new FileReader();

    reader.onloadend = () => {
      setFile({
        name: uploadedFile.name,
        size: uploadedFile.size,
        type: uploadedFile.type,
        data: reader.result
      });
    };

    reader.readAsDataURL(uploadedFile);


  };

  const preview = file && (
    <>
      {file.type.startsWith('image') && (
        <img src={file.data} height="120px" />
      )}
      {file.type.startsWith('video') && (
        <video src={file.data} id='' controls height="120px" />
      )}
      {/* {!file.type.startsWith('image') && !file.type.startsWith('video') && (
        <p>{file.name}</p>
      )} */}
    </>)

  return (
    <Sidebar
      open={open}
      // title={`Edit ${showData.content_type}`}
      style={{ width: '500px' }}
      title={isEditAction ? "Edit Email" : "New Email"}
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
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
                    options: ['emoji', 'inline', 'textAlign'],
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
            <Col sm="3" lg="3" md="3" className="mt-1" style={{width:'100% '}}>
              <input type="file" id='inputFileUpload' onChange={handleFileChange} hidden />
              {preview}
              <div className='d-flex '>
                <Button color="primary" block onClick={() => onChangeFileUpload()}  outline style={{ width: '50%' }} className="rounded">
                  + Add Video
                </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button color="success" block onClick={() => setBuilderModal(!builderModal)}  outline style={{ width: 'max-content',fontSize:'15px' }} className="rounded">
                  <FiPlusSquare size={30}/> Template
                </Button>
              </div>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col sm="6" lg="6" md="6">
              <Button color="primary" block outline onClick={() => toggleSidebar()}>
                Cancel
              </Button>
            </Col>
            <Col sm="6" lg="6" md="6">
              {isEditAction ? <Button color="success" block outline onClick={() => onUpdate()}>
                Update
              </Button> : <Button color="success" block outline onClick={() => onInsert()}>
                Insert
              </Button>}
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Modal
        isOpen={builderModal}
        toggle={() => setBuilderModal(!builderModal)}
        size='xl'
        className="modal-dialog-centered overflow-auto" 
      >
        <ModalHeader 
          toggle={() => setBuilderModal(!builderModal)}
        >
          Select Template
        </ModalHeader>
        <ModalBody onScroll={true}>
          <TemplatesList 
            selectedTemplate = {selectedTemplate}
            onSelectedTemplate={onSelectedTemplate}
          />
        </ModalBody>
        <ModalFooter>
          <div className='d-flex justify-content-between'>
            <Button color='primary'  block outline onClick={() =>{handleMergeCode('<style>'+selectedTemplate.formData[0].css+'</style>'+selectedTemplate.formData[0].html);setBuilderModal(!builderModal);}}>Ok</Button> &nbsp;&nbsp;
            <Button color='primary'  block outline onClick={() =>setBuilderModal(!builderModal)}>Cancel</Button>
          </div>
        </ModalFooter>
      </Modal>
    </Sidebar>
  );
};

export default AddEmail;
