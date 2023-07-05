import { Fragment, useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Tooltip
} from 'reactstrap';

import Select, { components } from 'react-select'; //eslint-disable-line
import { User, UserPlus, Share2, X } from 'react-feather';
import classnames from 'classnames';
import { isObjEmpty, selectThemeColors } from '@utils';
import { SocketContext } from '../../utility/context/Socket';

import Avatar from '@components/avatar';
import SidebarNewUsers from '../contacts/contact-list/Sidebar';
import { shareWorkspace, shareRevertWorkspace } from '../apps/workspace/store';
import { getUserData } from '../../utility/Utils';
import '@src/assets/styles/workspace-share.scss';

const ShareModal = (props) => {
  const { selectedWorkspace, isOpen, setIsOpen, curAssignedArr, shareRevert } = props;
  const dispatch = useDispatch();
  // ** Socket Context
  const socket = useContext(SocketContext);
  const [assignedTo, setAssignedTo] = useState([]);
  const [assigneeArr, setAssigneeArr] = useState([]);
  const [open, setSidebarOpen] = useState(false);
  // ** Redux Store
  const contacts = useSelector((state) => state?.totalContacts?.contactList?.list);
  const contactTypes = useSelector((state) => state?.totalContacts?.contactTypeList);
  // ** Effect
  useEffect(() => {
    let tmp = [];
    contacts?.length > 0 &&
      contacts.map((contact) => {
        if (contact?.contactType?.includes(contactTypes[0]._id)) {
          if (selectedWorkspace?.collaborators?.length > 0) {
            if (
              selectedWorkspace?.collaborators?.find((item) => item?.id == contactTypes[0]?._id)
            ) {
              return;
            } else {
              tmp.push({
                value: contact._id,
                label: contact.fullName,
                email: contact.email,
                img: contact.photo,
                typeId: contactTypes[0]._id
              });
            }
          } else {
            tmp.push({
              value: contact._id,
              label: contact.fullName,
              email: contact.email,
              img: contact.photo,
              typeId: contactTypes[0]._id
            });
          }
        }
      });
    setAssigneeArr(tmp);
  }, [contacts]);

  const handleTypeClick = (e, typeId) => {
    e.target.closest('.contact-type').childNodes.forEach((el) => {
      if (el.classList.contains('active')) {
        el.classList.remove('active');
      } else return;
    });
    e.target.classList.add('active');
    let tmp = [];
    contacts?.length > 0 &&
      contacts.map((contact) => {
        if (contact?.contactType?.includes(typeId)) {
          if (selectedWorkspace?.collaborators) {
            if (selectedWorkspace.collaborators.find((item) => item.id == contact._id)) {
              return;
            } else {
              tmp.push({
                value: contact._id,
                label: contact.fullName,
                img: contact.photo,
                email: contact.email,
                typeId: typeId
              });
            }
          } else {
            tmp.push({
              value: contact._id,
              label: contact.fullName,
              img: contact.photo,
              email: contact.email,
              typeId: typeId
            });
          }
        }
      });
    setAssigneeArr(tmp);
  };
  const cancelBtnClicked = () => {
    setIsOpen(false);
  };

  const shareBtnClicked = (e) => {
    e.preventDefault();
    dispatch(shareWorkspace({ assignedTo, id: selectedWorkspace._id }));
    // ** Live notification using socket
    socket.emit('shareWorkspace', {
      assignedTo,
      workspaceId: selectedWorkspace._id,
      assignerId: getUserData().id
    });
    toast.success('Successfully shared');
    setAssignedTo([]);
    setIsOpen(false);
  };

  const shareXBtnClicked = (e, contactId) => {
    e.preventDefault();
    dispatch(shareRevertWorkspace({ contactId, id: selectedWorkspace._id }));
  };

  const AssigneeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(data)}
          <div className="d-flex flex-column">
            <Link className="user_name text-truncate text-body">
              <span className="fw-bolder">{data?.label}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">{data?.email}</small>
          </div>
        </div>
      </components.Option>
    );
  };

  const renderClient = (row) => {
    let tmpValue = 0;
    if (row && typeof row.label === 'string' && Object.keys(row).length > 0) {
      Array.from(row.label).forEach((x, index) => {
        tmpValue += x.codePointAt(0) * (index + 1);
      });
    }
    const stateNum = tmpValue % 6,
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];

    if (row?.photo) {
      return <Avatar className="me-1" img={row.photo} width="32" height="32" />;
    } else {
      return (
        <Avatar
          color={color || 'primary'}
          className="me-1"
          content={row?.label || 'John Doe'}
          initials
        />
      );
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!open);
  };
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => cancelBtnClicked()}
      className="modal-dialog-centered"
      size="lg"
    >
      <ModalHeader toggle={() => cancelBtnClicked()}>Share this workspace</ModalHeader>
      <ModalBody>
        <div>
          <Fragment>
            <Row>
              <Col xs="4" className="contact-type py-1">
                <h4>Select Contact Type</h4>
                {contactTypes?.length > 0 &&
                  contactTypes.map((contactType, index) => {
                    return (
                      <div
                        key={'contactType-' + index}
                        className={classnames(
                          'text-capitalize py-50 px-1 cursor-pointer d-flex align-items-center contact-type-item',
                          {
                            active: index === 1
                          }
                        )}
                        onClick={(e) => {
                          handleTypeClick(e, contactType._id);
                        }}
                      >
                        <User size={18} />
                        <span className="ms-1">{contactType?.name}</span>
                      </div>
                    );
                  })}
              </Col>
              <Col xs="8" className="new-share">
                <div className="d-flex align-items-center justify-content-between pt-2">
                  <h4 className="mb-0">Share To</h4>
                  <Button
                    color="primary"
                    className="d-flex align-items-center me-1"
                    size={'md'}
                    style={{ borderRadius: '20px' }}
                    outline
                    onClick={(e) => setSidebarOpen(true)}
                  >
                    <UserPlus size={'16px'} />
                    <span className="ms-1">Add New Contact</span>
                  </Button>
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="task-assignee">
                    Assignee
                  </Label>
                  <Select
                    isMulti
                    isSearchable
                    id="task-assignee"
                    value={assignedTo}
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                    options={assigneeArr}
                    theme={selectThemeColors}
                    onChange={(data) => setAssignedTo(data)}
                    components={{ Option: AssigneeComponent }}
                  />
                </div>
                <div className="d-flex justify-content-end mt-2">
                  <Button
                    color="primary"
                    className="d-flex align-items-center me-1"
                    style={{ borderRadius: '20px' }}
                    outline
                    onClick={shareBtnClicked}
                  >
                    <Share2 size={'16px'} style={{ marginRight: '10px' }} />
                    <span>Share</span>
                  </Button>
                  <Button
                    color="danger"
                    className="d-flex align-items-center"
                    style={{ borderRadius: '20px' }}
                    outline
                    onClick={cancelBtnClicked}
                  >
                    <X size={'16px'} style={{ marginRight: '10px' }} />
                    <span>Close</span>
                  </Button>
                </div>
              </Col>
              <Col xs="12" className="current-share py-1">
                <h4>Current Shared</h4>
                <div className="assignee-list d-flex flex-column px-1">
                  {curAssignedArr?.length ? (
                    <div className="d-flex flex-column">
                      {curAssignedArr.map((member) => {
                        return (
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <div className="d-flex align-items-center">
                              {renderClient(member)}
                              <div className="d-flex flex-column">
                                <Link className="user_name text-truncate text-body">
                                  <span className="fw-bolder">{member?.label}</span>
                                </Link>
                                <small className="text-truncate text-muted mb-0">
                                  {member?.email}
                                </small>
                              </div>
                            </div>
                            <Button
                              id={member._id}
                              color="flat-danger"
                              style={{ padding: '5px', borderRadius: '20px' }}
                              onClick={(e) => shareXBtnClicked(e, member._id)}
                            >
                              <X size={'16px'} />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div>No Assignees</div>
                  )}
                </div>
              </Col>
            </Row>
          </Fragment>
        </div>
      </ModalBody>
      <SidebarNewUsers open={open} toggleSidebar={toggleSidebar} contactTypeTitle="Contact" />
    </Modal>
  );
};

export default ShareModal;
