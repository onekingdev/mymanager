// ** React Imports
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// ** Custom Components
import Avatar from '@components/avatar';

// ** Icons Imports
import { Edit, Eye, MoreVertical, Trash } from 'react-feather';

// icons import from react-icon

import { BiPhoneCall } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsChatLeftTextFill } from 'react-icons/bs';

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { deleteEvent } from './store';

// ** Utility Imports
import { formatTime } from '@src/utility/Utils';

// ** Renders Client Columns
const useColumns = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const renderClient = (row) => {
    return (
      <Link
        to={`/event-details/${row._id}`}
        // onClick={() => store.dispatch(getUser(row.id))}
      >
        <Avatar className="me-1" img={row?.eventBanner} width="32" height="32" />
      </Link>
    );
  };
  const handleDeleteEvent = (id) => {
    dispatch(deleteEvent(id));
  };
  const formatDate = (dateString) => {
    if (!dateString) return '';
    let date;
    try {
      date = new Date(dateString);
      let month = '';
      if (date.getMonth() < 9) month = '0' + date.getMonth();
      else month = date.getMonth();
      return month + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + formatTime(date);
    } catch {
      return '';
    }
  };

  const columns = [
    {
      name: 'Title',
      sortable: true,
      minWidth: '10%',
      sortField: 'fullName',
      selector: (row) => row.fullName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <Link
              to={`/event-details/${row._id}`}
              className="user_name text-truncate text-body"
              // onClick={() => store.dispatch(getUser(row.id))}
            >
              <span className="fw-bolder">{row?.title}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">{row.notes}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Start Time',
      width: '15%',
      sortable: true,
      sortField: 'status',
      selector: (row) => row.start,
      cell: (row) => <span>{formatDate(row.start)}</span>
    },
    {
      name: 'End Time',
      width: '15%',
      selector: (row) => row.end,
      cell: (row) => <span>{formatDate(row.end)}</span>
    },

    {
      name: 'Actions',
      minWidth: '10%',
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag="span"
                href={`event-details/${row._id}`}
                onClick={() => history.push(`event-details/${row._id}`)}
                className="w-100"
              >
                <Eye size={14} className="me-50" />
                <span className="align-middle">View Detail</span>
              </DropdownItem>
              <DropdownItem
                tag="span"
                className="w-100"
                onClick={() => history.push(`edit-event/${row._id}`)}
              >
                <Edit size={14} className="me-50" />
                <span className="align-middle">Edit Event</span>
              </DropdownItem>
              <DropdownItem
                tag="span"
                className="w-100"
                onClick={(e) => {
                  handleDeleteEvent(row._id);
                }}
              >
                <Trash size={14} className="me-50" />
                <span className="align-middle">Delete Event</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];

  return {
    columns
  };
};

export default useColumns;
