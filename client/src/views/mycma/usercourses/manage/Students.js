// ** React Imports
import { Fragment, useState } from 'react';

// ** Third Party Components
import DataTable from 'react-data-table-component';
import { FileText, Trash2 } from 'react-feather';

// ** Reactstrap Imports
import { Row, Col, Card, Input, CardBody } from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import ReactPaginate from 'react-paginate';

const Students = () => {

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };
  const tabledata = [
    {
      id: 'E84h4k4',
      date: '10/02/2023',
      name: 'Md. Nahiduzzmana',
      email: 'mdnahid071@gmail.com',
      phone: '+880838383838',
      address: 'you are welcome'
    },
    {
      id: 'E84h4k3',
      date: '10/02/2023',
      name: 'Md. Nahiduzzmana',
      email: 'mdnahid071@gmail.com',
      phone: '+880838383838',
      address: 'you are welcome'
    },
    {
      id: 'E84h4k2',
      date: '10/02/2023',
      name: 'Md. Nahiduzzmana',
      email: 'mdnahid071@gmail.com',
      phone: '+880838383838',
      address: 'you are welcome'
    },
    {
      id: 'E84h4k1',
      date: '10/02/2023',
      name: 'Md. Nahiduzzmana',
      email: 'mdnahid071@gmail.com',
      phone: '+880838383838',
      address: 'you are welcome'
    }
  ];

  const columnsdata = [
    {
      name: 'ID',
      sortable: true,
      // width: '130px',
      sortField: 'id',
      selector: (row) => row.id
    },
    {
      name: 'Joining Date',
      sortable: true,
      // width: '130px',
      sortField: 'date',
      selector: (row) => row.date
    },
    {
      name: 'Student Name',
      sortable: true,
      // width: '130px',
      sortField: 'name',
      selector: (row) => row.name
    },
    {
      name: 'Email',
      sortable: true,
      // width: '130px',
      sortField: 'email',
      selector: (row) => row.email
    },
    {
      name: 'Phone',
      sortable: true,
      // width: '130px',
      sortField: 'phone',
      selector: (row) => row.phone
    },
    {
      name: 'Address',
      sortable: true,
      // width: '130px',
      sortField: 'address',
      selector: (row) => row.address
    },
    {
      name: 'Actions',
      // minWidth: '100px',
      cell: (row) => (
        <div className="column-action">
          <FileText size={20} className="me-1" />
          <Trash2 size={20} className="me-1" />
        </div>
      )
    }
  ];

  const CustomPagination = () => {
    const count = Math.ceil(tabledata.length / rowsPerPage);


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
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col md="12">
              <Input
                id="search-invoice"
                // className="w-100"
                type="text"
                placeholder="Search by name/email/phone ..."
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <Col>
          <DataTable columns={columnsdata} data={tabledata} pagination paginationComponent={CustomPagination}/>
        </Col>
      </Card>
    </Fragment>
  );
};

export default Students;
