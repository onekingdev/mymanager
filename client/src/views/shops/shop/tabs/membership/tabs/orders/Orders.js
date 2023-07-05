import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Edit, FileText, Trash2 } from 'react-feather';
import { Card, CardBody, Col, Input, Row, UncontrolledDropdown } from 'reactstrap';
import { convertDate } from '../../../../../../goals/helpers/converters';
import { Link } from 'react-router-dom';
import { updateMembershipBuyAction } from '../../../../../store/action';
import ReactPaginate from 'react-paginate';

const expandedComponent = ({ data }) => {
  return (
    <Card>
      <CardBody>
        <Row>
          <Col md="6">
            <h5>Members</h5>
            <hr />
            <table className="table table-striped">
              <tr className="bg-light">
                <td>Member</td>
                <td>Email</td>
                <td>Relation</td>
              </tr>
              {data?.members?.map((x, idx) => {
                return (
                  <tr key={idx}>
                    <td>{x?.fullName}</td>
                    <td>{x?.email}</td>
                    <td>{x?.buyerId?.family?.find((y) => y.id === x._id)?.relation}</td>
                  </tr>
                );
              })}
            </table>
            <hr />
            <div className="d-flex justify-content-between">
              <h5> Total: </h5>
              <h5> $ {data.total} </h5>
            </div>
          </Col>
          <Col md="6">
            <div className="d-flex justify-content-between">
              <h5>Delivery & Payment</h5>
              <Link to={`/invoice-preview/${data?.invoiceId}`}>Invoice</Link>
              <Link to={`/document/email-link/${data?.contract.recipients[0].hashCode}`} target='_blank'>
              Contract
            </Link>
            </div>
            
            <hr />
            <h6>Buyer</h6>
            <div>
              <p>{data.buyerId.fullName}</p>
              <p>{data.buyerId.phone}</p>
              <p>{data.buyerId.email}</p>
              <p>{`${data.buyerId.address.street},${data.buyerId.address.city}, ${data.buyerId.address.state}, ${data.buyerId.address.country}, ${data.buyerId.address.zipCode}`}</p>
            </div>
            <hr />
            <h6>Payment</h6>
            {data.payments.map((payment, idx) => {
              return (
                <div key={idx}>
                  <p>
                    Amount: {payment?.currency} {payment?.amount}
                  </p>
                  <p>Method: {payment?.paymentMethod} </p>
                  <p>Date: {convertDate(payment?.date)} </p>
                  <hr />
                </div>
              );
            })}
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
  const handleChangeStatus = (e, row) => {
    const payload = {
      shopId: row.shopId,
      membershipStatus: e.target.value
    };
    dispatch(updateMembershipBuyAction(row._id, payload));
  };
  const columns = [
    {
      name: 'Order',
      sortable: true,
      width: '200px',
      //sortField: 'name',
      selector: (row) => row._id,
      cell: (row) => <span>{row._id.slice(-8)}</span>
    },
    {
      name: 'Total',
      sortable: true,
      width: '200px',
      selector: (row) => row.total
    },
    {
      name: 'Balance',
      sortable: true,
      width: '200px',
      selector: (row) => row.balance
    },
    {
      name: 'Status',
      sortable: true,
      width: '200px',
      selector: (row) => row.membershipStatus,
      cell: (row) => (
        <>
          <Input
            type="select"
            value={row?.membershipStatus}
            onChange={(e) => handleChangeStatus(e, row)}
          >
            <option value="active">Active</option>
            <option value="deactive">Deactive</option>
            <option value="cancel">canceled</option>
            <option value="freez">Freeze</option>
          </Input>
        </>
      )
    },
    {
      name: 'Date',
      sortable: true,
      width: '200px',
      selector: (row) => row.createdAt,
      cell: (row) => <span>{convertDate(row.createdAt)}</span>
    }
  ];

  useEffect(() => {
    setData(store.membershipSales);
  }, [store.membershipSales]);

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
