// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react';

// ** Third Party Components
import { ArrowLeft, ArrowRight, Check, X } from 'react-feather';
import Flatpickr from 'react-flatpickr';
import { Editor } from 'react-draft-wysiwyg';
import Select, { components } from 'react-select';
import { convertToRaw, EditorState } from 'draft-js';
import { useSelector } from 'react-redux';

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
import { createTicket, getTickets } from './store';
import { getUserData } from '../../../utility/Utils';

import { useGetAllEmployees } from '../../../requests/contacts/employee-contacts';

const TicketInfo = ({ store, dispatch, setIsCreateTicketModalOpen, selectedTicket }) => {
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

  const [assignee, setAssignee] = useState(null);

  const [ticketName, setTicketName] = useState('');
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [priority, setPriority] = useState({ value: 'medium', label: 'Select...' });
  const [tags, setTags] = useState([]);
  const [desc, setDesc] = useState(EditorState.createEmpty());
  const [status, setStatus] = useState({ value: 'open', label: 'Select...' });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // ** Priority Select Options
  const priorityOptions = [
    { value: 'low', label: 'Row' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];
  // ** Status Select Options
  const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'trash', label: 'Deleted' }
  ];
  // ** Tag Select Options
  const tagOptions = [
    { value: 'personal', label: 'Personal' },
    { value: 'company', label: 'Company' },
    { value: 'important', label: 'Important' },
    { value: 'private', label: 'Private' }
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

  const handleCreateTicket = (e) => {
    if (ticketName == '') {
      toast.error('Ticket name is required');
    }
    if (reqName == '') {
      toast.error('Requester name is required');
    }
    if (reqEmail == '') {
      toast.error('Requester email is required');
    }
    if (assignee) {
      toast.error('Assignee is required');
    }
    e.preventDefault();

    let description = '',
      tmpTags;
    convertToRaw(desc.getCurrentContent()).blocks.forEach((item) => {
      description = description + item.text + '\n';
    });
    tmpTags = tags.map((item, index) => {
      return item.value;
    });
    const data = dispatch(
      createTicket({
        userId: getUserData().id,
        ticketName,
        reqName,
        reqEmail,
        status: status.value ? status.value : 'open',
        priority: priority.value,
        tag: tmpTags,
        messages: [
          {
            sender: 'agent_msg',
            msg: description
          }
        ]
      })
    );
    if (data.success == false) {
      toast.error('Ticket creation failed');
    } else {
      toast.success('Ticket created successfully');
    }
    setIsCreateTicketModalOpen(false);
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
              defaultValue={assignee}
              options={employeeArr}
              theme={selectThemeColors}
              components={{ Option: AssigneeComponent }}
              onChange={(data) => setAssignee(data)}
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
          <Col md="4" className="mb-1">
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
          <Col md="4" className="mb-1">
            <Label className="form-label" for="task-tags">
              Status
            </Label>
            <Select
              id="task-tags"
              className="react-select zindex-3"
              classNamePrefix="select"
              isClearable={false}
              options={statusOptions}
              theme={selectThemeColors}
              value={status}
              onChange={(data) => {
                setStatus(data);
              }}
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="task-assignee">
              Priority
            </Label>
            <Select
              id="task-assignee"
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
        <Row>
          <Col>
            <Label for="task-desc" className="form-label">
              Description
            </Label>
            <Editor
              editorState={desc}
              wrapperClassName="toolbar-bottom"
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

export default TicketInfo;
