import React, { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown
} from 'reactstrap';
import OneImage from '../../../../assets/images/avatars/1.png';

import Select from 'react-select';
import DataTable from 'react-data-table-component';
import { ChevronDown, MoreVertical, Plus, TrendingUp } from 'react-feather';
import { selectThemeColors } from '@utils';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { formatDateTime } from '../../../../utility/Utils';

const data = [
  {
    id: 1,
    title: 'task',
    createdAt: '03/05/2023, 02:20',
    dueDate: '03/05/2023, 02:20',
    assign: '',
    status: 'DONE'
  },
  {
    id: 2,
    title: 'Hotel Management',
    createdAt: '03/05/2023, 02:20',
    dueDate: '03/05/2023, 02:20',
    assign: '',
    status: 'PENDING'
  },
  {
    id: 3,
    title: 'task',
    createdAt: '03/05/2023, 02:20',
    dueDate: '03/05/2023, 02:20',
    assign: '',
    status: 'TODO'
  },
  {
    id: 4,
    title: 'task',
    createdAt: '03/05/2023, 02:20',
    dueDate: '03/05/2023, 02:20',
    assign: '',
    status: 'DONE'
  },
  {
    id: 5,
    title: 'task',
    createdAt: '03/05/2023, 02:20',
    dueDate: '03/05/2023, 02:20',
    assign: '',
    status: 'CANCEL'
  }
];

const optionColors = {
  DONE: 'rgb(40, 199, 111)',
  PENDING: 'rgb(255, 159, 67)',
  TODO: 'rgb(23, 74, 231)',
  CANCEL: 'rgb(234, 84, 85)'
};

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: optionColors[state.data.value] || 'transparent',
    color: state.isSelected ? '#fff' : '#fff'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff'
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: optionColors[state.selectProps.value.value] || 'transparent',
    borderColor: optionColors[state.selectProps.value.value] || '#ced4da',
    boxShadow: 'none',
    '&:hover': {
      borderColor: optionColors[state.selectProps.value.value] || '#ced4da'
    }
  })
};

const columns = [
  {
    name: 'Task Name',
    sortable: true,
    width: '350px',
    selector: (row) => row.title,
    cell: (row) => {
      let startDate = row.createdAt ? formatDateTime(row.createdAt) : 'Not Selected';
      let endDate = row.dueDate ? formatDateTime(row.dueDate) : 'Not Selected';

      return (
        <div className="d-flex" style={{ cursor: 'pointer' }}>
          <div>
            <div style={{ fontWeight: 'bold' }}>{row.title}</div>
            {`${startDate} - ${endDate}`}
          </div>
        </div>
      );
    }
  },
  {
    name: 'Assignees',
    cell: (row) => {
      return (
        <div className="d-flex" style={{ cursor: 'pointer' }}>
          <div>
            <img alt={'image'} src={OneImage} width={32} style={{ borderRadius: '25px' }} />
          </div>
        </div>
      );
    }
  },
  {
    name: 'Status',
    cell: (row) => {
      return (
        <div
          style={{
            cursor: 'pointer',
            color: '#fff'
          }}
        >
          <Select
            options={[
              { value: 'DONE', label: 'DONE' },
              { value: 'PENDING', label: 'PENDING' },
              { value: 'TODO', label: 'TODO' },
              { value: 'CANCEL', label: 'CANCEL' }
            ]}
            value={{ value: row.status, label: row.status }}
            theme={selectThemeColors}
            className="dashboard-select-container"
            classNamePrefix="react-select"
            styles={customStyles}
          />
        </div>
      );
    }
  },
  {
    name: 'Action',
    cell: (row) => {
      return (
        <div className="column-action" style={{ marginLeft: '1.2rem' }}>
          <UncontrolledDropdown>
            <DropdownToggle className="btn btn-sm" tag="div" href="/">
              <MoreVertical className="text-body" size={16} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={'span'} className="w-100">
                {/* <Edit size={'14px'} style={{ marginRight: '10px' }} /> */}
                Edit
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    }
  }
];

function MyTask() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const paginatedData = data.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const CustomPagination = () => {
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
      <div className="p-1 d-flex justify-content-between">
        <h4 className="mb-0">My Task</h4>
        <div className="d-flex me-1">
          <Button color="primary">
            <Plus size={14} /> Create Task
          </Button>
          <Input
            type="text"
            placeholder="Search Task"
            style={{ width: '150px', marginLeft: '5px' }}
          />
          <Input type="select" name="select" style={{ width: '150px', marginLeft: '5px' }}>
            <option>Select Status</option>
            <option>Download</option>
            <option>Draft</option>
            <option>Sent</option>
            <option>Paid</option>
            <option>Partial Payment</option>
            <option>Post Due</option>
          </Input>
        </div>
      </div>
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
}

export default MyTask;
