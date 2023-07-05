// ** React Imports
import React, { useState } from 'react';

// ** Custom Components
import BeltOne from '@src/assets/images/belt/orange.png';
import BeltTwo from '@src/assets/images/belt/blackwhite.png';
import BeltThree from '@src/assets/images/belt/whiteorange.png';
import BeltFour from '@src/assets/images/belt/yellow.png';
import BeltFive from '@src/assets/images/belt/purple.png';
import BeltSix from '@src/assets/images/belt/blueblack.png';
import BeltSeven from '@src/assets/images/belt/greenblack.png';
import BeltEight from '@src/assets/images/belt/white.png';
// ** Third Party Components
import DataTable from 'react-data-table-component';
import { selectThemeColors } from '../../../../utility/Utils';
import ExpandableTable, { useColumns } from './useColumns';

import Select from 'react-select';
import {
  Send,
  Info,
  Save,
  PieChart,
  CheckCircle,
  ChevronDown,
  ArrowDownCircle
} from 'react-feather';
import { Card, Row, Col, CardHeader, CardTitle, InputGroup, Input } from 'reactstrap';

// ** Styles
// import '@styles/react/apps/app-invoice.scss';
// import '@styles/react/libs/tables/react-dataTable-component.scss';

import RankProgramChart from '../chart/RankProgramChart';
import ReactPaginate from 'react-paginate';

const data = [
  {
    id: 1,
    beltColor: BeltOne,
    rankName: 'Ticando',
    current: 'Blue Belt',
    loss: '6',
    total: 333,
    category: 'Active Member'
  },
  {
    id: 2,
    beltColor: BeltTwo,
    rankName: 'Green Bel',
    current: 'Blue Belt',
    gain: '7',
    total: 333,
    category: 'Active Member'
  },
  {
    id: 3,
    beltColor: BeltThree,
    rankName: 'White Black Stripe Belt',
    current: 'Blue Belt',
    gain: '7',
    total: 333,
    category: 'Lead'
  },
  {
    id: 4,
    beltColor: BeltFour,
    rankName: 'Green Tip Belt',
    current: 'Blue Belt',
    loss: '6',
    total: 333,
    category: 'Active Trial'
  },
  {
    id: 5,
    beltColor: BeltFive,
    rankName: 'LT No Belt',
    current: 'Blue Belt',
    gain: '7',
    total: 333,
    category: 'Active Trial'
  },
  {
    id: 6,
    beltColor: BeltSix,
    rankName: 'LT White Belt',
    current: 'Blue Belt',
    gain: '7',
    total: 333,
    category: 'Active Trial'
  },
  {
    id: 7,
    beltColor: BeltSeven,
    rankName: 'White Orange Stripe Belt',
    current: 'Blue Belt',
    loss: '6',
    total: 333,
    category: 'Formal Trial'
  },
  {
    id: 8,
    beltColor: BeltEight,
    rankName: 'Orange Belt',
    current: 'Blue Belt',
    gain: '7',
    total: 333,
    category: 'Active Trial'
  },
  {
    id: 9,
    beltColor: BeltEight,
    rankName: 'Orange Belt',
    current: 'Blue Belt',
    gain: '7',
    total: 333,
    category: 'Active Trial'
  },
  {
    id: 10,
    beltColor: BeltEight,
    rankName: 'Orange Belt',
    current: 'Blue Belt',
    gain: '7',
    total: 333,
    category: 'Active Trial'
  },
  {
    id: 11,
    beltColor: BeltEight,
    rankName: 'Orange Belt',
    current: 'Blue Belt',
    gain: '7',
    total: 333,
    category: 'Active Trial'
  }
];

const RankTable = () => {
  const { columns } = useColumns();
  const [filtervalue, setFiltervalue] = useState();
  const [filterCate, setFilterCate] = useState();
  const [lastYear, setLastYear] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


  const count = data.length;


  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Math.ceil(data?.length / rowsPerPage);

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
    <div className="invoice-list-wrapper">
      {/* <RankProgramChart /> */}
      <Card>
        <CardHeader>
          <CardTitle className="w-100">
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex ">
                Rank Statistics{' '}
                <div className="table-rating " style={{ marginLeft: '5px' }}>
                  <span>{count}</span>
                </div>
              </div>
              <div>
                <InputGroup className="d-flex justify-content-end input-group-merge p-0 font-small-4">
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="p-0 me-1"
                    classNamePrefix="select"
                    options={filterByCategory}
                    value={filterCate}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        minWidth: '120px'
                      })
                    }}
                  />
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="p-0 me-1"
                    classNamePrefix="select"
                    options={monthOption}
                    value={filtervalue}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        minWidth: '120px'
                      })
                    }}
                  />
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="p-0"
                    classNamePrefix="select"
                    options={yearOption}
                    value={lastYear}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        minWidth: '120px'
                      })
                    }}
                  />
                </InputGroup>
              </div>
            </div>
          </CardTitle>
        </CardHeader>

        <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
          <DataTable
            noHeader
            sortServer
            pagination
            responsive
            paginationServer
            paginationComponent={CustomPagination}

            // expandOnRowClicked
            // expandableRows
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            // expandableRowsComponent={ExpandableTable}
            data={data}
            columns={columns}
          />
        </div>
      </Card>
    </div>
  );
};

export default RankTable;

const monthOption = [
  { value: '', label: 'All' },
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' }
];

const filterByCategory = [
  { value: '', label: 'All' },
  { value: 'Active Member', label: 'Active Member' },
  { value: 'Lead', label: 'Lead' },
  { value: 'Employee', label: 'Employee' },
  { value: 'Relationship', label: 'Relationship' },
  { value: 'Vendor', label: 'Vendor' }
];

const yearOption = [
  { value: '', label: 'All' },
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
  { value: '2027', label: '2027' },
  { value: '2028', label: '2028' },
  { value: '2029', label: '2029' },
  { value: '2030', label: '2030' },
  { value: '2031', label: '2031' },
  { value: '2032', label: '2032' },
  { value: '2033', label: '2033' },
  { value: '2034', label: '2034' }
];
