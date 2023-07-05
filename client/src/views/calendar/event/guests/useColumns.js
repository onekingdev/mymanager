// ** React Imports
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Store & Actions
import { store } from '@store/store';
import { getUser } from '@src/views/apps/user/store';

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, Eye } from 'react-feather';

// ** Reactstrap Imports
import { Badge } from 'reactstrap';

// ** Renders Client Columns
const renderClient = (row) => {
  if (row.avatar.length) {
    return <Avatar className="me-1" img={row.avatar} width="32" height="32" />;
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        content={row.fullName || 'John Doe'}
        color={row.avatarColor || 'light-primary'}
      />
    );
  }
};

// ** Renders Role Columns
const renderRole = (row) => {
  const roleObj = {
    Client: {
      class: 'text-primary',
      icon: User
    },
    Vender: {
      class: 'text-success',
      icon: Database
    },
    Lead: {
      class: 'text-info',
      icon: Edit2
    },
    Employee: {
      class: 'text-warning',
      icon: Settings
    },
    Relationship: {
      class: 'text-danger',
      icon: Slack
    }
  };

  const Icon = roleObj[row.category] ? roleObj[row.category].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${roleObj[row.category] ? roleObj[row.category].class : ''} me-50`}
      />
      {row.category}
    </span>
  );
};

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
};

const useColumns = (props) => {
  const { setRow, toggleNoteModal } = props;
  const handleEyeClick = (row) => {
    if (row) {
      setRow(row);
      toggleNoteModal();
    } else return;
  };
  const columns = [
    {
      name: 'Full Name',
      sortable: true,
      minWidth: '217px',
      sortField: 'fullName',
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <Link className="user_name text-truncate text-body">
              <span className="fw-bolder">{row?.name ? row.name : row?.fullName}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">{row?.email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Category',
      sortable: true,
      minWidth: '172px',
      sortField: 'category',
      selector: (row) => row.category,
      cell: (row) => renderRole(row)
    },
    {
      name: 'Phone',
      sortable: true,
      minWidth: '238px',
      sortField: 'phone',
      selector: (row) => row.phone,
      cell: (row) => <span className="text-capitalize">{row?.phone ? row.phone : 'Unknown' }</span>
    },
    {
      name: 'Status',
      sortable: true,
      minWidth: '138px',
      sortField: 'status',
      selector: (row) => row.status,
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row.status]} pill>
          {row.status}
        </Badge>
      )
    },
    {
      name: 'Actions',
      minWidth: '100px',
      cell: (row) => (
        <div className="cursor-pointer" onClick={() => handleEyeClick(row)}>
          <Eye className="font-medium-3 text-body" />
        </div>
      )
    }
  ];
  return { columns };
};
export default useColumns;
