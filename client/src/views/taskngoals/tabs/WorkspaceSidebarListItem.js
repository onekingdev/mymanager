import { useState } from 'react';
import { MoreVertical, Plus, Trash } from 'react-feather';
import { useSelector } from 'react-redux';

import classnames from 'classnames';
import Swal from 'sweetalert2';

import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ListGroupItem,
  UncontrolledDropdown
} from 'reactstrap';

const WorkspaceSidebarListItem = (props) => {
  const { store, workspace, handleAddTaskClick, handleWorkspaceClick } = props;

  const allTasks = useSelector((state) => state?.kanban?.tasks);

  const [style, setStyle] = useState({ visibility: 'invisible', opacity: 0 });

  return (
    <div
      className={classnames(
        'd-flex justify-content-between align-items-center px-1 list-workspace-item',
        {
          active: store.selectedWorkspace.title === workspace.title
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
      onClick={() => handleWorkspaceClick(workspace)}
    >
      <ListGroupItem
        active={store.selectedWorkspace.title === workspace.title ? true : false}
        action
      >
        <div className="d-flex justify-content-between align-middle">
          <div className="ws-name d-flex align-items-center">
            <span>{workspace.title}</span>
          </div>
        </div>
      </ListGroupItem>
      <div className="d-flex align-items-center">
        <Badge color="light-primary" style={{ position: 'relative' }} pill>
          {
            allTasks.filter(
              (x) => x.isDelete == false && workspace?.boards?.includes(x.boardId?._id)
            )?.length
          }
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
                  handleAddTaskClick(e);
                }}
                disabled={!store.boards.length}
              >
                <Plus className="me-50" size={15} /> <span className="align-middle">Add Task</span>
              </DropdownItem>
              {workspace?.title !== 'Personal' && workspace?.title !== 'Business' && (
                <DropdownItem
                  href="/"
                  onClick={(e) => {
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
                        dispatch(deleteWorkspace({ id: store.selectedWorkspace._id }));
                        Swal.fire('Deleted!', 'The task(s) have been deleted.', 'success');
                      }
                    });
                  }}
                >
                  <Trash className="me-50" size={15} /> <span className="align-middle">Delete</span>
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSidebarListItem;
