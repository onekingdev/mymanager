import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input
} from 'reactstrap';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FaDollarSign } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import { selectThemeColors } from '@utils';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';

const data = [
  { id: 1, name: 'Bohemia', type: 'social media' },
  { id: 2, name: 'Robin', type: 'facebook' },
  { id: 3, name: 'ROhan', type: 'instagram' },
  { id: 4, name: 'Monu', type: 'whatsapp' },
  { id: 5, name: 'Mohan Lal', type: 'chrome' },
  { id: 6, name: 'Vinod SIngh', type: 'chrome' },
  { id: 7, name: 'Ranjan', type: 'facebook' },
  { id: 8, name: 'Ranjan', type: 'facebook' },
  { id: 9, name: 'Vinod SIngh', type: 'chrome' },
  { id: 10, name: 'Ranjan', type: 'facebook' },
  { id: 11, name: 'Ranjan', type: 'facebook' }
];

const columns = [
  {
    name: 'Date',
    sortable: true,
    minWidth: '100px',
    // sortField: 'fullName',
    selector: (row) => row,
    cell: (row) => <div className="d-flex align-items-center">Mon, May 28, 2023</div>
  },
  {
    name: 'Name',
    width: '90px',
    sortable: true,
    sortField: 'title',
    selector: (row) => row.title,
    cell: (row) => <div>Don King</div>
  },
  {
    name: 'Total',
    width: '90px',
    sortable: true,
    sortField: 'title',
    selector: (row) => row.title,
    cell: (row) => <div>$ 23</div>
  },
  {
    name: 'Dismiss',
    center: true,
    cell: (row) => (
      <Button className="btn btn-sm" color="primary" outline>
        View
      </Button>
    )
  }
];

function OverDue() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const paginatedData = data.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const CustomPagination = () => {
    const count = Math.ceil(data.length);

    return (
      <div className="d-flex justify-content-end">
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          pageCount={pageCount}
          activeClassName="active"
          forcePage={currentPage}
          onPageChange={(page) => setCurrentPage(page.selected)}
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
    <Card style={{ height: '60vh' }}>
      <CardHeader>
        <div>
          <h4>Overdue</h4>
          <div className="options-menu">
            <span className="icon-button disabled">
              <FaDollarSign /> 78.99
            </span>
          </div>
        </div>
        <div>
          <div style={{ minWidth: '150px' }}>
            <Select
              className="react-select ms-1"
              classNamePrefix="select"
              theme={selectThemeColors}
              options={[
                { value: 'This Month', label: 'This Month' },
                { value: 'Last Month', label: 'Last Month' },
                { value: 'Yesterday', label: 'Yesterday' }
              ]}
            />
          </div>
        </div>
      </CardHeader>
      <div className="react-dataTable dashbard-notification">
        <DataTable
          noHeader
          sortIcon={<ChevronDown />}
          responsive
          paginationServer
          columns={columns}
          data={paginatedData}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          pagination
        />
      </div>

      {/* <div className="d-flex align-items-center">
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-start">
                <h6>$4,742</h6>
                <p className="text-muted">Your Earnings</p>
              </div>
              <p className="text-success">+10.2%</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#ffc107" fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className={`d-flex justify-content-between align-items-center`}>
              <h6>{'Donates'}</h6>
              <div className="d-flex align-items-center">
                <p className="text-secondary">${'756.26'}</p> {' '}
                <p className={`fw-500 text-${200.22 < 0 ? 'danger' : 'success'}`}>
                  {200.22 < 0 ? '-' : '+'}
                  {Math.abs(200.22)}
                </p>
              </div>
            </div>
            <div className={`d-flex justify-content-between align-items-center`}>
              <h6>{'Products'}</h6>
              <div className="d-flex align-items-center">
                <p className="text-secondary">${'756.26'}</p>{' '}
                <p className={`fw-500 text-${200.22 < 0 ? 'danger' : 'success'}`}>
                  {200.22 < 0 ? '-' : '+'}
                  {Math.abs(200.22)}
                </p>
              </div>
            </div>
          </div>
        </div> */}
    </Card>
  );
}

export default OverDue;
