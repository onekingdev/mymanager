import React, { memo, useState, useEffect, useContext, useRef } from 'react';
import { Alert, CardText } from 'reactstrap';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getMessageContacts } from '../store';
import {
  formatDateToMonthShort,
  formatToShortName,
  formatMinToHourShort,
  isToday,
  isYesterday,
  dayOfWeekAsString,
  isDateInThisWeek
} from '../../../../utility/Utils';
import Avatar from '@components/avatar';
import classnames from 'classnames';
import { SocketContext } from '../../../../utility/context/Socket';
import { FaUserCircle } from 'react-icons/fa';

function ChatRoom() {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const { ActiveContact, messages } = useSelector((state) => state.text);

  const [getMessages, setMessages] = useState([]);
  const [dayWiseData, setDayWiseData] = useState([]);
  const chatContainer = React.createRef(null);
  const [shortName, setShortName] = useState('');
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMessageContacts(ActiveContact?.uid));
    localStorage.setItem('ActiveId', ActiveContact?.uid);
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

  useEffect(() => {
    setMessages(messages);
  }, [messages]);
  useEffect(() => {
    socket.on('incomingTextMessage', (data) => {
      const ActiveId = localStorage.getItem('ActiveId');
      if (ActiveId === data?.clientId) {
        dispatch(getMessageContacts(ActiveId));
      }
    });
  }, []);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [dayWiseData]);
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
    <div id={'chats'} className="chats">
      <div ref={scrollRef}>
        <div style={{ width: '300px' }} className="bg-white rounded-3 p-2 mx-auto mt-5 mb-4">
          <FaUserCircle
            color="#7367f0"
            size="35"
            className="mx-auto d-block"
            style={{ marginTop: '-40px' }}
          />
          <div>
            <span className="d-block mt-2 mb-1">Name: {ActiveContact.fullName}</span>
            <span className="d-block">Email: {ActiveContact.email}</span>
          </div>
        </div>
        {ActiveContact &&
          messages.length > 0 &&
          dayWiseData?.map((chat, index) => {
            let oldWeekDay = '',
              newWeekDay = '';
            const date = new Date(chat.messages ? chat.time : Date.now());
            if (isToday(date)) {
              newWeekDay = 'Today';
            } else if (isYesterday(date)) {
              newWeekDay = 'Yesterday';
            } else if (isDateInThisWeek(date)) {
              newWeekDay = dayOfWeekAsString(date.getDay());
            } else {
              newWeekDay = formatDateToMonthShort(date);
            }

            return (
              <>
                {newWeekDay ? (
                  <div className="position-relative d-flex overflow-hidden align-items-center justify-content-center my-1">
                    <div
                      className="position-relative d-flex flex-grow-1 flex-shrink-1 overflow-hidden align-items: stretch m-25 ms-2"
                      style={{
                        height: '1px',
                        opacity: '0.4',
                        backgroundColor: 'rgb(138, 141, 145)'
                      }}
                    />
                    <p className="mx-25 mb-0">{newWeekDay}</p>
                    <div
                      className="position-relative d-flex flex-grow-1 flex-shrink-1 overflow-hidden align-items: stretch m-25 me-2"
                      style={{
                        height: '1px',
                        opacity: '0.4',
                        backgroundColor: 'rgb(138, 141, 145)'
                      }}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div
                  key={index}
                  className={classnames('chat chat-text', {
                    'chat-right': true
                  })}
                >
                  <div className="chat-body">
                    {chat.messages.map((message, index) => {
                      let displayCondition = true;
                      index > 0 &&
                      chat.messages[index].time.split(',')[1].slice(0, 6) ==
                        chat.messages[index - 1].time.split(',')[1].slice(0, 6) &&
                      chat.messages[index].isSent == chat.messages[index - 1].isSent
                        ? (displayCondition = false)
                        : (displayCondition = true);
                      return (
                        <div
                          key={message._id}
                          className={message.isSent === true ? 'chat py-50' : 'chat-left m-0 py-50'}
                        >
                          <div>
                            {message.isSent === false ? (
                              <div className="chat-avatar">
                                {ActiveContact.photo
                                  ? displayCondition && (
                                      <Avatar
                                        imgWidth={36}
                                        imgHeight={36}
                                        className="box-shadow-1 cursor-pointer"
                                        img={ActiveContact.photo || null}
                                        status="online"
                                        color="primary"
                                      />
                                    )
                                  : displayCondition && (
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
                              displayCondition && (
                                <div className="chat-avatar">
                                  <Avatar
                                    imgWidth={36}
                                    imgHeight={36}
                                    className="box-shadow-1 cursor-pointer"
                                    status="online"
                                    color="primary"
                                    content={shortName || 'N/A'}
                                  />
                                </div>
                              )
                            )}
                            <div
                              className="chat-body"
                              style={displayCondition ? {} : { paddingLeft: '32px' }}
                            >
                              {displayCondition && (
                                <div className="chat-time">
                                  <small>{formatMinToHourShort(message.time)}</small>
                                </div>
                              )}
                              <div
                                className="chat-content"
                                style={displayCondition ? {} : { marginBottom: '0px' }}
                              >
                                <p>{message.textContent}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}
      </div>
      <div ref={chatContainer} id={'last_message'} />
    </div>
  );
}

export default memo(ChatRoom);
