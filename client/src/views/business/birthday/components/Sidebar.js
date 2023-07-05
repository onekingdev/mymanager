/* eslint-disable no-unused-vars */
// ** React Imports
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// ** Third Party Components
import { Button, ListGroup, ListGroupItem, Badge, Collapse } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Select from 'react-select';
import classnames from 'classnames';
import { Plus } from 'react-feather';
// ** Reactstrap Imports

import Sidebar2 from '@components/sidebar';
import BookingTable from '../booking/BookingTable';
import { selectThemeColors } from '../../../../utility/Utils';
const Sidebar = (props) => {
  const {
    title,
    setTitle,
    weekArr,
    monthArr,
    nextMonthArr,
    byMonthArr,
    sidebarOpen,
    byMonth,
    setByMonth
  } = props;

  const [open, setopen] = useState(false);
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  // ** Props
  const isActiveItem = (value) => {
    if (title === value) {
      return true;
    } else {
      return false;
    }
  };

  const toggleByMonth = () => {
    setIsCollapseOpen(!isCollapseOpen);
  };

  const handleTimeClick = (time) => {
    setTitle(time);
    setByMonth({});
  };

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
                View Bookings
              </Button>
            </div>
            <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
              <ListGroup tag="div" className="list-group-messages">
                <ListGroupItem
                  action
                  active={isActiveItem('This Week')}
                  className="cursor-pointer"
                  onClick={() => {
                    handleTimeClick('This Week');
                  }}
                >
                  <span className="align-middle">THIS WEEK</span>
                  <Badge className="float-end" color="light-primary" pill>
                    {weekArr.length}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  action
                  className="cursor-pointer"
                  active={isActiveItem('This Month')}
                  onClick={() => {
                    handleTimeClick('This Month');
                  }}
                >
                  <span className="align-middle">THIS MONTH</span>
                  <Badge className="float-end" color="light-primary" pill>
                    {monthArr.length}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  action
                  className="cursor-pointer"
                  active={isActiveItem('Next Month')}
                  onClick={() => {
                    handleTimeClick('Next Month');
                  }}
                >
                  <span className="align-middle">NEXT MONTH</span>
                  <Badge className="float-end" color="light-primary" pill>
                    {nextMonthArr.length}
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
        title="Birthday Bookings"
        width="700"
        headerClassName="mb-1"
        contentClassName="pt-0"
        toggleSidebar={() => setopen(false)}
        onClosed={() => setopen(false)}
      >
        <BookingTable />
      </Sidebar2>
    </div>
  );
};

export default Sidebar;
