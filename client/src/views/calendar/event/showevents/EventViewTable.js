import React, { Fragment, useState } from 'react';
import DataTable from 'react-data-table-component';
import useColumns from './useColumn';
import { ChevronDown } from 'react-feather';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Card, Col, Collapse, Label, Row } from 'reactstrap';
import Select from 'react-select';
import Breadcrumbs from '@components/breadcrumbs';

const mockData = [
  {
    id: 1,
    fullName: 'Full Name',
    status: 'Pending',
    events: '',
    division: '7'
  },
  {
    id: 2,
    fullName: 'Full Name',
    status: 'Pending',
    events: '',
    division: '7'
  },
  {
    id: 3,
    fullName: 'Full Name',
    status: 'Pending',
    events: '',
    division: '7'
  }
];

function EventViewTable() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { columns } = useColumns();

  const handleRowSelected = ({}) => {};

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Event"
        breadCrumbParent="Event View"
        breadCrumbActive="Event View Table"
      />
      <div className="app-user-list">
        <Card>
          <Row className="mb-2 border m-1" style={{ marginBottom: '10px' }}>
            <div className="d-flex justify-content-between">
              <h4 className="text-secondary" style={{ marginTop: '5px' }}>
                Filters
              </h4>
              <div onClick={toggle} style={{ marginTop: '5px', cursor: 'pointer' }}>
                {isOpen ? (
                  <FaChevronUp size={18} style={{ color: 'lightgray' }} />
                ) : (
                  <FaChevronDown size={18} color="primary" />
                )}
              </div>
            </div>
            <Collapse isOpen={isOpen}>
              <Row style={{ paddingBottom: '10px' }}>
                <Col md="3">
                  <Label for="role-select">Event</Label>
                  <Select isClearable={false} className="react-select" classNamePrefix="select" />
                </Col>
                <Col className="my-md-0 my-1" md="3">
                  <Label for="plan-select">Specific Age</Label>
                  <Select isClearable={false} className="react-select" classNamePrefix="select" />
                </Col>
                <Col md="3">
                  <Label for="status-select">Division</Label>
                  <Select isClearable={false} className="react-select" classNamePrefix="select" />
                </Col>
                <Col md="3">
                  <Label for="status-select">Rank</Label>
                  <Select
                    // isMulti
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                  />
                </Col>
              </Row>
            </Collapse>
          </Row>
          <div className="react-dataTable" style={{ height: '80vh', maxHeight: '100%' }}>
            <DataTable
              noHeader
              sortServer
              pagination
              responsive
              paginationServer
              columns={columns}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              // paginationComponent={CustomPagination}
              data={mockData}
              onSelectedRowsChange={handleRowSelected}
              selectableRows
            />
          </div>
        </Card>
      </div>
    </Fragment>
  );
}

export default EventViewTable;
