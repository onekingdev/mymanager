import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { Card, CardHeader, CardBody, Progress, Media, Button, Badge } from 'reactstrap';
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

const getBadgeColor = (type) => {
  switch (type) {
    case 'social media':
      return 'light-secondary';
    case 'facebook':
      return 'light-primary';
    case 'instagram':
      return 'light-danger';
    case 'whatsapp':
      return 'light-success';
    case 'chrome':
      return 'light-info';
    default:
      return 'light-secondary';
  }
};

const columns = [
  {
    name: 'Type',
    // width: '100px',
    selector: (row) => row.type,
    cell: (row) => <Badge color={getBadgeColor(row.type)}>{row.type}</Badge>
  },
  {
    name: 'Description',
    width: '180px',
    sortField: 'title',
    selector: (row) => row.title,
    cell: (row) => <div>title</div>
  },
  {
    name: 'Action',
    width: '120px',
    center: true,
    cell: (row) => (
      <Button className="btn btn-sm" color="primary" outline>
        Dismiss
      </Button>
    )
  }
];

const Notification = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const paginatedData = data.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handleFilterChange = (selectedOption) => {
    setSelectedFilter(selectedOption);
  };

  // Filter the data based on the selected option
  const filteredData = selectedFilter
    ? data.filter((item) => item.type === selectedFilter.value)
    : data;

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
          <h4 className="mb-1">
            {' '}
            <MdOutlineNotificationsNone size={18} style={{ color: '#174ae7' }} />
            Notification
          </h4>
        </div>
        <div style={{ minWidth: '150px' }}>
          <Select
            className="react-select ms-1"
            classNamePrefix="select"
            theme={selectThemeColors}
            onChange={handleFilterChange}
            options={[
              { value: 'social media', label: 'Social Media' },
              { value: 'facebook', label: 'Facebook' },
              { value: 'instagram', label: 'Instagram' },
              { value: 'whatsapp', label: 'WhatsApp' },
              { value: 'chrome', label: 'Chrome' }
            ]}
            placeholder="Filter by Type"
            isClearable
          />
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
    </Card>
  );
};

export default Notification;
