// ** React Imports
import { Fragment, useState } from 'react';
import DataTable from 'react-data-table-component';

// ** Third Party Component
import { Eye, MoreVertical } from 'react-feather';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { MdAddIcCall } from 'react-icons/md';
import { toast } from 'react-toastify';
import Avatar from '@components/avatar';
// ** Reactstrap Imports
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Modal,
  Row,
  Col,
  Card,
  Label,
  Form,
  FormGroup,
  Input,
  ModalFooter,
  ModalHeader,
  ModalBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { LeadNoteAddAction, LeadNoteDeleteAction, LeadNoteEditAction } from '../store/actions';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const NoteModal = ({ row, toggle, isOpen, notes, ids, dispatch, setDeleteModal }) => {
  const [notedata, setNotedata] = useState({ followUpType: 'Left Message' });
  const [modal2, setModal2] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const toggle2 = () => setModal2(!modal2);
  // const noteToRender = () => {
  //   return clientStore?.clientNote?.data || [];
  // };
  const handleEditModal = (e) => {
    setEditModalData({ ...editModalData, [e.target.name]: e.target.value });
  };

  const notesOf = location?.pathname.split("/")

  const handleNoteSave = (e) => {
    e.preventDefault();
    if (notedata.followUpType != '' && notedata.response != '' && notedata.note != '', ids) {
      if (notesOf[2] === 'renewals') {
        notedata.noteType = 'Renewal';
      } else if (notesOf[2] === 'birthday') {
        notedata.noteType = 'Birthday';
      } else if (notesOf[2] === 'miss-you-call') {
        notedata.noteType = 'Miss You';
      }
      dispatch(LeadNoteAddAction(notedata, ids));
      toast.success('Note Added Successfully');
      e.target.reset();
      setNotedata({ note: '', followUpType: '', response: '' });
    } else {
      toast.error('Please enter data in all fields');
    }
  };


  const handleNoteUpdate = (e) => {
    e.preventDefault();
    dispatch(LeadNoteEditAction(editModalData));
    toggle2();
    toast.success('Note Updated successfully');
  };
  const onNoteInputChange = (e) => {
    setNotedata({ ...notedata, [e.target.name]: e.target.value });
  };
  const MySwal = withReactContent(Swal);
  const handleDeleteModal = async (data) => {
    const res = await MySwal.fire({
      title: 'Delete?',
      text: 'Are you sure to delete this note?',
      showCancelButton: true,
      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (res.value) {
      dispatch(LeadNoteDeleteAction(data?._id));
      toast.success('Note deleted successfully');
    }
  };
  const renderUserImg = () => {
    if (row !== null && row?.photo?.length) {
      return (
        <div className="cic-dp">
          <img
            height="110"
            width="110"
            alt="user-avatar"
            src={row.photo}
            className="img-fluid rounded mt-3 mb-2"
          />
        </div>
      );
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = [
          'light-success',
          'light-danger',
          'light-warning',
          'light-info',
          'light-primary',
          'light-secondary'
        ],
        color = states[stateNum];
      return (
        <>
          <Avatar
            initials
            color={color}
            className="rounded "
            content={row.fullName}
            contentStyles={{
              borderRadius: 0,
              fontSize: 'calc(48px)',
              width: '100%',
              height: '100%'
            }}
            style={{
              height: '210px',
              width: '210px'
            }}
          />
        </>
      );
    }
  };
  const columnsdata = [
    {
      name: 'Date',
      selector: (row) => row.date
    },
    {
      name: 'Follow Up Type',
      selector: (row) => row.followUpType
    },
    {
      name: 'Response',
      selector: (row) => row.response
    },
    {
      name: 'Note',
      selector: (row) => row.note
    },
    {
      name: 'Action',
      selector: (row) => row.mode,
      cell: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag="span"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                setEditModalData(row);
                toggle2();
              }}
            >
              <FiEdit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              tag="span"
              // href="/"
              className="w-100"
              onClick={() => handleDeleteModal(row)}
            >
              <AiOutlineDelete size={14} className="me-50" />
              <span className="align-middle">Remove</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ];

  return (
    <>
      <Modal
        fullscreen="lg"
        size="lg"
        centered="true"
        scrollable="false"
        isOpen={isOpen}
        // modalTransition={{ timeout: 100 }}
        // backdropTransition={{ timeout: 200 }}
        toggle={toggle}
        style={{ maxWidth: '80rem ' }}
      >
        <ModalHeader toggle={toggle}>Notes for {row?.fullName}</ModalHeader>
        <ModalBody>
          <Row>
            <Col xl="5" lg="5">
              <Row>
                <Col xl="6" md="6">
                  <Card
                    style={{
                      width: '100',
                      boxShadow: 'none'
                    }}
                  >
                    {renderUserImg()}
                    <span className="text-center">{row?.note}</span>
                    <Button className="mt-1 color-primary" color="primary">
                      Add Appointment
                    </Button>
                  </Card>
                </Col>
                <Col xl="6" md="6">
                  <Row className="mb-1">
                    <Col md="2">
                      <MdAddIcCall size={20} className="" />
                    </Col>
                    <Col md="10">
                      <Label className="px-1">{row?.phone}</Label>
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col md="2">
                      <AiOutlineMail size={24} />
                    </Col>
                    <Col md="10">
                      <Label className="px-1">
                        <small>{row?.email}</small>
                      </Label>
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col md="2">
                      <GoLocation size={20} />
                    </Col>
                    <Col md="10">
                      <Label className="px-1">
                        {row?.address?.street} <br />
                        {row?.address?.city} - {row?.address?.state}
                        <br />
                        {row?.address?.country} - {row?.address?.zipCode}
                      </Label>
                    </Col>
                  </Row>
                </Col>
                <Col xl="12">
                  <Form row onSubmit={handleNoteSave}>
                    <Row>
                      <span>
                        <b>New Note</b>
                      </span>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleSelect" sm={2}></Label>
                          <Col sm={12}>
                            <Label for="exampleText">
                              <b>Follow Up Type</b>
                            </Label>
                            <Input
                              id="exampleSelect"
                              name="followUpType"
                              type="select"
                              placeholder="Select Notes"
                              onChange={onNoteInputChange}
                            >
                              <option value="">Select</option>
                              <option value="General">General</option>
                              <option value="Birthday">Birthday</option>
                              <option value="Miss You">Miss You</option>
                              <option value="Renewal">Renewal</option>
                              <option value="Other">Other</option>
                            </Input>
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleSelect" sm={2}></Label>
                          <Col sm={10}>
                            <Label for="examRemovepleText">
                              <b>Response*</b>
                            </Label>
                            <Input
                              id="exampleSelect"
                              name="response"
                              type="select"
                              onChange={onNoteInputChange}
                            >
                              <option value="">Select</option>
                              <option value="Left Message">Left Message</option>
                              <option value="No Answer">No Answer</option>
                              <option value="Answer">Answer</option>
                              <option value="Other">Other</option>
                            </Input>
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col xl="11">
                        <FormGroup>
                          <Label for="exampleText">
                            <b>Notes*</b>
                          </Label>
                          <Input
                            onChange={onNoteInputChange}
                            id="exampleText"
                            name="note"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                      <Col xl="11">
                        <div className="d-flex mt-0 justify-content-end">
                          <Button type="submit" color="primary">
                            Save Note
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
            <Col xl="7" lg="7">
              <DataTable columns={columnsdata} data={notes} pagination />
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      <Modal
        fullscreen="md"
        size="sm"
        centered="true"
        scrollable="false"
        isOpen={modal2}
        toggle={toggle2}
      >
        <ModalHeader toggle={toggle2}>Edit Note</ModalHeader>
        <ModalBody>
          <Col lg="12">
            <Form onSubmit={handleNoteUpdate} row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelect" sm={2}></Label>
                    <Col sm={12}>
                      <Label for="exampleText">
                        <b>Follow Up Type</b>
                      </Label>
                      <Input
                        id="exampleSelect"
                        name="followUpType"
                        type="select"
                        placeholder="Select Notes"
                        onChange={handleEditModal}
                        defalutValue={editModalData.followUpType}
                      >
                        <option
                          selected={editModalData?.followUpType === 'General' ? true : false}
                          value="General"
                        >
                          General
                        </option>
                        <option
                          selected={editModalData?.followUpType === 'Birthday' ? true : false}
                          value="Birthday"
                        >
                          Birthday
                        </option>
                        <option
                          selected={editModalData?.followUpType === 'Miss You' ? true : false}
                          value="Miss You"
                        >
                          Miss You
                        </option>
                        <option
                          selected={editModalData?.followUpType === 'Renewal' ? true : false}
                          value="Renewal"
                        >
                          Renewal
                        </option>
                        <option
                          selected={editModalData?.followUpType === 'Other' ? true : false}
                          value="Other"
                        >
                          Other
                        </option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelect" sm={2}></Label>
                    <Col sm={12}>
                      <Label for="exampleText">
                        <b>Response*</b>
                      </Label>
                      <Input
                        id="exampleSelect"
                        name="response"
                        type="select"
                        onChange={(e) =>
                          setEditModalData({ ...editModalData, [e.target.name]: e.target.value })
                        }
                      >
                        <option
                          selected={editModalData?.response === 'Left Message' ? true : false}
                          value="Left Message"
                        >
                          Left Message
                        </option>
                        <option
                          selected={editModalData?.response === 'No Answer' ? true : false}
                          value="No Answer"
                        >
                          No Answer
                        </option>
                        <option
                          selected={editModalData?.response === 'Answer' ? true : false}
                          value="Answer"
                        >
                          Answer
                        </option>
                        <option
                          selected={editModalData?.response === 'Other' ? true : false}
                          value="Other"
                        >
                          Other
                        </option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
                <Col xl="12">
                  <FormGroup>
                    <Label for="exampleText">
                      <b>Notes*</b>
                    </Label>
                    <Input
                      id="exampleText"
                      value={editModalData.note}
                      onChange={(e) =>
                        setEditModalData({ ...editModalData, [e.target.name]: e.target.value })
                      }
                      name="note"
                      type="textarea"
                    />
                  </FormGroup>
                </Col>
                <Col xl="12">
                  <div className="d-flex mt-0 justify-content-end">
                    <button type="submit" class="btn btn-primary">
                      Save Notes
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </ModalBody>
      </Modal>
    </>
  );
};
export default NoteModal;
