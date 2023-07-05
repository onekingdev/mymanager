// ** React Imports
import React from 'react';
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Store & Actions
import { store } from '@store/store';
import { getUser } from '../store';

// ** Icons Imports
import { Eye, Mail, MessageSquare, MoreVertical } from 'react-feather';

// icons import from react-icon

import { BiPhoneCall } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsChatLeftTextFill } from 'react-icons/bs';
// import Note
import NoteModal from './Note';

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown
} from 'reactstrap';
import format from 'date-fns/format';

// ** Renders Member Columns
const useColumns = ({ setDeleteModal }, { toggle }, { setRow }, { memberStore }, { setRowId }) => {
  const image_A = '/assets/images/drive.png';
  const renderMember = (row) => {
    const stateNum = Math.floor(Math.random() * 6),
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];
    if (row?.photo?.length) {
      return (
        <Link
          to={`/contacts/member/view/${row._id}`}
          onClick={() => store.dispatch(getUser(row.id))}
        >
          <Avatar className="me-1" img={row?.photo} width="32" height="32" />
        </Link>
      );
    } else {
      return (
        <Link
          to={`/contacts/member/view/${row._id}`}
          onClick={() => store.dispatch(getUser(row.id))}
        >
          <Avatar color={color} className="me-1" content={row.fullName || 'N A'} initials />
        </Link>
      );
    }
  };

  const statusObj = {
    pending: 'light-warning',
    active: 'light-success',
    inactive: 'light-secondary'
  };

  // const onDelete = async (id) => {
  //     const result = await confirm('Are you sure?', {
  //         closeOnOverlayClick: true,
  //         classNames: 'custom_confirm_box'
  //     })
  //     if (result) {
  //         store.dispatch(deleteMemberContact(id))
  //         return
  //     }
  // }

  function PrintAddress({ address }) {
    let fullAddress = '';

    if (!address) {
      return <></>;
    }

    const reorderedAddress = {
      city: null,
      state: null,
      country: null,
      street: null,
      zipCode: null
    };
    const newAddressData = Object.assign(reorderedAddress, address);
    const addressValues = Object.values(newAddressData);
    const displayableAddress = addressValues.slice(0, 3);

    fullAddress = displayableAddress
      .filter((x) => typeof x === 'string' && x.length > 0)
      .join(', ');

    return <>{fullAddress}</>;
  }

  const getRatingColor = (RatingCount, attendnce) => {
    if (RatingCount >= 0 && RatingCount <= 7 && attendnce > 0) {
      return '#60aa0ed4'; // green
    } else if (RatingCount >= 8 && RatingCount <= 14) {
      return '#ffc107'; // yellow
    } else if (RatingCount === 0) {
      return 'light-warning';
    } else {
      //   return "#ff3f00";
      return 'light-info';
    }
  };

  const columns = [
    {
      name: 'Member',
      sortable: true,
      minWidth: '240px',
      sortField: 'fullName',
      center: false,
      selector: (row) => row.fullName,
      cell: (row) => (
        <div className="d-flex ">
          {renderMember(row)}
          <div className="d-flex flex-column">
            <Link
              to={`/contacts/member/view/${row._id}`}
              className="user_name text-truncate text-body"
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <span className="fw-bolder">{row.fullName}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">{row.email}</small>
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
      name: 'Program',
      width: '150px',
      selector: (row) => row.program,
      sortable: true,
      cell: (row) => <div>{row?.program === '' ? 'N/A' : row?.program}</div>
    },
    {
      name: 'Rank',
      selector: (row) => row.rank_order,
      width: '150px',
      sortable: true,
      cell: (row) => (
        <div>
          <Avatar
            style={{
              width: '1.8em',
              height: '1.8em',
              margin: '0px',
              objectFit: 'contain !importent'
            }}
            // src={row?.current_rank_img || process.env.PUBLIC_URL + image_A}
            src={process.env.PUBLIC_URL + image_A}
            alt={`${row?.current_rank_name}`}
          />
        </div>
      )
    },
    {
      name: 'Type',
      selector: (row) => row.membership_type,
      sortable: true,
      cell: (row) => (
        <div style={{marginLeft: '10px'}}>
          {row?.membership_details?.slice(-1)[0]?.membership_type || row?.membership_type || 'N/A'}
        </div>
      )
    },
    {
      name: 'Start Date',
      selector: (row) => row.membership_start,
      width: '150px',
      sortable: true,
      cell: (row) => (
        <div style={{marginLeft: '20px'}}>
          {row?.membership_start === undefined
            ? 'N/A'
            : // : moment(row?.membership_start).format("MM/DD/YYYY")}
              format(new Date(row?.membership_start), 'P')}
        </div>
      )
    },
    {
      name: 'End Date',
      selector: (row) => row.membership_expiry,
      width: '150px',
      sortable: true,
      cell: (row) => (
        <div style={{marginLeft: '20px'}}>
          {row?.membership_expiry === undefined
            ? 'N/A'
            : // : moment(row?.membership_expiry).format("MM/DD/YYYY")}
              format(new Date(row?.membership_expiry), 'P')}
        </div>
      )
    },
    {
      name: 'Rating',
      selector: (row) => row.rating,
      width: '150px',
      sortable: true,
      cell: (row) => (
        <div>
          <Avatar
            style={{
              fontWeight: 'bold',
              width: '2em',
              height: '2em',
              backgroundColor: getRatingColor(Number(row?.rating), row?.attendedclass_count)
            }}
          >
            {row?.rating}
          </Avatar>
        </div>
      )
    },
    {
      name: 'Tag',
      selector: (row) => row.after_camp,
      sortable: true,
      cell: (row) =>
        row?.after_camp?.length > 0 ? (
          <div className="d-flex justify-content-center align-items-center">
            <UncontrolledButtonDropdown tag="li" className="p-0 rounded">
              <DropdownToggle className="p-0 rounded">
                <Badge color="success">View</Badge>
              </DropdownToggle>
              <DropdownMenu right>
                {row?.after_camp?.map((item, i) => {
                  return (
                    <DropdownItem
                      style={{
                        width: '100%',
                        color: '#00a6e1',
                        background: '#eaf4fe !important',
                        fontWeight: '600'
                      }}
                      key={i}
                    >
                      {item}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        ) : (
          <p className="text-center align-items-center m-0">N/A</p>
        )
    },

    {
      name: 'Action',
      sortable: true,
      width: '150px',
      
      cell: (row) => (
        <div className="d-flex justify-content-start p-0 gap-1">
          <Eye
            size={20}
            onClick={() => {
              setRow(row);
              toggle();
              setRowId(row?._id);
            }}
            style={{ cursor: 'pointer' }}
          />
          <MessageSquare size={20} />
          <Mail size={20} />
        </div>
      )
    }
  ];

  return {
    columns
  };
};

export default useColumns;
