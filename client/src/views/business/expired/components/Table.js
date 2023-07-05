import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Search } from 'react-feather';
import { InputGroup, InputGroupText, Input, Card, CardHeader, CardTitle } from 'reactstrap';
import { basicColumns } from './data';
import Select from 'react-select';
import { selectThemeColors } from '../../../../utility/Utils';
import ReactPaginate from 'react-paginate';

const data = [
  {
    id: 1,
    formId: '167-161211',
    name: 'New Jersey',
    type: 'none',
    created: 'JAN 27 2021'
  },
  {
    id: 2,
    formId: '167-161211',
    name: 'New Jersey',
    type: 'none',
    created: 'JAN 27 2021'
  },
  {
    id: 3,
    formId: '167-112071',
    name: 'New York NJ-W4',
    type: 'none',
    created: 'JAN 27 2021'
  },
  {
    id: 4,
    formId: '167-178071',
    name: 'Taxes NJ-W4',
    type: 'none',
    created: 'JAN 27 2021'
  },
  {
    id: 5,
    formId: '167-878071',
    name: 'New Jersey NJ-W4',
    type: 'none',
    created: 'JAN 27 2021'
  },
  {
    id: 6,
    formId: '167-168071',
    name: 'New export NJ-W4',
    type: 'none',
    created: 'JAN 27 2021'
  },
  {
    id: 7,
    formId: '167-65671',
    name: 'New Jersey NJ-W4',
    type: 'none',
    created: 'FEB 27 2022'
  },
  {
    id: 8,
    formId: '167-433071',
    name: 'New Jersey NJ-W4',
    type: 'none',
    created: 'FEB 27 2024'
  },
  {
    id: 9,
    formId: '167-433071',
    name: 'New Jersey NJ-W4',
    type: 'none',
    created: 'FEB 27 2024'
  },
  {
    id: 10,
    formId: '167-433071',
    name: 'New Jersey NJ-W4',
    type: 'none',
    created: 'FEB 27 2024'
  },
  {
    id: 11,
    formId: '167-433071',
    name: 'New Jersey NJ-W4',
    type: 'none',
    created: 'FEB 27 2024'
  },
  {
    id: 12,
    formId: '167-433071',
    name: 'New Jersey NJ-W4',
    created: 'FEB 27 2024'
  },
  {
    id: 13,
    formId: '167-433071',
    name: 'New Jersey NJ-W4',
    type: 'none',
    created: 'FEB 27 2024'
  },
  {
    id: 14,
    formId: '167-433071',
    name: 'New Jersey NJ-W4',
    type: 'none',
    created: 'FEB 27 2024'
  },
  {
    id: 15,
    formId: '167-433071',
    name: 'New Jersey NJ-W4',
    type: 'none',
    created: 'FEB 27 2024'
  },
  {
    id: 16,
    formId: '167-433071',
    name: 'New Jersey NJ-W4',
    type: 'none',
    created: 'FEB 27 2024'
  }
];
const roleOptions = [
  { value: 'Clients', label: 'Clients' },
  { value: 'Employee', label: 'Employee' },
  { value: 'Leads', label: 'Leads' },
  { value: 'Relationship', label: 'Relationship' },
  { value: 'Vendor', label: 'Vendor' }
];
const Table = () => {
  const [filtervalue, setfiltervalue] = useState('Clients');
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
    <div className="email-user-list">
      <Card className="overflow-hidden w-100">
        <CardHeader>
          <CardTitle className="w-100">
            <div className="d-flex justify-content-between w-100">
              <div>Expired</div>
              <div>
                <InputGroup className=" d-flex justify-content-end input-group-merge p-0">
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="filter-input p-0"
                    classNamePrefix="select"
                    options={roleOptions}
                    value={filtervalue}
                  />
                </InputGroup>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
          <DataTable
            className="react-dataTable"
            noHeader
            pagination
            selectableRows
            columns={basicColumns}
            paginationComponent={CustomPagination}
            sortIcon={<ChevronDown size={10} />}
            data={data}
          />
        </div>
      </Card>
    </div>
  );
};

export default Table;
