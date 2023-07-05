import React, { memo, useState, useEffect, useContext, useRef } from 'react';
import { Alert, CardText } from 'reactstrap';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getMessageContacts } from '../store';
import { formatDateToMonthShort, formatToShortName } from '../../../../utility/Utils';
import Avatar from '@components/avatar';
import classnames from 'classnames';
import { SocketContext } from '../../../../utility/context/Socket';
import { data } from 'jquery';

function ChatRoom() {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const { ActiveContact, messages } = useSelector((state) => state.text);
  const { userData } = useSelector((state) => state.auth);
  const [shortName, setShortName] = useState('');

  useEffect(() => {
    if (userData) {
      if (userData?.fullName) {
        const nameOrArr = String(userData?.fullName).split(' ');
        const firstPart = nameOrArr.length > 0 ? nameOrArr[0] : '';
        const lastPart = nameOrArr.length > 1 ? nameOrArr[1] : '';
        setShortName(
          `${firstPart[0].toUpperCase()} ${lastPart[0] ? lastPart[0].toUpperCase() : ''}`
        );
      }
    } //
    return () => {};
  }, [userData]);
  const [getMessages, setMessages] = useState([]);
  const [dayWiseData, setDayWiseData] = useState([]);
  const chatContainer = React.createRef(null);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [dayWiseData]);

  useEffect(() => {
    dispatch(getMessageContacts(ActiveContact?.uid));
  }, [ActiveContact]);

  useEffect(() => {
    chatContainer.current.scrollIntoView();
  }, [getMessages]);

  let scrollToBottom = () => {
    const section = document.querySelector('#last_message');
    const scroll = chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
    chatContainer.current.scrollTo(0, scroll);
    if (section) {
      section.scrollIntoView({ overscrollBehavior: 'none' });
    }
  };
  useEffect(() => {
    scrollToBottom();
  });

  useEffect(() => {
    setMessages(messages);
  }, [messages]);
  useEffect(() => {
    socket.on('incomingTextMessage', (data) => {
      if (ActiveContact?.uid === data?.clientId) {
        dispatch(getMessageContacts(ActiveContact?.uid));
      }
    });
  }, [ActiveContact]);

  const getModifiedData = () => {
    let modifiedData = [];

    if (messages?.length > 0) {
      let time = messages[0]['time'];
      let list = [moment(time).format('MM/DD/YYYY')];

      for (let message of messages) {
        if (moment(message?.time).format('MM/DD/YYYY') !== moment(time).format('MM/DD/YYYY')) {
          time = moment(message?.time).format('MM/DD/YYYY');
          list.push(time);
        }
      }

      let uniqueChars = [...new Set(list)];

      for (var date of uniqueChars) {
        const filteredData = messages.filter(
          (item) => date === moment(item?.time).format('MM/DD/YYYY')
        );

        modifiedData.push({ time: date, messages: filteredData });
      }
    }

    setDayWiseData(modifiedData);
  };

  useEffect(() => {
    getModifiedData();
  }, [messages]);

  return (
    <div
      style={{
        overflowY: 'scroll',
        overflowX: 'hidden'
      }}
      id={'chats'}
      className="chats"
    >
      <div>
        <div ref={scrollRef} className="chatsMsg">
          {ActiveContact &&
            messages.length > 0 &&
            dayWiseData?.map((chat, index) => {
              //const time = formatDateToMonthShort(chat ? chat.createdAt : new Date());
              return (
                <div
                  key={index}
                  className={classnames('chat', {
                    'chat-right': true
                  })}
                >
                  <div className="chat-body">
                    {chat.messages.map((chat) => {
                      return (
                        <div
                          key={chat._id}
                          className={chat.isSent === true ? 'chat-content' : 'chat-left'}
                        >
                          <div
                            className={chat.isSent !== true ? 'clientChat' : 'userChatStyle'}
                            style={{
                              // width: '100%',
                              display: 'flex',
                              flexDirection: 'column'
                              // alignItems: 'flex-end'
                            }}
                          >
                            {chat.isSent === false ? (
                              <div className="chat-avatar" style={{ paddingBottom: '10px' }}>
                                {ActiveContact.photo ? (
                                  <Avatar
                                    imgWidth={36}
                                    imgHeight={36}
                                    className="box-shadow-1 cursor-pointer"
                                    img={ActiveContact.photo || null}
                                    status="online"
                                    color="primary"
                                  />
                                ) : (
                                  <Avatar
                                    imgWidth={36}
                                    imgHeight={36}
                                    className="box-shadow-1 cursor-pointer"
                                    status="online"
                                    color="primary"
                                    content={formatToShortName(ActiveContact.fullName || '')}
                                  />
                                )}
                              </div>
                            ) : (
                              <div style={{ paddingBottom: '10px' }}>
                                <Avatar
                                  // img={userAvatar}
                                  imgWidth={36}
                                  imgHeight={36}
                                  className="box-shadow-1 cursor-pointer"
                                  status="online"
                                  color="primary"
                                  content={shortName || 'N/A'}
                                />
                              </div>
                            )}
                            <p className={chat.isSent === true ? 'chatContainerStyle' : 'chatss'}>
                              {chat.textContent}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div ref={chatContainer} id={'last_message'} />
    </div>
  );
}

export default memo(ChatRoom);
