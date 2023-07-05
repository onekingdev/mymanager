import { Badge, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Eye } from 'react-feather';
import Avatar from '@components/avatar';
import { calculateAge, formatDate, calculatePassedDays } from '../../../../utility/Utils';

const bookObj = {
  booked: 'primary',
  notbooked: 'light-success'
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
  setRow,
  row,
  notes,
  events,
  toggle,
  totalRetention,
  lastContact,
  lastAttend,
  lastOption
}) => {
  // ** Handlers
  const handleEyeClick = (row) => {
    if (row) {
      setRow(row);
      toggle();
    } else return;
  };

  const lastNote = (row) => {
    let date = new Date('1995-01-01T00:00:00'),
      result = '';

    notes &&
      notes.length > 0 &&
      notes.map((item, index) => {
        if (item.contactId == row._id) {
          if (date && date < new Date(item.date)) {
            date = new Date(item.date);
            result = item.note;
          } else return;
        }
      });

    return date.getFullYear() == 1995 ? 'nocontact' : result;
  };

  const colorAttended = (days) => {
    let result = '',
      date = new Date('1995-01-01T00:00:00');
    totalRetention.retentionListByAttendence.map((item, index) => {
      if (days > item.lowerLimit && days < item.upperLimit) {
        if (date < new Date(item.createdAt)) {
          date = new Date(item.createdAt);
          result = item.colorCode;
        }
      }
    });
    return date.getFullYear() == 1995 ? '#1740E7' : result;
  };

  const colorContacted = (days) => {
    let result = '',
      date = new Date('1995-01-01T00:00:00');
    totalRetention.retentionListByLastContacted.map((item, index) => {
      if (days > item.lowerLimit && days < item.upperLimit) {
        if (date < new Date(item.createdAt)) {
          date = new Date(item.createdAt);
          result = item.colorCode;
        }
      }
    });
    return date.getFullYear() == 1995 ? '#1740E7' : result;
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
      name: 'Rating',
      sortable: true,
      selector: (row) => {
        if (lastOption.value) {
          return lastAttend(row) == 'nocontact' ? (
            <Badge color="light-warning" pill>
              Never
            </Badge>
          ) : (
            <div
              className="circle"
              style={{ backgroundColor: colorAttended(calculatePassedDays(lastAttend(row))) }}
            >
              <p className="text">{calculatePassedDays(lastAttend(row))}</p>
            </div>
          );
        } else {
          return lastContact(row) == 'nocontact' ? (
            <Badge color="light-warning" pill>
              Never
            </Badge>
          ) : (
            <div
              className="circle"
              style={{ backgroundColor: colorContacted(calculatePassedDays(lastContact(row))) }}
            >
              <p className="text">{calculatePassedDays(lastContact(row))}</p>
            </div>
          );
        }
      }
    },
    {
      name: 'Notes',
      sortable: true,
      minWidth: '190px',
      selector: (row) =>
        lastNote(row) == 'nocontact' ? (
          <Badge color="light-warning" pill>
            Never
          </Badge>
        ) : (
          lastNote(row)
        )
    },
    {
      name: 'Manage',
      sortable: true,
      cell: (row) => (
        <>
          <Eye
            size={20}
            className="cursor-pointer"
            id="detail"
            onClick={(e) => handleEyeClick(row)}
          />
          <UncontrolledTooltip placement="left" target="detail">
            Contact Detail
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
