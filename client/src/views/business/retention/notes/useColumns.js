import { Button, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../../utility/Utils';

const useColumns = (props) => {
  const { lastNote } = props;

  const columns = [
    {
      name: 'Date & Time',
      sortable: true,
      selector: (row) => {
        return lastNote(row) == 'nocontact' ? (
          <Badge color="light-warning" pill>
            Never
          </Badge>
        ) : (
          <p>{formatDate(lastNote(row).date)}</p>
        );
      }
    },
    {
      name: 'Full Name',
      sortable: true,
      selector: (row) => (
        <div className="d-flex justify-content-left align-items-center">
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
      selector: (row) =>
        lastNote(row) == 'nocontact' ? (
          <Badge color="light-warning" pill>
            Never
          </Badge>
        ) : (
          <Badge
            className="float-end text-capitalize"
            color={
              lastNote(row).response == 'General'
                ? 'light-success'
                : lastNote(row).response == 'Active'
                ? 'light-primary'
                : 'light-warning'
            }
            pill
          >
            {lastNote(row).response}
          </Badge>
        )
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
          lastNote(row).note
        )
    }
  ];

  // ** Handlers

  return {
    columns
  };
};

export default useColumns;
