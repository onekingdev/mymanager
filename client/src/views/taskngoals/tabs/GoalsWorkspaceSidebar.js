import { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, MoreVertical, Trash } from 'react-feather';
import { Home, Layers } from 'react-feather';
// ** Reactstrap Imports
import {
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
  DropdownItem
} from 'reactstrap';
import Swal from 'sweetalert2';
import { activeWorkspaceSetAction, addGoalWorkspaceAction, deleteGoalWorkspaceAction } from '../store/actions';

const GoalsWorkspaceSidebar = (props) => {
  const { workSpaces, dispatch, collapse, params, handleWorkspaceCollapse, activeWorkspace } = props;
  const [newWorkspace, setNewWorkspace] = useState(false);
  const [createNewValidation, setCreateNewValidation] = useState(true);
  const [newWSTitle, setNewWSTitle] = useState('');
  const [style, setStyle] = useState({ visibility: 'invisible', opacity: 0 });
  const WorkspaceSidebarName = 'Goals Workspace';
  const handleOpenAddWorkspace = (e) => {
    e.preventDefault();
    setNewWorkspace(true);
  };
  const handleAddWorkspaceFormSubmit = (e) => {
    e.preventDefault();
    const payload = { title: newWSTitle };
    dispatch(addGoalWorkspaceAction(payload));
    setNewWorkspace(false);
  };

  const handleWorkspaceClick = (workspace, e) => {
    dispatch(activeWorkspaceSetAction(workspace))

  };
  const handleNewWorkspaceTitle = (e) => {
    e.preventDefault();
    setNewWSTitle(e.target.value);
    setCreateNewValidation(workSpaces?.filter((x) => x.title === e.target.value).length === 0);
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
            {workSpaces?.map((workspace, index) => {
              return workspace.title == 'Personal' || workspace.title == 'Business' ? (
                <div className="d-flex justify-content-between align-items-center px-1 list-workspace-item"
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
                  }}>
                  <ListGroupItem
                    key={index}
                    active={workspace.title === activeWorkspace?.title ? true : false}
                    action
                    onClick={() => handleWorkspaceClick(workspace)}
                  >

                    <div className="d-flex justify-content-between align-items-center" >
                      <div className="ws-name d-flex align-items-center">
                        <span>{workspace.title}</span>
                      </div>

                    </div>

                  </ListGroupItem>
                </div>
              ) : null;
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
            {workSpaces?.map((workspace, index) => {
              return workspace.title !== 'Personal' && workspace.title !== 'Business' ? (
                <div className="d-flex justify-content-between align-items-center px-1 list-workspace-item"
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
                  }}>
                  <ListGroupItem
                    key={index}
                    active={workspace.title === activeWorkspace?.title ? true : false}
                    action
                  >
                    <div className="d-flex justify-content-between align-middle">
                      <div
                        className="ws-name d-flex align-items-center"
                        onClick={() => handleWorkspaceClick(workspace)}
                      >
                        <span>{workspace.title}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="btn-more-vertical" style={style}>

                          <Trash onClick={(e) => {
                            e.preventDefault();
                            Swal.fire({
                              title: 'Delete?',
                              text: 'Are you sure you want to delete the this workspace?',
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
                                dispatch(deleteGoalWorkspaceAction(workspace._id));
                                Swal.fire(
                                  'Deleted!',
                                  'The task(s) have been deleted.',
                                  'success'
                                );
                              }
                            });
                          }} className="me-50" size={15} />

                        </div>
                      </div>
                    </div>
                  </ListGroupItem>
                </div>
              ) : null;
            })}
            <div className="create-workspace-btn mt-1">
              <Button color="primary" block outline onClick={handleOpenAddWorkspace}>
                <Plus size={14} className="me-25" />
                New Workspace
              </Button>
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
              <Label className="form-label" for="validState">
                Workspace title
              </Label>
              <Input
                type="text"
                id="newWorkspaceTitle"
                name="newWorkspaceTitle"
                placeholder="My Workspace"
                onChange={handleNewWorkspaceTitle}
                valid={createNewValidation && newWSTitle.length > 0}
                invalid={!createNewValidation}
              />
              <FormFeedback valid={createNewValidation}>
                {createNewValidation
                  ? newWSTitle.length < 1 ? '' : 'Sweet! That name is available.'
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
      </div>
    </div >
  );
};
export default GoalsWorkspaceSidebar;