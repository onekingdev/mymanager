// ** React Imports
import { useState, useEffect } from 'react';

import { Plus, ChevronLeft, ChevronRight, MoreHorizontal, Trash } from 'react-feather';

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

//** useSelector from redux
import { useSelector, useDispatch } from 'react-redux';

import { getProjectsData, projectsData, workspaceDelete } from '../store/reducer';

//** API
import { createProject, deleteProject } from '../../../../requests/projects/project';
import ProjectModal from '../modal/Modal';
import Swal from 'sweetalert2';

const WorkspaceSidebar = ({ collapse, handleWorkspaceCollapse }) => {
  let workspaceData = useSelector((state) => state.projectManagement.projectsData);

  let dispatch = useDispatch();
  const [workspace, setWorkspace] = useState();
  const [currentWorkspaceID, setcurrentWorkspaceID] = useState();
  const [newWorkspace, setNewWorkspace] = useState(false);
  const [createNewValidation, setCreateNewValidation] = useState(true);
  const [newWorkspaceTitle, setNewWorkspaceTitle] = useState('');
  const [deleteWorkspaceModal, setDeleteWorkspaceModal] = useState(false);

  const [style, setStyle] = useState({ display: 'none' });

  useEffect(() => {
    if (workspaceData && workspaceData.length > 0) {
      setWorkspace(workspaceData);
    } else {
      setWorkspace([]);
    }
    if (currentWorkspaceID) {
      let updatedWorkspace = workspaceData.find(
        (workspace) => workspace._id === currentWorkspaceID
      );
      dispatch(getProjectsData(updatedWorkspace));
    } else {
      workspaceData ? dispatch(getProjectsData(workspaceData[0])) : [];
    }
  }, [workspaceData]);

  const toggleDeleteWorkspace = () => {
    setDeleteWorkspaceModal(!deleteWorkspaceModal);
    setcurrentWorkspaceID(workspace._id);
  };

  const handleOpenAddWorkspace = (e) => {
    e.preventDefault();
    setNewWorkspace(true);
  };

  const handleNewWorkspaceTitle = (e) => {
    e.preventDefault();
    setNewWorkspaceTitle(e.target.value);
    setCreateNewValidation(workspace.filter((x) => x.name === e.target.value).length === 0);
  };

  const handleAddWorkspaceFormSubmit = () => {
    createProject({ name: newWorkspaceTitle }).then((response) => {
      dispatch(projectsData(response?.data.result));
    });
    setNewWorkspace(false);
  };

//   const handleDeleteWorkspace = () => {
//     deleteProject(currentWorkspaceID).then((response) => {
//       dispatch(workspaceDelete({ workspaceID: currentWorkspaceID }));
//       toggleDeleteWorkspace();
//       setcurrentWorkspaceID('');
//     });
//   };

  const handleDeleteWorkspace = () => {
    Swal.fire({
        title: 'Delete?',
        text: 'Are you sure you want to delete this workspace?',
        // icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete anyway',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(currentWorkspaceID).then((response) => {
          dispatch(workspaceDelete({ workspaceID: currentWorkspaceID }));
          toggleDeleteWorkspace();
          setcurrentWorkspaceID('');
        });
      }
    });
  };

  const handleWorkspaceClick = (workspace) => {
    setcurrentWorkspaceID(workspace._id);
    dispatch(getProjectsData(workspace));
  };

  return (
    <div className="project-sidebar" style={{ width: '250px', height: '100%' }}>
      <div className="sidebar-content task-sidebar">
        <div className="task-app-menu">
          <ListGroup
            className={`sidebar-menu-list ${collapse ? 'd-none' : 'd-block'}`}
            options={{ wheelPropagation: false }}
          >
            <div
              className="py-1 ps-1 d-flex justify-content-between align-items-center"
              style={{ marginLeft: '0.5rem' }}
            >
              <div style={{ fontSize: '20px', fontWeight: 800 }}>My Projects</div>
              <Button className="btn-icon" color="flat-dark" onClick={handleWorkspaceCollapse}>
                {collapse ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </Button>
            </div>

            {workspace?.map((workspace, index) => {
              return (
                <ListGroupItem
                  key={workspace._id}
                  active={
                    workspace._id === currentWorkspaceID || (index === 0 && !currentWorkspaceID)
                      ? true
                      : false
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    handleWorkspaceClick(workspace);
                  }}
                  action
                  onMouseEnter={() => {
                    setStyle({
                      display: 'block'
                    });
                  }}
                  onMouseLeave={() => {
                    setStyle({
                      display: 'none'
                    });
                  }}
                >
                  <div className="d-flex justify-content-between align-middle">
                    <div className="ws-name">
                      <span>{workspace.name}</span>
                    </div>
                    <div style={style}>
                      <div className="d-flex align-items-center">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="icon-btn hide-arrow m-0 p-0"
                            color="transparent"
                            size="sm"
                            caret
                          >
                            <MoreHorizontal size={18} />
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              href="/"
                              onClick={handleDeleteWorkspace}
                              style={{ color: '#ea5455' }}
                            >
                              <Trash className="me-50" size={15} />{' '}
                              <span className="align-middle">Delete</span>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </ListGroupItem>
              );
            })}
            <div className="project-create-workspace-btn my-1">
              <Button color="primary" outline onClick={handleOpenAddWorkspace}>
                <Plus size={14} className="me-25" />
                New Workspace
              </Button>
            </div>
          </ListGroup>
        </div>
        <ProjectModal
          title="Do you really want to delete this workspace?"
          toggle={toggleDeleteWorkspace}
          modal={deleteWorkspaceModal}
          saveButtonText="Delete"
          saveButtonColor="danger"
          onClick={handleDeleteWorkspace}
        />

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
              disabled={!createNewValidation || !newWorkspaceTitle}
            >
              Create
            </Button>
            <Button color="secondary" onClick={() => setNewWorkspace(!newWorkspace)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
