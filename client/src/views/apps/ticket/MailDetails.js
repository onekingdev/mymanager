// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

// ** Utils
import { formatDateToMonthShort, formatTime } from '@utils';

// ** Custom Components
import Avatar from '@components/avatar';
import Select, { components } from 'react-select';
import { useParams } from 'react-router-dom';
// ** Third Party Components
import classnames from 'classnames';
import {
  Star,
  Edit2,
  Mail,
  Info,
  Trash,
  Send,
  Clipboard,
  Trash2,
  Paperclip,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CornerUpLeft,
  CornerUpRight
} from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Badge,
  Card,
  Table,
  CardBody,
  CardFooter,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Input,
  Button
} from 'reactstrap';
import { getUserData } from '../../../utility/Utils';

import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png';

import { addNewMessage } from './store';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const MailDetails = (props) => {
  // ** Props
  const {
    mail,
    ticket,
    openMail,
    dispatch,
    labelColors,
    setOpenMail,
    updateMails,
    paginateMail,
    handleMailToTrash,
    handleFolderUpdate,
    handleLabelsUpdate,
    handleMailReadUpdate,
    formatDateToMonthShort
  } = props;

  // ** Get all employees
  const store = useSelector((state) => state.employeeContact);
  const employeeList = store?.employeeList?.data?.list;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { status } = useParams();
  const toggleDropdown = (e) => {
    setDropdownOpen(!dropdownOpen);
  };
  // ** Focus Out Handler
  const employeeRef = useRef(null);

  const closeEmployeeMenus = (e) => {
    if (employeeRef.current && dropdownOpen && !employeeRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  const handleEmployeeClickHandler = (e, employeeFullName) => {
    handleFolderUpdate(e, 'pending', [ticket._id], employeeFullName);
    handleGoBack();
    setDropdownOpen(false);
  };
  // ** Ref values
  const messageAreaRef = useRef(null);

  // ** States
  const [showReplies, setShowReplies] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (messageAreaRef.current) scrollToBottom();
  }, [showReplies, ticket]);

  const scrollToBottom = () => {
    const messageContainer = ReactDOM.findDOMNode(messageAreaRef.current);
    messageContainer.scrollTop = Number.MAX_SAFE_INTEGER;
  };

  // ** Renders Labels
  const renderLabels = (arr) => {
    if (arr && arr.length) {
      return arr.map((label) => (
        <Badge
          key={label}
          color={`light-${labelColors[label]}`}
          className="me-50 text-capitalize"
          pill
        >
          {label}
        </Badge>
      ));
    }
  };

  // ** Renders Attachments
  const renderAttachments = (arr) => {
    return arr.map((item, index) => {
      return (
        <a
          key={item.fileName}
          href="/"
          onClick={(e) => e.preventDefault()}
          className={classnames({
            'mb-50': index + 1 !== arr.length
          })}
        >
          <img src={item.thumbnail} alt={item.fileName} width="16" className="me-50" />
          <span className="text-muted fw-bolder align-text-top">{item.fileName}</span>
          <span className="text-muted font-small-2 ms-25">{`(${item.size})`}</span>
        </a>
      );
    });
  };

  const handleSend = () => {
    const response = dispatch(
      addNewMessage({
        ticketId: ticket._id,
        status: ticket.status,
        message
      })
    );
    if (response) toast.success('Ticket message successfully saved');
    setMessage('');
  };

  // ** Renders Messages
  const renderMessage = (obj) => {
    return (
      <Card>
        <CardHeader className="email-detail-head">
          <div className="user-details d-flex justify-content-between align-items-center flex-wrap">
            {ticket.photo ? (
              <Avatar
                img={obj.photo}
                className="box-shadow-1 avatar-border d-flex align-items-center justify-content-center me-50"
                status={status}
                size="xl"
              />
            ) : (
              <Avatar
                color={'primary'}
                content={obj.reqName || 'John Doe'}
                className="box-shadow-1 avatar-border align-items-center justify-content-center me-75 align-middle"
                size="lg"
                initials
              />
            )}
            <div className="mail-items">
              <h5 className="mb-0">
                {obj.sender === 'admin_msg' ? getUserData().fullName : obj.reqName}
                <Badge
                  key={ticket.status}
                  color={`light-${labelColors[ticket.status]}`}
                  className="ms-1 text-capitalize"
                  pill
                >
                  {ticket.status}
                </Badge>
              </h5>

              <UncontrolledDropdown className="email-info-dropup">
                <DropdownToggle className="font-small-3 text-muted cursor-pointer" tag="span" caret>
                  <span className="me-25">
                    {obj.sender === 'admin_msg' ? getUserData().email : obj.reqEmail}
                  </span>
                </DropdownToggle>
                <DropdownMenu>
                  <Table className="font-small-3" size="sm" borderless>
                    <tbody>
                      <tr>
                        <td className="text-end text-muted align-top">From:</td>
                        <td>{obj.sender === 'admin_msg' ? getUserData().email : obj.reqEmail}</td>
                      </tr>
                      <tr>
                        <td className="text-end text-muted align-top">To:</td>
                        <td>{obj.sender === 'admin_msg' ? obj.reqEmail : getUserData().email}</td>
                      </tr>
                      <tr>
                        <td className="text-end text-muted align-top">Date:</td>
                        <td>
                          {formatDateToMonthShort(obj.createdAt)},{' '}
                          {formatDateToMonthShort(obj.createdAt, false)}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
          <div className="mail-meta-item d-flex align-items-center">
            <small className="mail-date-time text-muted">
              {formatDateToMonthShort(obj.createdAt.toString()) +
                ' ' +
                formatTime(new Date(obj.createdAt))}
            </small>
            <UncontrolledDropdown className="ms-50">
              <DropdownToggle className="cursor-pointer" tag="span">
                <MoreVertical size={14} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem className="d-flex align-items-center w-100">
                  <CornerUpLeft className="me-50" size={14} />
                  Reply
                </DropdownItem>
                <DropdownItem className="d-flex align-items-center w-100">
                  <CornerUpRight className="me-50" size={14} />
                  Forward
                </DropdownItem>
                <DropdownItem className="d-flex align-items-center w-100">
                  <Trash2 className="me-50" size={14} />
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </CardHeader>
        <CardBody className="mail-message-wrapper pt-2">
          <div className="mail-message" dangerouslySetInnerHTML={{ __html: obj.msg }}></div>
        </CardBody>
        {obj.attachments && obj.attachments.length ? (
          <CardFooter>
            <div className="mail-attachments">
              <div className="d-flex align-items-center mb-1">
                <Paperclip size={16} />
                <h5 className="fw-bolder text-body mb-0 ms-50">
                  {obj.attachments.length} Attachment
                </h5>
              </div>
              <div className="d-flex flex-column">{renderAttachments(obj.attachments)}</div>
            </div>
          </CardFooter>
        ) : null}
      </Card>
    );
  };

  // ** Renders Replies
  const renderReplies = (obj) => {
    if (obj && obj.messages && obj.messages.length && showReplies === true) {
      return obj.messages.map((message, index) => (
        <Row key={index}>
          <Col sm="12">
            {renderMessage({
              ...message,
              reqName: obj.reqName,
              reqEmail: obj.reqEmail
            })}
          </Col>
        </Row>
      ));
    }
  };

  // ** Handle show replies, go back, folder & read click functions
  const handleShowReplies = (e) => {
    e.preventDefault();
    setShowReplies(true);
  };

  const handleGoBack = () => {
    setOpenMail(false);
  };

  const handleFolderClick = (e, status, id) => {
    handleFolderUpdate(e, status, [id]);
    handleGoBack();
  };

  const handleReadClick = () => {
    handleMailReadUpdate([mail.id], false);
    handleGoBack();
  };

  return (
    <div
      className={classnames('email-app-details', {
        show: openMail
      })}
    >
      {ticket !== null && ticket !== undefined ? (
        <Fragment>
          <div className="email-detail-header">
            <div className="email-header-left d-flex align-items-center">
              <span className="go-back me-1" onClick={handleGoBack}>
                <ChevronLeft size={20} />
              </span>
              <h4 className="email-subject mb-0">{ticket.ticketName}</h4>
            </div>
            <div className="email-header-right ms-2 ps-1">
              <ul className="list-inline m-0">
                <li className="list-inline-item me-1" ref={employeeRef}>
                  {ticket.assignee ? (
                    <Avatar
                      color={`light-${labelColors[ticket.status]}`}
                      content={ticket.assignee || 'John Doe'}
                      className="box-shadow-1 avatar-border align-items-center justify-content-center me-50"
                      status="online"
                      onClick={(e) => toggleDropdown(e)}
                      size="sm"
                      initials
                    />
                  ) : (
                    <Avatar
                      img={defaultAvatar}
                      className="box-shadow-1 avatar-border align-items-center justify-content-center me-50"
                      color={`light-${labelColors[ticket.status]}`}
                      onClick={(e) => toggleDropdown(e)}
                      status="online"
                      size="sm"
                    />
                  )}
                  <div
                    className={classnames('dropdown-employee', {
                      show: dropdownOpen == true
                    })}
                    id="dropdown-employee"
                  >
                    {employeeList?.map((employee, index) => {
                      return (
                        <a
                          className="d-flex align-items-center button"
                          onClick={(e) => handleEmployeeClickHandler(e, employee.fullName)}
                        >
                          {employee.photo ? (
                            <Avatar img={employee.photo} width="32" height="32" size="sm" />
                          ) : (
                            <Avatar
                              color={'primary'}
                              content={employee.fullName || 'John Doe'}
                              initials
                              size="sm"
                            />
                          )}
                          <p className="mb-0 ms-75">{employee.fullName}</p>
                        </a>
                      );
                    })}
                  </div>
                </li>

                {status === 'open' || status === 'pending' ? (
                  <>
                    {' '}
                    <li
                      className="list-inline-item me-1 cursor-pointer hover-primary"
                      onClick={(e) => {
                        handleFolderUpdate(e, 'completed', [ticket._id]);
                        handleGoBack();
                      }}
                    >
                      <Edit2 size={18} className="me-75" />
                      <span className="align-middle">Close</span>
                    </li>
                  </>
                ) : (
                  <li
                    className="list-inline-item me-1 cursor-pointer hover-primary"
                    onClick={(e) => {
                      handleFolderUpdate(e, 'open', [ticket._id]);
                      handleGoBack();
                    }}
                  >
                    <Mail size={18} className="me-75" />
                    <span className="align-middle">Reopen</span>
                  </li>
                )}

                <li
                  className="list-inline-item me-1 cursor-pointer hover-primary"
                  onClick={() => {
                    handleMailToTrash([ticket._id]);
                    handleGoBack();
                  }}
                >
                  <Trash size={18} className="me-75" />
                  <span className="align-middle">Delete</span>
                </li>
              </ul>
            </div>
          </div>
          <PerfectScrollbar
            className="email-scroll-area"
            options={{ wheelPropagation: false }}
            ref={messageAreaRef}
          >
            <Row>
              <Col sm="12">
                <div className="email-label">{renderLabels(ticket.labels)}</div>
              </Col>
            </Row>
            {ticket.messages && ticket.messages.length > 1 ? (
              <Fragment>
                {showReplies === false ? (
                  <Row className="mb-1">
                    <Col sm="12">
                      <a className="fw-bold" href="/" onClick={handleShowReplies}>
                        View {ticket.messages.length - 1} Earlier Messages
                      </a>
                    </Col>
                  </Row>
                ) : null}

                {renderReplies(ticket)}
              </Fragment>
            ) : null}
            <Row>
              <Col sm="12">
                {renderMessage({
                  ...ticket.messages[ticket.messages.length - 1],
                  reqName: ticket.reqName,
                  reqEmail: ticket.reqEmail
                })}
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Card>
                  <CardBody>
                    <Input
                      type="textarea"
                      name="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      id="ticket-message"
                      rows="3"
                      placeholder="Enter your message..."
                    />
                    <Button
                      className="me-1 mt-1"
                      type="submit"
                      color="primary"
                      onClick={handleSend}
                    >
                      Send
                    </Button>
                    {/* <h5 className='mb-0'>
                      Click here to{' '}
                      <a href='/' onClick={e => e.preventDefault()}>
                        Reply
                      </a>{' '}
                      or{' '}
                      <a href='/' onClick={e => e.preventDefault()}>
                        Forward
                      </a>
                    </h5> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </PerfectScrollbar>
        </Fragment>
      ) : null}
    </div>
  );
};

export default MailDetails;
