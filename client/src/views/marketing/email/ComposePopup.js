// ** React Imports
import { useState, useEffect, useRef, useCallback } from 'react';
import Flatpickr from 'react-flatpickr';
import { TbArrowMerge } from 'react-icons/tb';
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
// ** Third Party Components
import { Editor } from 'react-draft-wysiwyg';
import Select, { components } from 'react-select';
import { toast } from 'react-toastify';
import { Maximize, Minus, X, Maximize2, Paperclip, MoreVertical, Trash } from 'react-feather';
// ** Reactstrap Imports
import {
  Form,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Card,
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  Label,
  Input,
  FormGroup
} from 'reactstrap';
import { EditorState, convertToRaw,convertFromHTML, ContentState, getCurrentBlock, Modifier } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useComposeMarketingEmail } from '../../../requests/contacts/marketing-emails';
import { useUploadDocument } from '../../../requests/documents/create-doc';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


// ** Utils
import { selectThemeColors } from '@utils';

// ** Styles
import '@styles/react/libs/editor/editor.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import { customInterIceptors } from '../../../lib/AxiosProvider';


const formGroupStyleOverrides = {
  display: 'flex',
  alignItems: 'center',
  //  margin bottom 0 and important to override default
  marginBottom: '0px',
  gap: '0.25rem'
};

// ** Merge Codes
const mergeCodes = [
  'fullName',
  'email',
  'phone',
  'photo',
  'gender',
  'status',
  'note',
  'tags',
  'companyPhone',
  'companyEmail',
  'type',
  'company',
  'position',
  'isFormer',
  'isDelete',
  'socialLinks',
  'ranks',
  'files',
  'others',
  'paymentMethods'
];

const ComposePopup = (props) => {
  // ** Props & Custom Hooks
  const { 
    composeOpen, 
    toggleCompose, 
    metadata, 
    contactsStore, 
    smartlistStore, 
    expand, 
    setExpand, 
    minimize, 
    setMinimize, 
    emailTemplatesModalOpen, 
    setEmailTemplatesModalOpen, 
    composeSelectedTemplatesDetails, 
    unselecteComposeEmailTemplate,
    setComposeSelectedTemplates,
    setComposeSelectedTemplatesDetails
  } = props;
  const { mutate } = useComposeMarketingEmail();
  const fileRef = useRef(null);
  const API = customInterIceptors();

  // ** Mail content editor configuration
  const initialContent = `<p></p>`;
  const bootstrapClass = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">';
  const contentBlock = htmlToDraft(initialContent);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  // ** States
  const [fullScreen, setFullScreen] = useState(false);
  const [showFlatpicker, setShowFlatpicker] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [scheduledTime, setScheduledTime] = useState(new Date());
  const [sendText, setSendText] = useState('Send');
  const [isMergecodesModalOpen, setIsMergecodesModalOpen] = useState(false);
  const [from, setFrom] = useState('');
  const [toType, setToType] = useState('email');
  const [smartlist, setSmartlist] = useState();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState(editorState);
  const [attachments, setAttachments] = useState([]);
  const [selectSmartlistOptions, setSelectSmartlistOptions] = useState([]);
  const [builderModal, setBuilderModal] = useState(false);
  const [editStyle, setEditStyle] = useState({maxWidth:'18.5rem'});
  const [emailTemplateStyle, setEmailTemplateStyle] = useState({maxWidth:'18.5rem'});
  // const [selectedTemplate, setSelectedTemplate] = useState(false);
  // ** Contact List Select Option Values

  const authEmail = useSelector(state => state.auth.userData.email)
  const _clientContacts = contactsStore?.contactList?.list?.filter(item =>  item.contactType.includes("645978d719f478ee8bc1dba9"));
  const selectContactListOptions = _clientContacts?.map((client) => {
    return {
      value: client.email,
      label: client.fullName
    };
  }); 

  const _relationContacts = contactsStore?.contactList?.list?.filter(item => item.contactType.includes("645978d719f478ee8bc1dbac"))

  // ** Smartlist Select Option Components
  const SelectComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex flex-wrap align-items-center">{data.label}</div>
      </components.Option>
    );
  };

  // ** Handle schedule or send
  const handleSchedule = () => {
    showFlatpicker
      ? setShowFlatpicker(false) & setSendText('Send')
      : setShowFlatpicker(true) & setSendText('Scheduled Send');
  };

  // ** Handle select FROM
  const handleToSelectFrom = (e) => {
    setFrom(e.target.value);
  };
  const [selectedTemplate, setSelectedTemplate] = useState({})
  // ** Handle select to-type
  const handleSelectToType = (e) => {
    if (e.target.value === 'email') {
      setToType('email');
    } else {
      setToType('smartlist');
    }
  };

  // ** Handle select smartlist
  const handleSelectSmartlist = (newValue, actionMeta) => {
    setSmartlist(newValue);
  };

  // ** Handle smartlist
  const handleSmartlist = (e) => {
    setTo(Array.isArray(e) ? e.map((x) => x.value).toString() : '');
  };

  // ** Toggles Compose POPUP
  const togglePopUp = (e) => {
    e.preventDefault();
    toggleCompose();
  };

  const expandPopUp = (e) => {
    e.preventDefault();
    setExpand(!expand);
  };

  const minimizePopUp = (e) => {
    e.preventDefault();
    setMinimize(!minimize); 
  };

  // ** Toggles Merge codes Modal
  const toggleMergecodesModal = () => setIsMergecodesModalOpen(!isMergecodesModalOpen);

  // ** Toggles Full Screen
  const toggleFullScreen = (e) => {
    e.preventDefault();
    setFullScreen(!fullScreen);
  };
  const [emailTemplate,setEmailTemplate] = useState(null);
  // ** Handle merge code
  const handleMergeCode = (code) => {
    const newCode =code.split("<script>")[0];
    const blocksFromHTML = convertFromHTML(newCode);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    setContent(editorState);
  };
     
  // ** Handle open file browser to select Geojson
  const openFileBrowser = () => {
    if (!fileRef) return;

    // @ts-ignore
    fileRef.current.click();
  };

  // ** Handle attachment
  const handleAttachment = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'general');
      useUploadDocument(formData).then((res) => {
        if (res?.success) {
          setAttachments((prev) => [...prev, res.uploadedDocuments]);
        }
      });
    };
  };

  // ** Submit email to send
  const onSubmit = async (e, emailType) => {
    e.preventDefault();
    toggleCompose('fetchData');
    const fromEmail = authEmail;
    if (emailType !== 'draft') {
      if (toType === 'smartlist' && to.length == 0) {
        toast.error('Please select email address');
        return;
      }

      if (!to) {
        toast.error('Please enter an email address');
        return;
      }

      if (!fromEmail) {
        toast.error('Please enter from email address');
        return;
      }

      if (!subject) {
        toast.error('Please enter subject');
        return;
      }
    }

    const payload = {
      toType,
      to: to,
      from: fromEmail,
      subject: subject,
      timestamp: new Date(scheduledTime).getTime(),
      scheduled: showFlatpicker,
      content: draftToHtml(convertToRaw(content?.getCurrentContent())),
      emailType,
      mailId: metadata?._id,
      attachments
    };
    mutate(payload);
  };

  const testFunction = () => {   
    setEmailTemplate(selectedTemplate);
    setEditStyle({display:'none'}); 
    setBuilderModal(!builderModal);
  }
  
  useEffect(() => {
    (async () => {
      if (smartlistStore.smartLists.length > 0) {
        let selectSmartlistOptions = [];
        for (let folderData of smartlistStore.smartLists) {
          const { data } = await API.get(`/smartlistitem/get/${folderData._id}`);
          const items = data.data.map((item) => {
            return {
              label: item.title,
              value: item._id,
            };
          });
          selectSmartlistOptions.push({
            label: folderData.name,
            options: items
          });
        }
        setSelectSmartlistOptions(selectSmartlistOptions);
      }
    })();
  }, [smartlistStore.smartLists]);

  useEffect(() => {
    if (contactsStore?.relationshipContacts?.list?.length > 0) {
      setFrom(contactsStore.relationshipContacts.list[0].email.toLowerCase());
    }
  }, [contactsStore.relationshipContacts.list]);

  useEffect(() => {
    
    if (metadata) {
      setTo(metadata.to);
      setFrom(metadata.from);
      setSubject(metadata.subject);
      setContent(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(htmlToDraft(metadata.message).contentBlocks)
        )
      );
      setAttachments(metadata.attachments || []);
    } else {
      setTo('');
      setFrom('');
      setSubject('');
      setContent(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(htmlToDraft(initialContent).contentBlocks)
        )
      );
    }
  }, [metadata]);

  const onSelectedTemplate = item => {
    setSelectedTemplate(item);
  }

  return (
    <>
      <div className="relative">
        { minimize ?
          <Modal
            fade={true}
            keyboard={false}
            backdrop={false}
            id="compose-mail"
            container=".content-body"
            isOpen={composeOpen}
            toggle={toggleCompose}
            className="modal-sm"
            contentClassName="p-0"
            modalClassName="modal-sticky modal-fullscreen-md-down"
          >
            <div className='modal-content'>
              <div className="modal-header modal-success">
                <h5 className="modal-title">Compose Mail</h5>
                <div className="modal-actions">
                  <a href="/" className="text-body me-75" onClick={minimizePopUp}>
                    <Maximize size={14} />
                  </a>
                  <a href="/" className="text-body" onClick={togglePopUp}>
                    <X size={14} onClick={() => {setContent(); setComposeSelectedTemplates([]); setComposeSelectedTemplatesDetails([])}}/>
                  </a>
                </div>
              </div>
            </div>
            
          </Modal>
          :
          <Modal
            // scrollable
            fade={true}
            keyboard={false}
            backdrop={false}
            id="compose-mail"
            container=".content-body"
            isOpen={composeOpen}
            toggle={toggleCompose}
            className={expand ? "modal-xl modal-expand" : "modal-lg"}
            contentClassName="p-0"
            modalClassName="modal-sticky modal-fullscreen-md-down"
          >
            <div className='modal-content'>
              <div className="modal-header modal-success">
                <h5 className="modal-title">Compose Mail</h5>
                <div className="modal-actions">
                  <a href="/" className="text-body me-75" onClick={minimizePopUp}>
                    <Minus size={14} />
                  </a>
                  <a href="/" className="text-body me-75" onClick={expandPopUp}>
                    <Maximize2  size={14} />
                  </a>
                  <a href="/" className="text-body" onClick={togglePopUp}>
                    <X size={14} onClick={() => {setContent(); setComposeSelectedTemplates([]); setComposeSelectedTemplatesDetails([])}}/>
                  </a>
                </div>
              </div>
              <ModalBody className="flex-grow-1 p-0 mt-1">
                <Form className="compose-form" onSubmit={onSubmit}>
                  <div>
                    <Row className="px-1 mb-1">
                      <Col xl="4">
                        <div style={formGroupStyleOverrides}>
                          <Label for="exampleEmail" sm={2}>
                            From:
                          </Label>
                          <Col sm={10}>
                            <Input
                              id="exampleEmail"
                              name="email"
                              type="select"
                              placeholder="Select email"
                              onChange={handleToSelectFrom}
                              value={from}
                            >
                              <option value={authEmail}>
                                {authEmail}
                              </option>
                              {_relationContacts?.map((employee) => {
                                return (
                                  <option value={employee.email}>
                                    {employee.email}
                                  </option>
                                );
                              })}
                            </Input>
                          </Col>
                        </div>
                      </Col>
                      <Col xl="2">
                        <Input
                          id="to-type"
                          name="select"
                          type="select"
                          onChange={handleSelectToType}
                          value={toType}
                        >
                          <option value="smartlist">Smartlist</option>
                          <option value="email">Email</option>
                        </Input>
                      </Col>
                      <Col xl="5" className={`${toType == 'smartlist' && 'd-none'}`}>
                        <div style={formGroupStyleOverrides}>
                          <Label for="exampleEmail" sm={3}>
                            To Email
                          </Label>
                          <Col sm={11}>
                            <Input
                              id="exampleEmail"
                              name="email"
                              placeholder="Recipient's email"
                              type="email"
                              value={to}
                              onChange={(e) => setTo(e.target.value)}
                            />
                          </Col>
                        </div>
                      </Col>
                      <Col xl="6" className={`${toType == 'email' && 'd-none'}`}>
                        <div className="d-flex align-items-start">
                          <div style={{ ...formGroupStyleOverrides, minWidth: '160px' }}>
                            {/* <Label for="smartlistEmail">To: </Label> */}
                            <Select
                              id="smartlistEmail"
                              theme={selectThemeColors}
                              options={selectSmartlistOptions}
                              className="react-select select-borderless w-100"
                              classNamePrefix="select"
                              components={{
                                Option: SelectComponent
                              }}
                              placeholder="Select Smartlist"
                              onChange={handleSelectSmartlist}
                            />
                          </div>
                          <div className="flex-grow-1">
                            <Select
                              isMulti
                              id="email-to"
                              isClearable={false}
                              theme={selectThemeColors}
                              options={selectContactListOptions}
                              className="react-select select-borderless"
                              classNamePrefix="select"
                              components={{
                                Option: SelectComponent
                              }}
                              placeholder="Select Contact"
                              onChange={handleSmartlist}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className=" d-flex justify-content-between">
                    <div className='compose-mail-form-field'>
                      <Label for="subject" className="form-label">
                      Subject:
                      </Label>
                      <Input
                        id="subject"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                    <div className='compose-mail-form-field d-flex'>
                        <Flatpickr
                          required
                          id="startDate"
                          name="startDate"
                          className={`react-select select-borderless me-1 ml-0 ${!showFlatpicker && 'd-none'}`}
                          onChange={(date) => setScheduledTime(date[0])}
                          value={scheduledTime}
                          options={{
                            enableTime: allDay === false,
                            dateFormat: 'm-d-Y h:i K'
                          }}
                        />
                        <div
                          className="py-0.5 px-0.5"
                          style={{
                            width: 'fit-content'
                          }}
                        >
                          <FormGroup switch>
                            <Label check>Scheduled</Label>
                            <Input type="switch" checked={showFlatpicker} onChange={handleSchedule} />
                          </FormGroup>
                        </div>
                    </div>
                  </div>

                  <div id="message-editor" >
                    {!!composeSelectedTemplatesDetails?.length &&
                      <Row spacing={2} className="p-0 m-0 mt-1 mb-1">
                        { 
                          composeSelectedTemplatesDetails.map(item => {
                          return (
                              <Col key={'email-compose-template-'+item._id} sm={12} md={2} lg={2}>
                                  <Card style={{ margin:'0' }} outline>
                                      <div className="p-0 d-flex justify-content-between align-items-center">
                                          <p className="p-0" style={{fontSize:'10px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', margin: "0 0.5em 0 0.5em"}}>
                                            {item?.name}
                                          </p>
                                          <X style={{cursor:'pointer'}} size={14} onClick={() => {unselecteComposeEmailTemplate(item._id)}}/>
                                      </div>

                                      <div className="template-iframe">
                                          <div
                                              className="border box-shadow"
                                              style={{ borderRadius: "12px", padding: "0.1em", margin: "0.2em", height:'80px' }}
                                          >
                                              <iframe
                                                  style={{ borderRadius: "12px", pointerEvents: "none", transform:'scale(0.5)', transformOrigin:'0 0' }}
                                                  scrolling='no'
                                                  width="200%"
                                                  height="150"
                                                  srcDoc={bootstrapClass+item.formData[0]?.html+'<style>'+item.formData[0]?.css+'</style>'}
                                                  title="Customized Form"
                                              >
                                              </iframe>
                                          </div>
                                      </div>
                                  </Card>
                              </Col>)
                          })
                        }
                      </Row>  
                    }
                    <Editor
                      scrollable
                      placeholder="Message"
                      toolbarClassName="rounded-0"
                      wrapperClassName="toolbar-bottom"
                      editorClassName="rounded-0 border-0"
                      toolbar={{
                        options: ['inline', 'textAlign'],
                        inline: {
                          inDropdown: false,
                          options: ['bold', 'italic', 'underline', 'strikethrough']
                        }
                      }}
                      
                      onEditorStateChange={(data) => setContent(data)}
                      editorState={content}
                      editorStyle={expand ? {height: '300px'} : {}}
                      // style={{editStyle}}
                    />   
                    {attachments.length > 0 && (
                      <div className="email-attachement-list mt-1 p-1">
                        {attachments.map((attachment, index) => (
                          <Row key={index}>
                            <div className="align-items-center d-flex justify-content-start">
                              <h5 style={{ margin: 0, paddingRight: 10 }}>{attachment.name}</h5>
                              <div className="email-attachement-actions">
                                <Trash
                                  size={14}
                                  onClick={() => {
                                    setAttachments(
                                      attachments.filter((item) => item.name !== attachment.name)
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          </Row>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="compose-footer-wrapper">
                    <div className="btn-wrapper d-flex align-items-center">
                      <UncontrolledButtonDropdown direction="up" className="me-1">
                        <Button color="primary" type="submit">
                          Send
                        </Button>
                        <DropdownToggle
                          className="dropdown-toggle-split"
                          color="primary"
                          caret
                        ></DropdownToggle>
                        <DropdownMenu end>
                          <DropdownItem
                            href="/"
                            tag="button"
                            onClick={(e) => {
                              onSubmit(e, 'draft');
                            }}
                            name="save-draft"
                          >
                            Save Draft
                          </DropdownItem>
                          <DropdownItem href="/" tag="a" onClick={togglePopUp}>
                            Save Template
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                      <div className="email-attachement">
                        <Paperclip
                          className="cursor-pointer ms-50"
                          size={18}
                          onClick={openFileBrowser}
                        />
                      </div>
                      <div>
                        <TbArrowMerge
                          className="cursor-pointer ms-50"
                          onClick={toggleMergecodesModal}
                          size={18}
                        />
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <div>
                        <Button color='success' size='sm' onClick={()=>setEmailTemplatesModalOpen(!emailTemplatesModalOpen)} outline >
                          Template
                        </Button>
                      </div>
                    </div>
                    <div className="footer-action d-flex align-items-center">
                      <UncontrolledDropdown className="me-50" direction="up">
                        <DropdownToggle tag="span">
                          <MoreVertical className="cursor-pointer" size={18} />
                        </DropdownToggle>
                        <DropdownMenu end>
                          <DropdownItem href="/" tag="a" onClick={(e) => e.preventDefault()}>
                            Add Label
                          </DropdownItem>
                          <DropdownItem href="/" tag="a" onClick={(e) => e.preventDefault()}>
                            Plain text mode
                          </DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem href="/" tag="a" onClick={(e) => e.preventDefault()}>
                            Print
                          </DropdownItem>
                          <DropdownItem href="/" tag="a" onClick={(e) => e.preventDefault()}>
                            Check Spelling
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <Trash className="cursor-pointer" size={18} onClick={toggleCompose} />
                    </div>
                  </div>
                </Form>
              </ModalBody>
            </div>
            
          </Modal>
        }
      </div>
    </>
  );
};

export default ComposePopup;
