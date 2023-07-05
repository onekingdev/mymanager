import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ReactPaginate from 'react-paginate';

import {
  ChevronDown,
  ChevronsDown,
  Copy,
  Download,
  Edit,
  Eye,
  MoreVertical,
  Send,
  Trash
} from 'react-feather';
import DocModal from './DocModal';

import DataTable from 'react-data-table-component';
import {
  Card,
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';


function ListView({type,incomeList,month,year}) {

  const columns = [
    {
      sortable: true,
      name: 'Date',
      sortField: 'date',
      cell: ((row) => {
            const date = new Date(row.date)
            var noTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            return noTime.toDateString()
          }
      )
      // selector: row => row.dueDate
    },
    {
      name: 'Name',
      sortable: true,
      sortField: 'name',
      // selector: row => row.client.name,
      cell: (row) => {
        const name = row.name ? row.name : row?.clientId?.fullName;
        return <span>{name}</span>;
      }
    },
    {
      name: 'Type',
      sortable: true,
      sortField: 'type',
      minWidth: '150px',
      // selector: row => row.total,
      cell: (row) => <span>{row?.categoryId?.title }</span>
    },
    {
      name: 'Total',
      sortable: true,
      sortField: 'total',
      minWidth: '150px',
      // selector: row => row.total,
      cell: (row) => <span>${row.amount || 0}</span>
    },

    {
      name: 'Proof',
      ///sortField: 'total',
      // selector: row => row.total,
      cell: (row) => {
        const [modal, setModal] = useState(false);
        const toggle = () => setModal(!modal);
        if(row?.invoiceId){
          return <Button color='primary' outline size='sm' tag={Link} to={`/invoice-preview/${row?.invoiceId?._id}`} target="_blank">View</Button>
        }
        else{
          return <DocModal modal={modal} toggle={toggle} data={row} type={type} dispatch={dispatch}/>
        }
      }
    },
   
  ];

  const dispatch = useDispatch();

  // ** States
  const [value, setValue] = useState('');
  const [sort, setSort] = useState('desc');
  const [sortColumn, setSortColumn] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusValue, setStatusValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState('1');

  



  const handleFilter = (val) => {
    setValue(val);
    dispatch(
      
    );
  };

  const handlePerPage = (e) => {
    dispatch(
      
    );
    setRowsPerPage(parseInt(e.target.value));
  };

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
    dispatch(
      
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
    const count = Number((incomeList.length / rowsPerPage).toFixed(0));

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
        <DataTable
          noHeader
          pagination
          paginationServer
          subHeader={false}
          columns={columns}
          responsive={true}
          onSort={handleSort}
          data={incomeList}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          defaultSortField="invoiceId"
          paginationDefaultPage={currentPage}
          paginationComponent={CustomPagination}
          // subHeaderComponent={

          // }
        />
      </Card>
    </div>
  );
}

export default ListView;
