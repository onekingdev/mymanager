// ** Reactstrap Imports
import Avatar from '../../../../@core/components/avatar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux';
// import { handleSelectContact } from '../store/actions';
import { MdOutlineUpdate, MdSubtitles } from 'react-icons/md';
import { IoMailOutline } from 'react-icons/io5';
import { BiUser } from 'react-icons/bi';
import { HiOutlinePhone } from 'react-icons/hi';
import { BsBuildings } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';
import NoteModal from '../../Note';
import { useState } from 'react';
import { contactNoteFetchAction } from '../../store/actions';
import {
  Badge,
  Row,
  Col,
  Card,
  CardBody,
  Collapse,
  Input,
  InputGroup,
  InputGroupText,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Label,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

const KanbanContacts = (props) => {
  // ** Props
  const { task, labelColors, toggleSidebar, handleTaskSidebarToggle, isDragging } = props;

  const store = useSelector((state) => state.totalContacts);
  const [row, setRow] = useState(null);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    ids: [],
    show: false
  });

  const toggle = () => setModal(!modal);

  // ** Hooks
  const dispatch = useDispatch();

  const handleTaskClick = () => {
    // dispatch(handleSelectContact(task));
    // toggleSidebar();
  };
  const taskFooterClasses = () => {
    'justify-content-between';
  };

  const renderClient = (row) => {
    let tmpValue = 0;
    row?._id &&
      Array?.from(row?._id).forEach((x, index) => {
        tmpValue += x?.codePointAt(0) * (index + 1);
      });
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
      return <Avatar className="me-1" img={row?.photo} size="lg" />;
    } else {
      return (
        <Avatar
          color={color || 'primary'}
          className="me-1"
          content={row.fullName || 'John Doe'}
          size="lg"
          initials
        />
      );
    }
  };

  const fetchNotes = (id) => {
    dispatch(contactNoteFetchAction(id));
  };
  const formattedDate = new Date(task.updatedAt).toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit'
  });

  const formattedTime = new Date(task.updatedAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return (
    <Card
      onClick={handleTaskClick}
      className="task"
      data-board-id={task.stage}
      data-task-id={task._id}
      style={{
        opacity: isDragging ? 0.5 : 1
      }}
    >
      <CardBody data-task-id={task._id}>
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="d-flex align-items-center">{renderClient(task)}</div>
                <div>
                  <div className="d-flex align-items-center">
                    <BiUser size={16} />
                    <div
                      className="mt-0"
                      style={{ marginInlineStart: '0.5rem', fontSize: '14px', fontWeight: 'bold' }}
                    >
                      {task.fullName}
                    </div>
                  </div>
                  {task?.company && (
                    <div className="d-flex align-items-center ">
                      <BsBuildings size={16} />
                      <span
                        className="mt-0"
                        style={{ fontSize: '12px', marginInlineStart: '0.5rem' }}
                      >
                        {task?.company}
                      </span>
                    </div>
                  )}
                  <div className="d-flex align-items-center">
                    <MdOutlineUpdate size={16} />
                    <span
                      className="mt-0"
                      style={{ fontSize: '12px', marginInlineStart: '0.5rem' }}
                    >
                      {/* {formatDateTime(new Date(task.updatedAt))} */}
                      {formattedDateTime}
                    </span>
                  </div>
                  <div className="d-flex" style={{ marginTop: '0.2rem' }}>
                    <div>
                      <Badge
                        color={task.status == 'active' ? 'light-success' : 'light-dark'}
                        style={{ fontSize: '12px' }}
                      >
                        {task?.status.toUpperCase()}
                      </Badge>
                      <AiOutlineEye
                        className="ms-1 cursor-pointer"
                        size={20}
                        onClick={() => {
                          setRow(task);
                          fetchNotes(task._id);
                          toggle();
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
      {row !== null && (
        <NoteModal
          toggle={toggle}
          isOpen={modal}
          row={row}
          notes={store?.notes?.data || []}
          dispatch={dispatch}
          setDeleteModal={setDeleteModal}
        />
      )}
      {/* // Delete Modal  */}
      <Modal
        toggle={() => {
          setDeleteModal({
            id: [],
            show: false
          });
        }}
        centered
        isOpen={deleteModal.show}
      >
        <ModalBody>
          <div>
            <h3>Are you sure to Delete ?</h3>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            onClick={() => {
              setDeleteModal({
                id: [],
                show: false
              });
            }}
          >
            No
          </Button>
          <Button
            // disabled={deleteLoading}
            size="sm"
            color="primary"
            onClick={() => {
              mutate({ ids: deleteModal?.ids });
              // dispatch(deleteEmployeeContact({ _id: deleteModal?.id }));
            }}
          >
            {'Yes'}
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </Card>
  );
};

export default KanbanContacts;
