import React, { useEffect, useState } from 'react';
import { getData } from '../store';
import { useDispatch, useSelector } from 'react-redux';

import { columns } from './columns';

import ReactPaginate from 'react-paginate';

import { ChevronDown, ChevronsDown } from 'react-feather';

import DataTable from 'react-data-table-component';

import {
  Button,
  Input,
  Row,
  Col,
  Card,
  FormGroup,
  Label,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap';

const InvoiceList = () => {
  // ** Store vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.invoice);

  // ** States
  const [value, setValue] = useState('');
  const [sort, setSort] = useState('desc');
  const [sortColumn, setSortColumn] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusValue, setStatusValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState('1');

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  useEffect(() => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue
      })
    );
  }, [dispatch, store.data.length]);

  const handleFilter = (val) => {
    setValue(val);
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue
      })
    );
  };

  const handlePerPage = (e) => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        status: statusValue,
        perPage: parseInt(e.target.value)
      })
    );
    setRowsPerPage(parseInt(e.target.value));
  };

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: e.target.value
      })
    );
  };

  const handlePagination = (page) => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        status: statusValue,
        perPage: rowsPerPage,
        page: page.selected + 1
      })
    );
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage).toFixed(0));

    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        pageCount={count || 1}
        activeClassName="active"
        breakClassName="page-item"
        pageClassName={'page-item'}
        breakLinkClassName="page-link"
        nextLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousLinkClassName={'page-link'}
        previousClassName={'page-item prev'}
        onPageChange={(page) => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    );
  };

  const dataToRender = () => {
    const filters = {
      q: value,
      status: statusValue
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (store.data.length > 0) {
      return store.data;
    } else if (store.data.length === 0 && isFiltered) {
      return [];
    } else {
      return store.allData.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        q: value,
        page: currentPage,
        sort: sortDirection,
        status: statusValue,
        perPage: rowsPerPage,
        sortColumn: column.sortField
      })
    );
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <Accordion open={open} toggle={toggle}>
          <AccordionItem className="border">
            <AccordionHeader targetId="1">
              <div className="d-flex">
                <Label style={{fontSize: '18px'}}>September 1, 2023</Label>
                <Badge
                  color="primary"
                  style={{
                    position: 'absolute',
                    right: '50px'
                  }}
                >
                  10
                </Badge>{' '}
              </div>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              <div className="invoice-list-dataTable react-dataTable">
                <DataTable
                  noHeader
                  pagination
                  sortServer
                  paginationServer
                  subHeader={false}
                  columns={columns}
                  responsive={true}
                  onSort={handleSort}
                  data={dataToRender()}
                  sortIcon={<ChevronDown />}
                  className="react-dataTable"
                  defaultSortField="invoiceId"
                  paginationDefaultPage={currentPage}
                  paginationComponent={CustomPagination}
                  // subHeaderComponent={

                  // }
                />
              </div>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem className="border">
            <AccordionHeader targetId="2">
              <div className="d-flex">
                <Label style={{fontSize: '18px'}}>September 5, 2023</Label>
                <Badge
                  color="primary"
                  style={{
                    position: 'absolute',
                    right: '50px'
                  }}
                >
                  10
                </Badge>{' '}
              </div>
            </AccordionHeader>
            <AccordionBody accordionId="2">
              <div className="invoice-list-dataTable react-dataTable">
                <DataTable
                  noHeader
                  pagination
                  sortServer
                  paginationServer
                  subHeader={false}
                  columns={columns}
                  responsive={true}
                  onSort={handleSort}
                  data={dataToRender()}
                  sortIcon={<ChevronDown />}
                  className="react-dataTable"
                  defaultSortField="invoiceId"
                  paginationDefaultPage={currentPage}
                  paginationComponent={CustomPagination}
                  // subHeaderComponent={

                  // }
                />
              </div>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};

export default InvoiceList;
