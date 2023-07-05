// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Components
import AddCourseModal from './add/AddCourseModal';
// ** Third Party Components
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import { Trash2, Edit } from 'react-feather';
import { useSelector } from 'react-redux';
import moment from 'moment';
// ** Utils
import { selectThemeColors } from '@utils';
// ** Reactstrap Imports
import { Row, Col, Card, Input, Button, CardBody } from 'reactstrap';
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { courseFetchAction, courseDeleteAction, courseEditAction } from '../store/actions';
import Details from '../detail';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
const Courses = ({ shopStore,dispatch }) => {
  const [details, setDetails] = useState({ show: false, details: {} })
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const store = useSelector((state) => state.course);

  const tableData = store?.courseList;
  const [centeredModal, setCenteredModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    value: '',
    label: 'Filter By Category'
  });
  const [currentPrice, setCurrentPrice] = useState({
    value: '',
    label: 'Filter By Price',
    number: 0
  });

  const categoryOptions = [
    { value: '', label: 'Filter By Category' },
    { value: 'category1', label: 'Category 1' },
    { value: 'category2', label: 'Category 2' }
  ];
  const priceOptions = [
    { value: '', label: 'Filter By Price', number: 0 },
    { value: 'h2l', label: 'High to Low', number: 1 },
    { value: 'l2h', label: 'Low to Hign', number: 2 }
  ];

  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete the this course?',
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
        dispatch(courseDeleteAction(productId));
      }
    });
  };

  const columnsdata = [
    {
      name: 'Course Name',
      sortable: true,
      // width: '130px',
      sortField: 'name',
      selector: (row) => row.courseName
    },
    {
      name: 'Course Image',
      sortable: true,
      // width: '130px',
      sortField: 'name',
      selector: (row) => row.courseImage,
      cell: (row) => <img height="40" width="40" src={row.courseImage} />
    },
    {
      name: 'Course Category',
      sortable: true,
      // width: '130px',
      sortField: 'category',
      selector: (row) => row.courseType
    },
    {
      name: 'Details',
      sortable: true,
      // width: '130px',
      sortField: 'subCategory',
      selector: (row) => row.startDate,
      cell: (row) => <div>
        <div>Created At-{moment(row?.startDate).format("MM/DD/YYYY")}</div>
        <div>End Date-{moment(row?.endDate).format("MM/DD/YYYY")}</div>
      </div>

    },
    {
      name: 'Published',
      sortable: true,
      sortField: 'price',
      cell: (row) =>
        <div className="form-check form-switch">
          <Input
            type="switch"
            name="published"
            checked={row?.permission === 'public'}
            onChange={(e) => {
              row?.permission==="public"?
               dispatch(courseEditAction(row._id,{permission:"private"},true, shopStore.shop._id)):
               dispatch(courseEditAction(row._id,{permission:"public"},true, shopStore.shop._id))
            }}
          />
        </div>
    },
    {
      name: 'Price',
      sortable: true,
      // width: '130px',
      sortField: 'price',
      selector: (row) => row.coursePrice + "$"
    },

    {
      name: 'Actions',
      // minWidth: '100px',
      cell: (row) => (
        <div className="column-action">
          {/* <FileText size={20} className="me-1" /> */}
          <Trash2 size={20} onClick={() => handleDeleteProduct(row._id)} className="me-1 cursor-pointer" />
          <Edit size={20} className="cursor-pointer" onClick={() => setDetails({ show: !details.show, details: row })} />
        </div>
      )
    }
  ];
  useEffect(() => {
    dispatch(courseFetchAction())
  }, [dispatch])
  useEffect(() => {
    store.courseAddSuccess && toast.success("Course Added Successfully")
    store.courseDeleteSuccess && toast.success("Course Deleted Successfully")
    store.courseEditSuccess && toast.success("Course Edited Successfully")
    store.lessonAddSuccess && toast.success("Lesson Added Successfully")
    store.lessonDeleteSuccess && toast.success("Lesson Deleted Successfully")
    store.lessonEditSuccess && toast.success("Lesson Edited Successfully")
    store.quizAddSuccess && toast.success("Quiz Created Successfully")
    store.quizEditSuccess && toast.success("Quiz Edited Successfully")
    store.quizDeleteSuccess && toast.success("Quiz Deleted Successfully")
    store.videoAddSuccess && toast.success("Video Added Successfully")
    store.videoEditSuccess && toast.success("Video Edited Successfully")
    store.videoDeleteSuccess && toast.success("Video Deleted Successfully")
  }, [store])



  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Math.ceil(tableData?.length / rowsPerPage);

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
    !details?.show ? <Fragment>
      <Card Card >
        <CardBody>
          <Row>
            <Col md="3">
              <Input
                id="search-invoice"
                // className="w-100"
                type="text"
                placeholder="Search Course ..."
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
            <Col md="3">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={priceOptions}
                value={currentPrice}
                onChange={(data) => {
                  setCurrentPrice(data);
                }}
              />
            </Col>
            <Col md="3" className="d-flex justify-content-end">
              <Button
                className="btn-icon"
                color="primary"
                onClick={() => setCenteredModal(!centeredModal)}
              >
                Add Course
              </Button>
              <AddCourseModal shopStore={shopStore} centeredModal={centeredModal} setCenteredModal={setCenteredModal} />
            </Col>
          </Row>
        </CardBody>
      </Card >
      <Card>
        <Col>
          <DataTable columns={columnsdata} data={tableData} pagination paginationComponent={CustomPagination} />
        </Col>
      </Card>
    </Fragment > : <Details shopStore={shopStore} setDetails={setDetails} details={details} />

  );
};

export default Courses;
