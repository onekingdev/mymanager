import React, { createContext, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketio from 'socket.io-client';
import moment from 'moment';

import Avatar from '@components/avatar';
import { Coffee, UploadCloud } from 'react-feather';

import { toast, Slide } from 'react-toastify';
import { getUserData, isUserLoggedIn } from '../Utils';
import { workingTaskListAction } from '../../views/tasks/task-reporting/store/action';
import { selectChat, getChatContacts } from '../../views/apps/chat/store';
import { getToastMessage } from '../../views/marketing/text/store';
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png';
const SOCKET_URL = process.env.REACT_APP_API.slice(0, -1);

const SocketContext = createContext();

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title fw-bold">Hi, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        You have successfully logged in as an {role} user to My Manager. Now you can start to
        explore. Enjoy!
      </span>
    </div>
  </Fragment>
);

// ** Email Receive Toast Content
const EmailReceiveToastConent = (props) => {
  return (
    <Fragment className="p-1">
      <div className="toastify-header text-left">
        <div className="title-wrapper flex items-center">
          {props.photo ? (
            <Avatar img={props.photo} width="64" height="64" className="mr-3" />
          ) : (
            <Avatar
              img={defaultAvatar}
              color={'primary'}
              content={props.name || 'John Doe'}
              className="mr-3"
              imgWidth="64"
              imgHeight="64"
              initials
            />
          )}
          <div className="toastify-body ps-1">
            <h6 className="toast-title fw-bold mb-1 leading-none ms-0">{props.name}</h6>
            <h6 className="toast-message toast-line-clamp-1 mb-1">{props.message}</h6>
            <h6 className="text-xs text-nowrap font-small-1">*Google Chrome*-mymanager.com</h6>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const TextReceiveToastConent = (props) => {
  return (
    <Fragment className="p-1">
      <div className="toastify-header text-left">
        <div className="title-wrapper flex items-center">
          {props.photo ? (
            <Avatar img={props.photo} width="64" height="64" className="mr-3" />
          ) : (
            <Avatar
              img={defaultAvatar}
              color={'primary'}
              content={props.name || 'John Doe'}
              className="mr-3"
              imgWidth="64"
              imgHeight="64"
              initials
            />
          )}
          <div className="toastify-body ps-1">
            <h6 className="toast-title fw-bold mb-1 leading-none ms-0">INCOMING TEXT</h6>
            <h6 className="toast-message toast-line-clamp-1 mb-1">{props.message}</h6>
            <h6 className="text-xs text-nowrap font-small-1">From {props.name}</h6>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UploadProofContent = ({ taskName, subTaskName, proofType, endDate, employeeInfo, photo }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<UploadCloud size={16} />} />
        <h6 className="toast-title fw-bold">Welcome, {getUserData().fullName}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        <b>{employeeInfo.fullName}</b> has uploaded the {proofType} for the{' '}
        <strong>
          {taskName} / {subTaskName}
        </strong>
        .
        <br />
        Please check the task.
      </span>
      <div style={{ width: '100%' }}>
        <img
          src={photo}
          width="200px"
          style={{
            display: 'block',
            alignContent: 'center',
            borderRadius: '5px',
            marginTop: '20px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        />
      </div>
    </div>
  </Fragment>
);

const NewTaskCreated = ({ taskName, startDate, endDate, employerInfo }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<UploadCloud size={16} />} />
        <h6 className="toast-title fw-bold">Welcome, {getUserData().fullName}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        <b>{employerInfo.fullName}</b> created new task <strong>{taskName}</strong> for you.
        <br />
        Please check the task.
      </span>
    </div>
  </Fragment>
);

const CompleteTaskContent = ({ taskName, endDate, fullName }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title fw-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        <b>{fullName}</b> has completed all tasks for <strong>{taskName}</strong> at{' '}
        {moment(endDate).format('MMMM Do YYYY, h:mm:ss A')}.
        <br />
        Please check the task.
      </span>
    </div>
  </Fragment>
);

const InCompleteContent = ({ taskName, endTime, employeeInfo }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title fw-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        <b>{employeeInfo.fullName}</b> didn't have completed the task-
        <strong>{taskName}</strong>
        at {endTime}. Please check the task.
        <br />
      </span>
    </div>
  </Fragment>
);

const NewEmailToastContent = ({ name, message }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title fw-bold">{name} replied to ticket</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>{message}</span>
    </div>
  </Fragment>
);

const socket = socketio(SOCKET_URL);
// const socket = socketio('http://localhost:5000/api');

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  const store = useSelector((state) => state.chat);
  const selectedUser = store.selectedUser;

  const options = {
    sort: 1,
    sortByDate: false
  };

  useEffect(() => {
    socket.onAny((eventName, data) => {
      switch (eventName) {
        case 'adminMsgRev':
          if (selectedUser._id == data.channelId) {
            dispatch(selectChat(selectedUser._id));
          }
          dispatch(getChatContacts());
          break;
        case 'clientMsgRev':
          if (selectedUser._id == data.channelId) {
            toast.info(
              <EmailReceiveToastConent
                name={
                  selectedUser?.contactId?.fullName
                    ? selectedUser?.contactId?.fullName
                    : selectedUser.contactId?.email
                }
                message={data.msg}
              />,
              {
                autoClose: 2000,
                icon: false
              }
            );
            dispatch(getChatContacts());
          }

          break;
        case 'startChat':
          dispatch(getChatContacts());
        case 'incomingTextMessage':
          const promiseToastMessage = dispatch(getToastMessage(data.clientId));
          promiseToastMessage.then((result) => {
            toast.info(
              <TextReceiveToastConent
                name={result?.payload?.email ? result?.payload?.email : ''}
                message={result?.payload?.textContent}
              />,
              {
                autoClose: 2000,
                icon: false
              }
            );
          });
      }
    });
    return () => {
      socket.off('adminMsgRev');
      socket.off('startChat');
      socket.off('clientMsgRev');
    };
  }, [selectedUser]);

  useEffect(() => {
    socket.connect();
    socket.on('ready-client', () => {
      if (isUserLoggedIn()) socket.emit('adminRegister', getUserData().id);
    });

    socket.on('newEmail', ({ reqName, message }) => {
      toast.info(<NewEmailToastContent />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 20000,
        position: 'bottom-right'
      });
    });

    socket.on('startChat', (data) => {
      toast.success(
        <ToastContent
          name={data.fullName || data.username || 'John Doe'}
          role={data.role || 'admin'}
        />,
        {
          icon: false,
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
          position: 'bottom-right'
        }
      );
    });

    // Task Reporting Notification
    socket.on('receiveWorkProof', (data) => {
      const { taskName, subTaskName, photo, proofType, startDate, endDate, employeeInfo } = data;
      toast.success(
        <UploadProofContent
          taskName={taskName}
          subTaskName={subTaskName}
          proofType={proofType}
          startDate={startDate}
          endDate={endDate}
          employeeInfo={employeeInfo}
          photo={photo}
        />,
        {
          icon: false,
          hideProgressBar: true,
          transition: Slide,
          autoClose: 4000,
          position: 'top-right'
        }
      );
    });

    // Task Submit
    socket.on('completeTask', (data) => {
      toast.success(
        <CompleteTaskContent
          taskName={data.taskName}
          endDate={data.endDate}
          fullName={data.assignee.label}
        />,
        {
          icon: false,
          hideProgressBar: true,
          transition: Slide,
          autoClose: 4000,
          position: 'top-right'
        }
      );
    });

    socket.on('newTask', (data) => {
      const { taskName, startDate, endDate, employerInfo } = data;
      dispatch(workingTaskListAction(options));
      toast.success(
        <NewTaskCreated
          taskName={taskName}
          startDate={startDate}
          endDate={endDate}
          employerInfo={employerInfo}
        />,
        {
          icon: false,
          hideProgressBar: true,
          transition: Slide,
          autoClose: 4000,
          position: 'top-right'
        }
      );
    });
    return () => {
      socket.off('startChat');
      socket.off('ready-client');
      socket.off('newEmail');
      socket.off('receiveWorkProof');
      socket.off('completeTask');
      socket.off('newTask');
      // socket.off('refreshTask');
    };
  }, [socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketProvider, SocketContext };
