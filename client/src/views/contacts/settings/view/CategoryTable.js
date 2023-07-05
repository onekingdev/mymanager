import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import '@styles/react/apps/app-email.scss';
import { ChevronDown } from 'react-feather';
import {
  Button,
  CardHeader,
  CardTitle,
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import { GithubPicker } from 'react-color';
import {
  getAllEmployeeCategoryAction,
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction
} from '../../store/actions';
import { createDispatchHook, useDispatch, useSelector } from 'react-redux';

// Category Table
import { Archive, FileText, MoreVertical, PenTool, Trash } from 'react-feather';
import { formatDate } from '../../../../utility/Utils';
function CategoryTable() {
  // ** Create & Update Modal
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  // ** Data to transfer
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [updateCategoryId, setUpdateCategoryId] = useState('');
  const dispatch = useDispatch();
  const store = useSelector((state) => state.employeeContact);
  const employeeCategoryList = store?.employeeCategory?.data;

  useEffect(() => {
    dispatch(getAllEmployeeCategoryAction());
  }, []);
  // ** Create Modal Toggle
  const toggle = () => setModal(!modal);
  // ** Update Modal Toggle
  const updateModalToggle = () => setUpdateModal(!updateModal);
  //
  // const handleChangeColorComplete = (color) => {
  //   setColor(color.hex);
  // };

  // Create Button Click
  const handleCreateCategory = () => {
    dispatch(
      createCategoryAction({
        category: category
        //color: color
      })
    );
    setModal(false);
    setTimeout(() => {
      dispatch(getAllEmployeeCategoryAction());
    }, '300');
  };

  const handleEditCategory = (row) => {
    setUpdateModal(!updateModal);
    setCategory(row.category);
    setUpdateCategoryId(row._id);
  };

  const handleUpdateCategory = () => {
    dispatch(
      updateCategoryAction({
        category: category,
        id: updateCategoryId
      })
    );
    setUpdateModal(false);
    setTimeout(() => {
      dispatch(getAllEmployeeCategoryAction());
    }, '300');
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategoryAction(id));
    setTimeout(() => {
      dispatch(getAllEmployeeCategoryAction());
    }, '300');
  };

  // Table Header and Bulk Actions
  const categoryData = [
    {
      name: 'Category Name',
      sortable: true,
      selector: (row) => row.category
    },
    {
      name: 'Created',
      sortable: true,
      selector: (row) => formatDate(row.createdAt)
    },
    // {
    //   name: 'Manage',
    //   sortable: true,
    //   center: true,
    //   selector: (row) => row.manages
    // },
    {
      name: 'Action',
      sortable: true,
      selector: (row) => row,
      cell: (row) => {
        return (
          <div className="d-flex cursor-pointer">
            <UncontrolledDropdown>
              <DropdownToggle className="pe-" tag="span">
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag="h6" className="w-100" onClick={(e) => handleEditCategory(row)}>
                  <PenTool size={15} />
                  <span className="align-middle ms-50">Edit</span>
                </DropdownItem>
                <DropdownItem
                  tag="h6"
                  className="w-100"
                  onClick={(e) => handleDeleteCategory(row._id)}
                >
                  <Trash size={15} />
                  <span className="align-middle ms-50">Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      }
    }
  ];

  return (
    <>
      <CardHeader>
        <CardTitle className="w-100">
          <div>
            <Button color="primary" onClick={toggle}>
              Create Category
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Create Category</ModalHeader>
        <ModalBody>
          <InputGroup>
            <InputGroupText>
              <h6 className="mb-0">Name</h6>
            </InputGroupText>
            <Input
              type="text"
              alt="text"
              placeholder="create category..."
              onChange={(e) => setCategory(e.target.value)}
            />
          </InputGroup>
          {/* <h6 className="mt-2 mb-1">Select colors</h6>
          <GithubPicker onChangeComplete={handleChangeColorComplete} /> */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCreateCategory}>
            Create
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={updateModal} toggle={updateModalToggle} centered>
        <ModalHeader toggle={updateModalToggle}>Update Category</ModalHeader>
        <ModalBody>
          <InputGroup>
            <InputGroupText>
              <h6 className="mb-0">Name</h6>
            </InputGroupText>
            <Input
              type="text"
              alt="text"
              placeholder="Update category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </InputGroup>
          {/* <h6 className="mt-2 mb-1">Select colors</h6>
          <GithubPicker onChangeComplete={handleChangeColorComplete} /> */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateCategory}>
            Update
          </Button>
        </ModalFooter>
      </Modal>
      <div className="react-dataTable category-table">
        <DataTable
          className="react-dataTable"
          noHeader
          pagination
          selectableRows
          columns={categoryData}
          paginationPerPage={7}
          sortIcon={<ChevronDown size={10} />}
          data={employeeCategoryList}
        />
      </div>
    </>
  );
}

export default CategoryTable;
