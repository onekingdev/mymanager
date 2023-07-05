import React from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import InputSurya from '../../../../../../../src/views/apps/text/MessageServes';
import { TbUserCircle } from 'react-icons/tb';
import {
  Button,
  Card,
  CardBody,
  // CardSubtitle,
  CardTitle,
  Form,
  FormGroup,
  FormText,
  Input,
  // Label,
  // CardText,
  Row,
  Col,
  // CardFooter,
  InputGroup,
  InputGroupText
} from 'reactstrap';
import { BiDislike, BiDotsHorizontalRounded, BiLike } from 'react-icons/bi';
import { VscChromeMinimize } from 'react-icons/vsc';
import '@styles/base/pages/app-chat-list.scss';

function ChatBoxLive(props) {
  const { smooth, modern, bar, bubble, theme, themeColor, align, sideSpacing, bottomSpacing } =
    props;

  return (
    <>
      <Card
        className="mt-2 ms-1 me-1 rounded"
        style={{
          backgroundColor: theme ? '#d2d1d7' : '#1f2937'
        }}
      >
        <CardTitle
          tag="h5"
          className="p-1 rounded-top text-light mb-0"
          style={{
            borderBottom: `1px solid ${themeColor ? themeColor : '#1565C0'}`,
            backgroundColor: themeColor ? themeColor : '#1565C0'
          }}
        >
          <div
            className="d-flex justify-content-between"
            style={{ color: theme ? '#ffffffd9' : '#fff' }}
          >
            <div>
              <BiDotsHorizontalRounded size="20" />
            </div>
            <div>
              <span>Chat With Us</span>
            </div>
            <div>
              <VscChromeMinimize size="20" />
            </div>
          </div>
        </CardTitle>
        <CardBody className="shadow-lg p-1 d-flex align-content-between position-relative flex-wrap chat-app-window">
          <div className="chats">
            <div class="chat chat-left align-items-center m-0">
              <div class="chat-avatar me-75">
                <div
                  class="avatar box-shadow-1 cursor-pointer"
                  style={{ backgroundColor: themeColor ? themeColor : '#1565C0' }}
                >
                  <span class="avatar-content">T </span>
                </div>
              </div>
              <div class="chat-body">
                <div class="chat-time">
                  <small>9:30 AM</small>
                </div>
                <div class="chat-content">
                  <p className="mb-0">hello support</p>
                </div>
              </div>
            </div>
            <div class="chat">
              <div class="chat-avatar">
                <div class="avatar box-shadow-1 cursor-pointer bg-primary">
                  <span
                    class="avatar-content"
                    style={{ backgroundColor: themeColor ? themeColor : '#1565C0' }}
                  >
                    X L
                  </span>
                </div>
              </div>
              <div class="chat-body">
                <div class="chat-time">
                  <small>9:43 AM</small>
                </div>
                <div
                  class="chat-content"
                  style={{
                    backgroundColor: themeColor ? themeColor : '#1565C0',
                    backgroundImage: 'none'
                  }}
                >
                  <p>What is your main problem?</p>
                </div>
              </div>
            </div>
          </div>
          <InputGroup
            className={
              (align == 'center' ? 'mx-auto' : align == 'end' ? 'ms-auto' : 'mr-auto') +
              ` mt-3 w-75`
            }
            style={
              align == 'left'
                ? { marginLeft: sideSpacing + 'px', marginBottom: bottomSpacing + 'px' }
                : align == 'end'
                ? { marginRight: sideSpacing + 'px', marginBottom: bottomSpacing + 'px' }
                : null
            }
          >
            <Input placeholder=" Write a message..." className="p-1 d-flex" />
            <InputGroupText>
              {' '}
              <AiOutlineSend />
            </InputGroupText>
          </InputGroup>
        </CardBody>
        <div
          className="p-1 rounded-bottom fs-6 text-center lh-sm fw-light"
          style={{
            borderTop: `1px solid ${themeColor ? themeColor : '#1565C0'}`,
            backgroundColor: themeColor ? themeColor : '#1565C0'
          }}
        >
          <span style={{ color: theme ? '#ffffffd9' : '#fff' }} className="py-25 d-block">
            Powered By mymanager.com
          </span>
        </div>
      </Card>
    </>
  );
}

export default ChatBoxLive;
