import { Badge, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Eye } from 'react-feather';
import Avatar from '@components/avatar';
import { calculateAge, formatDate, calculateRemainingDays } from '../../../../utility/Utils';

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

export const useColumns = ({ setRow, toggle, row, notes, setCurNote, events }) => {
  // ** Handlers
  const handleEyeClick = (row) => {
    if (row) {
      setRow(row);
      toggle();
    } else return;
  };

  const lastContact = (row) => {
    let result = new Date('1995-01-01T00:00:00');
    notes &&
      notes.length > 0 &&
      notes.map((item, index) => {
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
      events.map((item, index) => {
        if (item.hostEmail === row.email) {
          flag = true;
        } else return;
      });
    return flag;
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
            color={row.status == 'active' ? 'light-primary' : 'light-secondary'}
            pill
          >
            {row.status}
          </Badge>
        </>
      )
    },
    {
      name: 'Dob',
      sortable: true,
      selector: (row) => (row.dob ? formatDate(row.dob) : 'Unknown')
    },
    {
      name: 'Days left',
      sortable: true,
      center: true,
      cell: (row) => (
        <>
          {row.dob ? (
            <div className="circle bg-primary">
              <p className="text">{calculateRemainingDays(row.dob)}</p>
            </div>
          ) : (
            <div>
              <p className="mb-0">Unknown</p>
            </div>
          )}
        </>
      )
    },
    {
      name: 'Age',
      sortable: true,
      selector: (row) => (row.dob ? calculateAge(row.dob) : 'Unknown')
    },
    {
      name: 'Last Contacted',
      sortable: true,
      selector: (row) =>
        lastContact(row) == 'nocontact' ? 'No Contact' : formatDate(lastContact(row))
    },
    {
      name: 'Booked',
      sortable: true,
      selector: (row) => (
        <Badge
          className="text-capitalize"
          color={bookStatusCheck(row) ? bookObj['booked'] : bookObj['notbooked']}
          pill
        >
          {bookStatusCheck(row) ? 'Booked' : 'Not Booked'}
        </Badge>
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
