// ** Reactstrap Imports
import { UncontrolledTooltip, Button, Badge, ListGroup } from 'reactstrap';

// ** Third Party Components
import Avatar from '@components/avatar';

import { Download, Trash, Edit } from 'react-feather';
import { confirm } from 'react-confirm-box';
import { deleteBook } from '../store';
import { store } from '@store/store';
const onDelete = async (client, id) => {
  const result = await confirm('Are you sure?', {
    closeOnOverlayClick: true,
    classNames: 'custom_confirm_box'
  });
  if (result) {
    store.dispatch(deleteBook(client, id));
    return;
  }
};

// ** Table columns
import React, { Fragment } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const useBooksColumns = ({ setDeleteModal, setDeleteId, handleBookDelete }) => {
  const convertDateTimezone = (date, timezone) => {
    var diff = 0;
    if (timezone) {
      let originDate = new Date(
        date.toLocaleString('en-US', {
          timeZone: timezone
        })
      );
      diff = originDate.getTime() - date.getTime();
    }
    let originDate = new Date(date.getTime() + diff);
    return originDate;
  };
  const convertDate = (date, timezone) => {
    return moment(convertDateTimezone(new Date(date), timezone)).format('MM/DD/YYYY');
  };

  const convertTime = (date, timezone) => {
    return moment(convertDateTimezone(new Date(date), timezone)).format('LT');
  };

  const renderClient = (row) => {
    let tmpValue = 0;
    Array.from(row?._id).forEach((x, index) => {
      tmpValue += x.codePointAt(0) * (index + 1);
    });
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

    if (row?.photo) {
      return <Avatar className="me-1" img={row?.photo} width="32" height="32" />;
    } else {
      return (
        <Avatar
          color={color || 'primary'}
          className="me-1"
          content={row.fullName || 'John Doe'}
          initials
        />
      );
    }
  };

  const checkFinished = (date, duration, timezone) => {
    let originDate = convertDateTimezone(new Date(date), timezone);
    let endDate = new Date(originDate.getTime() + duration * 60 * 1000);
    return new Date().getTime() >= endDate;
  };

  const statusObj = {
    pending: 'light-warning',
    active: 'light-success',
    inactive: 'light-secondary'
  };
  const bookColumns = [
    {
      name: 'Full Name',
      sortable: true,
      minWidth: '240px',
      // sortField: 'fullName',
      selector: (row) => row.name.toString(),
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <span className="fw-bolder">{row.name}</span>

            {/* <small className="text-truncate fw-bolder text-muted mb-0 cursor-pointer">
              {row.company}
            </small> */}
            <small className="text-truncate text-muted mb-0 cursor-pointer">{row.email}</small>
          </div>
        </div>
      )
    },

    // {
    //   name: 'Name',
    //   sortable: true,
    //   minWidth: '120px',
    //   sortField: 'name',
    //   selector: (row) => row.name,
    //   cell: (row) => <span>{row.name}</span>
    // },
    // {
    //   name: 'Contact',
    //   minWidth: '120px',
    //   selector: (row) => row.email,
    //   cell: (row) => <span>{row.email}</span>
    // },
     {
      name: 'Date / Time',
      sortable: true,
      minWidth: '200px',
      sortField: 'startDate',
      cell: (row) => {
        const date = row.startDate;
        const timezone = row.timeZone;
        return (
          <span>
            {convertDate(date, timezone)} - {convertTime(date, timezone)}
          </span>
        );
      }
    },
    {
      name: 'Duration',
      sortable: true,
      minWidth: '150px',
      sortField: 'duration',
      selector: (row) => row.duration,
      cell: (row) => <span>{row.duration} minutes</span>
    },
    {
      name: 'Booking Type',
      minWidth: '200px',
      selector: (row) => row.bookingType,
      cell: (row) => <span>{row?.bookingType[0]?.title}</span>
    },
    {
      name: 'With',
      minWidth: '120px',
      selector: (row) => row.user,
      cell: (row) => <span>{row.user[0].firstName + ' ' + row.user[0].lastName}</span>
    },
    {
      name: 'Status',
      minWidth: '150px',
      selector: (row) => row.name,
      cell: (row) =>
        checkFinished(row.startDate, row.duration, row.timezone) ? (
          <Badge className="text-capitalize" color="light-success" pill>
            Completed
          </Badge>
        ) : (
          <Badge className="text-capitalize" color="light-danger" pill>
            Scheduled
          </Badge>
        )
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="column-action d-flex align-items-center">
          <Trash
            onClick={() => {
              handleBookDelete(row?._id)
            }}
            className="text-body cursor-pointer me-1"
            size={17}
          />
          {!checkFinished(row.startDate, row.duration, row.timezone) ? (
            <Edit
              className="text-body cursor-pointer"
              size={17}
              onClick={() => {
                window.location.href = '/book/update/' + row?._id;
              }}
            />
          ) : null}
        </div>
      )
    }
  ];

  return { bookColumns };
};

export default useBooksColumns;
