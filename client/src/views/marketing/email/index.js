// ** React Imports
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState, useRef, useCallback } from 'react';

// ** Email App Component Imports
import Mails from './Mails';
import Sidebar from './Sidebar';
import ComposePopUp from './ComposePopup';
import CategorySidebar from './CategorySidebar';
import EmailTemplates from './components/Emailtemplates';
import { ChevronRight, ChevronLeft } from 'react-feather';

// ** Third Party Components
import classnames from 'classnames';
import { FaThemeco } from 'react-icons/fa';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { employeesContactsAction, clientContactsAction } from '../../contacts/store/actions';
import { getData } from '../../settings/tabs/advancesettings/store';
import { getFormsAction, createFormAction } from '../../formBuilder/store/action';
import {
  getMails,
  selectMail,
  updateMails,
  paginateMail,
  selectAllMail,
  updateMailLabel,
  resetSelectedMail,
  selectCurrentMail
} from './store';

import {
  GET_ALL_SECHEDULE_EMAIL,
  GET_CATEGORIES_EMAIL,
  DELETE_SUB_FOLDER_EMAIL,
  DELETE_CATEGORY_EMAIL,
  GET_SCHEDULE_MAILS,
  UPDATE_EMAIL_CATEGORY,
  DELETE_MULTIPLE_TEMPLATE,
  GET_SENT_EMAILS,
  GET_ALL_SMART_LIST
} from './store/email';

import { connect } from 'react-redux';

// ** Styles
import '@styles/react/apps/app-email.scss';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Collapse,
  Input,
  Card,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';
import AddTemplateModal from './components/AddTemplateModal';
import TemplateGraph from './components/TemplateGraph';
import Content from './Content';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TemplateContent from './components/TemplateContent';
import EditModal from '../../formBuilder/edit/EditModal';
import { getFormCategories } from '../../../requests/formCategory/formCategory';
import { getFormDataAction } from '../../formBuilder/store/action';

const EmailApp = (props) => {
  // ** States
  const [active, setActive] = useState('1');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [emailTemplatesModalOpen, setEmailTemplatesModalOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState(null);
  const [subFolderActiveName, setSubFolderActiveName] = useState(null);
  const [editOrAddOrListTemplate, setEditOrAddOrListTemplate] = useState('list');
  const [viewTemplate, setViewTemplate] = useState(null);
  const [mailsTODisplay, setMailsTODisplay] = useState([]);
  const [composePopUpMetaData, setComposePopUpMetaData] = useState(null);
  const [forms, setForms] = useState([]);
  const [step, setStep] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [sideBarUpdateData, setSideBarUpdateData] = useState(false);
  const [checkedCategoryData, setCheckedCategoryData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [expand, setExpand] = useState(false);
  const [minimize, setMinimize] = useState(false);
  const [composeSelectedTemplates, setComposeSelectedTemplates] = useState([]);
  const [composeSelectedTemplatesDetails, setComposeSelectedTemplatesDetails] = useState([]);
  const [categoryUpdate, setCategoryUpdate] = useState(0);
  // ** Store Variables
  const dispatch = useDispatch();
  const store = useSelector((state) => state.email);
  const contactsStore = useSelector((state) => state.totalContacts);
  const smartlistStore = useSelector((state) => state.smartList);
  // const templateStore = useSelector((state) => state.formEditor);
  const formStore = useSelector((state) => state.formEditor);
  const contentRef = useRef();
  // ** Vars
  const params = useParams();
  const { categoriesEmail, formbuilders, emailTemplateForm, allScheduleMails, allSentEmails, allTypeOfScheduleEmails } = props;

  useEffect(() => {
    const emailTemplates = formbuilders.filter(item => item.formType === 'email' && item.status !== 'remove' && item.isTemplate);
    setForms(emailTemplates);
    fetchData();
  },[active, formbuilders])

  useEffect(() => {
    setActive('template');
    dispatch(getFormsAction());
  }, [])

  //**UseEffect: GET initial data on Mount
  useEffect(() => {
    dispatch(
      getMails({
        q: query || '',
        folder: params.folder || 'sent',
        label: params.label || ''
      })
    );
    dispatch(employeesContactsAction());
    dispatch(clientContactsAction());
    dispatch(getData());
  }, [query, params.folder, params.label, dispatch]);

  const fetchData = async () => {
    const response = await getFormCategories();
    const categoryList = response.data.filter(item=>item.type === 'email');
    const emailTemplates = formbuilders.filter(item => item.formType === 'email' && item.status !== 'remove' && item.isTemplate);

    if(categoryList.length) {
      categoryList.map(item => {
        if(item.type === 'email') {
          const count = emailTemplates.filter(elem => elem.subCategory === item._id).length;
          item.count = count;
          return item;
        }
      })
    }
    setCategoryData(categoryList);

    setSideBarUpdateData(false);
  };

  useEffect(() => {
    fetchData();
  }, [categoryUpdate])

  useEffect(() => {
    if(checkedCategoryData.length) {
      const emailTemplates = formbuilders.filter(item => item.formType === 'email' && item.status !== 'remove' && item.isTemplate && checkedCategoryData.includes(item.subCategory));
      setForms(emailTemplates);
    } else {
      const emailTemplates = formbuilders.filter(item => item.formType === 'email' && item.status !== 'remove' && item.isTemplate);
      setForms(emailTemplates);
    }
  }, [checkedCategoryData])

  // ** Toggle

  const toggleEditor = () => {
    localStorage.removeItem('gjsProject');
    setOpenEditor(!openEditor);

    dispatch(getFormsAction());
  };

  // ** Toggle Compose Function
  const toggleCompose = (purpose, data) => {
    
    const emailTemplates = formbuilders.filter(item => item.formType === 'email' && item.status !== 'remove' && item.isTemplate);
    setForms(emailTemplates);

    if (purpose === 'edit') {
      setComposePopUpMetaData(data);
    } else if (purpose === 'fetchData') {
      dispatch(
        getMails({
          q: query || '',
          folder: params.folder || 'sent',
          label: params.label || ''
        })
      );
      setComposePopUpMetaData(null);
    }

    if(!composeOpen) {
      setExpand(false);
      setMinimize(false);
    }
    setComposeOpen(!composeOpen);
  };
  
  const MakeActionOnTemplate = () => {
    //setEditOrAddOrListTemplate("add")
    setOpen(!open);
  };
  const toggleModal = () => {
    setOpen(!open);
  };
  const emailTemplatesModalToggle = () => {
    setEmailTemplatesModalOpen(!emailTemplatesModalOpen);
    setCheckedCategoryData([]);
  }
  //** validate name */'
  const handleCategoryCollapse = () => setCollapse(!collapse);

  const parentcallback = (data) => {
    setViewoneId(data);
  };

  const selectEmailTemplateClick = () => {
    setEmailTemplatesModalOpen(!emailTemplatesModalOpen);
    const newArray = Array.from(forms.filter(item => composeSelectedTemplates.includes(item._id)));
    setComposeSelectedTemplatesDetails(newArray);
  }

  const unselecteComposeEmailTemplate = (tempalteId) => {
    const newDetailArray = Array.from(composeSelectedTemplatesDetails.filter(item => item._id !== tempalteId));
    const newArray = Array.from(composeSelectedTemplates.filter(_id => _id !== tempalteId));
    setComposeSelectedTemplatesDetails(newDetailArray);
    setComposeSelectedTemplates(newArray);
  }

  const handleSubmitEmailTemplate = (templateName, templateCategory) => {
    const new_form = {
      name: templateName,
      memberType: 'recipient',
      smartList: '',
      subCategory: templateCategory.value,
      formType: 'email',
      formData: [{id:crypto.randomUUID(),step:'1',name:'Home',path:'home',html:'',css:''}],
      automateEntry: false,
      status: 'create',
      isTemplate: true, 
    };

    dispatch(createFormAction(new_form));
    setOpenEditor(!openEditor);
    contentRef.current.triggerCloseModal();
  }

  const handleFormEdit = templateItem => {
    dispatch(getFormDataAction(templateItem._id));
    setOpenEditor(!openEditor);
  }

  const itemAddToFavorite = templateItem => {
    const newForms = Array.from(forms);
    const newEmailTemplates = newForms.map(item => {
      if(item._id === templateItem._id) {
        const newItem = { ...item };
        newItem.favorite = !newItem.favorite;
        return newItem;
      } else {
        const newItem = { ...item };
        if(!newItem.hasOwnProperty("favorite")) newItem.favorite = false;
        return newItem;
      } 
        
    });
    newEmailTemplates.sort((a, b) => b.favorite - a.favorite)
    setForms(newEmailTemplates);
  }

  return (
    <Fragment>
      <Sidebar
        store={store}
        dispatch={dispatch}
        getMails={getMails}
        sidebarOpen={sidebarOpen}
        active={active}
        setActive={setActive}
        toggleCompose={toggleCompose}
        setSidebarOpen={setSidebarOpen}
        resetSelectedMail={resetSelectedMail}
        setComposeSelectedTemplates={setComposeSelectedTemplates}
        setComposeSelectedTemplatesDetails={setComposeSelectedTemplatesDetails}
      />
      <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
        <div className="h-100">
          <div className="content-body">
            <div className={classnames('body-content-overlay', { show: sidebarOpen })} onClick={() => setSidebarOpen(false)} ></div>
            { active === 'template' ? (
              <div className='h-100' style={{ display: 'flex', flex: 1 }}>
                <Collapse
                  isOpen={!collapse}
                  horizontal={true}
                  delay={{ show: 200, hide: 500 }}
                >
                  <CategorySidebar
                    parentcallback={parentcallback}
                    collapse={collapse}
                    handleCategoryCollapse={handleCategoryCollapse}
                    setSideBarUpdateData={setSideBarUpdateData}
                    categoryUpdate={categoryUpdate}
                    setCategoryUpdate={setCategoryUpdate}
                    categoryData={categoryData}
                    checkedCategoryData={checkedCategoryData}
                    setCheckedCategoryData={setCheckedCategoryData}
                  />
                </Collapse>
                <PerfectScrollbar className='flex-1' options={{ wheelPropagation: false }}>
                  <div style={{ width: '100%', overflow: 'auto' }}>
                    <div className="d-flex flex-row justify-content-between px-2 pt-0">
                      <div className="row breadcrumbs-top p-0 ">
                        {activeFolder && (
                          <div className="col-12 pt-1">
                            <Breadcrumb tag="ol" className="p-0">
                              <BreadcrumbItem tag="li">{activeFolder?.categoryName}</BreadcrumbItem>
                              {subFolderActiveName && (
                                <BreadcrumbItem tag="li">{subFolderActiveName}</BreadcrumbItem>
                              )}
                            </Breadcrumb>
                          </div>
                        )}
                      </div>

                      {editOrAddOrListTemplate === 'list' && activeFolder !== null && (
                        <div className="pt-1">
                          <Button onClick={MakeActionOnTemplate}>{'Add Template'}</Button>
                          <Modal isOpen={open} toggle={toggle} centered={true} style={{ zIndex: 1 }}>
                            <ModalHeader toggle={toggle}>Add Template</ModalHeader>
                            <ModalBody>
                              <div className="">
                                <div>
                                  <Row>
                                    <Col sm="12" lg="12" md="12">
                                      <div className="mat-dialog-content add-section">
                                        <div className="action-list px-1 enable ng-star-inserted">
                                          <ul
                                            style={{
                                              listStyle: 'none',
                                              padding: '5px 0',
                                              margin: 0,
                                              display: 'flex',
                                              flexDirection: 'column'
                                            }}
                                          >
                                            <li
                                              style={{
                                                padding: '15px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                margin: '5px 2px 10px',
                                                cursor: 'pointer',
                                                border: '1px solid #dee2e6',
                                                borderRadius: '4px',
                                                background: 'hsla(0,0%,93.3%,.2)',
                                                '&:hover': {
                                                  background: '#f0f0f0'
                                                }
                                              }}
                                            >
                                              <AddTemplateModal
                                                setViewTemplate={setViewTemplate}
                                                template={viewTemplate}
                                                type={'text'}
                                                FolderList={categoriesEmail}
                                                setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}
                                                setMailsTODisplay={setMailsTODisplay}
                                                parentCallback={() => {
                                                  setOpen(!open);
                                                }}
                                              />
                                            </li>
                                            <li
                                              style={{
                                                padding: '15px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                margin: '5px 2px 10px',
                                                cursor: 'pointer',
                                                border: '1px solid #dee2e6',
                                                borderRadius: '4px',
                                                background: 'hsla(0,0%,93.3%,.2)',
                                                '&:hover': {
                                                  background: '#f0f0f0'
                                                }
                                              }}
                                            >
                                              <AddTemplateModal
                                                setViewTemplate={setViewTemplate}
                                                template={viewTemplate}
                                                type={'email'}
                                                FolderList={categoriesEmail}
                                                setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}
                                                setMailsTODisplay={setMailsTODisplay}
                                                parentCallback={() => {
                                                  setOpen(!open);
                                                }}
                                              />
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              </div>
                            </ModalBody>
                          </Modal>
                        </div>
                      )}
                    </div>
                    <Fragment>

                      <div style={{ overflow: 'hidden' }}>
                        {mailsTODisplay?.length > 0 ? (
                          <TemplateGraph setEditOrAddOrListTemplate={setEditOrAddOrListTemplate} />
                        ) : !activeFolder ? (
                          <div className="p-2 bg-white mt-0">
                            <Row spacing={2} className="p-0 m-0 mt-0">
                              <Col sm={12} md={12} lg={15}>
                                <div className='d-flex justify-content-between align-items-center'>
                                  <div className='d-flex align-items-center'>
                                    {collapse && (
                                      <div className="btn-collapse-wrapper me-1">
                                        <Button
                                          className="btn-icon btn btn-flat-dark btn-sm btn-toggle-sidebar"
                                          color="flat-dark"
                                          onClick={handleCategoryCollapse}
                                        >
                                          <ChevronRight size={18} />
                                        </Button>
                                      </div>
                                    )}
                                    <h3 className='m-0'>MY TEMPLATE</h3>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <Row spacing={2} className="p-0 m-0 mt-3">
                              <Col sm={12} md={4} lg={4} className=''>
                                <Content ref={contentRef} categoryData={categoryData} handleSubmitEmailTemplate={handleSubmitEmailTemplate}/>
                              </Col>
                              { forms &&
                                forms.map(item => {
                                  return (
                                    <Col key={item._id} sm={12} md={4} lg={4}>
                                      <TemplateContent
                                        dispatch={dispatch}
                                        item={item}
                                        handleFormEdit={handleFormEdit}
                                        itemAddToFavorite={itemAddToFavorite}
                                        name={item?.name}                               
                                        html={item.formData[0]?.html}
                                        css={item.formData[0]?.css}
                                      />
                                    </Col>)
                                })
                              }
                            </Row>  
                            <EditModal toggle={toggleEditor} open={openEditor} store={emailTemplateForm} dispatch={dispatch} step={emailTemplateForm.form.formData[0]}/> 
                          </div>
                        ) : activeFolder ? (
                          <TemplateGraph setEditOrAddOrListTemplate={setEditOrAddOrListTemplate} />
                        ) : (
                          <div className="d-flex justify-content-center flex-column w-100">
                            <div className="d-flex justify-content-center">
                              <h3>No item Found</h3>
                            </div>
                          </div>
                        )}
                      </div>

                    </Fragment>
                  </div>
                </PerfectScrollbar>
              </div>
              ) : (
              <Mails
                store={store}
                contactsStore={contactsStore}
                smartlistStore={smartlistStore}
                query={query}
                setQuery={setQuery}
                dispatch={dispatch}
                getMails={getMails}
                selectMail={selectMail}
                updateMails={updateMails}
                composeOpen={composeOpen}
                paginateMail={paginateMail}
                selectAllMail={selectAllMail}
                toggleCompose={toggleCompose}
                setSidebarOpen={setSidebarOpen}
                updateMailLabel={updateMailLabel}
                selectCurrentMail={selectCurrentMail}
                resetSelectedMail={resetSelectedMail}
                currentFolder={params.folder}
              />
            )}
          </div>
        </div>
        <ComposePopUp
          composeOpen={composeOpen}
          toggleCompose={toggleCompose}
          metadata={composePopUpMetaData}
          contactsStore={contactsStore}
          smartlistStore={smartlistStore}
          expand={expand}
          setExpand={setExpand}
          minimize={minimize}
          setMinimize={setMinimize}
          setEmailTemplatesModalOpen={setEmailTemplatesModalOpen}
          emailTemplatesModalOpen={emailTemplatesModalOpen}
          composeSelectedTemplatesDetails={composeSelectedTemplatesDetails}
          setComposeSelectedTemplates={setComposeSelectedTemplates}
          setComposeSelectedTemplatesDetails={setComposeSelectedTemplatesDetails}
          unselecteComposeEmailTemplate={unselecteComposeEmailTemplate}
        />
        
        <Modal isOpen={emailTemplatesModalOpen} toggle={emailTemplatesModalToggle} scrollable className="modal-xl justify-content-center" contentClassName="email-templates-modal" centered={true} style={{ zIndex: 1 }}>
          <ModalHeader toggle={emailTemplatesModalToggle}>Email Templates</ModalHeader>
          <ModalBody className='p-0'>
            <EmailTemplates 
              setSideBarUpdateData={setSideBarUpdateData}
              categoryData={categoryData}
              checkedCategoryData={checkedCategoryData}
              setCheckedCategoryData={setCheckedCategoryData}
              setComposeSelectedTemplates={setComposeSelectedTemplates}
              composeSelectedTemplates={composeSelectedTemplates}
              forms={forms}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" size="md" onClick={()=>selectEmailTemplateClick()} disabled={!composeSelectedTemplates.length}>Use Template</Button>
          </ModalFooter>
        </Modal>
      
      </PerfectScrollbar>
    </Fragment>
    
  );
};

const mapStateToProps = (state) => {
  return {
    categoriesEmail: state.EmailMarketing.categoriesEmail,
    allScheduleMails: state.EmailMarketing.allScheduleMails,
    allTypeOfScheduleEmails: state.EmailMarketing.allScheduleEmails, // get all type of schedule emails
    allSentEmails: state.EmailMarketing.allSentEmails,
    formbuilders: state.formEditor.funnels,
    emailTemplateForm: state.formEditor
  };
};

export default connect(mapStateToProps, {
  GET_CATEGORIES_EMAIL,
  DELETE_SUB_FOLDER_EMAIL,
  DELETE_CATEGORY_EMAIL,
  GET_SCHEDULE_MAILS,
  DELETE_MULTIPLE_TEMPLATE,
  UPDATE_EMAIL_CATEGORY,
  GET_SENT_EMAILS,
  GET_ALL_SECHEDULE_EMAIL,
  GET_ALL_SMART_LIST
})(EmailApp);
