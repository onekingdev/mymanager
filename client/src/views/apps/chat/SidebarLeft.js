// ** React Imports
import { useState, useEffect } from 'react';

// ** Custom Components
import Avatar from '@components/avatar';

import { customInterIceptors } from '../../../lib/AxiosProvider';

// ** Store & Actions
import { selectChat, selectContact } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { getChatContacts, getUserProfile } from './store';
import { getTickets } from '../ticket/store';
import useMessage from '../../../lib/useMessage';
// ** Utils
import { formatDateToMonthShort, isObjEmpty, selectThemeColors } from '@utils';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { X, Search, CheckSquare, Bell, User, Trash } from 'react-feather';
import Select from 'react-select';
// ** Reactstrap Imports
import {
  CardText,
  InputGroup,
  InputGroupText,
  Badge,
  Input,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

// ** Context Menu
import { contextMenu, Item, Menu, Separator, Submenu, onContextMenu } from 'react-contexify';

import 'react-contexify/dist/ReactContexify.min.css';

import { BiArchiveIn, BiSave, BiTrash } from 'react-icons/bi';
import TicketModalInfo from './TicketModalInfo';
import AddContactModal from './AddContactModal';

const SidebarLeft = (props) => {
  // ** API
  const API = customInterIceptors();

  // ** Props & Store
  const {
    store,
    sidebar,
    handleSidebar,
    userSidebarLeft,
    handleUserSidebarLeft,
    ticketStore,
    selectedRow,
    setSelectedRow,
    existedContact,
    employeeList,
    vendorList,
    clientList,
    leadList,
    relationshipList
  } = props;
  const { chats, contacts, userProfile } = store;
  const { tickets } = ticketStore;

  // ** Dispatch
  const dispatch = useDispatch();

  // ** State
  const [query, setQuery] = useState('');
  const [about, setAbout] = useState('');
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState('online');
  const [filteredChat, setFilteredChat] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [filterBy, setFilterBy] = useState({
    value: '',
    label: 'Filter By'
  });

  const { error, success } = useMessage();
  const filterByOptions = [
    { value: 'employee', label: 'Employee', number: 0 },
    { value: 'relationship', label: 'Relationship', number: 1 },
    { value: 'client', label: 'Client', number: 2 },
    { value: 'vendor', label: 'Vendor', number: 3 },
    { value: 'lead', label: 'Lead', number: 4 }
  ];
  const menuShow = (item, e) => {
    let isClosed = false;
    tickets &&
      tickets.map((ticket, index) => {
        if (ticket.reqEmail == item.contact.email) {
          isClosed = ticket.isClosed ? ticket.isClosed : false;
        }
      });
    setSelectedRow({ ...item, isClosed: isClosed });
    contextMenu.show({
      id: 'menu-id',
      event: e
    });
  };

  // ** Handles Menu Item Click
  const archiveHandler = (id) => {
    handleUserClick(id);
    setIsCreateTicketModalOpen(!isCreateTicketModalOpen);
  };
  const saveHandler = () => {
    setAddContactModalOpen(!addContactModalOpen);
  };

  // Modal
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
  const [addContactModalOpen, setAddContactModalOpen] = useState(false);

  // Delete client Position Modal state
  const [deleteModal, setDeleteModal] = useState({
    id: '',
    show: false
  });

  const deleteHandler = () => {
    // Show Modal
    setDeleteModal({
      id: '',
      show: true
    });
  };

  const deleteChannelHandler = async (channelId, contactId) => {
    if ((channelId, contactId)) {
      const response = await API.delete(`livechat/channel/${channelId}/${contactId}`).catch(
        function (error) {
          if (error.response) {
            return error.response;
          }
        }
      );
      if (response.status == 200) {
        // ** Get data again
        dispatch(getChatContacts());
        dispatch(getUserProfile());
        success('Successfully Removed');
      } else {
        error('Delete Failed');
      }
    }
    setDeleteModal({ show: false });
  };

  // ** Handle User Chat Click
  const handleUserClick = (item) => {
    dispatch(selectChat(item._id));
    setActive(item._id);
    // ** Check if this user registered or not
    let isClosed = false;
    tickets &&
      tickets.map((ticket, index) => {
        if (ticket?.reqEmail == item.contact?.email) {
          isClosed = ticket?.isClosed ? ticket.isClosed : false;
        }
      });
    setSelectedRow({ ...item, isClosed: isClosed });
    if (sidebar === true) {
      handleSidebar();
    }
  };

  // ** Handle User Contact Click
  const handleContactClick = (item) => {
    dispatch(selectContact(item));
    setActive(item._id);
    // ** Check if this user registered or not
    let isClosed = false;
    tickets &&
      tickets.map((ticket, index) => {
        if (ticket?.reqEmail == item.contact?.email) {
          isClosed = ticket?.isClosed ? ticket.isClosed : false;
        }
      });
    setSelectedRow({ ...item, isClosed: isClosed });
    if (sidebar === true) {
      handleSidebar();
    }
  };

  useEffect(() => {
    if (!isObjEmpty(store.selectedUser)) {
      if (store.selectedUser.chat) {
        setActive(store.selectedUser._id);
      } else {
        setActive(store.selectedUser._id);
      }
    }
  }, []);

  // ** Renders Chat
  const renderChats = () => {
    if (chats && chats.length) {
      if (query.length && !filteredChat.length) {
        return (
          <li className="no-results show">
            <h6 className="mb-0">No Chats Found</h6>
          </li>
        );
      } else {
        const arrToMap = query.length && filteredChat.length ? filteredChat : chats;
        return arrToMap.map((item) => {
          const time = formatDateToMonthShort(item.messages ? item.messages.createdAt : new Date());
          return (
            <>
              <li
                key={item._id}
                onClick={() => handleUserClick(item)}
                onContextMenu={(e) => menuShow(item, e)}
              >
                <Avatar
                  img={require('@src/assets/images/avatars/avatar-blank.png').default}
                  imgHeight={42}
                  imgWidth={42}
                  status={item.status}
                />
                <div className="chat-info flex-grow-1">
                  <h5 className="mb-0">{item.contact.fullName}</h5>
                  <CardText className="text-truncate">
                    {/* {item.chat.lastMessage ? item.chat.lastMessage.message : chats[chats.length - 1].message} */}
                    {item.messages.msg}
                  </CardText>
                </div>
                <div className="chat-meta text-nowrap">
                  <small className="float-end mb-25 chat-time ms-25">{time}</small>
                  {item.chat?.unseenMsgs >= 1 ? (
                    <Badge className="float-end" color="danger" pill>
                      {item.chat.unseenMsgs}
                    </Badge>
                  ) : null}
                </div>
              </li>
            </>
          );
        });
      }
    } else {
      return null;
    }
  };

  // ** Renders Contact
  const renderContacts = () => {
    if (contacts && contacts.length) {
      if (query.length && !filteredContacts.length) {
        return (
          <li className="no-results show">
            <h6 className="mb-0">No Chats Found</h6>
          </li>
        );
      } else {
        let tmp = query.length && filteredContacts.length ? filteredContacts : contacts,
          arrToMap = [];

        // Filter by contacts
        if (filterBy.value === 'employee') {
          tmp.forEach((item1, index1) => {
            employeeList.forEach((item2, index2) => {
              if (item2.fullName == item1.fullName || item1.email == item2.email) {
                arrToMap.push(item1);
              }
            });
          });
        } else if (filterBy.value === 'client') {
          tmp.forEach((item1, index1) => {
            clientList.forEach((item2, index2) => {
              if (item2.fullName == item1.fullName || item1.email == item2.email) {
                arrToMap.push(item1);
              }
            });
          });
        } else if (filterBy.value === 'relationship') {
          tmp.forEach((item1, index1) => {
            relationshipList.forEach((item2, index2) => {
              if (item2.fullName == item1.fullName || item1.email == item2.email) {
                arrToMap.push(item1);
              }
            });
          });
        } else if (filterBy.value === 'vendor') {
          tmp.forEach((item1, index1) => {
            vendorList.forEach((item2, index2) => {
              if (item2.fullName == item1.fullName || item1.email == item2.email) {
                arrToMap.push(item1);
              }
            });
          });
        } else if (filterBy.value === 'lead') {
          tmp.forEach((item1, index1) => {
            leadList.forEach((item2, index2) => {
              if (item2.fullName == item1.fullName || item1.email == item2.email) {
                arrToMap.push(item1);
              }
            });
          });
        }

        return arrToMap.map((item) => {
          const nameOrArr = item.fullName.split(' ');
          const firstPart = nameOrArr.length > 0 ? nameOrArr[0] : '';
          const lastPart = nameOrArr.length > 1 ? nameOrArr[1] : '';
          const firstLetter = firstPart[0].toUpperCase();
          const lastLetter = lastPart[0] ? lastPart[0].toUpperCase() : '';
          const shortName = firstLetter + ' ' + lastLetter;

          return (
            <li
              key={item.fullName}
              onClick={(e) => {
                handleContactClick(item);
              }}
            >
              {item.avatar ? (
                <Avatar img={item.avatar} imgHeight={42} imgWidth={42} />
              ) : (
                <Avatar
                  color="primary"
                  imgHeight={42}
                  imgWidth={42}
                  img={require('@src/assets/images/avatars/avatar-blank.png').default}
                />
              )}
              <div className="chat-info flex-grow-1">
                <h5 className="mb-0">{item.fullName}</h5>
                <CardText className="text-truncate">
                  {/* {item.about} */}
                  {item.email}
                </CardText>
              </div>
            </li>
          );
        });
      }
    } else {
      return null;
    }
  };

  // ** Handles Filter
  const handleFilter = (e) => {
    setQuery(e.target.value);
    const searchFilterFunction = (contact) =>
      contact.fullName.toLowerCase().includes(e.target.value.toLowerCase());
    const filteredChatsArr = chats.filter(searchFilterFunction);
    const filteredContactssArr = contacts.filter(searchFilterFunction);
    setFilteredChat([...filteredChatsArr]);
    setFilteredContacts([...filteredContactssArr]);
  };

  const renderAboutCount = () => {
    if (userProfile && userProfile.about && userProfile.about.length && about.length === 0) {
      return userProfile.about.length;
    } else {
      return about.length;
    }
  };

  // Return start
  return store ? (
    <div className="sidebar-left chat-sidebar-left">
      <div className="sidebar chat-sidebar">
        <div
          className={classnames('chat-profile-sidebar', {
            show: userSidebarLeft
          })}
        >
          <header className="chat-profile-header">
            <div className="close-icon" onClick={handleUserSidebarLeft}>
              <X size={14} />
            </div>
            <div className="header-profile-sidebar">
              {userProfile.photo ? (
                <Avatar
                  img={userProfile.photo}
                  className="box-shadow-1 avatar-border"
                  status={status}
                  size="xl"
                />
              ) : (
                <Avatar
                  color={'primary'}
                  content={userProfile.fullName || 'John Doe'}
                  className="box-shadow-1 avatar-border"
                  status={status}
                  size="xl"
                  initials
                />
              )}
              <h4 className="chat-user-name">{userProfile.fullName}</h4>
              <span className="user-post">{userProfile.role}</span>
            </div>
          </header>
          <PerfectScrollbar className="profile-sidebar-area" options={{ wheelPropagation: false }}>
            <h6 className="section-label mb-1">About</h6>
            <div className="about-user">
              <Input
                rows="5"
                type="textarea"
                defaultValue={userProfile.about}
                onChange={(e) => setAbout(e.target.value)}
                className={classnames('char-textarea', {
                  'text-danger': about && about.length > 120
                })}
              />
              <small className="counter-value float-end">
                <span className="char-count">{renderAboutCount()}</span> / 120
              </small>
            </div>
            <h6 className="section-label mb-1 mt-3">Status</h6>
            <ul className="list-unstyled user-status">
              <li className="pb-1">
                <div className="form-check form-check-success">
                  <Input
                    type="radio"
                    label="Online"
                    id="user-online"
                    checked={status === 'online'}
                    onChange={() => setStatus('online')}
                  />
                  <Label className="form-check-label" for="user-online">
                    Online
                  </Label>
                </div>
              </li>
              <li className="pb-1">
                <div className="form-check form-check-danger">
                  <Input
                    type="radio"
                    id="user-busy"
                    label="Do Not Disturb"
                    checked={status === 'busy'}
                    onChange={() => setStatus('busy')}
                  />
                  <Label className="form-check-label" for="user-busy">
                    Busy
                  </Label>
                </div>
              </li>
              <li className="pb-1">
                <div className="form-check form-check-warning">
                  <Input
                    type="radio"
                    label="Away"
                    id="user-away"
                    checked={status === 'away'}
                    onChange={() => setStatus('away')}
                  />
                  <Label className="form-check-label" for="user-away">
                    Away
                  </Label>
                </div>
              </li>
              <li className="pb-1">
                <div className="form-check form-check-secondary">
                  <Input
                    type="radio"
                    label="Offline"
                    id="user-offline"
                    checked={status === 'offline'}
                    onChange={() => setStatus('offline')}
                  />
                  <Label className="form-check-label" for="user-offline">
                    Offline
                  </Label>
                </div>
              </li>
            </ul>
            <h6 className="section-label mb-1 mt-2">Settings</h6>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex align-items-center">
                  <CheckSquare className="me-75" size="18" />
                  <span className="align-middle">Two-step Verification</span>
                </div>
                <div className="form-switch">
                  <Input type="switch" id="verification" name="verification" defaultChecked />
                </div>
              </li>
              <li className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex align-items-center">
                  <Bell className="me-75" size="18" />
                  <span className="align-middle">Notification</span>
                </div>
                <div className="form-switch">
                  <Input type="switch" id="notifications" name="notifications" />
                </div>
              </li>
              <li className="d-flex align-items-center cursor-pointer mb-1">
                <User className="me-75" size="18" />
                <span className="align-middle">Invite Friends</span>
              </li>
              <li className="d-flex align-items-center cursor-pointer">
                <Trash className="me-75" size="18" />
                <span className="align-middle">Delete Account</span>
              </li>
            </ul>
            <div className="mt-3">
              <Button color="primary">Logout</Button>
            </div>
          </PerfectScrollbar>
        </div>
        <div
          className={classnames('sidebar-content', {
            show: sidebar === true
          })}
        >
          <div className="sidebar-close-icon" onClick={handleSidebar}>
            <X size={14} />
          </div>
          <div className="chat-fixed-search">
            <div className="d-flex align-items-center w-100">
              <div className="sidebar-profile-toggle" onClick={handleUserSidebarLeft}>
                {userProfile.avatar ? (
                  <Avatar img={userProfile.photo} width="32" height="32" />
                ) : (
                  <Avatar color={'primary'} content={userProfile.fullName || 'John Doe'} initials />
                )}
              </div>
              <InputGroup className="input-group-merge ms-1 w-100">
                <InputGroupText className="round">
                  <Search className="text-muted" size={14} />
                </InputGroupText>
                <Input
                  value={query}
                  className="round"
                  placeholder="Search or start a new chat"
                  onChange={handleFilter}
                />
              </InputGroup>
            </div>
          </div>
          <PerfectScrollbar
            className="chat-user-list-wrapper list-group"
            options={{ wheelPropagation: false }}
          >
            <h4 className="chat-list-title">Chats</h4>
            <ul className="chat-users-list chat-list media-list">{renderChats()}</ul>
            <div className="d-flex justify-content-between align-items-center p-2">
              <h4 className="chat-list-title m-0">Contacts</h4>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select w-50"
                classNamePrefix="select"
                options={filterByOptions}
                value={filterBy}
                onChange={(data) => {
                  setFilterBy(data);
                }}
              />
            </div>
            <ul className="chat-users-list contact-list media-list">{renderContacts()}</ul>
          </PerfectScrollbar>

          {/* Richt Click Menu */}
          <Menu id="menu-id">
            <Item
              onClick={() => archiveHandler(selectedRow._id)}
              disabled={selectedRow?.isClosed == true ? true : false}
            >
              <BiArchiveIn size={20} className="me-75" />
              Add to ticket
            </Item>
            <Item
              onClick={() => saveHandler()}
              disabled={Object.keys(existedContact).length > 0 ? true : false}
            >
              <BiSave size={20} className="me-75" />
              Save Contact
            </Item>
            <Item onClick={() => deleteHandler()}>
              <BiTrash size={20} className="me-75" />
              Remove chat
            </Item>
          </Menu>

          {/* Add Ticket Modal */}
          <Modal
            isOpen={isCreateTicketModalOpen}
            toggle={() => setIsCreateTicketModalOpen(!isCreateTicketModalOpen)}
            className="modal-dialog-centered"
            size="lg"
          >
            <ModalHeader toggle={() => setIsCreateTicketModalOpen(!isCreateTicketModalOpen)}>
              Create A New Ticket
            </ModalHeader>
            <ModalBody>
              <TicketModalInfo
                store={store}
                dispatch={dispatch}
                selectedTicket={selectedRow}
                setIsCreateTicketModalOpen={setIsCreateTicketModalOpen}
              />
            </ModalBody>
          </Modal>

          {/* Add Contact Modal */}
          <AddContactModal
            modal={addContactModalOpen}
            setModal={setAddContactModalOpen}
            addContactModalToggle={saveHandler}
            selectedRow={selectedRow}
          ></AddContactModal>

          {/* Delete Modal */}

          <Modal
            toggle={() => {
              setDeleteModal({
                id: '',
                show: false
              });
            }}
            centered
            isOpen={deleteModal.show}
          >
            <ModalBody>
              <div>
                <h3>Are you sure to Delete ?</h3>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                onClick={() => {
                  setDeleteModal({
                    id: '',
                    show: false
                  });
                }}
              >
                No
              </Button>
              <Button
                // disabled={deleteLoading}
                size="sm"
                color="primary"
                onClick={() => {
                  deleteChannelHandler(selectedRow?._id, selectedRow?.contact._id);
                }}
              >
                {/* {deleteLoading ? 'Deleting...' : 'Yes'} */}
                Yes
              </Button>{' '}
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  ) : null;
};

export default SidebarLeft;
