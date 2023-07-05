import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Edit, FileText, Trash2 } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { Card, CardBody, Input, Row } from 'reactstrap'

export default function Customers({store,dispatch}) {
  const [data, setData] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };


  const columns = [
    {
      name: 'Buyer',
      sortable: true,
      width: '100px',
      //sortField: 'name',
      selector: (row) => row?.buyer?.fullName,
    },
    {
      name: 'Email',
      sortable: true,
      width: '200px',
      //sortField: 'name',

      selector: (row) => row?.buyer?.email,
      // cell: (row) => <img src={row.imgUrl} className="w-100" />
    },
    {
      name: 'Phone',
      sortable: true,
      width: '200px',
      //sortField: 'name',

      selector: (row) => row?.buyer?.phone,
      // cell: (row) => <img src={row.imgUrl} className="w-100" />
    },
    {
      name: 'Delivery Address',
      sortable: true,
      sortField: 'name',
      selector: (row) => row?.buyer?.address,
      cell: (row)=><span>{`${row?.buyer?.address?.street},${row?.buyer?.address?.city},${row?.buyer?.address?.state}`}</span>
    },
  
    // {
    //   name: 'Actions',
      
    //   cell: (row) => (
    //     <div className="column-action">
    //       <FileText
    //         size={20}
    //         className="me-1 "
    //         style={{ cursor: 'pointer' }}
            
    //       />
    //       <Trash2 size={20} className="me-1 text-danger" style={{ cursor: 'pointer' }}  />
    //       <Edit size={20} style={{ cursor: 'pointer' }} className="" />
    //     </div>
    //   )
    // }
  ];

  useEffect(()=>{
    setData(store.productSales)
  },[store.productSales])


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
          
        </Row>
      </CardBody>
    </Card>
    <Card>
    <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
          {data && (
            <DataTable className="react-dataTable" columns={columns} data={data} pagination paginationComponent={CustomPagination} />
          )}
        </div>
      </Card>
    </>
  )
}
