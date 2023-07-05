import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Edit, FileText, Lock, Trash2 } from 'react-feather';
import Select from 'react-select';
import { Button, Card, CardBody, Col, Input, Row } from 'reactstrap';
import AddProductSidebar from './AddProductSidebar';
import { updateProductAction } from '../../../../../store/action';
import { useHistory } from 'react-router-dom';
import EditProductSidebar from './EditProductSidebar';
import { getUserData } from '../../../../../../../auth/utils';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';

export default function ProductList({ store, dispatch }) {
  const [data, setData] = useState();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productSidebarOpen, setProductSidebarOpen] = useState(false);
  const [openEditProductSidebar, setEditProductSidebar] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const toggleProductHandler = () => setProductSidebarOpen(!productSidebarOpen);
  const toggleEditProductSidebar = () => setEditProductSidebar(!openEditProductSidebar);

  const history = useHistory();
  const user = getUserData();

  const handleUpdateProduct = (e, product) => {
    //permission change
    if (e.target.checked === true) {
      dispatch(updateProductAction(product._id, { shopId: product.shopId, permission: 'public' }));
    } else {
      dispatch(updateProductAction(product._id, { shopId: product.shopId, permission: 'private' }));
    }
  };
  const handleViewDetails = (product) => {
    //go to view details
    history.push(`/ecommerce/shop/${product.path}`);
  };

  const handleDeleteProduct = (product) => {
    Swal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete the this product?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch the delete product action here
        dispatch(updateProductAction(product._id, { shopId: product.shopId, isDeleted: true }));
      }
    });
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    toggleEditProductSidebar();
  };
  const columns = [
    {
      name: 'Product',
      sortable: true,
      width: '100px',
      //sortField: 'name',

      selector: (row) => row?.imgUrl,
      cell: (row) => <img src={row.imgUrl} className="w-100" />
    },
    {
      name: 'Product Name',
      sortable: true,
      // width: '130px',
      sortField: 'name',
      selector: (row) => row?.name
    },
    {
      name: 'Brand',
      sortable: true,
      // width: '130px',
      sortField: 'brand',
      selector: (row) => row?.brand?.name
    },
    {
      name: 'Category',
      sortable: true,
      // width: '130px',
      sortField: 'category',
      selector: (row) => row?.category?.name
    },
    {
      name: 'Price',
      sortable: true,
      // width: '130px',
      sortField: 'price',
      selector: (row) => row?.price
    },
    
    {
      name: 'Published',
      sortable: true,
      // width: '130px',
      sortField: 'published',
      selector: (row) => row?.permission,
      cell: (row) => (
        <div className="form-check form-switch">
          <Input
            type="switch"
            name="published"
            checked={row.permission === 'public' ? true : false}
            onChange={(e) => {
              user.id === row.userId
                ? handleUpdateProduct(e, row)
                : toast.error('Accessible only for super admin');
            }}
          />
        </div>
      )
    },
    {
      name: 'Actions',
      // minWidth: '100px',
      cell: (row) => (
        <div className="column-action">
         {user.id===row.userId? (<>
          <FileText
            size={20}
            className="me-1 "
            style={{ cursor: 'pointer' }}
            onClick={() => handleViewDetails(row)}
          />
          <Trash2
            size={20}
            className="me-1 text-danger"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              user.id === row.userId
                ? handleDeleteProduct(row)
                : toast.error('Accessible only for super admin');
            }}
          />
          <Edit
            size={20}
            style={{ cursor: 'pointer' }}
            className=""
            onClick={() => {
              user.id === row?.userId
                ? handleEditProduct(row)
                : toast.error('Accessible only for super admin');
            }}
          />
         </>):<>
         <Lock className='text-muted' size={14}/>
         </>}
        </div>
      )
    }
  ];

  useEffect(() => {
    setData(store.products);
  }, [store.products]);

  useEffect(() => {
    if (store.productCategories.length > 0) {
      let cats = [];
      for (const cat of store.productCategories) {
        cats.push({ value: cat._id, label: cat.name });
      }
      setCategoryOptions(cats);
    }
  }, [store.productCategories]);

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
    <>
      <Card>
        <CardBody>
          <Row>
            <Col md="3">
              <Input type="text" placeholder="Search Product ..." />
            </Col>
            <Col md="3">
              <Select className="react-select" classNamePrefix="select" options={categoryOptions} />
            </Col>
            <Col md="3">
              {/* <Select
         
                className="react-select"
                classNamePrefix="select"
                options={priceOptions}
                value={currentPrice}
                
              /> */}
            </Col>
            <Col md="3" className="d-flex justify-content-end">
              <Button className="btn-icon" color="primary" onClick={toggleProductHandler}>
                Add Product
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
      <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
          {data && (
            <DataTable
              className="react-dataTable"
              columns={columns}
              data={data}
              paginationComponent={CustomPagination}
              pagination
            />
          )}
        </div>
      </Card>
      <AddProductSidebar
        open={productSidebarOpen}
        toggle={toggleProductHandler}
        store={store}
        dispatch={dispatch}
      />
      {selectedProduct !== null && (
        <EditProductSidebar
          product={selectedProduct}
          open={openEditProductSidebar}
          toggle={toggleEditProductSidebar}
          store={store}
          dispatch={dispatch}
        />
      )}
    </>
  );
}
