// ** React Imports
import React, { Fragment, useEffect, useState } from 'react'

// ** Third Party Components
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import { FileText, Trash2, Edit } from 'react-feather';

// ** Reactstrap Imports
import { Row, Col, Card, Input, Button, CardBody } from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { useDispatch, useSelector } from 'react-redux'

import ReactPaginate from 'react-paginate'
import { getMembershipsAction, getShopByUserAction } from '../../../../../shops/store/action';

const Products = ({ handleSelect, preselectIds }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')
  const dispatch = useDispatch()
  const store = useSelector((state) => {
    return state.shops
  })
  const dataToRender = () => {
    return store.memberships
  }

  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
    dispatch(getMembershipsAction({ shopPath:store.shop.shopPath, permission:'public'}))
  }

  useEffect(()=>{
    dispatch(getShopByUserAction())
  },[store.shop])

  const CustomPagination = () => {
    const count = Number((store.totalMemberships / rowsPerPage).toFixed(0))

    return (
        <ReactPaginate
            nextLabel=''
            breakLabel='...'
            previousLabel=''
            pageCount={count || 1}
            activeClassName='active'
            breakClassName='page-item'
            pageClassName={'page-item'}
            breakLinkClassName='page-link'
            nextLinkClassName={'page-link'}
            pageLinkClassName={'page-link'}
            nextClassName={'page-item next'}
            previousLinkClassName={'page-link'}
            previousClassName={'page-item prev'}
            onPageChange={page => handlePagination(page)}
            forcePage={currentPage !== 0 ? currentPage - 1 : 0}
            containerClassName={'pagination react-paginate justify-content-end p-1'}
        />
    )
  }


  const columnsdata = [

    {
      name: 'Membership Name',
      sortable: true,
      sortField: 'name',
      selector: (row) => row.membership_name
    },
    {
      name: 'Membership Type',
      sortable: true,
      sortField: 'category',
      selector: (row) => row.membership_type
    },
    {
      name: 'Price',
      sortable: true,
      sortField: 'price',
      selector: (row) => row.total_price
    }
  ];

  const rowSelectCritera = row => preselectIds.includes(row._id)

  useEffect(() => {
    dispatch(getMembershipsAction({ shopPath:store.shop.shopPath, permission:'public'}))
  }, [
    dispatch
  ])
  return (
    <DataTable
      columns={columnsdata}
      paginationComponent={CustomPagination}
      onSelectedRowsChange={handleSelect}
      selectableRows
      selectableRowsSingle
      selectableRowSelected={rowSelectCritera}
      data={dataToRender()}
      pagination
    />
  );
};

export default Products;
