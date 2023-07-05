// ** React Imports
import { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Plus, ChevronLeft, ChevronRight, Columns, MoreVertical, Edit, Trash } from 'react-feather';

import { useForm } from 'react-hook-form';
import { Home, Layers } from 'react-feather';

// ** Reactstrap Imports
import {
  Badge,
  Button,
  FormFeedback,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip
} from 'reactstrap';
import Swal from 'sweetalert2';

import {
  getSelectedWorkspaceData,
  handleSelectWorkspace,
  deleteWorkspace
} from '../../apps/workspace/store';
import NewModal from '../NewModal';
import { cvtColor } from '../../contacts/contact-list/constants';
import { FiSettings } from 'react-icons/fi';
import classnames from 'classnames';
import StatusManage from '../../tasks/task-list/StatusManage';
import { getSharedWorkspaceApi } from '../../../views/apps/workspace/store';
import WorkspaceSidebarListItem from './WorkspaceSidebarListItem';
const defaultValues = {
  workspaceTitle: ''
};

const WorkspaceSidebar = (props) => {
  // ** Props
  const {
    store,
    dispatch,
    collapse,
    params,
    addWorkspace,
    handleWorkspaceCollapse,
    selectedStatus,
    setSelectedStatus
  } = props;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });
  const WorkspaceSidebarName = 'My Workspace';

  // ** States
  const [newWorkspace, setNewWorkspace] = useState(false);
  const [createNewValidation, setCreateNewValidation] = useState(true);
  const [newWSTitle, setNewWSTitle] = useState('');
  const [style, setStyle] = useState({ visibility: 'invisible', opacity: 0 });
  const [modalType, setModalType] = useState(null);
  const [toggleStatus, setToggleStatus] = useState(false);

  // ** Selectors
  const allTasks = useSelector((state) => state?.kanban?.tasks);
  const sharedWorkspace = useSelector((state) => state?.workspace?.sharedWorkspace);
  // ** UserInfo
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (!userData) {
    return;
  }

  useEffect(() => {
    dispatch(getSharedWorkspaceApi());
  }, []);
  // ** Functions To Active List Item
  const toggleTabs = (tab) => {
    if (tab?.statusNum == selectedStatus?.statusNum) {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(tab);
    }
  };

  const handleOpenAddWorkspace = (e) => {
    e.preventDefault();
    setNewWorkspace(true);
  };

  const handleAddWorkspaceFormSubmit = (e) => {
    e.preventDefault();
    const param = { title: newWSTitle, userId: userData?.id };
    dispatch(addWorkspace(param));
    setNewWorkspace(false);
  };

  const handleWorkspaceClick = (workspace, e) => {
    dispatch(getSelectedWorkspaceData(workspace._id));
    dispatch(handleSelectWorkspace(workspace));
    setSelectedStatus({});
  };

  const handleNewWorkspaceTitle = (e) => {
    e.preventDefault();
    setNewWSTitle(e.target.value);
    setCreateNewValidation(store.workspace?.filter((x) => x.title === e.target.value).length === 0);
  };

  const handleAddTaskClick = (e) => {
    e.preventDefault();
    setModalType('addTask');
  };

  const handleToggleStatusSetting = () => {
    setToggleStatus(true);
  };

  return (
    <div className="sidebar" style={{ maxWidth: '260px' }}>
      <div className="sidebar-content task-sidebar">
        <div className="task-app-menu">
          <ListGroup className="sidebar-menu-list" options={{ wheelPropagation: false }}>
            <div className="p-1 pt-2 d-flex justify-content-between align-items-center">
              <Home size={20} />
              <div style={{ fontSize: '18px', fontWeight: 700, cursor: 'pointer' }}>
                {WorkspaceSidebarName}
              </div>
              <Button
                className="btn-icon btn-toggle-sidebar"
                color="flat-dark"
                onClick={handleWorkspaceCollapse}
              >
                {collapse ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </Button>
            </div>

            {store.workspace?.map((workspace, index) => {
              return (
                (workspace.title == 'Personal' || workspace.title == 'Business') && (
                  <WorkspaceSidebarListItem
                    key={`initial-workspace-${index}`}
                    store={store}
                    workspace={workspace}
                    handleAddTaskClick={handleAddTaskClick}
                    handleWorkspaceClick={handleWorkspaceClick}
                  />
                )
              );
            })}
            <div
              style={{
                padding: '12px',
                cursor: 'pointer'
              }}
            >
              <Layers size={14} style={{ marginInlineEnd: '5px' }} />
              Others
            </div>
            {store.workspace?.map((workspace, index) => {
              return (
                workspace.title !== 'Personal' &&
                workspace.title !== 'Business' && (
                  <WorkspaceSidebarListItem
                    key={`other-workspace-${index}`}
                    store={store}
                    workspace={workspace}
                    handleAddTaskClick={handleAddTaskClick}
                    handleWorkspaceClick={handleWorkspaceClick}
                  />
                )
              );
            })}
            {userData?.roles?.length > 0 && (
              <>
                <div
                  style={{
                    padding: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Shared Workspace
                </div>
                {sharedWorkspace?.map((workspaceSet, index) => {
                  return (
                    <div
                      key={`shared-workspace-${index}`}
                      className={classnames(
                        'd-flex justify-content-between align-items-center px-1 list-workspace-item',
                        {
                          active: store.selectedWorkspace.title === workspaceSet.workspace.title
                        }
                      )}
                      onMouseEnter={(e) => {
                        setStyle({
                          visibility: 'visible',
                          opacity: 1
                        });
                      }}
                      onMouseLeave={(e) => {
                        setStyle({
                          visibility: 'invisible',
                          opacity: 0
                        });
                      }}
                      onClick={() => handleWorkspaceClick(workspaceSet.workspace)}
                    >
                      <ListGroupItem
                        active={
                          store.selectedWorkspace.title === workspaceSet.workspace.title
                            ? true
                            : false
                        }
                        action
                      >
                        <div className="d-flex justify-content-between align-middle">
                          <div className="ws-name d-flex align-items-center">
                            <span>{workspaceSet.workspace.title}</span>
                          </div>
                        </div>
                      </ListGroupItem>
                      <div className="d-flex align-items-center">
                        <Badge color="light-primary" style={{ position: 'relative' }} pill>
                          {workspaceSet.workspace?.boards?.length}
                        </Badge>
                        <div className="btn-more-vertical" style={style}>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="icon-btn hide-arrow m-0 p-0"
                              color="transparent"
                              size="sm"
                              caret
                            >
                              <MoreVertical size={18} />
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                href="/"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setModalType('addTask');
                                }}
                                disabled={!store.boards.length}
                              >
                                <Plus className="me-50" size={15} />{' '}
                                <span className="align-middle">Add Task</span>
                              </DropdownItem>
                              <DropdownItem
                                href="/"
                                onClick={(e) => {
                                  e.preventDefault();

                                  Swal.fire({
                                    title: 'Delete?',
                                    text: 'Are you sure you want to delete the this workspace?',
                                    // icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#d33',
                                    cancelButtonColor: '#3085d6',
                                    confirmButtonText: 'Delete anyway',
                                    cancelButtonText: 'Cancel',
                                    customClass: {
                                      confirmButton: 'btn btn-danger',
                                      cancelButton: 'btn btn-outline-danger ms-1'
                                    },
                                    buttonsStyling: false
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      dispatch(
                                        deleteWorkspace({ id: store.selectedWorkspace._id })
                                      );
                                      Swal.fire(
                                        'Deleted!',
                                        'The task(s) have been deleted.',
                                        'success'
                                      );
                                    }
                                  });
                                }}
                              >
                                <Trash className="me-50" size={15} />{' '}
                                <span className="align-middle">Delete</span>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            <div className="create-workspace-btn mt-1">
              <Button color="primary" block outline onClick={handleOpenAddWorkspace}>
                <Plus size={14} className="me-25" />
                New Workspace
              </Button>
            </div>
            <div className="month mt-1">
              <div className="d-flex justify-content-between">
                <h5 className="section-label px-1" style={{ marginTop: '12px', marginLeft: '5px' }}>
                  Status
                </h5>

                <button
                  id="task-status-setting"
                  className="btn-icon me-2 btn float-end"
                  style={{
                    cursor: 'pointer',
                    border: 'none !important',
                    background: 'transparent !important'
                  }}
                  onClick={handleToggleStatusSetting}
                >
                  <FiSettings color="secondary" size={15} />
                </button>
                <UncontrolledTooltip placement={'top'} target={'task-status-setting'}>
                  Task Status Management
                </UncontrolledTooltip>
              </div>
              {store?.boards?.map((status, i) => {
                const statusNum = (i + 1).toString();
                return (
                  <div
                    key={`status-${status?._id}`}
                    className={classnames(
                      'd-flex justify-content-between align-items-center px-1 list-workspace-item',
                      {
                        active: selectedStatus?.statusNum === statusNum
                      }
                    )}
                  >
                    <ListGroupItem
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleTabs({ statusNum, status })}
                      action
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div
                            className="color-bullet me-1"
                            style={{ backgroundColor: cvtColor[status.color] }}
                          ></div>
                          {status?.title}
                        </div>
                        <Badge className="float-end me-1" color="light-primary" pill>
                          {store.tasks.filter((x) => x.boardId == status._id).length}
                        </Badge>
                      </div>
                    </ListGroupItem>
                  </div>
                );
              })}
            </div>
          </ListGroup>
        </div>
        <Modal
          isOpen={newWorkspace}
          toggle={() => setNewWorkspace(!newWorkspace)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setNewWorkspace(!newWorkspace)}>
            Create A New Workspace
          </ModalHeader>
          <ModalBody>
            <div>
              <Label>Workspace title</Label>
              <Input
                type="text"
                id="newWorkspaceTitle"
                name="newWorkspaceTitle"
                placeholder="My Workspace"
                onChange={handleNewWorkspaceTitle}
                valid={createNewValidation}
                invalid={!createNewValidation}
              />
              <FormFeedback valid={createNewValidation}>
                {createNewValidation
                  ? 'Sweet! That name is available.'
                  : 'Oh no! That name is already taken.'}
              </FormFeedback>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={handleAddWorkspaceFormSubmit}
              disabled={!createNewValidation || !newWSTitle}
            >
              Create
            </Button>
            <Button color="secondary" onClick={() => setNewWorkspace(!newWorkspace)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <StatusManage
          workspaceId={store?.selectedWorkspace?._id}
          isOpen={toggleStatus}
          store={store}
          setIsOpen={setToggleStatus}
        />

        <NewModal
          store={store}
          dispatch={dispatch}
          modalType={modalType}
          setModalType={setModalType}
          deleteWorkspace={deleteWorkspace}
        />
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
