// ** React Imports
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, NavLink, TabContent, TabPane } from 'reactstrap';
import { Menu } from 'react-feather';
import { MessageCircle, Twitch } from 'react-feather';
// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Mail, Send, Edit2, Folder, Trash, Plus, Code } from 'react-feather';
// ** Components imports live chat layout etc
import Layout from './layout';
import Livechat from './tabs/livechat';
import Chatbot from './tabs/chatbot';
import Retention from './tabs/retention';
import Api from './tabs/api';
import Scripts from './tabs/scripts';
import { BiUser } from 'react-icons/bi';
import { BsCircle } from 'react-icons/bs';

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { GET_ALL_PROGRESSION_DATA, progressionFetchAction, promotClientAction, promotedListAction } from '../../contacts/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { progressionAddAction } from '../../settings/tabs/progressiontab/store/actions';
const Sidebar = (props) => {
  const dispatch = useDispatch();
  // ** Props
  const { sidebarOpen, setSidebarOpen, ProgressionList } = props;
  const store = useSelector((state) => state.totalContacts);
  const clientContacts = store ? store?.contactList?.list : []
  const [totalContacts, setTotalContacts] = useState([])
  const [totalProgresssion, setTotalProgresssion] = useState([])
  const [totalCategory, setTotalCategory] = useState([])
  const progressionList = useSelector((state) => state.totalContacts?.fetchProgressionData);
  const progressionListEffect = progressionList ? progressionList : []
  const [categoryData, setCategoryData] = useState([])
  const [clientIdPr, setClientIdPr] = useState('')
 const [ categoryIdPr,setCategoryIdPr]   = useState('')
 const [progressionIdPr,setProgressionIdPr]  = useState('')
 const [  promoteClientParmsAdd,setPromoteClientParmsAdd] =  useState({ clientProgressions : [
 
 ]})
 const [clientIdMainPr, setClientIdMainPr] = useState({ })
 useEffect(()  => {
  setClientIdMainPr({
    clientIds : [categoryIdPr]
  })

 },[categoryIdPr])

 useEffect(() => {
  setPromoteClientParmsAdd({
    clientProgressions: [
      { clientId:clientIdPr, progressionId: categoryIdPr   , categoryId: progressionIdPr }
    ]
  });
}, [categoryIdPr,progressionIdPr,clientIdPr])
  useEffect(() => {
    const dataMain = clientContacts?.map((item) => {
      return {
        ...item,
        value: item._id,
        label: item.fullName
      }
    }
    )
    setTotalContacts(dataMain)
  }, [clientContacts])
  useEffect(() => {
    const dataMain 
    = progressionListEffect?.map((item) => {
      return {
        ...item,
        value: item?._id,
        label: item?.progressionName
      }
    }
    )
    setTotalProgresssion(dataMain)
  }, [progressionListEffect])
  useEffect(() => {
    const dataMain = categoryData?.map((item) => {
      return {
        ...item,
        value: item?._id,
        label: item?.categoryName
      }
    }
    )
    setTotalCategory(dataMain)
  }, [categoryData])
  useEffect(() => {
  },[totalCategory])

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  const [active, setActive] = useState('1');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  let ProgressionAllData = useSelector((state) => state?.totalContacts?.allProgressionData);
  const handleContactChange = (e) => {
    setCategoryData(e.categoryId)
    setCategoryIdPr(e._id)
  }
  const handleClientChange = (e)   => {
    setClientIdPr(e?._id)

  }
  const handleProgressionChange  =(e)  => {
    setProgressionIdPr(e._id)

  }
  useEffect(async () => {
    dispatch(progressionFetchAction());
    dispatch(GET_ALL_PROGRESSION_DATA());

  }, []);
  return (
    <>
      <div
        className={classnames('sidebar-left', {
          show: sidebarOpen
        })}
      >
        <div className="sidebar">
          <div className="sidebar-content email-app-sidebar">
            <div className="email-app-menu">
              <div className="form-group-compose text-center compose-btn">
                <Button className="compose-email" color="primary" block onClick={() => setModal(true)}>
                  Add Progression
                </Button>
              </div>
              <Modal isOpen={modal} toggle={toggle} size="sm" centered={true} fade={true} backdrop={true}>
                <ModalHeader toggle={toggle}>Add Progression</ModalHeader>
                <ModalBody>
                  <Form>
                    <FormGroup>
                      <Label for="exampleEmail">
                        Client Name
                      </Label>
                      <AsyncSelect
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        // loadOptions={promiseOptions}
                        onChange={handleClientChange}
                        // onInputChange={handleClientChange}
                        // theme={selectThemeColors}
                        cacheOptions
                        defaultOptions={totalContacts}
                        placeholder="Client Name"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">
                        Progression Name
                      </Label>
                      <AsyncSelect
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        // loadOptions={promiseOptions}
                        onChange={handleContactChange}
                        // onInputChange={handleInputChange}
                        // theme={selectThemeColors}  
                        cacheOptions
                        defaultOptions={totalProgresssion}
                        placeholder="Progression Name"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">
                        Category Name
                      </Label>
                      <AsyncSelect
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        // loadOptions={promiseOptions}
                        onChange={handleProgressionChange}
                        // onInputChange={handleInputChange}
                        // theme={selectThemeColors}
                        cacheOptions
                        defaultOptions={totalCategory}
                        placeholder="Category Name"
                      />
                    </FormGroup>
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={(e) => {
                       dispatch(progressionAddAction(clientIdMainPr)).then(dispatch(promotClientAction(promoteClientParmsAdd))).then(dispatch(promotedListAction())).catch((err) => {

                       })

                    // dispatch(progressionHistEditAction(row?._id, payload, clientId))
                    // setModal(false)
                  }
                  }>  
                    Add
                  </Button>{' '}
                  <Button color="secondary" onClick={(e) => setModal(false)}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              <PerfectScrollbar
                className="sidebar-menu-list"
                options={{ wheelPropagation: false }}
              >
                <ListGroup tag="div" className="list-group-messages">
                  {ProgressionList.map((item, i) => {
                    return (
                      <ListGroupItem
                        tag={NavLink}
                        onClick={() => toggleTab(JSON.stringify(i + 1))}
                        active={active === JSON.stringify(i + 1)}
                        action
                      >
                        <BiUser size={18} className="me-75" />
                        <span className="align-middle">{item?.progressionName}</span>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
      <div className="content-right">
        <div className="content-body">
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="email-app-list">
            <div className="app-fixed-search d-flex d-lg-none align-items-center">
              <div
                className="sidebar-toggle d-block d-lg-none ms-1"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size="21" />
              </div>
            </div>
            <PerfectScrollbar>
              <TabContent activeTab={active}>
                {ProgressionList.map((item, index) => {
                  return (
                    <TabPane tabId={JSON.stringify(index + 1)}>
                      <Retention
                        progressionId={item?._id}
                        ProgressionAllData={ProgressionAllData}
                        ProgressionList={ProgressionList}
                      />
                    </TabPane>
                  );
                })}
              </TabContent>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
