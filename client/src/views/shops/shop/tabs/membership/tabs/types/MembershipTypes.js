import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Card, Input } from 'reactstrap';
import AddMembershipType from './AddMembershipType';
import ReactPaginate from 'react-paginate';

export default function MembershipTypes({ dispatch, store }) {
  const [data, setData] = useState();
  const [openAddType, setOpenAddType] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const toggleAddType = () => setOpenAddType(!openAddType);

  const columns = [
    {
      name: 'Name',
      sortable: true,
      // width: '130px',
      sortField: 'type',
      selector: (row) => row.type
    },
    {
      name: 'Color',
      sortable: true,
      // width: '130px',
      sortField: 'type',
      selector: (row) => row.color
    },
    //   {
    //     name: '# Memberships',
    //     sortable: true,
    //     // width: '130px',
    //     sortField: 'type',
    //     selector: (row) => row.count
    //   },
    {
      name: 'Actions',
      sortable: true,
      // width: '130px',
      sortField: 'type',
      selector: (row) => row.type
    }
  ];

  useEffect(() => {
    if (store.membershipTypes) {
      setData(store.membershipTypes);
    }
  }, [store.membershipTypes]);
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
        <div className="d-flex justify-content-end">
          <Button color="primary" className="m-1" onClick={toggleAddType}>
            Add New Type
          </Button>
        </div>
        <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
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
      <AddMembershipType
        open={openAddType}
        toggle={toggleAddType}
        store={store}
        dispatch={dispatch}
      />
    </>
  );
}
