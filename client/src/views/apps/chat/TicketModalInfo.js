// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react';

// ** Third Party Components
import { ArrowLeft, ArrowRight, Check, X } from 'react-feather';
import Flatpickr from 'react-flatpickr';
import { Editor } from 'react-draft-wysiwyg';
import Select, { components } from 'react-select';
import { convertToRaw, EditorState, ContentState, convertFromRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

import { FaUsers } from 'react-icons/fa';
// ** Utils
import { selectThemeColors } from '@utils';

// ** Assignee Avatars
import Avatar from '@components/avatar';

// ** Styles Imports
import '@styles/react/libs/editor/editor.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/libs/react-select/_react-select.scss';

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';

// ** Redux Action Imports]
import { createTicket, getTickets } from '../ticket/store';
import { getUserData } from '../../../utility/Utils';
import { useSelector } from 'react-redux';
import { useGetAllEmployees } from '../../../requests/contacts/employee-contacts';
import { object } from 'prop-types';

const TicketModalInfo = ({ store, dispatch, setIsCreateTicketModalOpen, selectedTicket }) => {
  const { selectedUser } = store;
  // get employees data from db
  const [employeeArr, setEmployeeArr] = useState([]);
  const employeeStore = useSelector((state) => state.employeeContact);
  const employeeList = employeeStore?.employeeList?.data?.list;

  useEffect(() => {
    let tmp = [];
    tmp = employeeList?.map((item, index) => {
      return {
        employee: item,
        label: item.fullName,
        value: item.fullName
      };
    });
    setEmployeeArr(tmp);
  }, [employeeList]);

  const [assignee, setAssignee] = useState({
    value: '',
    label: 'Select one...'
  });

  const [ticketName, setTicketName] = useState('');
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');

  useEffect(() => {
    setReqName(selectedTicket?.contact?.fullName);
    setReqEmail(selectedTicket?.contact?.email);
  }, [selectedTicket]);

  // Set Message Type
  const [isMessageAll, setIsMessageAll] = useState(false);
  const setMessageType = () => {
    setIsMessageAll(!isMessageAll);
  };

  const [priority, setPriority] = useState('medium');
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // ** Priority Select Options
  const priorityOptions = [
    { value: 'low', label: 'Row' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  // ** Tag Select Options
  const tagOptions = [
    { value: 'Customer', label: 'Customer' },
    { value: 'Company', label: 'Company' },
    { value: 'personal', label: 'Personal' },
    { value: 'other', label: 'Other' }
  ];

  // ** Custom Assignee Component
  const AssigneeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          {data?.employee.photo ? (
            <Avatar img={data.employee.photo} width="32" height="32" />
          ) : (
            <Avatar color={'primary'} content={data.employee.fullName || 'John Doe'} initials />
          )}
          <p className="mb-0 ms-75">{data.employee.fullName}</p>
        </div>
      </components.Option>
    );
  };

  const formattedChatData = () => {
    let chatLog = [];
    if (selectedUser.messages) {
      chatLog = selectedUser.messages;
    }
    const formattedChatLog = [];
    let chatMessageType = chatLog[0] ? chatLog[0].type : undefined;
    let msgGroup = {
      senderId: chatMessageType,
      messages: []
    };
    chatLog.forEach((msg, index) => {
      if (chatMessageType === msg.type) {
        msgGroup.messages.push({
          msg: msg.msg,
          time: msg.createdAt
        });
      } else {
        chatMessageType = msg.type;
        formattedChatLog.push(msgGroup);
        msgGroup = {
          sender: msg.type,
          messages: [
            {
              msg: msg.msg,
              time: msg.createdAt
            }
          ]
        };
      }
      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup);
    });
    return formattedChatLog;
  };

  // ** Messages to Html
  let messageData = formattedChatData(),
    html = [];
  messageData.forEach((item, index) => {
    item.messages.forEach((item1, index1) => {
      if (item.sender == 'customerMessage' && item1.msg) {
        html.push(`<div>Customer*: ${item1.msg}</div>`);
      } else if (item.sender == 'adminMessage' && item1.msg) {
        html.push(`<div>Support*: ${item1.msg}</div>`);
      }
    });
  });
  const blocksFromHtml = htmlToDraft(html.join(''));
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  const editorState = EditorState.createWithContent(contentState);

  const [desc, setDesc] = useState(editorState);

  // ** Create Button Click Handler
  const handleCreateTicket = (e) => {
    e.preventDefault();
    let description = '',
      data,
      tmpMessages = [];
    if (!isMessageAll) {
      messageData[messageData.length - 1].messages.forEach((item, index) => {
        tmpMessages.push({
          sender: messageData[messageData.length - 1].sender,
          msg: messageData[messageData.length - 1].messages[
            messageData[messageData.length - 1].messages.length - 1
          ].msg
        });
      });
      data = dispatch(
        createTicket({
          userId: getUserData().id,
          ticketName,
          reqName,
          reqEmail,
          assignee: assignee.label,
          isClosed: true,
          status: 'open',
          priority: priority.value,
          messages: tmpMessages
        })
      );
    } else {
      messageData.forEach((item, index) => {
        item.messages.forEach((item1, index1) => {
          if (item.senderId) {
            tmpMessages.push({
              sender: item.senderId,
              msg: item1.msg
            });
          } else {
            tmpMessages.push({
              sender: item.sender,
              msg: item1.msg
            });
          }
        });
      });
      data = dispatch(
        createTicket({
          userId: getUserData().id,
          ticketName,
          reqName,
          reqEmail,
          assignee: assignee.label,
          isClosed: true,
          status: 'open',
          priority: priority.value,
          messages: tmpMessages
        })
      );
    }
    data.then((result) => {
      if (result.payload.success == false) {
        toast.error('Ticket creation failed');
      } else {
        toast.success('Ticket created successfully');
      }
      setIsCreateTicketModalOpen(false);
    });
  };
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Ticket Info</h5>
        <small>Enter New Ticket Info.</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="task-title">
              Title <span className="text-danger">*</span>
            </Label>
            <Input
              id="task-title"
              placeholder="Title"
              className="new-todo-item-title"
              value={ticketName}
              onChange={(e) => setTicketName(e.target.value)}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="task-assignee">
              Assignee
            </Label>
            <Select
              id="task-assignee"
              className="react-select zindex-4"
              classNamePrefix="select"
              isClearable={false}
              options={employeeArr}
              theme={selectThemeColors}
              // formatOptionLabel={item => (<div className="d-flex align-items-center">
              //     {item?.employee?.photo ?
              //         <Avatar
              //             img={item.employee.photo}
              //             width="32"
              //             height="32"
              //         />
              //         :
              //         <Avatar
              //             color={'primary'}
              //             content={item?.employee?.fullName || 'John Doe'}
              //             initials
              //         />
              //     }
              //     <p className="mb-0 ms-75">{item?.employee?.fullName}</p>
              // </div>)}
              value={assignee}
              onChange={(data) => setAssignee(data !== null ? data : null)}
              components={{ Option: AssigneeComponent }}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="task-title">
              Requester Name<span className="text-danger">*</span>
            </Label>
            <Input
              id="req-name"
              placeholder="Requester Name"
              className="new-todo-item-title"
              value={reqName}
              disabled={selectedTicket ? true : false}
              onChange={(e) => setReqName(e.target.value)}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="task-title">
              Requester Email <span className="text-danger">*</span>
            </Label>
            <Input
              id="req-email"
              placeholder="Requester Email"
              className="new-todo-item-title"
              value={reqEmail}
              disabled={selectedTicket ? true : false}
              onChange={(e) => setReqEmail(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="due-date">
              Start Date
            </Label>
            <Flatpickr
              id="due-date"
              name="due-date"
              className="form-control"
              onChange={(date) => setStartDate(date[0])}
              value={startDate}
              options={{ dateFormat: 'Y-m-d' }}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="due-date">
              End Date
            </Label>
            <Flatpickr
              id="due-date"
              name="due-date"
              className="form-control"
              onChange={(date) => setEndDate(date[0])}
              value={endDate}
              options={{ dateFormat: 'Y-m-d' }}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="task-tags">
              Tags
            </Label>
            <Select
              isMulti
              id="task-tags"
              className="react-select zindex-3"
              classNamePrefix="select"
              isClearable={false}
              options={tagOptions}
              theme={selectThemeColors}
              value={tags}
              onChange={(data) => {
                setTags(data !== null ? [...data] : []);
              }}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="task-assignee">
              Priority
            </Label>
            <Select
              id="task-priority"
              className="react-select zindex-2"
              classNamePrefix="select"
              isClearable={false}
              options={priorityOptions}
              theme={selectThemeColors}
              value={priority}
              onChange={(data) => setPriority(data)}
              // components={{ Option: AssigneeComponent }}
            />
          </Col>
        </Row>
        <Row className="position-relative">
          <Col sm="12">
            <Label for="task-desc" className="form-label">
              Description
            </Label>
            <Editor
              editorState={desc}
              wrapperClassName="toolbar-bottom"
              readOnly={selectedTicket?.messages ? true : false}
              toolbar={{
                options: ['inline', 'textAlign'],
                inline: {
                  inDropdown: false,
                  options: ['bold', 'italic', 'underline']
                }
              }}
              onEditorStateChange={(data) => setDesc(data)}
            />
          </Col>
          <Col className="mt-1">
            <Input type="checkbox" onChange={setMessageType} />
            <label className="ms-75">Save all messages</label>
          </Col>
        </Row>
        <div className="d-flex justify-content-between mt-2">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => {
              setIsCreateTicketModalOpen(false);
            }}
          >
            <X size={14} className="align-middle me-sm-25 me-0"></X>
            <span className="align-middle d-sm-inline-block d-none">Cancel</span>
          </Button>
          <Button color="primary" className="btn-next" onClick={(e) => handleCreateTicket(e)}>
            <span className="align-middle d-sm-inline-block d-none">Ok</span>
            <Check size={14} className="align-middle ms-sm-25 ms-0"></Check>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default TicketModalInfo;
