// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Bell, X, Check, AlertTriangle } from 'react-feather';

// ** Reactstrap Imports
import {
  Button,
  Badge,
  Input,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import { SocketContext } from '../../../utility/context/Socket';
import { getUserData, formatToShortName, formatDateToMonthShort } from '../../../utility/Utils';
import { getNewWorkspaceApi } from '../../../views/apps/workspace/store';
const NotificationDropdown = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const [notificationArr, setNotificationArr] = useState([]);

  // ** Redux Store

  const newWorkspace = useSelector((state) => state?.workspace?.newWorkspace);

  useEffect(() => {
    dispatch(getNewWorkspaceApi());
  }, []);
  useEffect(() => {
    if (newWorkspace?.length > 0) {
      let tmp = [...notificationArr];
      newWorkspace.map((newWorkspaceItem) => {
        if (newWorkspaceItem?.assigner && newWorkspaceItem?.workspace) {
          tmp.push({
            link: '/tasksAndGoals/2',
            fullName:
              newWorkspaceItem.assigner.firstName + ' ' + newWorkspaceItem.assigner.lastName,
            subtitle: `${
              newWorkspaceItem.assigner.firstName + ' ' + newWorkspaceItem.assigner.lastName
            } shared ${newWorkspaceItem.workspace.title} workspace`,
            date: formatDateToMonthShort(newWorkspaceItem.workspace.updatedAt),
            title: (
              <p className="media-heading">
                <span className="fw-bolder">New shared 🎉</span>workspace!
              </p>
            )
          });
        }
      });
      setNotificationArr(tmp);
    } else return;
  }, [newWorkspace]);
  useEffect(() => {
    socket.on('newWorkspace', (data) => {
      if (data.assigneeArr.includes(getUserData().id)) {
        let tmp = [...notificationArr];
        tmp.push({
          link: '/tasksAndGoals/2',
          fullName: data.assigner,
          subtitle: `${data.assigner} shared ${data.workspace} workspace`,
          date: formatDateToMonthShort(new Date()),
          title: (
            <p className="media-heading">
              <span className="fw-bolder">New shared 🎉</span>workspace!
            </p>
          )
        });
        setNotificationArr(tmp);
      }
    });
    return () => {
      socket.off('newWorkspace');
    };
  }, [socket]);

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component="li"
        className="media-list scrollable-container"
        options={{
          wheelPropagation: false
        }}
      >
        {notificationArr.map((item, index) => {
          return (
            <div className="d-flex align-items-center py-1">
              <a key={index} className="d-flex align-items-center" href={item.link}>
                <div className="p-50">
                  <Avatar
                    color="primary"
                    imgHeight="40"
                    imgWidth="40"
                    status="online"
                    content={formatToShortName(item.fullName) || 'N/A'}
                  />
                </div>
                <div className="ps-2">
                  <h4>{item.title}</h4>
                  <h4 className="font-small-4 mb-0">{item.subtitle}</h4>
                </div>
                <div className="ps-1">
                  <h4>{item?.date}</h4>
                </div>
              </a>
            </div>
          );
        })}
      </PerfectScrollbar>
    );
  };
  /*eslint-enable */

  return (
    <UncontrolledDropdown tag="li" className="dropdown-notification nav-item me-25">
      <DropdownToggle tag="a" className="nav-link" href="/" onClick={(e) => e.preventDefault()}>
        <Bell size={21} />
        <Badge pill color="danger" className="badge-up">
          {notificationArr?.length > 0 ? notificationArr?.length : 0}
        </Badge>
      </DropdownToggle>
      <DropdownMenu end tag="ul" className="dropdown-menu-media mt-0">
        <li className="dropdown-menu-header">
          <DropdownItem className="d-flex" tag="div" header>
            <h4 className="notification-title mb-0 me-auto">Notifications</h4>
            <Badge tag="div" color="light-primary" pill>
              {notificationArr?.length > 0 ? notificationArr?.length : 0}
            </Badge>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        <li className="dropdown-menu-footer">
          <Button color="primary" block>
            Read all notifications
          </Button>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default NotificationDropdown;
