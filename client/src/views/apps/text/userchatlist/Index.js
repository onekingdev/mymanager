import React, { memo, useEffect, useState, useContext } from 'react';
import { Badge, CardText, ListGroup } from 'reactstrap';
// ** Custom Components
import Avatar from '@components/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { activeTextContacts } from '../store';
import { SocketContext } from '../../../../utility/context/Socket';
import { getTextContacts } from '../../../apps/text/store';
import { getToastMessage } from '../../../marketing/text/store';
import {
  formatDate,
  formatToShortName,
  formatMinToHourShort,
  isToday,
  isYesterday,
  dayOfWeekAsString,
  isDateInThisWeek
} from '../../../../utility/Utils';
import "../../../../assets/scss/style.css"


function UserChatList({ query, filteredContacts, store }) {
  const dispatch = useDispatch();
  const { contacts } = store;
  const [arrayOne, setArrayOne] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on('incomingTextMessage', (data) => {
      dispatch(getTextContacts());
    });
  }, []);

  useEffect(() => {
    setArrayOne([]);
    contacts.map((item) => {
      if (item.unReadMessages === 0) {
        setArrayOne((arrayOne) => [...arrayOne, false]);
      } else {
        setArrayOne((arrayOne) => [...arrayOne, true]);
      }
    });
  }, [contacts]);

  useEffect(() => {
    contacts.map((contact, index) => {
      if (contact.unReadMessages !== 0) {
      }
    });
  }, [contacts]);

  const UserChatActivity = async (event, Info, index) => {
    dispatch(activeTextContacts(Info));
  };
  const updateArray = (id, index) => {
    setSelectedItem(id);
    const newArray = [...arrayOne];
    newArray[index] = false;
    setArrayOne(newArray);
  };
  if (contacts && contacts.length) {
    if (query.length && !filteredContacts.length) {
      return (
        <div className="no-results show">
          <h6 className="mb-0">No Chats Found</h6>
        </div>
      );
    } else {
      const arrToMap = query.length && filteredContacts.length ? filteredContacts : contacts;

      return arrToMap.map((item, index) => {
        let time = '';
        //const time = formatDateToMonthShort(item.lastMessage?.createdAt || new Date());
        const date = new Date(
          item.lastMessage?.createdAt ? item.lastMessage?.createdAt : '12/30/1800'
        );
        if (isToday(date)) {
          time = 'Today';
        } else if (isYesterday(date)) {
          time = 'Yesterday';
        } else if (isDateInThisWeek(date)) {
          time = dayOfWeekAsString(date.getDay());
        } else if (date.getFullYear() == 1800) {
          time = '';
        } else {
          time = formatDate(date);
        }

        return (
          <>
            <ListGroup className="p-0" style={{ marginTop: '10px' }}>
              <div
                key={item.fullName}
                className={`w-100 p-1 gap-1 d-flex align-items-center ${
                  selectedItem === item._id ? 'chatSelect' : 'chatHover'
                } ${arrayOne[index] === true ? 'unread-active' : ''}`}
                onClick={(event) => {
                  UserChatActivity(event, {
                    fullName: item?.fullName,
                    email: item?.email,
                    uid: item?._id,
                    phone: item?.phone
                  });
                  updateArray(item._id, index);
                }}
              >
                {item.photo ? (
                  <Avatar img={item.photo} imgHeight="32" imgWidth="32" status="online" />
                ) : (
                  <Avatar
                    color="primary"
                    imgHeight="32"
                    imgWidth="32"
                    status="online"
                    content={item.fullName.charAt(0).toUpperCase() || 'N/A'}
                  />
                )}
                <div className="chat-info flex-grow-1 width-40-per">
                  <h5 className="mb-0">{item.fullName ? item.fullName : item.phone}</h5>
                  <CardText className="text-truncate">{item.lastMessage?.textContent}</CardText>
                </div>
                <div className="chat-meta text-nowrap d-flex flex-column">
                  <div>
                    <small
                      className={`float-end mb-25 chat-time ms-25 ${
                        selectedItem === item._id ? 'selectedTimeColor' : ''
                      } ${arrayOne[index] === true ? 'timeStyle' : ''}`}
                    >
                      {time}
                    </small>
                  </div>
                  <div>
                    {arrayOne[index] === true ? (
                      <Badge className="float-end" color="success" pill>
                        {item.unReadMessages}
                      </Badge>
                    ) : null}
                  </div>
                </div>
              </div>
            </ListGroup>
          </>
        );
      });
    }
  } else {
    return null;
  }
}

export default memo(UserChatList);
