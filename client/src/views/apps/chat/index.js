// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Chat App Component Imports
import Chat from './Chat';
import Sidebar from './SidebarLeft';
import UserProfileSidebar from './UserProfileSidebar';

// ** Third Party Components
import classnames from 'classnames';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, getChatContacts } from './store';
import { getTickets } from '../ticket/store';

import '@styles/base/pages/app-chat.scss';
import '@styles/base/pages/app-chat-list.scss';

const AppChat = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.chat);
  const ticketStore = useSelector((state) => state.ticket);
  const [selectedRow, setSelectedRow] = useState({});

  const allStates = useSelector((state) => state);

  // ** All Contact Data
  const employeeList =
    allStates.employeeContact && allStates.employeeContact.employeeList.data?.list;
  const clientList = allStates.clientContact && allStates.clientContact.contacts?.list;
  const leadList = allStates.leadContact && allStates.leadContact.contactList.data?.list;
  const vendorList = allStates.vendorContact && allStates.vendorContact.contactList.data?.list;
  const relationshipList =
    allStates.relationshipContact && allStates.relationshipContact.contactList.data?.list;
  // ** Check if this user exist in db
  const [existedContact, setExistedContact] = useState({});
  useEffect(() => {
    let found = false;
    if (!found) {
      employeeList?.forEach((item, index) => {
        if (
          item.email == selectedRow?.contact?.email ||
          item.fullName == selectedRow?.contact?.fullName
        ) {
          setExistedContact(item);
          found = true;
        }
      });
    } else {
      return;
    }
    if (!found) {
      clientList?.forEach((item, index) => {
        if (
          item.email == selectedRow?.contact?.email ||
          item.fullName == selectedRow?.contact?.fullName
        ) {
          setExistedContact(item);
          found = true;
        }
      });
    } else {
      return;
    }
    if (!found) {
      vendorList?.forEach((item, index) => {
        if (
          item.email == selectedRow?.contact?.email ||
          item.fullName == selectedRow?.contact?.fullName
        ) {
          setExistedContact(item);
          found = true;
        }
      });
    } else {
      return;
    }
    if (!found) {
      relationshipList?.forEach((item, index) => {
        if (
          item.email == selectedRow?.contact?.email ||
          item.fullName == selectedRow?.contact?.fullName
        ) {
          setExistedContact(item);
          found = true;
        }
      });
    } else {
      return;
    }
    if (!found) {
      leadList?.forEach((item, index) => {
        if (
          item.email == selectedRow?.contact?.email ||
          item.fullName == selectedRow?.contact?.fullName
        ) {
          setExistedContact(item);
          found = true;
        }
      });
    } else {
      return;
    }
    if (!found) setExistedContact({});
  }, [selectedRow]);
  // ** States
  const [user, setUser] = useState({});
  const [sidebar, setSidebar] = useState(false);
  const [userSidebarRight, setUserSidebarRight] = useState(false);
  const [userSidebarLeft, setUserSidebarLeft] = useState(false);

  // ** Sidebar & overlay toggle functions
  const handleSidebar = () => setSidebar(!sidebar);
  const handleUserSidebarLeft = () => setUserSidebarLeft(!userSidebarLeft);
  const handleUserSidebarRight = () => setUserSidebarRight(!userSidebarRight);
  const handleOverlayClick = () => {
    setSidebar(false);
    setUserSidebarRight(false);
    setUserSidebarLeft(false);
  };

  // ** Set user function for Right Sidebar
  useEffect(() => {
    setUser(existedContact);
  }, []);

  // ** Get data on Mount
  useEffect(() => {
    dispatch(getChatContacts());
    dispatch(getUserProfile());
    dispatch(getTickets());
  }, [dispatch]);

  const handleUser = (obj) => setUser(obj);
  return (
    <Fragment>
      <Sidebar
        store={store}
        ticketStore={ticketStore}
        sidebar={sidebar}
        handleSidebar={handleSidebar}
        handleUserSidebarLeft={handleUserSidebarLeft}
        userSidebarLeft={userSidebarLeft}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        existedContact={existedContact}
        employeeList={employeeList}
        vendorList={vendorList}
        clientList={clientList}
        relationshipList={relationshipList}
        leadList={leadList}
      />
      <div className="content-right">
        <div className="content-wrapper">
          <div className="content-body">
            <div
              className={classnames('body-content-overlay', {
                show: userSidebarRight === true || sidebar === true || userSidebarLeft === true
              })}
              onClick={handleOverlayClick}
            ></div>
            <Chat
              store={store}
              handleUser={handleUser}
              handleSidebar={handleSidebar}
              userSidebarLeft={userSidebarLeft}
              existedContact={existedContact}
              handleUserSidebarRight={handleUserSidebarRight}
            />
            <UserProfileSidebar
              user={user}
              userSidebarRight={userSidebarRight}
              handleUserSidebarRight={handleUserSidebarRight}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AppChat;
