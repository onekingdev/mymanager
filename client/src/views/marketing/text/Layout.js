import React, { memo, useState, useEffect, useContext } from 'react';
import { Card } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
const ProfileAvatar = React.lazy(() => import('../../apps/text/Profile'));
const UserChatList = React.lazy(() => import('../../apps/text/userchatlist/Index'));
const RenderChats = React.lazy(() => import('../../apps/text/renderChats/Index'));
const ChatRoomHeader = React.lazy(() => import('./chatroomHeader'));
const ChatRoom = React.lazy(() => import('./chartroom/index'));
const MessageInput = React.lazy(() => import('./MessageServes/index'));
// ** Third Party Components
import msgImg from '../../../assets/images/messages/unselect_msg.png';
import SidebarHeader from './SidebarHeader';
import { selectChat } from './store';
import { SocketContext } from '../../../utility/context/Socket';
import { getTextContacts } from '../../apps/text/store';

import { isObjEmpty } from '@utils';

function Layout() {
  const dispatch = useDispatch();
  const [studentType, setStudentType] = useState('');
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sidebar, setSidebar] = useState(false);
  const [filteredChat, setFilteredChat] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [active, setActive] = useState(0);
  const { userData } = useSelector((state) => state.auth);
  const store = useSelector((state) => state.text);
  const { chats, contacts } = store;
  const socket = useContext(SocketContext);

  const handleSidebar = () => setSidebar(!sidebar);

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
                onClick={(e) => handleUserClick(e, item)}
                onContextMenu={(e) => menuShow(item, e)}
                className="chat-sidebar-link"
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
  // ** Handles User Chat Click
  const handleUserClick = (id) => {
    dispatch(selectChat(id));
    setActive(id);
    if (sidebar === true) {
      handleSidebar();
    }
  };

  useEffect(() => {
    if (!isObjEmpty(store.selectedUser)) {
      if (store.selectedUser.chat) {
        setActive(store?.selectedUser?.chat?.id);
      } else {
        setActive(store?.selectedUser?.contact?.id);
      }
    }
  }, []);

  const handleEventType = async (e) => {
    let { value } = e;
    await setLoading(true);
    await setStudentType(value);
    await setLoading(false);
  };

  const handleFilter = (e) => {
    setQuery(e.target.value);
    const searchFilterFunction = (contact) =>
      contact.fullName.toLowerCase().includes(e.target.value.toLowerCase());
    const filteredChatsArr = chats.filter(searchFilterFunction);
    const filteredContactssArr = contacts.filter(searchFilterFunction);
    setFilteredChat([...filteredChatsArr]);
    setFilteredContacts([...filteredContactssArr]);
  };
  // its dummy variable
  let chatTextListIndex = 'dummy data';
  return (
    <div className="d-flex w-100">
      <div style={{ width: '360px' }} className="">
        <Card
          className="shadow-sm sidebar-content marketing-chat-user"
          style={{ height: '73.5vh' }}
        >
          <SidebarHeader
            userData={userData}
            store={store}
            handleFilter={handleFilter}
            query={query}
          />
          <PerfectScrollbar
            className="chat-user-list-wrapper list-group"
            options={{ wheelPropagation: false }}
          >
            <div
              className="chat-user-list-wrapper list-group p-1"
              options={{ wheelPropagation: false }}
            >
              <h4 className="text-primary mt-1">Chats</h4>
              <ul className="chat-users-list chat-list media-list">{renderChats()}</ul>
              <RenderChats
                store={store}
                query={query}
                handleUserClick={handleUserClick}
                active={active}
                // data={data}
              />
              <ProfileAvatar studentType={studentType} handleEventType={handleEventType} />
              <UserChatList
                className="chat-users-list contact-list media-list"
                loading={loading}
                setLoading={setLoading}
                studentType={studentType}
                store={store}
                query={query}
                filteredContacts={filteredContacts}
              />
            </div>
          </PerfectScrollbar>
        </Card>
      </div>
      <div className="vr" style={{ opacity: 0.3 }} />
      {chatTextListIndex === null ? (
        <div style={{ width: '73.5%' }}>
          <Card style={{ backgroundColor: '#FAFBFF' }} className="rounded-0 shadow-sm">
            <div
              style={{
                position: 'relative',
                overflow: 'auto',
                height: '60vh',
                justifyContent: 'center',
                display: 'flex'
              }}
              className="w-100"
            >
              <img src={msgImg} alt="logo" className="mr-1" />
            </div>
          </Card>
        </div>
      ) : (
        <div style={{ width: '100%' }}>
          <ChatRoomHeader />
          <Card className="rounded-0 mb-0">
            <PerfectScrollbar
              className="user-texts bg-light chat-app-window"
              options={{ wheelPropagation: false }}
              style={{ height: '65vh' }}
            >
              <div
                style={{
                  position: 'relative'
                }}
              >
                <ChatRoom />
              </div>
            </PerfectScrollbar>
            <MessageInput />
          </Card>
        </div>
      )}
    </div>
  );
}

export default memo(Layout);
