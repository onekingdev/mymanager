// ** React Imports
import { Fragment, useState } from 'react';

// ** Components
import AddCouponModal from './addCouponModal';

// ** Third Party Components
import DataTable from 'react-data-table-component';
import { Trash2, Edit } from 'react-feather';

// ** Reactstrap Imports
import { Row, Col, Card, Input, Button, CardBody, Badge } from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import ReactPaginate from 'react-paginate';

const Coupons = () => {
  // ** States
  const [centeredModal, setCenteredModal] = useState(false);

  const tabledata = [
    {
      id: 'E84h4k4',
      start: '12/12/2023',
      end: '12/12/2023',
      campaign: 'New Year',
      code: 45343,
      percentage: '23%',
      ptype: 'membership'
    },
    {
      id: 'E84h4k1',
      start: '12/12/2023',
      end: '12/12/2023',
      campaign: 'New Year',
      code: 45343,
      percentage: '23%',
      ptype: 'membership'
    },
    {
      id: 'E84h4k2',
      start: '12/12/2023',
      end: '12/12/2023',
      campaign: 'New Year',
      code: 45343,
      percentage: '23%',
      ptype: 'membership'
    },
    {
      id: 'E84h4k3',
      start: '12/12/2023',
      end: '12/12/2023',
      campaign: 'New Year',
      code: 45343,
      percentage: '23%',
      ptype: 'membership'
    }
  ];

  const columnsdata = [
    {
      name: 'ID',
      sortable: true,
      width: '100px',
      sortField: 'id',
      selector: (row) => row.id
    },
    {
      name: 'Start Date',
      sortable: true,
      // width: '130px',
      sortField: 'start',
      selector: (row) => row.start
    },
    {
      name: 'End Date',
      sortable: true,
      // width: '130px',
      sortField: 'end',
      selector: (row) => row.end
    },
    {
      name: 'Campaigns Name',
      sortable: true,
      width: '180px',
      sortField: 'campaign',
      selector: (row) => row.campaign
    },
    {
      name: 'Code',
      sortable: true,
      // width: '130px',
      sortField: 'code',
      selector: (row) => row.code
    },
    {
      name: 'Percentage',
      sortable: true,
      // width: '130px',
      sortField: 'percentage',
      selector: (row) => row.percentage
    },
    {
      name: 'Product Type',
      sortable: true,
      // width: '130px',
      sortField: 'ptype',
      selector: (row) => row.ptype
    },
    {
      name: 'Status',
      sortable: true,
      // width: '130px',
      sortField: 'status',
      cell: (row) => (
        <Badge color="success" className="d-block">
          <span>Active</span>
        </Badge>
      )
    },
    {
      name: 'Actions',
      // minWidth: '100px',
      cell: (row) => (
        <div className="column-action">
          <Edit size={20} className="me-1" />
          <Trash2 size={20} />
        </div>
      )
    }
  ];

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
            <Col md="3">
              <Input
                id="search-invoice"
                // className="w-100"
                type="text"
                placeholder="Search by coupon code or name ..."
              />
            </Col>
            <Col md="9" className="d-flex justify-content-end">
              <Button
                className="btn-icon"
                color="primary"
                onClick={() => setCenteredModal(!centeredModal)}
              >
                Add New Coupon
              </Button>
              <AddCouponModal centeredModal={centeredModal} setCenteredModal={setCenteredModal} />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <Col>
          <div className="react-dataTable" style={{ height: 'auto', maxHeight: '100%' }}>
            <DataTable
              columns={columnsdata}
              data={tabledata}
              pagination
              paginationComponent={CustomPagination}
            />
          </div>
        </Col>
      </Card>
    </Fragment>
  );
};

export default Coupons;
