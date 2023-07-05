// ** React Imports
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Plus } from 'react-feather';
import Sidebar2 from '@components/sidebar';
// ** Reactstrap Imports

import { Button, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { useState } from 'react';
import NotesTable from '../notes/NotesTable';

const Sidebar = (props) => {
  const [open, setopen] = useState(false);
  // ** Props
  const { title, setTitle, firstArrNum, secondArrNum, thirdArrNum, fourthArrNum, fifthArrNum } =
    props;
  // ** States
  // ** Handlers
  const handleActiveItem = (value) => {
    if (title === value) {
      return true;
    } else {
      return false;
    }
  };
  const handlechange = (value) => {
    setTitle(value);
  };
  const { sidebarOpen } = props;
  return (
    <div
      className={classnames('sidebar-left', {
        show: sidebarOpen
      })}
    >
      <div className="sidebar">
        <div className="sidebar-content email-app-sidebar">
          <div className="email-app-menu">
            <div className="form-group-compose text-center compose-btn">
              <Button
                color="primary"
                className="compose-email"
                block
                onClick={() => setopen(!open)}
              >
                View Notes
              </Button>
            </div>
            <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
              <ListGroup tag="div" className="list-group-messages">
                <ListGroupItem
                  className="cursor-pointer"
                  action
                  active={handleActiveItem('0-6 Days')}
                  onClick={() => {
                    handlechange('0-6 Days');
                  }}
                >
                  <span className="align-middle">0-6 Days</span>
                  <Badge className="float-end" color="light-primary" pill>
                    {firstArrNum}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  action
                  className="cursor-pointer"
                  active={handleActiveItem('7-14 Days')}
                  onClick={() => {
                    handlechange('7-14 Days');
                  }}
                >
                  <span className="align-middle">7-14 Days</span>
                  <Badge className="float-end" color="light-primary" pill>
                    {secondArrNum}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  action
                  className="cursor-pointer"
                  active={handleActiveItem('15-30 Days')}
                  onClick={() => {
                    handlechange('15-30 Days');
                  }}
                >
                  <span className="align-middle">15-30 Days</span>
                  <Badge className="float-end" color="light-primary" pill>
                    {thirdArrNum}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  action
                  className="cursor-pointer"
                  active={handleActiveItem('31-60 Days')}
                  onClick={() => {
                    handlechange('31-60 Days');
                  }}
                >
                  <span className="align-middle">31-60 Days</span>
                  <Badge className="float-end" color="light-primary" pill>
                    {fourthArrNum}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  action
                  className="cursor-pointer"
                  active={handleActiveItem('60+ Days')}
                  onClick={() => {
                    handlechange('60+ Days');
                  }}
                >
                  <span className="align-middle">61+ Days</span>
                  <Badge className="float-end" color="light-primary" pill>
                    {fifthArrNum}
                  </Badge>
                </ListGroupItem>
              </ListGroup>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
      <Sidebar2
        size="lg"
        open={open}
        title="Retention Notes"
        width="700"
        headerClassName="mb-1"
        contentClassName="pt-0"
        toggleSidebar={() => setopen(false)}
        onClosed={() => setopen(false)}
      >
        <NotesTable />
      </Sidebar2>
    </div>
  );
};

export default Sidebar;
