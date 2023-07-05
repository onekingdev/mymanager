import React, { useEffect, useState } from 'react';
import { Edit, FileText, Lock, Trash2 } from 'react-feather';
import { Button, Card, CardBody, Col, Input, Row } from 'reactstrap';
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import AddMembershipSidebar from './AddMembershipSidebar';
import { updateMembershipAction } from '../../../../../store/action';
import EditMembershipSidebar from './EditMembershipSidebar';
import { toast } from 'react-toastify';
import { getUserData } from '../../../../../../../auth/utils';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';

export default function MembershipList({ dispatch, store }) {
  const [openAddMembership, setAddMembership] = useState(false);
  const [typeOptions, setTypeOptions] = useState([]);
  const [data, setData] = useState([]);
  const [selectedMembership, setSelectedMembership] = useState();
  const [openEditMembership, setOpenEditMembership] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const user = getUserData();

  const toggleAddMembership = () => setAddMembership(!openAddMembership);
  const toggleEditMembership = () => setOpenEditMembership(!openEditMembership);

  const handleUpdateMembership = (e, membership) => {
    //permission change
    if (e.target.checked === true) {
      dispatch(
        updateMembershipAction(membership._id, { shopId: membership.shopId, permission: 'public' })
      );
    } else {
      dispatch(
        updateMembershipAction(membership._id, { shopId: membership.shopId, permission: 'private' })
      );
    }
  };

  const handleDeleteMembership = (membership) => {
    Swal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete the this membership?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch the delete product action here
        dispatch(
          updateMembershipAction(membership._id, { shopId: membership.shopId, isDeleted: true })
        );
      }
    });
  };

  const handleEditMembership = (membership) => {
    setSelectedMembership(membership);
    toggleEditMembership();
  };
  const columns = [
    {
      name: 'Name',
      sortable: true,
      // width: '130px',
      sortField: 'name',
      selector: (row) => row.name
    },
    {
      name: 'Type',
      sortable: true,
      // width: '130px',
      sortField: 'brand',
      selector: (row) => row.membershipType.type
    },
    {
      name: 'Total Price',
      sortable: true,
      // width: '130px',
      sortField: 'price',
      selector: (row) => row.total
    },
    {
      name: 'Balance',
      sortable: true,
      // width: '130px',
      sortField: 'stock',
      selector: (row) => row.balance
    },
    {
      name: 'Down Payment',
      sortable: true,
      // width: '130px',
      sortField: 'stock',
      selector: (row) => row.downPayment
    },
    {
      name: 'Duration',
      sortable: true,
      // width: '130px',
      sortField: 'stock',
      selector: (row) => row.duration,
      cell: (row) => (
        <span>
          {row.duration} {row.durationType}
        </span>
      )
    },
    {
      name: 'Payment Type',
      sortable: true,
      // width: '130px',
      sortField: 'stock',
      selector: (row) => row.isRecuring
    },

    {
      name: 'Published',
      sortable: true,
      // width: '130px',
      sortField: 'published',
      selector: (row) => row.permission,
      cell: (row) => (
        <div className="form-check form-switch">
          <Input
            type="switch"
            name="published"
            checked={row.permission === 'public' ? true : false}
            onChange={(e) => handleUpdateMembership(e, row)}
          />
        </div>
      )
    },
    {
      name: 'Actions',
      // minWidth: '100px',
      cell: (row) => (
        <div className="column-action">
         {user.id===row.userId?<>
          <Trash2
            size={20}
            className="me-1 text-danger"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              user.id === row.userId
                ? handleDeleteMembership(row)
                : toast.error('Accessible only for super admin');
            }}
          />
          <Edit
            size={20}
            style={{ cursor: 'pointer' }}
            className=""
            onClick={() => {
              user.id === row.userId
                ? handleEditMembership(row)
                : toast.error('Accessible only for super admin');
            }}
          />
         </>:<>
         <Lock className='text-muted' size={14}/>
         </>}
         
        </div>
      )
    }
  ];

  useEffect(() => {
    if (store.membershipTypes) {
      let temp = [];
      store.membershipTypes.map((x) => {
        let t = { value: x._id, label: x.type };
        temp.push(t);
      });
      setTypeOptions(temp);
    }
  }, [store.membershipTypes]);

  useEffect(() => {
    setData(store.memberships);
  }, [store.memberships]);

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
      <Card>
        <CardBody>
          <Row>
            <Col md="3">
              <Input
                id="search-invoice"
                // className="w-100"
                type="text"
                placeholder="Search Product ..."
              />
            </Col>
            <Col md="3">
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={typeOptions}
                // value={currentCategory}
                // onChange={(data) => {
                //   setCurrentCategory(data);
                // }}
              />
            </Col>
            <Col md="3">
              {/* <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={priceOptions}
                value={currentPrice}
                onChange={(data) => {
                  setCurrentPrice(data);
                }}
              /> */}
            </Col>
            <Col md="3" className="d-flex justify-content-end">
              <Button className="btn-icon" color="primary" onClick={toggleAddMembership}>
                Add Membership
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <div className="react-dataTable" style={{ height: 'auto', maxHeight: '100%' }}>
          {data && (
            <DataTable
              className="react-dataTable"
              columns={columns}
              data={data}
              pagination
              paginationComponent={CustomPagination}
            />
          )}
        </div>
      </Card>
      <AddMembershipSidebar
        dispatch={dispatch}
        store={store}
        open={openAddMembership}
        toggle={toggleAddMembership}
        membershipTypeOptions={typeOptions}
      />
      {selectedMembership && (
        <EditMembershipSidebar
          toggle={toggleEditMembership}
          open={openEditMembership}
          membership={selectedMembership}
          dispatch={dispatch}
          store={store}
        />
      )}
    </>
  );
}
