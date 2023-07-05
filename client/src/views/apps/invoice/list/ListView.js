import React, { useEffect, useState } from 'react';
import { getData } from '../store';
import { useDispatch, useSelector } from 'react-redux';

// import { columns } from './columns';

import ReactPaginate from 'react-paginate';

import { ChevronDown, ChevronsDown, Copy, Download, Edit, Eye, MoreVertical, Send, Trash } from 'react-feather';
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
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ListView() {
  const locationPath = useLocation();
  const isExpenseSection = locationPath.pathname === '/finance/expense';

  const columns = [
    {
      sortable: true,
      name: 'Date',
      sortField: 'dueDate',
      minWidth: '150px',
      cell: (row) => row.dueDate
      // selector: row => row.dueDate
    },
    {
      name: 'Name',
      sortable: true,
      sortField: 'client.name',
      minWidth: '110px',
      // selector: row => row.client.name,
      cell: (row) => {
        const name = row.client ? row.client.name : 'John Doe',
          email = row.client ? row.client.companyEmail : 'johnDoe@email.com';
        return <span>{name}</span>;
      }
    },
    {
      name: 'Type',
      sortable: true,
      sortField: 'type',
      minWidth: '150px',
      // selector: row => row.total,
      cell: (row) => <span>${row.type || 'One Time'}</span>
    },
    {
      name: 'Total',
      sortable: true,
      sortField: 'total',
      minWidth: '150px',
      // selector: row => row.total,
      cell: (row) => <span>${row.total || 0}</span>
    },
    // {},
    // {
    //   sortable: true,
    //   name: isExpenseSection ? 'Expense' : 'Income',
    //   sortField: isExpenseSection ? 'Expense' : 'Income',
    //   // selector: row => row.id,
    //   minWidth: '150px',
    //   cell: (row) => {
    //     const [modal, setModal] = useState(false);
    //     const toggle = () => setModal(!modal);
    //     return (
    //       <>
    //         {isExpenseSection ? (
    //           <DocModal modal={modal} toggle={toggle} />
    //         ) : (
    //           <Link
    //             to={`/apps/invoice/preview/${row.id}`}
    //             className="hovertext"
    //             data-hover="See invoice"
    //           >{`#${row.id}`}</Link>
    //         )}
    //       </>
    //     );
    //   }
    // },
    {
      name: 'Expense',
      sortField: 'total',
      // selector: row => row.total,
      cell: (row) => {
        const [modal, setModal] = useState(false);
        const toggle = () => setModal(!modal);
        return <DocModal modal={modal} toggle={toggle} />
      }
    },
    {
      name: 'Action',
      minWidth: '110px',
      cell: (row) => (
        <div className="column-action d-flex align-items-center">
          <Send className="cursor-pointer" size={17} id={`send-tooltip-${row.id}`} />
          <UncontrolledTooltip placement="top" target={`send-tooltip-${row.id}`}>
            Send Mail
          </UncontrolledTooltip>
          <Link to={`/apps/invoice/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>
            <Eye size={17} className="mx-1" />
          </Link>
          <UncontrolledTooltip placement="top" target={`pw-tooltip-${row.id}`}>
            Preview Invoice
          </UncontrolledTooltip>
          <UncontrolledDropdown>
            <DropdownToggle tag="span">
              <MoreVertical size={17} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
                <Download size={14} className="me-50" />
                <span className="align-middle">Download</span>
              </DropdownItem>
              <DropdownItem tag={Link} to={`/apps/invoice/edit/${row.id}`} className="w-100">
                <Edit size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  // store.dispatch(deleteInvoice(row.id))
                }}
              >
                <Trash size={14} className="me-50" />
                <span className="align-middle">Delete</span>
              </DropdownItem>
              <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
                <Copy size={14} className="me-50" />
                <span className="align-middle">Duplicate</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];

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
      </Card>
    </div>
  );
}

export default ListView;
