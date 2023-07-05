// ** React Imports
import React from 'react';
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Store & Actions

// ** Icons Imports
import { MoreVertical } from 'react-feather';

// icons import from react-icon

import { BiPhoneCall } from 'react-icons/bi';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { BsCardList, BsChatLeftTextFill, BsGlobe } from 'react-icons/bs';
// import Note

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from 'reactstrap';
import { FiEdit } from 'react-icons/fi';
import { CgWebsite } from 'react-icons/cg';
import { MdAdsClick, MdOutlineManageAccounts } from 'react-icons/md';

// ** Renders Client Columns
const useColumns = () => {
  const statusObj = {
    pending: 'light-warning',
    Confirm: 'light-success'
  };

  const eventColumn = [
    {
      name: 'Title',
      sortable: true,
      sortField: 'title',
      selector: (row) => row.eventName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">{row.eventName}</div>
      )
    },
    {
      name: 'Start Time',
      sortable: true,
      sortField: 'startTime',
      selector: (row) => row.startTime,
      cell: (row) => {
        const startTime = Number(row.endTime);
        const startDate = Number(row.endDate);
        const startDateTime = new Date(startDate + startTime).toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        return (
          <div className="d-flex justify-content-left align-items-center">{startDateTime}</div>
        );
      }
    },
    {
      name: 'End Time',
      sortable: true,
      sortField: 'endTime',
      selector: (row) => row.endTime,
      cell: (row) => {
        const endTime = Number(row.endTime);
        const endDate = Number(row.endDate);
        const endDateTime = new Date(endDate + endTime).toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        return <div className="d-flex justify-content-left align-items-center">{endDateTime}</div>;
      }
    },

    {
      name: 'Action',
      cell: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag="span" className="w-100">
              <Link to={`/eventsmanagement/evententer/${row._id}`}>
                <BsGlobe size={14} className="me-50" />
                <span className="align-middle">Website</span>
              </Link>
            </DropdownItem>
            <DropdownItem tag="span" className="w-100">
              <Link to={{ pathname: '/event-table-view' }}>
                <BsCardList size={14} className="me-50" />
                <span className="align-middle">Entry List</span>
              </Link>
            </DropdownItem>
            <DropdownItem tag="span" className="w-100">
              <Link to={{ pathname: '/event-view-list' }}>
                <MdOutlineManageAccounts size={14} className="me-50" />
                <span className="align-middle">Manage</span>
              </Link>
            </DropdownItem>
            <DropdownItem tag="span" className="w-100">
              <Link to={`/eventsmanagement/evententer/${row._id}`}>
                <MdAdsClick size={14} className="me-50" />
                <span className="align-middle">Enter Now</span>
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ];

  const columns = [
    {
      name: 'Full Name',
      sortable: true,
      sortField: 'fullName',
      selector: (row) => row.fullName,
      cell: (row) => <div className="d-flex justify-content-left align-items-center">Full Name</div>
    },
    {
      name: 'Event',
      center: true,
      selector: (row) => row.billing,
      cell: () => (
        <div className="table-rating">
          <span>0</span>
        </div>
      )
    },
    {
      name: 'Divisions',
      selector: (row) => row.phone,
      cell: (row) => <span>{row.phone}</span>
    },
    {
      name: 'Status',
      sortable: true,
      sortField: 'status',
      selector: (row) => row.status,
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row.status]} pill>
          {row.status}
        </Badge>
      )
    }
  ];

  return {
    columns,
    eventColumn
  };
};

export default useColumns;
