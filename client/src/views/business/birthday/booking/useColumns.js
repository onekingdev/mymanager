import { Badge, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash, BellOff } from 'react-feather';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Avatar from '@components/avatar';
import { calculateAge, formatDate, calculateRemainingDays } from '../../../../utility/Utils';
import { deleteEvent } from '../../../calendar/event/store';
const statusObj = {
  booked: 'light-success',
  notBooked: 'light-warning',
  maybe: 'light-secondary'
};

const renderClient = (row) => {
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

  if (row?.photo) {
    return <Avatar className="me-1" img={row.photo} width="32" height="32" />;
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

export const useColumns = ({
  toggle,
  row,
  notes,
  events,
  setCurNote,
  setRow,
  setAddBooking,
  setEditBooking,
  setEventInfo
}) => {
  const dispatch = useDispatch();
  // ** Handlers
  const lastContact = (row) => {
    let result = new Date('1995-01-01T00:00:00');
    notes.length > 0 &&
      notes.map((item) => {
        if (item.contactId == row._id) {
          if (result && result < new Date(item.date)) {
            result = new Date(item.date);
          } else return;
        }
      });

    return result.getFullYear() == 1995 ? 'nocontact' : result;
  };

  const bookStatusCheck = (row) => {
    let flag = false;
    events &&
      events.map((item) => {
        if (item.hostEmail === row.email) {
          flag = true;
        } else return;
      });
    return flag;
  };

  const handleEyeClick = (row) => {
    if (row) {
      setRow(row);
      toggle();
    } else return;
  };

  const handleEditClick = (row) => {
    if (bookStatusCheck(row)) {
      events.map((event, index) => {
        if (event.hostEmail == row.email) {
          setEventInfo(event);
        } else return;
      });
      setEditBooking(true);
    } else {
      setAddBooking(true);
    }
    setRow(row);
  };

  const handleTrashClick = (row) => {
    let eventId = '';
    events.map((event, index) => {
      if (event.hostEmail == row.email) {
        eventId = event._id;
      } else return;
    });
    dispatch(deleteEvent(eventId));
    toast.success('Birthday Booking is removed');
  };

  const setDaysBadgeColor = (days) => {
    if (days < 7) {
      return 'light-success';
    } else if (days > 7 && days < 15) {
      return 'light-info';
    } else {
      return 'light-danger';
    }
  };

  const columns = [
    {
      name: 'Full Name',
      sortable: true,
      minWidth: '240px',
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <Link to={`#`} className="user_name text-truncate text-body">
              <span className="fw-bolder">{row?.fullName}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">{row?.email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Age & Dob',
      sortable: true,
      selector: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <Link to={`#`} className="user_name text-truncate text-body">
              <span className="fw-bolder">{row.dob ? calculateAge(row.dob) : 'Unknown'}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">
              {row.dob ? formatDate(row.dob) : 'Unknown'}
            </small>
          </div>
        </div>
      )
    },
    {
      name: 'Last Contacted',
      sortable: true,
      selector: (row) => (
        <Badge
          className="float-end"
          color={setDaysBadgeColor(calculateRemainingDays(lastContact(row)))}
          pill
        >
          {calculateRemainingDays(lastContact(row))}
        </Badge>
      )
    },
    {
      name: 'Booked',
      sortable: true,
      selector: (row) => (
        <Badge
          className="text-capitalize"
          color={bookStatusCheck(row) ? 'light-success' : 'light-warning'}
          pill
        >
          {bookStatusCheck(row) ? 'Booked' : 'Not Booked'}
        </Badge>
      )
    },
    {
      name: 'Status',
      sortable: true,
      selector: (row) => (
        <>
          <Badge
            className="float-end"
            color={row.status == 'active' ? 'light-primary' : 'light-warning'}
            pill
          >
            {row.status}
          </Badge>
        </>
      )
    },
    {
      name: 'Manage',
      sortable: true,
      cell: (row) => (
        <>
          <Edit
            size={20}
            className="cursor-pointer me-50"
            id="event"
            onClick={(e) => handleEditClick(row)}
          />
          <UncontrolledTooltip placement="left" target="event">
            {bookStatusCheck(row) ? 'Edit Birthday Party' : 'Create Birthday Party'}
          </UncontrolledTooltip>
          <Eye
            size={20}
            className="cursor-pointer me-50"
            id="detail"
            onClick={(e) => handleEyeClick(row)}
          />
          <UncontrolledTooltip placement="left" target="detail">
            Contact Detail
          </UncontrolledTooltip>
          <BellOff
            size={20}
            className="cursor-pointer"
            id="remove"
            onClick={(e) => handleTrashClick(row)}
          />
          <UncontrolledTooltip placement="left" target="remove">
            Not Booked
          </UncontrolledTooltip>
        </>
      )
    }
  ];
  return {
    columns
  };
};

export default useColumns;
