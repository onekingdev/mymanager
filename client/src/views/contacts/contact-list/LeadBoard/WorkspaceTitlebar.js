// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// ** Icons Imports
import { ChevronLeft, ChevronRight, MoreVertical, Share, UserPlus, Users } from 'react-feather';
// ** Reactstrap Component Imports
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import AddNewStage from './AddNewStage';

// ** Style
import '@src/assets/styles/toggle-switch.scss';
import { FiSettings } from 'react-icons/fi';

const WorkspaceTitleBar = (props) => {
  const { handleWorkspaceCollapse, collapse, active, setActive, leadStore } = props;

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(true);
  };

  const id = 'toggle-switch-task';
  const name = 'toggle-switch-task';

  const handleKeyPress = (e) => {
    if (e.keyCode !== 32) return;

    e.preventDefault();

    if (active == '2') {
      setActive('3');
    } else {
      setActive('2');
    }
  };

  return (
    <div className="workspace-title border-bottom d-flex justify-content-between">
      {collapse ? (
        <Button
          className="btn-icon"
          size="sm"
          color="flat-dark"
          onClick={handleWorkspaceCollapse}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            marginLeft: '5px',
            marginTop: '5px',
            border: '2px solid $border-color',
            position: 'absolute'
          }}
        >
          <ChevronRight size={16} style={{ margin: '-2px -2px' }} />
        </Button>
      ) : null}
      <div className="w-100" style={{ height: '40px' }}></div>

      <div className="d-flex align-items-center">
        <div className="toggle-switch">
          <input
            type="checkbox"
            name={name}
            className="toggle-switch-checkbox"
            id={id}
            checked={active == '2'}
            onChange={(e) => {
              setActive(e.target.checked ? '2' : '3');
              localStorage.setItem('LeadToggleIndex', e.target.checked ? '2' : '3');
            }}
          />
          {id ? (
            <label
              className="toggle-switch-label"
              // tabIndex={disabled ? -1 : 1}
              onKeyDown={(e) => handleKeyPress(e)}
              htmlFor={id}
            >
              <span className="toggle-switch-inner" data-yes="List" data-no="Board" tabIndex={-1} />
              <span className="toggle-switch-switch" tabIndex={-1} />
            </label>
          ) : null}
        </div>
        {collapse ? (
          <Button color="flat-primary" className="p-1 me-1">
            <FiSettings color="secondary" size={15} onClick={handleToggle} />
          </Button>
        ) : null}
        <UncontrolledDropdown>
          <DropdownToggle
            className="hide-arrow me-1"
            tag="a"
            href="/"
            onClick={(e) => e.preventDefault()}
          >
            <MoreVertical className="text-body" size={16} />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag={Link} to="/" onClick={() => {}}>
              About this workspace
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={() => {}}>
              Change background
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={() => {}}>
              Upgrade
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={() => {}}>
              Activity
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={() => {}}>
              More
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <AddNewStage modalType={toggle} leadStore={leadStore} setModalType={setToggle} />
    </div>
  );
};

export default WorkspaceTitleBar;
