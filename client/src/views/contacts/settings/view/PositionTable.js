import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import '@styles/react/apps/app-email.scss';
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
import { MoreVertical, PenTool, Trash, ChevronDown } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetEmployeePosition,
  useCreateNewPosition,
  deleteEmployeePositionRQ,
  usePutEmployeePosition
} from '../../../../requests/contacts/employee-contacts';
import { GithubPicker } from 'react-color';
import BackgroundColor from '../../../formBuilder/edit/styles/properties/BackgroundColor';
function PositionTable() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  const store = useSelector((state) => state.employeeContact);
  const employeeCategoryList = store?.employeeCategory?.data;
  // Create Modal
  const [createModal, setCreateModal] = useState(false);
  const createModalToggle = () => {
    setCreateModal(!createModal);
    setName('');
    setCategory('');
  };
  const { mutate } = useCreateNewPosition();
  // Update Modal
  const [updateModal, setUpdateModal] = useState(false);
  const [updatePositionId, setUpdatePositionId] = useState('');

  const { data: positions, refetch, isLoading: positionLoading } = useGetEmployeePosition();

  // Table Header and Cells
  const positionData = [
    {
      name: 'Position Name',
      sortable: true,
      selector: (row) => row.position
    },
    {
      name: 'Color',
      sortable: true,
      selector: (row) => row.color,
      cell: (row) => {
        return (
          <div
            style={{
              width: '50%',
              height: '100%',
              backgroundColor: row.color,
              borderRadius: '10px'
            }}
          ></div>
        );
      }
    },
    {
      name: 'Category',
      sortable: true,
      center: true,
      selector: (row) => row,
      cell: (row) => row?.category?.category
    },
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
                <DropdownItem tag="h6" className="w-100" onClick={(e) => updateModalToggle(row)}>
                  <PenTool size={15} />
                  <span className="align-middle ms-50">Edit</span>
                </DropdownItem>
                <DropdownItem
                  tag="h6"
                  className="w-100"
                  onClick={(e) => handleDeletePosition(row._id)}
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

  const updateModalToggle = (selectedPosition) => {
    setUpdateModal(!updateModal);
    setName(selectedPosition.position);
    setColor(selectedPosition.color);
    setCategory(selectedPosition?.category?._id);
    setUpdatePositionId(selectedPosition?._id);
  };
  const handleChangeColorComplete = (color) => {
    setColor(color.hex);
  };

  const handleCreatePosition = (e) => {
    if (name == '' || name == undefined) {
      toast.error('Position name is required');
    }
    const lowerCasePositionArray = positions.map((item, index) => {
      return item.position.toLowerCase();
    });
    if (lowerCasePositionArray.includes(name.toLowerCase())) {
      toast.error('Position Already Exists');
    } else {
      if (name === '') {
        toast.error('Position Must Not Be Empty');
      } else {
        const employeePosition = {
          position: name,
          color: color ? color : '#fccb02',
          category: category ? category : employeeCategoryList[0]._id
        };

        mutate(employeePosition);

        setTimeout(() => {
          refetch();
        }, 300);
      }
    }
    setCreateModal(!createModal);
  };

  const handleUpdatePosition = () => {
    const payload = {
      position: name,
      color: color,
      category: category ? category : employeeCategoryList[0]._id
    };

    usePutEmployeePosition(updatePositionId, payload);

    setUpdateModal(false);
    setTimeout(() => {
      refetch();
    }, 500);
  };

  const handleDeletePosition = (id) => {
    deleteEmployeePositionRQ(id);
    setTimeout(() => {
      refetch();
    }, 300);
  };
  // ** Final Return
  return (
    <>
      <CardHeader>
        <CardTitle className="w-100">
          <div>
            <Button color="primary" onClick={createModalToggle}>
              Create Position
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <Modal isOpen={createModal} toggle={createModalToggle} centered>
        <ModalHeader toggle={createModalToggle}>Create Position</ModalHeader>
        <ModalBody>
          <InputGroup>
            <InputGroupText>
              <h6 className="mb-0">Name</h6>
            </InputGroupText>
            <Input
              type="text"
              alt="text"
              placeholder="position name..."
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mt-1">
            <InputGroupText>
              <h6 className="mb-0">Category</h6>
            </InputGroupText>
            <Input
              type="select"
              alt="text"
              placeholder="create position..."
              onChange={(e) => setCategory(e.target.value)}
            >
              {employeeCategoryList.map((item, index) => {
                return <option value={item._id}>{item.category}</option>;
              })}
            </Input>
          </InputGroup>
          <h6 className="mt-2 mb-1">Select colors</h6>
          <GithubPicker onChangeComplete={handleChangeColorComplete} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => handleCreatePosition(e)}>
            Create
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={updateModal} toggle={updateModalToggle} centered>
        <ModalHeader toggle={updateModalToggle}>Update Position</ModalHeader>
        <ModalBody>
          <InputGroup>
            <InputGroupText>
              <h6 className="mb-0">Name</h6>
            </InputGroupText>
            <Input
              type="text"
              alt="text"
              placeholder="position name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mt-1">
            <InputGroupText>
              <h6 className="mb-0">Category</h6>
            </InputGroupText>
            <Input
              type="select"
              alt="text"
              placeholder="create position..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {employeeCategoryList.map((item, index) => {
                return <option value={item._id}>{item.category}</option>;
              })}
            </Input>
          </InputGroup>
          <h6 className="mt-2 mb-1">Select colors</h6>
          <GithubPicker onChangeComplete={handleChangeColorComplete} color={color} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => handleUpdatePosition()}>
            Update
          </Button>
        </ModalFooter>
      </Modal>
      <div className="react-dataTable position-table">
        <DataTable
          className="react-dataTable"
          noHeader
          pagination
          selectableRows
          columns={positionData}
          paginationPerPage={7}
          sortIcon={<ChevronDown size={10} />}
          data={positions}
        />
      </div>
    </>
  );
}

export default PositionTable;
