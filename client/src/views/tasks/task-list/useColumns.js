// ** React Imports
import React from 'react';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Icons Imports
import { MoreVertical } from 'react-feather';

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
import { useDateFormatter } from '../../../../../../hooks/useDateFormatter';

// ** Renders Client Columns
const useColumns = () => {
  const statusObj = {
    pending: 'light-warning',
    active: 'light-success',
    inactive: 'light-secondary'
  };

  const columns = [
    {
      name: 'Name',
      sortable: true,
      minWidth: '140px',
      sortField: 'title',
      selector: (row) => row.title,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {/* {renderClient(row)} */}
          <div className="d-flex flex-column">
            <span className="fw-bolder">{row.title}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Status',
      width: '120px',
      sortable: true,
      sortField: 'status',
      selector: (row) => row.status,
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row.status]} pill>
          {row.status}
        </Badge>
      )
    },
    {
      name: 'Phone',
      sortable: true,
      width: '120px',
      sortField: 'phone',
      selector: (row) => row.phone,
      cell: (row) => <span>{row.phone}</span>
    },
    {
      name: 'Created',
      sortable: false,
      minWidth: '100px',
      sortField: 'createdAt',
      selector: (row) => row.createdAt,
      cell: (row) => <span>{useDateFormatter(row.createdAt)}</span>
    },
    {
      name: 'Source',
      width: '130px',
      sortable: true,
      sortField: 'source',
      selector: (row) => row.source,
      cell: (row) => <span className="text-capitalize">{row.source}</span>
    },
    {
      name: 'Rating',
      width: '100px',
      center: true,
      selector: (row) => row.rating,
      cell: () => (
        <div className="table-rating">
          <span>0</span>
        </div>
      )
    },
    {
      name: 'Note',
      width: '100px',
      // center: true,
      selector: (row) => row.note,
      cell: (row) => (
        <div>
          <span>{row.note}</span>
        </div>
      )
    },
    {
      name: 'Actions',
      minWidth: '160px',
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag="span"
                // href="/"
                className="w-100"
                // onClick={(e) => {
                //     // e.preventDefault()
                //     // onDelete(row._id)
                //     setDeleteModal({
                //         id: row._id,
                //         show: true
                //     })
                // }}
                // onClick={(e) => {
                //     e.preventDefault()
                //     store.dispatch(deleteClientContact(row._id))
                // }}
              >
                <BiPhoneCall size={14} className="me-50" />
                <span className="align-middle">Call</span>
              </DropdownItem>
              <DropdownItem
                tag="span"
                // href="/"
                className="w-100"
                // onClick={(e) => {
                //     // e.preventDefault()
                //     // onDelete(row._id)
                //     setDeleteModal({
                //         id: row._id,
                //         show: true
                //     })
                // }}
                // onClick={(e) => {
                //     e.preventDefault()
                //     store.dispatch(deleteClientContact(row._id))
                // }}
              >
                <AiOutlineMail size={14} className="me-50" />
                <span className="align-middle">Email</span>
              </DropdownItem>
              <DropdownItem
                tag="span"
                // href="/"
                className="w-100"
                // onClick={(e) => {
                //     // e.preventDefault()
                //     // onDelete(row._id)
                //     setDeleteModal({
                //         id: row._id,
                //         show: true
                //     })
                // }}
                // onClick={(e) => {
                //     e.preventDefault()
                //     store.dispatch(deleteClientContact(row._id))
                // }}
              >
                <BsChatLeftTextFill size={14} className="me-50" />
                <span className="align-middle">Text</span>
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
