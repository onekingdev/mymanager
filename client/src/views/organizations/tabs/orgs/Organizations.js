import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {
  ChevronDown,
  Eye,
  EyeOff,
  FileText,
  MoreVertical,
  Plus,
  Trash,
  UserPlus
} from 'react-feather';
import { useHistory } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown
} from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { sendOrgEmailAction, updateOrgAction } from '../../store/action';
import AddUserModal from './AddUserModal';

import CreateOrgModal from '../../orgs/create/CreateOrgModal';
import PermissionsModal from './../../permissions/PermissionsModal';
import { useColumns } from './useColumns';
import TopStats from '../TopStats';
import ReactPaginate from 'react-paginate';




export default function Organizations({ store, dispatch }) {
  const [openCreate, setOpencreate] = useState(false);
  const [openPermision, setOpenPermision] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [dropdownStatue, setDropdownStatus] = useState('Active');
  const [data, setData] = useState([]);

  const [selectedOrg, setSelectedOrg] = useState(null);

  const toggleCreate = () => setOpencreate(!openCreate);
  const toggleOpenPermission = () => setOpenPermision(!openPermision);
  const toggleAddUser = () => setOpenAddUser(!openAddUser);

  const history = useHistory();

  //Handle Column Functions
  const handleDetails = (row) => {
    history.push(`/organizations/${row._id}`);
  };

  const handleAddUser = (row) => {
    setSelectedOrg(row);

    toggleAddUser();
  };

  const handleFilter = (val) => {
    if (val === 'Active') {
      setData(store.myOrgs.filter(x=>x.isDeleted===false))
      setDropdownStatus('Active');
    } else {
      setData(store.myOrgs.filter(x=>x.isDeleted===true))
      setDropdownStatus('Archived');
    }
  };
  const MySwal = withReactContent(Swal);
  const handleDelete = async (row) => {
    const res = await MySwal.fire({
      title: 'Delete Organization',
      text: 'Are you sure you want to delete this organization? ',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (res.value) {
      dispatch(updateOrgAction(row._id, { isDeleted: true }));
    }
  };

  const handleActivate = async (row) => {
    const res = await MySwal.fire({
      title: 'Activate Organization',
      text: 'Are you sure you want to activate this organization? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Activate',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (res.value) {
      dispatch(updateOrgAction(row._id, { isDeleted: false }));
    }
  };

  const handleSendEmail =(row)=>{
    const payload =  {
        message:'Hi, This is a reminder email for activating your organization.',
        organizationId:row._id
      }
      dispatch(sendOrgEmailAction(payload))
}

  // ** COLUMNS
  const { columns } = useColumns({ handleDetails }, { handleDelete },{handleSendEmail},{handleActivate});

  const conditionalRowStyles = [
    {
      when: (row) => row.isDeleted === true,
      style: {
        backgroundColor: '#ededed',
        color: '#b8c2cc'
      }
    }
  ];

  useEffect(()=>{
if(store && store.myOrgs){
  setData(store.myOrgs.filter(x=>x.isDeleted===false))
}
  },[store])


  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Math.ceil(data.length / rowsPerPage);

    return (
      <div className="d-flex justify-content-end">
        <div className="d-flex align-items-center justify-content-end">
          {/* <label htmlFor="rows-per-page">Show</label> */}
          <Input
            className="mx-50"
            type="select"
            id="rows-per-page"
            value={rowsPerPage}
            onChange={handlePerPage}
            style={{ width: '5rem' }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Input>
          <label htmlFor="rows-per-page" style={{ marginRight: '1rem' }}>
            Per Page
          </label>
        </div>
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          pageCount={count || 1}
          activeClassName="active"
          forcePage={currentPage !== 0 ? currentPage - 1 : 0}
          onPageChange={(page) => handlePagination(page)}
          pageClassName={'page-item'}
          nextLinkClassName={'page-link'}
          nextClassName={'page-item next'}
          previousClassName={'page-item prev'}
          previousLinkClassName={'page-link'}
          pageLinkClassName={'page-link'}
          containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
        />
      </div>
    );
  };



  return (
   <>
   <TopStats store={store}/>
   <div className="app-user-list">
   <Card className="">
      <div className="m-1 d-flex justify-content-between">
        <h2 className="my-auto">My Organizations</h2>
        <div className='my-auto'>
         <div className='d-flex '>
         <UncontrolledDropdown className='me-50' tag="div">
            <DropdownToggle color='outline-primary' caret>{dropdownStatue}</DropdownToggle>
            <DropdownMenu >
              <DropdownItem className='w-100' onClick={() => handleFilter('Active')}>Active</DropdownItem>
              <DropdownItem className='w-100' onClick={() => handleFilter('Archived')}>Archived</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <div>
          <Button color="primary" onClick={toggleCreate} >
            <Plus size={14}/> Add new Organization
          </Button>
          </div>
         </div>
        </div>
      </div>
      <div className="react-dataTable  employee-list-table" style={{ height: 'auto', maxHeight: "100%"}}>
        {store && (
          <DataTable
            noHeader
            pagination
            responsive
            paginationServer
            columns={columns}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            conditionalRowStyles={conditionalRowStyles}
            data={data}
            onRowClicked={handleDetails}
            paginationComponent={CustomPagination}
            
          />
        )}
      </div>
      {store && (
        <CreateOrgModal toggle={toggleCreate} open={openCreate} store={store} dispatch={dispatch} />
      )}
      {store && <PermissionsModal open={openPermision} toggle={toggleOpenPermission} />}
      {store && selectedOrg && (
        <AddUserModal open={openAddUser} toggle={toggleAddUser} selectedOrg={selectedOrg} />
      )}
    </Card>
   </div>
    
   </>
  );
}
