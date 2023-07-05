// ** React Imports
import { Fragment, useState } from 'react';

// ** Components
import AddCategoryModal from './addCategoryModal';

// ** Third Party Components
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import { FileText, Trash2, Edit } from 'react-feather';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Reactstrap Imports
import { Row, Col, Card, Input, Button, CardBody } from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';

const Category = () => {
  // ** States
  const [centeredModal, setCenteredModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    value: '',
    label: 'Filter By Category'
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };
  const categoryOptions = [
    { value: '', label: 'Filter By Category' },
    { value: 'category1', label: 'Category 1' },
    { value: 'category2', label: 'Category 2' }
  ];

  const tabledata = [
    {
      id: 'E84h4k4',
      category: 'Product',
      subCategory: 45,
      stock: 29
    },
    {
      id: 'E84h4k3',
      category: 'Product',
      subCategory: 45,
      stock: 29
    },
    {
      id: 'E84h4k2',
      category: 'Product',
      subCategory: 45,
      stock: 29
    },
    {
      id: 'E84h4k1',
      category: 'Product',
      subCategory: 45,
      stock: 29
    }
  ];

  // const handleDeleteProduct = (productId) => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You will not be able to recover this product!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#3085d6',
  //     confirmButtonText: 'Yes, delete it!',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Dispatch the delete product action here
  //       // dispatch(courseDeleteAction(productId));
  //     }
  //   });
  // };

  const columnsdata = [
    {
      name: 'ID',
      sortable: true,
      // width: '130px',
      sortField: 'id',
      selector: (row) => row.id
    },
    {
      name: 'Category Name',
      sortable: true,
      // width: '130px',
      sortField: 'category',
      selector: (row) => row.category
    },
    {
      name: 'Sub-Category',
      sortable: true,
      // width: '130px',
      sortField: 'subCategory',
      selector: (row) => row.subCategory
    },
    {
      name: 'Stock',
      sortable: true,
      // width: '130px',
      sortField: 'stock',
      selector: (row) => row.stock
    },
    {
      name: 'Published',
      sortable: true,
      // width: '130px',
      sortField: 'published',
      cell: (row) => (
        <div className="form-check form-switch">
          <Input type="switch" name="published" id="published" />
        </div>
      )
    },
    {
      name: 'Actions',
      // minWidth: '100px',
      cell: (row) => (
        <div className="column-action">
          <FileText size={20} className="me-1" />
          <Trash2 size={20} className="me-1" 
          // onClick={handleDeleteProduct(row?._id)} 
          />
          <Edit size={20} />
        </div>
      )
    }
  ];

  const CustomPagination = () => {
    const count = Math.ceil(tabledata.length / rowsPerPage);

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
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col md="3">
              <Input
                id="search-invoice"
                // className="w-100"
                type="text"
                placeholder="Search by category type ..."
              />
            </Col>
            <Col md="3">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={categoryOptions}
                value={currentCategory}
                onChange={(data) => {
                  setCurrentCategory(data);
                }}
              />
            </Col>
            <Col md="6" className="d-flex justify-content-end">
              <Button
                className="btn-icon"
                color="primary"
                onClick={() => setCenteredModal(!centeredModal)}
              >
                Add Category
              </Button>
              <AddCategoryModal centeredModal={centeredModal} setCenteredModal={setCenteredModal} />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <Col>
          <div className="react-dataTable" style={{ height: 'auto', maxHeight: '100%' }}>
            <DataTable
              columns={columnsdata}
              data={tabledata}
              pagination
              paginationComponent={CustomPagination}
            />
          </div>
        </Col>
      </Card>
    </Fragment>
  );
};

export default Category;
