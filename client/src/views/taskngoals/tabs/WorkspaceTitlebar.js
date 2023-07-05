// ** React Imports
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

// ** Icons Imports
import { ChevronRight, MoreVertical, UserPlus } from 'react-feather';
// ** Reactstrap Component Imports
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap';
// ** Custom Components
import { FiEye, FiSettings } from 'react-icons/fi';
import Avatar from '@components/avatar';
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWorkspaceApi,
  getSelectedWorkspaceData,
  shareRevertWorkspace
} from '../../apps/workspace/store';

// ** Style
import '@src/assets/styles/toggle-switch.scss';

import StatusManage from '../../tasks/task-list/StatusManage';
import WorkspaceTitle from '../../apps/workspace';
import About from '../About';
import ShareModal from '../Share';
import TaskActivitySidebar from '../../tasks/task-list/taskActivity';
import { RxActivityLog } from 'react-icons/rx';

const WorkspaceTitleBar = (props) => {
  const {
    workspace,
    handleWorkspaceCollapse,
    collapse,
    setToggle,
    toggleListOrBoard,
    optionLabels,
    selectedTab
  } = props;
  // ** States
  const [aboutOpen, setAboutOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [activitySideBarOpen, setActivitySideBarOpen] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(false);
  const [curAssignedArr, setCurAssignedArr] = useState([]);
  // ** Redux Store
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state?.totalContacts?.contactList?.list);
  // ** Handlers
  const handleToggleStatus = () => {
    setToggleStatus(true);
  };

  const activitySidebarToggle = () => {
    setActivitySideBarOpen(!activitySideBarOpen);
  };

  const store = useSelector((state) => {
    return {
      ...state.workspace
    };
  });

  useEffect(() => {
    dispatch(fetchWorkspaceApi()).then((res) => {
      if (res.payload) {
        dispatch(getSelectedWorkspaceData(res.payload[0]._id));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    let tmp = [];
    if (contacts?.length && store?.selectedWorkspace?.collaborators?.length) {
      store?.selectedWorkspace.collaborators.map((item) => {
        let contact = contacts.find((contact) => contact?._id == item?.id);
        if (contact) {
          tmp.push({ ...contact, label: contact.fullName });
        }
      });
    }
    setCurAssignedArr(tmp);
  }, [contacts, store.selectedWorkspace.collaborators]);

  // ** Renders Collaborators
  const renderCollaborators = () => {
    return curAssignedArr ? (
      <div className="own-avatar-group">{curAssignedArr.map((row) => renderAssignee(row))}</div>
    ) : (
      ''
    );
  };

  const renderAssignee = (row) => {
    let tmpValue = 0;
    if (row && row.label && Object.keys(row).length > 0) {
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

    return (
      <div className="own-avatar">
        {row?.label ? (
          <UncontrolledTooltip placement={row?.placement} target={row.label.split(' ').join('-')}>
            {row.label}
          </UncontrolledTooltip>
        ) : null}
        {row?.photo ? (
          <Avatar
            className={classnames('pull-up', {
              [row.className]: row.className
            })}
            img={row.photo}
            width="32"
            height="32"
            {...(row.label ? { id: row.label.split(' ').join('-') } : {})}
          />
        ) : (
          <Avatar
            color={color || 'primary'}
            className={classnames('pull-up', {
              [row?.className]: row?.className
            })}
            content={row?.label || 'John Doe'}
            {...(row?.label ? { id: row?.label.split(' ').join('-') } : {})}
            width="32"
            height="32"
            initials
          />
        )}
      </div>
    );
  };

  const handleKeyPress = (e) => {
    if (e.keyCode !== 32) return;

    e.preventDefault();
    setToggle(!toggleListOrBoard);
  };

  const shareWorkspaceBtnClicked = () => {
    setShareOpen(true);
  };

  const aboutThisWorkspace = (e) => {
    e.preventDefault();
    setAboutOpen(true);
  };
  const id = 'toggle-switch-task';
  const name = 'toggle-switch-task';

  return (
    <div className="workspace-title">
      <div className="d-flex align-items-center">
        {collapse ? (
          <Button
            className="btn-icon btn-toggle-sidebar ms-1"
            size="sm"
            color="flat-dark"
            onClick={handleWorkspaceCollapse}
          >
            <ChevronRight size={14} style={{ margin: '-2px -2px' }} />
          </Button>
        ) : null}
        <WorkspaceTitle workspace={workspace} dispatch={dispatch} />
      </div>
      <div className="d-flex align-items-center p-1">
        {selectedTab === '2' && (
          <>
            {renderCollaborators()}
            <Button
              color="flat-success"
              style={{ borderRadius: '20px', marginInline: '10px', padding: '5px 21px' }}
              className="d-flex"
              onClick={shareWorkspaceBtnClicked}
            >
              <UserPlus size={16} />
              <span className="align-middle ms-25">Share</span>
            </Button>
            <div id="task-toggle-board-list" className="toggle-switch">
              <input
                type="checkbox"
                name={name}
                className="toggle-switch-checkbox"
                id={id}
                checked={toggleListOrBoard}
                onChange={(e) => setToggle(e.target.checked)}
              />
              {id ? (
                <label
                  className="toggle-switch-label"
                  // tabIndex={disabled ? -1 : 1}
                  onKeyDown={(e) => handleKeyPress(e)}
                  htmlFor={id}
                >
                  <span
                    className="toggle-switch-inner"
                    data-yes={optionLabels[0]}
                    data-no={optionLabels[1]}
                    tabIndex={-1}
                  />
                  <span className="toggle-switch-switch" tabIndex={-1} />
                </label>
              ) : null}
            </div>
            <UncontrolledTooltip placement={'top'} target={'task-toggle-board-list'}>
              Switch List and Board
            </UncontrolledTooltip>

            <Button
              id="task-activity-viewer"
              color="light-primary"
              className="p-0 ms-1 me-1"
              onClick={(e) => {
                e.preventDefault();
                setActivitySideBarOpen(true);
              }}
            >
              <RxActivityLog size={16} />
            </Button>
            <UncontrolledTooltip placement={'top'} target={'task-activity-viewer'}>
              Task Activity
            </UncontrolledTooltip>

            <UncontrolledDropdown>
              <DropdownToggle
                className="hide-arrow"
                tag="a"
                href="/"
                onClick={(e) => e.preventDefault()}
              >
                <MoreVertical className="text-body" size={16} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag={Link} to="/" onClick={aboutThisWorkspace}>
                  About this workspace
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </>
        )}
        <About
          store={store}
          selectedWorkspace={store.selectedWorkspace}
          isOpen={aboutOpen}
          setIsOpen={setAboutOpen}
        />
        <ShareModal
          store={store}
          selectedWorkspace={store.selectedWorkspace}
          isOpen={shareOpen}
          setIsOpen={setShareOpen}
          curAssignedArr={curAssignedArr}
        />
        <TaskActivitySidebar
          isOpen={activitySideBarOpen}
          activitySidebarToggle={activitySidebarToggle}
          workspaceId={workspace?._id}
        />
      </div>
    </div>
  );
};

export default WorkspaceTitleBar;
