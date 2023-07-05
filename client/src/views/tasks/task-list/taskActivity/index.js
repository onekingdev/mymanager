import React, { useEffect, useState } from 'react';

// ** Reactstrap
import {
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';

// ** Actions
import { getActivity, getLastViewed, setLastViewed } from '../../../apps/kanban/store';

// ** Components
import classnames from 'classnames';

import Activity from './Activity';
import LastSeen from './LastSeen';

// ** Styles & Icons
import { ChevronDown } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';

const TaskActivitySidebar = (props) => {
  // ** Props
  const { isOpen, activitySidebarToggle, workspaceId } = props;

  // ** States
  // const [activityList, setActivityList] = useState([]);
  const activityList = useSelector((state) => state?.kanban?.activity);
  const [lastSeenList, setLastSeenList] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [activeTab, setActiveTab] = useState('activity');

  // ** Dispatch
  const dispatch = useDispatch();

  // ** Effects
  useEffect(() => {
    if (isOpen) {
      dispatch(getActivity());
      setLastViewed({ workspaceId }).then((res1) => {
        getLastViewed({ workspaceId }).then((res2) => {
          console.log(res2);
          if (res2.status == 201) {
            setLastSeenList(res2.data.data);
          }
        });
      });
    }
  }, [isOpen]);

  useEffect(() => {}, [filterOptions, activityList]);

  // ** Variables

  // ** Methods

  return (
    <Modal
      isOpen={isOpen}
      className="sidebar-lg"
      contentClassName="p-0"
      toggle={activitySidebarToggle}
      modalClassName="modal-slide-in sidebar-kanban-modal"
      style={{ width: '670px' }}
    >
      <ModalHeader>Task Activity</ModalHeader>
      <ModalBody className="mt-0 mb-0 h-100">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === 'activity'
              })}
              onClick={() => {
                setActiveTab('activity');
              }}
            >
              <h5 className="modal-title">Activity</h5>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === 'lastViewed'
              })}
              onClick={() => {
                setActiveTab('lastViewed');
              }}
            >
              <h5 className="modal-title">Last Viewed</h5>
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === 'updates'
              })}
              onClick={() => {
                setActiveTab('updates');
              }}
            >
              <h5 className="modal-title">Updates</h5>
            </NavLink>
          </NavItem> */}
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="activity">
            <Activity activityList={activityList} />
          </TabPane>
          <TabPane tabId="lastViewed">
            <LastSeen lastSeenList={lastSeenList} />
          </TabPane>
          {/* <TabPane tabId="updates"></TabPane> */}
        </TabContent>
      </ModalBody>
    </Modal>
  );
};

export default TaskActivitySidebar;
