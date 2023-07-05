// ** React Imports
import React, { Fragment, useEffect, useState } from 'react'

// ** Third Party Components
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import { FileText, Trash2, Edit } from 'react-feather';

// ** Reactstrap Imports
import { Row, Col, Card, Input, Button, CardBody } from 'reactstrap';
import ImageOne from '../../../../../../assets/images/elements/beats-headphones.png';
import ImageTwo from '../../../../../../assets/images/elements/apple-watch.png';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { useDispatch, useSelector } from 'react-redux'

import ReactPaginate from 'react-paginate'
import { getData } from '../../../../../calendar/book/store'
import { getProductListAction, getShopByUserAction } from '../../../../../shops/store/action';

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
    return store.products
  }

  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
    dispatch(({ shopPath:store.shop.shopPath, permission:'public'}))
  }

  useEffect(()=>{
    dispatch(getShopByUserAction())
  },[store.shop])

  const CustomPagination = () => {
    const count = Number((store.totalProducts / rowsPerPage).toFixed(0))

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
  const tabledata = [
    {
      id: 1,
      sku: ImageOne,
      name: 'Lenovo Thinkpad',
      category: 'Product',
      subCategory: 'Laptop',
      desc: 'Everyone please give your full name and email address',
      rating: 5,
      price: 234,
      stock: 29
    },
    {
      id: 2,
      sku: ImageTwo,
      name: 'Lenovo 231',
      category: 'Product',
      subCategory: 'Laptop',
      desc: 'Everyone please give your full name and email address',
      rating: 4,
      price: 234,
      stock: 29
    },
    {
      id: 3,
      sku: ImageOne,
      name: 'Lenovo T440',
      category: 'Product',
      subCategory: 'Laptop',
      desc: 'Everyone please give your full name and email address',
      rating: 3.5,
      price: 234,
      stock: 29
    }
  ];

  const columnsdata = [
    {
      name: 'SKU',
      sortable: true,
      sortField: 'position',
      selector: (row) => (
        <div className="column-action">
          <img src={row?.product_url} style={{ width: '40px', height: '40px', borderRadius: '25px' }} />
        </div>
      )
    },
    {
      name: 'Product Name',
      sortable: true,
      sortField: 'name',
      selector: (row) => row.product_name
    },
    {
      name: 'Brand',
      sortable: true,
      sortField: 'category',
      selector: (row) => row.product_brand
    },
    {
      name: 'Price',
      sortable: true,
      sortField: 'price',
      selector: (row) => row.product_price
    }
  ];

  const rowSelectCritera = row => preselectIds.includes(row._id)

  useEffect(() => {
    dispatch(getProductListAction({ shopPath:store.shop.shopPath, permission:'public'}))
  }, [
    dispatch
  ])
  return (
    <DataTable
      columns={columnsdata}
      paginationComponent={CustomPagination}
      onSelectedRowsChange={handleSelect}
      selectableRows
      selectableRowSelected={rowSelectCritera}
      data={dataToRender()}
      pagination
    />
  );
};

export default Products;
