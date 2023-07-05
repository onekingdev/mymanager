// ** Custom Components
import Avatar from '@components/avatar';
import { useDispatch } from 'react-redux';

// ** Third Party Components
import axios from 'axios';
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather';
// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const status = {
  1: { title: 'Done', color: 'light-primary' },
  2: { title: 'Todo', color: 'light-danger' },
  3: { title: 'Start', color: 'light-warning' }
};

export let data = [
  {
    id: 1,
    automationName: 'task1',
    startTime: '2023-03-06',
    smartlist: [],
    campaign: 'a',
    contacts: 'Todo',
    status: 'progress'
  }
];

// ** Table Common Column
export const columns = [
  {
    name: 'Automation Name',
    sortable: true,
    minWidth: '20%',
    selector: (row) => row.automationName
  },
  {
    name: 'Start',
    sortable: true,
    minWidth: '15%',
    selector: (row) => row.startTime
  },

  {
    name: 'Smartlist',
    sortable: true,
    minWidth: '10%',
    selector: (row) => row.smartlist
  },
  {
    name: 'Campaign',
    sortable: true,
    minWidth: '15%',
    selector: (row) => row.campaign
  },
  // {
  //   name: 'Contacts',
  //   minWidth: '150px',
  //   sortable: (row) => row.contacts,
  //   cell: (row) => {
  //     return (
  //       <Badge color={status[row.contacts].color} pill>
  //         {status[row.contacts].title}
  //       </Badge>
  //     );
  //   }
  // },

  {
    name: 'Contacts',
    sortable: true,
    minWidth: '15%',
    selector: (row) => row.contacts
  },
  {
    name: 'Status',
    sortable: true,
    minWidth: '10%',
    selector: (row) => row.status
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: (row) => {
      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pe-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
                <FileText size={15} />
                <span className="align-middle ms-50">Details</span>
              </DropdownItem>
              <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
                <Archive size={15} />
                <span className="align-middle ms-50">Archive</span>
              </DropdownItem>
              <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
                <Trash size={15} />
                <span className="align-middle ms-50">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} id={row.id} onClick={(e) => console.log(e.target.id)} />
        </div>
      );
    }
  }
];
