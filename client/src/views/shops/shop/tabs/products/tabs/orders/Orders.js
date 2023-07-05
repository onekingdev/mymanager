import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Edit, FileText, Trash2 } from 'react-feather';
import { Card, CardBody, Col, Input, Row, UncontrolledDropdown } from 'reactstrap';
import { convertDate } from '../../../../../../goals/helpers/converters';
import { Link } from 'react-router-dom';
import { updateProductBuyAction } from '../../../../../store/action';
import ReactPaginate from 'react-paginate';

const expandedComponent = ({ data }) => {
console.log(data)
  return (
    <Card>
      <CardBody>
        <Row>
          <Col md="6">
            <h5>Order Details</h5>
            <hr/>
            <table className='table table-striped'>
              <tr className='bg-light'>
                <td>Product</td>
                <td>Count</td>
                <td>Total</td>
              </tr>
              {data?.products?.map((x, idx) => {
                return (
                  <tr key={idx}>
                    <td>{x?.product?.name}</td>
                    <td>{x?.count}</td>
                    <td>$ {x?.count * x?.product?.price}</td>
                  </tr>
                );
              })}
            </table>
            <hr/>
            <div className='d-flex justify-content-between'>
            <h5> Total: </h5>
            <h5> $ {data.total} </h5>
            </div>
          </Col>
          <Col md="6">
            <div className='d-flex justify-content-between'>
            <h5>Delivery & Payment</h5>
            <Link to={`/invoice-preview/${data?.invoiceId}`} target='_blank'>
              Invoice
            </Link>
            
            </div>
              <hr/>
              <h6>Buyer</h6>
              <div>
                <p>{data.buyer.fullName}</p>
                <p>{data.buyer.phone}</p>
                <p>{data.buyer.email}</p>
                <p>{`${data.buyer.address.street},${data.buyer.address.city}, ${data.buyer.address.state}, ${data.buyer.address.country}, ${data.buyer.address.zipCode}`}</p>
              </div>
              <hr/>
              <h6>Payment</h6>
              <div>
                <p>Amount: {data?.payment?.currency} {data?.payment?.amount}</p>
                <p>Method: {data?.payment?.paymentMethod} </p>
                <p>Date: {convertDate(data?.payment?.date)} </p>
              </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default function Orders({ store, dispatch }) {
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
  const handleChangeStatus = (e,row)=>{
    const payload ={
      shopId:row.shopId,
      status:e.target.value
    }
    dispatch(updateProductBuyAction(row._id,payload))
  }
  const columns = [
    {
      name: 'Order',
      sortable: true,
      width: '200px',
      //sortField: 'name',
      selector: (row) => row._id,
      cell:(row)=><span>{row._id.slice(-8)}</span>
    },
    {
      name: 'Total',
      sortable: true,
      width: '200px',
      selector: (row) => row.total
    },
    {
      name: 'Status',
      sortable: true,
      width: '200px',
      selector: (row) => row.status,
      cell: (row) => (<>
      <Input type='select' value={row?.status} onChange={(e)=>handleChangeStatus(e,row)}>
        <option value="order placed">Order Placed</option>
        <option value="paid">Order Paid</option>
        <option value="processing">Processing...</option>
        <option value="on the way">On the Way</option>
        <option value="delivered">Delivered</option>
      </Input>
      </>)
    },
    {
      name: 'Date',
      sortable: true,
      width: '200px',
      selector: (row) => row.createdAt,
      cell: (row) => <span>{convertDate(row.createdAt)}</span>
    },

   
  ];

  useEffect(() => {
    setData(store.productSales);
  }, [store.productSales]);

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
          <Row></Row>
        </CardBody>
      </Card>
      <Card>
      <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
          {data && (
            <DataTable
              className="react-dataTable"
              columns={columns}
              data={data}
              pagination
              expandableRows
              expandableRowsComponent={expandedComponent}
              paginationComponent={CustomPagination}
              
            />
          )}
        </div>
      </Card>
    </>
  );
}
